import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import PerformanceBody from "@/components/performance/PerformanceBody";
import { getSessionUser } from "@/lib/auth";
import { getOwnPerformance, getOwnPracticeEvidence } from "@/lib/performance/service";
import { getTaxonomyLinks } from "@/lib/performance/taxonomy";
import { EMPTY_TAXONOMY_LINKS, type TaxonomyLinks } from "@/lib/performance/links";
import { buildPerformance } from "@/lib/performance/compute";
import { buildLaneNav } from "@/lib/performance/laneNav";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPremiumLimits, premiumPassCta } from "@/lib/billing/premiumLimits";
import { projectionAccess } from "@/lib/performance/projectionAccess";
import ProjectionGate from "@/components/performance/ProjectionGate";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import type { SupabaseClient } from "@supabase/supabase-js";
import StarterCard from "@/components/performance/StarterCard";
import { pickStarter } from "@/lib/performance/starter";
import { loadLastPractisedChapter, loadStarterCatalogue } from "@/lib/performance/starterQuery";
import { profileFieldsFromRow } from "@/lib/header-session";
import { getExamBySlug, isBoardExam, resolveBoardHref } from "@/lib/exam/examContext";
import AnswerSheetsCard from "@/components/answerSheets/AnswerSheetsCard";
import { listOwnSubmissions } from "@/lib/answerSheets/query";
import { cardSheetRows } from "@/lib/answerSheets/sheetRows";
import MeHeader from "@/components/me/MeHeader";
import { loadMeHeader } from "@/lib/me/header";
import { performanceFocus } from "@/lib/me/focus";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { mockCatalogueHref } from "@/lib/exam/examLinks";
import ProgressSwitch from "@/components/me/ProgressSwitch";
import OutcomeTiles from "@/components/me/OutcomeTiles";
import RecentPapers from "@/components/me/RecentPapers";
import { withPractice } from "@/lib/performance/practice";
import { masteredCount } from "@/lib/performance/masteryMap";
import { forSite } from "@/lib/sites/siteScope";
import { getUserAttempts } from "@/lib/mocks/query";
import { summarizeUserMocks } from "@/lib/mocks/perf";

/**
 * A student's own performance diagnosis — the same readout staff have had since
 * migration 0099, now shown to the person it is about.
 *
 * WHY THE STUDENT SEES THE WHOLE THING, not a softened subset: CLAUDE.md's
 * engagement gate makes metacognition a principle — "every metric we track is
 * shown to the student in plain language". A diagnosis that hides its weakest
 * findings is not kinder, it is less useful, and the student is the only person
 * who can act on them.
 *
 * Per-attempt, per-student data behind a login: never cached, never indexed.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your performance",
  robots: { index: false },
};

type Search = { exam?: string; subject?: string };

export default async function OwnPerformancePage(props: { searchParams: Promise<Search> }) {
  const searchParams = await props.searchParams;
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/performance");

  const now = new Date();
  const db = createSupabaseServerClient();
  // ROUND 1: every read that needs nothing from another, at once (2026-11-08:
  // the page ran them one after another, six database round trips).
  const [payload, header, , limits, ownSheets, practice, attempts] = await Promise.all([
    getOwnPerformance(),
    // The header (greeting, exams, focus).
    getExamIdMap().then((ids) => loadMeHeader(db, user, ids, { now })),
    // Who has opened this page was never recorded; now once a day.
    logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "performance", now)),
    // The projected score's free trial (migration 0134, owner 2026-10-05).
    getPremiumLimits(db),
    // Board papers written on paper and checked by hand (migration 0153). Read
    // with the student's own session: the tables only return their own sheets.
    listOwnSubmissions(db),
    // The practice answers the map counts, for the "subtopics mastered" tile
    // (2026-11-08). Its own read fails to nothing rather than to a wrong 0.
    getOwnPracticeEvidence(),
    // "Papers you sat" (moved from Home, 2026-11-08). A failed read shows none.
    getUserAttempts(db, user.id).catch((e: unknown) => {
      console.error("performance attempts read failed", e instanceof Error ? e.message : e);
      return [];
    }),
  ]);
  if (!payload) redirect("/login?next=/performance");

  const built = buildPerformance(payload, now);
  // The map's green dots across every exam on this site (www; intl has no
  // /performance), from the same evidence the map draws.
  const mastered = masteredCount(forSite(withPractice(payload, built, practice, now).lanes, (l) => l.exam, false));
  // The papers list follows the exam focus, as Home's did.
  const focusSlug = header.focus.selected;
  const shownAttempts = focusSlug ? attempts.filter((a) => a.examSlug === focusSlug) : attempts;

  // Past the trial, or before it is revealed, the projection is LEFT OUT of
  // what this page renders, so it never reaches the browser: a real lock, not
  // a hidden card.
  const access = projectionAccess({
    trialDays: limits?.projectionTrialDays ?? null,
    hasPass: limits?.hasPass ?? false,
    startedAt: limits?.projectionStartedAt ?? null,
    now,
  });
  const locked = access.kind === "not_started" || access.kind === "expired";
  const perf = locked
    ? { ...built, lanes: built.lanes.map((l) => ({ ...l, projection: null })) }
    : built;
  // The exam focus (2026-11-08): a two-exam student's chosen exam opens here,
  // and the header's chips stand in for the page's own exam row. A link that
  // names an exam still wins.
  const pf = performanceFocus({
    satExams: [...new Set(perf.lanes.map((l) => l.exam))],
    filterExamName: header.focus.filterExamName,
    urlExam: searchParams.exam,
  });
  const nav = buildLaneNav(perf.lanes, perf.summary.latest?.exam ?? null, {
    exam: pf.exam,
    subject: searchParams.subject,
  });
  const focusExam = header.focus.selected ? getExamBySlug(header.focus.selected) : null;
  // Offer the lock only on a lane that HAD a projection to hide.
  const hadProjection = locked
    ? built.lanes.some((l) => l.exam === nav.selected?.exam && l.subject === nav.selected?.subject && l.projection)
    : false;
  const showGate = hadProjection && (access.kind === "not_started" || access.kind === "expired");
  const projectionNote =
    access.kind === "trial"
      ? `Free for ${access.daysLeft === 1 ? "1 more day" : `${access.daysLeft} more days`}.`
      : undefined;

  // ROUND 2: the reads that need round 1, at once.
  const [pass, links, starter] = await Promise.all([
    showGate && access.kind === "expired" ? premiumPassCta() : Promise.resolve(null),
    nav.selected
      ? getTaxonomyLinks(nav.selected.exam, nav.selected.subject)
      : Promise.resolve<TaxonomyLinks>(EMPTY_TAXONOMY_LINKS),
    // Two in three active students have no graded paper (2026-10-06); for them
    // the page offers one short test instead of a blank box. Read only then.
    built.summary.graded === 0 ? loadStarterCard(db, user.id) : Promise.resolve(undefined),
  ]);
  const projectionLocked = showGate ? <ProjectionGate state={access} pass={pass} /> : undefined;

  const sheets = cardSheetRows(ownSheets, { kind: "self" });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        <MeHeader data={header} active="progress" readOnly={false} />
        <ProgressSwitch active="papers" />
        <OutcomeTiles mastered={mastered} />

        {pf.noPaperFor && focusExam ? (
          <NoPaperFor examName={focusExam.displayName} href={mockCatalogueHref(focusExam.slug)} />
        ) : (
          <PerformanceBody
            perf={perf}
            nav={nav}
            links={links}
            basePath="/performance"
            viewer="self"
            projectionLocked={projectionLocked}
            projectionNote={projectionNote}
            starter={starter}
            showExamRow={pf.showExamRow}
            headerAction={allPapers("bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20")}
          />
        )}
        <RecentPapers
          mocks={summarizeUserMocks(shownAttempts)}
          attempts={shownAttempts}
          browseHref={focusSlug ? mockCatalogueHref(focusSlug) : "/mock"}
        />
        <AnswerSheetsCard rows={sheets.rows} more={sheets.more} />
      </main>
    </>
  );
}

/** The focus exam has no marked paper, though another exam does: say so, and
 *  offer that exam's papers. "All" in the header shows the others. */
function NoPaperFor({ examName, href }: { examName: string; href: string }) {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="font-semibold">No marked {examName} paper yet</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Sit one {examName} paper and this page shows your score, chapters and mistakes for it. Tap All above to see
        your other papers.
      </p>
      <Link
        prefetch={false}
        href={href}
        className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        See {examName} papers
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  );
}

/** The "All your papers" link, styled for the band or for the plain header. */
function allPapers(tone: string) {
  return (
    <Link
      // Not prefetched: /mock/attempts is a per-user server render, and a
      // link in the viewport would run it whether or not it is tapped.
      prefetch={false}
      href="/mock/attempts"
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tone}`}
    >
      All your papers
      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
    </Link>
  );
}

/** The empty page's offer: the student's exams, last practised chapter and the published tests. */
async function loadStarterCard(db: SupabaseClient, userId: string) {
  const [{ data: profile }, lastChapterId, catalogue] = await Promise.all([
    // Own-row read through the student's session (RLS, migration 0045).
    db.from("student_profiles").select("stage, target_exams").eq("user_id", userId).maybeSingle(),
    loadLastPractisedChapter(db, userId),
    loadStarterCatalogue(),
  ]);
  const { targetExams } = profileFieldsFromRow(profile);
  const starter = pickStarter({ targetExams, lastChapterId, ...catalogue });
  const exam = starter.kind === "not-yet" ? getExamBySlug(starter.examSlug) : null;
  return (
    <StarterCard
      starter={starter}
      examName={exam?.displayName ?? null}
      boardHref={exam && isBoardExam(exam.slug) ? resolveBoardHref(exam.slug) : null}
    />
  );
}
