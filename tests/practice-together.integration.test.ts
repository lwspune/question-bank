/**
 * Step 2 of "send a practice test to a friend": the loaders behind the shared
 * results card and the "your friend finished" push, against a real database.
 *
 *   - the card compares the viewer's sitting with every friend in the group
 *     (the original test plus its copies), first finished attempt each
 *   - a test nobody else has gives no card; a group where nobody else has
 *     finished gives the waiting state
 *   - another group's sittings never appear, and only the attempt's owner gets
 *     a card for it
 *   - the push loader finds groups with a recent finish, with first names
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { loadTogetherCard, readFriendFinishGroups } from "@/lib/practiceTests/togetherService";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const ROLES = ["sender", "riya", "loner", "stranger"] as const;
type Role = (typeof ROLES)[number];

describe.skipIf(!HAS_ENV)("practice together loaders", () => {
  let admin: SupabaseClient;
  const ids = {} as Record<Role, string>;
  const tests: string[] = [];
  let examId = "";
  /** Two MCQs and the label that is right for each. */
  const qs: { id: string; right: string; wrong: string }[] = [];

  function testRow(owner: string, extra: Record<string, unknown> = {}) {
    const id = randomUUID();
    return {
      id,
      slug: `practice-together-${RUN_ID}-${id.slice(0, 8)}`,
      exam_id: examId,
      paper_code: "maths",
      source: "pyq",
      scope: "custom",
      pyq_year: null,
      title: `Together ${RUN_ID}`,
      duration_secs: 600,
      marking: { correct: 1, wrong: 0 },
      sections: [{ key: "s", label: "S", count: 2 }],
      questions: qs.map((q, i) => ({ position: i + 1, questionId: q.id, sectionKey: "s", marks: 1, negMarks: 0 })),
      total_questions: 2,
      total_marks: 2,
      status: "personal",
      owner_id: owner,
      ...extra,
    };
  }

  async function makeTest(owner: Role, sharedFrom?: string): Promise<string> {
    const row = testRow(ids[owner], sharedFrom ? { shared_from: sharedFrom } : {});
    const { error } = await admin.from("mock_tests").insert(row);
    expect(error).toBeNull();
    tests.push(row.id);
    return row.id;
  }

  /** A finished attempt answering q1 and q2 right (true) or wrong (false). */
  async function sit(owner: Role, mockId: string, answers: [boolean, boolean], hoursAgo = 1): Promise<string> {
    const submitted = new Date(Date.now() - hoursAgo * 3_600_000).toISOString();
    const { data, error } = await admin
      .from("mock_attempts")
      .insert({
        mock_id: mockId,
        user_id: ids[owner],
        started_at: submitted,
        expires_at: submitted,
        submitted_at: submitted,
        status: "submitted",
      })
      .select("id")
      .single();
    expect(error).toBeNull();
    const attemptId = data!.id as string;
    const { error: ansErr } = await admin.from("attempt_answers").insert(
      qs.map((q, i) => ({ attempt_id: attemptId, question_id: q.id, selected_label: answers[i] ? q.right : q.wrong }))
    );
    expect(ansErr).toBeNull();
    return attemptId;
  }

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const names: Record<Role, string> = { sender: "sam kumar", riya: "Riya Sharma", loner: "Lee", stranger: "Stan" };
    for (const role of ROLES) {
      const { data } = await admin.auth.admin.createUser({
        email: `together-${role}-${RUN_ID}@test.local`,
        password: "together-pw-1234",
        email_confirm: true,
        user_metadata: { full_name: names[role] },
      });
      ids[role] = data.user!.id;
      // A pass, so the one-free-a-day trigger never refuses a fixture sitting.
      await admin
        .from("entitlements")
        .insert({ user_id: ids[role], scope: "mocks", source: "manual", status: "active", note: `test ${RUN_ID}` });
    }
    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    examId = exam!.id;
    const { data: rows } = await admin
      .from("questions")
      .select("id, options(label, is_correct)")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .order("created_at", { ascending: true })
      .limit(10);
    for (const r of (rows ?? []) as { id: string; options: { label: string; is_correct: boolean }[] }[]) {
      const right = r.options.find((o) => o.is_correct)?.label;
      const wrong = r.options.find((o) => !o.is_correct)?.label;
      if (right && wrong && qs.length < 2) qs.push({ id: r.id, right, wrong });
    }
    expect(qs).toHaveLength(2);
  });

  afterAll(async () => {
    if (tests.length) await admin.from("mock_tests").delete().in("id", [...tests].reverse());
    for (const role of ROLES) if (ids[role]) await admin.auth.admin.deleteUser(ids[role]);
  });

  it("compares the viewer with a friend who sat a copy, by first name", async () => {
    const root = await makeTest("sender");
    const copy = await makeTest("riya", root);
    const mine = await sit("sender", root, [true, false], 5);
    await sit("riya", copy, [false, false], 2);
    // A later retake does not replace Riya's first sitting.
    await sit("riya", copy, [true, true], 1);

    const got = await loadTogetherCard(admin, ids.sender, mine);
    expect(got).toEqual({
      state: "ready",
      card: { friendNames: ["Riya"], allMissed: [2], theyGot: [], youGot: [{ position: 1, names: ["Riya"] }] },
    });

    // The friend sees it the other way round.
    const { data: riyaFirst } = await admin
      .from("mock_attempts")
      .select("id")
      .eq("mock_id", copy)
      .order("submitted_at", { ascending: true })
      .limit(1)
      .single();
    const theirs = await loadTogetherCard(admin, ids.riya, riyaFirst!.id as string);
    expect(theirs).toMatchObject({ state: "ready", card: { friendNames: ["Sam"], theyGot: [{ position: 1, names: ["Sam"] }] } });
  });

  it("gives no card for a test nobody else has, and the waiting state when nobody else has finished", async () => {
    const solo = await makeTest("loner");
    const soloAttempt = await sit("loner", solo, [true, true]);
    expect(await loadTogetherCard(admin, ids.loner, soloAttempt)).toBeNull();

    const root = await makeTest("loner");
    await makeTest("stranger", root);
    const rootAttempt = await sit("loner", root, [true, true]);
    expect(await loadTogetherCard(admin, ids.loner, rootAttempt)).toEqual({ state: "waiting" });
  });

  it("gives nothing to someone who does not own the attempt", async () => {
    const root = await makeTest("sender");
    await makeTest("riya", root);
    const attempt = await sit("sender", root, [true, true]);
    expect(await loadTogetherCard(admin, ids.stranger, attempt)).toBeNull();
  });

  it("logs a 'friend_finished' push (migration 0164)", async () => {
    const key = `friend_finished:${ids.sender}:${RUN_ID}:x`;
    const { error } = await admin
      .from("push_sends")
      .insert({ user_id: ids.sender, kind: "friend_finished", dedupe_key: key, status: "sent" });
    expect(error).toBeNull();
    await admin.from("push_sends").delete().eq("dedupe_key", key);
  });

  it("finds groups with a recent finish, every finisher with a first name", async () => {
    const root = await makeTest("sender");
    const copy = await makeTest("riya", root);
    await sit("sender", root, [true, true], 30);
    await sit("riya", copy, [true, true], 1);
    const groups = await readFriendFinishGroups(admin, new Date(Date.now() - 2 * 3_600_000).toISOString());
    const g = groups.find((x) => x.rootId === root);
    expect(g).toBeDefined();
    expect(g!.finishers.map((f) => f.name).sort()).toEqual(["Riya", "Sam"]);
  });
});
