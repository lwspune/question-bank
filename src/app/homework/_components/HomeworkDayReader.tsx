"use client";

/**
 * One homework day on screen (2026-10-10): its questions as /board shows them,
 * a case study's passage once above its parts. Answers are attempt-first and
 * spend the same free answers as /board and /question-papers (useBoardReveal),
 * the owner's call: the day page is not a way round the sign-in prompt.
 */
import { useMemo } from "react";
import BlockText from "@/components/math/BlockText";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import { fromBoardQuestion } from "@/lib/present/viewModel";
import type { BoardQuestion } from "@/lib/board/query";
import type { HomeworkSlot } from "@/lib/homework/dayView";
import BoardQuestionItem from "@/app/board/BoardQuestionItem";
import { useBoardReveal } from "@/app/board/useBoardReveal";

export default function HomeworkDayReader({
  slots,
  examName,
  dayTitle,
  supabaseUrl,
}: {
  slots: HomeworkSlot<BoardQuestion>[];
  /** The DB exams.name, for the free-answer meter. */
  examName: string;
  /** Names where a picked option was answered ("CBSE Class 12 Physics, day 12"). */
  dayTitle: string;
  supabaseUrl: string;
}) {
  const byId = useMemo(() => {
    const m = new Map<string, BoardQuestion>();
    for (const s of slots) for (const q of s.questions) m.set(q.id, q);
    return m;
  }, [slots]);
  const { revealed, blocked, picks, lock, toggleOne, pickOne } = useBoardReveal(examName, dayTitle, byId);
  let order = 0;

  return (
    <PresentRegistry>
      <ol className="space-y-8">
        {slots.map((s) => (
          <li key={s.position} aria-labelledby={`slot-${s.position}`}>
            <div className="mb-2 flex items-baseline gap-2 border-b pb-1.5">
              <h2 id={`slot-${s.position}`} className="text-base font-semibold text-foreground">
                Question {s.position}
                {s.questions.length > 1 && (
                  <span className="font-normal text-muted-foreground"> (case study, {s.questions.length} parts)</span>
                )}
              </h2>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{s.chapter}</span>. {s.note}
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
                      onToggleReveal={() => toggleOne(q.id)}
                      pick={picks.get(q.id) ?? null}
                      onPick={(label) => pickOne(q.id, label)}
                    />
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
    </PresentRegistry>
  );
}
