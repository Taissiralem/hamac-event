import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { fetchPost } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { href, tr } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import Photo from "@/components/site/Photo";
import Markdown from "@/components/site/Markdown";
import BlogTeaser from "@/components/site/BlogTeaser";
import { formatDate } from "@/components/site/PostCard";
import { CtaBand } from "@/components/site/Blocks";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    routeKey: "blog",
    extra: `/${post.slug}`,
    title: { fr: `${post.title.fr} | Hamac Events`, en: `${post.title.en || post.title.fr} | Hamac Events` },
    description: post.excerpt,
    image: post.coverImage,
  });
}

const readingTime = (text = "") => Math.max(1, Math.round(text.split(/\s+/).length / 220));

export default async function PostPage({ params }) {
  const { locale, slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();
  const t = getDictionary(locale);
  const L = (v) => tr(v, locale);
  const body = L(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: L(post.title),
    description: L(post.excerpt),
    image: post.coverImage || undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: locale,
    mainEntityOfPage: `${SITE_URL}${href(locale, "blog", `/${post.slug}`)}`,
    publisher: { "@type": "Organization", name: "Hamac Events" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="floorplan-light pb-12 pt-36 lg:pt-44">
          <div className="shell max-w-4xl">
            <Link href={href(locale, "blog")} className="link-underline text-sm font-semibold">
              {t.cta.back}
            </Link>
            <p className="mt-8 text-sm text-stone">
              {t.blog.categories[post.category]}
              <span aria-hidden="true">, </span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              <span aria-hidden="true">, </span>
              {readingTime(body)} {t.blog.minutes}
            </p>
            <h1 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)]">{L(post.title)}</h1>
            {L(post.excerpt) && <p className="lead mt-6 text-stone">{L(post.excerpt)}</p>}
          </div>
        </header>
        {post.coverImage && (
          <div className="shell max-w-6xl">
            <div className="relative aspect-[16/8] overflow-hidden rounded-sm">
              <Photo src={post.coverImage} alt="" priority sizes="(min-width: 1200px) 1100px, 100vw" />
            </div>
          </div>
        )}
        <div className="shell section !pt-14 max-w-4xl">
          <Markdown>{body}</Markdown>
        </div>
      </article>

      <BlogTeaser locale={locale} t={t} title={t.cta.allPosts} category={post.category} />
      <CtaBand
        locale={locale}
        t={t}
        title={locale === "en" ? "A project in mind?" : "Un projet en tête ?"}
        text={locale === "en" ? "Tell us about it, we will get back to you within 2 business days." : "Parlez-nous-en, nous revenons vers vous sous 48 h ouvrées."}
      />
    </>
  );
}
