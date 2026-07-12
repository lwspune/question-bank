"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronRight, Maximize2, X } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { breakSentences } from "@/lib/board/formatSolution";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRevealMeter } from "@/components/reveal/useRevealMeter";
import RevealSignInPrompt from "@/components/reveal/RevealSignInPrompt";
import type { BoardBlock, BoardQuestion, BoardSectionGroup, SectionKind } from "@/lib/board/query";

const KIND_TAG: Record<SectionKind, string> = {
  solved_example: "Worked",
  exercise: "Practice",
  miscellaneous: "Practice",
};

function questionHasAnswer(q: BoardQuestion): boolean {
  return !!q.solution || q.options.some((o) => o.isCorrect);
}

export default function BoardReader({
  groups,
  supabaseUrl,
}: {
  groups: BoardSectionGroup[];
  supabaseUrl: string;
}) {
  // Reveal state lives HERE (single source of truth) so per-question toggles
  // stay consistent as sections collapse/expand. Everything starts hidden —
  // including worked examples; tap "Show answer" to reveal (attempt-first).
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  const meter = useRevealMeter();

  const toggleOne = (id: string) => {
    // Hiding an already-revealed answer is always free.
    if (revealed.has(id)) {
      setRevealed((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      return;
    }
    // Revealing a new answer: the meter gates anon after the free budget.
    if (!meter.attemptReveal(id)) {
      setBlocked((prev) => new Set(prev).add(id));
      return;
    }
    setRevealed((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <GroupSection
          key={group.group}
          group={group}
          supabaseUrl={supabaseUrl}
          revealed={revealed}
          blocked={blocked}
          onToggleReveal={toggleOne}
        />
      ))}
    </div>
  );
}

function GroupSection({
  group,
  supabaseUrl,
  revealed,
  blocked,
  onToggleReveal,
}: {
  group: BoardSectionGroup;
  supabaseUrl: string;
  revealed: Set<string>;
  blocked: Set<string>;
  onToggleReveal: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const total = group.blocks.reduce((n, b) => n + b.questions.length, 0);

  return (
    <section className="space-y-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 border-b-2 border-brand-accent/30 pb-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", !open && "-rotate-90")}
          aria-hidden
        />
        <h2 className="flex-1 text-lg font-semibold tracking-tight text-foreground">{group.group}</h2>
        <span className="shrink-0 text-xs font-normal text-muted-foreground">{total} q</span>
      </button>

      {open &&
        group.blocks.map((block) => (
          <BlockSection
            key={block.seq}
            block={block}
            groupLabel={group.group}
            supabaseUrl={supabaseUrl}
            revealed={revealed}
            blocked={blocked}
            onToggleReveal={onToggleReveal}
          />
        ))}
    </section>
  );
}

function BlockSection({
  block,
  groupLabel,
  supabaseUrl,
  revealed,
  blocked,
  onToggleReveal,
}: {
  block: BoardBlock;
  groupLabel: string;
  supabaseUrl: string;
  revealed: Set<string>;
  blocked: Set<string>;
  onToggleReveal: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  // A single-block group (e.g. "Miscellaneous Exercise 2 (A)") has no distinct
  // sub-heading — the group header already collapses it, so render questions flat.
  const hasOwnHeader = block.label !== groupLabel;

  return (
    <div className="space-y-3">
      {hasOwnHeader && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ChevronRight
            className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground/70 transition-transform", open && "rotate-90")}
            aria-hidden
          />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{block.label}</h3>
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium normal-case tracking-normal text-muted-foreground/80">
            {KIND_TAG[block.kind]} · {block.questions.length}
          </span>
        </button>
      )}

      {open && (
        <ol className="space-y-3">
          {block.questions.map((q, i) => {
            const prev = block.questions[i - 1];
            const showContext = !!q.context && (!q.setId || q.setId !== prev?.setId);
            return (
              <li key={q.id}>
                {showContext && (
                  <div className="mb-2 rounded-md border-l-2 border-brand-accent/40 bg-muted/30 px-3 py-2 font-serif text-sm italic text-muted-foreground">
                    <BlockText text={q.context as string} />
                  </div>
                )}
                <BoardQuestionItem
                  q={q}
                  supabaseUrl={supabaseUrl}
                  revealed={revealed.has(q.id)}
                  blocked={blocked.has(q.id)}
                  onToggleReveal={() => onToggleReveal(q.id)}
                />
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function BoardQuestionItem({
  q,
  supabaseUrl,
  revealed,
  blocked,
  onToggleReveal,
}: {
  q: BoardQuestion;
  supabaseUrl: string;
  revealed: boolean;
  blocked: boolean;
  onToggleReveal: () => void;
}) {
  const hasAnswer = questionHasAnswer(q);

  return (
    <div className="rounded-lg border bg-card p-3 sm:p-4">
      <div className="flex items-start gap-2.5">
        {q.questionNumber && (
          <span className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            {cleanRef(q.questionNumber)}
          </span>
        )}
        <div className="min-w-0 flex-1 font-serif text-[15px] leading-relaxed [&_.katex]:max-w-full">
          <BlockText text={q.text} />
        </div>
      </div>

      {q.imageUrl && (
        <div className="pt-3">
          <ZoomableImage src={publicImageUrl(supabaseUrl, q.imageUrl)} alt="Question figure" />
        </div>
      )}

      {q.format === "mcq" && q.options.length > 0 && (
        <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {q.options.map((o) => {
            const showCorrect = revealed && o.isCorrect;
            return (
              <li
                key={o.label}
                className={cn(
                  "flex items-start gap-2 rounded-md border bg-background px-2.5 py-1.5 text-sm",
                  showCorrect && "border-emerald-500/60 bg-emerald-500/5"
                )}
              >
                <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-muted-foreground">{o.label}.</span>
                <div className="min-w-0 flex-1 font-serif [&_.katex]:max-w-full">
                  <KatexRenderer text={o.text} />
                </div>
                {showCorrect && (
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                )}
              </li>
            );
          })}
        </ol>
      )}

      {hasAnswer ? (
        <div className="mt-3">
          <button
            type="button"
            onClick={onToggleReveal}
            aria-expanded={revealed}
            className="text-xs font-medium text-brand-accent hover:underline"
          >
            {revealed ? "Hide answer" : q.format === "subjective" ? "Show model answer" : "Show answer"}
          </button>
          {blocked && !revealed && <RevealSignInPrompt />}
          {revealed && q.solution && (
            <div className="mt-2 rounded-md border border-dashed bg-background p-3 font-serif text-[15px] leading-relaxed [&_.katex]:max-w-full">
              {/* BlockText (not KatexRenderer) so GFM pipe-tables in a solution —
                  e.g. Mathematical Logic truth tables — render as real <table>s,
                  not raw `| p | q |` text. Fast-paths to KatexRenderer when there's
                  no table. breakSentences leaves tables untouched. */}
              <BlockText text={breakSentences(q.solution)} />
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
