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

describe("the checkout-didn't-complete bar (2026-11-12)", () => {
  it("records the bar seen once a day, which is what counts its days", () => {
    const r = parseClientEvent({ kind: "paywall_event", step: "shown", gate: "return", planId: "practice-pass-6m" }, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "paywall_event",
        metadata: { step: "shown", gate: "return" },
        refId: "practice-pass-6m",
        refKind: "plan",
        dedupeKey: "paywall:shown:return:u1:2026-09-27",
      },
    });
  });

  it("records Not now once a day", () => {
    const r = parseClientEvent({ kind: "paywall_event", step: "dismissed", gate: "return", planId: "practice-pass-6m" }, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "paywall_event",
        metadata: { step: "dismissed", gate: "return" },
        refId: "practice-pass-6m",
        refKind: "plan",
        dedupeKey: "paywall:dismissed:return:u1:2026-09-27",
      },
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
  // V's hourly limit sells Premium in place since 2026-11-07 (0226).
  it("accepts V's hourly limit", () => {
    expect(checkoutGate("v_hourly")).toBe("v_hourly");
  });
  // The "checkout didn't complete" bar sells in place since 2026-11-12.
  it("accepts the checkout-didn't-complete bar", () => {
    expect(checkoutGate("return")).toBe("return");
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

// A lesson begun (2026-10-28): the first move through a Learn lesson's slides, by a signed-in
// student. Its address must be a lesson's, so the row names the concept.
describe("parseClientEvent - a Learn lesson begun", () => {
  it("accepts a lesson's address, deduped per lesson per student per IST day", () => {
    const r = parseClientEvent(
      { kind: "surface_viewed", surface: "learn_start", path: "/learn/lesson/matrices/what-is-a-matrix?course=cbse-12-maths" },
      "u1",
      NOW
    );
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "learn_start", path: "/learn/lesson/matrices/what-is-a-matrix" },
        dedupeKey: "view:learn_start:/learn/lesson/matrices/what-is-a-matrix:u1:2026-09-27",
      },
    });
  });

  it("refuses it without an address, or with one that is not a lesson", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "learn_start" }, "u1", NOW).ok).toBe(false);
    for (const path of ["/learn", "/learn/mh-hsc-12-maths/matrices", "/notes/nda-maths/vectors"]) {
      expect(parseClientEvent({ kind: "surface_viewed", surface: "learn_start", path }, "u1", NOW).ok).toBe(false);
    }
  });

  it("records a Learn page read like any reading page", () => {
    const r = parseClientEvent({ kind: "surface_viewed", surface: "learn", path: "/learn/lesson/matrices/what-is-a-matrix" }, "u1", NOW);
    expect(r.ok && r.value.dedupeKey).toBe("view:learn:/learn/lesson/matrices/what-is-a-matrix:u1:2026-09-27");
  });
});

// The /board Revision tab opened (2026-11-03), by a signed-in student. Its
// address must be a /board CHAPTER's, so the row names the sheet read.
describe("parseClientEvent - a board revision sheet opened", () => {
  it("accepts a /board chapter's address, deduped per chapter per student per IST day", () => {
    const r = parseClientEvent(
      { kind: "surface_viewed", surface: "board_revision", path: "/board/mh-hsc-12/physics/rotational-dynamics#x" },
      "u1",
      NOW
    );
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "board_revision", path: "/board/mh-hsc-12/physics/rotational-dynamics" },
        dedupeKey: "view:board_revision:/board/mh-hsc-12/physics/rotational-dynamics:u1:2026-09-27",
      },
    });
  });

  it("refuses it without an address, or with one that is not a /board chapter", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "board_revision" }, "u1", NOW).ok).toBe(false);
    for (const path of ["/board", "/board/mh-hsc-12", "/board/mh-hsc-12/physics", "/notes/nda-maths/vectors"]) {
      expect(parseClientEvent({ kind: "surface_viewed", surface: "board_revision", path }, "u1", NOW).ok).toBe(false);
    }
  });
});

// "See it" opened on an exam twin (2026-11-06, migration 0220's line): whether
// students open the matched past question at all. Names the page it was on, a
// /board chapter or a homework page, once per page per student per IST day.
describe("parseClientEvent - an exam twin opened", () => {
  it("accepts a /board chapter's address", () => {
    const r = parseClientEvent(
      { kind: "surface_viewed", surface: "exam_twin", path: "/board/mh-hsc-12/mathematics/matrices" },
      "u1",
      NOW
    );
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "exam_twin", path: "/board/mh-hsc-12/mathematics/matrices" },
        dedupeKey: "view:exam_twin:/board/mh-hsc-12/mathematics/matrices:u1:2026-09-27",
      },
    });
  });

  it("accepts a homework page's address", () => {
    const r = parseClientEvent(
      { kind: "surface_viewed", surface: "exam_twin", path: "/homework/mh-hsc-12-maths/day/3" },
      "u1",
      NOW
    );
    expect(r.ok && r.value.metadata).toEqual({ surface: "exam_twin", path: "/homework/mh-hsc-12-maths/day/3" });
  });

  it("refuses it without an address, or on any other page", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "exam_twin" }, "u1", NOW).ok).toBe(false);
    for (const path of ["/board/mh-hsc-12", "/notes/nda-maths/vectors", "/browse"]) {
      expect(parseClientEvent({ kind: "surface_viewed", surface: "exam_twin", path }, "u1", NOW).ok).toBe(false);
    }
  });
});

describe("parseClientEvent - the chapter page's Fix line seen (2026-11-07)", () => {
  const CH = "c0ffee00-1b2c-4d3e-9f00-112233445566";

  it("records the chapter and the page, once per chapter per day", () => {
    const r = parseClientEvent({ kind: "surface_viewed", surface: "chapter_fix", chapterId: CH, from: "board_chapter" }, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "chapter_fix", chapterId: CH, from: "board_chapter" },
        dedupeKey: `view:chapter_fix:${CH}:u1:2026-09-27`,
      },
    });
  });

  // V_LEARNING_LOOP.md step 3 (2026-11-10): the line under V's explanation is counted on its own key,
  // so it never uses up a chapter page's view of the same chapter that day (experiment chapter-fix).
  it("counts the line under V's explanation apart from the chapter pages", () => {
    const r = parseClientEvent({ kind: "surface_viewed", surface: "chapter_fix", chapterId: CH, from: "v_chapter" }, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "chapter_fix", chapterId: CH, from: "v_chapter" },
        dedupeKey: `view:chapter_fix:v:${CH}:u1:2026-09-27`,
      },
    });
  });

  it("accepts each page's tag", () => {
    for (const from of ["chapter", "board_chapter", "browse_chapter", "v_chapter"]) {
      expect(parseClientEvent({ kind: "surface_viewed", surface: "chapter_fix", chapterId: CH, from }, "u1", NOW).ok).toBe(true);
    }
  });

  it("refuses a missing or malformed chapter id, or an unknown page", () => {
    for (const bad of [
      { from: "chapter" },
      { chapterId: "not-a-uuid", from: "chapter" },
      { chapterId: `${CH}x`, from: "chapter" },
      { chapterId: CH },
      { chapterId: CH, from: "menu" },
      { chapterId: CH, from: "chapter", path: "/questions/nda/mathematics/matrices" },
    ]) {
      expect(parseClientEvent({ kind: "surface_viewed", surface: "chapter_fix", ...bad }, "u1", NOW).ok, JSON.stringify(bad)).toBe(false);
    }
  });

  it("refuses a chapter id or page tag on any other surface", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "drill", chapterId: CH }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ kind: "surface_viewed", surface: "drill", from: "chapter" }, "u1", NOW).ok).toBe(false);
  });
});

describe("parseClientEvent - Start next seen and tapped (2026-11-09)", () => {
  const CH = "c0ffee00-1b2c-4d3e-9f00-112233445566";

  it("records the card seen with its page, once per page per day", () => {
    const r = parseClientEvent({ kind: "surface_viewed", surface: "start_next", from: "home" }, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "start_next", from: "home" },
        dedupeKey: "view:start_next:home:u1:2026-09-27",
      },
    });
    expect(parseClientEvent({ kind: "surface_viewed", surface: "start_next", from: "map" }, "u1", NOW).ok).toBe(true);
  });

  it("records a tap with its chapter and page, once per chapter per day", () => {
    const r = parseClientEvent({ kind: "surface_viewed", surface: "start_next_tap", chapterId: CH, from: "map" }, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "start_next_tap", chapterId: CH, from: "map" },
        dedupeKey: `view:start_next_tap:${CH}:u1:2026-09-27`,
      },
    });
  });

  it("refuses an unknown page, a chapter on the seen record, or a tap without its chapter", () => {
    for (const bad of [
      { surface: "start_next" },
      { surface: "start_next", from: "board_chapter" },
      { surface: "start_next", from: "home", chapterId: CH },
      { surface: "start_next", from: "home", path: "/me" },
      { surface: "start_next_tap", from: "home" },
      { surface: "start_next_tap", chapterId: "not-a-uuid", from: "home" },
      { surface: "start_next_tap", chapterId: CH },
      { surface: "start_next_tap", chapterId: CH, from: "chapter" },
    ]) {
      expect(parseClientEvent({ kind: "surface_viewed", ...bad }, "u1", NOW).ok, JSON.stringify(bad)).toBe(false);
    }
  });
});

// The stuck offer (2026-11-10, lib/questions/stuckOffer): seen and each button, per question and day.
describe("parseClientEvent - the stuck offer", () => {
  const Q = "c0ffee00-1b2c-4d3e-9f00-112233445566";

  it("records each step with its question, once per question per day", () => {
    for (const action of ["shown", "teach", "easier", "keep", "returned", "try_after"]) {
      expect(parseClientEvent({ kind: "surface_viewed", surface: "stuck_offer", questionId: Q, action }, "u1", NOW)).toEqual({
        ok: true,
        value: {
          kind: "surface_viewed",
          metadata: { surface: "stuck_offer", questionId: Q, action },
          dedupeKey: `view:stuck_offer:${action}:${Q}:u1:2026-09-27`,
        },
      });
    }
  });

  it("refuses an unknown step or a bad question id, and these fields on another surface", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "stuck_offer", questionId: Q, action: "bought" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ kind: "surface_viewed", surface: "stuck_offer", questionId: "x", action: "shown" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ kind: "surface_viewed", surface: "drill", questionId: Q, action: "shown" }, "u1", NOW).ok).toBe(false);
  });
});

// The Review tab's traps panel (2026-11-11, src/app/review/ChapterTraps): seen, Show more, the playbook link.
describe("parseClientEvent - the Review traps panel", () => {
  const CH = "c0ffee00-1b2c-4d3e-9f00-998877665544";

  it("records each step with its chapter, once per chapter per day", () => {
    for (const action of ["shown", "expand", "playbook"]) {
      expect(parseClientEvent({ kind: "surface_viewed", surface: "review_traps", chapterId: CH, action }, "u1", NOW)).toEqual({
        ok: true,
        value: {
          kind: "surface_viewed",
          metadata: { surface: "review_traps", chapterId: CH, action },
          dedupeKey: `view:review_traps:${action}:${CH}:u1:2026-09-27`,
        },
      });
    }
  });

  it("refuses an unknown step or a bad chapter id", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "review_traps", chapterId: CH, action: "teach" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ kind: "surface_viewed", surface: "review_traps", chapterId: "x", action: "shown" }, "u1", NOW).ok).toBe(false);
  });
});

// The repeat line under an answered question (2026-11-12, lib/questions/repeatLine):
// seen and See all, per question, screen and day.
describe("parseClientEvent - the repeat line", () => {
  const RQ = "0b5e55ed-1b2c-4d3e-9f00-112233445566";

  it("records each step with its question and screen, once per question per day", () => {
    for (const action of ["shown", "see_all"]) {
      for (const from of ["card", "drill", "mock_review"]) {
        expect(
          parseClientEvent({ kind: "surface_viewed", surface: "repeat_line", questionId: RQ, action, from }, "u1", NOW)
        ).toEqual({
          ok: true,
          value: {
            kind: "surface_viewed",
            metadata: { surface: "repeat_line", questionId: RQ, action, from },
            dedupeKey: `view:repeat_line:${action}:${from}:${RQ}:u1:2026-09-27`,
          },
        });
      }
    }
  });

  it("refuses an unknown step, screen or question id", () => {
    const ok = { kind: "surface_viewed", surface: "repeat_line", questionId: RQ, action: "shown", from: "card" };
    expect(parseClientEvent({ ...ok, action: "bought" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ ...ok, from: "mock_runner" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ ...ok, questionId: "x" }, "u1", NOW).ok).toBe(false);
  });
});
