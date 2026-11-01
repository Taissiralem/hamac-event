import Link from "next/link";
import Image from "next/image";
import { href, tr } from "@/lib/i18n";
import Icon, { SocialIcon } from "./Icon";

export default function Footer({ locale, t, settings }) {
  const { contact, social, footer } = settings;
  const year = new Date().getFullYear();
  const links = ["salons", "teamBuilding", "sortie", "about", "blog", "contact"];
  const socials = ["facebook", "instagram", "linkedin"].filter((k) => social[k]);

  return (
    <footer className="floorplan bg-night text-paper">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <Link href={href(locale, "home")} className="inline-flex items-center gap-3">
            <Image src="/brand/hamac-mark.png" alt="" width={44} height={44} className="size-11" />
            <span className="display text-2xl">Hamac Events</span>
          </Link>
          <p className="mt-5 max-w-sm text-paper/75">{tr(footer.text, locale)}</p>
          {socials.length > 0 && (
            <div className="mt-8">
              <p className="text-sm text-paper/60">{t.footer.follow}</p>
              <ul className="mt-3 flex gap-2">
                {socials.map((k) => (
                  <li key={k}>
                    <a
                      href={social[k]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-11 items-center justify-center rounded-full border border-paper/25 transition-colors hover:border-orange hover:bg-orange hover:text-night"
                    >
                      <SocialIcon name={k} />
                      <span className="sr-only">{k}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <nav aria-label={t.footer.explore} className="md:col-span-3">
          <p className="text-sm text-paper/60">{t.footer.explore}</p>
          <ul className="mt-4 space-y-2.5">
            {links.map((k) => (
              <li key={k}>
                <Link href={href(locale, k)} className="hover:text-orange">
                  {t.nav[k]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-sm text-paper/60">{t.footer.contact}</p>
          <ul className="mt-4 space-y-3.5">
            {contact.phone && (
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-orange" />
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-orange">
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.email && (
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 size-5 shrink-0 text-orange" />
                <a href={`mailto:${contact.email}`} className="break-all hover:text-orange">
                  {contact.email}
                </a>
              </li>
            )}
            {tr(contact.address, locale) && (
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-orange" />
                {tr(contact.address, locale)}
              </li>
            )}
            {tr(contact.hours, locale) && (
              <li className="flex gap-3">
                <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-orange" />
                {tr(contact.hours, locale)}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Hamac Events. {t.footer.rights}
          </p>
          <Link href={href(locale, "legal")} className="hover:text-paper">
            {t.nav.legal}
          </Link>
        </div>
      </div>
    </footer>
  );
}
