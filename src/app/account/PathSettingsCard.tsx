"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUBJECT_LABEL, type PathExam, type PathSubject } from "@/lib/path/model";
import { PACE_MAX, PACE_MIN } from "@/lib/path/pace";
import { EXAM_LABEL, dayLabel, type PathView } from "@/lib/path/view";
import { invalidatePulse } from "@/lib/viewer/usePulse";

/**
 * Stop the board path, or find the way back to it (MENTOR_SPEC.md D7).
 * Stopping returns /me to normal; starting again is the /me start card, and
 * every chapter already done stays done, because done comes from work.
 */
export default function PathSettingsCard({
  active,
  stopped,
}: {
  active: { exam: PathExam; subjects: PathSubject[]; dailyMinutes: number } | null;
  /** A path was stopped and none is active. */
  stopped: boolean;
}) {
  const [current, setCurrent] = useState(active);
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);

  async function stop() {
    setSaving(true);
    try {
      const res = await fetch("/api/path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stop" }),
      });
      if (!res.ok) throw new Error("Couldn't stop your plan. Try again.");
      setCurrent(null);
      setConfirming(false);
      toast.success("Your plan is stopped. Chapters you finished stay done.");
      // V's button and the /board line read the path from the shared pulse.
      invalidatePulse();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't stop your plan. Try again.");
    } finally {
      setSaving(false);
    }
  }

  /** Lighter / More (Phase 3): the toast says the new pace and the finish date it gives. */
  async function pace(direction: "lighter" | "more") {
    setSaving(true);
    try {
      const res = await fetch("/api/path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pace", direction }),
      });
      const data = (await res.json().catch(() => ({}))) as { today?: PathView | null; error?: string };
      if (!res.ok || !data.today) throw new Error(data.error ?? "Couldn't change your pace. Try again.");
      const today = data.today;
      setCurrent((c) => (c ? { ...c, dailyMinutes: today.dailyMinutes } : c));
      toast.success(`Now about ${today.dailyMinutes} min a day: you finish on ${dayLabel(today.pace.finish)}.`);
      invalidatePulse();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't change your pace. Try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!current && !stopped && active === null) return null;

  return (
    <section aria-labelledby="path-settings-heading" className="mb-6 rounded-xl border bg-card p-6">
      <h2 id="path-settings-heading" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <Route className="h-4 w-4 text-brand-accent" aria-hidden />
        Your board plan
      </h2>
      {current ? (
        <>
          <p className="mt-2 text-sm">
            {EXAM_LABEL[current.exam]} · {subjectList(current.subjects)} · about {current.dailyMinutes} minutes a day.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={saving || current.dailyMinutes <= PACE_MIN}
              onClick={() => void pace("lighter")}
              aria-label="Lighter: 10 minutes less a day"
            >
              Lighter
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={saving || current.dailyMinutes >= PACE_MAX}
              onClick={() => void pace("more")}
              aria-label="More: 10 minutes more a day"
            >
              More
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Chapters you finish stay done, even if you stop and start again.
          </p>
          {confirming ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm">Stop your plan?</span>
              <Button variant="destructive" size="sm" disabled={saving} onClick={() => void stop()}>
                Yes, stop it
              </Button>
              <Button variant="outline" size="sm" disabled={saving} onClick={() => setConfirming(false)}>
                Keep it
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" className="mt-4" onClick={() => setConfirming(true)}>
              Stop the plan
            </Button>
          )}
        </>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          Your plan is stopped. Chapters you finished stay done.{" "}
          <Link
            href="/me"
            className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start it again
          </Link>{" "}
          from your dashboard.
        </p>
      )}
    </section>
  );
}

function subjectList(subjects: readonly PathSubject[]): string {
  const names = subjects.map((s) => SUBJECT_LABEL[s]);
  return names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
