/**
 * surface_viewed — "did the student SEE it?"
 *
 * Until 2026-09-27 nothing recorded a page as viewed, only as acted on, so the
 * engagement read could not tell "never opened /drill" from "opened it and
 * left", and 51 of the 265 students who signed in that month counted as
 * absent. One row per student per surface per IST day (dedupe_key), so a
 * refresh cannot inflate it and a view doubles as the day's heartbeat.
 *
 * Pure. Server pages call logActivityOnce with surfaceViewedEvent; the /start
 * page (cached, no session on the server) sends it through the client beacon.
 */
import { istDayKey } from "@/lib/email/dueNudge";
import type { ActivityEvent } from "./events";

export const SURFACES = [
  "site", // the header's pulse fetch — fires on any signed-in page, the heartbeat
  "drill",
  "me",
  "map",
  "start",
  "result",
  "mock_start",
  "pricing",
] as const;

export type Surface = (typeof SURFACES)[number];
const SURFACE_SET: ReadonlySet<string> = new Set(SURFACES);

export function isSurface(v: unknown): v is Surface {
  return typeof v === "string" && SURFACE_SET.has(v);
}

export function viewDedupeKey(userId: string, surface: Surface, now: Date): string {
  return `view:${surface}:${userId}:${istDayKey(now)}`;
}

export function surfaceViewedEvent(
  userId: string,
  surface: Surface,
  now: Date,
  refId?: string
): ActivityEvent {
  const event: ActivityEvent = {
    kind: "surface_viewed",
    metadata: { surface },
    dedupeKey: viewDedupeKey(userId, surface, now),
  };
  if (refId) {
    event.refId = refId;
    event.refKind = surface;
  }
  return event;
}
