import Link from "next/link";
import { Clock, RotateCcw, Target, Timer, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResultHeadline } from "@/lib/mocks/resultHeadline";

type Section = { key: string; label: string; score: number; maxScore: number };

type Props = {
  headline: ResultHeadline;
  score: number;
  maxScore: number;
  correct: number;
  wrong: number;
  skipped: number;
  sections: Section[];
  /** Change since the last full paper in this subject (lib/mocks/attemptHistory); null = no comparable paper. */
  delta: number | null;
  /** "1 h 52 m of 2 h 30 m"; null when unknown. */
  elapsed: string | null;
  fixHref: string;
  mockSlug: string;
};

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, "");
}

/**
 * The result's first card (2026-10-11): marks and accuracy side by side as
 * equals (the owner's call: marks are what students know, accuracy is what the
 * 2026-09 reframe found kinder), one bar for right, wrong and left, the change
 * since the last try and the time taken, then the one primary action.
 */
export default function ScoreCard(p: Props) {
  const { headline } = p;
  const total = p.correct + p.wrong + p.skipped || 1;
  const pct = headline.accuracyPct;
  const R = 20;
  const C = 2 * Math.PI * R;

  return (
    <div className="mt-5 rounded-xl border bg-card p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3 sm:p-4" data-clarity-mask="true">
          <div className="text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
            {fmt(p.score)}
            <span className="ml-1 text-sm font-medium text-muted-foreground">/ {fmt(p.maxScore)}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">marks</div>
        </div>
        <div className="rounded-lg border p-3 sm:p-4">
          {pct !== null ? (
            <>
              <div className="flex items-center gap-2">
                <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden className="shrink-0">
                  <circle cx="24" cy="24" r={R} fill="none" strokeWidth="6" className="stroke-muted" />
                  <circle
                    cx="24"
                    cy="24"
                    r={R}
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${(pct / 100) * C} ${C}`}
                    transform="rotate(-90 24 24)"
                    className="stroke-emerald-600 dark:stroke-emerald-400"
                  />
                </svg>
                <span className="text-2xl font-bold tabular-nums sm:text-3xl">{pct}%</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">right on what you attempted</div>
            </>
          ) : (
            <p className="text-sm">{headline.lead}</p>
          )}
        </div>
      </div>

      <div
        className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`${p.correct} right, ${p.wrong} wrong, ${p.skipped} left`}
      >
        <span className="bg-emerald-500" style={{ width: `${(p.correct / total) * 100}%` }} />
        <span className="bg-red-500" style={{ width: `${(p.wrong / total) * 100}%` }} />
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground" aria-hidden>
        <span><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500" /><b className="font-semibold text-foreground tabular-nums">{p.correct}</b> right</span>
        <span><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-500" /><b className="font-semibold text-foreground tabular-nums">{p.wrong}</b> wrong</span>
        <span><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-muted-foreground/40" /><b className="font-semibold text-foreground tabular-nums">{p.skipped}</b> left</span>
      </div>
      {headline.detail && <p className="mt-2 text-sm text-muted-foreground">{headline.detail}</p>}

      {(p.delta !== null || p.elapsed) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {p.delta !== null && <DeltaChip delta={p.delta} />}
          {p.elapsed && (
            <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {p.elapsed}
            </span>
          )}
        </div>
      )}

      {p.sections.length > 1 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {p.sections.map((s) => (
            <div key={s.key} className="text-sm">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-medium">{s.label}</span>
                <span className="tabular-nums text-muted-foreground">
                  {fmt(s.score)} / {fmt(s.maxScore)}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full bg-brand"
                  style={{ width: `${Math.max(0, Math.min(100, (s.score / (s.maxScore || 1)) * 100))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* The primary action follows the data: something to fix, so the drill on
          THIS paper's mistakes; nothing wrong, so another mock; nothing
          attempted, so try again. Retake is never the lead when there is
          something to fix: 45% of students who sat one mock never sat a second,
          and the old lead was the same 150 minutes again. */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {headline.primaryAction === "fix" && (
          <Button asChild variant="brand" size="lg" className="h-12 rounded-xl text-base">
            <Link href={p.fixHref} prefetch={false}>
              <Target className="h-5 w-5" aria-hidden />
              Fix these mistakes
            </Link>
          </Button>
        )}
        {headline.primaryAction === "fix" && (
          // What the button DOES, in one line, because a student who has never
          // seen a drill reads "Fix these mistakes" as "retake" (2026-09-24).
          <p className="order-last basis-full text-xs text-muted-foreground sm:mt-1">
            Five of the questions you missed, with solutions, about five minutes. One you get right
            goes quiet; one you miss comes back round.
          </p>
        )}
        {headline.primaryAction === "another" && (
          <Button asChild variant="brand" size="lg" className="h-12 rounded-xl text-base">
            <Link href="/mock">
              <Timer className="h-5 w-5" aria-hidden />
              Take another mock
            </Link>
          </Button>
        )}
        {headline.primaryAction === "retake" ? (
          <Button asChild variant="brand" size="lg" className="h-12 rounded-xl text-base">
            <Link href={`/mock/${p.mockSlug}`}>
              <RotateCcw className="h-5 w-5" aria-hidden />
              Try again
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" size="lg" className="h-12 rounded-xl text-base">
            <Link href={`/mock/${p.mockSlug}`}>
              <RotateCcw className="h-4 w-4" aria-hidden />
              Retake
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

/** Growth-framed: a rise is celebrated, a fall is stated plainly, never in red. */
function DeltaChip({ delta }: { delta: number }) {
  if (delta > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
        <TrendingUp className="h-3.5 w-3.5" aria-hidden />+{fmt(delta)} marks since your last try
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium text-muted-foreground">
      {delta < 0 && <TrendingDown className="h-3.5 w-3.5" aria-hidden />}
      {delta < 0 ? `${fmt(-delta)} marks below your last try` : "Same marks as your last try"}
    </span>
  );
}
