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

/**
 * The type badge on a history row.
 *
 * This list is the ONE surface where all three types genuinely mix — the
 * catalogue separates them by route — so without it a student's history reads
 * "NDA Mathematics — Mock 5, 190/300" with nothing saying whether that was a
 * real UPSC paper or a practice one. Those two scores do not mean the same
 * thing and should not look identical.
 */
function typeLabel(a: UserAttempt): string | null {
  if (a.scope === "sectional") return "Sectional";
  return a.source === "practice" ? "Practice" : null; // past paper = the default, unlabelled
}

/** A signed-in student's attempts. `showMock` includes the paper title (history
 *  view); omit it on a single mock's page. Submitted/timed-out rows link to the
 *  result; an in-progress row links back into the runner to resume.
 *
 *  `reviewBase` repoints the finished rows at a different review surface. The
 *  default is the student's own result page, which is own-row by construction —
 *  so on an ADMIN page every row would 404 and bounce to /mock. The dashboard
 *  passes its superadmin route instead. In-progress rows never repoint: only
 *  the owner can resume a running attempt, and a superadmin must not. */
export default function AttemptsList({
  attempts,
  showMock = true,
  reviewBase,
}: {
  attempts: UserAttempt[];
  showMock?: boolean;
  reviewBase?: string;
}) {
  return (
    <ul className="divide-y rounded-lg border bg-card">
      {attempts.map((a) => {
        const live = a.status === "in_progress";
        const href = live
          ? `/mock/${a.mockSlug}/attempt/${a.attemptId}`
          : reviewBase
            ? `${reviewBase}/${a.attemptId}`
            : `/mock/attempt/${a.attemptId}/result`;
        const s = STATUS[a.status];
        return (
          <li key={a.attemptId}>
            <Link
              href={href}
              className="group flex items-center gap-4 p-3 transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none sm:p-4"
            >
              <div className="min-w-0 flex-1">
                {showMock && (
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <span className="truncate">{a.mockTitle}</span>
                    {typeLabel(a) && (
                      <span className="shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {typeLabel(a)}
                      </span>
                    )}
                  </p>
                )}
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
