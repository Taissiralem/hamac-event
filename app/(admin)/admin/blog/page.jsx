"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/admin/api";
import { Empty, Loading, PageHeader, formatDateTime } from "@/components/admin/ui";
import { POST_CATEGORIES } from "@/components/admin/labels";

const catLabel = Object.fromEntries(POST_CATEGORIES.map((c) => [c.value, c.label]));

export default function BlogList() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    api("/posts/admin").then(setPosts).catch(() => setPosts([]));
  }, []);

  return (
    <>
      <PageHeader
        title="Blog"
        description="Les 3 derniers articles publiés s'affichent automatiquement sur l'accueil et sur la page correspondant à leur catégorie."
        actions={
          <Link href="/admin/blog/nouveau" className="inline-flex min-h-10 items-center rounded-lg bg-orange px-4 text-sm font-semibold text-night hover:bg-[#f08a45]">
            Nouvel article
          </Link>
        }
      />
      {!posts ? (
        <Loading />
      ) : posts.length ? (
        <ul className="divide-y divide-ink/10 overflow-hidden rounded-xl border border-ink/10 bg-white">
          {posts.map((p) => (
            <li key={p._id}>
              <Link href={`/admin/blog/${p._id}`} className="flex items-center gap-4 p-4 hover:bg-paper">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.coverImage && <img src={p.coverImage} alt="" className="size-full object-cover" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{p.title.fr}</span>
                  <span className="block text-sm text-stone">
                    {catLabel[p.category]} · {p.published ? `Publié le ${formatDateTime(p.publishedAt)}` : "Brouillon"}
                  </span>
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.published ? "bg-[#e3f1e6] text-[#1e6b34]" : "bg-sand text-stone"}`}>
                  {p.published ? "En ligne" : "Brouillon"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Aucun article. Écrivez le premier pour nourrir le blog et le référencement.</Empty>
      )}
    </>
  );
}
