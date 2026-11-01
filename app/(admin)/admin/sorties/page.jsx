"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/admin/api";
import { Empty, Loading, PageHeader } from "@/components/admin/ui";

export default function SortiesList() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    // L'API pagine par 9 : on charge toutes les pages
    (async () => {
      const first = await api("/tb/addSortie?page=1");
      let all = first.sorties;
      for (let p = 2; p <= first.totalPages; p++) all = all.concat((await api(`/tb/addSortie?page=${p}`)).sorties);
      setItems(all);
    })().catch(() => setItems([]));
  }, []);

  return (
    <>
      <PageHeader
        title="Sorties pédagogiques"
        description="Destinations et programmes affichés sur la page Sortie pédagogique."
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
                    {s.localisation}
                    {s.days && ` · ${s.days} jour(s)`}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Aucun programme. Ajoutez votre première destination.</Empty>
      )}
    </>
  );
}
