"use client";

/**
 * Client sender for POST /api/activity/event. BEST EFFORT, like the practice
 * beacon: a lost ping must never surface to a student or break the
 * interaction it observes. `keepalive` lets a "checkout dismissed" survive the
 * navigation that usually follows it.
 *
 * The server dedupes views and impressions per day; this only avoids sending
 * the same one twice from one page instance.
 */
import type { Surface } from "./views";
import type { PaywallGate } from "./clientEvents";

const ENDPOINT = "/api/activity/event";
const sent = new Set<string>();

type ClientEvent =
  | { kind: "surface_viewed"; surface: Surface }
  | { kind: "paywall_event"; step: "shown" | "checkout_dismissed"; gate: PaywallGate; planId?: string };

export function sendActivity(event: ClientEvent): void {
  try {
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => {
      /* not worth surfacing */
    });
  } catch {
    /* hostile environment — drop silently */
  }
}

/** Send once per page instance (a re-render must not repeat an impression). */
export function sendActivityOnce(key: string, event: ClientEvent): void {
  if (sent.has(key)) return;
  sent.add(key);
  sendActivity(event);
}
