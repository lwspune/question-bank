import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserAttempt } from "@/lib/mocks/query";

const STATUS: Record<UserAttempt["status"], { label: string; style: string }> = {
  submitted: { label: "Submitted", style: "text-emerald-700 dark:text-emerald-400" },
  expired: { label: "Timed out", style: "text-amber-600 dark:text-amber-400" },
  in_progress: { label: "In progress", style: "text-brand-accent" },
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/** A signed-in student's attempts. `showMock` includes the paper title (history
 *  view); omit it on a single mock's page. Submitted/timed-out rows link to the
 *  result; an in-progress row links back into the runner to resume. */
export default function AttemptsList({
  attempts,
  showMock = true,
}: {
  attempts: UserAttempt[];
  showMock?: boolean;
}) {
  return (
    <ul className="divide-y rounded-lg border bg-card">
      {attempts.map((a) => {
        const live = a.status === "in_progress";
        const href = live
          ? `/mock/${a.mockSlug}/attempt/${a.attemptId}`
          : `/mock/attempt/${a.attemptId}/result`;
        const s = STATUS[a.status];
        return (
          <li key={a.attemptId}>
            <Link
              href={href}
              className="group flex items-center gap-4 p-3 transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none sm:p-4"
            >
              <div className="min-w-0 flex-1">
                {showMock && <p className="truncate text-sm font-medium">{a.mockTitle}</p>}
                <p className={cn("text-xs", showMock ? "text-muted-foreground" : "font-medium")}>
                  <span className={s.style}>{s.label}</span>
                  <span className="text-muted-foreground"> · {fmtDate(a.startedAt)}</span>
                </p>
              </div>
              {!live && a.score != null && (
                <div className="shrink-0 text-right">
                  <div className="text-sm font-bold tabular-nums">
                    {a.score}
                    <span className="text-xs font-normal text-muted-foreground">/{a.maxScore}</span>
                  </div>
                  {a.correct != null && (
                    <div className="text-[11px] text-muted-foreground tabular-nums">
                      {a.correct}✓ {a.wrong}✗ {a.skipped}−
                    </div>
                  )}
                </div>
              )}
              {live ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-brand-accent">
                  <Play className="h-3.5 w-3.5" aria-hidden /> Resume
                </span>
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60 group-hover:text-muted-foreground" aria-hidden />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
