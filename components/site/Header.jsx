"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, routes } from "@/lib/i18n";

const NAV = ["home", "salons", "teamBuilding", "sortie", "about", "contact"];
// Pages qui commencent par une grande photo : l'en-tête est transparent par-dessus
const OVERLAY_PAGES = ["", routes.salons, routes.teamBuilding, routes.sortie, routes.about];

export default function Header({ locale, t }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const subpath = pathname.replace(/^\/(fr|en)/, "").replace(/^\//, "");
  const overlay = OVERLAY_PAGES.includes(subpath);
  const solid = !overlay || scrolled || open;
  const otherLocale = locale === "fr" ? "en" : "fr";
  const switchHref = `/${otherLocale}${subpath ? `/${subpath}` : ""}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (key) => {
    const r = routes[key];
    return r ? subpath === r || subpath.startsWith(`${r}/`) : subpath === "";
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-paper/95 text-ink shadow-[0_1px_0_rgb(27_58_75/0.08)] backdrop-blur" : "bg-transparent text-paper"
      }`}
    >
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        {t.nav.skip}
      </a>
      <div className="shell flex h-18 items-center justify-between gap-6 lg:h-20">
        <Link href={href(locale, "home")} className="flex items-center gap-3" aria-label="Hamac Events">
          <Image src="/brand/hamac-mark.png" alt="" width={40} height={40} priority className="size-9 lg:size-10" />
          <span className="display text-lg leading-none tracking-tight lg:text-xl">
            Hamac Events
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-medium">
            {NAV.map((key) => (
              <li key={key}>
                <Link
                  href={href(locale, key)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={`relative py-2 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-orange after:transition-transform ${
                    isActive(key) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            hrefLang={otherLocale}
            lang={otherLocale}
            className="hidden px-2 py-2 text-sm font-medium sm:block"
          >
            {otherLocale.toUpperCase()}
            <span className="sr-only"> — {t.nav.switchLang}</span>
          </Link>
          <Link href={href(locale, "contact")} className="btn btn-primary hidden !min-h-11 !px-5 !text-[0.95rem] md:inline-flex">
            {t.cta.quote}
          </Link>
          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="floorplan fixed inset-x-0 bottom-0 top-18 overflow-y-auto bg-ink text-paper xl:hidden"
      >
        <nav aria-label="Navigation mobile" className="shell flex min-h-full flex-col py-8">
          <ul className="flex flex-col">
            {[...NAV, "blog"].map((key) => (
              <li key={key} className="border-b border-paper/15">
                <Link
                  href={href(locale, key)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className="display flex items-center justify-between py-4 text-2xl"
                >
                  {t.nav[key]}
                  {isActive(key) && <span className="size-3 bg-orange" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Link href={href(locale, "contact")} className="btn btn-primary">
              {t.cta.quote}
            </Link>
            <Link href={switchHref} hrefLang={otherLocale} className="btn btn-ghost-light">
              {t.nav.switchLang}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
