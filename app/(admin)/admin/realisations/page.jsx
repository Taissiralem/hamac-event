"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/admin/api";
import { Empty, Loading, PageHeader } from "@/components/admin/ui";
import { REALISATION_CATEGORIES } from "@/components/admin/labels";

export default function RealisationsList() {
  const [items, setItems] = useState(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    api("/realisations?limit=100").then(setItems).catch(() => setItems([]));
  }, []);

  const shown = items?.filter((r) => !category || r.category === category);

  return (
    <>
      <PageHeader
        title="Réalisations"
        description="Projets et photos affichés dans les galeries des pages Salons et Team Building, et sur l'accueil s'ils sont mis en avant."
        actions={
          <Link href="/admin/realisations/nouveau" className="inline-flex min-h-10 items-center rounded-lg bg-orange px-4 text-sm font-semibold text-night hover:bg-[#f08a45]">
            Nouvelle réalisation
          </Link>
        }
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {[{ value: "", label: "Toutes" }, ...REALISATION_CATEGORIES].map((c) => (
          <button
            key={c.value || "all"}
            type="button"
            aria-pressed={category === c.value}
            onClick={() => setCategory(c.value)}
            className={`rounded-full border px-3 py-1.5 text-sm ${category === c.value ? "border-ink bg-ink text-paper" : "border-ink/20 bg-white hover:border-ink"}`}
          >
            {c.label}
          </button>
        ))}
      </div>
      {!items ? (
        <Loading />
      ) : shown.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <li key={r._id}>
              <Link href={`/admin/realisations/${r._id}`} className="block overflow-hidden rounded-xl border border-ink/10 bg-white transition-colors hover:border-ink">
                <span className="relative block aspect-[4/3] bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {r.images?.[0] && <img src={r.images[0]} alt="" className="size-full object-cover" />}
                  {r.featured && <span className="absolute left-2 top-2 rounded-full bg-orange px-2 py-0.5 text-xs font-semibold text-night">Accueil</span>}
                </span>
                <span className="block p-4">
                  <span className="block font-semibold">{r.title.fr}</span>
                  <span className="block text-sm text-stone">
                    {REALISATION_CATEGORIES.find((c) => c.value === r.category)?.label} · {r.images?.length || 0} photo(s)
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Aucune réalisation dans cette catégorie.</Empty>
      )}
    </>
  );
}
