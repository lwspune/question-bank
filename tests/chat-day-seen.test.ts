/**
 * When V shows the "Your day" card and the dot on its button (2026-11-15):
 * the first open of an India day, for a signed-in student with something to
 * show, with the card switched on, and never over an unread reply.
 */
import { describe, it, expect } from "vitest";
import { dayCardDue, istTodayKey } from "@/lib/chat/daySeen";

// Sun 15 Nov 2026, 00:30 IST = 14 Nov 19:00 UTC.
const NOW = new Date("2026-11-14T19:00:00Z");
const ok = { signedIn: true, enabled: true, hasSomething: true, unread: 0, seenDay: "2026-11-14", now: NOW };

describe("istTodayKey", () => {
  it("is the India date, which can be a day ahead of UTC", () => {
    expect(istTodayKey(NOW)).toBe("2026-11-15");
  });
});

describe("dayCardDue", () => {
  it("is due on the first open of a new India day", () => {
    expect(dayCardDue(ok)).toBe(true);
    expect(dayCardDue({ ...ok, seenDay: null })).toBe(true);
  });

  it("is not due again the same day", () => {
    expect(dayCardDue({ ...ok, seenDay: "2026-11-15" })).toBe(false);
  });

  it("needs a signed-in student, the switch on and something to show", () => {
    expect(dayCardDue({ ...ok, signedIn: false })).toBe(false);
    expect(dayCardDue({ ...ok, enabled: false })).toBe(false);
    expect(dayCardDue({ ...ok, hasSomething: false })).toBe(false);
  });

  it("waits while an unread reply is there to read", () => {
    expect(dayCardDue({ ...ok, unread: 1 })).toBe(false);
  });

  it("is never due when the browser could not say what was seen (storage blocked)", () => {
    expect(dayCardDue({ ...ok, seenDay: undefined })).toBe(false);
  });
});
