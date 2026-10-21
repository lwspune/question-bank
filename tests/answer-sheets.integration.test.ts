/**
 * Checked answer sheets (migration 0153): the rules the DATABASE enforces.
 *
 * The grade checker (lib/answerSheets/grade.ts) runs first, but a grade
 * reaches a student's report, so the database must refuse an impossible one
 * whatever writes it: marks above a question's maximum, a total above the
 * paper's, a second free submission on one day. A student reads only their
 * own sheets and grades, and can question a grade but never answer it.
 *
 * Migration 0175 adds a cause to every question that lost marks, and the marks
 * drawn on the student's pages, saved with the grade in the same commit.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { finishSubmission, startSubmission } from "@/lib/answerSheets/service";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Q = { id: string; exam_id: string; subject_id: string };
const RUN_ID = randomUUID().slice(0, 8);
const PASSWORD = "answer-sheet-test-pw-1234";

describe.skipIf(!HAS_ENV)("answer sheets (migration 0153)", () => {
  let admin: SupabaseClient;
  const students: { id: string; client: SupabaseClient }[] = [];
  let paperId = "";
  const slug = `test-answers-${RUN_ID}`;

  const submission = (userId: string, over: Record<string, unknown> = {}) => ({
    user_id: userId,
    board_paper_id: paperId,
    file_count: 3,
    consent_at: new Date().toISOString(),
    ...over,
  });

  /** A submission in `submitted`, for one student. */
  async function submitted(userId: string): Promise<string> {
    const { data, error } = await admin
      .from("answer_submissions")
      .insert(submission(userId, { status: "submitted", submitted_at: new Date().toISOString() }))
      .select("id")
      .single();
    if (error) throw new Error(`submission fixture: ${error.message}`);
    return data!.id as string;
  }

  const grades = (over: Record<string, unknown>[] = []) => [
    { position: 1, printedNumber: "1", questionId: null, maxMarks: 2, outcome: "scored", awarded: 1.5, earned: "Method.", missing: "Units.", cause: "careless", topic: null },
    { position: 2, printedNumber: "1 OR", questionId: null, maxMarks: 2, outcome: "not_attempted", awarded: null, earned: null, missing: null, cause: null, topic: null },
    { position: 3, printedNumber: "2", questionId: null, maxMarks: 3, outcome: "scored", awarded: 3, earned: "All steps.", missing: null, cause: null, topic: null },
    ...over,
  ];
  const mark = (position: number, kind: string, over: Record<string, unknown> = {}) => ({
    page: 1, position, kind, x: 50, y: 50, w: null, h: null, text: null, toX: null, toY: null, ...over,
  });
  const marks = () => [mark(1, "cross"), mark(1, "score"), mark(3, "tick", { page: 2 }), mark(3, "score", { page: 2 })];
  const commit = (id: string, g = grades(), m: unknown[] = marks(), pages = 2, turns: number[] = Array(pages).fill(0)) =>
    admin.rpc("answer_grade_commit", {
      p_submission: id,
      p_grades: g,
      p_went_well: "Neat working.",
      p_next_steps: "Units.",
      p_marks: m.map((x, i) => ({ seq: i + 1, ...(x as object) })),
      p_marked_pages: pages,
      p_page_turns: turns,
    });

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const { data: seed } = await admin.from("questions").select("id, exam_id, subject_id").eq("visibility", "PUBLIC").limit(200);
    const rows = (seed ?? []) as Q[];
    const first = rows[0];
    if (!first) throw new Error("no PUBLIC question in the test project");
    const qs = rows.filter((r) => r.exam_id === first.exam_id && r.subject_id === first.subject_id).slice(0, 3);
    if (qs.length < 3) throw new Error("need 3 PUBLIC questions of one exam and subject in the test project");

    const { error: pErr } = await admin.rpc("board_paper_replace", {
      p_paper: {
        examId: first.exam_id,
        subjectId: first.subject_id,
        slug,
        groupSlug: slug,
        setNumber: null,
        year: 2025,
        title: `Test answers paper ${RUN_ID}`,
        totalMarks: 5,
        durationMinutes: 180,
        sections: [{ key: "A", title: "Section A", note: "" }],
        published: true,
      },
      p_items: [
        { position: 1, printedNumber: "1", section: "A", marks: 2, alternativeTo: null, caseKey: null, questionId: qs[0].id },
        { position: 2, printedNumber: "1 OR", section: "A", marks: 2, alternativeTo: 1, caseKey: null, questionId: qs[1].id },
        { position: 3, printedNumber: "2", section: "A", marks: 3, alternativeTo: null, caseKey: null, questionId: qs[2].id },
      ],
    });
    if (pErr) throw new Error(`paper fixture: ${pErr.message}`);
    const { data: paper } = await admin.from("board_papers").select("id").eq("exam_id", first.exam_id).eq("slug", slug).single();
    paperId = paper!.id as string;

    for (let i = 0; i < 2; i++) {
      const email = `answers-${RUN_ID}-${i}@test.local`;
      const { data } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
      const client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
      await mustSignIn(email, client, { email, password: PASSWORD });
      students.push({ id: data.user!.id, client });
    }
  });

  afterAll(async () => {
    for (const s of students) {
      await admin.from("answer_submissions").delete().eq("user_id", s.id);
      await admin.auth.admin.deleteUser(s.id);
    }
    if (paperId) await admin.from("board_papers").delete().eq("id", paperId);
  });

  it("keeps the scans in a private bucket", async () => {
    const { data, error } = await admin.storage.getBucket("answer-sheets");
    expect(error).toBeNull();
    expect(data?.public).toBe(false);
  });

  it("lets a student read their own submission, never another's, and write none directly", async () => {
    const [a, b] = students;
    const id = await submitted(a.id);
    expect((await a.client.from("answer_submissions").select("id").eq("id", id)).data).toHaveLength(1);
    expect((await b.client.from("answer_submissions").select("id").eq("id", id)).data).toHaveLength(0);
    const { error } = await a.client.from("answer_submissions").insert(submission(a.id));
    expect(error).not.toBeNull();
    await admin.from("answer_submissions").delete().eq("id", id);
  });

  it("allows one free submission a day, and a rejected one does not use it up", async () => {
    const [a] = students;
    const first = await submitted(a.id);
    const again = await admin
      .from("answer_submissions")
      .insert(submission(a.id, { status: "submitted", submitted_at: new Date().toISOString() }));
    expect(again.error?.code).toBe("23505");

    const { error: rejErr } = await admin.rpc("answer_submission_reject", { p_submission: first, p_reason: "Photos too dark to read." });
    expect(rejErr).toBeNull();
    const second = await submitted(a.id);
    expect(second).toBeTruthy();
    await admin.from("answer_submissions").delete().eq("user_id", a.id);
  });

  it("keeps at most one unfinished upload per student", async () => {
    const [a] = students;
    expect((await admin.from("answer_submissions").insert(submission(a.id))).error).toBeNull();
    expect((await admin.from("answer_submissions").insert(submission(a.id))).error?.code).toBe("23505");
    await admin.from("answer_submissions").delete().eq("user_id", a.id);
  });

  it("refuses marks above a question's maximum, and marks finer than a half", async () => {
    const [a] = students;
    const id = await submitted(a.id);
    const row = (over: Record<string, unknown>) => ({
      submission_id: id,
      position: 1,
      printed_number: "1",
      max_marks: 2,
      outcome: "scored",
      awarded: 1,
      ...over,
    });
    expect((await admin.from("answer_grades").insert(row({ awarded: 3 }))).error?.code).toBe("23514");
    expect((await admin.from("answer_grades").insert(row({ awarded: 1.25 }))).error?.code).toBe("23514");
    expect((await admin.from("answer_grades").insert(row({ outcome: "not_attempted", awarded: 1 }))).error?.code).toBe("23514");
    expect((await admin.from("answer_grades").insert(row({ outcome: "scored", awarded: null }))).error?.code).toBe("23514");
    await admin.from("answer_submissions").delete().eq("id", id);
  });

  it("names a cause on every question that lost marks, and only there", async () => {
    const [a] = students;
    const id = await submitted(a.id);
    const row = (over: Record<string, unknown>) => ({
      submission_id: id,
      position: 1,
      printed_number: "1",
      max_marks: 2,
      outcome: "scored",
      awarded: 1,
      cause: "careless",
      ...over,
    });
    const code = async (over: Record<string, unknown>) => {
      const r = await admin.from("answer_grades").insert(row(over));
      if (!r.error) await admin.from("answer_grades").delete().eq("submission_id", id);
      return r.error?.code ?? null;
    };
    expect(await code({})).toBeNull();
    expect(await code({ cause: null })).toBe("23514");
    expect(await code({ cause: "lazy" })).toBe("23514");
    expect(await code({ awarded: 2 })).toBe("23514"); // full marks, yet a cause
    expect(await code({ outcome: "not_attempted", awarded: null })).toBe("23514");
    expect(await code({ cause: "concept" })).toBe("23514"); // needs its topic
    expect(await code({ cause: "concept", topic: "Ohm's law" })).toBeNull();
    expect(await code({ cause: "careless", topic: "x".repeat(61) })).toBe("23514");
    await admin.from("answer_submissions").delete().eq("id", id);
  });

  it("commits a grade in one step: rows, total from the rows, status graded", async () => {
    const [a, b] = students;
    const id = await submitted(a.id);
    const { data: total, error } = await commit(id);
    expect(error).toBeNull();
    expect(Number(total)).toBe(4.5);
    const { data: sub } = await admin.from("answer_submissions").select("status, total_awarded, total_max, graded_at").eq("id", id).single();
    expect(sub).toMatchObject({ status: "graded" });
    expect(Number(sub!.total_awarded)).toBe(4.5);
    expect(Number(sub!.total_max)).toBe(5);

    expect((await a.client.from("answer_grades").select("position").eq("submission_id", id)).data).toHaveLength(3);
    expect((await b.client.from("answer_grades").select("position").eq("submission_id", id)).data).toHaveLength(0);

    // The marks on the pages, saved with the grade; the student reads their own.
    const { data: saved } = await admin.from("answer_submissions").select("marked_pages, page_turns").eq("id", id).single();
    expect(saved!.marked_pages).toBe(2);
    expect(saved!.page_turns).toEqual([0, 0]);
    expect((await a.client.from("answer_page_marks").select("seq").eq("submission_id", id)).data).toHaveLength(4);
    expect((await b.client.from("answer_page_marks").select("seq").eq("submission_id", id)).data).toHaveLength(0);

    // A regrade (after a question raised) replaces the rows and the marks.
    const regrade = grades();
    regrade[0] = { ...regrade[0], awarded: 2, missing: null, cause: null };
    const remarks = [mark(1, "tick"), mark(1, "score"), mark(3, "score", { page: 2 })];
    // Page 2 was turned a quarter clockwise this time: a later pull turns it again.
    expect((await commit(id, regrade, remarks, 2, [0, 1])).error).toBeNull();
    const { data: turned } = await admin.from("answer_submissions").select("page_turns").eq("id", id).single();
    expect(turned!.page_turns).toEqual([0, 1]);
    const { data: after } = await admin.from("answer_submissions").select("total_awarded").eq("id", id).single();
    expect(Number(after!.total_awarded)).toBe(5);
    expect((await admin.from("answer_page_marks").select("kind").eq("submission_id", id).order("seq")).data?.map((r) => r.kind)).toEqual([
      "tick",
      "score",
      "score",
    ]);
    await admin.from("answer_submissions").delete().eq("id", id);
  });

  it("refuses marks that disagree with the grade or the pages", async () => {
    const [a] = students;
    const id = await submitted(a.id);
    const refused = async (m: unknown[], pages = 2) => (await commit(id, grades(), m, pages)).error !== null;
    // A scored question with no score mark, or two; a score on one not attempted.
    expect(await refused(marks().filter((_m, i) => i !== 1))).toBe(true);
    expect(await refused([...marks(), mark(1, "score")])).toBe(true);
    expect(await refused([...marks(), mark(2, "score")])).toBe(true);
    // A mark on a page past the prepared pages, or for a question not graded.
    expect(await refused(marks(), 1)).toBe(true);
    expect(await refused([...marks(), mark(9, "tick")])).toBe(true);
    // One quarter-turn count (0 to 3) per marked page.
    expect((await commit(id, grades(), marks(), 2, [0])).error).not.toBeNull();
    expect((await commit(id, grades(), marks(), 2, [0, 4])).error).not.toBeNull();
    // Each kind carries only its own fields.
    expect(await refused([...marks(), mark(1, "circle")])).toBe(true);
    expect(await refused([...marks(), mark(1, "note")])).toBe(true);
    expect(await refused([...marks(), mark(1, "cross", { text: "x" })])).toBe(true);
    const { data: still } = await admin.from("answer_submissions").select("status").eq("id", id).single();
    expect(still!.status).toBe("submitted");
    // And a sound set passes.
    expect(await refused([...marks(), mark(1, "circle", { w: 10, h: 4 }), mark(1, "note", { text: "Unit", toX: 40, toY: 52 })])).toBe(false);
    await admin.from("answer_submissions").delete().eq("id", id);
  });

  it("refuses a grade whose total is over the paper's maximum, or one for an unfinished upload", async () => {
    const [a] = students;
    const id = await submitted(a.id);
    const over = grades();
    over[1] = { ...over[1], outcome: "scored", awarded: 2, earned: "x", missing: null };
    const { error } = await commit(id, over, [...marks(), mark(2, "score")]);
    expect(error?.message).toMatch(/over the paper's maximum/);
    expect(error).not.toBeNull();
    const { data: still } = await admin.from("answer_submissions").select("status").eq("id", id).single();
    expect(still!.status).toBe("submitted");
    await admin.from("answer_submissions").delete().eq("id", id);

    const { data: up } = await admin.from("answer_submissions").insert(submission(a.id)).select("id").single();
    expect((await commit(up!.id as string)).error).not.toBeNull();
    await admin.from("answer_submissions").delete().eq("id", up!.id);
  });

  it("uploads through signed links, and queues the sheet only once every file has arrived", async () => {
    const [a] = students;
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    const files = [
      { type: "image/png", size: 68, ext: "png" },
      { type: "application/pdf", size: 100, ext: "pdf" },
    ];
    const started = await startSubmission(admin, a.id, paperId, files);
    expect(started.kind).toBe("ok");
    if (started.kind !== "ok") return;
    expect(started.uploads.map((u) => u.path)).toEqual([
      `${a.id}/${started.submissionId}/01.png`,
      `${a.id}/${started.submissionId}/02.pdf`,
    ]);

    // One file up: not yet.
    const png = new Blob([new Uint8Array(68)], { type: "image/png" });
    const up1 = await anon.storage.from("answer-sheets").uploadToSignedUrl(started.uploads[0].path, started.uploads[0].token, png);
    expect(up1.error).toBeNull();
    expect(await finishSubmission(admin, a.id, started.submissionId)).toBe("missing-files");

    // The bucket refuses a type the grader cannot read, whatever the link.
    const txt = new Blob(["hello"], { type: "text/plain" });
    const bad = await anon.storage
      .from("answer-sheets")
      .uploadToSignedUrl(started.uploads[1].path, started.uploads[1].token, txt, { contentType: "text/plain" });
    expect(bad.error).not.toBeNull();

    const pdf = new Blob([new Uint8Array(100)], { type: "application/pdf" });
    const up2 = await anon.storage
      .from("answer-sheets")
      .uploadToSignedUrl(started.uploads[1].path, started.uploads[1].token, pdf, { contentType: "application/pdf" });
    expect(up2.error).toBeNull();

    // Another student cannot finish it; the owner can, once.
    expect(await finishSubmission(admin, students[1].id, started.submissionId)).toBe("not-found");
    expect(await finishSubmission(admin, a.id, started.submissionId)).toBe("ok");
    expect(await finishSubmission(admin, a.id, started.submissionId)).toBe("not-found");

    // The student cannot read the scans through their own session.
    const { data: listed } = await a.client.storage.from("answer-sheets").list(`${a.id}/${started.submissionId}`);
    expect(listed ?? []).toHaveLength(0);

    // The day is used: a second start is refused.
    expect((await startSubmission(admin, a.id, paperId, files)).kind).toBe("limit");

    await admin.storage.from("answer-sheets").remove(started.uploads.map((u) => u.path));
    await admin.from("answer_submissions").delete().eq("user_id", a.id);
  });

  it("starting again discards an unfinished upload and its files", async () => {
    const [, b] = students;
    const files = [{ type: "image/png", size: 68, ext: "png" }];
    const first = await startSubmission(admin, b.id, paperId, files);
    if (first.kind !== "ok") throw new Error("first start refused");
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    await anon.storage
      .from("answer-sheets")
      .uploadToSignedUrl(first.uploads[0].path, first.uploads[0].token, new Blob([new Uint8Array(68)], { type: "image/png" }));
    const second = await startSubmission(admin, b.id, paperId, files);
    expect(second.kind).toBe("ok");
    const { data: old } = await admin.from("answer_submissions").select("id").eq("id", first.submissionId);
    expect(old).toHaveLength(0);
    const { data: oldFiles } = await admin.storage.from("answer-sheets").list(`${b.id}/${first.submissionId}`);
    expect(oldFiles ?? []).toHaveLength(0);
    await admin.from("answer_submissions").delete().eq("user_id", b.id);
  });

  it("lets a student question a grade on their own graded sheet, once, and never answer it", async () => {
    const [a, b] = students;
    const id = await submitted(a.id);
    expect((await commit(id)).error).toBeNull();
    const dispute = { submission_id: id, position: 1, user_id: a.id, message: "I wrote the units on page 3." };

    expect((await b.client.from("answer_grade_disputes").insert({ ...dispute, user_id: b.id })).error).not.toBeNull();
    expect(
      (await a.client.from("answer_grade_disputes").insert({ ...dispute, resolution: "Fine.", resolved_at: new Date().toISOString() })).error
    ).not.toBeNull();
    expect((await a.client.from("answer_grade_disputes").insert(dispute)).error).toBeNull();
    expect((await a.client.from("answer_grade_disputes").insert(dispute)).error).not.toBeNull();
    expect((await a.client.from("answer_grade_disputes").select("message").eq("submission_id", id)).data).toHaveLength(1);
    expect((await b.client.from("answer_grade_disputes").select("message").eq("submission_id", id)).data).toHaveLength(0);
    await admin.from("answer_submissions").delete().eq("id", id);
  });
});
