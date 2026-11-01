"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/admin/api";
import { Empty, Loading, PageHeader } from "@/components/admin/ui";
import { SORTIE_CATEGORIES } from "@/components/admin/labels";

const categoryLabel = (c) => SORTIE_CATEGORIES.find((o) => o.value === (c || "team-building")).label;

export default function SortiesList() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    api("/tb/addSortie?all=1")
      .then((d) => setItems(d.sorties))
      .catch(() => setItems([]));
  }, []);

  return (
    <>
      <PageHeader
        title="Programmes"
        description="Activités et sorties affichées sur les pages Team Building et Sortie pédagogique."
        actions={
          <Link href="/admin/sorties/nouveau" className="inline-flex min-h-10 items-center rounded-lg bg-orange px-4 text-sm font-semibold text-night hover:bg-[#f08a45]">
            Nouveau programme
          </Link>
        }
      />
      {!items ? (
        <Loading />
      ) : items.length ? (
        <ul className="divide-y divide-ink/10 overflow-hidden rounded-xl border border-ink/10 bg-white">
          {items.map((s) => (
            <li key={s._id}>
              <Link href={`/admin/sorties/${s._id}`} className="flex items-center gap-4 p-4 hover:bg-paper">
                <span className="size-16 shrink-0 overflow-hidden rounded-lg bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {s.images?.[0] && <img src={s.images[0]} alt="" className="size-full object-cover" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{s.titleFr}</span>
                  <span className="block text-sm text-stone">
                    {categoryLabel(s.category)} · {s.localisation}
                    {s.days?.trim() && ` · ${s.days.trim()}`}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Aucun programme. Ajoutez votre première activité ou sortie.</Empty>
      )}
    </>
  );
}
