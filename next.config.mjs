/** @type {import('next').NextConfig} */

import path from "node:path";
import { fileURLToPath } from "node:url";

// Domaine de l'API (images uploadées en mode local) déduit de NEXT_PUBLIC_API_URL
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1");

const nextConfig = {
  output: "standalone",
  // Racine fixée : un package-lock.json dans un dossier parent (ex. /var/www) décalerait server.js
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  poweredByHeader: false,
  images: {
    // Photos Unsplash / Cloudinary : redimensionnées par leur CDN (lib/imageLoader.js).
    // Pour le reste, le serveur (1 cœur) produit du WebP : l'AVIF prenait ~7 s par image.
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [48, 96, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "my.matterport.com", pathname: "/api/**" },
      {
        protocol: apiUrl.protocol.replace(":", ""),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/uploads/**",
      },
    ],
  },
  async redirects() {
    // Anciennes URL du site -> nouvelles pages (préserve le référencement)
    return [
      { source: "/services/custom-stands", destination: "/fr/salons-professionnels", permanent: true },
      { source: "/services/team-building", destination: "/fr/team-building", permanent: true },
      { source: "/services/global-support", destination: "/fr/salons-professionnels", permanent: true },
      { source: "/auth/signin", destination: "/admin/login", permanent: true },
    ];
  },
};

export default nextConfig;
