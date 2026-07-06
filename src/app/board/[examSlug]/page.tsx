import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { BookText, ChevronRight, Home } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getExamBySlug } from "@/lib/exam/examContext";
import { listBoardChapters } from "@/lib/board/query";

type Params = { examSlug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) return { title: "Board" };
  return {
    title: `${exam.displayName} textbook solutions`,
    description: `${exam.displayName} textbook chapters with solved examples, exercises, and model answers in book order.`,
    alternates: { canonical: `/board/${params.examSlug}` },
  };
}

export default async function BoardExamHub({ params }: { params: Params }) {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) notFound();

  const client = createSupabaseAnonClient();
  const subjects = await listBoardChapters(client, exam.examName);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/board" className="inline-flex items-center gap-1 hover:text-foreground">
            <Home className="h-3 w-3" aria-hidden /> Board
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">{exam.displayName}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{exam.displayName} — Textbook</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Read each chapter the way the book teaches it — solved examples, then exercises, then the miscellaneous
            set — every question with a model answer.
          </p>
        </header>

        {subjects.length === 0 ? (
          <p className="rounded-lg border border-dashed bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
            Chapters are being prepared. Check back soon.
          </p>
        ) : (
          <div className="space-y-8">
            {subjects.map((s) => (
              <section key={s.subjectRoute}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.subjectName}
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {s.chapters.map((c) => (
                    <li key={c.chapterSlug}>
                      <Link
                        href={`/board/${params.examSlug}/${c.subjectRoute}/${c.chapterSlug}`}
                        className="group flex items-center justify-between gap-2 rounded-lg border bg-card px-4 py-3 transition-colors hover:border-brand-accent/40 hover:bg-brand-accent/5"
                      >
                        <span className="inline-flex items-center gap-2 font-medium text-foreground">
                          <BookText className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                          {c.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">{c.count} q</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
