import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPlanDayPage } from "@/lib/homework/query";
import { adjacentDays, homeworkDayView } from "@/lib/homework/dayView";
import { dayHref, parseDayParam, planHref } from "@/lib/homework/links";
import { loadBoardQuestions } from "@/lib/questionPapers/query";
import HomeworkDownload from "../../../_components/HomeworkDownload";
import HomeworkDayReader from "../../../_components/HomeworkDayReader";

type Params = { planSlug: string; day: string };

/**
 * One homework day on screen (2026-10-10), with its download. Rendered on
 * first visit and cached for a day, never built ahead: ~1,850 days, and a
 * build reads production (the 2026-10-04 and 10-09 outages).
 */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

async function load(params: Params) {
  const day = parseDayParam(params.day);
  if (day === null) return null;
  const client = createSupabaseAnonClient();
  const page = await getPlanDayPage(client, params.planSlug, day);
  if (!page) return null;
  const questions = await loadBoardQuestions(client, page.items.map((it) => it.questionId));
  const view = homeworkDayView(page.items, questions);
  if (!view.ok) {
    console.error("homework day: questions unavailable", params.planSlug, day, view.missing);
    return null;
  }
  return { day, plan: page.plan, slots: view.slots };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return { title: "Daily homework" };
  return {
    title: `${data.plan.title} Daily Homework, Day ${data.day}`,
    description: `Day ${data.day} of ${data.plan.title} daily homework: board questions with model answers.`,
    // The same questions are indexed on their own pages (/board, /questions,
    // /question-papers); ~1,850 more copies would be duplicates. Followed, so
    // a crawler still reaches the plan and its other days.
    robots: { index: false, follow: true },
  };
}

export default async function HomeworkDayPage({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) notFound();
  const { day, plan, slots } = data;
  const { prev, next } = adjacentDays(day, plan.days);
  const parts = slots.reduce((n, s) => n + s.questions.length, 0);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[
            { href: "/homework", label: "Daily Homework" },
            { href: planHref(plan.slug), label: plan.title },
            { label: `Day ${day}` },
          ]}
        />
        <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Day {day}: {plan.title}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {slots.length} questions{parts > slots.length ? ` (${parts} parts)` : ""}. Try each one first, then
              open its answer.
            </p>
          </div>
          <HomeworkDownload planSlug={plan.slug} day={day} planTitle={plan.title} />
        </header>

        <HomeworkDayReader
          slots={slots}
          examName={plan.examName}
          dayTitle={`${plan.title}, day ${day}`}
          supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
        />

        <nav aria-label="Other days" className="mt-10 flex items-center justify-between gap-3 border-t pt-4 text-sm">
          {prev ? (
            <Link href={dayHref(plan.slug, prev)} className="inline-flex items-center gap-1.5 font-medium text-brand-accent hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Day {prev}
            </Link>
          ) : (
            <span />
          )}
          <Link href={planHref(plan.slug)} className="text-muted-foreground hover:text-foreground hover:underline">
            All days
          </Link>
          {next ? (
            <Link href={dayHref(plan.slug, next)} className="inline-flex items-center gap-1.5 font-medium text-brand-accent hover:underline">
              Day {next}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
