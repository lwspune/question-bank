/**
 * Decides whether a changeset warrants running `next build` in the gate.
 *
 * WHY THIS EXISTS. The gate runs `next build` on every push, in two places
 * (the pre-push hook and CI). That build prerenders 689 pages, ~317 of which
 * query Postgres — roughly 25 MB of egress and a couple of minutes, each time.
 * Measured over 30 days: 78 of 145 pushes to main changed nothing the compiler
 * reads (ingestion data + docs), so ~3.9 GB/month of database egress went on
 * builds that could not have failed. On the free tier that is most of the
 * 5 GB allowance. See the ROADMAP "Observability + ops" entry.
 *
 * THE POLARITY IS THE DESIGN. This is an allowlist of things safe to SKIP, not
 * an allowlist of things that need a build. Anything unrecognised — a new
 * top-level directory, a new config file, a rename — returns true and builds.
 * The rule can therefore only ever be too cautious, never too permissive, and
 * cannot silently rot as the repo grows. Getting this backwards would turn a
 * cost optimisation into a hole in the gate.
 *
 * WHAT MAKES A PATH INERT. Only that `next build` cannot read it: nothing under
 * `src/` imports from `scripts/`, `supabase/` or `tests/` (verified 2026-08-05,
 * and the leading-segment match below is what keeps `src/scripts/...` out of
 * the inert set). Note that a data change CAN still break a build — a chapter
 * name yielding an empty slug, say — but that depends on when the DATABASE
 * changed, not on what a commit touched, so no commit-diff rule can catch it
 * either way. Vercel's deploy build remains the backstop for that class.
 */

/**
 * Leading path segments whose contents `next build` never reads.
 * Matched on the FIRST segment only, so `src/tests/fixture.ts` is app code.
 */
const INERT_ROOTS = [
  "tests/",
  "scripts/",
  "supabase/",
  "generated-papers/",
] as const;

/** Normalise a raw `git diff --name-only` line for classification. */
function normalise(path: string): string {
  return path.trim().replace(/\\/g, "/");
}

/** True when `next build` cannot possibly observe this file. */
function isInert(path: string): boolean {
  // Markdown at any depth: docs, runbooks, briefs, errata reports.
  if (path.toLowerCase().endsWith(".md")) return true;
  return INERT_ROOTS.some((root) => path.startsWith(root));
}

/**
 * True when at least one changed path could affect the build output.
 *
 * @param changedPaths Repo-relative paths, e.g. from `git diff --name-only`.
 *                     Blank lines are ignored; separators may be `/` or `\`.
 */
export function needsBuild(changedPaths: string[]): boolean {
  return changedPaths
    .map(normalise)
    .filter((p) => p.length > 0)
    .some((p) => !isInert(p));
}

/** The build-relevant subset, for logging why the gate chose to build. */
export function buildRelevantPaths(changedPaths: string[]): string[] {
  return changedPaths
    .map(normalise)
    .filter((p) => p.length > 0 && !isInert(p));
}
