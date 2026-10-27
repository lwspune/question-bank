"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, Clock, Loader2, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import SignInLink from "@/components/reveal/SignInLink";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { drillHref } from "@/lib/drill/from";
import { invalidatePulse } from "@/lib/viewer/usePulse";
import { selfMarkMessage, type SelfMark, type SelfMarkOutcome, type SelfMarkSurface } from "@/lib/questions/selfMark";
import { parkSelfMark, postSelfMark } from "./selfMarkClient";

const BUTTON =
  "inline-flex h-9 items-center gap-1.5 rounded-md border bg-background px-3 font-sans text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60";

/**
 * "Understood / Review later" under a written model answer (2026-10-28). The
 * student judges their own written answer; Review later sends the question to
 * Fix your mistakes. Mounted only while the model answer is open, so a list of
 * 50 cards holds at most the few the student has opened.
 *
 * Signed out, the buttons still show. A tap parks itself in this browser and
 * asks the visitor to sign in; PendingSelfMarkSaver (root layout) saves it
 * when they come back signed in.
 */
export default function SelfMarkButtons({
  questionId,
  surface,
  className,
}: {
  questionId: string;
  surface: SelfMarkSurface;
  className?: string;
}) {
  const { signedIn, loading } = useSignedIn();
  const [busy, setBusy] = useState<SelfMark | null>(null);
  const [outcome, setOutcome] = useState<SelfMarkOutcome | null>(null);
  const [needsSignIn, setNeedsSignIn] = useState(false);

  async function mark(m: SelfMark) {
    if (busy || loading) return;
    if (!signedIn) {
      parkSelfMark({ questionId, mark: m, surface });
      setNeedsSignIn(true);
      return;
    }
    setBusy(m);
    const res = await postSelfMark({ questionId, mark: m, surface });
    setBusy(null);
    if (res.ok) {
      setOutcome(res.outcome);
      toast.success(selfMarkMessage(res.outcome));
      // The avatar badge counts the drill's pool, which this may have changed.
      invalidatePulse();
    } else if (res.signedOut) {
      parkSelfMark({ questionId, mark: m, surface });
      setNeedsSignIn(true);
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className={cn("font-sans", className)} aria-live="polite">
      {outcome ? (
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
          {selfMarkMessage(outcome)}
          {outcome === "saved" && (
            <Link
              href={drillHref("review")}
              prefetch={false}
              className="font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Open it
            </Link>
          )}
        </p>
      ) : (
        <>
          <div role="group" aria-label="How did your answer compare with the model answer?" className="flex flex-wrap gap-2">
            <button type="button" onClick={() => mark("understood")} disabled={busy !== null} className={BUTTON}>
              {busy === "understood" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Check className="h-4 w-4 text-emerald-600" aria-hidden />
              )}
              Understood
            </button>
            <button type="button" onClick={() => mark("review")} disabled={busy !== null} className={BUTTON}>
              {busy === "review" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Clock className="h-4 w-4 text-brand-accent" aria-hidden />
              )}
              Review later
            </button>
          </div>
          {needsSignIn && (
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              Sign in to save your progress.
              <SignInLink className="inline-flex items-center gap-1 font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <LogIn className="h-3.5 w-3.5" aria-hidden />
                Sign in
              </SignInLink>
            </p>
          )}
        </>
      )}
    </div>
  );
}
