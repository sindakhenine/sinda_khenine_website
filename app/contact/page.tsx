import {createPageMetadata} from "@/lib/seo";
import {ContactForm} from "@/components/ContactForm";

export const metadata = createPageMetadata("/contact", {title: "Contact", description: "Contact Sinda Khenine for speaking, writing, research, and collaboration inquiries."});

export default function Contact(){return <div className="plain-surface contact-page"><div className="shell page-wrap narrow page-hero-utility"><h1>Start with the problem.</h1><p className="lede">Have a speaking, writing, research, or collaboration inquiry? Send me a message.</p><ContactForm/><p className="contact-fallback">Or email <a href="mailto:founder@skatalystai.com">founder@skatalystai.com</a>.</p></div></div>}
