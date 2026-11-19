import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import Image from "next/image";import {Link} from "@/i18n/navigation";import {IntroReel} from "@/components/IntroReel";import {TrackedLink} from "@/components/TrackedLink";import {projects,projectHref} from "@/content/projects/projects";import {magicalBookCoverBlur} from "@/content/projects/magicalBookBlur";
import {FistbumpFeature} from "@/components/fistbump/FistbumpFeature";
import {BookFeature} from "@/components/book/BookFeature";
import {siteConfig} from "@/content/site/config";
import {events} from "@/content/speaking/events";
import {SocialLinks} from "@/components/SocialLinks";
const expertise = ["AI orchestration and agent systems", "Context engineering and RAG", "MCP and bounded tool use", "Agent evaluation and observability", "Frontier AI coding agents", "Enterprise data architecture", "Apache Spark and data pipelines", "Business intelligence and analytics", "Machine learning and forecasting", "Document understanding and validation"];
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/", {title: siteConfig.title, description: siteConfig.description}, locale); }
export default async function Home({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
const featured=projects.filter(p=>p.featured);const reel=locale==="de"||locale==="fr"?locale:"en";return <div className="home-page">
  <header className="hx">
    <div className="hx-orbs" aria-hidden="true"><i/><i/><i/></div>
    <div className="shell hx-grid">
      <div className="hx-copy">
        <TrackedLink className="hx-badge" href="https://skatalystai.com" eventName="skatalyst_link_clicked"><span className="now-dot" aria-hidden="true"/><span>{copy("Currently building")} <strong>SKatalyst AI</strong></span><span aria-hidden="true">↗</span></TrackedLink>
        <h1 className="hx-title"><span>Sinda</span> <span className="hx-grad">Khenine</span></h1>
        <p className="eyebrow hx-role">{copy(siteConfig.headline)}</p>
        <p className="hx-thesis">{copy("Curiosity is still how I work.")}</p>
        <p className="hx-note">{copy("I’m a data engineer and the founder of SKatalyst AI. I build software, experiment with AI agents and share what I learn along the way.")}</p>
        <div className="actions"><Link className="button primary" href="#work">{copy("See what I’m building")} <span aria-hidden="true">↘</span></Link><Link className="button" href="/resume">{copy("Resume")} <span aria-hidden="true">↓</span></Link><Link className="home-text-link" href="/about">{copy("A little about me")} <span aria-hidden="true">↗</span></Link></div>
        <SocialLinks className="social-links hx-social"/>
      </div>
      <div className="hx-visual" data-tilt>
        <div className="hx-ring" aria-hidden="true"/>
        <figure className="hx-portrait">
          <Image src="/assets/about/sinda-portrait-personal.jpg" alt={copy("Portrait of Sinda Khenine.")} width={400} height={400} sizes="(max-width: 760px) 82vw, 440px" priority/>
        </figure>
        <span className="hx-chip hx-chip-a">{copy("Founder, SKatalyst AI")}</span>
        <span className="hx-chip hx-chip-b">{copy("MLcon speaker")}</span>
        <span className="hx-chip hx-chip-c">{copy("Based in Germany")}</span>
        <Link className="hx-memory" href="/about">
          <Image src="/assets/about/sinda-childhood-computer.jpg" alt={copy("Sinda as a young girl, sitting at a desktop computer with her hands on the keyboard.")} width={1028} height={765} sizes="(max-width: 760px) 150px, 190px"/>
          <span>{copy("It started here.")} <span aria-hidden="true">↗</span></span>
        </Link>
      </div>
    </div>
    <div className="hx-marquee" aria-hidden="true"><div>{[...expertise, ...expertise].map((item, i) => <span key={i}>{copy(item)}</span>)}</div></div>
  </header>
  <section className="hx-stats" aria-label={copy("At a glance")}><div className="shell hx-stat-grid">
    <div className="hx-stat" data-glow data-reveal><strong>2017</strong><span>{copy("Working with data and AI since")}</span></div>
    <div className="hx-stat" data-glow data-reveal><strong>{events.length}</strong><span>{copy("Conference sessions at MLcon Berlin and Munich")}</span></div>
    <div className="hx-stat" data-glow data-reveal><strong>{projects.length}</strong><span>{copy("Products and experiments, documented openly")}</span></div>
    <div className="hx-stat" data-glow data-reveal><strong>EN · DE · FR</strong><span>{copy("This site and my resume, in three languages")}</span></div>
  </div></section>
  <nav className="shell home-chapters" aria-label={copy("Explore my work")}>
    <Link href="#work" data-glow><span>01</span>{copy("Projects")}<span aria-hidden="true">↓</span></Link>
    <Link href="/speaking" data-glow><span>02</span>{copy("Speaking")}<span aria-hidden="true">↗</span></Link>
    <Link href="/writing" data-glow><span>03</span>{copy("Writing")}<span aria-hidden="true">↗</span></Link>
    <Link href="/book" data-glow><span>04</span>{copy("The book")}<span aria-hidden="true">↗</span></Link>
  </nav>
  <FistbumpFeature locale={locale}/>
  <section className="featured-presentation home-film"><div className="shell">
    <div className="section-head" data-reveal><div><p className="eyebrow">{copy("A short introduction")}</p><h2>{copy("My story, in 25 seconds.")}</h2></div><p>{copy("From a curious kid at a computer to AI engineer, founder, speaker and author.")}</p></div>
    <div className="home-film-frame" data-reveal><IntroReel src={`/media/intro/sinda-intro-${reel}.mp4`} poster={`/media/intro/sinda-intro-${reel}-poster.jpg`} label={copy("An introduction to Sinda Khenine’s work")}/></div>
    <div className="home-film-caption"><span>{copy("25 seconds. No sound needed.")}</span><Link href="/speaking">{copy("My conference talks")} <span aria-hidden="true">↗</span></Link></div>
  </div></section>
  <section className="home-projects" id="work"><div className="shell section-head" data-reveal><div><p className="eyebrow">{copy("Selected work")}</p><h2>{copy("What I’ve been building.")}</h2></div><p>{copy("Some of these projects are products. Others are experiments I built to answer a question. Here’s what works, what I learned and what still needs work.")}</p></div><div className="shell home-project-list">{featured.map((p,i)=>{const cover=p.slug==="one-person-ai-company"?{src:"/media/one-person-ai-company/control-live.jpg",alt:"One-Person AI Company control room: run clock, budget, live topology graph, agent cards and event stream.",width:3200,height:2000}:p.slug==="grok-arena"?{src:"/media/grok-arena/hero.jpg",alt:"Grok Arena control room with four agent robots in a 3D arena, HUDs and system-agent status.",width:3436,height:1858}:p.slug==="reha"?{src:"/media/reha/weekly-plan.jpg",alt:"Reha prototype: a three-week patient plan with meals, therapies and lectures per day.",width:2480,height:1560}:p.slug==="the-magical-book"?{src:"/media/magical-book/cover.jpg",alt:"The Magical Book: a guide holding a glowing open book in front of ten ancient civilizations.",width:1200,height:480}:{src:"/media/skatalyst/hero.jpg",alt:"SKatalyst AI recommending an architecture from a detected data inventory, with confidence and a transformation preview.",width:1980,height:1320};return <article className={`home-project home-project-${p.slug}`} key={p.slug} data-reveal data-glow><Link className="home-project-media" href={projectHref(p)} aria-label={copy(`Open ${p.title}`)}><Image src={cover.src} alt={copy(cover.alt)} width={cover.width} height={cover.height} sizes="(max-width: 820px) 100vw, 560px" loading="lazy" placeholder={p.slug==="the-magical-book"?"blur":"empty"} blurDataURL={p.slug==="the-magical-book"?magicalBookCoverBlur:undefined}/></Link><div className="home-project-copy"><p className="project-index-number" aria-hidden="true">{copy(String(i+1).padStart(2,"0"))}</p><div><h3>{copy(p.title)}</h3><p className="eyebrow">{copy(p.discipline)}</p><p className="home-project-tagline">{copy(p.tagline)}</p><p>{copy(p.summary)}</p><Link href={projectHref(p)}>{copy(p.slug==="the-magical-book"?"Explore the experiment →":p.slug==="reha"?"Read the case study →":p.slug==="grok-arena"?"Enter the case study →":p.slug==="one-person-ai-company"?"Enter the experiment →":"Explore SKatalyst AI →")}</Link></div></div></article>})}</div></section>
  <BookFeature locale={locale}/>
  <section className="home-contact"><div className="shell home-contact-grid" data-reveal><div><p className="eyebrow">{copy("Get in touch")}</p><h2>{copy("What are you working on?")}</h2></div><div><p>{copy("If you’re building something with data or AI, or looking for a speaker, I’d like to hear about it.")}</p><Link className="button primary" href="/contact">{copy("Let’s talk")} <span aria-hidden="true">↗</span></Link><div className="home-socials"><a href={siteConfig.social.github} rel="me">GitHub ↗</a><a href={siteConfig.social.linkedin} rel="me">LinkedIn ↗</a><a href={siteConfig.social.x} rel="me">X ↗</a></div></div></div></section>
</div>}
