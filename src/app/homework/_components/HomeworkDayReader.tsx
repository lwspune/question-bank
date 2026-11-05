"use client";

/**
 * One homework day on screen (2026-10-10): its questions as /board shows them,
 * a case study's passage once above its parts. Answers are attempt-first and
 * spend the same free answers as /board and /question-papers (useBoardReveal),
 * the owner's call: the day page is not a way round the sign-in prompt.
 *
 * Also used for a See all group page; there `day` is absent and nothing below
 * about progress applies.
 *
 * PROGRESS (2026-11-05). Signed in, a day page shows how many of its questions
 * the student has marked, labels each finished one, and says "Day N done" at
 * the end, with the next day and any questions waiting in Fix your mistakes.
 * Earlier marks come from /api/homework/progress (the page itself is cached
 * and shared, so nothing personal is in it); marks made on this visit are
 * added as they happen: a written answer's Understood / Review later through
 * the buttons' saved event, an MCQ once its answer is revealed (the reveal is
 * what gets recorded for it). Rules: lib/homework/progress.
 */
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { SELF_MARK_SAVED_EVENT, type SelfMarkSavedDetail } from "@/components/reveal/selfMarkClient";
import type { BoardQuestion } from "@/lib/board/query";
import type { HomeworkSlot } from "@/lib/homework/dayView";
import { summarizeDay, type DaySummary, type QuestionMark } from "@/lib/homework/progress";
import { dayHref, planHref } from "@/lib/homework/links";
import { drillHref } from "@/lib/drill/from";
import { useBoardReveal } from "@/app/board/useBoardReveal";
import { cn } from "@/lib/utils";
import HomeworkSlotList from "./HomeworkSlotList";

type DayMarks = { marks: Record<string, QuestionMark>; due: string[] };

export default function HomeworkDayReader({
  slots,
  examName,
  dayTitle,
  supabaseUrl,
  planSlug,
  showChapter = true,
  day,
  nextDay = null,
}: {
  slots: HomeworkSlot<BoardQuestion>[];
  /** The DB exams.name, for the free-answer meter. */
  examName: string;
  /** Names where a picked option was answered ("CBSE Class 12 Physics, day 12"). */
  dayTitle: string;
  supabaseUrl: string;
  /** For each slot's See all link (HomeworkSlotList). */
  planSlug?: string;
  showChapter?: boolean;
  /** The day shown: with it (and planSlug), a signed-in student sees progress. */
  day?: number;
  /** The day after this one, for the done card. */
  nextDay?: number | null;
}) {
  const byId = useMemo(() => {
    const m = new Map<string, BoardQuestion>();
    for (const s of slots) for (const q of s.questions) m.set(q.id, q);
    return m;
  }, [slots]);
  const { revealed, blocked, picks, lock, toggleOne, pickOne } = useBoardReveal(examName, dayTitle, byId);

  const { signedIn } = useSignedIn();
  const tracks = signedIn && !!planSlug && day !== undefined;
  const [server, setServer] = useState<DayMarks | null>(null);
  // Marks saved on this visit, over the server's: the latest tap wins.
  const [local, setLocal] = useState<Record<string, { mark: QuestionMark; due: boolean | null }>>({});

  useEffect(() => {
    if (!tracks) return;
    let active = true;
    fetch(`/api/homework/progress?plan=${encodeURIComponent(planSlug!)}&day=${day}`, { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<DayMarks>) : null))
      .then((body) => {
        if (active && body) setServer(body);
      })
      .catch(() => {
        /* progress is extra: the day still works without it */
      });
    return () => {
      active = false;
    };
  }, [tracks, planSlug, day]);

  useEffect(() => {
    if (!tracks) return;
    const onSaved = (e: Event) => {
      const d = (e as CustomEvent<SelfMarkSavedDetail>).detail;
      if (!d || !byId.has(d.questionId)) return;
      // Review later puts it in the drill; Understood takes it out only when
      // it was waiting there (outcome "fixed"), otherwise leaves it as it was.
      const due = d.mark === "review" ? true : d.outcome === "fixed" ? false : null;
      setLocal((prev) => ({ ...prev, [d.questionId]: { mark: d.mark, due } }));
    };
    window.addEventListener(SELF_MARK_SAVED_EVENT, onSaved);
    return () => window.removeEventListener(SELF_MARK_SAVED_EVENT, onSaved);
  }, [tracks, byId]);

  // An MCQ's FIRST tap is the graded attempt (useBoardReveal): a wrong one
  // sends it to the drill on the server, so count it as to review here too.
  const onPick = (id: string, label: string) => {
    if (tracks && !revealed.has(id) && !lock.isLocked(id)) {
      const q = byId.get(id);
      const right = q?.options.find((o) => o.label === label)?.isCorrect;
      if (q && q.format === "mcq" && right !== undefined) {
        setLocal((prev) => ({ ...prev, [id]: { mark: "answered", due: right ? null : true } }));
      }
    }
    pickOne(id, label);
  };

  const merged = useMemo(() => {
    if (!server) return null;
    const marks: Record<string, QuestionMark> = { ...server.marks };
    const due = new Set(server.due);
    for (const id of revealed) {
      const q = byId.get(id);
      if (q && q.format !== "subjective" && !marks[id]) marks[id] = "answered";
    }
    for (const [id, l] of Object.entries(local)) {
      marks[id] = l.mark;
      if (l.due === true) due.add(id);
      if (l.due === false) due.delete(id);
    }
    return { marks, due };
  }, [server, local, revealed, byId]);

  const summary = useMemo(
    () =>
      merged
        ? summarizeDay(
            slots.map((s) => s.questions.map((q) => ({ id: q.id, format: q.format }))),
            merged.marks,
            merged.due
          )
        : null,
    [merged, slots]
  );

  return (
    <PresentRegistry>
      {summary && merged && (
        <DayProgressStrip
          summary={summary}
          slotStates={slots.map((s) => slotState(s.questions.map((q) => q.id), merged.marks, merged.due))}
          hasWritten={slots.some((s) => s.questions.some((q) => q.format === "subjective"))}
        />
      )}
      <HomeworkSlotList
        slots={slots}
        supabaseUrl={supabaseUrl}
        planSlug={planSlug}
        showChapter={showChapter}
        revealed={revealed}
        blocked={blocked}
        lock={lock}
        onToggleReveal={toggleOne}
        picks={picks}
        onPick={onPick}
        marks={merged?.marks}
        due={merged?.due}
      />
      {summary?.complete && planSlug && day !== undefined && (
        <DayDoneCard day={day} summary={summary} planSlug={planSlug} nextDay={nextDay} />
      )}
    </PresentRegistry>
  );
}

type SlotState = "done" | "review" | "open";

function slotState(ids: string[], marks: Record<string, QuestionMark>, due: Set<string>): SlotState {
  if (!ids.every((id) => marks[id])) return "open";
  return ids.some((id) => due.has(id)) ? "review" : "done";
}

function DayProgressStrip({
  summary,
  slotStates,
  hasWritten,
}: {
  summary: DaySummary;
  slotStates: SlotState[];
  hasWritten: boolean;
}) {
  return (
    <div className="mb-6 rounded-lg border bg-card p-3 sm:p-4" aria-live="polite">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm">
        <span className="font-semibold text-foreground">
          {summary.done} of {summary.total} marked
        </span>
        {summary.toReview > 0 && (
          <span className="text-amber-800 dark:text-amber-300">{summary.toReview} to review</span>
        )}
      </div>
      <div className="mt-2 flex gap-1" aria-hidden>
        {slotStates.map((s, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              s === "done" ? "bg-brand" : s === "review" ? "bg-amber-500" : "bg-muted"
            )}
          />
        ))}
      </div>
      {!summary.complete && hasWritten && (
        <p className="mt-2 text-xs text-muted-foreground">
          After checking a written answer, mark it Understood or Review later.
        </p>
      )}
    </div>
  );
}

function DayDoneCard({
  day,
  summary,
  planSlug,
  nextDay,
}: {
  day: number;
  summary: DaySummary;
  planSlug: string;
  nextDay: number | null;
}) {
  const n = summary.toReview;
  return (
    <section
      aria-labelledby="day-done"
      className="mt-8 rounded-lg border border-brand-accent bg-card p-4 motion-safe:animate-fade-in-up sm:p-5"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <h2 id="day-done" className="text-lg font-bold text-foreground">
          Day {day} done
        </h2>
      </div>
      <p className="mt-3 text-sm text-foreground">
        {n === 0
          ? `You went through all ${summary.total} questions, with nothing left to review.`
          : `${n} ${n === 1 ? "question is" : "questions are"} waiting in Fix your mistakes, so you will see ${
              n === 1 ? "it" : "them"
            } again.`}
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          href={nextDay ? dayHref(planSlug, nextDay) : planHref(planSlug)}
          prefetch={false}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {nextDay ? `Next: Day ${nextDay}` : "Back to all days"}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        {n > 0 && (
          <Link
            href={drillHref("homework")}
            prefetch={false}
            className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-4 text-sm font-semibold text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Review {n === 1 ? "it" : `these ${n}`} in Fix your mistakes
          </Link>
        )}
      </div>
    </section>
  );
}
