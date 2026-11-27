"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import {
  checkServerSession,
  googleButtonAvailable,
  readOwnOnboardingState,
  readOwnRole,
  renderGoogleButton,
} from "@/components/auth/useGoogleOneTap";
import { googleButtonDestination, nextStepAfterSessionCheck } from "@/lib/auth/oneTap";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { needsFullLoad, signedInHome } from "@/lib/auth/redirect";

/**
 * "Continue with Google" on /login and /signup, drawn by Google itself.
 *
 * WHY: the plain button (GoogleSignInButton) redirects through Supabase, so
 * Google's window read "to continue to wunvtnqlzjrkvolslbnm.supabase.co" — a
 * name a student does not recognise, on the step where they decide to trust
 * us. Google's own button signs in on this page instead, and its window no
 * longer names the Supabase project. Same Supabase Google provider, same
 * session, so nothing downstream changes.
 *
 * Falls back to the plain button when Google's button cannot be drawn (no
 * client id, script blocked), which is what existed before.
 */
export default function GoogleAuthButton({
  next,
  signupSource,
}: {
  /** Where to land; null sends the person to their own home by role. */
  next: string | null;
  /** Stamped on a brand-new account only, as the OAuth callback does. */
  signupSource?: string;
}) {
  const router = useRouter();
  const slot = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState<boolean | null>(googleButtonAvailable ? null : false);
  const [signingIn, setSigningIn] = useState(false);
  // The server could not see the new session even after a second ask: say so,
  // and offer Google's redirect sign-in, which sets the session from the server.
  const [sessionLost, setSessionLost] = useState(false);

  useEffect(() => {
    if (!googleButtonAvailable || !slot.current) return;
    let live = true;
    void renderGoogleButton(
      slot.current,
      {
        onSignedIn: (userId, serverCheck) => {
          setSigningIn(true);
          void (async () => {
            const [state, role, first] = await Promise.all([
              readOwnOnboardingState(userId).catch(() => ({ onboardedAt: null })),
              readOwnRole(userId).catch(() => null),
              serverCheck,
            ]);
            const destination = googleButtonDestination(state, next, signedInHome(role));
            // Before moving on, make sure the server sees the session: if it does
            // not, /welcome would send the person back to /login (lib/auth/oneTap).
            let step = nextStepAfterSessionCheck(1, first);
            const page = window.location.pathname.startsWith("/signup") ? "signup" : "login";
            if (first === "unknown") trackFunnel("signin_session_check", { outcome: "no_answer", page });
            if (step === "retry") {
              await new Promise((resolve) => setTimeout(resolve, 1_500));
              const second = await checkServerSession();
              step = nextStepAfterSessionCheck(2, second);
              const outcome = second === "seen" ? "recovered" : second === "unseen" ? "failed" : "no_answer";
              trackFunnel("signin_session_check", { outcome, page });
            }
            if (step === "navigate" && !needsFullLoad(destination)) {
              router.replace(destination);
              router.refresh();
            } else if (step === "navigate" || step === "full-load") {
              window.location.assign(destination);
            } else {
              setSigningIn(false);
              setSessionLost(true);
              toast.error("Your browser didn't keep the sign-in. Please try again.");
            }
          })();
        },
        onError: () => {
          toast.error("Google sign-in didn't complete. Please try again.");
        },
      },
      // Google's white outline pill (2026-11-10), matching the page's rounded
      // buttons; the blue rectangle read as an ad above the form.
      { theme: "outline", shape: "pill", source: signupSource }
    ).then((ok) => {
      if (live) setDrawn(ok);
    });
    return () => {
      live = false;
    };
  }, [next, signupSource, router]);

  if (signingIn) {
    return (
      <Button variant="outline" className="w-full gap-2" disabled>
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Signing you in…
      </Button>
    );
  }
  if (sessionLost) {
    return (
      <div className="space-y-3">
        <p role="alert" className="text-sm text-destructive">
          Your browser didn&apos;t keep the sign-in. Try again with the button below. If it happens again,
          allow cookies for pyqvault.com in your browser settings.
        </p>
        <GoogleSignInButton next={next} signupSource={signupSource} />
      </div>
    );
  }
  if (drawn === false) return <GoogleSignInButton next={next} signupSource={signupSource} />;
  // min-h keeps the form from jumping while Google draws its button.
  return <div ref={slot} className="flex min-h-[44px] w-full justify-center" />;
}
