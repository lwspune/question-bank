"use client";

/**
 * Client sender for POST /api/activity/visual (lib/visuals/usage). BEST
 * EFFORT: a lost ping must never reach the student or slow the animation.
 *
 * Sends only when the browser carries a sign-in cookie, so a signed-out
 * visitor's solutions cost no requests (the route would refuse them anyway).
 * The server keeps one row per question, action and day; this only stops one
 * page from sending the same one twice.
 */
import { hasSupabaseAuthCookie } from "@/lib/auth-identity";
import type { VisualAction, VisualSurface } from "./usage";

const ENDPOINT = "/api/activity/visual";
const sent = new Set<string>();

/** Which question a rendered visual belongs to, and where it is shown. */
export type VisualTrack = { questionId: string; surface: VisualSurface };

function maybeSignedIn(): boolean {
  try {
    return hasSupabaseAuthCookie(document.cookie.split(";").map((c) => c.split("=")[0].trim()));
  } catch {
    return false;
  }
}

export function reportVisual(track: VisualTrack, scene: string, action: VisualAction): void {
  const key = `${track.surface}:${track.questionId}:${action}`;
  if (sent.has(key) || !maybeSignedIn()) return;
  sent.add(key);
  try {
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: track.questionId, surface: track.surface, action, scene }),
      keepalive: true,
    }).catch(() => {
      /* not worth surfacing */
    });
  } catch {
    /* hostile environment — drop silently */
  }
}
