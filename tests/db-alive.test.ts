import { describe, expect, it } from "vitest";
import { decide, parseState, REMIND_MS, emailFor } from "../scripts/monitor/dbAlive.mjs";

const T0 = "2026-11-22T00:00:00.000Z";
const at = (min: number) => new Date(Date.parse(T0) + min * 60_000).toISOString();

describe("db alive: decide", () => {
  it("stays quiet while up", () => {
    expect(decide({ status: "up", since: T0, lastAlertAt: null }, true, at(5))).toEqual({
      send: null,
      state: { status: "up", since: T0, lastAlertAt: null },
    });
  });

  it("alerts once when it goes down", () => {
    const r = decide({ status: "up", since: T0, lastAlertAt: null }, false, at(5));
    expect(r.send).toBe("down");
    expect(r.state).toEqual({ status: "down", since: at(5), lastAlertAt: at(5) });
  });

  it("first run ever with the database down alerts", () => {
    expect(decide(null, false, at(0)).send).toBe("down");
  });

  it("first run ever with the database up is quiet", () => {
    expect(decide(null, true, at(0))).toEqual({ send: null, state: { status: "up", since: at(0), lastAlertAt: null } });
  });

  it("does not repeat the alert on every run while down", () => {
    const down = { status: "down" as const, since: at(5), lastAlertAt: at(5) };
    expect(decide(down, false, at(10)).send).toBeNull();
    expect(decide(down, false, at(5 + REMIND_MS / 60_000 - 1)).send).toBeNull();
  });

  it("reminds once the reminder gap has passed, keeping when it went down", () => {
    const down = { status: "down" as const, since: at(5), lastAlertAt: at(5) };
    const r = decide(down, false, at(5 + REMIND_MS / 60_000));
    expect(r.send).toBe("still-down");
    expect(r.state).toEqual({ status: "down", since: at(5), lastAlertAt: at(5 + REMIND_MS / 60_000) });
  });

  it("says when it is back", () => {
    const r = decide({ status: "down", since: at(5), lastAlertAt: at(5) }, true, at(65));
    expect(r.send).toBe("recovered");
    expect(r.state).toEqual({ status: "up", since: at(65), lastAlertAt: null });
  });
});

describe("db alive: parseState", () => {
  it("reads a saved state", () => {
    expect(parseState(JSON.stringify({ status: "down", since: T0, lastAlertAt: T0 }))).toEqual({
      status: "down",
      since: T0,
      lastAlertAt: T0,
    });
  });

  it("treats a missing or broken file as no state", () => {
    expect(parseState(null)).toBeNull();
    expect(parseState("")).toBeNull();
    expect(parseState("{not json")).toBeNull();
    expect(parseState(JSON.stringify({ status: "sideways", since: T0 }))).toBeNull();
    expect(parseState(JSON.stringify({ status: "up", since: "yesterday" }))).toBeNull();
  });
});

describe("db alive: emailFor", () => {
  it("down names when it stopped (IST) and links the restart page", () => {
    const e = emailFor("down", { status: "down", since: "2026-11-21T19:15:00.000Z", lastAlertAt: null }, "2026-11-21T19:15:00.000Z", "abc");
    expect(e.subject).toMatch(/not answering/i);
    expect(e.text).toContain("00:45 IST");
    expect(e.text).toContain("https://supabase.com/dashboard/project/abc/settings/general");
    expect(e.text).not.toContain("so far");
  });

  it("a reminder says how long it has been down so far", () => {
    const e = emailFor("still-down", { status: "down", since: T0, lastAlertAt: T0 }, at(125), "abc");
    expect(e.subject).toMatch(/still not answering/i);
    expect(e.text).toContain("2 h 5 min so far");
  });

  it("recovered says how long it was down", () => {
    const e = emailFor(
      "recovered",
      { status: "down", since: "2026-11-21T19:15:00.000Z", lastAlertAt: null },
      "2026-11-22T00:45:00.000Z",
      "abc"
    );
    expect(e.subject).toMatch(/back/i);
    expect(e.text).toContain("5 h 30 min");
  });

  it("a short outage reads in minutes", () => {
    const e = emailFor("recovered", { status: "down", since: T0, lastAlertAt: null }, at(12), "abc");
    expect(e.text).toContain("12 min");
    expect(e.text).not.toContain(" h ");
  });
});
