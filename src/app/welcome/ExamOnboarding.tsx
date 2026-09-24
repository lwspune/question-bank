"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileChips from "@/components/ProfileChips";
import HowItWorks from "@/components/HowItWorks";
import { getExamBySlug, isExamSlug, type ExamSlug } from "@/lib/exam/examContext";
import { EXAM_CHIP_OPTIONS } from "@/lib/profile/examChoices";
import { setExamCookie } from "@/lib/exam/examCookie";
import { STAGES, STAGE_LABELS, type Stage } from "@/lib/profile/onboarding";
import { loopFor, welcomeDestination } from "@/lib/education/howItWorks";

/**
 * Post-signup intent capture — the first "staggered" ask, now TWO screens.
 *
 * Screen 1 (unchanged): exam(s) + stage, chips not dropdowns, pre-filled from
 * the exam the student was already browsing, SKIPPABLE. On Continue we persist
 * + set the qb_exam cookie so /browse, notes and mocks personalise the same
 * second. Asked once — onboarded_at is stamped on both Continue and Skip.
 *
 * Screen 2 (2026-09-24, STUDENT_EDUCATION_SPEC.md §4 item 2): the three-step
 * loop for the exam they just chose, and one button into step 1 of it. This
 * is the ONLY screen every student passes through, and until now it was spent
 * entirely on a form: 149 of 193 mock-takers had used a mock and nothing else.
 *
 * `onboarded_at` is stamped by screen 1, so a student who closes the tab on
 * screen 2 is never asked the exam question again and simply misses the loop
 * once — the cheaper failure. A SPECIFIC ?next= (a mock tapped before sign-up)
 * stays the primary button; redirecting a specific intent is what the
 * engagement gate forbids. See welcomeDestination().
 */
const EXAM_OPTIONS = EXAM_CHIP_OPTIONS;
const STAGE_OPTIONS = STAGES.map((s) => ({ value: s, label: STAGE_LABELS[s] }));

export default function ExamOnboarding({
  next,
  initialExam,
}: {
  next: string;
  initialExam: ExamSlug | null;
}) {
  const router = useRouter();
  const [exams, setExams] = useState<ExamSlug[]>(
    initialExam && isExamSlug(initialExam) ? [initialExam] : []
  );
  const [stage, setStage] = useState<Stage | null>(null);
  const [submitting, setSubmitting] = useState<"continue" | "skip" | null>(null);
  // null = still on screen 1; a slug or "none" = screen 2 for that exam.
  const [primary, setPrimary] = useState<ExamSlug | "none" | null>(null);

  function toggleExam(slug: ExamSlug) {
    setExams((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  async function save(targetExams: ExamSlug[], stageValue: Stage | null) {
    const res = await fetch("/api/profile/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetExams, stage: stageValue }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      primaryExam?: ExamSlug | null;
      error?: string;
    };
    if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not save.");
    return data.primaryExam ?? null;
  }

  async function onContinue() {
    setSubmitting("continue");
    try {
      const chosen = await save(exams, stage);
      if (chosen && isExamSlug(chosen)) setExamCookie(chosen);
      toast.success("You're all set.");
      // The server components behind the next page read the cookie fresh;
      // refresh now so the header's exam-aware hrefs are right when we leave.
      router.refresh();
      setPrimary(chosen && isExamSlug(chosen) ? chosen : "none");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save. Please try again.");
    } finally {
      setSubmitting(null);
    }
  }

  async function onSkip() {
    setSubmitting("skip");
    try {
      // Skip still stamps onboarded_at so we never ask again; the remaining
      // fields resurface later on the account profile, never as a nag.
      await save([], null);
    } catch {
      /* skipping should never block entry — swallow and continue */
    } finally {
      setSubmitting(null);
    }
    setPrimary("none");
  }

  const busy = submitting !== null;

  if (primary !== null) {
    const exam = primary === "none" ? null : getExamBySlug(primary);
    const loop = loopFor(exam);
    const dest = welcomeDestination(next, loop);
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 sm:px-6">
        <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-2 text-brand-accent">
            <BookOpen className="h-5 w-5" aria-hidden />
            <span className="text-sm font-semibold tracking-tight">PYQ Vault</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            {loop.examLabel ? `How ${loop.examLabel} prep works here` : "How it works"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {loop.kind === "mock"
              ? "Three steps, about five minutes a day after the first sitting."
              : "Three habits that make the textbook stick."}
          </p>

          <div className="mt-6">
            <HowItWorks loop={loop} compact linkSteps={false} />
          </div>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button asChild variant="brand" size="lg" className="h-12 flex-1 rounded-xl text-base">
              <Link href={dest.primary.href} prefetch={false}>
                {dest.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-12 rounded-xl">
              <Link href={dest.secondary.href} prefetch={false}>
                {dest.secondary.label}
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            This page is always at{" "}
            <Link href="/start" className="underline underline-offset-2">
              pyqvault.com/start
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2 text-brand-accent">
          <BookOpen className="h-5 w-5" aria-hidden />
          <span className="text-sm font-semibold tracking-tight">PYQ Vault</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">What are you preparing for?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick your exam(s) and stage — we&apos;ll put your bank, notes and mocks
          front and centre. You can change this anytime.
        </p>

        <div className="mt-7">
          <ProfileChips
            legend="Target exam"
            options={EXAM_OPTIONS}
            selected={exams}
            onToggle={(v) => toggleExam(v as ExamSlug)}
            disabled={busy}
          />
        </div>

        <div className="mt-6">
          <ProfileChips
            legend="Your stage"
            options={STAGE_OPTIONS}
            selected={stage ? [stage] : []}
            onToggle={(v) => setStage(stage === v ? null : (v as Stage))}
            disabled={busy}
          />
        </div>

        <div className="mt-8 flex items-center gap-3">
          <Button
            type="button"
            variant="brand"
            className="flex-1"
            disabled={busy || exams.length === 0}
            onClick={onContinue}
          >
            {submitting === "continue" ? "Saving…" : "Continue"}
          </Button>
          <Button type="button" variant="ghost" disabled={busy} onClick={onSkip}>
            {submitting === "skip" ? "…" : "Skip for now"}
          </Button>
        </div>
      </div>
    </main>
  );
}
