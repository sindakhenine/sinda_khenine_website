"use client";
import {useLocale} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {localizedPath} from "@/i18n/routing";
import {useCopy} from "@/i18n/use-copy";
import {siteConfig} from "@/content/site/config";
import {ThemeToggle} from "./ThemeToggle";
import {SocialIcon} from "./SocialLinks";

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const copy = useCopy();
  const current = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const links = siteConfig.navigation.map(([name, href]) => <Link key={href} href={href} aria-current={current(href) ? "page" : undefined} onClick={event => event.currentTarget.closest("details")?.removeAttribute("open")}>{copy(name)}</Link>);
  return <header className="site-header shell">
    <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">SK</span>Sinda Khenine</Link>
    <nav className="desktop-navigation" aria-label={copy("Primary navigation")}>{links}</nav>
    <div className="header-preferences">
      <nav className="language-switcher" aria-label={copy("Language")}>
        {([['en', 'English'], ['de', 'Deutsch'], ['fr', 'Français']] as const).map(([language, name]) => <a key={language} href={localizedPath(pathname, language)} hrefLang={language} lang={language} aria-label={name} aria-current={locale === language ? "true" : undefined} onClick={event => { event.currentTarget.href = localizedPath(pathname, language) + window.location.search + window.location.hash; }}>{language.toUpperCase()}</a>)}
      </nav>
      <a className="header-github" href={siteConfig.social.github} target="_blank" rel="me noopener" aria-label="GitHub" title="GitHub"><SocialIcon name="github"/></a>
      <ThemeToggle/>
    </div>
    <details className="mobile-menu"><summary>{copy("Menu")}</summary><nav className="mobile-panel" aria-label={copy("Mobile navigation")}>{links}<a href={siteConfig.companyUrl}>{copy("SKatalyst AI · Private Beta")}</a><a href={siteConfig.social.github} target="_blank" rel="me noopener">GitHub</a></nav></details>
  </header>;
}
