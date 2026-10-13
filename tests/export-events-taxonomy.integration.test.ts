/**
 * A download is logged with the exam and subject it was for (migration 0155).
 *
 * 0104 left out the filter set and question ids on purpose. The exam and
 * subject are taxonomy, not a teacher's paper, so naming them costs nothing
 * and answers the question the log could not: which exams students download
 * for. Both FKs are ON DELETE SET NULL so a taxonomy cleanup never blocks on,
 * or erases, download history.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { recordExportEvent } from "@/lib/export/log";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
// Distinctive enough that cleanup cannot touch another test's rows.
const COUNT = 7919;

describe.skipIf(!HAS_ENV)("export_events: exam and subject", () => {
  let admin: SupabaseClient;
  let examId: string;
  let subjectId: string;

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: subject, error } = await admin.from("subjects").select("id, exam_id").limit(1).single();
    if (error || !subject) throw new Error(`no subject in the test project: ${error?.message}`);
    examId = subject.exam_id;
    subjectId = subject.id;
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("export_events").delete().eq("question_count", COUNT);
  });

  it("records the exam and subject of a filtered paper", async () => {
    await recordExportEvent({
      userId: null,
      orgId: null,
      kind: "paper",
      questionCount: COUNT,
      mode: "filters",
      examId,
      subjectId,
      isStaff: false,
    });
    const { data } = await admin
      .from("export_events")
      .select("mode, exam_id, subject_id")
      .eq("question_count", COUNT)
      .eq("mode", "filters");
    expect(data).toEqual([{ mode: "filters", exam_id: examId, subject_id: subjectId }]);
  });

  it("leaves both empty on a mixed paper", async () => {
    await recordExportEvent({
      userId: null,
      orgId: null,
      kind: "key",
      questionCount: COUNT,
      mode: "cart",
      examId: null,
      subjectId: null,
      isStaff: false,
    });
    const { data } = await admin
      .from("export_events")
      .select("exam_id, subject_id")
      .eq("question_count", COUNT)
      .eq("mode", "cart");
    expect(data).toEqual([{ exam_id: null, subject_id: null }]);
  });
});
