/**
 * The second chance to save a new account's channel and country (2026-11-16).
 *
 * The save runs once, from a request the browser sends at sign-in. In the ten
 * days to 16 Nov, 22 of ~615 accounts never got it, so /api/me/header (which the
 * header calls straight after a sign-in) saves it when it is still missing.
 * That route runs on every page load of a signed-in person, so it must decide
 * from what it already has, and only for an account made moments ago.
 */
import { describe, expect, it } from "vitest";
import { shouldSaveSignupFacts, SIGNUP_FACTS_WINDOW_MS } from "@/lib/profile/signupFacts";

const created = "2026-11-16T16:34:01.394Z";
const signedIn = "2026-11-16T16:34:01.476Z";
const at = (ms: number) => new Date(Date.parse(created) + ms);

describe("shouldSaveSignupFacts", () => {
  it("saves for a new account with no country yet", () => {
    expect(
      shouldSaveSignupFacts({ createdAt: created, lastSignInAt: signedIn, signupCountry: null, now: at(5_000) })
    ).toBe(true);
  });

  it("does nothing once the country is saved", () => {
    expect(
      shouldSaveSignupFacts({ createdAt: created, lastSignInAt: signedIn, signupCountry: "IN", now: at(5_000) })
    ).toBe(false);
  });

  it("does nothing for an account older than the window", () => {
    expect(
      shouldSaveSignupFacts({
        createdAt: created,
        lastSignInAt: signedIn,
        signupCountry: null,
        now: at(SIGNUP_FACTS_WINDOW_MS + 1),
      })
    ).toBe(false);
  });

  it("does nothing for an older account signing in again", () => {
    expect(
      shouldSaveSignupFacts({
        createdAt: "2026-09-01T10:00:00Z",
        lastSignInAt: signedIn,
        signupCountry: null,
        now: at(5_000),
      })
    ).toBe(false);
  });

  it("does nothing when a timestamp is missing", () => {
    expect(shouldSaveSignupFacts({ createdAt: created, lastSignInAt: null, signupCountry: null, now: at(1) })).toBe(
      false
    );
  });

  it("keeps the window short: 30 minutes", () => {
    expect(SIGNUP_FACTS_WINDOW_MS).toBe(30 * 60 * 1000);
  });
});
