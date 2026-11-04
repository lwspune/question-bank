"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { boardChapterPath } from "@/lib/activity/views";

/**
 * Record that a signed-in student opened a /board chapter's Revision tab
 * (2026-11-03). The page is cached, so it cannot know who is reading: the
 * browser's own session decides (getSession is local, no network). Signed out
 * it sends nothing, as the header's reading beacon does: most /board traffic
 * is anonymous and the server would only refuse it. Best effort.
 */
export function reportRevisionOpened(): void {
  const path = boardChapterPath(window.location.pathname);
  if (!path) return;
  createSupabaseBrowserClient()
    .auth.getSession()
    .then(({ data }) => {
      if (data.session) sendActivityOnce(`board_revision:${path}`, { kind: "surface_viewed", surface: "board_revision", path });
    })
    .catch(() => {
      /* best effort */
    });
}
