import type { Metadata } from "next";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { listPublishedPlans } from "@/lib/homework/query";
import { groupPlansByExam } from "@/lib/homework/chapters";
import { slugify } from "@/lib/board/query";
import PlanCard from "./_components/PlanCard";

// Plans change only when the plan builder runs; a day is plenty.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Daily Homework from Past Papers",
  description:
    "Five past exam questions a day, as a Word or PDF file to hand out. The questions asked again come first, highest count first.",
  alternates: { canonical: "/homework" },
};

/**
 * Every published homework plan (2026-10-09), grouped by exam since the
 * Homework tab opens here for a visitor with no exam chosen (2026-11-04). A
 * cached page: nothing on it depends on who is looking; the download boxes on
 * each plan ask the browser.
 */
export default async function HomeworkIndex() {
  const plans = await listPublishedPlans(createSupabaseAnonClient());
  const groups = groupPlansByExam(plans);

  return (
    <GuideShell
      guideTitle="Daily Homework"
      sideNav={[
        { href: "/homework", label: "All plans" },
        ...plans.map((p) => ({ href: `/homework/${p.slug}`, label: p.title })),
      ]}
      breadcrumbs={[{ label: "Daily Homework" }]}
    >
      <GuideHero
        eyebrow="Daily homework"
        title="Daily homework from past papers"
        subtitle="Five past exam questions a day, the most repeated first. Do them here or download the day. Each subject also has the Top 10 PYQs of every chapter."
      />

      {plans.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Homework plans are coming soon. Check back shortly.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {groups.map((g) => (
            <section key={g.examName} aria-labelledby={`exam-${slugify(g.examName)}`}>
              <h2 id={`exam-${slugify(g.examName)}`} className="section-title text-lg font-semibold">
                {g.examName}
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {g.plans.map((p) => (
                  <li key={p.slug}>
                    <PlanCard plan={p} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </GuideShell>
  );
}
