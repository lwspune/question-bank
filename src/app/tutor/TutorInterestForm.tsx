"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidIndianMobile } from "@/lib/profile/mobile";
import { stepsAfterYes, type TutorFollowUp, type TutorMode, type TutorRole } from "@/lib/tutor/interest";
import {
  PRICE_CHOICES,
  TEACHER_RATES,
  TEACHER_RATE_LABEL,
  cheaperOptions,
  priceQuestion,
  rupees,
  type PriceAnswer,
  type TeacherRate,
} from "@/lib/tutor/price";

/**
 * Three one-tap questions (migration 0190). Student or Teacher first, because
 * the second question means something different to each: a student is asked
 * whether they want a tutor, a teacher whether they would be one. A No is
 * saved at once and ends the flow; a Yes asks Online / Offline / Either.
 * After a Yes comes the price question (2026-11-07, migration 0223): a
 * student sees the one price fixed for their account and says whether they
 * would book ("only if it cost less" then asks what they would pay); a
 * teacher says what they would charge. A Yes from before the price test
 * starts here (`resume`). Then an account with no city on file is asked for
 * one (2026-10-30), then one with no mobile for that (2026-10-28), both saved
 * to student_profiles. The Yes is already saved by then, so "Not now" on
 * either still counts it.
 */

type PriceStep = "price" | "rate";
type Step = "role" | "wants" | "mode" | PriceStep | "cheaper" | TutorFollowUp | "done";

const QUESTION: Record<"role" | "wants" | "mode" | TutorFollowUp, Record<TutorRole, string>> = {
  role: { student: "Are you a student or a teacher?", teacher: "Are you a student or a teacher?" },
  wants: { student: "Are you looking for 1:1 tutoring?", teacher: "Would you like to teach 1:1 on PYQ Vault?" },
  mode: { student: "How would you like to learn?", teacher: "How would you like to teach?" },
  city: { student: "Which city are you in?", teacher: "Which city are you in?" },
  contact: { student: "How can we reach you?", teacher: "How can we reach you?" },
};

function heading(step: Exclude<Step, "done">, role: TutorRole, price: number): string {
  if (step === "price") return priceQuestion(price);
  if (step === "cheaper") return "What would you pay for a 1-hour session?";
  if (step === "rate") return "What would you charge for a 1-hour 1:1 session?";
  return QUESTION[step][role];
}

const MODE_LABEL: Record<TutorMode, string> = { online: "Online", offline: "Offline", either: "Either" };

const choiceClass = "h-12 w-full text-base";

const CITY_MAX = 80; // student_profiles.city CHECK (migration 0049)

const linkButtonClass =
  "w-full rounded-md py-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function TutorInterestForm({
  hasMobile,
  hasCity,
  price,
  resume,
}: {
  hasMobile: boolean;
  hasCity: boolean;
  /** This account's price for a 1-hour session (lib/tutor/price priceForUser, sent by the server). */
  price: number;
  /** A Yes given before the price test: start at its price question. */
  resume: PriceStep | null;
}) {
  const [step, setStep] = useState<Step>(resume ?? "role");
  const [role, setRole] = useState<TutorRole>(resume === "rate" ? "teacher" : "student");
  const [wants, setWants] = useState(resume !== null);
  const [followUps, setFollowUps] = useState<TutorFollowUp[]>(() =>
    resume ? stepsAfterYes({ wants: true, hasCity, hasMobile }) : []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move focus to each new question so keyboard and screen-reader users follow the step.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  async function submit(answer: { wants: boolean; mode: TutorMode | null }) {
    setSaving(true);
    setError(null);
    try {
      const from = new URLSearchParams(window.location.search).get("from");
      const res = await fetch("/api/tutor-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, ...answer, from }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Could not save your answer. Please try again.");
      }
      setWants(answer.wants);
      setFollowUps(stepsAfterYes({ wants: answer.wants, hasCity, hasMobile }));
      setStep(answer.wants ? (role === "student" ? "price" : "rate") : "done");
      toast.success("Thanks, your answer is saved.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save your answer. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  /** The price answer (PATCH; the server holds the price), then the follow-ups. */
  async function savePrice(body: { answer: PriceAnswer; wouldPay?: number | null } | { rate: TeacherRate }) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/tutor-interest", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Could not save your answer. Please try again.");
      }
      setStep(followUps[0] ?? "done");
      toast.success("Thanks, your answer is saved.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save your answer. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  /** The question after `current` among the follow-ups, or the thank-you. */
  function advanceFrom(current: TutorFollowUp) {
    setError(null);
    setStep(followUps[followUps.indexOf(current) + 1] ?? "done");
  }

  async function saveCity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = city.trim();
    if (!value) {
      setError("Enter your city, or tap Not now.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: value }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Could not save your city. Please try again.");
      }
      toast.success("Thanks, we have your city.");
      advanceFrom("city");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save your city. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function saveMobile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidIndianMobile(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!consent) {
      setError("Please tick the box so we may contact you.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile/mobile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, consent: true }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Could not save your number. Please try again.");
      }
      setStep("done");
      toast.success("Thanks, we have your number.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save your number. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  if (step === "done") {
    return (
      <section className="mt-6 rounded-xl border bg-card p-6 text-center" aria-live="polite">
        <span className="icon-tile mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-3 text-lg font-semibold focus:outline-none">
          Thanks for telling us
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {wants
            ? "We are checking how many people want this. If we open 1:1 tutoring, we will get in touch."
            : "That helps us just as much as a yes."}
        </p>
        <Button asChild variant="outline" className="mt-5">
          <Link href="/">Back to PYQ Vault</Link>
        </Button>
      </section>
    );
  }

  const back = step === "wants" ? "role" : step === "mode" ? "wants" : step === "cheaper" ? "price" : null;
  // The questions this visitor is asked, in order ("what would you pay" is part of the price question).
  const priceStep: PriceStep = role === "student" ? "price" : "rate";
  const flow: Step[] = [
    ...(resume ? [] : (["role", "wants", "mode"] as const)),
    priceStep,
    ...stepsAfterYes({ wants: true, hasCity, hasMobile }),
  ];
  const questionNo = flow.indexOf(step === "cheaper" ? "price" : step) + 1;
  const questionTotal = flow.length;
  const mobileOk = isValidIndianMobile(mobile);

  return (
    <section className="mt-6 rounded-xl border bg-card p-6" aria-live="polite" aria-busy={saving}>
      <p className="text-xs font-medium text-muted-foreground">
        Question {questionNo} of {questionTotal}
      </p>
      <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-lg font-semibold focus:outline-none">
        {heading(step, role, price)}
      </h2>

      {(step === "price" || step === "rate") && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {resume === step &&
            (role === "student"
              ? "You told us you want 1:1 tutoring. One more question. "
              : "You told us you would teach 1:1. One more question. ")}
          {step === "price"
            ? "We are not taking bookings yet. Your answer helps us set a fair price."
            : "This helps us set a fair price for students and teachers."}
        </p>
      )}

      {step === "price" && (
        <div className="mt-5 grid gap-3">
          {PRICE_CHOICES.map((c) => (
            <Button
              key={c.answer}
              variant="outline"
              className={choiceClass}
              disabled={saving}
              onClick={() => (c.answer === "cheaper" ? setStep("cheaper") : savePrice({ answer: c.answer }))}
            >
              {c.label}
            </Button>
          ))}
        </div>
      )}

      {step === "cheaper" && (
        <div className="mt-5 grid gap-3">
          {cheaperOptions(price).map((amount) => (
            <Button
              key={amount}
              variant="outline"
              className={choiceClass}
              disabled={saving}
              onClick={() => savePrice({ answer: "cheaper", wouldPay: amount })}
            >
              {rupees(amount)}
            </Button>
          ))}
          <button
            type="button"
            disabled={saving}
            onClick={() => savePrice({ answer: "cheaper", wouldPay: null })}
            className={linkButtonClass}
          >
            Not sure
          </button>
        </div>
      )}

      {step === "rate" && (
        <div className="mt-5 grid gap-3">
          {TEACHER_RATES.map((rate) => (
            <Button
              key={rate}
              variant="outline"
              className={choiceClass}
              disabled={saving}
              onClick={() => savePrice({ rate })}
            >
              {TEACHER_RATE_LABEL[rate]}
            </Button>
          ))}
        </div>
      )}

      {(step === "role" || step === "wants" || step === "mode") && (
        <div className="mt-5 grid gap-3">
          {step === "role" &&
            (["student", "teacher"] as const).map((r) => (
              <Button
                key={r}
                variant="outline"
                className={choiceClass}
                onClick={() => {
                  setRole(r);
                  setStep("wants");
                }}
              >
                {r === "student" ? "Student" : "Teacher"}
              </Button>
            ))}

          {step === "wants" && (
            <>
              <Button
                variant="outline"
                className={choiceClass}
                disabled={saving}
                onClick={() => {
                  setWants(true);
                  setStep("mode");
                }}
              >
                Yes
              </Button>
              <Button variant="outline" className={choiceClass} disabled={saving} onClick={() => submit({ wants: false, mode: null })}>
                No
              </Button>
            </>
          )}

          {step === "mode" &&
            (["online", "offline", "either"] as const).map((m) => (
              <Button key={m} variant="outline" className={choiceClass} disabled={saving} onClick={() => submit({ wants: true, mode: m })}>
                {MODE_LABEL[m]}
              </Button>
            ))}
        </div>
      )}

      {step === "city" && (
        <form onSubmit={saveCity} className="mt-3 space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your answer is saved. Your city tells us where we could offer tutoring.
          </p>
          <div className="space-y-2">
            <Label htmlFor="tutor-city">City</Label>
            <Input
              id="tutor-city"
              autoComplete="address-level2"
              required
              maxLength={CITY_MAX}
              placeholder="e.g. Pune"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={saving}
            />
          </div>
          <Button type="submit" variant="brand" className={choiceClass} disabled={saving || !city.trim()}>
            Save my city
          </Button>
          <button type="button" disabled={saving} onClick={() => advanceFrom("city")} className={linkButtonClass}>
            Not now
          </button>
        </form>
      )}

      {step === "contact" && (
        <form onSubmit={saveMobile} className="mt-3 space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your answer is saved. Leave your mobile number so we can contact you if we open 1:1 tutoring.
          </p>
          <div className="space-y-2">
            <Label htmlFor="tutor-mobile">Mobile number</Label>
            <Input
              id="tutor-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              required
              placeholder="10-digit mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={saving}
              aria-invalid={mobile.length > 0 && !mobileOk}
            />
          </div>
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={saving}
              className="mt-0.5 h-4 w-4 rounded border-input accent-[var(--brand)]"
            />
            <span>
              PYQ Vault may contact me about 1:1 tutoring. See our{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground" target="_blank">
                privacy policy
              </Link>
              .
            </span>
          </label>
          <Button type="submit" variant="brand" className={choiceClass} disabled={saving || !mobileOk || !consent}>
            Save my number
          </Button>
          <button type="button" disabled={saving} onClick={() => advanceFrom("contact")} className={linkButtonClass}>
            Not now
          </button>
        </form>
      )}

      {saving && (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Saving
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      {back && (
        <button
          type="button"
          disabled={saving}
          onClick={() => setStep(back)}
          className="mt-5 inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back
        </button>
      )}
    </section>
  );
}
