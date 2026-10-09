"use client";

/**
 * One question card of a board reader: its number, stem, figure, options and
 * the attempt-first answer reveal. Shared by /board (BoardReader) and
 * /question-papers (PaperReader, 2026-10-09), so the two read the same.
 */
import type { ReactNode } from "react";
import { Check, Maximize2, X } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import PresentButton from "@/components/present/PresentButton";
import type { PresentableQuestion } from "@/lib/present/viewModel";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { breakSentences } from "@/lib/board/formatSolution";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { optionMark } from "@/lib/questions/optionMark";
import { dailyRevealLimit } from "@/components/reveal/useRevealMeter";
import RevealSignInPrompt from "@/components/reveal/RevealSignInPrompt";
import { RevealDailyPrompt } from "@/components/reveal/RevealDailyLimit";
import type { BoardQuestion } from "@/lib/board/query";

function questionHasAnswer(q: BoardQuestion): boolean {
  return !!q.solution || q.options.some((o) => o.isCorrect);
}

/** The anon reveal wall, built once in BoardReader and passed down to every card. */
export type RevealLock = { isLocked: (id: string) => boolean; link: ReactNode };

export default function BoardQuestionItem({
  q,
  supabaseUrl,
  present,
  order,
  revealed,
  blocked,
  lockedLink,
  onToggleReveal,
  pick,
  onPick,
  meta,
  marks,
}: {
  q: BoardQuestion;
  supabaseUrl: string;
  /** Built by the caller, which is what knows the question's book position. */
  present: PresentableQuestion;
  order: number;
  revealed: boolean;
  blocked: boolean;
  /** Set when the anon reveal budget is spent and this answer is unseen. */
  lockedLink: ReactNode | null;
  onToggleReveal: () => void;
  /** The option this reader tapped, if any. */
  pick: string | null;
  /** Tap an option: reveals on the first tap, then only moves the pick. */
  onPick: (label: string) => void;
  /** Optional provenance shown under the question and ABOVE the reveal — it
   *  describes the question, never the answer, so it must not sit inside the
   *  reveal-gated block. */
  meta?: ReactNode;
  /** Printed marks, on a past paper (/question-papers). Absent on /board. */
  marks?: number;
}) {
  const hasAnswer = questionHasAnswer(q);

  return (
    <div className="rounded-lg border bg-card p-3 sm:p-4">
      {/* Phone: the ref chip and Project share a top row and the stem drops
          below at full width (order-last + basis-full). From sm up there is
          room for all three side by side. As three columns on a 390px phone
          the stem got ~40% of the card and wrapped mid-expression. */}
      <div className="flex flex-wrap items-start gap-2.5 sm:flex-nowrap">
        {q.questionNumber && (
          <span className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            {cleanRef(q.questionNumber)}
          </span>
        )}
        {marks !== undefined && (
          <span className="mt-0.5 shrink-0 text-xs font-medium text-muted-foreground">
            {marks} {marks === 1 ? "mark" : "marks"}
          </span>
        )}
        <div className="order-last min-w-0 basis-full font-serif text-[15px] leading-relaxed sm:order-none sm:flex-1 [&_.katex]:max-w-full">
          <BlockText text={q.text} />
        </div>
        <PresentButton question={present} order={order} className="ml-auto mt-0.5" />
      </div>

      {q.imageUrl && (
        <div className="pt-3">
          <ZoomableImage src={publicImageUrl(supabaseUrl, q.imageUrl)} alt="Question figure" />
        </div>
      )}

      {q.format === "mcq" && q.options.length > 0 && (
        <>
          <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {q.options.map((o) => {
              const picked = pick === o.label;
              const mark = optionMark({ revealed, picked, isCorrect: o.isCorrect });
              const content = (
                <>
                  <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-muted-foreground">{o.label}.</span>
                  <div className="min-w-0 flex-1 font-serif [&_.katex]:max-w-full">
                    <KatexRenderer text={o.text} />
                  </div>
                  {mark === "correct" && (
                    <span className="inline-flex shrink-0 items-center gap-1 font-sans text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                      Correct
                    </span>
                  )}
                  {mark === "wrong" && (
                    <span className="inline-flex shrink-0 items-center gap-1 font-sans text-xs font-medium text-red-700 dark:text-red-400">
                      <X className="h-3.5 w-3.5" aria-hidden />
                      Your pick
                    </span>
                  )}
                </>
              );
              return (
                <li
                  key={o.label}
                  className={cn(
                    "overflow-hidden rounded-md border bg-background text-sm",
                    mark === "correct" && "border-emerald-500/60 bg-emerald-500/5",
                    mark === "wrong" && "border-red-500/60 bg-red-500/5"
                  )}
                >
                  {hasAnswer ? (
                    <button
                      type="button"
                      onClick={() => onPick(o.label)}
                      aria-pressed={picked}
                      className="flex w-full items-start gap-2 px-2.5 py-1.5 text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                      {content}
                    </button>
                  ) : (
                    <div className="flex items-start gap-2 px-2.5 py-1.5">{content}</div>
                  )}
                </li>
              );
            })}
          </ol>
          {hasAnswer && !revealed && (
            <p className="mt-1.5 text-center text-xs text-muted-foreground">
              {!lockedLink
                ? "Tap an option to check your answer."
                : dailyRevealLimit() !== null
                  ? "You've opened today's free answers. More tomorrow."
                  : "Sign in free to check answers."}
            </p>
          )}
        </>
      )}

      {meta && <div className="mt-2.5">{meta}</div>}

      {hasAnswer ? (
        <div className="mt-3">
          {lockedLink && !revealed ? (
            lockedLink
          ) : (
            <button
              type="button"
              onClick={onToggleReveal}
              aria-expanded={revealed}
              className="text-xs font-medium text-brand-accent hover:underline"
            >
              {revealed ? "Hide answer" : q.format === "subjective" ? "Show model answer" : "Show answer"}
            </button>
          )}
          {blocked &&
            !revealed &&
            // A daily quota is loaded only for a signed-in free student.
            (dailyRevealLimit() !== null ? (
              <RevealDailyPrompt surface="board" />
            ) : (
              <RevealSignInPrompt surface="board" />
            ))}
          {revealed && q.solution && (
            <div className="mt-2 rounded-md border border-dashed bg-background p-3 font-serif text-[15px] leading-relaxed motion-safe:animate-fade-in-up [&_.katex]:max-w-full">
              {/* BlockText (not KatexRenderer) so GFM pipe-tables in a solution —
                  e.g. Mathematical Logic truth tables — render as real <table>s,
                  not raw `| p | q |` text. Fast-paths to KatexRenderer when there's
                  no table. breakSentences leaves tables untouched. */}
              <BlockText text={breakSentences(q.solution)} solution />
              {q.solutionImageUrl && (
                <div className="pt-3">
                  <ZoomableImage src={publicImageUrl(supabaseUrl, q.solutionImageUrl)} alt="Solution figure" />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-2 text-xs italic text-muted-foreground">Model answer coming soon.</p>
      )}
    </div>
  );
}

/** Trim the transcription's redundant leading section prefix so the book's own
 *  number reads cleanly: "2.1 Ex 2.1 Q.3 (i)" → "Q.3 (i)". Leaves already-clean
 *  refs ("Misc I (11)", "Misc 2A Q.7") alone. */
function cleanRef(ref: string): string {
  const trimmed = ref.replace(
    /^\d+\.\d+\s+(Solved\s+)?(Ex(ercise)?\.?\s*\d+(\.\d+)?|Feasible Ex\.?\d*|Graphical Example\s*\d*)\s+/i,
    ""
  );
  return trimmed.trim() || ref;
}

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative block cursor-zoom-in rounded transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`Zoom: ${alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="max-h-72 w-auto rounded border bg-white" />
          <span className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded bg-background/80 text-muted-foreground opacity-0 ring-1 ring-border transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" aria-hidden />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none" hideCloseButton>
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="mx-auto max-h-[85vh] w-auto rounded-lg bg-white" />
          <DialogClose
            className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md ring-1 ring-border transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close image"
          >
            <X className="h-5 w-5" aria-hidden />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
