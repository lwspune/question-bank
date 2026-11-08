"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, ChevronRight, Circle } from "lucide-react";
import type { PathView } from "@/lib/path/view";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";

/**
 * "My plan for today" inside V (MENTOR_SPEC.md Phase 2): today's board-path
 * card under V's reply, built from numbers like "How's my progress", so it
 * costs no message. Shown when the student taps the button or when V's plan
 * tools answered from the path. The same view as /me (GET /api/path), so the
 * two cannot disagree; the full card, with "Not taught yet", stays on /me.
 */
export default function VPathCard({ onNavigate }: { onNavigate?: () => void }) {
  const [view, setView] = useState<PathView | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/path", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { today: PathView | null }) => {
        if (!live) return;
        if (j.today) {
          setView(j.today);
          // The readout's funnel (Phase 4): V's path card opened, and the review seen in it.
          sendActivityOnce("v_path", { kind: "surface_viewed", surface: "v_path" });
          if (j.today.review) sendActivityOnce("path_review", { kind: "surface_viewed", surface: "path_review" });
        } else setFailed(true);
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, []);

  if (failed) return null;
  if (!view) return <div className="ml-9 mt-2 h-40 animate-pulse rounded-xl border bg-muted/40" aria-hidden />;
  return <VPathCardBody view={view} onNavigate={onNavigate} />;
}

const linkCls = "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function VPathCardBody({ view, onNavigate }: { view: PathView; onNavigate?: () => void }) {
  return (
    <section className="ml-9 mt-2 rounded-xl border bg-card p-3 text-sm shadow-sm" aria-label="Today on your path">
      <div className="mb-2 flex items-start gap-2">
        <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0">
          <p className="font-semibold">Today on your path</p>
          <p className="text-xs text-muted-foreground">{view.statusLine}</p>
        </div>
        {view.tasks.length > 0 && (
          <p className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">about {view.todayMinutes} min</p>
        )}
      </div>

      {view.pickUp && (
        <p className="mb-2 text-sm">
          <span className="font-semibold">Welcome back.</span> Pick up here: {view.pickUp}
        </p>
      )}

      {view.tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">Every chapter on your path is done.</p>
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

      <Link href="/me" prefetch={false} onClick={onNavigate} className={`mt-2 inline-block text-xs font-medium text-brand-accent underline-offset-4 hover:underline ${linkCls}`}>
        See your full path
      </Link>
    </section>
  );
}
