"use client";
import Image from "next/image";
import {useId,useState} from "react";
import type {FistbumpCampaign} from "@/content/projects/fistbump-campaign";
import styles from "./world.module.css";

export function FistbumpWorld({copy}:{copy:FistbumpCampaign}) {
  const [active,setActive]=useState(2);
  const id=useId();
  const guide=copy.guides[active];
  return <div className={styles.world}>
    <div className={styles.scene}>
      <div className={styles.orbit} aria-hidden="true"/><div className={styles.planet} aria-hidden="true"/>
      <span className={styles.starOne} aria-hidden="true">✳</span><span className={styles.starTwo} aria-hidden="true">✧</span>
      <p className={styles.worldTitle}>{copy.world}</p>
      <div className={styles.characters} role="group" aria-label={copy.choose}>
        {copy.guides.map((item,index)=><button key={item.id} type="button" className={`${styles.character} ${index===active ? styles.selected : ""}`} aria-label={`${item.name}: ${item.label}`} aria-pressed={index===active} aria-controls={`${id}-guide`} onClick={()=>setActive(index)}>
          <Image src={`/media/fistbump/${item.id}.png`} alt="" width={item.width} height={item.height} sizes="(max-width: 600px) 24vw, 150px"/>
          <span>{item.name}</span>
        </button>)}
      </div>
      <p className={styles.choose}><span aria-hidden="true">↑</span> {copy.choose}</p>
    </div>
    <div id={`${id}-guide`} className={styles.guide}>
      <div key={guide.id} className={styles.guideContent}>
        <p className={styles.label}><span aria-hidden="true">✦</span> {guide.label}</p>
        <h3>{guide.title}</h3><p className={styles.description}>{guide.description}</p>
        <a href={guide.href}>{guide.action}<span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>;
}
