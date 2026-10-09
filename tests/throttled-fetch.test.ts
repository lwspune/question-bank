/**
 * `createThrottledFetch` — a fetch that keeps at most N requests in flight and
 * gives up on any single one after a deadline.
 *
 * Why (2026-10-09): a local `next build` took the production database down for
 * the second time. The edge log showed the mechanism: once queries slowed, the
 * build's requests queued inside PostgREST for 300-600 s each, nothing ever
 * gave up, and ~1,000 open requests on a 1 GB instance wedged the whole host.
 * "2 pages at a time" never bounded the request count — each page fires ~40 in
 * parallel and nothing stopped them piling up when the answers slowed down.
 *
 * Bounding in-flight requests bounds what the database can be asked to hold
 * for us; the deadline means a slow answer costs one slot for 20 s, not for
 * ten minutes.
 */
import { describe, it, expect, vi } from "vitest";
import { createThrottledFetch } from "@/lib/supabase/throttledFetch";

function deferred<T>() {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/** Let every pending microtask run (a settled request takes a few hops). */
const flush = async () => {
  for (let i = 0; i < 20; i++) await Promise.resolve();
};

/** A fake fetch that records how many calls are open at once. */
function slowFetch() {
  const pending: ReturnType<typeof deferred<Response>>[] = [];
  let open = 0;
  let peak = 0;
  const base = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
    open++;
    peak = Math.max(peak, open);
    const d = deferred<Response>();
    pending.push(d);
    init?.signal?.addEventListener("abort", () => d.reject(init.signal?.reason));
    try {
      return await d.promise;
    } finally {
      open--;
    }
  });
  return { base, pending, peak: () => peak, open: () => open };
}

const ok = () => new Response("ok");

describe("createThrottledFetch", () => {
  it("never has more than maxInFlight calls open at once; the rest wait their turn", async () => {
    const f = slowFetch();
    const fetch = createThrottledFetch(f.base as unknown as typeof globalThis.fetch, {
      maxInFlight: 3,
      timeoutMs: 60_000,
    });
    const calls = Array.from({ length: 10 }, (_, i) => fetch(`https://x/${i}`));
    await flush();
    expect(f.open()).toBe(3);
    expect(f.base).toHaveBeenCalledTimes(3);

    f.pending[0].resolve(ok());
    await flush();
    await flush();
    expect(f.base).toHaveBeenCalledTimes(4);
    expect(f.open()).toBe(3);

    for (const d of f.pending) d.resolve(ok());
    while (f.pending.length < 10) {
      await flush();
      for (const d of f.pending) d.resolve(ok());
    }
    const responses = await Promise.all(calls);
    expect(responses).toHaveLength(10);
    expect(f.peak()).toBe(3);
    expect(f.base).toHaveBeenCalledTimes(10);
  });

  it("aborts a call that outlives timeoutMs and frees its slot for the next one", async () => {
    vi.useFakeTimers();
    try {
      const f = slowFetch();
      const fetch = createThrottledFetch(f.base as unknown as typeof globalThis.fetch, {
        maxInFlight: 1,
        timeoutMs: 20_000,
      });
      const first = fetch("https://x/slow");
      const second = fetch("https://x/next");
      await flush();
      expect(f.base).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(20_000);
      await expect(first).rejects.toMatchObject({ name: "TimeoutError" });
      await flush();
      await flush();
      expect(f.base).toHaveBeenCalledTimes(2);

      f.pending[1].resolve(ok());
      await expect(second).resolves.toBeInstanceOf(Response);
    } finally {
      vi.useRealTimers();
    }
  });

  it("frees the slot when the underlying fetch rejects, so one failure cannot jam the queue", async () => {
    const f = slowFetch();
    const fetch = createThrottledFetch(f.base as unknown as typeof globalThis.fetch, {
      maxInFlight: 1,
      timeoutMs: 60_000,
    });
    const first = fetch("https://x/a");
    const second = fetch("https://x/b");
    await flush();
    f.pending[0].reject(new Error("socket hang up"));
    await expect(first).rejects.toThrow("socket hang up");
    await flush();
    await flush();
    f.pending[1].resolve(ok());
    await expect(second).resolves.toBeInstanceOf(Response);
  });

  it("respects a caller's own abort signal as well as the deadline", async () => {
    const f = slowFetch();
    const fetch = createThrottledFetch(f.base as unknown as typeof globalThis.fetch, {
      maxInFlight: 2,
      timeoutMs: 60_000,
    });
    const ctl = new AbortController();
    const p = fetch("https://x/a", { signal: ctl.signal });
    await flush();
    ctl.abort(new Error("caller gave up"));
    await expect(p).rejects.toThrow("caller gave up");
    expect(f.open()).toBe(0);
  });

  it("passes the request through unchanged apart from the signal", async () => {
    const f = slowFetch();
    const fetch = createThrottledFetch(f.base as unknown as typeof globalThis.fetch, {
      maxInFlight: 2,
      timeoutMs: 60_000,
    });
    const p = fetch("https://x/q", { method: "POST", headers: { apikey: "k" }, body: "{}" });
    await flush();
    const [input, init] = f.base.mock.calls[0];
    expect(input).toBe("https://x/q");
    expect(init).toMatchObject({ method: "POST", headers: { apikey: "k" }, body: "{}" });
    expect(init?.signal).toBeInstanceOf(AbortSignal);
    f.pending[0].resolve(ok());
    await p;
  });
});
