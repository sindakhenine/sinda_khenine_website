import {useCopy} from "@/i18n/use-copy";
import {Link} from "@/i18n/navigation";const nodes=[["The Subconscious Architect","/book"],["SKatalyst AI","/company"],["Data & AI projects","/projects"],["Writing","/writing"],["Speaking & interviews","/speaking"],["Future research","/research"]];export function WorkMap(){
  const copy = useCopy();
return <div className="map" aria-label={copy("Map of Sinda Khenine’s work")}>{nodes.map(([n,h])=><Link key={h} href={h}>{copy(n)}<br/><small>{copy("Explore this branch →")}</small></Link>)}</div>}
