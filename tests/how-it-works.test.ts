/**
 * The three-step loop every education surface renders — /start, the welcome
 * step and the welcome email — comes from ONE pure helper, so the copy cannot
 * disagree across surfaces. STUDENT_EDUCATION_SPEC.md §3.
 *
 * The loop is chosen from the registry FLAGS, never from prose: an exam with
 * mocks gets the mock loop, a board exam without mocks gets the book loop,
 * and a practice-only exam gets the bank loop with /browse as its first step.
 */
import { describe, it, expect } from "vitest";
import {
  loopFor,
  welcomeDestination,
  WELCOME_DEFAULT_NEXT,
  type Loop,
} from "@/lib/education/howItWorks";
import { EXAM_REGISTRY, getExamBySlug, type ExamEntry } from "@/lib/exam/examContext";

function stepsOf(loop: Loop) {
  return loop.steps.map((s) => s.href);
}

describe("loopFor", () => {
  it("an exam with mocks gets the mock loop: its own mock catalogue → the drill → the map", () => {
    const loop = loopFor(getExamBySlug("nda"));
    expect(loop.kind).toBe("mock");
    expect(loop.examLabel).toBe("NDA");
    expect(stepsOf(loop)).toEqual(["/mock/exam/nda", "/drill", "/me/map"]);
  });

  it("a board exam without mocks gets the bank loop, entered through its book reader", () => {
    const exam = getExamBySlug("mh-hsc-12");
    expect(exam?.boardExam).toBe(true);
    expect(exam?.hasMocks).not.toBe(true);
    const loop = loopFor(exam);
    expect(loop.kind).toBe("bank");
    expect(stepsOf(loop)).toEqual(["/board/mh-hsc-12", "/browse", "/saved"]);
  });

  it("a practice-only exam that is not a board gets the bank loop entered through /browse", () => {
    const exam = getExamBySlug("foundation-course");
    expect(exam?.practiceOnly).toBe(true);
    expect(exam?.boardExam).not.toBe(true);
    const loop = loopFor(exam);
    expect(loop.kind).toBe("bank");
    expect(stepsOf(loop)[0]).toBe("/browse");
  });

  it("no exam (a skipped onboarding) gets the general mock loop from the whole catalogue", () => {
    const loop = loopFor(null);
    expect(loop.kind).toBe("mock");
    expect(loop.examLabel).toBeNull();
    expect(stepsOf(loop)).toEqual(["/mock", "/drill", "/me/map"]);
  });

  it("mocks win over the board flag when an exam carries both", () => {
    const synthetic: ExamEntry = {
      ...(getExamBySlug("mh-hsc-12") as ExamEntry),
      hasMocks: true,
    };
    expect(loopFor(synthetic).kind).toBe("mock");
    expect(stepsOf(loopFor(synthetic))[0]).toBe("/mock/exam/mh-hsc-12");
  });

  it("every registry exam yields three complete steps with same-origin hrefs", () => {
    for (const exam of EXAM_REGISTRY) {
      const loop = loopFor(exam);
      expect(loop.steps).toHaveLength(3);
      for (const s of loop.steps) {
        expect(s.title.length).toBeGreaterThan(0);
        expect(s.body.length).toBeGreaterThan(0);
        expect(s.cta.length).toBeGreaterThan(0);
        expect(s.href.startsWith("/")).toBe(true);
        expect(s.href.startsWith("//")).toBe(false);
      }
    }
  });
});

describe("welcomeDestination", () => {
  const loop = loopFor(getExamBySlug("nda"));

  it("with the default next, the loop's first step leads and the bank is the secondary", () => {
    const d = welcomeDestination(WELCOME_DEFAULT_NEXT, loop);
    expect(d.primary.href).toBe("/mock/exam/nda");
    expect(d.primary.label).toBe(loop.steps[0].cta);
    expect(d.secondary.href).toBe("/browse");
  });

  it("a specific next (a mock tapped before sign-up) is honoured as the primary; the loop entry drops to secondary", () => {
    const d = welcomeDestination("/mock/nda-2025-sep-maths", loop);
    expect(d.primary).toEqual({ href: "/mock/nda-2025-sep-maths", label: "Continue" });
    expect(d.secondary.href).toBe("/mock/exam/nda");
  });

  it("a next that IS the loop entry does not produce two identical buttons", () => {
    const d = welcomeDestination("/mock/exam/nda", loop);
    expect(d.primary.href).toBe("/mock/exam/nda");
    expect(d.secondary.href).toBe("/browse");
  });
});
