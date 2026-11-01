"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, refreshSite } from "@/lib/admin/api";
import { BiInput, Button, Card, ImageInput, Loading, PageHeader, SelectInput, TextInput, Toggle, useToast } from "@/components/admin/ui";
import { POST_CATEGORIES } from "@/components/admin/labels";

const EMPTY = {
  title: { fr: "", en: "" },
  excerpt: { fr: "", en: "" },
  content: { fr: "", en: "" },
  coverImage: "",
  category: "salons",
  published: false,
  slug: "",
};

export default function PostEditor() {
  const { id } = useParams();
  const isNew = id === "nouveau";
  const router = useRouter();
  const toast = useToast();
  const [post, setPost] = useState(isNew ? EMPTY : null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    api(`/posts/admin/${id}`).then(setPost).catch((e) => toast(e.message, "error"));
  }, [id, isNew, toast]);

  if (!post) return <Loading />;
  const set = (key) => (value) => setPost((p) => ({ ...p, [key]: value }));

  async function save(publish = post.published) {
    if (!post.title.fr.trim()) return toast("Le titre en français est obligatoire.", "error");
    setBusy(true);
    try {
      const body = { ...post, published: publish };
      const saved = isNew
        ? await api("/posts", { method: "POST", body })
        : await api(`/posts/${id}`, { method: "PUT", body });
      await refreshSite();
      setPost(saved);
      toast(publish ? "Article publié" : "Brouillon enregistré");
      if (isNew) router.replace(`/admin/blog/${saved._id}`);
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Supprimer définitivement cet article ?")) return;
    try {
      await api(`/posts/${id}`, { method: "DELETE" });
      await refreshSite();
      toast("Article supprimé");
      router.replace("/admin/blog");
    } catch (e) {
      toast(e.message, "error");
    }
  }

  return (
    <>
      <PageHeader
        title={isNew ? "Nouvel article" : "Modifier l'article"}
        actions={
          !isNew &&
          post.published && (
            <a href={`/fr/blog/${post.slug}`} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-lg border border-ink/20 px-4 text-sm font-semibold hover:border-ink">
              Voir l&apos;article
            </a>
          )
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <div className="space-y-6">
              <BiInput label="Titre" value={post.title} onChange={set("title")} />
              <BiInput label="Résumé" value={post.excerpt} onChange={set("excerpt")} multiline rows={3} hint="Affiché sur les cartes d'articles et dans Google (150 à 160 caractères conseillés)." />
              <BiInput
                label="Contenu"
                value={post.content}
                onChange={set("content")}
                multiline
                rows={18}
                hint="Mise en forme : ## Intertitre, **gras**, *italique*, - liste à puces, [lien](https://…), > citation"
              />
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Publication">
            <div className="space-y-5">
              <Toggle label="Article en ligne" checked={post.published} onChange={set("published")} hint="Décoché, l'article reste un brouillon invisible sur le site." />
              <SelectInput label="Catégorie" value={post.category} onChange={set("category")} options={POST_CATEGORIES} />
              <TextInput
                label="Adresse de l'article (slug)"
                value={post.slug}
                onChange={set("slug")}
                hint={isNew ? "Laissez vide : elle sera créée à partir du titre." : `/fr/blog/${post.slug}`}
              />
            </div>
          </Card>
          <Card title="Image de couverture">
            <ImageInput value={post.coverImage} onChange={set("coverImage")} hint="Format paysage conseillé (1600 × 900 px)." />
          </Card>
          {!isNew && (
            <Button variant="danger" onClick={remove} className="w-full">
              Supprimer l&apos;article
            </Button>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 z-20 -mx-4 mt-8 flex flex-wrap items-center justify-end gap-2 border-t border-ink/10 bg-[#f3f1ec]/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <Link href="/admin/blog" className="mr-auto inline-flex min-h-10 items-center rounded-lg px-4 text-sm font-semibold hover:bg-white">
          Retour
        </Link>
        {!post.published && (
          <Button variant="ghost" onClick={() => save(false)} disabled={busy}>
            Enregistrer le brouillon
          </Button>
        )}
        <Button variant="accent" onClick={() => save(true)} disabled={busy}>
          {busy ? "Enregistrement…" : post.published ? "Enregistrer et publier" : "Publier"}
        </Button>
      </div>
    </>
  );
}
