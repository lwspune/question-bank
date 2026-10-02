import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo/title";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, History, Scissors, ScrollText, Target } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import {
  buildMockExamCards,
  getMockExam,
  getMockFamily,
  mockFamilyOf,
  mockSideNav,
  mockExamSlugs,
  type MockExamCard,
  type MockFamilyNav,
} from "@/lib/mocks/mocksNav";
import {
  buildMockTypeCards,
  comingSoonLine,
  mockTypeHref,
  splitMockTypeCards,
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
  const family = getMockFamily(params.examSlug);
  if (family) {
    return {
      title: { absolute: fitTitle(`${family.name} Mock Tests`, [{ text: "past papers, timed & auto-graded", optional: true }]) },
      description: `Sit ${family.name} mock tests online: real past papers served whole, on the official marking scheme, with a live timer. Free, from PYQ Vault.`,
      alternates: { canonical: `/mock/exam/${family.slug}` },
    };
  }
  const exam = getMockExam(params.examSlug);
  if (!exam) return {};
  return {
    title: { absolute: fitTitle(`${exam.examName} Mock Tests`, [{ text: "past papers & practice, timed & auto-graded", optional: true }]) },
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
 * A type with nothing published still shows, but as one sentence under the
 * cards ("Practice mocks and sectional tests are coming soon for CDS"), not as
 * a card. Silently omitting it would make an empty shelf indistinguishable from
 * a shelf that does not exist; drawing it as a faded card made it look
 * tappable, and Clarity (2026-10-01) recorded a visitor tapping both.
 */
/** "7 past papers · 2009–2017" for one member card on a family page. */
function memberMeta(card: MockExamCard): string {
  if (card.count === 0) return "Coming soon";
  const span =
    card.firstYear === 0
      ? ""
      : card.firstYear === card.lastYear
        ? ` · ${card.firstYear}`
        : ` · ${card.firstYear}–${card.lastYear}`;
  return `${card.count} ${card.count === 1 ? "test" : "tests"}${span}`;
}

/**
 * A family page (/mock/exam/mpsc): the family's exams as cards, under their
 * stage (Prelims / Mains). The rail shows the family as ONE link, so this is
 * where its exams are chosen. Every number is derived from the rows.
 */
async function MockFamilyPage({ family }: { family: MockFamilyNav }) {
  const cards = buildMockExamCards(await getPublishedMocks(createSupabaseAnonClient()));
  const cardOf = (slug: string) => cards.find((c) => c.slug === slug);
  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav()}
      breadcrumbs={[{ href: "/mock", label: "Mocks" }, { label: family.name }]}
    >
      <GuideHero
        eyebrow={`${family.name} · Timed mock tests`}
        title={`${family.name} Mock Tests`}
        subtitle={`Pick an exam. Each ${family.name} paper is the full paper, timed and marked the way that exam marks it.`}
      >
        <Link
          href="/mock/attempts"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <History className="h-4 w-4" aria-hidden />
          My attempts
        </Link>
      </GuideHero>

      {family.stages.map((group) => (
        <section key={group.stage ?? "all"} className="mt-8">
          {group.stage && <h2 className="mb-3 text-lg font-semibold">{group.stage}</h2>}
          <ul className="grid gap-4 sm:grid-cols-2">
            {group.members.map((member) => {
              const card = cardOf(member.slug);
              return (
                <li key={member.slug}>
                  <Link
                    href={`/mock/exam/${member.slug}`}
                    className="group flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <h3 className="font-semibold leading-tight">{member.displayName}</h3>
                    <p className="mt-2 flex-1 text-xs font-medium text-muted-foreground tabular-nums">
                      {card ? memberMeta(card) : "Coming soon"}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent">
                      Open
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
        </section>
      ))}
    </GuideShell>
  );
}

export default async function MockExamTypePicker({ params }: { params: Params }) {
  const family = getMockFamily(params.examSlug);
  if (family) return <MockFamilyPage family={family} />;

  const exam = getMockExam(params.examSlug);
  if (!exam) notFound();
  const parent = mockFamilyOf(exam.slug);

  const all = await getPublishedMocks(createSupabaseAnonClient());
  const { open, comingSoon } = splitMockTypeCards(
    buildMockTypeCards(all.filter((m) => m.examName === exam.examName))
  );
  const soonLine = comingSoonLine(comingSoon, exam.examName);

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav()}
      breadcrumbs={[
        { href: "/mock", label: "Mocks" },
        ...(parent ? [{ href: `/mock/exam/${parent.slug}`, label: parent.name }] : []),
        { label: exam.displayName },
      ]}
    >
      <GuideHero
        eyebrow={`${exam.displayName} · Timed mock tests`}
        title={`${exam.examName} Mock Tests`}
        subtitle={`Sit ${exam.examName} papers online, timed and marked for you: full past papers, plus practice papers with the same number of questions per subject.`}
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
        {open.map((card) => {
          const Icon = TYPE_ICON[card.slug];
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
            </li>
          );
        })}
      </ul>
      {soonLine && <p className="mt-4 text-sm text-muted-foreground">{soonLine}</p>}
    </GuideShell>
  );
}
