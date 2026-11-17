export type FistbumpBenefit = {id: string; character: string; href: string; title: string; summary: string; detail: string; action: string; bubble: string; plus: boolean};
export type FistbumpBenefitsCopy = {eyebrow: string; title: string; intro: string; stageLabel: string; pause: string; resume: string; free: string; planNote: string; plus: string; items: FistbumpBenefit[]};

const en: FistbumpBenefitsCopy = {
  "eyebrow": "Why use Fistbump?",
  "title": "Eight reasons to make it yours.",
  "intro": "What would make today more interesting? Pick a reason and meet your guide.",
  "stageLabel": "Your Fistbump crew",
  "pause": "Pause animations",
  "resume": "Play animations",
  "free": "Start free. Explore at your own pace.",
  "planNote": "Sign in with X. Optional Plus adds more ways to connect. Ages 18+.",
  "plus": "Fistbump Plus",
  "items": [
    {
      "id": "ai-news",
      "character": "astro",
      "href": "https://app.fistbump.world/?open=news",
      "title": "Keep up with AI, in one place.",
      "summary": "New models, research and releases from the original sources.",
      "detail": "Browse announcements from OpenAI, Anthropic, Google DeepMind, Mistral, Hugging Face and more. Filter by source and open the full story from its publisher.",
      "action": "Explore AI news",
      "bubble": "What’s new in AI?",
      "plus": false
    },
    {
      "id": "meet",
      "character": "daisy",
      "href": "https://app.fistbump.world/",
      "title": "Meet the people behind the profiles.",
      "summary": "Your X connections, on a map. A real hello could be nearby.",
      "detail": "Find followers and people you follow who are on Fistbump. Suggest a coffee, a walk or a build session. When they accept, chat to arrange the time and place.",
      "action": "Find your people",
      "bubble": "Coffee, anyone?",
      "plus": false
    },
    {
      "id": "events",
      "character": "sleuth",
      "href": "https://app.fistbump.world/?open=events",
      "title": "Find your next event.",
      "summary": "AI meetups, demo nights and talks near you.",
      "detail": "See what is happening around a place you care about. Discover an event, check its details and follow its registration link.",
      "action": "Discover events",
      "bubble": "Let’s go somewhere.",
      "plus": false
    },
    {
      "id": "hackathons",
      "character": "drizzle",
      "href": "https://app.fistbump.world/?open=hackathons",
      "title": "Give your next idea a deadline.",
      "summary": "Discover hackathons, online or in person.",
      "detail": "Find a challenge worth building for. Check the dates, format and organizer, then follow the event link to learn more or register.",
      "action": "Find a hackathon",
      "bubble": "What will you build?",
      "plus": false
    },
    {
      "id": "apps",
      "character": "echo",
      "href": "https://app.fistbump.world/?open=discover",
      "title": "Try what other people are building.",
      "summary": "Discover community apps and give useful feedback.",
      "detail": "Explore apps shared by Fistbump members, try something new and tell its maker what you think. Your feedback could help shape their next release.",
      "action": "Explore builder apps",
      "bubble": "Try it. Tell the maker.",
      "plus": false
    },
    {
      "id": "programs",
      "character": "astro",
      "href": "https://app.fistbump.world/?open=programs",
      "title": "Find support for your project.",
      "summary": "Explore accelerators, grants, competitions and startup credits.",
      "detail": "Browse programs and follow their source links to check eligibility, deadlines and how to apply. Find possibilities you might otherwise miss.",
      "action": "Browse programs",
      "bubble": "Your idea could go further.",
      "plus": false
    },
    {
      "id": "collaborate",
      "character": "sleuth",
      "href": "https://app.fistbump.world/?open=discover",
      "title": "Find someone with the missing skill.",
      "summary": "Look for cofounders, testers, feedback or design help.",
      "detail": "With Plus, filter builders by what they offer or need, save searches and get alerts for matches. Make it easier for the right conversation to happen.",
      "action": "Explore builder search",
      "bubble": "Who could you build with?",
      "plus": true
    },
    {
      "id": "play",
      "character": "echo",
      "href": "https://app.fistbump.world/?open=park",
      "title": "Take a break together.",
      "summary": "A quick game can be the start of a good connection.",
      "detail": "Head to Fistbump Park for games with your connections or bots. Try Chkobba, Snake, Four in a Row and more. Some games and private rooms are part of Plus.",
      "action": "Visit Fistbump Park",
      "bubble": "One quick game?",
      "plus": false
    }
  ]
};

const de: FistbumpBenefitsCopy = {
  "eyebrow": "Warum Fistbump nutzen?",
  "title": "Acht Gründe, dabei zu sein.",
  "intro": "Was würde deinen Tag interessanter machen? Wähle einen Grund und lass dich begleiten.",
  "stageLabel": "Deine Fistbump-Crew",
  "pause": "Animationen pausieren",
  "resume": "Animationen abspielen",
  "free": "Starte kostenlos. Entdecke in deinem Tempo.",
  "planNote": "Anmeldung mit X. Optionales Plus bietet mehr Möglichkeiten zum Vernetzen. Ab 18 Jahren.",
  "plus": "Fistbump Plus",
  "items": [
    {
      "id": "ai-news",
      "character": "astro",
      "href": "https://app.fistbump.world/?open=news",
      "title": "Bei KI auf dem Laufenden bleiben.",
      "summary": "Neue Modelle, Forschung und Updates direkt von den Quellen.",
      "detail": "Lies Ankündigungen von OpenAI, Anthropic, Google DeepMind, Mistral, Hugging Face und weiteren Anbietern. Filtere nach Quelle und öffne den ganzen Beitrag beim Herausgeber.",
      "action": "KI-Neuigkeiten entdecken",
      "bubble": "Was gibt’s Neues bei KI?",
      "plus": false
    },
    {
      "id": "meet",
      "character": "daisy",
      "href": "https://app.fistbump.world/",
      "title": "Die Menschen hinter den Profilen treffen.",
      "summary": "Deine X-Kontakte auf einer Karte. Vielleicht gleich in der Nähe.",
      "detail": "Finde Follower und Menschen, denen du folgst und die Fistbump nutzen. Schlage einen Kaffee, einen Spaziergang oder eine gemeinsame Arbeitssession vor. Nach der Zusage klärt ihr Zeit und Ort im Chat.",
      "action": "Deine Leute finden",
      "bubble": "Lust auf einen Kaffee?",
      "plus": false
    },
    {
      "id": "events",
      "character": "sleuth",
      "href": "https://app.fistbump.world/?open=events",
      "title": "Dein nächstes Event finden.",
      "summary": "KI-Meetups, Demo-Abende und Vorträge in deiner Nähe.",
      "detail": "Entdecke Veranstaltungen an Orten, die dich interessieren. Lies die Details und öffne den Link zur Anmeldung.",
      "action": "Events entdecken",
      "bubble": "Lass uns hingehen.",
      "plus": false
    },
    {
      "id": "hackathons",
      "character": "drizzle",
      "href": "https://app.fistbump.world/?open=hackathons",
      "title": "Deiner Idee einen Termin geben.",
      "summary": "Entdecke Hackathons, online oder vor Ort.",
      "detail": "Finde eine Herausforderung, für die du etwas bauen möchtest. Prüfe Datum, Format und Veranstalter und folge dem Event-Link für weitere Infos oder die Anmeldung.",
      "action": "Einen Hackathon finden",
      "bubble": "Was wirst du bauen?",
      "plus": false
    },
    {
      "id": "apps",
      "character": "echo",
      "href": "https://app.fistbump.world/?open=discover",
      "title": "Ausprobieren, was andere entwickeln.",
      "summary": "Entdecke Community-Apps und gib hilfreiches Feedback.",
      "detail": "Probiere Apps von Fistbump-Mitgliedern aus und sag den Entwicklern, was du denkst. Dein Feedback kann helfen, die nächste Version zu verbessern.",
      "action": "Community-Apps entdecken",
      "bubble": "Teste es. Sag, was du denkst.",
      "plus": false
    },
    {
      "id": "programs",
      "character": "astro",
      "href": "https://app.fistbump.world/?open=programs",
      "title": "Unterstützung für dein Projekt finden.",
      "summary": "Accelerators, Förderprogramme, Wettbewerbe und Startup-Guthaben.",
      "detail": "Entdecke Programme und prüfe über die Originalquellen Voraussetzungen, Fristen und Bewerbungswege. Vielleicht findest du eine Möglichkeit, die dir sonst entgangen wäre.",
      "action": "Programme ansehen",
      "bubble": "Bring deine Idee weiter.",
      "plus": false
    },
    {
      "id": "collaborate",
      "character": "sleuth",
      "href": "https://app.fistbump.world/?open=discover",
      "title": "Die passende Verstärkung finden.",
      "summary": "Mitgründer, Tester, Feedback oder Unterstützung beim Design.",
      "detail": "Mit Plus filterst du nach dem, was Menschen anbieten oder suchen. Speichere Suchanfragen und erhalte Hinweise auf passende Kontakte. So wird aus einer Suche leichter ein Gespräch.",
      "action": "Passende Kontakte suchen",
      "bubble": "Mit wem könntest du bauen?",
      "plus": true
    },
    {
      "id": "play",
      "character": "echo",
      "href": "https://app.fistbump.world/?open=park",
      "title": "Gemeinsam eine Pause machen.",
      "summary": "Ein kurzes Spiel kann der Anfang einer guten Verbindung sein.",
      "detail": "Spiele im Fistbump Park mit deinen Kontakten oder Bots. Probiere Chkobba, Snake, Vier gewinnt und mehr. Einige Spiele und private Räume gehören zu Plus.",
      "action": "Zum Fistbump Park",
      "bubble": "Eine schnelle Runde?",
      "plus": false
    }
  ]
};

const fr: FistbumpBenefitsCopy = {
  "eyebrow": "Pourquoi utiliser Fistbump ?",
  "title": "Huit raisons de vous y retrouver.",
  "intro": "Qu’est-ce qui rendrait votre journée plus intéressante ? Choisissez une raison et suivez le guide.",
  "stageLabel": "Votre équipe Fistbump",
  "pause": "Mettre les animations en pause",
  "resume": "Relancer les animations",
  "free": "Commencez gratuitement. Explorez à votre rythme.",
  "planNote": "Connexion avec X. Plus, en option, offre davantage de façons de se connecter. 18 ans et plus.",
  "plus": "Fistbump Plus",
  "items": [
    {
      "id": "ai-news",
      "character": "astro",
      "href": "https://app.fistbump.world/?open=news",
      "title": "Suivre l’IA au même endroit.",
      "summary": "Nouveaux modèles, recherche et annonces à la source.",
      "detail": "Retrouvez les annonces d’OpenAI, Anthropic, Google DeepMind, Mistral, Hugging Face et d’autres acteurs. Filtrez par source et ouvrez l’article complet chez son éditeur.",
      "action": "Explorer l’actualité IA",
      "bubble": "Quoi de neuf dans l’IA ?",
      "plus": false
    },
    {
      "id": "meet",
      "character": "daisy",
      "href": "https://app.fistbump.world/",
      "title": "Rencontrer les personnes derrière les profils.",
      "summary": "Vos contacts X sur une carte. Un vrai bonjour est peut-être tout près.",
      "detail": "Retrouvez vos abonnés et les personnes que vous suivez qui utilisent Fistbump. Proposez un café, une balade ou une session de travail. Après acceptation, organisez le rendez-vous dans la conversation.",
      "action": "Retrouver vos contacts",
      "bubble": "On prend un café ?",
      "plus": false
    },
    {
      "id": "events",
      "character": "sleuth",
      "href": "https://app.fistbump.world/?open=events",
      "title": "Trouver votre prochain événement.",
      "summary": "Rencontres IA, soirées démo et conférences près de vous.",
      "detail": "Découvrez ce qui se passe dans les lieux qui vous intéressent. Consultez les détails d’un événement et suivez son lien d’inscription.",
      "action": "Découvrir les événements",
      "bubble": "On y va ensemble ?",
      "plus": false
    },
    {
      "id": "hackathons",
      "character": "drizzle",
      "href": "https://app.fistbump.world/?open=hackathons",
      "title": "Donner une échéance à votre idée.",
      "summary": "Des hackathons à découvrir, en ligne ou sur place.",
      "detail": "Trouvez un défi qui vous donne envie de créer. Consultez les dates, le format et l’organisateur, puis le lien de l’événement pour en savoir plus ou vous inscrire.",
      "action": "Trouver un hackathon",
      "bubble": "Qu’allez-vous créer ?",
      "plus": false
    },
    {
      "id": "apps",
      "character": "echo",
      "href": "https://app.fistbump.world/?open=discover",
      "title": "Essayer ce que les autres construisent.",
      "summary": "Découvrez les applications de la communauté et donnez votre avis.",
      "detail": "Explorez les applications partagées par les membres de Fistbump et dites à leur créateur ce que vous en pensez. Vos retours peuvent aider à améliorer la prochaine version.",
      "action": "Découvrir les applications",
      "bubble": "Essayez. Partagez votre avis.",
      "plus": false
    },
    {
      "id": "programs",
      "character": "astro",
      "href": "https://app.fistbump.world/?open=programs",
      "title": "Trouver du soutien pour votre projet.",
      "summary": "Accélérateurs, subventions, concours et crédits pour startups.",
      "detail": "Parcourez les programmes et consultez leurs sources pour vérifier les critères, les dates et les modalités de candidature. Découvrez des possibilités que vous auriez pu manquer.",
      "action": "Explorer les programmes",
      "bubble": "Votre idée peut aller plus loin.",
      "plus": false
    },
    {
      "id": "collaborate",
      "character": "sleuth",
      "href": "https://app.fistbump.world/?open=discover",
      "title": "Trouver la compétence qui vous manque.",
      "summary": "Associés, testeurs, retours ou aide en design.",
      "detail": "Avec Plus, filtrez les profils selon ce que les personnes proposent ou recherchent. Enregistrez vos recherches et recevez des alertes de correspondance pour faciliter la bonne rencontre.",
      "action": "Trouver des collaborateurs",
      "bubble": "Avec qui pourriez-vous créer ?",
      "plus": true
    },
    {
      "id": "play",
      "character": "echo",
      "href": "https://app.fistbump.world/?open=park",
      "title": "Faire une pause ensemble.",
      "summary": "Une partie rapide peut créer une nouvelle complicité.",
      "detail": "Jouez avec vos contacts ou des bots dans Fistbump Park. Essayez la Chkobba, Snake, Puissance 4 et bien plus. Certains jeux et les salons privés font partie de Plus.",
      "action": "Entrer dans Fistbump Park",
      "bubble": "Une petite partie ?",
      "plus": false
    }
  ]
};

export function getFistbumpBenefits(locale: string): FistbumpBenefitsCopy { return locale === "de" ? de : locale === "fr" ? fr : en; }
