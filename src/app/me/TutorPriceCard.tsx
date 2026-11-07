"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PRICE_CHOICES, cheaperOptions, priceQuestion, rupees, type PriceAnswer } from "@/lib/tutor/price";

/**
 * The 1:1 tutoring price question on /me (owner, 2026-11-07; migration 0224),
 * for a student who said Yes on /tutor and has not answered a price. Answered
 * here, not on /tutor, so it costs no extra page. The server decides WHETHER
 * to show it (lib/tutor/priceAsk) and holds the price; this card only asks and
 * saves through the same PATCH /tutor uses, marked `from: "me"`. "Not now"
 * puts it away for a week, stored on the account so it holds on every device.
 */
type Step = "ask" | "cheaper" | "thanks" | "gone";

const linkButtonClass =
  "rounded-md px-1 py-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function TutorPriceCard({ price }: { price: number }) {
  const [step, setStep] = useState<Step>("ask");
  const [busy, setBusy] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move focus to each new question so keyboard and screen-reader users follow it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  async function send(body: Record<string, unknown>): Promise<boolean> {
    setBusy(true);
    try {
      const res = await fetch("/api/tutor-interest", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, from: "me" }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Could not save your answer. Please try again.");
      }
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your answer. Please try again.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function answer(a: PriceAnswer, wouldPay: number | null = null) {
    if (!(await send({ answer: a, wouldPay }))) return;
    toast.success("Thanks, your answer is saved.");
    setStep("thanks");
  }

  async function notNow() {
    if (!(await send({ snooze: true }))) return;
    toast.success("We will ask again next week.");
    setStep("gone");
  }

  if (step === "gone") return null;

  if (step === "thanks") {
    return (
      <section className="flex items-start gap-3 rounded-lg border bg-card p-4" aria-live="polite">
        <span className="icon-tile inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
          <Check className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="text-sm font-semibold focus:outline-none">
            Thanks for telling us
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            If we open 1:1 tutoring, we will get in touch.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border bg-card p-4" aria-live="polite" aria-busy={busy}>
      <p className="text-xs font-medium text-muted-foreground">1:1 tutoring</p>
      <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-base font-semibold focus:outline-none">
        {step === "ask" ? priceQuestion(price) : "What would you pay for a 1-hour session?"}
      </h2>
      {step === "ask" && (
        <p className="mt-1 text-sm text-muted-foreground">
          You said you want 1:1 tutoring. We are not taking bookings yet. Your answer helps us set a fair price.
        </p>
      )}

      {step === "ask" ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {PRICE_CHOICES.map((c) => (
            <Button
              key={c.answer}
              variant="outline"
              className="h-11"
              disabled={busy}
              onClick={() => (c.answer === "cheaper" ? setStep("cheaper") : answer(c.answer))}
            >
              {c.label}
            </Button>
          ))}
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {cheaperOptions(price).map((amount) => (
            <Button
              key={amount}
              variant="outline"
              className="h-11"
              disabled={busy}
              onClick={() => answer("cheaper", amount)}
            >
              {rupees(amount)}
            </Button>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-3">
        {step === "cheaper" ? (
          <button type="button" disabled={busy} onClick={() => setStep("ask")} className={`${linkButtonClass} inline-flex items-center gap-1.5`}>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back
          </button>
        ) : (
          <span />
        )}
        {step === "cheaper" ? (
          <button type="button" disabled={busy} onClick={() => answer("cheaper", null)} className={linkButtonClass}>
            Not sure
          </button>
        ) : (
          <button type="button" disabled={busy} onClick={notNow} className={linkButtonClass}>
            Not now
          </button>
        )}
      </div>
    </section>
  );
}
