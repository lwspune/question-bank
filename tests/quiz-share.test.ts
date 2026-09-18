/**
 * The quiz results share link.
 *
 * WHY THIS EXISTS: the results screen has shared a bare
 * `${window.location.origin}/quiz/${slug}` since 2026-06-09 — no campaign tags.
 * WhatsApp strips the referrer, so parseAcquisition (0106) falls through to its
 * `if (!refHost)` branch and files every one of those arrivals as
 * `source: "direct"`. They were never merely unmeasured; they were
 * MISATTRIBUTED, and every signup the quiz loop ever produced was credited to
 * nobody. Tagging is what separates the two.
 *
 * Mirrors lib/mocks/share.ts (0109) deliberately rather than importing it: that
 * module shipped yesterday and is not being reworked here. The shared part is a
 * host plus three query params.
 */
import { describe, it, expect } from "vitest";
import { buildQuizShareUrl, QUIZ_SHARE_CAMPAIGN, QUIZ_SHARE_CHANNELS } from "@/lib/quiz/share";

describe("buildQuizShareUrl", () => {
  it("uses the canonical host, never the runtime origin", () => {
    // window.location.origin would emit an apex or preview-deploy URL depending
    // on where the student happened to be.
    expect(buildQuizShareUrl("nda-maths-01", "share")).toMatch(
      /^https:\/\/www\.pyqvault\.com\/quiz\/nda-maths-01\?/
    );
  });

  it("carries the full utm triple, which is the entire point", () => {
    const u = new URL(buildQuizShareUrl("nda-maths-01", "share"));
    expect(u.searchParams.get("utm_source")).toBe("share");
    expect(u.searchParams.get("utm_medium")).toBe("share");
    expect(u.searchParams.get("utm_campaign")).toBe(QUIZ_SHARE_CAMPAIGN);
  });

  it("names the channel honestly — the OS sheet is not WhatsApp", () => {
    // navigator.share() never reports which app the user chose, so claiming
    // 'whatsapp' would be inventing attribution.
    expect(QUIZ_SHARE_CHANNELS).not.toContain("whatsapp");
    const copy = new URL(buildQuizShareUrl("s", "copy"));
    expect(copy.searchParams.get("utm_source")).toBe("copy");
  });

  it("uses ONE campaign across channels, so the loop reads as one loop", () => {
    for (const ch of QUIZ_SHARE_CHANNELS) {
      expect(new URL(buildQuizShareUrl("s", ch)).searchParams.get("utm_campaign")).toBe(
        QUIZ_SHARE_CAMPAIGN
      );
    }
  });

  it("is distinguishable from the mock loop's campaign", () => {
    expect(QUIZ_SHARE_CAMPAIGN).not.toBe("mock-result");
  });

  it("percent-encodes a slug so it cannot inject query params", () => {
    const u = buildQuizShareUrl("a b/c?d", "share");
    expect(u).toContain("/quiz/a%20b%2Fc%3Fd?");
    expect(new URL(u).searchParams.get("utm_campaign")).toBe(QUIZ_SHARE_CAMPAIGN);
  });
});
