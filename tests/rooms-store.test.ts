/**
 * lib/rooms/store: the rooms state shared by the bubble, the account menu
 * entry and the Account card. Saving the same values must NOT notify
 * listeners: a listener that re-renders and saves again would otherwise loop
 * (found 2026-11-25: an open rooms window re-fetched GET /api/rooms about
 * twice a second, because each save re-rendered the bubble, whose new
 * callback re-ran the window's fetch).
 */
import { describe, it, expect } from "vitest";
import { saveRoomsState, subscribeRoomsState, readRoomsState } from "@/lib/rooms/store";

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
});
