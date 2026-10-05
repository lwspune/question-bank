"use client";

import { useEffect } from "react";
import { Lock, LogIn } from "lucide-react";
import { trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import type { PracticeSurface } from "@/lib/questions/practiceBatch";
import { useGoogleOneTap } from "@/components/auth/useGoogleOneTap";
import SignInLink from "./SignInLink";

/**
 * Shown in place of an answer once an anon viewer has spent their free reveals
 * (the /browse + /board meter). Free sign-in unlocks unlimited reveals; `next`
 * returns them to the exact page they were on.
 *
 * `surface` is required so the click can be paired with the `reveal_wall_hit`
 * it answers. A conversion count without the count of people who were asked is
 * a number with no scale, and the two must agree on which product they mean.
 *
 * The caller re-keys this on every refused tap, so the entry animation replays:
 * a second tap that changes nothing on screen reads as a broken button.
 * It offers Google One Tap too (once a page), like RevealLockedLink.
 */
export default function RevealSignInPrompt({ surface }: { surface: PracticeSurface }) {
  const offerOneTap = useGoogleOneTap();

  useEffect(() => {
    offerOneTap();
  }, [offerOneTap]);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-md border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-sm animate-in fade-in zoom-in-95 duration-300">
      <Lock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
      <span className="text-muted-foreground">
        You&apos;ve used your free answer reveals. Sign in (it&apos;s free) to keep
        checking answers.
      </span>
      <SignInLink
        onClick={() => trackFunnelOnce("reveal_wall_signin_click", surface, { surface })}
        className="ml-auto inline-flex items-center gap-1 font-medium text-brand-accent hover:underline"
      >
        <LogIn className="h-3.5 w-3.5" aria-hidden />
        Sign in
      </SignInLink>
    </div>
  );
}
