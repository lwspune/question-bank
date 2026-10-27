import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { ChapterMap } from "@/components/learn/ChapterMap";
import { getExamBySlug } from "@/lib/exam/examContext";
import { courseName } from "@/lib/learn/courseName";
import { courseHref, LEARN_HUB } from "@/lib/learn/links";
import { getOutline } from "@/lib/learn/query";
import { renderInlineText } from "@/lib/learn/richText";

type Params = { course: string; chapter: string };

/** Cached and the same for everyone; built on first visit, refreshed daily. */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const outline = await getOutline(params.course);
  const ch = outline?.chapters.find((c) => c.slug === params.chapter);
  if (!outline || !ch) return { title: "Learn" };
  return {
    title: `${ch.title}: ${courseName(outline)} lessons`,
    description: `Learn ${ch.title} for ${courseName(outline)} one concept at a time, in the order each builds on the last.`,
    alternates: { canonical: `${LEARN_HUB}/${params.course}/${params.chapter}` },
  };
}

export default async function LearnChapter({ params }: { params: Params }) {
  const outline = await getOutline(params.course);
  const ch = outline?.chapters.find((c) => c.slug === params.chapter);
  if (!outline || !ch) notFound();
  const name = courseName(outline);
  const board = getExamBySlug(outline.exam)?.boardExam ? `/board/${outline.exam}` : null;
  const oneLiners = Object.fromEntries(
    ch.parts.flatMap((p) =>
      (outline.pools[p.chapter]?.concepts ?? []).filter((c) => p.concepts.includes(c.code)).map((c) => [`${p.chapter}/${c.code}`, renderInlineText(c.one_liner)]),
    ),
  );

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[{ href: LEARN_HUB, label: "Learn" }, { href: courseHref(outline.slug), label: name }, { label: ch.title }]}
        />
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{ch.title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            The concepts in teaching order. Each one is a short lesson, then questions until you get three right.
          </p>
        </header>
        <ChapterMap outline={outline} chapter={ch.slug} oneLiners={oneLiners} />
        {board && (
          <p className="mt-8 text-sm text-muted-foreground">
            Done with the concepts?{" "}
            <Link href={board} className="font-medium text-brand-accent underline underline-offset-2">
              Practise the textbook exercises and board questions
            </Link>
            .
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
