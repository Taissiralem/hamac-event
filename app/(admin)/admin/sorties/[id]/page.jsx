"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, refreshSite } from "@/lib/admin/api";
import { BiInput, Button, Card, ImagesInput, Loading, PageHeader, SelectInput, TextInput, useToast } from "@/components/admin/ui";
import { SORTIE_CATEGORIES } from "@/components/admin/labels";

// L'API historique des sorties stocke les champs séparément (titleFr / titleEn…)
const fromApi = (s) => ({
  title: { fr: s.titleFr || "", en: s.titleEn || "" },
  desc: { fr: s.descFr || "", en: s.descEn || "" },
  days: s.days || "",
  localisation: s.localisation || "",
  images: s.images || [],
  category: s.category || "team-building",
});
const toApi = (v) => ({
  titleFr: v.title.fr,
  titleEn: v.title.en || v.title.fr,
  descFr: v.desc.fr,
  descEn: v.desc.en || v.desc.fr,
  days: v.days,
  localisation: v.localisation,
  category: v.category,
  existingImages: v.images,
});

export default function SortieEditor() {
  const { id } = useParams();
  const isNew = id === "nouveau";
  const router = useRouter();
  const toast = useToast();
  const [item, setItem] = useState(isNew ? fromApi({}) : null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    api(`/tb/addSortie/${id}`).then((s) => setItem(fromApi(s))).catch((e) => toast(e.message, "error"));
  }, [id, isNew, toast]);

  if (!item) return <Loading />;
  const set = (key) => (value) => setItem((r) => ({ ...r, [key]: value }));

  async function save() {
    if (!item.title.fr.trim() || !item.desc.fr.trim() || !item.localisation.trim()) {
      return toast("Titre, description (en français) et lieu sont obligatoires.", "error");
    }
    setBusy(true);
    try {
      const saved = isNew
        ? await api("/tb/addSortie", { method: "POST", body: toApi(item) })
        : await api(`/tb/addSortie/${id}`, { method: "PUT", body: toApi(item) });
      await refreshSite();
      toast("Programme enregistré");
      if (isNew) router.replace(`/admin/sorties/${saved._id}`);
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Supprimer définitivement ce programme ?")) return;
    try {
      await api(`/tb/addSortie/${id}`, { method: "DELETE" });
      await refreshSite();
      toast("Programme supprimé");
      router.replace("/admin/sorties");
    } catch (e) {
      toast(e.message, "error");
    }
  }

  return (
    <>
      <PageHeader title={isNew ? "Nouveau programme" : "Modifier le programme"} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="space-y-6">
            <BiInput label="Titre" value={item.title} onChange={set("title")} />
            <BiInput label="Description" value={item.desc} onChange={set("desc")} multiline rows={5} />
            <ImagesInput label="Photos" value={item.images} onChange={set("images")} />
          </div>
        </Card>
        <div className="space-y-6">
          <Card title="Informations">
            <div className="space-y-4">
              <SelectInput label="Page du site" value={item.category} onChange={set("category")} options={SORTIE_CATEGORIES} />
              <TextInput label="Lieu" value={item.localisation} onChange={set("localisation")} />
              <TextInput label="Durée (ex. « 2 à 3 heures », « 5 jours »)" value={item.days} onChange={set("days")} />
            </div>
          </Card>
          {!isNew && (
            <Button variant="danger" onClick={remove} className="w-full">
              Supprimer le programme
            </Button>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 z-20 -mx-4 mt-8 flex items-center justify-end gap-2 border-t border-ink/10 bg-[#f3f1ec]/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <Link href="/admin/sorties" className="mr-auto inline-flex min-h-10 items-center rounded-lg px-4 text-sm font-semibold hover:bg-white">
          Retour
        </Link>
        <Button variant="accent" onClick={save} disabled={busy}>
          {busy ? "Enregistrement…" : "Enregistrer et publier"}
        </Button>
      </div>
    </>
  );
}
