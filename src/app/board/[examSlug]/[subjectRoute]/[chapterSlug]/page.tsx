import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import Footer from "@/components/Footer";
import { createSupabaseAnonClient, createTypedAnonClient } from "@/lib/supabase/server";
import { BOARD_EXAMS, getExamBySlug } from "@/lib/exam/examContext";
import { boardChapterTitle } from "@/lib/seo/pageTitles";
import {
  resolveBoardChapter,
  getBoardChapter,
  getBoardChapterPyqs,
  getSubjectPaperCounts,
  listBoardChapters,
  type BoardChapter,
  type BoardPaperCount,
  type BoardPyqSitting,
} from "@/lib/board/query";
import BoardReader, { type BoardTopPyqs } from "@/app/board/BoardReader";
import { loadChapterTopPyqs } from "@/lib/homework/chapterTop";
import { loadRevisionSheet } from "@/lib/board/revision/registry";
import type { RevisionSheet } from "@/lib/board/revision/types";
import BoardRevisionSheet from "@/app/board/_components/BoardRevisionSheet";
import { hotOnly } from "@/lib/seo/prerenderBudget";
import { getTwinsForQuestions, type QuestionTwins } from "@/lib/crossExam/query";
import { ExamTwinChapterLine, ExamTwinsProvider } from "@/components/crossExam/ExamTwins";
import { HOT_BOARD_CHAPTERS } from "@/lib/seo/prerenderHotPaths";
import ChapterFixLine from "@/components/drill/ChapterFixLine";
import BoardPathLine from "@/components/path/BoardPathLine";
import { SUBJECT_NAME, isPathExam } from "@/lib/path/model";
import { CHAPTER_FIX_FROM } from "@/lib/drill/from";

type Params = { examSlug: string; subjectRoute: string; chapterSlug: string };

/**
 * Cached like /notes and /questions. The reader reads nothing per-viewer on the
 * server (the reveal meter and its lock live in the browser), so every chapter
 * is built ahead and refreshed daily. Before 2026-10-04 each visit rendered from
 * the database, 0.4-1.6 s to first byte against ~0.2 s for a cached page, and
 * Clarity recorded the waiting taps as dead clicks.
 *
 * A chapter added after a build renders on its first request and is cached from
 * then on (dynamicParams stays true), and joins the list at the next build.
 * On Vercel only chapters people read are built ahead (179 of 390 had 2+ views in
 * 18 days); the rest render on first visit the same way (TECH_DEBT_SPEC.md 2.3).
 */
export const revalidate = 86400;

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const client = createSupabaseAnonClient();
    const out: Params[] = [];
    for (const exam of BOARD_EXAMS) {
      const subjects = await listBoardChapters(client, exam.examName);
      for (const s of subjects) {
        for (const c of s.chapters) {
          out.push({ examSlug: exam.slug, subjectRoute: c.subjectRoute, chapterSlug: c.chapterSlug });
        }
      }
    }
    return hotOnly(out, (p) => `${p.examSlug}/${p.subjectRoute}/${p.chapterSlug}`, HOT_BOARD_CHAPTERS);
    // A Supabase blip during a build must not fail the deploy; the pages then
    // render on first request instead (the /questions landings' guard).
  } catch {
    return [];
  }
}

type Loaded = {
  /** For the "Fix N mistakes in this chapter" line (2026-11-07). */
  chapterId: string;
  examName: string;
  displayName: string;
  chapter: BoardChapter;
  pyqSittings: BoardPyqSitting[];
  /** Papers the SUBJECT sat per year — the recurrence strip's divisor. Loaded
   *  here because it is a per-subject fact the chapter's own rows cannot see. */
  paperCounts: BoardPaperCount[];
  /** The chapter's Top 10 PYQs, or null when its subject has no published homework plan. */
  top: BoardTopPyqs | null;
  /** The chapter's quick-revision sheet (2026-11-03), or null. A code file, not a database read. */
  revision: RevisionSheet | null;
};

async function load(params: Params): Promise<Loaded | null> {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) return null;
  const client = createSupabaseAnonClient();
  const resolved = await resolveBoardChapter(client, exam.examName, params.subjectRoute, params.chapterSlug);
  if (!resolved) return null;

  const [chapter, pyqSittings, paperCounts, top, revision] = await Promise.all([
    getBoardChapter(client, {
      examId: resolved.examId,
      chapterId: resolved.chapterId,
      examName: exam.examName,
      subjectName: resolved.subjectName,
      chapterName: resolved.chapterName,
    }),
    getBoardChapterPyqs(client, { examId: resolved.examId, chapterId: resolved.chapterId }),
    getSubjectPaperCounts(client, {
      examId: resolved.examId,
      subjectId: resolved.subjectId,
      examName: exam.examName,
    }),
    // A failed read drops the tab, never the page: the textbook and the board
    // questions are the page, the Top 10 is a view of the second.
    loadChapterTopPyqs(client, { examId: resolved.examId, subjectId: resolved.subjectId, chapterId: resolved.chapterId }, "board"),
    loadRevisionSheet({ examSlug: params.examSlug, subjectRoute: params.subjectRoute, chapterSlug: params.chapterSlug }),
  ]);

  // TEXTBOOK presence still decides whether this page exists — /board is the
  // book reader, and a chapter with PYQs and no textbook rows is one the
  // current book does not have. That is what keeps the 12 old-syllabus MH SSC
  // 10 chapters (Metallurgy, Surds, Carbon Compounds …) off /board without a
  // hand-maintained exclusion list. They stay reachable on /browse.
  if (!chapter) return null;
  return {
    chapterId: resolved.chapterId,
    examName: exam.examName,
    displayName: exam.displayName,
    chapter,
    pyqSittings,
    paperCounts,
    top,
    revision,
  };
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const data = await load(params);
  if (!data) return { title: "Board textbook solutions" };
  const { chapter, pyqSittings } = data;
  const title = boardChapterTitle({
    chapterName: chapter.chapterName,
    examDisplay: data.displayName,
    subjectName: chapter.subjectName,
  });
  const pyqCount = pyqSittings.reduce((n, s) => n + s.questions.length, 0);
  const years = pyqSittings.map((s) => s.year);
  const pyqLine = pyqCount
    ? ` Plus ${pyqCount} solved board past-year questions from ${Math.min(...years)}–${Math.max(...years)}.`
    : "";
  return {
    title: { absolute: title },
    description: `${chapter.chapterName}: every solved example, exercise, and miscellaneous question with model answers, in ${data.displayName} textbook order.${pyqLine}`,
    alternates: { canonical: `/board/${params.examSlug}/${params.subjectRoute}/${params.chapterSlug}` },
  };
}

/**
 * The page's exam twins ("Asked in NDA", migration 0220). Loaded here, not in
 * load(), which generateMetadata also runs. A failed read drops the line, never
 * the page: the book is the page, the line is a note on it.
 */
async function loadTwins(questionIds: string[]): Promise<QuestionTwins> {
  try {
    return await getTwinsForQuestions(createTypedAnonClient(), questionIds);
  } catch (e) {
    console.error("board chapter exam twins:", e instanceof Error ? e.message : e);
    return { links: {}, targets: {} };
  }
}

export default async function BoardChapterPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const data = await load(params);
  if (!data) notFound();
  const { chapter } = data;
  const pyqCount = data.pyqSittings.reduce((n, s) => n + s.questions.length, 0);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // Every question on the page: the book's, then the board papers'. The Top 10
  // tab shows a subset of the board papers' questions.
  const questionIds = [
    ...chapter.groups.flatMap((g) => g.blocks.flatMap((b) => b.questions.map((q) => q.id))),
    ...data.pyqSittings.flatMap((s) => s.questions.map((q) => q.id)),
  ];
  const twins = await loadTwins(questionIds);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[
            { href: "/board", label: "Board" },
            { href: `/board/${params.examSlug}`, label: data.displayName },
            { label: chapter.chapterName },
          ]}
        />

        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-accent">
            {chapter.subjectName} · Textbook solutions
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">{chapter.chapterName}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {pyqCount > 0
              ? "Every textbook question in book order, plus the board's past questions."
              : "Every textbook question, in the order the book teaches them."}
            <span className="text-muted-foreground/70"> · {chapter.total} questions</span>
          </p>
        </header>

        <ExamTwinsProvider twins={twins} supabaseUrl={supabaseUrl}>
          <ExamTwinChapterLine questionIds={questionIds} />

          {/* Signed in with mistakes waiting from this chapter (2026-11-07). Browser-only. */}
          <ChapterFixLine chapterId={data.chapterId} from={CHAPTER_FIX_FROM.board} className="mb-4" />
          {/* The board path's line (MENTOR_SPEC.md D8): Class 12 PCM chapters only; drawn in the browser. */}
          {isPathExam(params.examSlug) && (Object.values(SUBJECT_NAME) as string[]).includes(chapter.subjectName) && (
            <BoardPathLine chapterId={data.chapterId} exam={params.examSlug} className="mb-4" />
          )}

          <BoardReader
            groups={chapter.groups}
            pyqSittings={data.pyqSittings}
            paperCounts={data.paperCounts}
            top={data.top}
            revision={data.revision ? { node: <BoardRevisionSheet sheet={data.revision} /> } : null}
            supabaseUrl={supabaseUrl}
            chapterName={chapter.chapterName}
            examName={data.examName}
          />
        </ExamTwinsProvider>
      </main>
      <Footer />
    </>
  );
}
