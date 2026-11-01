import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content/get";
import { fetchRealisations } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { tr } from "@/lib/i18n";
import Photo from "@/components/site/Photo";
import Icon from "@/components/site/Icon";
import Paragraphs from "@/components/site/Paragraphs";
import Gallery from "@/components/site/Gallery";
import BlogTeaser from "@/components/site/BlogTeaser";
import ContactForm from "@/components/site/ContactForm";
import { Checklist, Faq, PhotoHero, SectionHeading, SplitFeature, Steps } from "@/components/site/Blocks";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = await getContent("salons");
  return buildMetadata({ locale, routeKey: "salons", ...c.seo, image: c.hero.image });
}

export default async function SalonsPage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const [c, realisations] = await Promise.all([
    getContent("salons"),
    fetchRealisations({ category: "salons", limit: 10 }),
  ]);
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
        secondary={{ href: "#devis", label: t.cta.quote }}
      />

      {/* Une présence qui vous ressemble */}
      <section className="section">
        <div className="shell">
          <SplitFeature locale={locale} title={L(c.presence.title)} text={L(c.presence.text)} image={c.presence.image} />
        </div>
      </section>

      {/* Nos solutions : grille façon plan de hall */}
      <section className="floorplan section bg-ink text-paper">
        <div className="shell">
          <SectionHeading title={L(c.solutions.title)} text={L(c.solutions.text)} light />
          <ul className="mt-14 grid border-l border-t border-paper/20 sm:grid-cols-2 lg:grid-cols-3">
            {c.solutions.items.map((item, i) => (
              <li key={i} className="flex flex-col border-b border-r border-paper/20 p-7 lg:p-9">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-orange text-night">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="h-card mt-7">{L(item.title)}</h3>
                <p className="mt-3 text-paper/75">{L(item.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stand personnalisé */}
      <section className="section overflow-hidden">
        <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
              <Photo src={c.stand.image} alt="" sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            {c.stand.image2 && (
              <div className="absolute -bottom-10 right-4 hidden aspect-square w-[38%] overflow-hidden rounded-sm border-8 border-paper sm:block lg:-right-10">
                <Photo src={c.stand.image2} alt="" sizes="20vw" />
              </div>
            )}
          </div>
          <div className="lg:col-span-5">
            <h2 className="display h-section">{L(c.stand.title)}</h2>
            <div className="lead mt-6 text-stone">
              <Paragraphs text={L(c.stand.text)} />
            </div>
            <div className="mt-9">
              <Checklist items={c.stand.points} locale={locale} />
            </div>
            <a href="#devis" className="btn btn-ghost-dark mt-10">
              {t.cta.quote}
            </a>
          </div>
        </div>
      </section>

      {/* Notre accompagnement */}
      <section className="section bg-sand">
        <div className="shell">
          <SectionHeading title={L(c.process.title)} text={L(c.process.text)} />
          <div className="mt-12">
            <Steps steps={c.process.steps} locale={locale} />
          </div>
        </div>
      </section>

      {/* Réalisations */}
      <section className="section">
        <div className="shell">
          <SectionHeading title={L(c.gallery.title)} text={L(c.gallery.text)} />
          <div className="mt-12">
            <Gallery items={realisations} locale={locale} emptyText={t.misc.galleryEmpty} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-ink/10">
        <div className="shell">
          <Faq title={L(c.faq.title)} items={c.faq.items} locale={locale} />
        </div>
      </section>

      <BlogTeaser locale={locale} t={t} title={L(c.blog.title)} category="salons" />

      {/* Appel à l'action final avec formulaire */}
      <section id="devis" className="floorplan section scroll-mt-20 bg-ink text-paper">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display h-section">{L(c.cta.title)}</h2>
            <p className="lead mt-6 text-paper/80">{L(c.cta.text)}</p>
          </div>
          <div className="rounded-sm bg-paper p-6 text-ink sm:p-9 lg:col-span-7">
            <ContactForm t={t} defaultType="salon" motif="Salons professionnels" />
          </div>
        </div>
      </section>
    </>
  );
}
