/**
 * Practice tests (migration 0156): a test V builds for ONE student.
 *
 * It lives in mock_tests beside the past papers, so the runner, grader and
 * result page serve it unchanged. What keeps it private is the database:
 *   - status 'personal' + scope 'custom' + an owner, all three or none
 *   - only its owner can read it or start it; anon and other students cannot
 *   - every list of tests reads status 'published', so it never appears there
 *   - one free practice test a day (paywall_settings.free_practice_tests_per_day,
 *     by the India date); a retake is free, a pass or staff is never limited
 *   - my_mock_quota() and free_limits() report the daily number
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "practice-tests-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const FUTURE = new Date(Date.now() + 3600_000).toISOString();
const ROLES = ["owner", "other", "pass"] as const;
type Role = (typeof ROLES)[number];

describe.skipIf(!HAS_ENV)("practice tests (migration 0156)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  const ids = {} as Record<Role, string>;
  const clients = {} as Record<Role, SupabaseClient>;
  const created: string[] = [];
  let examId = "";
  let questionId = "";
  let saved: Record<string, unknown> | null = null;

  function personalRow(owner: string | null, extra: Record<string, unknown> = {}) {
    const id = randomUUID();
    return {
      id,
      slug: `practice-test-${RUN_ID}-${id.slice(0, 8)}`,
      exam_id: examId,
      paper_code: "maths",
      source: "pyq",
      scope: "custom",
      pyq_year: null,
      title: `Practice test ${RUN_ID}`,
      duration_secs: 600,
      marking: { correct: 2.5, wrong: -0.83 },
      sections: [{ key: "mathematics", label: "Mathematics", count: 1 }],
      questions: [{ position: 1, questionId, sectionKey: "mathematics", marks: 2.5, negMarks: -0.83 }],
      total_questions: 1,
      total_marks: 2.5,
      status: "personal",
      owner_id: owner,
      ...extra,
    };
  }

  async function makeTest(owner: Role): Promise<string> {
    const row = personalRow(ids[owner]);
    const { error } = await admin.from("mock_tests").insert(row);
    expect(error).toBeNull();
    created.push(row.id);
    return row.id;
  }

  const start = (role: Role, mockId: string) =>
    clients[role]
      .from("mock_attempts")
      .insert({ mock_id: mockId, user_id: ids[role], expires_at: FUTURE })
      .select("id")
      .single();

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, anonKey, { auth: { persistSession: false } });

    for (const role of ROLES) {
      const email = `practice-${role}-${RUN_ID}@test.local`;
      const { data } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
      ids[role] = data.user!.id;
      clients[role] = createClient(url, anonKey, { auth: { persistSession: false } });
      await mustSignIn(email, clients[role], { email, password: PASSWORD });
    }

    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    examId = exam!.id;
    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    questionId = q!.id;

    await admin.from("entitlements").insert({
      user_id: ids.pass,
      scope: "mocks",
      source: "manual",
      status: "active",
      note: `test ${RUN_ID}`,
    });

    const { data: prev, error: readErr } = await admin
      .from("paywall_settings")
      .select("free_practice_tests_per_day")
      .single();
    expect(readErr).toBeNull();
    saved = prev;
    await admin.from("paywall_settings").update({ free_practice_tests_per_day: 1 }).eq("id", true);
  });

  afterAll(async () => {
    if (saved) await admin.from("paywall_settings").update(saved).eq("id", true);
    if (created.length) await admin.from("mock_tests").delete().in("id", created);
    for (const role of ROLES) if (ids[role]) await admin.auth.admin.deleteUser(ids[role]);
  });

  it("refuses a personal test without an owner, and an owned test that is not personal", async () => {
    const { error: noOwner } = await admin.from("mock_tests").insert(personalRow(null));
    expect(noOwner).not.toBeNull();
    const { error: published } = await admin
      .from("mock_tests")
      .insert(personalRow(ids.owner, { status: "published" }));
    expect(published).not.toBeNull();
    const { error: notCustom } = await admin
      .from("mock_tests")
      .insert(personalRow(ids.owner, { scope: "sectional" }));
    expect(notCustom).not.toBeNull();
  });

  it("shows a practice test to its owner only", async () => {
    const id = await makeTest("owner");
    const mine = await clients.owner.from("mock_tests").select("id").eq("id", id);
    expect(mine.data).toHaveLength(1);
    const theirs = await clients.other.from("mock_tests").select("id").eq("id", id);
    expect(theirs.data ?? []).toHaveLength(0);
    const signedOut = await anon.from("mock_tests").select("id").eq("id", id);
    expect(signedOut.data ?? []).toHaveLength(0);
  });

  it("keeps practice tests out of the published list, even for their owner", async () => {
    await makeTest("owner");
    const { data } = await clients.owner
      .from("mock_tests")
      .select("id")
      .eq("status", "published")
      .eq("scope", "custom");
    expect(data ?? []).toHaveLength(0);
  });

  it("lets only the owner start a practice test", async () => {
    const id = await makeTest("owner");
    const { error } = await start("other", id);
    expect(error).not.toBeNull();
    expect(error?.code).not.toBe("PT402");
  });

  it("gives one free practice test a day, refuses the second with PT402, and lets the first be retaken", async () => {
    const first = await makeTest("owner");
    const second = await makeTest("owner");
    expect((await start("owner", first)).error).toBeNull();
    const refused = await start("owner", second);
    expect(refused.error?.code).toBe("PT402");

    await admin
      .from("mock_attempts")
      .update({ status: "submitted" })
      .eq("user_id", ids.owner)
      .eq("mock_id", first);
    expect((await start("owner", first)).error).toBeNull();
  });

  it("does not count yesterday's practice test", async () => {
    const yesterday = await makeTest("other");
    const today = await makeTest("other");
    const { error } = await admin.from("mock_attempts").insert({
      mock_id: yesterday,
      user_id: ids.other,
      started_at: new Date(Date.now() - 2 * 86_400_000).toISOString(),
      expires_at: FUTURE,
      status: "submitted",
    });
    expect(error).toBeNull();
    expect((await start("other", today)).error).toBeNull();
  });

  it("never limits a pass holder", async () => {
    for (let i = 0; i < 3; i++) {
      const id = await makeTest("pass");
      expect((await start("pass", id)).error).toBeNull();
    }
  });

  it("reports the daily number in my_mock_quota and free_limits", async () => {
    const { data } = await clients.owner.rpc("my_mock_quota");
    expect(data).toMatchObject({ practiceLimit: 1, practiceUsed: 1 });
    const { data: limits } = await anon.rpc("free_limits");
    expect(limits).toMatchObject({ practiceTestsPerDay: 1 });
  });

  it("blocks nothing when the daily number is NULL (off)", async () => {
    await admin.from("paywall_settings").update({ free_practice_tests_per_day: null }).eq("id", true);
    const id = await makeTest("owner");
    expect((await start("owner", id)).error).toBeNull();
    await admin.from("paywall_settings").update({ free_practice_tests_per_day: 1 }).eq("id", true);
  });
});
