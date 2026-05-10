/**
 * Verifies the deterministic sort that queryQuestions applies:
 *   created_at DESC, source_row ASC, id ASC
 *
 * The interesting case is "tied created_at" — bulk uploads insert all
 * rows with the same timestamp, so within an upload, the user expects
 * Excel-row order to be preserved. Without source_row in the sort key,
 * UUID order takes over and the printed paper can show questions in
 * random order.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { queryQuestions } from "@/lib/questions/query";
import { EMPTY_FILTERS } from "@/lib/questions/filters";
import { contentHash } from "@/lib/upload/hash";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("queryQuestions · within-upload sort order", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let userId: string;

  // The test pairs each source_row with an explicit UUID whose lexical
  // order is the OPPOSITE of source_row order. That way the failure mode
  // is deterministic: under "created_at DESC, id ASC" only, the rows
  // come back as source_row [5, 4, 3, 2, 1]; under the corrected sort
  // "created_at DESC, source_row ASC, id ASC" they come back as
  // [1, 2, 3, 4, 5]. Random UUIDs would only fail flakily.
  const FIXTURE = [
    { sourceRow: 5, id: "00000000-0000-0000-0000-000000000001" },
    { sourceRow: 4, id: "00000000-0000-0000-0000-000000000002" },
    { sourceRow: 3, id: "00000000-0000-0000-0000-000000000003" },
    { sourceRow: 2, id: "00000000-0000-0000-0000-000000000004" },
    { sourceRow: 1, id: "00000000-0000-0000-0000-000000000005" },
  ];

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `query-order-${RUN_ID}@test.local`,
      password: "qo-pw-1234",
      email_confirm: true,
    });
    userId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `QueryOrderOrg_${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;

    await admin.from("org_members").insert({
      org_id: orgId,
      user_id: userId,
      role: "ADMIN",
    });

    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .eq("name", "MHT-CET")
      .single();
    examId = exam!.id;

    const { data: subj } = await admin
      .from("subjects")
      .insert({ exam_id: examId, name: `QueryOrderSubj_${RUN_ID}` })
      .select("id")
      .single();
    subjectId = subj!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `QueryOrderChapter_${RUN_ID}`,
        order_index: 0,
      })
      .select("id")
      .single();
    chapterId = ch!.id;

    // Bulk insert in one shot so all rows get the same created_at — that's
    // the case where source_row breaks the tie. Each row's id is forced
    // (see FIXTURE comment) so failure is deterministic.
    const inserts = FIXTURE.map((f, i) => ({
      id: f.id,
      org_id: orgId,
      exam_id: examId,
      subject_id: subjectId,
      chapter_id: chapterId,
      text: `Q${i}_${RUN_ID}`,
      difficulty: "EASY" as const,
      content_hash: contentHash(`Q${i}_${RUN_ID}`, ["a", "b", "c", "d"], "A"),
      source_row: f.sourceRow,
      source_file: `query-order-${RUN_ID}.xlsx`,
      created_by: userId,
    }));

    const { data: rows } = await admin
      .from("questions")
      .insert(inserts)
      .select("id, source_row");

    // Add the 4 options each so QuestionRow shape is well-formed.
    const optionRows = rows!.flatMap((r) => [
      { question_id: r.id, label: "A", text: "a", is_correct: true },
      { question_id: r.id, label: "B", text: "b", is_correct: false },
      { question_id: r.id, label: "C", text: "c", is_correct: false },
      { question_id: r.id, label: "D", text: "d", is_correct: false },
    ]);
    await admin.from("options").insert(optionRows);
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (subjectId) await admin.from("subjects").delete().eq("id", subjectId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("returns questions in source_row ASC order when created_at is tied", async () => {
    const result = await queryQuestions(
      admin,
      orgId,
      { ...EMPTY_FILTERS, examId, subjectId },
      25
    );

    expect(result.totalCount).toBe(5);

    // Map each returned id back to its source_row and assert the sequence
    // is ASC (1, 2, 3, 4, 5) — not the insertion order (5, 1, 3, 4, 2).
    const { data: rows } = await admin
      .from("questions")
      .select("id, source_row")
      .in(
        "id",
        result.rows.map((r) => r.id)
      );
    const sourceRowById = new Map(rows!.map((r) => [r.id, r.source_row]));
    const returnedSourceRows = result.rows.map(
      (r) => sourceRowById.get(r.id) as number
    );
    expect(returnedSourceRows).toEqual([1, 2, 3, 4, 5]);
  });
});
