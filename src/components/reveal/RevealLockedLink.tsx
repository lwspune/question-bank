"use client";

import { useEffect } from "react";
import { Lock } from "lucide-react";
import { trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import type { PracticeSurface } from "@/lib/questions/practiceBatch";
import { useGoogleOneTap } from "@/components/auth/useGoogleOneTap";
import SignInLink from "./SignInLink";

/**
 * Stands where a reveal button would be once an anon viewer's free reveals are
 * spent, so the wall is visible BEFORE a tap rather than discovered by a tap
 * that does nothing (Clarity dead + rage clicks, 2026-10-01).
 *
 * Mounting it counts as meeting the wall: the visitor no longer taps a button
 * and gets refused, so `reveal_wall_hit` would otherwise go quiet while
 * `reveal_wall_signin_click` kept counting, and the conversion rate would lose
 * its denominator. Both are once per session, as before.
 *
 * It also offers Google One Tap: the visitor can sign in over this page instead
 * of following the link to /login (where most of them left within seconds).
 */
export default function RevealLockedLink({
  surface,
  examName,
}: {
  surface: PracticeSurface;
  examName: string;
}) {
  const offerOneTap = useGoogleOneTap();

  useEffect(() => {
    trackFunnelOnce("reveal_wall_hit", surface, { surface, exam: examName });
  }, [surface, examName]);

  // Re-runs when the hook's own auth check resolves; One Tap asks once a page.
  useEffect(() => {
    offerOneTap();
  }, [offerOneTap]);

  return (
    <SignInLink
      onClick={() => trackFunnelOnce("reveal_wall_signin_click", surface, { surface })}
      className="inline-flex items-center gap-1 rounded-sm font-sans text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Lock className="h-3.5 w-3.5" aria-hidden />
      Sign in to see the answer
    </SignInLink>
  );
}
