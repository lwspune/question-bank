/**
 * V's settings as /dashboard/chat edits them (migration 0158): the AI switch,
 * messages per hour per person, and AI answers per day for the whole site.
 */
import { describe, it, expect } from "vitest";
import {
  DEFAULT_CHAT_SETTINGS,
  parseChatSettingsInput,
  personBucket,
  istDayStart,
} from "@/lib/chat/settings";

describe("parseChatSettingsInput", () => {
  it("accepts a valid set", () => {
    expect(parseChatSettingsInput({ aiEnabled: true, perPersonPerHour: 20, aiAnswersPerDay: 500 })).toEqual({
      ok: true,
      settings: { aiEnabled: true, perPersonPerHour: 20, aiAnswersPerDay: 500 },
    });
  });

  it("refuses a missing switch", () => {
    expect(parseChatSettingsInput({ perPersonPerHour: 20, aiAnswersPerDay: 500 }).ok).toBe(false);
  });

  it("refuses an hourly limit under 1 or over 200", () => {
    expect(parseChatSettingsInput({ aiEnabled: true, perPersonPerHour: 0, aiAnswersPerDay: 500 }).ok).toBe(false);
    expect(parseChatSettingsInput({ aiEnabled: true, perPersonPerHour: 201, aiAnswersPerDay: 500 }).ok).toBe(false);
  });

  it("refuses a daily cap under 0 or over 5000, and a fraction", () => {
    expect(parseChatSettingsInput({ aiEnabled: true, perPersonPerHour: 15, aiAnswersPerDay: -1 }).ok).toBe(false);
    expect(parseChatSettingsInput({ aiEnabled: true, perPersonPerHour: 15, aiAnswersPerDay: 5001 }).ok).toBe(false);
    expect(parseChatSettingsInput({ aiEnabled: true, perPersonPerHour: 15.5, aiAnswersPerDay: 300 }).ok).toBe(false);
  });

  it("accepts a daily cap of 0 (AI on, but no answers today)", () => {
    expect(parseChatSettingsInput({ aiEnabled: true, perPersonPerHour: 15, aiAnswersPerDay: 0 }).ok).toBe(true);
  });
});

describe("defaults", () => {
  it("ship with the AI off, 15 an hour, 300 a day", () => {
    expect(DEFAULT_CHAT_SETTINGS).toEqual({ aiEnabled: false, perPersonPerHour: 15, aiAnswersPerDay: 300 });
  });
});

describe("personBucket", () => {
  it("counts a signed-in student by account, so one Wi-Fi is not one person", () => {
    expect(personBucket({ userId: "u1", ip: "1.2.3.4" })).toBe("chat-typed:user:u1");
  });

  it("counts a signed-out visitor by connection", () => {
    expect(personBucket({ userId: null, ip: "1.2.3.4" })).toBe("chat-typed:anon:1.2.3.4");
  });
});

describe("istDayStart", () => {
  it("is midnight in India, written in UTC", () => {
    // 2026-10-15 17:10 IST = 11:40 UTC -> the day began 2026-10-14 18:30 UTC.
    expect(istDayStart(new Date("2026-10-15T11:40:00Z")).toISOString()).toBe("2026-10-14T18:30:00.000Z");
  });

  it("rolls over at 00:00 IST, not at 00:00 UTC", () => {
    // 2026-10-15 00:10 IST = 2026-10-14 18:40 UTC.
    expect(istDayStart(new Date("2026-10-14T18:40:00Z")).toISOString()).toBe("2026-10-14T18:30:00.000Z");
    // 2026-10-14 23:50 IST = 18:20 UTC belongs to the day before.
    expect(istDayStart(new Date("2026-10-14T18:20:00Z")).toISOString()).toBe("2026-10-13T18:30:00.000Z");
  });
});
