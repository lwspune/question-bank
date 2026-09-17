/**
 * Index of the formula axis — every identity a chapter's solutions use, with
 * how many questions use each.
 *
 * Ordered by question count rather than by teaching order, because the point of
 * this page is weight: it tells a student which identities the chapter actually
 * leans on, which the notes' pedagogical ordering deliberately does not.
 */
import Link from "next/link";
import type { Metadata } from "next";
import { Sigma } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import KatexRenderer from "@/components/math/KatexRenderer";
import { FORMULA_CHAPTERS, topicsByWeight, type FormulaKind } from "@/lib/formula";

const SITE_URL = "https://www.pyqvault.com";

export const revalidate = 86400;

const total = FORMULA_CHAPTERS.reduce((n, c) => n + c.topics.length, 0);

export const metadata: Metadata = {
  title: `Formula index — ${total} identities, each with the questions that use it`,
  description: `Every formula, property and technique the Matrices & Determinants solutions in the bank actually use, each with the full set of past-year and practice questions whose solution invokes it. Free to browse.`,
  alternates: { canonical: `${SITE_URL}/formula` },
};

const KIND_LABEL: Record<FormulaKind, string> = {
  formula: "Formula",
  property: "Property",
  technique: "Technique",
};

const KIND_CLASS: Record<FormulaKind, string> = {
  formula: "bg-brand-accent/10 text-brand-accent",
  property: "bg-muted text-muted-foreground",
  technique: "bg-muted text-muted-foreground",
};

export default function FormulaIndexPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-8">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-accent">
          <Sigma className="h-3.5 w-3.5" aria-hidden />
          Formula index
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Questions by the identity their solution uses
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          A different way into the same bank. Instead of filtering by chapter,
          pick the formula you want to drill and get every question whose
          solution actually invokes it — including the ones whose stem never
          mentions it.
        </p>

        {FORMULA_CHAPTERS.map((chapter) => {
          const topics = topicsByWeight(chapter);
          const covered = new Set(topics.flatMap((t) => t.questionIds)).size;
          return (
            <section key={chapter.chapterSlug} className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">
                {chapter.chapterName}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {topics.length} identities across {covered} questions, read and
                tagged one by one.
                {chapter.notesHref && (
                  <>
                    {" "}
                    <Link href={chapter.notesHref} className="underline hover:no-underline">
                      Chapter notes
                    </Link>
                    .
                  </>
                )}
              </p>

              <ul className="mt-5 divide-y rounded-lg border">
                {topics.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/formula/${t.slug}`}
                      className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-2">
                          <span className="font-medium">{t.name}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[11px] ${KIND_CLASS[t.kind]}`}
                          >
                            {KIND_LABEL[t.kind]}
                          </span>
                        </span>
                        <span className="mt-1 block overflow-x-auto text-sm">
                          <KatexRenderer text={`\\(${t.latex}\\)`} />
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-lg font-semibold text-brand-accent">
                          {t.questionIds.length}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          questions
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <p className="mt-10 rounded-md border border-dashed p-5 text-sm text-muted-foreground">
          Identities used by fewer than 12 questions in a chapter are not listed:
          a page with four questions on it is not a drill. This chapter yielded
          79 distinct identities in all, of which {total} clear that bar.
        </p>
      </main>
      <Footer />
    </>
  );
}
