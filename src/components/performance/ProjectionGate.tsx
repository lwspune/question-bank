"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import PremiumLimitCard from "@/components/premium/PremiumLimitCard";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import type { PassCta } from "@/lib/billing/plans";

/**
 * The projected score behind its trial (migration 0134, owner 2026-10-05).
 *
 *   not_started  a Reveal button: tapping it starts the free days, once ever,
 *                then the page re-renders on the server with the numbers.
 *   expired      the teaser, with the pass button.
 *
 * Either way the projection is not in this page: the server left it out, so
 * nothing here can be read from the page source.
 */
export default function ProjectionGate({
  state,
  pass,
}: {
  state: { kind: "not_started"; days: number } | { kind: "expired" };
  pass: PassCta | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (state.kind === "expired") {
      sendActivityOnce("projection", { kind: "paywall_event", step: "shown", gate: "projection" });
    }
  }, [state.kind]);

  if (state.kind === "expired") {
    return (
      <div className="mt-3">
        <PremiumLimitCard
          title="Your projected score is in Premium Pass"
          body={`Your free days with it are over. ${
            pass ? `The ${pass.label} shows` : "A pass shows"
          } the score you're heading for in each subject, and the chapters worth the most marks to fix, after every paper you sit.`}
          pass={pass}
          returnTo="/performance"
        />
      </div>
    );
  }

  async function reveal() {
    setBusy(true);
    try {
      const res = await fetch("/api/me/projection-trial", { method: "POST" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      toast.error("Couldn't open it. Try again.");
      setBusy(false);
    }
  }

  const days = state.days === 1 ? "1 day" : `${state.days} days`;
  return (
    <div className="mt-3 rounded-lg border bg-card p-5 text-center">
      <p className="font-semibold">See the score you&apos;re heading for</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
        Your projected score, and the chapters worth the most marks to fix. Free for {days} from when you reveal it.
      </p>
      <Button variant="brand" className="mt-4" onClick={reveal} disabled={busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
        Reveal my projected score
      </Button>
    </div>
  );
}
