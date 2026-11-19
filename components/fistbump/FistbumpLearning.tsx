import type {FistbumpCampaign} from "@/content/projects/fistbump-campaign";
import styles from "./learning.module.css";

export function FistbumpLearning({copy}:{copy:FistbumpCampaign}) {
  return <section id="learn" className={styles.learning} aria-labelledby="fistbump-learning-title">
    <div className={styles.introduction}><p className="eyebrow">{copy.learning}</p><h2 id="fistbump-learning-title">{copy.learningTitle}</h2><p>{copy.learningIntro}</p></div>
    <div className={styles.layout}>
      <ol className={styles.steps}>{copy.steps.map((step,index)=><li key={step.href}>
        <a href={step.href}><span className={styles.number} aria-hidden="true">0{index+1}</span><span><strong>{step.title}</strong><small>{step.detail}</small></span><span className={styles.arrow} aria-hidden="true">↗</span></a>
      </li>)}</ol>
      <figure className={styles.tour}><div className={styles.tourHeading}><span aria-hidden="true">◉</span>{copy.tour}<span>0:15</span></div><video controls playsInline preload="none" poster="/media/fistbump/news-tour-poster.jpg" aria-label={copy.tour}><source src="/media/fistbump/news-tour.mp4" type="video/mp4"/><track kind="captions" src="/media/fistbump/news-tour-en.vtt" srcLang="en" label="English"/></video><figcaption>{copy.tourNote}</figcaption></figure>
    </div>
  </section>;
}
