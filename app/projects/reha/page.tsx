import Image from "next/image";import Link from "next/link";import {ProductFrame} from "@/components/ProductFrame";
export const metadata={title:"Reha",description:"Reha: a digital rehabilitation experience designed from the patient journey outward. A three-role prototype (patient, therapist, administration) built from first-hand observation and proposed to rehabilitation organizations. Never deployed in clinical operation."};
const M="/media/reha";
function Phone({src,alt,label}:{src:string;alt:string;label:string}){return <figure className="rh-phone"><Image src={src} alt={alt} width={1170} height={2532} sizes="(max-width: 700px) 60vw, 260px" loading="lazy"/><figcaption>{label}</figcaption></figure>}
const moments=["Therapies","Appointments","Documents","Assessments","Goals","Meals","Free-time offers","Rooms and floors","Communication","Progress"];
const observations=[
  {who:"Patient view",items:["Most information exists only on paper","Therapy plans change at short notice","Orientation is hard: which room, which floor?","Uncertainty: what do I need, what do I wear?","Hardly any overview of the whole week"]},
  {who:"Therapists and staff",items:["High organizational effort","Plans must be adjusted frequently","Heavy coordination at full occupancy","Attendance lists and documentation on paper","Little time for individual patient questions"]}
];
const mapping=[
  {o:"Therapy plans change frequently",i:"A digital, always-current weekly plan"},
  {o:"Patients keep asking where a room is",i:"Room and floor shown on every session, with a navigation map"},
  {o:"Uncertainty about clothing and material",i:"What to wear and what to bring, per session"},
  {o:"Free time is hard to plan",i:"Overview of free slots and optional offers"},
  {o:"A lot of paper",i:"Digital information instead of printouts"}
];
const chain=["Rehabilitation stay","Weekly plan","Session: room, wear, bring","Orientation","Check-in and attendance","Therapist day view","Clinic overview"];
const roles=[
  {r:"Patient",d:"My day and my week: sessions with room, what to wear and what to bring, morning check-in, meals, free-time offers, goals, documents, news and a navigation map.",s:"Most complete; several parts are UI over static data."},
  {r:"Therapist",d:"Today's sessions with participants, QR scanning for attendance, updates from the clinic, cabin occupancy and a facility map.",s:"Schedule and cabins are static data; attendance stays in the browser."},
  {r:"Administration",d:"Patient list and creation through the API, patient detail with a printable QR login, plus a dashboard for stations, therapy plans, meals, rooms and analytics.",s:"Patient CRUD is real; the dashboard is mock data."}
];
const model={
  persisted:[
    {n:"Patient",f:"id · room · first name · last name · date of birth"},
    {n:"Schedule",f:"patientId · date · start · end · type · room · bring · wear · notes"},
    {n:"Attendance",f:"scheduleId · patientId · date · status (present / absent / late / cancelled) · checkInTime"},
    {n:"Checkin",f:"patientId · date · time · type (awake / ready / arrived)"}
  ],
  static:[
    {n:"PatientProfile",f:"stay dates · duration · goals · documents · primary therapist · case manager"},
    {n:"ScheduleSession",f:"title · location · type · wear[] · bring[] · benefit · documents"},
    {n:"FreeSession",f:"durations · available slots · what to wear · location"},
    {n:"MealOption / DayLunch",f:"two menus per day · allergens · calories · locked with reason"},
    {n:"PhysioCabin / CabinBooking",f:"area · supported therapies · equipment · capacity · status"},
    {n:"ClinicConfig",f:"name · colours · contact · features · gallery (white-label)"}
  ]
};
const endpoints=["GET /api/patients","GET /api/patients/:id","POST /api/patients","GET /api/schedules","GET /api/schedules/:id","POST /api/schedules (conflict check)","GET /api/attendance","POST /api/attendance (upsert)","GET /api/checkin","POST /api/checkin (once per day and type)","GET /api/health"];
const stack=[
  {k:"Frontend",v:"React 18, TypeScript (strict), Vite 5, Tailwind CSS 4, React Router, i18next with German, English and French at full key parity, qrcode.react and html5-qrcode"},
  {k:"Backend",v:"Node.js with Express 4 and CORS; 11 routes; hand-written validation; a JSON-file store with atomic temp-file writes"},
  {k:"Roles",v:"Patient, therapist, administration: three entry points, each with its own view of the same day"},
  {k:"State",v:"Session per role in sessionStorage; meals, goals, bookings and therapist attendance in localStorage; three write paths reach the server"},
  {k:"Tests, CI, deployment",v:"None. The project has no test suite, no pipeline and no deployment configuration"}
];
const readiness=[
  {a:"Authentication",p:"Code lookup against a served JSON file; patient ID is the credential",r:"Real identity, sessions, roles and consent"},
  {a:"Persistence",p:"JSON files on disk, no locking; most state in the browser",r:"A database with migrations, backups and tenancy"},
  {a:"Data protection",p:"No encryption, no audit log, no retention rules",r:"GDPR processes, audit trail, deletion and access rights"},
  {a:"Integration",p:"Fixture data; no clinic systems connected",r:"Interfaces to planning, HIS and documentation systems"},
  {a:"Regulatory",p:"Not assessed",r:"Medical-device classification review, security review, accessibility"},
  {a:"Clinical validation",p:"None; never used by patients or staff",r:"Pilot with clinical stakeholders, measured outcomes"}
];
const truth=[
  {t:"Built",d:"Three role views, a patient weekly plan with wear/bring per session, QR login and attendance, morning check-in, meals, free-time offers, goals, news, documents, navigation map, cabin occupancy, admin dashboard, an Express API with a JSON store, three languages."},
  {t:"Proposed",d:"Digital support for the daily rehab routine, funded through a DRV model project with the clinic as applicant and my company as technical partner. Server-side attendance, real accounts, clinic integration and hosting were concept only."},
  {t:"Demonstrated",d:"Everything on this page runs locally on synthetic data: patient, therapist and admin journeys end to end, patient creation through the API, QR generation, attendance and check-in endpoints."},
  {t:"Production",d:"Never deployed in live clinical operation. Never used by real patients or staff. Not clinically validated, not certified, not assessed for medical-device or data-protection compliance."}
];
const lessons=[
  {t:"Model the domain before the UI",d:"The most useful idea in the prototype is a data field: wear and bring on every session. Once the domain carried it, every screen could show it."},
  {t:"Design from the patient day outward",d:"The plan that matters is Wednesday at 09:00 in Physiotherapie 1 with sports clothes and a towel, not a hospital information system."},
  {t:"Two perspectives on one schedule",d:"Patients and therapists look at the same session from opposite sides: where do I go, versus who is here. The prototype gives each side its own view of shared data."},
  {t:"Workflow state is the product",d:"Check-ins, attendance, locked meal choices and booked slots are states, not screens. The prototype models them, but keeps most of them in the browser; the real work is moving them behind an API."},
  {t:"Privacy shapes the architecture",d:"A rehab plan is health data. Anything beyond a prototype starts with identity, consent, audit and retention, not with features."},
  {t:"Adoption is its own system",d:"A clinic adopts through funding routes, procurement, IT review and staff time. Software readiness is necessary, not sufficient."}
];
export default function Reha(){return <div className="rh-page">
  <section className="rh-hero" aria-labelledby="rh-title">
    <div className="shell">
      <Link className="rh-back" href="/projects">← All projects</Link>
      <p className="rh-eyebrow">Project 03 · Product prototype · Healthcare digitalization concept · 2026</p>
      <h1 id="rh-title">Reha</h1>
      <p className="rh-statement">A digital rehabilitation experience designed from the patient journey outward.</p>
      <p className="rh-lede">Rehabilitation is weeks of therapies, appointments, rooms, documents, meals and small daily decisions, held together mostly on paper. After experiencing that workflow first-hand, I modelled it, designed a connected weekly plan for patients and clinic teams, and built a working prototype, RehaConnect, that I later proposed to rehabilitation organizations.</p>
      <p className="rh-flag"><strong>Prototype, not a product in use.</strong> Built with test data, demonstrated locally, presented as a concept. It was never deployed in live clinical operation and never used by real patients or staff.</p>
    </div>
    <div className="shell rh-hero-media">
      <ProductFrame className="rh-hero-desktop" src={`${M}/patient-dashboard.jpg`} alt="Patient dashboard on a Wednesday in January: greeting, checked-in status, seven sessions of the day with room and clothing notes, today's tasks and quick overview." width={2480} height={1500} label="RehaConnect · patient dashboard (synthetic data)" sizes="(max-width: 900px) 100vw, 900px" priority/>
      <Phone src={`${M}/m-session.jpg`} alt="Phone view of a session detail: Physiotherapie Einzel 09:00 to 09:30, benefit, room with navigation button, what to wear, what to bring." label="Session detail on a phone"/>
    </div>
  </section>

  <section className="rh-section" aria-labelledby="rh-exp-title">
    <div className="shell">
      <p className="rh-index">01 · The experience</p>
      <h2 id="rh-exp-title">A rehabilitation stay is many moments that have to fit together.</h2>
      <div className="rh-two">
        <p className="rh-lede">Over three weeks a patient moves through a dense program: therapies, medical consultations, group training, meals, free-time offers, documents and goals, spread over rooms and floors, with a plan that changes at short notice. From the inside, the stay is not a medical process. It is a schedule you have to keep up with.</p>
        <ul className="rh-moments" aria-label="Moments of a rehabilitation stay">{moments.map(m=><li key={m}>{m}</li>)}</ul>
      </div>
    </div>
  </section>

  <section className="rh-section rh-problem" aria-labelledby="rh-problem-title">
    <div className="shell">
      <p className="rh-index">02 · The problem</p>
      <h2 id="rh-problem-title">The same information is needed by everyone, and it lives on paper.</h2>
      <div className="rh-two rh-two-wide">
        <div className="rh-obs">{observations.map(o=><article key={o.who}><h3>{o.who}</h3><ul>{o.items.map(i=><li key={i}>{i}</li>)}</ul></article>)}</div>
        <div className="rh-stack-diagram" role="img" aria-label="Patient, therapists, doctors, administration and documentation stacked vertically, connected by fragile paper-based handovers.">
          {["Patient","Therapists","Doctors","Administration","Documentation"].map((r,i)=><div key={r} className="rh-stack-row"><span>{r}</span>{i<4&&<i aria-hidden="true">paper · phone · notice board</i>}</div>)}
          <p>Where the plan changes, every hand-over is manual: the therapist re-plans, the patient asks, the front desk answers, the list gets reprinted.</p>
        </div>
      </div>
      <p className="rh-caption">Observations recorded during the stay from both sides, patients and staff, and used as the starting point of the concept.</p>
    </div>
  </section>

  <section className="rh-section rh-idea" aria-labelledby="rh-idea-title">
    <div className="shell">
      <p className="rh-index">03 · The product idea</p>
      <h2 id="rh-idea-title">One connected weekly plan, seen from each role.</h2>
      <p className="rh-lede">The concept maps every observed friction to one digital answer, and keeps the patient day as the centre of the system.</p>
      <table className="rh-map"><thead><tr><th>Observation in daily routine</th><th>Idea for a digital solution</th></tr></thead><tbody>{mapping.map(m=><tr key={m.o}><td>{m.o}</td><td>{m.i}</td></tr>)}</tbody></table>
      <ol className="rh-chain" aria-label="Connected system">{chain.map((c,i)=><li key={c}><span>{String(i+1).padStart(2,"0")}</span>{c}</li>)}</ol>
      <div className="rh-benefits"><div><strong>Patients</strong><span>More orientation, a plannable week, fewer open questions.</span></div><div><strong>Therapists</strong><span>Fewer questions to answer, less organizational effort.</span></div><div><strong>Administration</strong><span>Less paper, a clearer overview of the house.</span></div></div>
    </div>
  </section>

  <section className="rh-section rh-how" aria-labelledby="rh-how-title">
    <div className="shell">
      <p className="rh-index">04 · How it works</p>
      <h2 id="rh-how-title">Three roles, one day.</h2>
      <div className="rh-roles">{roles.map(r=><article key={r.r}><h3>{r.r}</h3><p>{r.d}</p><small>{r.s}</small></article>)}</div>
      <div className="rh-legend"><span data-k="real">Real backend</span><span data-k="local">Browser state</span><span data-k="static">Static data</span></div>
      <ul className="rh-journey">
        <li data-k="real"><strong>Patient logs in</strong><span>by code or QR; the ID is verified against the API</span></li>
        <li data-k="real"><strong>Morning check-in</strong><span>“How do you feel today?” is posted to the check-in endpoint</span></li>
        <li data-k="static"><strong>Weekly plan and day view</strong><span>sessions with room, wear, bring and benefit from the schedule data</span></li>
        <li data-k="static"><strong>Orientation</strong><span>“Navigate to room” opens the floor plan</span></li>
        <li data-k="local"><strong>Meals, goals, free slots</strong><span>chosen and locked in the browser</span></li>
        <li data-k="local"><strong>Therapist scans the session QR</strong><span>attendance is recorded in the browser; the API endpoint exists but is not wired</span></li>
        <li data-k="real"><strong>Administration creates patients</strong><span>through the API, with a printable QR login</span></li>
      </ul>
    </div>
  </section>

  <section className="rh-section rh-patient" aria-labelledby="rh-pat-title">
    <div className="shell">
      <p className="rh-index">05 · Patient experience</p>
      <h2 id="rh-pat-title">My day, my week, and what I need for the next session.</h2>
      <div className="rh-phones"><Phone src={`${M}/m-dashboard.jpg`} alt="Phone dashboard: date card, greeting with room number and checked-in state." label="Today"/><Phone src={`${M}/m-weekly.jpg`} alt="Phone weekly plan: calendar and day-view toggle with the days of the stay." label="Weekly plan"/><Phone src={`${M}/m-dayview.jpg`} alt="Phone day view of the weekly plan with meals, sessions and free slots." label="Day view"/><Phone src={`${M}/m-session.jpg`} alt="Phone session detail with benefit, room navigation, what to wear and what to bring." label="Session detail"/></div>
      <div className="rh-shots">
        <ProductFrame src={`${M}/weekly-plan.jpg`} alt="Weekly plan: three weeks of days in a grid, each day listing meals, therapies and lectures with times and an hours total." width={2480} height={1560} label="Weekly plan · three weeks"/>
        <ProductFrame src={`${M}/day-view.jpg`} alt="Day view: meals, appointments with clothing and equipment hints, free slots and free-time activities for one day." width={2480} height={1700} label="Day view · meals, appointments, free slots"/>
      </div>
      <div className="rh-feature">
        <figure className="rh-feature-img"><Image src={`${M}/session-detail.jpg`} alt="Session detail card: Physiotherapie Einzel 09:00 to 09:30, benefit, room Physiotherapie 1 with a navigate-to-room button, what to wear: sports clothes, what to bring: towel." width={1136} height={1344} sizes="(max-width: 800px) 90vw, 420px" loading="lazy"/></figure>
        <div><p className="rh-index">The core idea</p><h3>What to wear, what to bring, where to go.</h3><p>Every session carries its room, a benefit line, a clothing list and an equipment list. On the backend these are validated fields on the schedule record, not free text. It answers the question a patient actually has at 08:45: what do I need for the 09:00 session and how do I get there.</p><p className="rh-caption">Also in the patient space: weekly menu choice with a lock deadline, weight goal with BMI range, free-time booking, course documents by diagnosis, clinic news and a floor map. These run on static data and browser state.</p></div>
      </div>
    </div>
  </section>

  <section className="rh-section rh-clinic" aria-labelledby="rh-clinic-title">
    <div className="shell">
      <p className="rh-index">06 · Clinic experience</p>
      <h2 id="rh-clinic-title">The same day from the therapist’s and the clinic’s side.</h2>
      <div className="rh-shots">
        <ProductFrame src={`${M}/therapist-dashboard.jpg`} alt="Therapist dashboard: greeting, day strip with sessions and patients per day, counters for sessions, patients and attendance, and the session list of the day." width={2480} height={1500} label="Therapist · today's sessions and attendance"/>
        <ProductFrame src={`${M}/therapist-cabins.jpg`} alt="Cabin occupancy: five physiotherapy areas with free, reserved and occupied cabins." width={2480} height={1400} label="Therapist · cabin occupancy"/>
      </div>
      <div className="rh-feature rh-feature-rev">
        <figure className="rh-feature-img"><Image src={`${M}/facility-map.jpg`} alt="Facility map modal: building and floor selection, physiotherapy areas A and B with cabin cards showing free, occupied and reserved states." width={1888} height={1694} sizes="(max-width: 800px) 90vw, 520px" loading="lazy"/></figure>
        <div><p className="rh-index">Orientation for both sides</p><h3>Rooms, cabins and floors as a shared map.</h3><p>Patients get a route to their room from the session detail; therapists see which cabin is free, reserved or occupied right now. Both views read the same room and cabin model.</p></div>
      </div>
      <div className="rh-shots rh-shots-3">
        <ProductFrame src={`${M}/admin-overview.jpg`} alt="Admin overview: active patients, stations, sessions today, satisfaction, quick actions and a recent patients table with synthetic names and diagnoses." width={2480} height={1600} label="Administration · overview (mock data)"/>
        <ProductFrame src={`${M}/admin-therapy-plan.jpg`} alt="Admin therapy plan for one patient: a day strip and the list of the day's appointments." width={2480} height={1500} label="Administration · therapy plan (mock data)"/>
        <ProductFrame src={`${M}/admin-patients-api.jpg`} alt="Patients page backed by the API: search, patient count, today's date and a patient card with room and ID." width={2480} height={1300} label="Administration · patients (real API)"/>
      </div>
    </div>
  </section>

  <section className="rh-section rh-model" aria-labelledby="rh-model-title">
    <div className="shell">
      <p className="rh-index">07 · Data and system model</p>
      <h2 id="rh-model-title">The stay as a domain, not a set of screens.</h2>
      <p className="rh-lede">Four entities are persisted by the backend; the rest of the domain is typed on the frontend and fed from static fixtures. The split is exactly where prototype ends and product would begin.</p>
      <div className="rh-model-grid">
        <div className="rh-model-col"><h3>Persisted by the API</h3>{model.persisted.map(e=><article key={e.n} data-k="real"><strong>{e.n}</strong><span>{e.f}</span></article>)}</div>
        <div className="rh-model-col"><h3>Typed, static fixtures</h3>{model.static.map(e=><article key={e.n} data-k="static"><strong>{e.n}</strong><span>{e.f}</span></article>)}</div>
      </div>
      <p className="rh-caption">Relationships: Schedule, Attendance and Checkin reference a Patient; Attendance references a Schedule. Around ninety TypeScript interfaces describe the frontend domain, compiled under strict mode.</p>
    </div>
  </section>

  <section className="rh-section rh-eng" aria-labelledby="rh-eng-title">
    <div className="shell">
      <p className="rh-index">08 · Engineering</p>
      <h2 id="rh-eng-title">Prototype engineering, stated plainly.</h2>
      <div className="rh-arch" role="img" aria-label="Architecture: three role views in a React single-page app talk to an Express API over a dev proxy; the API stores four collections as JSON files; the app also reads static fixture files and keeps role sessions and choices in browser storage.">
        <div className="rh-arch-col"><span className="rh-arch-h">Browser · React 18 SPA</span><div>Patient views</div><div>Therapist views</div><div>Admin views</div><div className="rh-arch-soft">sessionStorage role · localStorage choices</div></div>
        <div className="rh-arch-arrows" aria-hidden="true"><span>/api</span><span>/data/*.json</span></div>
        <div className="rh-arch-col"><span className="rh-arch-h">Express API</span><div>patients · schedules · attendance · checkin</div><div>validation · conflict check · idempotent check-in</div><div className="rh-arch-soft">JSON files, atomic writes</div></div>
        <div className="rh-arch-col rh-arch-static"><span className="rh-arch-h">Static fixtures</span><div>weekly schedule · therapist schedule · menus</div><div>free sessions · cabins · rooms · news · documents</div><div className="rh-arch-soft">clinic.json white-label config</div></div>
      </div>
      <div className="rh-eng-grid">
        <dl className="rh-stack">{stack.map(s=><div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd></div>)}</dl>
        <div><p className="rh-mini">API surface</p><ul className="rh-endpoints">{endpoints.map(e=><li key={e}><code>{e}</code></li>)}</ul></div>
      </div>
      <h3 className="rh-sub">Prototype versus production readiness</h3>
      <table className="rh-ready"><thead><tr><th>Area</th><th>In the prototype</th><th>Required before clinical use</th></tr></thead><tbody>{readiness.map(r=><tr key={r.a}><th scope="row">{r.a}</th><td>{r.p}</td><td>{r.r}</td></tr>)}</tbody></table>
    </div>
  </section>

  <section className="rh-section rh-path" aria-labelledby="rh-path-title">
    <div className="shell">
      <p className="rh-index">09 · From experience to prototype</p>
      <h2 id="rh-path-title">Observe, model, design, build, propose.</h2>
      <ol className="rh-path-steps">
        <li><span>Experienced</span><p>Daily participation in a rehabilitation program; conversations with other patients, therapists and staff; watching the routines.</p></li>
        <li><span>Observed</span><p>Paper plans, short-notice changes, orientation problems, clothing uncertainty, no weekly overview; high coordination load for staff.</p></li>
        <li><span>Modelled</span><p>The stay as patients, sessions, attendance, check-ins, meals, cabins and rooms, with wear and bring on every session.</p></li>
        <li><span>Designed</span><p>A patient-first weekly plan with a day view, and role views for therapists and administration on the same data.</p></li>
        <li><span>Built</span><p>RehaConnect in January 2026, in evenings and on weekends, with test data only, as a working local prototype.</p></li>
        <li><span>Proposed</span><p>Presented as a digitalization concept to rehabilitation organizations, framed for the DRV model-project route with the clinic as applicant.</p></li>
      </ol>
    </div>
  </section>

  <section className="rh-section rh-next" aria-labelledby="rh-next-title">
    <div className="shell rh-two rh-two-wide">
      <div><p className="rh-index">10 · What happened next</p><h2 id="rh-next-title">A concept on the table, not a system in a clinic.</h2><p className="rh-lede">The concept was proposed to rehabilitation organizations. It did not move into production deployment, and the prototype was never used in clinical operation.</p><p>That is the normal shape of healthcare digitalization. Building the software is one part. Adoption also needs institutional capacity, a funding and procurement route, integration with existing clinic systems, regulatory and security review, organizational change and alignment with clinical stakeholders. None of those are solved by a prototype, however complete it looks.</p></div>
      <div><p className="rh-index">11 · What I learned</p><ul className="rh-lessons">{lessons.map(l=><li key={l.t}><strong>{l.t}</strong><span>{l.d}</span></li>)}</ul></div>
    </div>
  </section>

  <section className="rh-section rh-truth" aria-labelledby="rh-truth-title">
    <div className="shell">
      <p className="rh-index">Truth table</p>
      <h2 id="rh-truth-title">Built, proposed, demonstrated, production.</h2>
      <dl className="rh-truth-grid">{truth.map(t=><div key={t.t} data-t={t.t}><dt>{t.t}</dt><dd>{t.d}</dd></div>)}</dl>
      <p className="rh-caption">All screenshots on this page come from the prototype running locally on a fully synthetic dataset (fictional patient “Anna Meier”, fictional clinic “Reha-Zentrum Waldsee”). No clinic, patient or staff member is identified.</p>
    </div>
  </section>

  <section className="rh-close"><div className="shell"><p className="rh-index">Next</p><h2>Three projects, one practice.</h2><div className="actions"><Link className="button primary rh-button" href="/projects/skatalyst-ai">SKatalyst AI →</Link><Link className="button rh-button-ghost" href="/projects/the-magical-book">The Magical Book →</Link></div></div></section>
</div>}
