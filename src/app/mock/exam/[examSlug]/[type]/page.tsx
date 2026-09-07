import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { History } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import { getMockExam, mockSideNav, mockExamSlugs } from "@/lib/mocks/mocksNav";
import {
  MOCK_TYPES,
  parseMockType,
  mocksOfType,
  groupMocksForType,
} from "@/lib/mocks/catalogue";
import MockCatalogueList from "../../../_components/MockCatalogueList";

export const revalidate = 3600;

type Params = { examSlug: string; type: string };

/**
 * Every (exam × type) pair is prerendered, including the empty ones.
 *
 * A type with nothing published is a real, reachable URL — the picker links to
 * it as soon as one row exists, and people share links — so it must render an
 * honest empty state rather than 404 on the day before a build lands.
 */
export function generateStaticParams(): Params[] {
  return mockExamSlugs().flatMap((examSlug) =>
    MOCK_TYPES.map((t) => ({ examSlug, type: t.slug }))
  );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const exam = getMockExam(params.examSlug);
  const type = parseMockType(params.type);
  if (!exam || !type) return {};
  return {
    title: `${exam.examName} ${type.label} — timed & auto-graded mock tests`,
    description: `${type.blurb} Free ${exam.examName} mock tests from PYQ Vault, with a live timer and instant scoring.`,
    alternates: { canonical: `/mock/exam/${exam.slug}/${type.slug}` },
  };
}

/**
 * One exam's mocks of ONE type — the leaf list.
 *
 * Its grouping key is the type's own (year for past papers, paper for practice,
 * section for sectional): those rules are pure and live in lib/mocks/catalogue,
 * so this page fetches, filters and draws, and the interesting logic stays
 * unit-tested.
 *
 * The route is separate rather than a `?type=` filter on the picker because a
 * searchParam here would either bail the static prerender to client rendering
 * (useSearchParams) or make the route dynamic (server searchParams) — and these
 * pages are ISR-cached, indexable, and among the ones the sitemap points at.
 */
export default async function MockTypeList({ params }: { params: Params }) {
  const exam = getMockExam(params.examSlug);
  const type = parseMockType(params.type);
  // An unknown type 404s rather than falling back to past papers: a fallback
  // would serve real content at a typo'd URL, so nobody finds out it was wrong.
  if (!exam || !type) notFound();

  const all = await getPublishedMocks(createSupabaseAnonClient());
  const mine = mocksOfType(
    all.filter((m) => m.examName === exam.examName),
    type.slug
  );
  const groups = groupMocksForType(type.slug, mine);

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav()}
      breadcrumbs={[
        { href: "/mock", label: "Mocks" },
        { href: `/mock/exam/${exam.slug}`, label: exam.displayName },
        { label: type.label },
      ]}
    >
      <GuideHero
        eyebrow={`${exam.displayName} · ${type.tagline}`}
        title={`${exam.examName} ${type.label.toLowerCase()}`}
        subtitle={type.blurb}
      >
        <Link
          href="/mock/attempts"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <History className="h-4 w-4" aria-hidden />
          My attempts
        </Link>
      </GuideHero>

      <div className="mt-8">
        <MockCatalogueList
          groups={groups}
          // Sectional tests are built from BOTH banks, so the two mix in one
          // list and the badge is the only thing distinguishing them. On the
          // other pages the route already says which type it is.
          showSourceBadge={type.slug === "sectional"}
          emptyMessage={`${exam.examName} ${type.label.toLowerCase()} are coming soon — check back shortly.`}
        />
      </div>
    </GuideShell>
  );
}
