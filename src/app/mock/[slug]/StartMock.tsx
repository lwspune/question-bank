"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/** Starts (or resumes) an attempt, then routes into the runner. */
export default function StartMock({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    try {
      const res = await fetch(`/api/mock/${slug}/start`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start the test.");
      if (data.resumed) toast.info("Resuming your in-progress attempt.");
      router.push(`/mock/${slug}/attempt/${data.attemptId}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not start the test.");
      setLoading(false);
    }
  }

  return (
    <Button variant="brand" size="lg" className="w-full" onClick={start} disabled={loading}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <Play className="h-4 w-4" aria-hidden />
      )}
      {loading ? "Starting…" : "Start test"}
    </Button>
  );
}
