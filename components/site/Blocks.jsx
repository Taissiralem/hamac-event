import Link from "next/link";
import { href, tr } from "@/lib/i18n";
import Photo from "./Photo";
import Icon from "./Icon";
import Paragraphs from "./Paragraphs";

// Bandeau photo plein écran, utilisé en tête des pages de services
export function PhotoHero({ locale, t, title, text, image, caption, primary, secondary, tall = false }) {
  return (
    <section className={`relative isolate flex items-end overflow-hidden bg-night text-paper ${tall ? "min-h-[100svh]" : "min-h-[82svh]"}`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Photo src={image} alt="" priority className="hero-img" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_36_47/0.6)_0%,rgb(16_36_47/0.2)_32%,rgb(16_36_47/0.9)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(16_36_47/0.7)_0%,rgb(16_36_47/0.25)_55%,transparent_80%)]" />
      </div>
      <div className="shell w-full pb-14 pt-32 lg:pb-20">
        <div className="hero-in max-w-4xl">
          <h1 className="display h-hero">{title}</h1>
          {text && <p className="lead mt-6 max-w-2xl text-paper/85">{text}</p>}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={primary?.href || href(locale, "contact")} className="btn btn-primary">
              {primary?.label || t.cta.project}
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn btn-ghost-light">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
        {caption && (
          <p className="stand-tag mt-12 hidden md:inline-flex lg:absolute lg:bottom-20 lg:right-12 lg:mt-0">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}

// En-tête sobre pour les pages sans photo (contact, blog…)
export function PlainHero({ title, text, children }) {
  return (
    <section className="floorplan-light border-b border-ink/10 pb-14 pt-36 lg:pb-20 lg:pt-44">
      <div className="shell">
        <div className="hero-in max-w-3xl">
          <h1 className="display h-hero">{title}</h1>
          {text && <p className="lead mt-6 text-stone">{text}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, text, light = false, className = "" }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 className="display h-section">{title}</h2>
      {text && <p className={`lead mt-5 ${light ? "text-paper/75" : "text-stone"}`}>{text}</p>}
    </div>
  );
}

// Liste de points avec repère orange carré
export function Checklist({ items, locale, light = false }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5">
          <span className="mt-[0.55em] size-2.5 shrink-0 bg-orange" aria-hidden="true" />
          <span className={light ? "text-paper/90" : ""}>{tr(item.text, locale)}</span>
        </li>
      ))}
    </ul>
  );
}

// Texte + image côte à côte
export function SplitFeature({ locale, title, text, image, reverse = false, children }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`relative aspect-[4/3] overflow-hidden rounded-sm lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
        <Photo src={image} alt="" sizes="(min-width: 1024px) 45vw, 100vw" />
      </div>
      <div className="lg:col-span-6">
        <h2 className="display h-section">{title}</h2>
        <div className="lead mt-6 text-stone">
          <Paragraphs text={text} />
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}

// Étapes réellement séquentielles : numérotation justifiée
export function Steps({ steps, locale }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-sm bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={i} className="flex flex-col bg-paper p-7 lg:p-8">
          <span className="display text-5xl text-ink/20" aria-hidden="true">
            {i + 1}
          </span>
          <h3 className="h-card mt-6">{tr(step.title, locale)}</h3>
          <p className="mt-3 text-stone">{tr(step.text, locale)}</p>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ title, items, locale }) {
  if (!items?.length) return null;
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h2 className="display h-section">{title}</h2>
      </div>
      <div className="divide-y divide-ink/15 border-y border-ink/15 lg:col-span-8">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {tr(item.question, locale)}
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/25 transition-transform group-open:rotate-45 group-open:border-orange group-open:bg-orange">
                <Icon name="plus" className="size-4" strokeWidth={2} />
              </span>
            </summary>
            <div className="max-w-2xl pb-7 pr-12 text-stone">
              <Paragraphs text={tr(item.answer, locale)} />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

// Bandeau final d'appel à l'action
export function CtaBand({ locale, t, title, text, image, secondary }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Photo src={image} alt="" />
          <div className="absolute inset-0 bg-ink/85" />
        </div>
      ) : (
        <div className="floorplan absolute inset-0 -z-10" aria-hidden="true" />
      )}
      <div className="shell section grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 className="display h-section">{title}</h2>
          {text && <p className="lead mt-5 max-w-2xl text-paper/80">{text}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
          <Link href={href(locale, "contact")} className="btn btn-primary">
            {t.cta.project}
          </Link>
          {secondary}
        </div>
      </div>
    </section>
  );
}

// Carte de service cliquable (image + titre + texte)
export function LinkCard({ href: to, image, title, text, cta, sizes = "(min-width: 1024px) 30vw, 100vw" }) {
  return (
    <Link href={to} className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist">
        <Photo src={image} alt="" sizes={sizes} className="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <h3 className="h-card mt-5 group-hover:underline group-hover:decoration-orange group-hover:decoration-2 group-hover:underline-offset-4">{title}</h3>
      {text && <p className="mt-2 text-stone">{text}</p>}
      {cta && <span className="mt-4 text-sm font-semibold">{cta}</span>}
    </Link>
  );
}
