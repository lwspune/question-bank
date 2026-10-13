"use client";

/**
 * One homework day on screen (2026-10-10): its questions as /board shows them,
 * a case study's passage once above its parts. Answers are attempt-first and
 * spend the same free answers as /board and /question-papers (useBoardReveal),
 * the owner's call: the day page is not a way round the sign-in prompt.
 */
import { useMemo } from "react";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import type { BoardQuestion } from "@/lib/board/query";
import type { HomeworkSlot } from "@/lib/homework/dayView";
import { useBoardReveal } from "@/app/board/useBoardReveal";
import HomeworkSlotList from "./HomeworkSlotList";

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

  return (
    <PresentRegistry>
      <HomeworkSlotList
        slots={slots}
        supabaseUrl={supabaseUrl}
        revealed={revealed}
        blocked={blocked}
        lock={lock}
        onToggleReveal={toggleOne}
        picks={picks}
        onPick={pickOne}
      />
    </PresentRegistry>
  );
}
