/**
 * Regression test for src/lib/guide/loadWorkedExamples.ts — the `context`
 * (passage) field must round-trip so set-bound PYQs rendered inline in /notes
 * (featured example + mastery checkpoint) and /guide deep-dives keep the
 * passage that makes them solvable.
 *
 * Uses a service-role client. Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { loadWorkedExamples } from "@/lib/guide/loadWorkedExamples";
import { formatProvenance } from "@/lib/questions/formatProvenance";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const ORG_NAME = `Worked Ctx Org ${RUN_ID}`;
const USER_EMAIL = `worked-ctx-${RUN_ID}@test.local`;
const PASSAGE = `For the next item that follow: P(1,2,3), Q(4,5,6) ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("loadWorkedExamples — context round-trip", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let userId: string;
  let examName: string | null;
  let withContextId: string;
  let withoutContextId: string;

  const QNUM = "42";
  const PYEAR = 2024;
  const PMONTH = "Apr";
  const PNOTE = "NDA 1";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const { data: u } = await admin.auth.admin.createUser({
      email: USER_EMAIL,
      password: "worked-ctx-1234",
      email_confirm: true,
    });
    userId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: ORG_NAME })
      .select("id")
      .single();
    orgId = org!.id;
    await admin.from("org_members").insert({ org_id: orgId, user_id: userId, role: "ADMIN" });

    const { data: ex } = await admin.from("exams").select("id, name").limit(1).single();
    examName = ex!.name;
    const { data: sb } = await admin.from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin.from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();

    const { data: qCtx, error: qCtxErr } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `worked-ctx-with ${RUN_ID}`,
        context: PASSAGE,
        difficulty: "MODERATE",
        content_hash: `worked-ctx-with-${RUN_ID}`,
        visibility: "PUBLIC",
        created_by: userId,
        question_number: QNUM,
        pyq_year: PYEAR,
        pyq_month: PMONTH,
        pyq_note: PNOTE,
      })
      .select("id")
      .single();
    if (qCtxErr || !qCtx) throw new Error(`with-context insert: ${qCtxErr?.message ?? "no data"}`);
    withContextId = qCtx.id;

    const { data: qNo, error: qNoErr } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `worked-ctx-without ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `worked-ctx-without-${RUN_ID}`,
        visibility: "PUBLIC",
        created_by: userId,
      })
      .select("id")
      .single();
    if (qNoErr || !qNo) throw new Error(`without-context insert: ${qNoErr?.message ?? "no data"}`);
    withoutContextId = qNo.id;
  });

  afterAll(async () => {
    if (withContextId) await admin.from("questions").delete().eq("id", withContextId);
    if (withoutContextId) await admin.from("questions").delete().eq("id", withoutContextId);
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("returns the passage in `context` for a set-bound question", async () => {
    const [row] = await loadWorkedExamples(admin, [withContextId]);
    expect(row.context).toBe(PASSAGE);
  });

  it("returns null `context` for a standalone question", async () => {
    const [row] = await loadWorkedExamples(admin, [withoutContextId]);
    expect(row.context).toBeNull();
  });

  it("composes the provenance bracket from the PYQ metadata + exam", async () => {
    const [row] = await loadWorkedExamples(admin, [withContextId]);
    const expected = formatProvenance({
      examName,
      questionNumber: QNUM,
      pyqYear: PYEAR,
      pyqMonth: PMONTH,
      pyqNote: PNOTE,
    });
    expect(expected).not.toBeNull();
    expect(row.provenance).toBe(expected);
    expect(row.provenance).toContain(`Q${QNUM}`);
    expect(row.provenance).toContain(String(PYEAR));
  });

  it("returns null `provenance` when the question has no PYQ metadata", async () => {
    const [row] = await loadWorkedExamples(admin, [withoutContextId]);
    expect(row.provenance).toBeNull();
  });
});
