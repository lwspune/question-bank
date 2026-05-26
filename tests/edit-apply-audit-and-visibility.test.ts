/**
 * Audit fields + visibility guard on applyEdit (migration 0025).
 *
 * Exercises the two new behaviours added when teachers were granted
 * edit access:
 *   - last_edited_by + last_edited_at are stamped when `editorUserId` is
 *     passed, and left null otherwise.
 *   - When the caller is a TEACHER, attempting to change `visibility`
 *     returns `kind: "forbidden_field"` instead of letting the update
 *     through (defence in depth on top of the UI hiding the toggle).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { applyEdit } from "@/lib/questions/applyEdit";
import { validateEditPayload } from "@/lib/questions/edit";
import { contentHash } from "@/lib/upload/hash";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("applyEdit audit + visibility guard", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let adminUserId: string;
  let teacherUserId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let questionId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: a } = await admin.auth.admin.createUser({
      email: `audit-admin-${RUN_ID}@test.local`,
      password: "audit-test-pw-1234",
      email_confirm: true,
    });
    adminUserId = a.user!.id;

    const { data: t } = await admin.auth.admin.createUser({
      email: `audit-teacher-${RUN_ID}@test.local`,
      password: "audit-test-pw-1234",
      email_confirm: true,
    });
    teacherUserId = t.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Audit Org ${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;

    await admin.from("org_members").insert([
      { user_id: adminUserId, org_id: orgId, role: "ADMIN" },
      { user_id: teacherUserId, org_id: orgId, role: "TEACHER" },
    ]);

    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .eq("name", "MHT-CET")
      .single();
    examId = exam!.id;

    const { data: subj } = await admin
      .from("subjects")
      .insert({ exam_id: examId, name: `AuditSubject_${RUN_ID}` })
      .select("id")
      .single();
    subjectId = subj!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `AuditChapter_${RUN_ID}`,
        order_index: 0,
      })
      .select("id")
      .single();
    chapterId = ch!.id;

    const initialHash = contentHash("Audit Q?", ["A1", "B1", "C1", "D1"], "A");
    const { data: q } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: "Audit Q?",
        difficulty: "EASY",
        visibility: "PUBLIC",
        content_hash: initialHash,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    questionId = q!.id;

    await admin.from("options").insert([
      { question_id: questionId, label: "A", text: "A1", is_correct: true },
      { question_id: questionId, label: "B", text: "B1", is_correct: false },
      { question_id: questionId, label: "C", text: "C1", is_correct: false },
      { question_id: questionId, label: "D", text: "D1", is_correct: false },
    ]);
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (subjectId) await admin.from("subjects").delete().eq("id", subjectId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
    if (teacherUserId) await admin.auth.admin.deleteUser(teacherUserId);
  });

  function build(overrides: Record<string, unknown> = {}) {
    const payload = {
      text: "Audit Q?",
      context: null,
      difficulty: "EASY" as const,
      solution: null,
      imageUrl: null,
      subjectId,
      chapterId,
      subtopicId: null,
      visibility: "PUBLIC" as const,
      correct: "A" as const,
      options: [
        { label: "A" as const, text: "A1", imageUrl: null },
        { label: "B" as const, text: "B1", imageUrl: null },
        { label: "C" as const, text: "C1", imageUrl: null },
        { label: "D" as const, text: "D1", imageUrl: null },
      ],
      ...overrides,
    };
    const v = validateEditPayload(payload);
    if (!v.ok) throw new Error(`fixture invalid: ${v.errors.join(", ")}`);
    return v;
  }

  it("stamps last_edited_by + last_edited_at when editorUserId is provided", async () => {
    const before = new Date();
    const v = build({ text: "Edited by audit test" });
    const res = await applyEdit(admin, questionId, orgId, v.payload, v.contentHash, adminUserId);
    expect(res.kind).toBe("ok");

    const { data } = await admin
      .from("questions")
      .select("last_edited_by, last_edited_at")
      .eq("id", questionId)
      .single();
    expect(data?.last_edited_by).toBe(adminUserId);
    expect(data?.last_edited_at).toBeTruthy();
    expect(new Date(data!.last_edited_at!).getTime()).toBeGreaterThanOrEqual(
      before.getTime() - 1000
    );
  });

  it("does NOT stamp last_edited_by when editorUserId is omitted (legacy callers)", async () => {
    // Reset to a clean baseline first.
    await admin
      .from("questions")
      .update({ last_edited_by: null, last_edited_at: null })
      .eq("id", questionId);

    const v = build({ text: "Edited without audit" });
    const res = await applyEdit(admin, questionId, orgId, v.payload, v.contentHash);
    expect(res.kind).toBe("ok");

    const { data } = await admin
      .from("questions")
      .select("last_edited_by, last_edited_at")
      .eq("id", questionId)
      .single();
    expect(data?.last_edited_by).toBeNull();
    expect(data?.last_edited_at).toBeNull();
  });

  it("TEACHER changing visibility returns forbidden_field (PUBLIC → PRIVATE blocked)", async () => {
    // Ensure baseline is PUBLIC.
    await admin
      .from("questions")
      .update({ visibility: "PUBLIC" })
      .eq("id", questionId);

    const v = build({ visibility: "PRIVATE", text: "Trying to flip vis" });
    const res = await applyEdit(
      admin,
      questionId,
      orgId,
      v.payload,
      v.contentHash,
      teacherUserId,
      "TEACHER"
    );
    expect(res.kind).toBe("forbidden_field");
    if (res.kind === "forbidden_field") {
      expect(res.field).toBe("visibility");
    }
    // And the actual visibility hasn't moved.
    const { data } = await admin
      .from("questions")
      .select("visibility")
      .eq("id", questionId)
      .single();
    expect(data?.visibility).toBe("PUBLIC");
  });

  it("TEACHER editing other fields (text) without touching visibility succeeds", async () => {
    const v = build({ text: "Teacher edit, visibility preserved" });
    const res = await applyEdit(
      admin,
      questionId,
      orgId,
      v.payload,
      v.contentHash,
      teacherUserId,
      "TEACHER"
    );
    expect(res.kind).toBe("ok");

    const { data } = await admin
      .from("questions")
      .select("text, last_edited_by, visibility")
      .eq("id", questionId)
      .single();
    expect(data?.text).toBe("Teacher edit, visibility preserved");
    expect(data?.last_edited_by).toBe(teacherUserId);
    expect(data?.visibility).toBe("PUBLIC");
  });

  it("ADMIN can change visibility (PUBLIC → PRIVATE → PUBLIC)", async () => {
    // PUBLIC → PRIVATE
    const v1 = build({ visibility: "PRIVATE", text: "Admin flips to private" });
    const r1 = await applyEdit(
      admin,
      questionId,
      orgId,
      v1.payload,
      v1.contentHash,
      adminUserId,
      "ADMIN"
    );
    expect(r1.kind).toBe("ok");

    // PRIVATE → PUBLIC (restore baseline)
    const v2 = build({ visibility: "PUBLIC", text: "Admin flips back to public" });
    const r2 = await applyEdit(
      admin,
      questionId,
      orgId,
      v2.payload,
      v2.contentHash,
      adminUserId,
      "ADMIN"
    );
    expect(r2.kind).toBe("ok");

    const { data } = await admin
      .from("questions")
      .select("visibility")
      .eq("id", questionId)
      .single();
    expect(data?.visibility).toBe("PUBLIC");
  });
});
