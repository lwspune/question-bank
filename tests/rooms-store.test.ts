/**
 * lib/rooms/store: the rooms state shared by the bubble, the account menu
 * entry and the Account card. Saving the same values must NOT notify
 * listeners: a listener that re-renders and saves again would otherwise loop
 * (found 2026-11-25: an open rooms window re-fetched GET /api/rooms about
 * twice a second, because each save re-rendered the bubble, whose new
 * callback re-ran the window's fetch).
 */
import { describe, it, expect } from "vitest";
import { saveRoomsState, subscribeRoomsState, readRoomsState, markCirclesSeen } from "@/lib/rooms/store";

describe("rooms store", () => {
  it("notifies on a change and stays quiet on a repeat", () => {
    let calls = 0;
    const off = subscribeRoomsState(() => calls++);
    saveRoomsState({ unread: 3, hiddenUntil: null });
    expect(calls).toBe(1);
    saveRoomsState({ unread: 3, hiddenUntil: null });
    saveRoomsState({ unread: 3 });
    expect(calls).toBe(1);
    saveRoomsState({ hiddenUntil: "infinity" });
    expect(calls).toBe(2);
    expect(readRoomsState()).toMatchObject({ unread: 3, hiddenUntil: "infinity" });
    off();
  });

  // Circles not joined (owner, 2026-11-27): how many have today's question,
  // and the IST day the bubble was last opened, which clears that alert.
  it("keeps the waiting count and the day the circles were opened", () => {
    let calls = 0;
    const off = subscribeRoomsState(() => calls++);
    saveRoomsState({ waiting: 2 });
    expect(calls).toBe(1);
    saveRoomsState({ waiting: 2 });
    expect(calls).toBe(1);
    markCirclesSeen("2026-11-27");
    expect(calls).toBe(2);
    markCirclesSeen("2026-11-27");
    expect(calls).toBe(2);
    expect(readRoomsState()).toMatchObject({ waiting: 2, seenDay: "2026-11-27" });
    off();
  });
});
