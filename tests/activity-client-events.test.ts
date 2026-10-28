/**
 * parseClientEvent: what the browser may write to user_activity through
 * POST /api/activity/event. A closed list — a client can name a view or a
 * paywall impression, never a graded act (mock_submitted, answer_correct…),
 * because those carry meaning the server alone can vouch for.
 */
import { describe, it, expect } from "vitest";
import { parseClientEvent, paywallEvent, checkoutGate, checkoutBox, bookCheckoutEvent } from "@/lib/activity/clientEvents";

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
    for (const step of ["checkout_opened", "book_checkout_opened", "verify_failed"]) {
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

// Which download box met the student (2026-10-14). The "teacher" gate is one
// gate on five boxes, and an impression was deduped per gate per day, so a
// student who met it on /browse first was never counted on a past paper. With
// a box, the dedupe key carries it: one impression per box per day.
describe("paywall events — the download box", () => {
  it("records the box on an impression and dedupes per box per day", () => {
    const r = parseClientEvent({ kind: "paywall_event", step: "shown", gate: "teacher", box: "board_paper" }, "u1", NOW);
    expect(r.ok && r.value).toEqual({
      kind: "paywall_event",
      metadata: { step: "shown", gate: "teacher", box: "board_paper" },
      dedupeKey: "paywall:shown:teacher:board_paper:u1:2026-09-27",
    });
  });

  it("records the box on a dismissal", () => {
    const r = parseClientEvent(
      { kind: "paywall_event", step: "checkout_dismissed", gate: "teacher", planId: "mock-pass-6m", box: "homework" },
      "u1",
      NOW
    );
    expect(r.ok && r.value).toMatchObject({ metadata: { step: "checkout_dismissed", gate: "teacher", box: "homework" } });
  });

  it("refuses a box outside the closed list", () => {
    expect(parseClientEvent({ kind: "paywall_event", step: "shown", gate: "teacher", box: "vip" }, "u1", NOW).ok).toBe(
      false
    );
  });

  it("puts the box on the server's checkout_opened", () => {
    expect(paywallEvent("checkout_opened", "teacher", "mock-pass-6m", undefined, "board_paper").metadata).toEqual({
      step: "checkout_opened",
      gate: "teacher",
      box: "board_paper",
    });
  });

  it("reads the box from an order request, ignoring anything unknown", () => {
    expect(checkoutBox("homework")).toBe("homework");
    expect(checkoutBox("vip")).toBeUndefined();
    expect(checkoutBox(undefined)).toBeUndefined();
  });
});

// Which gate a checkout started from (2026-10-04): the download box buys in
// place, so the order route can no longer assume /pricing. Only gates that
// open a checkout are accepted; anything else is /pricing, as before.
describe("bookCheckoutEvent", () => {
  // A book order is its own step, so the pass funnel's checkout_opened counts
  // (growth readings, /dashboard/sales pass orders) never include a book.
  it("records a book order on the store gate, the book as its ref", () => {
    expect(bookCheckoutEvent("cbse-12-maths-papers")).toEqual({
      kind: "paywall_event",
      refId: "cbse-12-maths-papers",
      refKind: "ebook",
      metadata: { step: "book_checkout_opened", gate: "store" },
    });
  });
});

describe("checkoutGate", () => {
  it("accepts the download gate", () => {
    expect(checkoutGate("teacher")).toBe("teacher");
  });
  // The reveal wall sells in place since 2026-10-25, so its sales are its own.
  it("accepts the reveal wall", () => {
    expect(checkoutGate("reveals")).toBe("reveals");
  });
  it("defaults to pricing for a missing or unknown value", () => {
    expect(checkoutGate(undefined)).toBe("pricing");
    expect(checkoutGate("mock_limit")).toBe("pricing");
    expect(checkoutGate(42)).toBe("pricing");
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


// Per-chapter handout counts (2026-10-16). A budget phone froze on the
// maths-heavy handouts, but the handout row said neither WHICH chapter opened
// nor that anyone had asked for one, so a failed download left no trace. The
// tap (handout_request) and the open (handout) now carry the chapter, deduped
// per chapter per day, so taps minus opens per chapter is the failure count.
describe("parseClientEvent - handout chapter", () => {
  it("records the chapter on a handout open and dedupes per chapter per day", () => {
    const r = parseClientEvent(
      { kind: "surface_viewed", surface: "handout", browser: "standard", chapter: "mht-cet-maths/indefinite-integration" },
      "u1",
      NOW
    );
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "handout", browser: "standard", chapter: "mht-cet-maths/indefinite-integration" },
        dedupeKey: "view:handout:mht-cet-maths/indefinite-integration:u1:2026-09-27",
      },
    });
  });

  it("accepts the tap on Download as PDF as handout_request", () => {
    const r = parseClientEvent(
      { kind: "surface_viewed", surface: "handout_request", chapter: "nda-maths/vectors" },
      "u1",
      NOW
    );
    expect(r.ok && r.value.metadata).toEqual({ surface: "handout_request", chapter: "nda-maths/vectors" });
    expect(r.ok && r.value.dedupeKey).toBe("view:handout_request:nda-maths/vectors:u1:2026-09-27");
  });

  it("refuses a chapter that is not subject/chapter slugs", () => {
    for (const chapter of ["Vectors", "nda-maths", "a/b/c", "../x/y", "nda-maths/" + "x".repeat(200), 7]) {
      expect(parseClientEvent({ kind: "surface_viewed", surface: "handout", chapter }, "u1", NOW).ok).toBe(false);
    }
  });

  it("refuses a chapter on any other surface", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "drill", chapter: "nda-maths/vectors" }, "u1", NOW).ok).toBe(false);
  });
});

// Reading pages (2026-10-19): one row per student, page and IST day, the address checked against its surface.
describe("parseClientEvent — reading pages", () => {
  it("accepts a reading view with its page address, deduped per page per day", () => {
    const r = parseClientEvent(
      { kind: "surface_viewed", surface: "notes", path: "/notes/nda-maths/statistics/central-tendency" },
      "u1",
      NOW
    );
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "notes", path: "/notes/nda-maths/statistics/central-tendency" },
        dedupeKey: "view:notes:/notes/nda-maths/statistics/central-tendency:u1:2026-09-27",
      },
    });
  });

  it("refuses a reading view without an address, or with one from another surface", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "notes" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ kind: "surface_viewed", surface: "notes", path: "/board/mh-hsc-12" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ kind: "surface_viewed", surface: "guide", path: "/guide/<script>" }, "u1", NOW).ok).toBe(false);
  });

  it("refuses an address on a surface that is not a reading page", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "drill", path: "/drill" }, "u1", NOW).ok).toBe(false);
  });

  it("stores the cleaned address, so a query string cannot split one page into many rows", () => {
    const r = parseClientEvent({ kind: "surface_viewed", surface: "guide", path: "/guide/nda-physics/?utm=x" }, "u1", NOW);
    expect(r.ok && r.value.metadata).toEqual({ surface: "guide", path: "/guide/nda-physics" });
  });
});
