export const locales = ["fr", "en"];
export const defaultLocale = "fr";

export const routes = {
  home: "",
  salons: "salons-professionnels",
  teamBuilding: "team-building",
  sortie: "sortie-pedagogique",
  about: "a-propos",
  contact: "contact",
  blog: "blog",
  legal: "mentions-legales",
};

export const isLocale = (value) => locales.includes(value);

export const href = (locale, key, extra = "") =>
  `/${locale}${routes[key] ? `/${routes[key]}` : ""}${extra}`;

// Valeur bilingue { fr, en } -> texte dans la langue demandée (repli sur le français)
export const tr = (value, locale) => {
  if (value && typeof value === "object") return value[locale] || value.fr || "";
  return value ?? "";
};
