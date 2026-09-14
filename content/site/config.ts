export const LAST_UPDATED = "September 2026";

export const siteConfig = {
  name: "Sinda Khenine",
  title: "Sinda Khenine | AI & Data Engineer, Founder, Speaker",
  headline: "Senior AI, Data & Business Intelligence Engineer",
  identity: "Founder of SKatalyst AI · ML Conference Speaker",
  lastUpdated: LAST_UPDATED,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sindakhenine.com",
  description: "Sinda Khenine is a Senior AI, Data & Business Intelligence Engineer, founder of SKatalyst AI and ML Conference speaker. AI orchestration, agent systems, context engineering and software development with frontier AI coding agents.",
  email: "founder@skatalystai.com",
  companyUrl: "https://skatalystai.com",
  navigation: [["Home","/"],["About","/about"],["Projects","/projects"],["Speaking","/speaking"],["Writing","/writing"],["Book","/book"],["Resume","/resume"],["Contact","/contact"]] as const,
  social: { linkedin: "https://www.linkedin.com/in/sinda-khenine-67545614b/", x: "https://x.com/SKatalystAI" },
  newsletterProvider: "disabled-pending-double-opt-in",
  purchaseLinks: { status: "coming-soon", ebook: null, paperback: null, hardcover: null, audiobook: null },
  publicationStages: ["Manuscript complete","Production design complete","Human proofreading in progress","Platform previews pending","Physical proofs pending","Publication upcoming","Audiobook recording upcoming"],
  mediaKit: "[TBD: AUTHOR-APPROVED MEDIA KIT URL]",
  features: { research: true, analytics: false }
} as const;
