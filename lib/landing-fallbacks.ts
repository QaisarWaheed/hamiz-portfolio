import type { ServiceRow } from "@/lib/landing-types";

/** Static about copy when the database is empty or unreachable. */
export const fallbackAbout = {
  headline: "Documentary pacing, technical clarity.",
  bio: "I edit video for people who have something real to say and not enough time to say it. I edit documentaries and technical content, most of it for a YouTube channel built around information and tech/science research. That means I don't just trim B-roll and drop in transitions. I track an argument across a 40-minute conversation, decide which 90 seconds of a researcher's tangent actually matters, and pace the cut so people stay through the dense parts instead of clicking off.",
};

/** Landing service rows (label + tag line) when the database is empty or unreachable. */
export const fallbackLandingServices = [
  {
    label: "Faceless documentary long-form",
    detail: "Long-form · Narrative · Motion graphics · Sound design",
  },
  {
    label: "AI & ML / technical videos",
    detail: "Research · Interviews · Screen recordings · Typography",
  },
  {
    label: "Face-cam YouTube videos",
    detail: "Talking-head · B-roll · Subtitles · Audio cleanup",
  },
  {
    label: "Long-form interviews",
    detail: "Multi-cam · Visualisations · Deep-dive · Pacing",
  },
  {
    label: "Video essays & explainers",
    detail: "Essays · Explainers · Chapter rhythm · Motion callouts",
  },
] as const;

export type LandingServiceDisplay = {
  label: string;
  detail: string;
};

/** MongoDB seed rows — mirrors fallbackLandingServices for admin. */
export const defaultServices: Omit<ServiceRow, "_id">[] = fallbackLandingServices.map(
  (service, order) => ({
    order,
    num: String(order + 1).padStart(2, "0"),
    title: service.label,
    description: service.detail,
    videoSource: "none" as const,
    videoUrl: "",
  })
);
