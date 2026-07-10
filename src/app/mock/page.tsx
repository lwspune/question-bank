import type { Metadata } from "next";
import Link from "next/link";
import { Clock, FileText, History, Trophy } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks, type MockListItem } from "@/lib/mocks/query";

// Public catalogue — anon + stable, cacheable. New mocks appear on revalidation.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA Mock Tests — real PYQ papers, timed & auto-graded",
  description:
    "Take real past NDA Mathematics papers as full-length, timed mock tests. Official pattern (120 questions, 300 marks, 2.5 hours, +2.5/−0.83 marking) with instant scoring. Free, from PYQ Vault.",
  alternates: { canonical: "/mock" },
};

function fmtMins(secs: number) {
  return `${Math.round(secs / 60)} min`;
}

export default async function MockCatalogue() {
  const mocks = await getPublishedMocks(createSupabaseAnonClient());
  // Group by year, newest first.
  const byYear = new Map<number, MockListItem[]>();
  for (const m of mocks) {
    const arr = byYear.get(m.pyqYear) ?? [];
    arr.push(m);
    byYear.set(m.pyqYear, arr);
  }
  const years = [...byYear.keys()].sort((a, b) => b - a);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">NDA Mock Tests</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Real past NDA papers, served whole as full-length timed tests — the exact questions
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
          <div className="space-y-8">
            {years.map((year) => (
              <section key={year}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {year}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {byYear.get(year)!.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/mock/${m.slug}`}
                      className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-brand-accent/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <h3 className="font-semibold leading-snug group-hover:text-brand-accent">
                        {m.title}
                      </h3>
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
        )}
      </main>
    </>
  );
}
