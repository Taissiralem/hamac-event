import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content/get";
import { fetchRealisations, fetchSorties } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { href, tr } from "@/lib/i18n";
import Photo from "@/components/site/Photo";
import Gallery from "@/components/site/Gallery";
import ContactForm from "@/components/site/ContactForm";
import ProgrammeGrid from "@/components/site/ProgrammeGrid";
import { Checklist, Faq, PhotoHero, SectionHeading, SplitFeature } from "@/components/site/Blocks";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = await getContent("teamBuilding");
  return buildMetadata({ locale, routeKey: "teamBuilding", ...c.seo, image: c.hero.image });
}

export default async function TeamBuildingPage({ params, searchParams }) {
  const { locale } = await params;
  const page = Math.max(parseInt((await searchParams).page) || 1, 1);
  const t = getDictionary(locale);
  const [c, realisations, { sorties: programmes, totalPages }] = await Promise.all([
    getContent("teamBuilding"),
    fetchRealisations({ category: "team-building", limit: 10 }),
    fetchSorties("team-building", page),
  ]);
  const L = (v) => tr(v, locale);
  const testimonials = c.testimonials.items.filter((x) => L(x.quote));

  return (
    <>
      <PhotoHero
        locale={locale}
        t={t}
        title={L(c.hero.title)}
        text={L(c.hero.text)}
        image={c.hero.image}
        secondary={{ href: "#demande", label: t.cta.quote }}
      />

      <section className="section">
        <div className="shell">
          <SplitFeature locale={locale} title={L(c.approach.title)} text={L(c.approach.text)} image={c.approach.image} />
        </div>
      </section>

      {/* Bénéfices */}
      <section className="floorplan section bg-ink text-paper">
        <div className="shell">
          <SectionHeading title={L(c.benefits.title)} light />
          <ul className="mt-12 grid border-l border-t border-paper/20 sm:grid-cols-2 lg:grid-cols-5">
            {c.benefits.items.map((item, i) => (
              <li key={i} className="border-b border-r border-paper/20 p-7">
                <span className="block size-3 bg-orange" aria-hidden="true" />
                <h3 className="h-card mt-6">{L(item.title)}</h3>
                <p className="mt-3 text-paper/75">{L(item.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Activités et formats */}
      <section className="section">
        <div className="shell">
          <SectionHeading title={L(c.activities.title)} text={L(c.activities.text)} />
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {c.activities.items.map((item, i) => (
              <article key={i} className="flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-mist">
                  <Photo src={item.image} alt="" sizes="(min-width: 768px) 45vw, 100vw" />
                </div>
                <h3 className="h-card mt-6">{L(item.title)}</h3>
                <p className="mt-2 text-stone">{L(item.text)}</p>
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-ink/15 pt-4 text-sm">
                  {L(item.duration) && (
                    <div>
                      <dt className="text-stone">{locale === "en" ? "Duration" : "Durée"}</dt>
                      <dd className="font-semibold">{L(item.duration)}</dd>
                    </div>
                  )}
                  {L(item.group) && (
                    <div>
                      <dt className="text-stone">{locale === "en" ? "Group" : "Groupe"}</dt>
                      <dd className="font-semibold">{L(item.group)}</dd>
                    </div>
                  )}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Activités proposées (gérées dans l'admin, onglet Programmes) */}
      {programmes.length > 0 && (
        <section id="programmes" className="section scroll-mt-20 border-t border-ink/10">
          <div className="shell">
            <SectionHeading title={L(c.programmes.title)} text={L(c.programmes.text)} />
            <ProgrammeGrid
              items={programmes}
              locale={locale}
              t={t}
              basePath={href(locale, "teamBuilding")}
              page={page}
              totalPages={totalPages}
            />
          </div>
        </section>
      )}

      {/* Programme sur mesure */}
      <section className="section bg-sand">
        <div className="shell">
          <SplitFeature locale={locale} title={L(c.custom.title)} text={L(c.custom.text)} image={c.custom.image} reverse>
            <Checklist items={c.custom.points} locale={locale} />
          </SplitFeature>
        </div>
      </section>

      {/* Galerie et témoignages */}
      <section className="section">
        <div className="shell">
          <SectionHeading title={L(c.testimonials.title)} />
          {testimonials.length > 0 && (
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {testimonials.map((x, i) => (
                <figure key={i} className="border-l-4 border-orange bg-white p-8">
                  <blockquote className="text-xl leading-relaxed">« {L(x.quote)} »</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold">{x.author}</span>
                    {L(x.role) && <span className="text-stone">, {L(x.role)}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          {realisations.length > 0 && (
            <div className="mt-12">
              <Gallery items={realisations} locale={locale} emptyText="" />
            </div>
          )}
        </div>
      </section>

      <section className="section border-t border-ink/10">
        <div className="shell">
          <Faq title={L(c.faq.title)} items={c.faq.items} locale={locale} />
        </div>
      </section>

      <section id="demande" className="floorplan section scroll-mt-20 bg-ink text-paper">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display h-section">{L(c.cta.title)}</h2>
            <p className="lead mt-6 text-paper/80">{L(c.cta.text)}</p>
          </div>
          <div className="rounded-sm bg-paper p-6 text-ink sm:p-9 lg:col-span-7">
            <ContactForm t={t} defaultType="team-building" motif="Team Building" />
          </div>
        </div>
      </section>
    </>
  );
}
