"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Lightbulb } from "lucide-react";
import { stuckOfferLine, type StuckOffer } from "@/lib/questions/stuckOffer";
import { askVText } from "@/lib/chat/askVEvent";
import { sendActivity, sendActivityOnce } from "@/lib/activity/clientBeacon";
import VQuestionCard from "@/components/chat/VQuestionCard";
import { dismissMoment } from "./momentStore";

// Loaded on the first Teach tap only (2026-11-15): most offers are never
// opened, and the notes blocks are not light.
const TeachPanel = dynamic(() => import("./TeachPanel"), { ssr: false });

/**
 * "3 of your last 4 on <subtopic> were wrong. Want help with the idea behind
 * it?" under a bank answer (owner, 2026-11-10). The rule is
 * lib/questions/stuckOffer; it is one of the moments MomentLine draws (the one line under an answer).
 * Teach me the idea opens our notes for the subtopic in a panel on the same
 * page (TeachPanel, 2026-11-15; until then it left for the notes page), then
 * offers "Now try one like it"; with no notes it asks V for the idea; Try an easier one shows an
 * easier question from the subtopic here, as V's try card; Keep going folds it
 * away. Each step is recorded (surface stuck_offer) for the experiment.
 */
const BUTTON =
  "inline-flex min-h-9 items-center justify-center rounded-lg border bg-card px-3 py-1.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type Action = "teach" | "easier" | "keep" | "teach_close" | "full_notes" | "try_after";

export default function StuckOfferLine({
  offer,
  questionId,
  notesHref,
  onTeach,
}: {
  offer: StuckOffer;
  questionId: string;
  notesHref: string | null;
  /** Called as Teach me the idea opens the notes, so the card can save the way back. */
  onTeach?: (offer: { subtopic: string; easierId: string | null }) => void;
}) {
  const [easier, setEasier] = useState(false);
  const [teachOpen, setTeachOpen] = useState(false);
  const [teachMounted, setTeachMounted] = useState(false);
  const [taught, setTaught] = useState(false);

  useEffect(() => {
    sendActivityOnce(`stuck_offer:shown:${questionId}`, { kind: "surface_viewed", surface: "stuck_offer", questionId, action: "shown" });
  }, [questionId]);

  const track = (action: Action) => sendActivity({ kind: "surface_viewed", surface: "stuck_offer", questionId, action });

  return (
    <div
      role="status"
      className="rounded-xl border border-dashed border-brand-accent/40 bg-brand-accent/5 px-3 py-3 font-sans text-sm leading-snug motion-safe:animate-fade-in-up"
    >
      <p className="flex items-start gap-2.5">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <span>{stuckOfferLine(offer.subtopic, offer.history)}</span>
      </p>
      {!easier && (
        <div className="mt-2.5 flex flex-wrap items-center gap-2 pl-6">
          {taught && offer.easierId ? (
            <button
              type="button"
              className={BUTTON}
              onClick={() => {
                track("try_after");
                setEasier(true);
              }}
            >
              Now try one like it
            </button>
          ) : notesHref ? (
            <button
              type="button"
              aria-haspopup="dialog"
              className={BUTTON}
              onClick={() => {
                track("teach");
                setTeachMounted(true);
                setTeachOpen(true);
              }}
            >
              Teach me the idea
            </button>
          ) : (
            <button
              type="button"
              className={BUTTON}
              onClick={() => {
                track("teach");
                askVText(`Explain the idea behind ${offer.subtopic}.`);
              }}
            >
              Teach me the idea
            </button>
          )}
          {offer.easierId && !taught && (
            <button
              type="button"
              className={BUTTON}
              onClick={() => {
                track("easier");
                setEasier(true);
              }}
            >
              Try an easier one
            </button>
          )}
          <button
            type="button"
            className="inline-flex min-h-9 items-center rounded-lg px-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => {
              track("keep");
              dismissMoment(questionId);
            }}
          >
            Keep going
          </button>
        </div>
      )}
      {teachMounted && notesHref && (
        <TeachPanel
          open={teachOpen}
          onOpenChange={(next) => {
            if (!next) {
              track("teach_close");
              setTaught(true);
            }
            setTeachOpen(next);
          }}
          notesHref={notesHref}
          onFullNotes={() => {
            track("full_notes");
            onTeach?.({ subtopic: offer.subtopic, easierId: offer.easierId ?? null });
          }}
        />
      )}
      {easier && offer.easierId && (
        <div className="-ml-9 mt-1">
          <VQuestionCard id={offer.easierId} kind="try" />
        </div>
      )}
    </div>
  );
}
