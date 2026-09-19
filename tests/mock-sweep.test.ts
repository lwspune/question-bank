import { describe, it, expect } from "vitest";
import { planSweep, SWEEP_GRACE_MS, type SweepCandidate } from "@/lib/mocks/sweep";

const NOW = new Date("2026-09-19T12:00:00.000Z");
const ms = (d: string) => new Date(d).toISOString();

function candidate(over: Partial<SweepCandidate> = {}): SweepCandidate {
  return {
    attemptId: "a1",
    userId: "u1",
    startedAt: ms("2026-07-10T16:00:00.000Z"),
    expiresAt: ms("2026-07-10T19:00:00.000Z"),
    ...over,
  };
}

describe("planSweep — which expired attempts get graded", () => {
  it("sweeps an attempt whose timer ran out long ago", () => {
    const plan = planSweep([candidate()], NOW);
    expect(plan.sweep).toHaveLength(1);
    expect(plan.skipped).toHaveLength(0);
    expect(plan.sweep[0].attemptId).toBe("a1");
  });

  it("STAMPS THE SUBMIT AT EXPIRY, NOT AT NOW — the whole point of backdating", () => {
    // A July attempt swept in September must carry a July timestamp: the report
    // email selects on submitted_at >= its cutoff, and the drill's ladder sorts
    // on the activity row's created_at. Stamping `now` would mail 82 students
    // about a test they abandoned in July.
    const plan = planSweep([candidate()], NOW);
    expect(plan.sweep[0].at).toBe(ms("2026-07-10T19:00:00.000Z"));
    expect(plan.sweep[0].at).not.toBe(NOW.toISOString());
  });

  it("leaves an attempt inside the grace window alone", () => {
    const justExpired = new Date(NOW.getTime() - 60_000).toISOString();
    const plan = planSweep([candidate({ expiresAt: justExpired })], NOW);
    expect(plan.sweep).toHaveLength(0);
    expect(plan.skipped[0].reason).toBe("within-grace");
  });

  it("sweeps exactly once the grace window has fully elapsed", () => {
    const atEdge = new Date(NOW.getTime() - SWEEP_GRACE_MS).toISOString();
    const insideEdge = new Date(NOW.getTime() - SWEEP_GRACE_MS + 1).toISOString();
    expect(planSweep([candidate({ expiresAt: atEdge })], NOW).sweep).toHaveLength(1);
    expect(planSweep([candidate({ expiresAt: insideEdge })], NOW).sweep).toHaveLength(0);
  });

  it("never sweeps an attempt whose timer has not expired at all", () => {
    const future = new Date(NOW.getTime() + 3_600_000).toISOString();
    const plan = planSweep([candidate({ expiresAt: future })], NOW);
    expect(plan.sweep).toHaveLength(0);
    expect(plan.skipped[0].reason).toBe("within-grace");
  });

  it("SKIPS rather than guesses when there is no usable expiry", () => {
    // A stamp we invent would be a fabricated fact about when a student stopped.
    for (const bad of [null, "", "not-a-date"]) {
      const plan = planSweep([candidate({ expiresAt: bad })], NOW);
      expect(plan.sweep).toHaveLength(0);
      expect(plan.skipped[0].reason).toBe("no-expiry");
    }
  });

  it("clamps a stamp that would land before the attempt started", () => {
    // Corrupt ordering is not in live data today, but a submit dated before its
    // own start is a fact that cannot be true, and it would sort wrong forever.
    const plan = planSweep(
      [candidate({ startedAt: ms("2026-07-10T20:00:00.000Z") })],
      NOW
    );
    expect(plan.sweep[0].at).toBe(ms("2026-07-10T20:00:00.000Z"));
  });

  it("orders oldest first, so an interrupted run helps the longest-stranded first", () => {
    const plan = planSweep(
      [
        candidate({ attemptId: "new", expiresAt: ms("2026-09-01T10:00:00.000Z") }),
        candidate({ attemptId: "old", expiresAt: ms("2026-07-10T19:00:00.000Z") }),
        candidate({ attemptId: "mid", expiresAt: ms("2026-08-05T09:00:00.000Z") }),
      ],
      NOW
    );
    expect(plan.sweep.map((s) => s.attemptId)).toEqual(["old", "mid", "new"]);
  });

  it("carries the owning user through — the grader needs it and it is never inferred", () => {
    const plan = planSweep([candidate({ userId: "student-7" })], NOW);
    expect(plan.sweep[0].userId).toBe("student-7");
  });

  it("handles an empty pool without inventing work", () => {
    expect(planSweep([], NOW)).toEqual({ sweep: [], skipped: [] });
  });
});
