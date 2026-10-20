"use client";

import Image from "next/image";
import {useEffect, useId, useRef, useState} from "react";
import {track} from "@vercel/analytics";
import {Link} from "@/i18n/navigation";
import styles from "./book.module.css";

type Labels = {
  title: string; eyebrow: string; invitation: string; description: string;
  open: string; coverAction: string; coverAlt: string; more: string; status: string;
  caption: string; previewTitle: string; close: string; previous: string; next: string;
  finish: string; navigation: string; previewNote: string; parts: string[];
  openingHeading: string; openingNote: string; openingQuote: string; introduction: string;
  openingAfter: string; blueprintHeading: string; blueprintNote: string; blueprintTitle: string;
  layers: {name: string; detail: string}[]; reflectionHeading: string; reflection: string;
  reflectionNote: string; closingQuote: string; signature: string;
};

function Floorplan({active = -1, className = ""}: {active?: number; className?: string}) {
  return <svg className={className} viewBox="0 0 320 340" fill="none" aria-hidden="true">
    <g className={styles.planGuide}>
      <path d="M12 40H308M12 300H308M40 12V328M280 12V328M12 12l14 14m268 288 14 14M294 26l14-14M12 328l14-14"/>
      <circle cx="160" cy="170" r="130"/>
    </g>
    <g className={styles.planRooms}>
      <path className={active === 0 ? styles.planActive : ""} d="M40 250H280V300H40Z"/>
      <path className={active === 1 ? styles.planActive : ""} d="M40 40H150V150H40Z"/>
      <path className={active === 2 ? styles.planActive : ""} d="M170 40H280V180H170Z"/>
      <path className={active === 3 ? styles.planActive : ""} d="M40 170H150V230H40Z"/>
      <path className={active === 4 ? styles.planActive : ""} d="M170 200H280V230H170Z"/>
      <path d="M40 40H280V300H40ZM150 150a40 40 0 0 1 40 40m-40-40v40h40M210 250v-35m0 0a35 35 0 0 1 35 35"/>
    </g>
    <path className={styles.planFine} d="M16 40v260m-5-260h10m-10 260h10M40 318h240m-240-5v10m240-10v10"/>
  </svg>;
}

export function BookExperience({labels, standalone = false}: {labels: Labels; standalone?: boolean}) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [layer, setLayer] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const Heading = standalone ? "h1" : "h2";
  const Wrapper = standalone ? "header" : "section";

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function showPreview() {
    setPage(0);
    setLayer(0);
    dialog.current?.showModal();
    setOpen(true);
    track("book_excerpt_opened");
  }

  function closePreview() { dialog.current?.close(); }

  return <>
    <Wrapper id="the-book" className={`${styles.feature} ${standalone ? styles.standalone : ""}`}>
      <div className={`shell ${styles.featureInner}`}>
        <div className={styles.editionLine}>
          <span>{labels.eyebrow}</span><span>{labels.status}<span className={styles.statusDot}/></span>
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.stage}>
            <Floorplan className={styles.stagePlan}/>
            <span className={styles.stageRule} aria-hidden="true"/>
            <button type="button" className={styles.bookButton} onClick={showPreview} aria-label={labels.coverAction} aria-haspopup="dialog">
              <span className={styles.bookObject}>
                <span className={styles.bookSpine} aria-hidden="true"><span>The Subconscious Architect</span><span>Sinda Khenine</span></span>
                <span className={styles.bookPages} aria-hidden="true"/>
                <span className={styles.bookFront}>
                  <Image src="/assets/book_cover.jpg" alt={labels.coverAlt} width={1600} height={2560} sizes="(max-width: 600px) 230px, 300px" priority={standalone}/>
                </span>
              </span>
            </button>
            <span className={styles.stageCaption}><span aria-hidden="true">↗</span>{labels.caption}</span>
          </div>
          <div className={styles.featureCopy} data-reveal>
            <p className={styles.overline}>{labels.blueprintTitle}</p>
            <Heading className={styles.title}>{labels.title}</Heading>
            <p className={styles.invitation}>{labels.invitation}</p>
            <p className={styles.description}>{labels.description}</p>
            <div className={styles.featureActions}>
              <button type="button" onClick={showPreview} className={styles.openButton} aria-haspopup="dialog">
                <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><path d="M12 5v15M3 4c4-1 7 0 9 2 2-2 5-3 9-2v14c-4-1-7 0-9 2-2-2-5-3-9-2V4Z" stroke="currentColor" strokeWidth="1.2"/></svg>
                {labels.open}<span aria-hidden="true">↗</span>
              </button>
              <Link className={styles.storyLink} href={standalone ? "#about-the-author" : "/book"}>{labels.more} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
        <div className={styles.featureFoot} aria-hidden="true"><span>Sinda Khenine</span><span>THE SUBCONSCIOUS ARCHITECT</span><span>01 / 05</span></div>
      </div>
    </Wrapper>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId} onClose={() => setOpen(false)}
      onClick={event => {if (event.target === event.currentTarget) closePreview();}}
      onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          setPage(current => Math.max(0, Math.min(2, current + (event.key === "ArrowRight" ? 1 : -1))));
        }
      }}>
      <div className={styles.reader}>
        <div className={styles.readerBar}><h2 id={titleId}>{labels.previewTitle}</h2><button type="button" onClick={closePreview} className={styles.closeButton} aria-label={labels.close}><span aria-hidden="true">×</span></button></div>
        {open && <>
          <nav className={styles.previewNav} aria-label={labels.navigation}>
            {labels.parts.map((part, index) => <button type="button" key={part} aria-pressed={page === index} onClick={() => setPage(index)}><span>0{index + 1}</span>{part}</button>)}
          </nav>
          <div className={styles.spread} key={page}>
            <div className={styles.leftPage}>
              <div className={styles.runningHead}>Sinda Khenine<span aria-hidden="true">✳</span></div>
              {page === 0 && <div className={styles.chapterOpening}><span className={styles.chapterNumber} aria-hidden="true">01</span><h3>{labels.openingHeading}</h3><p>{labels.openingNote}</p><Floorplan className={styles.openingPlan}/></div>}
              {page === 1 && <div className={styles.layerChooser}><h3>{labels.blueprintHeading}</h3><p>{labels.blueprintNote}</p><div role="group" aria-label={labels.blueprintTitle}>{labels.layers.map((item, index) => <button type="button" key={item.name} onClick={() => setLayer(index)} aria-pressed={layer === index}><span>0{index + 1}</span>{item.name}<span aria-hidden="true">↗</span></button>)}</div></div>}
              {page === 2 && <div className={styles.reflection}><span className={styles.chapterNumber} aria-hidden="true">03</span><h3>{labels.reflectionHeading}</h3><p className={styles.reflectionQuestion}>{labels.reflection}</p><p>{labels.reflectionNote}</p></div>}
              <span className={styles.folio} aria-hidden="true">0{page * 2 + 1}</span>
            </div>
            <div className={styles.rightPage} aria-live="polite" aria-atomic="true">
              <div className={styles.runningHead}>The Subconscious Architect</div>
              {page === 0 && <div className={styles.quotePage}><span className={styles.quoteMark} aria-hidden="true">“</span><blockquote>{labels.openingQuote}<cite>{labels.introduction}</cite></blockquote><span className={styles.smallRule}/><p>{labels.openingAfter}</p></div>}
              {page === 1 && <div className={styles.planPage}><Floorplan active={layer} className={styles.interactivePlan}/><p className={styles.layerTitle}><span>0{layer + 1}</span>{labels.layers[layer].name}</p><p>{labels.layers[layer].detail}</p></div>}
              {page === 2 && <div className={`${styles.quotePage} ${styles.lastQuote}`}><span className={styles.quoteMark} aria-hidden="true">“</span><blockquote>{labels.closingQuote}<cite>{labels.signature}</cite></blockquote><svg className={styles.pencil} viewBox="0 0 220 30" fill="none" aria-hidden="true"><path d="m12 15 24-7h160v14H36L12 15Zm24-7v14M42 8v14m144-14v14M12 15h12m18 0h144" stroke="currentColor"/></svg></div>}
              <span className={styles.folio} aria-hidden="true">0{page * 2 + 2}</span>
            </div>
          </div>
          <div className={styles.readerControls}>
            <button type="button" onClick={() => setPage(current => current - 1)} disabled={page === 0} aria-label={labels.previous} aria-keyshortcuts="ArrowLeft"><span aria-hidden="true">←</span></button>
            <p role="status">{labels.parts[page]}<span>{page + 1} / 3</span></p>
            {page < 2 ? <button type="button" onClick={() => setPage(current => current + 1)} aria-label={labels.next} aria-keyshortcuts="ArrowRight"><span aria-hidden="true">→</span></button> : <button type="button" onClick={closePreview} aria-label={labels.finish}><span aria-hidden="true">✓</span></button>}
          </div>
          <p className={styles.previewNote}>{labels.previewNote}</p>
        </>}
      </div>
    </dialog>
  </>;
}
