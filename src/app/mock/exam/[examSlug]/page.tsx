import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, History, Scissors, ScrollText, Target } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import { getMockExam, mockSideNav, mockExamSlugs } from "@/lib/mocks/mocksNav";
import {
  buildMockTypeCards,
  mockTypeHref,
  type MockTypeCard,
  type MockTypeSlug,
} from "@/lib/mocks/catalogue";

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
    title: `${exam.examName} Mock Tests — past papers & practice, timed & auto-graded`,
    description: `Sit ${exam.examName} mock tests online: real past papers served whole, plus full-length practice papers built to the exam blueprint. Official marking, live timer, instant scoring. Free, from PYQ Vault.`,
    alternates: { canonical: `/mock/exam/${exam.slug}` },
  };
}

const TYPE_ICON: Record<MockTypeSlug, typeof ScrollText> = {
  "past-papers": ScrollText,
  practice: Target,
  sectional: Scissors,
};

/** "36 papers · 2017–2026" — every part derived from the rows, never typed. */
function metaLine(card: MockTypeCard): string {
  if (card.count === 0) return "Coming soon";
  const parts = [`${card.count} ${card.count === 1 ? "test" : "tests"}`];
  if (card.firstYear > 0) {
    parts.push(
      card.firstYear === card.lastYear
        ? `${card.firstYear}`
        : `${card.firstYear}–${card.lastYear}`
    );
  }
  if (card.paperCount > 1) parts.push(`${card.paperCount} papers`);
  return parts.join(" · ");
}

/**
 * /mock/exam/[slug] is a TYPE picker, not a list.
 *
 * It used to be the list: every one of that exam's mocks, grouped by year. That
 * was right while an exam had one kind of mock and fails on both counts once it
 * has three — NDA is already 36 cards under 10 year headings, and an assembled
 * paper has no year to head a group with. So the leaf list moved down to
 * /mock/exam/[slug]/[type], matching what /mock itself does one level up.
 *
 * A type with nothing published still renders — as an unlinked "Coming soon"
 * card, the same posture the exam picker takes for an exam whose build has not
 * landed yet. Silently omitting it would make an empty shelf indistinguishable
 * from a shelf that does not exist.
 */
export default async function MockExamTypePicker({ params }: { params: Params }) {
  const exam = getMockExam(params.examSlug);
  if (!exam) notFound();

  const all = await getPublishedMocks(createSupabaseAnonClient());
  const cards = buildMockTypeCards(all.filter((m) => m.examName === exam.examName));

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav()}
      breadcrumbs={[{ href: "/mock", label: "Mocks" }, { label: exam.displayName }]}
    >
      <GuideHero
        eyebrow={`${exam.displayName} · Timed mock tests`}
        title={`${exam.examName} Mock Tests`}
        subtitle={`Sit ${exam.examName} papers online, timed and auto-graded — real past papers served whole, plus full-length practice papers built to the same blueprint.`}
      >
        <Link
          href="/mock/attempts"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <History className="h-4 w-4" aria-hidden />
          My attempts
        </Link>
      </GuideHero>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = TYPE_ICON[card.slug];
          const empty = card.count === 0;
          const body = (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {card.tagline}
                  </p>
                  <h2 className="text-lg font-semibold leading-tight">{card.label}</h2>
                </div>
              </div>

              <p className="mt-4 flex-1 text-sm text-muted-foreground">{card.blurb}</p>

              <p className="mt-4 text-xs font-medium text-muted-foreground tabular-nums">
                {metaLine(card)}
              </p>
            </>
          );

          return (
            <li key={card.slug}>
              {empty ? (
                <div className="flex h-full flex-col rounded-lg border border-dashed bg-card/50 p-6 opacity-70">
                  {body}
                </div>
              ) : (
                <Link
                  href={mockTypeHref(exam.slug, card.slug)}
                  className="group flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {body}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent">
                    Open {card.label.toLowerCase()}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </GuideShell>
  );
}
