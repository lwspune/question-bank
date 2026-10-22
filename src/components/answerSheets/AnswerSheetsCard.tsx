import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import type { SheetRow } from "@/lib/answerSheets/sheetRows";
import SheetList from "./SheetList";

/**
 * "Answer sheets" on the performance pages: the board papers this student
 * wrote on paper and sent for checking. Their marks are listed here, not mixed
 * into the performance numbers above, which are built from timed mocks.
 *
 * Renders nothing when no sheet was sent. It fetches nothing: each route reads
 * the sheets its own way and passes the rows in.
 */
export default function AnswerSheetsCard({ rows, more }: { rows: SheetRow[]; more: boolean }) {
  if (rows.length === 0) return null;
  return (
    <section aria-labelledby="answer-sheets-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="answer-sheets-heading" className="section-title flex items-center gap-2">
          <PenLine className="h-4 w-4 text-brand-accent" aria-hidden />
          Answer sheets
        </h2>
        {more && (
          <Link
            prefetch={false}
            href="/me/answer-sheets"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            All answer sheets <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Board papers written on paper and checked by hand.</p>
      <SheetList rows={rows} className="mt-3 space-y-3" />
    </section>
  );
}
