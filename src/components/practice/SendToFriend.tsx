"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildWhatsappHref, type ShareChannel } from "@/lib/mocks/share";
import { buildPracticeShareText, buildPracticeShareUrl } from "@/lib/practiceTests/friend";

/**
 * "Send to a friend" for a practice test V built (migration 0163).
 *
 * The friend opens the link, signs in and sits their own copy of the same
 * questions, free. Cooperative, not a contest (owner's call, 2026-10-16): the
 * message names the test, never a score. An offer only: nothing is withheld
 * until a student sends, and sending earns nothing.
 *
 * `card` draws its own bordered box (the result page); without it the block
 * sits inside a card that already has one (V's built-test card), as a tinted
 * blue panel: a plain divider there read as small print under Start now.
 */
export default function SendToFriend({
  code,
  title,
  questions,
  minutes,
  card = false,
}: {
  code: string;
  title: string;
  questions: number;
  minutes: number;
  card?: boolean;
}) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // After mount: navigator does not exist on the server.
  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const message = (channel: ShareChannel) => buildPracticeShareText({ code, title, questions, minutes, channel });

  /** Fire-and-forget; keepalive so the WhatsApp tap's navigation does not cancel it. */
  function log(channel: ShareChannel) {
    try {
      void fetch("/api/mock/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "practice", slug: code, channel, includedScore: false }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // An analytics write must never surface to the student.
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ text: message("share") });
      log("share");
    } catch {
      // Closing the share sheet rejects. That is a choice, not a failure.
    }
  }

  async function copyLink() {
    const url = buildPracticeShareUrl(code, "copy");
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

  const body = (
    <div className="flex items-start gap-3">
      <span className="icon-tile flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
        <Users className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-semibold">Practise together</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Send this test to a friend. They get the same questions, free.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-brand-accent bg-card font-semibold text-brand-accent hover:bg-brand/10 hover:text-brand-accent"
          >
            <a
              href={buildWhatsappHref(message("whatsapp"))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => log("whatsapp")}
            >
              Send on WhatsApp
            </a>
          </Button>
          {canNativeShare && (
            <Button type="button" variant="outline" size="sm" onClick={nativeShare}>
              More apps
            </Button>
          )}
          <Button type="button" variant="ghost" size="sm" onClick={copyLink} className="text-muted-foreground">
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
            {copied ? "Copied" : "Copy link"}
          </Button>
        </div>
      </div>
    </div>
  );

  return card ? (
    <section className="mt-4 rounded-xl border bg-card p-5">{body}</section>
  ) : (
    <div className="rounded-lg border border-brand-accent/30 bg-brand/10 p-3">{body}</div>
  );
}
