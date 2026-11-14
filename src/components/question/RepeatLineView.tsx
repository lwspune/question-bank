"use client";

/**
 * The repeat line under an answered question (2026-11-12): one quiet line,
 * no box, between the options and the solution (owner's pick A over a boxed
 * line). The wording is lib/questions/repeatLine.ts; this draws it and records
 * "shown" and "See all" for signed-in students.
 *
 * SEE ALL OPENS IN PLACE (owner, 2026-11-15): a panel on the same page
 * (RepeatGroupPanel), like V's chat, so a student tries the other papers
 * without leaving their card. Closing it and leaving for the full page are
 * recorded too (close, full_page): did they come back or stray away?
 *
 * `record`: "all" = shown and taps (one question on screen: card, drill);
 * "tap" = taps only (mock review draws every question at once, so a "shown"
 * per question would be dozens of requests a page); "none" = signed out or a
 * staff view of a student's attempt.
 */
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Repeat } from "lucide-react";
import type { RepeatLine } from "@/lib/questions/repeatLine";
import type { RepeatLineFrom } from "@/lib/activity/clientEvents";
import { sendActivity, sendActivityOnce } from "@/lib/activity/clientBeacon";
// Loaded on the first tap only: the panel carries the homework reader, which
// every question page would otherwise download for a line most never open,
// and nothing in it may run during a cached page's server render.
const RepeatGroupPanel = dynamic(() => import("./RepeatGroupPanel"), {
  ssr: false,
});

type Step = "see_all" | "close" | "full_page";

export default function RepeatLineView({
  line,
  questionId,
  from,
  record,
  correct = null,
}: {
  line: RepeatLine;
  questionId: string;
  from: RepeatLineFrom;
  record: "all" | "tap" | "none";
  /** How the student did on this question, for the panel's first line; null when not known. */
  correct?: boolean | null;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (record !== "all") return;
    sendActivityOnce(`repeat_line:${from}:${questionId}`, {
      kind: "surface_viewed",
      surface: "repeat_line",
      questionId,
      action: "shown",
      from,
    });
  }, [record, from, questionId]);

  const track = (action: Step) => {
    if (record !== "none")
      sendActivity({
        kind: "surface_viewed",
        surface: "repeat_line",
        questionId,
        action,
        from,
      });
  };

  return (
    <>
      <p className="flex items-start gap-2 px-0.5 font-sans text-[13px] leading-snug text-foreground motion-safe:animate-fade-in-up">
        <Repeat
          className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent"
          aria-hidden
        />
        <span>
          <span className="font-semibold">{line.lead}</span>
          {line.rest} ·{" "}
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => {
              track("see_all");
              setMounted(true);
              setOpen(true);
            }}
            className="whitespace-nowrap rounded-sm font-semibold text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {line.linkText} <span aria-hidden>→</span>
          </button>
        </span>
      </p>
      {mounted && (
        <RepeatGroupPanel
          open={open}
          onOpenChange={(next) => {
            if (!next) track("close");
            setOpen(next);
          }}
          line={line}
          questionId={questionId}
          correct={correct}
          onFullPage={() => track("full_page")}
        />
      )}
    </>
  );
}
