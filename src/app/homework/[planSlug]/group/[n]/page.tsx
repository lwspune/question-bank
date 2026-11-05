import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPlanGroup } from "@/lib/homework/query";
import { homeworkDayView } from "@/lib/homework/dayView";
import { groupHeading, groupItems } from "@/lib/homework/chapters";
import { parseDayParam, planHref } from "@/lib/homework/links";
import { loadBoardQuestions } from "@/lib/questionPapers/query";
import HomeworkDayReader from "../../../_components/HomeworkDayReader";

type Params = { planSlug: string; n: string };

/**
 * Every question of one repeat or type in a homework plan (2026-11-04), the
 * page behind a slot's "See all 8 of this type" link. Rendered on first visit
 * and cached for a day, never built ahead (thousands of groups, and a build
 * reads production). The questions are indexed on their own pages, so this is
 * `noindex, follow`, like the day pages.
 */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

async function load(params: Params) {
  // A group number has the shape of a day number: a whole number from 1.
  const n = parseDayParam(params.n);
  if (n === null) return null;
  const client = createSupabaseAnonClient();
  const page = await getPlanGroup(client, params.planSlug, n);
  if (!page || page.members.length === 0) return null;
  const items = groupItems(page.members);
  const questions = await loadBoardQuestions(client, items.map((it) => it.questionId));
  const view = homeworkDayView(items, questions);
  if (!view.ok) {
    console.error("homework group: questions unavailable", params.planSlug, n, view.missing);
    return null;
  }
  return { ...page, slots: view.slots };
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const data = await load(params);
  if (!data) return { title: "Daily homework" };
  return {
    title: `${data.group.label}: ${data.plan.title} PYQs`,
    description: groupHeading(data.group, data.slots.length),
    robots: { index: false, follow: true },
  };
}

export default async function HomeworkGroupPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const data = await load(params);
  if (!data) notFound();
  const { plan, group, slots } = data;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[
            { href: "/homework", label: "Daily Homework" },
            { href: planHref(plan.slug), label: plan.title },
            { label: group.tier === "repeat" ? "Asked again" : "Question type" },
          ]}
        />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{group.label}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{groupHeading(group, slots.length)}</p>
        <p className="mt-1 text-sm text-muted-foreground">Try each one first, then open its answer.</p>

        <div className="mt-6">
          <HomeworkDayReader
            slots={slots}
            examName={plan.examName}
            dayTitle={`${plan.title}: ${group.label}`}
            supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
            showChapter={false}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
