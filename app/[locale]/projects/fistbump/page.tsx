import {setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {FistbumpFeature} from "@/components/fistbump/FistbumpFeature";
import {getFistbumpCopy, fistbumpLinks} from "@/content/projects/fistbump";
import {createPageMetadata, entityIds, serializeJsonLd} from "@/lib/seo";
import styles from "@/components/fistbump/fistbump.module.css";
import {FistbumpBenefits} from "@/components/fistbump/FistbumpBenefits";
import {getFistbumpBenefits} from "@/content/projects/fistbump-benefits";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = getFistbumpCopy(locale);
  return createPageMetadata("/projects/fistbump", {title:t.title, description:t.description, image:`/media/fistbump/preview-${locale === "de" || locale === "fr" ? locale : "en"}.jpg`}, locale);
}

export default async function FistbumpPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = getFistbumpCopy(locale);
  const schema = {"@context":"https://schema.org", "@type":"SoftwareApplication", name:"Fistbump", url:fistbumpLinks.site, applicationCategory:"SocialNetworkingApplication", operatingSystem:"Web", creator:{"@id":entityIds.person}, description:t.description};
  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd(schema)}}/>
    <div className="shell"><Link className={styles.back} href="/projects">← {t.back}</Link></div>
    <FistbumpFeature locale={locale} detail/>
    <div className="shell">
      <FistbumpBenefits copy={getFistbumpBenefits(locale)}/>
      <div className={styles.close}><h2>{t.closing}</h2><div className={styles.actions}><a className={styles.primary} href={fistbumpLinks.app}>{t.open} ↗</a><a href={fistbumpLinks.site}>{t.visit} ↗</a></div></div>
    </div>
  </article>;
}
