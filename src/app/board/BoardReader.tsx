"use client";

import { useState, type ReactNode } from "react";
import { BookOpen, Check, ChevronDown, ChevronRight, Maximize2, X } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { breakSentences } from "@/lib/board/formatSolution";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRevealMeter } from "@/components/reveal/useRevealMeter";
import { useMobilePrompt } from "@/lib/profile/MobilePromptProvider";
import RevealSignInPrompt from "@/components/reveal/RevealSignInPrompt";
import {
  defaultOpenGroups,
  pyqYearCounts,
  type BoardBlock,
  type BoardPyqSitting,
  type BoardQuestion,
  type BoardSectionGroup,
  type SectionKind,
} from "@/lib/board/query";

const KIND_TAG: Record<SectionKind, string> = {
  solved_example: "Worked",
  exercise: "Practice",
  miscellaneous: "Practice",
};

function questionHasAnswer(q: BoardQuestion): boolean {
  return !!q.solution || q.options.some((o) => o.isCorrect);
}

/**
 * The chapter opens as an OUTLINE: section headings visible, questions folded
 * away. Fully expanded, a chapter is unnavigable — MH HSC 12 Differentiation is
 * 363 question cards on one page — while collapsed the worst case in the bank is
 * ~19 groups / 23 blocks, i.e. a table of contents you can read.
 *
 * Collapsing uses native <details>, NOT React state, so the questions stay in
 * the DOM: the page keeps rendering its content server-side (these pages are
 * crawlable, and a stem is the only indexable text here — solutions are
 * reveal-gated), and <summary> brings keyboard + screen-reader behaviour for
 * free. The trade is honest: nothing is saved at render time, since every card
 * still mounts. This buys navigability, not speed.
 *
 * ⚠ Ctrl-F: Chrome and Edge auto-expand a closed <details> when the browser's
 * find lands inside it; Firefox and Safari do NOT. Same caveat as /books.
 */
export default function BoardReader({
  groups,
  pyqSittings,
  supabaseUrl,
}: {
  groups: BoardSectionGroup[];
  /** The chapter's board past-year questions, newest sitting first. Empty for a
   *  chapter the board has no published PYQs for — 24 of CBSE's 37 today. */
  pyqSittings: BoardPyqSitting[];
  supabaseUrl: string;
}) {
  // Reveal state lives HERE (single source of truth) so per-question toggles
  // stay consistent as sections collapse/expand. Everything starts hidden —
  // including worked examples; tap "Show answer" to reveal (attempt-first).
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  // Which corpus is on screen. Opens on the textbook — /board is the book
  // reader and the URL names a chapter of it.
  const [showPyqs, setShowPyqs] = useState(false);
  const meter = useRevealMeter();
  const mobilePrompt = useMobilePrompt();
  // Which sections open on load. Decided HERE rather than inside GroupSection
  // because it depends on a group's SIBLINGS: a lone group has no outline to
  // reveal, so folding it would only cost a click. See defaultOpenGroups.
  const openByDefault = defaultOpenGroups(groups);

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
    // Engagement signal for the soft mobile prompt (no-op unless signed-in
    // without a mobile; fires only once, at the reveal threshold).
    mobilePrompt.notifyReveal();
    setRevealed((prev) => new Set(prev).add(id));
  };

  const textbookTotal = groups.reduce(
    (n, g) => n + g.blocks.reduce((m, b) => m + b.questions.length, 0),
    0
  );
  const pyqTotal = pyqSittings.reduce((n, s) => n + s.questions.length, 0);

  return (
    <div className="space-y-6">
      {pyqTotal > 0 && (
        <SourceTabs
          textbookTotal={textbookTotal}
          sectionCount={groups.length}
          pyqTotal={pyqTotal}
          pyqSittings={pyqSittings}
          showPyqs={showPyqs}
          onSelect={setShowPyqs}
        />
      )}

      {/* BOTH panels stay mounted; the inactive one is hidden. Conditional
          rendering would drop half the chapter out of the DOM, and a stem is the
          only indexable text on these pages (solutions are reveal-gated). */}
      <div className="space-y-8" id="board-textbook" hidden={showPyqs}>
        {groups.map((group, i) => (
          <GroupSection
            key={group.group}
            group={group}
            defaultOpen={openByDefault[i]}
            supabaseUrl={supabaseUrl}
            revealed={revealed}
            blocked={blocked}
            onToggleReveal={toggleOne}
          />
        ))}
      </div>

      {pyqTotal > 0 && (
        <div className="space-y-6" id="board-pyqs" hidden={!showPyqs}>
          <RecurrenceStrip sittings={pyqSittings} />
          {pyqSittings.map((sitting, i) => (
            <PyqSitting
              key={sitting.key}
              sitting={sitting}
              // Only the newest sitting opens. The rest are a table of contents —
              // a chapter can hold ten years of papers.
              defaultOpen={i === 0}
              supabaseUrl={supabaseUrl}
              revealed={revealed}
              blocked={blocked}
              onToggleReveal={toggleOne}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Textbook / Board PYQs. Two peers, not a primary and an appendix — on MH SSC
 * 10 the board questions outnumber the textbook in 38 of 68 chapters.
 *
 * Selection is REACT STATE, deliberately not a search param: useSearchParams
 * bails a static prerender out to client rendering, and these pages are cached.
 * The cost is that the choice isn't linkable.
 */
function SourceTabs({
  textbookTotal,
  sectionCount,
  pyqTotal,
  pyqSittings,
  showPyqs,
  onSelect,
}: {
  textbookTotal: number;
  sectionCount: number;
  pyqTotal: number;
  pyqSittings: BoardPyqSitting[];
  showPyqs: boolean;
  onSelect: (showPyqs: boolean) => void;
}) {
  const years = pyqSittings.map((s) => s.year);
  const first = Math.min(...years);
  const last = Math.max(...years);
  const span = first === last ? `${first}` : `${first}–${last}`;

  const tab = (active: boolean) =>
    cn(
      "flex min-w-[9rem] flex-1 flex-col gap-0.5 rounded-lg border px-4 py-2.5 text-left transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      active
        ? "border-brand-accent bg-brand-accent/10 ring-1 ring-inset ring-brand-accent"
        : "bg-card hover:border-muted-foreground/40"
    );

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={!showPyqs}
        aria-controls="board-textbook"
        onClick={() => onSelect(false)}
        className={tab(!showPyqs)}
      >
        <span className={cn("text-sm font-semibold", !showPyqs && "text-brand-accent")}>Textbook</span>
        <span className="text-xs text-muted-foreground">
          {textbookTotal} questions · {sectionCount} book sections
        </span>
      </button>
      <button
        type="button"
        aria-pressed={showPyqs}
        aria-controls="board-pyqs"
        onClick={() => onSelect(true)}
        className={tab(showPyqs)}
      >
        <span className={cn("text-sm font-semibold", showPyqs && "text-brand-accent")}>Board PYQs</span>
        <span className="text-xs text-muted-foreground">
          {pyqTotal} questions · {span}
        </span>
      </button>
    </div>
  );
}

/**
 * Questions per year. Bars are drawn from OBSERVED years only — a year the
 * board held no paper (March 2021, cancelled) has no bar rather than a zero
 * one, which would assert a paper this chapter was absent from.
 */
function RecurrenceStrip({ sittings }: { sittings: BoardPyqSitting[] }) {
  const counts = pyqYearCounts(sittings);
  if (counts.length < 2) return null;
  const peak = Math.max(...counts.map((c) => c.count));

  return (
    <section className="rounded-lg border border-brand-accent/30 bg-brand-accent/5 p-4">
      <h2 className="text-sm font-semibold text-brand-accent">What the board has asked from this chapter</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {counts.length} papers · {counts[0].year} to {counts[counts.length - 1].year}
      </p>
      <ol className="mt-3 flex items-end gap-1.5" aria-hidden>
        {counts.map((c) => (
          <li key={c.year} className="flex flex-1 flex-col items-center gap-1">
            <span
              className="w-full rounded-t-sm bg-brand-accent/70"
              style={{ height: `${Math.max(4, Math.round((c.count / peak) * 44))}px` }}
            />
            <span className="text-[10px] tabular-nums text-muted-foreground">
              {String(c.year).slice(-2)}
            </span>
          </li>
        ))}
      </ol>
      <p className="sr-only">
        {counts.map((c) => `${c.year}: ${c.count} questions`).join(". ")}
      </p>
    </section>
  );
}

function PyqSitting({
  sitting,
  defaultOpen,
  supabaseUrl,
  revealed,
  blocked,
  onToggleReveal,
}: {
  sitting: BoardPyqSitting;
  defaultOpen: boolean;
  supabaseUrl: string;
  revealed: Set<string>;
  blocked: Set<string>;
  onToggleReveal: (id: string) => void;
}) {
  return (
    <details className="group/sit space-y-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center gap-2 border-b-2 border-brand-accent/30 pb-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
        <ChevronDown
          className="h-4 w-4 shrink-0 -rotate-90 text-muted-foreground transition-transform group-open/sit:rotate-0"
          aria-hidden
        />
        <h2 className="flex-1 text-lg font-semibold tracking-tight text-foreground">{sitting.label}</h2>
        <span className="shrink-0 text-xs font-normal text-muted-foreground">
          {sitting.questions.length} q
        </span>
      </summary>

      <ol className="space-y-3">
        {sitting.questions.map((q, i) => {
          const prev = sitting.questions[i - 1];
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
                // The one honest bridge back to the book half. A PYQ has exactly
                // ONE subtopic; a book section spans several, so the link only
                // works in this direction.
                meta={
                  q.subtopicName ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      <BookOpen className="h-3 w-3 text-brand-accent" aria-hidden />
                      {q.subtopicName}
                    </span>
                  ) : null
                }
              />
            </li>
          );
        })}
      </ol>
    </details>
  );
}

function GroupSection({
  group,
  defaultOpen,
  supabaseUrl,
  revealed,
  blocked,
  onToggleReveal,
}: {
  group: BoardSectionGroup;
  defaultOpen: boolean;
  supabaseUrl: string;
  revealed: Set<string>;
  blocked: Set<string>;
  onToggleReveal: (id: string) => void;
}) {
  const total = group.blocks.reduce((n, b) => n + b.questions.length, 0);

  return (
    <details className="group/sec space-y-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center gap-2 border-b-2 border-brand-accent/30 pb-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
        <ChevronDown
          className="h-4 w-4 shrink-0 -rotate-90 text-muted-foreground transition-transform group-open/sec:rotate-0"
          aria-hidden
        />
        <h2 className="flex-1 text-lg font-semibold tracking-tight text-foreground">{group.group}</h2>
        <span className="shrink-0 text-xs font-normal text-muted-foreground">{total} q</span>
      </summary>

      {group.blocks.map((block) => (
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
    </details>
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
  // A single-block group (e.g. "Miscellaneous Exercise 2 (A)") has no distinct
  // sub-heading — the group header already collapses it, so render questions flat.
  const hasOwnHeader = block.label !== groupLabel;

  const questions = (
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
  );

  if (!hasOwnHeader) return <div className="space-y-3">{questions}</div>;

  return (
    <details className="group/blk space-y-3">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
        <ChevronRight
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70 transition-transform group-open/blk:rotate-90"
          aria-hidden
        />
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{block.label}</h3>
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium normal-case tracking-normal text-muted-foreground/80">
          {KIND_TAG[block.kind]} · {block.questions.length}
        </span>
      </summary>
      {questions}
    </details>
  );
}

function BoardQuestionItem({
  q,
  supabaseUrl,
  revealed,
  blocked,
  onToggleReveal,
  meta,
}: {
  q: BoardQuestion;
  supabaseUrl: string;
  revealed: boolean;
  blocked: boolean;
  onToggleReveal: () => void;
  /** Optional provenance shown under the question and ABOVE the reveal — it
   *  describes the question, never the answer, so it must not sit inside the
   *  reveal-gated block. */
  meta?: ReactNode;
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

      {meta && <div className="mt-2.5">{meta}</div>}

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
