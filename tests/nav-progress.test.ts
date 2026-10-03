import { describe, it, expect } from "vitest";
import { shouldStartNavProgress, type NavTap } from "@/lib/navigation/navProgress";

// Clarity (2026-10-02): "Sign in to start" took 8 taps and "Open chapter notes"
// 6, because nothing on screen changes while a link loads. A bar starts on the
// tap; this rule decides which taps are a page change worth showing it for.
const base: NavTap = {
  href: "https://www.pyqvault.com/notes/nda-physics/units-measurement-dimensions",
  current: "https://www.pyqvault.com/notes/nda-physics",
  target: null,
  download: false,
  button: 0,
  modifier: false,
};

describe("shouldStartNavProgress", () => {
  it("starts for a plain tap on an internal link to another page", () => {
    expect(shouldStartNavProgress(base)).toBe(true);
  });

  it("starts when only the query changes (a /browse filter)", () => {
    expect(
      shouldStartNavProgress({ ...base, current: "https://www.pyqvault.com/browse?examId=a", href: "https://www.pyqvault.com/browse?examId=b" })
    ).toBe(true);
  });

  it("ignores a link to another site", () => {
    expect(shouldStartNavProgress({ ...base, href: "https://clarity.microsoft.com/x" })).toBe(false);
  });

  it("ignores a link to the page already open", () => {
    expect(shouldStartNavProgress({ ...base, href: base.current })).toBe(false);
  });

  it("ignores an in-page anchor on the same page", () => {
    expect(shouldStartNavProgress({ ...base, href: base.current + "#concept-2" })).toBe(false);
  });

  it("ignores taps that open a new tab or window", () => {
    expect(shouldStartNavProgress({ ...base, target: "_blank" })).toBe(false);
    expect(shouldStartNavProgress({ ...base, modifier: true })).toBe(false);
    expect(shouldStartNavProgress({ ...base, button: 1 })).toBe(false);
  });

  it("ignores downloads and non-page schemes", () => {
    expect(shouldStartNavProgress({ ...base, download: true })).toBe(false);
    expect(shouldStartNavProgress({ ...base, href: "mailto:hello@pyqvault.com" })).toBe(false);
    expect(shouldStartNavProgress({ ...base, href: "javascript:void(0)" })).toBe(false);
  });

  // The API routes answer with a file or a redirect, not a page change the
  // client router will report, so the bar would hang until its timeout.
  it("ignores API routes", () => {
    expect(shouldStartNavProgress({ ...base, href: "https://www.pyqvault.com/api/export?kind=paper" })).toBe(false);
  });

  it("treats a target of _self like no target", () => {
    expect(shouldStartNavProgress({ ...base, target: "_self" })).toBe(true);
  });

  it("is false for an unparseable href", () => {
    expect(shouldStartNavProgress({ ...base, href: "http://[" })).toBe(false);
  });
});
