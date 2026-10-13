"use client";

/**
 * A list of homework slots: each a question, or a case study with its passage
 * once above its parts, headed by how often the board asked it. Shared by a
 * homework day (HomeworkDayReader) and a /board chapter's Top 10 PYQs tab
 * (2026-10-13), which keeps its reveal state with the rest of the board page,
 * so the reveal state comes in from the caller.
 */
import BlockText from "@/components/math/BlockText";
import { fromBoardQuestion } from "@/lib/present/viewModel";
import type { BoardQuestion } from "@/lib/board/query";
import type { HomeworkSlot } from "@/lib/homework/dayView";
import BoardQuestionItem, { type RevealLock } from "@/app/board/BoardQuestionItem";

export default function HomeworkSlotList({
  slots,
  supabaseUrl,
  showChapter = true,
  idPrefix = "slot",
  revealed,
  blocked,
  lock,
  onToggleReveal,
  picks,
  onPick,
}: {
  slots: HomeworkSlot<BoardQuestion>[];
  supabaseUrl: string;
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
}) {
  let order = 0;
  return (
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
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            {showChapter && (
              <>
                <span className="font-medium text-foreground">{s.chapter}</span>.{" "}
              </>
            )}
            {s.note}
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
                      <BlockText text={q.context} />
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
                  />
                </div>
              );
            })}
          </div>
        </li>
      ))}
    </ol>
  );
}
