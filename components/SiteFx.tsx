"use client";

import {useEffect} from "react";

// Decorative pointer and scroll effects. Everything here is optional: the page reads the same without it.
export function SiteFx() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let pointer: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;

    const paint = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0");
      root.toggleAttribute("data-scrolled", window.scrollY > 24);
      if (!pointer || reduce.matches || !fine.matches) return;
      const target = pointer.target instanceof Element ? pointer.target : null;
      const glow = target?.closest<HTMLElement>("[data-glow]");
      if (glow) {
        const box = glow.getBoundingClientRect();
        glow.style.setProperty("--mx", `${pointer.clientX - box.left}px`);
        glow.style.setProperty("--my", `${pointer.clientY - box.top}px`);
      }
      const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilted && tilted !== tilt) { tilted.style.removeProperty("--rx"); tilted.style.removeProperty("--ry"); }
      tilted = tilt;
      if (tilt) {
        const box = tilt.getBoundingClientRect();
        tilt.style.setProperty("--ry", `${(((pointer.clientX - box.left) / box.width) - .5) * 9}deg`);
        tilt.style.setProperty("--rx", `${(.5 - ((pointer.clientY - box.top) / box.height)) * 9}deg`);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const move = (event: PointerEvent) => { pointer = event; schedule(); };
    paint();
    window.addEventListener("scroll", schedule, {passive: true});
    window.addEventListener("resize", schedule, {passive: true});
    document.addEventListener("pointermove", move, {passive: true});
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("pointermove", move);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"/>;
}
