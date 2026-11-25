import { describe, it, expect } from "vitest";
import { parseClientEvent } from "@/lib/activity/clientEvents";
import { isActivityKind } from "@/lib/activity/events";
import { MAX_VISIT_SECONDS, MIN_VISIT_SECONDS } from "@/lib/learn/visit";

const NOW = new Date("2026-11-25T10:00:00Z");
const PATH = "/learn/lesson/vectors/collinear-and-coplanar-vectors";
const ok = {
  kind: "learn_visit",
  path: PATH,
  visit: "3f2a9c1be0d84a7f9c2b1d0e6a5f4c3b",
  place: "v",
  slides: 9,
  start: 1,
  furthest: 4,
  left: 4,
  leftSeconds: 300,
  seconds: 390,
  questions: false,
};

describe("learn_visit (how far a student got through a lesson's slides, 2026-11-25)", () => {
  it("is an activity kind", () => {
    expect(isActivityKind("learn_visit")).toBe(true);
  });

  it("stores the visit, keyed by visit, furthest slide and slide left from", () => {
    const r = parseClientEvent(ok, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "learn_visit",
        metadata: {
          path: PATH,
          visit: ok.visit,
          place: "v",
          slides: 9,
          start: 1,
          furthest: 4,
          left: 4,
          leftSeconds: 300,
          seconds: 390,
          questions: false,
        },
        dedupeKey: `learn_visit:u1:${ok.visit}:4:4`,
      },
    });
  });

  it("accepts the lesson page as the place too", () => {
    expect(parseClientEvent({ ...ok, place: "page" }, "u1", NOW).ok).toBe(true);
  });

  it("needs a lesson's address, never another page", () => {
    for (const path of ["/learn/mh-hsc-12-maths", "/learn/mh-hsc-12-maths/vectors", "/notes/nda-maths/vectors", "", 7, undefined]) {
      expect(parseClientEvent({ ...ok, path }, "u1", NOW).ok).toBe(false);
    }
  });

  it("refuses slide numbers a lesson cannot have", () => {
    for (const bad of [
      { slides: 0 },
      { slides: 101 },
      { start: 0 },
      { furthest: 10 }, // past the last slide
      { left: 5 }, // past the furthest
      { start: 5 }, // furthest before the start
      { furthest: 2.5 },
      { left: "4" },
    ]) {
      expect(parseClientEvent({ ...ok, ...bad }, "u1", NOW).ok, JSON.stringify(bad)).toBe(false);
    }
  });

  it("refuses time outside a real visit, and time on a slide longer than the visit", () => {
    for (const bad of [
      { seconds: MIN_VISIT_SECONDS - 1 },
      { seconds: MAX_VISIT_SECONDS + 1 },
      { leftSeconds: -1 },
      { leftSeconds: 391 },
      { seconds: 12.5 },
    ]) {
      expect(parseClientEvent({ ...ok, ...bad }, "u1", NOW).ok, JSON.stringify(bad)).toBe(false);
    }
  });

  it("refuses a bad visit id, place or questions flag", () => {
    for (const bad of [{ visit: "short" }, { visit: "has spaces in it ok" }, { place: "home" }, { questions: "no" }]) {
      expect(parseClientEvent({ ...ok, ...bad }, "u1", NOW).ok, JSON.stringify(bad)).toBe(false);
    }
  });

  it("carries nothing else", () => {
    expect(parseClientEvent({ ...ok, surface: "learn_start" }, "u1", NOW).ok).toBe(false);
  });
});
