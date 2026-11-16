/**
 * The end-of-run sweep also clears leftover fixture QUESTIONS from the real
 * seed org ("LWS Pune"). Several tests write there and clean up only in their
 * own afterAll, so a killed run (or an afterAll that timed out under load) left
 * rows behind for good: on 2026-11-15 three PRIVATE leftovers failed
 * chapter-profile for every session. Seed questions are never touched (their
 * content_hash carries SEED_CONTENT_HASH_PREFIX), nor is another live run's
 * fresh row.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { sweepSeedOrgQuestions } from "./global-teardown";
import { SEED_CONTENT_HASH_PREFIX } from "./helpers/testdb";
import { testRunId } from "./helpers/runId";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

type Row = Record<string, unknown> & { id: string };

/** An 8-hex id no live run holds: stands in for another run's id. */
const otherRunId = () => randomUUID().replace(/-/g, "").slice(0, 8);

describe.skipIf(!HAS_ENV)("sweepSeedOrgQuestions", () => {
  const RUN_ID = testRunId();
  let admin: SupabaseClient;
  let seed: Row;
  let seedCountBefore = 0;
  const made: string[] = [];
  const plans: string[] = [];

  async function copySeed(text: string, createdAt?: string, visibility = "PRIVATE"): Promise<string> {
    const { id: _id, search_vector: _sv, created_at: _c, ...rest } = seed;
    const id = randomUUID();
    const row = {
      ...rest,
      id,
      text,
      visibility,
      content_hash: `seed-org-sweep-test-${randomUUID()}`,
      ...(createdAt ? { created_at: createdAt } : {}),
    };
    const { error } = await admin.from("questions").insert(row);
    if (error) throw new Error(`fixture question: ${error.message}`);
    made.push(id);
    return id;
  }

  const exists = async (id: string) =>
    ((await admin.from("questions").select("id").eq("id", id)).data ?? []).length === 1;

  const seedCount = async () =>
    (
      await admin
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("org_id", seed.org_id as string)
        .like("content_hash", `${SEED_CONTENT_HASH_PREFIX}%`)
    ).count ?? 0;

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data, error } = await admin
      .from("questions")
      .select("*, organizations!inner(name)")
      .eq("organizations.name", "LWS Pune")
      .like("content_hash", `${SEED_CONTENT_HASH_PREFIX}%`)
      .limit(1)
      .single();
    if (error || !data) throw new Error(`need a seed question in the test project: ${error?.message}`);
    const { organizations: _o, ...row } = data as Row & { organizations: unknown };
    seed = row as Row;
    seedCountBefore = await seedCount();
  });

  afterAll(async () => {
    if (plans.length) await admin.from("homework_plans").delete().in("id", plans);
    if (made.length) {
      await admin.from("homework_plan_items").delete().in("question_id", made);
      await admin.from("questions").delete().in("id", made);
    }
  });

  it("removes this run's and stale rows (and what points at them), keeps seed rows and another run's fresh row", async () => {
    const sevenHoursAgo = new Date(Date.now() - 7 * 3_600_000).toISOString();
    const own = await copySeed(`Seed-org sweep, own row. (${RUN_ID})`);
    // PUBLIC: a homework plan accepts only PUBLIC questions.
    const stale = await copySeed(`Seed-org sweep, killed run's row. (${otherRunId()})`, sevenHoursAgo, "PUBLIC");
    const freshOther = await copySeed(`Seed-org sweep, live run's row. (${otherRunId()})`);

    // A stale fixture question that a test homework plan still uses: the plan
    // item blocks the delete (RESTRICT) unless the sweep clears it first.
    const plan = await admin
      .from("homework_plans")
      .insert({
        slug: `seed-org-sweep-${RUN_ID}-${otherRunId()}`, // unique per attempt: retry: 1
        exam_id: seed.exam_id,
        subject_id: seed.subject_id,
        title: `Seed-org sweep ${RUN_ID}`,
      })
      .select("id")
      .single();
    expect(plan.error).toBeNull();
    const planId = plan.data!.id as string;
    plans.push(planId);
    const item = await admin
      .from("homework_plan_items")
      .insert({ plan_id: planId, day: 1, position: 1, question_id: stale, part: 1, note: "seed-org sweep test" });
    expect(item.error).toBeNull();

    await sweepSeedOrgQuestions(admin, { own: new Set([RUN_ID]), now: new Date() });

    expect(await exists(own)).toBe(false);
    expect(await exists(stale)).toBe(false);
    expect(await exists(freshOther)).toBe(true);
    expect(await seedCount()).toBe(seedCountBefore);
  });
});
