import {useCopy} from "@/i18n/use-copy";
export function ProjectProof({kind}:{kind:"skatalyst"|"documents"}){
  const copy = useCopy();

  const steps=kind==="skatalyst"?["Sources","Organize","Validate","Owned outputs"]:["OCR","Layout","Extract","Validate or review"];
  return <div className={`project-proof project-proof-${kind}`} aria-label={copy(`${steps.join(" to ")} process diagram`)}>
    {steps.map((step,index)=><div className="proof-step" key={step}><span>{copy(String(index+1).padStart(2,"0"))}</span><strong>{copy(step)}</strong></div>)}
  </div>
}
