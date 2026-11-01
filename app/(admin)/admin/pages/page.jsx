"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/admin/api";
import { pageSchemas } from "@/lib/content/schemas";
import { PageHeader, formatDateTime } from "@/components/admin/ui";

const ORDER = ["home", "salons", "teamBuilding", "sortie", "about", "contact", "blog", "legal", "settings"];

export default function PagesList() {
  const [updated, setUpdated] = useState({});

  useEffect(() => {
    api("/pages")
      .then((pages) => setUpdated(Object.fromEntries(pages.map((p) => [p.key, p.updatedAt]))))
      .catch(() => {});
  }, []);

  return (
    <>
      <PageHeader title="Pages du site" description="Modifiez les textes et les images de chaque page, en français et en anglais." />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ORDER.map((key) => (
          <li key={key}>
            <Link href={`/admin/pages/${key}`} className="block h-full rounded-xl border border-ink/10 bg-white p-5 transition-colors hover:border-ink">
              <span className="block text-lg font-bold">{pageSchemas[key].label}</span>
              <span className="mt-1 block text-sm text-stone">
                {pageSchemas[key].sections.length} section{pageSchemas[key].sections.length > 1 ? "s" : ""}
              </span>
              <span className="mt-3 block text-xs text-stone">
                {updated[key] ? `Modifiée le ${formatDateTime(updated[key])}` : "Contenu d'origine"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
