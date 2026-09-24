import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Map as MapIcon, Target, Timer } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { getOwnPerformance } from "@/lib/performance/service";
import { buildPerformance } from "@/lib/performance/compute";
import { buildLaneNav } from "@/lib/performance/laneNav";
import { buildMasteryMap, BAND_ORDER, type Band, type MapTile } from "@/lib/performance/masteryMap";
import { cn } from "@/lib/utils";

/**
 * `/me/map` — the mastery map. ENGAGEMENT_SPEC.md B1.
 *
 * The same numbers as /performance's chapter accordion, shaped to be SEEN on a
 * phone: chapter tiles in a two-column grid, one dot per subtopic, coloured by
 * the band the performance core computes. The drill retiring a question is
 * what moves a dot, so the drill's end screen links here.
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

const DOT: Record<Band, string> = {
  weak: "bg-red-500",
  mid: "bg-amber-500",
  mastered: "bg-emerald-500",
  unknown: "bg-muted-foreground/30",
};

const BAND_LABEL: Record<Band, string> = {
  weak: "to fix",
  mid: "nearly there",
  mastered: "mastered",
  unknown: "not tested yet",
};

export default async function MasteryMapPage({ searchParams }: { searchParams: Search }) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/me/map");

  const payload = await getOwnPerformance();
  if (!payload) redirect("/login?next=/me/map");

  const perf = buildPerformance(payload, new Date());
  const nav = buildLaneNav(perf.lanes, perf.summary.latest?.exam ?? null, searchParams);
  const map = nav.selected ? buildMasteryMap(nav.selected) : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <header className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
            <MapIcon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Your map</h1>
            <p className="text-sm text-muted-foreground">
              Every subtopic your timed papers have touched. Fixing mistakes moves the dots.
            </p>
          </div>
        </header>

        {!map ? (
          <EmptyState />
        ) : (
          <>
            {/* Exam, then subject — the same two-row picker /performance uses. */}
            {nav.exams.length > 1 && (
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

            {/* Totals: the legend IS the summary, so there is one row, not two. */}
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground" aria-label="Legend">
              {BAND_ORDER.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5">
                  <span className={cn("inline-block h-2.5 w-2.5 rounded-full", DOT[b])} aria-hidden />
                  <span className="tabular-nums text-foreground">{map.totals[b]}</span> {BAND_LABEL[b]}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {map.tiles.map((t) => (
                <Tile key={t.chapter} tile={t} />
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Bands use the same thresholds as your performance page: under 50% is to fix, 70% and above is
              mastered, and a subtopic needs three judged answers before it is called either.
            </p>
          </>
        )}
      </main>
    </>
  );
}

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

/**
 * A chapter tile. Collapsed: name, the dot row, the plain-words label.
 * Expanded (native <details>): one line per subtopic with its band and a
 * "Practise" link. The summary is the whole collapsed card so the tap target
 * is the tile, not a chevron.
 */
function Tile({ tile }: { tile: MapTile }) {
  return (
    <details className="group rounded-xl border bg-card">
      <summary className="cursor-pointer list-none p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        <p className="truncate text-sm font-semibold" title={tile.chapter}>
          {tile.chapter}
        </p>
        <div className="mt-2 flex flex-wrap gap-1" aria-hidden>
          {tile.dots.map((d) => (
            <span key={d.subtopic} className={cn("inline-block h-2.5 w-2.5 rounded-full", DOT[d.band])} />
          ))}
        </div>
        <p
          className={cn(
            "mt-2 text-xs",
            tile.counts.weak > 0 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
          )}
        >
          {tile.label}
        </p>
      </summary>
      <ul className="space-y-1.5 border-t p-3">
        {tile.dots.map((d) => (
          <li key={d.subtopic} className="flex items-center gap-2 text-xs">
            <span className={cn("inline-block h-2.5 w-2.5 shrink-0 rounded-full", DOT[d.band])} aria-hidden />
            <span className="min-w-0 flex-1 truncate" title={d.subtopic}>
              {d.subtopic}
              <span className="sr-only">, {BAND_LABEL[d.band]}</span>
            </span>
            {d.accuracy !== null && (
              <span className="tabular-nums text-muted-foreground">{d.accuracy}%</span>
            )}
            <Link
              href={d.href}
              prefetch={false}
              aria-label={`Practise ${d.subtopic}`}
              className="text-brand-accent underline-offset-4 hover:underline focus-visible:underline"
            >
              Practise
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <p className="font-semibold">No map yet</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        The map is drawn from your timed papers. Sit one and every subtopic it touched appears here.
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
          href="/drill"
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
