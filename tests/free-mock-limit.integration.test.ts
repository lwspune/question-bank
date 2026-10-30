/**
 * The free-mock limit (migration 0120), enforced by a BEFORE INSERT trigger on
 * mock_attempts. It lives in the database, not the start route, because a
 * student's own JWT can insert an attempt straight through PostgREST — an
 * app-only check would be a button, not a limit.
 *
 * Rules pinned here:
 *   - limit NULL (the shipped default) = off; nothing is blocked
 *   - a student may START `free_mock_limit` DIFFERENT mocks from `counts_from`
 *   - a mock already started (any time) can be retaken without using a slot
 *   - a mock first started BEFORE `counts_from` does not use a slot
 *   - a mock pass, a teacher pass, and org staff are never blocked
 *   - the refusal is SQLSTATE PT402, which PostgREST serves as HTTP 402
 *   - my_mock_quota() reports the same numbers the trigger uses
 *   - a chapter test (scope 'sectional') counts against its OWN limit
 *     (free_chapter_test_limit, migration 0134), never against the mocks
 *   - my_mock_quota() also reports the practice-test day (migration 0156;
 *     its own rules are in practice-tests.integration.test.ts)
 *   - a paper a friend sent (migration 0166: a mock_invite_joins row) starts
 *     free past either limit and is not counted, unless the student had
 *     already started it before joining; someone else's join frees nobody
 *   - a pass covers the EXAMS it is for (migration 0206): the www pass
 *     (`mocks`) does not let a student past the limit on an IMAT mock, and
 *     the IMAT pass does not on an Indian one; my_mock_quota lists the
 *     user's passes as `passScopes`
 *
 * The settings row is global, so this suite restores it in afterAll. Other
 * suites start at most one mock per user, so the limit cannot trip them.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "free-mock-limit-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const FUTURE = new Date(Date.now() + 3600_000).toISOString();
const ROLES = [
  "student", "early", "mockpass", "teacherpass", "staff", "off", "invited", "inviter", "imatpass", "mocksonimat",
] as const;
type Role = (typeof ROLES)[number];

describe.skipIf(!HAS_ENV)("free-mock limit (migration 0120)", () => {
  let admin: SupabaseClient;
  const ids = {} as Record<Role, string>;
  const clients = {} as Record<Role, SupabaseClient>;
  const mockIds: string[] = [];
  let orgId = "";
  const chapterIds: string[] = [];
  // An exam that asks for the IMAT pass (0206), and four full mocks in it.
  let imatExamId = "";
  const imatMockIds: string[] = [];
  let saved: Record<string, unknown> | null = null;
  let countsFrom = "";

  const start = (role: Role, mockIdx: number) =>
    clients[role]
      .from("mock_attempts")
      .insert({ mock_id: mockIds[mockIdx], user_id: ids[role], expires_at: FUTURE })
      .select("id")
      .single();

  const startChapter = (role: Role, idx: number) =>
    clients[role]
      .from("mock_attempts")
      .insert({ mock_id: chapterIds[idx], user_id: ids[role], expires_at: FUTURE })
      .select("id")
      .single();

  const startImat = (role: Role, idx: number) =>
    clients[role]
      .from("mock_attempts")
      .insert({ mock_id: imatMockIds[idx], user_id: ids[role], expires_at: FUTURE })
      .select("id")
      .single();

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });

    for (const role of ROLES) {
      const email = `freemock-${role}-${RUN_ID}@test.local`;
      const { data } = await admin.auth.admin.createUser({
        email,
        password: PASSWORD,
        email_confirm: true,
      });
      ids[role] = data.user!.id;
      clients[role] = createClient(url, anon, { auth: { persistSession: false } });
      await mustSignIn(email, clients[role], { email, password: PASSWORD });
    }

    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    for (let i = 0; i < 6; i++) {
      const chapter = i >= 4;
      const { data, error } = await admin
        .from("mock_tests")
        .insert({
          id: randomUUID(),
          slug: `free-mock-limit-${i}-${RUN_ID}`,
          scope: chapter ? "sectional" : "full",
          exam_id: exam!.id,
          paper_code: "maths",
          pyq_year: 2099,
          title: `Free mock limit ${i} ${RUN_ID}`,
          duration_secs: 9000,
          marking: { correct: 2.5, wrong: -0.83 },
          sections: [{ key: "mathematics", label: "Mathematics", count: 1 }],
          questions: [
            { position: 1, questionId: q!.id, sectionKey: "mathematics", marks: 2.5, negMarks: -0.83 },
          ],
          total_questions: 1,
          total_marks: 2.5,
          status: "published",
        })
        .select("id")
        .single();
      expect(error).toBeNull();
      (chapter ? chapterIds : mockIds).push(data!.id);
    }

    const { data: imatExam, error: examErr } = await admin
      .from("exams")
      .insert({ name: `Pass scope exam ${RUN_ID}`, pass_scope: "imat" })
      .select("id")
      .single();
    expect(examErr).toBeNull();
    imatExamId = imatExam!.id;
    for (let i = 0; i < 4; i++) {
      const { data, error } = await admin
        .from("mock_tests")
        .insert({
          id: randomUUID(),
          slug: `free-mock-limit-imat-${i}-${RUN_ID}`,
          scope: "full",
          exam_id: imatExamId,
          paper_code: "maths",
          pyq_year: 2099,
          title: `Free mock limit IMAT ${i} ${RUN_ID}`,
          duration_secs: 9000,
          marking: { correct: 1.5, wrong: -0.4 },
          sections: [{ key: "mathematics", label: "Mathematics", count: 1 }],
          questions: [
            { position: 1, questionId: q!.id, sectionKey: "mathematics", marks: 1.5, negMarks: -0.4 },
          ],
          total_questions: 1,
          total_marks: 1.5,
          status: "published",
        })
        .select("id")
        .single();
      expect(error).toBeNull();
      imatMockIds.push(data!.id);
    }

    const { error: entErr } = await admin.from("entitlements").insert([
      { user_id: ids.mockpass, scope: "mocks", source: "manual", status: "active", note: `test ${RUN_ID}` },
      { user_id: ids.teacherpass, scope: "teacher", source: "manual", status: "active", note: `test ${RUN_ID}` },
      { user_id: ids.imatpass, scope: "imat", source: "manual", status: "active", note: `test ${RUN_ID}` },
      { user_id: ids.mocksonimat, scope: "mocks", source: "manual", status: "active", note: `test ${RUN_ID}` },
    ]);
    expect(entErr).toBeNull();
    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Free mock limit org ${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;
    await admin.from("org_members").insert({ user_id: ids.staff, org_id: orgId, role: "TEACHER" });

    // "early" started mock 3 BEFORE the limit's start date, so it is not a slot.
    countsFrom = new Date(Date.now() - 60_000).toISOString();
    const { error: earlyErr } = await admin.from("mock_attempts").insert({
      mock_id: mockIds[3],
      user_id: ids.early,
      started_at: new Date(Date.now() - 86_400_000).toISOString(),
      expires_at: FUTURE,
      status: "submitted",
    });
    expect(earlyErr).toBeNull();

    const { data: prev, error: readErr } = await admin
      .from("paywall_settings")
      .select("free_mock_limit, counts_from, free_chapter_test_limit, chapter_tests_counts_from, free_practice_tests_per_day")
      .single();
    expect(readErr).toBeNull();
    saved = prev;
    const { error: setErr } = await admin
      .from("paywall_settings")
      .update({
        free_mock_limit: 3,
        counts_from: countsFrom,
        free_chapter_test_limit: 1,
        chapter_tests_counts_from: countsFrom,
        free_practice_tests_per_day: 1,
      })
      .eq("id", true);
    expect(setErr).toBeNull();
  });

  afterAll(async () => {
    if (saved) {
      await admin.from("paywall_settings").update(saved).eq("id", true);
    }
    // Deleting the mocks cascades their attempts; deleting users cascades the rest.
    const all = [...mockIds, ...chapterIds, ...imatMockIds];
    if (all.length) await admin.from("mock_tests").delete().in("id", all);
    if (imatExamId) await admin.from("exams").delete().eq("id", imatExamId);
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    for (const role of ROLES) if (ids[role]) await admin.auth.admin.deleteUser(ids[role]);
  });

  it("lets a student start three different mocks, then refuses the fourth with PT402", async () => {
    for (let i = 0; i < 3; i++) expect((await start("student", i)).error).toBeNull();
    const { error } = await start("student", 3);
    expect(error?.code).toBe("PT402");
  });

  it("reports the student's quota: 3 of 3 used, no pass", async () => {
    const { data, error } = await clients.student.rpc("my_mock_quota");
    expect(error).toBeNull();
    expect(data).toEqual({
      limit: 3,
      used: 3,
      hasPass: false,
      passScopes: [],
      chapterLimit: 1,
      chapterUsed: 0,
      practiceLimit: 1,
      practiceUsed: 0,
    });
  });

  it("lets a student with no free mocks left still start a chapter test, then refuses the next", async () => {
    expect((await startChapter("student", 0)).error).toBeNull();
    const { error } = await startChapter("student", 1);
    expect(error?.code).toBe("PT402");
    const { data } = await clients.student.rpc("my_mock_quota");
    expect(data).toEqual({
      limit: 3,
      used: 3,
      hasPass: false,
      passScopes: [],
      chapterLimit: 1,
      chapterUsed: 1,
      practiceLimit: 1,
      practiceUsed: 0,
    });
  });

  it("does not count chapter tests against the mock limit", async () => {
    expect((await startChapter("early", 0)).error).toBeNull();
    const { data } = await clients.early.rpc("my_mock_quota");
    expect(data).toMatchObject({ used: 0, chapterUsed: 1 });
  });

  it("lets a student at the limit retake a mock they already started", async () => {
    // One live attempt per mock is a separate unique index, so finish it first.
    await admin
      .from("mock_attempts")
      .update({ status: "submitted" })
      .eq("user_id", ids.student)
      .eq("mock_id", mockIds[0]);
    expect((await start("student", 0)).error).toBeNull();
  });

  it("does not count a mock first started before the limit began", async () => {
    for (let i = 0; i < 3; i++) expect((await start("early", i)).error).toBeNull();
    const { data } = await clients.early.rpc("my_mock_quota");
    expect(data).toMatchObject({ limit: 3, used: 3, hasPass: false });
  });

  it.each(["mockpass", "teacherpass", "staff"] as Role[])(
    "never blocks %s",
    async (role) => {
      for (let i = 0; i < 4; i++) expect((await start(role, i)).error).toBeNull();
      for (let i = 0; i < 2; i++) expect((await startChapter(role, i)).error).toBeNull();
    }
  );

  it("reports a pass holder as hasPass", async () => {
    const { data } = await clients.teacherpass.rpc("my_mock_quota");
    expect(data).toMatchObject({ hasPass: true });
  });

  it("does not let the www pass past the limit on an exam with its own pass", async () => {
    for (let i = 0; i < 3; i++) expect((await startImat("mocksonimat", i)).error).toBeNull();
    expect((await startImat("mocksonimat", 3)).error?.code).toBe("PT402");
    // Its own exams stay unlimited.
    expect((await start("mocksonimat", 0)).error).toBeNull();
  });

  it("lets the IMAT pass past the limit on IMAT only", async () => {
    for (let i = 0; i < 3; i++) expect((await start("imatpass", i)).error).toBeNull();
    expect((await start("imatpass", 3)).error?.code).toBe("PT402");
    for (let i = 0; i < 4; i++) expect((await startImat("imatpass", i)).error).toBeNull();
  });

  it("lists the user's passes in my_mock_quota and my_premium_limits", async () => {
    const { data: imat } = await clients.imatpass.rpc("my_mock_quota");
    expect(imat).toMatchObject({ hasPass: false, passScopes: ["imat"] });
    const { data: mocks } = await clients.mockpass.rpc("my_premium_limits");
    expect(mocks).toMatchObject({ hasPass: true, passScopes: ["mocks"] });
    const { data: staff } = await clients.staff.rpc("my_mock_quota");
    expect(staff).toMatchObject({ hasPass: true, passScopes: ["all"] });
  });

  it("blocks nothing when the limit is NULL (off)", async () => {
    await admin
      .from("paywall_settings")
      .update({ free_mock_limit: null, free_chapter_test_limit: null })
      .eq("id", true);
    for (let i = 0; i < 4; i++) expect((await start("off", i)).error).toBeNull();
    for (let i = 0; i < 2; i++) expect((await startChapter("off", i)).error).toBeNull();
    const { data } = await clients.off.rpc("my_mock_quota");
    expect(data).toMatchObject({ limit: null, chapterLimit: null });
    await admin
      .from("paywall_settings")
      .update({ free_mock_limit: 3, free_chapter_test_limit: 1 })
      .eq("id", true);
  });

  async function inviteAndJoin(mockId: string): Promise<void> {
    const code = randomUUID().replace(/-/g, "").slice(0, 12);
    const { data: inv, error } = await admin
      .from("mock_invites")
      .insert({ code, mock_id: mockId, inviter_id: ids.inviter })
      .select("id")
      .single();
    expect(error).toBeNull();
    const { error: joinErr } = await admin
      .from("mock_invite_joins")
      .insert({ invite_id: inv!.id, mock_id: mockId, inviter_id: ids.inviter, friend_id: ids.invited });
    expect(joinErr).toBeNull();
  }

  it("starts a paper a friend sent free past the limit, and does not count it", async () => {
    for (let i = 0; i < 3; i++) expect((await start("invited", i)).error).toBeNull();
    expect((await start("invited", 3)).error?.code).toBe("PT402");
    expect((await startChapter("invited", 0)).error).toBeNull();
    expect((await startChapter("invited", 1)).error?.code).toBe("PT402");

    await inviteAndJoin(mockIds[3]);
    await inviteAndJoin(chapterIds[1]);
    expect((await start("invited", 3)).error).toBeNull();
    expect((await startChapter("invited", 1)).error).toBeNull();

    const { data } = await clients.invited.rpc("my_mock_quota");
    expect(data).toMatchObject({ used: 3, chapterUsed: 1 });
  });

  it("does not give back a slot for a paper started before the student joined", async () => {
    await inviteAndJoin(mockIds[0]);
    const { data } = await clients.invited.rpc("my_mock_quota");
    expect(data).toMatchObject({ used: 3 });
  });

  it("frees only the student who joined, never anyone else", async () => {
    // "student" is at the mock limit and was refused mock 3 earlier.
    expect((await start("student", 3)).error?.code).toBe("PT402");
  });

  it("hides the settings row from a signed-in student", async () => {
    const { data } = await clients.student.from("paywall_settings").select("*");
    expect(data ?? []).toHaveLength(0);
  });
});
