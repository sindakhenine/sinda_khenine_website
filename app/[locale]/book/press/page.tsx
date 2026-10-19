import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import {Link} from "@/i18n/navigation";
import {siteConfig} from "@/content/site/config";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/book/press", {title: "Book Press & Media", description: "Author biography, book summary and interview contact for The Subconscious Architect by Sinda Khenine."}, locale); }
export default async function Press({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
return <article className="shell page-wrap resource-page">
  <p className="eyebrow">{copy("The Subconscious Architect")}</p><h1>{copy("Press and media")}</h1><p className="lede">{copy("Author information and conversation topics for editors, interviewers and event hosts.")}</p>
  <h2>{copy("Short biography")}</h2><p>{copy("Sinda Khenine is an AI and data engineer, founder of SKatalyst AI, conference speaker and author of ")}<i>{copy("The Subconscious Architect")}</i>{copy(". Her work connects engineering clarity, systems thinking, authorship and practical human reflection.")}</p>
  <h2>{copy("About the book")}</h2><p><i>{copy("The Subconscious Architect")}</i> {copy(" uses the language of architecture to explore inherited patterns. Its Living Blueprint follows five layers: Ground, Frame, Wiring, Rooms and Facade. The book is a companion for reflection and personal growth, rather than medical or psychological advice.")}</p><p>{copy("The book is in publication preparation. Publication information is available on the ")}<Link href="/book">{copy("book page")}</Link>.</p>
  <h2>{copy("Conversation topics")}</h2><ul><li>{copy("What engineering and authorship can teach each other.")}</li><li>{copy("How inherited patterns shape the decisions people repeat.")}</li><li>{copy("Using systems thinking without reducing human experience to a technical problem.")}</li><li>{copy("Writing the Living Blueprint and developing an independent book.")}</li></ul>
  <h2>{copy("Media inquiries")}</h2><p>{copy("For interviews, a longer biography or image-use requests, email ")}<a href={copy.href(`mailto:${siteConfig.email}`)}>{copy(siteConfig.email)}</a> {copy(" with your publication, topic, deadline and intended use.")}</p><div className="actions"><Link className="button" href="/book/sample">{copy("Read selected excerpts")}</Link><Link className="button" href="/about">{copy("About Sinda")}</Link></div>
</article>}
