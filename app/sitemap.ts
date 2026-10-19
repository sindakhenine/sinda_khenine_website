import {locales, localizedPath} from "@/i18n/routing";
import type {MetadataRoute} from "next";
import {projects, projectHref} from "@/content/projects/projects";
import {canonicalUrl} from "@/lib/seo";

const routes = ["/", "/about", "/projects", "/speaking", "/writing", "/book", "/book/sample", "/book/press", "/book/faq", "/book/discussion-guide", "/resume", "/contact", "/newsletter", "/company", "/interviews", "/research", "/privacy", "/imprint"];
// Content revision date, not the date on which a crawler requests the sitemap.
const lastModified = new Date("2026-10-19");

export default function sitemap(): MetadataRoute.Sitemap {
  return [...new Set([...routes, ...projects.map(projectHref)])].flatMap(path => locales.map(locale => ({url: canonicalUrl(localizedPath(path, locale)), lastModified, alternates: {languages: Object.fromEntries(locales.map(language => [language, canonicalUrl(localizedPath(path, language))]))}})));
}
