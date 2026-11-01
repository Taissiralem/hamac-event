import { NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

// Redirige toute URL sans préfixe de langue vers la langue préférée (fr par défaut)
export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    // Transmet le chemin aux composants serveur (ex. page 404 dans la bonne langue)
    const headers = new Headers(request.headers);
    headers.set("x-pathname", pathname);
    return NextResponse.next({ request: { headers } });
  }
  const accept = request.headers.get("accept-language") || "";
  const preferred = accept.toLowerCase().startsWith("en") ? "en" : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|admin|_next|brand|favicon|robots.txt|sitemap.xml|.*\..*).*)"],
};
