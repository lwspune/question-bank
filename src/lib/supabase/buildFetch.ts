/**
 * The fetch every server-side Supabase client uses DURING `next build`: one
 * throttled fetch per process (lib/supabase/throttledFetch), shared by the
 * anon, admin and cookie clients so the cap is on the process, not on each
 * client. Outside a build it returns undefined and supabase-js uses its own
 * fetch, so a live render, a route handler or a script is never throttled.
 *
 * The numbers: a healthy page's requests answer in 15-50 ms, so 10 in flight
 * is ~200-600 requests a second per worker — far more than a build needs, but
 * a hard ceiling on what a slow database is asked to hold. 20 s is longer
 * than any statement timeout the build's roles carry (anon 3 s, authenticated
 * 8 s), so it only ever fires on a request that is stuck in a queue, which is
 * the one kind that should give up.
 */
import { isBuildPhase } from "@/lib/cache/buildPhase";
import { createThrottledFetch } from "./throttledFetch";

export const BUILD_MAX_IN_FLIGHT = 10;
export const BUILD_FETCH_TIMEOUT_MS = 20_000;

const KEY = Symbol.for("pyqvault.buildFetch");

export function buildFetch(): typeof globalThis.fetch | undefined {
  if (!isBuildPhase()) return undefined;
  const g = globalThis as unknown as Record<symbol, typeof globalThis.fetch | undefined>;
  // Resolve the global fetch at call time: Next patches it for its data cache.
  return (g[KEY] ??= createThrottledFetch((input, init) => fetch(input, init), {
    maxInFlight: BUILD_MAX_IN_FLIGHT,
    timeoutMs: BUILD_FETCH_TIMEOUT_MS,
  }));
}
