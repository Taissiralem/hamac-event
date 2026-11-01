"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, clearToken, getToken } from "@/lib/admin/api";
import { ToastProvider } from "./ui";

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/demandes", label: "Demandes reçues" },
  { href: "/admin/pages", label: "Pages du site" },
  { href: "/admin/realisations", label: "Réalisations" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/sorties", label: "Sorties pédagogiques" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/pages/settings", label: "Coordonnées et réseaux" },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname.startsWith("/admin/login");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isLogin) return;
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    api("/auth/me")
      .then((d) => setUser(d.user))
      .catch(() => {});
  }, [isLogin, router]);

  useEffect(() => setMenuOpen(false), [pathname]);

  if (isLogin) return <ToastProvider>{children}</ToastProvider>;
  if (!user) return <p className="p-10 text-center text-stone">Chargement…</p>;

  const active = (href) =>
    href === "/admin"
      ? pathname === "/admin"
      : pathname === href || (pathname.startsWith(`${href}/`) && !(href === "/admin/pages" && pathname === "/admin/pages/settings"));

  const logout = () => {
    clearToken();
    router.replace("/admin/login");
  };

  return (
    <ToastProvider>
      <div className="min-h-screen lg:flex">
        <aside
          className={`floorplan bg-ink text-paper lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col ${
            menuOpen ? "" : "max-lg:[&_nav]:hidden max-lg:[&_.side-foot]:hidden"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image src="/brand/hamac-mark.png" alt="" width={32} height={32} />
              <span className="font-bold [font-variation-settings:'wdth'_115]">Hamac Admin</span>
            </Link>
            <button type="button" className="rounded-lg border border-paper/25 px-3 py-1.5 text-sm lg:hidden" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
              Menu
            </button>
          </div>
          <nav aria-label="Administration" className="flex-1 overflow-y-auto px-3 pb-4">
            <ul className="space-y-0.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active(item.href) ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.95rem] transition-colors ${
                      active(item.href) ? "bg-paper font-semibold text-ink" : "text-paper/80 hover:bg-paper/10 hover:text-paper"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="side-foot border-t border-paper/15 px-5 py-4 text-sm">
            <p className="truncate text-paper/70">{user.email}</p>
            <div className="mt-3 flex gap-4">
              <a href="/fr" target="_blank" rel="noreferrer" className="underline decoration-orange underline-offset-4">
                Voir le site
              </a>
              <button type="button" onClick={logout} className="underline underline-offset-4">
                Se déconnecter
              </button>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
