import { describe, it, expect } from "vitest";
import {
  EXPERIMENTS,
  DECIDED_AGAINST,
  NORTH_STAR_KINDS,
  READINGS,
  checkOn,
} from "@/lib/growth/registry";
import { ACTIVITY_KINDS } from "@/lib/activity/events";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("NORTH_STAR_KINDS", () => {
  it("only names real activity kinds", () => {
    for (const k of NORTH_STAR_KINDS) expect(ACTIVITY_KINDS).toContain(k);
  });

  it("leaves out reach and funnel kinds, which record a visit, not study", () => {
    for (const k of ["surface_viewed", "goal_set", "paywall_event", "email_clicked"]) {
      expect(NORTH_STAR_KINDS).not.toContain(k);
    }
  });

  it("counts practice, mocks and drills", () => {
    for (const k of ["question_practiced", "mock_started", "mock_submitted", "drill_completed"]) {
      expect(NORTH_STAR_KINDS).toContain(k);
    }
  });
});

describe("checkOn", () => {
  it("is 28 days after the day an experiment went live", () => {
    expect(checkOn("2026-10-01")).toBe("2026-10-29");
    expect(checkOn("2026-12-20")).toBe("2027-01-17");
  });
});

describe("EXPERIMENTS", () => {
  it("has unique ids", () => {
    const ids = EXPERIMENTS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("dates every experiment from its merge day", () => {
    for (const e of EXPERIMENTS) expect(e.liveSince).toMatch(ISO_DATE);
  });

  it("gives a decided experiment its decision, and a running one none", () => {
    for (const e of EXPERIMENTS) {
      if (e.status === "decided") expect(e.decision?.length ?? 0).toBeGreaterThan(0);
      else expect(e.decision).toBeUndefined();
    }
  });

  it("states a decision rule for every experiment", () => {
    for (const e of EXPERIMENTS) expect(e.rule.length).toBeGreaterThan(0);
  });

  it("carries each readout the page knows how to compute exactly once", () => {
    const readouts = EXPERIMENTS.map((e) => e.readout).sort();
    expect(readouts).toEqual(["chapter-share", "email-cap", "indexing", "onboarding-arms"]);
  });
});

describe("DECIDED_AGAINST", () => {
  it("records what was turned down, when and why", () => {
    expect(DECIDED_AGAINST.length).toBeGreaterThan(0);
    for (const d of DECIDED_AGAINST) {
      expect(d.on).toMatch(ISO_DATE);
      expect(d.why.length).toBeGreaterThan(0);
    }
  });
});

describe("READINGS", () => {
  it("keeps each metric's entries dated and oldest first", () => {
    for (const metric of Object.values(READINGS)) {
      const dates = metric.entries.map((e) => e.on);
      for (const d of dates) expect(d).toMatch(ISO_DATE);
      expect([...dates].sort()).toEqual(dates);
    }
  });
});
