"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Play } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Start a sent practice test: get (or make) this student's own copy through
 * /api/practice-tests/join, then start it through the ordinary mock start
 * route, as V's builder does.
 */
export default function JoinPractice({ code }: { code: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function start() {
    if (busy) return;
    setBusy(true);
    try {
      const joined = await fetch("/api/practice-tests/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const j = (await joined.json().catch(() => ({}))) as { ok?: boolean; slug?: string; error?: string; signIn?: boolean };
      if (j.signIn) {
        router.push(`/login?next=${encodeURIComponent(`/practice/${code}`)}`);
        return;
      }
      if (!j.ok || !j.slug) {
        toast.error(j.error || "Couldn't open this test. Please try again.");
        return;
      }
      const res = await fetch(`/api/mock/${encodeURIComponent(j.slug)}/start`, { method: "POST" });
      const body = (await res.json().catch(() => ({}))) as { attemptId?: string; error?: string };
      if (!res.ok || !body.attemptId) {
        toast.error(body.error || "Could not start the test. Please try again.");
        return;
      }
      router.push(`/mock/${encodeURIComponent(j.slug)}/attempt/${body.attemptId}`);
    } catch {
      toast.error("Could not start the test. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="brand" className="w-full sm:w-auto" disabled={busy} onClick={() => void start()}>
      {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
      {busy ? "Starting…" : "Start the test"}
    </Button>
  );
}
