import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getQuizPoolStats, getPoolChapters, listAssembledQuizzes } from "@/lib/quiz/admin";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import AssembleControl, { type ChapterOption } from "./AssembleControl";
import QuizBrowser from "./QuizBrowser";

export const dynamic = "force-dynamic";

function chapterLabel(route: string, chapter: string): string {
  const reg = NOTES_CHAPTERS.find((c) => c.subjectRoute === route && c.chapterSlug === chapter);
  if (reg) return `${reg.subjectDisplay} — ${reg.chapter.chapterName}`;
  return `${route} / ${chapter}`;
}

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
            Quizzes assembled from the /notes question pool. Push to nda-tracker for student
            delivery, or <strong>Publish to public</strong> for a shareable lead-magnet link
            (<code className="rounded bg-muted px-1 py-0.5 text-xs">/quiz/&lt;slug&gt;</code>) —
            leads land in <a href="/dashboard/leads" className="underline">Leads</a>.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard kind="numeric" value={quizzes.length} label="Quizzes built" />
          <StatCard kind="numeric" value={stats.ready} label="Questions ready" />
          <StatCard kind="numeric" value={stats.needsReview} label="Need review" />
          <StatCard kind="numeric" value={stats.total} label="Total in pool" />
        </div>

        <AssembleControl chapters={chapterOptions} />

        <QuizBrowser quizzes={quizzes} />
      </main>
    </>
  );
}
