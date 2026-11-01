// Accès à l'API Express côté serveur (composants serveur Next).
// En cas d'API indisponible, les fonctions renvoient null et le site affiche le contenu par défaut.
const API_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const CONTENT_TAG = "content";

async function get(path, revalidate = 300) {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate, tags: [CONTENT_TAG] } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const fetchPageData = async (key) => (await get(`/pages/${key}`))?.data || {};

export const fetchPosts = async ({ category, limit = 9, page = 1 } = {}) => {
  const qs = new URLSearchParams({ limit: String(limit), page: String(page) });
  if (category) qs.set("category", category);
  return (await get(`/posts?${qs}`)) || { posts: [], totalPages: 0, currentPage: 1 };
};

export const fetchPost = (slug) => get(`/posts/slug/${encodeURIComponent(slug)}`);

export const fetchRealisations = async ({ category, featured, limit = 12 } = {}) => {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (category) qs.set("category", category);
  if (featured) qs.set("featured", "true");
  return (await get(`/realisations?${qs}`)) || [];
};

// category : "team-building" (inclut les anciens programmes sans catégorie), "sortie", ou vide pour tout ;
// l'API pagine par 9
export async function fetchSorties(category, page = 1) {
  const data = await get(`/tb/addSortie?category=${category || ""}&page=${page}`);
  return { sorties: data?.sorties || [], totalPages: data?.totalPages || 0 };
}
