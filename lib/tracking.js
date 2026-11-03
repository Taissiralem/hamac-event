// Identifiants des outils de mesure (Admin > Outils de mesure) et leur format officiel.
// Le site n'injecte un ID dans un script que s'il respecte ce format.

export const TRACKING_FIELDS = {
  ga4: { test: (v) => /^G-[A-Z0-9]{4,}$/.test(v), example: "G-AB12CD34EF" },
  adsId: { test: (v) => /^AW-\d{5,}$/.test(v), example: "AW-123456789" },
  adsLeadLabel: { test: (v) => /^[\w-]{4,}$/.test(v), example: "AbCdEfGhIjKlMn_1" },
  metaPixel: { test: (v) => /^\d{8,20}$/.test(v), example: "123456789012345" },
};

export const isValidId = (key, value) => TRACKING_FIELDS[key].test(String(value || "").trim());

// Ne garde que les ID valides
export function cleanIds(raw = {}) {
  const out = {};
  for (const key of Object.keys(TRACKING_FIELDS)) {
    const v = String(raw[key] || "").trim();
    if (v && isValidId(key, v)) out[key] = v;
  }
  return out;
}
