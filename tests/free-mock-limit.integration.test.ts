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
const ROLES = ["student", "early", "mockpass", "teacherpass", "staff", "off"] as const;
type Role = (typeof ROLES)[number];

describe.skipIf(!HAS_ENV)("free-mock limit (migration 0120)", () => {
  let admin: SupabaseClient;
  const ids = {} as Record<Role, string>;
  const clients = {} as Record<Role, SupabaseClient>;
  const mockIds: string[] = [];
  let orgId = "";
  let saved: { free_mock_limit: number | null; counts_from: string | null } | null = null;
  let countsFrom = "";

  const start = (role: Role, mockIdx: number) =>
    clients[role]
      .from("mock_attempts")
      .insert({ mock_id: mockIds[mockIdx], user_id: ids[role], expires_at: FUTURE })
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
    for (let i = 0; i < 4; i++) {
      const { data, error } = await admin
        .from("mock_tests")
        .insert({
          id: randomUUID(),
          slug: `free-mock-limit-${i}-${RUN_ID}`,
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
      mockIds.push(data!.id);
    }

    await admin.from("entitlements").insert([
      { user_id: ids.mockpass, scope: "mocks", source: "manual", status: "active", note: `test ${RUN_ID}` },
      { user_id: ids.teacherpass, scope: "teacher", source: "manual", status: "active", note: `test ${RUN_ID}` },
    ]);
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
      .select("free_mock_limit, counts_from")
      .single();
    expect(readErr).toBeNull();
    saved = prev;
    const { error: setErr } = await admin
      .from("paywall_settings")
      .update({ free_mock_limit: 3, counts_from: countsFrom })
      .eq("id", true);
    expect(setErr).toBeNull();
  });

  afterAll(async () => {
    if (saved) {
      await admin.from("paywall_settings").update(saved).eq("id", true);
    }
    // Deleting the mocks cascades their attempts; deleting users cascades the rest.
    if (mockIds.length) await admin.from("mock_tests").delete().in("id", mockIds);
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
    expect(data).toEqual({ limit: 3, used: 3, hasPass: false });
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
    expect(data).toEqual({ limit: 3, used: 3, hasPass: false });
  });

  it.each(["mockpass", "teacherpass", "staff"] as Role[])(
    "never blocks %s",
    async (role) => {
      for (let i = 0; i < 4; i++) expect((await start(role, i)).error).toBeNull();
    }
  );

  it("reports a pass holder as hasPass", async () => {
    const { data } = await clients.teacherpass.rpc("my_mock_quota");
    expect(data).toMatchObject({ hasPass: true });
  });

  it("blocks nothing when the limit is NULL (off)", async () => {
    await admin.from("paywall_settings").update({ free_mock_limit: null }).eq("id", true);
    for (let i = 0; i < 4; i++) expect((await start("off", i)).error).toBeNull();
    const { data } = await clients.off.rpc("my_mock_quota");
    expect(data).toMatchObject({ limit: null });
    await admin.from("paywall_settings").update({ free_mock_limit: 3 }).eq("id", true);
  });

  it("hides the settings row from a signed-in student", async () => {
    const { data } = await clients.student.from("paywall_settings").select("*");
    expect(data ?? []).toHaveLength(0);
  });
});
