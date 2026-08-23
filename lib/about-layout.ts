/** Split bio copy into intro (first sentence) and body (remainder) for two-column layout. */
export function splitAboutBio(bio: string): { intro: string; body: string } {
  const trimmed = bio.trim();
  if (!trimmed) return { intro: "", body: "" };

  const match = trimmed.match(/^(.+?[.!?])(?:\s+([\s\S]+))?$/);
  if (!match) return { intro: trimmed, body: "" };

  return {
    intro: match[1].trim(),
    body: (match[2] ?? "").trim(),
  };
}
