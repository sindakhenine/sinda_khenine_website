import Link from "next/link";import {ProductFrame} from "@/components/ProductFrame";import {TrackedLink} from "@/components/TrackedLink";
export const metadata={title:"SKatalyst AI",description:"SKatalyst AI: an agentic platform that turns fragmented organizational data into persistent structured context and generates validated applications from it. Architecture, lifecycle, validation and engineering."};
const M="/media/skatalyst";
const sources=["Excel files","PDFs","Word documents","SharePoint","Google Drive","OneDrive","Databases","Cloud storage","Databricks","Reports","Images","Internal tools","APIs","CSV exports"];
const pipeline=[
  {n:"01",t:"Connect",d:"Bring organizational data in from where it already lives: uploads, drives, buckets and databases."},
  {n:"02",t:"Understand",d:"Scan read-only. Extract text and tables, OCR images, read schemas, metadata and relationships."},
  {n:"03",t:"Organize",d:"Propose a structure: entities, a schema, a folder taxonomy, quality findings and a recommended architecture."},
  {n:"04",t:"Store",d:"Persist the result in PostgreSQL so the understanding outlives any single AI conversation."},
  {n:"05",t:"Design",d:"Discover KPIs the data can actually compute and decide which modules expose them."},
  {n:"06",t:"Generate",d:"Build working application components: dashboard, CRUD, report, RAG chat, plus a database and API."},
  {n:"07",t:"Validate",d:"Compile a test oracle from the data model and compare generated behaviour against reference values."},
  {n:"08",t:"Operate",d:"Preview in an ephemeral runtime, export a Docker package the customer owns, verify, roll back if needed."}
];
const contextChain=["Raw sources","Ingestion","Extraction","Metadata","Relationships","Context analysis","Structured entities","Database","Reusable organizational context","Applications and AI"];
const deterministic=["Source connectors","OAuth and sessions","File handling and extraction","Schema inspection","Metadata extraction","Database operations","Tenant isolation","Roles and permissions","Migrations","Application runtime","Validation rules","Audit logging"];
const reasoning=["Classifying ambiguous documents","Finding semantic relationships","Proposing organization and context","Interpreting document content","Recommending an architecture","Proposing KPIs and modules","Generating application code","Explaining validation results"];
const layers=[
  {name:"Source layer",items:["Local upload","Local folder agent (Go)","Google Drive","OneDrive","SharePoint","Dropbox","Amazon S3","Azure Blob","Databricks","PostgreSQL","MySQL","SQL Server"],note:"12 source types. Cloud and database connectors read metadata today; execution stays Preview until proven against a real account."},
  {name:"Ingestion and understanding",items:["Read-only scan with timeouts and cancellation","7 extractors: PDF, DOCX, XLSX, CSV, JSON, Markdown, text","OCR: Tesseract or Google Vision","Budgeted visual understanding for images","Inventory and data-quality findings","Context taxonomy scoring"],note:"Every run starts with an inventory the user approves."},
  {name:"Context and data layer",items:["Reusable context library","Frozen context snapshots with SHA-256 hashes","Structuring plans and inventories","KPI discoveries with confidence scores","Lineage mappings from file to output","PostgreSQL 16, 51 migrations, about 80 tables"],note:"The understanding is stored, versioned and traceable, not re-derived per prompt."},
  {name:"Intelligence and orchestration",items:["Run orchestrator: scan, merge, approve, plan","Architecture recommendation","KPI discovery","Design negotiation","Code generation","Claude provider plus a deterministic heuristic fallback"],note:"Every AI step has a non-AI path or a BYOK gate; the platform never silently guesses."},
  {name:"Application generation",items:["Dashboard","CRUD application","Report","Chat / RAG (customer-keyed at runtime)","React + Express + Docker output","Schema provisioning and sample seeding"],note:"4 generators shipping; 10 module types declared."},
  {name:"Validation",items:["Test oracle compiler","Reference executor","Behavioural probe runner","Tolerance-aware comparator","Validation report with provenance","Ephemeral, TTL-bounded runtime"],note:"The oracle never reads generated code, so a generator error cannot hide itself."},
  {name:"Delivery",items:["Architecture, implementation and execution previews","Ephemeral preview runtime","Docker export with documentation and ownership files","Deployment verification and guided rollback","Managed hosting built, flag-off"],note:"Export is blocked while validation is failed. That block is intentional."}
];
const connectors=[
  {name:"Local Upload",m:"Production"},{name:"Local Folder Agent",m:"Beta"},{name:"OneDrive",m:"Preview"},{name:"SharePoint",m:"Preview"},{name:"Google Drive",m:"Preview"},{name:"Dropbox",m:"Preview"},{name:"Amazon S3",m:"Preview"},{name:"Azure Blob Storage",m:"Preview"},{name:"Databricks",m:"Preview"},{name:"PostgreSQL",m:"Preview"},{name:"MySQL",m:"Preview"},{name:"SQL Server",m:"Preview"}
];
const outputs=[
  {t:"CRUD applications",d:"Structured operational interfaces over the detected entities, with generated API endpoints for each.",s:"Shipping"},
  {t:"Dashboards",d:"KPI cards and charts built only from metrics the data can compute; unavailable metrics are marked, never faked.",s:"Shipping"},
  {t:"Chat / RAG",d:"Natural-language access grounded in the organizational context. Runtime keys stay with the customer.",s:"Shipping"},
  {t:"Reports",d:"Structured reporting from the same context, exported with the application package.",s:"Shipping"},
  {t:"Prediction and analytics",d:"Data-oriented analytical modules where the underlying data supports them.",s:"Roadmap"},
  {t:"API, automation, agent, workflow",d:"Declared module types waiting for generators.",s:"Roadmap"}
];
const journey=["Connect","Context","Understand","Recommend","Design","Build","Validate","Deploy"];
const lifecycle=["draft","designing","awaiting approval","approved","building","preview","accepted","revision requested","rejected","deployed","operating","archived"];
const validationParts=[
  {u:"Compile the expectations",i:"TestOracleCompiler",d:"Turns the confirmed KPIs, entities, schema and business context into behavioural assertions. Pure and deterministic: no database, no network, no model, and never a line of generated code."},
  {u:"Compute what the answer should be",i:"ReferenceExecutor",d:"Evaluates each assertion against the ingestion-time sample snapshot: sums, counts, averages, minimums and maximums. Read-only; never opens a live connector."},
  {u:"Exercise the generated app",i:"BehavioralProbeRunner",d:"Boots the app in an isolated runtime seeded with the same sample and probes its endpoints, including negative tests that must be rejected."},
  {u:"Compare with tolerance",i:"Comparator",d:"Exact or relative comparison of observed versus reference values, so a rounding difference is not a failure and a wrong KPI is."},
  {u:"Explain the result",i:"ValidationReportService",d:"Every assertion carries provenance: which KPI, which table, which formula. The report is the evidence a human approves against."},
  {u:"Orchestrate and degrade safely",i:"ValidationOrchestrator",d:"Runs compile, reference, probe and persist; falls back to a reference-only report when the runtime is unavailable; always tears the runtime down."}
];
const stack={
  Frontend:["React 18","React Router 6","Tailwind CSS","i18next","react-dropzone","Mermaid diagrams","Jest + Testing Library (45 suites)"],
  Backend:["Node.js (ESM)","Express 4 with Helmet, rate limiting, CORS","Knex query builder + pg","Zod validation","BullMQ + Redis job queue","Multer, pdf-parse, mammoth, xlsx, sharp, ffmpeg"],
  Data:["PostgreSQL 16","51 additive migrations, about 80 tables","Append-only audit log enforced by trigger","Context snapshots with SHA-256 integrity","Lineage mappings and run findings"],
  Cloud:["Google Cloud Run (europe-west1)","Cloud Build with git-SHA images","Firebase Hosting for the app","Cloud SQL for PostgreSQL","Docker export for customer self-hosting"],
  Authentication:["Google, Microsoft and GitHub OAuth","JWT access and refresh sessions","Verified-email account linking","4 roles: owner, admin, member, viewer","Beta access gate"],
  Integrations:["Microsoft Graph (OneDrive, SharePoint)","Google Drive API, read-only scopes","Dropbox API","Databricks API","AWS S3 and Azure Blob SDKs","MySQL, SQL Server and PostgreSQL drivers"],
  AI:["Anthropic SDK (platform)","BYOK: Claude, OpenAI, Gemini","Deterministic heuristic provider as the default fallback","8 runtime-AI options for generated chat apps","Tesseract and Google Vision OCR","Feature gating with fail-fast alternatives"],
  Validation:["Test oracle compiler","Reference executor","Behavioural probes with negative tests","Tolerance-aware comparator","Validation report with provenance","About 600 automated tests across 100+ files"]
};
const evolution=[
  {when:"Jun 2025",t:"Seed",d:"Initial project structure."},
  {when:"Dec 2025",t:"Data ingestion",d:"Document ingestion pipeline, LLM-assisted classification with a heuristic fallback and a vendor-neutral provider registry."},
  {when:"Dec 2025",t:"Context understanding to generation",d:"Metrics model, blueprint generation and the first artifact export: from organizing data to generating software within days."},
  {when:"Dec 2025 to Jun 2026",t:"Structured storage, tenancy, connectors",d:"Multi-tenant schema, OAuth, encrypted vault and BYOK, OCR and visual understanding, ten connector backends, immutable context snapshots, orchestrated runs and KPI discovery."},
  {when:"Jun 2026",t:"Production-readiness audit",d:"A self-critical audit listed the gaps: beta gate, rate limiting, headers, validation library, unproven isolation. Most were closed in the following weeks."},
  {when:"Jul 2026",t:"Behavioural validation",d:"The agentic validation loop was disclosed and built in increments: oracle compiler, reference execution with anomaly detection, behavioural probes. Patent package filed."},
  {when:"Jul 2026",t:"Approval lifecycle",d:"The Solution entity with its 12-state machine, two distinct human gates and transactional audit events."},
  {when:"Aug 2026",t:"Operational beta",d:"Landing admin, rate-limit counters, deploy and verify runbooks, onboarding, and the frozen authenticated app for the September 2026 beta."}
];
const numbers=[
  {n:"12",l:"source types"},{n:"10",l:"solution module types"},{n:"4",l:"generators shipping"},{n:"12",l:"lifecycle states"},{n:"2",l:"human approval gates"},{n:"5",l:"assertion types"},{n:"3",l:"OAuth providers"},{n:"4",l:"tenant roles"},{n:"3",l:"BYOK model providers"},{n:"51",l:"database migrations"},{n:"390+",l:"API endpoints"},{n:"~600",l:"automated tests"}
];
export default function SKatalyst(){return <div className="sk-page">
  <section className="sk-hero" aria-labelledby="sk-title">
    <div className="shell sk-hero-grid">
      <div className="sk-hero-copy">
        <Link className="sk-back" href="/projects">← All projects</Link>
        <p className="sk-eyebrow">Project 01 · Agentic AI · Data Intelligence · Application Generation · AI Engineering</p>
        <h1 id="sk-title">SKatalyst AI</h1>
        <p className="sk-statement">Turn organizational data into context, and context into software.</p>
        <p className="sk-lede">Organizations already have enormous amounts of useful data, but it is fragmented across files, databases, cloud storage, documents, reports and internal systems. SKatalyst AI is an attempt to build the layer between that raw organizational data and the software people actually need.</p>
        <p className="sk-text">Instead of beginning with an application and manually wiring data into it, SKatalyst begins with the organization’s existing information. It ingests it. Understands it. Structures it. Builds context around it. Then uses that structured understanding to generate useful applications.</p>
        <div className="actions"><TrackedLink className="button primary sk-button" href="https://skatalystai.com" eventName="skatalyst_link_clicked" target="_blank" rel="noreferrer">View Product</TrackedLink><a className="button sk-button-ghost" href="#architecture">See Architecture</a></div>
        <dl className="sk-hero-meta"><div><dt>Status</dt><dd>Private beta, Sep 2026</dd></div><div><dt>Role</dt><dd>Founder, product, architecture, engineering</dd></div><div><dt>Since</dt><dd>2025</dd></div></dl>
      </div>
      <ProductFrame className="sk-hero-frame" src={`${M}/hero.jpg`} alt="SKatalyst AI recommending a SQL + Blob architecture at 95% confidence from a detected inventory of three tables, with a data transformation preview." width={1980} height={1320} label="app.skatalystai.com · Data Organization & Architecture" sizes="(max-width: 1000px) 100vw, 60vw" priority/>
    </div>
  </section>

  <section className="sk-section sk-problem" aria-labelledby="sk-problem-title">
    <div className="shell">
      <p className="sk-index">01 · The problem</p>
      <h2 id="sk-problem-title">The problem isn’t missing data.<br/><span>It’s missing context.</span></h2>
      <div className="sk-two-col">
        <div>
          <p className="sk-lede">Most organizations already hold the information they need. It just exists as separate files and rows, spread across drives, mailboxes, databases and tools that were never designed to explain each other.</p>
          <p>A person understands the relationships implicitly: this spreadsheet belongs to that project, this report describes that test, that table holds the measurements, this document defines the process. Software normally sees none of it. SKatalyst attempts to reconstruct that missing organizational context, and to keep it.</p>
          <ul className="sk-quotes"><li>“This spreadsheet belongs to this project.”</li><li>“This report describes this test.”</li><li>“This database table contains the measurements.”</li><li>“This document defines the process.”</li></ul>
        </div>
        <div className="sk-converge" aria-label="Fragmented sources converging into one organizational context layer">
          <div className="sk-converge-sources">{sources.map(s=><span key={s}>{s}</span>)}</div>
          <div className="sk-converge-arrow" aria-hidden="true"><i/><i/><i/></div>
          <div className="sk-converge-target"><small>One structured layer</small><strong>Organizational context</strong><span>entities · relationships · lineage · definitions</span></div>
        </div>
      </div>
    </div>
  </section>

  <section className="sk-section sk-idea" aria-labelledby="sk-idea-title">
    <div className="shell">
      <p className="sk-index">02 · The idea</p>
      <h2 id="sk-idea-title" className="sk-formula"><span>Data</span><i>→</i><span>Context</span><i>→</i><span>Structure</span><i>→</i><span>Application</span></h2>
      <p className="sk-lede sk-center">The whole company in one line: the value is not the model. It is the persistent, validated understanding that sits between an organization’s data and the software built on it.</p>
      <div className="sk-signature" role="img" aria-label="Diagram: many disconnected organizational objects on the left flow into SKatalyst AI, which understands, structures, connects and validates them, and out on the right come working software: dashboard, CRUD, RAG, report, prediction and custom applications.">
        <div className="sk-sig-left"><p className="sk-sig-label">Thousands of disconnected objects</p><div className="sk-sig-cloud">{["Files","Tables","PDFs","Images","Databases","Cloud storage","Reports","Spreadsheets","Notes","Tickets","Exports","Screenshots","Contracts","Test logs"].map((x,i)=><span key={x} style={{"--i":i} as React.CSSProperties}>{x}</span>)}</div></div>
        <div className="sk-sig-center"><p className="sk-sig-brand">SKatalyst AI</p><ol><li>Understand</li><li>Structure</li><li>Connect</li><li>Validate</li></ol><p className="sk-sig-sub">persistent context · human approval · evidence</p></div>
        <div className="sk-sig-right"><p className="sk-sig-label">Working software</p><ul>{["Dashboard","CRUD application","Chat / RAG","Report","Prediction","Custom application"].map(x=><li key={x}>{x}</li>)}</ul></div>
      </div>
      <ol className="sk-pipeline">{pipeline.map(p=><li key={p.n}><span className="sk-pipe-n">{p.n}</span><strong>{p.t}</strong><p>{p.d}</p></li>)}</ol>
    </div>
  </section>

  <section className="sk-section sk-context" aria-labelledby="sk-context-title">
    <div className="shell">
      <p className="sk-index">03 · How it works</p>
      <div className="sk-two-col sk-two-col-wide">
        <div>
          <h2 id="sk-context-title">From files to organizational context</h2>
          <p className="sk-lede">SKatalyst is not built to upload files to a language model and ask questions. Each run turns input data, progressively and inspectably, into persistent structured context.</p>
          <p>A read-only scan produces an inventory the user approves. A structuring plan proposes entities, a schema and a folder taxonomy. An architecture recommendation explains its confidence and what was excluded from the estimate. KPI discovery only offers metrics the data can compute. Every step is stored in PostgreSQL with lineage back to the source files, and the context a run used is frozen and hashed at start so it can be reconstructed later.</p>
          <blockquote className="sk-pull"><p>The LLM should not be the database.</p><footer>The model interprets. The resulting understanding lives in structured, persistent tables, so organizational knowledge is not rebuilt from scratch on every prompt.</footer></blockquote>
        </div>
        <ol className="sk-chain" aria-label="Context pipeline">{contextChain.map((c,i)=><li key={c}><span>{String(i+1).padStart(2,"0")}</span>{c}</li>)}</ol>
      </div>
      <div className="sk-shots-2">
        <ProductFrame src={`${M}/plan.jpg`} alt="Structuring plan: recommended destinations with confidence, and a database schema proposal for customers, orders and products." width={1980} height={1500} label="Structuring plan · confirmed"/>
        <ProductFrame src={`${M}/architecture-er.jpg`} alt="Visual preview of the proposed SQL + Blob architecture: an ER diagram for customers, orders and products, a folder structure and sample data." width={1980} height={1250} label="Architecture preview · ER diagram"/>
      </div>
    </div>
  </section>

  <section className="sk-section sk-intel" aria-labelledby="sk-intel-title">
    <div className="shell">
      <p className="sk-index">04 · The intelligence layer</p>
      <h2 id="sk-intel-title">AI is part of the pipeline, not the whole pipeline.</h2>
      <p className="sk-lede">SKatalyst combines deterministic software with AI reasoning, and keeps the boundary visible. The default platform provider is a deterministic heuristic; a model is added when a key is configured, and features that need one degrade to a non-AI path instead of failing.</p>
      <div className="sk-split">
        <article><h3>Deterministic layer</h3><p>Guaranteed by code, tests and the database.</p><ul>{deterministic.map(x=><li key={x}>{x}</li>)}</ul></article>
        <article className="sk-split-ai"><h3>AI reasoning layer</h3><p>Where interpretation is genuinely required.</p><ul>{reasoning.map(x=><li key={x}>{x}</li>)}</ul></article>
      </div>
      <p className="sk-principle"><strong>Software guarantees what can be guaranteed.</strong> <strong>AI handles what requires interpretation.</strong> Neither is assumed correct: proposals carry confidence, unavailable metrics are marked unavailable, and a human confirms before anything is built.</p>
    </div>
  </section>

  <section className="sk-section sk-arch" id="architecture" aria-labelledby="sk-arch-title">
    <div className="shell">
      <p className="sk-index">05 · System architecture</p>
      <h2 id="sk-arch-title">Seven layers, one direction of travel.</h2>
      <p className="sk-lede">Verified against the platform’s source. Each layer only depends on the ones above it; validation sits between generation and delivery on purpose.</p>
      <ol className="sk-layers">{layers.map((l,i)=><li key={l.name}><div className="sk-layer-head"><span>{String(i+1).padStart(2,"0")}</span><h3>{l.name}</h3></div><ul>{l.items.map(x=><li key={x}>{x}</li>)}</ul><p>{l.note}</p></li>)}</ol>
      <div className="sk-agent-note"><strong>Alongside the platform:</strong> a read-only local server agent written in Go (about 1,600 lines) for on-premise folders, with path allowlisting, pattern exclusions, a kill switch and a heartbeat. No writes, no telemetry.</div>
    </div>
  </section>

  <section className="sk-section sk-connectors" aria-labelledby="sk-conn-title">
    <div className="shell sk-two-col sk-two-col-wide">
      <div>
        <p className="sk-index">Connectors</p>
        <h2 id="sk-conn-title">Meet the organization where its data already lives.</h2>
        <p className="sk-lede">SKatalyst doesn’t require the organization to move everything into a new ecosystem before it can begin understanding the data.</p>
        <p>Twelve source types are implemented, from local upload to Databricks. The labels below are the product’s own: a connector may not leave Preview until a real byte-read against a real external account has been proven and recorded. Connecting and browsing already work; local upload runs the full pipeline today.</p>
        <ul className="sk-conn-grid">{connectors.map(c=><li key={c.name} data-m={c.m}><span>{c.name}</span><small>{c.m}</small></li>)}</ul>
      </div>
      <ProductFrame src={`${M}/connectors.jpg`} alt="Add Data: four connector families in the product, Upload Files, Cloud Storage (OneDrive, SharePoint, Google Drive), Databases (PostgreSQL, MySQL, SQL Server) and Servers & Data Lakes (Amazon S3, Azure Blob, Databricks), with a note that all processing happens locally and is logged." width={2320} height={1408} label="Add Data · connector families" sizes="(max-width: 1000px) 100vw, 50vw"/>
    </div>
  </section>

  <section className="sk-section sk-outputs" aria-labelledby="sk-out-title">
    <div className="shell">
      <p className="sk-index">06 · What it can build</p>
      <h2 id="sk-out-title">Context becomes something people can use.</h2>
      <div className="sk-catalog">{outputs.map(o=><article key={o.t} data-s={o.s}><h3>{o.t}</h3><p>{o.d}</p><span>{o.s}</span></article>)}</div>
      <div className="sk-shots-2">
        <ProductFrame src={`${M}/design-modules.jpg`} alt="Suggested modules in the design step: Dashboard and CRUD App recommended with the evidence behind each recommendation, confidence, business value and detected KPIs or entities." width={1980} height={1500} label="Design · suggested modules with evidence"/>
        <ProductFrame src={`${M}/kpis.jpg`} alt="KPI discovery: the assistant proposes KPIs from three tables and five measurable columns, with a data summary and confidence score." width={1980} height={1560} label="KPI discovery"/>
      </div>
    </div>
  </section>

  <section className="sk-section sk-trust" aria-labelledby="sk-trust-title">
    <div className="shell">
      <p className="sk-index">07 · Trust and validation</p>
      <h2 id="sk-trust-title">Generated isn’t the same as correct.</h2>
      <p className="sk-lede">If AI is going to generate software from organizational data, generation cannot be the final step. SKatalyst treats validation as part of the architecture: expectations are compiled from the data understanding, never from the generated code, so a generator’s mistake cannot vouch for itself.</p>
      <ol className="sk-loop" aria-label="Validation loop"><li>Build</li><li>Test</li><li>Compare</li><li>Explain</li><li>Repair / Review</li></ol>
      <div className="sk-val-grid">{validationParts.map(v=><article key={v.i}><h3>{v.u}</h3><code>{v.i}</code><p>{v.d}</p></article>)}</div>
      <div className="sk-val-facts"><div><strong>5 assertion types</strong><span>KPI value · entity CRUD · relationship integrity · schema shape · domain range</span></div><div><strong>Negative tests</strong><span>An orphan foreign key or a domain-violating write must be rejected by the generated app.</span></div><div><strong>Anomalies before generation</strong><span>Reference execution doubles as a check on the understanding itself: a broken expectation surfaces before any code exists.</span></div><div><strong>Repair stays human</strong><span>Bounded auto-repair is designed but deliberately not built. Failures return to a person with the evidence, and export stays blocked while validation is failed.</span></div></div>
      <div className="sk-shots-2">
        <ProductFrame src={`${M}/validation.jpg`} alt="Validation report: test oracle compiled from the data understanding, 100% KPI coverage (15 of 15), 100% entity coverage (3 of 3), behavioural validation panel." width={1980} height={1250} label="Validation report"/>
        <ProductFrame src={`${M}/validation-assertions.jpg`} alt="Validation report detail: oracle provenance showing 15 KPIs and 3 tables consumed and generated code accessed: no, followed by the compiled KPI-value assertions with their expected formulas." width={1980} height={1500} label="Validation report · assertions and provenance"/>
      </div>
    </div>
  </section>

  <section className="sk-section sk-approval" aria-labelledby="sk-appr-title">
    <div className="shell">
      <p className="sk-index">Human approval</p>
      <h2 id="sk-appr-title">Agentic doesn’t mean uncontrolled.</h2>
      <div className="sk-two-col sk-two-col-wide">
        <div>
          <p className="sk-lede">The system proposes; a person decides at the moments that matter. Two gates are distinct by design: approving a specification before anything is built, and accepting a preview after it is built.</p>
          <ul className="sk-gates"><li><strong>Inventory approval</strong> before a structuring plan is generated.</li><li><strong>Plan and architecture confirmation</strong> before KPIs are discovered.</li><li><strong>Design approval</strong> before a build starts.</li><li><strong>Preview acceptance, revision or rejection</strong> after the build, with a revision loop back to design.</li><li><strong>Validation report</strong> as the evidence for that decision; export blocked while it fails.</li><li><strong>Audit trail</strong>: every transition writes an event and an append-only audit row in the same transaction, or the transition rolls back.</li></ul>
          <ol className="sk-loop sk-loop-human"><li>AI proposes</li><li>Human reviews</li><li>System builds</li><li>System validates</li><li>Human accepts</li></ol>
        </div>
        <div>
          <p className="sk-mini-title">Solution lifecycle · 12 states</p>
          <ol className="sk-lifecycle">{lifecycle.map(s=><li key={s} data-gate={s==="awaiting approval"||s==="preview"?"1":undefined}>{s}</li>)}</ol>
          <p className="sk-caption">Highlighted states are the human gates. Transitions are an explicit table; illegal ones are refused, repeated ones are idempotent, and unarchiving never restarts a runtime.</p>
        </div>
      </div>
    </div>
  </section>

  <section className="sk-section sk-journey" aria-labelledby="sk-journey-title">
    <div className="shell">
      <p className="sk-index">08 · Product experience</p>
      <h2 id="sk-journey-title">One guided journey per run.</h2>
      <p className="sk-lede">The in-app stepper tracks eight steps on every run page. Each step explains what the system knows, why it matters and the next best action, in the product’s own voice.</p>
      <ol className="sk-steps">{journey.map((j,i)=><li key={j}><span>{String(i+1).padStart(2,"0")}</span>{j}</li>)}</ol>
      <div className="sk-journey-grid">
        <ProductFrame src={`${M}/design-journey.jpg`} alt="Design step with the eight-step journey stepper at the top and the SKatalyst Architect panel: what I discovered, my recommendation, why this matters." width={1980} height={1500} label="Design · journey stepper and Architect"/>
        <ProductFrame src={`${M}/data-sources.jpg`} alt="Data Sources page: current project selector, project overview counts for sources, runs, context items, destinations, blueprints and metrics." width={1980} height={1560} label="Data Sources · project overview"/>
        <ProductFrame src={`${M}/summary.jpg`} alt="Build summary: 6 data sources, 15 KPIs, 4 dashboard pages, 12 API endpoints, and a quality validation panel that blocks export while validation is failed, listing blocking issues, warnings and recommendations." width={1980} height={1500} label="Build summary · quality validation"/>
        <ProductFrame src={`${M}/lineage.jpg`} alt="Data lineage and source evidence: stored mappings showing which files and datasets powered each generated table, KPI and widget, with confidence." width={1980} height={1500} label="Build summary · lineage and source evidence"/>
        <ProductFrame src={`${M}/deployment-choice.jpg`} alt="Deployment choice: deploy myself with full control, downloadable schemas and step-by-step instructions, or deploy with SKatalyst AI managed hosting." width={1980} height={860} label="Deployment choice"/>
        <ProductFrame src={`${M}/dashboard.jpg`} alt="Project Home with a getting-started checklist: create your project, connect your data, run AI analysis, review what the AI found, generate your blueprint." width={1980} height={1560} label="Project Home"/>
      </div>
    </div>
  </section>

  <section className="sk-section sk-engineering" aria-labelledby="sk-eng-title">
    <div className="shell">
      <p className="sk-index">09 · Engineering</p>
      <h2 id="sk-eng-title">Under the hood</h2>
      <p className="sk-lede">Verified from the repository, organized by purpose. The platform is a Node and PostgreSQL system with a small, explicit AI surface.</p>
      <div className="sk-stack">{Object.entries(stack).map(([k,v])=><article key={k}><h3>{k}</h3><ul>{v.map(x=><li key={x}>{x}</li>)}</ul></article>)}</div>
      <div className="sk-two-col sk-two-col-wide sk-security">
        <div>
          <h3>Multi-tenant and security architecture</h3>
          <ul className="sk-checks">
            <li><strong>Tenant isolation at the database.</strong> A composite foreign key ties every solution to its project and tenant; a cross-tenant row is uninsertable, not merely filtered. A run from another tenant behaves exactly like a missing run, so the API cannot leak that an id exists.</li>
            <li><strong>Roles.</strong> Owner, admin, member and viewer, deny-by-default, with an explicit allowlist for read-only operations.</li>
            <li><strong>Append-only audit log.</strong> A database trigger rejects updates and deletes; services may never write credentials, tokens or file contents into it.</li>
            <li><strong>Encrypted credentials.</strong> Connector secrets and BYOK keys are AES-256-GCM encrypted with a required master key; the frontend only ever sees a fingerprint.</li>
            <li><strong>Hardening.</strong> Helmet, rate limiting backed by the database, schema validation, sanitized input, GDPR data-rights flows and a written retention policy.</li>
          </ul>
        </div>
        <div>
          <h3>The model is a component, not the product.</h3>
          <p>SKatalyst is not tied to one model provider. Tenants bring their own keys for Claude, OpenAI or Gemini; keys are encrypted at rest, decrypted only at execution, and one active key per provider is enforced. Generated chat applications use the customer’s own runtime provider, chosen at deploy time, never requested during design.</p>
          <p>The value sits around the models: the context, the workflows, the structured data, the application architecture and the validation system.</p>
          <ProductFrame src={`${M}/byok.jpg`} alt="Settings, LLM API keys: bring your own key for Anthropic Claude, OpenAI GPT and Google Gemini." width={1950} height={640} label="Settings · bring your own key" sizes="(max-width: 1000px) 100vw, 50vw"/>
        </div>
      </div>
      <dl className="sk-numbers" aria-label="Engineering snapshot">{numbers.map(x=><div key={x.l}><dt>{x.n}</dt><dd>{x.l}</dd></div>)}</dl>
      <p className="sk-caption">All figures counted from the repository on 28 August 2026: 180 commits since June 2025. Endpoint count is a floor (391 in the main router plus 11 route modules).</p>
    </div>
  </section>

  <section className="sk-section sk-evolution" aria-labelledby="sk-evo-title">
    <div className="shell sk-two-col sk-two-col-wide">
      <div>
        <p className="sk-index">10 · Evolution</p>
        <h2 id="sk-evo-title">From prototype to platform</h2>
        <ol className="sk-timeline">{evolution.map(e=><li key={e.t}><time>{e.when}</time><strong>{e.t}</strong><p>{e.d}</p></li>)}</ol>
      </div>
      <aside className="sk-role">
        <p className="sk-mini-title">My role</p>
        <h3>Founder / Product / AI Architecture / Engineering</h3>
        <p>I have been designing and building SKatalyst AI end to end: the product concept, the system architecture, the data and context model, the AI workflows and their non-AI fallbacks, application generation, the validation architecture and the product UX.</p>
        <ul><li>Product concept and positioning</li><li>System architecture and tenancy model</li><li>Data and context model</li><li>AI workflows and BYOK design</li><li>Application generation</li><li>Validation architecture</li><li>Product UX and onboarding</li></ul>
        <p className="sk-caption">Screenshots on this page are from the product running locally on synthetic sample data (a retail dataset of customers, orders and products). Private beta; no customer, revenue or scale claims are made.</p>
      </aside>
    </div>
  </section>

  <section className="sk-close"><div className="shell"><p className="sk-index">Next</p><h2>Two projects, one practice.</h2><div className="actions"><TrackedLink className="button primary sk-button" href="https://skatalystai.com" eventName="skatalyst_link_clicked" target="_blank" rel="noreferrer">Visit SKatalyst AI</TrackedLink><Link className="button sk-button-ghost" href="/projects/the-magical-book">Next: The Magical Book →</Link></div></div></section>
</div>}
