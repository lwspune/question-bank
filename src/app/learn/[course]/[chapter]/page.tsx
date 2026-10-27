import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { ChapterPath } from "@/components/learn/ChapterPath";
import { MistakesCard } from "@/components/learn/MistakesCard";
import { FileText, Library } from "lucide-react";
import { bankChapterLinks } from "@/lib/learn/bankChapters";
import { getChapterLanding } from "@/lib/questions/landing";
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
  const practice = bankChapterLinks(outline.exam, outline.slug, ch);
  // A chapter with too few past questions has no page of its own (MIN_QUESTIONS_FOR_LANDING).
  const [, , exam, subject, chapterSlug] = practice.questions.split("/");
  const landing = await getChapterLanding(exam, subject, chapterSlug).catch((e) => {
    console.error("learn chapter: past-questions lookup failed", e);
    return null;
  });
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
        <header className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{name}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{ch.title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Each concept is a short lesson, then questions until you get three right.
          </p>
          <MistakesCard course={outline.slug} chapter={ch.slug} />
        </header>
        <ChapterPath outline={outline} chapter={ch.slug} oneLiners={oneLiners} />
        <section aria-label="Practise this chapter" className="mt-10 rounded-2xl border bg-card p-5">
          <h2 className="font-semibold text-foreground">Practise {ch.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Once the concepts click, try the questions your exam asks.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href={practice.board}
              className="flex items-center gap-3 rounded-xl border p-3 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="icon-tile grid h-9 w-9 shrink-0 place-items-center rounded-lg">
                <Library className="h-4 w-4 text-brand-accent" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-medium text-foreground">Textbook exercises</span>
                <span className="block text-xs text-muted-foreground">Every exercise, with model answers</span>
              </span>
            </Link>
            {landing && (
              <Link
                href={practice.questions}
                className="flex items-center gap-3 rounded-xl border p-3 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="icon-tile grid h-9 w-9 shrink-0 place-items-center rounded-lg">
                  <FileText className="h-4 w-4 text-brand-accent" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-medium text-foreground">Past board questions</span>
                  <span className="block text-xs text-muted-foreground">Asked from this chapter, with solutions</span>
                </span>
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
