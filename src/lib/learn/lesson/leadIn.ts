// Copied from Concept Ladder (src/content/leadIn.ts, afca8bf).
/** A bold lead-in ending in a full stop or colon: "**Directed angle.** ..." (not a bold term mid-sentence). */
const LEAD_IN = /^\*\*([^*]+?)(?:[.:]\*\*|\*\*[.:])\s+/;
/** Longer lead-ins are sentences, not titles: they stay in the body. */
const TITLE_MAX_WORDS = 6;

/** A formal section's title (its bold lead-in) and the body without it; null when it has none. */
export function leadIn(body: string): { title: string; rest: string } | null {
  const m = LEAD_IN.exec(body);
  if (!m) return null;
  const title = m[1].trim();
  return title.split(/\s+/).length <= TITLE_MAX_WORDS ? { title, rest: body.slice(m[0].length) } : null;
}
