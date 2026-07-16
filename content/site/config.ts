export const siteConfig = {
  name: "Sinda Khenine",
  title: "Sinda Khenine | Enterprise Data and Reliable AI",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sindakhenine.com",
  description: "Senior Big Data and Business Intelligence Engineer, enterprise AI and data architect, founder of SKatalyst AI, author and international conference speaker.",
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
