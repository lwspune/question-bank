"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { TutorMode, TutorRole } from "@/lib/tutor/interest";

/**
 * Three one-tap questions (migration 0190). Student or Teacher first, because
 * the second question means something different to each: a student is asked
 * whether they want a tutor, a teacher whether they would be one. A No is
 * saved at once and ends the flow; a Yes asks Online / Offline / Either.
 */

type Step = "role" | "wants" | "mode" | "done";

const QUESTION: Record<Exclude<Step, "done">, Record<TutorRole, string>> = {
  role: { student: "Are you a student or a teacher?", teacher: "Are you a student or a teacher?" },
  wants: { student: "Are you looking for 1:1 tutoring?", teacher: "Would you like to teach 1:1 on PYQ Vault?" },
  mode: { student: "How would you like to learn?", teacher: "How would you like to teach?" },
};

const MODE_LABEL: Record<TutorMode, string> = { online: "Online", offline: "Offline", either: "Either" };

const choiceClass = "h-12 w-full text-base";

export default function TutorInterestForm() {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<TutorRole>("student");
  const [wants, setWants] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      setStep("done");
      toast.success("Thanks, your answer is saved.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save your answer. Please try again.";
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
            ? "We are checking how many people want this. If we open 1:1 tutoring, we will announce it here."
            : "That helps us just as much as a yes."}
        </p>
        <Button asChild variant="outline" className="mt-5">
          <Link href="/">Back to PYQ Vault</Link>
        </Button>
      </section>
    );
  }

  const back = step === "wants" ? "role" : step === "mode" ? "wants" : null;

  return (
    <section className="mt-6 rounded-xl border bg-card p-6" aria-live="polite" aria-busy={saving}>
      <p className="text-xs font-medium text-muted-foreground">
        Question {step === "role" ? 1 : step === "wants" ? 2 : 3} of 3
      </p>
      <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-lg font-semibold focus:outline-none">
        {QUESTION[step][role]}
      </h2>

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
