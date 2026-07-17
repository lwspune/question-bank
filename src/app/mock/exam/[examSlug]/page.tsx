import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { History } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import { getMockExam, mockSideNav, mockExamSlugs } from "@/lib/mocks/mocksNav";
import MockCatalogueList from "../../_components/MockCatalogueList";

// Nested under /mock/exam/ (not /mock/[slug], which is the instructions page).
export const revalidate = 3600;

type Params = { examSlug: string };

export function generateStaticParams(): Params[] {
  return mockExamSlugs().map((examSlug) => ({ examSlug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const exam = getMockExam(params.examSlug);
  if (!exam) return {};
  return {
    title: `${exam.examName} Mock Tests — real PYQ papers, timed & auto-graded`,
    description: `Take real past ${exam.examName} papers as full-length, timed mock tests — the exact questions from each sitting, official marking, instant scoring. Free, from PYQ Vault.`,
    alternates: { canonical: `/mock/exam/${exam.slug}` },
  };
}

export default async function MockExamCatalogue({ params }: { params: Params }) {
  const exam = getMockExam(params.examSlug);
  if (!exam) notFound();

  const all = await getPublishedMocks(createSupabaseAnonClient());
  const mocks = all.filter((m) => m.examName === exam.examName);

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav()}
      breadcrumbs={[{ href: "/mock", label: "Mocks" }, { label: exam.displayName }]}
    >
      <GuideHero
        eyebrow={`${exam.displayName} · Timed PYQ mock tests`}
        title={`${exam.examName} Mock Tests`}
        subtitle={`Real past ${exam.examName} papers, served whole as full-length timed tests — the exact questions from each sitting, official marking, instant scoring.`}
      >
        <Link
          href="/mock/attempts"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <History className="h-4 w-4" aria-hidden />
          My attempts
        </Link>
      </GuideHero>

      <MockCatalogueList
        mocks={mocks}
        emptyMessage={`${exam.examName} mock tests are coming soon — check back shortly.`}
      />
    </GuideShell>
  );
}
