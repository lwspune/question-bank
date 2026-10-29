/**
 * Pass perks quote the free limits through placeholders ("free: {reveals} a
 * day"), filled from paywall_settings at read time, so a limit edited at
 * /dashboard/pricing can never leave /pricing quoting the old number. That is
 * what happened on 2026-10-11: the answer limit went 50 -> 30 and the perk
 * still said 50, while the projected-score perk said 7 days against a 30-day
 * setting.
 */
import { describe, it, expect } from "vitest";
import { fillPerks, unknownPerkPlaceholders, type FreeLimits } from "@/lib/billing/perkLimits";
import { validatePlan, type PlanInput } from "@/lib/billing/plans";
import { SCOPE_MOCKS } from "@/lib/entitlements/access";

const limits = (over: Partial<FreeLimits> = {}): FreeLimits => ({
  reveals: 30,
  drill: 15,
  saves: 100,
  mocks: 3,
  chapterTests: 5,
  projectionDays: 7,
  papersPerDay: 5,
  ...over,
});

describe("fillPerks", () => {
  it("fills each placeholder from the live limits", () => {
    expect(
      fillPerks(
        [
          "Unlimited answers in the question bank (free: {reveals} a day)",
          "All chapter tests and full mock tests (free: {chapterTests} and {mocks})",
          "Your projected score (free: {projectionDays} days)",
        ],
        limits()
      )
    ).toEqual([
      "Unlimited answers in the question bank (free: 30 a day)",
      "All chapter tests and full mock tests (free: 5 and 3)",
      "Your projected score (free: 7 days)",
    ]);
  });

  it("leaves a perk without placeholders exactly as typed", () => {
    expect(fillPerks(["Question Paper + Answer Key as PDF downloads"], limits())).toEqual([
      "Question Paper + Answer Key as PDF downloads",
    ]);
  });

  it("hides a perk whose limit is switched off: everyone has that for free", () => {
    expect(
      fillPerks(["Unlimited answers (free: {reveals} a day)", "Unlimited saves (free: {saves})"], limits({ reveals: null }))
    ).toEqual(["Unlimited saves (free: 100)"]);
  });

  it("hides a perk if ANY of its limits is off, rather than printing half of it", () => {
    expect(fillPerks(["Tests (free: {chapterTests} and {mocks})"], limits({ mocks: null }))).toEqual([]);
  });

  it("never shows a raw placeholder: an unreadable limit row hides every perk that quotes one", () => {
    expect(fillPerks(["Unlimited answers (free: {reveals} a day)", "PDF downloads"], null)).toEqual(["PDF downloads"]);
  });

  it("hides a perk carrying an unknown placeholder (validation should have stopped it)", () => {
    expect(fillPerks(["Unlimited answers (free: {revealz} a day)"], limits())).toEqual([]);
  });

  it("keeps zero, which is a real limit, and formats large numbers the Indian way", () => {
    expect(fillPerks(["Saves (free: {saves})", "Answers (free: {reveals})"], limits({ saves: 0, reveals: 100000 }))).toEqual([
      "Saves (free: 0)",
      "Answers (free: 1,00,000)",
    ]);
  });
});

describe("unknownPerkPlaceholders", () => {
  it("names the placeholders it does not know", () => {
    expect(unknownPerkPlaceholders("free: {reveals} a day, {revealz}, {Drill}")).toEqual(["revealz", "Drill"]);
    expect(unknownPerkPlaceholders("no placeholders here")).toEqual([]);
  });
});

describe("validatePlan refuses a perk with an unknown placeholder", () => {
  const plan = (perks: string[]): PlanInput => ({
    id: "mock-pass-6m",
    label: "Premium Pass",
    blurb: "x",
    perks,
    urlKey: "mocks",
    amountPaise: 9900,
    currency: "INR",
    site: "pyqvault",
    durationDays: 182,
    scope: SCOPE_MOCKS,
    sortOrder: 1,
  });

  it("accepts the known placeholders", () => {
    expect(validatePlan(plan(["Unlimited answers (free: {reveals} a day)", "Projected score (free: {projectionDays} days)"]))).toEqual({
      ok: true,
    });
  });

  it("names the typo so the admin can fix it", () => {
    const r = validatePlan(plan(["Unlimited answers (free: {revealz} a day)"]));
    expect(r).toMatchObject({ ok: false, field: "perks" });
    expect(r.ok === false && r.message).toContain("{revealz}");
  });
});
