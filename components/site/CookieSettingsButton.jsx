"use client";

import { OPEN_CONSENT_EVENT } from "@/components/site/Analytics";

// Rouvre le bandeau cookies (lien du pied de page)
export default function CookieSettingsButton({ label }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} className="text-left hover:text-paper">
      {label}
    </button>
  );
}
