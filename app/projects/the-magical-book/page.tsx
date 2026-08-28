import Image from "next/image";import Link from "next/link";import {MagicalBookDemo,WatchDemoButton} from "@/components/MagicalBookDemo";import {magicalBookHeroBlur} from "@/content/projects/magicalBookBlur";
export const metadata={title:"The Magical Book",description:"ChronoAtlas: an interactive magical book that turns history into an explorable experience across ten ancient civilizations. Generative video, cursor-aware interaction and a 23-state web experience."};
const M="/media/magical-book";
const worlds=[
  {id:"carthage",name:"Carthage",period:"c. 9th to 2nd century BCE",tagline:"Masters of the Mediterranean."},
  {id:"ancient-rome",name:"Ancient Rome",period:"c. 8th century BCE to 5th century CE",tagline:"Walk through the Eternal City."},
  {id:"ancient-egypt",name:"Ancient Egypt",period:"c. 3100 to 30 BCE",tagline:"Follow the river into eternity."},
  {id:"ancient-greece",name:"Ancient Greece",period:"c. 8th to 2nd century BCE",tagline:"Where ideas entered public life."},
  {id:"babylon",name:"Babylon",period:"c. 19th to 6th century BCE",tagline:"Enter the city behind the blue gate."},
  {id:"imperial-china",name:"Ancient China",period:"221 BCE to 1912 CE",tagline:"Beyond the gate lies an empire of many eras."},
  {id:"feudal-japan",name:"Ancient Japan",period:"c. 12th to 19th century CE",tagline:"Follow the path beneath the falling petals."},
  {id:"maurya",name:"Maurya India",period:"c. 322 to 185 BCE",tagline:"An empire connected by roads, messages and rule."},
  {id:"maya",name:"Maya civilization",period:"c. 250 to 900 CE",tagline:"A city rises from the rainforest."},
  {id:"viking-age",name:"Viking world",period:"c. 793 to 1066 CE",tagline:"Sail beyond the edge of the known map."}
];
const sequence=[
  {n:"01",title:"Discover the book",text:"A closed book on a dark stage. Nothing asks for a click; the page waits for you to move closer."},
  {n:"02",title:"The guide reacts to you",text:"Pointer position drives the guide’s pose and the book's attention before anything is pressed."},
  {n:"03",title:"Open the book",text:"One deliberate click. The cover lifts and light spills from the pages."},
  {n:"04",title:"Reveal the civilization portals",text:"Ten destinations emerge as a constellation of portals, not a grid of cards."},
  {n:"05",title:"Choose a world",text:"Selection is explicit. Focusing a portal previews it; only a second act commits to the journey."},
  {n:"06",title:"Enter through a cinematic transition",text:"The guide launches from the portal’s real screen position; the route changes only once the screen is covered."},
  {n:"07",title:"Explore environmental discoveries",text:"Golden rings surface from proximity and chapter time. A look-around never fires a discovery by accident."},
  {n:"08",title:"Build your chronicle",text:"Text is the second reward: a quiet glyph offers the chronicle a moment into each discovery chapter."},
  {n:"09",title:"Return to the magical book",text:"The world compresses into a shrinking portal and is absorbed back into the book, which lands on the same civilization."}
];
const states=[
  {phase:"Arrival",items:["booting","darkness","guide-idle","guide-following"]},
  {phase:"Living book",items:["book-sleeping","book-aware","book-awakening","book-ready","book-opening","worlds-emerging"]},
  {phase:"Atlas",items:["atlas-idle","atlas-navigating","world-focused"]},
  {phase:"Flight",items:["flight-preparing","flight-launching","portal-crossing","civilization-arriving"]},
  {phase:"World",items:["chapter-playing","chapter-paused","chronicle-open"]},
  {phase:"Return",items:["return-preparing","returning","book-restoring"]}
];
const technical=[
  {title:"Multi-state interaction architecture",text:"One guarded state machine with 23 named states and an explicit transition table. Illegal transitions return false, which is how double clicks, duplicate animations and two guides on screen are prevented."},
  {title:"Pointer interaction engine",text:"A single window-level pointer listener and one animation-frame loop publish a smoothed frame (position, velocity, direction, proximity to book and guide, idle time, touch flag) to subscribers that write straight to the DOM. No React state per mouse move."},
  {title:"Posed, reactive guide",text:"Five audited pose plates (neutral, look left, look right, watch the book, inviting) chosen from pointer direction and proximity, crossfaded over 320 ms between two anchor-locked layers so a pose change can never flash."},
  {title:"Living-book system",text:"Three pointer-proximity thresholds with hysteresis drive a nine-state book reducer: idle, noticing, awakening, ready, opening. A click made while media is still loading is queued and honoured the instant the book is ready."},
  {title:"Portal selection with intent",text:"Focus and selection are separate acts. Focusing a portal only updates the route; selecting it must pass the state guard, so a world can never be entered mid-animation or by accident."},
  {title:"Civilization flight sequences",text:"Framer Motion choreography driven from the portal’s measured screen rectangle, tinted per civilization, with a guide hand-off video. The route swap fires only once the screen is fully covered."},
  {title:"Environmental discoveries",text:"Each of the ten worlds carries three authored hotspots. Discoveries reveal in four ways: always, pointer-near, chapter-time or guide-discovery, and tap is distinguished from drag so looking around never opens one."},
  {title:"Chronicle and progression",text:"Chronicle text opens from a delayed glyph inside discovery chapters and owns the Escape key while visible. The story is the second reward, after the environment."},
  {title:"Animated return journey",text:"The visible world compresses into a shrinking portal while a small book rises to receive it; the constellation is restored beneath with the same civilization focused."},
  {title:"Responsive and accessible input",text:"Live listeners for prefers-reduced-motion and coarse pointers set a three-level particle budget (full, reduced, off). Tab visibility pauses animation. Reduced motion softens transitions but never diverts a visitor to a static fallback."},
  {title:"Asset and video orchestration",text:"A single asset manifest is the only module allowed to import media. Pose plates are pre-warmed, the book video is preloaded as a metadata hint only, and scene videos are torn down explicitly (pause, drop source, reload) when travelling."},
  {title:"Depth-aware, 360-like scenes",text:"Generated clips play on a three.js plane displaced by a per-frame depth texture, so the camera can drift and dolly with real parallax. A four-tier ladder (depth-aware, layered multiplane, flat pan-zoom, poster) demotes automatically when frame rate drops. Never genuine 360 degrees, and the code says so."}
];
const stack={
  frontend:["React 19","TypeScript (strict)","Vite","Framer Motion","three.js","Plain CSS","Vitest"],
  media:["ffmpeg pipeline","Video-Depth-Anything (temporal depth)","ProPainter (clean plates, Colab)","FastAPI job worker (Python)","Gaussian splat viewer (technical proof only)"],
  ai:["Fable: implementation and architecture","Grok: generated video and visual material","GPT: reasoning and debugging around composition and interaction","Browser-driven visual QA loop"]
};
export default function MagicalBook(){return <div className="mb-page">
  <section className="mb-hero" aria-labelledby="mb-title">
    <Image className="mb-hero-art" src={`${M}/hero.jpg`} alt="The guide holds a glowing open book while the monuments of ten ancient civilizations rise behind him." width={1672} height={941} sizes="100vw" priority placeholder="blur" blurDataURL={magicalBookHeroBlur}/>
    <div className="shell mb-hero-copy"><Link className="mb-back" href="/projects">← All projects</Link><p className="eyebrow">Project 05 · Interactive AI / Creative Technology / Experimental Interface</p><h1 id="mb-title">The Magical Book</h1><p className="mb-hero-subtitle">What if opening a book could transport you inside history?</p><p className="mb-hero-text">I wanted to recreate a childhood feeling: opening a book and wishing I could step directly into the world on its pages. The Magical Book turns that idea into an interactive web experiment connecting storytelling, generative video and spatial interaction.</p><div className="actions"><WatchDemoButton className="button primary mb-button-gold">Watch Demo</WatchDemoButton><a className="button mb-button-ghost" href="#build">Explore the Build</a></div><p className="mb-hero-meta"><span>ChronoAtlas</span><span>10 civilizations</span><span>23 experience states</span><span>Browser experiment</span></p></div>
  </section>

  <section className="mb-demo" aria-labelledby="mb-demo-title">
    <div className="shell"><div className="mb-section-head"><p className="eyebrow">Demo</p><h2 id="mb-demo-title">See the experiment in motion</h2><p className="mb-lede">From a closed book to ten worlds.</p></div>
    <MagicalBookDemo src={`${M}/demo.mp4`} poster={`${M}/demo-poster.jpg`} label="Screen recording of The Magical Book: the book opens, portals appear, and the guide travels into Carthage."/>
    <p className="mb-caption">Recorded from the running experiment. 2 min 32 s, no audio.</p></div>
  </section>

  <section className="mb-intent" aria-labelledby="mb-intent-title">
    <div className="shell mb-two-col"><div><p className="eyebrow">Intent</p><h2 id="mb-intent-title">Turn reading history into entering history.</h2></div><div><p className="mb-lede">This was never about building another history website. The goal was to test whether a browser experience could make someone feel that a physical magical book had noticed them, opened itself and become a portal.</p><p>The anti-goals were written down before the first line of code: it must not feel like a landing page, a slideshow, a carousel, a video gallery, a museum information site, a dashboard, a collection of cards, an educational site with clickable pins or a standard React application. The first ten seconds had to earn a screen recording.</p><p>One rule mattered more than the others: civilization selection is explicit. The book never throws a visitor into a random world. It shows all ten, lets you look, and waits for a decision.</p></div></div>
    <div className="shell"><ol className="mb-flow" aria-label="Core experience"><li>Closed book</li><li>Interaction</li><li>Book awakens</li><li>Book opens</li><li>Portals appear</li><li>You choose a civilization</li><li>Cinematic transition</li><li>Civilization experience</li><li>Discoveries</li><li>Return to the book</li></ol></div>
  </section>

  <section className="mb-worlds" aria-labelledby="mb-worlds-title">
    <div className="shell mb-section-head mb-section-head-row"><div><p className="eyebrow">The worlds</p><h2 id="mb-worlds-title">Ten civilizations, one book.</h2></div><p>Each world carries a period, a tagline, three authored discoveries and a note that the scenes are historically inspired reconstructions rather than records. Carthage was built first as the gold-standard journey and the system was then applied to the remaining nine; Ancient Egypt served as the reference clip for the depth and spatial-video research.</p></div>
    <ol className="mb-world-strip">{worlds.map((w,i)=><li key={w.id}><Image src={`${M}/worlds/${w.id}.jpg`} alt={`${w.name}: ${w.tagline}`} width={900} height={506} sizes="(max-width: 700px) 72vw, (max-width: 1100px) 34vw, 240px" loading="lazy"/><div><span className="mb-world-index">{String(i+1).padStart(2,"0")}</span><h3>{w.name}</h3><p className="mb-world-period">{w.period}</p><p className="mb-world-tagline">{w.tagline}</p></div></li>)}</ol>
  </section>

  <section className="mb-experience" aria-labelledby="mb-exp-title">
    <div className="shell mb-section-head"><p className="eyebrow">Experience</p><h2 id="mb-exp-title">Nine moments, in order.</h2><p className="mb-lede">Stills from the recorded demo. Every frame below is the real experiment.</p></div>
    <ol className="shell mb-sequence">{sequence.map((s,i)=><li key={s.n}><figure><Image src={`${M}/sequence/${s.n}.jpg`} alt={`${s.title}: still from the demo`} width={1000} height={799} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px" loading={i<3?"eager":"lazy"}/><figcaption><span className="mb-step-index">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p></figcaption></figure></li>)}</ol>
  </section>

  <section className="mb-interaction" aria-labelledby="mb-int-title">
    <div className="shell mb-section-head"><p className="eyebrow">Interaction design</p><h2 id="mb-int-title">An interface that notices you.</h2></div>
    <div className="shell mb-interaction-grid">
      <article><h3>Cursor-aware guide</h3><p>The guide responds to pointer position, direction and distance. Five authored poses are selected from the pointer frame and crossfaded between two anchor-locked plates, so the character looks toward you, toward the book, or invites you in, and never snaps.</p><div className="mb-pose-row" aria-label="Guide pose plates: look left, neutral, look right, inviting"><Image className="mb-mirrored" src={`${M}/guide/hero-look-right.jpg`} alt="Guide pose: looking left (the right-facing plate, mirrored, as the experiment does)" width={520} height={780} sizes="(max-width: 700px) 22vw, 130px" loading="lazy"/><Image src={`${M}/guide/hero-center.jpg`} alt="Guide pose: neutral, facing the visitor" width={520} height={780} sizes="(max-width: 700px) 22vw, 130px" loading="lazy"/><Image src={`${M}/guide/hero-look-right.jpg`} alt="Guide pose: looking right" width={520} height={780} sizes="(max-width: 700px) 22vw, 130px" loading="lazy"/><Image src={`${M}/guide/hero-inviting.jpg`} alt="Guide pose: inviting the visitor forward" width={520} height={780} sizes="(max-width: 700px) 22vw, 130px" loading="lazy"/></div></article>
      <article><h3>Living book</h3><p>The book is a character, not navigation. It sleeps, notices the pointer at a distance, awakens as you approach, becomes ready, and opens on one deliberate click. Thresholds carry hysteresis so its attention never flickers at a boundary.</p><Image src={`${M}/ui/intro.jpg`} alt="The closed book on a dark stage beside the guide, with the prompt to open the book." width={1400} height={905} sizes="(max-width: 1000px) 100vw, 560px" loading="lazy"/></article>
      <article><h3>Portal constellation</h3><p>Opening the book reveals the whole collection of destinations before any journey starts. Portals are organic, receding shapes with the guide floating among them; focusing one previews it, selecting it commits.</p><Image src={`${M}/ui/atlas.jpg`} alt="The open-book atlas: elliptical portals receding into mist, with Carthage focused and the guide floating below." width={1400} height={875} sizes="(max-width: 1000px) 100vw, 560px" loading="lazy"/></article>
      <article><h3>Cinematic exploration</h3><p>Generated historical scenes are combined with browser interaction so moving the mouse shifts the camera with real parallax. It is a 360-like, spatial cinematic interaction on a depth-displaced plane, closer to navigating an environment than watching a clip. It is not genuine 360 degree video, and the experiment never claims it is.</p><div className="mb-pair"><figure><Image src={`${M}/ui/look-left.jpg`} alt="Carthage chapter with the pointer on the left: the camera drifts left." width={1000} height={625} sizes="(max-width: 1000px) 50vw, 280px" loading="lazy"/><figcaption>Pointer left</figcaption></figure><figure><Image src={`${M}/ui/look-right.jpg`} alt="The same Carthage chapter with the pointer on the right: the camera drifts right." width={1000} height={625} sizes="(max-width: 1000px) 50vw, 280px" loading="lazy"/><figcaption>Pointer right</figcaption></figure></div></article>
    </div>
  </section>

  <section className="mb-technical" id="build" aria-labelledby="mb-tech-title">
    <div className="shell mb-section-head mb-section-head-row"><div><p className="eyebrow">Technical</p><h2 id="mb-tech-title">The system behind the magic.</h2></div><p>Generation was the easy half. The engineering problem was keeping a cinematic, pointer-driven experience coherent: one source of truth for where the visitor is, guarded transitions, and media that arrives before it is needed.</p></div>
    <div className="shell"><h3 className="mb-diagram-title">Experience state machine · 23 states</h3><ol className="mb-state-diagram" aria-label="Experience states grouped by phase">{states.map(g=><li key={g.phase}><span className="mb-state-phase">{g.phase}</span><ul>{g.items.map(s=><li key={s}><code>{s}</code></li>)}</ul></li>)}</ol><p className="mb-caption">Transitions are an explicit adjacency table. The return journey closes the loop on the atlas, not the intro, with the same civilization focused. Route changes (refresh, hash, Escape) restore state from the URL.</p></div>
    <div className="shell mb-tech-grid">{technical.map(t=><article key={t.title}><h3>{t.title}</h3><p>{t.text}</p></article>)}</div>
  </section>

  <section className="mb-scale" aria-label="Scale of the experiment">
    <div className="shell"><p className="eyebrow">Scale of the experiment</p><dl className="mb-numbers"><div><dt>10</dt><dd>Ancient civilizations</dd></div><div><dt>50</dt><dd>Generated chapter clips</dd></div><div><dt>23</dt><dd>Experience states</dd></div><div><dt>1</dt><dd>Living magical book</dd></div></dl><p className="mb-caption">Fifty chapter clips (five per civilization) plus book, guide and flight footage: 95 generated videos in total, 30 authored discoveries, one guarded state machine.</p></div>
  </section>

  <section className="mb-stack" aria-labelledby="mb-stack-title">
    <div className="shell mb-section-head"><p className="eyebrow">Stack</p><h2 id="mb-stack-title">Built with a deliberately small stack.</h2><p className="mb-lede">Verified from the project’s manifests and source. No router library, no state library, no CSS framework: a hand-rolled hash router, a subscriber set and plain CSS.</p></div>
    <div className="shell mb-stack-grid"><article><h3>Tech stack</h3><ul>{stack.frontend.map(x=><li key={x}>{x}</li>)}</ul></article><article><h3>Media and research pipeline</h3><ul>{stack.media.map(x=><li key={x}>{x}</li>)}</ul></article><article><h3>Creative AI / Build workflow</h3><ul>{stack.ai.map(x=><li key={x}>{x}</li>)}</ul></article></div>
  </section>

  <section className="mb-process" aria-labelledby="mb-process-title">
    <div className="shell mb-two-col"><div><p className="eyebrow">Experimentation</p><h2 id="mb-process-title">Many compositions failed before one felt like a place.</h2></div><div><p className="mb-lede">Around fifty videos were generated across the ten civilizations, then the real work began: making static, cinematic footage feel interactive. Several approaches did not survive.</p><ul className="mb-failures"><li><strong>Whole-image orbit.</strong> The first depth renderer moved the entire frame as a rigid rectangle: black bands at the edges, hero and background sliding together. Rejected in visual QA and replaced with per-frame depth sampled into a data texture.</li><li><strong>Static selection screen.</strong> The original civilization carousel was replaced by a living map where the guide flies to the cursor.</li><li><strong>Free-viewpoint reconstruction.</strong> 4D Gaussian and camera-recovery methods were evaluated and set aside: generated footage has no consistent geometry, boats change shape between frames, and licences were unverified.</li><li><strong>Depth applied everywhere.</strong> Eight of fifty chapters were deliberately kept flat where close faces or crowds would break under displacement.</li></ul><p className="mb-pull">The interesting part wasn’t generating the scenes. It was figuring out how to make generated scenes feel like a world the user had entered.</p></div></div>
    <div className="shell"><ol className="mb-flow mb-flow-process" aria-label="Development path"><li>Idea</li><li>Prototype</li><li>Interaction experiments</li><li>Failed compositions</li><li>Pointer system</li><li>Gold-standard civilization</li><li>Ten-world system</li></ol></div>
  </section>

  <section className="mb-close"><div className="shell"><p className="eyebrow">Next</p><h2>Two projects, one practice.</h2><div className="actions"><WatchDemoButton className="button primary mb-button-gold">Watch the demo again</WatchDemoButton><Link className="button mb-button-ghost" href="/projects#skatalyst-ai">See SKatalyst AI →</Link></div></div></section>
</div>}
