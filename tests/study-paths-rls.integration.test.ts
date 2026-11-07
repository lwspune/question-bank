/**
 * The board path's tables (migration 0225), against a real database.
 *
 *   - study_paths: a student starts and ends their OWN path, holds one active
 *     path at a time, and the CHECKs refuse another board, another subject
 *     and an absurd pace; nobody else reads it
 *   - study_path_deferrals: only on the student's own ACTIVE path
 *   - study_path_days + study_path_test_grants: read own, written by the
 *     service role only (the free-limit exemptions come from them, so a
 *     student must not be able to write them)
 *   - user_activity takes `path_chapter_done`
 *
 * The free start of a granted test is pinned in
 * free-mock-limit.integration.test.ts, which owns the settings row.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const PASSWORD = `Pw-${RUN_ID}-paths`;
const ROLES = ["sam", "riya"] as const;
type Role = (typeof ROLES)[number];

describe.skipIf(!HAS_ENV)("study paths (migration 0225)", () => {
  let admin: SupabaseClient;
  const ids = {} as Record<Role, string>;
  const clients = {} as Record<Role, SupabaseClient>;
  let chapterId = "";
  let mockId = "";
  let samPath = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    for (const role of ROLES) {
      const email = `study-paths-${role}-${RUN_ID}@test.local`;
      const { data } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
      ids[role] = data.user!.id;
      clients[role] = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
      await mustSignIn(`study paths ${role}`, clients[role], { email, password: PASSWORD });
    }
    const { data: q, error: qErr } = await admin
      .from("questions")
      .select("id, exam_id, chapter_id")
      .eq("visibility", "PUBLIC")
      .not("chapter_id", "is", null)
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    expect(qErr).toBeNull();
    chapterId = q!.chapter_id;
    mockId = randomUUID();
    const { error: mErr } = await admin.from("mock_tests").insert({
      id: mockId,
      slug: `study-paths-${RUN_ID}`,
      exam_id: q!.exam_id,
      paper_code: "maths",
      scope: "sectional",
      pyq_year: 2099,
      title: `Study paths ${RUN_ID}`,
      duration_secs: 600,
      marking: { correct: 1, wrong: 0 },
      sections: [{ key: "s", label: "S", count: 1 }],
      questions: [{ position: 1, questionId: q!.id, sectionKey: "s", marks: 1, negMarks: 0 }],
      total_questions: 1,
      total_marks: 1,
      status: "published",
    });
    expect(mErr).toBeNull();
  });

  afterAll(async () => {
    if (mockId) await admin.from("mock_tests").delete().eq("id", mockId);
    // Deleting the users cascades their paths, deferrals, days, grants and activity.
    for (const role of ROLES) if (ids[role]) await admin.auth.admin.deleteUser(ids[role]);
  });

  const newPath = (role: Role, extra: Record<string, unknown> = {}) =>
    clients[role]
      .from("study_paths")
      .insert({ user_id: ids[role], exam_slug: "cbse-12", subjects: ["physics", "chemistry", "mathematics"], daily_minutes: 55, ...extra })
      .select("id")
      .single();

  it("lets a student start their own path", async () => {
    const { data, error } = await newPath("sam");
    expect(error).toBeNull();
    samPath = data!.id;
  });

  it("holds one active path per student", async () => {
    const { error } = await newPath("sam");
    expect(error?.code).toBe("23505");
  });

  it("refuses a path for another student", async () => {
    const { error } = await clients.riya
      .from("study_paths")
      .insert({ user_id: ids.sam, exam_slug: "cbse-12", subjects: ["physics"], daily_minutes: 55 });
    expect(error?.code).toBe("42501");
  });

  it("refuses another board, another subject and an absurd pace", async () => {
    expect((await newPath("riya", { exam_slug: "nda" })).error?.code).toBe("23514");
    expect((await newPath("riya", { subjects: ["biology"] })).error?.code).toBe("23514");
    expect((await newPath("riya", { subjects: [] })).error?.code).toBe("23514");
    expect((await newPath("riya", { daily_minutes: 600 })).error?.code).toBe("23514");
  });

  it("keeps a path private to its student", async () => {
    const { data } = await clients.riya.from("study_paths").select("id").eq("id", samPath);
    expect(data ?? []).toHaveLength(0);
  });

  it("records 'Not taught yet' on the student's own active path only", async () => {
    const own = await clients.sam
      .from("study_path_deferrals")
      .insert({ path_id: samPath, user_id: ids.sam, chapter_id: chapterId });
    expect(own.error).toBeNull();
    const theirs = await clients.riya
      .from("study_path_deferrals")
      .insert({ path_id: samPath, user_id: ids.riya, chapter_id: chapterId });
    expect(theirs.error?.code).toBe("42501");
  });

  it("refuses the student writing today's pick or a test grant: those carry the free-limit exemptions", async () => {
    const day = await clients.sam
      .from("study_path_days")
      .insert({ user_id: ids.sam, day: "2026-11-25", path_id: samPath, tasks: [] });
    expect(day.error?.code).toBe("42501");
    const grant = await clients.sam
      .from("study_path_test_grants")
      .insert({ user_id: ids.sam, mock_id: mockId, path_id: samPath });
    expect(grant.error?.code).toBe("42501");
  });

  it("lets the service role write them and the student read their own", async () => {
    const day = await admin.from("study_path_days").insert({
      user_id: ids.sam,
      day: "2026-11-25",
      path_id: samPath,
      tasks: [{ kind: "sheet", chapterId, minutes: 10 }],
      exempt_question_ids: [],
      fix_question_ids: [],
    });
    expect(day.error).toBeNull();
    const grant = await admin.from("study_path_test_grants").insert({ user_id: ids.sam, mock_id: mockId, path_id: samPath });
    expect(grant.error).toBeNull();

    expect((await clients.sam.from("study_path_days").select("day")).data).toHaveLength(1);
    expect((await clients.sam.from("study_path_test_grants").select("mock_id")).data).toHaveLength(1);
    expect((await clients.riya.from("study_path_days").select("day")).data ?? []).toHaveLength(0);
    expect((await clients.riya.from("study_path_test_grants").select("mock_id")).data ?? []).toHaveLength(0);
  });

  it("caps the Fix task at 5 questions", async () => {
    const six = Array.from({ length: 6 }, () => randomUUID());
    const { error } = await admin
      .from("study_path_days")
      .insert({ user_id: ids.sam, day: "2026-11-26", path_id: samPath, tasks: [], fix_question_ids: six });
    expect(error?.code).toBe("23514");
  });

  it("lets a student end their path and start again", async () => {
    const end = await clients.sam.from("study_paths").update({ ended_at: new Date().toISOString() }).eq("id", samPath);
    expect(end.error).toBeNull();
    const again = await newPath("sam");
    expect(again.error).toBeNull();
  });

  it("takes a path_chapter_done event", async () => {
    const { error } = await clients.sam.from("user_activity").insert({
      user_id: ids.sam,
      kind: "path_chapter_done",
      ref_id: chapterId,
      ref_kind: "chapter",
      metadata: { exam: "cbse-12" },
      dedupe_key: `path_chapter_done:${ids.sam}:${chapterId}`,
    });
    expect(error).toBeNull();
  });
});
