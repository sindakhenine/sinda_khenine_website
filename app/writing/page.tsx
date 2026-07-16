export const metadata={title:"Writing",description:"Articles, conference work and book writing by Sinda Khenine."};
const groups=[
  {name:"Articles",items:[
    {title:"Context Engineering for Reliable Enterprise AI",status:"Draft",summary:"How context quality, retrieval and provenance shape dependable enterprise AI."},
    {title:"From Context-Aware Ingestion to Governed Output",status:"Draft",summary:"A technical approach to organizing sources and validating generated outputs."},
    {title:"Reliable AI Agents Need Boundaries",status:"Draft",summary:"Tool constraints, evidence, evaluation and human escalation for enterprise agents."}
  ]},
  {name:"Conference Work",items:[
    {title:"Context Engineering Is the New Prompt Engineering",status:"Conference material",summary:"Presented at ML Con Munich 2026 and scheduled for ML Con Berlin 2026."},
    {title:"From Context to Action",status:"Conference material",summary:"An upcoming ML Con Berlin session on bounded tools and accountable agent action."},
    {title:"Document Understanding at Scale",status:"Conference material",summary:"Noisy OCR, modular extraction, validation and human review."}
  ]},
  {name:"Book",items:[
    {title:"The Subconscious Architect",status:"Publication in preparation",summary:"The Living Blueprint maps five layers beneath behavior and identity."}
  ]}
];
export default function Writing(){return <div className="shell page-wrap writing-page"><p className="eyebrow">Writing</p><h1>Articles, conference work and a book.</h1><div className="writing-categories">{groups.map((group,index)=><section className={`writing-category writing-category-${index+1}`} key={group.name}><header><span>{String(index+1).padStart(2,'0')}</span><h2>{group.name}</h2></header><div className="writing-cards">{group.items.map(item=><article className="writing-card" key={item.title}><p className="project-status">{item.status}</p><h3>{item.title}</h3><p>{item.summary}</p></article>)}</div></section>)}</div></div>}
