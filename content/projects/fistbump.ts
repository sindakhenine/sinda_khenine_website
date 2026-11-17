export const fistbumpLinks = {
  site: "https://fistbump.world/",
  app: "https://app.fistbump.world/",
  news: "https://app.fistbump.world/?open=news",
} as const;

const en = {
  watch: "Watch the animated teaser",
  closeVideo: "Close the video",
  videoNote: "The Fistbump crew goes from an online hello to meeting in person. Original animated teaser.",
  label: "For curious people and builders",
  live: "Live on the web",
  headline: "Meet the people. Follow the ideas.",
  intro: "Catch up on AI. Find events and hackathons. Discover what people are building, and meet your X connections in real life. Choose what interests you and start exploring.",
  meet: "Meet in real life",
  news: "Discover AI news",
  meetShort: "A coffee. A walk. Something to build together.",
  newsShort: "New models, research and releases. Back to the source.",
  open: "Try Fistbump",
  explore: "See what you can do",
  signIn: "Web app · Sign in with X · Ages 18+",
  title: "Fistbump: people, ideas and AI news",
  description: "Discover Fistbump: AI news, events, hackathons, community apps and startup programs. Meet your X connections and find people to build with.",
  back: "All projects",
  closing: "Your next discovery is waiting.",
  visit: "Visit fistbump.world",
  illustration: "Daisy and Astro, two illustrated characters from the Fistbump world.",
};

type FistbumpCopy = typeof en;
const de: FistbumpCopy = {
  watch: "Animierten Teaser ansehen",
  closeVideo: "Video schließen",
  videoNote: "Die Fistbump-Crew macht aus einem Online-Hallo ein persönliches Treffen. Originaler animierter Teaser.",
  label: "Für Neugierige und Menschen mit Ideen",
  live: "Jetzt im Web",
  headline: "Menschen treffen. Ideen entdecken.",
  intro: "Bleib bei KI auf dem Laufenden. Finde Events und Hackathons. Entdecke Projekte und triff deine X-Kontakte persönlich. Wähle, was dich interessiert, und leg los.",
  meet: "Persönlich treffen",
  news: "KI-Neuigkeiten entdecken",
  meetShort: "Ein Kaffee. Ein Spaziergang. Gemeinsam etwas bauen.",
  newsShort: "Neue Modelle, Forschung und Updates. Direkt zur Quelle.",
  open: "Fistbump ausprobieren",
  explore: "Entdecke deine Möglichkeiten",
  signIn: "Web-App · Anmeldung mit X · Ab 18 Jahren",
  title: "Fistbump: Menschen, Ideen und KI-Neuigkeiten",
  description: "Fistbump: KI-News, Events, Hackathons, Community-Apps und Startup-Programme. Triff deine X-Kontakte und finde Menschen für gemeinsame Projekte.",
  back: "Alle Projekte",
  closing: "Entdecke, was als Nächstes kommt.",
  visit: "fistbump.world besuchen",
  illustration: "Daisy und Astro, zwei illustrierte Charaktere aus der Fistbump-Welt.",
};

const fr: FistbumpCopy = {
  watch: "Voir le teaser animé",
  closeVideo: "Fermer la vidéo",
  videoNote: "L’équipe Fistbump passe d’un bonjour en ligne à une rencontre en vrai. Teaser animé original.",
  label: "Pour les curieux et les créateurs",
  live: "Disponible sur le web",
  headline: "Des rencontres. Des idées à suivre.",
  intro: "Suivez l’actualité IA. Trouvez des événements et des hackathons. Découvrez des projets et rencontrez vos contacts X en vrai. Choisissez ce qui vous intéresse et explorez.",
  meet: "Se rencontrer en vrai",
  news: "Découvrir l’actualité IA",
  meetShort: "Un café. Une balade. Un projet à construire ensemble.",
  newsShort: "Nouveaux modèles, recherche et annonces. À la source.",
  open: "Essayer Fistbump",
  explore: "Découvrez ce que vous pouvez faire",
  signIn: "Application web · Connexion avec X · 18 ans et plus",
  title: "Fistbump : rencontres, idées et actualité IA",
  description: "Fistbump : actualité IA, événements, hackathons, applications et programmes pour startups. Retrouvez vos contacts X et des idées à construire.",
  back: "Tous les projets",
  closing: "Votre prochaine découverte vous attend.",
  visit: "Visiter fistbump.world",
  illustration: "Daisy et Astro, deux personnages illustrés du monde de Fistbump.",
};

export function getFistbumpCopy(locale: string): FistbumpCopy {
  return locale === "de" ? de : locale === "fr" ? fr : en;
}
