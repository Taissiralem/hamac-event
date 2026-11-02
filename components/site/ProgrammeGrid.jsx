import Link from "next/link";
import ProgrammeCard from "@/components/site/ProgrammeCard";

// Programmes gérés dans l'admin (onglet Programmes), 9 par page via ?page=.
export default function ProgrammeGrid({ items, locale, t, basePath, page = 1, totalPages = 1, anchor = "programmes" }) {
  const linkFor = (p) => `${basePath}${p > 1 ? `?page=${p}` : ""}#${anchor}`;

  return (
    <>
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <ProgrammeCard key={s._id} item={s} locale={locale} />
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
