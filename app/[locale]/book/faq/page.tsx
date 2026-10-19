import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import {Link} from "@/i18n/navigation";
import {bookFaq} from "@/content/book/faq";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/book/faq", {title: "Book FAQ", description: "Questions about The Subconscious Architect, its Living Blueprint, formats and publication status."}, locale); }
export default async function BookFaq({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
return <article className="shell page-wrap resource-page"><p className="eyebrow">{copy("The Subconscious Architect")}</p><h1>{copy("Book FAQ")}</h1><div className="resource-list">{bookFaq.map(item=><div key={item.question}><h2>{copy(item.question)}</h2><p>{copy(item.answer)}</p></div>)}</div><div className="actions"><Link className="button" href="/book/discussion-guide">{copy("Reader discussion guide")}</Link><Link className="button" href="/book">{copy("Explore the book")}</Link></div></article>}
