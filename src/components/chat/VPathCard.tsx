"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, ChevronRight, Circle } from "lucide-react";
import type { PathView } from "@/lib/path/view";

const linkCls = "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * Today's board-plan card inside V (MENTOR_SPEC.md Phase 2). Since 2026-11-22
 * V is the plan's only home, so the card opens from the pinned "Today's plan"
 * row at the top of V's chat (VPlanPin), links nowhere else for the plan, and
 * carries the one control that left /account with it: Stop my plan.
 *
 * `inPin` drops the card's own title and frame: the row above already names it.
 */
export function VPathCardBody({
  view,
  onNavigate,
  onStop,
  inPin = false,
}: {
  view: PathView;
  onNavigate?: () => void;
  /** Ends the plan (POST /api/path stop); absent = no Stop control. */
  onStop?: () => Promise<void>;
  inPin?: boolean;
}) {
  return (
    <section
      className={inPin ? "text-sm" : "ml-9 mt-2 rounded-xl border bg-card p-3 text-sm shadow-sm"}
      aria-label={inPin ? undefined : "Today's plan"}
    >
      <div className="mb-2 flex items-start gap-2">
        {!inPin && <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />}
        <div className="min-w-0">
          {!inPin && <p className="font-semibold">Today&apos;s plan</p>}
          <p className="text-xs text-muted-foreground">{view.statusLine}</p>
        </div>
        {view.tasks.length > 0 && (
          <p className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">about {view.todayMinutes} min</p>
        )}
      </div>

      {view.biologyNote && <p className="mb-2 text-xs text-muted-foreground">Biology is not in the plan yet.</p>}

      {view.pickUp && (
        <p className="mb-2 text-sm">
          <span className="font-semibold">Welcome back.</span> Pick up here: {view.pickUp}
        </p>
      )}

      {view.tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">Every chapter in your plan is done.</p>
      ) : (
        <ol className="space-y-1.5">
          {view.tasks.map((t) => (
            <li key={t.key}>
              <Link href={t.href} prefetch={false} onClick={onNavigate} className={`flex items-start gap-2 ${linkCls}`}>
                {t.done ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent/60" aria-hidden />
                )}
                <span className="min-w-0 flex-1">
                  <span className={t.done ? "block text-muted-foreground" : "block font-medium"}>
                    {t.done && <span className="sr-only">Done: </span>}
                    {t.title}
                    {t.progress && !t.done && <span className="ml-1.5 font-normal tabular-nums text-muted-foreground">{t.progress}</span>}
                  </span>
                  <span className="block text-xs text-muted-foreground">{t.detail}</span>
                </span>
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
      )}

      {view.review && (
        <div className="mt-2 border-t pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your week</p>
          <ul className="mt-0.5 space-y-0.5 text-xs">
            {view.review.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      )}

      {onStop && <StopPlan onStop={onStop} />}
    </section>
  );
}

/** Two taps, never a browser dialog: "Stop my plan", then "Yes, stop it". */
function StopPlan({ onStop }: { onStop: () => Promise<void> }) {
  const [asking, setAsking] = useState(false);
  const [busy, setBusy] = useState(false);
  const btn =
    "rounded-md text-xs font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";
  if (!asking) {
    return (
      <div className="mt-2 border-t pt-2">
        <button type="button" onClick={() => setAsking(true)} className={`${btn} text-muted-foreground`}>
          Stop my plan
        </button>
      </div>
    );
  }
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-2 text-xs">
      <span>Stop your plan? It can&apos;t be started again.</span>
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await onStop();
          } finally {
            setBusy(false);
            setAsking(false);
          }
        }}
        className={`${btn} text-destructive`}
      >
        Yes, stop it
      </button>
      <button type="button" disabled={busy} onClick={() => setAsking(false)} className={`${btn} text-muted-foreground`}>
        Keep it
      </button>
    </div>
  );
}
