import type {Metadata} from "next";
import "../globals.css";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {clientMessages} from "@/i18n/client-messages";
import {routing} from "@/i18n/routing";
import {getCopy, getCopyMessages} from "@/i18n/server";
import {themeScript} from "@/lib/theme";
import {Analytics} from "@vercel/analytics/next";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {siteConfig} from "@/content/site/config";
import {createPageMetadata, identityGraph, serializeJsonLd} from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata("/", {title: siteConfig.title, description: siteConfig.description}),
  metadataBase: new URL(siteConfig.url),
  title: {default: siteConfig.title, template: "%s | Sinda Khenine"},
  icons: {icon: "/icon.svg"},
};

export function generateStaticParams() { return routing.locales.map(locale => ({locale})); }
export default async function RootLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = getCopy(locale);
  return <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html: themeScript}}/></head><body><NextIntlClientProvider locale={locale} messages={{copy: clientMessages(getCopyMessages(locale))}}>
    <a className="skip-link" href="#main">{t("Skip to content")}</a>
    <Header/>
    <main id="main">{children}</main>
    <Footer/>
    <Analytics/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: serializeJsonLd({...identityGraph, "@graph": identityGraph["@graph"].map(entity => entity["@type"] === "WebSite" ? {...entity, inLanguage: ["en", "de", "fr"]} : entity)})}}/>
  </NextIntlClientProvider></body></html>;
}
