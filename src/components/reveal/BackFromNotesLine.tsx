"use client";

import { useEffect, useState } from "react";
import { BookOpenCheck } from "lucide-react";
import type { BackTrip } from "@/lib/browse/backToQuestion";
import { sendActivity, sendActivityOnce } from "@/lib/activity/clientBeacon";
import VQuestionCard from "@/components/chat/VQuestionCard";

/**
 * Under a bank card the student came back to after "Teach me the idea"
 * (lib/browse/backToQuestion): the stuck offer has done its job, so the card
 * asks for one more try on the idea instead, with an easier question from the
 * subtopic as V's try card (the offer's own "Try an easier one" question). Not
 * the same question again: its answer was already on screen, so a second go
 * would be recall of the key, not of the idea.
 *
 * Recorded as stuck_offer steps: returned (back on the question), try_after.
 * A notes-chip return shows nothing here; the card's restored answer is enough.
 */
export default function BackFromNotesLine({ trip }: { trip: BackTrip }) {
  const [trying, setTrying] = useState(false);
  const fromOffer = trip.source === "offer";

  useEffect(() => {
    if (!fromOffer) return;
    sendActivityOnce(`stuck_offer:returned:${trip.questionId}`, {
      kind: "surface_viewed",
      surface: "stuck_offer",
      questionId: trip.questionId,
      action: "returned",
    });
  }, [fromOffer, trip.questionId]);

  if (!fromOffer || !trip.easierId) return null;

  return (
    <div
      role="status"
      className="rounded-xl border border-dashed border-brand-accent/40 bg-brand-accent/5 px-3 py-3 font-sans text-sm leading-snug motion-safe:animate-fade-in-up"
    >
      <p className="flex items-start gap-2.5">
        <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <span>
          Back from the notes. Now try one on {trip.subtopic ?? "this topic"} to check the idea.
        </span>
      </p>
      {!trying ? (
        <div className="mt-2.5 pl-6">
          <button
            type="button"
            className="inline-flex min-h-9 items-center justify-center rounded-lg border bg-card px-3 py-1.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => {
              sendActivity({ kind: "surface_viewed", surface: "stuck_offer", questionId: trip.questionId, action: "try_after" });
              setTrying(true);
            }}
          >
            Try one
          </button>
        </div>
      ) : (
        <div className="-ml-9 mt-1">
          <VQuestionCard id={trip.easierId} kind="try" />
        </div>
      )}
    </div>
  );
}
