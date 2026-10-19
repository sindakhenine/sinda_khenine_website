import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import {Link} from "@/i18n/navigation";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/book/sample", {title: "Selected Excerpts", description: "Two short approved excerpts from The Subconscious Architect by Sinda Khenine."}, locale); }
export default async function Sample({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
return <article className="shell page-wrap excerpt-page"><p className="eyebrow">{copy("Selected excerpts")}</p><h1>{copy("From The Subconscious Architect")}</h1><blockquote>{copy("“You are good at your life.”")}<cite>{copy("Introduction")}</cite></blockquote><blockquote>{copy("“You never chose this house. But you are the only one who can hold the pencil now.”")}<cite>{copy("Introduction")}</cite></blockquote><Link className="button primary" href="/book">{copy("Return to the Book")}</Link></article>}
