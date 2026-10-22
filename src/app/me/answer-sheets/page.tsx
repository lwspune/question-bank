import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, PenLine } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listOwnSubmissions } from "@/lib/answerSheets/query";
import { buildSheetRows } from "@/lib/answerSheets/sheetRows";
import SheetList from "@/components/answerSheets/SheetList";

/**
 * `/me/answer-sheets`: the student's checked answer sheets (migration 0153).
 * Per-student, never cached, never indexed.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "My answer sheets",
  robots: { index: false },
};

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
          <SheetList rows={buildSheetRows(sheets, { kind: "self" })} className="mt-6 space-y-3" />
        )}
      </main>
    </>
  );
}
