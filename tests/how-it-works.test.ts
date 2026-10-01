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
  chapterPickerHref,
  loopFor,
  loopForArm,
  onboardingArm,
  welcomeDestination,
  WELCOME_DEFAULT_NEXT,
  type Loop,
} from "@/lib/education/howItWorks";
import { examHomeHref } from "@/lib/exam/examHome";
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

// The practice-first experiment (2026-10-01): half of new students with a
// mock exam are sent to practise one chapter before sitting a paper.
describe("onboardingArm", () => {
  it("splits on the first hex digit of the user id: even = control, odd = practice-first", () => {
    expect(onboardingArm("0a1b2c3d-0000-4000-8000-000000000000")).toBe("mock-first");
    expect(onboardingArm("8a1b2c3d-0000-4000-8000-000000000000")).toBe("mock-first");
    expect(onboardingArm("1a1b2c3d-0000-4000-8000-000000000000")).toBe("practice-first");
    expect(onboardingArm("F01b2c3d-0000-4000-8000-000000000000")).toBe("practice-first");
  });

  it("is stable for one user, so a reload never flips the screen", () => {
    const id = "7c9e6679-7425-40de-944b-e07fc1f90ae7";
    expect(onboardingArm(id)).toBe(onboardingArm(id));
  });

  it("puts a malformed id in the control arm rather than throwing", () => {
    expect(onboardingArm("")).toBe("mock-first");
    expect(onboardingArm("zzz")).toBe("mock-first");
  });

  it("gives each arm exactly half of the sixteen possible first digits", () => {
    const arms = "0123456789abcdef".split("").map((d) => onboardingArm(`${d}0000000-0000-4000-8000-000000000000`));
    expect(arms.filter((a) => a === "practice-first")).toHaveLength(8);
  });
});

describe("chapterPickerHref", () => {
  it("is the exam home for every exam except NDA", () => {
    for (const slug of ["mht-cet", "jee-mains", "cds", "neet", "upsc-cse"]) {
      expect(chapterPickerHref(slug)).toBe(examHomeHref(slug));
    }
  });

  it("is the NDA section of /questions for NDA, whose home lists guides rather than chapters", () => {
    expect(chapterPickerHref("nda")).toBe("/questions#nda");
  });
});

describe("loopForArm", () => {
  const cet = getExamBySlug("mht-cet")!;

  it("the control arm gets exactly today's loop", () => {
    expect(loopForArm(cet, "mock-first")).toEqual(loopFor(cet));
  });

  it("practice-first, for an exam with mocks: chapter practice → a past paper → the drill", () => {
    const loop = loopForArm(cet, "practice-first");
    expect(loop.kind).toBe("practice");
    expect(loop.examLabel).toBe(cet.displayName);
    expect(stepsOf(loop)).toEqual(["/exams/mht-cet", "/mock/exam/mht-cet", "/drill"]);
    expect(loop.steps[0].cta).toBe("Practise a chapter");
  });

  it("practice-first leaves board and practice-only exams alone: they already start on practice", () => {
    const board = getExamBySlug("mh-hsc-12")!;
    expect(loopForArm(board, "practice-first")).toEqual(loopFor(board));
  });

  it("practice-first with no exam (skipped onboarding) keeps the general loop", () => {
    expect(loopForArm(null, "practice-first")).toEqual(loopFor(null));
  });
});

describe("welcomeDestination for the practice-first loop", () => {
  const loop = loopForArm(getExamBySlug("mht-cet"), "practice-first");

  it("leads with chapter practice and offers the full paper as the secondary", () => {
    const d = welcomeDestination(WELCOME_DEFAULT_NEXT, loop);
    expect(d.primary).toEqual({ href: "/exams/mht-cet", label: "Practise a chapter" });
    expect(d.secondary).toEqual({ href: "/mock/exam/mht-cet", label: "Sit a paper" });
  });

  it("still honours a specific next as the primary", () => {
    const d = welcomeDestination("/mock/mht-cet-2025-paper-1", loop);
    expect(d.primary).toEqual({ href: "/mock/mht-cet-2025-paper-1", label: "Continue" });
    expect(d.secondary.href).toBe("/exams/mht-cet");
  });
});
