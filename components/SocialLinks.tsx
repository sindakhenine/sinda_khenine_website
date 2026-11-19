import {siteConfig} from "@/content/site/config";

const paths = {
  github: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.05c.53-1 1.84-1.82 3.62-1.82 3.87 0 4.5 2.4 4.5 5.85v5.9h-4v-5.23c0-1.25-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76v5.32h-4V9.75Z",
  x: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z",
} as const;

export function SocialIcon({name}: {name: keyof typeof paths}) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d={paths[name]}/></svg>;
}

// Icon links to the public profiles; labels stay available to assistive technology.
export function SocialLinks({className = "social-links"}: {className?: string}) {
  return <div className={className}>
    <a href={siteConfig.social.github} rel="me noopener" target="_blank" aria-label="GitHub" title="GitHub"><SocialIcon name="github"/></a>
    <a href={siteConfig.social.linkedin} rel="me noopener" target="_blank" aria-label="LinkedIn" title="LinkedIn"><SocialIcon name="linkedin"/></a>
    <a href={siteConfig.social.x} rel="me noopener" target="_blank" aria-label="X" title="X"><SocialIcon name="x"/></a>
  </div>;
}
