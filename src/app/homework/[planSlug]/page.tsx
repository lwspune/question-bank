import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ChevronRight } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPlanChapters, getPlanLinks } from "@/lib/homework/query";
import { HOMEWORK_HUB, MOST_ASKED, planHref, topChapterHref } from "@/lib/homework/links";
import { planWording } from "@/lib/homework/display";
import { homeworkSideNav } from "@/lib/homework/chapters";
import PlanTabs from "../_components/PlanTabs";

type Params = { planSlug: string };

/**
 * A plan's front page (2026-11-24, owner): its chapters, each opening its Top
 * 10 PYQs, with the days a tab away at /homework/<plan>/days. This list was
 * /homework/<plan>/top from 2026-11-04 (now a redirect here). Rendered on
 * first visit and cached for a day, never built ahead: its read walks every
 * item of the plan, and a build reads production.
 */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

// The metadata and the page both need the chapters: one read per render, not two.
const load = cache((slug: string) => getPlanChapters(createSupabaseAnonClient(), slug));

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const data = await load(params.planSlug);
  if (!data) return { title: "Most Asked PYQs" };
  const { plan } = data;
  return {
    title: `${plan.title} Most Asked PYQs: Top 10 by Chapter`,
    description: `The ten ${plan.examName} ${plan.subjectName} past questions to practise first in each chapter: the ones ${planWording(plan.examName).asker} asked again, highest count first. Plus daily homework, five a day.`,
    alternates: { canonical: planHref(plan.slug) },
  };
}

export default async function HomeworkPlanPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const data = await load(params.planSlug);
  if (!data) notFound();
  const { plan, chapters } = data;
  // The side nav is a convenience: a failed read leaves this plan alone in it.
  const links = await getPlanLinks().catch(() => []);
  const sideNav = homeworkSideNav(links.length ? links : [plan], plan.examName);

  return (
    <GuideShell
      guideTitle={MOST_ASKED}
      sideNav={sideNav}
      landingHref={HOMEWORK_HUB}
      breadcrumbs={[{ href: HOMEWORK_HUB, label: MOST_ASKED }, { label: plan.title }]}
    >
      <GuideHero eyebrow={`${MOST_ASKED} · Top 10 PYQs`} title={plan.title} />

      <PlanTabs planSlug={plan.slug} active="top" />

      <p className="mt-6 text-sm text-muted-foreground">
        The ten questions to practise first in each chapter: the ones {planWording(plan.examName).asker} asked again,
        highest count first.
      </p>

      {chapters.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No chapter lists for this plan yet.
        </p>
      ) : (
        <ul className="mt-4 divide-y overflow-hidden rounded-lg border bg-card">
          {chapters.map((c) => (
            <li key={c.id}>
              <Link
                href={topChapterHref(plan.slug, c.slug)}
                prefetch={false}
                className="group flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
              >
                <span className="min-w-0 group-hover:text-brand-accent">{c.name}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </GuideShell>
  );
}
