/**
 * A fetch that keeps at most `maxInFlight` requests open at once and gives up
 * on any single request after `timeoutMs`.
 *
 * Why (2026-10-09): a local `next build` took the production database down
 * for the second time, and the edge log showed how. The build's pages each
 * fire ~40 requests in parallel; "2 pages at a time" bounded pages, not
 * requests. Once the database slowed, every request queued inside PostgREST
 * for 300-600 s, nothing ever gave up, and ~1,000 open requests on a 1 GB
 * instance wedged the whole host — even its metrics exporter stopped
 * answering, and it did not recover until it was restarted.
 *
 * Bounding what is in flight bounds what the database is asked to hold for
 * us; the deadline means a slow answer costs one slot for 20 s, not for ten
 * minutes. Pure: it wraps whatever fetch it is given, so it is tested with a
 * fake and attached to supabase-js through `global.fetch`
 * (lib/supabase/buildFetch).
 *
 * A caller's own AbortSignal still works: either it or the deadline aborts
 * the request, whichever comes first. The slot is released when the request
 * settles, success or failure, so one bad request cannot jam the queue.
 */
export type ThrottleOptions = {
  /** Requests allowed in flight at once; the rest wait their turn (FIFO). */
  maxInFlight: number;
  /** Deadline per request, after which it is aborted with a TimeoutError. */
  timeoutMs: number;
};

type Fetch = typeof globalThis.fetch;

export function createThrottledFetch(base: Fetch, opts: ThrottleOptions): Fetch {
  const { maxInFlight, timeoutMs } = opts;
  let inFlight = 0;
  const waiting: Array<() => void> = [];

  const acquire = (): Promise<void> =>
    new Promise((resolve) => {
      const take = () => {
        inFlight++;
        resolve();
      };
      if (inFlight < maxInFlight) take();
      else waiting.push(take);
    });

  const release = () => {
    inFlight--;
    const next = waiting.shift();
    if (next) next();
  };

  return async (input, init) => {
    await acquire();
    const ctl = new AbortController();
    const callerSignal = init?.signal ?? null;
    const onCallerAbort = () => ctl.abort(callerSignal?.reason);
    if (callerSignal) {
      if (callerSignal.aborted) onCallerAbort();
      else callerSignal.addEventListener("abort", onCallerAbort, { once: true });
    }
    const timer = setTimeout(() => ctl.abort(timeoutError(timeoutMs)), timeoutMs);
    try {
      return await base(input, { ...init, signal: ctl.signal });
    } finally {
      clearTimeout(timer);
      callerSignal?.removeEventListener("abort", onCallerAbort);
      release();
    }
  };
}

function timeoutError(ms: number): Error {
  const err = new Error(`request gave up after ${ms} ms`);
  err.name = "TimeoutError";
  return err;
}
