"use client";

import Image from "next/image";
import {useEffect, useId, useRef, useState} from "react";
import styles from "./fistbump.module.css";

export function FistbumpTeaser({watch, close, note}: {watch: string; close: string; note: string}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);
  return <>
    <button className={styles.teaserButton} type="button" aria-haspopup="dialog" onClick={() => {dialog.current?.showModal(); setOpen(true);}}>
      <Image src="/media/fistbump/teaser-poster.jpg" alt="" width={48} height={64}/>
      <span className={styles.playIcon} aria-hidden="true">▶</span><span>{watch}<small>0:31</small></span><span aria-hidden="true">↗</span>
    </button>
    <dialog ref={dialog} className={styles.teaserDialog} aria-labelledby={titleId}
      onClose={() => {video.current?.pause(); setOpen(false);}}
      onClick={event => {if (event.target === event.currentTarget) dialog.current?.close();}}>
      <div className={styles.teaserHead}><h2 id={titleId}>{watch}</h2><button type="button" onClick={() => dialog.current?.close()} aria-label={close}>×</button></div>
      {open && <video ref={video} controls playsInline preload="metadata" poster="/media/fistbump/teaser-poster.jpg" aria-label={watch}><source src="/media/fistbump/teaser.mp4" type="video/mp4"/></video>}
      <p>{note}</p>
    </dialog>
  </>;
}
