"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import BlockText from "@/components/math/BlockText";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import { fromBoardQuestion, type PresentableQuestion } from "@/lib/present/viewModel";
import { cn } from "@/lib/utils";
import { boardPyqPaperStats } from "@/lib/board/papers";
import BoardQuestionItem, { type RevealLock } from "./BoardQuestionItem";
import { useBoardReveal } from "./useBoardReveal";
import {
  defaultOpenGroups,
  type BoardBlock,
  type BoardPaperCount,
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
  paperCounts,
  supabaseUrl,
  chapterName,
  examName,
}: {
  groups: BoardSectionGroup[];
  /** The chapter's board past-year questions, newest sitting first. Empty only
   *  for a board with no PYQ corpus at all (the `practiceOnly` boards); all 37
   *  CBSE 12, 47 MH HSC 12 and 56 MH SSC 10 chapters carry some. */
  pyqSittings: BoardPyqSitting[];
  /** Whole papers the subject sat per year — the strip divides by these. */
  paperCounts: BoardPaperCount[];
  supabaseUrl: string;
  /** Names the chapter in the classroom-projection breadcrumb. */
  chapterName: string;
  /** The DB `exams.name` — attributes a reveal-wall hit to its exam, in the
   *  same vocabulary /browse uses, so the two surfaces stay comparable. */
  examName: string;
}) {
  // Which corpus is on screen. Opens on the textbook — /board is the book
  // reader and the URL names a chapter of it.
  const [showPyqs, setShowPyqs] = useState(false);
  // Which sections open on load. Decided HERE rather than inside GroupSection
  // because it depends on a group's SIBLINGS: a lone group has no outline to
  // reveal, so folding it would only cost a click. See defaultOpenGroups.
  const openByDefault = defaultOpenGroups(groups);
  // Every question on the page by id, so a tap can be read against its key.
  const byId = useMemo(() => {
    const m = new Map<string, BoardQuestion>();
    for (const g of groups) for (const b of g.blocks) for (const q of b.questions) m.set(q.id, q);
    for (const s of pyqSittings) for (const q of s.questions) m.set(q.id, q);
    return m;
  }, [groups, pyqSittings]);
  // Reveal state for the whole reader (single source of truth), so per-question
  // toggles stay consistent as sections collapse and expand. Everything starts
  // hidden, including worked examples (attempt-first).
  const { revealed, blocked, picks, lock, toggleOne, pickOne } = useBoardReveal(examName, chapterName, byId);

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
      {/* ONE REGISTRY PER PANEL, not one for the reader. Both panels stay
          mounted, so a shared registry would let the projection walk straight
          out of the textbook and into the board PYQs — two different corpora,
          and half of them behind a hidden tab. */}
      <PresentRegistry>
        <div className="space-y-8" id="board-textbook" hidden={showPyqs}>
          {groups.map((group, i) => (
            <GroupSection
              key={group.group}
              group={group}
              defaultOpen={openByDefault[i]}
              supabaseUrl={supabaseUrl}
              chapterName={chapterName}
              revealed={revealed}
              blocked={blocked}
              lock={lock}
              onToggleReveal={toggleOne}
              picks={picks}
              onPick={pickOne}
            />
          ))}
        </div>
      </PresentRegistry>

      {pyqTotal > 0 && (
        <PresentRegistry>
          <div className="space-y-6" id="board-pyqs" hidden={!showPyqs}>
            <RecurrenceStrip
              sittings={pyqSittings}
              examName={examName}
              paperCounts={paperCounts}
            />
            {pyqSittings.map((sitting, i) => (
              <PyqSitting
                key={sitting.key}
                sitting={sitting}
                // Only the newest sitting opens. The rest are a table of contents —
                // a chapter can hold ten years of papers.
                defaultOpen={i === 0}
                supabaseUrl={supabaseUrl}
                chapterName={chapterName}
                sittingIndex={i}
                revealed={revealed}
                blocked={blocked}
                lock={lock}
                onToggleReveal={toggleOne}
                picks={picks}
                onPick={pickOne}
              />
            ))}
          </div>
        </PresentRegistry>
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
 * Questions per PAPER, per year. Bars are drawn from OBSERVED years only — a
 * year the board held no paper (March 2021, cancelled) has no bar rather than a
 * zero one, which would assert a paper this chapter was absent from.
 *
 * PER PAPER, NOT PER YEAR. A year is not a paper on two of the three boards:
 * CBSE Class 12 sets 5-6 papers a year and MH HSC 12 Mathematics has sat two
 * since 2024, so a per-year bar read ~6x and ~2x what one paper asks. Measured
 * on CBSE Physics, Current Electricity ran 42 · 37 · 50 · 36 per year but a
 * steady 4.2 · 4.2 · 4.8 · 5.2 per paper — and it is the second series a
 * student can plan against. The divisor comes from `source_file`, not from the
 * sitting: see src/lib/board/papers.ts for why the month cannot supply it.
 *
 * Each bar carries its NUMBER above it because the bar alone cannot hold it at
 * this scale — the numbers are small and close together, so against a 44px peak
 * one question is a few pixels. The bar carries the shape; the label carries the
 * plan ("expect about 5 from this chapter").
 */
function RecurrenceStrip({
  sittings,
  examName,
  paperCounts,
}: {
  sittings: BoardPyqSitting[];
  examName: string;
  paperCounts: BoardPaperCount[];
}) {
  const stats = boardPyqPaperStats(
    sittings,
    examName,
    new Map(paperCounts.map((c) => [c.year, c.papers]))
  );
  // A year we cannot express per-paper draws no bar. Its questions still list
  // below — this drops a BAR, never a question.
  const bars = stats.years.filter(
    (y): y is (typeof stats.years)[number] & { perPaper: number } => y.perPaper !== null
  );
  if (bars.length < 2) return null;
  const peak = Math.max(...bars.map((b) => b.perPaper));

  return (
    <section className="rounded-lg border border-brand-accent/30 bg-brand-accent/5 p-4">
      <h2 className="text-sm font-semibold text-brand-accent">What the board has asked from this chapter</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Questions per paper · {stats.totalPapers} papers · {bars[0].year} to{" "}
        {bars[bars.length - 1].year}
      </p>
      <ol className="mt-3 flex items-end gap-1.5" aria-hidden>
        {bars.map((b) => (
          <li key={b.year} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[10px] font-medium tabular-nums text-brand-accent">
              {b.perPaper}
            </span>
            <span
              className="w-full rounded-t-sm bg-brand-accent/70"
              style={{ height: `${Math.max(4, Math.round((b.perPaper / peak) * 44))}px` }}
            />
            <span className="text-[10px] tabular-nums text-muted-foreground">
              {String(b.year).slice(-2)}
            </span>
          </li>
        ))}
      </ol>
      {stats.excludedQuestions > 0 && (
        // CBSE prints 3 variants of each paper and we store only what the 2nd
        // and 3rd CHANGE, so those rows belong to no single paper and cannot be
        // averaged. Say so rather than quietly dropping them from a page whose
        // other numbers count everything.
        <p className="mt-2 text-[11px] text-muted-foreground">
          Bars average the full papers of each year. {stats.excludedQuestions} further{" "}
          {stats.excludedQuestions === 1 ? "question comes" : "questions come"} from set variants
          and {stats.excludedQuestions === 1 ? "is" : "are"} listed below.
        </p>
      )}
      <p className="sr-only">
        {bars.map((b) => `${b.year}: ${b.perPaper} questions per paper`).join(". ")}
      </p>
    </section>
  );
}

function PyqSitting({
  sitting,
  defaultOpen,
  supabaseUrl,
  chapterName,
  sittingIndex,
  revealed,
  blocked,
  lock,
  onToggleReveal,
  picks,
  onPick,
}: {
  sitting: BoardPyqSitting;
  defaultOpen: boolean;
  supabaseUrl: string;
  chapterName: string;
  /** Position of this sitting in the panel, so the walk-through orders questions
   *  across sittings rather than restarting at 0 in each one. */
  sittingIndex: number;
  revealed: Set<string>;
  blocked: Set<string>;
  lock: RevealLock;
  onToggleReveal: (id: string) => void;
  picks: Map<string, string>;
  onPick: (id: string, label: string) => void;
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
                present={fromBoardQuestion(q, {
                  chapter: chapterName,
                  sectionLabel: sitting.label,
                })}
                order={sittingIndex * 1000 + i}
                revealed={revealed.has(q.id)}
                blocked={blocked.has(q.id)}
                lockedLink={lock.isLocked(q.id) ? lock.link : null}
                onToggleReveal={() => onToggleReveal(q.id)}
                pick={picks.get(q.id) ?? null}
                onPick={(label) => onPick(q.id, label)}
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
  chapterName,
  revealed,
  blocked,
  lock,
  onToggleReveal,
  picks,
  onPick,
}: {
  group: BoardSectionGroup;
  defaultOpen: boolean;
  supabaseUrl: string;
  chapterName: string;
  revealed: Set<string>;
  blocked: Set<string>;
  lock: RevealLock;
  onToggleReveal: (id: string) => void;
  picks: Map<string, string>;
  onPick: (id: string, label: string) => void;
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
          chapterName={chapterName}
          revealed={revealed}
          blocked={blocked}
          lock={lock}
          onToggleReveal={onToggleReveal}
          picks={picks}
          onPick={onPick}
        />
      ))}
    </details>
  );
}

function BlockSection({
  block,
  groupLabel,
  supabaseUrl,
  chapterName,
  revealed,
  blocked,
  lock,
  onToggleReveal,
  picks,
  onPick,
}: {
  block: BoardBlock;
  groupLabel: string;
  supabaseUrl: string;
  chapterName: string;
  revealed: Set<string>;
  blocked: Set<string>;
  lock: RevealLock;
  onToggleReveal: (id: string) => void;
  picks: Map<string, string>;
  onPick: (id: string, label: string) => void;
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
              present={fromBoardQuestion(q, {
                chapter: chapterName,
                sectionLabel: block.label,
              })}
              order={block.seq * 1000 + i}
              revealed={revealed.has(q.id)}
              blocked={blocked.has(q.id)}
              lockedLink={lock.isLocked(q.id) ? lock.link : null}
              onToggleReveal={() => onToggleReveal(q.id)}
              pick={picks.get(q.id) ?? null}
              onPick={(label) => onPick(q.id, label)}
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
