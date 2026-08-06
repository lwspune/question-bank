/**
 * Shared (impure) env resolution for the test suite. Used by BOTH
 * tests/setup.ts (per-worker) and tests/global-teardown.ts (globalSetup
 * context — which does NOT go through setupFiles, so it must resolve env
 * itself; before this existed it read .env.local directly and would have
 * swept PROD while the workers wrote to the test project).
 *
 * Mutates process.env so the standard var names (NEXT_PUBLIC_SUPABASE_URL,
 * NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY) hold whichever
 * project this run targets. Pure classification lives in ./testdb.
 */
import { config } from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";

export function resolveSupabaseTestEnv(): void {
  const testEnvFile = path.join(process.cwd(), ".env.test.local");
  const legacyEnvFile = path.join(process.cwd(), ".env.local");

  // dotenv never overrides vars already set, so CI's real TEST_* env wins.
  if (fs.existsSync(testEnvFile)) config({ path: testEnvFile });

  const testUrl = process.env.TEST_SUPABASE_URL;
  const testAnon = process.env.TEST_SUPABASE_ANON_KEY;
  const testService = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY;
  const prodContract = process.env.PROD_CONTRACT === "1";

  if (testUrl && testAnon && testService && !prodContract) {
    process.env.NEXT_PUBLIC_SUPABASE_URL = testUrl;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = testAnon;
    process.env.SUPABASE_SERVICE_ROLE_KEY = testService;
  } else if (fs.existsSync(legacyEnvFile)) {
    config({ path: legacyEnvFile });
  }
}
