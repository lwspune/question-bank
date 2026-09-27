/**
 * surface_viewed: "did the student SEE it?" — the question the engagement read
 * could not answer on 2026-09-27 (no page was recorded as viewed, only as acted
 * on; 51 of 265 students who signed in that month left no row at all).
 *
 * One row per student per surface per IST day, via dedupe_key, so a view is
 * also the day's heartbeat and a refresh cannot inflate anything.
 */
import { describe, it, expect } from "vitest";
import { SURFACES, viewDedupeKey, surfaceViewedEvent, isSurface } from "@/lib/activity/views";

describe("surface_viewed", () => {
  it("names the surfaces the engagement spec needs to see", () => {
    for (const s of ["site", "drill", "me", "map", "start", "result", "mock_start", "pricing"]) {
      expect(SURFACES).toContain(s);
      expect(isSurface(s)).toBe(true);
    }
    expect(isSurface("blog")).toBe(false);
    expect(isSurface(42)).toBe(false);
  });

  it("dedupes per student, surface and IST day", () => {
    // 20:00 UTC on the 27th is 01:30 IST on the 28th.
    const late = new Date("2026-09-27T20:00:00Z");
    const early = new Date("2026-09-27T03:00:00Z");
    expect(viewDedupeKey("u1", "drill", late)).toBe("view:drill:u1:2026-09-28");
    expect(viewDedupeKey("u1", "drill", early)).toBe("view:drill:u1:2026-09-27");
    expect(viewDedupeKey("u2", "drill", early)).not.toBe(viewDedupeKey("u1", "drill", early));
    expect(viewDedupeKey("u1", "me", early)).not.toBe(viewDedupeKey("u1", "drill", early));
  });

  it("builds the event with the surface in metadata and the dedupe key set", () => {
    const now = new Date("2026-09-27T03:00:00Z");
    expect(surfaceViewedEvent("u1", "result", now, "attempt-9")).toEqual({
      kind: "surface_viewed",
      refId: "attempt-9",
      refKind: "result",
      metadata: { surface: "result" },
      dedupeKey: "view:result:u1:2026-09-27",
    });
    expect(surfaceViewedEvent("u1", "site", now).refId).toBeUndefined();
  });
});
