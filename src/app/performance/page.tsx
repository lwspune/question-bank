import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import PerformanceBody from "@/components/performance/PerformanceBody";
import { getSessionUser } from "@/lib/auth";
import { getOwnPerformance } from "@/lib/performance/service";
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

export default async function OwnPerformancePage({ searchParams }: { searchParams: Search }) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/performance");

  const payload = await getOwnPerformance();
  if (!payload) redirect("/login?next=/performance");

  const now = new Date();
  const db = createSupabaseServerClient();
  // Who has opened this page was never recorded; now once a day.
  await logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "performance", now));

  const built = buildPerformance(payload, now);

  // The projected score's free trial (migration 0134, owner 2026-10-05). Past
  // it, or before it is revealed, the projection is LEFT OUT of what this page
  // renders, so it never reaches the browser: a real lock, not a hidden card.
  const limits = await getPremiumLimits(db);
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
  const nav = buildLaneNav(perf.lanes, perf.summary.latest?.exam ?? null, searchParams);
  // Offer the lock only on a lane that HAD a projection to hide.
  const hadProjection = locked
    ? built.lanes.some((l) => l.exam === nav.selected?.exam && l.subject === nav.selected?.subject && l.projection)
    : false;
  const projectionLocked =
    hadProjection && (access.kind === "not_started" || access.kind === "expired") ? (
      <ProjectionGate state={access} pass={access.kind === "expired" ? await premiumPassCta() : null} />
    ) : undefined;
  const projectionNote =
    access.kind === "trial"
      ? `Free for ${access.daysLeft === 1 ? "1 more day" : `${access.daysLeft} more days`}.`
      : undefined;

  const links: TaxonomyLinks = nav.selected
    ? await getTaxonomyLinks(nav.selected.exam, nav.selected.subject)
    : EMPTY_TAXONOMY_LINKS;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Your performance</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything your timed papers say about where your marks are.
            </p>
          </div>
          <Link
            // Not prefetched: /mock/attempts is a per-user server render, and a
            // link in the viewport would run it whether or not it is tapped.
            prefetch={false}
            href="/mock/attempts"
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            All your papers
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <PerformanceBody
          perf={perf}
          nav={nav}
          links={links}
          basePath="/performance"
          viewer="self"
          projectionLocked={projectionLocked}
          projectionNote={projectionNote}
        />
      </main>
    </>
  );
}
