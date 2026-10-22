import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import AnswerSheetReport from "@/components/answerSheets/AnswerSheetReport";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStudentDetail } from "@/lib/students/detail";
import { getStudentReport } from "@/lib/answerSheets/query";
import { signMarkedFiles, type MarkedFiles } from "@/lib/answerSheets/service";

/**
 * A superadmin's copy of one student's answer-sheet report, opened from the
 * "Answer sheets" card on that student's performance page. The same report the
 * student sees (components/answerSheets/AnswerSheetReport), read-only.
 *
 * The student's own report page reads with the student's session and finds
 * nothing for anyone else, so this one reads with the service role, behind the
 * superadmin check. The sheet is found by its id AND the student id in the URL,
 * and the marked pages are signed for that student's folder only.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Answer sheet report", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Params = { id: string; sheetId: string };

export default async function StudentAnswerSheetPage({ params }: { params: Params }) {
  if (!(await getSessionSuperadmin())) redirect("/browse");
  if (!UUID.test(params.id) || !UUID.test(params.sheetId)) notFound();

  const db = createSupabaseAdminClient();
  const [detail, report] = await Promise.all([
    getStudentDetail(params.id),
    getStudentReport(db, params.id, params.sheetId),
  ]);
  if (!detail || !report || report.status === "uploading") notFound();

  const marked: MarkedFiles | null =
    report.status === "graded" && report.markedPages && !report.scansDeleted
      ? await signMarkedFiles(db, params.id, report.id, report.markedPages)
      : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link
          prefetch={false}
          href={`/dashboard/students/${params.id}/performance`}
          className="rounded text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← {detail.profile.name}: performance
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{report.paper?.title ?? "Board paper"}</h1>
        <AnswerSheetReport report={report} marked={marked} viewer="staff" />
      </main>
    </>
  );
}
