/** Defaults for editorial landing — seed + admin reset reference */

export const defaultServices = [
  {
    order: 0,
    num: "[01]",
    title: "Faceless YouTube Documentaries",
    description:
      "Long-form narrative edits with AI-generated visuals, archival footage, stock, motion graphics and original sound design. Think true-crime, geopolitics, history, explainer-essays. I handle prompt generation, scene assembly, pacing and mix.",
    videoSource: "none" as const,
    videoUrl: "",
  },
  {
    order: 1,
    num: "[02]",
    title: "Technical Tutorials & Explainers",
    description:
      "Screen-recording edits with motion callouts, zooms, diagrams and clean typography. Works for software walkthroughs, course modules, AI/ML lectures and developer content. Clear signal, no fluff.",
    videoSource: "none" as const,
    videoUrl: "",
  },
  {
    order: 2,
    num: "[03]",
    title: "Face-Cam YouTube Videos",
    description:
      "Talking-head edits with B-roll, jump-cut pacing, subtitles, overlay graphics and audio cleanup. Built for creators who want retention without looking over-edited.",
    videoSource: "none" as const,
    videoUrl: "",
  },
];

export const defaultPricingTiers = [
  {
    order: 0,
    name: "Short-Form",
    who: "Face-cam videos, social cuts, short explainers",
    priceAmt: "[SAMPLE]",
    priceUnit: "from $150 / video",
    featured: false,
    badge: "",
    features: [
      "Up to 10 minutes final length",
      "Jump cuts, B-roll, subtitles",
      "Basic motion graphics",
      "Audio cleanup & mix",
      "2 rounds of revisions",
      "48–72 hour turnaround",
    ],
    bookLabel: "Start a project",
  },
  {
    order: 1,
    name: "Long-Form",
    who: "Documentaries, video essays, deep-dive content",
    priceAmt: "[SAMPLE]",
    priceUnit: "from $450 / video",
    featured: true,
    badge: "Most Hired",
    features: [
      "10–30 minutes final length",
      "AI-generated visual pipeline",
      "Archival + stock footage sourcing",
      "Full motion graphics & titles",
      "Sound design & music licensing",
      "Unlimited revisions within scope",
      "5–7 day turnaround",
    ],
    bookLabel: "Start a project",
  },
  {
    order: 2,
    name: "Monthly Retainer",
    who: "Channels shipping 4+ videos per month",
    priceAmt: "[SAMPLE]",
    priceUnit: "from $2,000 / month",
    featured: false,
    badge: "",
    features: [
      "Priority slot on my calendar",
      "Dedicated workflow & presets",
      "Weekly sync calls",
      "Faster turnaround on every video",
      "Pricing locked for 6 months",
    ],
    bookLabel: "Inquire",
  },
];
