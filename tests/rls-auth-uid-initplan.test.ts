/**
 * Access rules must read the signed-in user once per query: `(select auth.uid())`, never a bare
 * `auth.uid()` (TECH_DEBT_SPEC.md 3.2, migration 0218).
 *
 * WHY: a bare `auth.uid()` in a rule is evaluated for every row checked (a JSON parse of the
 * login claims each time) and keeps an index on `user_id` from being used. On 2026-11-05, 63 of
 * 139 rules did it; the slowest affected read averaged 604 ms. Migration 0218 rewrote them all;
 * this test keeps every LATER migration from adding one back.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { bareAuthUidPolicies } from "../scripts/lib/rlsPolicyLint";

describe("bareAuthUidPolicies", () => {
  it("flags a rule that calls auth.uid() bare", () => {
    expect(bareAuthUidPolicies(`create policy p_own on public.t for select using (user_id = auth.uid());`)).toEqual(["p_own"]);
  });

  it("accepts the once-per-query forms", () => {
    expect(
      bareAuthUidPolicies(`
        create policy a on public.t using (user_id = (select auth.uid()));
        alter policy "b c" on public.t using ((user_id = ( SELECT auth.uid() AS uid)));
        create policy d on public.t with check (user_id = (SELECT  auth.uid() ));`)
    ).toEqual([]);
  });

  it("flags a rule where only one of several uses is wrapped", () => {
    expect(bareAuthUidPolicies(`alter policy "x y" on public.t using ((select auth.uid()) = a or auth.uid() = b);`)).toEqual(["x y"]);
  });

  it("ignores auth.uid() outside rules, such as in a function body", () => {
    expect(bareAuthUidPolicies(`create function f() returns uuid language sql as $$ select auth.uid() $$;`)).toEqual([]);
  });
});

describe("migrations from 0218 on", () => {
  const dir = path.join(process.cwd(), "supabase", "migrations");
  const files = fs.readdirSync(dir).filter((f) => /^\d{4}_.*\.sql$/.test(f) && Number(f.slice(0, 4)) >= 218);

  it("include 0218 itself", () => {
    expect(files).toContain("0218_rls_auth_uid_initplan.sql");
  });

  it("never create or change a rule with a bare auth.uid()", () => {
    const offenders = files.flatMap((f) => bareAuthUidPolicies(fs.readFileSync(path.join(dir, f), "utf8")).map((p) => `${f}: ${p}`));
    expect(offenders).toEqual([]);
  });

  it("0218 rewrites all 63 rules the advisor flagged", () => {
    const sql = fs.readFileSync(path.join(dir, "0218_rls_auth_uid_initplan.sql"), "utf8");
    expect(sql.match(/^alter policy /gm)?.length).toBe(63);
  });
});
