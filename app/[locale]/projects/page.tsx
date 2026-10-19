import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import Image from "next/image";import {Link} from "@/i18n/navigation";import {ProductFrame} from "@/components/ProductFrame";import {projects,projectHref} from "@/content/projects/projects";import {LAST_UPDATED} from "@/content/site/config";import {magicalBookCoverBlur} from "@/content/projects/magicalBookBlur";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/projects", {title: "Projects", description: "Five projects by Sinda Khenine: SKatalyst AI, One-Person AI Company, Reha, Grok Arena and The Magical Book. Explore the systems and engineering behind them."}, locale); }
export default async function Projects({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);

  const magical=projects.find(p=>p.slug==="the-magical-book")!;const skatalyst=projects.find(p=>p.slug==="skatalyst-ai")!;const reha=projects.find(p=>p.slug==="reha")!;const grok=projects.find(p=>p.slug==="grok-arena")!;const opac=projects.find(p=>p.slug==="one-person-ai-company")!;
  return <div className="projects-page">
    <header className="shell page-hero page-hero-editorial"><p className="eyebrow">{copy("Selected work ")}<span className="last-updated-inline">{copy("· Last updated ")}{copy(LAST_UPDATED)}</span></p><h1>{copy("Five systems, built end to end.")}</h1><p className="lede">{copy("A platform that turns fragmented business data into software customers own, a 24-hour experiment in delegating a real objective to an AI organization, a healthcare workflow prototype designed from a patient’s week outward, an arena where autonomous agents act inside bounded rules, and an experimental interface that turns generated history into a place you can enter.")}</p></header>
    <div className="shell project-index-list">
      <article className="project-product" id="skatalyst-ai">
        <div className="project-product-copy">
          <p className="project-index-number" aria-hidden="true">01</p>
          <p className="eyebrow">{copy("Agentic AI · Data Intelligence · Application Generation · AI Engineering")}</p>
          <h2>{copy(skatalyst.title)}</h2>
          <p className="project-product-statement">{copy("From fragmented organizational data to structured context and working applications.")}</p>
          <p className="project-product-summary">{copy(skatalyst.summary)}</p>
          <div className="project-product-meta"><span>{copy("12 source types")}</span><span>{copy("12-state lifecycle")}</span><span>{copy("Validation oracle")}</span><span>{copy("Multi-tenant SaaS")}</span></div>
          <Link className="button primary" href={projectHref(skatalyst)}>{copy("Explore SKatalyst AI →")}</Link>
          <p className="project-product-status">{copy(skatalyst.status)} {copy(" · Founder-led product since 2025")}</p>
        </div>
        <Link className="project-product-media" href={projectHref(skatalyst)} aria-label={copy("Open the SKatalyst AI case study")}><ProductFrame src="/media/skatalyst/hero.jpg" alt={copy("SKatalyst AI recommending a SQL + Blob architecture from a detected inventory, with confidence and a transformation preview.")} width={1980} height={1320} label={copy("app.skatalystai.com")} sizes="(max-width: 900px) 100vw, 640px" priority/></Link>
      </article>
      <article className="project-opac" id="one-person-ai-company">
        <div className="project-opac-copy">
          <p className="project-index-number" aria-hidden="true">02</p>
          <div>
            <p className="eyebrow">{copy("Autonomous Agents · Orchestration · AI Operations · OpenClaw")}</p>
            <h2>{copy(opac.title)}</h2>
            <p className="project-opac-statement">{copy("What if one person could delegate work to an entire AI organization?")}</p>
            <p className="project-opac-summary">{copy("A 24-hour experiment: OpenClaw as manager, Grok Bot as researcher, deterministic code as accountant, PostgreSQL as the only truth and a live control room as the window. It produced a report, broke three times, and kept every receipt.")}</p>
            <div className="project-opac-meta"><span>{copy("24 h official run")}</span><span>{copy("465 events")}</span><span>{copy("11 read tools · 1 write")}</span><span>{copy("Experiment · not deployed")}</span></div>
            <Link className="button primary" href={projectHref(opac)}>{copy("Enter the experiment →")}</Link>
          </div>
        </div>
        <Link className="project-opac-media" href={projectHref(opac)} aria-label={copy("Open the One-Person AI Company case study")}><figure className="op-window" style={{margin:0}}><div className="op-window-bar"><span>{copy("one-person-ai-company")}</span><em>{copy("/control/live")}</em></div><Image src="/media/one-person-ai-company/control-live.jpg" alt={copy("One-Person AI Company control room: run clock, budget, live topology graph, agent cards and the event stream of the official run.")} width={3200} height={2000} sizes="(max-width: 900px) 100vw, 620px" loading="lazy"/></figure></Link>
      </article>
      <article className="project-reha" id="reha">
        <div>
          <p className="project-index-number" aria-hidden="true">03</p>
          <p className="eyebrow">{copy(reha.discipline)}</p>
          <h2>{copy(reha.title)}</h2>
          <p className="project-reha-statement">{copy("Reimagining the rehabilitation journey from the patient outward.")}</p>
          <p className="project-reha-summary">{copy("A three-role prototype (patient, therapist, administration) that turns a rehabilitation stay into one connected weekly plan: sessions with room, what to wear and what to bring, QR attendance, meals, free-time offers and orientation. Built from first-hand observation and proposed to rehabilitation organizations.")}</p>
          <span className="project-reha-flag">{copy("Prototype · never deployed in clinical operation")}</span><br/>
          <Link className="button primary" href={projectHref(reha)}>{copy("Read the case study →")}</Link>
        </div>
        <Link className="project-reha-media" href={projectHref(reha)} aria-label={copy("Open the Reha case study")}><ProductFrame src="/media/reha/weekly-plan.jpg" alt={copy("Reha prototype: three-week patient plan with meals, therapies and lectures per day.")} width={2480} height={1560} label={copy("RehaConnect · weekly plan (synthetic data)")} sizes="(max-width: 900px) 100vw, 520px"/><figure className="rh-phone"><Image src="/media/reha/m-session.jpg" alt={copy("Session detail on a phone with what to wear and what to bring.")} width={1170} height={2532} sizes="150px" loading="lazy"/><figcaption>{copy("Session detail")}</figcaption></figure></Link>
      </article>
      <article className="project-grok" id="grok-arena">
        <Link className="project-grok-cover" href={projectHref(grok)} aria-label={copy("Open the Grok Arena case study")}><Image src="/media/grok-arena/hero.jpg" alt={copy("Grok Arena control room: a 3D arena with four agent robots, HUDs, rules, system-agent status and a live event stream.")} width={3436} height={1858} sizes="(max-width: 1240px) 100vw, 1184px" loading="lazy"/></Link>
        <div className="project-grok-copy">
          <p className="project-index-number" aria-hidden="true">04</p>
          <div>
            <p className="eyebrow">{copy("Multi-Agent AI · Grok Bot · MCP · Simulation")}</p>
            <h2>{copy(grok.title)}</h2>
            <p className="project-grok-statement">{copy("An experimental environment for autonomous AI agents to compete, observe, intervene and evolve inside a shared world.")}</p>
            <p className="project-grok-summary">{copy("Four player agents and six system agents share one arena. Each reaches it only through role-scoped MCP tools; a deterministic engine resolves what actually happens, and the 3D control room makes every consequence visible.")}</p>
            <div className="project-grok-meta"><span>{copy("10 agent roles")}</span><span>{copy("30 MCP tools")}</span><span>{copy("20-turn matches")}</span><span>{copy("Experiment · not deployed")}</span></div>
            <Link className="button primary" href={projectHref(grok)}>{copy("Enter the case study →")}</Link>
          </div>
        </div>
      </article>
      <article className="project-feature" id="the-magical-book">
        <Link className="project-feature-cover" href={projectHref(magical)} aria-label={copy("Open The Magical Book case study")}><Image src="/media/magical-book/cover.jpg" alt={copy("The Magical Book: a travelling guide holds an open, glowing book while the monuments of ten ancient civilizations rise behind him.")} width={1200} height={480} sizes="(max-width: 1240px) 100vw, 1184px" priority placeholder="blur" blurDataURL={magicalBookCoverBlur}/></Link>
        <div className="project-feature-copy">
          <p className="project-index-number" aria-hidden="true">05</p>
          <div>
            <p className="eyebrow">{copy(magical.discipline)}</p>
            <h2>{copy(magical.title)}</h2>
            <p className="project-feature-subtitle">{copy("ChronoAtlas, an interactive journey through ancient civilizations")}</p>
            <p className="project-feature-summary">{copy(magical.summary)}</p>
            <div className="project-feature-meta"><span>{copy("10 civilizations")}</span><span>{copy("23 experience states")}</span><span>{copy("Browser experiment")}</span></div>
            <Link className="button primary" href={projectHref(magical)}>{copy("Explore the experiment →")}</Link>
          </div>
        </div>
      </article>
    </div>
  </div>
}
