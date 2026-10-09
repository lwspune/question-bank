/**
 * Share one in-progress load between callers asking for the same thing at the
 * same time.
 *
 * A build starts hundreds of pages at once, and `unstable_cache` (or any
 * store-the-answer cache) keeps a result only AFTER the first load finishes, so
 * every page that starts in that gap runs the load as well. On 2026-10-06 the
 * ~475-request chapter table ran ~9 times in a healthy build and ~58 times in
 * one where the database was slow, which kept it slow: two thirds of that
 * build's 43,069 requests, and a 7-minute slowdown of the live site. Wrapping
 * the load caps it at once per process, however slow the database is.
 *
 * In-progress loads only: the entry is dropped the moment the load settles, so
 * this never serves anything staler than the cache underneath it.
 *
 * FAILURES, optionally remembered (2026-10-09). Sharing only the in-progress
 * load left a hole that took production down: when the database slowed past
 * the statement timeout, every shared load FAILED, its entry was dropped, and
 * the next page ran it again — `mock_tests` was fetched 503 times in two
 * minutes (0-7 on a healthy day), each a heavy query, which kept the database
 * slow. With `rememberFailureMs` a failure is re-served to callers for that
 * long, so a slow database is asked once per window per process. A SUCCESS is
 * never remembered: freshness stays with the cache underneath. The default is
 * 0 (the old behaviour); the build passes lib/cache/buildPhase's window, a
 * live render passes nothing.
 *
 * The maps live on globalThis so every route bundle in a process shares them,
 * even if the bundler gives two routes their own copy of this module.
 */
const KEY = Symbol.for("pyqvault.singleFlight");
const FAIL_KEY = Symbol.for("pyqvault.singleFlight.failures");

type Store = Map<string, Promise<unknown>>;
type Failures = Map<string, { until: number; error: unknown }>;

function store(): Store {
  const g = globalThis as unknown as Record<symbol, Store | undefined>;
  return (g[KEY] ??= new Map());
}

function failures(): Failures {
  const g = globalThis as unknown as Record<symbol, Failures | undefined>;
  return (g[FAIL_KEY] ??= new Map());
}

export type SingleFlightOptions = {
  /** Re-serve a failure to later callers for this long (ms). 0 = never. */
  rememberFailureMs?: number;
};

export function singleFlight<T>(
  key: string,
  load: () => Promise<T>,
  { rememberFailureMs = 0 }: SingleFlightOptions = {}
): Promise<T> {
  const inFlight = store();
  const existing = inFlight.get(key);
  if (existing) return existing as Promise<T>;

  if (rememberFailureMs > 0) {
    const remembered = failures().get(key);
    if (remembered) {
      if (Date.now() < remembered.until) return Promise.reject(remembered.error);
      failures().delete(key);
    }
  }

  let started: Promise<T>;
  try {
    started = load();
  } catch (err) {
    return Promise.reject(err);
  }
  const shared = started
    .then(
      (value) => value,
      (err: unknown) => {
        if (rememberFailureMs > 0) {
          failures().set(key, { until: Date.now() + rememberFailureMs, error: err });
        }
        throw err;
      }
    )
    .finally(() => inFlight.delete(key));
  inFlight.set(key, shared);
  return shared;
}
