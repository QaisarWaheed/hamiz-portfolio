/** Public asset URLs for landing v3 (Figma Make export + portfolio placeholders). */

export const FIGMA_ASSETS_BASE =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7";

export const PORTRAIT_URL = `${FIGMA_ASSETS_BASE}/Rectangle_40443.81459862.png`;

export const ABOUT_CORNER_IMAGES = {
  topLeft: {
    src: `${FIGMA_ASSETS_BASE}/Group_134.2e04f3ce.png`,
    className: "absolute left-4 top-16 w-24 sm:left-8 sm:top-20 sm:w-32 md:left-10 md:top-24 md:w-44 lg:w-52",
    alt: "",
  },
  topRight: {
    src: `${FIGMA_ASSETS_BASE}/moon_icon.11395d36.png`,
    className: "absolute right-4 top-28 w-20 sm:right-8 sm:top-32 sm:w-28 md:right-12 md:top-36 md:w-36",
    alt: "",
  },
  bottomLeft: {
    src: `${FIGMA_ASSETS_BASE}/lego_icon.703bb594.png`,
    className: "absolute bottom-28 left-6 w-24 sm:bottom-32 sm:left-10 sm:w-32 md:bottom-36 md:w-40",
    alt: "",
  },
  bottomRight: {
    src: `${FIGMA_ASSETS_BASE}/p59_1.4659672e.png`,
    className: "absolute bottom-16 right-4 w-28 sm:bottom-20 sm:right-8 sm:w-36 md:bottom-24 md:w-44",
    alt: "",
  },
} as const;

/** 21 marquee GIF frames (MotionSites hero previews). */
export const MARQUEE_IMAGES: string[] = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

export const SERVICES = [
  {
    num: "01",
    name: "Faceless documentary long-form",
    description:
      "10–90 minute narrative edits with AI-generated visuals, archival footage, stock, motion graphics, and original sound design for true-crime, geopolitics, history, and explainer essays.",
  },
  {
    num: "02",
    name: "AI & ML / technical videos",
    description:
      "Research and interview episodes with clean speaker cuts, diagram overlays, screen recordings, and typography built for audiences who finish the video.",
  },
  {
    num: "03",
    name: "Face-cam YouTube videos",
    description:
      "Talking-head edits with B-roll, jump-cut pacing, subtitles, overlay graphics, and audio cleanup — retention without over-editing.",
  },
  {
    num: "04",
    name: "Long-form interviews",
    description:
      "Multi-cam sync, paper visualisations, formula animations, and pacing tuned for deep-dive conversations with researchers and creators.",
  },
  {
    num: "05",
    name: "Video essays & explainers",
    description:
      "Structured storytelling for essay and explainer channels — motion callouts, chapter rhythm, and a mix that holds attention start to finish.",
  },
] as const;
