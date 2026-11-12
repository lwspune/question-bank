"use client";

/**
 * The repeat line under an answered question (2026-11-12): one quiet line,
 * no box, between the options and the solution (owner's pick A over a boxed
 * line). The wording is lib/questions/repeatLine.ts; this only draws it and
 * records "shown" and "See all" for signed-in students.
 *
 * `record`: "all" = shown and taps (one question on screen: card, drill);
 * "tap" = taps only (mock review draws every question at once, so a "shown"
 * per question would be dozens of requests a page); "none" = signed out or a
 * staff view of a student's attempt.
 */
import { useEffect } from "react";
import Link from "next/link";
import { Repeat } from "lucide-react";
import type { RepeatLine } from "@/lib/questions/repeatLine";
import type { RepeatLineFrom } from "@/lib/activity/clientEvents";
import { sendActivity, sendActivityOnce } from "@/lib/activity/clientBeacon";

export default function RepeatLineView({
  line,
  questionId,
  from,
  record,
}: {
  line: RepeatLine;
  questionId: string;
  from: RepeatLineFrom;
  record: "all" | "tap" | "none";
}) {
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

  return (
    <p className="flex items-start gap-2 px-0.5 font-sans text-[13px] leading-snug text-foreground motion-safe:animate-fade-in-up">
      <Repeat className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
      <span>
        <span className="font-semibold">{line.lead}</span>
        {line.rest} ·{" "}
        <Link
          href={line.href}
          prefetch={false}
          onClick={() => {
            if (record !== "none") sendActivity({ kind: "surface_viewed", surface: "repeat_line", questionId, action: "see_all", from });
          }}
          className="whitespace-nowrap rounded-sm font-semibold text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {line.linkText} <span aria-hidden>→</span>
        </Link>
      </span>
    </p>
  );
}
