"use client";

import { useEffect, useState } from "react";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, ChevronRight, Circle } from "lucide-react";
import type { FocusChapter, PathView, SwitchOption } from "@/lib/path/view";
import type { CoverSubject } from "@/lib/path/covered";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { PathOffer } from "@/lib/path/service";
import type { Stream } from "@/lib/path/model";
import { cn } from "@/lib/utils";
import CelebrateOnMount from "@/components/celebrate/CelebrateOnMount";
import { invalidatePulse } from "@/lib/viewer/usePulse";

type Card = { path: PathView | null; offer: PathOffer | null };

/**
 * The board path on /me (MENTOR_SPEC.md §4, Phase 1): today's tasks for a path
 * student, in place of the week ring (D4), or the start card for a Class 12
 * student without a path. One card holding both, so a start or a "Not taught
 * yet" swaps the day in place from the route's answer, no reload.
 *
 * Following the class (§18, 2026-11-15): before the first card the student
 * answers "What has your class covered?" (the checklist stands in for the
 * tasks until then), the card opens on today's chapter with its three steps
 * and what already counted, and "Switch chapter" replaces "Not taught yet".
 *
 * `readOnly` is the staff view: the same card with nothing that saves.
 */
export default function PathCard({ initial, readOnly = false }: { initial: Card; readOnly?: boolean }) {
  const [card, setCard] = useState<Card>(initial);
  const [busy, setBusy] = useState(false);

  async function post(body: Record<string, unknown>, done: string | ((today: PathView | null) => string), reload = false): Promise<void> {
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
      toast.success(typeof done === "string" ? done : done(data.today ?? null));
      // The header's shared pulse carries the path state (V's button, the /board line).
      invalidatePulse();
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
      <>
        {/* A chapter newly done, said by V where it finished (Phase 2). Never in the staff view. */}
        {!readOnly && <CelebrateOnMount messages={card.path.celebrate} />}
        <PathToday
          view={card.path}
          readOnly={readOnly}
          busy={busy}
          onCover={(chapterIds) =>
            void post({ action: "cover", chapterIds }, chapterIds.length > 0 ? "Your plan starts with the chapters you ticked." : "Your plan starts from chapter 1.")
          }
          onSwitch={(o) => void post({ action: "switch", chapterId: o.id }, `Today's card is now ${o.name}.`)}
          onPace={(direction) =>
            void post({ action: "pace", direction }, (today) =>
              today ? `Now about ${today.dailyMinutes} min a day. Today's card has changed to match.` : "Pace changed."
            )
          }
        />
      </>
    );
  }
  if (card.offer && !readOnly) {
    return <PathStart offer={card.offer} busy={busy} onStart={(stream) => void post({ action: "start", exam: card.offer!.exam, stream }, "Your plan has started", true)} />;
  }
  return null;
}

const paceButton =
  "inline-flex h-9 items-center rounded-lg border bg-card px-3 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";

const linkCls =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const textButton =
  "font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";

/** Today's chapter: its three steps, and what work done before today already counts (§18). */
function FocusStrip({ focus }: { focus: FocusChapter }) {
  return (
    <div className="mt-4 rounded-xl border border-brand/15 bg-card px-4 py-3">
      <p className="text-sm font-semibold">
        {focus.name} <span className="font-normal text-muted-foreground">· {focus.subjectLabel}</span>
      </p>
      {focus.credit && <p className="mt-1 text-sm text-muted-foreground">{focus.credit}</p>}
      <ol className="mt-2 grid grid-cols-3 gap-2" aria-label={`${focus.name}: steps to finish the chapter`}>
        {focus.parts.map((p) => (
          <li
            key={p.part}
            className={cn(
              "rounded-lg border px-2 py-1.5 text-xs",
              p.done ? "border-emerald-600/30 bg-emerald-600/5" : "bg-background"
            )}
          >
            <span className="flex items-center gap-1 font-medium">
              {p.done ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
              ) : (
                <Circle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
              )}
              {p.done && <span className="sr-only">Done: </span>}
              {p.label}
            </span>
            {p.progress && <span className="mt-0.5 block tabular-nums text-muted-foreground">{p.progress}</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * "What has your class covered?" (§18): one checklist per subject, the first
 * open. Saved as the whole set; "Start from chapter 1" answers with nothing
 * ticked (book order). `onCancel` only on Update: the first ask has no card
 * behind it to go back to.
 */
function CoverStep({
  subjects,
  busy,
  onSave,
  onCancel,
}: {
  subjects: readonly CoverSubject[];
  busy: boolean;
  onSave: (chapterIds: string[]) => void;
  onCancel: (() => void) | null;
}) {
  const [ticked, setTicked] = useState<Set<string>>(
    () => new Set(subjects.flatMap((s) => s.chapters.filter((c) => c.ticked).map((c) => c.id)))
  );
  const toggle = (id: string) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const setSubject = (s: CoverSubject, on: boolean) =>
    setTicked((prev) => {
      const next = new Set(prev);
      for (const c of s.chapters) {
        if (on) next.add(c.id);
        else next.delete(c.id);
      }
      return next;
    });
  const n = ticked.size;
  return (
    <section aria-labelledby="path-cover-heading" className="hero-soft rounded-2xl p-5 sm:p-6">
      <h2 id="path-cover-heading" className="text-lg font-semibold tracking-tight">
        What has your class covered?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Tick the chapters taught so far. Your plan starts with these. You can change this any time.
      </p>
      <div className="mt-3 divide-y divide-brand/15 rounded-xl border border-brand/15 bg-card">
        {subjects.map((s, i) => {
          const count = s.chapters.filter((c) => ticked.has(c.id)).length;
          const all = count === s.chapters.length;
          return (
            <details key={s.subject} open={i === 0} className="group px-4 py-2">
              <summary className={cn("flex cursor-pointer items-center justify-between gap-3 py-1 text-sm font-semibold", linkCls)}>
                <span>{s.label}</span>
                <span className="text-xs font-normal tabular-nums text-muted-foreground">
                  {count} of {s.chapters.length} ticked
                </span>
              </summary>
              <div className="flex justify-end">
                <button type="button" disabled={busy} onClick={() => setSubject(s, !all)} className={cn("text-xs", textButton)}>
                  {all ? "Clear all" : "Tick all"}
                  <span className="sr-only"> {s.label}</span>
                </button>
              </div>
              <ul className="mt-1 space-y-0.5">
                {s.chapters.map((c) => (
                  <li key={c.id}>
                    <label className="flex min-h-[40px] cursor-pointer items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={ticked.has(c.id)}
                        onChange={() => toggle(c.id)}
                        disabled={busy}
                        className="h-4 w-4 shrink-0 accent-[hsl(var(--brand))] focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      <span className="min-w-0 flex-1">
                        {c.name}
                        {c.practised && (
                          <span className="ml-2 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand-accent">
                            You practised this
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
      <button
        type="button"
        disabled={busy}
        onClick={() => onSave([...ticked])}
        className={cn(
          "mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 disabled:opacity-50 sm:w-auto",
          linkCls
        )}
      >
        {n > 0 ? `Make my plan (${n} ${n === 1 ? "chapter" : "chapters"} to start)` : "Make my plan"}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
      <p className="mt-3 text-sm text-muted-foreground">
        Not sure?{" "}
        <button type="button" disabled={busy} onClick={() => onSave([])} className={textButton}>
          Start from chapter 1
        </button>
        {onCancel && (
          <>
            {" · "}
            <button type="button" disabled={busy} onClick={onCancel} className={textButton}>
              Cancel
            </button>
          </>
        )}
      </p>
    </section>
  );
}

/** "Switch chapter" (§18): a bottom sheet, taught chapters first, one pick. */
function SwitchSheet({
  open,
  options,
  busy,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  options: readonly SwitchOption[];
  busy: boolean;
  onOpenChange: (open: boolean) => void;
  onPick: (o: SwitchOption) => void;
}) {
  const [chosen, setChosen] = useState<string | null>(null);
  const pick = options.find((o) => o.id === chosen) ?? null;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-h-[85vh] max-w-lg overflow-y-auto rounded-t-2xl p-5" closeClassName="h-11 w-11 flex items-center justify-center right-2 top-2">
        <SheetHeader className="text-left">
          <SheetTitle>Which chapter today?</SheetTitle>
          <SheetDescription>Your card will change to this chapter. What you&apos;ve done today stays.</SheetDescription>
        </SheetHeader>
        <fieldset className="mt-3">
          <legend className="sr-only">Chapters</legend>
          <ul className="space-y-2">
            {options.map((o) => (
              <li key={o.id}>
                <label
                  className={cn(
                    "flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border px-3 py-2",
                    chosen === o.id ? "border-brand bg-brand/5" : "bg-card"
                  )}
                >
                  <input
                    type="radio"
                    name="path-switch"
                    value={o.id}
                    checked={chosen === o.id}
                    onChange={() => setChosen(o.id)}
                    className="h-4 w-4 shrink-0 accent-[hsl(var(--brand))]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{o.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {o.subjectLabel} · {o.stepsDone === 0 ? "not started" : `${o.stepsDone} of ${o.stepsOf} steps`}
                      {o.taught === true && " · taught"}
                      {o.taught === false && " · not taught yet"}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <button
          type="button"
          disabled={busy || !pick}
          onClick={() => pick && onPick(pick)}
          className={cn(
            "mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 disabled:opacity-50",
            linkCls
          )}
        >
          {pick ? `Use ${pick.name} today` : "Pick a chapter"}
        </button>
      </SheetContent>
    </Sheet>
  );
}

function PathToday({
  view,
  readOnly,
  busy,
  onCover,
  onSwitch,
  onPace,
}: {
  view: PathView;
  readOnly: boolean;
  busy: boolean;
  onCover: (chapterIds: string[]) => void;
  onSwitch: (o: SwitchOption) => void;
  onPace: (direction: "lighter" | "more") => void;
}) {
  const lead = view.tasks.find((t) => !t.done);
  // "What has your class covered?": asked before the first card, and on Update (§18).
  const [editingCover, setEditingCover] = useState(false);
  const [switching, setSwitching] = useState(false);
  const asking = !readOnly && !!view.cover && !view.cover.asked;
  // Lighter says the finish date it leads to before it is made (Phase 3).
  const [confirmLighter, setConfirmLighter] = useState(false);
  // The readout's funnel (Phase 4): the review and "Pick up here" seen. Never in the staff view.
  const showsReview = !!view.review;
  const showsPickUp = !!view.pickUp;
  useEffect(() => {
    if (readOnly) return;
    if (showsReview) sendActivityOnce("path_review", { kind: "surface_viewed", surface: "path_review" });
    if (showsPickUp) sendActivityOnce("path_pickup", { kind: "surface_viewed", surface: "path_pickup" });
  }, [readOnly, showsReview, showsPickUp]);
  const showsCover = asking || (editingCover && !readOnly);
  useEffect(() => {
    if (showsCover) sendActivityOnce("path_cover", { kind: "surface_viewed", surface: "path_cover" });
  }, [showsCover]);

  if (showsCover && view.cover) {
    return (
      <CoverStep
        subjects={view.cover.subjects}
        busy={busy}
        onSave={(ids) => {
          setEditingCover(false);
          onCover(ids);
        }}
        onCancel={asking ? null : () => setEditingCover(false)}
      />
    );
  }

  const canSwitch = !readOnly && view.mode === "chapters" && view.switchOptions.length > 0;
  return (
    <section aria-labelledby="path-heading" className="hero-soft rounded-2xl p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="path-heading" className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
          Today&apos;s plan
        </h2>
        {view.tasks.length > 0 && (
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">about {view.todayMinutes} min</span>
        )}
      </div>
      <p className="mt-1 text-sm font-medium">{view.statusLine}</p>
      {view.behind && <p className="mt-0.5 text-sm text-muted-foreground">{view.behind}</p>}
      {view.pickUp && (
        <p className="mt-3 text-sm">
          <span className="font-semibold">Welcome back.</span> Pick up here: {view.pickUp}
        </p>
      )}
      {view.review && <WeekReview lines={view.review} />}
      {view.focus && !view.allDone && <FocusStrip focus={view.focus} />}

      {view.allDone ? (
        <p className="mt-4 rounded-xl border border-emerald-600/20 bg-emerald-600/5 px-4 py-3 text-sm">
          <CheckCircle2 className="mr-1.5 inline h-4 w-4 align-[-3px] text-emerald-600" aria-hidden />
          Today&apos;s tasks are done. Well done. Your next ones are here tomorrow.
        </p>
      ) : view.tasks.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">Every chapter in your plan is done.</p>
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
                  {/* Wraps, never truncates: on a phone the chapter's name is the point of the line. */}
                  <span className="block text-xs text-muted-foreground">{t.detail}</span>
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
            </li>
          ))}
        </ul>
      )}

      {canSwitch &&
        (view.switchesLeft > 0 ? (
          <p className="mt-3 text-sm">
            Studying a different chapter today?{" "}
            <button type="button" disabled={busy} onClick={() => setSwitching(true)} className={textButton}>
              Switch chapter
            </button>
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            You&apos;ve switched chapters 3 times today. Your card keeps this one until tomorrow.
          </p>
        ))}
      {canSwitch && (
        <SwitchSheet
          open={switching}
          options={view.switchOptions}
          busy={busy}
          onOpenChange={setSwitching}
          onPick={(o) => {
            setSwitching(false);
            onSwitch(o);
          }}
        />
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-brand/15 pt-3 text-sm">
        <span className="text-muted-foreground">{view.dailyMinutes} min a day</span>
        {!readOnly && (
          <>
            <button
              type="button"
              disabled={busy || !view.canLighter}
              onClick={() => setConfirmLighter(true)}
              aria-label="Lighter: 10 minutes less a day"
              className={paceButton}
            >
              Lighter
            </button>
            <button
              type="button"
              disabled={busy || !view.canMore}
              onClick={() => {
                setConfirmLighter(false);
                onPace("more");
              }}
              aria-label="More: 10 minutes more a day"
              className={paceButton}
            >
              More
            </button>
          </>
        )}
      </div>
      {confirmLighter && view.lighter && !readOnly && (
        <div className="mt-2 rounded-xl border bg-card px-4 py-3 text-sm" role="group" aria-label="Make the plan lighter">
          <p>{view.lighter}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setConfirmLighter(false);
                onPace("lighter");
              }}
              className={paceButton}
            >
              Make it lighter
            </button>
            <button type="button" disabled={busy} onClick={() => setConfirmLighter(false)} className={paceButton}>
              Keep {view.dailyMinutes} min
            </button>
          </div>
        </div>
      )}

      {!readOnly && view.cover && (
        <p className="mt-2 text-sm">
          <button type="button" disabled={busy} onClick={() => setEditingCover(true)} className={textButton}>
            Update what your class has covered
          </button>
        </p>
      )}

      <div className="mt-3 space-y-0.5 text-xs text-muted-foreground">
        <p>{view.examLine}</p>
        {view.biologyNote && <p>Biology is not in the plan yet.</p>}
      </div>
    </section>
  );
}

/** The weekly review, the first days of a new path week (Phase 2). */
export function WeekReview({ lines }: { lines: readonly string[] }) {
  return (
    <div className="mt-3 rounded-xl border border-brand/15 bg-card/60 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your week</p>
      <ul className="mt-1 space-y-0.5 text-sm">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

const STREAM_BUTTONS: { stream: Stream; label: string }[] = [
  { stream: "pcm", label: "PCM" },
  { stream: "pcb", label: "PCB" },
  { stream: "pcmb", label: "PCMB" },
];

function PathStart({ offer, busy, onStart }: { offer: PathOffer; busy: boolean; onStart: (s: Stream) => void }) {
  // The readout's funnel (Phase 4): the offer seen on /me. Only a student sees it (never the staff view).
  useEffect(() => {
    sendActivityOnce("path_offer_me", { kind: "surface_viewed", surface: "path_offer_me" });
  }, []);
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
        questions, then its chapter test, starting with the chapters your class has covered.
      </p>
      {pcb && <p className="mt-1 text-sm text-muted-foreground">Biology is not in the plan yet.</p>}

      {offer.stream ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => onStart(offer.stream!)}
          className={cn(button, "mt-4 bg-brand text-brand-foreground hover:bg-brand/90")}
        >
          Start my plan
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
                aria-label={`${b.label}: start my plan`}
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
