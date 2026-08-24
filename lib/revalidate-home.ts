import { revalidatePath } from "next/cache";

/** Bust ISR for landing and work index after admin CMS writes. */
export function revalidateHomepage(): void {
  revalidatePath("/");
  revalidatePath("/work");
}
