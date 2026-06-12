/**
 * Pure predicates for the global-teardown sweep. Extracted so they can be
 * unit-tested without a live DB.
 *
 * Every integration test creates throwaway rows under a throwaway org whose
 * name carries an 8-hex run-id token (`randomUUID().slice(0, 8)`), e.g.
 * "Resolver Org fd90dd5f", "EditSetOrg_3e39bcfa", "UpDelete Org A da693ef2".
 * That run-id token is the robust, content-independent signal for "this is
 * test data" — it survives even when the fixture itself uses a real sha256
 * content_hash and sits under canonical taxonomy (the upload-flow fixtures).
 *
 * The token is matched only as a STANDALONE word (bounded by start/end,
 * whitespace, or underscore) so a real name can't trip it by coincidentally
 * containing 8 consecutive hex letters mid-word.
 */

/** Real orgs that must NEVER be swept, even if their name somehow matched. */
export const REAL_ORG_NAMES: ReadonlySet<string> = new Set(["LWS Pune"]);

/** A standalone 8-hex run-id token (the `randomUUID().slice(0,8)` tests embed). */
const RUN_ID_TOKEN = /(^|[\s_])[0-9a-f]{8}([\s_]|$)/;

/** True when a name embeds a test run-id token. */
export function hasRunIdToken(name: string): boolean {
  return RUN_ID_TOKEN.test(name.trim());
}

/** True for a throwaway test organization (run-id token, never a real org). */
export function isTestOrgName(name: string): boolean {
  const n = name.trim();
  if (REAL_ORG_NAMES.has(n)) return false;
  return hasRunIdToken(n);
}

/**
 * True for a test-created taxonomy node (subject/chapter/subtopic). Test
 * taxonomy is global (no org_id) so it can't cascade from the org sweep; it's
 * matched by the same run-id token. Canonical taxonomy ("Mathematics",
 * "Optics (Ray)", "Chemical Thermodynamics") never carries one.
 */
export function isTestTaxonomyName(name: string): boolean {
  return hasRunIdToken(name);
}

/**
 * True for a throwaway test auth user. Tests create users with `admin.auth`
 * under the reserved, non-routable `@test.local` domain (e.g.
 * "edit-set-admin-3e39bcfa@test.local") — a real signup never uses it. The
 * org cascade clears `org_members` but NOT the `auth.users` row behind it, so
 * these are swept separately by email domain.
 */
export function isTestAuthEmail(email: string | null | undefined): boolean {
  return typeof email === "string" && email.trim().toLowerCase().endsWith("@test.local");
}

const defaultSleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Resilient leak check for the global-teardown guardrail. `check()` returns the
 * list of surviving test-data "problems" (empty = clean). If the first check is
 * dirty it RE-SWEEPS and re-checks up to `attempts` more times, sleeping
 * `delayMs` between tries, before giving up — and returns whatever survives.
 *
 * Why: the cascade-delete in the sweep can be slow to become visible on the
 * shared pooled connection (an eventual-consistency / delete-visibility race),
 * so a single post-sweep read intermittently sees an already-doomed org and
 * false-throws, blocking a push (the [[shared-db-test-flake]] class — vitest's
 * `retry:1` doesn't apply to globalTeardown). Re-sweeping both re-attempts the
 * delete (in case the first didn't apply) and waits out the visibility lag; a
 * GENUINE leak still survives all attempts and is returned for the caller to
 * throw on. `sleep` is injectable so unit tests run with no real delay.
 */
export async function sweepUntilClean(
  check: () => Promise<string[]>,
  sweep: () => Promise<void>,
  opts: { attempts: number; delayMs: number; sleep?: (ms: number) => Promise<void> }
): Promise<string[]> {
  const sleep = opts.sleep ?? defaultSleep;
  let problems = await check();
  for (let i = 0; problems.length > 0 && i < opts.attempts; i++) {
    await sleep(opts.delayMs);
    await sweep();
    problems = await check();
  }
  return problems;
}
