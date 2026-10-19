"use client";
import {useCopy} from "@/i18n/use-copy";

import Image from "next/image";
import {useEffect,useRef} from "react";

/*
  CodePortrait: the real photograph layered under a binary/code texture generated from the same photograph.
  A single CSS variable, --reveal (0 → 1), is driven by scroll position of the hero:
    0   = 70% digital texture / 30% photograph (top of the page)
    1   = 90% photograph / 10% digital texture (end of the introduction)
  Reduced motion: the variable is pinned to the revealed state and no scroll listener is attached.
*/
export function CodePortrait({photo,texture,tile,width,height,alt}:{photo:string;texture:string;tile:string;width:number;height:number;alt:string}){
  const copy = useCopy();

  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=root.current; if(!el) return;
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
    if(reduce.matches){el.style.setProperty("--reveal","1");return;}
    let raf=0;
    const update=()=>{
      raf=0;
      let p:number;
      if(window.innerWidth<=900){
        // Mobile: the portrait sits below the copy, so reveal as it travels up the viewport.
        const vh=window.innerHeight; const top=el.getBoundingClientRect().top;
        p=(vh*0.9-top)/(vh*0.55);
      } else {
        const hero=el.closest("[data-reveal-scope]") as HTMLElement|null;
        const span=hero?Math.max(240,hero.offsetHeight*0.85):Math.max(240,window.innerHeight*0.8);
        p=window.scrollY/span;
      }
      p=Math.min(1,Math.max(0,p));
      el.style.setProperty("--reveal",p.toFixed(3));
    };
    const onScroll=()=>{if(!raf) raf=requestAnimationFrame(update);};
    update();
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll,{passive:true});
    return ()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);if(raf) cancelAnimationFrame(raf);};
  },[]);
  return <div className="code-portrait" ref={root} style={{"--reveal":0,"--tile":`url(${tile})`} as React.CSSProperties}>
    <div className="code-portrait-halo" aria-hidden="true"/>
    <div className="code-portrait-frame">
      <Image className="code-portrait-photo" src={photo} alt={copy(alt)} width={width} height={height} sizes="(max-width: 900px) 92vw, 520px" priority/>
      <Image className="code-portrait-texture" src={texture} alt={copy("")} aria-hidden="true" width={1632} height={2048} sizes="(max-width: 900px) 92vw, 520px" priority unoptimized/>
    </div>
  </div>;
}
