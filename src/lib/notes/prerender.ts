/**
 * Which notes subtopic pages a build prerenders.
 *
 * A LOCAL build prerenders only the FIRST subtopic of each chapter; the rest
 * render on first visit. The first subtopic still renders every chapter's
 * layout and data shape once, so a render bug in the shared page fails the
 * build.
 *
 * A FULL build prerenders every subtopic. It is full when:
 *  - `NOTES_FULL_PRERENDER=1`: set by hand for a local build that must prove
 *    every notes page (the pre-push hook set it until 2026-10-09, when the
 *    hook stopped building: that full local build is what took the
 *    production database down that day);
 *  - `VERCEL` is set: the live site keeps every page prebuilt. A page built on
 *    first visit costs that visitor ~2-2.6 s, and Vercel drops those copies on
 *    every deploy, so Google would nearly always be the slow first visitor.
 *    That is why /questions went back to prebuilding everything on 2026-09-17.
 *
 * Why the local sample: on 2026-10-04 two back-to-back local builds took the
 * production database down. The 1,352 subtopic pages were the bulk of each
 * build's queries.
 */
export function notesPrerenderParams(
  slugs: readonly string[],
  full: boolean = process.env.NOTES_FULL_PRERENDER === "1" || Boolean(process.env.VERCEL)
): { subtopicSlug: string }[] {
  const chosen = full ? slugs : slugs.slice(0, 1);
  return chosen.map((subtopicSlug) => ({ subtopicSlug }));
}
