import {FistbumpFeature} from "@/components/fistbump/FistbumpFeature";
import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import Image from "next/image";import {Link} from "@/i18n/navigation";import {projects,projectHref} from "@/content/projects/projects";import {LAST_UPDATED} from "@/content/site/config";import {magicalBookCoverBlur} from "@/content/projects/magicalBookBlur";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/projects", {title: "Projects", description: "Explore Fistbump, SKatalyst AI and Sinda Khenine’s experiments in AI agents, data engineering and creative technology."}, locale); }
export default async function Projects({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);

  const magical=projects.find(p=>p.slug==="the-magical-book")!;const skatalyst=projects.find(p=>p.slug==="skatalyst-ai")!;const reha=projects.find(p=>p.slug==="reha")!;const grok=projects.find(p=>p.slug==="grok-arena")!;const opac=projects.find(p=>p.slug==="one-person-ai-company")!;
  const cards: {project: typeof skatalyst; eyebrow: string; statement: string; summary: string; meta: string[]; cta: string; status: string[]; open: string; label: string; image: {src: string; alt: string; width: number; height: number}; blur?: string; phone?: {src: string; alt: string}}[] = [
    {project: skatalyst, eyebrow: "Agentic AI · Data Intelligence · Application Generation · AI Engineering", statement: "From fragmented organizational data to structured context and working applications.", summary: skatalyst.summary, meta: ["12 source types", "12-state lifecycle", "Validation oracle", "Multi-tenant SaaS"], cta: "Explore SKatalyst AI →", status: [skatalyst.status, " · Founder-led product since 2025"], open: "Open the SKatalyst AI case study", label: "app.skatalystai.com", image: {src: "/media/skatalyst/hero.jpg", alt: "SKatalyst AI recommending a SQL + Blob architecture from a detected inventory, with confidence and a transformation preview.", width: 1980, height: 1320}},
    {project: opac, eyebrow: "Autonomous Agents · Orchestration · AI Operations · OpenClaw", statement: "What if one person could delegate work to an entire AI organization?", summary: opac.summary, meta: ["24 h official run", "465 events", "11 read tools · 1 write"], cta: "Enter the experiment →", status: ["Experiment · not deployed"], open: "Open the One-Person AI Company case study", label: "/control/live", image: {src: "/media/one-person-ai-company/control-live.jpg", alt: "One-Person AI Company control room: run clock, budget, live topology graph, agent cards and the event stream of the official run.", width: 3200, height: 2000}},
    {project: reha, eyebrow: reha.discipline, statement: "A clearer weekly plan for a rehabilitation stay.", summary: reha.summary, meta: [], cta: "Read the case study →", status: ["Prototype · never deployed in clinical operation"], open: "Open the Reha case study", label: "RehaConnect · weekly plan (synthetic data)", image: {src: "/media/reha/weekly-plan.jpg", alt: "Reha prototype: three-week patient plan with meals, therapies and lectures per day.", width: 2480, height: 1560}, phone: {src: "/media/reha/m-session.jpg", alt: "Session detail on a phone with what to wear and what to bring."}},
    {project: grok, eyebrow: "Multi-Agent AI · Grok Bot · MCP · Simulation", statement: "An experimental environment for autonomous AI agents to compete, observe, intervene and evolve inside a shared world.", summary: "Four player agents and six system agents share one arena. Each reaches it only through role-scoped MCP tools; a deterministic engine resolves what actually happens, and the 3D control room makes every consequence visible.", meta: ["10 agent roles", "30 MCP tools", "20-turn matches"], cta: "Enter the case study →", status: ["Experiment · not deployed"], open: "Open the Grok Arena case study", label: "grok-arena", image: {src: "/media/grok-arena/hero.jpg", alt: "Grok Arena control room: a 3D arena with four agent robots, HUDs, rules, system-agent status and a live event stream.", width: 3436, height: 1858}},
    {project: magical, eyebrow: magical.discipline, statement: "ChronoAtlas, an interactive journey through ancient civilizations", summary: magical.summary, meta: ["10 civilizations", "23 experience states"], cta: "Explore the experiment →", status: ["Browser experiment"], open: "Open The Magical Book case study", label: "chronoatlas", image: {src: "/media/magical-book/cover.jpg", alt: "The Magical Book: a travelling guide holds an open, glowing book while the monuments of ten ancient civilizations rise behind him.", width: 1200, height: 480}, blur: magicalBookCoverBlur},
  ];
  return <div className="projects-page">
    <header className="shell page-hero page-hero-editorial"><p className="eyebrow">{copy("Selected work ")}<span className="last-updated-inline">{copy("· Last updated ")}{copy(LAST_UPDATED)}</span></p><h1>{copy("Projects and experiments.")}</h1><p className="lede">{copy("Some of these projects are products. Others are experiments I built to answer a question. Here’s what works, what I learned and what still needs work.")}</p></header>
    <FistbumpFeature locale={locale}/>
    <div className="shell pj-list">
      {cards.map((card, index) => <article className="pj-card" id={card.project.slug} key={card.project.slug} data-glow data-reveal>
        <div className="pj-copy">
          <p className="pj-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
          <p className="eyebrow">{copy(card.eyebrow)}</p>
          <h2>{copy(card.project.title)}</h2>
          <p className="pj-statement">{copy(card.statement)}</p>
          <p className="pj-summary">{copy(card.summary)}</p>
          <div className="pj-meta">{card.meta.map(item => <span key={item}>{copy(item)}</span>)}</div>
          <Link className="button primary" href={projectHref(card.project)}>{copy(card.cta)}</Link>
          <p className="pj-status">{card.status.map(part => copy(part)).join("")}</p>
        </div>
        <Link className="pj-media" href={projectHref(card.project)} aria-label={copy(card.open)}>
          <figure className="pj-frame"><div className="pj-frame-bar" aria-hidden="true"><i/><i/><i/><span>{copy(card.label)}</span></div><Image src={card.image.src} alt={copy(card.image.alt)} width={card.image.width} height={card.image.height} sizes="(max-width: 860px) 100vw, 620px" priority={index === 0} loading={index === 0 ? undefined : "lazy"} placeholder={card.blur ? "blur" : "empty"} blurDataURL={card.blur}/></figure>
          {card.phone && <figure className="pj-phone"><Image src={card.phone.src} alt={copy(card.phone.alt)} width={1170} height={2532} sizes="150px" loading="lazy"/></figure>}
        </Link>
      </article>)}
    </div>
  </div>
}
