import type { Metadata } from "next";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { listPublishedPlans } from "@/lib/homework/query";
import { groupPlansByExam, homeworkExamLabel, homeworkSideNav, wwwPlans } from "@/lib/homework/chapters";
import { slugify } from "@/lib/board/query";
import PlanCard from "./_components/PlanCard";
import { MOST_ASKED } from "@/lib/homework/links";

// Plans change only when the plan builder runs; a day is plenty.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Most Asked PYQs: Top 10 by Chapter and Daily Homework",
  description:
    "The past exam questions asked most often: each chapter's Top 10 PYQs, and daily homework of five questions, to do on screen or hand out as a Word or PDF file.",
  alternates: { canonical: "/homework" },
};

/**
 * Every published homework plan (2026-10-09), grouped by exam since the
 * Homework tab opens here for a visitor with no exam chosen (2026-11-04). A
 * cached page: nothing on it depends on who is looking; the download boxes on
 * each plan ask the browser.
 */
export default async function HomeworkIndex() {
  // www lists its own exams; an intl exam's plans are on intl (2026-11-17).
  const plans = wwwPlans(await listPublishedPlans(createSupabaseAnonClient()));
  const groups = groupPlansByExam(plans);

  return (
    <GuideShell
      wide
      guideTitle={MOST_ASKED}
      sideNav={homeworkSideNav(plans)}
      breadcrumbs={[{ label: MOST_ASKED }]}
    >
      <GuideHero
        eyebrow={MOST_ASKED}
        title="Most asked PYQs"
        subtitle="The past exam questions asked most often. Each subject has the Top 10 PYQs of every chapter, and daily homework: five questions a day, the most asked first."
      />

      {plans.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Most asked PYQs are coming soon. Check back shortly.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {groups.map((g) => (
            <section key={g.examName} aria-labelledby={`exam-${slugify(g.examName)}`}>
              <h2 id={`exam-${slugify(g.examName)}`} className="section-title text-lg font-semibold">
                {homeworkExamLabel(g.examName)}
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
