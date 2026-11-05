/**
 * Finds access rules (CREATE/ALTER POLICY) that call `auth.uid()` bare instead of
 * `(select auth.uid())`. A bare call runs once per row checked and blocks a `user_id`
 * index; wrapped, Postgres runs it once per query (TECH_DEBT_SPEC.md 3.2, migration 0218).
 * Spec: tests/rls-auth-uid-initplan.test.ts.
 */
const POLICY = /\b(?:create|alter)\s+policy\s+("(?:[^"]|"")+"|[A-Za-z_][\w$]*)[\s\S]*?;/gi;
const WRAPPED = /\(\s*select\s+auth\.uid\(\s*\)(?:\s+as\s+\w+)?\s*\)/gi;
const BARE = /\bauth\.uid\(\s*\)/i;

/** Names of the rules in `sql` that still call auth.uid() bare, in order. */
export function bareAuthUidPolicies(sql: string): string[] {
  const out: string[] = [];
  for (const m of sql.matchAll(POLICY)) {
    if (BARE.test(m[0].replace(WRAPPED, ""))) out.push(m[1].replace(/^"|"$/g, "").replace(/""/g, '"'));
  }
  return out;
}
