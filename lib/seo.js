import { locales, routes, tr } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

// Métadonnées d'une page : titre, description, URL canonique et alternatives FR/EN
export function buildMetadata({ locale, routeKey, extra = "", title, description, image }) {
  const path = (l) => `/${l}${routes[routeKey] ? `/${routes[routeKey]}` : ""}${extra}`;
  const t = tr(title, locale);
  const d = tr(description, locale);
  return {
    title: { absolute: t },
    description: d,
    alternates: {
      canonical: path(locale),
      languages: Object.fromEntries([...locales.map((l) => [l, path(l)]), ["x-default", path("fr")]]),
    },
    openGraph: {
      type: "website",
      siteName: "Hamac Events",
      locale: locale === "en" ? "en_GB" : "fr_DZ",
      url: `${SITE_URL}${path(locale)}`,
      title: t,
      description: d,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}
