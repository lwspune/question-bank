"use client";

import StuckOfferLine from "./StuckOfferLine";
import SameMistakeLine from "./SameMistakeLine";
import { useMoment } from "./momentStore";

/**
 * The one line under a bank answer (2026-11-14): draws whichever single
 * teaching moment the practice route chose for this card (the order lives in
 * lib/questions/teachingMoment), or nothing. Every new moment is drawn here,
 * so no two offers can stack under one answer.
 */
export default function MomentLine({
  questionId,
  hasSolution,
  notesHref,
  onTeach,
}: {
  questionId: string;
  hasSolution: boolean;
  notesHref: string | null;
  onTeach?: (offer: { subtopic: string; easierId: string | null }) => void;
}) {
  const moment = useMoment(questionId);
  if (!moment) return null;
  if (moment.kind === "same_mistake") return <SameMistakeLine moment={moment} hasSolution={hasSolution} />;
  return <StuckOfferLine offer={moment.offer} questionId={questionId} notesHref={notesHref} onTeach={onTeach} />;
}
