"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { tr } from "@/lib/i18n";
import { loaderFor } from "@/lib/imageLoader";

// Mosaïque de réalisations + visionneuse plein écran (flèches du clavier, Échap pour fermer)
export default function Gallery({ items, locale, emptyText }) {
  const photos = items
    .filter((r) => r.images?.length)
    .map((r) => ({
      src: r.images[0],
      title: tr(r.title, locale),
      meta: [r.client, r.location, r.date].filter(Boolean).join(", "),
      description: tr(r.description, locale),
    }));
  const [index, setIndex] = useState(-1);
  const dialogRef = useRef(null);
  const en = locale === "en";

  const close = useCallback(() => setIndex(-1), []);
  const move = useCallback((d) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index >= 0 && !dialog.open) dialog.showModal();
    if (index < 0 && dialog.open) dialog.close();
  }, [index]);

  useEffect(() => {
    if (index < 0) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, move]);

  if (!photos.length) return <p className="text-stone">{emptyText}</p>;

  const current = photos[index];

  return (
    <>
      <ul className="grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[250px] md:grid-cols-4">
        {photos.map((p, i) => (
          <li key={i} className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block size-full overflow-hidden rounded-sm bg-mist text-left"
            >
              <Image
                src={p.src}
                loader={loaderFor(p.src)}
                alt={p.title}
                fill
                sizes={i % 5 === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-4 pt-12 text-paper">
                <span className="block font-semibold leading-snug">{p.title}</span>
                {p.meta && <span className="mt-0.5 block text-sm text-paper/75">{p.meta}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto max-h-[92vh] w-[min(1100px,94vw)] bg-night p-0 text-paper backdrop:bg-night/90"
      >
        {current && (
          <figure>
            <div className="relative aspect-[3/2] w-full">
              <Image src={current.src} loader={loaderFor(current.src)} alt={current.title} fill sizes="94vw" className="object-contain" />
            </div>
            <figcaption className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold">{current.title}</p>
                {current.meta && <p className="text-sm text-paper/70">{current.meta}</p>}
                {current.description && <p className="mt-2 max-w-2xl text-sm text-paper/80">{current.description}</p>}
              </div>
              <div className="flex shrink-0 gap-2">
                {photos.length > 1 && (
                  <>
                    <button type="button" onClick={() => move(-1)} className="btn btn-ghost-light !min-h-10 !px-4">
                      {en ? "Previous" : "Précédente"}
                    </button>
                    <button type="button" onClick={() => move(1)} className="btn btn-ghost-light !min-h-10 !px-4">
                      {en ? "Next" : "Suivante"}
                    </button>
                  </>
                )}
                <button type="button" onClick={close} className="btn btn-primary !min-h-10 !px-4">
                  {en ? "Close" : "Fermer"}
                </button>
              </div>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
