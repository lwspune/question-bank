"use client";

import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { invalidatePulse } from "@/lib/viewer/usePulse";

/**
 * Marks the student's replies as read once /feedback is on their screen, then
 * refetches the pulse so the menu's "1 reply" goes away.
 *
 * In the BROWSER on mount, not in the server render: a link prefetch renders
 * the page without anyone looking at it, and would mark a reply read that the
 * student never saw. Rendered only when something is unread. Renders nothing.
 */
export default function RepliesSeen() {
  useEffect(() => {
    let cancelled = false;
    const supabase = createSupabaseBrowserClient();
    void supabase.rpc("mark_feedback_replies_seen").then(({ error }) => {
      if (error) {
        console.error("mark replies seen failed", error.message);
        return;
      }
      if (!cancelled) invalidatePulse();
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
