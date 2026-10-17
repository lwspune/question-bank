"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildWhatsappHref, type ShareChannel } from "@/lib/mocks/share";
import { buildPracticeShareText, buildPracticeShareUrl } from "@/lib/practiceTests/friend";
import { buildMockInviteText, buildMockInviteUrl } from "@/lib/practiceTests/mockInvite";

/** What is sent: a practice test V built (0163), or a published paper with the sender's invite (0166). */
export type SendTarget = { kind: "practice"; code: string } | { kind: "mock"; slug: string; invite: string };

/**
 * "Practise together": send a test to a friend.
 *
 * A practice test (0163): the friend opens the link, signs in and sits their
 * own copy of the same questions, free. A published paper (0166): the link is
 * the paper's own page with the sender's invite, and the friend sits the same
 * paper, free. Either way both result pages then show what each side missed.
 * Cooperative, not a contest (owner's call, 2026-10-16): the message names the
 * test, never a score. An offer only: nothing is withheld until a student
 * sends, and sending earns nothing.
 *
 * `card` draws its own bordered box (the result page); without it the block
 * is a tinted blue panel (V's built-test card, the paper's start page): a
 * plain divider there read as small print under Start now.
 */
export default function SendToFriend({
  target,
  title,
  questions,
  minutes,
  card = false,
}: {
  target: SendTarget;
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

  const isPaper = target.kind === "mock";

  const message = (channel: ShareChannel) =>
    target.kind === "mock"
      ? buildMockInviteText({ slug: target.slug, code: target.invite, title, questions, minutes, channel })
      : buildPracticeShareText({ code: target.code, title, questions, minutes, channel });

  const link = (channel: ShareChannel) =>
    target.kind === "mock"
      ? buildMockInviteUrl(target.slug, target.invite, channel)
      : buildPracticeShareUrl(target.code, channel);

  /** Fire-and-forget; keepalive so the WhatsApp tap's navigation does not cancel it. */
  function log(channel: ShareChannel) {
    try {
      void fetch("/api/mock/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: target.kind === "mock" ? "mock_together" : "practice",
          slug: target.kind === "mock" ? target.slug : target.code,
          channel,
          includedScore: false,
        }),
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
    const url = link("copy");
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
          {isPaper
            ? "Send this paper to a friend. They sit it free, and when you have both finished you each see what the other missed."
            : "Send this test to a friend. They get the same questions, free."}
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
