"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { isValidIndianMobile } from "@/lib/profile/mobile";
import { CLASS_TEXT_MAX, PUNE, type ClassInterestField } from "@/lib/classes/interest";
import { classOfferInfo } from "@/lib/classes/meOffer";
import type { ClassOfferCardData } from "@/lib/classes/meOfferServer";

/**
 * The class offer on /me (migrations 0282, 0285): "Are you looking for an SPI
 * crash course?" for a Class 10 student, "...offline NDA classes?" for an NDA
 * student, and the same for MHT-CET, JEE, CDS, AFCAT, 12th Board and SSC CGL,
 * all in Pune. One card per student, ever. The server decides WHICH card (pickClassOffer); this
 * card asks and saves through POST /api/me/class-offer.
 *
 *   Yes        the mobile (filled in from the account) and city, with consent,
 *              then "Our team will call you": a lead on /dashboard/classes
 *   No         saved; the card goes for good
 *   Know more  the exam's pattern-and-syllabus page; the card stays
 *
 * The first time half the card is on screen is recorded too, so the readout
 * can count Yes against students who saw it. A failed record never blocks.
 */
type Step = "ask" | "form" | "done" | "gone";
type CityChoice = "pune" | "other" | null;

function send(body: Record<string, unknown>, keepalive = false) {
  return fetch("/api/me/class-offer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive,
  });
}

const choiceClass = (on: boolean) => cn("h-11 w-full justify-start", on && "bg-brand/10 font-semibold");

export default function ClassOfferCard({ data }: { data: ClassOfferCardData }) {
  const info = classOfferInfo(data.offer);
  const prefillPune = data.city?.trim().toLowerCase() === "pune";
  const [step, setStep] = useState<Step>("ask");
  const [busy, setBusy] = useState(false);
  const [mobile, setMobile] = useState(data.mobile ?? "");
  const [city, setCity] = useState<CityChoice>(data.city ? (prefillPune ? "pune" : "other") : null);
  const [otherCity, setOtherCity] = useState(data.city && !prefillPune ? data.city.slice(0, CLASS_TEXT_MAX) : "");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<{ field: ClassInterestField | null; message: string } | null>(null);
  const ref = useRef<HTMLElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const headingId = `${id}-heading`;

  // The sighting, once, when at least half the card is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const seen = () => void send({ offer: data.offer, action: "seen" }).catch(() => {});
    if (typeof IntersectionObserver === "undefined") {
      seen();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          seen();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [data.offer]);

  useEffect(() => {
    if (step === "done") doneRef.current?.focus();
    if (step === "form") mobileRef.current?.focus();
  }, [step]);

  async function no() {
    setBusy(true);
    try {
      const res = await send({ offer: data.offer, action: "no" });
      if (!res.ok) throw new Error();
      toast.success("Okay, we won't ask again.");
      setStep("gone");
    } catch {
      toast.error("Could not save your answer. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidIndianMobile(mobile)) {
      return setError({ field: "mobile", message: "Enter a valid 10-digit mobile number." });
    }
    if (!city) return setError({ field: "city", message: "Choose Pune or Other." });
    if (city === "other" && !otherCity.trim()) return setError({ field: "city", message: "Type your city." });
    if (!consent) return setError({ field: "consent", message: "Please tick the box so our team may call you." });

    setBusy(true);
    setError(null);
    try {
      const res = await send({ offer: data.offer, action: "yes", mobile, city, otherCity, consent });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string; field?: ClassInterestField } | null;
        const message = body?.error ?? "Could not save. Please try again.";
        setError({ field: body?.field ?? null, message });
        toast.error(message);
        return;
      }
      toast.success("Thanks, our team will call you.");
      setStep("done");
    } catch {
      setError({ field: null, message: "Could not save. Please check your connection and try again." });
      toast.error("Could not save. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (step === "gone") return null;

  const errorFor = (field: ClassInterestField) =>
    error?.field === field ? (
      <p id={`${id}-${field}-error`} role="alert" className="mt-2 text-sm text-destructive">
        {error.message}
      </p>
    ) : null;

  return (
    <section ref={ref} aria-labelledby={headingId} className="rounded-xl border bg-card p-6">
      <h2 id={headingId} className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <GraduationCap className="h-4 w-4 text-brand-accent" aria-hidden />
        {info.title}
      </h2>

      {step === "done" ? (
        <p ref={doneRef} tabIndex={-1} aria-live="polite" className="mt-3 flex items-start gap-2 text-sm focus:outline-none">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
          <span>
            Thank you. Our team will call you on {mobile.replace(/\D/g, "").slice(-10)} within 2 days.
            {city === "other" && " The classes are in Pune; we will tell you your options."}
          </span>
        </p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">{info.question}</p>
      )}

      {step === "ask" && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button variant="brand" size="sm" onClick={() => setStep("form")} disabled={busy}>
            Yes
          </Button>
          <Button variant="outline" size="sm" onClick={no} disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            No
          </Button>
          {data.knowMoreHref && (
            <Button asChild variant="ghost" size="sm">
              <Link
                href={data.knowMoreHref}
                prefetch={false}
                onClick={() => void send({ offer: data.offer, action: "more" }, true).catch(() => {})}
              >
                Know more about {data.knowMoreLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          )}
        </div>
      )}

      {step === "form" && (
        <form onSubmit={submit} noValidate className="mt-4 space-y-4" aria-busy={busy}>
          <p className="text-sm">Leave your number and our team will call you within 2 days.</p>
          <div className="space-y-2">
            <Label htmlFor={`${id}-mobile`}>Mobile number</Label>
            <Input
              ref={mobileRef}
              id={`${id}-mobile`}
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (error?.field === "mobile") setError(null);
              }}
              disabled={busy}
              aria-invalid={error?.field === "mobile"}
              aria-describedby={error?.field === "mobile" ? `${id}-mobile-error` : undefined}
            />
            {errorFor("mobile")}
          </div>

          <fieldset>
            <legend className="text-sm font-medium">Where do you live?</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={city === "pune" ? "brandOutline" : "outline"}
                aria-pressed={city === "pune"}
                className={choiceClass(city === "pune")}
                onClick={() => {
                  setCity("pune");
                  if (error?.field === "city") setError(null);
                }}
                disabled={busy}
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                {PUNE}
              </Button>
              <Button
                type="button"
                variant={city === "other" ? "brandOutline" : "outline"}
                aria-pressed={city === "other"}
                className={choiceClass(city === "other")}
                onClick={() => {
                  setCity("other");
                  if (error?.field === "city") setError(null);
                }}
                disabled={busy}
              >
                Other city
              </Button>
            </div>
            {city === "other" && (
              <div className="mt-2 space-y-2">
                <Label htmlFor={`${id}-city`}>Your city</Label>
                <Input
                  id={`${id}-city`}
                  autoComplete="address-level2"
                  maxLength={CLASS_TEXT_MAX}
                  placeholder="e.g. Nashik"
                  value={otherCity}
                  onChange={(e) => setOtherCity(e.target.value)}
                  disabled={busy}
                  aria-invalid={error?.field === "city"}
                  aria-describedby={error?.field === "city" ? `${id}-city-error` : undefined}
                />
              </div>
            )}
            {errorFor("city")}
          </fieldset>

          <div>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (error?.field === "consent") setError(null);
                }}
                disabled={busy}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[var(--brand)]"
              />
              <span>
                Our team may call or WhatsApp me about the classes. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground" target="_blank">
                  privacy policy
                </Link>
                .
              </span>
            </label>
            {errorFor("consent")}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit" variant="brand" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              {busy ? "Sending" : "Request a call back"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setError(null);
                setStep("ask");
              }}
              disabled={busy}
            >
              Back
            </Button>
          </div>
          {error && error.field === null && (
            <p role="alert" className="text-sm text-destructive">
              {error.message}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
