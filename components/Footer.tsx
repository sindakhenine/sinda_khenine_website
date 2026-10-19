import {useCopy} from "@/i18n/use-copy";
import {siteConfig,LAST_UPDATED} from "@/content/site/config";
export function Footer(){
  const copy = useCopy();
return <footer><div className="shell footer-grid"><div><p className="brand">{copy("Sinda Khenine")}</p><p>{copy("AI and data engineer, founder and speaker.")}</p><p className="last-updated">{copy("Last updated · ")}{copy(LAST_UPDATED)}</p></div><div><a href={copy.href("/contact")}>{copy("Contact")}</a><a href={copy.href("/resume")}>{copy("Resume")}</a><a href={copy.href("/privacy")}>{copy("Privacy")}</a><a href={copy.href("/imprint")}>{copy("Legal notice")}</a></div><div><a href={copy.href(siteConfig.companyUrl)}>{copy("SKatalyst AI")}</a><span>{copy("Private Beta")}</span><a href={copy.href(`mailto:${siteConfig.email}`)}>{copy(siteConfig.email)}</a><a href={copy.href(siteConfig.social.linkedin)} rel="me">{copy("LinkedIn")}</a><a href={copy.href(siteConfig.social.x)} rel="me">{copy("X · @SKatalystAI")}</a></div></div></footer>}
