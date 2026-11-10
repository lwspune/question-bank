"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { stuckOfferLine } from "@/lib/questions/stuckOffer";
import { askVText } from "@/lib/chat/askVEvent";
import { sendActivity, sendActivityOnce } from "@/lib/activity/clientBeacon";
import VQuestionCard from "@/components/chat/VQuestionCard";
import { dismissStuckOffer, useStuckOffer } from "./stuckOfferStore";

/**
 * "3 of your last 4 on <subtopic> were wrong. Want help with the idea behind
 * it?" under a bank answer (owner, 2026-11-10). The rule is
 * lib/questions/stuckOffer; how the card learns it is stuckOfferStore.
 * Teach me the idea opens our notes for the subtopic (the card's own notes
 * chip link) or, with none, asks V for the idea; Try an easier one shows an
 * easier question from the subtopic here, as V's try card; Keep going folds it
 * away. Each step is recorded (surface stuck_offer) for the experiment.
 */
const BUTTON =
  "inline-flex min-h-9 items-center justify-center rounded-lg border bg-card px-3 py-1.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type Action = "teach" | "easier" | "keep";

export default function StuckOfferLine({ questionId, notesHref }: { questionId: string; notesHref: string | null }) {
  const offer = useStuckOffer(questionId);
  const [easier, setEasier] = useState(false);

  useEffect(() => {
    if (offer) sendActivityOnce(`stuck_offer:shown:${questionId}`, { kind: "surface_viewed", surface: "stuck_offer", questionId, action: "shown" });
  }, [offer, questionId]);

  if (!offer) return null;
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
          {notesHref ? (
            <Link href={notesHref} prefetch={false} className={BUTTON} onClick={() => track("teach")}>
              Teach me the idea
            </Link>
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
          {offer.easierId && (
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
              dismissStuckOffer(questionId);
            }}
          >
            Keep going
          </button>
        </div>
      )}
      {easier && offer.easierId && (
        <div className="-ml-9 mt-1">
          <VQuestionCard id={offer.easierId} kind="try" />
        </div>
      )}
    </div>
  );
}
