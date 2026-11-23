"use client";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { sendActivity, type ClientEvent } from "@/lib/activity/clientBeacon";

type PlayRoundEvent = Extract<ClientEvent, { kind: "play_round" }>;

/**
 * A finished /play round (2026-11-18): counted in analytics for everyone
 * (`play_round_end`, with the game), and stored as user_activity play_round
 * for a signed-in player (migration 0267; never counted as study).
 */
export function reportRound(
  signedIn: boolean,
  event: PlayRoundEvent,
  props: Record<string, string | number | boolean>
): void {
  const game = "game" in event ? event.game : "maths";
  trackFunnel("play_round_end", { game, signedIn, ...props });
  if (signedIn) sendActivity(event);
}
