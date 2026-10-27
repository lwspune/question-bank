"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { selfMarkMessage } from "@/lib/questions/selfMark";
import { invalidatePulse } from "@/lib/viewer/usePulse";
import { clearParkedSelfMark, postSelfMark, readParkedSelfMark } from "./selfMarkClient";

/**
 * Saves a signed-out "Understood / Review later" tap once the visitor comes
 * back signed in (2026-10-28, the owner's call). Lives in the root layout
 * because the card that took the tap has its model answer closed again after
 * the sign-in round trip, so its buttons are not on screen to do it.
 *
 * Costs nothing on a normal page load: one localStorage read, and the session
 * is looked up only when a tap is actually waiting. Runs after hydration and
 * touches no server API at render, so prerendered routes stay prerendered.
 */
export default function PendingSelfMarkSaver() {
  useEffect(() => {
    const parked = readParkedSelfMark();
    if (!parked) return;
    let active = true;
    createSupabaseBrowserClient()
      .auth.getSession()
      .then(async ({ data }) => {
        // Still signed out: leave it parked until they sign in, or it expires.
        if (!active || !data.session) return;
        // Cleared BEFORE the post, so two tabs cannot both save it.
        clearParkedSelfMark();
        const res = await postSelfMark(parked);
        if (res.ok) {
          toast.success(selfMarkMessage(res.outcome));
          invalidatePulse();
        } else if (!res.signedOut) {
          toast.error(res.error);
        }
      })
      .catch(() => {
        /* a parked tap is never worth breaking a page over */
      });
    return () => {
      active = false;
    };
  }, []);

  return null;
}
