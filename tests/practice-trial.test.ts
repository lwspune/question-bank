/**
 * The 7-day Practice Pass trial (migration 0273, 2026-11-18): offered on a
 * student's 3rd day at the daily answer limit, shown on at most 3 days at the
 * limit, granted only when the student taps Activate. The database half is in
 * free-save-limit.integration.test.ts (that file owns the settings row).
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  TRIAL_DAYS,
  TRIAL_OFFER_DAYS,
  TRIAL_OFFER_TITLE,
  parseTrialEnded,
  parseTrialOffer,
  trialActiveLine,
  trialEndLabel,
  trialEndedLine,
} from "@/lib/billing/practiceTrial";
import { parseClaim } from "@/lib/questions/claimReveal";

describe("the offer's copy", () => {
  it("uses the owner's words", () => {
    expect(TRIAL_OFFER_TITLE).toBe("You are doing well. Here is your 7-day practice pass.");
  });

  it("writes no em dash in anything a student reads", () => {
    const lines = [
      TRIAL_OFFER_TITLE,
      trialActiveLine("2026-11-25T08:00:00Z"),
      trialEndedLine({ endedAt: "2026-11-25T08:00:00Z", answered: 214 }),
    ];
    for (const l of lines) expect(l).not.toMatch(/—| – | -- /);
  });
});

describe("trialEndLabel: the end date in India time", () => {
  it("names the weekday and date", () => {
    expect(trialEndLabel("2026-11-25T08:00:00Z")).toBe("Wed, 25 Nov");
  });

  it("uses the India day, not UTC's", () => {
    // 20:00 UTC on 24 Nov is 01:30 on 25 Nov in India.
    expect(trialEndLabel("2026-11-24T20:00:00Z")).toBe("Wed, 25 Nov");
  });
});

describe("trialActiveLine", () => {
  it("says until when", () => {
    expect(trialActiveLine("2026-11-25T08:00:00Z")).toBe("Practice pass active until Wed, 25 Nov.");
  });
});

describe("trialEndedLine: the extra line on the wall after the trial", () => {
  it("names the end date and how many questions the student answered", () => {
    expect(trialEndedLine({ endedAt: "2026-11-25T08:00:00Z", answered: 214 })).toBe(
      "Your 7-day practice pass ended on 25 Nov. In it you answered 214 questions."
    );
  });

  it("says 1 question, not 1 questions", () => {
    expect(trialEndedLine({ endedAt: "2026-11-25T08:00:00Z", answered: 1 })).toMatch(/answered 1 question\.$/);
  });

  it("leaves the count out when the student answered nothing", () => {
    expect(trialEndedLine({ endedAt: "2026-11-25T08:00:00Z", answered: 0 })).toBe(
      "Your 7-day practice pass ended on 25 Nov."
    );
  });
});

describe("parsing the server's reply", () => {
  it("reads an offer", () => {
    expect(parseTrialOffer({ days: 7 })).toEqual({ days: 7 });
  });

  it("reads no offer as null, and a malformed one as null", () => {
    expect(parseTrialOffer(null)).toBeNull();
    expect(parseTrialOffer(undefined)).toBeNull();
    expect(parseTrialOffer({ days: "7" })).toBeNull();
    expect(parseTrialOffer({ days: 0 })).toBeNull();
  });

  it("reads an ended trial, and rejects a malformed one", () => {
    expect(parseTrialEnded({ endedAt: "2026-11-25T08:00:00Z", answered: 3 })).toEqual({
      endedAt: "2026-11-25T08:00:00Z",
      answered: 3,
    });
    expect(parseTrialEnded({ endedAt: "not a date", answered: 3 })).toBeNull();
    expect(parseTrialEnded({ endedAt: "2026-11-25T08:00:00Z", answered: -1 })).toBeNull();
    expect(parseTrialEnded(null)).toBeNull();
  });

  it("carries the offer and the ended trial on a refused claim", () => {
    const r = parseClaim({
      allowed: false,
      reason: "limit",
      used: 30,
      limit: 30,
      trialOffer: { days: 7 },
      trialEnded: null,
    });
    expect(r).toMatchObject({ allowed: false, reason: "limit", trialOffer: { days: 7 }, trialEnded: null });
  });

  it("reads a reply from before the trial (no trial keys) as no offer", () => {
    const r = parseClaim({ allowed: false, reason: "limit", used: 30, limit: 30 });
    expect(r).toMatchObject({ trialOffer: null, trialEnded: null });
  });
});

describe("the numbers match the migration", () => {
  const sql = readFileSync(join(process.cwd(), "supabase/migrations/0273_practice_trial.sql"), "utf8");

  it("grants the same number of days the page promises", () => {
    expect(TRIAL_DAYS).toBe(7);
    expect(sql).toContain(`interval '${TRIAL_DAYS} days'`);
  });

  it("shows the offer on the same number of days", () => {
    expect(TRIAL_OFFER_DAYS).toBe(3);
    expect(sql).toMatch(new RegExp(`v_offers >= ${TRIAL_OFFER_DAYS}\\b`));
  });
});
