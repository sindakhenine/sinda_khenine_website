import {createPageMetadata} from "@/lib/seo";
import Link from "next/link";
import {siteConfig} from "@/content/site/config";
import {legalContact} from "@/content/site/legal";
export const metadata = createPageMetadata("/imprint", {title: "Impressum", description: "Website contact information for Sinda Khenine."});
export default function Imprint(){return <article className="shell legal-page">
  <p className="eyebrow">Website information</p><h1>Impressum</h1>
  <h2>Website operator / Anbieter</h2><p><strong>{legalContact.name}</strong><br/>{siteConfig.headline}</p>
  {legalContact.postalAddress.length > 0 && <address>{legalContact.postalAddress.map(line=><span key={line}>{line}<br/></span>)}</address>}
  <p>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br/><Link href="/contact">Contact form</Link></p>
  <h2>Responsible for content / Inhaltlich verantwortlich</h2><p>{legalContact.name}, at the address above.</p>
  <h2>About this website</h2><p>This website presents Sinda Khenine’s engineering work, independent projects, conference sessions and writing.</p>
  <h2>Privacy</h2><p>Information about contact messages, hosting and website analytics is available in the <Link href="/privacy">privacy notice</Link>.</p>
</article>}
