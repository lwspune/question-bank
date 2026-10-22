import Link from "next/link";
import { ArrowRight, Clock, Download, MessageSquare, Sparkles, Target, XCircle } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { OwnReport } from "@/lib/answerSheets/query";
import type { ReportGrade } from "@/lib/answerSheets/report";
import { buildPaperReport } from "@/lib/answerSheets/paperReport";
import type { MarkedFiles } from "@/lib/answerSheets/service";
import QuestionGrade from "./QuestionGrade";
import { MarkedPages, PaperSummaryCard, SummaryHeadline } from "./PaperSummary";

/**
 * The body of one answer-sheet report (migration 0153, marks 0175): what went
 * well, where the marks went, every question, then the marked pages. Shared by
 * the student's `/me/answer-sheets/<id>` and a superadmin's copy under
 * `/dashboard/students/<id>/answer-sheets/<sheetId>`, so the two cannot drift.
 *
 * It fetches nothing: each route reads the sheet its own way (the student's
 * session, or the service role behind a superadmin check) and passes it in.
 * The staff copy is read-only: no "ask us to look again" form and no practice
 * links, since both act for the student; it shows any question the student
 * asked instead.
 */
export type ReportViewer = "self" | "staff";

function readyBy(submittedAt: string | null): string {
  if (!submittedAt) return "";
  const t = new Date(Date.parse(submittedAt) + 48 * 3600 * 1000);
  return t.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
}

function practiseHref(r: OwnReport, chapterId: string): string {
  const sp = new URLSearchParams();
  if (r.paper) {
    sp.set("examId", r.paper.examId);
    sp.set("subjectId", r.paper.subjectId);
  }
  sp.set("chapterIds", chapterId);
  return `/browse?${sp.toString()}`;
}

/** "Q.7" -> its card's anchor on this page, for the summary's question links. */
function anchorsOf(grades: ReportGrade[]): Record<string, string> {
  return Object.fromEntries(grades.map((g) => [`Q.${g.printedNumber}`, `#q-${g.position}`]));
}

function marksText(g: ReportGrade): string {
  if (g.outcome === "not_attempted") return `Not attempted · ${g.maxMarks}`;
  if (g.outcome === "not_counted") return `Not counted · ${g.maxMarks}`;
  return `${g.awarded} / ${g.maxMarks}`;
}

export default function AnswerSheetReport({
  report,
  marked,
  viewer,
}: {
  report: OwnReport;
  marked: MarkedFiles | null;
  viewer: ReportViewer;
}) {
  const self = viewer === "self";
  const graded = report.status === "graded";
  const summary = graded ? buildPaperReport({ grades: report.grades, totalMax: report.totalMax ?? 0 }) : null;

  return (
    <>
      {report.status === "submitted" && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
          <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {self
            ? `Your answer sheet is being checked. The report will be here by ${readyBy(report.submittedAt)}, and we will email you when it is.`
            : `This sheet is waiting to be checked. It is due by ${readyBy(report.submittedAt)}.`}
        </p>
      )}

      {report.status === "rejected" && (
        <div className="mt-4 rounded-lg border bg-card p-4 text-sm">
          <p className="flex items-start gap-2 font-medium text-foreground">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {self ? "We could not check this sheet" : "This sheet was not checked"}
          </p>
          <p className="mt-1 text-muted-foreground">{report.rejectedReason}</p>
          {self && (
            <p className="mt-2 text-muted-foreground">
              It did not use up your free sheet for the day.{" "}
              {report.paper?.href && (
                <Link href={report.paper.href} className="font-medium text-brand-accent hover:underline">
                  Send it again from the paper&apos;s page
                </Link>
              )}
            </p>
          )}
        </div>
      )}

      {graded && (
        <>
          <section className="mt-4 rounded-lg border bg-card p-5">
            <p className="text-sm text-muted-foreground">{self ? "Your marks" : "Marks"}</p>
            <p className="stat-gradient mt-1 text-4xl font-bold tracking-tight">
              {report.totalAwarded} <span className="text-xl font-semibold text-muted-foreground">/ {report.totalMax}</span>
            </p>
            {summary && <SummaryHeadline summary={summary} />}
            {marked && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <a href="#marked-pages" className="font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {self ? "See your marked pages" : "See the marked pages"}
                </a>
                {marked.pdf && (
                  <a
                    href={marked.pdf}
                    className="inline-flex items-center gap-1 font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden />
                    Download marked paper (PDF)
                  </a>
                )}
              </div>
            )}
            {report.regradedAt && (
              <p className="mt-2 text-xs text-muted-foreground">
                {self ? "Updated after you asked us to look again." : "Updated after the student asked us to look again."}
              </p>
            )}
          </section>

          <section className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-brand-accent" aria-hidden />
                What went well
              </h2>
              <KatexRenderer text={report.wentWell ?? ""} className="mt-2 block text-sm text-muted-foreground" />
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Target className="h-4 w-4 text-brand-accent" aria-hidden />
                What to work on next
              </h2>
              <KatexRenderer text={report.nextSteps ?? ""} className="mt-2 block text-sm text-muted-foreground" />
            </div>
          </section>

          {summary && <PaperSummaryCard summary={summary} anchors={anchorsOf(report.grades)} />}

          <h2 className="section-title mt-8">Question by question</h2>
          <ol className="mt-3 space-y-3">
            {report.grades.map((g) => {
              const chapter = g.questionId ? report.chapters.get(g.questionId) : undefined;
              const lost = g.outcome === "scored" && (g.awarded ?? 0) < g.maxMarks;
              const asked = report.questions.get(g.position) ?? null;
              return (
                <li key={g.position} id={`q-${g.position}`} className="scroll-mt-20 rounded-lg border bg-card p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-semibold text-foreground">Q.{g.printedNumber}</p>
                    <p className={g.outcome === "scored" ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground"}>
                      {marksText(g)}
                    </p>
                  </div>
                  {g.earned && (
                    <div className="mt-2 text-sm">
                      <p className="font-medium text-foreground">What earned marks</p>
                      <KatexRenderer text={g.earned} className="block text-muted-foreground" />
                    </div>
                  )}
                  {g.missing && (
                    <div className="mt-2 text-sm">
                      <p className="font-medium text-foreground">{g.outcome === "not_counted" ? "Why it was not counted" : "What was missing"}</p>
                      <KatexRenderer text={g.missing} className="block text-muted-foreground" />
                    </div>
                  )}
                  {self && lost && chapter && (
                    <Link
                      href={practiseHref(report, chapter.id)}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Practise {chapter.name} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  )}
                  {self && g.outcome === "scored" && (
                    <QuestionGrade submissionId={report.id} position={g.position} printedNumber={g.printedNumber} asked={asked} />
                  )}
                  {!self && asked && (
                    <div className="mt-3 rounded-md border bg-muted/40 p-3 text-sm">
                      <p className="flex items-center gap-1.5 font-medium text-foreground">
                        <MessageSquare className="h-3.5 w-3.5" aria-hidden />
                        The student asked about this grade
                      </p>
                      <p className="mt-1 text-muted-foreground">{asked.message}</p>
                      <p className="mt-1 text-muted-foreground">
                        {asked.resolution ? `Our answer: ${asked.resolution}` : "Not answered yet."}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {report.markedPages && (
            <MarkedPages pages={marked?.pages ?? []} pdf={marked?.pdf ?? null} removed={report.scansDeleted} />
          )}

          {report.paper?.href && (
            <p className="mt-6 text-sm text-muted-foreground">
              The model answer to every question is on the{" "}
              <Link href={report.paper.href} className="font-medium text-brand-accent hover:underline">
                paper&apos;s page
              </Link>
              .
            </p>
          )}
        </>
      )}
    </>
  );
}
