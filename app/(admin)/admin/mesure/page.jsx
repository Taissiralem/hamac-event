"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, refreshSite } from "@/lib/admin/api";
import { TRACKING_FIELDS, isValidId } from "@/lib/tracking";
import { Button, Card, Loading, PageHeader, TextInput, useToast } from "@/components/admin/ui";

// Les ID sont stockés dans le contenu « settings » (section tracking)
const TOOLS = [
  {
    title: "Google Analytics 4",
    text: "Fréquentation détaillée, parcours des visiteurs, événements. Où trouver l'ID : Analytics > Administration > Flux de données > votre site.",
    link: { href: "https://analytics.google.com/", label: "Ouvrir Google Analytics" },
    fields: [{ key: "ga4", label: "ID de mesure" }],
  },
  {
    title: "Google Ads",
    text: "Suivi des conversions de vos campagnes Google. Créez une conversion « Envoi de formulaire » (configuration manuelle) : Google fournit l'ID du compte et un libellé.",
    link: { href: "https://ads.google.com/aw/conversions", label: "Ouvrir les conversions Google Ads" },
    fields: [
      { key: "adsId", label: "ID du compte (AW-…)" },
      { key: "adsLeadLabel", label: "Libellé de la conversion « Demande de devis »" },
    ],
  },
  {
    title: "Meta Pixel (Facebook / Instagram)",
    text: "Mesure et optimisation des publicités Meta. Où trouver l'ID : Meta Events Manager > Sources de données > votre Pixel.",
    link: { href: "https://business.facebook.com/events_manager2", label: "Ouvrir Meta Events Manager" },
    fields: [{ key: "metaPixel", label: "ID du Pixel" }],
  },
];

const EVENTS = [
  ["Demande envoyée (formulaire)", "generate_lead + conversion", "Lead"],
  ["Clic sur le téléphone", "click_to_call", "Contact"],
  ["Clic sur l'e-mail", "click_email", "Contact"],
  ["Lancement de la visite VR", "vr_tour_start", "vr_tour_start"],
];

function Status({ value, fieldKey }) {
  const v = String(value || "").trim();
  if (!v) return <span className="rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-stone">Non configuré</span>;
  if (!isValidId(fieldKey, v))
    return <span className="rounded-full bg-[#fbe9e0] px-2.5 py-1 text-xs font-semibold text-[#8a3409]">Format incorrect</span>;
  return <span className="rounded-full bg-[#e3f1e6] px-2.5 py-1 text-xs font-semibold text-[#1f5a2c]">Actif</span>;
}

export default function TrackingSettings() {
  const toast = useToast();
  const [page, setPage] = useState(null); // contenu « settings » complet, pour ne rien écraser
  const [ids, setIds] = useState(null);
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/pages/settings")
      .then(({ data }) => {
        const tracking = Object.fromEntries(Object.keys(TRACKING_FIELDS).map((k) => [k, data?.tracking?.[k] || ""]));
        setPage(data || {});
        setIds(tracking);
        setSaved(JSON.stringify(tracking));
      })
      .catch((e) => toast(e.message, "error"));
  }, [toast]);

  if (!ids) return <Loading />;
  const dirty = JSON.stringify(ids) !== saved;
  const invalid = Object.entries(ids).filter(([k, v]) => v.trim() && !isValidId(k, v));

  async function save() {
    if (invalid.length) return toast("Corrigez les identifiants au format incorrect avant d'enregistrer.", "error");
    setBusy(true);
    try {
      const tracking = Object.fromEntries(Object.entries(ids).map(([k, v]) => [k, v.trim()]));
      // Relire juste avant d'écrire, au cas où les coordonnées auraient été modifiées entre-temps
      const { data } = await api("/pages/settings");
      await api("/pages/settings", { method: "PUT", body: { data: { ...(data || page), tracking } } });
      await refreshSite();
      setIds(tracking);
      setSaved(JSON.stringify(tracking));
      toast("Outils de mesure enregistrés et actifs sur le site");
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Outils de mesure"
        description="Identifiants Google Analytics, Google Ads et Meta. Un champ vide désactive l'outil. Ces outils ne se chargent qu'après l'accord du visiteur (bandeau cookies)."
        actions={
          <Link href="/admin/statistiques" className="inline-flex min-h-10 items-center rounded-lg border border-ink/20 px-4 text-sm font-semibold hover:border-ink">
            Voir les statistiques
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {TOOLS.map((tool) => (
          <Card key={tool.title} title={tool.title} help={tool.text}>
            <div className="space-y-5">
              {tool.fields.map((f) => (
                <div key={f.key}>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{f.label}</span>
                    <Status value={ids[f.key]} fieldKey={f.key} />
                  </div>
                  <TextInput
                    aria-label={f.label}
                    value={ids[f.key]}
                    onChange={(v) => setIds((x) => ({ ...x, [f.key]: v }))}
                    placeholder={`ex. ${TRACKING_FIELDS[f.key].example}`}
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              ))}
              <a href={tool.link.href} target="_blank" rel="noreferrer" className="inline-block text-sm font-semibold underline decoration-orange underline-offset-4">
                {tool.link.label}
              </a>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Ce qui est mesuré" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-stone">
              <tr className="border-b border-ink/10">
                <th className="py-2 pr-4 font-semibold">Action du visiteur</th>
                <th className="py-2 pr-4 font-semibold">Google (GA4 / Ads)</th>
                <th className="py-2 font-semibold">Meta</th>
              </tr>
            </thead>
            <tbody>
              {EVENTS.map(([action, google, meta]) => (
                <tr key={action} className="border-b border-ink/5">
                  <td className="py-2.5 pr-4">{action}</td>
                  <td className="py-2.5 pr-4 font-mono text-xs">{google}</td>
                  <td className="py-2.5 font-mono text-xs">{meta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-stone">
          Les pages vues sont aussi comptées. Indépendamment de ces outils, le site tient ses propres statistiques anonymes (sans cookie), visibles dans
          l&apos;onglet Statistiques. Les visites faites depuis un navigateur connecté à l&apos;admin ne sont pas comptées.
        </p>
      </Card>

      <div className="sticky bottom-0 z-20 -mx-4 mt-8 flex items-center justify-between gap-4 border-t border-ink/10 bg-[#f3f1ec]/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <p className="text-sm text-stone">{dirty ? "Modifications non enregistrées" : "Tout est enregistré"}</p>
        <Button variant="accent" onClick={save} disabled={busy || !dirty}>
          {busy ? "Enregistrement…" : "Enregistrer et activer"}
        </Button>
      </div>
    </>
  );
}
