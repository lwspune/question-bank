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

/**
 * Sign a fixture user in, or THROW. `signInWithPassword` returns its error
 * instead of throwing, and 41 of the suite's 56 sign-ins discarded it (found
 * 2026-09-21). Supabase Auth limits `/auth/v1/token` to 150 requests per 5
 * minutes per IP; past that the call "succeeds" with an error nobody read,
 * the client stays ANONYMOUS, and the test fails later as a 42501 RLS
 * violation on a write — a fake regression pointing nowhere near the cause.
 *
 * A rate limit is WAITED OUT, never retried into. Retrying at once only
 * spends more of the same window (the 2026-09-21 finding), so on
 * "Request rate limit reached" this sleeps past the window and tries again,
 * a bounded number of times. Added 2026-09-24 when the suite reached the
 * wall on its own: adding one five-sign-in RLS file made the same four tail
 * suites fail on two consecutive runs, and the only alternative was to stop
 * writing RLS tests. Every other failure is thrown with its reason, so the
 * next person sees "Request rate limit reached", not "row-level security
 * policy".
 */
const RATE_LIMIT_WAIT_MS = 65_000;
const RATE_LIMIT_MAX_WAITS = 5;
const sleepMs = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type SignInCreds = { email: string; password: string };
type SignInClient = {
  auth: {
    signInWithPassword(
      creds: SignInCreds,
    ): PromiseLike<{ data: { session: unknown } | null; error: { message: string } | null }>;
  };
};

export async function mustSignIn(
  label: string,
  client: SignInClient,
  creds: SignInCreds,
): Promise<void> {
  for (let waits = 0; ; waits++) {
    const { data, error } = await client.auth.signInWithPassword(creds);
    if (error && /rate limit/i.test(error.message) && waits < RATE_LIMIT_MAX_WAITS) {
      console.warn(
        `sign in "${label}": ${error.message} — waiting ${RATE_LIMIT_WAIT_MS / 1000}s for the window (${waits + 1}/${RATE_LIMIT_MAX_WAITS})`,
      );
      await sleepMs(RATE_LIMIT_WAIT_MS);
      continue;
    }
    if (error) throw new Error(`sign in "${label}" failed: ${error.message}`);
    if (!data?.session) throw new Error(`sign in "${label}" failed: no session returned`);
    return;
  }
}
