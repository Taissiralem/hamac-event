import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content/get";
import { fetchRealisations } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { href, tr } from "@/lib/i18n";
import Photo from "@/components/site/Photo";
import Paragraphs from "@/components/site/Paragraphs";
import Gallery from "@/components/site/Gallery";
import BlogTeaser from "@/components/site/BlogTeaser";
import { Checklist, CtaBand, LinkCard, PhotoHero, SectionHeading } from "@/components/site/Blocks";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = await getContent("home");
  return buildMetadata({ locale, routeKey: "home", ...c.seo, image: c.hero.image });
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const [c, featured] = await Promise.all([getContent("home"), fetchRealisations({ featured: true, limit: 5 })]);
  const L = (v) => tr(v, locale);

  return (
    <>
      <PhotoHero
        locale={locale}
        t={t}
        tall
        title={L(c.hero.title)}
        text={L(c.hero.text)}
        image={c.hero.image}
        caption={L(c.hero.caption)}
        secondary={{ href: href(locale, "salons"), label: t.nav.salons }}
      />

      {/* Mise en avant prioritaire, juste sous le bandeau : salons et stands */}
      <section className="floorplan section bg-ink text-paper">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <h2 className="display h-section">{L(c.salons.title)}</h2>
              <div className="lead mt-6 text-paper/80">
                <Paragraphs text={L(c.salons.text)} />
              </div>
              <div className="mt-9">
                <Checklist items={c.salons.points} locale={locale} light />
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href={href(locale, "salons")} className="btn btn-primary">
                  {L(c.salons.cta) || t.nav.salons}
                </Link>
                <Link href={href(locale, "contact")} className="btn btn-ghost-light">
                  {t.cta.quote}
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:col-span-6">
              <Photo src={c.salons.image} alt="" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>

          <div className="mt-16 grid overflow-hidden rounded-sm bg-paper text-ink md:grid-cols-2 lg:mt-24">
            <div className="relative min-h-72 md:min-h-full">
              <Photo src={c.salons.standImage} alt="" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div className="p-8 sm:p-12 lg:p-16">
              <h3 className="display text-3xl lg:text-4xl">{L(c.salons.standTitle)}</h3>
              <p className="lead mt-5 text-stone">{L(c.salons.standText)}</p>
              <Link href={`${href(locale, "salons")}#devis`} className="link-underline mt-8 inline-block font-semibold">
                {t.cta.project}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nos univers */}
      <section className="section">
        <div className="shell">
          <SectionHeading title={L(c.universes.title)} />
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {c.universes.items.map((item, i) => (
              <LinkCard
                key={i}
                href={href(locale, item.link || "contact")}
                image={item.image}
                title={L(item.title)}
                text={L(item.text)}
                cta={t.cta.discover}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team building et sorties */}
      <section className="section">
        <div className="shell">
          <SectionHeading title={L(c.experiences.title)} />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              { key: "teamBuilding", title: c.experiences.tbTitle, text: c.experiences.tbText, image: c.experiences.tbImage },
              { key: "sortie", title: c.experiences.sortieTitle, text: c.experiences.sortieText, image: c.experiences.sortieImage },
            ].map((x) => (
              <Link key={x.key} href={href(locale, x.key)} className="group relative isolate flex min-h-[28rem] items-end overflow-hidden rounded-sm text-paper">
                <Photo src={x.image} alt="" sizes="(min-width: 768px) 45vw, 100vw" className="-z-10 transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
                <span className="block p-8 lg:p-10">
                  <span className="display block text-3xl lg:text-4xl">{L(x.title)}</span>
                  <span className="mt-3 block max-w-md text-paper/85">{L(x.text)}</span>
                  <span className="mt-6 inline-block font-semibold underline decoration-orange decoration-2 underline-offset-4">
                    {t.cta.discover}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Hamac Events */}
      <section className="section bg-sand">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display h-section">{L(c.why.title)}</h2>
          </div>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {c.why.items.map((item, i) => (
              <li key={i} className="border-t-2 border-ink pt-6">
                <h3 className="h-card">{L(item.title)}</h3>
                <p className="mt-3 text-stone">{L(item.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Réalisations mises en avant */}
      {featured.length > 0 && (
        <section className="section">
          <div className="shell">
            <SectionHeading title={L(c.projects.title)} text={L(c.projects.text)} />
            <div className="mt-12">
              <Gallery items={featured} locale={locale} emptyText={t.misc.galleryEmpty} />
            </div>
          </div>
        </section>
      )}

      <BlogTeaser locale={locale} t={t} title={L(c.blog.title)} />

      <CtaBand locale={locale} t={t} title={L(c.cta.title)} text={L(c.cta.text)} image={c.cta.image} />
    </>
  );
}
