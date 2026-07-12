import { describe, it, expect } from "vitest";
import {
  shouldShowMobilePrompt,
  cooldownUntil,
  reachedRevealThreshold,
  MOBILE_PROMPT_COOLDOWN_DAYS,
  MOBILE_PROMPT_REVEAL_THRESHOLD,
} from "@/lib/profile/mobilePrompt";

const NOW = 1_700_000_000_000; // fixed epoch ms

describe("shouldShowMobilePrompt", () => {
  it("shows for a signed-in student with no mobile and no active cooldown", () => {
    expect(
      shouldShowMobilePrompt({ signedIn: true, hasMobile: false, dismissedUntil: null, now: NOW })
    ).toBe(true);
  });

  it("never shows to anonymous viewers (no contact identity, SEO surface)", () => {
    expect(
      shouldShowMobilePrompt({ signedIn: false, hasMobile: false, dismissedUntil: null, now: NOW })
    ).toBe(false);
  });

  it("never shows once a mobile is on file (server truth = hard stop)", () => {
    expect(
      shouldShowMobilePrompt({ signedIn: true, hasMobile: true, dismissedUntil: null, now: NOW })
    ).toBe(false);
  });

  it("stays disqualified when hasMobile is unknown-but-true-later — true only disqualifies", () => {
    // null = not yet checked: not disqualified by the static rules (the provider
    // resolves it to a concrete boolean before actually opening).
    expect(
      shouldShowMobilePrompt({ signedIn: true, hasMobile: null, dismissedUntil: null, now: NOW })
    ).toBe(true);
  });

  it("suppresses during an active dismissal cooldown, resumes after it lapses", () => {
    const until = NOW + 1_000;
    expect(
      shouldShowMobilePrompt({ signedIn: true, hasMobile: false, dismissedUntil: until, now: NOW })
    ).toBe(false);
    // exactly at expiry → no longer suppressed
    expect(
      shouldShowMobilePrompt({ signedIn: true, hasMobile: false, dismissedUntil: until, now: until })
    ).toBe(true);
    // well after
    expect(
      shouldShowMobilePrompt({ signedIn: true, hasMobile: false, dismissedUntil: until, now: until + 1 })
    ).toBe(true);
  });
});

describe("cooldownUntil", () => {
  it("returns now + the cooldown window in ms", () => {
    const days = MOBILE_PROMPT_COOLDOWN_DAYS;
    expect(cooldownUntil(NOW)).toBe(NOW + days * 24 * 60 * 60 * 1000);
  });
});

describe("reachedRevealThreshold", () => {
  it("fires exactly once, when the count first reaches the threshold", () => {
    const T = MOBILE_PROMPT_REVEAL_THRESHOLD;
    expect(reachedRevealThreshold(T - 1)).toBe(false);
    expect(reachedRevealThreshold(T)).toBe(true);
    // Above threshold does NOT re-fire — the caller only checks on the increment
    // that lands on T; strictly-greater counts return false so a re-check is inert.
    expect(reachedRevealThreshold(T + 1)).toBe(false);
  });
});
