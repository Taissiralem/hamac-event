import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content/get";
import { buildMetadata } from "@/lib/seo";
import { href, tr } from "@/lib/i18n";
import Paragraphs from "@/components/site/Paragraphs";
import { CtaBand, LinkCard, PhotoHero, SectionHeading } from "@/components/site/Blocks";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = await getContent("about");
  return buildMetadata({ locale, routeKey: "about", ...c.seo, image: c.hero.image });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const [c, home] = await Promise.all([getContent("about"), getContent("home")]);
  const L = (v) => tr(v, locale);

  return (
    <>
      <PhotoHero locale={locale} t={t} title={L(c.hero.title)} image={c.hero.image} />

      {/* Présentation + vision */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lead lg:col-span-7">
            <Paragraphs text={L(c.hero.text)} />
          </div>
          <aside className="border-l-4 border-orange pl-8 lg:col-span-5">
            <h2 className="display text-3xl">{L(c.vision.title)}</h2>
            <div className="mt-4 text-stone">
              <Paragraphs text={L(c.vision.text)} />
            </div>
          </aside>
        </div>
      </section>

      {/* Valeurs */}
      <section className="floorplan section bg-ink text-paper">
        <div className="shell">
          <SectionHeading title={L(c.values.title)} light />
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.items.map((item, i) => (
              <li key={i} className="border-t-2 border-orange pt-6">
                <h3 className="h-card">{L(item.title)}</h3>
                <p className="mt-3 text-paper/75">{L(item.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Univers d'expertise : reprend les univers de l'accueil */}
      <section className="section">
        <div className="shell">
          <SectionHeading title={L(c.expertise.title)} text={L(c.expertise.text)} />
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {home.universes.items.map((item, i) => (
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

      <CtaBand locale={locale} t={t} title={L(c.cta.title)} text={L(c.cta.text)} />
    </>
  );
}
