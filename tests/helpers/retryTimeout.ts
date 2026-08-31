/**
 * Retry a supabase-js read when Postgres cancels it with SQLSTATE 57014
 * (statement_timeout).
 *
 * WHY: the production host's memory stalls (measured 2026-08-30: swap-thrash
 * on a 409 MB instance) cancel otherwise-healthy queries for seconds at a
 * time. A prod-contract test that treats "cancelled" as "wrong" fails the
 * whole gate over a stall that has nothing to do with the pushed code — that
 * killed several pushes in late Aug 2026. Vitest's `retry: 1` did not cover
 * it because it re-runs IMMEDIATELY, inside the same stall; this helper waits
 * out the stall (2 s, then 4 s) before re-asking.
 *
 * Detection mirrors `isStatementTimeout` in src/lib/questions/query.ts: match
 * the code where PostgREST supplies one, with a message fallback because it
 * does not always pass the code through.
 *
 * ONLY a statement timeout is retried. Any other error — and any data — is
 * returned to the caller unchanged on the first attempt, so a genuine drift
 * failure is exactly as loud as before.
 */

type PgErrorish = { code?: string | null; message?: string | null };

export function isStatementTimeout(error: PgErrorish): boolean {
  if (error.code === "57014") return true;
  return /canceling statement due to statement timeout/i.test(error.message ?? "");
}

/**
 * `run` must BUILD the query each call (supabase-js builders are one-shot
 * thenables): pass `() => client.from(...)...`, never a pre-built builder.
 *
 * Generic over the WHOLE result (not `{data, error}` re-typed here) so the
 * caller's `data`/`error` keep their exact supabase-js types — widening
 * `error.message` to `string | null | undefined` broke an assertion-message
 * overload on first contact.
 */
export async function retryOnStatementTimeout<R extends { error: PgErrorish | null }>(
  run: () => PromiseLike<R>,
  attempts = 3,
  baseBackoffMs = 2000
): Promise<R> {
  let last = await run();
  for (let attempt = 2; attempt <= attempts; attempt++) {
    if (!last.error || !isStatementTimeout(last.error)) return last;
    await new Promise((r) => setTimeout(r, baseBackoffMs * (attempt - 1)));
    last = await run();
  }
  return last;
}
