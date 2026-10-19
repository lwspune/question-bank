"use client";

import { MessageCircleQuestion } from "lucide-react";
import SignInLink from "@/components/reveal/SignInLink";
import { askVAbout } from "@/lib/chat/askVEvent";
import { useVExplain } from "@/lib/chat/useVExplain";
import { useViewerSession } from "@/lib/viewer/useViewerSession";

const LOOK =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-brand/30 bg-card px-3 py-1.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * "Ask V" on a question card (2026-10-19, study-partner Phase 1): opens V with
 * this question attached, and the option the student picked if they answered.
 * Hidden while explanations are switched off. Signed out it is a sign-in link
 * (owner: explanations are for accounts, like answers).
 */
export default function AskVButton({
  questionId,
  chose,
  className = "",
}: {
  questionId: string;
  chose: string | null;
  className?: string;
}) {
  const on = useVExplain();
  // One identity request per page load, shared with the header (lib/viewer/useViewerSession).
  const { session, loading } = useViewerSession();
  const signedIn = !!session;
  if (!on || loading) return null;
  const inner = (
    <>
      <MessageCircleQuestion className="h-4 w-4" aria-hidden />
      Ask V
    </>
  );
  if (!signedIn) {
    return (
      <SignInLink className={`${LOOK} ${className}`} aria-label="Sign in to ask V about this question">
        {inner}
      </SignInLink>
    );
  }
  return (
    <button
      type="button"
      onClick={() => askVAbout({ questionId, chose })}
      aria-label="Ask V to explain this question"
      className={`${LOOK} ${className}`}
    >
      {inner}
    </button>
  );
}
