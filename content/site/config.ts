export const LAST_UPDATED = "October 2026";

export const siteConfig = {
  name: "Sinda Khenine",
  title: "Sinda Khenine | Founder of SKatalyst AI & AI Engineer",
  headline: "Senior AI, Data & Business Intelligence Engineer",
  identity: "Founder of SKatalyst AI · ML Conference Speaker",
  lastUpdated: LAST_UPDATED,
  // Keep personal-site identity and canonicals stable in every environment.
  url: "https://sindakhenine.com",
  description: "Sinda Khenine, founder of SKatalyst AI and Senior AI, Data & BI Engineer. Building AI orchestration, agent systems and enterprise data platforms.",
  email: "founder@skatalystai.com",
  companyUrl: "https://skatalystai.com",
  navigation: [["Home","/"],["About","/about"],["Projects","/projects"],["Speaking","/speaking"],["Writing","/writing"],["Book","/book"],["Resume","/resume"],["Contact","/contact"]] as const,
  social: { linkedin: "https://www.linkedin.com/in/sinda-khenine-67545614b/", x: "https://x.com/SKatalystAI" },
  newsletterProvider: "disabled-pending-double-opt-in",
  purchaseLinks: { status: "coming-soon", ebook: null, paperback: null, hardcover: null, audiobook: null },
  publicationStages: ["Manuscript complete","Production design complete","Human proofreading in progress","Platform previews pending","Physical proofs pending","Publication upcoming","Audiobook recording upcoming"],
  mediaKit: "/book/press",
  features: { research: true, analytics: false }
} as const;
