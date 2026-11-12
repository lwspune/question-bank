"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CloudOff,
  Eraser,
  Flag,
  LayoutGrid,
  Loader2,
  Maximize2,
} from "lucide-react";
import { toast } from "sonner";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { remainingSecs, paletteState, type PaletteState } from "@/lib/mocks/attempt";
import {
  beginSave,
  crossedTimeWarning,
  emptySaveTracker,
  failSave,
  groupBySection,
  runnerKeyAction,
  submitSummary,
  succeedSave,
  type SaveTracker,
  type SectionGroup,
} from "@/lib/mocks/runner";
import { msqInstruction, toggleTick } from "@/lib/questions/msq";
import { formatTimeLeft } from "@/lib/mocks/startPage";
import { displayMockTitle } from "@/lib/mocks/hub";
import LanguageSwitch from "@/components/i18n/LanguageSwitch";
import { hasMarathi, optionVersions, stemVersions } from "@/lib/i18n/bilingual";
import { useQuestionLang } from "@/lib/i18n/useQuestionLang";
import type { RunnerState, SavedAnswer } from "@/lib/mocks/service";
import type { OptionLabel } from "@/lib/mocks/answers";

type Answers = Record<string, SavedAnswer>;

/** A visited-but-unanswered row. Both response columns null — see answers.ts. */
const EMPTY_ROW: SavedAnswer = {
  selectedLabel: null,
  numericResponse: null,
  selectedLabels: null,
  isFlagged: false,
  timeSpentSecs: 0,
};

/**
 * What may be TYPED into a numeric (JEE Section-B) box, as opposed to what may
 * be SAVED. It deliberately admits partial values — "", "-", "1." — because a
 * student types through those on the way to "-1.5", and rejecting a keystroke
 * mid-number makes the field feel broken. Only a value that parses finite is
 * ever sent to the server.
 */
const NUMERIC_DRAFT_RE = /^-?\d*\.?\d*$/;

/** How often answers that failed to save are sent again. */
const RETRY_MS = 8000;

const FLAGGED_STYLE =
  "bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700";
const PALETTE_STYLE: Record<PaletteState, string> = {
  not_visited: "bg-muted text-muted-foreground border-transparent",
  not_answered: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
  answered: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  // Amber like any marked question, with a green tick (PaletteCell) that says it has an answer.
  answered_flagged: FLAGGED_STYLE,
  flagged: FLAGGED_STYLE,
};

/** Spoken with the question number, so the grid makes sense without colour. */
const STATE_WORDS: Record<PaletteState, string> = {
  not_visited: "not visited",
  not_answered: "not answered",
  answered: "answered",
  answered_flagged: "answered and marked for review",
  flagged: "marked for review, no answer",
};

const LEGEND: { state: PaletteState; label: string }[] = [
  { state: "answered", label: "Answered" },
  { state: "answered_flagged", label: "Answered & marked" },
  { state: "flagged", label: "Marked, no answer" },
  { state: "not_answered", label: "Not answered" },
  { state: "not_visited", label: "Not visited" },
];

function fmtClock(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}


function isTextField(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
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
  // A bilingual paper (MPSC prints Marathi + English) offers the same language
  // choice the student made on the instructions screen, switchable any time —
  // the printed booklet lets them read either version whenever they like.
  const [langPref, setLangPref] = useQuestionLang();
  const paperBilingual = useMemo(() => questions.some((x) => hasMarathi(x)), [questions]);
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState(() => remainingSecs(attempt.expiresAt, Date.now()));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // Raw text per numeric question, so a half-typed "-" or "1." survives a
  // re-render without being parsed into a saved answer.
  const [numericDrafts, setNumericDrafts] = useState<Record<string, string>>({});
  // How many questions have an answer the server has not stored yet.
  const [unsaved, setUnsaved] = useState(0);

  const submittedRef = useRef(false);
  const enteredAtRef = useRef(Date.now());
  const prevRemainingRef = useRef(remaining);
  const trackerRef = useRef<SaveTracker<SavedAnswer>>(emptySaveTracker());
  const seqRef = useRef(0);
  // saveRow needs to submit on expiry, and submitAttempt needs saveRow.
  const submitRef = useRef<(reason: "manual" | "expired") => Promise<void>>(async () => {});
  const q = questions[current];

  const groups = useMemo(() => groupBySection(questions, mock.sections), [questions, mock.sections]);
  const sectionLabel = useMemo(() => {
    if (groups.length < 2) return null;
    const g = groups.find((x) => x.indices.includes(current));
    return g?.label ?? null;
  }, [groups, current]);

  const rowFor = useCallback(
    (qid: string): SavedAnswer => answers[qid] ?? EMPTY_ROW,
    [answers]
  );

  const setTracker = useCallback((t: SaveTracker<SavedAnswer>) => {
    trackerRef.current = t;
    setUnsaved(Object.keys(t.failed).length);
  }, []);

  /**
   * Persist one question's full triple. Never blocks the student: a failure is
   * recorded (the header then says "Not saved") and the answer is sent again
   * by the retry loop below, unless a newer answer for it is saved first.
   */
  const saveRow = useCallback(
    async (qid: string, row: SavedAnswer): Promise<boolean> => {
      const seq = ++seqRef.current;
      setTracker(beginSave(trackerRef.current, qid, seq));
      try {
        const res = await fetch(`/api/mock/attempt/${attempt.id}/answer`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: qid,
            selectedLabel: row.selectedLabel,
            numericResponse: row.numericResponse,
            selectedLabels: row.selectedLabels ?? null,
            isFlagged: row.isFlagged,
            timeSpentSecs: row.timeSpentSecs,
          }),
        });
        if (!res.ok) throw new Error(`save ${res.status}`);
        const data = await res.json().catch(() => ({}));
        setTracker(succeedSave(trackerRef.current, qid, seq));
        if (data?.expired) void submitRef.current("expired");
        return true;
      } catch {
        setTracker(failSave(trackerRef.current, qid, seq, row));
        return false;
      }
    },
    [attempt.id, setTracker]
  );

  /** Send every unsaved answer again; true when all of them went through. */
  const retryUnsaved = useCallback(async () => {
    const pending = Object.entries(trackerRef.current.failed);
    if (pending.length === 0) return true;
    const results = await Promise.all(pending.map(([qid, row]) => saveRow(qid, row)));
    return results.every(Boolean);
  }, [saveRow]);

  useEffect(() => {
    const t = setInterval(() => void retryUnsaved(), RETRY_MS);
    const onOnline = () => void retryUnsaved();
    window.addEventListener("online", onOnline);
    return () => {
      clearInterval(t);
      window.removeEventListener("online", onOnline);
    };
  }, [retryUnsaved]);

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
      // Flush the current question's dwell + state, and anything that failed
      // to save, before grading.
      const qid = questions[current]?.questionId;
      if (qid) {
        const row = commitDwell(qid);
        setAnswers((a) => ({ ...a, [qid]: row }));
        await saveRow(qid, row);
      }
      await retryUnsaved();
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
    [attempt.id, current, questions, commitDwell, saveRow, retryUnsaved, router]
  );
  useEffect(() => {
    submitRef.current = submitAttempt;
  }, [submitAttempt]);

  // Countdown — derived from the server expiry each tick (refresh-resistant).
  // Warns at 10, 5 and 1 minute; auto-submits at zero.
  useEffect(() => {
    const t = setInterval(() => {
      const left = remainingSecs(attempt.expiresAt, Date.now());
      const warn = crossedTimeWarning(prevRemainingRef.current, left);
      prevRemainingRef.current = left;
      setRemaining(left);
      if (warn !== null) {
        const mins = warn / 60;
        toast.warning(`${mins} ${mins === 1 ? "minute" : "minutes"} left`, {
          description: "The test submits itself at 0:00.",
        });
      }
      if (left <= 0) void submitAttempt("expired");
    }, 1000);
    return () => clearInterval(t);
  }, [attempt.expiresAt, submitAttempt]);

  // Mark the visited question so its palette turns from grey → red/green.
  useEffect(() => {
    enteredAtRef.current = Date.now();
    const qid = questions[current]?.questionId;
    if (qid && !answers[qid]) {
      setAnswers((a) => ({ ...a, [qid]: EMPTY_ROW }));
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
      // The phone layout scrolls; a new question starts at its top.
      window.scrollTo({ top: 0 });
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

  const summary = useMemo(() => submitSummary(questions, answers, mock.sections), [answers, questions, mock.sections]);

  const row = rowFor(q.questionId);
  const isMsq = q.format === "msq";

  const toggleFlag = useCallback(() => update({ isFlagged: !row.isFlagged }), [update, row.isFlagged]);
  const pick = useCallback(
    (label: string) =>
      isMsq
        ? update({ selectedLabels: toggleTick(row.selectedLabels ?? null, label as OptionLabel) })
        : update({ selectedLabel: label as OptionLabel }),
    [isMsq, row.selectedLabels, update]
  );

  // Keyboard: A–D pick, ← → move, M marks. Off while a panel is open or the
  // student types in an answer box (runnerKeyAction).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || paletteOpen || confirmOpen || zoomSrc || submitting) return;
      const action = runnerKeyAction(
        { key: e.key, hasModifier: e.ctrlKey || e.metaKey || e.altKey, inTextField: isTextField(e.target) },
        q.format === "numeric" ? [] : q.options.map((o) => o.label)
      );
      if (!action) return;
      e.preventDefault();
      if (action.type === "prev") goTo(current - 1);
      else if (action.type === "next") goTo(current + 1);
      else if (action.type === "mark") toggleFlag();
      else pick(action.label);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, confirmOpen, zoomSrc, submitting, q, current, goTo, toggleFlag, pick]);

  const low = remaining <= 300; // last 5 minutes
  const warning = !low && remaining <= 600; // last 10

  // The box shows the student's in-progress text when there is one, else the
  // saved value (so a resumed attempt renders what was stored).
  const numericDraft =
    numericDrafts[q.questionId] ??
    (row.numericResponse === null ? "" : String(row.numericResponse));

  const onNumericChange = (raw: string) => {
    // Reject an illegal keystroke by ignoring it, keeping what was typed.
    if (!NUMERIC_DRAFT_RE.test(raw)) return;
    setNumericDrafts((d) => ({ ...d, [q.questionId]: raw }));
    const trimmed = raw.trim();
    if (trimmed === "") {
      update({ numericResponse: null });
      return;
    }
    const parsed = Number(trimmed);
    // A partial value ("-", "1.") is held as a draft and NOT saved: writing NaN
    // would be a constraint error, and writing null would erase a real answer
    // the moment the student typed a decimal point after it.
    if (Number.isFinite(parsed)) update({ numericResponse: parsed });
  };

  const isFirst = current === 0;
  const isLast = current === questions.length - 1;

  return (
    <div className="flex min-h-screen flex-col">
      {/*
        The runner renders no AppHeader, so no phone tab bar — but globals.css
        pads the body for that bar by default (it fails safe that way). This
        marker switches the padding off, because min-h-screen plus 56px of
        padding would add real scroll to a page someone is sitting an exam on.
      */}
      <div data-no-tabbar-pad hidden aria-hidden />
      {/* Timer + submit bar */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{displayMockTitle(mock.title)}</p>
          </div>
          <SaveStatus unsaved={unsaved} />
          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-sm tabular-nums",
              low
                ? "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                : warning
                  ? "border-amber-400 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                  : "bg-muted"
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
            className="h-11 w-11 px-0 lg:hidden"
            onClick={() => setPaletteOpen(true)}
            aria-label={`Question grid: ${summary.answeredTotal} of ${questions.length} answered`}
          >
            <LayoutGrid className="h-4 w-4" aria-hidden />
          </Button>
          <Button
            variant="brand"
            size="sm"
            className="h-11 lg:h-9"
            onClick={() => setConfirmOpen(true)}
            disabled={submitting}
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Submit
          </Button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-3 pb-24 pt-5 sm:px-6 lg:pb-5">
        {/* Question column */}
        <main className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h1 className="text-sm font-semibold text-muted-foreground">
              {sectionLabel && <span className="text-foreground">{sectionLabel} · </span>}
              Question {q.position} <span className="font-normal">of {mock.totalQuestions}</span>
            </h1>
            <span className="font-mono text-xs text-muted-foreground">
              +{q.marks} / {q.negMarks}
            </span>
          </div>
          {paperBilingual && (
            <div className="mt-2 flex justify-end">
              <LanguageSwitch value={langPref} onChange={setLangPref} />
            </div>
          )}

          <div className="mt-3 rounded-lg border bg-card p-4 sm:p-5">
            {stemVersions(q, langPref)
              .filter((v) => v.context)
              .map((v) => (
                <div
                  key={`ctx-${v.lang}`}
                  lang={v.lang}
                  className="mb-3 border-l-2 border-muted pl-3 font-serif text-sm italic text-muted-foreground"
                >
                  <BlockText text={v.context!} />
                </div>
              ))}
            <div className="space-y-3 font-serif text-[15px] leading-relaxed [&_.katex]:max-w-full">
              {stemVersions(q, langPref).map((v, i) => (
                <div key={v.lang} lang={v.lang} className={cn(i > 0 && "border-t border-dashed pt-3")}>
                  <BlockText text={v.text} />
                </div>
              ))}
            </div>
            {q.imageUrl && (
              <ZoomableImage
                src={publicImageUrl(supabaseUrl, q.imageUrl)}
                alt="Question diagram"
                className="max-h-72"
                onZoom={setZoomSrc}
              />
            )}

            {q.format === "numeric" ? (
              <div className="mt-4">
                <label
                  htmlFor="numeric-answer"
                  className="block text-sm font-medium text-foreground"
                >
                  Your answer
                </label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Section B: type the value. There are no options for this
                  question.
                </p>
                <input
                  id="numeric-answer"
                  // "text" with an explicit inputMode, not type="number": a
                  // number input silently discards a value the browser deems
                  // invalid mid-typing and swallows scroll-wheel changes over
                  // the field, both of which lose a student's answer in a timed
                  // exam.
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={numericDraft}
                  onChange={(e) => onNumericChange(e.target.value)}
                  placeholder="e.g. 17280"
                  className="mt-2 w-full max-w-xs rounded-md border bg-background px-3 py-2 font-mono text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
                />
              </div>
            ) : (
            <>
            {isMsq && (
              <p className="mt-4 text-xs text-muted-foreground">
                {msqInstruction(q.msqScheme ?? "exact", q.marks, q.negMarks)}
              </p>
            )}
            <ol className={cn(isMsq ? "mt-2" : "mt-4", "space-y-2")}>
              {q.options.map((opt) => {
                const selected = isMsq ? (row.selectedLabels ?? []).includes(opt.label) : row.selectedLabel === opt.label;
                return (
                  <li key={opt.label}>
                    <button
                      type="button"
                      onClick={() => pick(opt.label)}
                      {...(isMsq ? { role: "checkbox", "aria-checked": selected } : { "aria-pressed": selected })}
                      className={cn(
                        "flex min-h-[44px] w-full items-start gap-3 rounded-md border p-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                        selected
                          ? "border-brand-accent bg-brand-accent/10 ring-1 ring-brand-accent"
                          : "bg-background hover:bg-accent/40"
                      )}
                    >
                      <span
                        className={cn(
                          // A square box for "tick any number", a circle for "pick one".
                          "inline-flex h-7 w-7 shrink-0 items-center justify-center text-xs font-bold",
                          isMsq ? "rounded-md" : "rounded-full",
                          selected ? "bg-brand text-brand-foreground" : "bg-muted text-foreground"
                        )}
                      >
                        {opt.label}
                      </span>
                      <div className="min-w-0 flex-1 overflow-x-auto font-serif [&_.katex]:max-w-full">
                        {optionVersions(q, opt, langPref).map((v, i) => (
                          <div key={v.lang} lang={v.lang} className={cn(i > 0 && "text-xs text-muted-foreground")}>
                            <KatexRenderer text={v.text} />
                          </div>
                        ))}
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
            </>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3">
              {/* On a phone, Mark lives in the bottom bar. */}
              <Button
                variant={row.isFlagged ? "secondary" : "outline"}
                size="sm"
                className="hidden lg:inline-flex"
                onClick={toggleFlag}
                aria-pressed={row.isFlagged}
              >
                <Flag className={cn("h-3.5 w-3.5", row.isFlagged && "fill-current")} aria-hidden />
                {row.isFlagged ? "Unmark" : "Mark for review"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-11 lg:h-9"
                onClick={() => {
                  setNumericDrafts((d) => ({ ...d, [q.questionId]: "" }));
                  update({ selectedLabel: null, numericResponse: null, selectedLabels: null });
                }}
                disabled={row.selectedLabel === null && row.numericResponse === null && !row.selectedLabels?.length}
              >
                <Eraser className="h-3.5 w-3.5" aria-hidden />
                Clear answer
              </Button>
              {q.format !== "numeric" && (
                <p className="ml-auto hidden text-xs text-muted-foreground lg:block">
                  Keys: <Kbd>A</Kbd>–<Kbd>{q.options[q.options.length - 1]?.label ?? "D"}</Kbd> pick ·{" "}
                  <Kbd>←</Kbd> <Kbd>→</Kbd> move · <Kbd>M</Kbd> mark
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 hidden items-center justify-between lg:flex">
            <Button variant="outline" onClick={() => goTo(current - 1)} disabled={isFirst}>
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Previous
            </Button>
            <Button variant="outline" onClick={() => goTo(current + 1)} disabled={isLast}>
              Next
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </main>

        {/* Desktop: the grid as a sidebar. */}
        <aside className="hidden w-72 shrink-0 lg:block" aria-label="Question grid">
          <div className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-lg border bg-card p-4">
            <PaletteGrid
              groups={groups}
              questions={questions}
              answers={answers}
              current={current}
              counts={summary.counts}
              bySection={summary.bySection}
              onJump={goTo}
              cellClass="h-9"
              cols="grid-cols-6"
              legendCols="grid-cols-1"
            />
          </div>
        </aside>
      </div>

      {/* Phone and tablet: Previous · Mark · Next always on screen. */}
      <nav
        aria-label="Question navigation"
        className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 px-3 pt-2.5 backdrop-blur lg:hidden"
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto grid max-w-2xl grid-cols-3 gap-2">
          <Button variant="outline" className="h-11" onClick={() => goTo(current - 1)} disabled={isFirst}>
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Previous
          </Button>
          <Button
            variant={row.isFlagged ? "secondary" : "outline"}
            className="h-11"
            onClick={toggleFlag}
            aria-pressed={row.isFlagged}
            aria-label={row.isFlagged ? "Unmark this question" : "Mark this question for review"}
          >
            <Flag className={cn("h-4 w-4", row.isFlagged && "fill-current")} aria-hidden />
            {row.isFlagged ? "Unmark" : "Mark"}
          </Button>
          <Button variant="brand" className="h-11" onClick={() => goTo(current + 1)} disabled={isLast}>
            Next
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </nav>

      {/* Phone and tablet: the grid as a panel (Escape closes, focus stays inside). */}
      <Sheet open={paletteOpen} onOpenChange={setPaletteOpen}>
        <SheetContent
          side="right"
          className="w-[340px] max-w-[88vw] overflow-y-auto p-4"
          closeClassName="right-2 top-2 inline-flex h-11 w-11 items-center justify-center"
        >
          <SheetTitle className="mb-3 pr-12 text-base">Questions</SheetTitle>
          <PaletteGrid
            groups={groups}
            questions={questions}
            answers={answers}
            current={current}
            counts={summary.counts}
            bySection={summary.bySection}
            onJump={goTo}
            cellClass="h-11"
            cols="grid-cols-5"
            legendCols="grid-cols-2"
          />
        </SheetContent>
      </Sheet>

      <SubmitConfirm
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        remaining={remaining}
        summary={summary}
        unsaved={unsaved}
        submitting={submitting}
        onSubmit={() => {
          setConfirmOpen(false);
          void submitAttempt("manual");
        }}
      />

      <Dialog open={zoomSrc !== null} onOpenChange={(o) => !o && setZoomSrc(null)}>
        <DialogContent className="max-h-[92vh] max-w-[96vw] overflow-auto p-3 sm:max-w-4xl">
          <DialogTitle className="sr-only">Figure, enlarged</DialogTitle>
          {zoomSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={zoomSrc} alt="Question diagram, enlarged" className="mx-auto h-auto w-full max-w-none rounded" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/** "Saved" tick, or "Not saved yet · retrying" while any answer has not reached the server. */
function SaveStatus({ unsaved }: { unsaved: number }) {
  if (unsaved === 0) {
    return (
      <span className="inline-flex shrink-0 items-center text-emerald-600 dark:text-emerald-400" title="All answers saved">
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        <span className="sr-only">All answers saved</span>
      </span>
    );
  }
  return (
    <span
      role="status"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
    >
      <CloudOff className="h-3.5 w-3.5" aria-hidden />
      <span className="sm:hidden">Not saved</span>
      <span className="hidden sm:inline">Not saved yet · retrying</span>
    </span>
  );
}

function ZoomableImage({
  src,
  alt,
  className,
  onZoom,
}: {
  src: string;
  alt: string;
  className?: string;
  onZoom: (src: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onZoom(src)}
      aria-label="Enlarge the figure"
      className="group relative mt-4 block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={cn("w-auto rounded border", className)} />
      <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 rounded bg-background/90 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground shadow-sm">
        <Maximize2 className="h-3 w-3" aria-hidden />
        Enlarge
      </span>
    </button>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rounded border bg-muted px-1.5 font-mono text-[11px] text-foreground">{children}</kbd>;
}

function PaletteGrid({
  groups,
  questions,
  answers,
  current,
  counts,
  bySection,
  onJump,
  cellClass,
  cols,
  legendCols,
}: {
  groups: SectionGroup[];
  questions: RunnerState["questions"];
  answers: Answers;
  current: number;
  counts: Record<PaletteState, number>;
  bySection: { key: string; answered: number; total: number }[];
  onJump: (i: number) => void;
  cellClass: string;
  cols: string;
  /** The legend's columns: one in the narrow desktop sidebar, two in the phone panel. */
  legendCols: string;
}) {
  const multi = groups.length > 1;
  return (
    <>
      <ul className={cn("mb-4 grid gap-x-3 gap-y-1 text-xs text-muted-foreground", legendCols)}>
        {LEGEND.map((l) => (
          <li key={l.state} className="flex items-center gap-1.5">
            <span className={cn("relative inline-block h-3 w-3 shrink-0 rounded-sm border", PALETTE_STYLE[l.state])} aria-hidden>
              {l.state === "answered_flagged" && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-600" />
              )}
            </span>
            <span>
              {l.label} · <span className="tabular-nums">{counts[l.state]}</span>
            </span>
          </li>
        ))}
      </ul>
      {groups.map((g) => {
        const sec = bySection.find((s) => s.key === g.key);
        return (
          <section key={g.key} className="mb-4 last:mb-0" aria-label={multi ? g.label : "Questions"}>
            {multi && (
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <h3 className="min-w-0 text-sm font-semibold">
                  {g.label}{" "}
                  <span className="whitespace-nowrap font-normal text-muted-foreground">
                    · Q{g.first}–{g.last}
                  </span>
                </h3>
                {sec && (
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {sec.answered} of {sec.total}
                  </span>
                )}
              </div>
            )}
            <div className={cn("grid gap-1.5", cols)}>
              {g.indices.map((i) => {
                const item = questions[i];
                const st = paletteState(answers[item.questionId]);
                return (
                  <button
                    key={item.questionId}
                    type="button"
                    onClick={() => onJump(i)}
                    aria-label={`Question ${item.position}, ${STATE_WORDS[st]}`}
                    aria-current={i === current ? "step" : undefined}
                    className={cn(
                      "relative flex items-center justify-center rounded border text-xs font-medium tabular-nums transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      cellClass,
                      PALETTE_STYLE[st],
                      i === current && "ring-2 ring-brand-accent ring-offset-1"
                    )}
                  >
                    {item.position}
                    {st === "answered_flagged" && (
                      <span
                        className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-600 text-white"
                        aria-hidden
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}

function SubmitConfirm({
  open,
  onOpenChange,
  remaining,
  summary,
  unsaved,
  submitting,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  remaining: number;
  summary: ReturnType<typeof submitSummary>;
  unsaved: number;
  submitting: boolean;
  onSubmit: () => void;
}) {
  const rows: { state: PaletteState; label: string; value: number }[] = [
    { state: "answered", label: "Answered", value: summary.answeredTotal },
    { state: "flagged", label: "Marked, no answer", value: summary.counts.flagged },
    { state: "not_answered", label: "Not answered", value: summary.counts.not_answered },
    { state: "not_visited", label: "Not visited", value: summary.counts.not_visited },
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        // A bottom sheet on a phone, a centred box from sm up.
        className="bottom-0 top-auto translate-y-0 rounded-t-2xl p-5 sm:bottom-auto sm:top-[50%] sm:max-w-md sm:translate-y-[-50%] sm:rounded-lg"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div>
          <DialogTitle className="text-lg font-bold">Submit the test?</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            {remaining > 0 ? (
              <>
                <strong className="text-foreground">{formatTimeLeft(remaining)}</strong> is still on the clock. Once you submit,
                you can&apos;t change an answer.
              </>
            ) : (
              "Time is up."
            )}
          </DialogDescription>
        </div>
        <dl className="divide-y rounded-lg border text-sm">
          {rows.map((r) => (
            <div key={r.state} className="flex items-center justify-between px-3 py-2">
              <dt className="flex items-center gap-2">
                <span className={cn("inline-block h-3 w-3 rounded-sm border", PALETTE_STYLE[r.state])} aria-hidden />
                {r.label}
              </dt>
              <dd className="font-semibold tabular-nums">{r.value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-muted-foreground">
          {summary.bySection.length > 1 &&
            summary.bySection.map((s) => `${s.label} ${s.answered} of ${s.total}`).join(" · ") + " answered. "}
          {summary.counts.answered_flagged > 0 && "Answers you marked for review are counted."}
        </p>
        {unsaved > 0 && (
          <p className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 p-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            {unsaved === 1 ? "1 answer has" : `${unsaved} answers have`} not saved yet. Submitting tries again first.
          </p>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 border-2 border-foreground/80" onClick={() => onOpenChange(false)}>
            Back to the test
          </Button>
          <Button variant="brand" className="h-11" onClick={onSubmit} disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Submit now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
