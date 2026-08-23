/** Static copy and asset URLs for the editorial landing page. */

export const CLIENT_NAME = "Hamiz Khan";

export const FIGMA_ASSETS_BASE =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7";

export const PORTRAIT_URL = `${FIGMA_ASSETS_BASE}/Rectangle_40443.81459862.png`;

export const HERO_SPARK_ONE = "/hero-spark-1.placeholder.png";
export const HERO_SPARK_TWO = "/hero-spark-2.placeholder.png";

export const HERO_EYEBROW = "Video editor";

export const HERO_TAGLINE =
  "Editor for documentaries and technical videos — long-form narrative, research interviews, and YouTube content that keeps people watching.";

export const BIO =
  "I edit video for people who have something real to say and not enough time to say it. I edit documentaries and technical content, most of it for a YouTube channel built around information and tech/science research. That means I don't just trim B-roll and drop in transitions. I track an argument across a 40-minute conversation, decide which 90 seconds of a researcher's tangent actually matters, and pace the cut so people stay through the dense parts instead of clicking off.";

export const QUOTE_COPY =
  "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.";

export const FOOTER_HEADLINE_LINES = [
  "Let's shape",
  "your next",
  "great story.",
] as const;

export const CONTACT_EMAIL = "hello@hamizkhan.com";

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

export const FOOTER_QUICK_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    label: "Faceless documentary long-form",
    tags: ["Long-form", "Narrative", "Motion graphics", "Sound design"],
  },
  {
    label: "AI & ML / technical videos",
    tags: ["Research", "Interviews", "Screen recordings", "Typography"],
  },
  {
    label: "Face-cam YouTube videos",
    tags: ["Talking-head", "B-roll", "Subtitles", "Audio cleanup"],
  },
  {
    label: "Long-form interviews",
    tags: ["Multi-cam", "Visualisations", "Deep-dive", "Pacing"],
  },
  {
    label: "Video essays & explainers",
    tags: ["Essays", "Explainers", "Chapter rhythm", "Motion callouts"],
  },
] as const;
