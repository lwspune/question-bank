/**
 * Are we inside `next build`?
 *
 * Next sets NEXT_PHASE=phase-production-build in the build process
 * (next/dist/build/index.js) and every page worker inherits process.env
 * (next/dist/lib/worker.js), so this is true wherever a page is being
 * prerendered and false for a live render, a script or a test.
 *
 * Two protections key off it, both added 2026-10-09 after a local build took
 * the production database down for the second time:
 *  - lib/supabase/buildFetch caps the requests a build keeps in flight and
 *    gives up on any one of them after a deadline;
 *  - lib/cache/singleFlight remembers a shared load's FAILURE for a short
 *    window, so a slow database is asked once per window, not once per page.
 * Neither touches a live page: the live site's request shape is one visitor at
 * a time, and a 15 s memory of a failure there would be 15 s of degraded
 * pages for every visitor.
 */
export const PRODUCTION_BUILD_PHASE = "phase-production-build";

export function isBuildPhase(
  env: Record<string, string | undefined> = process.env
): boolean {
  return env.NEXT_PHASE === PRODUCTION_BUILD_PHASE;
}

/**
 * How long a shared load remembers a failure during a build. Long enough that
 * the pages a worker starts in the meantime (a few a second) all fail fast
 * instead of each re-asking the database; short enough that a passing blip
 * costs one window, not the build.
 */
export const BUILD_FAILURE_MEMO_MS = 15_000;

/** The failure memo a shared load should use: the build window, or none. */
export function buildFailureMemoMs(
  env: Record<string, string | undefined> = process.env
): number {
  return isBuildPhase(env) ? BUILD_FAILURE_MEMO_MS : 0;
}
