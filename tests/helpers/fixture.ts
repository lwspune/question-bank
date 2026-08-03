/**
 * Fixture writes that fail LOUDLY, and survive a transient blip.
 *
 * The DB-integration files build their fixtures in `beforeAll` and — in 18 of
 * them as of 2026-08-03 — discard the `error` and force-unwrap the `data`:
 *
 *   const { data } = await admin.from("organizations").insert({name}).select("id").single();
 *   return data!.id;                      // null-deref if it failed
 *   await admin.from("org_members").insert([...]);   // result never looked at
 *
 * That is why the suite's flakes are so hard to read. If the `org_members`
 * insert blips, the users exist with NO membership, so `current_user_org_id()`
 * returns null and the failure surfaces much later as either
 *   - "new row violates row-level security policy" on a write, or
 *   - a read returning 0 rows where 1 was expected (own-org PRIVATE invisible)
 * — neither of which points at setup. Both shapes were observed on 2026-08-03,
 * in `batches-rls` and `principle-tags`/`concept-tags` respectively.
 *
 * `retry: 1` in vitest.config.ts cannot rescue this: `beforeAll` runs ONCE per
 * file, so a retry re-runs the test body against the same broken fixtures.
 *
 * So: check every fixture write, and give it a bounded retry — setup is not the
 * thing under test, and a transient failure there should not read as a
 * behavioural failure.
 */

// PostgREST builders are THENABLE but are not `Promise` instances (no .catch /
// .finally), so the parameter type has to be PromiseLike or every call site
// fails to typecheck.
type Supabaseish<T> = PromiseLike<{ data: T | null; error: { message: string } | null }>;

const TRANSIENT = /timeout|fetch failed|ECONNRESET|ETIMEDOUT|socket hang up|502|503|504/i;

/**
 * Await a Supabase call, throw with context on error, return non-null data.
 * Retries only what looks transient — a CHECK violation or an RLS rejection is
 * a real failure and must surface on the first attempt, not 3 seconds later.
 */
export async function must<T>(
  label: string,
  call: () => Supabaseish<T>,
  attempts = 3,
): Promise<T> {
  let last = "";
  for (let i = 1; i <= attempts; i++) {
    const { data, error } = await call();
    if (!error) {
      if (data === null) throw new Error(`fixture "${label}": succeeded but returned no data`);
      return data;
    }
    last = error.message;
    if (!TRANSIENT.test(last) || i === attempts) break;
    await new Promise((r) => setTimeout(r, 150 * i));
  }
  throw new Error(`fixture "${label}" failed: ${last}`);
}

/** Same, for writes with nothing to return (a bare .insert([...])). */
export async function mustDo(
  label: string,
  call: () => PromiseLike<{ error: { message: string } | null }>,
  attempts = 3,
): Promise<void> {
  let last = "";
  for (let i = 1; i <= attempts; i++) {
    const { error } = await call();
    if (!error) return;
    last = error.message;
    if (!TRANSIENT.test(last) || i === attempts) break;
    await new Promise((r) => setTimeout(r, 150 * i));
  }
  throw new Error(`fixture "${label}" failed: ${last}`);
}
