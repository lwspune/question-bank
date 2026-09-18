"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  X,
} from "lucide-react";
import BlockText from "@/components/math/BlockText";
import KatexRenderer from "@/components/math/KatexRenderer";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { cn } from "@/lib/utils";
import type { PresentableQuestion } from "@/lib/present/viewModel";
import {
  PRESENT_SIZE_KEY,
  readPresentSize,
  stepPresentSize,
} from "@/lib/present/textSize";

/**
 * The projected question itself: a full-viewport surface with the question and
 * its options pinned to the TOP and everything below deliberately EMPTY.
 *
 * The empty part is the feature. A teacher solving a question on a classroom
 * panel writes the working out with the board's own pen, over whatever is on
 * screen — and on a normal page the question card leaves nowhere to write. So
 * the question block is capped at a share of the viewport and the remainder is
 * blank background with nothing in it at all: no watermark, no hint text, no
 * scroll. Anything drawn there is the teacher's.
 *
 * A long passage-based stem scrolls INSIDE its own block rather than pushing the
 * working space off screen, which is why the cap exists rather than letting the
 * block size itself.
 */
export default function PresentSurface({
  question,
  siblings,
  supabaseUrl,
  onNavigate,
}: {
  question: PresentableQuestion;
  /** The other questions projected from the same list, for ← / → stepping. */
  siblings?: PresentableQuestion[];
  supabaseUrl: string;
  onNavigate?: (next: PresentableQuestion) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [sizePx, setSizePx] = useState(() => readPresentSize(null));
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // A new question is a fresh attempt for the room — never carry a revealed
  // answer across a ← / → step.
  useEffect(() => {
    setShowAnswer(false);
  }, [question.key]);

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

  return (
    <div ref={rootRef} className="flex h-full w-full flex-col overflow-hidden bg-background">
      {/* Radix requires a title for the dialog's accessible name. The projected
          surface has no room for a heading, so it is screen-reader only. */}
      <DialogTitle className="sr-only">
        {question.breadcrumb ? `Projecting: ${question.breadcrumb}` : "Projected question"}
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
        <ControlButton
          onClick={() => step(prev)}
          disabled={!prev}
          label="Previous question"
          hidden={!canStep}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </ControlButton>
        <ControlButton
          onClick={() => step(next)}
          disabled={!next}
          label="Next question"
          hidden={!canStep}
        >
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

        <ControlButton
          onClick={toggleFullscreen}
          label={isFullscreen ? "Exit full screen" : "Full screen"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" aria-hidden />
          ) : (
            <Maximize2 className="h-4 w-4" aria-hidden />
          )}
        </ControlButton>

        {answer && (
          <button
            type="button"
            onClick={() => setShowAnswer((v) => !v)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-sm"
          >
            {showAnswer ? (
              <EyeOff className="h-4 w-4" aria-hidden />
            ) : (
              <Eye className="h-4 w-4" aria-hidden />
            )}
            {showAnswer ? "Hide answer" : "Show answer"}
          </button>
        )}

        <DialogClose
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Close projection"
        >
          <X className="h-5 w-5" aria-hidden />
        </DialogClose>
      </div>

      {/* THE QUESTION — pinned at the top, capped so it can never crowd out the
          working space. `font-serif` matches how question content reads
          everywhere else in the product; `em` sizing below inherits from here,
          which is also what makes KaTeX scale with the A− / A+ control. */}
      <div
        // NOT shrink-0. The cap, the answer strip's cap and the control bar sum
        // to more than the viewport, so with both blocks unshrinkable a revealed
        // answer on a long stem would be clipped by the container's
        // overflow-hidden. Letting this block shrink (min-h-0 so it may shrink
        // below its content) makes the answer strip the fixed one and this the
        // one that gives — correct, because it scrolls internally and by the
        // time an answer is up the working-out is over.
        className="min-h-0 overflow-auto border-b px-5 py-4 font-serif sm:px-8 sm:py-6"
        style={{ fontSize: `${sizePx}px`, maxHeight: "58%" }}
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
            className="mt-4 max-h-[30vh] w-auto rounded border bg-white"
          />
        )}

        {question.options.length > 0 && (
          <ul className="mt-4 grid list-none grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
            {question.options.map((o) => {
              const isKey = showAnswer && answer?.correctLabel === o.label;
              return (
                <li
                  key={o.label}
                  className={cn(
                    "flex items-start gap-2 rounded-md px-2 py-1 transition-colors",
                    isKey && "bg-emerald-100 dark:bg-emerald-950/50"
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0 font-sans font-semibold",
                      isKey ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"
                    )}
                  >
                    ({o.label.toLowerCase()})
                  </span>
                  <span className="min-w-0">
                    {/* Options never carry a pipe-table — same contract as the
                        bank card and the mock review. */}
                    <KatexRenderer text={o.text} />
                    {o.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={publicImageUrl(supabaseUrl, o.imageUrl)}
                        alt={`Option ${o.label}`}
                        className="mt-1 max-h-[18vh] w-auto rounded border bg-white"
                      />
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* THE WORKING SPACE. Intentionally empty — the board's pen draws here. */}
      <div className="min-h-0 flex-1" aria-hidden />

      {showAnswer && answer && (
        <div className="max-h-[42%] shrink-0 overflow-auto border-t bg-muted/40 px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-sans text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Answer
            </span>
            {answer.correctLabel && (
              <span className="font-sans text-xl font-bold text-emerald-700 dark:text-emerald-400">
                ({answer.correctLabel.toLowerCase()})
              </span>
            )}
            {answer.numericAnswer !== null && (
              <span className="font-sans text-xl font-bold text-emerald-700 dark:text-emerald-400">
                {answer.numericAnswer}
              </span>
            )}
            {!answer.correctLabel && answer.numericAnswer === null && (
              // Subjective questions, and the two defect classes the view model
              // refuses to guess at (no correct option, or two).
              <span className="font-sans text-sm text-muted-foreground">
                See the working below.
              </span>
            )}
          </div>

          {answer.solution && (
            <div className="mt-2 font-serif text-base leading-relaxed">
              {/* BlockText, not KatexRenderer: a solution may carry a GFM
                  pipe-table, and KatexRenderer prints one as raw `| p | q |`. */}
              <BlockText text={answer.solution} />
            </div>
          )}

          {answer.solutionImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={publicImageUrl(supabaseUrl, answer.solutionImageUrl)}
              alt="Solution diagram"
              className="mt-3 max-h-[28vh] w-auto rounded border bg-white"
            />
          )}
        </div>
      )}
    </div>
  );
}

function ControlButton({
  onClick,
  label,
  children,
  disabled,
  hidden,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
