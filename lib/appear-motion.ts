import easings from "@/lib/framer-appear-easings.json";
import type { Easing } from "framer-motion";

/** Measured on majd-portfolio.framer.website — section appear (not cubic-bezier). */
export const APPEAR_EASE_1800 = easings["1800"] as unknown as Easing;
export const APPEAR_EASE_1400 = easings["1400"] as unknown as Easing;

/** translateY start from intercepted Framer appear transform keyframes */
export const APPEAR_Y = 10;

/** Primary section appear duration (ms → s) */
export const APPEAR_DURATION = 1.8;

/** Contact / staggered child appear duration */
export const APPEAR_DURATION_STAGGER = 1.4;

/** Stagger between sibling appears */
export const APPEAR_STAGGER = 0.05;
