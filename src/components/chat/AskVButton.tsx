"use client";

import { MessageCircleQuestion } from "lucide-react";
import SignInLink from "@/components/reveal/SignInLink";
import { askVAbout, type AskVDetail } from "@/lib/chat/askVEvent";
import type { NotesItemRef } from "@/lib/chat/notesItem";
import { useVExplain } from "@/lib/chat/useVExplain";
import { useViewerSession } from "@/lib/viewer/useViewerSession";

const LOOK =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-brand/30 bg-card px-3 py-1.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
// A notes practice rep's row is one line: the button there is the size of its "answer" button.
const COMPACT =
  "inline-flex items-center gap-1 whitespace-nowrap rounded border border-brand/30 bg-card px-2 py-0.5 text-xs font-semibold text-brand-accent transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * "Ask V" on a question card (2026-10-19, study-partner Phase 1): opens V with
 * this question attached, and the option the student picked if they answered.
 * Hidden while explanations are switched off. Signed out it is a sign-in link
 * (owner: explanations are for accounts, like answers).
 *
 * 2026-10-20: also on notes and guide questions. A bank question passes its
 * id; a practice question written into the notes passes `notes` (its concept
 * and position, lib/chat/notesItem.ts) instead.
 */
export default function AskVButton(
  props: (
    | {
        questionId: string;
        chose: string | null;
        /** From a mock review: the number entered on a numeric question, or that it was skipped. */
        entered?: number | null;
        skipped?: boolean;
      }
    | { notes: NotesItemRef }
  ) & {
    className?: string;
    compact?: boolean;
    /** Names the question when a page has many of them ("Ask V about practice rep 2"). */
    ariaLabel?: string;
  }
) {
  const { className = "", compact = false, ariaLabel = "Ask V to explain this question" } = props;
  const detail: AskVDetail =
    "notes" in props
      ? { notes: props.notes, chose: null }
      : { questionId: props.questionId, chose: props.chose, entered: props.entered, skipped: props.skipped };
  const look = compact ? COMPACT : LOOK;
  const on = useVExplain();
  // One identity request per page load, shared with the header (lib/viewer/useViewerSession).
  const { session, loading } = useViewerSession();
  const signedIn = !!session;
  if (!on || loading) return null;
  const inner = (
    <>
      <MessageCircleQuestion className={compact ? "h-3 w-3" : "h-4 w-4"} aria-hidden />
      Ask V
    </>
  );
  if (!signedIn) {
    return (
      <SignInLink className={`${look} ${className}`} aria-label="Sign in to ask V about this question">
        {inner}
      </SignInLink>
    );
  }
  return (
    <button
      type="button"
      onClick={() => askVAbout(detail)}
      aria-label={ariaLabel}
      className={`${look} ${className}`}
    >
      {inner}
    </button>
  );
}
