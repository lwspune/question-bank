/**
 * Free exams (migration 0210, owner 2026-11-02): an exam whose pass is 'free'
 * needs no pass. The Class 9-10 exams (CBSE 10, ICSE 10, Maharashtra 9 and 10,
 * SPI, Foundation Course) are free; every other exam keeps its limits.
 *
 * Rules pinned here (none needs the global paywall settings row):
 *   - the answer wall's day count leaves a free exam's questions out (0211)
 *   - a download knows when its paper is a free exam's
 *   - nobody can be sold, or hold, a 'free' pass: it is an exam setting only
 *
 * The mock and save limits on a free exam live in free-mock-limit and
 * free-save-limit, the files that own those settings columns: two files
 * changing the one settings row at once overwrite each other's limits.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { loadPaidRevealedToday, loadRevealedToday } from "@/lib/questions/revealQuota";
import { downloadIsFree } from "@/lib/export/freeExamDownload";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "free-exams-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("free exams (migration 0210)", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let studentId = "";
  let freeExamId = "";
  let paidExamId = "";
  let freeMockId = "";
  let paidMockId = "";
  const freeQuestionIds: string[] = [];
  let paidQuestionIds: string[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const email = `freeexams-${RUN_ID}@test.local`;
    const { data: u } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    studentId = u.user!.id;
    student = createClient(url, anon, { auth: { persistSession: false } });
    await mustSignIn(email, student, { email, password: PASSWORD });

    const { data: exams, error: examErr } = await admin
      .from("exams")
      .insert([
        { name: `zz test free exam ${RUN_ID}`, pass_scope: "free" },
        { name: `zz test paid exam ${RUN_ID}`, pass_scope: "mocks" },
      ])
      .select("id, pass_scope");
    expect(examErr).toBeNull();
    freeExamId = exams!.find((e) => e.pass_scope === "free")!.id;
    paidExamId = exams!.find((e) => e.pass_scope === "mocks")!.id;

    // Two real questions for the paid side, and two copies of one moved into the free exam.
    const { data: qs } = await admin
      .from("questions")
      .select("id, org_id, subject_id, chapter_id, difficulty, created_by")
      .eq("visibility", "PUBLIC")
      .order("created_at", { ascending: true })
      .limit(2);
    expect(qs).toHaveLength(2);
    paidQuestionIds = qs!.map((q) => q.id as string);
    const base = qs![0];
    for (let i = 0; i < 2; i++) {
      const { data, error } = await admin
        .from("questions")
        .insert({
          org_id: base.org_id,
          exam_id: freeExamId,
          subject_id: base.subject_id,
          chapter_id: base.chapter_id,
          difficulty: base.difficulty,
          created_by: base.created_by,
          text: `Free exam question ${i} ${RUN_ID}`,
          content_hash: `free-exams-${i}-${RUN_ID}`,
          visibility: "PRIVATE",
        })
        .select("id")
        .single();
      expect(error).toBeNull();
      freeQuestionIds.push(data!.id);
    }

    const mock = (examId: string, tag: string) => ({
      id: randomUUID(),
      slug: `free-exams-${tag}-${RUN_ID}`,
      scope: "full",
      exam_id: examId,
      paper_code: "maths",
      pyq_year: 2099,
      title: `Free exams ${tag} ${RUN_ID}`,
      duration_secs: 9000,
      marking: { correct: 1, wrong: 0 },
      sections: [{ key: "mathematics", label: "Mathematics", count: 1 }],
      questions: [{ position: 1, questionId: paidQuestionIds[0], sectionKey: "mathematics", marks: 1, negMarks: 0 }],
      total_questions: 1,
      total_marks: 1,
      status: "published",
    });
    const rows = [mock(freeExamId, "free"), mock(paidExamId, "paid")];
    const { error: mockErr } = await admin.from("mock_tests").insert(rows);
    expect(mockErr).toBeNull();
    freeMockId = rows[0].id;
    paidMockId = rows[1].id;
  });

  afterAll(async () => {
    const mocks = [freeMockId, paidMockId].filter(Boolean);
    if (mocks.length) await admin.from("mock_tests").delete().in("id", mocks);
    if (studentId) await admin.auth.admin.deleteUser(studentId);
    if (freeQuestionIds.length) await admin.from("questions").delete().in("id", freeQuestionIds);
    const exams = [freeExamId, paidExamId].filter(Boolean);
    if (exams.length) await admin.from("exams").delete().in("id", exams);
  });

  it("leaves a free exam's questions out of the day's answers (0211, the answer wall's count)", async () => {
    const rows = [freeQuestionIds[0], paidQuestionIds[0]].map((id) => ({
      user_id: studentId,
      kind: "question_practiced",
      ref_id: id,
      ref_kind: "question",
      metadata: { surface: "bank" },
    }));
    const { error } = await admin.from("user_activity").insert(rows);
    expect(error).toBeNull();
    const since = new Date(Date.now() - 3600_000).toISOString();
    expect(await loadPaidRevealedToday(student, since)).toEqual([paidQuestionIds[0]]);
    // The full list (V uses it to skip questions seen today) still has both.
    expect((await loadRevealedToday(student, studentId, since)).sort()).toEqual([freeQuestionIds[0], paidQuestionIds[0]].sort());
  });

  it("knows a download for a free exam, by every target a download names", async () => {
    expect(await downloadIsFree(admin, { examId: freeExamId })).toBe(true);
    expect(await downloadIsFree(admin, { examId: paidExamId })).toBe(false);
    const { data: fm } = await admin.from("mock_tests").select("slug").eq("id", freeMockId).single();
    const { data: pm } = await admin.from("mock_tests").select("slug").eq("id", paidMockId).single();
    expect(await downloadIsFree(admin, { mockSlug: fm!.slug })).toBe(true);
    expect(await downloadIsFree(admin, { mockSlug: pm!.slug })).toBe(false);
    expect(await downloadIsFree(admin, { questionIds: freeQuestionIds })).toBe(true);
    // Free only when EVERY selected question is: one paid question makes it paid.
    expect(await downloadIsFree(admin, { questionIds: [...freeQuestionIds, paidQuestionIds[0]] })).toBe(false);
    expect(await downloadIsFree(admin, { questionIds: [] })).toBe(false);
    expect(await downloadIsFree(admin, { mockSlug: `no-such-paper-${RUN_ID}` })).toBe(false);
  });

  it("refuses a 'free' scope on a pass", async () => {
    const { error } = await admin
      .from("entitlements")
      .insert({ user_id: studentId, scope: "free", source: "manual", status: "active", note: `test ${RUN_ID}` });
    expect(error).not.toBeNull();
  });

  it("refuses a pass_scope that is not a known pass", async () => {
    const { error } = await admin.from("exams").update({ pass_scope: "gratis" }).eq("id", freeExamId);
    expect(error).not.toBeNull();
  });
});
