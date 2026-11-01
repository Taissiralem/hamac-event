import { notFound } from "next/navigation";

// Toute URL inconnue sous /fr ou /en affiche la page 404 du site
export default function CatchAll() {
  notFound();
}
