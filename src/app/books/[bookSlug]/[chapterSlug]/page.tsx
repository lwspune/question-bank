/**
 * /books/[bookSlug]/[chapterSlug] — one chapter of the book.
 *
 * Laid out exactly as the book reads: "NDA PYQ" heading, every NDA question
 * for this chapter oldest-first, then "CDS PYQ" and the CDS half. Sets stay
 * whole, with their shared passage printed once above them.
 */
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getBookBySlug, getBookChapter } from "@/lib/books/registry";
import { loadBookChapter } from "@/lib/books/query";
import BookChapterReader from "./BookChapterReader";

export const dynamic = "force-dynamic";

export default async function BookChapterPage({
  params,
}: {
  params: { bookSlug: string; chapterSlug: string };
}) {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const book = getBookBySlug(params.bookSlug);
  if (!book) notFound();
  const chapter = getBookChapter(book, params.chapterSlug);
  if (!chapter) notFound();

  // Service-role — see the TOC page: the book tables are RLS-locked and the
  // superadmin gate above has already run.
  const view = await loadBookChapter(createSupabaseAdminClient(), book, chapter);
  const index = book.chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = index > 0 ? book.chapters[index - 1] : null;
  const next = index < book.chapters.length - 1 ? book.chapters[index + 1] : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/books" className="hover:underline">
            Books
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/books/${book.slug}`} className="hover:underline">
            {book.title}
          </Link>
        </nav>

        <header>
          <p className="text-sm text-muted-foreground">
            Chapter {index + 1} of {book.chapters.length}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">{chapter.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {view.total.toLocaleString()} questions ·{" "}
            {view.sections
              .map((s) => `${s.exam} ${s.questionCount.toLocaleString()}`)
              .join(" · ")}
            {view.excluded > 0 ? ` · ${view.excluded} excluded` : ""}
          </p>
        </header>

        {!view.assembled ? (
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            This book has not been assembled yet. Run{" "}
            <code className="rounded bg-muted px-1 py-0.5">npm run books:sync -- --apply</code>{" "}
            to build its contents from the bank.
          </p>
        ) : null}

        <BookChapterReader
          sections={view.sections}
          questions={Array.from(view.questionsById.values())}
          supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
          bookSlug={book.slug}
          chapterSlug={chapter.slug}
          excludedIds={view.excludedIds}
        />

        <nav className="flex items-center justify-between gap-4 border-t pt-4 text-sm">
          {prev ? (
            <Link
              href={`/books/${book.slug}/${prev.slug}`}
              className="hover:underline"
            >
              ← {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/books/${book.slug}/${next.slug}`}
              className="ml-auto hover:underline"
            >
              {next.name} →
            </Link>
          ) : null}
        </nav>
      </main>
    </>
  );
}
