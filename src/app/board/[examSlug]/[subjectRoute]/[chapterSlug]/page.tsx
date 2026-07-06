import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Home } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getExamBySlug } from "@/lib/exam/examContext";
import { resolveBoardChapter, getBoardChapter, type BoardChapter } from "@/lib/board/query";
import BoardReader from "@/app/board/BoardReader";

type Params = { examSlug: string; subjectRoute: string; chapterSlug: string };

async function load(params: Params): Promise<{ examName: string; displayName: string; chapter: BoardChapter } | null> {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) return null;
  const client = createSupabaseAnonClient();
  const resolved = await resolveBoardChapter(client, exam.examName, params.subjectRoute, params.chapterSlug);
  if (!resolved) return null;
  const chapter = await getBoardChapter(client, {
    examId: resolved.examId,
    chapterId: resolved.chapterId,
    examName: exam.examName,
    subjectName: resolved.subjectName,
    chapterName: resolved.chapterName,
  });
  if (!chapter) return null;
  return { examName: exam.examName, displayName: exam.displayName, chapter };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return { title: "Board textbook solutions" };
  const { chapter } = data;
  const title = `${chapter.chapterName} — ${chapter.subjectName} textbook solutions`;
  return {
    title,
    description: `${chapter.chapterName}: every solved example, exercise, and miscellaneous question with model answers — in ${data.displayName} textbook order.`,
    alternates: { canonical: `/board/${params.examSlug}/${params.subjectRoute}/${params.chapterSlug}` },
  };
}

export default async function BoardChapterPage({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) notFound();
  const { chapter } = data;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link href="/board" className="inline-flex items-center gap-1 hover:text-foreground">
            <Home className="h-3 w-3" aria-hidden /> Board
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <Link href={`/board/${params.examSlug}`} className="hover:text-foreground">
            {data.displayName}
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">{chapter.chapterName}</span>
        </nav>

        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-accent">
            {chapter.subjectName} · Textbook solutions
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">{chapter.chapterName}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Every solved example, exercise, and miscellaneous question — in the order the textbook teaches them.
            <span className="text-muted-foreground/70"> · {chapter.total} questions</span>
          </p>
        </header>

        <BoardReader groups={chapter.groups} supabaseUrl={supabaseUrl} />
      </main>
      <Footer />
    </>
  );
}
