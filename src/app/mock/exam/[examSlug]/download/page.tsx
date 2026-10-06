import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo/title";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, History } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import { getMockExam, getMockExams, mockFamilyOf, mockSideNav } from "@/lib/mocks/mocksNav";
import { groupMocksForType, mocksOfType, mockDownloadHref } from "@/lib/mocks/catalogue";
import { getExamByName } from "@/lib/exam/examContext";
import PaperDownload from "../../../_components/PaperDownload";

// Same refresh as the /mock lists beside it.
export const revalidate = 3600;

type Params = { examSlug: string };

/** Every exam, including one with no past papers yet: an honest empty state beats a 404. */
export function generateStaticParams(): Params[] {
  return getMockExams().map((e) => ({ examSlug: e.slug as string }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const exam = getMockExam(params.examSlug);
  if (!exam) return {};
  return {
    title: {
      absolute: fitTitle(`${exam.examName} Previous Year Papers PDF`, [
        { text: "with answer keys", optional: true },
      ]),
    },
    description: `Download ${exam.examName} previous year question papers as PDFs: each paper exactly as it was set, with an answer key and solutions. Your first download is free, from PYQ Vault.`,
    alternates: { canonical: mockDownloadHref(exam.slug) },
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

  const all = await getPublishedMocks(createSupabaseAnonClient());
  const papers = mocksOfType(
    all.filter((m) => m.examName === exam.examName),
    "past-papers"
  );
  const groups = groupMocksForType("past-papers", papers);
  const parent = mockFamilyOf(exam.slug);
  const bilingual = getExamByName(exam.examName)?.bilingual === true;

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav()}
      breadcrumbs={[
        { href: "/mock", label: "Mocks" },
        ...(parent ? [{ href: `/mock/exam/${parent.slug}`, label: parent.name }] : []),
        { href: `/mock/exam/${exam.slug}`, label: exam.displayName },
        { label: "Download past papers" },
      ]}
    >
      <GuideHero
        eyebrow={`${exam.displayName} · Past papers`}
        title={`Download ${exam.examName} past papers`}
        subtitle="Each paper exactly as it was set, in the printed order, as a PDF. Its answer key with solutions is a second file. Your first download is free."
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
                        href={`/mock/${m.slug}`}
                        className="font-semibold leading-snug hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {m.title}
                      </Link>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <FileText className="h-3.5 w-3.5" aria-hidden />
                        {m.totalQuestions} questions
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
