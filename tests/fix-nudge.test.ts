/**
 * The bank's "5 wrong today" line (2026-10-05, owner's call after the drill
 * reach read): every fifth wrong tap in the bank in one IST day tells the
 * student their misses are saved in Fix your mistakes, with a link there. The
 * other four wrong taps look exactly as before. Pure core:
 * src/lib/drill/fixNudge.ts.
 */
import { describe, it, expect } from "vitest";
import {
  FIX_NUDGE_EVERY,
  fixNudgeCrossed,
  pickFixNudge,
  fixNudgeLine,
  fixNudgeLinkText,
} from "@/lib/drill/fixNudge";
import { istDayStartIso } from "@/lib/email/dueNudge";

describe("fixNudgeCrossed", () => {
  it("fires on every fifth wrong of the day, not on the others", () => {
    expect(FIX_NUDGE_EVERY).toBe(5);
    expect(fixNudgeCrossed(3, 4)).toBe(false);
    expect(fixNudgeCrossed(4, 5)).toBe(true);
    expect(fixNudgeCrossed(5, 6)).toBe(false);
    expect(fixNudgeCrossed(9, 10)).toBe(true);
    expect(fixNudgeCrossed(14, 15)).toBe(true);
  });

  it("fires once when one batch jumps past a multiple, and once when it jumps past two", () => {
    expect(fixNudgeCrossed(3, 6)).toBe(true);
    expect(fixNudgeCrossed(4, 11)).toBe(true);
  });

  it("does not fire when nothing new was recorded (a re-tap the dedupe key dropped)", () => {
    expect(fixNudgeCrossed(5, 5)).toBe(false);
    expect(fixNudgeCrossed(0, 0)).toBe(false);
  });

  it("never fires on a count that went down or is nonsense", () => {
    expect(fixNudgeCrossed(6, 4)).toBe(false);
    expect(fixNudgeCrossed(-1, 5)).toBe(false);
    expect(fixNudgeCrossed(Number.NaN, 5)).toBe(false);
  });
});

describe("pickFixNudge", () => {
  it("attaches the line to the LAST wrong pick in the batch, the one the student just made", () => {
    expect(pickFixNudge({ before: 4, after: 6, wrongIds: ["q1", "q2"] })).toEqual({
      questionId: "q2",
      wrongToday: 6,
    });
  });

  it("is null when the count did not cross, or the batch carried no wrong pick", () => {
    expect(pickFixNudge({ before: 2, after: 3, wrongIds: ["q1"] })).toBeNull();
    expect(pickFixNudge({ before: 4, after: 5, wrongIds: [] })).toBeNull();
  });
});

describe("copy", () => {
  it("names the real count of wrong answers today", () => {
    expect(fixNudgeLine(5)).toBe(
      "5 wrong today. Each one is saved in Fix your mistakes and comes back until you get it right."
    );
    expect(fixNudgeLine(10)).toMatch(/^10 wrong today\./);
  });

  it("the link names how many are waiting, singular or plural", () => {
    expect(fixNudgeLinkText(12)).toBe("Fix 12 mistakes");
    expect(fixNudgeLinkText(1)).toBe("Fix 1 mistake");
  });

  it("falls back to the page name when the due count is unknown or zero, never 'Fix 0'", () => {
    expect(fixNudgeLinkText(0)).toBe("Fix your mistakes");
    expect(fixNudgeLinkText(null)).toBe("Fix your mistakes");
  });

  it("carries no em or en dash (the house voice rule)", () => {
    expect(fixNudgeLine(5) + fixNudgeLinkText(3)).not.toMatch(/[–—]/);
  });
});

describe("istDayStartIso", () => {
  it("is midnight in India, as a UTC instant", () => {
    // 10:00 IST on 5 Oct = 04:30 UTC; the IST day began at 18:30 UTC on 4 Oct.
    expect(istDayStartIso(new Date("2026-10-05T04:30:00Z"))).toBe("2026-10-04T18:30:00.000Z");
  });

  it("rolls over at IST midnight, not UTC midnight", () => {
    // 23:59 IST on 4 Oct is still the 4th; 00:01 IST on 5 Oct is the 5th.
    expect(istDayStartIso(new Date("2026-10-04T18:29:00Z"))).toBe("2026-10-03T18:30:00.000Z");
    expect(istDayStartIso(new Date("2026-10-04T18:31:00Z"))).toBe("2026-10-04T18:30:00.000Z");
  });
});

describe("parseFixNudge (the client reading the reply)", () => {
  it("takes a well-formed nudge and tolerates a missing due count", async () => {
    const { parseFixNudge } = await import("@/components/reveal/fixNudgeStore");
    expect(parseFixNudge({ questionId: "q1", wrongToday: 5, due: 12 })).toEqual({ questionId: "q1", wrongToday: 5, due: 12 });
    expect(parseFixNudge({ questionId: "q1", wrongToday: 5, due: null })).toEqual({ questionId: "q1", wrongToday: 5, due: null });
  });

  it("ignores anything else, so a reply without a nudge shows nothing", async () => {
    const { parseFixNudge } = await import("@/components/reveal/fixNudgeStore");
    expect(parseFixNudge(undefined)).toBeNull();
    expect(parseFixNudge({ questionId: 7, wrongToday: 5 })).toBeNull();
    expect(parseFixNudge({ questionId: "q1" })).toBeNull();
  });
});
