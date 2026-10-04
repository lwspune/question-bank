"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  currentSubscription,
  pushAvailability,
  stampPushPrompted,
  subscribeToPush,
  unsubscribeFromPush,
} from "@/lib/push/client";

type State = "checking" | "on" | "off" | "ios" | "unsupported" | "denied";

/**
 * The /account notifications toggle (PUSH_SPEC.md §3). The state is THIS
 * browser's, read from its own push subscription after mount — a student can
 * be on in their phone and off on a laptop, which the server cannot know.
 * Renders nothing until push is configured (no VAPID key).
 */
export default function PushCard({ vapidKey }: { vapidKey: string }) {
  const [state, setState] = useState<State>("checking");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!vapidKey) return;
    let live = true;
    const avail = pushAvailability();
    if (avail === "ios-home-screen") setState("ios");
    else if (avail === "unsupported") setState("unsupported");
    else if (avail === "denied") setState("denied");
    else currentSubscription().then((sub) => live && setState(sub ? "on" : "off"));
    return () => {
      live = false;
    };
  }, [vapidKey]);

  async function turnOn() {
    setSaving(true);
    const result = await subscribeToPush(vapidKey);
    if (result === "subscribed") {
      await stampPushPrompted();
      toast.success("On. We'll tell you when something is waiting.");
      setState("on");
    } else if (result === "denied") {
      toast("Notifications are blocked for this site. Allow them in your browser settings first.");
      setState("denied");
    } else {
      toast.error("Could not turn notifications on. Please try again.");
    }
    setSaving(false);
  }

  async function turnOff() {
    setSaving(true);
    if (await unsubscribeFromPush()) {
      toast.success("Notifications are off in this browser.");
      setState("off");
    } else {
      toast.error("Could not turn notifications off. Please try again.");
    }
    setSaving(false);
  }

  if (!vapidKey || state === "checking") return null;

  return (
    <div className="mb-6 rounded-xl border bg-card p-6">
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-brand-accent" aria-hidden />
        <h2 className="font-semibold">Notifications</h2>
      </div>
      {state === "on" && (
        <>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">On in this browser.</span> We tell you when mistakes are
            waiting in Fix, once a day at most.
          </p>
          <Button type="button" variant="outline" size="sm" className="mt-4" onClick={turnOff} disabled={saving}>
            Turn off
          </Button>
        </>
      )}
      {state === "off" && (
        <>
          <p className="mt-2 text-sm text-muted-foreground">
            Off. Turn on to hear when mistakes are waiting in Fix, once a day at most.
          </p>
          <Button type="button" variant="brand" size="sm" className="mt-4" onClick={turnOn} disabled={saving}>
            Turn on
          </Button>
        </>
      )}
      {state === "ios" && (
        <p className="mt-2 text-sm text-muted-foreground">
          Not available in this browser. On iPhone, add PYQ Vault to your Home Screen first: tap Share, then Add to
          Home Screen. Open it from there and turn this on.
        </p>
      )}
      {state === "denied" && (
        <p className="mt-2 text-sm text-muted-foreground">
          Notifications are blocked for this site in your browser settings. Allow them there, then come back.
        </p>
      )}
      {state === "unsupported" && (
        <p className="mt-2 text-sm text-muted-foreground">Not available in this browser.</p>
      )}
    </div>
  );
}
