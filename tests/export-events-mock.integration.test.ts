/**
 * A past paper downloaded whole is logged with WHICH paper (migration 0136).
 *
 * export_events deliberately never recorded what a teacher's export contained
 * (0104: a paper a teacher built is a sensitive record). A published past paper
 * is public, so naming it costs nothing and answers the question this feature
 * exists to answer: which papers do people pay for.
 *
 * mock_id is set ONLY on a 'mock' row, but a 'mock' row may lose it: if a paper
 * is ever deleted, ON DELETE SET NULL keeps the download history rather than
 * blocking the delete.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { recordExportEvent } from "@/lib/export/log";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("export_events: past-paper downloads", () => {
  let admin: SupabaseClient;
  const mockId = randomUUID();

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: exam, error: examErr } = await admin.from("exams").select("id").limit(1).single();
    if (examErr || !exam) throw new Error(`no exam in the test project: ${examErr?.message}`);
    const { error } = await admin.from("mock_tests").insert({
      id: mockId,
      slug: `export-events-test-${mockId}`,
      exam_id: exam.id,
      paper_code: "test",
      pyq_year: 2026,
      title: "export_events fixture",
      duration_secs: 60,
      marking: { correct: 4, wrong: -1 },
      total_questions: 0,
      total_marks: 0,
      status: "draft",
    });
    if (error) throw new Error(`mock fixture: ${error.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("export_events").delete().eq("mock_id", mockId);
    await admin.from("mock_tests").delete().eq("id", mockId);
  });

  it("records which paper was downloaded", async () => {
    await recordExportEvent({
      userId: null,
      orgId: null,
      kind: "paper",
      questionCount: 75,
      mode: "mock",
      mockId,
      isStaff: false,
    });
    const { data } = await admin.from("export_events").select("mode, mock_id, question_count").eq("mock_id", mockId);
    expect(data).toEqual([{ mode: "mock", mock_id: mockId, question_count: 75 }]);
  });

  it("refuses a paper id on a filters or cart export", async () => {
    const { error } = await admin
      .from("export_events")
      .insert({ kind: "paper", question_count: 1, mode: "cart", mock_id: mockId });
    expect(error).not.toBeNull();
  });

  it("keeps the download when the paper is deleted", async () => {
    const { error } = await admin.from("mock_tests").delete().eq("id", mockId);
    expect(error).toBeNull();
    const { data } = await admin
      .from("export_events")
      .select("mode, mock_id")
      .eq("mode", "mock")
      .is("mock_id", null)
      .eq("question_count", 75);
    expect(data?.length).toBeGreaterThanOrEqual(1);
    await admin.from("export_events").delete().eq("mode", "mock").is("mock_id", null).eq("question_count", 75);
  });
});
