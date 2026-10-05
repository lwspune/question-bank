/**
 * The projected-score trial (2026-10-05, owner): the card shows a "Reveal"
 * button; tapping it starts the student's free days, ONCE EVER; after them the
 * card is a teaser with the pass button. A pass holder always sees it, and so
 * does everyone while the trial setting is off.
 */
import { describe, it, expect } from "vitest";
import { projectionAccess } from "@/lib/performance/projectionAccess";

const NOW = new Date("2026-10-10T12:00:00.000Z");
const DAY = 86_400_000;
const ago = (days: number) => new Date(NOW.getTime() - days * DAY).toISOString();

describe("projectionAccess", () => {
  it("is open while the trial setting is off", () => {
    expect(projectionAccess({ trialDays: null, hasPass: false, startedAt: null, now: NOW })).toEqual({
      kind: "open",
    });
  });

  it("is open for a pass holder, trial or not", () => {
    expect(projectionAccess({ trialDays: 7, hasPass: true, startedAt: ago(30), now: NOW })).toEqual({
      kind: "open",
    });
  });

  it("offers the reveal before the student has started", () => {
    expect(projectionAccess({ trialDays: 7, hasPass: false, startedAt: null, now: NOW })).toEqual({
      kind: "not_started",
      days: 7,
    });
  });

  it("is in trial with the days left, counted up", () => {
    expect(projectionAccess({ trialDays: 7, hasPass: false, startedAt: ago(0), now: NOW })).toEqual({
      kind: "trial",
      endsAt: new Date(NOW.getTime() + 7 * DAY).toISOString(),
      daysLeft: 7,
    });
    expect(projectionAccess({ trialDays: 7, hasPass: false, startedAt: ago(6.5), now: NOW })).toMatchObject({
      kind: "trial",
      daysLeft: 1,
    });
  });

  it("is expired once the days have passed", () => {
    expect(projectionAccess({ trialDays: 7, hasPass: false, startedAt: ago(7), now: NOW })).toEqual({
      kind: "expired",
    });
    expect(projectionAccess({ trialDays: 7, hasPass: false, startedAt: ago(40), now: NOW })).toEqual({
      kind: "expired",
    });
  });

  it("a zero-day trial is expired the moment it starts, and offers nothing to reveal", () => {
    expect(projectionAccess({ trialDays: 0, hasPass: false, startedAt: null, now: NOW })).toEqual({
      kind: "expired",
    });
  });

  it("measures from the FIRST start, so lengthening the setting extends a running trial", () => {
    expect(projectionAccess({ trialDays: 14, hasPass: false, startedAt: ago(10), now: NOW })).toMatchObject({
      kind: "trial",
      daysLeft: 4,
    });
  });
});
