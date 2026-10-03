/** Static copy and asset URLs for the editorial landing page. */

export const CLIENT_NAME = "Hamiz Khan";

/** Oversized footer crop mark — first name only; nav keeps CLIENT_NAME. */
export const FOOTER_WORDMARK = "HAMIZ";

export const PORTRAIT_URL = "/hamiz.jpeg";
/** Source dimensions for client portrait asset (3:4). */
export const PORTRAIT_ASPECT = "3 / 4" as const;
export const PORTRAIT_WIDTH = 1086;
export const PORTRAIT_HEIGHT = 1448;

/** Descriptive alt for hero portrait (LCP). */
export const PORTRAIT_ALT =
  "Hamiz Khan, video editor, portrait in a documentary-style frame";

export const HERO_SPARK_STAR = "/hero-spark-star.avif";
export const HERO_SPARK_BOLT = "/hero-spark-bolt.avif";

/** Hero headline — two lines, centred (profession until client supplies final copy). */
export const HERO_HEADLINE_LINES = ["VIDEO", "EDITOR"] as const;

export const HERO_COPYRIGHT = "©2026";

export const HERO_CREDIT_LINE = "/CREATING SINCE 2020";

export const QUOTE_COPY =
  "I make research-heavy science content myself, so I know how much work happens before a video ever reaches the timeline. The research, the structure, the difficult ideas, the endless decisions about what stays and what gets cut. When I edit for someone else, I bring that same understanding to the footage, finding the story, simplifying what feels dense, building the right rhythm, and taking the editing burden off your plate.";

export const FOOTER_HEADLINE_LINES = [
  "Let's shape",
  "your next",
  "great story.",
] as const;

export const CONTACT_EMAIL = "hello@hamizkhan.com";

export const SOCIAL_LINKS = [
  { href: "https://x.com/ntrovertsdiary", label: "X" },
  { href: "https://www.instagram.com/ntrovertsdiary", label: "Instagram" },
  { href: "https://www.linkedin.com/in/hamiz-khan-videoediting", label: "LinkedIn" },
  { href: "https://www.youtube.com/@ntrovertsdiary", label: "YouTube" },
] as const;

export const NAV_LINKS = [
  { href: "/#hero-section", label: "Home" },
  { href: "/#bio-section", label: "About Me" },
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Works" },
  { href: "/#contact", label: "Contact" },
] as const;

export const FOOTER_QUICK_LINKS = [
  { href: "/#hero-section", label: "Home" },
  { href: "/#bio-section", label: "About Me" },
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Works" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
] as const;
