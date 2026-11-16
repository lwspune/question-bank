"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { hasAuthCookie } from "@/lib/viewer/useViewerSession";
import { isValidIndianMobile } from "@/lib/profile/mobile";
import { normaliseFrom } from "@/lib/tutor/interest";
import {
  CLASS_COURSES,
  CLASS_TEXT_MAX,
  PUNE,
  type ClassCourse,
  type ClassInterestField,
} from "@/lib/classes/interest";

/**
 * The offline-classes form (migration 0265): courses, Pune or another city, a
 * name and a mobile with consent, then "Our team will call you". One screen,
 * not steps: four short answers fit a phone, and a parent sees everything they
 * are agreeing to before they send it. Anyone may answer; a signed-in visitor
 * gets their name, mobile and city filled in from the account (asked from the
 * browser so the page stays cached). Rules: lib/classes/interest.ts.
 */

type CityChoice = "pune" | "other" | null;

type Prefill = { signedIn: boolean; name?: string | null; mobile?: string | null; city?: string | null };

const choiceClass = (on: boolean) =>
  cn("h-12 w-full justify-start text-base", on && "bg-brand/10 font-semibold");

export default function ClassInterestForm() {
  const [courses, setCourses] = useState<ClassCourse[]>([]);
  const [city, setCity] = useState<CityChoice>(null);
  const [otherCity, setOtherCity] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<{ field: ClassInterestField | null; message: string } | null>(null);
  const [done, setDone] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  // A signed-in visitor: fill in what the account already knows. Never
  // overwrite something they have started typing.
  useEffect(() => {
    if (!hasAuthCookie()) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/class-interest", { cache: "no-store" });
        const p = res.ok ? ((await res.json()) as Prefill) : null;
        if (cancelled || !p?.signedIn) return;
        if (p.name) setName((v) => v || p.name!.slice(0, CLASS_TEXT_MAX));
        if (p.mobile) setMobile((v) => v || p.mobile!);
        if (p.city) {
          const isPune = p.city.trim().toLowerCase() === "pune";
          setCity((v) => v ?? (isPune ? "pune" : "other"));
          if (!isPune) setOtherCity((v) => v || p.city!.slice(0, CLASS_TEXT_MAX));
        }
      } catch {
        // Prefill is a convenience: the empty form still works.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  function toggleCourse(slug: ClassCourse) {
    setCourses((cur) => (cur.includes(slug) ? cur.filter((c) => c !== slug) : [...cur, slug]));
    if (error?.field === "courses") setError(null);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (courses.length === 0) return setError({ field: "courses", message: "Choose at least one course." });
    if (!city) return setError({ field: "city", message: "Choose Pune or Other." });
    if (city === "other" && !otherCity.trim()) return setError({ field: "city", message: "Type your city." });
    if (!isValidIndianMobile(mobile)) {
      return setError({ field: "mobile", message: "Enter a valid 10-digit mobile number." });
    }
    if (!consent) return setError({ field: "consent", message: "Please tick the box so our team may call you." });

    setSaving(true);
    setError(null);
    try {
      const from = normaliseFrom(new URLSearchParams(window.location.search).get("from"));
      const res = await fetch("/api/class-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courses, city, otherCity, name, mobile, consent, from }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string; field?: ClassInterestField } | null;
        setError({ field: body?.field ?? null, message: body?.error ?? "Could not save. Please try again." });
        toast.error(body?.error ?? "Could not save. Please try again.");
        return;
      }
      setDone(true);
      toast.success("Thanks, our team will call you.");
    } catch {
      setError({ field: null, message: "Could not save. Please check your connection and try again." });
      toast.error("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (done) {
    const ten = mobile.replace(/\D/g, "").slice(-10);
    return (
      <section className="mt-6 rounded-xl border bg-card p-6 text-center" aria-live="polite">
        <span className="icon-tile mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="mt-3 text-lg font-semibold focus:outline-none">
          Thank you
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Our team will call you on {ten} within 2 days.
          {city === "other" && " Our classes are in Pune for now; we will tell you your options."}
        </p>
        <Button asChild variant="outline" className="mt-5">
          <Link href="/">Back to PYQ Vault</Link>
        </Button>
      </section>
    );
  }

  const errorFor = (field: ClassInterestField) =>
    error?.field === field ? (
      <p id={`classes-${field}-error`} role="alert" className="mt-2 text-sm text-destructive">
        {error.message}
      </p>
    ) : null;
  const mobileOk = isValidIndianMobile(mobile);

  return (
    <form onSubmit={submit} noValidate className="mt-6 space-y-6 rounded-xl border bg-card p-6" aria-busy={saving}>
      <fieldset>
        <legend className="text-base font-semibold">Which course? Choose one or more</legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {CLASS_COURSES.map((c) => {
            const on = courses.includes(c.slug);
            return (
              <Button
                key={c.slug}
                type="button"
                variant={on ? "brandOutline" : "outline"}
                aria-pressed={on}
                className={choiceClass(on)}
                onClick={() => toggleCourse(c.slug)}
                disabled={saving}
              >
                <Check className={cn("h-4 w-4 shrink-0", !on && "invisible")} aria-hidden />
                {c.label}
              </Button>
            );
          })}
        </div>
        {errorFor("courses")}
      </fieldset>

      <fieldset>
        <legend className="text-base font-semibold">Where do you live?</legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant={city === "pune" ? "brandOutline" : "outline"}
            aria-pressed={city === "pune"}
            className={choiceClass(city === "pune")}
            onClick={() => {
              setCity("pune");
              if (error?.field === "city") setError(null);
            }}
            disabled={saving}
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
            disabled={saving}
          >
            Other city
          </Button>
        </div>
        {city === "other" && (
          <div className="mt-3 space-y-2">
            <Label htmlFor="classes-city">Your city</Label>
            <Input
              id="classes-city"
              autoComplete="address-level2"
              maxLength={CLASS_TEXT_MAX}
              placeholder="e.g. Nashik"
              value={otherCity}
              onChange={(e) => setOtherCity(e.target.value)}
              disabled={saving}
              aria-invalid={error?.field === "city"}
              aria-describedby={error?.field === "city" ? "classes-city-error" : undefined}
            />
          </div>
        )}
        {errorFor("city")}
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="classes-name">Name (optional)</Label>
        <Input
          id="classes-name"
          autoComplete="name"
          maxLength={CLASS_TEXT_MAX}
          placeholder="Student or parent"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={saving}
        />
        {errorFor("name")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="classes-mobile">Mobile number</Label>
        <Input
          id="classes-mobile"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={saving}
          aria-invalid={error?.field === "mobile" || (mobile.length >= 10 && !mobileOk)}
          aria-describedby={error?.field === "mobile" ? "classes-mobile-error" : undefined}
        />
        {errorFor("mobile")}
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (error?.field === "consent") setError(null);
            }}
            disabled={saving}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[var(--brand)]"
          />
          <span>
            Our team may call or WhatsApp me about offline classes. See our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground" target="_blank">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errorFor("consent")}
      </div>

      <Button type="submit" variant="brand" className="h-12 w-full text-base" disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {saving ? "Sending" : "Request a call back"}
      </Button>
      {error && error.field === null && (
        <p role="alert" className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </form>
  );
}
