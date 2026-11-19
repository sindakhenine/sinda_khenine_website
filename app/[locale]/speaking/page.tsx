import Image from "next/image";
import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import {ConferenceVideo} from "@/components/ConferenceVideo";
import {TrackedLink} from "@/components/TrackedLink";
import {berlinPhotos, conferenceProfile, events} from "@/content/speaking/events";
import {publishedArticle} from "@/content/writing/articles";
import styles from "./speaking.module.css";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return createPageMetadata("/speaking", {title: "Speaking", description: "Talks by Sinda Khenine at MLcon Berlin and Munich on context engineering, AI agents and enterprise data, with photos from Berlin 2026.", image: berlinPhotos[0].src}, locale);
}

export default async function Speaking({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const copy = getCopy(locale);
  const date = new Intl.DateTimeFormat(locale, {day:"numeric", month:"long", year:"numeric", timeZone:"UTC"});
  return <div className="speaking-page plain-surface">
    <header className="shell speaking-page-hero page-hero page-hero-editorial">
      <p className="eyebrow">{copy("On stage")}</p><h1>{copy("Speaking")}</h1>
      <p className="lede">{copy("Talks on context engineering, AI agents and the enterprise data behind them. Here are the sessions I’ve delivered in Berlin and Munich.")}</p>
    </header>
    <section className={styles.berlin} id="berlin-2026" aria-labelledby="berlin-title"><div className="shell">
      <header className={styles.featureHead}>
        <div><p className="eyebrow">{copy("Latest talks · AI Native Week")}</p><h2 id="berlin-title">MLcon Berlin 2026</h2></div>
        <div><time dateTime="2026-11-19">{date.format(new Date("2026-11-19T12:00:00Z"))}</time><p>{copy("Two sessions on building reliable context and giving enterprise agents the boundaries to act.")}</p></div>
      </header>
      <div className={styles.gallery}>{berlinPhotos.map((photo,index) => <a key={photo.src} href={photo.src} target="_blank" rel="noopener noreferrer" className={index === 0 ? styles.mainPhoto : styles.smallPhoto}>
        <Image src={photo.src} alt={copy(photo.alt)} width={photo.width} height={photo.height} sizes={index === 0 ? "(max-width: 700px) 100vw, 65vw" : "(max-width: 700px) 50vw, 33vw"} priority={index === 0}/><span aria-hidden="true">↗</span>
      </a>)}</div>
      <p className={styles.caption}>{copy("From the room in Berlin. Select a photo to view it in full.")}</p>
      <div className={styles.talks}>{events.slice(0,2).map((event,index) => <article key={event.id}>
        <p className={styles.number}>0{index + 1} <span>{copy("Delivered · Berlin 2026")}</span></p>
        <h3><a href={event.link} target="_blank" rel="noopener noreferrer">{copy(event.title)}</a></h3>
        <p className={styles.subtitle}>{copy(event.subtitle)}</p><p>{copy(event.description)}</p>
        <a className={styles.textLink} href={event.link} target="_blank" rel="noopener noreferrer">{copy("Official session")} <span aria-hidden="true">↗</span></a>
      </article>)}</div>
      <aside className={styles.articleNote}><p>{copy("Read the article behind the context engineering talk.")}</p><a href={publishedArticle.url} target="_blank" rel="noopener noreferrer">{copy("Read my article on VibeKode")} ↗</a></aside>
    </div></section>
    <section className="speaking-history plain-surface"><div className="shell">
      <div className="history-heading"><p className="eyebrow">{copy("2025–2026 · ML Conference")}</p><h2>{copy("Earlier sessions")}</h2></div>
      <div className={styles.history}>{events.slice(2).map(event => <article key={event.id}>
        <p className={styles.historyMeta}>{copy(event.location)} · {event.year}<span>{copy("Completed")}</span></p>
        <div><h3><a href={event.link} target="_blank" rel="noopener noreferrer">{copy(event.title)}</a></h3>{event.description && <p>{copy(event.description)}</p>}</div>
        <a href={event.link} target="_blank" rel="noopener noreferrer" aria-label={`${copy("Official session")}: ${copy(event.title)}`}>↗</a>
      </article>)}</div>
      <TrackedLink className="button" href={conferenceProfile} target="_blank" rel="noopener noreferrer" eventName="conference_profile_clicked">{copy("View official ML Conference profile")}</TrackedLink>
    </div></section>
    <section className="conference-reel-section plain-surface"><div className="wide-shell"><div className="section-head"><div><p className="eyebrow">{copy("Conference reel")}</p><h2>{copy("A look at my talks.")}</h2></div></div><ConferenceVideo/></div></section>
    <div className={`shell ${styles.contact}`}><div className="speaking-contact"><h2>{copy("Contact for speaking")}</h2><a className="button primary" href="mailto:founder@skatalystai.com">founder@skatalystai.com</a></div></div>
  </div>;
}
