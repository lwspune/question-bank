/**
 * Integration test for the Learn tables (migration 0190): Concept Ladder's lessons, copied in.
 *
 * Load-bearing properties:
 *  - the seed writes a chapter in one transaction and is safe to repeat; the DB refuses a
 *    prerequisite cycle and an item without exactly one correct option (nothing is written);
 *  - content is server-only: anon and students read it only through the learn_* functions,
 *    which never return a key, a misconception tag, a draft concept or an unverified item;
 *  - a guest's answer is checked (learn_check_answer) and nothing is stored; only a signed-in
 *    student's answer is recorded (learn_record_attempt, as auth.uid(), never a passed-in id);
 *  - mastery: 3 different questions right with none left to retry; spaced review 1/3/7 days;
 *  - a misconception repeated twice routes back to its root concept and makes it due;
 *  - students read only their own progress; content a student used cannot be deleted.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "learn-db-test-1234";
const RUN = randomUUID().slice(0, 8);
const CHAPTER = `learn-test-${RUN}`;
const EXAM = `learn-test-${RUN}`; // not a real exam: the test DB may hold the real courses
const COURSE = `${EXAM}-maths`;

const solution = { steps: ["First step.", "Second step."] };

/** An item whose correct option is `right`; the other three carry `mis`. */
function item(code: string, right: "A" | "B" | "C" | "D", mis: string, extra: Record<string, unknown> = {}) {
  return {
    code,
    stem: `Stem of ${code}`,
    source: { kind: "authored" },
    verify: { kind: "value", inputs: {} },
    verified: true,
    solution,
    figure: null,
    options: (["A", "B", "C", "D"] as const).map((key) => ({
      key,
      text: `${code} option ${key}`,
      is_correct: key === right,
      misconception: key === right ? null : mis,
      value: key,
    })),
    ...extra,
  };
}

function concept(code: string, prereqs: string[], misconceptions: unknown[], items: unknown[], status = "approved") {
  return {
    code,
    slug: `concept-${code.toLowerCase()}`,
    title: `Concept ${code}`,
    one_liner: `What ${code} is`,
    grp: "g",
    tier: "core",
    ext: [],
    sources: [],
    prereqs,
    status,
    body: { hook: { prompt: "p", reveal: "r" }, explanation: { intuition: "i", formal: "f", worked: { prompt: "w", steps: ["s"], answer: "a" }, visualSpec: "" } },
    misconceptions,
    items,
    translations: [],
  };
}

/** C01 (root) ← C02 ← C03 (draft); C02-M1 routes to C01, C02-M2 to an outside topic. */
function payload(slug = CHAPTER) {
  return {
    slug,
    title: "Learn test chapter",
    concepts: [
      concept(
        "C01",
        [],
        [{ code: "C01-M1", mistake: "m", remediation: "C01 remediation", fallback: { kind: "none" } }],
        [item("C01-Q1", "A", "C01-M1"), item("C01-Q2", "B", "C01-M1"), item("C01-Q3", "C", "C01-M1"), item("C01-Q4", "D", "C01-M1")],
      ),
      concept(
        "C02",
        ["C01"],
        [
          { code: "C02-M1", mistake: "m", remediation: "C02 back to C01", fallback: { kind: "concept", id: "C01" } },
          { code: "C02-M2", mistake: "m", remediation: "C02 outside", fallback: { kind: "ext", topic: "Algebra basics" } },
        ],
        [
          item("C02-Q1", "A", "C02-M1"),
          item("C02-Q2", "A", "C02-M1"),
          item("C02-Q3", "A", "C02-M2"),
          item("C02-Q4", "A", "C02-M1", { verified: false }),
        ],
      ),
      concept("C03", ["C02"], [], [], "draft"),
    ],
  };
}

describe.skipIf(!HAS_ENV)("Learn tables (0190)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let alice: SupabaseClient;
  let bob: SupabaseClient;
  let aliceId: string;
  let bobId: string;
  const items = new Map<string, string>();

  async function seed(p: unknown) {
    return admin.rpc("learn_seed_chapter", { p });
  }

  async function answer(client: SupabaseClient, code: string, key: string) {
    const { data, error } = await client.rpc("learn_record_attempt", { p_item: items.get(code), p_key: key });
    if (error) throw new Error(`${code}/${key}: ${error.message}`);
    return data as Record<string, unknown>;
  }

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, anonKey, { auth: { persistSession: false } });
    alice = createClient(url, anonKey, { auth: { persistSession: false } });
    bob = createClient(url, anonKey, { auth: { persistSession: false } });

    const aEmail = `learn-alice-${RUN}@test.local`;
    const bEmail = `learn-bob-${RUN}@test.local`;
    const [{ data: a }, { data: b }] = await Promise.all([
      admin.auth.admin.createUser({ email: aEmail, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: bEmail, password: PASSWORD, email_confirm: true }),
    ]);
    aliceId = a.user!.id;
    bobId = b.user!.id;
    await mustSignIn(aEmail, alice, { email: aEmail, password: PASSWORD });
    await mustSignIn(bEmail, bob, { email: bEmail, password: PASSWORD });

    const { error } = await seed(payload());
    if (error) throw new Error(`seed: ${error.message}`);
    const { data: rows, error: re } = await admin
      .from("learn_items")
      .select("id, code, learn_concepts!inner(learn_chapters!inner(slug))")
      .eq("learn_concepts.learn_chapters.slug", CHAPTER);
    if (re) throw new Error(re.message);
    for (const r of rows!) items.set(r.code, r.id);
  });

  afterAll(async () => {
    // Users first: their progress and attempts cascade, which frees the content to delete.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
    await admin.from("learn_courses").delete().eq("slug", COURSE);
    await admin.from("learn_chapters").delete().like("slug", `learn-test-${RUN}%`);
  });

  describe("seeding", () => {
    it("writes the chapter and is safe to repeat", async () => {
      const first = await seed(payload());
      const again = await seed(payload());
      expect(first.error).toBeNull();
      expect(again.data).toEqual(first.data);
      expect(again.data).toMatchObject({ chapter: CHAPTER, concepts: 3, items: 8 });
    });

    it("refuses a prerequisite cycle and writes nothing", async () => {
      const p = payload(`${CHAPTER}-cycle`);
      p.concepts[0].prereqs = ["C02"];
      const { error } = await seed(p);
      expect(error?.message).toMatch(/cycle/);
      const { data } = await admin.from("learn_chapters").select("id").eq("slug", `${CHAPTER}-cycle`);
      expect(data).toEqual([]);
    });

    it("refuses an item with two correct options", async () => {
      const p = payload(`${CHAPTER}-two`);
      (p.concepts[0].items[0] as ReturnType<typeof item>).options[1].is_correct = true;
      (p.concepts[0].items[0] as ReturnType<typeof item>).options[1].misconception = null;
      const { error } = await seed(p);
      expect(error).not.toBeNull();
      const { data } = await admin.from("learn_chapters").select("id").eq("slug", `${CHAPTER}-two`);
      expect(data).toEqual([]);
    });
  });

  describe("reading content", () => {
    it("anon and students cannot read the tables directly", async () => {
      for (const client of [anon, alice]) {
        const { data, error } = await client.from("learn_item_options").select("key, is_correct").limit(1);
        expect(error !== null || (data ?? []).length === 0).toBe(true);
      }
    });

    it("learn_concept serves a published concept with no keys and only verified items", async () => {
      const { data, error } = await anon.rpc("learn_concept", { p_chapter: CHAPTER, p_concept: "concept-c02" });
      expect(error).toBeNull();
      expect(data.concept).toMatchObject({ code: "C02", title: "Concept C02" });
      expect(data.concept.body.hook.prompt).toBe("p");
      expect(data.items.map((i: { code: string }) => i.code)).toEqual(["C02-Q1", "C02-Q2", "C02-Q3"]);
      // The worked example in the body has steps; the questions must carry no key or solution.
      expect(JSON.stringify(data)).not.toMatch(/is_correct|misconception|remediation/);
      expect(JSON.stringify(data.items)).not.toMatch(/steps|solution|"value"/);
      expect(data.items[0].options).toEqual([
        { key: "A", text: "C02-Q1 option A" },
        { key: "B", text: "C02-Q1 option B" },
        { key: "C", text: "C02-Q1 option C" },
        { key: "D", text: "C02-Q1 option D" },
      ]);
    });

    it("learn_concept returns null for a draft concept", async () => {
      const { data, error } = await anon.rpc("learn_concept", { p_chapter: CHAPTER, p_concept: "concept-c03" });
      expect(error).toBeNull();
      expect(data).toBeNull();
    });
  });

  describe("a guest's answer", () => {
    it("is checked and nothing is stored", async () => {
      const before = await admin.from("learn_attempts").select("id", { count: "exact", head: true });
      const { data, error } = await anon.rpc("learn_check_answer", { p_item: items.get("C02-Q1"), p_key: "B" });
      expect(error).toBeNull();
      expect(data).toMatchObject({ correct: false, correct_key: "A", misconception_code: "C02-M1", remediation: "C02 back to C01" });
      expect(data.solution.steps).toHaveLength(2);
      const after = await admin.from("learn_attempts").select("id", { count: "exact", head: true });
      expect(after.count).toBe(before.count);
    });

    it("refuses an unverified item", async () => {
      const { error } = await anon.rpc("learn_check_answer", { p_item: items.get("C02-Q4"), p_key: "A" });
      expect(error).not.toBeNull();
    });

    it("cannot record an attempt", async () => {
      const { error } = await anon.rpc("learn_record_attempt", { p_item: items.get("C01-Q1"), p_key: "A" });
      expect(error).not.toBeNull();
    });
  });

  describe("a signed-in student", () => {
    it("masters a concept with 3 different questions right and none left to retry", async () => {
      expect(await answer(alice, "C01-Q1", "A")).toMatchObject({ correct: true, streak: 1, state: "learning" });
      const miss = await answer(alice, "C01-Q2", "A");
      expect(miss).toMatchObject({ correct: false, correct_key: "B", to_retry: 1, remediation: "C01 remediation" });
      expect(await answer(alice, "C01-Q3", "C")).toMatchObject({ streak: 2, to_retry: 1, state: "learning" });
      expect(await answer(alice, "C01-Q4", "D")).toMatchObject({ streak: 3, to_retry: 1, state: "learning", mastered_now: false });
      const done = await answer(alice, "C01-Q2", "B");
      expect(done).toMatchObject({ streak: 4, to_retry: 0, state: "mastered", mastered_now: true, review_box: 1 });
      expect((done.solution as { steps: string[] }).steps).toHaveLength(2);
    });

    it("records as the signed-in user, whatever else is passed", async () => {
      const { data } = await admin.from("learn_attempts").select("user_id").eq("item_id", items.get("C01-Q1")!);
      expect(new Set(data!.map((r) => r.user_id))).toEqual(new Set([aliceId]));
    });

    it("a misconception repeated twice routes to its root concept and makes it due", async () => {
      const first = await answer(alice, "C02-Q1", "B");
      expect(first.route).toBeNull();
      const second = await answer(alice, "C02-Q2", "C");
      expect(second.route).toEqual({ kind: "refresher", chapter: CHAPTER, concept: "concept-c01", title: "Concept C01" });
      const { data } = await admin
        .from("learn_concept_state")
        .select("next_review_at, learn_concepts!inner(code)")
        .eq("user_id", aliceId)
        .eq("learn_concepts.code", "C01")
        .single();
      expect(Date.parse(data!.next_review_at)).toBeLessThanOrEqual(Date.now());
    });

    it("an outside-topic fallback routes to a revise note", async () => {
      await answer(alice, "C02-Q3", "B");
      const second = await answer(alice, "C02-Q3", "C");
      expect(second.route).toEqual({ kind: "revise", label: "Algebra basics" });
    });

    it("a due review passes with 2 right and moves to the next box", async () => {
      // C01 is due now (routing above). Two right answers pass it: box 1 → 2, due in 3 days.
      const r1 = await answer(alice, "C01-Q1", "A");
      expect(r1).toMatchObject({ reviewing: true, review_done: false, review_correct: 1 });
      const r2 = await answer(alice, "C01-Q3", "C");
      expect(r2).toMatchObject({ reviewing: true, review_done: true, review_passed: true, review_box: 2 });
      const days = (Date.parse(r2.next_review_at as string) - Date.now()) / 86_400_000;
      expect(days).toBeGreaterThan(2.9);
      expect(days).toBeLessThan(3.1);
    });

    it("a miss in a due review sends it back to box 1", async () => {
      await admin
        .from("learn_concept_state")
        .update({ next_review_at: new Date(Date.now() - 60_000).toISOString() })
        .eq("user_id", aliceId)
        .eq("concept_id", (await admin.from("learn_items").select("concept_id").eq("id", items.get("C01-Q1")!).single()).data!.concept_id);
      const r = await answer(alice, "C01-Q1", "B");
      expect(r).toMatchObject({ reviewing: true, review_done: true, review_passed: false, review_box: 1, state: "mastered" });
    });

    it("reads only their own progress and attempts", async () => {
      await answer(bob, "C01-Q1", "A");
      const own = await alice.from("learn_attempts").select("user_id");
      expect(own.error).toBeNull();
      expect(new Set(own.data!.map((r) => r.user_id))).toEqual(new Set([aliceId]));
      const state = await bob.from("learn_concept_state").select("user_id");
      expect(new Set(state.data!.map((r) => r.user_id))).toEqual(new Set([bobId]));
    });

    it("cannot write progress directly", async () => {
      const { error } = await bob.from("learn_concept_state").update({ state: "mastered" }).eq("user_id", bobId);
      const { data } = await admin.from("learn_concept_state").select("state").eq("user_id", bobId);
      expect(error !== null || data!.every((r) => r.state === "learning")).toBe(true);
    });
  });

  // Migration 0191: the reads the lesson page makes for a signed-in student.
  describe("own progress reads (0191)", () => {
    it("learn_my_progress gives the student's state by chapter and concept code", async () => {
      const { data, error } = await alice.rpc("learn_my_progress", { p_chapters: [CHAPTER] });
      expect(error).toBeNull();
      const byCode = Object.fromEntries((data as { code: string }[]).map((r) => [r.code, r]));
      expect(Object.keys(byCode).sort()).toEqual(["C01", "C02"]);
      expect(byCode.C01).toMatchObject({ chapter: CHAPTER, slug: "concept-c01", title: "Concept C01", state: "mastered", review_box: 1 });
      expect(byCode.C02).toMatchObject({ chapter: CHAPTER, state: "learning" });
    });

    it("learn_my_progress with no filter covers every chapter, and only the caller's rows", async () => {
      const { data } = await bob.rpc("learn_my_progress", {});
      const mine = (data as { chapter: string; code: string; state: string }[]).filter((r) => r.chapter === CHAPTER);
      expect(mine.map((r) => [r.code, r.state])).toEqual([["C01", "learning"]]);
    });

    it("learn_my_attempts gives the student's answers on one concept, oldest first, by item", async () => {
      const { data, error } = await alice.rpc("learn_my_attempts", { p_chapter: CHAPTER, p_concept: "concept-c02" });
      expect(error).toBeNull();
      const rows = data as { item_id: string; correct: boolean }[];
      expect(rows.map((r) => r.item_id)).toEqual([items.get("C02-Q1"), items.get("C02-Q2"), items.get("C02-Q3"), items.get("C02-Q3")]);
      expect(rows.every((r) => r.correct === false)).toBe(true);
    });

    it("learn_my_progress says when each concept was last touched (0192)", async () => {
      const { data } = await alice.rpc("learn_my_progress", { p_chapters: [CHAPTER] });
      expect((data as unknown[]).length).toBeGreaterThan(0);
      for (const r of data as { updated_at: string }[]) expect(Number.isNaN(Date.parse(r.updated_at))).toBe(false);
    });

    it("learn_my_misses counts the student's still-wrong questions by chapter of one exam (0192)", async () => {
      type Q = { id: string; chapters: { name: string; subjects: { exams: { name: string } } } };
      const pick = (exam?: string) => {
        let query = admin.from("questions").select("id, chapters!inner(name, subjects!inner(exams!inner(name)))").eq("visibility", "PUBLIC");
        if (exam) query = query.eq("chapters.subjects.exams.name", exam);
        return query.limit(2);
      };
      const first = ((await pick()).data as unknown as Q[])[0];
      const exam = first.chapters.subjects.exams.name;
      const [q1, q2] = (await pick(exam)).data as unknown as Q[];
      const log = (client: SupabaseClient, uid: string, kind: string, ref: string, at: string) =>
        client.from("user_activity").insert({ user_id: uid, kind, ref_id: ref, created_at: at });
      expect((await log(alice, aliceId, "answer_wrong", q1.id, "2026-10-01T10:00:00Z")).error).toBeNull();
      await log(alice, aliceId, "answer_wrong", q2.id, "2026-10-01T10:00:00Z");
      // q2 was fixed later: its latest answer is right, so it no longer counts.
      await log(alice, aliceId, "answer_correct", q2.id, "2026-10-02T10:00:00Z");

      const { data, error } = await alice.rpc("learn_my_misses", { p_exam: exam });
      expect(error).toBeNull();
      const rows = data as { chapter: string; misses: number }[];
      expect(rows.find((r) => r.chapter === q1.chapters.name)?.misses).toBeGreaterThanOrEqual(1);
      expect(rows.reduce((n, r) => n + r.misses, 0)).toBe(1);

      const other = await bob.rpc("learn_my_misses", { p_exam: exam });
      expect(other.data).toEqual([]);
    });

    it("learn_experiment_readout counts students who answered, mastered and came back on a second day (0193)", async () => {
      // Backdate one of Alice's answers by a day, so she has answered on two different days.
      const { data: one } = await admin.from("learn_attempts").select("id").eq("user_id", aliceId).order("id").limit(1).single();
      await admin.from("learn_attempts").update({ created_at: new Date(Date.now() - 26 * 3600_000).toISOString() }).eq("id", one!.id);
      const since = new Date(Date.now() - 3 * 86_400_000).toISOString();
      const { data, error } = await admin.rpc("learn_experiment_readout", { p_since: since });
      expect(error).toBeNull();
      const r = data as { students: number; mastered_one: number; returned_second_day: number; answers: number };
      expect(r.students).toBeGreaterThanOrEqual(2); // Alice and Bob
      expect(r.mastered_one).toBeGreaterThanOrEqual(1); // Alice
      expect(r.returned_second_day).toBeGreaterThanOrEqual(1); // Alice
      expect(r.answers).toBeGreaterThan(0);
      // Only the service role reads it.
      expect((await alice.rpc("learn_experiment_readout", { p_since: since })).error).not.toBeNull();
    });

    it("anon gets nothing from the own-progress reads", async () => {
      expect((await anon.rpc("learn_my_misses", { p_exam: "x" })).error).not.toBeNull();
      expect((await anon.rpc("learn_my_progress", {})).error).not.toBeNull();
      expect((await anon.rpc("learn_my_attempts", { p_chapter: CHAPTER, p_concept: "concept-c01" })).error).not.toBeNull();
    });
  });

  describe("re-seeding after use", () => {
    it("refuses to delete an item a student answered", async () => {
      const p = payload();
      p.concepts[0].items = p.concepts[0].items.filter((i) => (i as { code: string }).code !== "C01-Q1");
      const { error } = await seed(p);
      expect(error).not.toBeNull();
    });
  });

  describe("courses", () => {
    const course = {
      slug: COURSE,
      title: "Test Board",
      exam: EXAM,
      subject: "maths",
      standard: 12,
      chapters: [
        { slug: "first", title: "First", standard: 12, pyqvault: "first-chapter", parts: [{ chapter: CHAPTER, concepts: ["C01", "C02"] }] },
        { slug: "second", title: "Second", standard: 12, pyqvault: null, parts: [{ chapter: CHAPTER, concepts: ["C03"] }] },
      ],
    };

    it("seeds a course and serves its outline with each pool chapter's graph", async () => {
      const { error } = await admin.rpc("learn_seed_courses", { p: { courses: [course] } });
      expect(error).toBeNull();
      const { data, error: oe } = await anon.rpc("learn_course_outline", { p_course: COURSE });
      expect(oe).toBeNull();
      expect(data).toMatchObject({ slug: COURSE, exam: EXAM, subject: "maths", standard: 12 });
      expect(data.chapters).toEqual([
        { slug: "first", title: "First", standard: 12, pyqvault: "first-chapter", parts: [{ chapter: CHAPTER, concepts: ["C01", "C02"] }] },
        { slug: "second", title: "Second", standard: 12, pyqvault: null, parts: [{ chapter: CHAPTER, concepts: ["C03"] }] },
      ]);
      const pool = data.pools[CHAPTER];
      expect(pool.title).toBe("Learn test chapter");
      expect(pool.concepts.map((c: { code: string; prereqs: string[]; published: boolean }) => [c.code, c.prereqs, c.published])).toEqual([
        ["C01", [], true],
        ["C02", ["C01"], true],
        ["C03", ["C02"], false],
      ]);
    });

    it("learn_course_list lists courses for anyone (0191)", async () => {
      const { data, error } = await anon.rpc("learn_course_list");
      expect(error).toBeNull();
      expect((data as { slug: string }[]).find((c) => c.slug === COURSE)).toEqual({
        slug: COURSE,
        title: "Test Board",
        exam: EXAM,
        subject: "maths",
        standard: 12,
      });
    });

    it("re-seeding a course replaces its chapters", async () => {
      const { error } = await admin.rpc("learn_seed_courses", { p: { courses: [{ ...course, chapters: [course.chapters[0]] }] } });
      expect(error).toBeNull();
      const { data } = await anon.rpc("learn_course_outline", { p_course: COURSE });
      expect(data.chapters.map((c: { slug: string }) => c.slug)).toEqual(["first"]);
    });

    it("refuses a course that names a concept that does not exist", async () => {
      const bad = { ...course, chapters: [{ ...course.chapters[0], parts: [{ chapter: CHAPTER, concepts: ["C99"] }] }] };
      const { error } = await admin.rpc("learn_seed_courses", { p: { courses: [bad] } });
      expect(error?.message).toMatch(/C99/);
    });

    it("only the service role can seed", async () => {
      const { error } = await alice.rpc("learn_seed_courses", { p: { courses: [course] } });
      expect(error).not.toBeNull();
      const { error: ce } = await alice.rpc("learn_seed_chapter", { p: payload() });
      expect(ce).not.toBeNull();
    });
  });
});
