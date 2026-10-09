"use client";

/**
 * Answer state for a board reader: which answers are open, which taps the
 * free-answer limit refused, and the option each question's reader picked.
 * Shared by /board (BoardReader) and /question-papers (PaperReader,
 * 2026-10-09), so both spend the same free answers the same way.
 *
 * Moved out of BoardReader unchanged. Answers are logged as the "board"
 * surface on both pages: a board paper is board practice, and a new surface
 * name would also have to be added to the PMF migrations (0108, 0112, 0132).
 */
import { useState } from "react";
import { useRevealMeter, type RevealPick } from "@/components/reveal/useRevealMeter";
import { gradePick } from "@/lib/questions/bankVerdict";
import { toPickLabel } from "@/lib/questions/practiceBatch";
import { useMobilePrompt } from "@/lib/profile/MobilePromptProvider";
import RevealLockedLink from "@/components/reveal/RevealLockedLink";
import { RevealDailyLink } from "@/components/reveal/RevealDailyLimit";
import type { BoardQuestion } from "@/lib/board/query";
import type { RevealLock } from "./BoardQuestionItem";

export function useBoardReveal(
  /** The DB `exams.name`: attributes a reveal-wall hit to its exam, in the
   *  same vocabulary /browse uses. */
  examName: string,
  /** Names where a picked option was answered (a chapter, or a paper). */
  context: string,
  /** Every question on the page by id, so a tap can be read against its key. */
  byId: ReadonlyMap<string, BoardQuestion>
) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  // The option a reader tapped, per question (2026-10-04). Board readers had
  // learned tap-to-check on /browse and tapped board options that did nothing.
  const [picks, setPicks] = useState<Map<string, string>>(new Map());
  // "board", not the bank: a reveal here is the textbook reader being used, and
  // until 2026-09-18 it was recorded as a /browse reveal and measured as one.
  const meter = useRevealMeter("board", examName);
  // Free reveals spent: an unseen answer shows a sign-in link up front instead
  // of a button whose tap would be refused. One link node, shared by every card.
  // Signed in, a lock can only be today's free-answer limit (migration 0134).
  const lock: RevealLock = {
    isLocked: meter.isLocked,
    link: meter.signedIn ? (
      <RevealDailyLink surface="board" />
    ) : (
      <RevealLockedLink surface="board" examName={examName} />
    ),
  };
  const mobilePrompt = useMobilePrompt();

  /** The tap as a pick: graded on the server (2026-10-04, the owner's call),
   *  and read here by the same rule for the "right in a row" message. */
  const pickFor = (id: string, label: string): RevealPick | undefined => {
    const q = byId.get(id);
    const chose = toPickLabel(label);
    if (!q || q.format !== "mcq" || !chose) return undefined;
    const verdict = gradePick(chose, {
      format: q.format,
      cancelled: false,
      options: q.options.map((o) => ({ label: o.label, isCorrect: o.isCorrect })),
    });
    return { label: chose, correct: verdict?.correct ?? null };
  };

  const toggleOne = (id: string) => {
    // Hiding an already-revealed answer is always free, and clears the pick so
    // the reader can try again.
    if (revealed.has(id)) {
      setRevealed((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setPicks((prev) => {
        const next = new Map(prev);
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

  // Tapping an option checks it: the first tap is a reveal (same free budget
  // and sign-in lock as "Show answer"), a later tap only moves the pick, as on
  // /browse. The FIRST tap carries the pick, and the server grades it and feeds
  // a miss to the drill (2026-10-04, the owner's call). A tap after "Show
  // answer" or after hiding and re-showing is not an attempt: the beacon and
  // the run counter each admit one act per question per page session.
  const pickOne = (id: string, label: string) => {
    if (!revealed.has(id)) {
      if (!meter.attemptReveal(id, pickFor(id, label), context)) {
        setBlocked((prev) => new Set(prev).add(id));
        return;
      }
      mobilePrompt.notifyReveal();
      setRevealed((prev) => new Set(prev).add(id));
    }
    setPicks((prev) => new Map(prev).set(id, label));
  };

  return { revealed, blocked, picks, lock, toggleOne, pickOne };
}
