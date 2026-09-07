"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  EyeOff,
  Undo2,
} from "lucide-react";
import BlockText from "@/components/math/BlockText";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { cn } from "@/lib/utils";
import type { BookSection } from "@/lib/books/order";
import type { QuestionRow } from "@/lib/questions/query";
import {
  moveSetAction,
  moveSetToSectionAction,
  setExcludedAction,
} from "./actions";

type Props = {
  sections: BookSection[];
  /** Serialised as an array: a Map cannot cross the server/client boundary. */
  questions: QuestionRow[];
  supabaseUrl: string;
  bookSlug: string;
  chapterSlug: string;
  /** Questions curated OUT — rendered struck through, not hidden. */
  excludedIds: string[];
  /**
   * For each PRINTED question, the sittings it stands for. Serialised as a plain
   * object: a Map cannot cross the server/client boundary, and one that does
   * arrives as `{}` with no error.
   */
  recurrence: Record<string, string[]>;
};

/**
 * The section a set would move to, or null when there is nowhere to move it.
 *
 * This was a hardcoded `nda <-> cds` flip. A one-section book (MHT-CET Maths is
 * the first) would have rendered a "Move to CDS PYQ" button that targets a
 * section the book does not have; with three or more, the flip is meaningless.
 * Returning null is what lets the control simply not render.
 */
function otherSection(
  sections: BookSection[],
  key: string
): BookSection | null {
  if (sections.length !== 2) return null;
  return sections.find((s) => s.key !== key) ?? null;
}

/**
 * The chapter reader and editor.
 *
 * Sets are collapsed by default and rendered as whole units — the same call
 * /board makes, and for two reasons here. A chapter can carry 773 questions, so
 * mounting every KaTeX span at once is slow; and a set IS the unit of meaning,
 * since its shared passage prints once above its questions. A question shown
 * without its passage is unanswerable.
 *
 * That is also why CURATION works on the set: moving a question out of its
 * passage would strand it, and nothing downstream would notice, because the
 * question is still present. Exclusion is the one per-question action, and an
 * excluded question stays visible and struck through rather than disappearing —
 * a decision you cannot see is one you cannot reverse.
 *
 * Answers are visible by default. This is a review surface for platform staff,
 * not a practice surface: there is nothing to gate, and hiding the answers
 * would hide the very thing being reviewed. The toggle exists so the book can
 * also be read the way a student would meet it.
 */
export default function BookChapterReader({
  sections,
  questions,
  supabaseUrl,
  bookSlug,
  chapterSlug,
  excludedIds,
  recurrence,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const byId = useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions]);
  const excluded = useMemo(() => new Set(excludedIds), [excludedIds]);
  const allKeys = useMemo(
    () => sections.flatMap((s) => s.sets.map((set) => set.key)),
    [sections]
  );

  const [open, setOpen] = useState<Set<string>>(new Set());
  const [showAnswers, setShowAnswers] = useState(true);

  const allOpen = open.size === allKeys.length && allKeys.length > 0;

  /**
   * Run a curation action, then refresh. The page is `force-dynamic`, so the
   * refresh genuinely re-reads from the database — the change is confirmed by
   * what comes back, never assumed from the click. On a CACHED route this would
   * re-serve the same copy and the move would appear to do nothing.
   */
  const run = (
    fn: () => Promise<{ ok: boolean; message?: string }>,
    success: string
  ) => {
    startTransition(async () => {
      const res = await fn();
      if (res.ok) {
        toast.success(success);
        router.refresh();
      } else {
        toast.error(res.message ?? "Could not apply that change");
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 border-b pb-4">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(allKeys))}
          className="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
        <label className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus-within:ring-2 focus-within:ring-ring">
          <input
            type="checkbox"
            checked={showAnswers}
            onChange={(e) => setShowAnswers(e.target.checked)}
            className="h-4 w-4 accent-[var(--brand)]"
          />
          Show answers
        </label>
        {/* Collapsed sets are not in the DOM, so find-in-page only reaches what
            is open. Saying so beats letting someone conclude a question is
            missing from the book. */}
        <span className="text-xs text-muted-foreground">
          Expand all before using find-in-page.
        </span>
      </div>

      {sections.map((section) => {
        const live = section.sets
          .flatMap((s) => s.questionIds)
          .filter((id) => !excluded.has(id)).length;
        const out = section.questionCount - live;

        return (
          <section key={section.key} aria-labelledby={`sec-${section.key}`}>
            <div className="mb-4 flex flex-wrap items-baseline gap-3 border-b-2 border-brand-accent/40 pb-2">
              <h2
                id={`sec-${section.key}`}
                className="text-xl font-semibold tracking-tight"
              >
                {section.title}
              </h2>
              <span className="text-sm text-muted-foreground">
                {live.toLocaleString()} {live === 1 ? "question" : "questions"}
                {out > 0 ? ` · ${out} excluded` : ""}
              </span>
            </div>

            {/* A zero renders as a zero, deliberately — it says "we looked and
                there are none", which a missing heading would not. */}
            {section.sets.length === 0 ? (
              <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                No {section.exam} questions in this chapter.
              </p>
            ) : (
              <ul className="space-y-3">
                {section.sets.map((set) => {
                  const isOpen = open.has(set.key);
                  const first = byId.get(set.questionIds[0]);
                  return (
                    <li key={set.key} className="rounded-lg border">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpen((prev) => {
                            const next = new Set(prev);
                            if (!next.delete(set.key)) next.add(set.key);
                            return next;
                          })
                        }
                        className="flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                      >
                        {isOpen ? (
                          <ChevronDown
                            className="h-4 w-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{set.label}</span>
                          {!isOpen && first ? (
                            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                              <BlockText text={first.text} />
                            </span>
                          ) : null}
                        </span>
                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                          {set.questionIds.length} q
                        </span>
                      </button>

                      {/* Curation bar. The unit is the SET: a passage and its
                          questions move together. */}
                      <div className="flex flex-wrap items-center gap-1.5 border-t px-3 py-2">
                        <SetButton
                          disabled={pending}
                          label={`Move ${set.label} up`}
                          onClick={() =>
                            run(
                              () =>
                                moveSetAction(
                                  bookSlug,
                                  chapterSlug,
                                  section.key,
                                  set.key,
                                  "up"
                                ),
                              "Moved up"
                            )
                          }
                        >
                          <ArrowUp className="h-3 w-3" aria-hidden="true" /> Up
                        </SetButton>
                        <SetButton
                          disabled={pending}
                          label={`Move ${set.label} down`}
                          onClick={() =>
                            run(
                              () =>
                                moveSetAction(
                                  bookSlug,
                                  chapterSlug,
                                  section.key,
                                  set.key,
                                  "down"
                                ),
                              "Moved down"
                            )
                          }
                        >
                          <ArrowDown className="h-3 w-3" aria-hidden="true" /> Down
                        </SetButton>
                        {(() => {
                          // Rendered only where there IS another section. The
                          // title comes from the book, not from the key, so a
                          // section is named the way the book names it.
                          const target = otherSection(sections, section.key);
                          if (!target) return null;
                          return (
                            <SetButton
                              disabled={pending}
                              label={`Move ${set.label} to ${target.title}`}
                              onClick={() =>
                                run(
                                  () =>
                                    moveSetToSectionAction(
                                      bookSlug,
                                      chapterSlug,
                                      section.key,
                                      set.key,
                                      target.key
                                    ),
                                  `Moved to ${target.title}`
                                )
                              }
                            >
                              Move to {target.title}
                            </SetButton>
                          );
                        })()}
                      </div>

                      {isOpen ? (
                        <div className="space-y-5 border-t p-4">
                          {/* The shared passage / Directions block, printed ONCE
                              above the questions that depend on it. */}
                          {first?.context ? (
                            <div className="rounded-md bg-muted/50 p-3 font-serif text-sm">
                              <BlockText text={first.context} />
                            </div>
                          ) : null}

                          {set.questionIds.map((id, i) => {
                            const q = byId.get(id);
                            if (!q) return null;
                            const isOut = excluded.has(id);
                            return (
                              <Question
                                key={id}
                                q={q}
                                index={i + 1}
                                showAnswer={showAnswers}
                                supabaseUrl={supabaseUrl}
                                excluded={isOut}
                                sittings={recurrence[id] ?? []}
                                pending={pending}
                                onToggleExclude={() =>
                                  run(
                                    () =>
                                      setExcludedAction(
                                        bookSlug,
                                        chapterSlug,
                                        id,
                                        !isOut
                                      ),
                                    isOut
                                      ? "Back in the book"
                                      : "Excluded from the book"
                                  )
                                }
                              />
                            );
                          })}
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

function SetButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors hover:bg-muted disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </button>
  );
}

function Question({
  q,
  index,
  showAnswer,
  supabaseUrl,
  excluded,
  sittings,
  pending,
  onToggleExclude,
}: {
  q: QuestionRow;
  index: number;
  showAnswer: boolean;
  supabaseUrl: string;
  excluded: boolean;
  /** Sittings this question stands for; more than one earns a recurrence line. */
  sittings: string[];
  pending: boolean;
  onToggleExclude: () => void;
}) {
  return (
    <article className={cn("font-serif text-sm", excluded && "opacity-60")}>
      <div className="flex gap-2">
        <span className="shrink-0 font-sans font-medium tabular-nums text-muted-foreground">
          {index}.
        </span>
        <div className="min-w-0 flex-1 space-y-2">
          <div className={cn(excluded && "line-through decoration-2")}>
            <BlockText text={q.text} />
          </div>

          {excluded ? (
            <p className="font-sans text-xs font-medium text-amber-600 dark:text-amber-400">
              Excluded from the book
            </p>
          ) : null}

          {/* Shown here as well as in print, so the person curating sees the
              same claim the book will make. */}
          {sittings.length > 1 ? (
            <p className="font-sans text-xs font-medium text-brand-accent">
              Asked {sittings.length} times: {sittings.join(", ")}
            </p>
          ) : null}

          {q.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={publicImageUrl(supabaseUrl, q.imageUrl)}
              alt=""
              className="max-h-64 rounded border"
            />
          ) : null}

          {q.options.length > 0 ? (
            <ol className="space-y-1">
              {q.options.map((opt) => {
                const correct = showAnswer && opt.isCorrect;
                return (
                  <li
                    key={opt.label}
                    className={cn(
                      "flex gap-2 rounded px-1.5 py-0.5",
                      correct && "bg-emerald-500/10 font-medium"
                    )}
                  >
                    <span className="shrink-0 font-sans text-muted-foreground">
                      ({opt.label.toLowerCase()})
                    </span>
                    <span className="min-w-0 flex-1">
                      <BlockText text={opt.text} />
                      {opt.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={publicImageUrl(supabaseUrl, opt.imageUrl)}
                          alt=""
                          className="mt-1 max-h-40 rounded border"
                        />
                      ) : null}
                    </span>
                    {correct ? (
                      <span className="ml-auto shrink-0 font-sans text-xs text-emerald-600 dark:text-emerald-400">
                        correct
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          ) : null}

          {showAnswer && q.solution ? (
            <div className="rounded-md border-l-2 border-brand-accent bg-muted/30 py-2 pl-3 pr-2 text-[0.9rem]">
              <BlockText text={q.solution} />
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <p className="font-sans text-xs text-muted-foreground">
              {[q.questionNumber ? `Q${q.questionNumber}` : null, q.subtopic?.name]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <button
              type="button"
              disabled={pending}
              onClick={onToggleExclude}
              className="inline-flex items-center gap-1 font-sans text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {excluded ? (
                <>
                  <Undo2 className="h-3 w-3" aria-hidden="true" /> Put back in the book
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3" aria-hidden="true" /> Exclude from the book
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
