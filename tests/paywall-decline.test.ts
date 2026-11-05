/**
 * "Not buying today? Tell us why": the one-tap reason a student gives when a
 * pass offer does not sell (2026-11-05). The browser may record it as a
 * paywall_event with step "declined"; only the closed list of reasons is
 * accepted, once per student per offer per IST day. /dashboard/sales reads
 * the answers back through summariseDeclines.
 */
import { describe, it, expect } from "vitest";
import { parseClientEvent } from "@/lib/activity/clientEvents";
import {
  DECLINE_REASONS,
  DECLINE_REASON_LABELS,
  declineGroupOf,
  reasonsOffered,
  summariseDeclines,
  type DeclineRow,
} from "@/lib/billing/declineReasons";

const NOW = new Date("2026-11-05T03:00:00Z"); // 08:30 IST, 5 Nov

describe("parseClientEvent: a declined offer", () => {
  it("records the reason on the answer limit, once per student per day", () => {
    const r = parseClientEvent(
      { kind: "paywall_event", step: "declined", gate: "reveals", reason: "too_expensive" },
      "u1",
      NOW
    );
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "paywall_event",
        metadata: { step: "declined", gate: "reveals", reason: "too_expensive", afterCheckout: false },
        dedupeKey: "paywall:declined:reveals:u1:2026-11-05",
      },
    });
  });

  it("names the download box and whether checkout had been opened", () => {
    const r = parseClientEvent(
      {
        kind: "paywall_event",
        step: "declined",
        gate: "teacher",
        box: "homework",
        planId: "mock-pass-6m",
        reason: "payment_failed",
        afterCheckout: true,
      },
      "u1",
      NOW
    );
    expect(r.ok && r.value).toEqual({
      kind: "paywall_event",
      refId: "mock-pass-6m",
      refKind: "plan",
      metadata: { step: "declined", gate: "teacher", box: "homework", reason: "payment_failed", afterCheckout: true },
      dedupeKey: "paywall:declined:teacher:homework:u1:2026-11-05",
    });
  });

  it("refuses a decline without a reason, or with one outside the list", () => {
    expect(parseClientEvent({ kind: "paywall_event", step: "declined", gate: "reveals" }, "u1", NOW).ok).toBe(false);
    for (const reason of ["", "other", "<script>", 3, null]) {
      expect(
        parseClientEvent({ kind: "paywall_event", step: "declined", gate: "reveals", reason }, "u1", NOW).ok
      ).toBe(false);
    }
  });

  it("accepts 'payment didn't work' only after a checkout was opened", () => {
    expect(
      parseClientEvent(
        { kind: "paywall_event", step: "declined", gate: "reveals", reason: "payment_failed" },
        "u1",
        NOW
      ).ok
    ).toBe(false);
  });

  it("refuses an afterCheckout that is not a boolean", () => {
    expect(
      parseClientEvent(
        { kind: "paywall_event", step: "declined", gate: "reveals", reason: "ask_parent", afterCheckout: "yes" },
        "u1",
        NOW
      ).ok
    ).toBe(false);
  });

  it("refuses a reason on any other step", () => {
    expect(
      parseClientEvent({ kind: "paywall_event", step: "shown", gate: "reveals", reason: "too_expensive" }, "u1", NOW).ok
    ).toBe(false);
  });
});

describe("the reasons offered", () => {
  it("are four before a checkout, five after one, every one labelled", () => {
    expect(reasonsOffered(false)).toEqual(["too_expensive", "ask_parent", "free_enough", "not_worth_it"]);
    expect(reasonsOffered(true)).toEqual([...reasonsOffered(false), "payment_failed"]);
    for (const r of DECLINE_REASONS) expect(DECLINE_REASON_LABELS[r].length).toBeGreaterThan(0);
  });
});

describe("declineGroupOf", () => {
  it("puts school and senior students together as Class 9-12, apart from graduates", () => {
    expect(declineGroupOf("school")).toBe("class_9_12");
    expect(declineGroupOf("senior")).toBe("class_9_12");
    expect(declineGroupOf("graduate")).toBe("graduate");
    expect(declineGroupOf(null)).toBe("unknown");
  });
});

describe("summariseDeclines", () => {
  const row = (over: Partial<DeclineRow>): DeclineRow => ({
    userId: "u1",
    reason: "too_expensive",
    gate: "reveals",
    afterCheckout: false,
    tier: "senior",
    ...over,
  });

  it("is empty with no answers, every reason still listed at zero", () => {
    const s = summariseDeclines([]);
    expect(s.answers).toBe(0);
    expect(s.students).toBe(0);
    expect(s.reasons.map((r) => r.reason)).toEqual([...DECLINE_REASONS]);
    expect(s.reasons.every((r) => r.total === 0)).toBe(true);
  });

  it("counts answers per reason, by student group and by offer", () => {
    const s = summariseDeclines([
      row({ userId: "a", reason: "too_expensive", tier: "senior", gate: "reveals" }),
      row({ userId: "b", reason: "too_expensive", tier: "graduate", gate: "teacher" }),
      row({ userId: "c", reason: "ask_parent", tier: "school", gate: "reveals" }),
      row({ userId: "a", reason: "too_expensive", tier: "senior", gate: "teacher" }),
      row({ userId: "d", reason: "payment_failed", tier: null, gate: "reveals", afterCheckout: true }),
    ]);
    expect(s.answers).toBe(5);
    expect(s.students).toBe(4);
    expect(s.afterCheckout).toBe(1);
    expect(s.groups).toEqual({ class_9_12: 3, graduate: 1, unknown: 1 });

    const expensive = s.reasons.find((r) => r.reason === "too_expensive")!;
    expect(expensive.total).toBe(3);
    expect(expensive.byGroup).toEqual({ class_9_12: 2, graduate: 1, unknown: 0 });
    expect(expensive.byOffer).toEqual({ answers: 1, downloads: 2, other: 0 });

    const parent = s.reasons.find((r) => r.reason === "ask_parent")!;
    expect(parent.byGroup.class_9_12).toBe(1);
  });

  it("files gates other than the answer limit and the download box under 'other'", () => {
    const s = summariseDeclines([row({ gate: "pricing" })]);
    expect(s.reasons.find((r) => r.reason === "too_expensive")!.byOffer).toEqual({ answers: 0, downloads: 0, other: 1 });
  });
});
