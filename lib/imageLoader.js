// Redimensionnement des photos par leur CDN d'origine plutôt que par notre serveur (1 cœur) :
// Unsplash et Cloudinary livrent directement la bonne taille au bon format (WebP / AVIF).
// Pour les autres images, on garde l'optimiseur de Next (pas de loader).

function unsplashLoader({ src, width, quality }) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality || 70));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", url.searchParams.get("fit") || "crop");
  return url.toString();
}

// https://res.cloudinary.com/<compte>/image/upload/<...> -> transformation insérée après /upload/
function cloudinaryLoader({ src, width, quality }) {
  return src.replace("/upload/", `/upload/f_auto,q_${quality || "auto"},c_limit,w_${width}/`);
}

export function loaderFor(src) {
  if (typeof src !== "string") return undefined;
  if (src.startsWith("https://images.unsplash.com/")) return unsplashLoader;
  if (src.startsWith("https://res.cloudinary.com/") && src.includes("/upload/") && !/\/upload\/[^/]*w_\d+/.test(src)) return cloudinaryLoader;
  return undefined;
}
