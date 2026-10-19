import {useCopy} from "@/i18n/use-copy";
import Image from "next/image";
/** Thin browser chrome around a real product screenshot. */
export function ProductFrame({src,alt,width,height,label,sizes,priority,className}:{src:string;alt:string;width:number;height:number;label?:string;sizes?:string;priority?:boolean;className?:string}){
  const copy = useCopy();

  return <figure className={`product-frame${className?" "+className:""}`}>
    <div className="product-frame-bar" aria-hidden="true"><span/><span/><span/>{label&&<em>{copy(label)}</em>}</div>
    <Image src={src} alt={copy(alt)} width={width} height={height} sizes={sizes??"(max-width: 900px) 100vw, 1100px"} priority={priority} loading={priority?undefined:"lazy"}/>
  </figure>
}
