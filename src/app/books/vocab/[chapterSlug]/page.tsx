/**
 * /books/vocab/[chapterSlug] — one chapter, on screen.
 *
 * READ-ONLY, unlike the `/books` chapter reader one level up. That surface is an
 * EDITOR because a PYQ book is curated — questions get excluded and reordered.
 * This book's content is authored through `commit-entries.ts`, where the cluster
 * cross-check and the citation guard live, so an on-screen edit here would be a
 * second way in that skips both. Fixes belong in the authored JSON.
 *
 * An EXCLUDED entry is shown struck through rather than hidden: hiding it would
 * make a curation decision invisible on the one surface that could reverse it,
 * and only the print view drops it.
 */
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Printer } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { CADET_VOCAB, VOCAB_SECTIONS, examTagOf } from "@/lib/vocab/registry";
import { loadVocabChapter } from "@/lib/vocab/query";

export const dynamic = "force-dynamic";

export default async function VocabChapterPage({
  params,
}: {
  params: { chapterSlug: string };
}) {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const view = await loadVocabChapter(
    createSupabaseAdminClient(),
    CADET_VOCAB.slug,
    params.chapterSlug
  );
  if (!view) notFound();

  const part = CADET_VOCAB.parts.find((p) => p.key === view.chapter.part)!;
  const section = view.chapter.section
    ? VOCAB_SECTIONS.find((s) => s.key === view.chapter.section)
    : undefined;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/books" className="hover:underline">
            Books
          </Link>
          {" / "}
          <Link href="/books/vocab" className="hover:underline">
            {CADET_VOCAB.title}
          </Link>
        </nav>

        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            {section ? section.title : part.title} · {view.chapter.label}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {section ? section.blurb : part.blurb}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {view.printed.toLocaleString()} printed
            {view.entries.length !== view.printed
              ? ` · ${view.entries.length - view.printed} withheld`
              : ""}
          </p>
          <Link
            href={`/books/vocab/${view.chapter.slug}/print`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            Print view
          </Link>
        </header>

        <ol className="space-y-4">
          {view.entries.map((e) => (
            <li
              key={e.id}
              className={`border-l-2 pl-4 ${
                e.excluded ? "border-destructive/40 opacity-60" : "border-border"
              }`}
            >
              <p className="font-serif">
                <span
                  className={`font-semibold ${e.excluded ? "line-through" : ""}`}
                >
                  {e.word}
                </span>
                <span className="text-muted-foreground">: </span>
                <span>{e.meaning}</span>
              </p>

              {e.sentence ? (
                <p className="mt-1 font-serif text-sm italic text-muted-foreground">
                  {e.sentence}
                  {e.sentenceSource ? (
                    <span className="not-italic"> — {e.sentenceSource}</span>
                  ) : null}
                </p>
              ) : null}

              {e.synonyms.length ? (
                <p className="mt-1 text-sm">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Synonyms{" "}
                  </span>
                  {e.synonyms.join(", ")}
                </p>
              ) : null}
              {e.antonyms.length ? (
                <p className="text-sm">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Antonyms{" "}
                  </span>
                  {e.antonyms.join(", ")}
                </p>
              ) : null}

              {/* Part 4 carries no sentence, so the exam tag is the only
                  provenance it has — and a practice-only idiom must say so
                  rather than read as one a paper set. */}
              {e.part === "idiom" && e.exams.length ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  {examTagOf(e.exams, e.timesAsked)}
                </p>
              ) : null}

              {e.excluded && e.note ? (
                <p className="mt-1 text-xs text-destructive">Withheld: {e.note}</p>
              ) : null}
            </li>
          ))}
        </ol>

        {view.entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No entries in this chapter yet.
          </p>
        ) : null}
      </main>
    </>
  );
}
