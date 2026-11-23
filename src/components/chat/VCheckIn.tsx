"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Play, Target } from "lucide-react";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import type { DayCard } from "@/lib/chat/dayCard";
import {
  CHECKIN_CHOICES,
  CHECKIN_OTHER_LABEL,
  CHECKIN_WELL_REPLY,
  checkInChapterReply,
  checkInStuckReply,
  type CheckIn,
  type CheckInAction,
  type CheckInChapter,
  type CheckInChoice,
} from "@/lib/chat/checkIn";
import { useIntlSite } from "@/lib/sites/useIntlSite";
import { progressPathFor } from "@/lib/sites/intl";
import { MESSAGE_IN, USER_BUBBLE, V_BUBBLE } from "./chatStyles";
import VDayCard from "./VDayCard";
import VFace from "./VFace";

type Step = "shown" | CheckInChoice | "chapter" | "other" | "go";

function record(action: Step) {
  sendActivityOnce(`v_checkin:${action}`, { kind: "surface_viewed", surface: "v_checkin", action });
}

/**
 * V's check-in (owner, 2026-11-21, lib/chat/checkIn), under V's question
 * "How's your study going?" the first time a student opens V after 4+ days
 * away. Three taps, each answered the way V answers in the chat (the
 * student's tap on the right, V's reply on the left), each ending in
 * something to do. "Going well" shows the "Your day" card it stands in for.
 * Nothing here is stored as chat: like the day card, it lives for this open.
 */
export default function VCheckIn({
  day,
  checkIn,
  onNavigate,
  onOther,
}: {
  day: DayCard;
  checkIn: CheckIn;
  onNavigate?: () => void;
  /** "Another chapter": the window starts a typed message for the student to finish. */
  onOther: () => void;
}) {
  const [choice, setChoice] = useState<CheckInChoice | null>(null);
  const [picked, setPicked] = useState<CheckInChapter | null>(null);
  useEffect(() => record("shown"), []);

  function choose(c: CheckInChoice) {
    setChoice(c);
    record(c);
  }

  return (
    <div className="ml-9 mt-2 space-y-3">
      {choice === null && (
        <div className="flex flex-col items-start gap-2" role="group" aria-label="How's your study going?">
          {CHECKIN_CHOICES.map((c) => (
            <Chip key={c.id} label={c.label} onClick={() => choose(c.id)} />
          ))}
        </div>
      )}

      {choice !== null && <UserSaid text={CHECKIN_CHOICES.find((c) => c.id === choice)!.label} />}

      {choice === "well" && (
        <>
          <VSaid text={CHECKIN_WELL_REPLY} />
          <div className="-ml-9">
            <VDayCard card={day} onNavigate={onNavigate} />
          </div>
        </>
      )}

      {choice === "stuck" && (
        <>
          <VSaid text={checkInStuckReply(checkIn.stuck)} />
          {picked === null && (
            <div className="flex flex-col items-start gap-2" role="group" aria-label="Which chapter?">
              {checkIn.stuck.map((c) => (
                <Chip
                  key={c.chapterId}
                  label={c.chapter}
                  onClick={() => {
                    setPicked(c);
                    record("chapter");
                  }}
                />
              ))}
              <Chip
                label={checkIn.stuck.length > 0 ? CHECKIN_OTHER_LABEL : "Type the chapter"}
                onClick={() => {
                  record("other");
                  onOther();
                }}
              />
            </div>
          )}
          {picked && (
            <>
              <UserSaid text={picked.chapter} />
              <ChapterReply chapter={picked} onNavigate={onNavigate} />
            </>
          )}
        </>
      )}

      {choice === "short" && (
        <>
          <VSaid text={checkIn.short.text} />
          <Actions actions={[checkIn.short.action]} onNavigate={onNavigate} />
        </>
      )}
    </div>
  );
}

function ChapterReply({ chapter, onNavigate }: { chapter: CheckInChapter; onNavigate?: () => void }) {
  const reply = checkInChapterReply(chapter);
  return (
    <>
      <VSaid text={reply.text} />
      <Actions actions={reply.actions} onNavigate={onNavigate} />
    </>
  );
}

function Chip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-brand-accent/40 bg-card px-3.5 py-1.5 text-sm font-semibold text-brand-accent shadow-sm transition-colors hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {label}
    </button>
  );
}

function UserSaid({ text }: { text: string }) {
  return (
    <div className={`-ml-9 flex flex-col ${MESSAGE_IN}`}>
      <div className={USER_BUBBLE}>{text}</div>
    </div>
  );
}

function VSaid({ text }: { text: string }) {
  return (
    <div className={`-ml-9 flex max-w-[90%] items-end gap-2 ${MESSAGE_IN}`}>
      <VFace avatar="talk" className="h-7 w-7 shrink-0 object-contain" />
      <div className={V_BUBBLE}>{text}</div>
    </div>
  );
}

const ICONS = { notes: BookOpen, fix: Target, practice: Play, performance: ArrowRight } as const;

function Actions({ actions, onNavigate }: { actions: CheckInAction[]; onNavigate?: () => void }) {
  // Full progress is /me/map on intl, which serves no /performance (as the day card).
  const progressPath = progressPathFor(useIntlSite() ? "intl" : "pyqvault");
  return (
    <div className={`flex flex-wrap gap-2 ${MESSAGE_IN}`}>
      {actions.map((a, i) => {
        const Icon = ICONS[a.kind];
        return (
          <Link
            key={a.href}
            href={a.kind === "performance" ? progressPath : a.href}
            prefetch={false}
            onClick={() => {
              record("go");
              onNavigate?.();
            }}
            className={
              i === 0
                ? "inline-flex items-center gap-1 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                : "inline-flex items-center gap-1 rounded-full border border-brand-accent/25 bg-brand-accent/[0.06] px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-accent/45 hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            }
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {a.label}
          </Link>
        );
      })}
    </div>
  );
}
