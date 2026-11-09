"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildWhatsappHref } from "@/lib/mocks/share";
import type { DownloadBox, PaywallGate } from "@/lib/activity/clientEvents";
import { cn } from "@/lib/utils";
import { markWhyHandled } from "./WhyNotNowToast";

/**
 * "Can't pay yourself? Ask a parent" (2026-11-09, migration 0244), under every
 * pass offer. Makes the student's short payment link for this pass and hands
 * them the message to send: WhatsApp, the phone's share sheet, or copy. The
 * parent pays at /pay/<code> with no account, and the pass comes here.
 *
 * Small and below Pay, so it never competes with it. Signed-in students only
 * (the link names their account); www passes in rupees only (PassCta
 * `parentLink`). Opening it counts as an answer to "why not today?", so the
 * close toast does not ask again.
 */
export default function AskParent({
  planId,
  gate,
  box,
  startOpen = false,
  className,
}: {
  planId: string;
  gate: PaywallGate;
  box?: DownloadBox;
  /** Open at once (the student just answered "Need to ask a parent"). */
  startOpen?: boolean;
  className?: string;
}) {
  const [state, setState] = useState<"closed" | "loading" | "ready">(startOpen ? "loading" : "closed");
  const [share, setShare] = useState<{ url: string; text: string } | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // navigator exists only in the browser; reading it during render is a hydration mismatch.
  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  /** Fetch the link. Sets state only after the request, so the auto-open effect never sets it synchronously. */
  async function fetchLink() {
    try {
      const res = await fetch("/api/billing/parent-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, gate, box }),
      });
      const body = (await res.json()) as { url?: string; text?: string; error?: string };
      if (!res.ok || !body.url || !body.text) {
        toast.error(body.error || "Could not make the link. Try again.");
        setState("closed");
        return;
      }
      setShare({ url: body.url, text: body.text });
      setState("ready");
    } catch {
      toast.error("Could not make the link. Check your connection and try again.");
      setState("closed");
    }
  }

  function open() {
    setState("loading");
    markWhyHandled(gate, box);
    void fetchLink();
  }

  // Opened by the answer "Need to ask a parent": state starts at "loading" (above).
  const autoOpened = useRef(false);
  useEffect(() => {
    if (!startOpen || autoOpened.current) return;
    autoOpened.current = true;
    markWhyHandled(gate, box);
    void fetchLink();
    // Once, on mount; fetchLink reads only props fixed for this mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function nativeShare() {
    if (!share) return;
    try {
      await navigator.share({ text: share.text });
    } catch {
      // Closing the share sheet rejects. That is a choice, not a failure.
    }
  }

  async function copy() {
    if (!share) return;
    try {
      await navigator.clipboard.writeText(share.text);
      setCopied(true);
      toast.success("Message copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy automatically", { description: share.url });
    }
  }

  if (state !== "ready" || !share) {
    return (
      <p className={cn("text-center text-xs", className)}>
        <button
          type="button"
          onClick={open}
          disabled={state === "loading"}
          className="inline-flex items-center gap-1 rounded-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
        >
          {state === "loading" && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
          Can&apos;t pay yourself? Ask a parent to pay
        </button>
      </p>
    );
  }

  return (
    <div role="region" aria-label="Ask a parent to pay" className={cn("space-y-2 rounded-lg border bg-card p-3 font-sans text-sm", className)}>
      <p className="font-medium text-foreground">Send this to a parent</p>
      <p className="rounded-md bg-muted px-3 py-2 text-xs leading-relaxed text-muted-foreground">{share.text}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-brand-accent bg-card font-semibold text-brand-accent hover:bg-brand/10 hover:text-brand-accent"
        >
          <a href={buildWhatsappHref(share.text)} target="_blank" rel="noopener noreferrer">
            <Send className="h-3.5 w-3.5" aria-hidden />
            Send on WhatsApp
          </a>
        </Button>
        {canNativeShare && (
          <Button type="button" variant="outline" size="sm" onClick={nativeShare}>
            More apps
          </Button>
        )}
        <Button type="button" variant="ghost" size="sm" onClick={copy} className="text-muted-foreground">
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        The link works for 7 days. They don&apos;t need an account, and the pass comes to yours when they pay.
      </p>
    </div>
  );
}
