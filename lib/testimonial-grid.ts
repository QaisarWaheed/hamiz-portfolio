/**
 * Testimonial grid columns are capped at 4 to match the reference design's
 * maximum 4-up layout — do not raise this cap without updating the design spec.
 */
const TESTIMONIAL_MAX_COLUMNS = 4;

const TESTIMONIAL_GRID_BY_COUNT: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
};

/** 4+ items: 1 col mobile, 2 md (even rows for multiples of 2), 4 lg (reference 4-up). */
const TESTIMONIAL_GRID_FOUR_OR_MORE = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

export function testimonialGridClass(itemCount: number): string {
  if (itemCount <= 0) return "grid-cols-1";
  if (itemCount <= TESTIMONIAL_MAX_COLUMNS) {
    return TESTIMONIAL_GRID_BY_COUNT[itemCount] ?? TESTIMONIAL_GRID_FOUR_OR_MORE;
  }
  return TESTIMONIAL_GRID_FOUR_OR_MORE;
}
