"use client";

import { useEffect } from "react";
import { History } from "lucide-react";
import { sameMistakeLine, type SameMistake } from "@/lib/questions/teachingMoment";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";

/**
 * "You picked B here last time too (12 Nov)." under a bank answer the student
 * had missed before (2026-11-14, owner-approved mockup). The words are
 * lib/questions/teachingMoment; this only draws them and records that they
 * were seen (surface teaching_moment), for the before/after read.
 */
export default function SameMistakeLine({ moment, hasSolution }: { moment: SameMistake; hasSolution: boolean }) {
  useEffect(() => {
    sendActivityOnce(`teaching_moment:same_mistake:${moment.questionId}`, {
      kind: "surface_viewed",
      surface: "teaching_moment",
      moment: "same_mistake",
      questionId: moment.questionId,
      action: "shown",
    });
  }, [moment.questionId]);

  const { lead, rest } = sameMistakeLine(moment, { now: new Date(), hasSolution });
  return (
    <p
      role="status"
      className="flex items-start gap-2.5 rounded-xl border border-dashed border-brand-accent/40 bg-brand-accent/5 px-3 py-3 font-sans text-sm leading-snug motion-safe:animate-fade-in-up"
    >
      <History className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
      <span>
        <span className="font-semibold">{lead}</span>
        {rest}
      </span>
    </p>
  );
}
