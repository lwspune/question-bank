"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Target, Timer } from "lucide-react";
import {
  WEEKLY_GOAL_CHOICES,
  weeklyGoalSentence,
  weeklyProgress,
} from "@/lib/goals/weekly";
import { invalidatePulse, usePulse } from "@/lib/viewer/usePulse";
import { examCountdownSentence } from "@/lib/exam/calendar";

/**
 * ONE strip for the two engagement numbers on /me: this week's sittings
 * against the student's goal, and how many mistakes are waiting in the drill.
 *
 * WHY ONE STRIP AND NOT TWO CARDS. The audience is on phones and /me already
 * stacks five cards; a goal card plus a drill card would push the mocks list
 * below the fold. So the ring, the sentence, the goal picker and the one
 * action share a row that collapses to a column below sm.
 *
 * The week numbers arrive from the server (a cheap count) so there is no
 * flash; the due count comes from the shared pulse, the same read the header
 * badge uses, and both update the moment a goal is changed or a drill answer
 * lands (invalidatePulse).
 */
export default function WeekStrip({
  initialDone,
  initialGoal,
}: {
  initialDone: number;
  initialGoal: number | null;
}) {
  const pulse = usePulse(true);
  const [goal, setGoal] = useState<number | null>(initialGoal);
  const [saving, setSaving] = useState(false);

  const done = pulse?.week.done ?? initialDone;
  const p = weeklyProgress(done, goal);
  const due = pulse?.due ?? null;

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
      invalidatePulse();
      toast.success(`Goal set: ${next} sittings a week`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your goal.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      aria-labelledby="week-heading"
      className="flex flex-col gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:items-center"
    >
      <Ring pct={p.pct} met={p.met} done={p.done} goal={p.goal} />

      <div className="min-w-0 flex-1">
        <h2 id="week-heading" className="text-sm font-semibold tracking-tight">
          This week
        </h2>
        <p className="mt-0.5 text-sm">{weeklyGoalSentence(p)}</p>
        {pulse?.exam && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {examCountdownSentence({ ...pulse.exam, source: "calendar", exam: null, date: "" })}
            {!pulse.exam.official && (
              <>
                {" \u00b7 "}
                <Link href="/account" className="text-brand-accent underline-offset-4 hover:underline">
                  set your date
                </Link>
              </>
            )}
          </p>
        )}
        <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{p.chosen ? "Your goal" : "Suggested goal"}</span>
          <select
            aria-label="Sittings per week"
            value={p.goal}
            disabled={saving}
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
      </div>

      {/* The one action. A due count is a reason to open the drill; none means
          the next sitting is a mock. The button never says "0 to fix". */}
      {due !== null && due > 0 ? (
        <Link
          href="/drill"
          prefetch={false}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Target className="h-4 w-4" aria-hidden />
          Fix {due} {due === 1 ? "mistake" : "mistakes"}
        </Link>
      ) : (
        <Link
          href="/mock"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Timer className="h-4 w-4" aria-hidden />
          Take a mock
        </Link>
      )}
    </section>
  );
}

/** A progress ring. Decorative — the numbers it draws are in the text beside
 *  it — so it is aria-hidden and the count sits in its centre for sighted
 *  readers only. */
function Ring({ pct, met, done, goal }: { pct: number; met: boolean; done: number; goal: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <div className="relative h-16 w-16 shrink-0" aria-hidden>
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={r} className="fill-none stroke-muted" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={r}
          className={met ? "fill-none stroke-emerald-500" : "fill-none stroke-brand-accent"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums">
        {done}/{goal}
      </span>
    </div>
  );
}
