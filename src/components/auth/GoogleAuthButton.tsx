"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import {
  googleButtonAvailable,
  readOwnOnboardingState,
  readOwnRole,
  renderGoogleButton,
} from "@/components/auth/useGoogleOneTap";
import { googleButtonDestination } from "@/lib/auth/oneTap";
import { signedInHome } from "@/lib/auth/redirect";

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

  useEffect(() => {
    if (!googleButtonAvailable || !slot.current) return;
    let live = true;
    void renderGoogleButton(
      slot.current,
      {
        onSignedIn: (userId) => {
          setSigningIn(true);
          void Promise.all([
            readOwnOnboardingState(userId).catch(() => ({ onboardedAt: null })),
            readOwnRole(userId).catch(() => null),
          ]).then(([state, role]) => {
            router.replace(googleButtonDestination(state, next, signedInHome(role)));
            router.refresh();
          });
        },
        onError: () => {
          toast.error("Google sign-in didn't complete. Please try again.");
        },
      },
      { theme: "filled_blue", source: signupSource }
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
  if (drawn === false) return <GoogleSignInButton next={next} signupSource={signupSource} />;
  // min-h keeps the form from jumping while Google draws its button.
  return <div ref={slot} className="flex min-h-[44px] w-full justify-center" />;
}
