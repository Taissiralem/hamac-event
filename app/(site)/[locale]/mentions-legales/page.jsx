import { getContent } from "@/lib/content/get";
import { buildMetadata } from "@/lib/seo";
import { tr } from "@/lib/i18n";
import Markdown from "@/components/site/Markdown";
import { PlainHero } from "@/components/site/Blocks";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = await getContent("legal");
  return {
    ...buildMetadata({ locale, routeKey: "legal", title: c.content.title, description: c.content.title }),
    robots: { index: false },
  };
}

export default async function LegalPage({ params }) {
  const { locale } = await params;
  const c = await getContent("legal");
  return (
    <>
      <PlainHero title={tr(c.content.title, locale)} />
      <section className="section !pt-14">
        <div className="shell">
          <Markdown>{tr(c.content.body, locale)}</Markdown>
        </div>
      </section>
    </>
  );
}
