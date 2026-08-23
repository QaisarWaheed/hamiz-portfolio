import { revalidatePath } from "next/cache";

/** Bust ISR for the landing page after admin CMS writes. */
export function revalidateHomepage(): void {
  revalidatePath("/");
}
