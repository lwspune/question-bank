import AnswerSheetsCard from "@/components/answerSheets/AnswerSheetsCard";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listStudentSubmissions } from "@/lib/answerSheets/query";
import { cardSheetRows } from "@/lib/answerSheets/sheetRows";

/**
 * The "Answer sheets" card on a student's staff performance page, for a
 * superadmin only.
 *
 * WHY THE GATE IS HERE AND NOT IN THE PAGE. The performance page is opened by
 * teachers too, and who may see which student is decided in the database, so
 * the page itself has no superadmin check (tests/student-pages-superadmin-gate).
 * Answer sheets are superadmin-only and their tables let a student read only
 * their own rows, so this card reads with the service role. The check sits
 * directly above that read: anyone else gets nothing rendered and nothing read.
 */
export default async function StaffAnswerSheets({ studentId }: { studentId: string }) {
  if (!(await getSessionSuperadmin())) return null;
  const sheets = await listStudentSubmissions(createSupabaseAdminClient(), studentId);
  const { rows, more } = cardSheetRows(sheets, { kind: "staff", studentId });
  return <AnswerSheetsCard rows={rows} more={more} />;
}
