import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { listResultsForReview, type ReviewAnnouncement } from "@/lib/results/admin";
import ResultsReviewClient from "./ResultsReviewClient";

export const dynamic = "force-dynamic";

/**
 * /dashboard/results: what students answered after each result, and the names
 * waiting to go on /results (migration 0149). Superadmin only: it reads every
 * student's answer through the service role.
 */
export default async function ResultsReviewPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  let announcements: ReviewAnnouncement[] = [];
  let loadError: string | null = null;
  try {
    announcements = await listResultsForReview();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Could not load results.";
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Student results</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Students who chose an exam are asked on their home page whether they cleared it. A name goes on
            /results only when you publish it here. New announcements are added by script (OPERATIONS.md).
          </p>
        </header>
        {loadError ? (
          <p className="rounded-xl border border-destructive/40 bg-card p-4 text-sm text-destructive">{loadError}</p>
        ) : (
          <ResultsReviewClient announcements={announcements} />
        )}
      </main>
    </>
  );
}
