import { describe, it, expect } from "vitest";
import {
  INSIGHTS,
  INSIGHT_RECHECK_DAYS,
  isDue,
  lastCheckedOn,
  latestVerdict,
  nextCheckOn,
  sortForReview,
  type Insight,
} from "@/lib/growth/insights";
import { EXPERIMENTS } from "@/lib/growth/registry";

/**
 * The insights log (2026-10-12): what we learn about students, with the
 * evidence, how to re-measure it and every re-check. The page reads it; a new
 * insight or a re-check is a commit, like the experiments next to it.
 */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const base: Insight = {
  id: "x",
  title: "A claim",
  finding: "What we saw.",
  source: "Somewhere",
  confidence: "medium",
  firstSeen: "2026-10-12",
  howToCheck: "Run this.",
  checks: [],
  status: "open",
};

describe("insight dates", () => {
  it("counts from the first sighting until it is re-checked", () => {
    expect(lastCheckedOn(base)).toBe("2026-10-12");
    expect(nextCheckOn(base)).toBe("2026-10-26");
  });

  it("counts from the latest check once there is one", () => {
    const i = { ...base, checks: [{ on: "2026-10-20", verdict: "holds" as const, numbers: "n" }] };
    expect(lastCheckedOn(i)).toBe("2026-10-20");
    expect(nextCheckOn(i)).toBe("2026-11-03");
  });

  it("uses an insight's own interval when it has one", () => {
    expect(nextCheckOn({ ...base, recheckDays: 7 })).toBe("2026-10-19");
  });

  it("defaults to a fortnight", () => {
    expect(INSIGHT_RECHECK_DAYS).toBe(14);
  });
});

describe("isDue", () => {
  it("is due on and after the next check date", () => {
    expect(isDue(base, "2026-10-25")).toBe(false);
    expect(isDue(base, "2026-10-26")).toBe(true);
    expect(isDue(base, "2026-11-30")).toBe(true);
  });

  it("never asks to re-check a retired insight", () => {
    expect(isDue({ ...base, status: "retired" }, "2027-01-01")).toBe(false);
  });
});

describe("latestVerdict", () => {
  it("is null before any re-check", () => {
    expect(latestVerdict(base)).toBeNull();
  });

  it("is the newest check's verdict", () => {
    const i = {
      ...base,
      checks: [
        { on: "2026-10-12", verdict: "holds" as const, numbers: "a" },
        { on: "2026-10-26", verdict: "weaker" as const, numbers: "b" },
      ],
    };
    expect(latestVerdict(i)).toBe("weaker");
  });
});

describe("sortForReview", () => {
  it("puts due insights first (most overdue first), then the rest by next check, retired last", () => {
    const a = { ...base, id: "a", firstSeen: "2026-10-01" }; // due 10-15
    const b = { ...base, id: "b", firstSeen: "2026-09-20" }; // due 10-04
    const c = { ...base, id: "c", firstSeen: "2026-10-12" }; // due 10-26
    const d = { ...base, id: "d", firstSeen: "2026-01-01", status: "retired" as const };
    expect(sortForReview([c, d, a, b], "2026-10-20").map((i) => i.id)).toEqual(["b", "a", "c", "d"]);
  });
});

describe("INSIGHTS data", () => {
  it("has unique ids", () => {
    const ids = INSIGHTS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("dates everything as ISO days, checks oldest first and none before the first sighting", () => {
    for (const i of INSIGHTS) {
      expect(i.firstSeen).toMatch(ISO_DATE);
      let prev = i.firstSeen;
      for (const c of i.checks) {
        expect(c.on, i.id).toMatch(ISO_DATE);
        expect(c.on >= prev, `${i.id}: checks must be oldest first`).toBe(true);
        prev = c.on;
      }
    }
  });

  it("says how to re-measure every insight", () => {
    for (const i of INSIGHTS) {
      expect(i.howToCheck.trim().length, i.id).toBeGreaterThan(20);
      expect(i.source.trim().length, i.id).toBeGreaterThan(0);
    }
  });

  it("links only experiments that exist", () => {
    const known = new Set(EXPERIMENTS.map((e) => e.id));
    for (const i of INSIGHTS) if (i.experimentId) expect(known.has(i.experimentId), i.id).toBe(true);
  });

  it("uses no em or en dashes in what the page shows (house style)", () => {
    for (const i of INSIGHTS) {
      const shown = [i.title, i.finding, i.source, i.howToCheck, i.actedOn ?? "", ...i.checks.map((c) => c.numbers)];
      for (const s of shown) expect(s, i.id).not.toMatch(/[–—]/);
    }
  });
});
