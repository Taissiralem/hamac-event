import Link from "next/link";
import { href, tr } from "@/lib/i18n";
import Photo from "./Photo";

export function formatDate(date, locale) {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function PostCard({ post, locale, t }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-mist">
        <Photo
          src={post.coverImage}
          alt=""
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-5 text-sm text-stone">
        {t.blog.categories[post.category]}
        <span aria-hidden="true">, </span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
      </p>
      <h3 className="h-card mt-2">
        <Link
          href={href(locale, "blog", `/${post.slug}`)}
          className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-orange group-hover:decoration-2 group-hover:underline-offset-4"
        >
          {tr(post.title, locale)}
        </Link>
      </h3>
      {tr(post.excerpt, locale) && <p className="mt-2 line-clamp-3 text-stone">{tr(post.excerpt, locale)}</p>}
    </article>
  );
}
