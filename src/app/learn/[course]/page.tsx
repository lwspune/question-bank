import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { CourseChapters } from "@/components/learn/CourseChapters";
import { courseName } from "@/lib/learn/courseName";
import { chapterHref, LEARN_HUB } from "@/lib/learn/links";
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
  const chapters = outline.chapters.map((ch) => ({
    slug: ch.slug,
    title: ch.title,
    href: chapterHref(outline.slug, ch.slug),
    keys: ch.parts.flatMap((p) =>
      p.concepts.filter((code) => outline.pools[p.chapter]?.concepts.some((c) => c.code === code && c.published)).map((code) => `${p.chapter}/${code}`),
    ),
  }));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs className="mb-4" items={[{ href: LEARN_HUB, label: "Learn" }, { label: name }]} />
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{name}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {chapters.length} chapters, one concept at a time. Signed in, your progress is saved and each concept opens
            once the ones it builds on are mastered.
          </p>
        </header>
        <CourseChapters chapters={chapters} pools={Object.keys(outline.pools)} />
      </main>
      <Footer />
    </>
  );
}
