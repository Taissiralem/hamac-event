import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content/get";
import { fetchSorties } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { tr } from "@/lib/i18n";
import Photo from "@/components/site/Photo";
import Icon from "@/components/site/Icon";
import ContactForm from "@/components/site/ContactForm";
import ProgrammeGrid from "@/components/site/ProgrammeGrid";
import { Checklist, Faq, PhotoHero, SectionHeading, SplitFeature } from "@/components/site/Blocks";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = await getContent("sortie");
  return buildMetadata({ locale, routeKey: "sortie", ...c.seo, image: c.hero.image });
}

export default async function SortiePage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const [c, sorties] = await Promise.all([getContent("sortie"), fetchSorties("sortie")]);
  const L = (v) => tr(v, locale);
  const en = locale === "en";

  return (
    <>
      <PhotoHero
        locale={locale}
        t={t}
        title={L(c.hero.title)}
        text={L(c.hero.text)}
        image={c.hero.image}
        primary={{ href: "#demande", label: en ? "Request a programme" : "Demander un programme" }}
      />

      {/* Ce que nous proposons */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="display h-section">{L(c.intro.title)}</h2>
            <p className="lead mt-6 text-stone">{L(c.intro.text)}</p>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-sm lg:block">
              <Photo src={c.intro.image} alt="" sizes="40vw" />
            </div>
          </div>
          <ul className="divide-y divide-ink/15 border-y border-ink/15 lg:col-span-7 lg:self-center">
            {c.intro.items.map((item, i) => (
              <li key={i} className="flex gap-6 py-8">
                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="h-card">{L(item.title)}</h3>
                  <p className="mt-2 text-stone">{L(item.text)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Destinations et programmes (gérés dans l'admin) */}
      <section className="section bg-sand">
        <div className="shell">
          <SectionHeading title={L(c.programmes.title)} text={L(c.programmes.text)} />
          {sorties.length ? (
            <ProgrammeGrid items={sorties} locale={locale} />
          ) : (
            <p className="mt-8 text-stone">{t.misc.programmeEmpty}</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SplitFeature locale={locale} title={L(c.custom.title)} text={L(c.custom.text)} image={c.custom.image} reverse>
            <Checklist items={c.custom.points} locale={locale} />
          </SplitFeature>
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
            <ContactForm t={t} defaultType="sortie" motif="Sortie pédagogique" />
          </div>
        </div>
      </section>
    </>
  );
}
