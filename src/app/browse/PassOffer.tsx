"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { googleButtonAvailable, renderGoogleButton } from "@/components/auth/useGoogleOneTap";
import { useCheckout, type CheckoutOutcome } from "@/components/billing/useCheckout";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { gatePriceLine } from "@/lib/billing/gateCopy";
import type { PassCta } from "@/lib/billing/plans";

/**
 * The download box's offer to a visitor without the pass, sold IN PLACE
 * (2026-10-04). In the week before, 52 signed-out visitors tapped "Get pass"
 * with the price in front of them and every one was lost on /pricing, whose
 * first step was "Sign in to buy". Here a signed-out visitor signs in with
 * Google over the page, and a signed-in one pays without leaving it.
 *
 * Both steps end in router.refresh(): /browse reads the session on the server,
 * so the refreshed props (signed in; then holding the pass) flip the dialog to
 * the next step while its own state, including "open", survives.
 */
export default function PassOffer({
  pass,
  isSignedIn,
  returnTo,
  mode,
  onCancel,
  onBought,
}: {
  pass: PassCta;
  isSignedIn: boolean;
  /** This page with its filters: the fallback sign-in comes back here. */
  returnTo?: string;
  mode: "filters" | "cart";
  onCancel: () => void;
  /** Payment cleared: the parent shows its download view with a "pass active" line. */
  onBought: () => void;
}) {
  const router = useRouter();

  const onDone = useCallback(
    (outcome: CheckoutOutcome) => {
      if (outcome === "paid") {
        onBought();
        router.refresh();
      } else {
        router.push("/account");
      }
    },
    [onBought, router]
  );
  const { start, busy } = useCheckout({ planId: pass.planId, surface: "download_box", onDone });
  // Stable, so Google's button is drawn once rather than on every render.
  const refresh = useCallback(() => router.refresh(), [router]);

  const onPay = () => {
    // Kept for continuity: since 2026-10-04 this is the in-box Pay tap, which
    // only a signed-in visitor sees (before: the link to /pricing, for anyone).
    trackFunnelOnce("teacher_gate_cta_click", mode, { signedIn: true, mode });
    void start();
  };

  return (
    <>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-4 text-sm">
        {pass.perks.length > 0 && (
          <ul className="space-y-2">
            {pass.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        )}
        <p>
          <span className="text-lg font-semibold tracking-tight">{gatePriceLine(pass)}</span>
          <span className="block text-xs text-muted-foreground">
            One-time payment, no auto-renewal. Pay by UPI, card or netbanking.
          </span>
        </p>
      </div>

      <DialogFooter className="shrink-0 flex-col gap-2 border-t bg-background px-6 py-4">
        {isSignedIn ? (
          <Button variant="brand" className="w-full" onClick={onPay} disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {busy ? "Opening checkout…" : `Pay ${pass.price} and download`}
          </Button>
        ) : (
          <SignInStep returnTo={returnTo} onSignedIn={refresh} />
        )}
        <Button variant="ghost" className="w-full" onClick={onCancel} disabled={busy}>
          Not now
        </Button>
      </DialogFooter>
    </>
  );
}

/**
 * Google's own button, drawn by its script so sign-in happens over the page.
 * Where it cannot be drawn (no client id, script blocked) the redirect-style
 * Google button stands in and returns to these filters afterwards.
 */
function SignInStep({ returnTo, onSignedIn }: { returnTo?: string; onSignedIn: () => void }) {
  const slot = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState<boolean | null>(googleButtonAvailable ? null : false);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (!googleButtonAvailable || !slot.current) return;
    let live = true;
    void renderGoogleButton(slot.current, {
      onSignedIn: () => {
        trackFunnel("download_box_signin");
        setSigningIn(true);
        toast.success("Signed in. One more step to download.");
        onSignedIn();
      },
      onError: () => toast.error("Google sign-in didn't complete. Try again, or use another way to sign in."),
    }).then((ok) => {
      if (live) setDrawn(ok);
    });
    return () => {
      live = false;
    };
  }, [onSignedIn]);

  const loginHref = `/login?next=${encodeURIComponent(returnTo ?? "/browse")}`;

  return (
    <div className="w-full space-y-2">
      <p className="text-center text-xs text-muted-foreground">Sign in, then pay. It takes a minute.</p>
      {signingIn ? (
        <Button variant="brand" className="w-full" disabled>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Signing you in…
        </Button>
      ) : drawn === false ? (
        <GoogleSignInButton next={returnTo ?? "/browse"} signupSource="download_box" />
      ) : (
        // min-h keeps the footer from jumping while Google draws its button.
        <div ref={slot} className="flex min-h-[44px] w-full justify-center" />
      )}
      <p className="text-center text-xs">
        <Link href={loginHref} className="text-muted-foreground underline hover:text-foreground">
          Other ways to sign in
        </Link>
      </p>
    </div>
  );
}
