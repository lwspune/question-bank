/**
 * The read behind /dashboard/world-exams. The tables (migration 0260) are
 * service-role only, so pass the service-role client. No `server-only`, so the
 * loader script and the integration test drive the same function.
 *
 * Both tables hold a few hundred rows at most; one page of 1,000 each is the
 * whole list, and a full page is reported rather than silently cut.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { parseExamRow, parseNoteRow, type WorldExam, type WorldExamNote } from "./model";

const LIMIT = 1000;

export async function fetchWorldExams(client: SupabaseClient): Promise<{ exams: WorldExam[]; notes: WorldExamNote[] }> {
  const [exams, notes] = await Promise.all([
    client.from("world_exams").select("*").order("id").limit(LIMIT),
    client.from("world_exam_notes").select("*").order("sort").order("id").limit(LIMIT),
  ]);
  if (exams.error) throw new Error(`world_exams: ${exams.error.message}`);
  if (notes.error) throw new Error(`world_exam_notes: ${notes.error.message}`);
  if ((exams.data?.length ?? 0) >= LIMIT || (notes.data?.length ?? 0) >= LIMIT) {
    throw new Error("world exams: 1,000 rows reached; page the read before adding more");
  }
  return {
    exams: (exams.data ?? []).map(parseExamRow),
    notes: (notes.data ?? []).map(parseNoteRow),
  };
}
