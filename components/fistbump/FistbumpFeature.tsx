import {Link} from "@/i18n/navigation";
import {fistbumpLinks,getFistbumpCopy} from "@/content/projects/fistbump";
import {getFistbumpCampaign} from "@/content/projects/fistbump-campaign";
import {FistbumpWorld} from "./FistbumpWorld";
import {FistbumpTeaser} from "./FistbumpTeaser";
import styles from "./fistbump.module.css";

export function FistbumpFeature({locale,detail=false}:{locale:string;detail?:boolean}) {
  const t=getFistbumpCopy(locale);
  const campaign=getFistbumpCampaign(locale);
  const Heading=detail ? "h1" : "h2";
  const learnContent=<><span className={styles.pathNumber}>02</span><span><strong>{t.learn}</strong><small>{t.learnShort}</small></span><span aria-hidden="true">↗</span></>;
  return <section id="fistbump" className={detail ? styles.feature : `${styles.feature} ${styles.site}`} aria-labelledby="fistbump-title"><div className="shell">
    <div className={styles.topline}><span>{t.label}</span><span className={styles.live}><i/>{t.live}</span></div>
    <div className={styles.featureGrid}>
      <div className={styles.featureCopy}>
        <p className={styles.wordmark}>fistbump<span aria-hidden="true">✳</span></p>
        <Heading id="fistbump-title">{t.headline}<em>{t.headlineAccent}</em></Heading>
        <p className={styles.intro}>{t.intro}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={fistbumpLinks.app}>{t.open}<span aria-hidden="true">↗</span></a>
          {detail ? <a className={styles.textLink} href="#reasons">{t.explore}<span aria-hidden="true">↓</span></a> : <Link className={styles.textLink} href="/projects/fistbump#reasons">{t.explore}<span aria-hidden="true">→</span></Link>}
        </div>
        <p className={styles.signIn}>{t.signIn}</p>
        <Link href="/about" className={styles.creator}>{campaign.creator}</Link>
      </div>
      <div className={styles.visual}><FistbumpWorld copy={campaign}/><FistbumpTeaser watch={t.watch} close={t.closeVideo} note={t.videoNote}/></div>
    </div>
    <div className={styles.paths}>
      <a href={fistbumpLinks.news}><span className={styles.pathNumber}>01</span><span><strong>{t.news}</strong><small>{t.newsShort}</small></span><span aria-hidden="true">↗</span></a>
      {detail ? <a href="#learn">{learnContent}</a> : <Link href="/projects/fistbump#learn">{learnContent}</Link>}
      <a href={fistbumpLinks.app}><span className={styles.pathNumber}>03</span><span><strong>{t.meet}</strong><small>{t.meetShort}</small></span><span aria-hidden="true">↗</span></a>
    </div>
  </div></section>;
}
