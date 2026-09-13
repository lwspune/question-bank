import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Home } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getExamBySlug } from "@/lib/exam/examContext";
import {
  resolveBoardChapter,
  getBoardChapter,
  getBoardChapterPyqs,
  type BoardChapter,
  type BoardPyqSitting,
} from "@/lib/board/query";
import BoardReader from "@/app/board/BoardReader";

type Params = { examSlug: string; subjectRoute: string; chapterSlug: string };

type Loaded = {
  examName: string;
  displayName: string;
  chapter: BoardChapter;
  pyqSittings: BoardPyqSitting[];
};

async function load(params: Params): Promise<Loaded | null> {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) return null;
  const client = createSupabaseAnonClient();
  const resolved = await resolveBoardChapter(client, exam.examName, params.subjectRoute, params.chapterSlug);
  if (!resolved) return null;

  const [chapter, pyqSittings] = await Promise.all([
    getBoardChapter(client, {
      examId: resolved.examId,
      chapterId: resolved.chapterId,
      examName: exam.examName,
      subjectName: resolved.subjectName,
      chapterName: resolved.chapterName,
    }),
    getBoardChapterPyqs(client, { examId: resolved.examId, chapterId: resolved.chapterId }),
  ]);

  // TEXTBOOK presence still decides whether this page exists — /board is the
  // book reader, and a chapter with PYQs and no textbook rows is one the
  // current book does not have. That is what keeps the 12 old-syllabus MH SSC
  // 10 chapters (Metallurgy, Surds, Carbon Compounds …) off /board without a
  // hand-maintained exclusion list. They stay reachable on /browse.
  if (!chapter) return null;
  return { examName: exam.examName, displayName: exam.displayName, chapter, pyqSittings };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return { title: "Board textbook solutions" };
  const { chapter, pyqSittings } = data;
  const title = `${chapter.chapterName} — ${chapter.subjectName} textbook solutions`;
  const pyqCount = pyqSittings.reduce((n, s) => n + s.questions.length, 0);
  const years = pyqSittings.map((s) => s.year);
  const pyqLine = pyqCount
    ? ` Plus ${pyqCount} solved board past-year questions from ${Math.min(...years)}–${Math.max(...years)}.`
    : "";
  return {
    title,
    description: `${chapter.chapterName}: every solved example, exercise, and miscellaneous question with model answers — in ${data.displayName} textbook order.${pyqLine}`,
    alternates: { canonical: `/board/${params.examSlug}/${params.subjectRoute}/${params.chapterSlug}` },
  };
}

export default async function BoardChapterPage({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) notFound();
  const { chapter } = data;
  const pyqCount = data.pyqSittings.reduce((n, s) => n + s.questions.length, 0);
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
            {pyqCount > 0 && " Plus every board question asked from this chapter."}
            <span className="text-muted-foreground/70"> · {chapter.total} questions</span>
          </p>
        </header>

        <BoardReader groups={chapter.groups} pyqSittings={data.pyqSittings} supabaseUrl={supabaseUrl} />
      </main>
      <Footer />
    </>
  );
}
