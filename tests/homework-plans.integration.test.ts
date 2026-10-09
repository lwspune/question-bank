/**
 * Daily homework plans (migration 0143): the rules the DATABASE enforces.
 *
 * The plan builder checks the same things, but the page and the download are
 * public, so a plan must not be able to hold a private question, an overfull
 * day or the same question twice, whatever writes it.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { recordExportEvent } from "@/lib/export/log";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Q = { id: string; exam_id: string; subject_id: string };

describe.skipIf(!HAS_ENV)("homework plans", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  const planId = randomUUID();
  const slug = `homework-test-${planId.slice(0, 8)}`;
  let qs: Q[] = [];
  let other: Q | null = null;

  const item = (day: number, position: number, q: Q) => ({
    day,
    position,
    questionId: q.id,
    part: 1,
    note: "Asked 2 times: Mar 2016, Mar 2019",
  });
  const replace = (items: unknown[]) =>
    admin.rpc("homework_replace_items", { p_plan_id: planId, p_items: items });

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    const { data: seed } = await admin
      .from("questions")
      .select("id, exam_id, subject_id")
      .eq("visibility", "PUBLIC")
      .limit(200);
    const rows = (seed ?? []) as Q[];
    const first = rows[0];
    if (!first) throw new Error("no PUBLIC question in the test project");
    qs = rows.filter((r) => r.exam_id === first.exam_id && r.subject_id === first.subject_id).slice(0, 3);
    if (qs.length < 3) throw new Error("need 3 PUBLIC questions of one exam and subject in the test project");
    other = rows.find((r) => r.subject_id !== first.subject_id) ?? null;

    const { error } = await admin.from("homework_plans").insert({
      id: planId,
      slug,
      exam_id: first.exam_id,
      subject_id: first.subject_id,
      title: "Homework fixture",
      per_day: 2,
      published: false,
    });
    if (error) throw new Error(`plan fixture: ${error.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("export_events").delete().eq("homework_plan_id", planId);
    await admin.from("homework_plans").delete().eq("id", planId);
  });

  it("writes a plan's items in one call", async () => {
    const { data, error } = await replace([item(1, 1, qs[0]), item(1, 2, qs[1]), item(2, 1, qs[2])]);
    expect(error).toBeNull();
    expect(data).toBe(3);
  });

  it("hides an unpublished plan and its items from the public", async () => {
    const { data: plans } = await anon.from("homework_plans").select("id").eq("id", planId);
    const { data: items } = await anon.from("homework_plan_items").select("day").eq("plan_id", planId);
    expect(plans).toEqual([]);
    expect(items).toEqual([]);
  });

  it("shows a published plan and its items", async () => {
    await admin.from("homework_plans").update({ published: true }).eq("id", planId);
    const { data: items } = await anon
      .from("homework_plan_items")
      .select("day, position")
      .eq("plan_id", planId)
      .order("day")
      .order("position");
    expect(items).toEqual([
      { day: 1, position: 1 },
      { day: 1, position: 2 },
      { day: 2, position: 1 },
    ]);
  });

  it("refuses the public both writing and calling the replace function", async () => {
    const { error: rpcErr } = await anon.rpc("homework_replace_items", { p_plan_id: planId, p_items: [] });
    expect(rpcErr).not.toBeNull();
    const { error: insErr } = await anon.from("homework_plan_items").insert({
      plan_id: planId, day: 3, position: 1, question_id: qs[0].id, part: 1, note: "x",
    });
    expect(insErr).not.toBeNull();
  });

  it("refuses a day with more questions than the plan allows", async () => {
    const { error } = await replace([item(1, 1, qs[0]), item(1, 2, qs[1]), item(1, 3, qs[2])]);
    expect(error?.message).toMatch(/exceeds 2 questions a day/);
  });

  it("refuses the same question twice in a plan", async () => {
    const { error } = await replace([item(1, 1, qs[0]), item(2, 1, qs[0])]);
    expect(error).not.toBeNull();
  });

  it("refuses a question from another subject", async () => {
    if (!other) return;
    const { error } = await replace([item(1, 1, other)]);
    expect(error?.message).toMatch(/not a PUBLIC question of this plan/);
  });

  it("leaves the plan as it was when a replace is refused", async () => {
    const { data } = await admin.from("homework_plan_items").select("question_id").eq("plan_id", planId);
    expect((data ?? []).length).toBe(3);
  });

  it("logs a homework download with its plan and day, and only on a homework row", async () => {
    await recordExportEvent({
      userId: null,
      orgId: null,
      kind: "paper",
      questionCount: 5,
      mode: "homework",
      homeworkPlanId: planId,
      homeworkDay: 2,
      isStaff: false,
    });
    const { data } = await admin
      .from("export_events")
      .select("mode, homework_day, question_count")
      .eq("homework_plan_id", planId);
    expect(data).toEqual([{ mode: "homework", homework_day: 2, question_count: 5 }]);

    const { error } = await admin
      .from("export_events")
      .insert({ kind: "paper", question_count: 1, mode: "cart", homework_plan_id: planId });
    expect(error).not.toBeNull();
  });
});
