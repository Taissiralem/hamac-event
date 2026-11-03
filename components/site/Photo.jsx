"use client"; // le loader (une fonction) ne peut pas venir d'un composant serveur

import Image from "next/image";
import { loaderFor } from "@/lib/imageLoader";

// Image optimisée qui remplit son conteneur (le parent doit être en position relative)
export default function Photo({ src, alt = "", sizes = "100vw", priority = false, className = "" }) {
  if (!src) return <div className={`absolute inset-0 bg-mist ${className}`} aria-hidden="true" />;
  return (
    <Image
      src={src}
      loader={loaderFor(src)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
