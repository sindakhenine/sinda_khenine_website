import {createPageMetadata, profileSchema, serializeJsonLd} from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import {siteConfig} from "@/content/site/config";

export const metadata = createPageMetadata("/about", {title: "About · Founder of SKatalyst AI", description: "Meet Sinda Khenine, founder of SKatalyst AI and Senior AI, Data & BI Engineer. From childhood curiosity to enterprise data and agent systems.", image: "/assets/about/sinda-portrait-personal.jpg"});

const chapters = [
  {
    years: "2020 to present",
    role: "Senior Big Data & Business Intelligence Engineer",
    note: "Enterprise data platforms, business intelligence, machine learning and AI automation in an industrial environment.",
  },
  {
    years: "2017 to 2020",
    role: "Data Scientist, then Big Data Analyst",
    note: "Forecasting, predictive modelling, consumer-feedback analysis and bringing together data from different sources.",
  },
  {
    years: "2018 to 2020",
    role: "Engineering degree, Big Data & Business Intelligence",
    note: "École Polytechnique Internationale, following computer-science engineering studies at ESPRIT.",
  },
];

const beyond = [
  {
    name: "Speaking",
    title: "Sharing what I learn",
    note: "ML Conference talks on document understanding, context engineering and reliable AI agents.",
    href: "/speaking",
    link: "Explore my talks",
  },
  {
    name: "Writing",
    title: "Thinking on the page",
    note: "Notes and articles on data, AI and the questions that come up while building.",
    href: "/writing",
    link: "Explore my writing",
  },
  {
    name: "The book",
    title: "The Subconscious Architect",
    note: "My book explores the patterns behind human behaviour and identity. Currently in publication preparation.",
    href: "/book",
    link: "Discover the book",
  },
];

export default function About() {
  return <div className="plain-surface ab-page">
    <section className="ab-story" aria-labelledby="about-title">
      <div className="shell">
        <header className="ab-story-heading">
          <p className="ab-eyebrow">About me</p>
          <p className="ab-role">Founder, SKatalyst AI <span aria-hidden="true">|</span> Senior AI, Data &amp; BI Engineer</p>
          <h1 id="about-title">It started with <em>curiosity.</em></h1>
        </header>

        <div className="ab-story-grid">
          <figure className="ab-memory">
            <div className="ab-memory-print">
              <Image
                src="/assets/about/sinda-childhood-computer.jpg"
                alt="Sinda as a young girl, sitting at a desktop computer with her hands on the keyboard."
                width={1028}
                height={765}
                sizes="(max-width: 800px) calc(100vw - 64px), (max-width: 1240px) 50vw, 590px"
                priority
              />
            </div>
            <figcaption><span className="ab-photo-line" aria-hidden="true" />My journey started here.</figcaption>
          </figure>

          <div className="ab-story-copy">
            <p className="ab-story-lead">Long before AI agents, cloud platforms, or writing code for a living, there was a little girl sitting in front of a computer, fascinated by what it could do.</p>
            <p>That curiosity never really went away.</p>
            <p>Years later, I became a data and business intelligence engineer, working with complex enterprise systems and seeing firsthand how difficult it can be to turn business data into something useful.</p>
            <p>That’s what led me to build <a href={siteConfig.companyUrl}>SKatalyst AI</a>.</p>
            <p className="ab-story-reflection">The technology has changed.<br />The curiosity hasn’t.</p>
            <div className="ab-signature">
              <Image
                src="/assets/about/sinda-portrait-personal.jpg"
                alt="Sinda Khenine today."
                width={400}
                height={400}
                sizes="(max-width: 480px) 80px, 104px"
              />
              <div><strong>Sinda Khenine</strong><span>Founder, SKatalyst AI</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="ab-section ab-work" aria-labelledby="about-work-title">
      <div className="shell ab-work-grid">
        <div className="ab-now">
          <p className="ab-eyebrow">What I’m working on</p>
          <h2 id="about-work-title">Still curious.<br />Still building.</h2>
          <p>Today, I’m building SKatalyst AI and experimenting with agent-based systems: how to give agents useful context, coordinate their work and know when a person needs to step in.</p>
          <p>I also code with frontier AI coding agents, testing how they fit into the everyday work of building software.</p>
          <div className="actions"><Link className="button primary" href="/projects">Explore my projects <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="ab-background">
          <h3>The engineering behind it</h3>
          <ol className="ab-chapters">{chapters.map(chapter => <li key={chapter.role}>
            <span className="ab-years">{chapter.years}</span>
            <div><h4>{chapter.role}</h4><p>{chapter.note}</p></div>
          </li>)}</ol>
          <Link className="ab-text-link" href="/resume">View my full resume <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>

    <section className="ab-section ab-beyond" aria-labelledby="about-beyond-title">
      <div className="shell">
        <p className="ab-eyebrow">Beyond the code</p>
        <h2 id="about-beyond-title">A few other parts of me.</h2>
        <div className="ab-beyond-grid">{beyond.map(item => <article key={item.name}>
          <p className="ab-mini">{item.name}</p>
          <h3>{item.title}</h3>
          <p>{item.note}</p>
          <Link className="ab-text-link" href={item.href}>{item.link} <span aria-hidden="true">→</span></Link>
        </article>)}</div>
        <div className="ab-contact"><p>Want to talk about something you’re building?</p><Link className="ab-text-link" href="/contact">Let’s talk <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: serializeJsonLd(profileSchema)}}/>
  </div>;
}
