import Link from "next/link";
import { ArrowRight, Clock, FileCheck2, XCircle } from "lucide-react";
import type { SheetRow } from "@/lib/answerSheets/sheetRows";

/**
 * One line per sent answer sheet: the paper, the day it was sent, its marks or
 * where it stands, and a link to its report. Shared by the student's
 * `/me/answer-sheets` and the "Answer sheets" card on both performance pages.
 */
function StatusLine({ row }: { row: SheetRow }) {
  if (row.marks) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        <FileCheck2 className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
        {row.marks}
      </span>
    );
  }
  if (row.status === "rejected") {
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

export default function SheetList({ rows, className }: { rows: SheetRow[]; className?: string }) {
  return (
    <ul className={className ?? "space-y-3"}>
      {rows.map((r) => (
        <li key={r.id}>
          <Link
            // Not prefetched: each report is a per-user server render.
            prefetch={false}
            href={r.href}
            className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{r.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Sent {r.sentOn}</p>
            </div>
            <StatusLine row={r} />
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
