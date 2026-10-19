import type {Metadata} from "next";
import "./globals.css";
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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header/>
    <main id="main">{children}</main>
    <Footer/>
    <Analytics/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: serializeJsonLd(identityGraph)}}/>
  </body></html>;
}
