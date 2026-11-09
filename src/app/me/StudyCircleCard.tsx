"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { StudyCircleAnswer } from "@/lib/studyCircle/core";

/**
 * The study-circle demand card on Home (owner, 2026-11-09; migration 0247).
 * Nothing is built: it asks whether a student would use a circle of friends
 * they already know, and says plainly that it is not built yet. The server
 * decides whether to show it (lib/studyCircle/server); this card records the
 * first time it comes into view, so the readout has a denominator, then the
 * Yes or No. Either answer is stored on the account, so it stays gone.
 */
type Step = "ask" | "thanks" | "gone";

async function send(body: Record<string, unknown>): Promise<void> {
  const res = await fetch("/api/study-circle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "Could not save your answer. Please try again.");
  }
}

export default function StudyCircleCard() {
  const [step, setStep] = useState<Step>("ask");
  const [busy, setBusy] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Record the sighting once, when at least half the card is on screen. A
  // failed sighting is not the student's problem, so it stays silent.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const record = () => send({ action: "shown" }).catch(() => {});
    if (typeof IntersectionObserver === "undefined") {
      void record();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void record();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (step === "thanks") headingRef.current?.focus();
  }, [step]);

  async function answer(a: StudyCircleAnswer) {
    setBusy(true);
    try {
      await send({ action: "answer", answer: a });
      if (a === "yes") {
        toast.success("Thanks, your answer is saved.");
        setStep("thanks");
      } else {
        toast.success("Got it. We won't ask again.");
        setStep("gone");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your answer. Please try again.");
    } finally {
      setBusy(false);
    }
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
          <p className="mt-1 text-sm text-muted-foreground">If we build study circles, you&rsquo;ll see them here first.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="rounded-lg border bg-card p-4"
      aria-labelledby="study-circle-heading"
      aria-busy={busy}
    >
      <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Users className="h-3.5 w-3.5" aria-hidden /> An idea we&rsquo;re testing
      </p>
      <h2 id="study-circle-heading" className="mt-1 text-base font-semibold">
        Study with your friends?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        You and up to 4 friends you already know would see each other&rsquo;s week: chapters done and mistakes fixed.
        No chat, no scores, no ranking. It isn&rsquo;t built yet.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:max-w-sm">
        {/* Same weight for both: a filled Yes would nudge the answer. */}
        <Button variant="outline" className="h-11" disabled={busy} onClick={() => answer("yes")}>
          I&rsquo;d use this
        </Button>
        <Button variant="outline" className="h-11" disabled={busy} onClick={() => answer("no")}>
          Not for me
        </Button>
      </div>
    </section>
  );
}
