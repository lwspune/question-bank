"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidIndianMobile } from "@/lib/profile/mobile";

/**
 * The mock-result "gate the reward" card. Shown in place of the score when the
 * student hasn't given their mobile yet. On success it refreshes the route; the
 * server re-checks student_profiles and renders the score. Asked only once —
 * once a mobile is on file, every future result reveals immediately.
 */
export default function MobileGate({ mockTitle }: { mockTitle: string }) {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      toast.success("Thanks! Here's your result.");
      router.refresh();
    } catch {
      const msg = "Network error. Please try again.";
      setError(msg);
      toast.error(msg);
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto mt-6 max-w-md rounded-xl border bg-card p-6">
      <div className="flex items-center gap-2 text-brand-accent">
        <Lock className="h-5 w-5" aria-hidden />
        <h2 className="text-lg font-semibold">See your result</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your mobile number to unlock your score and full question-by-question
        review for <span className="font-medium text-foreground">{mockTitle}</span>.
        We&apos;ll only ask once.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gate-mobile">Mobile number</Label>
          <Input
            id="gate-mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
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
            aria-describedby="gate-consent-text"
          />
          <span id="gate-consent-text">
            I agree to be contacted by LWS about my preparation and consent to the{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground" target="_blank">
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

        <Button type="submit" variant="brand" className="w-full" disabled={submitting || !mobileOk || !consent}>
          {submitting ? "Unlocking…" : "Unlock my result"}
        </Button>
      </form>
    </div>
  );
}
