"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Eraser,
  Clock,
  LayoutGrid,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { remainingSecs, paletteState, type PaletteState } from "@/lib/mocks/attempt";
import type { RunnerState, SavedAnswer } from "@/lib/mocks/service";

type Answers = Record<string, SavedAnswer>;

const PALETTE_STYLE: Record<PaletteState, string> = {
  not_visited: "bg-muted text-muted-foreground border-transparent",
  not_answered: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
  answered: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  flagged: "bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700",
};

function fmtClock(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function MockRunner({
  state,
  supabaseUrl,
}: {
  state: RunnerState;
  supabaseUrl: string;
}) {
  const router = useRouter();
  const { attempt, mock, questions } = state;

  const [answers, setAnswers] = useState<Answers>(() => ({ ...state.answers }));
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState(() => remainingSecs(attempt.expiresAt, Date.now()));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submittedRef = useRef(false);
  const enteredAtRef = useRef(Date.now());
  const q = questions[current];

  const rowFor = useCallback(
    (qid: string): SavedAnswer =>
      answers[qid] ?? { selectedLabel: null, isFlagged: false, timeSpentSecs: 0 },
    [answers]
  );

  // Persist one question's full triple (fire-and-forget; expiry forces submit).
  const saveRow = useCallback(
    async (qid: string, row: SavedAnswer) => {
      try {
        const res = await fetch(`/api/mock/attempt/${attempt.id}/answer`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: qid,
            selectedLabel: row.selectedLabel,
            isFlagged: row.isFlagged,
            timeSpentSecs: row.timeSpentSecs,
          }),
        });
        if (res.status === 401) return;
        const data = await res.json().catch(() => ({}));
        if (data?.expired) void submitAttempt("expired");
      } catch {
        // A dropped autosave is recovered on the next change or at submit.
      }
    },
    // submitAttempt defined below; ref-stable via useCallback deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [attempt.id]
  );

  // Fold the dwell time on the current question into its row (returns the row).
  const commitDwell = useCallback(
    (qid: string): SavedAnswer => {
      const elapsed = Math.floor((Date.now() - enteredAtRef.current) / 1000);
      enteredAtRef.current = Date.now();
      const prev = rowFor(qid);
      const next = { ...prev, timeSpentSecs: prev.timeSpentSecs + Math.max(0, elapsed) };
      return next;
    },
    [rowFor]
  );

  const submitAttempt = useCallback(
    async (reason: "manual" | "expired") => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      setSubmitting(true);
      // Flush the current question's dwell + state before grading.
      const qid = questions[current]?.questionId;
      if (qid) {
        const row = commitDwell(qid);
        setAnswers((a) => ({ ...a, [qid]: row }));
        await saveRow(qid, row);
      }
      try {
        const res = await fetch(`/api/mock/attempt/${attempt.id}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Could not submit.");
        }
        router.push(`/mock/attempt/${attempt.id}/result`);
      } catch (e) {
        submittedRef.current = false;
        setSubmitting(false);
        toast.error(e instanceof Error ? e.message : "Could not submit the test.");
      }
    },
    [attempt.id, current, questions, commitDwell, saveRow, router]
  );

  // Countdown — derived from the server expiry each tick (refresh-resistant).
  // Auto-submits at zero.
  useEffect(() => {
    const t = setInterval(() => {
      const left = remainingSecs(attempt.expiresAt, Date.now());
      setRemaining(left);
      if (left <= 0) void submitAttempt("expired");
    }, 1000);
    return () => clearInterval(t);
  }, [attempt.expiresAt, submitAttempt]);

  // Mark the visited question so its palette turns from grey → red/green.
  useEffect(() => {
    enteredAtRef.current = Date.now();
    const qid = questions[current]?.questionId;
    if (qid && !answers[qid]) {
      setAnswers((a) => ({ ...a, [qid]: { selectedLabel: null, isFlagged: false, timeSpentSecs: 0 } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= questions.length || index === current) return;
      const qid = questions[current].questionId;
      const row = commitDwell(qid);
      setAnswers((a) => ({ ...a, [qid]: row }));
      void saveRow(qid, row);
      setCurrent(index);
      setPaletteOpen(false);
    },
    [current, questions, commitDwell, saveRow]
  );

  const update = useCallback(
    (patch: Partial<SavedAnswer>) => {
      const qid = q.questionId;
      const next = { ...rowFor(qid), ...patch };
      setAnswers((a) => ({ ...a, [qid]: next }));
      void saveRow(qid, next);
    },
    [q, rowFor, saveRow]
  );

  const counts = useMemo(() => {
    let answered = 0, flagged = 0, notAnswered = 0, notVisited = 0;
    for (const item of questions) {
      const st = paletteState(answers[item.questionId]);
      if (st === "answered") answered++;
      else if (st === "flagged") flagged++;
      else if (st === "not_answered") notAnswered++;
      else notVisited++;
    }
    return { answered, flagged, notAnswered, notVisited };
  }, [answers, questions]);

  const row = rowFor(q.questionId);
  const low = remaining <= 300; // last 5 minutes

  return (
    <div className="flex min-h-screen flex-col">
      {/* Timer + submit bar */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{mock.title}</p>
          </div>
          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-sm tabular-nums",
              low ? "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300" : "bg-muted"
            )}
            role="timer"
            aria-live="off"
            aria-label={`Time remaining ${fmtClock(remaining)}`}
          >
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {fmtClock(remaining)}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setPaletteOpen((v) => !v)}
            aria-label="Toggle question palette"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden />
          </Button>
          <Button variant="brand" size="sm" onClick={() => submitAttempt("manual")} disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Submit
          </Button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-3 py-5 sm:px-6">
        {/* Question column */}
        <main className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h1 className="text-sm font-semibold text-muted-foreground">
              Question {q.position} <span className="font-normal">of {mock.totalQuestions}</span>
            </h1>
            <span className="font-mono text-xs text-muted-foreground">
              +{q.marks} / {q.negMarks}
            </span>
          </div>

          <div className="mt-3 rounded-lg border bg-card p-4 sm:p-5">
            {q.context && (
              <div className="mb-3 border-l-2 border-muted pl-3 font-serif text-sm italic text-muted-foreground">
                <BlockText text={q.context} />
              </div>
            )}
            <div className="font-serif text-[15px] leading-relaxed [&_.katex]:max-w-full">
              <BlockText text={q.text} />
            </div>
            {q.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={publicImageUrl(supabaseUrl, q.imageUrl)}
                alt="Question diagram"
                className="mt-4 max-h-72 w-auto rounded border"
              />
            )}

            <ol className="mt-4 space-y-2">
              {q.options.map((opt) => {
                const selected = row.selectedLabel === opt.label;
                return (
                  <li key={opt.label}>
                    <button
                      type="button"
                      onClick={() => update({ selectedLabel: opt.label })}
                      aria-pressed={selected}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-md border p-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                        selected
                          ? "border-brand-accent bg-brand-accent/10 ring-1 ring-brand-accent"
                          : "bg-background hover:bg-accent/40"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          selected ? "bg-brand text-brand-foreground" : "bg-muted text-foreground"
                        )}
                      >
                        {opt.label}
                      </span>
                      <div className="min-w-0 flex-1 overflow-x-auto font-serif [&_.katex]:max-w-full">
                        <KatexRenderer text={opt.text} />
                        {opt.imageUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={publicImageUrl(supabaseUrl, opt.imageUrl)}
                            alt={`Option ${opt.label}`}
                            className="mt-2 max-h-28 w-auto rounded border"
                          />
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3">
              <Button
                variant={row.isFlagged ? "secondary" : "outline"}
                size="sm"
                onClick={() => update({ isFlagged: !row.isFlagged })}
              >
                <Flag className={cn("h-3.5 w-3.5", row.isFlagged && "fill-current")} aria-hidden />
                {row.isFlagged ? "Unmark" : "Mark for review"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => update({ selectedLabel: null })}
                disabled={!row.selectedLabel}
              >
                <Eraser className="h-3.5 w-3.5" aria-hidden />
                Clear
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Button variant="outline" onClick={() => goTo(current - 1)} disabled={current === 0}>
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Previous
            </Button>
            <Button variant="outline" onClick={() => goTo(current + 1)} disabled={current === questions.length - 1}>
              Next
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </main>

        {/* Palette — sidebar on desktop, slide-over on mobile */}
        <Palette
          questions={questions}
          answers={answers}
          current={current}
          counts={counts}
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onJump={goTo}
        />
      </div>
    </div>
  );
}

function Palette({
  questions,
  answers,
  current,
  counts,
  open,
  onClose,
  onJump,
}: {
  questions: RunnerState["questions"];
  answers: Answers;
  current: number;
  counts: { answered: number; flagged: number; notAnswered: number; notVisited: number };
  open: boolean;
  onClose: () => void;
  onJump: (i: number) => void;
}) {
  const grid = (
    <>
      <div className="mb-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <LegendDot className={PALETTE_STYLE.answered} label={`Answered · ${counts.answered}`} />
        <LegendDot className={PALETTE_STYLE.not_answered} label={`Not answered · ${counts.notAnswered}`} />
        <LegendDot className={PALETTE_STYLE.flagged} label={`Flagged · ${counts.flagged}`} />
        <LegendDot className={PALETTE_STYLE.not_visited} label={`Not visited · ${counts.notVisited}`} />
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {questions.map((item, i) => {
          const st = paletteState(answers[item.questionId]);
          return (
            <button
              key={item.questionId}
              type="button"
              onClick={() => onJump(i)}
              aria-label={`Go to question ${item.position}`}
              aria-current={i === current}
              className={cn(
                "flex h-8 items-center justify-center rounded border text-xs font-medium tabular-nums transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                PALETTE_STYLE[st],
                i === current && "ring-2 ring-brand-accent ring-offset-1"
              )}
            >
              {item.position}
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-16 rounded-lg border bg-card p-4">{grid}</div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[85vw] overflow-y-auto border-l bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold">Questions</span>
              <button type="button" onClick={onClose} aria-label="Close palette" className="rounded p-1 hover:bg-accent">
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            {grid}
          </div>
        </div>
      )}
    </>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("inline-block h-3 w-3 rounded-sm border", className)} aria-hidden />
      {label}
    </div>
  );
}
