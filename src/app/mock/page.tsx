import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, History, Shield, Stethoscope, Timer } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import { mockSideNav, mockExamNames, buildMockExamCards } from "@/lib/mocks/mocksNav";

// Public catalogue — anon + stable, cacheable. New mocks appear on revalidation.
export const revalidate = 3600;

// Derived from the registry (pure, no DB) so the exam list in the indexed title
// cannot go stale the way the hardcoded "NDA & NEET" did when CDS shipped.
const EXAMS = mockExamNames();

const PAGE_INTRO =
  "Real past papers, served whole as full-length timed tests — the exact questions from each " +
  "sitting, official marking, instant scoring. Pick your exam, then a sitting, and sit it like " +
  "the real thing.";

export const metadata: Metadata = {
  title: `${EXAMS} Mock Tests — real PYQ papers, timed & auto-graded`,
  description: `Take real past ${EXAMS} papers as full-length, timed mock tests — the exact questions from each sitting, official marking, instant scoring. Free, from PYQ Vault.`,
  alternates: { canonical: "/mock" },
};

/**
 * /mock is the cross-exam entry point: an exam PICKER, matching /notes' index
 * and /guide's picker. Until 2026-08-29 it rendered every published mock as one
 * flat exam -> year -> card list — 63 cards under 29 headings, ~7 screens on
 * desktop and ~11 on mobile — which made it the only cross-exam surface on the
 * site that dumped every leaf. The per-exam listing at /mock/exam/[slug] already
 * existed and was linked from nowhere but the rail, which is a Sheet below `lg`.
 *
 * COPY here is deliberately qualitative. Every NUMBER on a card — the mock
 * count, the year span, how many papers a sitting is — is derived from the rows
 * this page already fetches (buildMockExamCards), so a new sitting updates the
 * card by itself. /guide's picker hand-writes its meta line and this project has
 * watched that class of string go stale, so nothing countable is typed here.
 *
 * An exam with mocks but no COPY entry still renders, with its display name and
 * a neutral blurb, because silently omitting a shipped exam is the worse failure.
 */
type ExamCopy = {
  /** Short qualifier under the exam name — no counts, no years. */
  tagline: string;
  blurb: string;
  icon: typeof Shield;
};

const COPY: Record<string, ExamCopy> = {
  nda: {
    tagline: "Paper I & Paper II",
    blurb:
      "Paper I Mathematics and Paper II General Ability Test, rebuilt question-for-question from each UPSC sitting — English and all eight General Knowledge subjects in the printed order, with the official marking scheme and a live timer.",
    icon: Shield,
  },
  cds: {
    tagline: "English",
    blurb:
      "The CDS English paper, served whole with its Directions-based comprehension, cloze and spotting-errors sets intact, on the exam's own fractional marking scheme.",
    icon: Compass,
  },
  neet: {
    tagline: "Full paper, incl. Re-NEET",
    blurb:
      "Complete NEET (UG) papers — Physics, Chemistry, Botany and Zoology — including the Re-NEET sittings, with officially dropped questions awarded to everyone exactly as the NTA did.",
    icon: Stethoscope,
  },
};

/** "36 mocks · 2017–2026 · 2 papers per sitting" — every part derived. */
function metaLine(card: { count: number; firstYear: number; lastYear: number; paperCount: number }) {
  if (card.count === 0) return "Coming soon";
  const span =
    card.firstYear === card.lastYear
      ? `${card.firstYear}`
      : `${card.firstYear}–${card.lastYear}`;
  const parts = [`${card.count} ${card.count === 1 ? "mock" : "mocks"}`, span];
  if (card.paperCount > 1) parts.push(`${card.paperCount} papers per sitting`);
  return parts.join(" · ");
}

export default async function MockCatalogue() {
  const mocks = await getPublishedMocks(createSupabaseAnonClient());
  const cards = buildMockExamCards(mocks);

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav()}
      breadcrumbs={[{ href: "/mock", label: "Mocks" }, { label: "All exams" }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/mock"
        headline={`${EXAMS} Mock Tests`}
        description={PAGE_INTRO}
      />

      <GuideHero
        eyebrow="Timed PYQ mock tests"
        title="Mock Tests"
        subtitle={PAGE_INTRO}
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
          const copy = COPY[card.slug];
          const Icon = copy?.icon ?? Timer;
          return (
            <li key={card.slug}>
              <Link
                href={`/mock/exam/${card.slug}`}
                className="group flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {copy?.tagline ?? "Past papers"}
                    </p>
                    <h2 className="text-lg font-semibold leading-tight">
                      {card.displayName} mock tests
                    </h2>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-sm text-muted-foreground">
                  {copy?.blurb ??
                    `Real past ${card.examName} papers, served whole as full-length timed tests.`}
                </p>

                <p className="mt-4 text-xs font-medium text-muted-foreground tabular-nums">
                  {metaLine(card)}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent">
                  Open {card.displayName} mocks
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </GuideShell>
  );
}
