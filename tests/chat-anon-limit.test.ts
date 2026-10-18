/**
 * A signed-out visitor may type one question to V; after that, V asks them to
 * sign in (owner, 2026-10-16). The browser carries a cookie once its one
 * question is used.
 */
import { describe, it, expect } from "vitest";
import {
  ANON_ASKED_COOKIE,
  ANON_FREE_COOKIE,
  ANON_FREE_REPLIES_MAX,
  anonAskedFromCookieHeader,
  anonFreeRepliesFromCookieHeader,
  anonMustSignIn,
  anonReplyUsesQuestion,
  SIGN_IN_TO_ASK_REPLY,
} from "@/lib/chat/anonLimit";

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

// 2026-10-18: a visitor's one question went on "Hii". A reply that only asks back is free.
describe("anonReplyUsesQuestion", () => {
  const askBack = { source: "ai" as const, reply: "Hi! Which exam or chapter are you studying for?", links: [], freeSoFar: 0 };

  it("does not use the question when V only asks back and links nothing", () => {
    expect(anonReplyUsesQuestion(askBack)).toBe(false);
  });

  it("uses it once V links a page, even if it also asks something", () => {
    expect(anonReplyUsesQuestion({ ...askBack, reply: "Atoms is at /questions/cbse-12/physics/atoms. Want more?", links: ["/questions/cbse-12/physics/atoms"] })).toBe(true);
  });

  it("uses it for an answer that asks nothing back", () => {
    expect(anonReplyUsesQuestion({ ...askBack, reply: "PYQ Vault is a website you open in your browser." })).toBe(true);
  });

  it("uses it for any reply that was not the AI's (the fixed reply when the AI is off or failed)", () => {
    expect(anonReplyUsesQuestion({ ...askBack, source: "fallback" })).toBe(true);
    expect(anonReplyUsesQuestion({ ...askBack, source: "ai_failed" })).toBe(true);
  });

  it("stops being free after the most free replies, so nobody chats on forever without signing in", () => {
    expect(anonReplyUsesQuestion({ ...askBack, freeSoFar: ANON_FREE_REPLIES_MAX - 1 })).toBe(false);
    expect(anonReplyUsesQuestion({ ...askBack, freeSoFar: ANON_FREE_REPLIES_MAX })).toBe(true);
  });
});

describe("anonFreeRepliesFromCookieHeader", () => {
  it("reads the count of free replies so far", () => {
    expect(anonFreeRepliesFromCookieHeader(`a=1; ${ANON_FREE_COOKIE}=2`)).toBe(2);
  });

  it("is 0 with no cookie or a value that is not a small count", () => {
    expect(anonFreeRepliesFromCookieHeader(null)).toBe(0);
    expect(anonFreeRepliesFromCookieHeader(`${ANON_FREE_COOKIE}=abc`)).toBe(0);
    expect(anonFreeRepliesFromCookieHeader(`${ANON_FREE_COOKIE}=-4`)).toBe(0);
  });

  it("caps a planted large count at the most free replies", () => {
    expect(anonFreeRepliesFromCookieHeader(`${ANON_FREE_COOKIE}=999`)).toBe(ANON_FREE_REPLIES_MAX);
  });
});
