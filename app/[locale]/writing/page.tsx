import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import Image from "next/image";import {Link} from "@/i18n/navigation";import {TrackedLink} from "@/components/TrackedLink";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/writing", {title: "Writing", description: "Articles, conference work and book writing by Sinda Khenine."}, locale); }
const articles=[
{title:"Context Engineering for Reliable Enterprise AI",status:"In progress",summary:"How context quality, retrieval and provenance shape dependable enterprise AI."},
{title:"From Context-Aware Ingestion to Governed Output",status:"In progress",summary:"A technical approach to organizing sources and validating generated outputs."},
{title:"Reliable AI Agents Need Boundaries",status:"In progress",summary:"Tool constraints, evidence, evaluation and human escalation for enterprise agents."}
];
const conference=[
{title:"Context Engineering Is the New Prompt Engineering",year:"Berlin 2026",status:"Conference material",summary:"A scheduled ML Con Berlin session on source quality, retrieval, permissions and reliable context."},
{title:"From Answering to Acting",year:"Berlin 2026",status:"Conference material",summary:"An upcoming ML Con Berlin session on bounded tools and accountable agent action."},
{title:"Document Understanding at Scale",year:"Munich 2026",status:"Conference material",summary:"Noisy OCR, modular extraction, validation and human review."}
];
export default async function Writing({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
return <div className="plain-surface writing-page-premium"><header className="shell page-hero page-hero-editorial"><h1>{copy("Articles, conference work and a book.")}</h1></header><section className="writing-bibliography"><div className="shell writing-layout"><header><span>01</span><h2>{copy("Writing in progress")}</h2></header><div className="bibliography-list">{articles.map(item=><article key={item.title}><p className="project-status">{copy(item.status)}</p><h3>{copy(item.title)}</h3><p>{copy(item.summary)}</p></article>)}</div></div></section><section className="writing-conference ink-section"><div className="shell writing-layout"><header><span>02</span><h2>{copy("Conference Work")}</h2><TrackedLink href="https://mlconference.ai/speaker/sinda-khenine/" target="_blank" rel="noopener noreferrer" eventName="conference_profile_clicked">{copy("Official profile →")}</TrackedLink></header><div className="conference-writing-list">{conference.map(item=><article key={item.title}><p className="event-meta">{copy(item.year)}</p><h3>{copy(item.title)}</h3><p>{copy(item.summary)}</p><span>{copy(item.status)}</span></article>)}</div></div></section><section className="writing-book"><div className="shell writing-book-grid"><div><span>03</span><h2>{copy("Book")}</h2><p className="project-status">{copy("Publication in preparation")}</p><h3>{copy("The Subconscious Architect")}</h3><p>{copy("The Living Blueprint maps five layers beneath behavior and identity.")}</p><Link className="button primary" href="/book">{copy("Explore the Book")}</Link></div><Image src="/assets/book_cover.jpg" alt={copy("Cover of The Subconscious Architect by Sinda Khenine.")} width={1600} height={2560} sizes="(max-width: 760px) 70vw, 330px"/></div></section></div>}
