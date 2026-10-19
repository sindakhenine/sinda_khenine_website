import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {canonicalUrl, createPageMetadata, entityIds, serializeJsonLd} from "@/lib/seo";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {Layers} from "@/components/Layers";
import {MediaVideo} from "@/components/MediaVideo";
import {TrackedLink} from "@/components/TrackedLink";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/book", {title: "The Subconscious Architect", description: "The book by Sinda Khenine: a Living Blueprint for understanding the hidden structures that shape how we think, decide, build relationships, and live.", image: "/assets/book_cover.jpg"}, locale); }

const readers=["Professionals","Founders","Engineers","People rebuilding after change","Readers interested in psychology without pop psychology"];
const journey=[
  {title:"Understand inherited patterns",copy:"See where familiar reactions began and what they once protected."},
  {title:"Recognize invisible structures",copy:"Give language to the beliefs, emotional circuits, and roles beneath daily life."},
  {title:"Redesign internal architecture",copy:"Question what still belongs and make room for more deliberate choices."},
  {title:"Build lasting change",copy:"Create support for change that can hold under the weight of real life."}
];

export default async function Book({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
const schema={"@context":"https://schema.org","@type":"Book",name:"The Subconscious Architect","@id":canonicalUrl("/book#book"),url:canonicalUrl("/book"),author:{"@id":entityIds.person,"@type":"Person",name:"Sinda Khenine"},abstract:"A Living Blueprint for understanding the hidden structures that shape how we think, decide, build relationships, and live."};return <>
  <header className="shell book-hero editorial-book-hero"><div><p className="eyebrow">{copy("The Subconscious Architect")}</p><h1>{copy("The Subconscious Architect")}</h1><p className="hero-thesis">{copy("A Living Blueprint for understanding the hidden structures that shape how we think, decide, build relationships, and live.")}</p><TrackedLink className="button primary" href="#a-glimpse-inside" eventName="book_excerpt_opened">{copy("Read selected excerpts")}</TrackedLink></div><Image className="cover editorial-cover" src="/assets/book_cover.jpg" alt={copy("Cover of The Subconscious Architect by Sinda Khenine.")} width={1600} height={2560} sizes="(max-width: 800px) 76vw, 480px" priority/></header>

  <section className="ink-section book-video-section book-teaser-prominent"><div className="wide-shell"><div className="section-head"><div><p className="eyebrow">{copy("Book teaser")}</p><h2>{copy("Enter the blueprint.")}</h2></div><p>{copy("A brief visual introduction to the house, its hidden structure, and the possibility of drawing differently.")}</p></div><MediaVideo src="/assets/book_teaser.mp4" poster="/assets/book-teaser-poster.jpg" label={copy("Teaser for The Subconscious Architect")}/></div></section>

  <section className="book-question-section"><div className="shell book-question-layout"><div className="book-cover-echo" aria-hidden="true"><Image src="/assets/book_cover-720.jpg" alt={copy("")} width={720} height={1152}/><span>{copy("What lies beneath the life we know?")}</span></div><div><p className="eyebrow">{copy("The question that inspired the book")}</p><h2>{copy("Why do capable people keep repeating patterns they consciously want to change?")}</h2><p>{copy("The book begins beneath visible behavior, where old protection, inherited beliefs, and familiar roles can continue shaping a life long after their origins are forgotten.")}</p></div></div></section>

  <section className="living-blueprint-section"><div className="shell blueprint-section"><div className="blueprint-heading"><p className="eyebrow">{copy("The central idea")}</p><h2>{copy("The Living Blueprint")}</h2><p>{copy("Five connected layers reveal how inherited foundations become the life we show the world.")}</p><div className="blueprint-rule" aria-hidden="true"><span/><span/><span/></div></div><Layers/></div></section>

  <section id="a-glimpse-inside" className="author-note-section glimpse-section"><div className="shell"><div className="section-head"><div><p className="eyebrow">{copy("A Glimpse Inside")}</p><h2>{copy("Two invitations to look closer.")}</h2></div><p>{copy("Short lines from the Introduction open the central tension without giving away the journey.")}</p></div><div className="editorial-excerpts"><article><p>{copy("A simple sentence that questions the assumption that visible success always reflects inner stability.")}</p><blockquote>{copy("“You are good at your life.”")}<cite>{copy("Introduction")}</cite></blockquote></article><article><p>{copy("The invitation to become the architect of your own blueprint rather than its passive occupant.")}</p><blockquote>{copy("“You never chose this house. But you are the only one who can hold the pencil now.”")}<cite>{copy("Introduction")}</cite></blockquote></article></div></div></section>

  <section className="discover-section"><div className="shell"><div className="discover-heading"><p className="eyebrow">{copy("What readers will discover")}</p><h2>{copy("A journey from recognition to change.")}</h2></div><div className="book-journey">{journey.map((step,index)=><article key={step.title}><span>{copy(String(index+1).padStart(2,"0"))}</span><div><h3>{copy(step.title)}</h3><p>{copy(step.copy)}</p></div></article>)}</div><div className="reader-layout compact-reader-layout"><div><p className="eyebrow">{copy("Who this book is for")}</p><h2>{copy("For people who want depth without performance.")}</h2></div><div className="reader-cards">{readers.map(reader=><article key={reader}><h3>{copy(reader)}</h3></article>)}</div></div></div></section>

  <section className="ink-section about-book-author"><div className="shell author-portrait-layout"><Image src="/assets/sinda_picture-960.jpg" alt={copy("Portrait of Sinda Khenine.")} width={960} height={960} sizes="(max-width: 800px) 88vw, 420px"/><div><p className="eyebrow">{copy("About the author")}</p><h2>{copy("Why I wrote this book.")}</h2><p>{copy("I wrote this book because I wanted a clearer language for the patterns we inherit, protect, and repeat. The Living Blueprint grew from my need to understand those structures honestly, without reducing a life to a slogan or a quick fix.")}</p><Link className="button" href="/about">{copy("About Sinda")}</Link></div></div></section>

  <section><div className="shell publication-panel book-publication-close"><div><p className="eyebrow">{copy("Publication status")}</p><h2>{copy("Coming 2026")}</h2><p>{copy("The book is currently in publication preparation.")}</p></div><div className="publication-cover-mark"><Image src="/assets/book_cover-720.jpg" alt={copy("Cover of The Subconscious Architect by Sinda Khenine.")} width={720} height={1152}/><a className="button primary" href={copy.href("mailto:founder@skatalystai.com?subject=Publication%20inquiry%20-%20The%20Subconscious%20Architect")}>{copy("Ask about publication")}</a></div></div></section>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd(schema)}}/>
  </>}
