"use client";

import { useRef } from "react";
import Photo from "@/components/site/Photo";

// Carte programme + fiche détaillée en fenêtre (second niveau de lecture)
export default function ProgrammeCard({ item: s, locale }) {
  const dialogRef = useRef(null);
  const en = locale === "en";
  const pick = (fr, enValue) => ((en && enValue?.trim()) || fr || "").trim();

  const title = pick(s.titleFr, s.titleEn);
  const desc = pick(s.descFr, s.descEn);
  const objective = pick(s.objectiveFr, s.objectiveEn);
  const audience = pick(s.audienceFr, s.audienceEn);
  const steps = pick(s.programmeFr, s.programmeEn).split("\n").map((l) => l.trim()).filter(Boolean);
  const meta = [
    [en ? "Duration" : "Durée", s.days?.trim()],
    [en ? "Participants" : "Participants", s.participants?.trim()],
    [en ? "Audience" : "Public", audience],
  ].filter(([, v]) => v);

  const close = () => dialogRef.current?.close();
  const L = {
    details: en ? "See details" : "Voir le détail",
    close: en ? "Close" : "Fermer",
    request: en ? "Request this programme" : "Demander ce programme",
    objective: en ? "Learning objective" : "Objectif pédagogique",
    programme: en ? "Indicative programme" : "Programme indicatif",
  };

  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-mist">
        <Photo src={s.images?.[0]} alt="" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
        {s.localisation && <p className="stand-tag absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate">{s.localisation}</p>}
      </div>
      <h3 className="h-card mt-5">{title}</h3>
      {meta.length > 0 && (
        <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {meta.slice(0, 2).map(([k, v]) => (
            <div key={k} className="flex gap-1.5">
              <dt className="text-stone">{k}</dt>
              <dd className="font-semibold text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      <p className="mt-3 line-clamp-3 text-stone">{desc}</p>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="link-underline mt-4 self-start font-semibold"
        aria-haspopup="dialog"
      >
        {L.details}
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label={title}
        className="m-auto max-h-[90dvh] w-[min(760px,94vw)] overflow-y-auto rounded-sm bg-paper p-0 text-ink backdrop:bg-night/80"
      >
        <div className="relative aspect-[16/8] bg-mist">
          <Photo src={s.images?.[0]} alt="" sizes="760px" />
        </div>
        <div className="p-6 sm:p-9">
          {s.localisation && <p className="text-sm font-semibold text-ink-soft">{s.localisation}</p>}
          <h2 className="display mt-1 text-2xl sm:text-3xl">{title}</h2>
          {meta.length > 0 && (
            <dl className="mt-5 grid gap-x-6 gap-y-3 border-y border-ink/15 py-4 text-sm sm:grid-cols-3">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-stone">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-5 whitespace-pre-line text-stone">{desc}</p>
          {objective && (
            <>
              <h3 className="h-card mt-7 !text-lg">{L.objective}</h3>
              <p className="mt-2 whitespace-pre-line text-stone">{objective}</p>
            </>
          )}
          {steps.length > 0 && (
            <>
              <h3 className="h-card mt-7 !text-lg">{L.programme}</h3>
              <ol className="mt-3 space-y-2">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-stone">
                    <span className="mt-2 size-2 shrink-0 bg-orange" aria-hidden="true" />
                    {step}
                  </li>
                ))}
              </ol>
            </>
          )}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#demande" onClick={close} className="btn btn-primary">
              {L.request}
            </a>
            <button type="button" onClick={close} className="btn btn-ghost-dark">
              {L.close}
            </button>
          </div>
        </div>
      </dialog>
    </article>
  );
}
