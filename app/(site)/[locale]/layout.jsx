import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import "../../globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { isLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content/get";
import { SITE_URL } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/brand/hamac-mark.png" },
  other: { "google-site-verification": "kor861PS-IjYxg697ranilr9e1BH0DROlZPVAwWXZ7k" },
};

export const viewport = { themeColor: "#1b3a4b" };

export default async function SiteLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const settings = await getContent("settings");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hamac Events",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/hamac-mark.png`,
    telephone: settings.contact.phone,
    email: settings.contact.email,
    address: { "@type": "PostalAddress", addressCountry: "DZ", addressLocality: "Alger" },
    sameAs: Object.values(settings.social).filter(Boolean),
  };

  return (
    <html lang={locale} className={archivo.variable}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <Header locale={locale} t={t} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} t={t} settings={settings} />
      </body>
    </html>
  );
}
