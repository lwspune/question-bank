"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Retake for a student's own practice test (2026-10-15). A past paper's
 * Retake links to its public page; a practice test has none, so this starts a
 * new attempt straight away through the ordinary start route. A retake is
 * free (the 0156 trigger counts a test once, by its first attempt).
 */
export default function RetakePractice({ slug, primary }: { slug: string; primary: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function retake() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/mock/${encodeURIComponent(slug)}/start`, { method: "POST" });
      const body = (await res.json().catch(() => ({}))) as { attemptId?: string; error?: string };
      if (!res.ok || !body.attemptId) {
        toast.error(body.error || "Could not start the test. Please try again.");
        return;
      }
      router.push(`/mock/${encodeURIComponent(slug)}/attempt/${body.attemptId}`);
    } catch {
      toast.error("Could not start the test. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      variant={primary ? "brand" : "outline"}
      size="lg"
      className="h-12 rounded-xl text-base"
      onClick={() => void retake()}
      disabled={busy}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <RotateCcw className="h-4 w-4" aria-hidden />}
      {primary ? "Try again" : "Retake"}
    </Button>
  );
}
