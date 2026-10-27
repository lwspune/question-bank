import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { CourseOverview } from "@/components/learn/CourseOverview";
import { type ExamSlug, isExamSlug } from "@/lib/exam/examContext";
import { nextSitting } from "@/lib/exam/calendar";
import { courseName } from "@/lib/learn/courseName";
import { LEARN_HUB } from "@/lib/learn/links";
import { getOutline } from "@/lib/learn/query";

type Params = { course: string };

/** Cached and the same for everyone; built on first visit, refreshed daily. */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const outline = await getOutline(params.course);
  if (!outline) return { title: "Learn" };
  const name = courseName(outline);
  return {
    title: `${name}: step-by-step lessons`,
    description: `Learn ${name} one concept at a time, chapter by chapter: a short lesson, then questions until you have it.`,
    alternates: { canonical: `${LEARN_HUB}/${params.course}` },
  };
}

export default async function LearnCourse({ params }: { params: Params }) {
  const outline = await getOutline(params.course);
  if (!outline) notFound();
  const name = courseName(outline);
  // The board's next sitting; the countdown itself is worked out in the browser (the page is cached).
  const sitting = isExamSlug(outline.exam) ? nextSitting(outline.exam as ExamSlug, new Date()) : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Breadcrumbs className="mb-4" items={[{ href: LEARN_HUB, label: "Learn" }, { label: name }]} />
        <CourseOverview outline={outline} name={name} sitting={sitting} />
      </main>
      <Footer />
    </>
  );
}
