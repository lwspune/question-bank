/**
 * Which test database settings are missing (2026-10-23). Every DB test file
 * is `describe.skipIf(!HAS_ENV)`, so without these settings the suite SKIPS
 * them and the gate still printed PASS: a fresh worktree skipped 126 files
 * that way. The gate runs scripts/testdb/require-env.ts first, which fails on
 * any name this returns. Production settings never count: tests/setup.ts
 * refuses to write fixtures there.
 *
 * Pure. Spec: tests/test-env-required.test.ts.
 */
export const TEST_ENV_VARS = ["TEST_SUPABASE_URL", "TEST_SUPABASE_ANON_KEY", "TEST_SUPABASE_SERVICE_ROLE_KEY"] as const;

export function missingTestEnv(env: Readonly<Record<string, string | undefined>>): string[] {
  return TEST_ENV_VARS.filter((name) => !env[name]?.trim());
}
