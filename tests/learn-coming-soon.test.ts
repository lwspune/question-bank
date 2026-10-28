import { describe, expect, it } from "vitest";
import { learnComingSoonFor } from "@/lib/learn/comingSoon";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

describe("learnComingSoonFor", () => {
  it("names an exam that has no Learn course yet", () => {
    expect(learnComingSoonFor("nda")).toBe(EXAM_REGISTRY.find((e) => e.slug === "nda")!.displayName);
  });

  it("is silent for an exam whose course is ready", () => {
    expect(learnComingSoonFor("mh-hsc-12")).toBeNull();
    expect(learnComingSoonFor("cbse-12")).toBeNull();
  });

  it("is silent when no exam was chosen, or the cookie holds a retired slug", () => {
    expect(learnComingSoonFor(null)).toBeNull();
    expect(learnComingSoonFor("")).toBeNull();
    expect(learnComingSoonFor("not-an-exam")).toBeNull();
  });

  it("covers every exam without a course, and none with one", () => {
    for (const e of EXAM_REGISTRY) {
      expect(learnComingSoonFor(e.slug)).toBe(e.learnPath ? null : e.displayName);
    }
  });
});
