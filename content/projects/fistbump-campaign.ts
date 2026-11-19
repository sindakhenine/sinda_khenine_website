export type FistbumpGuide = {id:string;name:string;label:string;title:string;description:string;action:string;href:string;width:number;height:number};
export type FistbumpCampaign = {choose:string;world:string;learning:string;learningTitle:string;learningIntro:string;steps:{title:string;detail:string;href:string}[];tour:string;tourNote:string;creator:string;guides:FistbumpGuide[]};
const en: FistbumpCampaign = {
  choose:"Pick your guide", world:"A little world. A lot to discover.",
  learning:"Learn by doing", learningTitle:"From news to your next build.",
  learningIntro:"Follow an announcement, try a community app, then find a hackathon to put an idea into practice.",
  steps:[
    {title:"Follow an idea.",detail:"AI releases and research, with links to the original sources.",href:"https://app.fistbump.world/?open=news"},
    {title:"Try something real.",detail:"Explore what other builders have made. Give them useful feedback.",href:"https://app.fistbump.world/?open=discover"},
    {title:"Put it into practice.",detail:"Find a hackathon, choose a challenge and start building.",href:"https://app.fistbump.world/?open=hackathons"},
  ],
  tour:"A look inside AI news", tourNote:"Recorded product tour · Interface in English", creator:"Created by Sinda Khenine",
  guides:[
    {id:"drizzle",name:"Drizzle",label:"Build & learn",title:"Give that idea a first version.",description:"Find online and in-person hackathons. Choose a challenge that makes you want to build.",action:"Find a hackathon",href:"https://app.fistbump.world/?open=hackathons",width:280,height:461},
    {id:"echo",name:"Echo",label:"Try new apps",title:"Someone made something worth trying.",description:"Discover community apps, try them out and tell their makers what you think.",action:"Explore community apps",href:"https://app.fistbump.world/?open=discover",width:329,height:535},
    {id:"astro",name:"Astro",label:"Follow AI",title:"Your AI reading starts here.",description:"New models, research and releases from OpenAI, Anthropic, Google DeepMind and more. Go straight to the source.",action:"Explore AI news",href:"https://app.fistbump.world/?open=news",width:302,height:498},
    {id:"daisy",name:"Daisy",label:"Meet people",title:"Turn a familiar profile into a hello.",description:"Find your X connections on the map. Suggest a coffee, a walk or something to build together.",action:"Find your people",href:"https://app.fistbump.world/",width:374,height:502},
    {id:"sleuth",name:"Sleuth",label:"Find events",title:"There’s a room you’d like to be in.",description:"Discover AI meetups, demo nights and talks. Find an event and follow its registration link.",action:"Discover events",href:"https://app.fistbump.world/?open=events",width:325,height:537},
  ],
};
const de: FistbumpCampaign = {
  choose:"Wähle deinen Begleiter", world:"Eine kleine Welt. Viel zu entdecken.",
  learning:"Beim Ausprobieren lernen", learningTitle:"Von der Nachricht zum eigenen Projekt.",
  learningIntro:"Lies eine Ankündigung, teste eine Community-App und finde einen Hackathon, bei dem du eine Idee umsetzen kannst.",
  steps:[
    {title:"Einer Idee folgen.",detail:"KI-Neuheiten und Forschung mit Links zu den Originalquellen.",href:en.steps[0].href},
    {title:"Etwas Neues ausprobieren.",detail:"Entdecke die Projekte anderer und gib hilfreiches Feedback.",href:en.steps[1].href},
    {title:"Selbst etwas umsetzen.",detail:"Finde einen Hackathon, wähle eine Herausforderung und leg los.",href:en.steps[2].href},
  ],
  tour:"Ein Blick in die KI-News",tourNote:"Aufgezeichnete Produkttour · Oberfläche auf Englisch",creator:"Entwickelt von Sinda Khenine",
  guides:[
    {...en.guides[0],label:"Bauen & lernen",title:"Mach aus deiner Idee eine erste Version.",description:"Finde Hackathons online und vor Ort. Wähle eine Herausforderung, für die du etwas entwickeln möchtest.",action:"Einen Hackathon finden"},
    {...en.guides[1],label:"Apps testen",title:"Jemand hat etwas gebaut. Probier es aus.",description:"Entdecke Community-Apps, teste sie und sag den Entwicklern, was du denkst.",action:"Community-Apps entdecken"},
    {...en.guides[2],label:"KI entdecken",title:"Hier beginnt dein Blick auf KI.",description:"Neue Modelle, Forschung und Updates von OpenAI, Anthropic, Google DeepMind und anderen. Direkt zur Quelle.",action:"KI-News entdecken"},
    {...en.guides[3],label:"Leute treffen",title:"Vom bekannten Profil zum ersten Hallo.",description:"Finde deine X-Kontakte auf der Karte. Schlage einen Kaffee, einen Spaziergang oder ein gemeinsames Projekt vor.",action:"Deine Leute finden"},
    {...en.guides[4],label:"Events finden",title:"Finde eine Veranstaltung, die zu dir passt.",description:"Entdecke KI-Meetups, Demo-Abende und Vorträge. Sieh dir ein Event an und folge dem Link zur Anmeldung.",action:"Events entdecken"},
  ],
};
const fr: FistbumpCampaign = {
  choose:"Choisissez votre guide",world:"Un petit monde. Beaucoup à découvrir.",
  learning:"Apprendre en pratiquant",learningTitle:"De l’actualité à votre prochain projet.",
  learningIntro:"Suivez une annonce, essayez une application de la communauté, puis trouvez un hackathon pour mettre une idée en pratique.",
  steps:[
    {title:"Suivre une idée.",detail:"Nouveautés IA et recherche, avec des liens vers les sources originales.",href:en.steps[0].href},
    {title:"Essayer un vrai projet.",detail:"Découvrez ce que les autres créent et donnez-leur des retours utiles.",href:en.steps[1].href},
    {title:"Passer à la pratique.",detail:"Trouvez un hackathon, choisissez un défi et commencez à créer.",href:en.steps[2].href},
  ],
  tour:"Un aperçu de l’actualité IA",tourNote:"Visite enregistrée du produit · Interface en anglais",creator:"Créé par Sinda Khenine",
  guides:[
    {...en.guides[0],label:"Créer & apprendre",title:"Donnez une première version à votre idée.",description:"Trouvez des hackathons en ligne ou sur place. Choisissez un défi qui vous donne envie de créer.",action:"Trouver un hackathon"},
    {...en.guides[1],label:"Essayer des apps",title:"Quelqu’un a créé quelque chose. Essayez-le.",description:"Découvrez les applications de la communauté, testez-les et partagez votre avis avec leurs créateurs.",action:"Découvrir les applications"},
    {...en.guides[2],label:"Suivre l’IA",title:"Votre lecture de l’IA commence ici.",description:"Nouveaux modèles, recherche et annonces d’OpenAI, Anthropic, Google DeepMind et d’autres acteurs. Directement à la source.",action:"Explorer l’actualité IA"},
    {...en.guides[3],label:"Se rencontrer",title:"D’un profil familier à un vrai bonjour.",description:"Retrouvez vos contacts X sur la carte. Proposez un café, une balade ou un projet à construire ensemble.",action:"Retrouver vos contacts"},
    {...en.guides[4],label:"Trouver un événement",title:"Trouvez une salle où vous aimeriez être.",description:"Découvrez des rencontres IA, soirées démo et conférences, puis suivez leur lien d’inscription.",action:"Découvrir les événements"},
  ],
};
export const getFistbumpCampaign = (locale:string):FistbumpCampaign => locale === "de" ? de : locale === "fr" ? fr : en;
