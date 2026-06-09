import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getQuizPoolStats, listAssembledQuizzes } from "@/lib/quiz/admin";
import QuizBrowser from "./QuizBrowser";

export const dynamic = "force-dynamic";

export default async function QuizzesPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const [stats, quizzes] = await Promise.all([getQuizPoolStats(), listAssembledQuizzes()]);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 overflow-x-hidden px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Daily Quizzes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Read-only view of the pool + assembled quizzes. Assemble via the CLI
            (<code className="rounded bg-muted px-1 py-0.5 text-xs">npm run quiz:assemble &lt;route&gt; &lt;chapter&gt; -- --theme=X</code>);
            here you can <strong>Publish to public</strong> for a shareable lead-magnet link
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

        <QuizBrowser quizzes={quizzes} />
      </main>
    </>
  );
}
