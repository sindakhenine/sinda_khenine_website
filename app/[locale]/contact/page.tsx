import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import {ContactForm} from "@/components/ContactForm";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/contact", {title: "Contact", description: "Contact Sinda Khenine for speaking, writing, research, and collaboration inquiries."}, locale); }

export default async function Contact({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
return <div className="plain-surface contact-page"><div className="shell page-wrap narrow page-hero-utility"><h1>{copy("Start with the problem.")}</h1><p className="lede">{copy("Have a speaking, writing, research, or collaboration inquiry? Send me a message.")}</p><ContactForm/><p className="contact-fallback">{copy("Or email ")}<a href={copy.href("mailto:founder@skatalystai.com")}>{copy("founder@skatalystai.com")}</a>.</p></div></div>}
