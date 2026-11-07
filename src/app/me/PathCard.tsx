"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, ChevronRight, Circle } from "lucide-react";
import { dayLabel, type PathView, type TaskRow } from "@/lib/path/view";
import type { PathOffer } from "@/lib/path/service";
import type { Stream } from "@/lib/path/model";
import { cn } from "@/lib/utils";

type Card = { path: PathView | null; offer: PathOffer | null };

/**
 * The board path on /me (MENTOR_SPEC.md §4, Phase 1): today's tasks for a path
 * student, in place of the week ring (D4), or the start card for a Class 12
 * student without a path. One card holding both, so a start or a "Not taught
 * yet" swaps the day in place from the route's answer, no reload.
 *
 * `readOnly` is the staff view: the same card with nothing that saves.
 */
export default function PathCard({ initial, readOnly = false }: { initial: Card; readOnly?: boolean }) {
  const [card, setCard] = useState<Card>(initial);
  const [busy, setBusy] = useState(false);

  async function post(body: Record<string, unknown>, done: string, reload = false): Promise<void> {
    setBusy(true);
    try {
      const res = await fetch("/api/path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { today?: PathView | null; offer?: PathOffer | null; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Couldn't save that. Try again.");
      setCard({ path: data.today ?? null, offer: data.offer ?? null });
      toast.success(done);
      // A start reloads /me so the week ring below gives way to the path at
      // once (D4: one pace on the page).
      if (reload) window.location.reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't save that. Try again.");
    } finally {
      setBusy(false);
    }
  }

  if (card.path) {
    return (
      <PathToday
        view={card.path}
        readOnly={readOnly}
        busy={busy}
        onDefer={(t) => void post({ action: "defer", chapterId: t.chapterId }, "Moved later. Your card has the next one.")}
      />
    );
  }
  if (card.offer && !readOnly) {
    return <PathStart offer={card.offer} busy={busy} onStart={(stream) => void post({ action: "start", exam: card.offer!.exam, stream }, "Your path has started", true)} />;
  }
  return null;
}

const linkCls =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function PathToday({
  view,
  readOnly,
  busy,
  onDefer,
}: {
  view: PathView;
  readOnly: boolean;
  busy: boolean;
  onDefer: (t: TaskRow) => void;
}) {
  const lead = view.tasks.find((t) => !t.done);
  return (
    <section aria-labelledby="path-heading" className="hero-soft rounded-2xl p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="path-heading" className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
          Today on your path
        </h2>
        {view.tasks.length > 0 && (
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">about {view.todayMinutes} min</span>
        )}
      </div>
      <p className="mt-1 text-sm font-medium">{view.statusLine}</p>
      {!view.pace.onTrack && (
        <p className="mt-0.5 text-sm text-muted-foreground">At this pace you finish on {dayLabel(view.pace.finish)}.</p>
      )}

      {view.allDone ? (
        <p className="mt-4 rounded-xl border border-emerald-600/20 bg-emerald-600/5 px-4 py-3 text-sm">
          <CheckCircle2 className="mr-1.5 inline h-4 w-4 align-[-3px] text-emerald-600" aria-hidden />
          Today&apos;s tasks are done. Well done. Your next ones are here tomorrow.
        </p>
      ) : view.tasks.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">Every chapter on your path is done.</p>
      ) : null}

      {view.tasks.length > 0 && (
        <ul className="mt-4 divide-y divide-brand/10 border-t border-brand/15">
          {view.tasks.map((t) => (
            <li key={t.key} className="py-3">
              <Link
                href={t.href}
                prefetch={false}
                className={cn("flex items-center gap-3 rounded-lg", linkCls)}
              >
                {t.done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-brand-accent/60" aria-hidden />
                )}
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-sm font-medium", t.done && "text-muted-foreground")}>
                    {t.done && <span className="sr-only">Done: </span>}
                    {t.title}
                    {t.progress && !t.done && (
                      <span className="ml-2 font-normal tabular-nums text-muted-foreground">{t.progress}</span>
                    )}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{t.detail}</span>
                </span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{t.minutes} min</span>
                {lead === t ? (
                  <span className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg bg-brand px-3 text-sm font-medium text-brand-foreground">
                    Start
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                )}
              </Link>
              {t.canDefer && !readOnly && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onDefer(t)}
                  aria-label={`Not taught yet: ${t.detail}. Move this chapter later.`}
                  className="ml-8 mt-1 text-xs font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  Not taught yet
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 space-y-0.5 border-t border-brand/15 pt-3 text-xs text-muted-foreground">
        <p>{view.examLine}</p>
        {view.biologyNote && <p>Biology is not in the path yet.</p>}
      </div>
    </section>
  );
}

const STREAM_BUTTONS: { stream: Stream; label: string }[] = [
  { stream: "pcm", label: "PCM" },
  { stream: "pcb", label: "PCB" },
  { stream: "pcmb", label: "PCMB" },
];

function PathStart({ offer, busy, onStart }: { offer: PathOffer; busy: boolean; onStart: (s: Stream) => void }) {
  const pcb = offer.stream === "pcb";
  const button =
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium transition-colors disabled:opacity-50 " + linkCls;
  return (
    <section aria-labelledby="path-start-heading" className="hero-soft rounded-2xl p-5 sm:p-6">
      <h2 id="path-start-heading" className="text-lg font-semibold tracking-tight sm:text-xl">
        {pcb ? "Finish Physics and Chemistry before your boards" : "Finish Physics, Chemistry and Maths before your boards"}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        A few tasks each day, about {offer.minutes} minutes a day: each chapter&apos;s revision sheet, its Top 10 board
        questions, then its chapter test, in book order.
      </p>
      {pcb && <p className="mt-1 text-sm text-muted-foreground">Biology is not in the path yet.</p>}

      {offer.stream ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => onStart(offer.stream!)}
          className={cn(button, "mt-4 bg-brand text-brand-foreground hover:bg-brand/90")}
        >
          Start my path
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      ) : (
        <div className="mt-4">
          <p className="text-sm font-medium">Your subjects?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {STREAM_BUTTONS.map((b) => (
              <button
                key={b.stream}
                type="button"
                disabled={busy}
                onClick={() => onStart(b.stream)}
                aria-label={`${b.label}: start my path`}
                className={cn(button, "border bg-card hover:bg-accent")}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
