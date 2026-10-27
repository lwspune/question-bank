"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Target, TrendingUp } from "lucide-react";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import type { ProgressCardView } from "@/lib/chat/progressCardServer";

/**
 * V's "How's my progress" card (2026-10-27; lib/chat/progressCard.ts), shown
 * under V's line after the button is tapped. It reads its own numbers (GET
 * /api/chat/progress), so it never shows a copy older than the tap. Two next
 * steps only: the drill (when mistakes are waiting) and /performance.
 */
export default function VProgressCard({ onNavigate }: { onNavigate?: () => void }) {
  const [exam, setExam] = useState<string | null>(null);
  const [card, setCard] = useState<ProgressCardView | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "none" | "failed">("loading");

  useEffect(() => {
    let live = true;
    setState("loading");
    fetch(`/api/chat/progress${exam ? `?exam=${encodeURIComponent(exam)}` : ""}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { card: ProgressCardView | null }) => {
        if (!live) return;
        setCard(j.card);
        setState(j.card ? "ready" : "none");
      })
      .catch(() => live && setState("failed"));
    return () => {
      live = false;
    };
  }, [exam]);

  function go(action: "drill" | "performance") {
    trackFunnel("v_progress_tap", { action });
    onNavigate?.();
  }

  if (state === "failed") {
    return <p className="ml-9 mt-2 text-xs text-muted-foreground">Couldn&apos;t load your progress. Please try again.</p>;
  }
  if (state === "loading" && !card) return <div className="ml-9 mt-2 h-52 animate-pulse rounded-xl border bg-muted/40" aria-hidden />;
  if (state === "none" || !card) {
    return (
      <p className="ml-9 mt-2 text-sm text-muted-foreground">
        Answer a few questions and your progress shows up here.
      </p>
    );
  }

  return (
    <section
      className="ml-9 mt-2 rounded-xl border bg-card p-3 text-sm shadow-sm"
      aria-label={`Your progress in ${card.exam.label}`}
      aria-busy={state === "loading"}
    >
      <div className="mb-2 flex items-start gap-2">
        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0">
          <p className="font-semibold">Your progress</p>
          <p className="text-xs text-muted-foreground">
            {card.exam.label}
            {card.daysLeft !== null && ` · ${card.daysLeft === 0 ? "exam today" : `${card.daysLeft} day${card.daysLeft === 1 ? "" : "s"} to go`}`}
          </p>
        </div>
      </div>

      {card.exams.length > 1 && (
        <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label="Exam">
          {card.exams.map((e) => {
            const on = e.slug === card.exam.slug;
            return (
              <button
                key={e.slug}
                type="button"
                aria-pressed={on}
                disabled={state === "loading"}
                onClick={() => {
                  if (on) return;
                  trackFunnel("v_progress_tap", { action: "exam" });
                  setExam(e.slug);
                }}
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 ${
                  on ? "border-brand-accent bg-brand-accent/10 text-foreground" : "border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                {e.label}
              </button>
            );
          })}
        </div>
      )}

      {card.rows.length === 0 ? (
        <p className="py-1 text-muted-foreground">
          Nothing in {card.exam.label} yet. Answer a few questions and your progress shows up here.
        </p>
      ) : (
        <dl className="space-y-2">
          {card.rows.map((r) => (
            <div key={r.label} className="rounded-lg bg-muted/40 px-2.5 py-1.5">
              <dt className="text-xs font-semibold text-muted-foreground">{r.label}</dt>
              <dd className="font-medium">{r.value}</dd>
              {r.bar !== undefined && (
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-border" aria-hidden>
                  <div className="h-full rounded-full bg-brand" style={{ width: `${Math.min(100, Math.max(0, r.bar))}%` }} />
                </div>
              )}
              {r.detail && <dd className="mt-0.5 text-xs text-muted-foreground">{r.detail}</dd>}
            </div>
          ))}
        </dl>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {card.due > 0 && (
          <Link
            href="/drill"
            onClick={() => go("drill")}
            className="inline-flex items-center gap-1 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Target className="h-3.5 w-3.5" aria-hidden />
            Fix my mistakes ({card.due})
          </Link>
        )}
        <Link
          href="/performance"
          onClick={() => go("performance")}
          className="inline-flex items-center gap-1 rounded-full border border-brand-accent/25 bg-brand-accent/[0.06] px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-accent/45 hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View full performance
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
