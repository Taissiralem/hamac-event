import Link from "next/link";
import Photo from "@/components/site/Photo";

// Programmes gérés dans l'admin (onglet Programmes), 9 par page via ?page=.
// La durée est un texte libre (« 2 à 3 heures »).
export default function ProgrammeGrid({ items, locale, t, basePath, page = 1, totalPages = 1, anchor = "programmes" }) {
  const en = locale === "en";
  const linkFor = (p) => `${basePath}${p > 1 ? `?page=${p}` : ""}#${anchor}`;

  return (
    <>
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <article key={s._id} className="flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-mist">
              <Photo src={s.images?.[0]} alt="" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
              {s.localisation && <p className="stand-tag absolute bottom-3 left-3">{s.localisation}</p>}
            </div>
            <h3 className="h-card mt-5">{en ? s.titleEn || s.titleFr : s.titleFr}</h3>
            {s.days?.trim() && <p className="mt-1 text-sm font-semibold text-ink-soft">{s.days.trim()}</p>}
            <p className="mt-2 line-clamp-4 text-stone">{en ? s.descEn || s.descFr : s.descFr}</p>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-14 flex items-center justify-between border-t border-ink/15 pt-8" aria-label="Pagination">
          {page > 1 ? (
            <Link href={linkFor(page - 1)} className="link-underline font-semibold">
              {t.blog.previous}
            </Link>
          ) : (
            <span />
          )}
          <span className="text-sm text-stone">
            {page} / {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={linkFor(page + 1)} className="link-underline font-semibold">
              {t.blog.next}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
