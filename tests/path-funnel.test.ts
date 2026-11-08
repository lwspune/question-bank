/**
 * The board path's readout funnel (MENTOR_SPEC.md Phase 4, 2026-11-08): what
 * the 4-week readout could not answer before.
 *
 * - The start offer seen on /me and on /board, the path line seen on /board,
 *   the weekly review and "Pick up here" seen, V's "My plan for today" opened:
 *   view events, once per student per surface per day.
 * - Lighter / More: a `path_paced` event per tap with the minutes before and
 *   after (a tap overwrote the minutes and kept no history).
 * - The readout's counting: offer seen -> started, pace changes, deferrals.
 */
import { describe, it, expect } from "vitest";
import { parseClientEvent } from "@/lib/activity/clientEvents";
import { PATH_SURFACES, pacedEvent, summarizeFunnel } from "@/lib/path/funnel";

const NOW = new Date("2026-11-20T06:00:00Z");

describe("the path's view events", () => {
  it("accepts each path surface, once per student per day", () => {
    for (const surface of PATH_SURFACES) {
      const r = parseClientEvent({ kind: "surface_viewed", surface }, "u1", NOW);
      expect(r.ok, surface).toBe(true);
      if (r.ok) {
        expect(r.value.metadata).toEqual({ surface });
        expect(r.value.dedupeKey).toMatch(new RegExp(`${surface}.*u1.*2026-11-20`));
      }
    }
  });
  it("refuses a page address or chapter on them", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "path_offer_me", path: "/me" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ kind: "surface_viewed", surface: "path_board_line", chapterId: "x", from: "board" }, "u1", NOW).ok).toBe(false);
  });
});

describe("Lighter / More: the pace event", () => {
  it("records the direction and the minutes before and after, every tap", () => {
    expect(pacedEvent("more", 40, 50)).toEqual({
      kind: "path_paced",
      metadata: { direction: "more", from: "40", to: "50" },
    });
    // No dedupe key: two taps are two changes.
    expect(pacedEvent("lighter", 50, 40)).not.toHaveProperty("dedupeKey");
  });
});

describe("the readout's funnel", () => {
  const summary = summarizeFunnel({
    views: [
      { user: "a", surface: "path_offer_me", day: "2026-11-10" },
      { user: "a", surface: "path_offer_me", day: "2026-11-11" },
      { user: "b", surface: "path_offer_board", day: "2026-11-10" },
      { user: "c", surface: "path_offer_me", day: "2026-11-12" },
      { user: "a", surface: "path_review", day: "2026-11-18" },
      { user: "a", surface: "v_path", day: "2026-11-15" },
      { user: "a", surface: "v_path", day: "2026-11-16" },
      { user: "a", surface: "path_board_line", day: "2026-11-15" },
      { user: "a", surface: "path_pickup", day: "2026-11-19" },
    ],
    starts: [
      { user: "a", at: "2026-11-11T09:00:00Z" },
      { user: "d", at: "2026-11-12T09:00:00Z" },
    ],
    paced: [
      { user: "a", direction: "more", from: 40, to: 50 },
      { user: "a", direction: "more", from: 50, to: 60 },
      { user: "d", direction: "lighter", from: 50, to: 40 },
    ],
    deferrals: [
      { user: "a", chapter: "Electrostatics" },
      { user: "d", chapter: "Electrostatics" },
      { user: "d", chapter: "Solutions" },
    ],
    stops: 1,
  });

  it("counts students who saw the offer, where, and how many of them started", () => {
    expect(summary.offerSeen).toEqual({ me: 2, board: 1, either: 3 });
    expect(summary.started).toBe(2);
    expect(summary.startedAfterOffer).toBe(1);
  });
  it("counts students who changed pace, which way, and the net minutes", () => {
    expect(summary.pace).toEqual({ students: 2, more: 2, lighter: 1, netMinutes: 10 });
  });
  it("counts students per seen surface, not views", () => {
    expect(summary.seen).toEqual({ review: 1, pickup: 1, vCard: 1, boardLine: 1 });
  });
  it("names the chapters deferred most, and the stops", () => {
    expect(summary.deferrals).toEqual({ taps: 3, students: 2, top: [["Electrostatics", 2], ["Solutions", 1]] });
    expect(summary.stops).toBe(1);
  });
});
