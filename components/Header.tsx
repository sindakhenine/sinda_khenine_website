"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {siteConfig} from "@/content/site/config";

export function Header(){
  const pathname=usePathname();
  const current=(href:string)=>pathname===href || (href!=="/" && pathname.startsWith(`${href}/`));
  return <header className="site-header shell">
    <Link className="brand" href="/">Sinda Khenine</Link>
    <nav aria-label="Primary">
      {siteConfig.navigation.map(([name,href])=><Link key={href} href={href} aria-current={current(href)?"page":undefined}>{name}</Link>)}
      <a className="external-nav" href={siteConfig.companyUrl} target="_blank" rel="noreferrer">SKatalyst AI <span>Private Beta</span></a>
    </nav>
    <details className="mobile-menu"><summary>Menu</summary><nav className="mobile-panel" aria-label="Mobile navigation">
      {siteConfig.navigation.map(([name,href])=><Link key={href} href={href} aria-current={current(href)?"page":undefined} onClick={event=>event.currentTarget.closest("details")?.removeAttribute("open")}>{name}</Link>)}
      <a href={siteConfig.companyUrl}>SKatalyst AI · Private Beta</a>
    </nav></details>
  </header>
}
