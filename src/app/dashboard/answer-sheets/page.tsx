import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { readGradingOverview, type OverviewRow } from "@/lib/answerSheets/grader";
import { OVERDUE_HOURS } from "@/lib/answerSheets/emails";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

/**
 * /dashboard/answer-sheets: the grading queue (migration 0153). Read-only:
 * grading happens in a chat session (scripts/grading/GRADING.md). Superadmin
 * only, since it reads every student's sheets through the service role.
 */
export default async function AnswerSheetsQueuePage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  let data: Awaited<ReturnType<typeof readGradingOverview>> | null = null;
  let loadError: string | null = null;
  try {
    data = await readGradingOverview(createSupabaseAdminClient());
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Could not load the queue.";
  }
  const now = Date.now();
  const hours = (iso: string | null) => (iso ? Math.floor((now - Date.parse(iso)) / 3_600_000) : 0);
  const when = (iso: string | null) =>
    iso ? new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }) : "";

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Answer sheets</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Board papers students wrote and sent for checking. Students were promised a report within 48 hours. To
            grade: <code>npm run grading:pull</code>, then grade by scripts/grading/GRADING.md (preview the marks, then commit).
          </p>
        </header>
        {loadError || !data ? (
          <p className="rounded-xl border border-destructive/40 bg-card p-4 text-sm text-destructive">{loadError}</p>
        ) : (
          <>
            <section className="rounded-xl border bg-card p-4">
              <h2 className="font-semibold">
                Waiting: {data.waiting.length}
                {data.openQuestions > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    · {data.openQuestions} grade question{data.openQuestions === 1 ? "" : "s"} open
                  </span>
                )}
              </h2>
              {data.waiting.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">Nothing waiting.</p>
              ) : (
                <Table rows={data.waiting} render={(r) => {
                  const h = hours(r.submittedAt);
                  return [
                    r.paperTitle,
                    `${r.fileCount} files`,
                    <span key="h" className={cn(h >= OVERDUE_HOURS && "font-semibold text-destructive")}>{h} h waiting</span>,
                  ];
                }} />
              )}
            </section>
            <section className="rounded-xl border bg-card p-4">
              <h2 className="font-semibold">Recently checked</h2>
              {data.recent.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">None yet.</p>
              ) : (
                <Table rows={data.recent} render={(r) => [
                  r.paperTitle,
                  r.status === "graded" ? `${r.totalAwarded} / ${r.totalMax}` : "Rejected",
                  when(r.gradedAt),
                ]} />
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}

function Table({ rows, render }: { rows: OverviewRow[]; render: (r: OverviewRow) => React.ReactNode[] }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="py-2 pr-3 font-mono text-xs text-muted-foreground">{r.id.slice(0, 8)}</td>
              {render(r).map((cell, i) => (
                <td key={i} className="py-2 pr-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
