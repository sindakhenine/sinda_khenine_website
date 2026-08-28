import Link from "next/link";
import {CodePortrait} from "@/components/CodePortrait";

export const metadata={title:"About",description:"Sinda Khenine: engineer, founder, builder, speaker and author. Data and AI engineering, autonomous agents, products, interactive experiments and writing, held together by one instinct: build to understand."};

const questions=[
  {name:"SKatalyst AI",href:"/projects/skatalyst-ai",q:"How can fragmented organizational information become structured context and useful software?"},
  {name:"One-Person AI Company",href:"/projects/one-person-ai-company",q:"How much ongoing work can actually be delegated to persistent agents?"},
  {name:"Reha",href:"/projects/reha",q:"How can technology reduce friction around a real human routine?"},
  {name:"Grok Arena",href:"/projects/grok-arena",q:"What changes when AI agents are given roles, tools and consequences?"},
  {name:"The Magical Book",href:"/projects/the-magical-book",q:"Can generated media become an experience someone feels they entered?"}
];
const foundation=[
  ["Data engineering","Large-scale data platforms and pipelines in an industrial environment."],
  ["Big data","Apache Spark and distributed processing for analytical workloads."],
  ["Business intelligence","Governed analytics, dashboards and decision systems people actually use."],
  ["Machine learning","Forecasting, predictive modelling and statistical analysis since 2017."],
  ["AI systems","Context engineering, document understanding, validation and evaluation."],
  ["Agent systems","Bounded tools, evidence, human escalation and graduated autonomy."],
  ["Technical architecture","Deployment choices that keep systems inspectable and portable."]
];
const chapters=[
  {years:"2020 to present",role:"Senior Big Data & Business Intelligence Engineer",note:"Data platforms, analytical decision systems, machine-learning workflows and AI automation, industrial scale."},
  {years:"2017 to 2020",role:"Data Scientist, then Big Data Analyst",note:"Forecasting, heterogeneous-source integration, consumer-feedback analysis and predictive modelling."},
  {years:"2018 to 2020",role:"Engineering degree, Big Data & Business Intelligence",note:"Ecole Polytechnique Internationale, after computer-science engineering studies at ESPRIT."}
];

export default function About(){return <main className="plain-surface ab-page">
  <section className="ab-hero" data-reveal-scope><div className="shell ab-hero-grid">
    <div className="ab-hero-copy">
      <p className="ab-eyebrow">Engineer · Founder · Builder · Speaker · Author</p>
      <h1>I build to understand.</h1>
      <p className="ab-lede">I’m Sinda Khenine, an engineer, founder, speaker, author and builder. My work moves between data, AI, autonomous agents, products, interactive experiments and writing. The subjects change, but the instinct stays the same: understand something deeply enough to build something useful from it.</p>
      <p className="ab-intro">I spend my days on enterprise data platforms and reliable AI systems. I spend the rest of my time asking what those systems could become: a company run by agents for 24 hours, an arena where agents face consequences, a story you can walk into, a rehabilitation week with less friction, and a book about the structures people carry without noticing. Different subjects, one habit.</p>
      <div className="actions ab-actions"><Link className="button primary" href="/projects">See what I build</Link><Link className="button" href="/contact">Start a conversation</Link></div>
    </div>
    <div className="ab-hero-art">
      <CodePortrait photo="/assets/sinda_picture.jpeg" texture="/assets/about/portrait-code.webp" tile="/assets/about/code-tile.png" width={1024} height={1024} alt="Portrait of Sinda Khenine."/>
    </div>
  </div></section>

  <section className="ab-section"><div className="shell">
    <p className="ab-index">02 · The thread through my work</p>
    <div className="ab-two">
      <div><h2>Every project started as a question I could not answer at a desk.</h2></div>
      <div><p className="ab-lede">Different projects come from different questions. A platform, an experiment, a prototype and a story do not look alike, but each one exists because reading about the subject was not enough. At some point the only way to understand it was to build it and watch what happened.</p></div>
    </div>
    <ol className="ab-questions">{questions.map(x=><li key={x.name}><Link href={x.href}><span className="ab-q-name">{x.name}</span><span className="ab-q-text">{x.q}</span><span className="ab-q-arrow" aria-hidden="true">→</span></Link></li>)}</ol>
    <p className="ab-note">The answers live in the case studies. What this page is about is the habit behind them: curiosity, and building things to understand difficult systems.</p>
  </div></section>

  <section className="ab-section ab-foundation"><div className="shell">
    <p className="ab-index">03 · Professional foundation</p>
    <div className="ab-two">
      <div><h2>Underneath the experiments is an engineering career.</h2><p className="ab-lede">More than eight years across industrial analytics, machine learning, data platforms and AI-driven decision systems. The experiments borrow their discipline from this work: evidence, contracts, review, and systems a real team can maintain.</p>
        <ol className="ab-chapters">{chapters.map(c=><li key={c.role}><span>{c.years}</span><div><strong>{c.role}</strong><p>{c.note}</p></div></li>)}</ol>
        <p className="ab-note">SKatalyst AI is where this foundation became a product: a founder-led platform, in private beta, that turns fragmented business data into software customers own. It is one important chapter, not the whole story. A PhD on reliable enterprise AI, context engineering, data governance and agent systems is planned for late 2026.</p>
      </div>
      <dl className="ab-areas">{foundation.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    </div>
  </div></section>

  <section className="ab-section ab-beyond"><div className="shell">
    <p className="ab-index">04 · Beyond software</p>
    <div className="ab-two">
      <div><h2>Systems aren’t only technical.</h2><p className="ab-lede">The curiosity that makes me take a data platform apart also applies to people. Speaking is where I test whether an idea survives explanation. Writing is where I find out whether I understood it at all. And the book asks the same question about human behaviour that I ask about software: what hidden structure is producing this pattern?</p></div>
      <div className="ab-beyond-list">
        <article><p className="ab-mini">Speaking</p><h3>ML Conference, Munich and Berlin</h3><p>Sessions on document understanding at scale, context engineering and reliable agents; Munich 2026 completed, Berlin 2026 upcoming, three earlier sessions in 2025.</p><Link href="/speaking">Speaking →</Link></article>
        <article><p className="ab-mini">Writing</p><h3>Articles and conference work</h3><p>Drafts on context engineering, governed output and why reliable agents need boundaries, alongside the material behind the talks.</p><Link href="/writing">Writing →</Link></article>
        <article><p className="ab-mini">Author</p><h3><i>The Subconscious Architect</i></h3><p>A Living Blueprint with five layers beneath behaviour and identity, written for people who want depth without performance. In publication preparation, coming 2026.</p><Link href="/book">The book →</Link></article>
      </div>
    </div>
  </div></section>

  <section className="ab-close"><div className="shell"><p className="ab-index">In one line</p><h2>Understand something deeply enough to build something useful from it.</h2><div className="actions"><Link className="button primary" href="/projects">Explore the work</Link><Link className="button" href="/resume">Resume</Link><Link className="button" href="/contact">Contact</Link></div></div></section>
</main>}
