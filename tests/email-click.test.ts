/**
 * Email click tracking through our own redirect (decided 2026-09-27 over
 * Resend's link rewriting, so the click lands in user_activity beside the
 * student's other acts).
 *
 * The token is minted BEFORE the send — the email_sends row is written after
 * Resend accepts the message, so the row id cannot be in the link.
 */
import { describe, it, expect } from "vitest";
import { newClickToken, clickUrl, resolveClickTarget, CLICK_TOKEN_RE } from "@/lib/email/click";

describe("newClickToken", () => {
  it("is url-safe, long enough to be unguessable, and unique", () => {
    const a = newClickToken();
    const b = newClickToken();
    expect(a).toMatch(CLICK_TOKEN_RE);
    expect(a.length).toBeGreaterThanOrEqual(32);
    expect(a).not.toBe(b);
  });
});

describe("clickUrl", () => {
  it("routes a same-site path through /api/e/<token>", () => {
    expect(clickUrl("tok123", "/drill")).toBe("https://www.pyqvault.com/api/e/tok123?to=%2Fdrill");
    expect(clickUrl("tok123", "/mock/attempt/abc/result")).toContain("to=%2Fmock%2Fattempt%2Fabc%2Fresult");
  });
});

describe("resolveClickTarget", () => {
  it("keeps a same-site path, with its query", () => {
    expect(resolveClickTarget("/drill")).toBe("/drill");
    expect(resolveClickTarget("/mock/nda-2026-i-maths?lang=mr")).toBe("/mock/nda-2026-i-maths?lang=mr");
  });

  it("falls back to / on anything that could leave the site", () => {
    for (const bad of [
      null,
      "",
      "https://evil.example/x",
      "//evil.example/x",
      "/\\evil.example",
      "javascript:alert(1)",
      "drill",
      "/drill\r\nSet-Cookie: x=y",
      "/" + "a".repeat(600),
    ]) {
      expect(resolveClickTarget(bad)).toBe("/");
    }
  });
});
