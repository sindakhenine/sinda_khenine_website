import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import Image from "next/image";import {Link} from "@/i18n/navigation";import {MediaVideo} from "@/components/MediaVideo";import {TrackedLink} from "@/components/TrackedLink";import {projects,projectHref} from "@/content/projects/projects";import {magicalBookCoverBlur} from "@/content/projects/magicalBookBlur";
import {BookFeature} from "@/components/book/BookFeature";
import {siteConfig} from "@/content/site/config";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/", {title: siteConfig.title, description: siteConfig.description}, locale); }
export default async function Home({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
const featured=projects.filter(p=>p.featured);return <div className="home-page">
  <header className="shell home-intro">
    <div className="home-intro-copy">
      <p className="eyebrow hero-role">{copy(siteConfig.headline)}</p>
      <h1>Sinda<br/><span>Khenine</span><span className="name-period" aria-hidden="true">.</span></h1>
      <p className="hero-thesis">{copy("Curiosity is still how I work.")}</p>
      <p className="home-intro-note">{copy("I’m a data engineer and the founder of SKatalyst AI. I build software, experiment with AI agents and share what I learn along the way.")}</p>
      <div className="actions"><Link className="button primary" href="#work">{copy("See what I’m building")} <span aria-hidden="true">↘</span></Link><Link className="home-text-link" href="/about">{copy("A little about me")} <span aria-hidden="true">↗</span></Link></div>
      <TrackedLink className="home-now" href="https://skatalystai.com" eventName="skatalyst_link_clicked"><span className="now-dot" aria-hidden="true"/><span>{copy("Currently building")} <strong>SKatalyst AI</strong></span><span aria-hidden="true">↗</span></TrackedLink>
    </div>
    <div className="home-photo-story">
      <figure className="home-portrait">
        <Image src="/assets/about/sinda-portrait-personal.jpg" alt={copy("Portrait of Sinda Khenine.")} width={400} height={400} sizes="(max-width: 760px) 82vw, 440px" priority/>
        <figcaption>{copy("Founder, SKatalyst AI")}<span>{copy("Based in Germany")}</span></figcaption>
      </figure>
      <Link className="home-memory" href="/about">
        <Image src="/assets/about/sinda-childhood-computer.jpg" alt={copy("Sinda as a young girl, sitting at a desktop computer with her hands on the keyboard.")} width={1028} height={765} sizes="(max-width: 760px) 160px, 200px"/>
        <span>{copy("It started here.")} <span aria-hidden="true">↗</span></span>
      </Link>
      <svg className="home-story-line" viewBox="0 0 210 160" fill="none" aria-hidden="true"><path d="M180 12C75 5 207 125 86 100S17 145 17 145M10 130l7 15 15-9"/></svg>
    </div>
  </header>
  <nav className="shell home-chapters" aria-label={copy("Explore my work")}>
    <Link href="#work"><span>01</span>{copy("Projects")}<span aria-hidden="true">↓</span></Link>
    <Link href="/speaking"><span>02</span>{copy("Speaking")}<span aria-hidden="true">↗</span></Link>
    <Link href="/writing"><span>03</span>{copy("Writing")}<span aria-hidden="true">↗</span></Link>
    <Link href="/book"><span>04</span>{copy("The book")}<span aria-hidden="true">↗</span></Link>
  </nav>
  <section className="featured-presentation home-film"><div className="shell">
    <div className="section-head" data-reveal><div><p className="eyebrow">{copy("A short introduction")}</p><h2>{copy("A few things I’m working on.")}</h2></div><p>{copy("A quick look at my work in data, SKatalyst AI and the book I’m writing.")}</p></div>
    <div className="home-film-frame" data-reveal><MediaVideo src="/assets/sinda_presentation.mp4" poster="/assets/sinda-introduction-poster.jpg" label={copy("An introduction to Sinda Khenine’s work")}/></div>
    <div className="home-film-caption"><span>{copy("An introduction in 24 seconds")}</span><Link href="/speaking">{copy("My conference talks")} <span aria-hidden="true">↗</span></Link></div>
  </div></section>
  <section className="home-projects" id="work"><div className="shell section-head" data-reveal><div><p className="eyebrow">{copy("Selected work")}</p><h2>{copy("What I’ve been building.")}</h2></div><p>{copy("Some of these projects are products. Others are experiments I built to answer a question. Here’s what works, what I learned and what still needs work.")}</p></div><div className="shell home-project-list">{featured.map((p,i)=>{const cover=p.slug==="one-person-ai-company"?{src:"/media/one-person-ai-company/control-live.jpg",alt:"One-Person AI Company control room: run clock, budget, live topology graph, agent cards and event stream.",width:3200,height:2000}:p.slug==="grok-arena"?{src:"/media/grok-arena/hero.jpg",alt:"Grok Arena control room with four agent robots in a 3D arena, HUDs and system-agent status.",width:3436,height:1858}:p.slug==="reha"?{src:"/media/reha/weekly-plan.jpg",alt:"Reha prototype: a three-week patient plan with meals, therapies and lectures per day.",width:2480,height:1560}:p.slug==="the-magical-book"?{src:"/media/magical-book/cover.jpg",alt:"The Magical Book: a guide holding a glowing open book in front of ten ancient civilizations.",width:1200,height:480}:{src:"/media/skatalyst/hero.jpg",alt:"SKatalyst AI recommending an architecture from a detected data inventory, with confidence and a transformation preview.",width:1980,height:1320};return <article className={`home-project home-project-${p.slug}`} key={p.slug} data-reveal><Link className="home-project-media" href={projectHref(p)} aria-label={copy(`Open ${p.title}`)}><Image src={cover.src} alt={copy(cover.alt)} width={cover.width} height={cover.height} sizes="(max-width: 820px) 100vw, 560px" loading="lazy" placeholder={p.slug==="the-magical-book"?"blur":"empty"} blurDataURL={p.slug==="the-magical-book"?magicalBookCoverBlur:undefined}/></Link><div className="home-project-copy"><p className="project-index-number" aria-hidden="true">{copy(String(i+1).padStart(2,"0"))}</p><div><h3>{copy(p.title)}</h3><p className="eyebrow">{copy(p.discipline)}</p><p className="home-project-tagline">{copy(p.tagline)}</p><p>{copy(p.summary)}</p><Link href={projectHref(p)}>{copy(p.slug==="the-magical-book"?"Explore the experiment →":p.slug==="reha"?"Read the case study →":p.slug==="grok-arena"?"Enter the case study →":p.slug==="one-person-ai-company"?"Enter the experiment →":"Explore SKatalyst AI →")}</Link></div></div></article>})}</div></section>
  <BookFeature locale={locale}/>
  <section className="home-contact"><div className="shell home-contact-grid" data-reveal><div><p className="eyebrow">{copy("Get in touch")}</p><h2>{copy("What are you working on?")}</h2></div><div><p>{copy("If you’re building something with data or AI, or looking for a speaker, I’d like to hear about it.")}</p><Link className="button primary" href="/contact">{copy("Let’s talk")} <span aria-hidden="true">↗</span></Link><div className="home-socials"><a href={siteConfig.social.linkedin} rel="me">LinkedIn ↗</a><a href={siteConfig.social.x} rel="me">X ↗</a></div></div></div></section>
</div>}
