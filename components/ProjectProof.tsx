export function ProjectProof({kind}:{kind:"skatalyst"|"documents"}){
  const steps=kind==="skatalyst"?["Sources","Organize","Validate","Owned outputs"]:["OCR","Layout","Extract","Validate or review"];
  return <div className={`project-proof project-proof-${kind}`} aria-label={`${steps.join(" to ")} process diagram`}>
    {steps.map((step,index)=><div className="proof-step" key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></div>)}
  </div>
}
