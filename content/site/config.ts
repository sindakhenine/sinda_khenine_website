export const LAST_UPDATED = "August 2026";

export const siteConfig = {
  name: "Sinda Khenine",
  title: "Sinda Khenine | Engineer, Founder, Speaker, Author",
  lastUpdated: LAST_UPDATED,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sindakhenine.com",
  description: "Sinda Khenine is an engineer, founder, speaker and author. Data and AI engineering, autonomous agents, products, interactive experiments and writing: building to understand.",
  email: "founder@skatalystai.com",
  companyUrl: "https://skatalystai.com",
  navigation: [["Home","/"],["About","/about"],["Projects","/projects"],["Speaking","/speaking"],["Writing","/writing"],["Book","/book"],["Resume","/resume"],["Contact","/contact"]] as const,
  social: { linkedin: "[TBD: VERIFIED PUBLIC PROFILE]", x: "[TBD: VERIFIED PUBLIC PROFILE]" },
  newsletterProvider: "disabled-pending-double-opt-in",
  purchaseLinks: { status: "coming-soon", ebook: null, paperback: null, hardcover: null, audiobook: null },
  publicationStages: ["Manuscript complete","Production design complete","Human proofreading in progress","Platform previews pending","Physical proofs pending","Publication upcoming","Audiobook recording upcoming"],
  mediaKit: "[TBD: AUTHOR-APPROVED MEDIA KIT URL]",
  features: { research: true, analytics: false }
} as const;
