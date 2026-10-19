import type {Metadata} from "next";
import {localizedPath, locales} from "@/i18n/routing";
import {getCopy} from "@/i18n/server";
import {siteConfig} from "@/content/site/config";

export function canonicalUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).href;
}

type PageDetails = {title: string; description: string; image?: string};

export function createPageMetadata(path: string, {title, description, image = "/assets/sinda_picture-960.jpg"}: PageDetails, locale = "en"): Metadata {
  const t = getCopy(locale);
  title = t(title); description = t(description);
  const url = canonicalUrl(localizedPath(path, locale));
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;
  return {
    title: {absolute: fullTitle},
    description,
    alternates: {canonical: url, languages: {...Object.fromEntries(locales.map(language => [language, canonicalUrl(localizedPath(path, language))])), "x-default": canonicalUrl(path)}},
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
      locale: {en: "en_US", de: "de_DE", fr: "fr_FR"}[locale],
      alternateLocale: locales.filter(language => language !== locale).map(language => ({en: "en_US", de: "de_DE", fr: "fr_FR"}[language])),
      images: [{url: canonicalUrl(image)}],
    },
    twitter: {card: "summary_large_image", title: fullTitle, description, images: [canonicalUrl(image)]},
  };
}

export const entityIds = {
  person: canonicalUrl("/#person"),
  organization: canonicalUrl("/#skatalyst-ai"),
  website: canonicalUrl("/#website"),
  profile: canonicalUrl("/about#profile"),
};

export const identityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": entityIds.person,
      name: siteConfig.name,
      url: canonicalUrl(),
      image: canonicalUrl("/assets/about/sinda-portrait-personal.jpg"),
      jobTitle: siteConfig.headline,
      description: siteConfig.description,
      sameAs: [siteConfig.social.linkedin, siteConfig.social.x],
      worksFor: {"@id": entityIds.organization},
      mainEntityOfPage: {"@id": entityIds.profile},
      knowsAbout: ["AI orchestration", "AI agent systems", "Context engineering", "Frontier AI coding agents", "Data engineering", "Business intelligence", "Machine learning"],
    },
    {
      "@type": "Organization",
      "@id": entityIds.organization,
      name: "SKatalyst AI",
      url: siteConfig.companyUrl,
      description: "A founder-led startup building a platform for business data and customer-owned applications, currently in private beta.",
      founder: {"@id": entityIds.person},
    },
    {
      "@type": "WebSite",
      "@id": entityIds.website,
      name: siteConfig.name,
      url: canonicalUrl(),
      description: siteConfig.description,
      inLanguage: "en",
      publisher: {"@id": entityIds.person},
      about: {"@id": entityIds.person},
    },
  ],
};

export const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": entityIds.profile,
  url: canonicalUrl("/about"),
  name: "About Sinda Khenine, Founder of SKatalyst AI",
  mainEntity: {"@id": entityIds.person},
  isPartOf: {"@id": entityIds.website},
};

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
