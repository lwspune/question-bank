"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

/** Confirm-then-act. The POST is what actually opts the student out — this
 *  button exists so a mailbox link-scanner's GET prefetch can't do it for them. */
export function UnsubscribeForm({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function submit() {
    setState("busy");
    try {
      const res = await fetch(`/api/unsubscribe/${token}`, { method: "POST" });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
        <Check className="h-4 w-4" aria-hidden="true" />
        Done — we won&apos;t email you about mocks again.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <Button onClick={submit} disabled={state === "busy"} variant="brand">
        {state === "busy" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Unsubscribing…
          </>
        ) : (
          "Unsubscribe me"
        )}
      </Button>
      {state === "error" && (
        <p className="text-sm text-destructive" role="alert">
          That didn&apos;t work. Please try again, or reply to the email and we&apos;ll do it manually.
        </p>
      )}
    </div>
  );
}
