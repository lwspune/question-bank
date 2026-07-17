import Link from "next/link";
import { Clock, FileText, Trophy } from "lucide-react";
import type { MockListItem } from "@/lib/mocks/query";

function fmtMins(secs: number) {
  return `${Math.round(secs / 60)} min`;
}

/** Group mocks by exam, then by year (both newest-activity first). Keeps NDA
 *  and NEET papers from mixing under a shared year heading. */
function groupByExamThenYear(mocks: MockListItem[]) {
  const byExam = new Map<string, MockListItem[]>();
  for (const m of mocks) {
    const arr = byExam.get(m.examName) ?? [];
    arr.push(m);
    byExam.set(m.examName, arr);
  }
  return [...byExam.entries()]
    .map(([examName, items]) => {
      const byYear = new Map<number, MockListItem[]>();
      for (const m of items) {
        const arr = byYear.get(m.pyqYear) ?? [];
        arr.push(m);
        byYear.set(m.pyqYear, arr);
      }
      const years = [...byYear.keys()].sort((a, b) => b - a);
      return { examName, years, byYear, latest: years[0] ?? 0 };
    })
    .sort((a, b) => b.latest - a.latest || a.examName.localeCompare(b.examName));
}

/**
 * The exam → year → card catalogue, shared by the all-exams `/mock` page and the
 * per-exam `/mock/exam/[slug]` page. Exam headings show only when more than one
 * exam is present (the per-exam page passes a single exam, so no header).
 */
export default function MockCatalogueList({
  mocks,
  emptyMessage = "No mock tests published yet — check back soon.",
}: {
  mocks: MockListItem[];
  emptyMessage?: string;
}) {
  if (mocks.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  const exams = groupByExamThenYear(mocks);
  const multiExam = exams.length > 1;

  return (
    <div className="space-y-10">
      {exams.map((exam) => (
        <section key={exam.examName}>
          {multiExam && (
            <h2 className="mb-4 border-b pb-1 text-lg font-bold tracking-tight">
              {exam.examName}
            </h2>
          )}
          <div className="space-y-8">
            {exam.years.map((year) => (
              <section key={year}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {year}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {exam.byYear.get(year)!.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/mock/${m.slug}`}
                      className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-brand-accent/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <h4 className="font-semibold leading-snug group-hover:text-brand-accent">
                        {m.title}
                      </h4>
                      <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <div className="inline-flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" aria-hidden />
                          {m.totalQuestions} questions
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                          <Trophy className="h-3.5 w-3.5" aria-hidden />
                          {m.totalMarks} marks
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" aria-hidden />
                          {fmtMins(m.durationSecs)}
                        </div>
                      </dl>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
