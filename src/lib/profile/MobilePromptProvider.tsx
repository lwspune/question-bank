"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isValidIndianMobile } from "@/lib/profile/mobile";
import {
  shouldShowMobilePrompt,
  cooldownUntil,
  reachedRevealThreshold,
} from "@/lib/profile/mobilePrompt";

/**
 * App-wide soft mobile-capture prompt for SIGNED-IN students who have no contact
 * mobile on file yet (student_profiles, 0045). A dismissible bottom-sheet, asked
 * once — it never blocks a value action.
 *
 * Triggers: after a Word download, and after a signed-in student reveals several
 * answers (engagement). The mock-result MobileGate already covers the mock
 * moment, so this provider deliberately leaves that path alone.
 *
 * Stays client-side (like BookmarksProvider) so pages keep their ISR/static
 * shape — no server session read app-wide. `hasMobile` is fetched LAZILY via the
 * browser client (own-row RLS) only the first time a trigger actually fires, so
 * ordinary page loads do zero extra work. Ask-once = server truth (hasMobile) as
 * the hard stop + a localStorage dismissal cooldown; see mobilePrompt.ts.
 */

type Trigger = "download" | "reveals";

type MobilePromptContextValue = {
  /** Fire the prompt now (e.g. right after a successful download). */
  requestPrompt: (trigger: Trigger) => void;
  /** Note one answer reveal by a signed-in student; fires at the threshold. */
  notifyReveal: () => void;
};

const MobilePromptContext = createContext<MobilePromptContextValue | null>(null);

const DISMISS_KEY = "qb_mobile_prompt";

function readDismissedUntil(): number | null {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { dismissedUntil?: unknown };
    return typeof parsed.dismissedUntil === "number" ? parsed.dismissedUntil : null;
  } catch {
    return null;
  }
}

function writeDismissedUntil(until: number): void {
  try {
    localStorage.setItem(DISMISS_KEY, JSON.stringify({ dismissedUntil: until }));
  } catch {
    /* private mode / disabled storage — prompt just won't remember dismissal */
  }
}

export function MobilePromptProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const signedInRef = useRef(false);
  // null = not yet checked; boolean once resolved from the DB (own-row RLS).
  const hasMobileRef = useRef<boolean | null>(null);
  const checkingRef = useRef(false);
  const revealCountRef = useRef(0);

  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState<Trigger>("download");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      const on = Boolean(data.session);
      signedInRef.current = on;
      setSignedIn(on);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      const on = Boolean(session);
      signedInRef.current = on;
      setSignedIn(on);
      if (!on) hasMobileRef.current = null; // reset on sign-out
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const maybeOpen = useCallback(async (which: Trigger) => {
    if (!signedInRef.current) return;
    // Static gate with what we know so far (unknown hasMobile passes through).
    if (
      !shouldShowMobilePrompt({
        signedIn: true,
        hasMobile: hasMobileRef.current,
        dismissedUntil: readDismissedUntil(),
        now: Date.now(),
      })
    ) {
      return;
    }
    // Resolve hasMobile lazily on first eligible trigger.
    if (hasMobileRef.current === null) {
      if (checkingRef.current) return;
      checkingRef.current = true;
      try {
        const supabase = createSupabaseBrowserClient();
        const { data } = await supabase
          .from("student_profiles")
          .select("mobile")
          .maybeSingle();
        hasMobileRef.current = Boolean((data as { mobile?: string | null } | null)?.mobile);
      } catch {
        // On a read failure, don't nag — treat as "has mobile" for this session.
        hasMobileRef.current = true;
      } finally {
        checkingRef.current = false;
      }
    }
    if (hasMobileRef.current === true) return;
    // Re-check the full gate (cooldown may have been set meanwhile) then open.
    if (
      !shouldShowMobilePrompt({
        signedIn: true,
        hasMobile: false,
        dismissedUntil: readDismissedUntil(),
        now: Date.now(),
      })
    ) {
      return;
    }
    setTrigger(which);
    setError(null);
    setOpen(true);
  }, []);

  const requestPrompt = useCallback(
    (which: Trigger) => {
      void maybeOpen(which);
    },
    [maybeOpen]
  );

  const notifyReveal = useCallback(() => {
    if (!signedInRef.current) return;
    if (hasMobileRef.current === true) return; // fast path once known
    revealCountRef.current += 1;
    if (reachedRevealThreshold(revealCountRef.current)) void maybeOpen("reveals");
  }, [maybeOpen]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // Any close that isn't a successful submit is a soft dismissal → cooldown.
      writeDismissedUntil(cooldownUntil(Date.now()));
    }
  }

  const mobileOk = isValidIndianMobile(mobile);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!mobileOk) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!consent) {
      setError("Please accept the consent to continue.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/profile/mobile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, consent: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.error ?? "Could not save your number. Please try again.";
        setError(msg);
        toast.error(msg);
        setSubmitting(false);
        return;
      }
      hasMobileRef.current = true; // never ask again this session
      toast.success("Thanks! We'll keep you posted.");
      setOpen(false);
      setSubmitting(false);
    } catch {
      const msg = "Network error. Please try again.";
      setError(msg);
      toast.error(msg);
      setSubmitting(false);
    }
  }

  const value = useMemo<MobilePromptContextValue>(
    () => ({ requestPrompt, notifyReveal }),
    [requestPrompt, notifyReveal]
  );

  const lead =
    trigger === "download"
      ? "Your paper is downloading. Want us to send new papers and prep updates straight to your mobile?"
      : "You're on a roll. Add your mobile and we'll send you fresh papers and prep updates.";

  return (
    <MobilePromptContext.Provider value={value}>
      {children}
      {/* Only mount the sheet for signed-in viewers (it can't open otherwise). */}
      {signedIn && (
        <Sheet open={open} onOpenChange={handleOpenChange}>
          <SheetContent side="bottom" className="mx-auto max-w-md rounded-t-xl">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-center gap-2 sm:justify-start">
                <Send className="h-5 w-5 text-brand-accent" aria-hidden />
                Stay in the loop
              </SheetTitle>
              <SheetDescription>{lead}</SheetDescription>
            </SheetHeader>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mp-mobile">Mobile number</Label>
                <Input
                  id="mp-mobile"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={submitting}
                  aria-invalid={mobile.length > 0 && !mobileOk}
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={submitting}
                  className="mt-0.5 h-4 w-4 rounded border-input accent-[var(--brand)]"
                  aria-describedby="mp-consent-text"
                />
                <span id="mp-consent-text">
                  I agree to be contacted by PYQ Vault about my preparation and consent to the{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-foreground"
                    target="_blank"
                  >
                    privacy policy
                  </Link>
                  .
                </span>
              </label>

              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  variant="brand"
                  className="flex-1"
                  disabled={submitting || !mobileOk || !consent}
                >
                  {submitting ? "Saving…" : "Send me updates"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleOpenChange(false)}
                  disabled={submitting}
                >
                  Maybe later
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      )}
    </MobilePromptContext.Provider>
  );
}

export function useMobilePrompt(): MobilePromptContextValue {
  const ctx = useContext(MobilePromptContext);
  if (!ctx) throw new Error("useMobilePrompt must be used inside a <MobilePromptProvider>");
  return ctx;
}
