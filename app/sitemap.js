import { locales, routes } from "@/lib/i18n";
import { fetchPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap() {
  const pages = ["home", "salons", "teamBuilding", "sortie", "about", "contact", "blog"];
  const priority = { home: 1, salons: 0.9 };
  const entries = pages.flatMap((key) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${routes[key] ? `/${routes[key]}` : ""}`,
      changeFrequency: "monthly",
      priority: priority[key] || 0.7,
    }))
  );
  const { posts } = await fetchPosts({ limit: 50 });
  for (const post of posts) {
    for (const l of locales) {
      entries.push({
        url: `${SITE_URL}/${l}/${routes.blog}/${post.slug}`,
        lastModified: post.updatedAt,
        priority: 0.6,
      });
    }
  }
  return entries;
}
