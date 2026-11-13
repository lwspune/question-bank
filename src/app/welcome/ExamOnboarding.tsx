"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileChips from "@/components/ProfileChips";
import HowItWorks from "@/components/HowItWorks";
import { getExamBySlug, isExamSlug, type ExamSlug } from "@/lib/exam/examContext";
import TierExamChips from "@/components/TierExamChips";
import { setExamCookie } from "@/lib/exam/examCookie";
import { STAGES, STAGE_LABELS, examQuestionVisible, stagesForTier, type Stage } from "@/lib/profile/onboarding";
import { loopFor, showsLoopAfterWelcome, welcomeDestination } from "@/lib/education/howItWorks";

/**
 * Post-signup intent capture — the first "staggered" ask, now TWO screens.
 *
 * Screen 1: stage, then exam(s) — the exam chips narrow to the stage's tier
 * (EXAM_TIER_SPEC.md §4.1) — chips not dropdowns, pre-filled from
 * the exam the student was already browsing, SKIPPABLE. On Continue we persist
 * + set the qb_exam cookie so /browse, notes and mocks personalise the same
 * second. Asked once — onboarded_at is stamped on both Continue and Skip.
 *
 * Screen 2 (2026-09-24, STUDENT_EDUCATION_SPEC.md §4 item 2): the three-step
 * loop for the exam they just chose, and one button into step 1 of it: 149 of
 * 193 mock-takers had used a mock and nothing else.
 *
 * WHO SEES SCREEN 2 (owner, 2026-11-13): only a student with no specific page
 * to go back to, where step 1 is the main button (showsLoopAfterWelcome). A
 * student who came from a chapter page or tapped a paper goes straight back to
 * it after screen 1. Until 2026-11-13 the Continue button refreshed the page,
 * the server then saw an onboarded student and redirected, so from 2026-09-24
 * nobody who picked an exam ever saw screen 2; only skippers did.
 *
 * `onboarded_at` is stamped by screen 1, so a student who closes the tab on
 * screen 2 is never asked the exam question again and simply misses the loop
 * once, the cheaper failure. See welcomeDestination() for the buttons.
 *
 * Screen 1 as a CONFIRM (2026-11-13): when the page they came from names an
 * exam (`guess`, lib/exam/examFromPath), screen 1 asks "Preparing for
 * MHT-CET?" with one button instead of class-then-exam chips. 35% of sign-ups
 * left screen 1 without an answer and 46% of students have no exam; they never
 * pick one later. The class stays, as one OPTIONAL row of only the classes that
 * fit the exam (stagesForTier: no "College / other" for MHT-CET; none shown for
 * a school or graduate exam, which has one): 95% gave it on the old screen, and
 * the GoPost leads feed, staff rosters and /me's stage nudge read it. "Choose a different exam" opens the old screen, empty.
 */
const STAGE_OPTIONS = STAGES.map((s) => ({ value: s, label: STAGE_LABELS[s] }));

export default function ExamOnboarding({
  next,
  guess,
}: {
  next: string;
  /** The exam the page they came from names, to confirm; null asks cold. */
  guess: ExamSlug | null;
}) {
  const guessed = guess && isExamSlug(guess) ? getExamBySlug(guess) : null;
  // The confirm view while there is a guess and they have not asked to choose.
  const [confirming, setConfirming] = useState(guessed !== null);
  // Only the classes that fit the exam (no "College / other" for MHT-CET); a
  // school or graduate exam has one, so its row is not shown at all.
  const confirmStages = guessed ? stagesForTier(guessed.tier) : [];
  const [exams, setExams] = useState<ExamSlug[]>([]);
  const [stage, setStage] = useState<Stage | null>(null);
  const [showExams, setShowExams] = useState(false);
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

  async function onContinue(targets: ExamSlug[]) {
    setSubmitting("continue");
    try {
      const chosen = await save(targets, stage);
      if (chosen && isExamSlug(chosen)) setExamCookie(chosen);
      toast.success("You're all set.");
      // No router.refresh() here (2026-11-13): it re-ran this page on the
      // server, which now saw an onboarded student and redirected to `next`,
      // so nobody who picked an exam ever saw screen 2 (from 2026-09-24).
      after(chosen && isExamSlug(chosen) ? chosen : "none");
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
    after("none");
  }

  /**
   * Where a student goes once screen 1 is answered: back to the specific page
   * they came from, with a full load so the header reads the new exam cookie
   * (what the old refresh was for), or on to screen 2 when they have nowhere
   * specific to go (showsLoopAfterWelcome, owner 2026-11-13).
   */
  function after(chosen: ExamSlug | "none") {
    const loop = loopFor(chosen === "none" ? null : getExamBySlug(chosen));
    if (showsLoopAfterWelcome(next, loop)) {
      setPrimary(chosen);
      return;
    }
    window.location.assign(next);
  }

  const busy = submitting !== null;

  if (primary !== null) {
    const exam = primary === "none" ? null : getExamBySlug(primary);
    const loop = loopFor(exam);
    const dest = welcomeDestination(next, loop);
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 sm:px-6">
        <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <BrandMark />

          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">Step 2 of 2</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {loop.examLabel ? `How ${loop.examLabel} prep works here` : "How it works"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {loop.kind === "mock"
              ? "Three steps, about five minutes a day after the first sitting."
              : "Three habits that make the textbook stick."}
          </p>

          <div className="mt-6">
            <HowItWorks loop={loop} compact linkSteps={false} variant="list" />
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:items-center">
            {/* w-full on a phone, flex-1 only from sm: in the stacked (column)
                row, flex-1 collapsed the button to its text height (~24 px). */}
            <Button asChild variant="brand" size="lg" className="h-12 w-full rounded-xl text-base sm:w-auto sm:flex-1">
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

  if (confirming && guessed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 sm:px-6">
        <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <BrandMark />
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">Step 1 of 2</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Preparing for {guessed.displayName}?</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;ll put its questions, notes and past papers first. You can change this anytime.
          </p>
          <div className="mt-6">
            <Button
              type="button"
              variant="brand"
              size="lg"
              className="h-12 w-full rounded-xl text-base"
              disabled={busy}
              onClick={() => onContinue([guessed.slug])}
            >
              {submitting === "continue" ? "Saving…" : "Yes, continue"}
              {submitting !== "continue" && <ArrowRight className="h-4 w-4" aria-hidden />}
            </Button>
          </div>
          {confirmStages.length > 1 && (
            <div className="mt-7">
              <ProfileChips
                legend="Your class (optional)"
                legendStyle="question"
                options={confirmStages.map((s) => ({ value: s, label: STAGE_LABELS[s] }))}
                selected={stage ? [stage] : []}
                onToggle={(v) => setStage(stage === v ? null : (v as Stage))}
                disabled={busy}
              />
            </div>
          )}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setConfirming(false);
                setExams([]);
              }}
              className="rounded-sm text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
              Choose a different exam
            </button>
            <Button type="button" variant="ghost" disabled={busy} onClick={onSkip}>
              {submitting === "skip" ? "…" : "Skip for now"}
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-sm">
        <BrandMark />

        <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">Step 1 of 2</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Two quick questions</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll put your bank, notes and mocks front and centre. You can change this anytime.
        </p>

        <div className="mt-7">
          <ProfileChips
            legend="Which class are you in?"
            legendStyle="question"
            options={STAGE_OPTIONS}
            selected={stage ? [stage] : []}
            onToggle={(v) => setStage(stage === v ? null : (v as Stage))}
            disabled={busy}
          />
        </div>

        {/* The exams appear once the class is picked, already narrowed to it.
            The first view used to show all ~30 exam chips at once. */}
        <div className="mt-7">
          {examQuestionVisible({ stage, selectedCount: exams.length, showAnyway: showExams }) ? (
            <TierExamChips
              legend="Which exam are you aiming for?"
              legendStyle="question"
              stage={stage}
              selected={exams}
              onToggle={(v) => toggleExam(v as ExamSlug)}
              disabled={busy}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              Pick your class and we&apos;ll show the exams that fit it.{" "}
              <button
                type="button"
                onClick={() => setShowExams(true)}
                className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Or see every exam
              </button>
            </p>
          )}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <Button
            type="button"
            variant="brand"
            className="flex-1"
            disabled={busy || exams.length === 0}
            onClick={() => onContinue(exams)}
          >
            {submitting === "continue" ? "Saving…" : "Continue"}
          </Button>
          <Button type="button" variant="ghost" disabled={busy} onClick={onSkip}>
            {submitting === "skip" ? "…" : "Skip for now"}
          </Button>
        </div>
        {/* A disabled button says nothing on its own. */}
        {exams.length === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">Pick at least one exam to continue, or skip for now.</p>
        )}
      </div>
    </main>
  );
}

/** The brand V and name (the open-book icon predated the V logo). */
function BrandMark() {
  return (
    <div className="mb-6 flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static mark, as in HeaderBar */}
      <img src="/icons/mark-96.png" alt="" aria-hidden width={24} height={24} className="h-6 w-6 shrink-0" />
      <span className="text-sm font-semibold tracking-tight">PYQ Vault</span>
    </div>
  );
}
