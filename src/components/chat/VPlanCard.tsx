"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Circle } from "lucide-react";

type PlanCard = {
  title: string;
  today: string;
  days: { label: string; title: string; path: string; done: boolean }[];
  done: number;
  total: number;
};

/**
 * The student's week plan inside V (2026-10-19, study-partner Phase 3). Shown
 * under the reply that made or read it, and only here: never a popup. Each day
 * links its task and ticks itself from what the student did (GET
 * /api/chat/plan reads the log), so there is nothing to tick by hand.
 */
export default function VPlanCard({ onNavigate }: { onNavigate?: () => void }) {
  const [plan, setPlan] = useState<PlanCard | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/chat/plan", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { plan: PlanCard | null }) => {
        if (!live) return;
        if (j.plan) setPlan(j.plan);
        else setFailed(true);
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, []);

  if (failed) return null;
  if (!plan) return <div className="ml-9 mt-2 h-40 animate-pulse rounded-xl border bg-muted/40" aria-hidden />;

  return (
    <section className="ml-9 mt-2 rounded-xl border bg-card p-3 text-sm shadow-sm" aria-label="Your week plan">
      <div className="mb-2 flex items-start gap-2">
        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0">
          <p className="font-semibold">Your week</p>
          <p className="text-xs text-muted-foreground">{plan.title}</p>
        </div>
        <p className="ml-auto shrink-0 text-xs font-medium text-muted-foreground" aria-label={`${plan.done} of ${plan.total} done`}>
          {plan.done}/{plan.total} done
        </p>
      </div>
      <ol className="space-y-1.5">
        {plan.days.map((d) => {
          const isToday = d.label === plan.today;
          return (
            <li
              key={d.label}
              className={`flex items-start gap-2 rounded-lg px-2 py-1.5 ${isToday ? "bg-accent" : ""}`}
              aria-current={isToday ? "date" : undefined}
            >
              {d.done ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" aria-label="Done" />
              ) : (
                <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-label="Not done yet" />
              )}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-muted-foreground">
                  {d.label}
                  {isToday && <span className="ml-1.5 text-brand-accent">Today</span>}
                </p>
                <Link
                  href={d.path}
                  onClick={onNavigate}
                  className={`break-words font-medium underline-offset-2 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    d.done ? "text-muted-foreground line-through" : "text-brand-accent"
                  }`}
                >
                  {d.title}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
