import { redirect } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { getSessionMember } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import KatexRenderer from "@/components/math/KatexRenderer";
import { getQuizPoolStats, getPoolChapters, listAssembledQuizzes, type AssembledQuiz } from "@/lib/quiz/admin";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import AssembleControl, { type ChapterOption } from "./AssembleControl";

export const dynamic = "force-dynamic";

function chapterLabel(route: string, chapter: string): string {
  const reg = NOTES_CHAPTERS.find((c) => c.subjectRoute === route && c.chapterSlug === chapter);
  if (reg) return `${reg.subjectDisplay} — ${reg.chapter.chapterName}`;
  return `${route} / ${chapter}`;
}

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  pushed: "bg-brand/10 text-brand-accent",
  published: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  archived: "bg-muted text-muted-foreground",
};
const LETTERS = ["A", "B", "C", "D"] as const;

export default async function QuizzesPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const [stats, quizzes, poolChapters] = await Promise.all([
    getQuizPoolStats(),
    listAssembledQuizzes(),
    getPoolChapters(),
  ]);
  const chapterOptions: ChapterOption[] = poolChapters.map((c) => ({
    value: `${c.subjectRoute}/${c.chapterSlug}`,
    label: chapterLabel(c.subjectRoute, c.chapterSlug),
  }));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Daily Quizzes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quizzes assembled from the /notes question pool, pushed to nda-tracker as drafts.
            Read-only view — build with <code className="rounded bg-muted px-1 py-0.5 text-xs">npm run quiz:assemble</code>,
            publish in nda-tracker.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard kind="numeric" value={quizzes.length} label="Quizzes built" />
          <StatCard kind="numeric" value={stats.ready} label="Questions ready" />
          <StatCard kind="numeric" value={stats.needsReview} label="Need review" />
          <StatCard kind="numeric" value={stats.total} label="Total in pool" />
        </div>

        <AssembleControl chapters={chapterOptions} />

        {quizzes.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No quizzes assembled yet. Run <code className="rounded bg-muted px-1 py-0.5 text-xs">npm run quiz:assemble nda-maths probability</code>.
          </p>
        ) : (
          <div className="space-y-3">
            {quizzes.map((quiz) => (
              <QuizRow key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

function QuizRow({ quiz }: { quiz: AssembledQuiz }) {
  return (
    <details className="group rounded-lg border bg-card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate font-medium">{quiz.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {quiz.exam} · {quiz.subject} · {quiz.questions.length} questions
            {quiz.pushedAt ? " · pushed" : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              STATUS_STYLES[quiz.status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {quiz.status}
          </span>
          <ChevronDown
            className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden
          />
        </div>
      </summary>

      <ol className="space-y-4 border-t px-4 py-4">
        {quiz.questions.map((q) => (
          <li key={q.position} className="space-y-2">
            <div className="flex gap-2 font-serif text-sm">
              <span className="shrink-0 font-mono text-xs text-muted-foreground">{q.position}.</span>
              <KatexRenderer text={q.stem} />
            </div>
            <ul className="ml-6 grid gap-1 sm:grid-cols-2">
              {q.options
                ? LETTERS.map((L) => {
                    const correct = q.answer === L;
                    return (
                      <li
                        key={L}
                        className={`flex items-start gap-1.5 rounded px-2 py-1 text-sm ${
                          correct ? "bg-emerald-500/10 font-medium" : ""
                        }`}
                      >
                        <span className="font-mono text-xs text-muted-foreground">({L.toLowerCase()})</span>
                        <KatexRenderer text={q.options![L]} />
                        {correct && <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />}
                      </li>
                    );
                  })
                : null}
            </ul>
            <p className="ml-6 text-xs text-muted-foreground">{q.conceptSlug}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}
