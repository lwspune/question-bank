"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileChips from "@/components/ProfileChips";
import { isExamSlug, type ExamSlug } from "@/lib/exam/examContext";
import { EXAM_CHIP_OPTIONS } from "@/lib/profile/examChoices";
import { setExamCookie } from "@/lib/exam/examCookie";
import { STAGES, STAGE_LABELS, type Stage } from "@/lib/profile/onboarding";

/**
 * Post-signup intent capture — the first "staggered" ask. One screen, chips not
 * dropdowns, pre-filled from the exam the student was already browsing, and
 * SKIPPABLE. On Continue we persist + set the qb_exam cookie to the primary
 * exam so /browse, notes and mocks personalise the same second. Asked once —
 * onboarded_at is stamped on both Continue and Skip.
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
      const primary = await save(exams, stage);
      if (primary && isExamSlug(primary)) setExamCookie(primary);
      toast.success("You're all set.");
      router.replace(next);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save. Please try again.");
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
    }
    router.replace(next);
    router.refresh();
  }

  const busy = submitting !== null;

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
