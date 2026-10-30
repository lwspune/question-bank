import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, History } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import { getMockExam, getMockExams, mockFamilyOf, mockSideNav } from "@/lib/mocks/mocksNav";
import { groupMocksForType, mocksOfType, mockDownloadHref } from "@/lib/mocks/catalogue";
import { EXAM_REGISTRY, getExamByName } from "@/lib/exam/examContext";
import { downloadPageTitle, paperPageHref, paperYearRange } from "@/lib/mocks/paperPage";
import PaperDownload from "../../../_components/PaperDownload";
import { canonicalFor } from "@/lib/sites/intl";

// Same refresh as the /mock lists beside it.
export const revalidate = 3600;

type Params = { examSlug: string };

/** Every exam, including one with no past papers yet: an honest empty state beats a 404. */
export function generateStaticParams(): Params[] {
  return getMockExams(EXAM_REGISTRY).map((e) => ({ examSlug: e.slug as string }));
}

/** One read per request, shared by the metadata and the page. */
const pastPapersOf = cache(async (examName: string) => {
  const all = await getPublishedMocks(createSupabaseAnonClient());
  return mocksOfType(
    all.filter((m) => m.examName === examName),
    "past-papers"
  );
});

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const exam = getMockExam(params.examSlug);
  if (!exam) return {};
  // The words students search (2026-10-15): "previous year question papers",
  // with the years we actually hold.
  const range = paperYearRange(await pastPapersOf(exam.examName));
  const solved = getExamByName(exam.examName)?.pastPaperSolutions === true;
  return {
    title: { absolute: downloadPageTitle(exam.examName, range, solved) },
    description: `${exam.examName} previous year question papers${range ? ` from ${range}` : ""}, each exactly as it was set. Every paper is free to read online ${solved ? "with answers and worked solutions" : "with answers"}, or sit it as a timed mock. Your first PDF paper and answer key are free to download.`,
    alternates: { canonical: canonicalFor(mockDownloadHref(exam.slug)) },
  };
}

/**
 * One exam's past papers to download (2026-10-07): each published past paper,
 * grouped by year, with its paper and answer key a tap away. The download box
 * is the only per-viewer part, and it asks the browser, so this page stays a
 * cached copy that search engines can read.
 */
export default async function MockDownloadList({ params }: { params: Params }) {
  const exam = getMockExam(params.examSlug);
  if (!exam) notFound();

  const papers = await pastPapersOf(exam.examName);
  const range = paperYearRange(papers);
  const groups = groupMocksForType("past-papers", papers);
  const parent = mockFamilyOf(exam.slug);
  const bilingual = getExamByName(exam.examName)?.bilingual === true;
  const solved = getExamByName(exam.examName)?.pastPaperSolutions === true;

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav(params.examSlug)}
      breadcrumbs={[
        { href: "/mock", label: "Mocks" },
        ...(parent ? [{ href: `/mock/exam/${parent.slug}`, label: parent.name }] : []),
        { href: `/mock/exam/${exam.slug}`, label: exam.displayName },
        { label: "Past papers" },
      ]}
    >
      <GuideHero
        eyebrow={`${exam.displayName} · Past papers`}
        title={`${exam.examName} previous year question papers`}
        subtitle={`Every paper exactly as it was set${range ? `, ${range}` : ""}. Read any paper free online ${solved ? "with answers and worked solutions" : "with answers"}, sit it as a timed mock, or download it as a PDF. Your first PDF paper and its answer key are free.`}
      >
        <Link
          href="/mock/attempts"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <History className="h-4 w-4" aria-hidden />
          My attempts
        </Link>
      </GuideHero>

      {groups.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          {exam.examName} past papers are coming soon. Check back shortly.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {groups.map((group) => (
            <section key={group.key}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {group.label}
                <span className="ml-2 font-normal normal-case tabular-nums">{group.items.length}</span>
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {group.items.map((m) => (
                  <li
                    key={m.slug}
                    className="flex items-center justify-between gap-3 rounded-lg border bg-card p-4"
                  >
                    <div className="min-w-0">
                      <Link
                        href={paperPageHref(m.slug)}
                        className="font-semibold leading-snug hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {m.title}
                      </Link>
                      <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
                        <FileText className="h-3.5 w-3.5" aria-hidden />
                        {m.totalQuestions} questions ·
                        <Link
                          href={`/mock/${m.slug}`}
                          className="text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                          aria-label={`Sit ${m.title} as a timed mock`}
                        >
                          Sit as a timed mock
                        </Link>
                      </p>
                    </div>
                    <div className="shrink-0">
                      <PaperDownload slug={m.slug} paperTitle={m.title} bilingual={bilingual} variant="row" />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </GuideShell>
  );
}
