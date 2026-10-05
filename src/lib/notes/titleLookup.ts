import { getNotesChapterBySlug } from "./chapters";

/**
 * Real topic and chapter names for a handful of notes topics, for browser
 * islands that only hold slugs (the /notes "Your notes" strip printed
 * "Jch Sbc Mole"). Server-only: reads the notes registry, which must never
 * reach a client bundle; served by /api/notes/titles.
 * Spec: tests/notes-titles-lookup.test.ts.
 */
export const MAX_TITLE_KEYS = 24;

/** "subjectRoute/chapterSlug/subtopicSlug", lowercase slugs only. */
const KEY_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Well-formed keys only, de-duplicated, at most MAX_TITLE_KEYS. */
export function parseTitleKeys(raw: readonly string[]): string[] {
  const out: string[] = [];
  for (const k of raw) {
    if (KEY_RE.test(k) && !out.includes(k)) out.push(k);
    if (out.length === MAX_TITLE_KEYS) break;
  }
  return out;
}

/** Names for the keys the registry knows; unknown keys are left out. */
export function titlesForKeys(
  keys: readonly string[]
): Record<string, { topic: string; chapter: string }> {
  const out: Record<string, { topic: string; chapter: string }> = {};
  for (const key of keys) {
    const [subjectRoute, chapterSlug, subtopicSlug] = key.split("/");
    const reg = getNotesChapterBySlug(subjectRoute, chapterSlug);
    const note = reg?.notes[subtopicSlug];
    if (reg && note) out[key] = { topic: note.title, chapter: reg.chapter.chapterName };
  }
  return out;
}
