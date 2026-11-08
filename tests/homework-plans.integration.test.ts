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
import { getPlanChapterTop, getPlanChapters, getPlanGroup, listPublishedPlans, loadPlanItems } from "@/lib/homework/query";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Q = { id: string; exam_id: string; subject_id: string; chapter_id: string };

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
  const counts = async () => {
    const { data, error } = await admin
      .from("homework_plans")
      .select("day_count, question_count, chapter_count")
      .eq("id", planId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  };

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    // The exam and subject with the most PUBLIC questions in an ORDERED sample:
    // "the first row's subject" from an unordered read named one with fewer
    // than three once other tests' rows moved the table about (2026-11-08).
    const { data: seed } = await admin
      .from("questions")
      .select("id, exam_id, subject_id, chapter_id")
      .eq("visibility", "PUBLIC")
      .order("id")
      .limit(1000);
    const rows = (seed ?? []) as Q[];
    if (rows.length === 0) throw new Error("no PUBLIC question in the test project");
    const group = (r: Q) => `${r.exam_id} ${r.subject_id}`;
    const sizes = new Map<string, number>();
    for (const r of rows) sizes.set(group(r), (sizes.get(group(r)) ?? 0) + 1);
    const biggest = [...sizes].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
    const first = rows.find((r) => group(r) === biggest)!;
    qs = rows.filter((r) => group(r) === biggest).slice(0, 3);
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

  it("keeps a plan's days, questions and chapters on the plan as its items change (0235)", async () => {
    expect(await counts()).toEqual({ day_count: 2, question_count: 3, chapter_count: new Set(qs.map((q) => q.chapter_id)).size });
  });

  it("reads every item after the last one, page by page, in plan order", async () => {
    const items = await loadPlanItems(anon, planId, { pageSize: 1 });
    expect(items.map((it) => [it.day, it.position, it.sub])).toEqual([
      [1, 1, 1],
      [1, 2, 1],
      [2, 1, 1],
    ]);
    expect(items.every((it) => (it.question?.chapter?.name ?? "").length > 0)).toBe(true);
    const dayTwo = await loadPlanItems(anon, planId, { day: 2, pageSize: 1 });
    expect(dayTwo.map((it) => it.question_id)).toEqual([qs[2].id]);
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

  it("holds a case study's parts in one slot without counting them against the day (0144)", async () => {
    const part = (sub: number, q: Q) => ({ ...item(1, 1, q), sub });
    const { data, error } = await replace([part(1, qs[0]), part(2, qs[1]), part(3, qs[2])]);
    expect(error).toBeNull();
    expect(data).toBe(3);
    const { data: rows } = await admin
      .from("homework_plan_items")
      .select("position, sub")
      .eq("plan_id", planId)
      .order("sub");
    expect(rows).toEqual([
      { position: 1, sub: 1 },
      { position: 1, sub: 2 },
      { position: 1, sub: 3 },
    ]);
    // Pages break between a slot's parts too, and a case study is one question.
    const parts = await loadPlanItems(anon, planId, { pageSize: 2 });
    expect(parts.map((it) => it.sub)).toEqual([1, 2, 3]);
    expect(await counts()).toEqual({ day_count: 1, question_count: 1, chapter_count: 1 });
    // Back to the three single questions the next tests expect.
    await replace([item(1, 1, qs[0]), item(1, 2, qs[1]), item(2, 1, qs[2])]);
  });

  it("leaves the plan as it was when a replace is refused", async () => {
    const { data } = await admin.from("homework_plan_items").select("question_id").eq("plan_id", planId);
    expect((data ?? []).length).toBe(3);
    // The counts roll back with the refused write.
    expect(await counts()).toEqual({ day_count: 2, question_count: 3, chapter_count: new Set(qs.map((q) => q.chapter_id)).size });
  });

  it("counts an emptied plan as zero, then counts it again when refilled", async () => {
    const { error } = await replace([]);
    expect(error).toBeNull();
    expect(await counts()).toEqual({ day_count: 0, question_count: 0, chapter_count: 0 });
    await replace([item(1, 1, qs[0]), item(1, 2, qs[1]), item(2, 1, qs[2])]);
    expect((await counts()).question_count).toBe(3);
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
  it("reads one chapter's questions in plan order, for its top PYQs", async () => {
    const chapterId = qs[0].chapter_id;
    const plan = [item(1, 1, qs[0]), item(1, 2, qs[1]), item(2, 1, qs[2])];
    const expected = plan.filter((it) => qs.find((q) => q.id === it.questionId)!.chapter_id === chapterId);
    const top = await getPlanChapterTop(anon, slug, chapterId);
    expect(top?.planId).toBe(planId);
    expect(top?.planTitle).toBe("Homework fixture");
    expect(top?.chapterName.length).toBeGreaterThan(0);
    expect(top?.items.map((it) => it.questionId)).toEqual(expected.map((it) => it.questionId));
    expect(top?.items.map((it) => it.position)).toEqual(expected.map((_, i) => i + 1));
  });

  it("lists the chapters whose questions the plan holds, for the Top 10 tab (2026-11-04)", async () => {
    const page = await getPlanChapters(anon, slug);
    expect(page?.plan).toMatchObject({ id: planId, slug, title: "Homework fixture" });
    const wanted = [...new Set(qs.map((q) => q.chapter_id))].sort();
    expect(page?.chapters.map((c) => c.id).sort()).toEqual(wanted);
    for (const c of page?.chapters ?? []) expect(c.slug.length).toBeGreaterThan(0);
    expect(await getPlanChapters(anon, `${slug}-missing`)).toBeNull();
  });

  it("lists one exam's plans for its homework page, and no other exam's", async () => {
    const { data: exam } = await admin.from("exams").select("name").eq("id", qs[0].exam_id).single();
    const mine = await listPublishedPlans(anon, { examName: exam!.name as string });
    const fixture = mine.find((p) => p.slug === slug);
    expect(fixture?.chapters).toBe(new Set(qs.map((q) => q.chapter_id)).size);
    expect(mine.every((p) => p.examName === exam!.name)).toBe(true);
    const none = await listPublishedPlans(anon, { examName: "No Such Exam" });
    expect(none).toEqual([]);
  });

  it("reads nothing for a chapter the plan does not hold or a plan that does not exist", async () => {
    const elsewhere = other?.chapter_id ?? randomUUID();
    expect((await getPlanChapterTop(anon, slug, elsewhere))?.items ?? []).toEqual([]);
    expect(await getPlanChapterTop(anon, `${slug}-missing`, qs[0].chapter_id)).toBeNull();
  });

  it("logs a top PYQs download with its plan and chapter, and a chapter only on such a row (0154)", async () => {
    await recordExportEvent({
      userId: null,
      orgId: null,
      kind: "key",
      questionCount: 10,
      mode: "top_pyqs",
      homeworkPlanId: planId,
      chapterId: qs[0].chapter_id,
      isStaff: false,
    });
    const { data } = await admin
      .from("export_events")
      .select("mode, homework_day, chapter_id, question_count")
      .eq("homework_plan_id", planId)
      .eq("mode", "top_pyqs");
    expect(data).toEqual([{ mode: "top_pyqs", homework_day: null, chapter_id: qs[0].chapter_id, question_count: 10 }]);

    const onCart = await admin
      .from("export_events")
      .insert({ kind: "paper", question_count: 0, mode: "cart", chapter_id: qs[0].chapter_id });
    expect(onCart.error).not.toBeNull();
    const withDay = await admin
      .from("export_events")
      .insert({ kind: "paper", question_count: 0, mode: "top_pyqs", homework_plan_id: planId, homework_day: 1 });
    expect(withDay.error).not.toBeNull();
  });

  describe("groups (0216)", () => {
    const group = (n: number, members: Q[]) => ({
      n,
      tier: "type",
      label: `Fixture type ${n}`,
      sittings: members.map((_, k) => `Mar ${2015 + k}`),
      members: members.map((q, k) => ({ position: k + 1, sub: 1, questionId: q.id, sitting: `Mar ${2015 + k}` })),
    });
    const replaceWith = (items: unknown[], groups: unknown[]) =>
      admin.rpc("homework_replace_items", { p_plan_id: planId, p_items: items, p_groups: groups });

    it("writes a plan's groups with its items, each slot naming its group", async () => {
      const { error } = await replaceWith(
        [{ ...item(1, 1, qs[0]), group: 1 }, item(1, 2, qs[1]), item(2, 1, qs[2])],
        [group(1, [qs[0], qs[2]])]
      );
      expect(error).toBeNull();
      const { data: items } = await anon
        .from("homework_plan_items")
        .select("day, position, group_n")
        .eq("plan_id", planId)
        .order("day")
        .order("position");
      expect(items).toEqual([
        { day: 1, position: 1, group_n: 1 },
        { day: 1, position: 2, group_n: null },
        { day: 2, position: 1, group_n: null },
      ]);
    });

    it("reads a published plan's group with every question in it, oldest first", async () => {
      const page = await getPlanGroup(anon, slug, 1);
      expect(page?.plan).toMatchObject({ id: planId, slug, title: "Homework fixture" });
      expect(page?.group).toMatchObject({ n: 1, tier: "type", label: "Fixture type 1", sittings: ["Mar 2015", "Mar 2016"] });
      expect(page?.members.map((m) => [m.position, m.questionId, m.sitting])).toEqual([
        [1, qs[0].id, "Mar 2015"],
        [2, qs[2].id, "Mar 2016"],
      ]);
      expect(await getPlanGroup(anon, slug, 99)).toBeNull();
    });

    it("hides an unpublished plan's groups from the public", async () => {
      await admin.from("homework_plans").update({ published: false }).eq("id", planId);
      const { data } = await anon.from("homework_plan_groups").select("n").eq("plan_id", planId);
      const { data: members } = await anon.from("homework_plan_group_questions").select("n").eq("plan_id", planId);
      await admin.from("homework_plans").update({ published: true }).eq("id", planId);
      expect(data).toEqual([]);
      expect(members).toEqual([]);
    });

    it("refuses a slot naming a group the plan does not have, leaving the plan as it was", async () => {
      const { error } = await replaceWith([{ ...item(1, 1, qs[0]), group: 5 }], [group(1, [qs[0]])]);
      expect(error).not.toBeNull();
      const { data } = await admin.from("homework_plan_groups").select("n").eq("plan_id", planId);
      expect(data).toEqual([{ n: 1 }]);
    });

    it("refuses a group listing a question from another subject", async () => {
      if (!other) return;
      const { error } = await replaceWith([item(1, 1, qs[0])], [group(1, [qs[0], other])]);
      expect(error?.message).toMatch(/not a PUBLIC question of this plan/);
    });

    it("clears the groups when a plan is rewritten without them", async () => {
      const { error } = await replace([item(1, 1, qs[0]), item(1, 2, qs[1]), item(2, 1, qs[2])]);
      expect(error).toBeNull();
      const { data } = await admin.from("homework_plan_groups").select("n").eq("plan_id", planId);
      expect(data).toEqual([]);
    });
  });
});
