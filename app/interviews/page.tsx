import {createPageMetadata} from "@/lib/seo";
import Link from "next/link";
import {siteConfig} from "@/content/site/config";
export const metadata = createPageMetadata("/interviews", {title: "Interviews & Media", description: "Interview topics, speaker information and media contact for Sinda Khenine."});
export default function Interviews(){return <article className="shell page-wrap resource-page">
  <p className="eyebrow">Media and conversations</p><h1>Interviews and media</h1><p className="lede">Conversations about building reliable AI, experimenting with agent systems and translating complex ideas into practical work.</p>
  <h2>Topics I can speak about</h2><ul><li>AI orchestration, persistent agents and the limits of autonomy.</li><li>Context engineering, source quality and governed enterprise data.</li><li>Building software with frontier AI coding agents.</li><li>The experience of founding SKatalyst AI.</li><li>Systems thinking and the Living Blueprint in <i>The Subconscious Architect</i>.</li></ul>
  <h2>For hosts and editors</h2><p>Please include the publication or show, topic, format, audience and proposed date in your inquiry.</p><div className="actions"><a className="button primary" href={`mailto:${siteConfig.email}?subject=Interview%20inquiry`}>Request an interview</a><Link className="button" href="/book/press">Biography and book information</Link><Link className="button" href="/speaking">Conference sessions</Link></div>
</article>}
