"use client";
import {useCopy} from "@/i18n/use-copy";

import {useEffect,useRef} from "react";
import type {ReactNode} from "react";

/** Premium demo frame: poster first, the video source is attached only when the frame nears the viewport (or playback is requested), native controls, never autoplays. */
export function MagicalBookDemo({src,poster,label}:{src:string;poster:string;label:string}){
  const copy = useCopy();

  const frame=useRef<HTMLDivElement>(null);const video=useRef<HTMLVideoElement>(null);
  useEffect(()=>{const el=frame.current;const v=video.current;if(!el||!v)return;
    const arm=()=>{if(v.dataset.armed)return;v.dataset.armed="1";v.preload="metadata";v.src=src};
    const onPlayRequest=()=>{arm();v.play().catch(()=>{})};
    el.addEventListener("magicalbook:play",onPlayRequest);
    let io:IntersectionObserver|undefined;
    if("IntersectionObserver" in window){io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){arm();io?.disconnect()}},{rootMargin:"600px 0px"});io.observe(el)}else arm();
    return()=>{el.removeEventListener("magicalbook:play",onPlayRequest);io?.disconnect()}},[src]);
  return <div className="mb-demo-frame" ref={frame} id="demo" tabIndex={-1}>
    <video ref={video} className="mb-demo-video" controls playsInline preload="none" poster={poster} aria-label={copy(label)}>{copy("Your browser cannot play this video.")}</video>
  </div>
}

/** Scrolls to the demo frame and starts playback (user-initiated, so browsers allow it). Falls back to a plain #demo anchor without JavaScript. */
export function WatchDemoButton({children,className}:{children:ReactNode;className?:string}){
  const copy = useCopy();

  return <a className={className} href={copy.href("#demo")} onClick={e=>{const el=document.getElementById("demo");if(!el)return;e.preventDefault();el.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center"});el.dispatchEvent(new Event("magicalbook:play"))}}>{copy(children)}</a>
}
