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
 * this never serves anything staler than the cache underneath it, and a failure
 * is retried by the next caller rather than remembered.
 *
 * The map lives on globalThis so every route bundle in a process shares it,
 * even if the bundler gives two routes their own copy of this module.
 */
const KEY = Symbol.for("pyqvault.singleFlight");

type Store = Map<string, Promise<unknown>>;

function store(): Store {
  const g = globalThis as unknown as Record<symbol, Store | undefined>;
  return (g[KEY] ??= new Map());
}

export function singleFlight<T>(key: string, load: () => Promise<T>): Promise<T> {
  const inFlight = store();
  const existing = inFlight.get(key);
  if (existing) return existing as Promise<T>;

  let started: Promise<T>;
  try {
    started = load();
  } catch (err) {
    return Promise.reject(err);
  }
  const shared = started.finally(() => inFlight.delete(key));
  inFlight.set(key, shared);
  return shared;
}
