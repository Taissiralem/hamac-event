"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/admin/api";
import { Button, Empty, Loading, PageHeader, formatDateTime, useToast } from "@/components/admin/ui";

export default function NewsletterPage() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);

  const load = useCallback(() => {
    api(`/newsletter?page=${page}`).then(setData).catch(() => setData({ newsletters: [], totalPages: 0 }));
  }, [page]);
  useEffect(load, [load]);

  async function remove(id) {
    if (!confirm("Retirer cet abonné ?")) return;
    try {
      await api(`/newsletter/${id}`, { method: "DELETE" });
      toast("Abonné retiré");
      load();
    } catch (e) {
      toast(e.message, "error");
    }
  }

  async function exportCsv() {
    const rows = [];
    for (let p = 1; ; p++) {
      const d = await api(`/newsletter?page=${p}`);
      rows.push(...d.newsletters);
      if (p >= d.totalPages) break;
    }
    const csv = "email,date\n" + rows.map((r) => `${r.email},${r.createdAt}`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "abonnes-newsletter.csv";
    a.click();
  }

  return (
    <>
      <PageHeader
        title="Newsletter"
        description="Adresses inscrites à la newsletter."
        actions={<Button variant="ghost" onClick={exportCsv}>Exporter en CSV</Button>}
      />
      {!data ? (
        <Loading />
      ) : data.newsletters.length ? (
        <ul className="divide-y divide-ink/10 overflow-hidden rounded-xl border border-ink/10 bg-white">
          {data.newsletters.map((n) => (
            <li key={n._id} className="flex items-center justify-between gap-4 px-4 py-3">
              <span>
                <span className="block font-medium">{n.email}</span>
                <span className="block text-xs text-stone">{formatDateTime(n.createdAt)}</span>
              </span>
              <Button variant="danger" onClick={() => remove(n._id)}>Retirer</Button>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Aucun abonné pour le moment.</Empty>
      )}
      {data?.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" disabled={page <= 1} onClick={() => setPage(page - 1)}>Page précédente</Button>
          <span className="text-sm text-stone">Page {page} sur {data.totalPages}</span>
          <Button variant="ghost" disabled={page >= data.totalPages} onClick={() => setPage(page + 1)}>Page suivante</Button>
        </div>
      )}
    </>
  );
}
