import { testRunId } from "./helpers/runId";
/**
 * Pure predicates for the global-teardown sweep. Extracted so they can be
 * unit-tested without a live DB.
 *
 * Every integration test creates throwaway rows under a throwaway org whose
 * name carries an 8-hex run-id token (`testRunId()`), e.g.
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
  if (typeof email !== "string") return false;
  const e = email.trim().toLowerCase();
  // `@test.invalid` too (billing and a few other suites): until 2026-11-09 the
  // sweep never matched it, the blind spot the 2026-08-06 incident named.
  return e.endsWith("@test.local") || e.endsWith("@test.invalid");
}

// ── Per-run ownership (2026-11-09) ─────────────────────────────────────────
// Every session, worktree and CI job shares ONE test project. The sweep used
// to delete every test-looking row, so the first run to finish deleted the
// fixtures of any run still going (four red gates on 2026-11-08, four more on
// 11-09). Now a run deletes only rows carrying an id IT handed out
// (tests/helpers/runIdRegistry.ts), plus any test row older than STALE_HOURS:
// no run lasts that long (gate ~10 min, CI ~12), so such a row is a killed
// run's leftover.

/** Older than this, a test row belongs to no live run. */
export const STALE_HOURS = 6;

/** Every standalone 8-hex id in a name or email. Bounded by anything that is
 *  not a letter or digit, so ids inside emails ("a-3e39bcfa@test.local")
 *  count and a slice of a longer hex or word run does not. */
export function runIdTokens(text: string): string[] {
  const out: string[] = [];
  for (const m of text.toLowerCase().matchAll(/(?<![0-9a-z])([0-9a-f]{8})(?![0-9a-z])/g)) out.push(m[1]);
  return out;
}

/** True when the name carries an id this run recorded. */
export function belongsToRun(text: string, own: ReadonlySet<string>): boolean {
  return runIdTokens(text).some((t) => own.has(t));
}

/** True when the row is older than STALE_HOURS. A missing or unreadable time
 *  is never stale: do not delete what you cannot date. */
export function isStaleTestRow(createdAt: string | null | undefined, now: Date): boolean {
  if (!createdAt) return false;
  const t = Date.parse(createdAt);
  if (Number.isNaN(t)) return false;
  return now.getTime() - t > STALE_HOURS * 3_600_000;
}

/** A test org this run may delete: ours, or a killed run's. Never a real org. */
export function shouldSweepOrg(
  org: { name: string; created_at?: string | null },
  own: ReadonlySet<string>,
  now: Date
): boolean {
  if (!isTestOrgName(org.name)) return false;
  return belongsToRun(org.name, own) || isStaleTestRow(org.created_at, now);
}

/** A test user this run may delete: ours, or any test user past STALE_HOURS. */
export function shouldSweepUser(
  user: { email?: string | null; created_at?: string | null },
  own: ReadonlySet<string>,
  now: Date
): boolean {
  if (!isTestAuthEmail(user.email)) return false;
  return belongsToRun(user.email as string, own) || isStaleTestRow(user.created_at, now);
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
