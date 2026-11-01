import Link from "next/link";
import { headers } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";

export default async function NotFound() {
  const path = (await headers()).get("x-pathname") || "";
  const locale = path.startsWith("/en") ? "en" : "fr";
  const t = getDictionary(locale);
  return (
    <section className="floorplan-light flex min-h-[70vh] items-center pb-20 pt-36">
      <div className="shell">
        <p className="display text-7xl text-ink/20">404</p>
        <h1 className="display h-section mt-4">{t.misc.notFoundTitle}</h1>
        <p className="lead mt-4 max-w-xl text-stone">{t.misc.notFoundText}</p>
        <Link href={`/${locale}`} className="btn btn-primary mt-10">
          {t.misc.home}
        </Link>
      </div>
    </section>
  );
}
