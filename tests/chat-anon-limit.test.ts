/**
 * A signed-out visitor may type one question to V; after that, V asks them to
 * sign in (owner, 2026-10-16). The browser carries a cookie once its one
 * question is used.
 */
import { describe, it, expect } from "vitest";
import { ANON_ASKED_COOKIE, anonAskedFromCookieHeader, anonMustSignIn, SIGN_IN_TO_ASK_REPLY } from "@/lib/chat/anonLimit";

describe("anonMustSignIn", () => {
  it("lets a signed-out visitor ask their first question", () => {
    expect(anonMustSignIn({ userId: null, askedBefore: false })).toBe(false);
  });

  it("asks a signed-out visitor who has already asked to sign in", () => {
    expect(anonMustSignIn({ userId: null, askedBefore: true })).toBe(true);
  });

  it("never stops a signed-in student, even on a browser that asked while signed out", () => {
    expect(anonMustSignIn({ userId: "u1", askedBefore: true })).toBe(false);
  });
});

describe("anonAskedFromCookieHeader", () => {
  it("reads the cookie among others", () => {
    expect(anonAskedFromCookieHeader(`a=1; ${ANON_ASKED_COOKIE}=1; b=2`)).toBe(true);
  });

  it("is false with no cookie, or none of ours", () => {
    expect(anonAskedFromCookieHeader(null)).toBe(false);
    expect(anonAskedFromCookieHeader("a=1; b=2")).toBe(false);
    expect(anonAskedFromCookieHeader(`x${ANON_ASKED_COOKIE}=1`)).toBe(false);
  });
});

describe("SIGN_IN_TO_ASK_REPLY", () => {
  it("says signing in is free and has no em dash", () => {
    expect(SIGN_IN_TO_ASK_REPLY.toLowerCase()).toContain("sign in");
    expect(SIGN_IN_TO_ASK_REPLY.toLowerCase()).toContain("free");
    expect(SIGN_IN_TO_ASK_REPLY).not.toContain(String.fromCharCode(0x2014));
  });
});
