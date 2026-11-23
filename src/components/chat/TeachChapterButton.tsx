"use client";

import { useEffect } from "react";
import { askVText } from "@/lib/chat/askVEvent";
import { useVExplain } from "@/lib/chat/useVExplain";
import { teachChapterMessage, type TeachChapterFrom } from "@/lib/chat/teachChapter";
import { sendActivity, sendActivityOnce } from "@/lib/activity/clientBeacon";

/**
 * "Teach me" beside a weak chapter (2026-11-21, owner-approved mockup): opens V
 * with "Teach me Vectors for MHT-CET.", which V answers with chapter_overview
 * from the student's waiting mistakes (the message said "Start from what I got
 * wrong." until 2026-11-23, when the owner found it confusing). Shown only
 * while V can teach (the explain switch, /dashboard/chat): a button that opens
 * V to say it cannot help is worse than none. Seen and tapped are recorded for
 * the v-teach-chapter experiment.
 */
export default function TeachChapterButton({
  chapter,
  place,
  exam,
  startWith,
  chapterId,
  from,
  label = "Teach me",
  className,
}: {
  chapter: string;
  place?: string | null;
  exam?: string | null;
  startWith?: string | null;
  chapterId?: string | null;
  from: TeachChapterFrom;
  label?: string;
  className: string;
}) {
  const on = useVExplain();

  useEffect(() => {
    if (on) sendActivityOnce(`teach_chapter:shown:${from}`, { kind: "surface_viewed", surface: "teach_chapter", action: "shown", from });
  }, [on, from]);

  if (!on) return null;
  return (
    <button
      type="button"
      aria-label={`Ask V to teach ${chapter}`}
      className={className}
      onClick={() => {
        sendActivity({ kind: "surface_viewed", surface: "teach_chapter", action: "tap", from, ...(chapterId ? { chapterId } : {}) });
        askVText(teachChapterMessage({ chapter, place, exam, startWith }));
      }}
    >
      {label}
    </button>
  );
}
