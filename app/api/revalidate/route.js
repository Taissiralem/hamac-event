import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/api";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Appelé par l'admin après chaque enregistrement : vide le cache pour afficher le nouveau contenu.
// Le token admin est vérifié auprès de l'API avant d'agir.
export async function POST(request) {
  const auth = request.headers.get("authorization") || "";
  const check = await fetch(`${API_URL}/auth/me`, { headers: { authorization: auth }, cache: "no-store" }).catch(() => null);
  if (!check?.ok) return Response.json({ error: "Unauthorized" }, { status: 401 });
  revalidateTag(CONTENT_TAG);
  return Response.json({ revalidated: true });
}
