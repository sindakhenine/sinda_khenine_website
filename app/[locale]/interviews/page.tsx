import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import {Link} from "@/i18n/navigation";
import {siteConfig} from "@/content/site/config";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/interviews", {title: "Interviews & Media", description: "Interview topics, speaker information and media contact for Sinda Khenine."}, locale); }
export default async function Interviews({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
return <article className="shell page-wrap resource-page">
  <p className="eyebrow">{copy("Media and conversations")}</p><h1>{copy("Interviews and media")}</h1><p className="lede">{copy("Conversations about building reliable AI, experimenting with agent systems and translating complex ideas into practical work.")}</p>
  <h2>{copy("Topics I can speak about")}</h2><ul><li>{copy("AI orchestration, persistent agents and the limits of autonomy.")}</li><li>{copy("Context engineering, source quality and governed enterprise data.")}</li><li>{copy("Building software with frontier AI coding agents.")}</li><li>{copy("The experience of founding SKatalyst AI.")}</li><li>{copy("Systems thinking and the Living Blueprint in ")}<i>{copy("The Subconscious Architect")}</i>.</li></ul>
  <h2>{copy("For hosts and editors")}</h2><p>{copy("Please include the publication or show, topic, format, audience and proposed date in your inquiry.")}</p><div className="actions"><a className="button primary" href={copy.href(`mailto:${siteConfig.email}?subject=Interview%20inquiry`)}>{copy("Request an interview")}</a><Link className="button" href="/book/press">{copy("Biography and book information")}</Link><Link className="button" href="/speaking">{copy("Conference sessions")}</Link></div>
</article>}
