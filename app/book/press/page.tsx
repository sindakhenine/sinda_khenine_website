import {createPageMetadata} from "@/lib/seo";
import Link from "next/link";
import {siteConfig} from "@/content/site/config";
export const metadata = createPageMetadata("/book/press", {title: "Book Press & Media", description: "Author biography, book summary and interview contact for The Subconscious Architect by Sinda Khenine."});
export default function Press(){return <article className="shell page-wrap resource-page">
  <p className="eyebrow">The Subconscious Architect</p><h1>Press and media</h1><p className="lede">Author information and conversation topics for editors, interviewers and event hosts.</p>
  <h2>Short biography</h2><p>Sinda Khenine is an AI and data engineer, founder of SKatalyst AI, conference speaker and author of <i>The Subconscious Architect</i>. Her work connects engineering clarity, systems thinking, authorship and practical human reflection.</p>
  <h2>About the book</h2><p><i>The Subconscious Architect</i> uses the language of architecture to explore inherited patterns. Its Living Blueprint follows five layers: Ground, Frame, Wiring, Rooms and Facade. The book is a companion for reflection and personal growth, rather than medical or psychological advice.</p><p>The book is in publication preparation. Publication information is available on the <Link href="/book">book page</Link>.</p>
  <h2>Conversation topics</h2><ul><li>What engineering and authorship can teach each other.</li><li>How inherited patterns shape the decisions people repeat.</li><li>Using systems thinking without reducing human experience to a technical problem.</li><li>Writing the Living Blueprint and developing an independent book.</li></ul>
  <h2>Media inquiries</h2><p>For interviews, a longer biography or image-use requests, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with your publication, topic, deadline and intended use.</p><div className="actions"><Link className="button" href="/book/sample">Read selected excerpts</Link><Link className="button" href="/about">About Sinda</Link></div>
</article>}
