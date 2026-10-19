import {defineRouting} from "next-intl/routing";

export const locales = ["en", "de", "fr"] as const;
export type Locale = typeof locales[number];
export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
  // A shared URL always has the same language, independent of browser settings.
  localeDetection: false,
  localeCookie: false,
});

export function localizedPath(path: string, locale: string) {
  if (!path.startsWith("/") || path.startsWith("//") || /\.[a-z0-9]+(?:[?#]|$)/i.test(path) || /^\/(?:api|_next|_vercel)(?:\/|$)/.test(path)) return path;
  const bare = path.replace(/^\/(en|de|fr)(?=\/|$)/, "") || "/";
  return locale === "de" || locale === "fr" ? `/${locale}${bare === "/" ? "" : bare}` : bare;
}
