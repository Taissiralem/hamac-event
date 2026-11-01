"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/admin/api";
import { Button, Empty, Loading, PageHeader, formatDateTime, useToast } from "@/components/admin/ui";
import { NEED_LABELS, STATUS_LABELS } from "@/components/admin/labels";

const STATUS_STYLES = {
  nouveau: "bg-orange/15 text-[#8a3409]",
  "en-cours": "bg-[#e3eef4] text-ink",
  traite: "bg-sand text-stone",
};

function Request({ item, onChange, onDelete }) {
  const toast = useToast();
  const [open, setOpen] = useState(item.status === "nouveau");
  const [notes, setNotes] = useState(item.notes || "");

  async function update(patch, message) {
    try {
      onChange(await api(`/contact/${item._id}`, { method: "PATCH", body: patch }));
      toast(message);
    } catch (e) {
      toast(e.message, "error");
    }
  }

  async function remove() {
    if (!confirm("Supprimer définitivement cette demande ?")) return;
    try {
      await api(`/contact/${item._id}`, { method: "DELETE" });
      onDelete(item._id);
      toast("Demande supprimée");
    } catch (e) {
      toast(e.message, "error");
    }
  }

  const fullName = [item.firstName, item.name].filter(Boolean).join(" ");

  return (
    <li className="rounded-xl border border-ink/10 bg-white">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 p-5 text-left">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[item.status]}`}>{STATUS_LABELS[item.status]}</span>
        <span className="font-semibold">{fullName}</span>
        {item.company && <span className="text-stone">{item.company}</span>}
        <span className="text-sm text-stone">{NEED_LABELS[item.type] || item.type}</span>
        <span className="ml-auto text-sm text-stone">{formatDateTime(item.createdAt)}</span>
      </button>
      {open && (
        <div className="grid gap-6 border-t border-ink/10 p-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="whitespace-pre-line">{item.message}</p>
            <dl className="mt-5 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-stone">E-mail</dt>
                <dd><a className="font-semibold underline decoration-orange underline-offset-4" href={`mailto:${item.email}`}>{item.email}</a></dd>
              </div>
              <div>
                <dt className="text-stone">Téléphone</dt>
                <dd><a className="font-semibold underline decoration-orange underline-offset-4" href={`tel:${item.phonenumber}`}>{item.phonenumber}</a></dd>
              </div>
              {item.motif && (
                <div>
                  <dt className="text-stone">Envoyée depuis</dt>
                  <dd>{item.motif}</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="space-y-4">
            <div>
              <p className="mb-1.5 text-sm font-semibold">Statut</p>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={item.status === value}
                    onClick={() => item.status !== value && update({ status: value }, `Demande marquée « ${label} »`)}
                    className={`rounded-full border px-3 py-1.5 text-sm ${item.status === value ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor={`notes-${item._id}`} className="mb-1.5 block text-sm font-semibold">Notes internes</label>
              <textarea
                id={`notes-${item._id}`}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
                placeholder="Rappelé le…, devis envoyé…"
              />
              <div className="mt-2 flex justify-between">
                <Button variant="ghost" disabled={notes === (item.notes || "")} onClick={() => update({ notes }, "Notes enregistrées")}>
                  Enregistrer les notes
                </Button>
                <Button variant="danger" onClick={remove}>Supprimer</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

function RequestsList() {
  const router = useRouter();
  const params = useSearchParams();
  const status = params.get("status") || "";
  const type = params.get("type") || "";
  const page = parseInt(params.get("page")) || 1;
  const [data, setData] = useState(null);

  const load = useCallback(() => {
    const qs = new URLSearchParams({ page: String(page) });
    if (status) qs.set("status", status);
    if (type) qs.set("type", type);
    setData(null);
    api(`/contact?${qs}`).then(setData).catch(() => setData({ Contacts: [], totalPages: 0, error: true }));
  }, [page, status, type]);

  useEffect(load, [load]);

  const setFilter = (key, value) => {
    const qs = new URLSearchParams(params);
    if (key !== "page") qs.delete("page");
    value ? qs.set(key, value) : qs.delete(key);
    router.push(`/admin/demandes?${qs}`);
  };

  const replace = (updated) => setData((d) => ({ ...d, Contacts: d.Contacts.map((c) => (c._id === updated._id ? updated : c)) }));
  const remove = (id) => setData((d) => ({ ...d, Contacts: d.Contacts.filter((c) => c._id !== id) }));

  const chip = (key, value, label, current) => (
    <button
      key={value || "all"}
      type="button"
      aria-pressed={current === value}
      onClick={() => setFilter(key, value)}
      className={`rounded-full border px-3 py-1.5 text-sm ${current === value ? "border-ink bg-ink text-paper" : "border-ink/20 bg-white hover:border-ink"}`}
    >
      {label}
    </button>
  );

  return (
    <>
      <PageHeader title="Demandes reçues" description="Les messages envoyés depuis les formulaires du site. Suivez chaque demande avec son statut et vos notes." />
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {chip("status", "", "Tous les statuts", status)}
          {Object.entries(STATUS_LABELS).map(([v, l]) => chip("status", v, l, status))}
        </div>
        <div className="flex flex-wrap gap-2">
          {chip("type", "", "Tous les besoins", type)}
          {Object.entries(NEED_LABELS).map(([v, l]) => chip("type", v, l, type))}
        </div>
      </div>
      {!data ? (
        <Loading />
      ) : data.Contacts.length ? (
        <ul className="space-y-3">
          {data.Contacts.map((item) => (
            <Request key={item._id} item={item} onChange={replace} onDelete={remove} />
          ))}
        </ul>
      ) : (
        <Empty>{data.error ? "Impossible de charger les demandes." : "Aucune demande ne correspond à ces filtres."}</Empty>
      )}
      {data?.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" disabled={page <= 1} onClick={() => setFilter("page", String(page - 1))}>Page précédente</Button>
          <span className="text-sm text-stone">Page {page} sur {data.totalPages}</span>
          <Button variant="ghost" disabled={page >= data.totalPages} onClick={() => setFilter("page", String(page + 1))}>Page suivante</Button>
        </div>
      )}
    </>
  );
}

export default function RequestsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RequestsList />
    </Suspense>
  );
}
