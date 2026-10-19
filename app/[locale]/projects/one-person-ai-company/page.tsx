import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {useCopy} from "@/i18n/use-copy";
import {createPageMetadata} from "@/lib/seo";
import Image from "next/image";import {Link} from "@/i18n/navigation";import {MagicalBookDemo,WatchDemoButton} from "@/components/MagicalBookDemo";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/projects/one-person-ai-company", {title: "One-Person AI Company", description: "Sinda Khenine’s 24-hour experiment in AI orchestration with OpenClaw, Grok Bot and PostgreSQL. Read the results, human interventions and lessons."}, locale); }
const M="/media/one-person-ai-company";
type ShotProps={src:string;w:number;h:number;alt:string;path:string;cap?:string;sizes?:string;priority?:boolean};
function Shot({src,w,h,alt,path,cap,sizes="(max-width:900px) 100vw, 60vw",priority}:ShotProps){
  const copy = useCopy();

  return <figure className="op-window"><div className="op-window-bar"><span>{copy("one-person-ai-company")}</span><em>{copy(path)}</em></div><Image src={`${M}/${src}`} alt={copy(alt)} width={w} height={h} sizes={sizes} priority={priority}/>{cap&&<figcaption>{copy(cap)}</figcaption>}</figure>;
}
const roles=[
  {name:"OpenClaw",title:"Manager · orchestrator",kind:"brain",mission:"Turn the mission into research tasks, decide what to do after each result, declare research sufficient and request the synthesis.",tools:"11 read-only tools over the PostgreSQL dataset and exactly one write tool: submit_orchestration_decision.",routine:"Consulted at computed decision points: run start, task completed or failed, verification failed, idle with open questions, a 30-minute heartbeat and synthesis due.",output:"Structured decisions (6 types), validated by the backend before anything changes, plus the interim and final reports.",checkpoint:"Every consultation, tool call, decision and refusal is written to the event log. Session memory on the gateway is context, not truth."},
  {name:"Grok Bot",title:"Researcher · executor",kind:"hands",mission:"Investigate the public web for what happened to specific companies after they paid for attention, and return claims with evidence.",tools:"Its own native public web and public X search. This codebase never calls Grok; Grok calls in through a five-endpoint task inbox.",routine:"Polls the inbox (documented cadence: every minute), claims a task atomically, streams eight kinds of activity events, posts a structured result or a failure.",output:"Claims labelled by epistemic class (OBSERVED, REPORTED, UNKNOWN), evidence URLs with excerpts, limitations and unknowns.",checkpoint:"Every claim is verified deterministically before it can appear in a report. Agent-reported events are stored as AGENT_REPORTED, never as fact."},
  {name:"Deterministic engine",title:"Collector · analysis · verifier",kind:"code",mission:"Own everything that can be measured: gross bidding volume, reconciliation against the revenue counter, per-company efficiency, rank-change episodes, anomalies.",tools:"TypeScript, SQL and Prisma. No model calls. Human-attended browser capture for market snapshots; no scraping, no challenge bypass.",routine:"Ingest a snapshot when a human captures one; recompute metrics; verify every claim the researcher returns against the record.",output:"Numbers with provenance, CLEAN / CONFOUNDED / INSUFFICIENT_DATA episode labels, verdicts SUPPORTED, PARTIAL, UNKNOWN, UNSUPPORTED, CONTRADICTED.",checkpoint:"Observation checkpoints at T+6, T+12, T+18 and T+24 hours: due 15 minutes before, missed 30 minutes after. Missed checkpoints are recorded as errors, not hidden."},
  {name:"Founder (me)",title:"Human · the only write access",kind:"human",mission:"Set the objective, start and stop runs, capture market observations, unblock, correct, and stay out of the reasoning loop.",tools:"Start / stop / finish run behind a control token; intervention records; a browser and a notebook.",routine:"Watch the control room. Answer REQUEST_HUMAN and budget-cap blocks. During the run, three emergency code changes, each recorded as a CORRECTION intervention.",output:"Interventions in the same event log as everything else, so the replay shows exactly where a human touched the run.",checkpoint:"Out-of-band database editing is forbidden by the experiment protocol. If I change the code mid-run, the run record moves to the new commit."}
];
const readTools=["get_platform_summary","list_companies","get_company","get_company_history","get_category_stats","list_rank_change_episodes","list_current_anomalies","list_existing_tasks","get_task_result","list_unresolved_questions","get_observation_metadata"];
const triggers=["RUN_STARTED","NEW_OBSERVATION","TASK_COMPLETED","TASK_FAILED","VERIFICATION_FAILED","IDLE_WITH_OPEN_QUESTIONS","HEARTBEAT","SYNTHESIS_DUE"];
const decisions=["CREATE_TASK","RETRY_TASK","ABANDON_TASK","REQUEST_HUMAN","DECLARE_RESEARCH_SUFFICIENT","REQUEST_SYNTHESIS"];
const taskStates=["CREATED","QUEUED","DISPATCHED","RUNNING","VERIFYING","COMPLETED","RETRY_SCHEDULED","FAILED","BLOCKED_ON_HUMAN","CANCELLED"];
const loop=[["Poll","Every 15 s, read ACTIVE runs from PostgreSQL"],["Guard","Enforce budget, deadline and observation checkpoints"],["Trigger","Compute the pending consult, or skip it if nothing material changed"],["Consult","OpenClaw reads through 11 tools, up to 16 turns"],["Decide","One structured decision through the single write tool"],["Validate","Backend checks invariants; refusals are recorded, nothing is cancelled silently"],["Journal","Decision applied, events appended, control room updates"]];
const shots=[
  {src:"control-results.jpg",w:2960,h:1500,path:"/control/results",alt:"Results view: executive verdict on the Outbid market, scoreboard, insight cards and the final report",cap:"RESULTS. Conclusion first: the verdict, the big finding, the scoreboard and the final report rendered from the run record."},
  {src:"control-evidence.jpg",w:2960,h:1500,path:"/control/evidence",alt:"Evidence view: claims with verdicts and linked sources",cap:"EVIDENCE. Every claim with its class, verdict and sources. PARTIAL and UNKNOWN can never be mistaken for full support."},
  {src:"control-replay.jpg",w:2960,h:1500,path:"/control/replay",alt:"Replay view of the official run with the permanent REPLAY watermark",cap:"REPLAY. The same render path as live, driven by persisted events at 1x to 300x, under a permanent watermark."},
  {src:"control-topology.jpg",w:2000,h:1130,path:"/control/live · topology",alt:"Live topology graph of the company: source, collector, snapshot store, analysis, OpenClaw, task state, Grok, evidence store, verifiers, human, report",cap:"TOPOLOGY. Thirteen nodes whose states are derived on the server from the event log; client pulses are an overlay, never the source of truth."}
];
const annot=[["Run clock","Planned end, elapsed time and the code version the run is currently executing."],["Budget","Tasks used against the cap, spend as ESTIMATED when the provider did not price the call."],["Agent cards","OpenClaw, Grok Bot, verifier and collector with their last activity and health."],["Activity stream","Server-sent events with resume by sequence number; the feed is the log, not a summary of it."],["Honesty labels","MOCK, ESTIMATED, AGENT_REPORTED and REPLAY are rendered as labels the UI cannot drop."],["Human node","Interventions appear on the graph and in the stream like any other actor."]];
const schedule=[["Orchestrator poll","15 s","ORCHESTRATOR_POLL_SEC"],["Consult debounce","60 s","IMMEDIATE triggers bypass it"],["Heartbeat","30 min","consult only if a material change occurred, otherwise a $0 heartbeat_skipped event"],["Task timeout","45 min","stale RUNNING tasks move to RETRY_SCHEDULED"],["Observation checkpoints","T+6 / 12 / 18 / 24 h","due 15 min before, missed 30 min after; local macOS notification"],["Live stream poll","1.5 s","SSE, resumable"],["Researcher routine","every 1 min","documented on the Grok side; documented pickup latency 10 m 40 s in calibration"]];
const day=[
  {t:"23 Aug 16:29",k:"auto",h:"Run started",d:"OFFICIAL run created from commit 390820c: 24 hours, 40 tasks, $50 cap. Three pre-run snapshots already in the record; the last real observation at 16:26."},
  {t:"16:35",k:"auto",h:"Plan and first three tasks",d:"OpenClaw reads the platform summary and companies, then creates DOWNSTREAM_EVIDENCE, COMMERCIAL_INVESTIGATION and ANOMALY_EXPLANATION tasks."},
  {t:"16:36",k:"auto",h:"Grok claims its first task",d:"grok-main claims the downstream-evidence task 1 min 47 s after it was queued and starts streaming research events."},
  {t:"16:44",k:"human",h:"Intervention 1 (CORRECTION)",d:"The orchestrator LaunchAgent had failed on a macOS permission error while sourcing .env. Fixed with node --env-file. During recovery, synthetic seed data (SynthCo) was found leaking into the anomaly tools: provenance guards added, the contaminated task cancelled."},
  {t:"16:48",k:"auto",h:"First result verified",d:"Eight claims and nine sources come back; the deterministic verifier grades each one. Second task completes at 16:52."},
  {t:"16:53",k:"auto",h:"Follow-up question",d:"OpenClaw opens an OPEN_QUESTION task on the two companies with the largest spend; Grok completes it at 17:01."},
  {t:"17:02",k:"auto",h:"Interim report, 33 minutes in",d:"Research declared sufficient; a 9,491-character report is generated and preserved verbatim in the event log."},
  {t:"17:55",k:"human",h:"Intervention 2 (CORRECTION)",d:"A design gap: sufficiency permanently suppressed new observations and the interim report suppressed the final synthesis. The next 23 hours would have been dead time. Fix: observation-relative sufficiency and one guaranteed final synthesis."},
  {t:"20:35 · 22:37",k:"auto",h:"Two rewrites overnight",d:"Heartbeat consultations rewrite the report to 7,338 then 6,714 characters without any new evidence. Every heartbeat costs real tokens."},
  {t:"22:29 · 04:29",k:"fail",h:"Checkpoints T+6 and T+12 pass unobserved",d:"No human-attended market capture happened at either target. The gaps were only recorded as errors at 11:02 the next morning, once intervention 3 added checkpoint observability; T+18 and T+24 were missed too. The system treats the market as UNKNOWN rather than unchanged."},
  {t:"24 Aug 10:54",k:"human",h:"Intervention 3 (CORRECTION)",d:"Idle-cost gate: heartbeats now skip at $0 unless something material changed. Decision idempotency and checkpoint observability added. Before the patch: 39 consultations, 0 skips. After: 2 consultations, 165 skips."},
  {t:"16:30",k:"auto",h:"Final synthesis",d:"70 seconds after the planned end, the guaranteed final report (9,556 characters) is generated. Task creation and claims are refused after the deadline. The run record itself was never finalised and is still marked ACTIVE."}
];
const failures=[
  {t:"A startup failure",d:"Minutes after launch, the orchestrator stopped because macOS refused a shell sourcing .env under launchd. I had to fix the startup configuration."},
  {t:"Synthetic data in a real run",d:"Development seed data leaked into two read tools. OpenClaw did the rational thing with what it saw and opened a task about a company that does not exist. A human audit caught it; the cancellation is in the log."},
  {t:"Autonomy stalled",d:"Once research was declared sufficient, the design silently turned the remaining 23 hours into idle time. The fix had to be written during the run."},
  {t:"Reports that got shorter",d:"Each heartbeat consultation rewrote the report with no new evidence: 9,491 to 7,338 to 6,714 characters. The system was productive-looking and useless, at a cost."},
  {t:"The eyes were never automated",d:"All four observation checkpoints were missed because fresh market capture stays human-attended by policy. The company had a brain and hands, but I was still the eyes."},
  {t:"Cut-off thinking",d:"23 of 41 consultations hit the 6,144-token output cap and ended as truncated. They were logged as such and never treated as decisions."}
];
const contract=[["Decide, never execute","The agent proposes structured decisions. The backend validates against invariants and applies them, or refuses and records why."],["Report, never assert","Anything an agent says about the world enters as AGENT_REPORTED with a claim class. A verifier decides what it is worth."],["Persist before display","No event exists until it is in PostgreSQL with a per-run sequence number. The control room renders the log; it never invents state."],["Bounded by construction","Caps on spend, tasks, attempts and wall-clock time; deadline refusals; one guaranteed final synthesis; UNKNOWN is a valid answer."]];
const layers=[["Objective","One mission with a hierarchy: business result first, experiment second, proof of work third."],["Orchestrator loop","A TypeScript worker (no framework, no queue): poll, guard, trigger, consult, validate, journal."],["OpenClaw gateway","OpenResponses-compatible /v1/responses endpoint on loopback, bearer token, transport-only retries, response-id continuity."],["Task inbox","Five narrow HTTP endpoints behind a worker token: peek, claim, events, result, fail. Claims are atomic and exclusive."],["Verification","Deterministic checks per claim; an optional Claude semantic judge behind an environment flag, not enabled in the run."],["PostgreSQL","16 models, 3 migrations: runs, tasks, attempts, events, claims, evidence, verifications, interventions, model calls, market data."],["Control room","Four views over one API: live (SSE), results, evidence, replay. Server-derived topology state."]];
const stack=[
  {k:"Runtime",v:"Next.js 16.3 · React 19.2 · TypeScript 5 · tsx workers · Tailwind CSS 4 · shadcn / Radix"},
  {k:"Data",v:"PostgreSQL 15 · Prisma 6.19 · 16 models · 19 enums · 3 migrations · per-run BigInt event sequence"},
  {k:"Orchestration",v:"Custom loop in scripts/orchestrator-worker.ts · triggers, consult, decisions, material-events, tools modules · zod 4 contracts"},
  {k:"Models",v:"OpenClaw gateway (routed to Claude Sonnet 5, thinking low, per the run notes) · Grok Bot as an external worker · optional Claude judge"},
  {k:"Operations",v:"macOS LaunchAgents for web, orchestrator and caffeinate · systemd units and Caddyfile written for a VPS but not used"},
  {k:"Testing",v:"Vitest 3.2 · 6 files · 105 tests against a dedicated PostgreSQL test database (104 pass; 1 stale hard-coded-date test)"},
  {k:"Interfaces",v:"18 API routes · SSE stream with Last-Event-ID resume · replay at 1x / 10x / 60x / 300x · mock OpenClaw gateway and mock worker for dry runs"}
];
const numbers=[{n:"24 h",l:"official run"},{n:"465",l:"events persisted"},{n:"41",l:"OpenClaw consultations"},{n:"21 / 0",l:"decisions applied / refused"},{n:"4",l:"tasks (3 completed, 1 cancelled)"},{n:"32",l:"claims returned"},{n:"31",l:"claims verified"},{n:"29",l:"evidence sources"},{n:"4",l:"reports generated"},{n:"3",l:"human interventions"},{n:"165",l:"$0 heartbeats skipped"},{n:"≈ $0.79",l:"estimated model cost"},{n:"1,140",l:"companies observed"},{n:"12",l:"tools (11 read + 1 write)"},{n:"50",l:"event types"},{n:"105",l:"tests"}];
const byAgent=[
  ["OpenClaw","41 consultations (18 decided, 23 truncated), 71 tool queries, 21 decisions: 15 REQUEST_SYNTHESIS, 4 CREATE_TASK, 2 DECLARE_RESEARCH_SUFFICIENT. Zero refusals, zero REQUEST_HUMAN.","Agent-executed"],
  ["Grok Bot","3 tasks claimed and completed by grok-main, all succeeded, all between 16:36 and 17:01. 32 claims, 29 sources. Attribution UNKNOWN for every investigated company.","Agent-executed"],
  ["Deterministic verifier","31 verifications, all deterministic: 11 SUPPORTED (UNKNOWN-class claims), 20 PARTIAL. No UNSUPPORTED, no CONTRADICTED. Semantic judge not enabled.","Agent-executed"],
  ["Collector + analysis","4 real browser-assisted snapshots before the run (last: 1,201 listings, gross bids $182,076 against a $182,070 counter). Zero snapshots during the run.","Human-assisted"],
  ["Founder","3 CORRECTION interventions, 1 audit cancellation, 0 approvals requested, all 4 checkpoints missed, run never formally finished.","Human-assisted"]
];
const classes=[
  ["Built","Orchestration loop, decision contract, task inbox, verification, event log, four-view control room, LaunchAgent deployment, tests"],
  ["Demonstrated","One official 24-hour run with a persisted log, replay and final report; calibration and dry runs before it"],
  ["Agent-executed","Task planning, research, per-claim verification, sufficiency decisions, interim and final synthesis"],
  ["Human-assisted","Market observation capture, run start and stop, the three mid-run corrections, the synthetic-data audit"],
  ["Experimental","Idle-cost gate and observation-relative sufficiency (written during the run); documented one-minute researcher cadence (pickup proven, cadence not)"],
  ["Not implemented","Approval-queue UI, Telegram or any chat channel, cloud-hosted researcher, semantic judge in the run, automated market capture, multi-tenancy, auth beyond tokens"]
];
const truth=[
  {layer:"Orchestrator and decision contract",status:"Demonstrated",d:"41 consultations and 21 applied decisions in the official run; invariants refused nothing because the prompt-level contract held."},
  {layer:"Grok researcher",status:"Demonstrated",d:"Real research through the inbox by worker grok-main. Payloads relayed through a token-safe local bridge; the planned cloud worker was never used."},
  {layer:"Verification",status:"Demonstrated / Built",d:"Deterministic verification ran on all 31 claims. The Claude semantic judge is implemented behind an environment flag and did not run."},
  {layer:"Control room",status:"Demonstrated",d:"All screenshots on this page are the real views rendered from the official run record, captured locally on 28 August."},
  {layer:"Persistence and replay",status:"Demonstrated",d:"465 events, 111 model calls, 4 reports; replay uses the same render path as live."},
  {layer:"24-hour autonomy",status:"Partial",d:"The reasoning loop ran unattended overnight. It needed two emergency corrections to do so, and observation stayed human-attended, so the market went unobserved for the whole window."},
  {layer:"Cost accounting",status:"Estimated",d:"The gateway priced none of the 111 calls; ≈ $0.79 is a conservative estimate from reported tokens, against a $50 cap."},
  {layer:"Business conclusion",status:"Partial",d:"Attention value measured ($182K gross, top 1 percent ≈ 61 percent of spend). Commercial ROI: UNKNOWN, published as such."},
  {layer:"Scheduled routines",status:"Built",d:"Interval timers in the orchestrator and LaunchAgents with KeepAlive. No cron, no daily briefings, no messaging channel."},
  {layer:"Video",status:"Real data · illustrative motion",d:"The 45-second showcase animates the official run’s persisted data; the explainer is narrated. Neither is a screen recording of the live run."},
  {layer:"Deployment",status:"Local only",d:"Ran on one Mac under LaunchAgents with the gateway on loopback. Not a product, not deployed, no users."}
];
export default async function Page({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);

  return <div className="op-page">
  <section className="op-hero"><div className="shell">
    <Link className="op-back" href="/projects">{copy("← All projects")}</Link>
    <p className="op-index">{copy("02 · Agent orchestration experiment · August 2026")}</p>
    <h1>{copy("One-Person AI Company")}</h1>
    <p className="op-statement">{copy("What if one person could delegate work to an entire AI organization?")}</p>
    <p className="op-lede">{copy("Not a prompt, an objective. I gave an AI manager a real business question about a public marketplace, gave it an AI researcher, an accountant made of deterministic code and a memory made of PostgreSQL, and let the company run for 24 hours while I watched from a control room. This page is what actually happened, with the numbers from the run record.")}</p>
    <div className="actions"><WatchDemoButton className="button primary op-button">{copy("Watch the Experiment ↓")}</WatchDemoButton><a className="button op-button-ghost" href={copy.href("#how")}>{copy("See How It Worked")}</a></div>
    <dl className="op-hero-status"><div><dt>{copy("Official run")}</dt><dd>{copy("24 h")}</dd></div><div><dt>{copy("Roles")}</dt><dd>{copy("2 AI + code + 1 human")}</dd></div><div><dt>{copy("Events persisted")}</dt><dd>465</dd></div><div><dt>{copy("Human corrections")}</dt><dd>3</dd></div></dl>
    <div className="op-hero-media"><Shot src="control-live.jpg" w={3200} h={2000} path="/control/live · LIVE COMPANY" alt={copy("The live control room: run clock and budget, live topology graph, agent cards and the event stream for the official run")} sizes="(max-width:900px) 100vw, 1200px" priority cap={copy("The real control room, rendered from the official run record: clock and budget, live topology, agent cards, event stream.")}/></div>
  </div></section>

  <section className="op-section" id="experiment"><div className="shell">
    <p className="op-index">{copy("01 · The experiment")}</p>
    <h2>{copy("The question I wanted to test.")}</h2>
    <div className="op-two"><div>
      <p className="op-lede">{copy("Chat AI is good at tasks: answer this, rewrite that. An organization works differently. You hand someone an outcome and they decide what to research, what to do next, when to ask for help and when the work is done. The experiment tested whether that shape could be built from agents, with one human at the top.")}</p>
      <p>{copy("The objective was deliberately real and measurable: a public pay-to-rank marketplace where companies bid for attention. The mission text stored in the run record asks the company to measure what every participant received relative to what they paid, identify who benefited most and least, explain why, and estimate the value captured by the platform itself.")}</p>
    </div><div className="op-compare">
      <article><h3>{copy("Task delegation")}</h3><blockquote>{copy("“Summarise these five companies’ pricing pages.”")}</blockquote><ol><li>{copy("Prompt")}</li><li>{copy("Answer")}</li><li>{copy("Done")}</li></ol></article>
      <article><h3>{copy("Objective delegation")}</h3><blockquote>{copy("“Measure the value every participant received relative to what they paid, and tell me what explains it.”")}</blockquote><ol><li>{copy("Plan")}</li><li>{copy("Research")}</li><li>{copy("Verify")}</li><li>{copy("Decide")}</li><li>{copy("Ask")}</li><li>{copy("Report")}</li></ol></article>
    </div></div>
    <p className="op-pull">{copy("The interesting question was never whether the model could think. It was whether the organization around it could be trusted with the result.")}</p>
  </div></section>

  <section className="op-section" id="how"><div className="shell">
    <p className="op-index">{copy("02 · The company")}</p>
    <h2>{copy("Five roles. Two of them are language models.")}</h2>
    <p className="op-lede">{copy("“Company” is the metaphor; the architecture is smaller and stricter than the word suggests. One orchestrator decides. One researcher executes. Deterministic code owns the numbers. PostgreSQL is the only truth. The control room is a window onto it, never a source. The governing rule from the repository README: agents decide, the backend executes and records.")}</p>
    <div className="op-org">
      <div className="op-org-node" data-k="human"><strong>{copy("Founder")}</strong><span>{copy("human · objective, start / stop, corrections")}</span></div>
      <div className="op-org-v"/>
      <div className="op-org-node" data-k="brain"><strong>{copy("OpenClaw")}</strong><span>{copy("manager · plans, decides, synthesises")}</span></div>
      <div className="op-org-row">
        <div><div className="op-org-node"><strong>{copy("Grok Bot")}</strong><span>{copy("researcher · public web + public X")}</span></div><p className="op-org-tools">{copy("task inbox · claims + evidence")}</p></div>
        <div><div className="op-org-node"><strong>{copy("Deterministic engine")}</strong><span>{copy("collector · analysis · accountant")}</span></div><p className="op-org-tools">{copy("snapshots · metrics · episodes · anomalies")}</p></div>
        <div><div className="op-org-node"><strong>{copy("Verifier")}</strong><span>{copy("skeptic · grades every claim")}</span></div><p className="op-org-tools">{copy("deterministic checks · optional judge")}</p></div>
      </div>
      <div className="op-org-v"/>
      <div className="op-org-wide"><div className="op-org-node" data-k="truth"><strong>{copy("PostgreSQL")}</strong><span>{copy("memory · append-only event log")}</span></div><div className="op-org-node" data-k="truth"><strong>{copy("Control room")}</strong><span>{copy("live · results · evidence · replay")}</span></div><div className="op-org-node" data-k="truth"><strong>{copy("Reports")}</strong><span>{copy("interim, preserved verbatim · one final")}</span></div></div>
    </div>
    <p className="op-caption">{copy("The agent registry in the database holds six actors: founder (HUMAN), openclaw, grok-bot, deterministic-verifier, outbid-collector and backend (SYSTEM). There is no finance agent, no product-builder agent and no personal-assistant agent in this repository; the brief for a wider “AI company” was scoped down to what I could actually verify.")}</p>
  </div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("03 · The orchestrator")}</p>
    <h2>{copy("How decisions reach the backend.")}</h2>
    <p className="op-lede">{copy("The orchestrator is a plain TypeScript worker, no agent framework and no queue. It polls PostgreSQL, works out whether a decision point has arrived, and only then spends tokens. The model sees the dataset through read-only tools and can change the world through exactly one function.")}</p>
    <ol className="op-loop">{loop.map(([k,v])=><li key={k}><span>{copy(k)}</span>{copy(v)}</li>)}</ol>
    <div className="op-two op-two-wide" style={{marginTop:32}}>
      <div><p className="op-mini">{copy("8 consult triggers")}</p><p style={{fontFamily:"var(--op-mono)",fontSize:".78rem",lineHeight:1.9}}>{copy(triggers.join(" · "))}</p>
        <p className="op-mini">{copy("6 decision types")}</p><p style={{fontFamily:"var(--op-mono)",fontSize:".78rem",lineHeight:1.9}}>{copy(decisions.join(" · "))}</p>
        <p className="op-mini">{copy("10 task states")}</p><p style={{fontFamily:"var(--op-mono)",fontSize:".78rem",lineHeight:1.9}}>{copy(taskStates.join(" · "))}</p></div>
      <div><p className="op-mini">{copy("Invariants the backend enforces")}</p><ul className="op-facts">
        <li>{copy("Research cannot be declared sufficient while any task is open, or before at least one outcome-discovery task has actually finished. Nothing is cancelled silently.")}</li>
        <li>{copy("Sufficiency is observation-relative: a newer real snapshot reopens research.")}</li>
        <li>{copy("Synthesis needs a clear board and a material change since the last report, except for the one guaranteed final synthesis after the deadline.")}</li>
        <li>{copy("After the planned end, task creation and worker claims are refused.")}</li>
        <li>{copy("Heartbeats without a material change are skipped at $0 and logged as such (added mid-run, see the failures).")}</li>
        <li>{copy("Consultations end as decided, no_decision, truncated or turns_exhausted; only the first one changes anything.")}</li>
      </ul></div>
    </div>
  </div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("04 · Agent ownership")}</p>
    <h2>{copy("What each agent is responsible for.")}</h2>
    <div className="op-cards op-cards-2">{roles.map(r=><article key={r.name}><header><h3>{copy(r.name)}</h3><small>{copy(r.title)}</small></header><dl><dt>{copy("Mission")}</dt><dd>{copy(r.mission)}</dd><dt>{copy("Tools")}</dt><dd>{copy(r.tools)}</dd><dt>{copy("Routine")}</dt><dd>{copy(r.routine)}</dd><dt>{copy("Output")}</dt><dd>{copy(r.output)}</dd><dt>{copy("Checkpoint")}</dt><dd>{copy(r.checkpoint)}</dd></dl></article>)}</div>
  </div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("05 · Persistence")}</p>
    <h2>{copy("What the system remembers.")}</h2>
    <div className="op-two"><div>
      <p className="op-lede">{copy("Every run has its own monotonic event sequence. Fifty event types cover the whole life of the company: run lifecycle, consultations and tool calls, decisions made, applied or refused, task transitions, research activity, claims, verifications, snapshots, anomalies, process restarts, skipped heartbeats, missed checkpoints, human interventions and generated reports.")}</p>
      <ul className="op-facts">
        <li>{copy("16 Prisma models: Run, Agent, Task, TaskAttempt, Event, Claim, Evidence, ClaimEvidence, Verification, HumanIntervention, ModelCall, Company, OutbidSnapshot, OutbidListing, RankChangeEpisode, BreakEvenScenario.")}</li>
        <li>{copy("Each event records who reported it and at what reporting level, so an agent’s account of its own work is never confused with a verified fact.")}</li>
        <li>{copy("Interim reports are preserved verbatim inside report_generated events; the run row holds the final one.")}</li>
        <li>{copy("Model calls store provider, model id, tokens and whether the cost was actually known. In this run it never was.")}</li>
        <li>{copy("Replay reads the same events through the same renderer as live, at up to 300x.")}</li>
      </ul>
    </div><Shot src="article-events-timeline.jpg" w={1549} h={793} path="event log · official run" alt={copy("Timeline of the 465 events in the official run, from run start through tasks, reports and interventions to the final synthesis")} cap={copy("The event log of the official run as a timeline, from the article’s figures.")}/></div>
  </div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("06 · OpenClaw")}</p>
    <h2>{copy("What the manager actually is.")}</h2>
    <div className="op-two"><div>
      <p className="op-lede">{copy("OpenClaw is reached through an OpenResponses-compatible gateway on the local machine. The backend sends the system instructions, the tool schemas and the previous response id; the gateway keeps the conversation and routes to its configured model (Claude Sonnet 5 with low thinking, per the run notes). The backend keeps nothing of the conversation itself.")}</p>
      <ul className="op-facts">
        <li>{copy("Used for: planning, tool-driven inspection of the dataset, structured decisions, interim and final synthesis.")}</li>
        <li>{copy("Not used: OpenClaw workspaces, files, browsers or its own routines. In this experiment it is a decision service, not a desktop agent.")}</li>
        <li>{copy("The single decision tool has a flat, object-rooted schema because the gateway’s tool bridge degraded a discriminated union into opaque strings during calibration. The backend still validates the strict union.")}</li>
        <li>{copy("Transport retries only on network errors and 502 / 503 / 504; never on a client timeout, because the gateway may be mid-turn spending real tokens.")}</li>
        <li>{copy("A mock gateway with MOCK labels exists for dry runs; nothing it produces can be mistaken for the real thing in the control room.")}</li>
      </ul>
    </div><Shot src="control-agents.jpg" w={560} h={1110} path="/control/live · agents" alt={copy("Agent cards for OpenClaw, Grok Bot, verifier and collector with their last activity")} sizes="(max-width:900px) 70vw, 360px" cap={copy("Agent cards in the live view.")}/></div>
  </div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("07 · Models")}</p>
    <h2>{copy("Models and their roles.")}</h2>
    <div className="op-cards">
      <article><header><h3>{copy("OpenClaw gateway")}</h3><small>{copy("manager")}</small></header><p>{copy("Provider string openclaw-gateway, model string openclaw. All 111 model calls in the official run went here. The gateway’s configured default, per the runbook, is Claude Sonnet 5.")}</p></article>
      <article><header><h3>{copy("Grok Bot")}</h3><small>{copy("researcher")}</small></header><p>{copy("Runs as an external worker with its own public web and public X search. This codebase contains no xAI key and no Grok model id; it exposes an inbox, and Grok calls in.")}</p></article>
      <article><header><h3>{copy("Claude semantic judge")}</h3><small>{copy("optional")}</small></header><p>{copy("Implemented as a second verification level behind an environment flag, defaulting to Claude Sonnet 5. Not enabled in the official run: zero semantic verifications in the record.")}</p></article>
    </div>
    <p className="op-caption">{copy("No OpenAI or Gemini integration exists in the repository. “OpenAI-compatible” in the code describes the wire format of the gateway, not a provider.")}</p>
  </div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("08 · Tools")}</p>
    <h2>{copy("The manager’s tools.")}</h2>
    <div className="op-two"><div>
      <p className="op-mini">{copy("Read-only tools for the manager")}</p>
      <p style={{fontFamily:"var(--op-mono)",fontSize:".8rem",lineHeight:1.9}}>{copy(readTools.join(" · "))}</p>
      <p className="op-mini">{copy("The only write")}</p>
      <p style={{fontFamily:"var(--op-mono)",fontSize:".8rem"}}>{copy("submit_orchestration_decision")}</p>
      <p className="op-caption">{copy("The manager can page through 1,140 companies, read a company’s bid, rank and click history, inspect rank-change episodes labelled CLEAN, CONFOUNDED or INSUFFICIENT_DATA, see its own tasks and their verdicts, and check how stale the observation is. It cannot write a row.")}</p>
    </div><div>
      <p className="op-mini">{copy("Rules injected into every research task")}</p>
      <ul className="op-facts">
        <li>{copy("Never click the marketplace’s outbound links: that would contaminate the click data being measured.")}</li>
        <li>{copy("No contacting founders, no purchases or sign-ups, no posting or commenting, no form submissions, no account changes.")}</li>
        <li>{copy("Public web only; public X posts only; never a human’s account, session or cookies.")}</li>
        <li>{copy("Attribution ladder with five levels, from a company-credited outcome down to UNKNOWN. UNKNOWN is a legitimate result.")}</li>
      </ul>
      <p className="op-caption">{copy("There is no Telegram, git, file, email or browser-automation tool in this repository. Market observation is done by a human with a browser and a capture snippet, by policy: no scraping, no challenge bypass, human-scale volume.")}</p>
    </div></div>
  </div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("09 · Human in the loop")}</p>
    <h2>{copy("What ran on its own, and where a person had to be.")}</h2>
    <div className="op-split">
      <article><h3>{copy("Agent-executed, no approval")}</h3><ul><li>{copy("Task planning and creation, up to the run’s cap")}</li><li>{copy("Research, claims and evidence")}</li><li>{copy("Per-claim deterministic verification")}</li><li>{copy("Declaring research sufficient")}</li><li>{copy("Interim reports and the final synthesis")}</li><li>{copy("Skipping idle heartbeats")}</li></ul></article>
      <article><h3>{copy("Human required")}</h3><ul><li>{copy("Starting, stopping and finishing a run (control token)")}</li><li>{copy("Capturing market snapshots at the checkpoints")}</li><li>{copy("Answering REQUEST_HUMAN or a budget-cap block (BLOCKED_ON_HUMAN)")}</li><li>{copy("Auditing data provenance and cancelling a contaminated task")}</li><li>{copy("Three emergency code changes, recorded as CORRECTION interventions")}</li></ul></article>
    </div>
    <p className="op-caption">{copy("The approval architecture exists in the data model (APPROVAL, CORRECTION, UNBLOCK and MANUAL_WORK interventions; task and run states for BLOCKED_ON_HUMAN). No approval-queue screen shipped: interventions in this run were recorded through code paths, not through a button. OpenClaw never used REQUEST_HUMAN.")}</p>
  </div></section>

  <section className="op-section" id="command"><div className="shell">
    <p className="op-index">{copy("10 · Command center")}</p>
    <h2>{copy("Four views over one event log.")}</h2>
    <p className="op-lede">{copy("Live company, results, evidence, replay. The control room has six binding honesty rules in its design document; the shortest version is that it can only show what has been persisted, and it must label MOCK, ESTIMATED, AGENT_REPORTED and REPLAY wherever they apply.")}</p>
    <Shot src="control-stream.jpg" w={2960} h={330} path="/control/live · activity stream" alt={copy("Activity stream strip with run clock, budget and recent events")} sizes="(max-width:900px) 100vw, 1200px"/>
    <div className="op-annot">{annot.map(([k,v])=><div key={k}><strong>{copy(k)}</strong><span>{copy(v)}</span></div>)}</div>
    <div className="op-shots">{shots.map(s=><Shot key={s.src} {...s}/>)}</div>
  </div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("11 · Routines and schedule")}</p>
    <h2>{copy("Interval timers and three LaunchAgents. No cron, no chat channel.")}</h2>
    <div className="op-two"><div>
      <table className="op-table"><thead><tr><th>{copy("Routine")}</th><th>{copy("Cadence")}</th><th>{copy("Note")}</th></tr></thead><tbody>{schedule.map(([a,b,c])=><tr key={a}><th>{copy(a)}</th><td style={{fontFamily:"var(--op-mono)",fontSize:".8rem"}}>{copy(b)}</td><td>{copy(c)}</td></tr>)}</tbody></table>
    </div><div>
      <p className="op-mini">{copy("How it stayed up for 24 hours")}</p>
      <ul className="op-facts">
        <li>{copy("Three macOS LaunchAgents with KeepAlive: the web app, the orchestrator worker and caffeinate to keep the machine awake.")}</li>
        <li>{copy("Five process_restarted events in the run: every restart is in the log, alongside everything else.")}</li>
        <li>{copy("The orchestrator’s launch command is itself the first emergency fix: node --env-file instead of a shell sourcing .env.")}</li>
        <li>{copy("Checkpoint alerts are local macOS notifications. There is no Telegram bot, no email, no daily briefing; a run summary is available on demand from the API.")}</li>
        <li>{copy("systemd units and a Caddyfile for a single VPS were written and never used; the gateway and the database are never proxied by design.")}</li>
      </ul>
    </div></div>
  </div></section>

  <section className="op-section" id="workday"><div className="shell">
    <p className="op-index">{copy("12 · A day in the company")}</p>
    <h2>{copy("The official run, from the event log.")}</h2>
    <p className="op-lede">{copy("Run cmt60vdjp…, 23 August 16:29 to 24 August 16:29 (UTC). Green marks agent activity, amber a human intervention, red a recorded failure.")}</p>
    <ol className="op-day">{day.map(e=><li key={e.t+e.h} data-k={e.k}><time>{copy(e.t)}</time><p><strong>{copy(e.h)}</strong>{copy(e.d)}</p></li>)}</ol>
    <div className="op-two" style={{marginTop:40}}>
      <Shot src="article-failure-timeline.jpg" w={2000} h={1100} path="figure · failures against the clock" alt={copy("Timeline placing the three emergency corrections and the missed checkpoints across the 24-hour run")} cap={copy("The three corrections against the 24-hour clock.")}/>
      <Shot src="article-cs-autonomy.jpg" w={1900} h={887} path="figure · consultations before and after the idle gate" alt={copy("Chart comparing consultations and skipped heartbeats before and after the third correction")} cap={copy("Before the idle-cost gate: 39 consultations, 0 skips. After: 2 consultations, 165 skips at $0.")}/>
    </div>
  </div></section>

  <section className="op-section" id="video"><div className="shell">
    <p className="op-index">{copy("13 · Watch the company operate")}</p>
    <h2>{copy("Forty-five seconds of the official run.")}</h2>
    <p className="op-lede">{copy("The showcase animates the persisted data of the official run: the roles, the timeline, the numbers and the verdict. It is built from the record, not screen-recorded live, so it is labelled real data with illustrative motion.")}</p>
    <MagicalBookDemo src={`${M}/showcase.mp4`} poster={`${M}/showcase-poster.jpg`} label={copy("Forty-five-second showcase of the One-Person AI Company official run: real run data with illustrative motion, no audio.")}/>
    <p className="op-caption">{copy("Real data · illustrative motion · no audio.")}</p>
    <p className="op-mini" style={{marginTop:36}}>{copy("The explainer")}</p>
    <video className="op-explainer" controls preload="none" poster={`${M}/explainer-poster.jpg`} playsInline style={{width:"100%",borderRadius:10,border:"1px solid var(--op-line2)",background:"#0B0F16"}} aria-label={copy("One-minute narrated explainer of the One-Person AI Company experiment")}><source src={`${M}/explainer.mp4`} type="video/mp4"/></video>
    <p className="op-caption">{copy("A 55-second narrated explainer of the idea and the result. With audio.")}</p>
  </div></section>

  <section className="op-section" id="article"><div className="shell">
    <p className="op-index">{copy("14 · Behind the experiment")}</p>
    <h2>{copy("The write-up: what I gave the company, and what it gave back.")}</h2>
    <div className="op-two"><div>
      <p className="op-lede">{copy("The working title of the article is “I Tried to Build a One-Person AI Company With Grok Bot + OpenClaw. Here’s What Actually Happened.” It is a local draft; there is no public link yet, so none is offered here.")}</p>
      <ul className="op-facts">
        <li>{copy("The business question: on a public pay-to-rank marketplace, is attention worth what companies pay for it? The measurable half (gross volume, distribution, cost per click) went to deterministic code. The unmeasurable half (what happened after the click) went to the researcher.")}</li>
        <li>{copy("Findings the company returned: about $182K in gross bids across 1,140 companies; the top 1 percent of spenders accounted for roughly 61 percent of spend; a 200x spread in cost per click across categories; visible audience mismatch; and commercial ROI marked UNKNOWN, because no company-credited outcome could be found publicly.")}</li>
        <li>{copy("The agents continued reasoning overnight, but every fresh market observation still required me.")}</li>
      </ul>
    </div><Shot src="grok-researcher-chat.jpg" w={1532} h={1560} path="Grok Bot · Outbid Researcher" alt={copy("Grok Bot conversation as the Outbid Researcher, reporting on public companies with no private data")} sizes="(max-width:900px) 100vw, 480px" cap={copy("The researcher at work in Grok Bot. Public companies only; nothing private in the frame.")}/></div>
    <div className="op-shots" style={{marginTop:28}}>
      <Shot src="article-business-finding.jpg" w={2000} h={1034} path="figure · the business finding" alt={copy("Figure summarising the business finding: attention measured, commercial ROI unknown")} cap={copy("Attention measured, ROI unproven.")}/>
      <Shot src="article-two-research-directions.jpg" w={2000} h={934} path="figure · two research directions" alt={copy("Figure showing the split between the deterministic measurable half and the agent-researched unmeasurable half")} cap={copy("Code for what can be measured, agents for what cannot.")}/>
      <Shot src="article-cs-rewrites.jpg" w={1900} h={634} path="figure · report rewrites" alt={copy("Chart of report length across the four generated reports")} cap={copy("9,491 to 7,338 to 6,714 to 9,556 characters: the rewrites problem.")}/>
      <Shot src="article-synthetic-cancellation.jpg" w={1549} h={793} path="event · task_cancelled" alt={copy("The task cancellation event caused by synthetic seed data leaking into the read tools")} cap={copy("The audit cancellation, in the log.")}/>
    </div>
  </div></section>

  <section className="op-section" id="happened"><div className="shell">
    <p className="op-index">{copy("15 · What actually happened")}</p>
    <h2>{copy("What went wrong and what I changed.")}</h2>
    <div className="op-two"><div>
      <p className="op-lede">{copy("The company produced a usable interim report 33 minutes after launch and a final synthesis 70 seconds after the deadline. In between, it ran overnight without me. It also needed three emergency corrections, missed every observation checkpoint, spent tokens rewriting a report with no new evidence, and never had its run record formally closed.")}</p>
      <p className="op-mini">{copy("Failures, in order")}</p>
      <ul className="op-facts">{failures.map(f=><li key={f.t}><strong>{copy(f.t)}.</strong> {copy(f.d)}</li>)}</ul>
    </div><div>
      <p className="op-mini">{copy("The hard part")}</p>
      <p>{copy("Most of my mid-run fixes concerned verification: checking claims, recording events and keeping unsupported conclusions out of the interface. The agents could continue working, but I still needed a reliable way to tell whether their work was correct.")}</p>
      <p className="op-mini">{copy("Agent contract")}</p>
      <div className="op-contract" style={{gridTemplateColumns:"1fr",marginTop:8}}>{contract.map(([k,v])=><article key={k}><h3>{copy(k)}</h3><p>{copy(v)}</p></article>)}</div>
    </div></div>
  </div></section>

  <section className="op-section" id="architecture"><div className="shell">
    <p className="op-index">{copy("16 · Architecture")}</p>
    <h2>{copy("Objective to report, through seven layers.")}</h2>
    <div className="op-two"><div><ol className="op-layers">{layers.map(([k,v])=><li key={k}><span>{copy(k)}</span><div>{copy(v)}</div></li>)}</ol></div>
    <Shot src="article-architecture.jpg" w={2000} h={1067} path="figure · architecture" alt={copy("Architecture figure: founder, OpenClaw manager, Grok researcher, deterministic engine, verifier, PostgreSQL and the control room")} cap={copy("The company as a diagram.")}/></div>
  </div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("17 · Under the hood")}</p>
    <h2>{copy("Stack, by purpose.")}</h2>
    <dl className="op-stack">{stack.map(s=><div key={s.k}><dt>{copy(s.k)}</dt><dd>{copy(s.v)}</dd></div>)}</dl>
    <p className="op-caption">{copy("Configuration is entirely by environment variable; 33 names are read by the code (database URL, gateway URL and token, worker token, control token, caps, timers, cost estimates). Values are not published anywhere, including here.")}</p>
  </div></section>

  <section className="op-section" id="metrics"><div className="shell">
    <p className="op-index">{copy("18 · Metrics")}</p>
    <h2>{copy("The run, in verified numbers.")}</h2>
    <dl className="op-numbers">{numbers.map(n=><div key={n.l}><dt>{copy(n.n)}</dt><dd>{copy(n.l)}</dd></div>)}</dl>
    <table className="op-table"><thead><tr><th>{copy("Role")}</th><th>{copy("What it did in the official run")}</th><th>{copy("Class")}</th></tr></thead><tbody>{byAgent.map(([a,b,c])=><tr key={a}><th>{copy(a)}</th><td>{copy(b)}</td><td><span className="op-chip" data-s={c}>{copy(c)}</span></td></tr>)}</tbody></table>
    <p className="op-caption">{copy("Cost is an estimate: the gateway reported tokens but priced none of the 111 calls, so the ledger applies conservative Claude Sonnet 5 rates with a safety factor. Counts come from the run’s PostgreSQL record, queried on 28 August 2026.")}</p>
  </div></section>

  <section className="op-section" id="truth"><div className="shell">
    <p className="op-index">{copy("19 · Classification and truth table")}</p>
    <h2>{copy("What is built, demonstrated, agent-executed, human-assisted, experimental or absent.")}</h2>
    <table className="op-table"><tbody>{classes.map(([k,v])=><tr key={k}><th><span className="op-chip" data-s={k}>{copy(k)}</span></th><td>{copy(v)}</td></tr>)}</tbody></table>
    <table className="op-table" style={{marginTop:32}}><thead><tr><th>{copy("Layer")}</th><th>{copy("Status")}</th><th>{copy("Evidence")}</th></tr></thead><tbody>{truth.map(t=><tr key={t.layer}><th>{copy(t.layer)}</th><td><span className="op-chip" data-s={t.status}>{copy(t.status)}</span></td><td>{copy(t.d)}</td></tr>)}</tbody></table>
    <p className="op-caption">{copy("This page does not claim full autonomous operation. It claims one bounded run in which the reasoning loop ran without me for most of 24 hours, under caps, with every step recorded, and with a human required three times.")}</p>
  </div></section>

  <section className="op-section"><div className="shell"><div className="op-bigidea">
    <p className="op-index">{copy("20 · The idea")}</p>
    <h2>{copy("What I learned from the run.")}</h2>
    <p>{copy("This experiment made me spend more time on tool permissions, verification and event records than on prompts. Those choices affected what I could trust in the final report. I want to keep testing that with longer runs and fewer interventions.")}</p>
  </div></div></section>

  <section className="op-section"><div className="shell">
    <p className="op-index">{copy("21 · My role")}</p>
    <h2>{copy("Concept, architecture, orchestration, experiment design, evaluation.")}</h2>
    <div className="op-two"><div>
      <p>{copy("I defined the mission hierarchy and the epistemic classes, designed the decision contract and the invariants, wrote the orchestrator loop, the OpenClaw adapter, the task inbox, the verifier, the event schema and the four-view control room, ran the calibration and dry runs, launched and supervised the official run, wrote the three corrections while it was live, and wrote the article afterwards. The research itself was done by the agents; the market observations were captured by me.")}</p>
    </div><div>
      <p className="op-mini">{copy("Next")}</p>
      <ul className="op-facts"><li>{copy("Milestone 2: verify what happens after the click with founder-provided, attributable evidence, so ROI can move from UNKNOWN to a graded claim.")}</li><li>{copy("Automate the eyes: scheduled, policy-compliant observation so checkpoints stop depending on me.")}</li><li>{copy("Enable the semantic judge and report deterministic and semantic verdicts side by side.")}</li><li>{copy("Close the run properly: the record still says ACTIVE.")}</li></ul>
    </div></div>
  </div></section>

  <section className="op-close"><div className="shell"><p className="op-index">{copy("Next")}</p><h2>{copy("More projects.")}</h2><div className="actions"><WatchDemoButton className="button primary op-button">{copy("Watch the experiment again")}</WatchDemoButton><Link className="button op-button-ghost" href="/projects">{copy("All projects →")}</Link></div></div></section>
  </div>;
}
