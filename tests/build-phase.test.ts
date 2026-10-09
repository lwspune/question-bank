/**
 * `isBuildPhase` — are we inside `next build`?
 *
 * Next sets NEXT_PHASE=phase-production-build for the build and its page
 * workers inherit it. The build-only protections (the fetch cap in
 * lib/supabase/buildFetch and the failure memo in lib/cache/singleFlight) key
 * off this, so a live page render or a script is never throttled by them.
 */
import { describe, it, expect } from "vitest";
import { isBuildPhase } from "@/lib/cache/buildPhase";

describe("isBuildPhase", () => {
  it("is true only for Next's production-build phase", () => {
    expect(isBuildPhase({ NEXT_PHASE: "phase-production-build" })).toBe(true);
    expect(isBuildPhase({ NEXT_PHASE: "phase-production-server" })).toBe(false);
    expect(isBuildPhase({ NEXT_PHASE: "phase-development-server" })).toBe(false);
    expect(isBuildPhase({})).toBe(false);
  });

  it("reads process.env by default", () => {
    const before = process.env.NEXT_PHASE;
    try {
      delete process.env.NEXT_PHASE;
      expect(isBuildPhase()).toBe(false);
      process.env.NEXT_PHASE = "phase-production-build";
      expect(isBuildPhase()).toBe(true);
    } finally {
      if (before === undefined) delete process.env.NEXT_PHASE;
      else process.env.NEXT_PHASE = before;
    }
  });
});
