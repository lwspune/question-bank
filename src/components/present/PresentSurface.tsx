"use client";

import { formatNumericKey } from "@/lib/questions/formatKey";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  X,
} from "lucide-react";
import BlockText from "@/components/math/BlockText";
import KatexRenderer from "@/components/math/KatexRenderer";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import SolutionViews from "@/components/visuals/SolutionViews";
import SelfMarkButtons from "@/components/reveal/SelfMarkButtons";
import RevealSignInPrompt from "@/components/reveal/RevealSignInPrompt";
import { RevealDailyPrompt } from "@/components/reveal/RevealDailyLimit";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { cn } from "@/lib/utils";
import { optionMark } from "@/lib/questions/optionMark";
import { msqOptionMark, msqVerdict, msqVerdictLine } from "@/lib/questions/msq";
import type { PresentableQuestion } from "@/lib/present/viewModel";
import { deckSelfMarkSurface, type DeckMode, type DeckSurface } from "@/lib/present/deck";
import {
  PRESENT_SIZE_KEY,
  readPresentSize,
  stepPresentSize,
} from "@/lib/present/textSize";
import { useDeckAnswer, type DeckAnswer } from "./useDeckAnswer";

/**
 * One question full-screen: the classroom projector for staff, a deck of
 * flashcards for everyone else (2026-11-09, lib/present/deck).
 *
 * ON A BOARD (sm and up) the question is pinned to the TOP and everything
 * below it is deliberately EMPTY. The empty part is the feature: a teacher
 * writes the working out with the board's own pen over whatever is on screen,
 * so the question block is capped at a share of the viewport and the rest is
 * blank. A long passage scrolls INSIDE its own block rather than pushing the
 * working space off screen.
 *
 * ON A PHONE there is no pen and no room for a blank half: the question and
 * its answer scroll as one column, the text-size and full-screen controls go
 * (the phone has its own), and the arrows and Show answer sit in a bar at the
 * bottom where a thumb reaches. Close and the card count stay at the top.
 *
 * HOW A CARD IS ANSWERED (owner): an MCQ by tapping an option, never Show
 * answer; a multiple-select by ticking and Check; a written or numeric
 * question by Show answer, a written one then asking "Did you know it?".
 * Staff keep Show answer on everything.
 */
export default function PresentSurface({
  question,
  siblings,
  supabaseUrl,
  onNavigate,
  mode,
  surface,
}: {
  question: PresentableQuestion;
  /** The other questions on the same page, for ← / → stepping. */
  siblings?: PresentableQuestion[];
  supabaseUrl: string;
  onNavigate?: (next: PresentableQuestion) => void;
  mode: DeckMode;
  /** The page the deck was opened from: which counter an answer spends. */
  surface: DeckSurface;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const [sizePx, setSizePx] = useState(() => readPresentSize(null));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const deck = useDeckAnswer(question, mode, surface);

  // Restore the persisted size after mount. Read here rather than in the
  // initialiser so the first client render matches the server HTML.
  useEffect(() => {
    try {
      setSizePx(readPresentSize(localStorage.getItem(PRESENT_SIZE_KEY)));
    } catch {
      /* private mode / storage disabled — the default is fine */
    }
  }, []);

  function resize(direction: 1 | -1) {
    setSizePx((px) => {
      const next = stepPresentSize(px, direction);
      try {
        localStorage.setItem(PRESENT_SIZE_KEY, String(next));
      } catch {
        /* not persisting is not a reason to refuse the resize */
      }
      return next;
    });
  }

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      // Leaving the overlay while still fullscreen would strand the whole
      // browser there, with the page behind it and no obvious way back.
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    };
  }, []);

  // On a phone the answer opens below the question in the same scroll: bring
  // it into view. On a board it has its own strip and is already on screen.
  useEffect(() => {
    if (!deck.shown) return;
    if (typeof window === "undefined" || !window.matchMedia?.("(max-width: 639px)").matches) return;
    answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [deck.shown, question.key]);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await rootRef.current?.requestFullscreen?.();
      }
    } catch {
      // iOS Safari refuses requestFullscreen on a non-video element. The
      // overlay already fills the viewport, so this is a bonus, not a
      // requirement — swallow it rather than show an error on a projector.
    }
  }

  const index = siblings?.findIndex((q) => q.key === question.key) ?? -1;
  const canStep = !!siblings && !!onNavigate && index >= 0;
  const prev = canStep && index > 0 ? siblings![index - 1] : null;
  const next = canStep && index < siblings!.length - 1 ? siblings![index + 1] : null;

  const step = useCallback(
    (target: PresentableQuestion | null) => {
      if (target && onNavigate) onNavigate(target);
    },
    [onNavigate]
  );

  // Arrow keys step through the list. Radix already owns Escape.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") step(prev);
      if (e.key === "ArrowRight") step(next);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [prev, next, step]);

  const answer = question.answer;
  const selfMarkSurface = deckSelfMarkSurface(
    { format: question.format, hasSolution: Boolean(answer?.solution) },
    mode,
    surface
  );
  const primary = primaryAction(deck, mode, Boolean(answer));
  // The board's text size applies from sm up; a phone reads at a phone's size.
  const sizeStyle = { "--deck-size": `${sizePx}px` } as CSSProperties;

  return (
    <div ref={rootRef} className="flex h-full w-full flex-col overflow-hidden bg-background">
      {/* Radix requires a title for the dialog's accessible name. The surface
          has no room for a heading, so it is screen-reader only. */}
      <DialogTitle className="sr-only">
        {mode === "teach"
          ? question.breadcrumb
            ? `Projecting: ${question.breadcrumb}`
            : "Projected question"
          : question.breadcrumb
            ? `Flashcard: ${question.breadcrumb}`
            : "Flashcard"}
      </DialogTitle>

      <div className="flex shrink-0 items-center gap-1 border-b px-3 py-2 sm:gap-2 sm:px-4">
        <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground sm:text-sm">
          {question.breadcrumb}
        </p>

        {canStep && (
          <span className="shrink-0 whitespace-nowrap px-1 font-mono text-xs text-muted-foreground">
            {index + 1} / {siblings!.length}
          </span>
        )}

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <ControlButton onClick={() => step(prev)} disabled={!prev} label="Previous question" hidden={!canStep}>
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </ControlButton>
          <ControlButton onClick={() => step(next)} disabled={!next} label="Next question" hidden={!canStep}>
            <ChevronRight className="h-5 w-5" aria-hidden />
          </ControlButton>

          <ControlButton onClick={() => resize(-1)} label="Decrease text size">
            <Minus className="h-4 w-4" aria-hidden />
          </ControlButton>
          <span className="shrink-0 select-none text-sm font-semibold text-muted-foreground" aria-hidden>
            A
          </span>
          <ControlButton onClick={() => resize(1)} label="Increase text size">
            <Plus className="h-4 w-4" aria-hidden />
          </ControlButton>

          <ControlButton onClick={toggleFullscreen} label={isFullscreen ? "Exit full screen" : "Full screen"}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" aria-hidden /> : <Maximize2 className="h-4 w-4" aria-hidden />}
          </ControlButton>

          {primary}
        </div>

        <DialogClose
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={mode === "teach" ? "Close projection" : "Close flashcards"}
        >
          <X className="h-5 w-5" aria-hidden />
        </DialogClose>
      </div>

      {/* Phone: one scrolling column. Board: question capped at the top, blank
          working space, answer strip at the bottom. */}
      <div className="min-h-0 flex-1 overflow-y-auto sm:flex sm:flex-col sm:overflow-hidden">
        {/* THE QUESTION. `font-serif` matches question content everywhere else;
            `em` sizing below inherits from here, which is also what makes KaTeX
            scale with the A− / A+ control. On a board it may shrink (min-h-0)
            below its cap and scroll inside, so a revealed answer is never
            clipped by the container. */}
        <div
          className="border-b px-5 py-4 font-serif text-lg sm:min-h-0 sm:max-h-[58%] sm:overflow-auto sm:px-8 sm:py-6 sm:text-[length:var(--deck-size)]"
          style={sizeStyle}
        >
          {question.context && (
            <div className="mb-3 border-l-4 border-muted pl-4 text-[0.82em] leading-relaxed text-muted-foreground">
              <BlockText text={question.context} />
            </div>
          )}

          <div className="leading-relaxed">
            <BlockText text={question.text} />
          </div>

          {question.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={publicImageUrl(supabaseUrl, question.imageUrl)}
              alt="Question diagram"
              className="mt-4 max-h-[30vh] w-auto max-w-full rounded border bg-white"
            />
          )}

          {question.options.length > 0 && (
            <Options question={question} deck={deck} supabaseUrl={supabaseUrl} />
          )}

          {deck.wall && !deck.shown && (
            <div className="mt-4 font-sans text-base">
              {deck.wall === "daily" ? (
                <RevealDailyPrompt key={deck.wallTaps} surface={deck.wallSurface} />
              ) : (
                <RevealSignInPrompt key={deck.wallTaps} surface={deck.wallSurface} />
              )}
            </div>
          )}
        </div>

        {/* THE WORKING SPACE, on a board only. Intentionally empty — the
            board's pen draws here. */}
        <div className="hidden sm:block sm:min-h-0 sm:flex-1" aria-hidden />

        {deck.shown && (answer || selfMarkSurface) && (
          <div
            ref={answerRef}
            className="scroll-mt-2 border-t bg-muted/40 px-5 py-4 sm:max-h-[42%] sm:shrink-0 sm:overflow-auto sm:px-8"
          >
            {answer && (
              <AnswerBody question={question} deck={deck} supabaseUrl={supabaseUrl} />
            )}
            {selfMarkSurface && (
              <div className="mt-4 border-t pt-3">
                <p className="mb-2 font-sans text-sm font-semibold">Did you know it?</p>
                <SelfMarkButtons questionId={question.questionId} surface={selfMarkSurface} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Phone only: the arrows and the card's one action, within thumb reach. */}
      {(canStep || primary) && (
        <div className="flex shrink-0 items-center gap-2 border-t px-3 py-2 sm:hidden">
          {canStep && (
            <ControlButton onClick={() => step(prev)} disabled={!prev} label="Previous question" large>
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </ControlButton>
          )}
          <div className="flex min-w-0 flex-1 justify-center">{primaryAction(deck, mode, Boolean(answer), true)}</div>
          {canStep && (
            <ControlButton onClick={() => step(next)} disabled={!next} label="Next question" large>
              <ChevronRight className="h-6 w-6" aria-hidden />
            </ControlButton>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * The card's one button: Show answer (or Show / Hide for a teacher) where a
 * question has no options to tap, Check answer for a multiple-select. Null for
 * an MCQ: the options are the controls.
 */
function primaryAction(deck: DeckAnswer, mode: DeckMode, hasAnswer: boolean, large = false): ReactNode {
  const cls = cn(
    "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    large
      ? "h-11 w-full max-w-xs border-primary bg-primary px-4 text-base text-primary-foreground hover:bg-primary/90"
      : "px-2.5 py-1.5 text-xs hover:bg-accent sm:text-sm"
  );
  if (deck.kind === "ticks" && !deck.shown) {
    return (
      <button type="button" onClick={deck.check} disabled={deck.ticks.length === 0 || deck.pending} className={cls}>
        {deck.pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
        Check answer
      </button>
    );
  }
  if (deck.kind !== "show" || !hasAnswer) return null;
  if (mode === "teach") {
    return (
      <button type="button" onClick={deck.show} className={cls}>
        {deck.shown ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
        {deck.shown ? "Hide answer" : "Show answer"}
      </button>
    );
  }
  if (deck.shown) return null;
  return (
    <button type="button" onClick={deck.show} disabled={deck.pending} className={cls}>
      {deck.pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
      Show answer
    </button>
  );
}

const OPTION_TINT = {
  correct: "border-emerald-500/60 bg-emerald-100 dark:bg-emerald-950/50",
  wrong: "border-red-500/60 bg-red-50 dark:bg-red-950/40",
  none: "",
} as const;

function Options({
  question,
  deck,
  supabaseUrl,
}: {
  question: PresentableQuestion;
  deck: DeckAnswer;
  supabaseUrl: string;
}) {
  const answer = question.answer;
  const correctLabels = question.options.filter((o) => o.isCorrect).map((o) => o.label);
  const tappable = (deck.kind === "pick" || (deck.kind === "ticks" && !deck.shown)) && !deck.pending;

  return (
    <ul className="mt-4 grid list-none grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
      {question.options.map((o) => {
        let tint: keyof typeof OPTION_TINT = "none";
        let pressed: boolean | undefined;
        if (deck.kind === "pick") {
          tint = optionMark({ revealed: deck.shown, picked: deck.picked === o.label, isCorrect: o.isCorrect });
        } else if (deck.kind === "ticks") {
          pressed = deck.ticks.includes(o.label);
          const m = msqOptionMark({ checked: deck.shown, ticked: pressed, isCorrect: o.isCorrect });
          tint = m === "right" || m === "missed" ? "correct" : m === "wrong" ? "wrong" : "none";
        } else if (
          deck.shown &&
          (answer?.correctLabel === o.label || Boolean(answer?.correctLabels?.includes(o.label)))
        ) {
          tint = "correct";
        }

        const label = (
          <span
            className={cn(
              "shrink-0 font-sans font-semibold",
              tint === "correct"
                ? "text-emerald-700 dark:text-emerald-400"
                : tint === "wrong"
                  ? "text-red-700 dark:text-red-400"
                  : "text-muted-foreground"
            )}
          >
            ({o.label.toLowerCase()})
          </span>
        );
        const body = (
          <span className="min-w-0">
            {/* Options never carry a pipe-table — same contract as the bank
                card and the mock review. */}
            <KatexRenderer text={o.text} />
            {o.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={publicImageUrl(supabaseUrl, o.imageUrl)}
                alt={`Option ${o.label}`}
                className="mt-1 max-h-[18vh] w-auto max-w-full rounded border bg-white"
              />
            )}
          </span>
        );

        if (deck.kind === "show") {
          return (
            <li
              key={o.label}
              className={cn("flex items-start gap-2 rounded-md px-2 py-1 transition-colors", OPTION_TINT[tint])}
            >
              {label}
              {body}
            </li>
          );
        }

        return (
          <li key={o.label}>
            <button
              type="button"
              onClick={() => (deck.kind === "pick" ? deck.pick(o.label) : deck.toggleTick(o.label))}
              disabled={!tappable && !(deck.kind === "pick" && deck.shown)}
              aria-pressed={deck.kind === "ticks" ? pressed : undefined}
              className={cn(
                "flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                tint === "none" && "hover:bg-accent",
                tint === "none" && pressed && "border-brand-accent bg-brand/10",
                OPTION_TINT[tint],
                deck.pending && "cursor-wait"
              )}
            >
              {label}
              {body}
            </button>
          </li>
        );
      })}
      {deck.kind === "ticks" && !deck.shown && (
        <li className="font-sans text-xs text-muted-foreground sm:col-span-2">
          More than one option may be right. Select all that apply.
        </li>
      )}
      {deck.kind === "ticks" && deck.shown && (
        <li role="status" className="font-sans text-sm font-medium sm:col-span-2">
          {msqVerdictLine(msqVerdict(deck.ticks, correctLabels))}
        </li>
      )}
    </ul>
  );
}

function AnswerBody({
  question,
  deck,
  supabaseUrl,
}: {
  question: PresentableQuestion;
  deck: DeckAnswer;
  supabaseUrl: string;
}) {
  const answer = question.answer!;
  const wrongPick =
    deck.kind === "pick" && deck.picked && answer.correctLabel && deck.picked !== answer.correctLabel
      ? deck.picked
      : null;
  const rightPick = deck.kind === "pick" && deck.picked && deck.picked === answer.correctLabel;

  const header = (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="font-sans text-xs font-semibold uppercase tracking-wide text-muted-foreground">Answer</span>
      {answer.correctLabel && (
        <span className="font-sans text-xl font-bold text-emerald-700 dark:text-emerald-400">
          ({answer.correctLabel.toLowerCase()})
        </span>
      )}
      {Boolean(answer.correctLabels?.length) && (
        <span className="font-sans text-xl font-bold text-emerald-700 dark:text-emerald-400">
          {answer.correctLabels!.map((l) => `(${l.toLowerCase()})`).join(", ")}
        </span>
      )}
      {answer.numericAnswer !== null && (
        <span className="font-sans text-xl font-bold text-emerald-700 dark:text-emerald-400">
          {formatNumericKey(answer.numericAnswer, answer.numericAnswerMax ?? null)}
        </span>
      )}
      {!answer.correctLabel && !answer.correctLabels?.length && answer.numericAnswer === null && (
        // Written questions, and the two defect classes the view model refuses
        // to guess at (no correct option, or two).
        <span className="font-sans text-sm text-muted-foreground">See the working below.</span>
      )}
      {rightPick && (
        <span className="inline-flex items-center gap-1 font-sans text-sm font-medium text-emerald-700 dark:text-emerald-400">
          <Check className="h-4 w-4" aria-hidden />
          You got it
        </span>
      )}
      {wrongPick && (
        <span className="inline-flex items-center gap-1 font-sans text-sm font-medium text-red-700 dark:text-red-400">
          <X className="h-4 w-4" aria-hidden />
          You picked ({wrongPick.toLowerCase()})
        </span>
      )}
    </div>
  );

  return (
    <SolutionViews
      visual={question.solutionVisual}
      track={{ questionId: question.questionId, surface: "flashcards" }}
      solution={answer.solution}
      header={header}
      still={
        <>
          {answer.solution && (
            <div className="mt-2 font-serif text-base leading-relaxed">
              {/* BlockText, not KatexRenderer: a solution may carry a GFM
                  pipe-table, and KatexRenderer prints one as raw `| p | q |`. */}
              <BlockText text={answer.solution} solution />
            </div>
          )}
          {answer.solutionImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={publicImageUrl(supabaseUrl, answer.solutionImageUrl)}
              alt="Solution diagram"
              className="mt-3 max-h-[28vh] w-auto max-w-full rounded border bg-white"
            />
          )}
        </>
      }
    />
  );
}

function ControlButton({
  onClick,
  label,
  children,
  disabled,
  hidden,
  large,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  /** The phone's bottom bar: a thumb-sized target with a border. */
  large?: boolean;
}) {
  if (hidden) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
        large ? "h-11 w-11 border" : "h-9 w-9"
      )}
    >
      {children}
    </button>
  );
}
