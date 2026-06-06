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

/**
 * Verifies the chapter-scoped teaching-order sort: when a chapter is filtered,
 * questions lead with their subtopic's order_index (migration 0029), so a
 * chapter reads in the order it is taught. NULL order_index (subtopics with no
 * teaching order) sorts LAST. This also proves the PostgREST embedded-resource
 * ordering (`referencedTable: "subtopic"`) actually works against live PostgREST.
 */
describe.skipIf(!HAS_ENV)("queryQuestions · subtopic teaching order", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let userId: string;

  // Three subtopics whose order_index is the OPPOSITE of their questions'
  // source_row, so the old sort (source_row ASC) and the new sort
  // (subtopic.order_index ASC NULLS LAST) disagree deterministically:
  //   subB: order_index 1,    source_row 5
  //   subA: order_index 2,    source_row 1
  //   subC: order_index NULL,  source_row 0
  // Old sort would return source_row [0, 1, 5] → order_index [NULL, 2, 1].
  // New sort returns order_index [1, 2, NULL].
  const subIds = {
    A: "00000000-0000-0000-0000-0000000000a1",
    B: "00000000-0000-0000-0000-0000000000b1",
    C: "00000000-0000-0000-0000-0000000000c1",
  };
  let orderById: Map<string, number | null>;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `teach-order-${RUN_ID}@test.local`,
      password: "to-pw-1234",
      email_confirm: true,
    });
    userId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `TeachOrderOrg_${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;

    await admin
      .from("org_members")
      .insert({ org_id: orgId, user_id: userId, role: "ADMIN" });

    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .eq("name", "MHT-CET")
      .single();
    examId = exam!.id;

    const { data: subj } = await admin
      .from("subjects")
      .insert({ exam_id: examId, name: `TeachOrderSubj_${RUN_ID}` })
      .select("id")
      .single();
    subjectId = subj!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `TeachOrderChapter_${RUN_ID}`,
        order_index: 0,
      })
      .select("id")
      .single();
    chapterId = ch!.id;

    await admin.from("subtopics").insert([
      { id: subIds.A, chapter_id: chapterId, name: `subA_${RUN_ID}`, order_index: 2 },
      { id: subIds.B, chapter_id: chapterId, name: `subB_${RUN_ID}`, order_index: 1 },
      { id: subIds.C, chapter_id: chapterId, name: `subC_${RUN_ID}`, order_index: null },
    ]);

    const fixture = [
      { sub: subIds.A, sourceRow: 1 },
      { sub: subIds.B, sourceRow: 5 },
      { sub: subIds.C, sourceRow: 0 },
    ];
    const inserts = fixture.map((f, i) => ({
      org_id: orgId,
      exam_id: examId,
      subject_id: subjectId,
      chapter_id: chapterId,
      subtopic_id: f.sub,
      text: `TQ${i}_${RUN_ID}`,
      difficulty: "EASY" as const,
      content_hash: contentHash(`TQ${i}_${RUN_ID}`, ["a", "b", "c", "d"], "A"),
      source_row: f.sourceRow,
      source_file: `teach-order-${RUN_ID}.xlsx`,
      created_by: userId,
    }));
    const { data: rows } = await admin
      .from("questions")
      .insert(inserts)
      .select("id, subtopic_id");

    const subOrder = new Map<string, number | null>([
      [subIds.A, 2],
      [subIds.B, 1],
      [subIds.C, null],
    ]);
    orderById = new Map(
      rows!.map((r) => [r.id, subOrder.get(r.subtopic_id as string) ?? null])
    );

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

  it("orders questions by subtopic order_index (NULLs last) when a chapter is filtered", async () => {
    const result = await queryQuestions(
      admin,
      orgId,
      { ...EMPTY_FILTERS, examId, subjectId, chapterIds: [chapterId] },
      25
    );
    expect(result.totalCount).toBe(3);
    const returnedOrder = result.rows.map((r) => orderById.get(r.id) ?? null);
    expect(returnedOrder).toEqual([1, 2, null]);
  });
});
