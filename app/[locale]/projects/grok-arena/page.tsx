import {setRequestLocale} from "next-intl/server";
import {getCopy} from "@/i18n/server";
import {createPageMetadata} from "@/lib/seo";
import Image from "next/image";import {Link} from "@/i18n/navigation";import {MagicalBookDemo,WatchDemoButton} from "@/components/MagicalBookDemo";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; return createPageMetadata("/projects/grok-arena", {title: "Grok Arena", description: "Grok Arena: an experimental arena for autonomous AI agents. Four players, six system agents, one shared world, role-scoped MCP tools, a deterministic engine and a 3D control room. Evidence-led case study."}, locale); }
const M="/media/grok-arena";
const players=[
  {id:"Alpha",bias:"Aggressive and opportunistic",note:"Pressure the leader, take the opening. A starting bias, not a script."},
  {id:"Beta",bias:"Diplomatic, cooperative, defensive",note:"Looks for trades, alliances and protection. Cooperation is a strategy, not a rule."},
  {id:"Gamma",bias:"Exploratory and experimental",note:"Tries the underused move and tests new mechanics. Curious on purpose."},
  {id:"Delta",bias:"Adaptive",note:"Watches what is working, then counters it, copies it or breaks it."}
];
const system=[
  {id:"Atlas",role:"Game Director",sees:"Arena status, agent statuses, match state, rules, events, proposals, summaries, generation history",can:"start_match · close_match_phase · start_evolution_phase · wake plan",cannot:"Collect, attack, judge or propose a rule. Cannot pick a winner.",tools:14},
  {id:"Observer",role:"Behavior analysis",sees:"Match state, rules, recent events, public chat",can:"report_observation: name the pattern",cannot:"Play, propose or judge.",tools:6},
  {id:"Difficulty",role:"Balance metrics",sees:"Game telemetry: action diversity, predictability, leader advantage, repetition",can:"report_difficulty: rate challenge 0 to 10 and diagnose",cannot:"Design the fix. Provocateur owns intervention design.",tools:7},
  {id:"Provocateur",role:"Rule interventions",sees:"Reports, pending proposal, state and rules",can:"propose_intervention: the smallest temporary change from a whitelisted DSL",cannot:"Activate anything. Proposals go to the Judge.",tools:8},
  {id:"Judge",role:"Constitution check",sees:"Telemetry, reports, the constitution, the pending proposal, generation history",can:"judge_proposal: APPROVE or REJECT with a public reason",cannot:"Play, or rewrite a proposal into a pet mechanic.",tools:11},
  {id:"Evolution",role:"Generation analysis",sees:"Rules, match summary, generation history",can:"propose_evolution: at most one permanent mechanic per generation, after the match ends",cannot:"Bypass the Judge or read live match state.",tools:5}
];
const loop=["Arena exposes permitted state","Player agents decide","Decisions arrive through role-scoped tools","Actions are validated: schema, then rules","Arena resolves the turn in seeded order","State changes; animations resolve","Telemetry and events are emitted","System agents observe, report, propose, judge","Next turn begins"];
const tools={
  "Players (13)":["get_charter","get_match_state","get_rules","get_recent_events","choose_action","get_public_chat","post_public_message","propose_trade","accept_trade","reject_trade","propose_alliance","break_alliance","set_policy"],
  "System (reads + one write each)":["report_observation","get_game_telemetry","report_difficulty","get_reports","propose_intervention","get_constitution","get_pending_proposal","judge_proposal","get_match_summary","get_generation_history","propose_evolution"],
  "Atlas (director)":["get_arena_status","get_agent_statuses","get_wake_plan","start_match","close_match_phase","start_evolution_phase"]
};
const boundaries=[
  {t:"Authentication",d:"Every request to /api/mcp carries a per-bot credential derived from one master secret (HMAC-SHA256, constant-time compared). Unauthenticated calls are rejected before initialize."},
  {t:"Role isolation",d:"tools/list returns only the caller's role tools; tools/call re-checks. Any other tool returns UNAUTHORIZED and is written to the audit log."},
  {t:"Identity from the token",d:"choose_action rejects actorId or agentId arguments. A bot cannot claim to be another bot."},
  {t:"Whitelisted mechanics",d:"Rule changes are a 12-type DSL with hard numeric bounds. The model configures a mechanic; it never submits code."},
  {t:"Constitution",d:"Ten rules above every agent, served to the Judge. Rule 9: timeouts resolve as NO_ACTION; no agent may be impersonated or substituted."},
  {t:"Audit",d:"Every tool call is recorded with agent, tool, turn, accepted flag and latency, in a ring buffer surfaced in the LAB. No token ever appears in it."},
  {t:"Validation",d:"Decisions are validated on the server, in the xAI route and again on the client before the engine sanitises and executes them."},
  {t:"Secrets stay server-side",d:"The xAI key is read in one module with a browser guard; tests assert it never reaches the client bundle."}
];
const stack=[
  {k:"Experience",v:"Next.js 16.3 · React 19.2 · React Three Fiber 9 · drei 10 · three 0.185 · zustand 5 · Tailwind CSS 4"},
  {k:"Arena engine",v:"TypeScript game engine (2,035 lines): tick loop, seeded RNG, generic player attributes, 33 typed events, replay recorder"},
  {k:"Agent layer",v:"AgentProvider interface · MockAgentProvider · GrokAgentProvider · RoutingAgentProvider · charters per bot · Grok CLI orchestrator with persistent sessions"},
  {k:"Protocol",v:"Hand-written MCP server over JSON-RPC (streamable HTTP, optional SSE), 3 protocol versions, 30 role-scoped tools, in-memory mailbox with disk persistence"},
  {k:"Authentication",v:"HMAC-derived per-bot bearer tokens · OAuth 2 authorization code with PKCE S256, refresh and client-credentials grants, RFC 8414 / 9728 discovery · host key for the engine bridge"},
  {k:"AI",v:"xAI Responses API with a forced choose_action tool (default model grok-4-fast-non-reasoning) · named Grok Bots via MCP connectors · Grok CLI 1.0"},
  {k:"Testing",v:"Vitest 4: 13 files, 126 cases (125 passing, 1 opt-in live proof), node environment, no component tests"}
];
const timeline=[
  {t:"24 Aug · afternoon",d:"Next.js scaffold, then the 3D arena first: effects, environment, resource nodes, director."},
  {t:"24 Aug · evening",d:"Decision contract and validation, xAI provider with a forced choose_action tool, replay recorder, provider routing and the LAB panel; first tests."},
  {t:"24 Aug · night",d:"OAuth authorization server with PKCE and discovery metadata, built and tested in one session."},
  {t:"25 Aug · 00:15",d:"Grok CLI runner with persistent per-agent sessions; the connector guide."},
  {t:"25 Aug · 00:27 to 00:43",d:"Orchestrator written and run: seven of ten agents established sessions in the designed chain order (players, then Observer, Difficulty, Provocateur, Evolution, Judge)."},
  {t:"25 Aug · afternoon",d:"Per-bot connector plugins and marketplace manifests; ten Grok Bots connected through MCP, status visible in the LAB."},
  {t:"25 Aug · evening",d:"Recordings, screenshots and the article."},
  {t:"26 Aug",d:"Hardening pass: CLI fallback disarmed by default, secrets scrubbed from the example env, charters and engine refined, tests for honesty invariants."}
];
const numbers=[{n:"10",l:"agent roles"},{n:"4",l:"players"},{n:"6",l:"system agents"},{n:"30",l:"MCP tools"},{n:"20",l:"turns per match"},{n:"30 s",l:"decision window"},{n:"4",l:"decidable actions"},{n:"33",l:"event types"},{n:"12",l:"rule DSL types"},{n:"10",l:"constitution rules"},{n:"14",l:"API routes"},{n:"125",l:"passing tests"}];
const truth=[
  {layer:"Arena UI (3D + HUD)",status:"Demonstrated",d:"Runs locally; every state on this page was captured from it."},
  {layer:"Game engine",status:"Demonstrated",d:"Full matches resolve end to end in local mode; 125 tests."},
  {layer:"Player agents",status:"Demonstrated / Built",d:"Mock heuristics demonstrated; xAI function-calling path built and unit-tested, no captured live call; GROK_BOT submissions via MCP built."},
  {layer:"System agents",status:"Connected / Scripted",d:"Real MCP tool sets connected in GROK_BOT mode. In local mode the council storyline is scripted from a four-rule pool."},
  {layer:"MCP tools (30)",status:"Demonstrated",d:"All ten bots authenticated, listed their role tools and at least one executed get_match_state, as shown in the LAB."},
  {layer:"Authentication",status:"Demonstrated / Built",d:"Per-bot bearer tokens used in the live connections. OAuth with PKCE built and tested; no captured external token exchange."},
  {layer:"Grok Bot integration",status:"Experimental",d:"Ten named bots exist and connected; several reported the connector down or unreadable. The stable runtime became the Grok CLI orchestrator."},
  {layer:"Multi-agent live run",status:"Experimental",d:"Seven of ten agents ran the council chain on 25 Aug; a complete externally driven 20-turn match was not preserved."},
  {layer:"Replay / telemetry",status:"Built",d:"Recorder, audit log and telemetry exist in memory; the replay viewer is not shipped and no run log survives."},
  {layer:"Production deployment",status:"None",d:"Local only, exposed through a temporary tunnel during experiments."}
];
export default async function GrokArena({params}: {params: Promise<{locale: string}>}){
  const {locale} = await params; setRequestLocale(locale); const copy = getCopy(locale);
return <div className="ga-page">
  <section className="ga-hero" aria-labelledby="ga-title">
    <div className="shell">
      <Link className="ga-back" href="/projects">{copy("← All projects")}</Link>
      <p className="ga-eyebrow">{copy("Project 04 · Multi-Agent Systems · Grok Bot · MCP · AI Agents · Simulation · Experimental Interface")}</p>
      <h1 id="ga-title">{copy("Grok Arena")}</h1>
      <p className="ga-statement">{copy("Ten agents. One world. Different objectives.")}</p>
      <p className="ga-lede">{copy("Grok Arena is a multi-agent experiment that gives autonomous AI agents roles, constrained capabilities and a shared environment where their decisions can be observed as actions rather than hidden inside a conversation.")}</p>
      <dl className="ga-hero-stats"><div><dt>4</dt><dd>{copy("Players")}</dd></div><div><dt>6</dt><dd>{copy("System agents")}</dd></div><div><dt>1</dt><dd>{copy("Shared arena")}</dd></div></dl>
      <div className="actions"><WatchDemoButton className="button primary ga-button">{copy("Enter the Arena ↓")}</WatchDemoButton><a className="button ga-button-ghost" href={copy.href("#architecture")}>{copy("See the Architecture")}</a></div>
    </div>
    <div className="shell ga-hero-media"><figure className="ga-frame ga-frame-hero"><div className="ga-frame-bar"><span>{copy("GROK ARENA · control room")}</span><em>{copy("local run · mock agents · demo counters")}</em></div><Image src={`${M}/hero.jpg`} alt={copy("The Grok Arena control room: a 3D arena with four robots, floating HUDs, current rules, the pending-rule pipeline, system agent status, live event stream, player stats and difficulty chart.")} width={3436} height={1858} sizes="(max-width: 1240px) 100vw, 1184px" priority/></figure><p className="ga-caption">{copy("The game is the observable environment. The experiment is the agent architecture around it.")}</p></div>
  </section>

  <section className="ga-section" aria-labelledby="ga-q-title">
    <div className="shell">
      <p className="ga-index">{copy("01 · The question")}</p>
      <h2 id="ga-q-title">{copy("From chatbot to actor")}</h2>
      <p className="ga-lede">{copy("What happens when AI agents don’t just answer, but act?")}</p>
      <div className="ga-compare">
        <div className="ga-chain-col"><h3>{copy("Chat AI")}</h3><ol><li>{copy("User asks")}</li><li>{copy("Model responds")}</li><li>{copy("Conversation continues")}</li></ol></div>
        <div className="ga-chain-col ga-chain-arena"><h3>{copy("Agent arena")}</h3><ol><li>{copy("World state")}</li><li>{copy("Agent perceives")}</li><li>{copy("Agent chooses an action")}</li><li>{copy("Tool executes")}</li><li>{copy("World changes")}</li><li>{copy("Other agents react")}</li></ol></div>
      </div>
      <p className="ga-pull">{copy("The interface shows how each agent’s decisions change the world.")}</p>
    </div>
  </section>

  <section className="ga-section ga-cast" aria-labelledby="ga-cast-title">
    <div className="shell">
      <p className="ga-index">{copy("02 · The cast")}</p>
      <h2 id="ga-cast-title">{copy("The ten agent roles.")}</h2>
      <div className="ga-cast-grid">
        <div><p className="ga-mini">{copy("Player agents")}</p><div className="ga-players">{players.map(p=><article key={p.id} data-id={p.id.toLowerCase()}><h3>{copy(p.id)}</h3><p className="ga-bias">{copy(p.bias)}</p><p>{copy(p.note)}</p></article>)}</div><p className="ga-caption">{copy("Starting biases from each agent’s charter, served to the bot on connect. They are biases, not scripts: the charter tells every player the bias is a starting point and the world may change.")}</p></div>
        <figure className="ga-frame ga-roster"><div className="ga-frame-bar"><span>{copy("AI AGENTS · roster")}</span></div><Image src={`${M}/roster.jpg`} alt={copy("The arena roster: Atlas as director, Alpha, Beta, Gamma and Delta as players, and Observer, Difficulty, Provocateur, Judge and Evolution as system agents.")} width={400} height={960} sizes="(max-width: 900px) 60vw, 300px" loading="lazy"/></figure>
      </div>
      <p className="ga-mini">{copy("System agents")}</p>
      <div className="ga-system">{system.map(s=><article key={s.id}><header><h3>{copy(s.id)}</h3><span>{copy(s.role)} · {copy(s.tools)} {copy(" tools")}</span></header><dl><div><dt>{copy("Sees")}</dt><dd>{copy(s.sees)}</dd></div><div><dt>{copy("Can do")}</dt><dd>{copy(s.can)}</dd></div><div><dt>{copy("Cannot do")}</dt><dd>{copy(s.cannot)}</dd></div></dl></article>)}</div>
    </div>
  </section>

  <section className="ga-section ga-topology" aria-labelledby="ga-topo-title">
    <div className="shell">
      <p className="ga-index">{copy("03 · Topology")}</p>
      <h2 id="ga-topo-title">{copy("How agents access the arena.")}</h2>
      <div className="ga-topo" role="img" aria-label={copy("Diagram: the arena world at the centre; the four player agents around it, each connected through role-scoped tools; an outer control layer of Observer, Difficulty, Provocateur, Judge, Evolution and Atlas that receives events and telemetry and returns rules, interventions and evaluations.")}>
        <div className="ga-topo-outer">{["Observer","Difficulty","Provocateur","Judge","Evolution","Atlas"].map(n=><span key={n} className="ga-topo-sys">{copy(n)}</span>)}</div>
        <div className="ga-topo-inner">{["Alpha","Beta","Gamma","Delta"].map(n=><span key={n} className="ga-topo-player" data-id={n.toLowerCase()}>{copy(n)}</span>)}<div className="ga-topo-core"><strong>{copy("Arena world")}</strong><small>{copy("state · rules · events")}</small></div></div>
      </div>
      <ol className="ga-flow"><li>{copy("Agents")}</li><li>{copy("Role-scoped tools")}</li><li>{copy("Arena state")}</li><li>{copy("Events / telemetry")}</li><li>{copy("System agents")}</li><li>{copy("Rules / interventions / evaluation")}</li></ol>
    </div>
  </section>

  <section className="ga-section ga-loop" aria-labelledby="ga-loop-title">
    <div className="shell ga-two">
      <div><p className="ga-index">{copy("04 · The arena loop")}</p><h2 id="ga-loop-title">{copy("One turn at a time.")}</h2><p className="ga-lede">{copy("In GROK_BOT mode a match is 20 discrete decision turns. Each turn opens a decision window of 30 seconds by default (configurable between 3 and 120 seconds) and resolves early the moment all four players have submitted.")}</p><ul className="ga-facts"><li><strong>{copy("Simultaneous submissions.")}</strong> {copy(" No bot, and no system agent, sees another player’s action until the turn locks.")}</li><li><strong>{copy("Seeded resolution order.")}</strong> {copy(" Actions execute in a seeded shuffle, so Alpha is never first-mover by slot.")}</li><li><strong>{copy("Honest timeouts.")}</strong> {copy(" A silent bot resolves as NO_ACTION and the arena shows TIMEOUT. There is no mock substitute in this mode.")}</li><li><strong>{copy("No burned turns.")}</strong> {copy(" If nobody submits, the turn is extended rather than wasted.")}</li><li><strong>{copy("Idempotent retries.")}</strong> {copy(" One accepted action per player per turn, keyed by match and turn id.")}</li></ul></div>
        <div className="ga-turn"><p className="ga-turn-head"><span>{copy("TURN 01 / 20")}</span><span>{copy("window 30 s")}</span></p><ol>{loop.map((l,i)=><li key={l}><span>{copy(String(i+1).padStart(2,"0"))}</span>{copy(l)}</li>)}</ol></div>
    </div>
  </section>

  <section className="ga-section ga-actions" aria-labelledby="ga-act-title">
    <div className="shell">
      <p className="ga-index">{copy("05 · The action system")}</p>
      <h2 id="ga-act-title">{copy("Four things a player can do.")}</h2>
      <div className="ga-two ga-two-wide">
        <div><div className="ga-actionlist">{[["COLLECT","+3 resources · −2 energy"],["ATTACK","−5 energy · steal 3 on success · needs a target"],["DEFEND","−2 energy · 50% damage reduction, held 7 s"],["TRADE","exchange resources · target and amount"]].map(([a,d])=><div key={a}><code>{a}</code><span>{copy(d)}</span></div>)}</div><p className="ga-caption">{copy("IDLE exists in the engine but cannot be chosen by an agent. Diplomacy (public messages, trade offers, alliances, standing policies) travels through separate tools and never changes the ledger by itself.")}</p>
        <pre className="ga-code" aria-label="PlayerDecision fields">{`PlayerDecision
  action        COLLECT | ATTACK | DEFEND | TRADE
  target        player id | null
  amount        integer | null
  publicReason  string, max 140 chars
+ matchId, turnId (MCP)`}</pre></div>
        <div className="ga-decision" role="img" aria-label={copy("Example decision flow for agent Beta: perception, decision DEFEND, arena validation allowed, consequence defense state applied.")}>
          <p className="ga-mini">{copy("Example · agent Beta")}</p>
          <div className="ga-dstep"><span>{copy("Perception")}</span><ul><li>{copy("Nearby resource cube")}</li><li>{copy("Alpha approaching")}</li><li>{copy("Energy 84, no shield")}</li></ul></div>
          <i aria-hidden="true">↓</i>
          <div className="ga-dstep ga-dstep-decision"><span>{copy("Decision")}</span><code>DEFEND · “Holographic shield up”</code></div>
          <i aria-hidden="true">↓</i>
          <div className="ga-dstep"><span>{copy("Arena validation")}</span><ul><li>{copy("Schema: action known, no target, no amount ✓")}</li><li>{copy("Rules: energy above floor ✓")}</li></ul></div>
          <i aria-hidden="true">↓</i>
          <div className="ga-dstep"><span>{copy("World consequence")}</span><ul><li>{copy("defending = true for 7 s")}</li><li>{copy("PLAYER_DEFEND event → shield animation")}</li><li>{copy("energy −2 when the animation resolves")}</li></ul></div>
        </div>
      </div>
    </div>
  </section>

  <section className="ga-section ga-grok" aria-labelledby="ga-grok-title">
    <div className="shell">
      <p className="ga-index">{copy("06 · Grok Bot")}</p>
      <h2 id="ga-grok-title">{copy("Giving the agents somewhere to act")}</h2>
      <p className="ga-lede">{copy("The project was designed around named, persistent Grok Bots, one per arena role, rather than one model instance pretending to be every actor. Each bot has an identity, a charter and a limited capability set.")}</p>
      <ol className="ga-flow ga-flow-vertical"><li>{copy("Grok Bot")}</li><li>{copy("Authenticated connector (MCP over HTTP)")}</li><li>{copy("Role-scoped arena tools")}</li><li>{copy("Structured decision")}</li><li>{copy("Arena engine")}</li></ol>
      <div className="ga-evidence">
        <figure className="ga-frame"><div className="ga-frame-bar"><span>{copy("LAB · GROK BOT CONNECTIONS")}</span><em>{copy("25 Aug 2026")}</em></div><Image src={`${M}/evidence-connections.jpg`} alt={copy("Grok Bot connections panel: Atlas, Alpha, Beta, Gamma, Delta, Observer, Difficulty, Provocateur, Judge and Evolution all CONNECTED, with role, tool count (14, 13, 13, 13, 13, 6, 7, 8, 11, 5) and last activity such as tools/list, get_match_state or sse.")} width={1180} height={430} sizes="(max-width: 900px) 100vw, 600px" loading="lazy"/><figcaption>{copy("All ten bots authenticated and listed their role tools; Beta executed get_match_state. Tool counts match the code exactly.")}</figcaption></figure>
        <figure className="ga-frame"><div className="ga-frame-bar"><span>{copy("Grok · named bots")}</span></div><Image src={`${M}/evidence-grok-bots.jpg`} alt={copy("The Grok app's bot list: Delta, Atlas, Observer, Gamma, Beta, Judge, Alpha, Difficulty, Provocateur and Evolution, each with a role tag and a last message such as 'Arena connector is down' or 'Arena tools are listed, but'.")} width={540} height={1240} sizes="(max-width: 900px) 60vw, 300px" loading="lazy"/><figcaption>{copy("Ten named bots with role tags. Their last messages are the honest part: connectors reached the bots, and several reported the connector down or unreadable.")}</figcaption></figure>
        <figure className="ga-frame"><div className="ga-frame-bar"><span>{copy("Grok · MCP servers")}</span></div><Image src={`${M}/evidence-mcp-servers.jpg`} alt={copy("MCP servers panel in the Grok app listing GROK ARENA Observer, Difficulty, Provocateur, Alpha and Evolution connectors, each enabled.")} width={700} height={560} sizes="(max-width: 900px) 100vw, 400px" loading="lazy"/><figcaption>{copy("One MCP connector per bot, registered as separate servers.")}</figcaption></figure>
        <figure className="ga-frame"><div className="ga-frame-bar"><span>{copy("Lobby · GROK_BOT mode")}</span></div><Image src={`${M}/evidence-lobby-grokbot.jpg`} alt={copy("Arena lobby in GROK_BOT mode: TURN 01 of 20 ready, difficulty UNREPORTED, BOTS 10 of 10, Generation 12 Match 47, 4 players, 5 rules, 1 world, BEGIN.")} width={2400} height={1100} sizes="(max-width: 900px) 100vw, 600px" loading="lazy"/><figcaption>{copy("Turn-based HUD with ten bots reported present. Generation and match counters are seeded demo values, not experiment results.")}</figcaption></figure>
      </div>
      <div className="ga-paths"><article><h3>{copy("Path A · OAuth custom connectors")}</h3><p>{copy("Ten OAuth clients, one per bot, with PKCE, discovery metadata and stateless signed tokens. Built and unit-tested. The desktop Grok Bot chat did not expose the arena tools reliably, so this path stayed experimental.")}</p></article><article><h3>{copy("Path B · Grok CLI orchestrator")}</h3><p>{copy("The Next.js server wakes each agent as a headless Grok CLI process in its own isolated workspace, allow-listed to that bot’s MCP server, with one resumable session per agent so memory persists across turns and generations. This is the runtime that actually ran.")}</p></article></div>
    </div>
  </section>

  <section className="ga-section ga-status" aria-labelledby="ga-status-title">
    <div className="shell">
      <p className="ga-index">{copy("07 · Connection status")}</p>
      <h2 id="ga-status-title">{copy("What was built, what connected, what ran.")}</h2>
      <div className="ga-status-grid">
        <div><h3>{copy("Built")}</h3><p>{copy("Engine, 30-tool MCP server, per-bot auth, OAuth with PKCE, ten charters, orchestrator with persistent sessions, connector plugins, 3D control room, replay recorder, 125 tests.")}</p></div>
        <div><h3>{copy("Connected")}</h3><p>{copy("All ten Grok Bots reached /api/mcp with their own credential, completed initialize and tools/list; at least one player executed a real read. Ten Grok CLI workspaces were provisioned.")}</p></div>
        <div><h3>{copy("Demonstrated")}</h3><p>{copy("Full matches in local mode, including the rule pipeline and the evolution council. A seven-agent orchestrated run executed the council chain in the designed order on 25 August 2026.")}</p></div>
        <div><h3>{copy("Experimental / unresolved")}</h3><p>{copy("A complete 20-turn match driven entirely by external Grok agents was not preserved. Alpha, Beta and Atlas did not establish CLI sessions in that run. No OAuth exchange from a Grok connector was captured. No run log survives on disk.")}</p></div>
      </div>
    </div>
  </section>

  <section className="ga-section ga-mcp" aria-labelledby="ga-mcp-title">
    <div className="shell">
      <p className="ga-index">{copy("08 · Model Context Protocol")}</p>
      <h2 id="ga-mcp-title">{copy("Permissions for each role.")}<br/><span>{copy("They get tools.")}</span></h2>
      <p className="ga-lede">{copy("The arena exposes a hand-written MCP server: JSON-RPC over streamable HTTP, three protocol versions, no SDK. Thirty tools exist; a bot sees only the ones its role allows.")}</p>
      <div className="ga-tools">{Object.entries(tools).map(([g,list])=><div key={g}><h3>{copy(g)}</h3><ul>{list.map(t=><li key={t}><code>{t}</code></li>)}</ul></div>)}</div>
      <div className="ga-toolcounts">{[["Atlas",14],["Alpha",13],["Beta",13],["Gamma",13],["Delta",13],["Judge",11],["Provocateur",8],["Difficulty",7],["Observer",6],["Evolution",5]].map(([n,c])=><div key={String(n)}><strong>{copy(c)}</strong><span>{copy(n)}</span></div>)}</div>
      <p className="ga-pull">{copy("Capability is explicit. An agent does not receive access because it is intelligent. Its role determines what it can call.")}</p>
    </div>
  </section>

  <section className="ga-section ga-bounds" aria-labelledby="ga-b-title">
    <div className="shell">
      <p className="ga-index">{copy("09 · Boundaries")}</p>
      <h2 id="ga-b-title">{copy("Limits on agent actions.")}</h2>
      <div className="ga-bgrid">{boundaries.map(b=><article key={b.t}><h3>{copy(b.t)}</h3><p>{copy(b.d)}</p></article>)}</div>
    </div>
  </section>

  <section className="ga-section ga-engine" id="engine" aria-labelledby="ga-e-title">
    <div className="shell ga-two ga-two-wide">
      <div><p className="ga-index">{copy("10 · Game engine")}</p><h2 id="ga-e-title">{copy("How the engine resolves decisions.")}</h2><p className="ga-lede">{copy("Model output never mutates the world. It becomes a structured decision that passes schema validation, rule validation and a final sanitisation before a deterministic engine resolves it and emits events.")}</p><ol className="ga-flow ga-flow-vertical"><li>{copy("AI decision")}</li><li>{copy("Schema validation")}</li><li>{copy("Rule validation")}</li><li>{copy("Arena engine")}</li><li>{copy("State mutation")}</li><li>{copy("Telemetry")}</li></ol></div>
      <div><p className="ga-mini">{copy("What the engine owns")}</p><ul className="ga-facts"><li><strong>{copy("World.")}</strong> {copy(" Continuous 2D positions, four home slots, resource nodes (cube, crystal) that respawn.")}</li><li><strong>{copy("Players.")}</strong> {copy(" Generic attributes: energy (max 100), resources, score, plus anything a rule adds. Defence is a timed state.")}</li><li><strong>{copy("Rules.")}</strong> {copy(" Five core rules; evolved rules stack on top as bounded modifiers.")}</li><li><strong>{copy("Turns.")}</strong> {copy(" Turn state, deadlines, early resolution, seeded order, timeouts.")}</li><li><strong>{copy("Outcomes.")}</strong> {copy(" Highest score wins; VICTORY and DEFEAT states; a match summary records rules, turns and windows.")}</li><li><strong>{copy("Generations.")}</strong> {copy(" Match end opens the evolution phase; approved permanent mechanics carry into the next generation.")}</li><li><strong>{copy("Events.")}</strong> {copy(" 33 typed events drive the renderer; stats change only when the animation resolves.")}</li></ul></div>
    </div>
  </section>

  <section className="ga-section ga-world" id="arena" aria-labelledby="ga-w-title">
    <div className="shell">
      <p className="ga-index">{copy("11 · The 3D world")}</p>
      <h2 id="ga-w-title">{copy("The arena makes agent behaviour visible.")}</h2>
      <p className="ga-lede">{copy("Recorded from the arena running locally with mock agents. Every animation you see is an engine event being played back by the renderer.")}</p>
      <MagicalBookDemo src={`${M}/demo.mp4`} poster={`${M}/demo-poster.jpg`} label={copy("Thirty-second recording of a Grok Arena match: four robots collect, attack, defend and trade while HUDs, the event stream and the difficulty chart update.")}/>
      <div className="ga-annot"><div><strong>{copy("Agents")}</strong><span>{copy("Robot avatars with per-status animation: moving, thinking, collecting, attacking, defending, hit, victory, offline.")}</span></div><div><strong>{copy("Resources")}</strong><span>{copy("Cube and crystal nodes that spawn and respawn.")}</span></div><div><strong>{copy("Arena core")}</strong><span>{copy("Rings, hexes and fog; shockwave on a world mutation.")}</span></div><div><strong>{copy("HUD")}</strong><span>{copy("Floating labels with energy and resources; scoreboard of every public attribute.")}</span></div><div><strong>{copy("Turn state")}</strong><span>{copy("Turn tracker and decision window in GROK_BOT mode; clock in local mode.")}</span></div><div><strong>{copy("Telemetry")}</strong><span>{copy("Live event stream, difficulty analysis chart, evolution timeline.")}</span></div></div>
      <div className="ga-shots">
        <figure className="ga-frame"><div className="ga-frame-bar"><span>{copy("Match end")}</span><em>{copy("local run")}</em></div><Image src={`${M}/victory.jpg`} alt={copy("Match complete: Alpha in VICTORY state with score 54 while Delta and Gamma are OFFLINE, the camera focused on the winner.")} width={2128} height={1280} sizes="(max-width: 900px) 100vw, 580px" loading="lazy"/></figure>
        <figure className="ga-frame"><div className="ga-frame-bar"><span>{copy("Evolution council")}</span><em>{copy("local run, scripted council")}</em></div><Image src={`${M}/council.jpg`} alt={copy("Evolution Council overlay: generation sealed, champion Alpha, reports from Evolution, Observer, Difficulty and Provocateur, and a Begin Next Generation button.")} width={1120} height={880} sizes="(max-width: 900px) 100vw, 580px" loading="lazy"/></figure>
      </div>
    </div>
  </section>

  <section className="ga-section ga-obs" aria-labelledby="ga-o-title">
    <div className="shell">
      <p className="ga-index">{copy("12 · Observability")}</p>
      <h2 id="ga-o-title">{copy("Tracing changes back to agent actions.")}</h2>
      <p className="ga-lede">{copy("Nothing on this page shows a model’s hidden reasoning. What the arena records is what an observer can legitimately see: chosen actions with a public reason, turn events, state transitions, tool calls, validation outcomes, interventions, scores and timeouts.")}</p>
      <div className="ga-obs-grid">
        <figure className="ga-frame"><div className="ga-frame-bar"><span>{copy("Live event stream · player stats · difficulty analysis")}</span></div><Image src={`${M}/bottom-row.jpg`} alt={copy("Bottom row of the control room: live event stream with actions such as Beta collect and Alpha attack Gamma, player stats with score, energy and resources per robot, and the difficulty analysis chart.")} width={2112} height={340} sizes="100vw" loading="lazy"/></figure>
        <ul className="ga-facts"><li><strong>{copy("Event log.")}</strong> {copy(" 33 typed events on a pub/sub bus; the feed keeps the last 60.")}</li><li><strong>{copy("Telemetry.")}</strong> {copy(" Twelve computed fields: action distribution, attack usage, predictability, action diversity, score spread, leader advantage, resource distribution, difficulty history, repetition, resource and alliance concentration, adaptation rate. Served to Difficulty and Judge.")}</li><li><strong>{copy("Audit trail.")}</strong> {copy(" Every MCP call with agent, tool, turn, accepted flag and latency (500 in memory, 200 persisted), surfaced in the LAB.")}</li><li><strong>{copy("Replay recorder.")}</strong> {copy(" Captures validated engine events (cap 5,000) and can re-emit them at any speed without touching the engine or any provider. The viewer is not shipped.")}</li><li><strong>{copy("Honest gap.")}</strong> {copy(" Logs go to stdout and no run log from the live experiments was preserved.")}</li></ul>
      </div>
      <p className="ga-pull">{copy("The arena records agent actions so I can study what happened.")}</p>
    </div>
  </section>

  <section className="ga-section ga-provoke" aria-labelledby="ga-p-title">
    <div className="shell ga-two ga-two-wide">
      <div><p className="ga-index">{copy("13 · Provocation")}</p><h2 id="ga-p-title">{copy("What if the environment changes while agents are adapting?")}</h2><p className="ga-lede">{copy("One system role can introduce bounded interventions. The Provocateur proposes the smallest temporary change from a whitelisted DSL; the Judge approves or rejects it; the engine activates it through the world-mutation flow.")}</p><ol className="ga-flow ga-flow-vertical"><li>{copy("Stable environment")}</li><li>{copy("Agents form strategies")}</li><li>{copy("Difficulty flags a problem")}</li><li>{copy("Bounded intervention proposed")}</li><li>{copy("Judge evaluates against the constitution")}</li><li>{copy("Agents must adapt")}</li></ol><div className="ga-dsl"><p className="ga-mini">{copy("Documented DSL examples")}</p><code>ACTION_COST_MODIFIER · action ATTACK · delta +3 · consecutiveOnly</code><code>RESOURCE_REWARD_MODIFIER · delta +1</code><code>DEFENSE_MODIFIER · blockedStealDelta −1 · energyRefund 2</code><code>RESOURCE_SPAWN_MODIFIER · capDelta +2 · intervalDelta −2</code></div><p className="ga-caption">{copy("Twelve effect types with hard numeric bounds. In local mode the pipeline is scripted from a pool of four interventions (Combat Fatigue, Greed Tax, Shield Surge, Overcharge); in GROK_BOT mode the same handlers accept proposals from the bots.")}</p></div>
      <div className="ga-shots-col"><figure className="ga-frame"><div className="ga-frame-bar"><span>{copy("Pending rule")}</span><em>{copy("local run")}</em></div><Image src={`${M}/pending-rule.jpg`} alt={copy("Pending rule panel: the Difficulty to Provocateur to Judge to Atlas to World pipeline with Judge evaluating, and the proposal Combat Fatigue by Provocateur: consecutive attacks cost +3 extra energy.")} width={640} height={560} sizes="(max-width: 900px) 100vw, 420px" loading="lazy"/></figure><figure className="ga-frame"><div className="ga-frame-bar"><span>{copy("After the mutation")}</span><em>{copy("local run")}</em></div><Image src={`${M}/arena-mutated.jpg`} alt={copy("The arena with Combat Fatigue active in the evolved rules and robots defending and trading.")} width={2128} height={1280} sizes="(max-width: 900px) 100vw, 520px" loading="lazy"/></figure></div>
    </div>
  </section>

  <section className="ga-section ga-judge" aria-labelledby="ga-j-title">
    <div className="shell ga-two ga-two-wide">
      <div><p className="ga-index">{copy("14 · Judge and constitution")}</p><h2 id="ga-j-title">{copy("Rules above agents.")}</h2><ol className="ga-flow ga-flow-vertical"><li>{copy("Constitution (10 rules)")}</li><li>{copy("Judge")}</li><li>{copy("APPROVE or REJECT with a public reason")}</li><li>{copy("Arena")}</li></ol><p>{copy("Approval requires legality, fairness and playability to pass. The Judge cannot play and cannot rewrite a proposal. Rule 9: timeouts resolve as NO_ACTION; no agent may be impersonated or substituted. Rule 10: all agent activity must be auditable and publicly explainable.")}</p></div>
      <div><p className="ga-index">{copy("15 · Evolution")}</p><h2>{copy("From one match to the next.")}</h2><p>{copy("After MATCH_ENDED, Evolution may propose at most one permanent mechanic for the next generation, from the same DSL, and the Judge still has to say yes. Approved mechanics are baked into the next generation; each match summary records its rules, turns and windows so generations stay comparable. Player memory persists through the CLI sessions, one per agent per experiment.")}</p><p className="ga-caption">{copy("Status: the evolution tools and generation history are implemented; the “Evolution Council” overlay in local mode is scripted. No bot-authored permanent mechanic from a completed external generation is on record.")}</p></div>
    </div>
  </section>

  <section className="ga-section ga-arch" id="architecture" aria-labelledby="ga-a-title">
    <div className="shell">
      <p className="ga-index">{copy("16 · Architecture")}</p>
      <h2 id="ga-a-title">{copy("Five layers, from pixels to Grok.")}</h2>
      <ol className="ga-layers">
        <li><span>{copy("Experience")}</span><div>{copy("Next.js 16 / React 19 · React Three Fiber arena · Arena Director · HUD panels · LAB (ADMIN) · zustand store")}</div><small>{copy("The UI contains no game decision logic; only the engine writes gameplay state.")}</small></li>
        <li><span>{copy("Engine")}</span><div>{copy("GameEngine · turn manager · rule resolver and DSL · decision validator · seeded RNG · event bus · replay recorder · telemetry")}</div></li>
        <li><span>{copy("Agent routing")}</span><div>{copy("AgentProvider · MockAgentProvider · GrokAgentProvider · RoutingAgentProvider · charters · ArenaOrchestrator and GrokCliRunner")}</div></li>
        <li><span>{copy("MCP bridge")}</span><div>{copy("/api/mcp JSON-RPC · 30 role-scoped tools · auth and OAuth · audit · constitution · mailbox · /api/bridge sync with the engine")}</div></li>
        <li><span>{copy("Grok layer")}</span><div>{copy("Ten named Grok Bots via MCP connectors · Grok CLI sessions · xAI Responses API (DIRECT_XAI)")}</div></li>
      </ol>
      <div className="ga-modes"><h3>{copy("Experiment modes")}</h3><div><article><code>MOCK</code><p>{copy("Default. All agents simulated locally; the council storyline is scripted.")}</p></article><article><code>DIRECT_XAI</code><p>{copy("Players may call the xAI API directly with a forced choose_action tool; one retry, then a mock fallback for that single decision. Default selection: Alpha only.")}</p></article><article><code>GROK_BOT</code><p>{copy("Ten real bots via MCP. Providers are disabled; decisions arrive through the bridge; no fallback of any kind.")}</p></article></div></div>
      <div className="ga-oauth"><h3>{copy("OAuth and connectors")}</h3><ul className="ga-facts"><li><strong>{copy("Separate identities.")}</strong> {copy(" One confidential client per bot; a token can only ever map to the bot baked into the client that obtained it.")}</li><li><strong>{copy("Authorization code with PKCE (S256)")}</strong>{copy(", refresh tokens and client credentials; discovery at the standard well-known endpoints; a single scope, arena.")}</li><li><strong>{copy("Stateless tokens.")}</strong> {copy(" Signed with HMAC, 30-day access and 180-day refresh, so they survive restarts; codes are single-use and short-lived.")}</li><li><strong>{copy("Machine-to-machine.")}</strong> {copy(" The authorize step auto-approves because there is no user account model; the code alone is useless without the bot’s client secret.")}</li><li><strong>{copy("Not built.")}</strong> {copy(" No dynamic client registration; no callback route of its own.")}</li></ul></div>
    </div>
  </section>

  <section className="ga-section ga-dev" aria-labelledby="ga-d-title">
    <div className="shell ga-two ga-two-wide">
      <div><p className="ga-index">{copy("17 · Development")}</p><h2 id="ga-d-title">{copy("What I learned while building the arena.")}</h2><ol className="ga-timeline">{timeline.map(t=><li key={t.t}><time>{copy(t.t)}</time><p>{copy(t.d)}</p></li>)}</ol><p className="ga-caption">{copy("Reconstructed from file history: the repository holds one scaffold commit and everything else uncommitted, so the order comes from timestamps, session markers and documents, not from git.")}</p></div>
      <div><p className="ga-index">{copy("18 · Engineering")}</p><dl className="ga-numbers">{numbers.map(n=><div key={n.l}><dt>{copy(n.n)}</dt><dd>{copy(n.l)}</dd></div>)}</dl><dl className="ga-stack">{stack.map(s=><div key={s.k}><dt>{copy(s.k)}</dt><dd>{copy(s.v)}</dd></div>)}</dl></div>
    </div>
  </section>

  <section className="ga-section ga-role" aria-labelledby="ga-r-title">
    <div className="shell ga-two ga-two-wide">
      <aside><p className="ga-index">{copy("My role")}</p><h2 id="ga-r-title" className="ga-role-title">{copy("Concept · Multi-Agent Architecture · AI Engineering · Product · Interaction Design")}</h2><ul className="ga-facts"><li>{copy("Arena concept and the four-plus-six role design")}</li><li>{copy("Action architecture: structured decisions, validation layers, honest timeouts")}</li><li>{copy("System-agent design: observe, measure, provoke, judge, evolve, direct")}</li><li>{copy("MCP and tool architecture with role scoping, audit and constitution")}</li><li>{copy("Grok Bot integration: per-bot credentials, OAuth, connector plugins, CLI orchestrator")}</li><li>{copy("Game rules, engine and 3D control room")}</li><li>{copy("Iterative testing of the honesty invariants")}</li></ul></aside>
      <div className="ga-bigidea"><p className="ga-index">{copy("The big idea")}</p><h2>{copy("What I want to test next.")}</h2><p>{copy("I wanted to see which tools agents actually used, whether they respected permissions and how their decisions affected one another.")}</p></div>
    </div>
  </section>

  <section className="ga-section ga-truth" aria-labelledby="ga-t-title">
    <div className="shell">
      <p className="ga-index">{copy("Truth table")}</p>
      <h2 id="ga-t-title">{copy("Layer by layer.")}</h2>
      <table className="ga-table"><thead><tr><th>{copy("Layer")}</th><th>{copy("Status")}</th><th>{copy("Evidence")}</th></tr></thead><tbody>{truth.map(t=><tr key={t.layer}><th scope="row">{copy(t.layer)}</th><td data-s={t.status.split(" ")[0]}>{copy(t.status)}</td><td>{copy(t.d)}</td></tr>)}</tbody></table>
      <p className="ga-caption">{copy("BUILT: exists and works locally. CONNECTED: communicated with the external Grok system. DEMONSTRATED: run end to end and observed. EXPERIMENTAL: partial, scaffolded or unstable. All credentials, secrets and tunnel addresses were excluded from this page and its media.")}</p>
    </div>
  </section>

  <section className="ga-close"><div className="shell"><p className="ga-index">{copy("Next")}</p><h2>{copy("More projects.")}</h2><div className="actions"><WatchDemoButton className="button primary ga-button">{copy("Watch the arena again")}</WatchDemoButton><Link className="button ga-button-ghost" href="/projects">{copy("All projects →")}</Link></div></div></section>
</div>}
