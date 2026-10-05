"use client";

import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { BellRing, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { permissionUnasked, pushAvailability, stampPushPrompted, subscribeToPush } from "@/lib/push/client";

/**
 * The browser-push ask (PUSH_SPEC.md §3). Turn on and Not now both stamp
 * push_prompted_at, so it is asked once, on whichever screen comes first: the
 * mock result page, the end of a drill, or /me (the last two since
 * 2026-10-05, when push had one subscriber because only the result page
 * asked). Each screen decides from the stamp (lib/profile/push).
 *
 * Whether THIS browser can push is only known after mount. When it cannot (
 * an iPhone outside the Home Screen, an old browser, a site already blocked),
 * the card renders `children` instead: the result page passes the WhatsApp
 * card there, so a browser that can never answer this ask still gets that one.
 * The drill and /me pass nothing, so there it simply does not appear.
 *
 * `variant="row"` is the /me version: one line under the Today card, so the
 * page does not grow by a whole card.
 */
const DEFAULT_TITLE = "Tell me when my mistakes are due";
const DEFAULT_BODY =
  "One notification a day at most, only when something is waiting in Fix. Never on a day you already practised.";

export default function PushOptIn({
  vapidKey,
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  variant = "card",
  children,
}: {
  vapidKey: string;
  title?: string;
  body?: string;
  variant?: "card" | "row";
  children?: ReactNode;
}) {
  const [phase, setPhase] = useState<"checking" | "ask" | "fallback" | "done">("checking");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPhase(vapidKey && pushAvailability() === "available" && permissionUnasked() ? "ask" : "fallback");
  }, [vapidKey]);

  async function turnOn() {
    setSaving(true);
    const result = await subscribeToPush(vapidKey);
    if (result === "failed") {
      toast.error("Could not turn notifications on. Please try again.");
      setSaving(false);
      return;
    }
    await stampPushPrompted();
    if (result === "subscribed") toast.success("On. We'll tell you when something is waiting.");
    else toast("Notifications are off in this browser. You can turn them on from your account page.");
    setPhase("done");
  }

  async function notNow() {
    setSaving(true);
    await stampPushPrompted();
    setPhase("done");
  }

  if (phase === "checking" || phase === "done") return null;
  if (phase === "fallback") return <>{children}</>;

  if (variant === "row") {
    return (
      <section
        aria-label="Reminders"
        className="flex items-center gap-2.5 rounded-xl border bg-card py-2 pl-3.5 pr-2"
      >
        <BellRing className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <p className="min-w-0 flex-1 text-sm leading-snug">{title}</p>
        <Button type="button" variant="brand" size="sm" onClick={turnOn} disabled={saving}>
          Turn on
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={notNow}
          disabled={saving}
          aria-label="Not now"
          className="h-9 w-9 shrink-0 text-muted-foreground"
        >
          <X className="h-4 w-4" aria-hidden />
        </Button>
      </section>
    );
  }

  return (
    <section className="mt-4 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-5">
      <div className="flex items-start gap-3">
        <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          <div className="mt-3 flex items-center gap-2">
            <Button type="button" variant="brand" size="sm" onClick={turnOn} disabled={saving}>
              Turn on
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={notNow}
              disabled={saving}
              className="text-muted-foreground"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
              Not now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
