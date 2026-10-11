import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Clock, FileCheck2, PenLine, XCircle } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listOwnSubmissions, type OwnSubmission } from "@/lib/answerSheets/query";

/**
 * `/me/answer-sheets`: the student's checked answer sheets (migration 0153).
 * Per-student, never cached, never indexed.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "My answer sheets",
  robots: { index: false },
};

function day(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}

function StatusLine({ s }: { s: OwnSubmission }) {
  if (s.status === "graded") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        <FileCheck2 className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
        {s.totalAwarded} / {s.totalMax}
      </span>
    );
  }
  if (s.status === "rejected") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <XCircle className="h-3.5 w-3.5" aria-hidden />
        Could not be checked
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="h-3.5 w-3.5" aria-hidden />
      Being checked
    </span>
  );
}

export default async function AnswerSheetsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/me/answer-sheets");
  const sheets = await listOwnSubmissions(createSupabaseServerClient());

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">My answer sheets</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Board papers you wrote and sent for checking. Each report is ready within 48 hours of sending.
        </p>

        {sheets.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <PenLine className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              Pick a past paper, write it on paper with the clock running, then upload your answers from the paper&apos;s
              page. Checking is free while we launch, one sheet a day.
            </p>
            <Link
              href="/question-papers"
              className="mt-3 inline-flex items-center gap-1 font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Board past papers <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {sheets.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/me/answer-sheets/${s.id}`}
                  className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{s.paper?.title ?? "Board paper"}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Sent {day(s.submittedAt)}</p>
                  </div>
                  <StatusLine s={s} />
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
