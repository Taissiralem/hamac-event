"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { href } from "@/lib/i18n";
import { collect, setAdsLeadTarget, trackContactClick } from "@/lib/track";
// Les ID viennent de l'admin : seuls ceux au format officiel sont injectés dans un script
import { cleanIds } from "@/lib/tracking";

const STORAGE_KEY = "hamac_consent"; // "granted" | "denied"
export const OPEN_CONSENT_EVENT = "hamac:open-consent";

function readConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function loadScript(src) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGoogle({ ga4, adsId, adsLeadLabel }) {
  const first = ga4 || adsId;
  if (!first || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  if (ga4) window.gtag("config", ga4);
  if (adsId) window.gtag("config", adsId);
  if (adsId && adsLeadLabel) setAdsLeadTarget(`${adsId}/${adsLeadLabel}`);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${first}`);
}

function loadMeta(pixelId) {
  if (!pixelId || window.fbq) return;
  const fbq = function fbq() {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = window._fbq = fbq;
  loadScript("https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", pixelId);
  fbq("track", "PageView");
}

export default function Analytics({ ids: rawIds, locale, t }) {
  const ids = cleanIds(rawIds);
  const enabled = Object.keys(ids).some((k) => k !== "adsLeadLabel");
  const [consent, setConsent] = useState("unknown"); // inconnu tant que le navigateur n'a pas répondu
  const pathname = usePathname();
  const firstPath = useRef(true);
  const L = t.cookies;

  useEffect(() => {
    setConsent(readConsent() || "ask");
    const reopen = () => setConsent("ask");
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Chargement des outils après accord
  useEffect(() => {
    if (!enabled || consent !== "granted") return;
    loadGoogle(ids);
    loadMeta(ids.metaPixel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, consent]);

  // Page vue : statistiques internes à chaque page ; pour Meta seulement lors de la navigation interne
  // (GA4 suit l'historique tout seul, le premier PageView Meta part à l'initialisation)
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      const q = new URLSearchParams(location.search);
      const utm = Object.fromEntries(
        ["source", "medium", "campaign"].map((k) => [k, q.get(`utm_${k}`)]).filter(([, v]) => v)
      );
      if (q.has("gclid")) utm.gclid = "1";
      if (q.has("fbclid")) utm.fbclid = "1";
      collect("pageview", { first: true, referrer: document.referrer, utm });
      return;
    }
    collect("pageview");
    window.fbq?.("track", "PageView");
  }, [pathname]);

  // Clics sur téléphone / e-mail, où qu'ils soient sur le site
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[href^='tel:'], a[href^='mailto:']");
      if (a) trackContactClick(a.getAttribute("href").startsWith("tel:") ? "phone" : "email");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function choose(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    // Retirer son accord demande de recharger la page pour décharger les scripts
    if (value === "denied" && (window.gtag || window.fbq)) window.location.reload();
    setConsent(value);
  }

  if (!enabled || consent !== "ask") return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.footer.cookies}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-sm bg-night p-5 text-paper shadow-2xl sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <p className="text-[0.95rem] leading-relaxed text-paper/90">
        {L.text}{" "}
        <Link href={href(locale, "legal")} className="underline underline-offset-2 hover:text-paper">
          {L.more}
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => choose("denied")} className="btn btn-ghost-light !min-h-11">
          {L.refuse}
        </button>
        <button type="button" onClick={() => choose("granted")} className="btn btn-primary !min-h-11">
          {L.accept}
        </button>
      </div>
    </div>
  );
}
