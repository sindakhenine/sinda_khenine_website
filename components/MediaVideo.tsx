"use client";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";

export function MediaVideo({src,poster,label,hero=false}:{src:string;poster:string;label:string;hero?:boolean}){
  const ref=useRef<HTMLVideoElement>(null); const [reduce,setReduce]=useState(true);
  useEffect(()=>{const q=matchMedia("(prefers-reduced-motion: reduce)");const sync=()=>setReduce(q.matches);sync();q.addEventListener("change",sync);return()=>q.removeEventListener("change",sync)},[]);
  useEffect(()=>{if(!reduce&&hero)ref.current?.play().catch(()=>{});else ref.current?.pause()},[reduce,hero]);
  if(reduce&&hero)return <Image className="media-poster" src={poster} alt={`${label}, static image shown because reduced motion is enabled`} fill sizes="(max-width: 760px) 100vw, 46vw"/>;
  return <video ref={ref} className="media-video" aria-label={label} controls={!hero} muted={hero} autoPlay={hero&&!reduce} loop={hero} playsInline preload="metadata" poster={poster}><source src={src} type="video/mp4"/>Your browser cannot play this video. Use the static poster image instead.</video>
}
