import type { Metadata } from "next";
import Link from "next/link";
import { Clock, FileText, History, Trophy } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks, type MockListItem } from "@/lib/mocks/query";

// Public catalogue — anon + stable, cacheable. New mocks appear on revalidation.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA & NEET Mock Tests — real PYQ papers, timed & auto-graded",
  description:
    "Take real past NDA and NEET (UG) papers as full-length, timed mock tests — the exact questions from each sitting, official marking, instant scoring. Free, from PYQ Vault.",
  alternates: { canonical: "/mock" },
};

function fmtMins(secs: number) {
  return `${Math.round(secs / 60)} min`;
}

/** Group mocks by exam, then by year (both newest-activity first). Keeps NDA and
 *  NEET papers from mixing under a shared year heading. */
function groupByExamThenYear(mocks: MockListItem[]) {
  const byExam = new Map<string, MockListItem[]>();
  for (const m of mocks) {
    const arr = byExam.get(m.examName) ?? [];
    arr.push(m);
    byExam.set(m.examName, arr);
  }
  // Exams ordered by their most-recent sitting (desc); years within, desc.
  const exams = [...byExam.entries()]
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
  return exams;
}

export default async function MockCatalogue() {
  const mocks = await getPublishedMocks(createSupabaseAnonClient());
  const exams = groupByExamThenYear(mocks);
  const multiExam = exams.length > 1;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Mock Tests</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Real past papers, served whole as full-length timed tests — the exact questions
              from each sitting, official marking, instant scoring. Sit one like the real exam.
            </p>
          </div>
          <Link
            href="/mock/attempts"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <History className="h-4 w-4" aria-hidden />
            My attempts
          </Link>
        </header>

        {mocks.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No mock tests published yet — check back soon.
          </p>
        ) : (
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
        )}
      </main>
    </>
  );
}
