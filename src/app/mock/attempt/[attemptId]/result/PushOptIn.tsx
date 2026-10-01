"use client";

import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { BellRing, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { permissionUnasked, pushAvailability, stampPushPrompted, subscribeToPush } from "@/lib/push/client";

/**
 * The browser-push ask (PUSH_SPEC.md §3), offered once on the mock result page.
 * Turn on and Not now both stamp push_prompted_at, so it is asked once.
 *
 * Whether THIS browser can push is only known after mount. When it cannot —
 * an iPhone outside the Home Screen, an old browser, a site already blocked —
 * the card renders `children` instead: the server passes the WhatsApp card
 * there, so a browser that can never answer this ask still gets that one.
 */
export default function PushOptIn({ vapidKey, children }: { vapidKey: string; children?: ReactNode }) {
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

  return (
    <section className="mt-4 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-5">
      <div className="flex items-start gap-3">
        <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold">Tell me when my mistakes are due</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            One notification a day at most, only when something is waiting in Fix. Never on a day you already
            practised.
          </p>
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
