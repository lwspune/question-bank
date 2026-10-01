"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSignedIn } from "@/components/auth/useSignedIn";
import {
  isNewAccount,
  makeNonce,
  oneTapDestination,
  resolveGoogleClientId,
  shouldOfferOneTap,
  ONE_TAP_SIGNUP_SOURCE,
} from "@/lib/auth/oneTap";

/**
 * Google One Tap, offered at the answer-reveal wall. Rules live in
 * lib/auth/oneTap.ts.
 *
 * A script tag, not a package: Google Identity Services is only served from
 * accounts.google.com. It loads on the first offer, never on page load, so the
 * cost lands only on a visitor who has already spent their free reveals.
 *
 * Fails quietly by design. No client id, a blocked script, Safari without FedCM,
 * or a visitor who dismissed it recently (Google backs off by itself): every
 * one of those leaves the plain "Sign in" link, which is what existed before.
 */
const CLIENT_ID = resolveGoogleClientId(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

type CredentialResponse = { credential: string };
type GoogleAccountsId = {
  initialize(config: {
    client_id: string;
    callback: (response: CredentialResponse) => void;
    nonce: string;
    context: "signin";
    use_fedcm_for_prompt: boolean;
    itp_support: boolean;
    cancel_on_tap_outside: boolean;
  }): void;
  prompt(): void;
};

declare global {
  interface Window {
    google?: { accounts?: { id?: GoogleAccountsId } };
  }
}

// Module scope: every locked card mounts the hook, but the page asks once.
let offered = false;
let scriptLoad: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (scriptLoad) return scriptLoad;
  scriptLoad = new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = SCRIPT_SRC;
    el.async = true;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error("Google sign-in script failed to load"));
    document.head.appendChild(el);
  });
  return scriptLoad;
}

async function completeSignIn(credential: string, rawNonce: string): Promise<string | null> {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: credential,
    nonce: rawNonce,
  });
  if (error || !data.user) throw error ?? new Error("No user returned");
  const user = data.user;

  // Attribution, best effort, for a genuinely new account only (see isNewAccount).
  if (!user.user_metadata?.signup_source && isNewAccount(user.created_at, user.last_sign_in_at)) {
    await supabase.auth
      .updateUser({ data: { signup_source: ONE_TAP_SIGNUP_SOURCE } })
      .catch(() => undefined);
  }

  // Own-row read under RLS (student_profiles_select_own). The server helper
  // getOnboardingState is server-only, so the same select runs here.
  const { data: profile } = await supabase
    .from("student_profiles")
    .select("onboarded_at")
    .eq("user_id", user.id)
    .maybeSingle();
  return oneTapDestination({ onboardedAt: profile?.onboarded_at ?? null }, window.location.pathname + window.location.search);
}

/** Returns `offer()`: show One Tap now if the rules allow. Safe to call often. */
export function useGoogleOneTap(): () => void {
  const { signedIn, loading } = useSignedIn();
  const router = useRouter();

  return useCallback(() => {
    if (!shouldOfferOneTap({ clientId: CLIENT_ID, signedIn, loading, alreadyOffered: offered })) return;
    offered = true;

    void (async () => {
      try {
        await loadScript();
        const id = window.google?.accounts?.id;
        if (!id || !CLIENT_ID) return;
        const { raw, hashed } = await makeNonce();
        id.initialize({
          client_id: CLIENT_ID,
          nonce: hashed,
          context: "signin",
          use_fedcm_for_prompt: true,
          itp_support: true,
          cancel_on_tap_outside: true,
          callback: ({ credential }) => {
            completeSignIn(credential, raw)
              .then((destination) => {
                if (destination) {
                  router.push(destination);
                } else {
                  // The shared auth listener lifts every lock on this page.
                  toast.success("Signed in. Answers unlocked.");
                }
              })
              .catch(() => {
                toast.error("Google sign-in didn't complete. Use the Sign in link instead.");
              });
          },
        });
        id.prompt();
      } catch {
        // Script blocked or offline: the Sign in link is still on the card.
      }
    })();
  }, [signedIn, loading, router]);
}
