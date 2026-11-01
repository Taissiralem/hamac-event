import Link from "next/link";
import { href } from "@/lib/i18n";
import { fetchPosts } from "@/lib/api";
import PostCard from "./PostCard";

// Les 3 derniers articles (d'une catégorie si précisée). Rien n'est affiché s'il n'y en a aucun.
export default async function BlogTeaser({ locale, t, title, category }) {
  let { posts } = await fetchPosts({ category, limit: 3 });
  if (!posts.length && category) ({ posts } = await fetchPosts({ limit: 3 }));
  if (!posts.length) return null;

  return (
    <section className="section border-t border-ink/10">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="display h-section max-w-2xl">{title}</h2>
          <Link href={href(locale, "blog")} className="link-underline shrink-0 font-semibold">
            {t.cta.allPosts}
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} locale={locale} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
