/**
 * PROD-CONTRACT: every published homework plan covers its subject's PUBLIC past
 * questions (2026-11-06).
 *
 * A plan stores its order, so a paper ingested after the plan was built never
 * reaches its days or the Top 10 PYQs it feeds, and nothing else notices. This
 * runs in the daily prod check (.github/workflows/prod-contract.yml), whose
 * failure email names the plan, the new sittings and their chapters: the
 * reminder to run `npm run homework:new -- <plan>`. It stays red until the plan
 * is caught up, on purpose.
 *
 * Same comparison as homework:build and homework:coverage (scripts/lib/homeworkCoverage).
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { describeUnplanned, readPlanCoverage, readPlanFiles, type PlanCoverage } from "../scripts/lib/homeworkCoverage";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("homework plans vs the live bank", () => {
  let client: SupabaseClient;
  const coverage: PlanCoverage[] = [];

  beforeAll(async () => {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    for (const plan of readPlanFiles()) coverage.push(await readPlanCoverage(client, plan));
  }, 300_000);

  it("reads every plan file", () => {
    expect(coverage.length).toBeGreaterThan(0);
  });

  it("every published plan covers each PUBLIC past question of its subject (else: npm run homework:new -- <plan>)", () => {
    const behind = coverage
      .filter((c) => c.published && c.unplanned.length > 0)
      .map((c) => `${c.slug}: ${describeUnplanned(c.unplanned)}`);
    expect(behind).toEqual([]);
  });
});
