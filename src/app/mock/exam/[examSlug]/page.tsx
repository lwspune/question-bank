import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo/title";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download, History } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks, type MockListItem } from "@/lib/mocks/query";
import { hubRows, shortMockTitle } from "@/lib/mocks/hub";
import { OwnAttemptsProvider } from "@/app/mock/_components/OwnAttempts";
import NextMockCard from "@/app/mock/_components/NextMockCard";
import MockHubTabs, { type HubMockRow, type HubMockTab } from "@/app/mock/_components/MockHubTabs";
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
  mockDownloadHref,
  mockHubSubtitle,
  mockTypeHref,
  splitMockTypeCards,
} from "@/lib/mocks/catalogue";
import { getExamBySlug } from "@/lib/exam/examContext";
import ResultsStrip from "@/components/results/ResultsStrip";
import { canonicalFor } from "@/lib/sites/intl";

// Nested under /mock/exam/ (not /mock/[slug], which is the instructions page).
export const revalidate = 3600;

type Params = { examSlug: string };

export function generateStaticParams(): Params[] {
  return mockExamSlugs().map((examSlug) => ({ examSlug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const family = getMockFamily(params.examSlug);
  if (family) {
    return {
      title: { absolute: fitTitle(`${family.name} Mock Tests`, [{ text: "past papers, timed & auto-graded", optional: true }]) },
      description: `Sit ${family.name} mock tests online: real past papers served whole, on the official marking scheme, with a live timer. Free, from PYQ Vault.`,
      alternates: { canonical: canonicalFor(`/mock/exam/${family.slug}`) },
    };
  }
  const exam = getMockExam(params.examSlug);
  if (!exam) return {};
  // Read off the registry, not the mocks (metadata makes no DB read): a board
  // exam's mocks are chapter tests, and most exams have no practice papers, so
  // neither is promised here (2026-11-07).
  if (getExamBySlug(exam.slug)?.boardExam) {
    return {
      title: { absolute: fitTitle(`${exam.examName} Mock Tests`, [{ text: "chapter tests, timed & auto-graded", optional: true }]) },
      description: `Sit ${exam.examName} chapter tests online: timed, marked for you and scored the moment you finish. Free, from PYQ Vault.`,
      alternates: { canonical: canonicalFor(`/mock/exam/${exam.slug}`) },
    };
  }
  return {
    title: { absolute: fitTitle(`${exam.examName} Mock Tests`, [{ text: "past papers & practice, timed & auto-graded", optional: true }]) },
    description: `Sit ${exam.examName} mock tests online: real past papers served whole, on the official marking scheme, with a live timer and instant scoring. Free, from PYQ Vault.`,
    alternates: { canonical: canonicalFor(`/mock/exam/${exam.slug}`) },
  };
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
      sideNavLabel="Exams"
      sideNav={mockSideNav(family.slug)}
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

      <ResultsStrip examSlugs={family.stages.flatMap((g) => g.members.map((m) => m.slug))} className="mb-6" />

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

export default async function MockExamTypePicker(props: { params: Promise<Params> }) {
  const params = await props.params;
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
  // Only an exam with past papers has any to download.
  const hasPastPapers = open.some((c) => c.slug === "past-papers" && c.count > 0);

  // The hub lists each type's newest few; "Show all" goes to the type's page.
  const examMocks = all.filter((m) => m.examName === exam.examName);
  const toRow = (m: MockListItem): HubMockRow => ({
    id: m.id,
    slug: m.slug,
    title: shortMockTitle(m.title, exam.examName),
    meta: `${m.totalQuestions} questions · ${Math.round(m.durationSecs / 60)} min`,
  });
  const tabs: HubMockTab[] = open.map((card) => {
    const { items, total } = hubRows(card.slug, examMocks);
    return { slug: card.slug, label: card.label, total, href: mockTypeHref(exam.slug, card.slug), rows: items.map(toRow) };
  });
  const rowById: Record<string, HubMockRow> = Object.fromEntries(examMocks.map((m) => [m.id, toRow(m)]));
  const pastIds = hubRows("past-papers", examMocks, Infinity).items.map((m) => m.id);

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNavLabel="Exams"
      sideNav={mockSideNav(params.examSlug)}
      breadcrumbs={[
        { href: "/mock", label: "Mocks" },
        ...(parent ? [{ href: `/mock/exam/${parent.slug}`, label: parent.name }] : []),
        { label: exam.displayName },
      ]}
    >
      {/* No eyebrow (2026-11-12): it repeated the exam name the title already
          says, and on a phone the hero pushed the next paper under the fold. */}
      <GuideHero
        title={`${exam.examName} Mock Tests`}
        subtitle={mockHubSubtitle(
          exam.examName,
          open.map((c) => c.slug),
          getExamBySlug(exam.slug)?.boardExam === true
        )}
      >
        <div className="flex flex-wrap gap-2">
          <Link
            href="/mock/attempts"
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <History className="h-4 w-4" aria-hidden />
            My attempts
          </Link>
          {/* Secondary, like My attempts (2026-11-12): sitting a paper is this
              page's job, so Start on the next-paper card is the one filled button. */}
          {hasPastPapers && (
            <Link
              href={mockDownloadHref(exam.slug)}
              className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download papers
            </Link>
          )}
        </div>
      </GuideHero>

      <OwnAttemptsProvider>
        <NextMockCard pastIds={pastIds} mocks={rowById} />
        <MockHubTabs examSlug={exam.slug} tabs={tabs} />
      </OwnAttemptsProvider>
      {soonLine && <p className="mt-4 text-sm text-muted-foreground">{soonLine}</p>}

      {/* Below the papers (2026-11-12): on a phone it sat above the student's
          own next paper and pushed Start under the tab bar. */}
      <ResultsStrip examSlugs={[exam.slug]} className="mt-8" />
    </GuideShell>
  );
}
