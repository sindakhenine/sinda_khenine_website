"use client";

import Image from "next/image";
import {useId, useState} from "react";
import type {FistbumpBenefitsCopy} from "@/content/projects/fistbump-benefits";
import styles from "./benefits.module.css";

const crew: Record<string, {width: number; height: number}> = {
  astro: {width:302, height:498}, daisy: {width:374, height:502},
  sleuth: {width:325, height:537}, drizzle: {width:280, height:461}, echo: {width:329, height:535},
};

export function FistbumpBenefits({copy}: {copy: FistbumpBenefitsCopy}) {
  const [active, setActive] = useState<number | null>(0);
  const [lastActive, setLastActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefix = useId();
  const selected = copy.items[active ?? lastActive];
  return <section id="reasons" className={`${styles.section} ${paused ? styles.paused : ""}`} aria-labelledby={`${prefix}-title`}>
    <div className={styles.heading}>
      <div><p className="eyebrow">{copy.eyebrow}</p><h2 id={`${prefix}-title`}>{copy.title}</h2><p>{copy.intro}</p></div>
      <button className={styles.motionToggle} type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? copy.resume : copy.pause}
      </button>
    </div>
    <div className={styles.layout}>
      <aside className={styles.stage} aria-label={copy.stageLabel}>
        <div className={styles.stageTop}><span>{copy.stageLabel}</span><span>0{(active ?? lastActive) + 1} / 08</span></div>
        <div className={styles.scene} aria-hidden="true">
          <div className={styles.ring}/><div className={styles.ringTwo}/>
          <span className={styles.sparkOne}>✳</span><span className={styles.sparkTwo}>✧</span>
          <div className={styles.spotlight} key={selected.id}>
            <span className={styles.bubble}>{selected.bubble}</span>
            <Image className={styles.persona} src={`/media/fistbump/${selected.character}.png`} alt="" {...crew[selected.character]} sizes="260px"/>
          </div>
          <span className={styles.ground}/>
        </div>
        <div className={styles.crew} aria-hidden="true">{Object.entries(crew).map(([name, size]) => <Image key={name} className={selected.character === name ? styles.crewActive : ""} src={`/media/fistbump/${name}.png`} alt="" {...size} sizes="60px"/>)}</div>
      </aside>
      <ol className={styles.list}>
        {copy.items.map((item, index) => {
          const expanded = active === index;
          const buttonId = `${prefix}-${item.id}-button`;
          const panelId = `${prefix}-${item.id}-panel`;
          return <li id={item.id} key={item.id} className={expanded ? styles.active : ""}>
            <h3><button id={buttonId} className={styles.reason} type="button" aria-expanded={expanded} aria-controls={panelId}
              onClick={() => {setActive(expanded ? null : index); setLastActive(index);}}>
              <span className={styles.number} aria-hidden="true">0{index + 1}</span>
              <span className={styles.avatar} aria-hidden="true"><Image src={`/media/fistbump/${item.character}.png`} alt="" {...crew[item.character]} sizes="64px"/></span>
              <span className={styles.words}><span className={styles.reasonTitle}>{item.title}{item.plus && <small className={styles.plus}>{copy.plus}</small>}</span><span className={styles.summary}>{item.summary}</span></span>
              <span className={styles.expand} aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button></h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded} className={styles.panel}>
              <p>{item.detail}</p><a href={item.href}>{item.action}<span aria-hidden="true">↗</span></a>
            </div>
          </li>;
        })}
      </ol>
    </div>
    <div className={styles.start}><strong>{copy.free}</strong><p>{copy.planNote}</p></div>
  </section>;
}
