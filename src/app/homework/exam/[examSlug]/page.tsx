import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { PYQVAULT_EXAMS } from "@/lib/exam/examContext";
import { getPlanLinks, listPublishedPlans } from "@/lib/homework/query";
import { homeworkSideNav } from "@/lib/homework/chapters";
import { examHomeworkPageHref, HOMEWORK_HUB } from "@/lib/homework/links";
import PlanCard from "../../_components/PlanCard";

type Params = { examSlug: string };

/**
 * One exam's homework (2026-11-04): where the Homework tab goes once a student
 * has chosen an exam. Lists that exam's plans, or says its homework is coming
 * and links every plan, so the tab never lands on an empty page. Rendered on
 * first visit and cached for a day, never built ahead: a build reads production.
 */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

function examFor(slug: string) {
  return PYQVAULT_EXAMS.find((e) => e.slug === slug) ?? null;
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const exam = examFor(params.examSlug);
  if (!exam) return { title: "Daily homework" };
  return {
    title: `${exam.displayName} Daily Homework from Past Papers`,
    description: `${exam.displayName} past questions, five a day, the most repeated first, and the Top 10 PYQs of every chapter.`,
    alternates: { canonical: examHomeworkPageHref(exam.slug) },
  };
}

export default async function HomeworkExamPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const exam = examFor(params.examSlug);
  if (!exam) notFound();
  const plans = await listPublishedPlans(createSupabaseAnonClient(), { examName: exam.examName });
  // The side menu lists this exam's plans; a failed read falls back to the plans read above.
  const links = await getPlanLinks().catch(() => []);

  return (
    <GuideShell
      wide
      guideTitle="Daily Homework"
      sideNav={homeworkSideNav(links.length ? links : plans, exam.examName)}
      landingHref={HOMEWORK_HUB}
      breadcrumbs={[{ href: HOMEWORK_HUB, label: "Daily Homework" }, { label: exam.displayName }]}
    >
      <GuideHero
        eyebrow="Daily homework"
        title={`${exam.displayName} homework from past papers`}
        subtitle={
          plans.length
            ? "Five past questions a day, the most repeated first. Do them here or download the day. Each subject also has the Top 10 PYQs of every chapter."
            : undefined
        }
      />

      {plans.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Homework for {exam.displayName} is coming soon.{" "}
          <Link href={HOMEWORK_HUB} className="font-medium text-brand-accent underline underline-offset-2">
            See every homework plan
          </Link>
        </p>
      ) : (
        <>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <li key={p.slug}>
                <PlanCard plan={p} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Preparing for another exam?{" "}
            <Link href={HOMEWORK_HUB} className="font-medium text-brand-accent underline underline-offset-2">
              See all homework plans
            </Link>
          </p>
        </>
      )}
    </GuideShell>
  );
}
