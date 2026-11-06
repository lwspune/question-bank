"use client";

/**
 * A list of homework slots: each a question, or a case study with its passage
 * once above its parts, headed by how often the board asked it. Shared by a
 * homework day (HomeworkDayReader) and a /board chapter's Top 10 PYQs tab
 * (2026-10-13), which keeps its reveal state with the rest of the board page,
 * so the reveal state comes in from the caller.
 */
import Link from "next/link";
import { Check, ChevronRight, Clock } from "lucide-react";
import BlockText from "@/components/math/BlockText";
import { seeAllLabel } from "@/lib/homework/display";
import { groupHref } from "@/lib/homework/links";
import BoardPassage from "@/app/board/BoardPassage";
import BoardLangSwitch from "@/app/board/BoardLangSwitch";
import { fromBoardQuestion } from "@/lib/present/viewModel";
import type { BoardQuestion } from "@/lib/board/query";
import type { HomeworkSlot } from "@/lib/homework/dayView";
import BoardQuestionItem, { type RevealLock } from "@/app/board/BoardQuestionItem";
import { ExamTwinLine } from "@/components/crossExam/ExamTwins";
import type { QuestionMark } from "@/lib/homework/progress";
import type { SelfMark } from "@/lib/questions/selfMark";

export default function HomeworkSlotList({
  slots,
  supabaseUrl,
  planSlug,
  showChapter = true,
  idPrefix = "slot",
  revealed,
  blocked,
  lock,
  onToggleReveal,
  picks,
  onPick,
  marks,
  due,
}: {
  slots: HomeworkSlot<BoardQuestion>[];
  supabaseUrl: string;
  /** The plan the slots come from: with it, a slot that stands for a repeat or
   *  a type links every question of that group (2026-11-04). */
  planSlug?: string;
  /** Name the chapter above each slot. Off where the page is one chapter. */
  showChapter?: boolean;
  /** Prefix of each slot heading's id, unique on the page. */
  idPrefix?: string;
  revealed: Set<string>;
  blocked: Set<string>;
  lock: RevealLock;
  onToggleReveal: (id: string) => void;
  picks: Map<string, string>;
  onPick: (id: string, label: string) => void;
  /** The signed-in student's mark per question (a homework day, 2026-11-05):
   *  each finished slot gets a Done or To review label. Absent elsewhere. */
  marks?: Readonly<Record<string, QuestionMark | undefined>>;
  /** Questions waiting in Fix your mistakes. */
  due?: ReadonlySet<string>;
}) {
  let order = 0;
  return (
    <>
      <BoardLangSwitch questions={slots.flatMap((s) => s.questions)} className="mb-4" />
      <ol className="space-y-8">
        {slots.map((s) => (
          <li key={s.position} aria-labelledby={`${idPrefix}-${s.position}`}>
            <div className="mb-2 flex items-baseline gap-2 border-b pb-1.5">
              <h2 id={`${idPrefix}-${s.position}`} className="text-base font-semibold text-foreground">
                Question {s.position}
                {s.questions.length > 1 && (
                  <span className="font-normal text-muted-foreground"> (case study, {s.questions.length} parts)</span>
                )}
              </h2>
              {marks && <SlotMark parts={s.questions.map((q) => q.id)} marks={marks} due={due} />}
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              {showChapter && (
                <>
                  <span className="font-medium text-foreground">{s.chapter}</span>.{" "}
                </>
              )}
              {s.note}
              {(() => {
                const label = planSlug && s.group != null ? seeAllLabel(s.note) : null;
                return label ? (
                  <>
                    {" "}
                    <Link
                      href={groupHref(planSlug!, s.group!)}
                      prefetch={false}
                      className="inline-flex items-center gap-0.5 whitespace-nowrap font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {label}
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </>
                ) : null;
              })()}
            </p>
            {s.passage && (
              <div className="mb-3 rounded-md border-l-2 border-brand-accent/40 bg-muted/30 px-3 py-2 font-serif text-sm text-muted-foreground">
                <BlockText text={s.passage} />
              </div>
            )}
            <div className="space-y-3">
              {s.questions.map((q) => {
                order += 1;
                return (
                  <div key={q.id}>
                    {q.context && (
                      <div className="mb-2 rounded-md border-l-2 border-brand-accent/40 bg-muted/30 px-3 py-2 font-serif text-sm text-muted-foreground">
                        <BoardPassage q={q} />
                      </div>
                    )}
                    <BoardQuestionItem
                      q={q}
                      supabaseUrl={supabaseUrl}
                      present={fromBoardQuestion(
                        { ...q, context: q.context ?? s.passage },
                        { chapter: s.chapter, sectionLabel: null }
                      )}
                      order={order}
                      revealed={revealed.has(q.id)}
                      blocked={blocked.has(q.id)}
                      lockedLink={lock.isLocked(q.id) ? lock.link : null}
                      onToggleReveal={() => onToggleReveal(q.id)}
                      pick={picks.get(q.id) ?? null}
                      onPick={(label) => onPick(q.id, label)}
                      selfMarked={selfMarkOf(marks?.[q.id])}
                      meta={<ExamTwinLine questionId={q.id} />}
                    />
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

function selfMarkOf(m: QuestionMark | undefined): SelfMark | null {
  return m === "understood" || m === "review" ? m : null;
}

/** "Done" once every part of the slot is marked; "To review" when a part is
 *  waiting in Fix your mistakes. Nothing while a part is unmarked. */
function SlotMark({
  parts,
  marks,
  due,
}: {
  parts: string[];
  marks: Readonly<Record<string, QuestionMark | undefined>>;
  due?: ReadonlySet<string>;
}) {
  if (!parts.every((id) => marks[id])) return null;
  if (parts.some((id) => due?.has(id))) {
    return (
      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
        <Clock className="h-3.5 w-3.5" aria-hidden />
        To review
      </span>
    );
  }
  return (
    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand-accent">
      <Check className="h-3.5 w-3.5" aria-hidden />
      Done
    </span>
  );
}
