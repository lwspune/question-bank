import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserAttempts } from "@/lib/mocks/query";
import AttemptsList from "../_components/AttemptsList";

export const metadata: Metadata = { title: "My mock attempts", robots: { index: false } };

export default async function MyAttemptsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/mock/attempts");

  const db = createSupabaseServerClient();
  const attempts = await getUserAttempts(db, user.id);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link href="/mock" className="text-sm text-muted-foreground hover:text-foreground">
          ← All mock tests
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">My attempts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every mock you&apos;ve taken, newest first. Tap one to review your answers.
        </p>

        {attempts.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">You haven&apos;t taken a mock yet.</p>
            <Button asChild variant="brand" className="mt-3">
              <Link href="/mock">Browse mock tests</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6">
            <AttemptsList attempts={attempts} />
          </div>
        )}
      </main>
    </>
  );
}
