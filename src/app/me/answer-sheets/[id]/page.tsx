import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import AnswerSheetReport from "@/components/answerSheets/AnswerSheetReport";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOwnReport } from "@/lib/answerSheets/query";
import { signMarkedFiles, type MarkedFiles } from "@/lib/answerSheets/service";

/**
 * `/me/answer-sheets/<id>`: one checked answer sheet (migration 0153). What
 * went well first, then where the marks went and what to focus on (0175),
 * then every question with what earned marks and what was missing, then the
 * student's own pages with our marks on them. Read with the student's own
 * session, so another student's id finds nothing; the marked pages are signed
 * for the session user's own folder only. Never cached, never indexed.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Answer sheet report",
  robots: { index: false },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AnswerSheetReportPage({ params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=/me/answer-sheets/${params.id}`);
  if (!UUID.test(params.id)) notFound();
  const report = await getOwnReport(createSupabaseServerClient(), params.id);
  if (!report || report.status === "uploading") notFound();

  const title = report.paper?.title ?? "Board paper";
  const marked: MarkedFiles | null =
    report.status === "graded" && report.markedPages && !report.scansDeleted
      ? await signMarkedFiles(createSupabaseAdminClient(), user.id, report.id, report.markedPages)
      : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Breadcrumbs className="mb-4" items={[{ href: "/me/answer-sheets", label: "My answer sheets" }, { label: title }]} />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <AnswerSheetReport report={report} marked={marked} viewer="self" />
      </main>
    </>
  );
}
