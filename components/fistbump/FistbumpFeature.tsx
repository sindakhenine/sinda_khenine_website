import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {fistbumpLinks, getFistbumpCopy} from "@/content/projects/fistbump";
import styles from "./fistbump.module.css";
import {FistbumpTeaser} from "./FistbumpTeaser";

export function FistbumpArtwork({locale}: {locale: string}) {
  const t = getFistbumpCopy(locale);
  return <div className={styles.art} role="img" aria-label={t.illustration}>
    <div className={styles.orbit}/><div className={styles.orbitInner}/>
    <span className={styles.artWord} aria-hidden="true">hello.</span>
    <Image className={styles.daisy} src="/media/fistbump/daisy.png" alt="" width={374} height={502} sizes="(max-width: 600px) 43vw, 240px"/>
    <Image className={styles.astro} src="/media/fistbump/astro.png" alt="" width={302} height={498} sizes="(max-width: 600px) 40vw, 220px"/>
    <span className={styles.artDot} aria-hidden="true"/>
    <span className={styles.artCaption} aria-hidden="true">fistbump.world</span>
  </div>;
}

export function FistbumpFeature({locale, detail = false}: {locale: string; detail?: boolean}) {
  const t = getFistbumpCopy(locale);
  const Heading = detail ? "h1" : "h2";
  return <section id="fistbump" className={styles.feature} aria-labelledby="fistbump-title">
    <div className="shell">
      <div className={styles.topline}><span>{t.label}</span><span className={styles.live}><i/>{t.live}</span></div>
      <div className={styles.featureGrid}>
        <div className={styles.featureCopy}>
          <p className={styles.wordmark}>fistbump<span aria-hidden="true">↗</span></p>
          <Heading id="fistbump-title">{t.headline}</Heading>
          <p className={styles.intro}>{t.intro}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={fistbumpLinks.app}>{t.open}<span aria-hidden="true">↗</span></a>
            {detail ? <a className={styles.textLink} href="#reasons">{t.explore}<span aria-hidden="true">↓</span></a> : <Link className={styles.textLink} href="/projects/fistbump#reasons">{t.explore}<span aria-hidden="true">→</span></Link>}
          </div>
          <p className={styles.signIn}>{t.signIn}</p>
        </div>
        <div><FistbumpArtwork locale={locale}/><FistbumpTeaser watch={t.watch} close={t.closeVideo} note={t.videoNote}/></div>
      </div>
      <div className={styles.paths}>
        <a href={fistbumpLinks.app}><span className={styles.pathNumber}>01</span><span><strong>{t.meet}</strong><small>{t.meetShort}</small></span><span aria-hidden="true">↗</span></a>
        <a href={fistbumpLinks.news}><span className={styles.pathNumber}>02</span><span><strong>{t.news}</strong><small>{t.newsShort}</small></span><span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>;
}
