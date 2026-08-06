/**
 * Vitest per-worker setup: resolve WHICH Supabase project this run targets
 * (test project preferred — see tests/helpers/testenv.ts), then refuse to run
 * fixture-writing tests against anything but the allow-listed test project.
 *
 * PROD_CONTRACT=1 opts a run into read-only production access (the
 * prod-contract suite: guide taxonomy-resolution etc.). TESTDB_TRANSITION=1
 * temporarily tolerates legacy prod runs with a warning.
 */
import { resolveSupabaseTestEnv } from "./helpers/testenv";
import { classifyTestTarget } from "./helpers/testdb";

resolveSupabaseTestEnv();

const verdict = classifyTestTarget({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  prodContract: process.env.PROD_CONTRACT === "1",
  transition: process.env.TESTDB_TRANSITION === "1",
});

if (verdict.kind === "forbidden") {
  // No Supabase env at all is fine — DB suites skip themselves via HAS_ENV
  // guards. Only refuse when creds exist AND point somewhere disallowed.
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error(`[testdb-guard] ${verdict.reason}`);
  }
} else if (verdict.kind === "legacy-prod") {
  // eslint-disable-next-line no-console
  console.warn(
    "[testdb-guard] WARNING: tests are running against the PRODUCTION " +
      "Supabase project (TESTDB_TRANSITION=1). Set up .env.test.local — " +
      "this fallback will be removed."
  );
}
