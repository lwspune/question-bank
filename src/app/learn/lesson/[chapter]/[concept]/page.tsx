import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { LessonClient } from "@/components/learn/LessonClient";
import { courseName } from "@/lib/learn/courseName";
import { homesOf, scopeOf } from "@/lib/learn/lessonState";
import { chapterHref, courseHref, LEARN_HUB, lessonHref } from "@/lib/learn/links";
import { getAllOutlines, getLesson } from "@/lib/learn/query";

type Params = { chapter: string; concept: string };

/**
 * One concept's lesson: ONE address per concept (decision B, 2026-10-27), shared by every course
 * that teaches it; `?course=` only picks the way back. Cached and the same for everyone, built on
 * first visit and refreshed daily: the slides and questions (no keys) are rendered here, and the
 * student's progress loads after (LessonClient).
 */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

async function load(params: Params) {
  const [lesson, outlines] = await Promise.all([getLesson(params.chapter, params.concept), getAllOutlines()]);
  const pool = outlines.find((o) => o.pools[params.chapter])?.pools[params.chapter];
  if (!lesson || !pool) return null;
  const homes = homesOf(outlines, params.chapter, lesson.concept.code).map((h) => ({
    ...h,
    scope: [...scopeOf(outlines.find((o) => o.slug === h.course)!, params.chapter)],
  }));
  return { lesson, pool, homes, outlines };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return { title: "Learn" };
  const { lesson, homes } = data;
  // One page serves every course that teaches the concept, so the title names the chapter, not a board.
  return {
    title: `${lesson.concept.title}: ${homes[0]?.chapterTitle ?? lesson.chapter.title} lesson`,
    description: `${lesson.concept.oneLiner.replaceAll("$", "")}. A short lesson with a worked example, then questions with the mistake behind every wrong answer explained.`,
    alternates: { canonical: lessonHref(params.chapter, params.concept) },
  };
}

export default async function LearnLesson({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) notFound();
  const { lesson, pool, homes, outlines } = data;
  const home = homes[0];
  const course = home && outlines.find((o) => o.slug === home.course);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6">
        <Breadcrumbs
          className="mb-3"
          items={[
            { href: LEARN_HUB, label: "Learn" },
            ...(home && course
              ? [
                  { href: courseHref(home.course), label: courseName(course) },
                  { href: chapterHref(home.course, home.chapter), label: home.chapterTitle },
                ]
              : []),
            { label: lesson.concept.title },
          ]}
        />
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{lesson.concept.title}</h1>
          <p className="pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{lesson.concept.group}</p>
        </div>
        <LessonClient
          chapter={params.chapter}
          code={lesson.concept.code}
          slug={lesson.concept.slug}
          title={lesson.concept.title}
          slides={lesson.slides}
          items={lesson.items}
          pool={pool}
          homes={homes}
        />
      </main>
      <Footer />
    </>
  );
}
