/**
 * Which notes subtopic pages a build prerenders.
 *
 * - `sample` (a LOCAL build): only the FIRST subtopic of each chapter; the rest
 *   render on first visit. The first subtopic still renders every chapter's
 *   layout and data shape once, so a render bug in the shared page fails the
 *   build. Why: on 2026-10-04 two back-to-back local builds took the production
 *   database down; the notes subtopic pages were the bulk of each build's queries.
 * - `hot` (a Vercel build, since 2026-11-05): the first subtopic of each chapter
 *   plus every subtopic read 2+ times in the measured window
 *   (src/lib/seo/prerenderHotPaths.ts; TECH_DEBT_SPEC.md 2.3, owner decision D2 c).
 *   923 of 2,314 pages. The rest render on their first visit (~2-2.6 s for that
 *   visitor) and are then cached for a day; 1,351 of them had no view in 18 days.
 * - `all`: every subtopic. `NOTES_FULL_PRERENDER=1` (a local build that must prove
 *   every notes page) or `PRERENDER_ALL=1` (the way back on Vercel).
 */
import { HOT_NOTES_SUBTOPICS } from "@/lib/seo/prerenderHotPaths";
import { hotOnly } from "@/lib/seo/prerenderBudget";

export type NotesPrerenderMode = "sample" | "hot" | "all";

export function notesPrerenderMode(env: Record<string, string | undefined> = process.env): NotesPrerenderMode {
  if (env.NOTES_FULL_PRERENDER === "1" || env.PRERENDER_ALL === "1") return "all";
  return env.VERCEL ? "hot" : "sample";
}

/** `chapterKey` is `<subjectRoute>/<chapterSlug>`, the hot list's prefix. */
export function notesPrerenderParams(
  chapterKey: string,
  slugs: readonly string[],
  mode: NotesPrerenderMode = notesPrerenderMode(),
  hot: readonly string[] = HOT_NOTES_SUBTOPICS
): { subtopicSlug: string }[] {
  let chosen: readonly string[];
  if (mode === "all") chosen = slugs;
  else if (mode === "sample") chosen = slugs.slice(0, 1);
  else {
    const hotSlugs = new Set(hotOnly(slugs, (s) => `${chapterKey}/${s}`, hot, true));
    chosen = slugs.filter((s, i) => i === 0 || hotSlugs.has(s));
  }
  return chosen.map((subtopicSlug) => ({ subtopicSlug }));
}
