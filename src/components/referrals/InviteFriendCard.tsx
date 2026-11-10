"use client";

/**
 * "Invite a friend" (referrals, migration 0249): the inviter's card on /me
 * Home, and its line in the avatar menu.
 *
 * The link is made on the first tap of "Get my invite link", never on view,
 * so the readout's "links made" counts students who asked. Shares are logged
 * like the other share buttons (share_events, kind 'referral'): intent to
 * share, not delivery. Nothing renders until the read lands, and nothing on
 * the intl site (the API answers not eligible there).
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, Gift } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildWhatsappHref, type ShareChannel } from "@/lib/mocks/share";
import { useFixPoints } from "@/components/billing/useFixPoints";

type Card = { code: string | null; link: string | null; shareText: string | null; line: string };

async function readCard(): Promise<Card | null> {
  try {
    const res = await fetch("/api/me/referral", { cache: "no-store" });
    if (!res.ok) return null;
    const body = (await res.json()) as ({ eligible: true } & Card) | { eligible: false };
    return body.eligible ? body : null;
  } catch {
    return null;
  }
}

/** Fire-and-forget; keepalive so the WhatsApp tap's navigation does not cancel it. */
function logShare(code: string, channel: ShareChannel) {
  try {
    void fetch("/api/mock/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "referral", slug: code, channel, includedScore: false }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // An analytics write must never surface to the student.
  }
}

export default function InviteFriendCard() {
  const [card, setCard] = useState<Card | null>(null);
  const [making, setMaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    let live = true;
    readCard().then((c) => {
      if (live) setCard(c);
    });
    // After mount: navigator does not exist on the server.
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
    return () => {
      live = false;
    };
  }, []);

  if (!card) return null;

  async function makeLink() {
    setMaking(true);
    try {
      const res = await fetch("/api/me/referral", { method: "POST" });
      const body = (await res.json().catch(() => null)) as (Card & { error?: string }) | null;
      if (!res.ok || !body?.code) throw new Error(body?.error ?? "Could not make your link. Try again.");
      setCard((c) => (c ? { ...c, code: body.code, link: body.link, shareText: body.shareText } : c));
      toast.success("Your invite link is ready");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not make your link. Try again.");
    } finally {
      setMaking(false);
    }
  }

  async function nativeShare(code: string, text: string) {
    try {
      await navigator.share({ text });
      logShare(code, "share");
    } catch {
      // Closing the share sheet rejects. That is a choice, not a failure.
    }
  }

  async function copyLink(code: string, link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      logShare(code, "copy");
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy automatically", { description: link });
    }
  }

  return (
    <section id="invite" aria-labelledby="invite-heading" className="scroll-mt-20 rounded-xl border bg-card p-6">
      <h2 id="invite-heading" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <Gift className="h-4 w-4 text-brand-accent" aria-hidden />
        Invite a friend
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{card.line}</p>

      {card.code && card.link && card.shareText ? (
        <>
          <p className="mt-3 truncate rounded-md border bg-muted/40 px-3 py-2 font-mono text-xs" aria-label="Your invite link">
            {card.link}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-brand-accent bg-card font-semibold text-brand-accent hover:bg-brand/10 hover:text-brand-accent"
            >
              <a
                href={buildWhatsappHref(card.shareText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logShare(card.code!, "whatsapp")}
              >
                Send on WhatsApp
              </a>
            </Button>
            {canNativeShare && (
              <Button type="button" variant="outline" size="sm" onClick={() => nativeShare(card.code!, card.shareText!)}>
                More apps
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => copyLink(card.code!, card.link!)}
              className="text-muted-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
              {copied ? "Copied" : "Copy link"}
            </Button>
          </div>
        </>
      ) : (
        <Button type="button" size="sm" className="mt-3" onClick={makeLink} disabled={making}>
          {making ? "Making your link…" : "Get my invite link"}
        </Button>
      )}
    </section>
  );
}

/**
 * The avatar menu's "Invite a friend" link to the card. Shown where the card
 * is (www): it rides on the Vault Points read the menu already makes, so it
 * costs no fetch of its own.
 */
export function InviteFriendMenuLink({ className }: { className: string }) {
  const eligible = useFixPoints() !== null;
  if (!eligible) return null;
  return (
    <Link prefetch={false} href="/me#invite" className={className}>
      <Gift className="h-4 w-4" aria-hidden />
      Invite a friend
    </Link>
  );
}
