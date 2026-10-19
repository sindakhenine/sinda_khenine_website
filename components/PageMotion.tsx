"use client";

import {useEffect} from "react";
import {usePathname} from "@/i18n/navigation";

// Content stays visible without JavaScript. Animate each item only as it arrives.
export function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window) || !Element.prototype.animate) return;
    const animations = new Set<Animation>();
    const selector = "[data-reveal], .page-hero, .ab-memory, .ab-story-copy, .ab-now, .ab-background, .ab-beyond-grid>article, .project-feature, .project-flagship, .bibliography-list article, .history-list article";
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        const animation = entry.target.animate([
          {opacity: 0.35, transform: "translateY(22px)"},
          {opacity: 1, transform: "translateY(0)"},
        ], {duration: 700, easing: "cubic-bezier(.22,1,.36,1)"});
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, {threshold: 0.08});
    document.querySelectorAll(`#main :is(${selector})`).forEach(element => observer.observe(element));
    const cancelMotion = () => {
      if (preference.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    };
    preference.addEventListener("change", cancelMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", cancelMotion);
      animations.forEach(animation => animation.cancel());
    };
  }, [pathname]);
  return null;
}
