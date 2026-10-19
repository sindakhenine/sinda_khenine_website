import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata, profileSchema, serializeJsonLd} from "@/lib/seo";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {siteConfig} from "@/content/site/config";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/about", {title: "About · Founder of SKatalyst AI", description: "Meet Sinda Khenine, founder of SKatalyst AI and Senior AI, Data & BI Engineer. From childhood curiosity to enterprise data and agent systems.", image: "/assets/about/sinda-portrait-personal.jpg"}, locale); }

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

export default async function About({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);

  return <div className="plain-surface ab-page">
    <section className="ab-story" aria-labelledby="about-title">
      <div className="shell">
        <header className="ab-story-heading">
          <p className="ab-eyebrow">{copy("About me")}</p>
          <p className="ab-role">{copy("Founder, SKatalyst AI ")}<span aria-hidden="true">|</span> {copy(" Senior AI, Data & BI Engineer")}</p>
          <h1 id="about-title">{copy("It started with ")}<em>{copy("curiosity.")}</em></h1>
        </header>

        <div className="ab-story-grid">
          <figure className="ab-memory">
            <div className="ab-memory-print">
              <Image
                src="/assets/about/sinda-childhood-computer.jpg"
                alt={copy("Sinda as a young girl, sitting at a desktop computer with her hands on the keyboard.")}
                width={1028}
                height={765}
                sizes="(max-width: 800px) calc(100vw - 64px), (max-width: 1240px) 50vw, 590px"
                priority
              />
            </div>
            <figcaption><span className="ab-photo-line" aria-hidden="true" />{copy("My journey started here.")}</figcaption>
          </figure>

          <div className="ab-story-copy">
            <p className="ab-story-lead">{copy("Long before AI agents, cloud platforms, or writing code for a living, there was a little girl sitting in front of a computer, fascinated by what it could do.")}</p>
            <p>{copy("That curiosity never really went away.")}</p>
            <p>{copy("Years later, I became a data and business intelligence engineer, working with complex enterprise systems and seeing firsthand how difficult it can be to turn business data into something useful.")}</p>
            <p>{copy("That’s what led me to build ")}<a href={copy.href(siteConfig.companyUrl)}>{copy("SKatalyst AI")}</a>.</p>
            <p className="ab-story-reflection">{copy("The technology has changed.")}<br />{copy("The curiosity hasn’t.")}</p>
            <div className="ab-signature">
              <Image
                src="/assets/about/sinda-portrait-personal.jpg"
                alt={copy("Sinda Khenine today.")}
                width={400}
                height={400}
                sizes="(max-width: 480px) 80px, 104px"
              />
              <div><strong>{copy("Sinda Khenine")}</strong><span>{copy("Founder, SKatalyst AI")}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="ab-section ab-work" aria-labelledby="about-work-title">
      <div className="shell ab-work-grid">
        <div className="ab-now">
          <p className="ab-eyebrow">{copy("What I’m working on")}</p>
          <h2 id="about-work-title">{copy("Still curious.")}<br />{copy("Still building.")}</h2>
          <p>{copy("Today, I’m building SKatalyst AI and experimenting with agent-based systems: how to give agents useful context, coordinate their work and know when a person needs to step in.")}</p>
          <p>{copy("I also code with frontier AI coding agents, testing how they fit into the everyday work of building software.")}</p>
          <div className="actions"><Link className="button primary" href="/projects">{copy("Explore my projects ")}<span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="ab-background">
          <h3>{copy("The engineering behind it")}</h3>
          <ol className="ab-chapters">{chapters.map(chapter => <li key={chapter.role}>
            <span className="ab-years">{copy(chapter.years)}</span>
            <div><h4>{copy(chapter.role)}</h4><p>{copy(chapter.note)}</p></div>
          </li>)}</ol>
          <Link className="ab-text-link" href="/resume">{copy("View my full resume ")}<span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>

    <section className="ab-section ab-beyond" aria-labelledby="about-beyond-title">
      <div className="shell">
        <p className="ab-eyebrow">{copy("Beyond the code")}</p>
        <h2 id="about-beyond-title">{copy("A few other parts of me.")}</h2>
        <div className="ab-beyond-grid">{beyond.map(item => <article key={item.name}>
          <p className="ab-mini">{copy(item.name)}</p>
          <h3>{copy(item.title)}</h3>
          <p>{copy(item.note)}</p>
          <Link className="ab-text-link" href={item.href}>{copy(item.link)} <span aria-hidden="true">→</span></Link>
        </article>)}</div>
        <div className="ab-contact"><p>{copy("Want to talk about something you’re building?")}</p><Link className="ab-text-link" href="/contact">{copy("Let’s talk ")}<span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: serializeJsonLd({...profileSchema, "@id": `https://sindakhenine.com${copy.href("/about")}#profile`, url: `https://sindakhenine.com${copy.href("/about")}`, name: copy(profileSchema.name), inLanguage: locale})}}/>
  </div>;
}
