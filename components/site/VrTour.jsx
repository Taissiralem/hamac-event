"use client";

import { useState } from "react";
import Photo from "@/components/site/Photo";
import Icon from "@/components/site/Icon";

// Visite virtuelle (Matterport…) : l'iframe, lourde, n'est chargée qu'au clic
export default function VrTour({ url, cover, caption, locale }) {
  const [active, setActive] = useState(false);
  const en = locale === "en";
  const src = url + (url.includes("?") ? "&" : "?") + "play=1";

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-night sm:aspect-video">
        {active ? (
          <iframe
            src={src}
            title={caption || (en ? "Virtual tour" : "Visite virtuelle")}
            className="absolute inset-0 size-full"
            allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 flex items-center justify-center text-paper"
          >
            <Photo src={cover} alt="" sizes="(min-width: 1024px) 60vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
            <span className="absolute inset-0 bg-night/45 transition-colors group-hover:bg-night/30" aria-hidden="true" />
            <span className="btn btn-primary relative gap-3 shadow-lg">
              <Icon name="vr" className="size-6" />
              {en ? "Start the virtual tour" : "Lancer la visite virtuelle"}
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm">
        {caption && <span className="text-paper/75">{caption}</span>}
        <a href={url} target="_blank" rel="noopener" className="link-underline font-semibold">
          {en ? "Open full screen" : "Ouvrir en plein écran"}
          <span className="sr-only"> {en ? "(new tab)" : "(nouvel onglet)"}</span>
        </a>
      </figcaption>
    </figure>
  );
}
