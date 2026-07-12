import { describe, it, expect } from "vitest";
import {
  MEDIUMS,
  STREAMS,
  isMedium,
  isStream,
  sanitizeProfileDetails,
  profileCompletion,
} from "@/lib/profile/fields";

describe("isMedium / isStream", () => {
  it("accepts known values, rejects the rest", () => {
    for (const m of MEDIUMS) expect(isMedium(m)).toBe(true);
    for (const s of STREAMS) expect(isStream(s)).toBe(true);
    expect(isMedium("english")).toBe(true);
    expect(isMedium("marathi")).toBe(false);
    expect(isStream("pcm")).toBe(true);
    expect(isStream("science")).toBe(false); // must be the PCM/PCB/PCMB granularity
    expect(isStream(null)).toBe(false);
    expect(isMedium(undefined)).toBe(false);
  });
});

describe("sanitizeProfileDetails", () => {
  it("only returns the keys that were provided (partial patch)", () => {
    expect(sanitizeProfileDetails({ city: "Pune" })).toEqual({ city: "Pune" });
    expect(sanitizeProfileDetails({})).toEqual({});
  });

  it("cleans enums, nulling unknowns", () => {
    expect(sanitizeProfileDetails({ medium: "hindi", stream: "pcb" })).toEqual({
      medium: "hindi",
      stream: "pcb",
    });
    expect(sanitizeProfileDetails({ medium: "klingon", stream: "science" })).toEqual({
      medium: null,
      stream: null,
    });
  });

  it("sanitizes target exams via the registry (deduped, valid only)", () => {
    expect(sanitizeProfileDetails({ targetExams: ["nda", "nda", "nope"] })).toEqual({
      targetExams: ["nda"],
    });
  });

  it("validates stage against the closed set", () => {
    expect(sanitizeProfileDetails({ stage: "dropper" })).toEqual({ stage: "dropper" });
    expect(sanitizeProfileDetails({ stage: "postgrad" })).toEqual({ stage: null });
  });

  it("trims free text, collapses blank to null, and caps length", () => {
    expect(sanitizeProfileDetails({ city: "  Pune  " })).toEqual({ city: "Pune" });
    expect(sanitizeProfileDetails({ city: "   " })).toEqual({ city: null });
    expect(sanitizeProfileDetails({ goal: "" })).toEqual({ goal: null });
    const longGoal = "x".repeat(500);
    const out = sanitizeProfileDetails({ goal: longGoal });
    expect((out.goal as string).length).toBeLessThanOrEqual(200);
  });
});

describe("profileCompletion (mobile counts — 7 fields)", () => {
  it("is 0% for an empty profile", () => {
    const r = profileCompletion({
      mobile: null,
      targetExams: [],
      stage: null,
      medium: null,
      stream: null,
      city: null,
      goal: null,
    });
    expect(r.filled).toBe(0);
    expect(r.total).toBe(7);
    expect(r.percent).toBe(0);
    expect(r.missing).toContain("mobile");
    expect(r.missing).toContain("goal");
  });

  it("is 100% when every field is present", () => {
    const r = profileCompletion({
      mobile: "919876543210",
      targetExams: ["nda"],
      stage: "class-12",
      medium: "english",
      stream: "pcm",
      city: "Pune",
      goal: "Clear NDA 2026",
    });
    expect(r.filled).toBe(7);
    expect(r.percent).toBe(100);
    expect(r.missing).toEqual([]);
  });

  it("counts an empty exam array + blank strings as not filled", () => {
    const r = profileCompletion({
      mobile: "919876543210",
      targetExams: [],
      stage: "class-12",
      medium: null,
      stream: null,
      city: "",
      goal: null,
    });
    // mobile + stage filled → 2 of 7
    expect(r.filled).toBe(2);
    expect(r.percent).toBe(29); // round(2/7*100)
    expect(r.missing).toEqual(
      expect.arrayContaining(["targetExams", "medium", "stream", "city", "goal"])
    );
  });
});
