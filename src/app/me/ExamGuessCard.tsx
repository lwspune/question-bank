"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * For a student who never chose an exam: the exam we guessed from their
 * practice or the page they first landed on (migration 0254, owner
 * 2026-11-14), shown as their exam and marked as our guess.
 *
 * Correct saves it as their chosen exam (PATCH /api/profile, the exams alone,
 * so a stage they set stays). Change opens the exam picker on /account. Both
 * taps, and the first time the card comes into view, are recorded by
 * POST /api/profile/exam-guess for the `exam-guess-card` readout; a failed
 * record never blocks the student.
 */
function record(action: "seen" | "correct" | "change"): Promise<unknown> {
  return fetch("/api/profile/exam-guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
    // Change navigates away at once; keepalive lets the record finish.
    keepalive: true,
  }).catch(() => {});
}

export default function ExamGuessCard({ slug, examName }: { slug: string; examName: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // The sighting, once, when at least half the card is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      void record("seen");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void record("seen");
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  async function confirm() {
    setSaving(true);
    void record("correct");
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetExams: [slug] }),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success(`Saved. This page now follows ${examName}.`);
      router.refresh();
    } catch {
      toast.error("Could not save your exam. Please try again.");
      setSaving(false);
    }
  }

  function change() {
    void record("change");
    router.push("/account");
  }

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border bg-card p-3 text-sm">
      <GraduationCap className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
      <span>
        Your exam: <span className="font-semibold">{examName}</span>{" "}
        <span className="text-muted-foreground">(our guess)</span>
      </span>
      <span className="flex items-center gap-2">
        <Button size="sm" variant="brand" onClick={confirm} disabled={saving}>
          Correct
        </Button>
        <Button size="sm" variant="outline" onClick={change} disabled={saving} aria-label={`Change your exam from ${examName}`}>
          Change
        </Button>
      </span>
    </div>
  );
}
