import Image from "next/image";
import {setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {FistbumpFeature} from "@/components/fistbump/FistbumpFeature";
import {getFistbumpCopy, fistbumpLinks} from "@/content/projects/fistbump";
import {createPageMetadata, entityIds, serializeJsonLd} from "@/lib/seo";
import styles from "@/components/fistbump/fistbump.module.css";

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
      <section className={styles.story}>
        <div><p className="eyebrow">{t.storyLabel}</p><h2>{t.storyTitle}</h2></div>
        <div className={styles.storyCopy}><p>{t.storyText}</p><p>{t.storyMore}</p><div className={styles.signature}><Image src="/assets/about/sinda-portrait-personal.jpg" width={48} height={48} alt="Sinda Khenine"/><span>{t.byline}</span></div></div>
      </section>
      <section className={styles.newsBlock} id="ai-news">
        <div><p className="eyebrow">{t.news}</p><h2>{t.newsTitle}</h2><p>{t.newsText}</p><a href={fistbumpLinks.news}>{t.readNews} ↗</a></div>
        <div className={styles.sourceBoard}><p>{t.news}</p><div className={styles.sources}>{["OpenAI", "Anthropic", "Google DeepMind", "Mistral", "Hugging Face"].map(name=><span key={name}>{name}</span>)}</div><div className={styles.topics}>{t.topics.map(topic=><span key={topic}>{topic}</span>)}</div><p className={styles.note}>{t.newsNote}</p></div>
      </section>
      <section className={styles.details}><div><h2>{t.meetTitle}</h2><p>{t.meetText}</p><p className={styles.note}>{t.meetNote}</p></div><div><h2>{t.moreTitle}</h2><p>{t.moreText}</p></div></section>
      <aside className={styles.role}><strong>{t.role}</strong><p>{t.roleText}</p></aside>
      <div className={styles.close}><h2>{t.closing}</h2><div className={styles.actions}><a className={styles.primary} href={fistbumpLinks.app}>{t.open} ↗</a><a href={fistbumpLinks.site}>{t.visit} ↗</a></div></div>
    </div>
  </article>;
}
