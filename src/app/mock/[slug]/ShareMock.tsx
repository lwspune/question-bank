"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Staff-only affordance to copy a mock's public share link. The link IS the
 * mock's public instructions page (/mock/<slug>) — anyone with it can take the
 * mock after signing in. Built from the live origin so it works on prod + preview.
 */
export default function ShareMock({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/mock/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Share link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context / permissions) — show the URL to copy by hand.
      toast.error("Couldn't copy automatically", { description: url });
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-dashed bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
      <Share2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="min-w-0 flex-1">Share this mock with students:</span>
      <code className="hidden max-w-[16rem] truncate rounded bg-background px-1.5 py-0.5 font-mono text-[11px] sm:inline">
        /mock/{slug}
      </code>
      <Button variant="outline" size="sm" onClick={copy}>
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}
