"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";

/**
 * Record that a signed-in student opened "See it" under an exam twin's line
 * (2026-11-06): whether students open the matched past question at all. Same
 * shape as the board Revision tab's beacon: the page is cached, so the
 * browser's own session decides (getSession is local, no network), signed out
 * it sends nothing, and the server keeps one row per page per student per day.
 * Best effort.
 */
export function reportTwinOpened(): void {
  const path = window.location.pathname;
  createSupabaseBrowserClient()
    .auth.getSession()
    .then(({ data }) => {
      if (data.session) sendActivityOnce(`exam_twin:${path}`, { kind: "surface_viewed", surface: "exam_twin", path });
    })
    .catch(() => {
      /* best effort */
    });
}
