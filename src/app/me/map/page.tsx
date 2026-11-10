import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, Map as MapIcon, Target, Timer } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { getOwnPerformance, getOwnPracticeEvidence } from "@/lib/performance/service";
import { buildPerformance } from "@/lib/performance/compute";
import { latestEvidenceExam, withPractice } from "@/lib/performance/practice";
import { buildLaneNav } from "@/lib/performance/laneNav";
import { buildMasteryMap, masteryTile, type Band } from "@/lib/performance/masteryMap";
import MapTileCard, { BAND_DOT, BAND_LABEL } from "@/components/performance/MapTile";
import { cn } from "@/lib/utils";
import { drillHref } from "@/lib/drill/from";
import { isIntlHost } from "@/lib/sites/intl";
import { forSite } from "@/lib/sites/siteScope";
import MeHeader from "@/components/me/MeHeader";
import ProgressSwitch from "@/components/me/ProgressSwitch";
import OutcomeTiles from "@/components/me/OutcomeTiles";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { loadMeHeader } from "@/lib/me/header";
import { mapExamFor } from "@/lib/me/progress";
import { segments } from "@/lib/me/charts";
import SegmentBar from "@/components/me/SegmentBar";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { loadNotStarted } from "@/lib/me/startNextServer";
import StartNext from "@/app/me/StartNext";

/**
 * `/me/map` — the mastery map. ENGAGEMENT_SPEC.md B1.
 *
 * Chapter tiles in a two-column grid, one dot per subtopic, coloured by the
 * band the performance core computes, shaped to be SEEN on a phone. Since
 * 2026-11-06 (migration 0221) the bands count PRACTICE answers too (bank,
 * board, question of the day, drill), the latest answer per question, so a
 * fixed mistake moves its dot and a student who has only practised has a map.
 * /performance stays the report on papers alone (lib/performance/practice.ts
 * says why). The drill's end screen links here.
 *
 * ONE EXAM AND ONE SUBJECT AT A TIME, chosen by the same `?exam=&subject=`
 * links /performance uses (buildLaneNav), so the two pages agree on what is
 * selected. Nothing scrolls sideways.
 *
 * Tiles expand with a native <details>: no client JS for a tap, keyboard and
 * screen-reader behaviour for free, and the page stays a server component
 * over a single RPC read. Per-student, never cached, never indexed.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your map",
  robots: { index: false },
};

type Search = { exam?: string; subject?: string };

export default async function MasteryMapPage(props: { searchParams: Promise<Search> }) {
  const searchParams = await props.searchParams;
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/me/map");

  const now = new Date();
  const db = createSupabaseServerClient();
  // intl.pyqvault.com holds the international exams alone, www every other
  // exam (lib/sites/siteScope): each site's map is that site's lanes. On www
  // the map is the Progress tab's Chapters view (2026-11-08) under the
  // student's header; intl has no Home or Papers, so it keeps its own header.
  const intl = isIntlHost((await headers()).get("host"));
  const [payload, practice, header] = await Promise.all([
    getOwnPerformance(),
    getOwnPracticeEvidence(),
    intl ? Promise.resolve(null) : getExamIdMap().then((ids) => loadMeHeader(db, user, ids, { now })),
  ]);
  if (!payload) redirect("/login?next=/me/map");
  await logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "map", now));

  const perf = withPractice(payload, buildPerformance(payload, now), practice, now);
  const lanes = forSite(perf.lanes, (l) => l.exam, intl);
  // Chapters follows the exam focus, as Papers does (lib/me/progress mapExamFor).
  const mf = mapExamFor({
    laneExams: [...new Set(lanes.map((l) => l.exam))],
    focusExamName: header?.focus.filterExamName ?? null,
    urlExam: searchParams.exam,
  });
  const nav = buildLaneNav(lanes, latestEvidenceExam(perf, practice), { exam: mf.exam, subject: searchParams.subject });
  const map = nav.selected ? buildMasteryMap(nav.selected) : null;
  // "Not started yet" (2026-11-09): the selected subject's highest-value
  // chapters the student has not answered anything in, as Home's Start next
  // counts them. www only (intl keeps its own page); a failed read shows none.
  const selectedSlug = nav.selected ? EXAM_REGISTRY.find((e) => e.examName === nav.selected!.exam)?.slug : undefined;
  const selectedExamId = header && selectedSlug ? (await getExamIdMap())[selectedSlug] : null;
  const notStarted =
    nav.selected && selectedExamId
      ? await loadNotStarted(db, user.id, selectedExamId, nav.selected.subject).catch((e: unknown) => {
          console.error("map not-started read failed", e instanceof Error ? e.message : e);
          return [];
        })
      : [];

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {header ? (
          <>
            <MeHeader data={header} active="progress" readOnly={false} />
            <ProgressSwitch active="chapters" />
            <OutcomeTiles mastery={masteryTile(lanes)} />
            <p className="text-sm text-muted-foreground">
              Every subtopic you have answered questions on, in papers or in practice. Fixing mistakes moves the dots.
            </p>
          </>
        ) : (
          <header className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
              <MapIcon className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Your map</h1>
              <p className="text-sm text-muted-foreground">
                Every subtopic you have answered questions on, in papers or in practice. Fixing mistakes moves the dots.
              </p>
            </div>
          </header>
        )}

        {!map ? (
          <EmptyState />
        ) : (
          <>
            {/* Exam, then subject — the same two-row picker /performance uses. */}
            {mf.showExamRow && nav.exams.length > 1 && (
              <nav aria-label="Exam" className="flex flex-wrap gap-2">
                {nav.exams.map((e) => (
                  <PickLink
                    key={e.exam}
                    href={`/me/map?exam=${encodeURIComponent(e.exam)}`}
                    active={e.exam === nav.selectedExam}
                  >
                    {e.exam}
                  </PickLink>
                ))}
              </nav>
            )}
            {nav.subjects.length > 1 && (
              <nav aria-label="Subject" className="flex flex-wrap gap-2">
                {nav.subjects.map((l) => (
                  <PickLink
                    key={l.subject}
                    href={`/me/map?exam=${encodeURIComponent(l.exam)}&subject=${encodeURIComponent(l.subject)}`}
                    active={l.subject === nav.selected?.subject}
                  >
                    {l.subject}
                  </PickLink>
                ))}
              </nav>
            )}

            {/* The subject at a glance (2026-11-10): one bar in the dots' own
                colours, best first, and under it the legend, which carries the
                same counts in words. */}
            <div className="space-y-2">
              <SegmentBar
                parts={segments(SUMMARY_ORDER.map((b) => ({ key: b, n: map.totals[b] })))}
                colorOf={BAND_DOT}
                size="lg"
              />
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground" aria-label="Legend">
              {SUMMARY_ORDER.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5">
                  <span className={cn("inline-block h-2.5 w-2.5 rounded-full", BAND_DOT[b])} aria-hidden />
                  <span className="tabular-nums text-foreground">{map.totals[b]}</span> {BAND_LABEL[b]}
                </li>
              ))}
            </ul>
            </div>

            <StartNext
              chapters={notStarted}
              title="Not started yet"
              from="map"
              note="The chapters of this subject worth the most that you haven't answered anything in."
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {map.tiles.map((t) => (
                <MapTileCard key={t.chapter} tile={t} />
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Bands use the same thresholds as your performance page: under 50% is to fix, 70% and above is
              mastered, and a subtopic needs three judged answers before it is called either. A question you
              answer more than once counts by your latest answer, and recent answers count more.
            </p>
          </>
        )}
      </main>
    </>
  );
}

/** The summary bar and its legend, best first: a bar that opens on red reads as a verdict. */
const SUMMARY_ORDER: readonly Band[] = ["mastered", "mid", "weak", "unknown"];

function PickLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      // Each pill is a full per-user server render of this page; never prefetch
      // them — the 2026-09-15 /performance outage was exactly this shape.
      prefetch={false}
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-9 items-center rounded-full border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active ? "border-brand-accent bg-brand/10 text-brand-accent" : "hover:bg-accent"
      )}
    >
      {children}
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <p className="font-semibold">No map yet</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        The map is drawn from the questions you answer, in papers and in practice. Answer a few and their
        subtopics appear here.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/mock"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Timer className="h-5 w-5" aria-hidden />
          Take a mock test
        </Link>
        <Link
          href={drillHref("map")}
          prefetch={false}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-6 text-base font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Target className="h-5 w-5" aria-hidden />
          Fix your mistakes
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
