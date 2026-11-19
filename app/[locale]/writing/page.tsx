import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata, entityIds, serializeJsonLd} from "@/lib/seo";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {TrackedLink} from "@/components/TrackedLink";
import {conferenceProfile, events} from "@/content/speaking/events";
import {publishedArticle} from "@/content/writing/articles";
import styles from "./writing.module.css";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return createPageMetadata("/writing", {title:"Writing", description:"Read Sinda Khenine’s published VibeKode article on context engineering, explore her MLcon talks and discover The Subconscious Architect."}, locale);
}
const drafts = [
  {title:"From Context-Aware Ingestion to Governed Output",summary:"A technical approach to organizing sources and validating generated outputs."},
  {title:"Reliable AI Agents Need Boundaries",summary:"Tool constraints, evidence, evaluation and human escalation for enterprise agents."},
];
export default async function Writing({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const copy = getCopy(locale);
  const date = new Intl.DateTimeFormat(locale, {day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});
  const articleSchema = {"@context":"https://schema.org","@type":"Article",url:publishedArticle.url,headline:publishedArticle.title,description:publishedArticle.summary,datePublished:publishedArticle.date,inLanguage:"en",author:{"@type":"Person","@id":entityIds.person,name:"Sinda Khenine",url:"https://sindakhenine.com/"},publisher:{"@type":"Organization",name:publishedArticle.publisher,url:"https://vibekode.it/"}};
  return <div className="plain-surface writing-page-premium">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd(articleSchema)}}/>
    <header className="shell page-hero page-hero-editorial"><h1>{copy("Articles, conference work and a book.")}</h1></header>
    <section className={styles.published} id="published"><div className="shell writing-layout">
      <header><span>01</span><h2>{copy("Published writing")}</h2></header>
      <article className={styles.article}>
        <p className={styles.publication}>{publishedArticle.publisher} <span>·</span> <time dateTime={publishedArticle.date}>{date.format(new Date(`${publishedArticle.date}T12:00:00Z`))}</time></p>
        <h3><a href={publishedArticle.url} target="_blank" rel="noopener noreferrer">{copy(publishedArticle.title)}</a></h3>
        <p className={styles.subtitle}>{copy(publishedArticle.subtitle)}</p>
        <p>{copy(publishedArticle.summary)}</p>
        <a className="button primary" href={publishedArticle.url} target="_blank" rel="noopener noreferrer">{copy("Read my article on VibeKode")} <span aria-hidden="true">↗</span></a>
      </article>
    </div></section>
    <section className="writing-bibliography"><div className="shell writing-layout"><header><span>02</span><h2>{copy("Writing in progress")}</h2></header><div className="bibliography-list">{drafts.map(item=><article key={item.title}><p className="project-status">{copy("In progress")}</p><h3>{copy(item.title)}</h3><p>{copy(item.summary)}</p></article>)}</div></div></section>
    <section className="writing-conference ink-section"><div className="shell writing-layout"><header><span>03</span><h2>{copy("Conference Work")}</h2><TrackedLink href={conferenceProfile} target="_blank" rel="noopener noreferrer" eventName="conference_profile_clicked">{copy("Official profile →")}</TrackedLink></header><div className="conference-writing-list">{events.slice(0,3).map(item=><article key={item.id}><p className="event-meta">{copy(item.location)} {item.year}</p><h3><a href={item.link} target="_blank" rel="noopener noreferrer">{copy(item.title)}</a></h3><p>{copy(item.description)}</p><span>{copy("Delivered")}</span></article>)}</div></div></section>
    <section className="writing-book"><div className="shell writing-book-grid"><div><span>04</span><h2>{copy("Book")}</h2><p className="project-status">{copy("Publication in preparation")}</p><h3>{copy("The Subconscious Architect")}</h3><p>{copy("The Living Blueprint maps five layers beneath behavior and identity.")}</p><Link className="button primary" href="/book">{copy("Explore the Book")}</Link></div><Image src="/assets/book_cover.jpg" alt={copy("Cover of The Subconscious Architect by Sinda Khenine.")} width={1600} height={2560} sizes="(max-width: 760px) 70vw, 330px"/></div></section>
  </div>;
}
