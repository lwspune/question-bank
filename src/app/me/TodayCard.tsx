"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  WEEKLY_GOAL_CHOICES,
  weeklyGoalSentence,
  weeklyProgress,
} from "@/lib/goals/weekly";
import { invalidatePulse, usePulse } from "@/lib/viewer/usePulse";
import { examCountdownSentence } from "@/lib/exam/calendar";
import { totalsLine } from "@/lib/pulse/cache";
import { pickTodayAction } from "@/lib/me/today";

/**
 * The one brand card on /me (2026-10-05). It replaced three cards that each
 * carried a full-width blue button (continue, the week strip's "Fix N", and
 * the welcome card): ONE lead action (lib/me/today.ts pickTodayAction), then
 * the week on quiet lines, the goal behind a "change" link.
 *
 * The due count arrives from the shared pulse (the header badge's read), so
 * the lead can move from "Continue" to "Fix N mistakes" once it lands; the
 * button keeps its place, only its words change. The week numbers come from
 * the server so the ring never flashes.
 */
export default function TodayCard({
  resume,
  cont,
  mockHref,
  initialDone,
  initialGoal,
}: {
  resume?: { title: string; href: string };
  cont?: { title: string; chapter: string; href: string };
  mockHref: string;
  initialDone: number;
  initialGoal: number | null;
}) {
  const pulse = usePulse(true);
  const [goal, setGoal] = useState<number | null>(initialGoal);
  const [saving, setSaving] = useState(false);
  const [editingGoal, setEditingGoal] = useState(false);

  const done = pulse?.week.done ?? initialDone;
  const p = weeklyProgress(done, goal);
  const totals = pulse?.totals ? totalsLine(pulse.totals) : null;
  const action = pickTodayAction({ resume, due: pulse?.due ?? null, cont, mockHref });

  async function changeGoal(value: string) {
    const next = Number(value);
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weeklyGoal: next }),
      });
      if (!res.ok) throw new Error("Could not save your goal.");
      setGoal(next);
      setEditingGoal(false);
      invalidatePulse();
      toast.success(`Goal set: ${next} sittings a week`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your goal.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section aria-labelledby="today-heading" className="hero-soft rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{action.eyebrow}</p>
          <h2 id="today-heading" className="mt-1 truncate text-xl font-semibold tracking-tight sm:text-2xl">
            {action.title}
          </h2>
          {action.subtitle && <p className="mt-0.5 truncate text-sm text-muted-foreground">{action.subtitle}</p>}
        </div>
        <Link
          href={action.href}
          prefetch={false}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {action.cta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      {/* A separate, plainly clickable link: grey text right under the button
          read as part of it, so "Start" seemed to start the reading. */}
      {action.secondary && (
        <p className="mt-3 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="shrink-0">Or keep reading:</span>
          <Link
            href={action.secondary.href}
            className="inline-flex min-w-0 items-center gap-1 font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="truncate">{action.secondary.label}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          </Link>
        </p>
      )}

      {/* The week, on quiet lines under a rule. */}
      <div className="mt-4 flex items-center gap-3 border-t border-brand/15 pt-4">
        <Ring pct={p.pct} met={p.met} done={p.done} goal={p.goal} />
        <div className="min-w-0 flex-1 text-sm">
          <p>{weeklyGoalSentence(p)}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {totals && <span className="tabular-nums">{totals}</span>}
            {totals && pulse?.exam && " · "}
            {pulse?.exam &&
              examCountdownSentence({ ...pulse.exam, source: "calendar", exam: null, date: "" })}
            {pulse?.exam && !pulse.exam.official && (
              <>
                {" · "}
                <Link href="/account" className="text-brand-accent underline-offset-4 hover:underline">
                  set your date
                </Link>
              </>
            )}
          </p>
          <div className="mt-1 text-xs text-muted-foreground">
            {editingGoal ? (
              <label className="inline-flex items-center gap-2">
                <span>Sittings a week</span>
                <select
                  aria-label="Sittings per week"
                  value={p.goal}
                  disabled={saving}
                  autoFocus
                  onChange={(e) => void changeGoal(e.target.value)}
                  className="h-8 rounded-md border bg-background px-2 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  {WEEKLY_GOAL_CHOICES.map((c) => (
                    <option key={c} value={c}>
                      {c} a week
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <>
                {p.chosen ? "Your goal" : "Suggested goal"}: {p.goal} a week ·{" "}
                <button
                  type="button"
                  onClick={() => setEditingGoal(true)}
                  className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  change
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** A progress ring. Decorative: the numbers it draws are in the text beside it. */
function Ring({ pct, met, done, goal }: { pct: number; met: boolean; done: number; goal: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <div className="relative h-12 w-12 shrink-0" aria-hidden>
      <svg viewBox="0 0 48 48" className="h-12 w-12 -rotate-90">
        <circle cx="24" cy="24" r={r} className="fill-none stroke-brand/15" strokeWidth="5" />
        <circle
          cx="24"
          cy="24"
          r={r}
          className={met ? "fill-none stroke-emerald-500" : "fill-none stroke-brand-accent"}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold tabular-nums">
        {done}/{goal}
      </span>
    </div>
  );
}
