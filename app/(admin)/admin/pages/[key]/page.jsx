"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api, refreshSite } from "@/lib/admin/api";
import { pageSchemas } from "@/lib/content/schemas";
import { mergeContent } from "@/lib/content/merge";
import { routes } from "@/lib/i18n";
import SchemaForm from "@/components/admin/SchemaForm";
import { Button, Loading, PageHeader, useToast } from "@/components/admin/ui";

const PUBLIC_PATH = { home: "", salons: routes.salons, teamBuilding: routes.teamBuilding, sortie: routes.sortie, about: routes.about, contact: routes.contact, blog: routes.blog, legal: routes.legal, settings: routes.contact };

export default function PageEditor() {
  const { key } = useParams();
  const schema = pageSchemas[key];
  const toast = useToast();
  const [value, setValue] = useState(null);
  const [saved, setSaved] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!schema) return;
    api(`/pages/${key}`)
      .then(({ data }) => {
        const merged = mergeContent(key, data);
        setValue(merged);
        setSaved(JSON.stringify(merged));
      })
      .catch((e) => toast(e.message, "error"));
  }, [key, schema, toast]);

  const dirty = value && JSON.stringify(value) !== saved;

  useEffect(() => {
    const warn = (e) => dirty && e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!schema) return <p>Page inconnue.</p>;
  if (!value) return <Loading />;

  async function save() {
    setBusy(true);
    try {
      await api(`/pages/${key}`, { method: "PUT", body: { data: value } });
      await refreshSite();
      setSaved(JSON.stringify(value));
      toast("Modifications publiées sur le site");
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    if (!confirm("Revenir au contenu d'origine pour toute la page ? Pensez à enregistrer ensuite.")) return;
    setValue(mergeContent(key, {}));
  }

  return (
    <>
      <PageHeader
        title={schema.label}
        description="Chaque texte existe en français et en anglais. Sans traduction, le français s'affiche aussi sur la version anglaise."
        actions={
          <>
            <a href={`/fr${PUBLIC_PATH[key] ? `/${PUBLIC_PATH[key]}` : ""}`} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-lg border border-ink/20 px-4 text-sm font-semibold hover:border-ink">
              Voir la page
            </a>
            <Button variant="ghost" onClick={reset}>Contenu d&apos;origine</Button>
          </>
        }
      />
      <nav aria-label="Sections" className="mb-6 flex flex-wrap gap-2">
        {schema.sections.filter((x) => !x.hidden).map((s) => (
          <a key={s.key} href={`#section-${s.key}`} className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-sm hover:border-ink">
            {s.label}
          </a>
        ))}
      </nav>
      <SchemaForm schema={schema} value={value} onChange={setValue} />
      <div className="sticky bottom-0 z-20 -mx-4 mt-8 flex items-center justify-between gap-4 border-t border-ink/10 bg-[#f3f1ec]/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <p className="text-sm text-stone">{dirty ? "Modifications non enregistrées" : "Tout est enregistré"}</p>
        <div className="flex gap-2">
          <Link href="/admin/pages" className="inline-flex min-h-10 items-center rounded-lg px-4 text-sm font-semibold hover:bg-white">Retour</Link>
          <Button variant="accent" onClick={save} disabled={busy || !dirty}>
            {busy ? "Enregistrement…" : "Enregistrer et publier"}
          </Button>
        </div>
      </div>
    </>
  );
}
