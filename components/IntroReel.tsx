"use client";

import {useEffect, useRef} from "react";

// Silent motion reel: plays while it is on screen, stays a poster when reduced motion is requested.
export function IntroReel({src, poster, label}: {src: string; poster: string; label: string}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {}); else video.pause();
    }, {threshold: .45});
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return <video ref={ref} className="media-video" aria-label={label} controls muted loop playsInline preload="none" poster={poster}><source src={src} type="video/mp4"/></video>;
}
