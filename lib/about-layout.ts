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

/** Split body copy into two paragraphs for the bio right column. */
export function splitBioBodyParagraphs(body: string): [string, string] {
  const trimmed = body.trim();
  if (!trimmed) return ["", ""];

  const paragraphs = trimmed.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length >= 2) {
    return [paragraphs[0], paragraphs.slice(1).join("\n\n")];
  }

  const sentences = trimmed.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)?.map((s) => s.trim()) ?? [trimmed];
  if (sentences.length <= 1) return [trimmed, ""];

  const mid = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, mid).join(" "), sentences.slice(mid).join(" ")];
}
