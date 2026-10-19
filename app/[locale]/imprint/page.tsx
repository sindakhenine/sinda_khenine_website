import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import {Link} from "@/i18n/navigation";
import {siteConfig} from "@/content/site/config";
import {legalContact} from "@/content/site/legal";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/imprint", {title: "Legal notice", description: "Website contact information for Sinda Khenine."}, locale); }
export default async function Imprint({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
return <article className="shell legal-page">
  <p className="eyebrow">{copy("Website information")}</p><h1>{copy("Legal notice")}</h1>
  <h2>{copy("Website operator")}</h2><p><strong>{copy(legalContact.name)}</strong><br/>{copy(siteConfig.headline)}</p>
  {legalContact.postalAddress.length > 0 && <address>{legalContact.postalAddress.map(line=><span key={line}>{copy(line)}<br/></span>)}</address>}
  <p>{copy("Email: ")}<a href={copy.href(`mailto:${siteConfig.email}`)}>{copy(siteConfig.email)}</a><br/><Link href="/contact">{copy("Contact form")}</Link></p>
  <h2>{copy("Responsible for content")}</h2><p>{copy(legalContact.name)}.</p>
  <h2>{copy("About this website")}</h2><p>{copy("This website presents Sinda Khenine’s engineering work, independent projects, conference sessions and writing.")}</p>
  <h2>{copy("Privacy")}</h2><p>{copy("Information about contact messages, hosting and website analytics is available in the ")}<Link href="/privacy">{copy("privacy notice")}</Link>.</p>
</article>}
