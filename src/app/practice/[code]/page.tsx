import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, FileText, Users } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isPracticeCode } from "@/lib/practiceTests/friend";
import JoinPractice from "./JoinPractice";

/**
 * /practice/<code>: a practice test a friend sent (migration 0163).
 *
 * The code is the sent test's slug. The page shows only what the message
 * already said (title, size, time) and never who sent it or how they did. A
 * signed-in visitor taps Start and gets their own copy; a signed-out one signs
 * up first and comes back here. Per person and per test, so never indexed.
 *
 * SERVICE-ROLE read: the test is visible to its owner alone (0156), and this
 * page is for everyone else. It reads three display columns of one personal
 * test by an unguessable slug, nothing more.
 */

type Params = { code: string };

export const metadata: Metadata = {
  title: "A practice test from a friend",
  robots: { index: false, follow: false },
};

async function readSentTest(code: string) {
  const { data, error } = await createSupabaseAdminClient()
    .from("mock_tests")
    .select("title, total_questions, duration_secs")
    .eq("slug", code)
    .eq("status", "personal")
    .maybeSingle<{ title: string; total_questions: number; duration_secs: number }>();
  if (error) throw new Error(`practice friend page: ${error.message}`);
  return data;
}

export default async function SentPracticeTestPage({ params }: { params: Params }) {
  if (!isPracticeCode(params.code)) notFound();
  const [test, user] = await Promise.all([readSentTest(params.code), getSessionUser().catch(() => null)]);
  if (!test) notFound();

  const here = `/practice/${params.code}`;
  const minutes = Math.round(test.duration_secs / 60);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-start gap-3">
            <span className="icon-tile shrink-0">
              <Users className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">A friend sent you a practice test</p>
              <h1 className="mt-1 text-lg font-semibold">{test.title}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  {test.total_questions} questions
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {minutes} min
                </span>
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm">
            You get the same questions, marked as soon as you finish. It&apos;s free, and it doesn&apos;t use your
            daily free practice test.
          </p>

          <div className="mt-5">
            {user ? (
              <JoinPractice code={params.code} />
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="brand" className="w-full sm:w-auto">
                  <Link href={`/signup?next=${encodeURIComponent(here)}`}>Sign up free to start</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={`/login?next=${encodeURIComponent(here)}`}>I have an account</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
