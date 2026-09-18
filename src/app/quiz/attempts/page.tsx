import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserQuizAttempts, MAX_QUIZ_ATTEMPTS } from "@/lib/quiz/attempts";

export const metadata: Metadata = { title: "My quiz attempts", robots: { index: false } };

/**
 * A student's own quiz history — the surface that did not exist because the
 * data did not exist. Mirrors /mock/attempts, including sitting as a static
 * segment beside /quiz/[slug] (Next resolves the static one first; the same
 * arrangement /mock has shipped with).
 *
 * Shows scores, NOT answers — see lib/quiz/attempts.ts for why, and the empty
 * state says so rather than leaving the omission looking like a bug.
 */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function MyQuizAttemptsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/quiz/attempts");

  const db = createSupabaseServerClient();
  const { attempts, truncated } = await getUserQuizAttempts(db, user.id);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link href="/notes" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to notes
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">My quiz attempts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every quiz you&apos;ve taken while signed in, newest first.
        </p>

        {attempts.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No quiz attempts recorded yet. Quizzes you took before 18 Sep 2026, or while signed
              out, aren&apos;t listed here.
            </p>
            <Button asChild variant="brand" className="mt-3">
              <Link href="/notes">Find a quiz</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="mt-6 space-y-3">
              {attempts.map((a, i) => (
                <li
                  key={`${a.slug ?? "quiz"}-${a.takenAt}-${i}`}
                  className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{a.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatDate(a.takenAt)}
                      {a.correct !== null && a.incorrect !== null && a.notAttempted !== null && (
                        <>
                          {" · "}
                          {a.correct} correct · {a.incorrect} wrong · {a.notAttempted} skipped
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {a.score !== null && a.total !== null && (
                      <span className="text-sm font-semibold tabular-nums">
                        {a.score}
                        <span className="text-muted-foreground">/{a.total}</span>
                      </span>
                    )}
                    {a.slug && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/quiz/${a.slug}`}>Retake</Link>
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {truncated && (
              <p className="mt-4 text-xs text-muted-foreground">
                Showing your {MAX_QUIZ_ATTEMPTS} most recent attempts.
              </p>
            )}

            <p className="mt-4 text-xs text-muted-foreground">
              Scores only — your individual answers aren&apos;t stored after a quiz is graded.
            </p>
          </>
        )}
      </main>
    </>
  );
}
