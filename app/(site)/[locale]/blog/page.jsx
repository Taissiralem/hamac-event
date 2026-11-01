import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content/get";
import { fetchPosts } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { href, tr } from "@/lib/i18n";
import PostCard from "@/components/site/PostCard";
import { PlainHero } from "@/components/site/Blocks";

const CATEGORIES = ["salons", "team-building", "sorties", "conseils"];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = await getContent("blog");
  return buildMetadata({ locale, routeKey: "blog", ...c.seo });
}

export default async function BlogPage({ params, searchParams }) {
  const { locale } = await params;
  const sp = await searchParams;
  const category = CATEGORIES.includes(sp.categorie) ? sp.categorie : undefined;
  const page = Math.max(parseInt(sp.page) || 1, 1);
  const t = getDictionary(locale);
  const [c, { posts, totalPages }] = await Promise.all([
    getContent("blog"),
    fetchPosts({ category, page, limit: 9 }),
  ]);
  const L = (v) => tr(v, locale);

  const base = href(locale, "blog");
  const linkFor = (cat, p = 1) => {
    const qs = new URLSearchParams();
    if (cat) qs.set("categorie", cat);
    if (p > 1) qs.set("page", String(p));
    const s = qs.toString();
    return s ? `${base}?${s}` : base;
  };

  return (
    <>
      <PlainHero title={L(c.hero.title)} text={L(c.hero.text)}>
        <nav aria-label={locale === "en" ? "Categories" : "Catégories"} className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {[undefined, ...CATEGORIES].map((cat) => {
              const active = cat === category;
              return (
                <li key={cat || "all"}>
                  <Link
                    href={linkFor(cat)}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                      active ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"
                    }`}
                  >
                    {t.blog.categories[cat || "all"]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </PlainHero>

      <section className="section !pt-14">
        <div className="shell">
          {posts.length ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} locale={locale} t={t} />
              ))}
            </div>
          ) : (
            <p className="text-lg text-stone">{t.blog.empty}</p>
          )}

          {totalPages > 1 && (
            <nav className="mt-16 flex items-center justify-between border-t border-ink/15 pt-8" aria-label="Pagination">
              {page > 1 ? (
                <Link href={linkFor(category, page - 1)} className="link-underline font-semibold">
                  {t.blog.previous}
                </Link>
              ) : (
                <span />
              )}
              <span className="text-sm text-stone">
                {page} / {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={linkFor(category, page + 1)} className="link-underline font-semibold">
                  {t.blog.next}
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
