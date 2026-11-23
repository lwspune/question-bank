/**
 * What the Visuals gallery records (2026-11-23), through the generic client
 * beacon (POST /api/activity/event), signed-in students only:
 *   page      the gallery for a subject was opened
 *   open      a visual was opened full screen
 *   practise  "Practise 3 questions" was tapped
 *   notes     "Read in notes" was tapped
 * Once per visual (or subject, for page), step and IST day. No migration:
 * it is a surface_viewed row, like the "Teach me" buttons.
 */
import { describe, it, expect } from "vitest";
import { parseClientEvent } from "@/lib/activity/clientEvents";
import { SURFACES } from "@/lib/activity/views";

const NOW = new Date("2026-11-23T05:00:00Z");

describe("the gallery's events", () => {
  it("is a known surface", () => {
    expect(SURFACES).toContain("visuals");
  });

  it("records a visual's steps, once per visual, step and day", () => {
    for (const action of ["open", "practise", "notes"] as const) {
      expect(
        parseClientEvent({ kind: "surface_viewed", surface: "visuals", action, subject: "nda-maths", slug: "line-plane-intersection" }, "u1", NOW)
      ).toEqual({
        ok: true,
        value: {
          kind: "surface_viewed",
          metadata: { surface: "visuals", action, subject: "nda-maths", slug: "line-plane-intersection" },
          dedupeKey: `view:visuals:${action}:nda-maths:line-plane-intersection:u1:2026-11-23`,
        },
      });
    }
  });

  it("records the page by subject alone", () => {
    expect(parseClientEvent({ kind: "surface_viewed", surface: "visuals", action: "page", subject: "nda-maths" }, "u1", NOW)).toEqual({
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: { surface: "visuals", action: "page", subject: "nda-maths" },
        dedupeKey: "view:visuals:page:nda-maths:-:u1:2026-11-23",
      },
    });
  });

  it("refuses an unknown step, a bad subject or a bad visual", () => {
    const base = { kind: "surface_viewed", surface: "visuals", subject: "nda-maths", slug: "x" };
    expect(parseClientEvent({ ...base, action: "like" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ ...base, action: "open", subject: "NDA Maths" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ ...base, action: "open", slug: "<script>" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ ...base, action: "open", slug: undefined }, "u1", NOW).ok).toBe(false);
  });
});
