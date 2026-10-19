import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import {Link} from "@/i18n/navigation";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/research", {title: "Research", description: "Sinda Khenine’s applied research interests in context engineering, AI orchestration and reliable agent systems."}, locale); }
export default async function Research({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
return <article className="shell page-wrap resource-page">
  <p className="eyebrow">{copy("Applied research")}</p><h1>{copy("Reliable AI, examined through practice.")}</h1><p className="lede">{copy("My work explores what makes AI systems dependable when they use organizational data, call tools and act over time. These questions connect my engineering work, independent experiments and conference sessions.")}</p>
  <h2>{copy("Context engineering")}</h2><p>{copy("How can source quality, retrieval, permissions and provenance give agents the information they need while preserving the boundaries around it?")}</p><Link href="/projects/skatalyst-ai">{copy("Explore SKatalyst AI →")}</Link>
  <h2>{copy("Agent orchestration")}</h2><p>{copy("How should specialized agents coordinate persistent work, record decisions, verify claims and involve a human when the evidence is insufficient?")}</p><Link href="/projects/one-person-ai-company">{copy("Read the 24-hour orchestration experiment →")}</Link>
  <h2>{copy("Bounded autonomy and evaluation")}</h2><p>{copy("What changes when agents receive distinct roles, scoped tools and a shared environment where the consequences of their decisions are visible?")}</p><Link href="/projects/grok-arena">{copy("Explore Grok Arena →")}</Link>
  <h2>{copy("Research conversations")}</h2><p>{copy("I welcome conversations about reliable enterprise AI, data governance, context engineering and evaluation of agent systems.")}</p><div className="actions"><Link className="button primary" href="/contact">{copy("Discuss a research question")}</Link><Link className="button" href="/speaking">{copy("Conference sessions")}</Link></div>
</article>}
