"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildWhatsappHref, type ShareChannel } from "@/lib/mocks/share";
import { buildChapterShareText, buildChapterShareUrl } from "@/lib/share/chapterShare";
import { trackFunnel } from "@/lib/analytics/trackFunnel";

/**
 * "Send this chapter to your study group" — on every /questions chapter page
 * and every notes chapter page that has one.
 *
 * WHAT IS SHARED is the chapter's public /questions page, never a score.
 * Rules and the message are in lib/share/chapterShare.ts.
 *
 * A CLIENT ISLAND so the pages around it stay prerendered: everything here is
 * computed from props, and navigator is only read after mount.
 *
 * NOT A GATE AND NOT REWARDED: nothing is withheld until someone shares.
 */
export default function ChapterShareCard({
  path,
  chapterName,
  examDisplay,
  questionCount,
  practiceOnly,
  surface,
}: {
  path: string;
  chapterName: string;
  examDisplay: string;
  questionCount: number;
  practiceOnly: boolean;
  /** Which page the card sits on, so the two placements can be compared. */
  surface: "questions" | "notes";
}) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // After mount only: navigator does not exist on the server, and branching
  // on it during render would be a hydration mismatch.
  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const message = (channel: ShareChannel) =>
    buildChapterShareText({ path, chapterName, examDisplay, questionCount, practiceOnly, channel });

  const log = (channel: ShareChannel) => trackFunnel("chapter_share_click", { channel, surface });

  async function nativeShare() {
    try {
      // `text` only: the message already ends with the link, and passing `url`
      // as well makes some apps show it twice.
      await navigator.share({ text: message("share") });
      log("share");
    } catch {
      // Closing the OS sheet rejects with AbortError — a change of mind, not a failure.
    }
  }

  async function copyLink() {
    const url = buildChapterShareUrl(path, "copy");
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
    <section aria-labelledby="chapter-share-heading" className="mt-8 rounded-lg border bg-card p-4">
      <div className="flex items-start gap-3">
        <Share2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 id="chapter-share-heading" className="text-sm font-semibold">
            Studying this with friends?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Send them this chapter&apos;s questions. It&apos;s free for them too.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button asChild variant="brand" size="sm">
              <a
                href={buildWhatsappHref(message("whatsapp"))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => log("whatsapp")}
              >
                WhatsApp
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
