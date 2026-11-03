"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * For a student who never chose an exam: the one their practice (or first
 * page) points to, confirmed in one tap. Saves through PATCH /api/profile with
 * the exams alone, so a stage they already set is left as it is.
 */
export default function SuggestExamCard({ slug, examName }: { slug: string; examName: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function confirm() {
    setSaving(true);
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

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border bg-card p-3 text-sm">
      <GraduationCap className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
      <span className="font-medium">Studying for {examName}?</span>
      <span className="flex items-center gap-2">
        <Button size="sm" variant="brand" onClick={confirm} disabled={saving}>
          Yes, that&rsquo;s my exam
        </Button>
        <Link
          href="/account"
          prefetch={false}
          className="rounded text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Choose another
        </Link>
      </span>
    </div>
  );
}
