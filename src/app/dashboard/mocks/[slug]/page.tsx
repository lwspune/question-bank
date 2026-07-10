import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { cn } from "@/lib/utils";
import { getSessionMember } from "@/lib/auth";
import { getMockAttemptsDetail, type MockAttemptDetail } from "@/lib/mocks/adminStats";

export const dynamic = "force-dynamic";

type Params = { slug: string };

const STATUS_STYLE: Record<MockAttemptDetail["status"], string> = {
  submitted: "text-emerald-700 dark:text-emerald-400",
  expired: "text-amber-600 dark:text-amber-400",
  in_progress: "text-muted-foreground",
};
const STATUS_LABEL: Record<MockAttemptDetail["status"], string> = {
  submitted: "Submitted",
  expired: "Timed out",
  in_progress: "In progress",
};

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default async function MockAttemptsPage({ params }: { params: Params }) {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const detail = await getMockAttemptsDetail(params.slug);
  if (!detail) notFound();
  const { mock, attempts, summary } = detail;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <div>
          <Link href="/dashboard/mocks" className="text-sm text-muted-foreground hover:text-foreground">
            ← All mocks
          </Link>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{mock.title}</h1>
            <Link
              href={`/mock/${mock.slug}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent hover:underline"
            >
              Open mock <ExternalLink className="h-3 w-3" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard kind="numeric" value={summary.count} label="Attempts" />
          <StatCard kind="numeric" value={summary.students} label="Students" />
          <StatCard kind="text" value={summary.count ? `${summary.avgScore}/${mock.totalMarks}` : "—"} label="Average" />
          <StatCard kind="text" value={summary.count ? `${summary.topScore}` : "—"} label="Top score" />
        </div>

        {attempts.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No attempts yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Student</th>
                  <th className="px-3 py-2 text-right font-medium">Score</th>
                  <th className="px-3 py-2 text-right font-medium">%</th>
                  <th className="px-3 py-2 text-right font-medium">C / W / S</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">When</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {attempts.map((a) => (
                  <tr key={a.attemptId} className="group hover:bg-accent/40">
                    <td className="max-w-[16rem] px-3 py-2">
                      <Link href={`/dashboard/students/${a.userId}`} className="block min-w-0">
                        <span className="block truncate font-medium group-hover:text-brand-accent" title={a.name}>{a.name}</span>
                        {a.name !== a.email && (
                          <span className="block truncate text-xs text-muted-foreground" title={a.email}>{a.email}</span>
                        )}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {a.score != null ? `${a.score}/${a.maxScore ?? mock.totalMarks}` : "—"}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {a.pct != null ? `${a.pct}%` : "—"}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {a.correct != null ? `${a.correct} / ${a.wrong} / ${a.skipped}` : "—"}
                    </td>
                    <td className={cn("px-3 py-2 font-medium", STATUS_STYLE[a.status])}>{STATUS_LABEL[a.status]}</td>
                    <td className="px-3 py-2 text-muted-foreground">{fmtDate(a.submittedAt ?? a.startedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
