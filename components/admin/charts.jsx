"use client";

import { useState } from "react";

const fmt = new Intl.NumberFormat("fr-FR");

// Histogramme d'une seule série (une couleur, pas de légende : le titre la nomme).
// points : [{ label, value, detail? }] ; color : couleur des barres
export function BarChart({ points, color, unit, height = 180 }) {
  const [hover, setHover] = useState(null);
  const max = Math.max(1, ...points.map((p) => p.value));
  // Graduations entières uniquement (pas de « 1, 1, 0 » pour de petites valeurs)
  const ticks = max >= 2 ? [max, Math.round(max / 2), 0] : [max, 0];
  const current = hover !== null ? points[hover] : null;
  const labelEvery = Math.ceil(points.length / 6);

  return (
    <figure>
      <div className="flex gap-3">
        {/* Axe vertical discret */}
        <div className="flex flex-col justify-between text-right text-xs tabular-nums text-stone" style={{ height }} aria-hidden="true">
          {ticks.map((t, i) => (
            <span key={i} className="leading-none">{fmt.format(t)}</span>
          ))}
        </div>
        <div className="relative min-w-0 flex-1">
          {/* Grille */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col justify-between" style={{ height }} aria-hidden="true">
            {ticks.map((_, i) => (
              <span key={i} className={`block h-px ${i === ticks.length - 1 ? "bg-ink/30" : "bg-ink/[0.07]"}`} />
            ))}
          </div>
          <div className="relative flex items-end gap-[2px]" style={{ height }} onMouseLeave={() => setHover(null)}>
            {points.map((p, i) => (
              <div
                key={p.label}
                className="flex h-full min-w-0 flex-1 cursor-default items-end"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                aria-label={`${p.label} : ${fmt.format(p.value)} ${unit}`}
              >
                <div
                  className="w-full rounded-t-[4px] transition-opacity"
                  style={{
                    height: p.value ? `max(2px, ${(p.value / max) * 100}%)` : 0,
                    background: color,
                    opacity: hover === null || hover === i ? 1 : 0.35,
                  }}
                />
              </div>
            ))}
            {current && (
              <div
                className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-night px-3 py-2 text-xs text-paper shadow-lg"
                style={{ left: `${((hover + 0.5) / points.length) * 100}%` }}
              >
                <span className="block font-semibold">{current.label}</span>
                <span className="block tabular-nums">
                  {fmt.format(current.value)} {unit}
                </span>
                {current.detail && <span className="block text-paper/70">{current.detail}</span>}
              </div>
            )}
          </div>
          <div className="mt-2 flex text-xs text-stone" aria-hidden="true">
            {points.map((p, i) => (
              <span key={p.label} className="min-w-0 flex-1 overflow-visible whitespace-nowrap">
                {i % labelEvery === 0 ? p.short || p.label : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Version tableau pour les lecteurs d'écran */}
      <table className="sr-only">
        <tbody>
          {points.map((p) => (
            <tr key={p.label}>
              <th>{p.label}</th>
              <td>
                {p.value} {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

// Tableau classé avec barre de proportion (une seule couleur)
export function RankTable({ rows, label, valueLabel = "Vues", secondLabel, color = "#1b3a4b", empty = "Pas encore de données." }) {
  if (!rows?.length) return <p className="text-sm text-stone">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.value));
  const total = rows.reduce((s, r) => s + r.value, 0);
  return (
    <table className="w-full table-fixed text-sm">
      <thead className="text-xs text-stone">
        <tr>
          <th className="pb-2 text-left font-semibold">{label}</th>
          {secondLabel && <th className="w-20 pb-2 text-right font-semibold">{secondLabel}</th>}
          <th className="w-24 pb-2 text-right font-semibold">{valueLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.key} className="border-t border-ink/5">
            <td className="py-2 pr-3">
              <span className="block truncate" title={r.name}>{r.name}</span>
              <span className="mt-1 block h-1.5 rounded-full bg-ink/[0.06]">
                <span className="block h-full rounded-full" style={{ width: `${(r.value / max) * 100}%`, background: color }} />
              </span>
            </td>
            {secondLabel && <td className="py-2 text-right tabular-nums text-stone">{fmt.format(r.second)}</td>}
            <td className="py-2 text-right tabular-nums">
              <span className="font-semibold">{fmt.format(r.value)}</span>
              <span className="ml-1.5 text-xs text-stone">{Math.round((r.value / total) * 100)} %</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
