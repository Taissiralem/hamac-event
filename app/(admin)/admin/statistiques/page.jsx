"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/admin/api";
import { routes } from "@/lib/i18n";
import { BarChart, RankTable } from "@/components/admin/charts";
import { Card, Loading, PageHeader } from "@/components/admin/ui";
import { NEED_LABELS } from "@/components/admin/labels";

const PERIODS = [
  { days: 7, label: "7 jours" },
  { days: 30, label: "30 jours" },
  { days: 90, label: "3 mois" },
  { days: 365, label: "12 mois" },
];

const INK = "#1b3a4b";
const ORANGE = "#c95e1a";
const fmt = new Intl.NumberFormat("fr-FR");

const PAGE_NAMES = {
  [routes.home]: "Accueil",
  [routes.salons]: "Salons professionnels",
  [routes.teamBuilding]: "Team Building",
  [routes.sortie]: "Sortie pédagogique",
  [routes.about]: "À propos",
  [routes.contact]: "Contact",
  [routes.blog]: "Blog",
  [routes.legal]: "Mentions légales",
};
function pageName(path) {
  const [, locale = "", first = "", ...rest] = path.split("/");
  const lang = locale ? ` (${locale.toUpperCase()})` : "";
  if (first === routes.blog && rest.length) return `Article : ${rest.join("/").replace(/-/g, " ")}${lang}`;
  return (PAGE_NAMES[first] ?? path) + lang;
}
const DEVICES = { desktop: "Ordinateur", mobile: "Mobile", tablet: "Tablette" };
const LOCALES = { fr: "Français", en: "Anglais" };

const dayLabel = (iso, opts) => new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", ...opts }).format(new Date(`${iso}T00:00:00Z`));

// Au-delà de 3 mois, les jours sont regroupés par semaine
function series(daily, key, days) {
  if (days <= 90) {
    return daily.map((d) => ({
      label: dayLabel(d.day, { weekday: "short", day: "numeric", month: "short" }),
      short: dayLabel(d.day, { day: "numeric", month: "short" }),
      value: d[key],
    }));
  }
  const weeks = [];
  daily.forEach((d, i) => {
    if (i % 7 === 0) weeks.push({ from: d.day, value: 0 });
    weeks[weeks.length - 1].value += d[key];
    weeks[weeks.length - 1].to = d.day;
  });
  return weeks.map((w) => ({
    label: `Semaine du ${dayLabel(w.from, { day: "numeric", month: "short" })}`,
    short: dayLabel(w.from, { month: "short" }),
    value: w.value,
  }));
}

function Change({ value, suffix = "" }) {
  if (value === null || value === undefined) return <span className="text-xs text-stone">Pas de comparaison</span>;
  const up = value > 0;
  const flat = value === 0;
  return (
    <span className={`text-xs font-semibold ${flat ? "text-stone" : up ? "text-[#1f5a2c]" : "text-[#8a3409]"}`}>
      <span aria-hidden="true">{flat ? "=" : up ? "▲" : "▼"}</span> {up ? "+" : ""}
      {fmt.format(value)} %{suffix}
      <span className="font-normal text-stone"> vs période précédente</span>
    </span>
  );
}

function Kpi({ label, value, change, hint, accent }) {
  return (
    <li className={`rounded-xl border p-5 ${accent ? "border-orange bg-orange/10" : "border-ink/10 bg-white"}`}>
      <span className="block text-sm text-stone">{label}</span>
      <span className="mt-1 block text-3xl font-bold tabular-nums">{value}</span>
      <span className="mt-2 block">{change}</span>
      {hint && <span className="mt-1 block text-xs text-stone">{hint}</span>}
    </li>
  );
}

export default function StatsPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setData(null);
    setError("");
    api(`/stats/summary?days=${days}`)
      .then(setData)
      .catch((e) => setError(e.message));
  }, [days]);

  const t = data?.totals;
  const c = data?.changes || {};
  const rows = (list, name = (k) => k) => (list || []).map((r) => ({ key: r.key || "—", name: name(r.key || "—"), value: r.count, second: r.visitors }));

  return (
    <>
      <PageHeader
        title="Statistiques"
        description="Fréquentation du site et demandes reçues. Mesure interne, anonyme et sans cookie : tous les visiteurs sont comptés, y compris ceux qui refusent les cookies."
        actions={
          <Link href="/admin/mesure" className="inline-flex min-h-10 items-center rounded-lg border border-ink/20 px-4 text-sm font-semibold hover:border-ink">
            Outils de mesure
          </Link>
        }
      />

      {/* Période : un seul groupe de filtres au-dessus des graphiques */}
      <div role="group" aria-label="Période" className="mb-6 inline-flex flex-wrap rounded-lg border border-ink/15 bg-white p-1">
        {PERIODS.map((p) => (
          <button
            key={p.days}
            type="button"
            aria-pressed={days === p.days}
            onClick={() => setDays(p.days)}
            className={`min-h-9 rounded-md px-4 text-sm font-semibold ${days === p.days ? "bg-ink text-paper" : "text-ink hover:bg-sand"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {error && <p className="text-[#8a3409]">{error}</p>}
      {!data && !error && <Loading />}

      {data && (
        <>
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi label="Visiteurs" value={fmt.format(t.visitors)} change={<Change value={c.visitors} />} hint="Personnes distinctes par jour, additionnées" />
            <Kpi label="Pages vues" value={fmt.format(t.pageviews)} change={<Change value={c.pageviews} />} hint={t.visitors ? `${fmt.format(Math.round((t.pageviews / t.visitors) * 10) / 10)} pages par visiteur` : null} />
            <Kpi label="Demandes reçues" value={fmt.format(t.leads)} change={<Change value={c.leads} />} accent={t.leads > 0} hint="Formulaires envoyés" />
            <Kpi label="Taux de conversion" value={`${fmt.format(t.conversionRate)} %`} change={<Change value={c.conversionRate} />} hint="Demandes ÷ visiteurs" />
          </ul>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            <Kpi label="Clics sur le téléphone" value={fmt.format(t.calls)} change={<Change value={c.calls} />} />
            <Kpi label="Clics sur l'e-mail" value={fmt.format(t.emails)} change={<Change value={c.emails} />} />
            <Kpi label="Visites virtuelles lancées" value={fmt.format(t.vr)} change={<Change value={c.vr} />} hint="Module VR de la page Salons" />
          </ul>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <Card title={days > 90 ? "Visiteurs par semaine" : "Visiteurs par jour"}>
              <BarChart points={series(data.daily, "visitors", days)} color={INK} unit="visiteurs" />
            </Card>
            <Card title={days > 90 ? "Demandes reçues par semaine" : "Demandes reçues par jour"}>
              <BarChart points={series(data.daily, "leads", days)} color={ORANGE} unit="demandes" />
            </Card>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <Card title="Pages les plus vues">
              <RankTable rows={rows(data.pages, pageName)} label="Page" secondLabel="Visiteurs" />
            </Card>
            <Card title="Provenance des visiteurs" help="Site ou réseau d'où arrivent les visiteurs. Les campagnes avec paramètres utm apparaissent sous leur source.">
              <RankTable rows={rows(data.sources)} label="Source" valueLabel="Arrivées" />
            </Card>
            <Card title="Demandes par type de besoin">
              <RankTable rows={rows(data.leadsByType, (k) => NEED_LABELS[k] || k)} label="Besoin" valueLabel="Demandes" color={ORANGE} empty="Aucune demande sur la période." />
            </Card>
            <Card title="Demandes par source" help="Provenance du visiteur qui a envoyé le formulaire (même jour).">
              <RankTable rows={rows(data.leadsBySource)} label="Source" valueLabel="Demandes" color={ORANGE} empty="Aucune demande mesurée sur la période." />
            </Card>
            <Card title="Campagnes" help="Liens publicitaires portant un paramètre utm_campaign (ex. ?utm_source=facebook&utm_campaign=salon-novembre).">
              <RankTable rows={rows(data.campaigns)} label="Campagne" valueLabel="Arrivées" empty="Aucune campagne sur la période." />
            </Card>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <Card title="Appareils">
                <RankTable rows={rows(data.devices, (k) => DEVICES[k] || k)} label="Appareil" />
              </Card>
              <Card title="Langue consultée">
                <RankTable rows={rows(data.locales, (k) => LOCALES[k] || k)} label="Langue" />
              </Card>
            </div>
          </div>

          <p className="mt-6 text-xs text-stone">
            Données anonymes conservées 13 mois. Les visites faites depuis un navigateur connecté à l&apos;admin et celles des robots ne sont pas comptées.
            Pour des analyses plus poussées (parcours, audiences publicitaires), utilisez Google Analytics et Meta, configurables dans{" "}
            <Link href="/admin/mesure" className="underline decoration-orange underline-offset-4">Outils de mesure</Link>.
          </p>
        </>
      )}
    </>
  );
}
