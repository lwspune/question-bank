import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPlanBySlug, listPublishedPlans } from "@/lib/homework/query";
import { sectionsOf, shortNote } from "@/lib/homework/display";
import { homeworkSideNav } from "@/lib/homework/chapters";
import { homeworkOfferFacts, homeworkOfferLead } from "@/lib/billing/passOfferLead";
import HomeworkDownload from "../_components/HomeworkDownload";
import { HomeworkDayBadge, HomeworkProgressProvider, HomeworkProgressSummary } from "../_components/HomeworkProgress";
import PlanTabs from "../_components/PlanTabs";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dayHref } from "@/lib/homework/links";
import { planWording } from "@/lib/homework/display";

// Plans change only when the plan builder runs; a day is plenty.
export const revalidate = 86400;

type Params = { planSlug: string };

export async function generateStaticParams(): Promise<Params[]> {
  try {
    return (await listPublishedPlans(createSupabaseAnonClient())).map((p) => ({ planSlug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const plan = await getPlanBySlug(createSupabaseAnonClient(), params.planSlug);
  if (!plan) return {};
  return {
    title: `${plan.title} Daily Homework from ${plan.examName === "NDA" ? "Past" : "Board"} Papers`,
    description: `${plan.examName} ${plan.subjectName} ${planWording(plan.examName).questions}, ${plan.perDay} a day, as a file to hand out. The questions ${planWording(plan.examName).asker} asked again come first.`,
    alternates: { canonical: `/homework/${plan.slug}` },
  };
}

// Repeats and types are ranked together by count since 2026-11-04, so they
// share the first section.
const sectionTitle = (asker: string): Record<"most" | "once", string> => ({
  most: `Asked most often by ${asker}`,
  once: "Questions asked once",
});

const SECTION_HELP: Record<"most" | "once", string> = {
  most: "Highest count first: questions asked again in their latest wording, and one example of each type of question that keeps coming back.",
  once: "Every other question from the papers.",
};

/**
 * One homework plan, day by day (2026-10-09). Each day lists its chapters and
 * how often each question was asked, with a download box. Cached: the box asks
 * the browser who is looking.
 */
export default async function HomeworkPlanPage({ params }: { params: Params }) {
  const client = createSupabaseAnonClient();
  const [plan, plans] = await Promise.all([getPlanBySlug(client, params.planSlug), listPublishedPlans(client)]);
  if (!plan) notFound();
  const sections = sectionsOf(plan.dayList);
  const offer = homeworkOfferLead(homeworkOfferFacts(plan, plans));

  return (
    <GuideShell
      guideTitle="Daily Homework"
      sideNav={homeworkSideNav(plans, plan.examName)}
      landingHref="/homework"
      breadcrumbs={[{ href: "/homework", label: "Daily Homework" }, { label: plan.title }]}
    >
      <GuideHero
        eyebrow={`Daily homework · ${plan.perDay} questions a day`}
        title={`${plan.title} daily homework`}
        subtitle={plan.summary}
      />

      <PlanTabs planSlug={plan.slug} active="days" />

      {/* Signed in: "Your progress" and each day's label, filled in by the
          browser (the page is cached and shared). */}
      <HomeworkProgressProvider planSlug={plan.slug}>
        <HomeworkProgressSummary planSlug={plan.slug} />

      <div className="mt-8 space-y-10">
        {sections.map((s) => (
          <section key={s.from} aria-labelledby={`part-${s.from}`}>
            <h2 id={`part-${s.from}`} className="section-title text-lg font-semibold">
              {sectionTitle(planWording(plan.examName).asker)[s.kind]}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground tabular-nums">
                {s.from === s.to ? `Day ${s.from}.` : `Days ${s.from} to ${s.to}.`}
              </span>{" "}
              {SECTION_HELP[s.kind]}
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {s.days.map((d) => (
                <li key={d.day} className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <h3 className="font-semibold">
                        <Link href={dayHref(plan.slug, d.day)} prefetch={false} className="hover:underline">
                          Day {d.day}
                        </Link>
                      </h3>
                      <HomeworkDayBadge day={d.day} />
                    </div>
                    <div className="flex items-center gap-2">
                      {/* prefetch off: a plan page holds up to 262 days, and each
                          day page renders on first visit from the database. */}
                      <Button asChild variant="outline" size="sm">
                        <Link href={dayHref(plan.slug, d.day)} prefetch={false} aria-label={`Open day ${d.day} questions`}>
                          <Eye className="h-4 w-4" aria-hidden />
                          Open
                        </Link>
                      </Button>
                      <HomeworkDownload planSlug={plan.slug} day={d.day} planTitle={plan.title} offer={offer} />
                    </div>
                  </div>
                  <ol className="mt-3 space-y-1.5 text-sm">
                    {d.items
                      .filter((it) => it.sub === 1)
                      .map((it) => {
                        const parts = d.items.filter((x) => x.position === it.position).length;
                        return (
                          <li key={it.position} className="flex gap-2">
                            <span className="w-4 shrink-0 text-muted-foreground tabular-nums">{it.position}.</span>
                            <span className="min-w-0">
                              {it.chapter}
                              {parts > 1 && <span className="text-muted-foreground"> (case study, {parts} parts)</span>}
                              <span className="ml-1.5 text-xs text-muted-foreground">{shortNote(it.note)}</span>
                            </span>
                          </li>
                        );
                      })}
                  </ol>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      </HomeworkProgressProvider>
    </GuideShell>
  );
}
