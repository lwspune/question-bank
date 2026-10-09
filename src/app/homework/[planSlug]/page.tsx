import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPlanBySlug, listPublishedPlans } from "@/lib/homework/query";
import { sectionsOf, shortNote } from "@/lib/homework/display";
import HomeworkDownload from "../_components/HomeworkDownload";

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
    title: `${plan.title} Daily Homework from Board Papers`,
    description: `${plan.days} days of ${plan.examName} ${plan.subjectName} board questions, ${plan.perDay} a day, as a file to hand out. The questions the board asked again come first.`,
    alternates: { canonical: `/homework/${plan.slug}` },
  };
}

const PART_TITLE: Record<1 | 2 | 3, string> = {
  1: "Questions the board asked again",
  2: "Question types the board keeps asking",
  3: "Questions asked once",
};

const PART_HELP: Record<1 | 2 | 3, string> = {
  1: "Each printed once, in its latest wording, highest count first.",
  2: "One example of each type, with how often the type was asked.",
  3: "Every other question from the papers.",
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

  return (
    <GuideShell
      guideTitle="Daily Homework"
      sideNav={[
        { href: "/homework", label: "All plans" },
        ...plans.map((p) => ({ href: `/homework/${p.slug}`, label: p.title })),
      ]}
      landingHref="/homework"
      breadcrumbs={[{ href: "/homework", label: "Daily Homework" }, { label: plan.title }]}
    >
      <GuideHero
        eyebrow={`Daily homework · ${plan.days} days`}
        title={`${plan.title} daily homework`}
        subtitle={plan.summary}
      />

      <div className="mt-8 space-y-10">
        {sections.map((s) => (
          <section key={s.from} aria-labelledby={`part-${s.from}`}>
            <h2 id={`part-${s.from}`} className="section-title text-lg font-semibold">
              {PART_TITLE[s.part]}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground tabular-nums">
                {s.from === s.to ? `Day ${s.from}.` : `Days ${s.from} to ${s.to}.`}
              </span>{" "}
              {PART_HELP[s.part]}
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {s.days.map((d) => (
                <li key={d.day} className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">Day {d.day}</h3>
                    <HomeworkDownload planSlug={plan.slug} day={d.day} planTitle={plan.title} />
                  </div>
                  <ol className="mt-3 space-y-1.5 text-sm">
                    {d.items.map((it) => (
                      <li key={it.position} className="flex gap-2">
                        <span className="w-4 shrink-0 text-muted-foreground tabular-nums">{it.position}.</span>
                        <span className="min-w-0">
                          {it.chapter}
                          <span className="ml-1.5 text-xs text-muted-foreground">{shortNote(it.note)}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </GuideShell>
  );
}
