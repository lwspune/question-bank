/**
 * parseClientEvent: what the browser may write to user_activity through
 * POST /api/activity/event. A closed list — a client can name a view or a
 * paywall impression, never a graded act (mock_submitted, answer_correct…),
 * because those carry meaning the server alone can vouch for.
 */
import { describe, it, expect } from "vitest";
import { parseClientEvent, paywallEvent } from "@/lib/activity/clientEvents";

const NOW = new Date("2026-09-27T03:00:00Z");

describe("parseClientEvent", () => {
  it("accepts a surface view and stamps the per-day dedupe key", () => {
    const r = parseClientEvent({ kind: "surface_viewed", surface: "start" }, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: { kind: "surface_viewed", metadata: { surface: "start" }, dedupeKey: "view:start:u1:2026-09-27" },
    });
  });

  it("accepts a paywall impression or dismissal, with the gate and an optional plan", () => {
    const shown = parseClientEvent({ kind: "paywall_event", step: "shown", gate: "teacher" }, "u1", NOW);
    expect(shown.ok && shown.value).toEqual({
      kind: "paywall_event",
      metadata: { step: "shown", gate: "teacher" },
      dedupeKey: "paywall:shown:teacher:u1:2026-09-27",
    });
    const dismissed = parseClientEvent(
      { kind: "paywall_event", step: "checkout_dismissed", gate: "pricing", planId: "mock-pass-6m" },
      "u1",
      NOW
    );
    expect(dismissed.ok && dismissed.value).toEqual({
      kind: "paywall_event",
      refId: "mock-pass-6m",
      refKind: "plan",
      metadata: { step: "checkout_dismissed", gate: "pricing" },
    });
  });

  it("refuses every kind the server must vouch for", () => {
    for (const kind of ["mock_submitted", "answer_correct", "drill_completed", "email_clicked", "goal_set"]) {
      expect(parseClientEvent({ kind, surface: "start" }, "u1", NOW).ok).toBe(false);
    }
  });

  it("refuses server-only paywall steps from the client", () => {
    for (const step of ["checkout_opened", "verify_failed"]) {
      expect(parseClientEvent({ kind: "paywall_event", step, gate: "pricing" }, "u1", NOW).ok).toBe(false);
    }
  });

  it("refuses an unknown surface, gate, or an oversized plan id", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "blog" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ kind: "paywall_event", step: "shown", gate: "vip" }, "u1", NOW).ok).toBe(false);
    expect(
      parseClientEvent({ kind: "paywall_event", step: "shown", gate: "pricing", planId: "x".repeat(65) }, "u1", NOW).ok
    ).toBe(false);
    expect(parseClientEvent(null, "u1", NOW).ok).toBe(false);
  });
});

describe("paywallEvent (server builder)", () => {
  it("builds the server-only steps without a dedupe key", () => {
    expect(paywallEvent("checkout_opened", "pricing", "teacher-pass-1y")).toEqual({
      kind: "paywall_event",
      refId: "teacher-pass-1y",
      refKind: "plan",
      metadata: { step: "checkout_opened", gate: "pricing" },
    });
  });
  it("dedupes a server-side impression per day when asked", () => {
    expect(paywallEvent("shown", "mock_limit", undefined, { userId: "u1", now: NOW }).dedupeKey).toBe(
      "paywall:shown:mock_limit:u1:2026-09-27"
    );
  });
});

// The notes handout (2026-10-02): nothing recorded whether anyone opened it,
// so its value could not be judged. One row per student per day, with which
// kind of browser opened it, because in-app browsers cannot save the PDF.
describe("parseClientEvent — handout surface", () => {
  it("accepts a handout view with its browser kind", () => {
    const r = parseClientEvent({ kind: "surface_viewed", surface: "handout", browser: "inapp" }, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "handout", browser: "inapp" },
        dedupeKey: "view:handout:u1:2026-09-27",
      },
    });
  });

  it("accepts a handout view without a browser kind", () => {
    const r = parseClientEvent({ kind: "surface_viewed", surface: "handout" }, "u1", NOW);
    expect(r.ok && r.value.metadata).toEqual({ surface: "handout" });
  });

  it("refuses a browser kind outside the closed list", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "handout", browser: "netscape" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ kind: "surface_viewed", surface: "handout", browser: 1 }, "u1", NOW).ok).toBe(false);
  });
});

