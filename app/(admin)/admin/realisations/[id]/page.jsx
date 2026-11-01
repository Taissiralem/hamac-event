"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, refreshSite } from "@/lib/admin/api";
import { BiInput, Button, Card, ImagesInput, Loading, PageHeader, SelectInput, TextInput, Toggle, useToast } from "@/components/admin/ui";
import { REALISATION_CATEGORIES } from "@/components/admin/labels";

const EMPTY = {
  title: { fr: "", en: "" },
  description: { fr: "", en: "" },
  client: "",
  location: "",
  date: "",
  category: "salons",
  images: [],
  featured: false,
  order: 0,
};

export default function RealisationEditor() {
  const { id } = useParams();
  const isNew = id === "nouveau";
  const router = useRouter();
  const toast = useToast();
  const [item, setItem] = useState(isNew ? EMPTY : null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    api(`/realisations/${id}`).then(setItem).catch((e) => toast(e.message, "error"));
  }, [id, isNew, toast]);

  if (!item) return <Loading />;
  const set = (key) => (value) => setItem((r) => ({ ...r, [key]: value }));

  async function save() {
    if (!item.title.fr.trim()) return toast("Le titre en français est obligatoire.", "error");
    if (!item.images.length) return toast("Ajoutez au moins une photo.", "error");
    setBusy(true);
    try {
      const body = { ...item, order: Number(item.order) || 0 };
      const saved = isNew
        ? await api("/realisations", { method: "POST", body })
        : await api(`/realisations/${id}`, { method: "PUT", body });
      await refreshSite();
      setItem(saved);
      toast("Réalisation enregistrée");
      if (isNew) router.replace(`/admin/realisations/${saved._id}`);
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Supprimer définitivement cette réalisation ?")) return;
    try {
      await api(`/realisations/${id}`, { method: "DELETE" });
      await refreshSite();
      toast("Réalisation supprimée");
      router.replace("/admin/realisations");
    } catch (e) {
      toast(e.message, "error");
    }
  }

  return (
    <>
      <PageHeader title={isNew ? "Nouvelle réalisation" : "Modifier la réalisation"} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <div className="space-y-6">
              <BiInput label="Titre" value={item.title} onChange={set("title")} />
              <BiInput label="Description" value={item.description} onChange={set("description")} multiline rows={3} hint="Affichée dans la visionneuse quand on agrandit la photo." />
              <ImagesInput label="Photos" value={item.images} onChange={set("images")} />
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Classement">
            <div className="space-y-5">
              <SelectInput label="Catégorie" value={item.category} onChange={set("category")} options={REALISATION_CATEGORIES} />
              <Toggle label="Mettre en avant sur l'accueil" checked={item.featured} onChange={set("featured")} />
              <TextInput label="Ordre d'affichage" type="number" value={item.order} onChange={set("order")} hint="Les plus petits nombres s'affichent en premier." />
            </div>
          </Card>
          <Card title="Informations">
            <div className="space-y-4">
              <TextInput label="Client" value={item.client} onChange={set("client")} hint="Facultatif, avec l'accord du client." />
              <TextInput label="Lieu" value={item.location} onChange={set("location")} />
              <TextInput label="Date ou année" value={item.date} onChange={set("date")} />
            </div>
          </Card>
          {!isNew && (
            <Button variant="danger" onClick={remove} className="w-full">
              Supprimer la réalisation
            </Button>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 z-20 -mx-4 mt-8 flex items-center justify-end gap-2 border-t border-ink/10 bg-[#f3f1ec]/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <Link href="/admin/realisations" className="mr-auto inline-flex min-h-10 items-center rounded-lg px-4 text-sm font-semibold hover:bg-white">
          Retour
        </Link>
        <Button variant="accent" onClick={save} disabled={busy}>
          {busy ? "Enregistrement…" : "Enregistrer et publier"}
        </Button>
      </div>
    </>
  );
}
