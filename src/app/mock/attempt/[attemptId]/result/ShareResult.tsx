"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  buildMockShareText,
  buildMockShareUrl,
  buildWhatsappHref,
  type ShareChannel,
} from "@/lib/mocks/share";

/**
 * Pass-the-paper-on card, shown under a finished mock's score.
 *
 * WHY HERE: a finished mock is the one moment a student feels something worth
 * sharing, and NDA aspirants organise in WhatsApp and Telegram groups. Until
 * now the app's only share affordance was staff-only, on the catalogue page.
 *
 * WHAT IS SHARED IS THE PAPER, NOT THE RESULT — and the score is opt-in, off by
 * default. Both decisions are argued in lib/mocks/share.ts; the short version is
 * that a score-forward share only fires for students who did well, and rebuilds
 * the peer ranking the engagement gate forbids leaderboards for.
 *
 * NOT A GATE AND NOT REWARDED. Nothing on this screen is withheld until a
 * student shares, and sharing earns nothing — that would make it a dark pattern
 * rather than an offer.
 */
export default function ShareResult({
  slug,
  title,
  score,
  maxScore,
}: {
  slug: string;
  title: string;
  score: number;
  maxScore: number;
}) {
  const [includeScore, setIncludeScore] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // Detected after mount, never during render: navigator does not exist on the
  // server, and branching on it in the render body is a hydration mismatch.
  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const message = (channel: ShareChannel) =>
    buildMockShareText({ slug, title, score, maxScore, includeScore, channel });

  /**
   * Fire-and-forget. keepalive matters: tapping the WhatsApp link navigates the
   * tab away, and without it the browser cancels an in-flight request — which
   * would under-count the single channel we most want to measure.
   */
  function log(channel: ShareChannel) {
    try {
      void fetch("/api/mock/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, channel, includedScore: includeScore }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // An analytics write must never surface to the student.
    }
  }

  async function nativeShare() {
    try {
      // `text` only, no `url`: the message already ends with the link, and
      // passing both makes some targets render the URL twice.
      await navigator.share({ text: message("share") });
      log("share");
    } catch {
      // Dismissing the OS sheet rejects with AbortError. That is a student
      // changing their mind, not a failure — say nothing.
    }
  }

  async function copyLink() {
    const url = buildMockShareUrl(slug, "copy");
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      log("copy");
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy automatically", { description: url });
    }
  }

  return (
    <section className="mt-4 rounded-xl border bg-card p-5">
      <div className="flex items-start gap-3">
        <Share2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold">Pass this paper on</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Send the full timed paper to your study group — it&apos;s free for them too.
          </p>

          <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeScore}
              onChange={(e) => setIncludeScore(e.target.checked)}
              className="h-4 w-4 shrink-0 rounded border-input"
            />
            <span>Include my score</span>
          </label>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button asChild variant="brand" size="sm">
              <a
                href={buildWhatsappHref(message("whatsapp"))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => log("whatsapp")}
              >
                Share on WhatsApp
              </a>
            </Button>

            {canNativeShare && (
              <Button type="button" variant="outline" size="sm" onClick={nativeShare}>
                More apps
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={copyLink}
              className="text-muted-foreground"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden />
              )}
              {copied ? "Copied" : "Copy link"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
