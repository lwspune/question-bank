import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import Footer from "@/components/Footer";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { BOARD_EXAMS, getExamBySlug } from "@/lib/exam/examContext";
import { listBoardChapters } from "@/lib/board/query";
import type { BoardHubChapterRef } from "@/lib/board/hub";
import BoardHubTabs, { type BoardHubSubject } from "@/app/board/_components/BoardHubTabs";
import BoardContinueCard from "@/app/board/_components/BoardContinueCard";

type Params = { examSlug: string };

/**
 * Cached like /notes and /questions: nothing here is per-viewer (no session, no
 * cookie), so every class hub is built ahead and refreshed daily. Before
 * 2026-10-04 these rendered on every request, 0.4-1.6 s to first byte.
 */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return BOARD_EXAMS.map((e) => ({ examSlug: e.slug }));
}

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
  const hubSubjects: BoardHubSubject[] = subjects.map((s) => ({
    subjectRoute: s.subjectRoute,
    subjectName: s.subjectName,
    chapters: s.chapters.map((c) => ({
      chapterSlug: c.chapterSlug,
      name: c.name,
      count: c.count,
      href: `/board/${params.examSlug}/${c.subjectRoute}/${c.chapterSlug}`,
    })),
  }));
  // chapter id -> where Continue sends a student, for this exam's chapters only.
  const chapterRefs: Record<string, BoardHubChapterRef> = Object.fromEntries(
    subjects.flatMap((s) =>
      s.chapters.map((c) => [
        c.chapterId,
        { href: `/board/${params.examSlug}/${c.subjectRoute}/${c.chapterSlug}`, name: c.name, subjectName: s.subjectName },
      ])
    )
  );

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs className="mb-4" items={[{ href: "/board", label: "Board" }, { label: exam.displayName }]} />

        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{exam.displayName}: Textbook</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Read each chapter the way the book teaches it: solved examples, then exercises, then the miscellaneous
            set. Every question has a model answer.
          </p>
        </header>

        {subjects.length === 0 ? (
          <p className="rounded-lg border border-dashed bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
            Chapters are being prepared. Check back soon.
          </p>
        ) : (
          <>
            <BoardContinueCard chapters={chapterRefs} />
            {/* Chapters within a subject are in BOOK order (scripts/board/order.ts;
                re-run `npm run board:order` after an ingest). */}
            <BoardHubTabs examSlug={params.examSlug} subjects={hubSubjects} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
