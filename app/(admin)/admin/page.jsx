"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/admin/api";
import { Card, PageHeader, formatDateTime } from "@/components/admin/ui";
import { NEED_LABELS, STATUS_LABELS } from "@/components/admin/labels";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      api("/contact/stats"),
      api("/contact?page=1"),
      api("/posts/admin"),
      api("/realisations?limit=100"),
      api("/newsletter/count"),
      api("/stats/summary?days=7").catch(() => null),
    ])
      .then(([stats, latest, posts, realisations, newsletter, traffic]) =>
        setData({ stats, latest: latest.Contacts.slice(0, 5), posts, realisations, newsletter, traffic })
      )
      .catch(() => setData({ error: true }));
  }, []);

  const count = (arr, id) => arr?.find((x) => x._id === id)?.count || 0;

  const tiles = data && !data.error
    ? [
        { label: "Nouvelles demandes", value: count(data.stats.byStatus, "nouveau"), href: "/admin/demandes?status=nouveau", accent: true },
        { label: "Demandes en cours", value: count(data.stats.byStatus, "en-cours"), href: "/admin/demandes?status=en-cours" },
        { label: "Articles publiés", value: data.posts.filter((p) => p.published).length, href: "/admin/blog" },
        { label: "Réalisations", value: data.realisations.length, href: "/admin/realisations" },
        { label: "Abonnés newsletter", value: data.newsletter.totalCount, href: "/admin/newsletter" },
      ]
    : [];

  return (
    <>
      <PageHeader title="Tableau de bord" description="Vue d'ensemble des demandes et du contenu du site." />
      {data?.error && <p className="text-[#8a3409]">Impossible de charger les données. Vérifiez que l&apos;API est démarrée.</p>}
      {!data && <p className="text-stone">Chargement…</p>}
      {tiles.length > 0 && (
        <>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {tiles.map((tile) => (
              <li key={tile.label}>
                <Link
                  href={tile.href}
                  className={`block rounded-xl border p-5 transition-colors hover:border-ink ${
                    tile.accent && tile.value ? "border-orange bg-orange/10" : "border-ink/10 bg-white"
                  }`}
                >
                  <span className="block text-3xl font-bold">{tile.value}</span>
                  <span className="mt-1 block text-sm text-stone">{tile.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Card title="Dernières demandes" className="lg:col-span-2">
              {data.latest.length ? (
                <ul className="divide-y divide-ink/10">
                  {data.latest.map((c) => (
                    <li key={c._id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                      <div>
                        <p className="font-semibold">
                          {[c.firstName, c.name].filter(Boolean).join(" ")}
                          {c.company && <span className="font-normal text-stone"> · {c.company}</span>}
                        </p>
                        <p className="text-sm text-stone">
                          {NEED_LABELS[c.type] || c.type} — {formatDateTime(c.createdAt)}
                        </p>
                      </div>
                      <span className="rounded-full bg-sand px-2.5 py-1 text-xs font-semibold">{STATUS_LABELS[c.status]}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-stone">Aucune demande pour le moment.</p>
              )}
              <Link href="/admin/demandes" className="mt-4 inline-block text-sm font-semibold underline decoration-orange underline-offset-4">
                Toutes les demandes
              </Link>
            </Card>
            <div className="space-y-6">
            {data.traffic && (
              <Card title="Fréquentation (7 jours)">
                <dl className="grid grid-cols-2 gap-4">
                  {[
                    ["Visiteurs", data.traffic.totals.visitors],
                    ["Pages vues", data.traffic.totals.pageviews],
                    ["Demandes", data.traffic.totals.leads],
                    ["Conversion", `${data.traffic.totals.conversionRate} %`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-sm text-stone">{k}</dt>
                      <dd className="text-2xl font-bold tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link href="/admin/statistiques" className="mt-4 inline-block text-sm font-semibold underline decoration-orange underline-offset-4">
                  Statistiques détaillées
                </Link>
              </Card>
            )}
            <Card title="Raccourcis">
              <ul className="space-y-2 text-sm font-semibold">
                <li><Link className="underline decoration-orange underline-offset-4" href="/admin/blog/nouveau">Écrire un article</Link></li>
                <li><Link className="underline decoration-orange underline-offset-4" href="/admin/realisations/nouveau">Ajouter une réalisation</Link></li>
                <li><Link className="underline decoration-orange underline-offset-4" href="/admin/pages/salons">Modifier la page Salons</Link></li>
                <li><Link className="underline decoration-orange underline-offset-4" href="/admin/pages/home">Modifier la page d&apos;accueil</Link></li>
              </ul>
            </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
}
