import {createPageMetadata} from "@/lib/seo";
import Link from "next/link";
export const metadata = createPageMetadata("/research", {title: "Research", description: "Sinda Khenine’s applied research interests in context engineering, AI orchestration and reliable agent systems."});
export default function Research(){return <article className="shell page-wrap resource-page">
  <p className="eyebrow">Applied research</p><h1>Reliable AI, examined through practice.</h1><p className="lede">My work explores what makes AI systems dependable when they use organizational data, call tools and act over time. These questions connect my engineering work, independent experiments and conference sessions.</p>
  <h2>Context engineering</h2><p>How can source quality, retrieval, permissions and provenance give agents the information they need while preserving the boundaries around it?</p><Link href="/projects/skatalyst-ai">Explore SKatalyst AI →</Link>
  <h2>Agent orchestration</h2><p>How should specialized agents coordinate persistent work, record decisions, verify claims and involve a human when the evidence is insufficient?</p><Link href="/projects/one-person-ai-company">Read the 24-hour orchestration experiment →</Link>
  <h2>Bounded autonomy and evaluation</h2><p>What changes when agents receive distinct roles, scoped tools and a shared environment where the consequences of their decisions are visible?</p><Link href="/projects/grok-arena">Explore Grok Arena →</Link>
  <h2>Research conversations</h2><p>I welcome conversations about reliable enterprise AI, data governance, context engineering and evaluation of agent systems.</p><div className="actions"><Link className="button primary" href="/contact">Discuss a research question</Link><Link className="button" href="/speaking">Conference sessions</Link></div>
</article>}
