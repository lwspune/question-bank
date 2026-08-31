/**
 * /books/[bookSlug] — a book's table of contents.
 *
 * Counts are read live from the bank rather than stored, so the TOC cannot
 * drift from what a chapter actually renders. Each chapter shows its per-exam
 * split, because the whole point of this book is that the two halves sit side
 * by side.
 */
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getBookBySlug } from "@/lib/books/registry";
import { loadBookOverview } from "@/lib/books/query";

export const dynamic = "force-dynamic";

export default async function BookTocPage({
  params,
}: {
  params: { bookSlug: string };
}) {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const book = getBookBySlug(params.bookSlug);
  if (!book) notFound();

  // Service-role: `books`/`book_questions` are RLS-locked (enabled, no
  // policies), so a cookie-bound client cannot read them at all. Safe here
  // because the superadmin gate above has already run — the same shape as the
  // platform-wide /dashboard surfaces.
  const overview = await loadBookOverview(createSupabaseAdminClient(), book);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/books" className="hover:underline">
            Books
          </Link>
        </nav>

        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{book.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{book.subtitle}</p>
          <p className="mt-2 text-sm">
            <span className="font-medium">{overview.total.toLocaleString()}</span>{" "}
            <span className="text-muted-foreground">
              questions across {book.chapters.length} chapters
              {overview.excluded > 0 ? ` · ${overview.excluded} excluded` : ""}
            </span>
          </p>
        </header>

        {/* Never assembled reads as itself, rather than falling back to a
            derived order — a fallback would make a sync that never ran look
            identical to one that did. */}
        {!overview.assembled ? (
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            This book has not been assembled yet. Run{" "}
            <code className="rounded bg-muted px-1 py-0.5">npm run books:sync -- --apply</code>{" "}
            to build its contents from the bank.
          </p>
        ) : null}

        <ul className="divide-y rounded-lg border">
          {overview.chapters.map((summary, i) => (
            <li key={summary.chapter.slug}>
              <Link
                href={`/books/${book.slug}/${summary.chapter.slug}`}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <span className="w-6 shrink-0 text-sm tabular-nums text-muted-foreground">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{summary.chapter.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {book.exams
                      .map((exam) => `${exam} ${summary.byExam[exam] ?? 0}`)
                      .join(" · ")}
                  </span>
                </span>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                  {summary.total.toLocaleString()}
                </span>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
