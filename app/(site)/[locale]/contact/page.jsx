import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content/get";
import { buildMetadata } from "@/lib/seo";
import { tr } from "@/lib/i18n";
import ContactForm from "@/components/site/ContactForm";
import Icon, { SocialIcon } from "@/components/site/Icon";
import { PlainHero } from "@/components/site/Blocks";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = await getContent("contact");
  return buildMetadata({ locale, routeKey: "contact", ...c.seo });
}

const TYPE_PARAM = ["salon", "team-building", "sortie", "autre"];

export default async function ContactPage({ params, searchParams }) {
  const { locale } = await params;
  const { type } = await searchParams;
  const t = getDictionary(locale);
  const [c, settings] = await Promise.all([getContent("contact"), getContent("settings")]);
  const L = (v) => tr(v, locale);
  const { contact, social } = settings;
  const socials = ["facebook", "instagram", "linkedin"].filter((k) => social[k]);

  return (
    <>
      <PlainHero title={L(c.hero.title)} text={L(c.hero.text)} />
      <section className="section !pt-14 lg:!pt-20">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="rounded-sm bg-white p-6 shadow-[0_1px_0_rgb(27_58_75/0.08)] sm:p-10 lg:col-span-8">
            <ContactForm t={t} defaultType={TYPE_PARAM.includes(type) ? type : "salon"} motif="Page contact" />
          </div>
          <aside className="lg:col-span-4">
            <ul className="space-y-7">
              {contact.phone && (
                <li>
                  <p className="flex items-center gap-2 text-sm text-stone">
                    <Icon name="phone" className="size-4" /> {t.form.phone}
                  </p>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="display mt-1 block text-2xl hover:underline">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <p className="flex items-center gap-2 text-sm text-stone">
                    <Icon name="mail" className="size-4" /> {t.form.email}
                  </p>
                  <a href={`mailto:${contact.email}`} className="link-underline mt-1 block break-all text-lg font-semibold">
                    {contact.email}
                  </a>
                </li>
              )}
              {L(contact.address) && (
                <li className="flex gap-3">
                  <Icon name="pin" className="mt-0.5 size-5 shrink-0" /> {L(contact.address)}
                </li>
              )}
              {L(contact.hours) && (
                <li className="flex gap-3">
                  <Icon name="clock" className="mt-0.5 size-5 shrink-0" /> {L(contact.hours)}
                </li>
              )}
            </ul>
            {socials.length > 0 && (
              <div className="mt-10 border-t border-ink/15 pt-8">
                <p className="text-sm text-stone">{t.footer.follow}</p>
                <ul className="mt-3 flex gap-2">
                  {socials.map((k) => (
                    <li key={k}>
                      <a
                        href={social[k]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        <SocialIcon name={k} />
                        <span className="sr-only">{k}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
