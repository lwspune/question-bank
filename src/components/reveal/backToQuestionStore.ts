"use client";

import {
  BACK_TO_QUESTION_KEY,
  notesChapterOf,
  parseBackTrip,
  type BackSource,
  type BackTrip,
  type CardAnswer,
} from "@/lib/browse/backToQuestion";

/**
 * sessionStorage for the "Back to your question" trip (lib/browse/backToQuestion).
 * Per tab, so two tabs never steal each other's way back. Every access is
 * guarded: private windows and blocked storage just mean no pill.
 */

export function readBackTrip(): BackTrip | null {
  try {
    return parseBackTrip(sessionStorage.getItem(BACK_TO_QUESTION_KEY), Date.now());
  } catch {
    return null;
  }
}

function write(trip: BackTrip): void {
  try {
    sessionStorage.setItem(BACK_TO_QUESTION_KEY, JSON.stringify(trip));
  } catch {
    /* storage unavailable: no way back is shown, nothing breaks */
  }
}

export function clearBackTrip(): void {
  try {
    sessionStorage.removeItem(BACK_TO_QUESTION_KEY);
  } catch {
    /* ignore */
  }
}

/** Called as a bank card's notes link is followed, before the page changes. */
export function saveBackTrip(input: {
  questionId: string;
  notesHref: string;
  source: BackSource;
  answer: CardAnswer;
  subtopic?: string | null;
  easierId?: string | null;
}): void {
  const notesChapter = notesChapterOf(input.notesHref);
  if (!notesChapter) return;
  write({
    questionId: input.questionId,
    from: window.location.pathname + window.location.search,
    notesChapter,
    source: input.source,
    answer: input.answer,
    subtopic: input.subtopic ?? null,
    easierId: input.easierId ?? null,
    viaPill: false,
    at: Date.now(),
  });
}

/** The pill was tapped: the card will know it came back that way. */
export function markBackViaPill(trip: BackTrip): void {
  write({ ...trip, viaPill: true });
}
