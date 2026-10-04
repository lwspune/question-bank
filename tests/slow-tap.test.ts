/**
 * The slow-tap measurement (2026-10-04, DEAD_TAPS.md). Clarity sees taps that
 * change nothing but records no timing, so a tap taking over 200 ms to paint
 * reports which kind of element it was and where the time went:
 *   waiting  — the phone was busy before our handler ran (page weight)
 *   working  — our handler and the redraw it caused
 *   painting — getting the result on screen
 * Two props, because Vercel keeps only two.
 */
import { describe, it, expect } from "vitest";
import { classifyTap, tapPhase, durationBucket, slowTapProps, SLOW_TAP_MS } from "@/lib/analytics/slowTap";

const base = { text: "", ariaLabel: null, inHeader: false, isOption: false };

describe("classifyTap", () => {
  it.each(["Show model answer", "Show solution", "Show answer", "Show options", "Hide answer", "Hide solution"])(
    "calls %s a reveal",
    (text) => expect(classifyTap({ ...base, text })).toBe("reveal")
  );
  it("calls the card's expand line an expand, by its label", () => {
    expect(classifyTap({ ...base, text: "#12 → Physics → AC Circuits", ariaLabel: "Expand question" })).toBe("expand");
    expect(classifyTap({ ...base, ariaLabel: "Collapse question" })).toBe("expand");
  });
  it("calls an option button an option", () => {
    expect(classifyTap({ ...base, text: "A. 1/2", isOption: true })).toBe("option");
  });
  it("calls anything in the site header nav", () => {
    expect(classifyTap({ ...base, text: "Notes", inHeader: true })).toBe("nav");
  });
  it("calls everything else other", () => {
    expect(classifyTap({ ...base, text: "Download" })).toBe("other");
  });
});

describe("tapPhase", () => {
  it("is waiting when the handler started late", () => {
    expect(tapPhase({ startTime: 0, processingStart: 400, processingEnd: 420, duration: 480 })).toBe("waiting");
  });
  it("is working when the handler ran long", () => {
    expect(tapPhase({ startTime: 0, processingStart: 10, processingEnd: 410, duration: 440 })).toBe("working");
  });
  it("is painting when the frame came late", () => {
    expect(tapPhase({ startTime: 0, processingStart: 10, processingEnd: 30, duration: 500 })).toBe("painting");
  });
});

describe("durationBucket", () => {
  it.each([
    [200, "200-500"],
    [499, "200-500"],
    [500, "500-1000"],
    [1999, "1000-2000"],
    [2000, "2000+"],
  ])("puts %d ms in %s", (ms, bucket) => expect(durationBucket(ms)).toBe(bucket));
});

describe("slowTapProps", () => {
  const timing = { startTime: 0, processingStart: 10, processingEnd: 610, duration: 650 };
  it("names the kind and phase:bucket, two props only", () => {
    expect(slowTapProps("reveal", timing)).toEqual({ kind: "reveal", timing: "working:500-1000" });
  });
  it("is null for a tap under the threshold", () => {
    expect(slowTapProps("reveal", { ...timing, processingEnd: 50, duration: SLOW_TAP_MS - 1 })).toBeNull();
  });
});
