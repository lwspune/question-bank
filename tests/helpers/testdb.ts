/**
 * Test-database wiring + the prod-guard (Layer 1 of the test-isolation work,
 * 2026-08-06 — see the Decisions log on the fixture-leak incident).
 *
 * Fixture-WRITING tests must run against the dedicated test Supabase project,
 * never production. The guard is deliberately an ALLOW-LIST of test project
 * refs (not a deny-list of prod refs): a new/unknown project ref fails closed,
 * so a misconfigured env can never silently point the suite at a real project.
 *
 * Env resolution order (applied by tests/setup.ts):
 *   1. TEST_SUPABASE_URL / TEST_SUPABASE_ANON_KEY / TEST_SUPABASE_SERVICE_ROLE_KEY
 *      env vars (how CI supplies the test project — the build step still needs
 *      the PROD vars for prerendering, so the test creds ride separate names).
 *   2. .env.test.local file (how a dev machine supplies them).
 *   3. Legacy fallback: whatever .env.local holds (the prod project) — allowed
 *      only while TESTDB_TRANSITION=1; prints a loud warning. Once CI + dev
 *      machines carry test creds, the fallback is removed and the guard
 *      hard-fails instead.
 *
 * Prod-CONTRACT tests (read-only assertions against live content — the guide
 * taxonomy-resolution suite etc.) opt OUT of the guard by running with
 * PROD_CONTRACT=1 via their own npm script; they never write fixtures.
 */

/** Supabase project refs that tests are ALLOWED to write fixtures against. */
export const ALLOWED_TEST_REFS: ReadonlySet<string> = new Set([
  "rjwuwmrzkyergflmmfxq", // question-bank-test (dedicated test account)
]);

/** The production project ref — named so error messages can say "that's PROD". */
export const PROD_REF = "wunvtnqlzjrkvolslbnm";

/**
 * Extract the project ref from a Supabase project URL.
 * Returns null for anything that doesn't look like `https://<ref>.supabase.co`.
 * (Self-hosted/localhost URLs return null — handle those explicitly if ever used.)
 */
export function extractProjectRef(url: string | undefined | null): string | null {
  if (!url) return null;
  const m = /^https?:\/\/([a-z0-9]{20})\.supabase\.(co|net)\b/i.exec(url.trim());
  return m ? m[1].toLowerCase() : null;
}

/**
 * Extract the project ref from a Postgres connection URL (TEST_SUPABASE_DB_URL).
 * Two shapes reach the same database: the direct host `db.<ref>.supabase.co`,
 * and the session pooler, whose host names no project (`*.pooler.supabase.com`)
 * so the ref rides in the user (`postgres.<ref>`). Parsed as a URL, so text in
 * the password cannot pose as the host. One parser for every testdb script:
 * reset.ts and sql.ts each carried a host-only copy and refused the pooler URL
 * the README tells you to use (2026-10-17).
 */
export function extractDbUrlRef(dbUrl: string | undefined | null): string | null {
  if (!dbUrl) return null;
  let u: URL;
  try {
    u = new URL(dbUrl.trim());
  } catch {
    return null;
  }
  const host = u.hostname.toLowerCase();
  const direct = /^(?:db\.)?([a-z0-9]{20})\.supabase\.co$/.exec(host);
  if (direct) return direct[1];
  if (host.endsWith(".pooler.supabase.com")) {
    const pooler = /^postgres\.([a-z0-9]{20})$/i.exec(decodeURIComponent(u.username));
    if (pooler) return pooler[1].toLowerCase();
  }
  return null;
}

export type TestDbVerdict =
  | { kind: "test" } // allow-listed test project — run normally
  | { kind: "prod-contract" } // explicit read-only prod run — allowed
  | { kind: "legacy-prod" } // prod creds during the transition window — warn
  | { kind: "forbidden"; reason: string }; // anything else — refuse to run

/**
 * Decide whether the suite may run against the given URL. Pure — env flags are
 * passed in so this is unit-testable.
 */
export function classifyTestTarget(opts: {
  url: string | undefined;
  prodContract: boolean; // PROD_CONTRACT=1 (read-only prod-contract script)
  transition: boolean; // TESTDB_TRANSITION=1 (temporary legacy fallback)
}): TestDbVerdict {
  const ref = extractProjectRef(opts.url);
  if (ref && ALLOWED_TEST_REFS.has(ref)) return { kind: "test" };
  if (opts.prodContract) return { kind: "prod-contract" };
  if (ref === PROD_REF) {
    if (opts.transition) return { kind: "legacy-prod" };
    return {
      kind: "forbidden",
      reason:
        `Supabase URL points at the PRODUCTION project (${PROD_REF}). ` +
        `Fixture-writing tests must use the test project. Put the test ` +
        `project's creds in .env.test.local (see .env.test.local.example), ` +
        `or run the read-only prod-contract suite via npm run test:prod-contract.`,
    };
  }
  return {
    kind: "forbidden",
    reason:
      `Supabase URL ${opts.url ?? "(unset)"} resolves to project ref ` +
      `${ref ?? "(none)"}, which is not on the test allow-list. Add the ref to ` +
      `ALLOWED_TEST_REFS in tests/helpers/testdb.ts if this is a new test project.`,
  };
}
