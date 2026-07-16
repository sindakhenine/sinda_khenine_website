import type {MetadataRoute} from "next";import {siteConfig} from "@/content/site/config";import {projects} from "@/content/projects/projects";
const routes=['','/about','/projects','/speaking','/writing','/book','/book/sample','/book/press','/book/faq','/book/discussion-guide','/resume','/contact','/newsletter','/company','/interviews','/research','/privacy','/imprint'];
export default function sitemap():MetadataRoute.Sitemap{return [...routes,...projects.map(p=>`/projects/${p.slug}`)].map(r=>({url:`${siteConfig.url}${r}`,lastModified:new Date('2026-07-16')}))}
