import {createPageMetadata} from "@/lib/seo";
import Link from "next/link";
import {bookFaq} from "@/content/book/faq";
export const metadata = createPageMetadata("/book/faq", {title: "Book FAQ", description: "Questions about The Subconscious Architect, its Living Blueprint, formats and publication status."});
export default function BookFaq(){return <article className="shell page-wrap resource-page"><p className="eyebrow">The Subconscious Architect</p><h1>Book FAQ</h1><div className="resource-list">{bookFaq.map(item=><div key={item.question}><h2>{item.question}</h2><p>{item.answer}</p></div>)}</div><div className="actions"><Link className="button" href="/book/discussion-guide">Reader discussion guide</Link><Link className="button" href="/book">Explore the book</Link></div></article>}
