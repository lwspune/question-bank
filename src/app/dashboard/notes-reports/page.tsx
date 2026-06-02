import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, BookOpen, MessageSquare } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listConceptReports } from "@/lib/notes-reports/listConceptReports";
import {
  CONCEPT_REPORT_CATEGORY_LABELS,
  type ConceptReportCategory,
} from "@/lib/notes-reports/types";
import {
  REPORT_STATUS_LABELS,
  REPORT_STATUSES,
  isReportStatus,
  type ReportStatus,
} from "@/lib/reports/types";
import ConceptReportRowActions from "./ConceptReportRowActions";

type Search = { status?: string };

const STATUS_OPTIONS: { value: "all" | ReportStatus; label: string }[] = [
  { value: "all", label: "All" },
  ...REPORT_STATUSES.map((s) => ({ value: s, label: REPORT_STATUS_LABELS[s] })),
];

export default async function ConceptReportsTriagePage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") notFound();

  const requested = searchParams.status ?? "open";
  const status: "all" | ReportStatus =
    requested === "all"
      ? "all"
      : isReportStatus(requested)
      ? requested
      : "open";

  const supabase = createSupabaseServerClient();
  const reports = await listConceptReports(supabase, { status, limit: 100 });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            Back to dashboard
          </Link>
          <h1 className="mt-3 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <BookOpen className="h-5 w-5 text-brand-accent" aria-hidden />
            Concept reports
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Reports filed against /notes concepts. Open the concept to fix the
            underlying explanation, then resolve or mark won&apos;t-fix.
          </p>
        </div>

        <nav aria-label="Status filter" className="flex flex-wrap gap-1.5">
          {STATUS_OPTIONS.map((opt) => {
            const active = status === opt.value;
            const href =
              opt.value === "open"
                ? "/dashboard/notes-reports"
                : `/dashboard/notes-reports?status=${opt.value}`;
            return (
              <Link
                key={opt.value}
                href={href}
                className={
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
                  (active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground")
                }
              >
                {opt.label}
              </Link>
            );
          })}
        </nav>

        {reports.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-muted/30 p-10 text-center">
            <MessageSquare
              className="mx-auto h-8 w-8 text-muted-foreground"
              aria-hidden
            />
            <p className="mt-3 text-sm font-medium">
              No reports{" "}
              {status === "all"
                ? ""
                : `with status "${REPORT_STATUS_LABELS[status as ReportStatus]}"`}
              .
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              When users report a concept in the notes, it&apos;ll show up here
              for triage.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {reports.map((r) => {
              const conceptHref = `/notes/${r.subjectRoute}/${r.chapterSlug}/${r.subtopicSlug}#${r.conceptSlug}`;
              return (
                <li
                  key={r.id}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">
                        {r.examName} · {r.subjectName} · {r.chapterName} ·{" "}
                        {r.subtopicName}
                      </p>
                      <p className="mt-1 font-serif text-sm font-semibold leading-snug">
                        {r.conceptName}
                      </p>
                    </div>
                    <span
                      className={
                        "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide " +
                        categoryChipClass(r.category)
                      }
                    >
                      {CONCEPT_REPORT_CATEGORY_LABELS[r.category]}
                    </span>
                  </div>

                  {r.details && (
                    <p className="mt-3 whitespace-pre-wrap rounded-md border-l-2 border-primary/40 bg-muted/30 px-3 py-2 font-serif text-sm leading-relaxed text-foreground/90">
                      {r.details}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>
                        Filed{" "}
                        {new Date(r.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                      {r.resolvedAt && (
                        <span>
                          · Resolved{" "}
                          {new Date(r.resolvedAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      )}
                    </div>
                    <Link
                      href={conceptHref}
                      className="font-medium text-primary hover:underline"
                    >
                      Open concept →
                    </Link>
                  </div>

                  <div className="mt-3 border-t pt-3">
                    <ConceptReportRowActions
                      reportId={r.id}
                      currentStatus={r.status}
                      currentResolutionNote={r.resolutionNote}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}

function categoryChipClass(category: ConceptReportCategory): string {
  const danger =
    "border-red-300 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-200";
  const warning =
    "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200";
  const neutral = "border-border bg-muted text-muted-foreground";

  switch (category) {
    case "incorrect-content":
    case "wrong-example":
      return danger;
    case "confusing-explanation":
    case "broken-visualization":
      return warning;
    default:
      return neutral;
  }
}
