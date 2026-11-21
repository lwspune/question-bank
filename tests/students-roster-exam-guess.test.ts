import { describe, it, expect } from "vitest";
import { rosterExamGuess } from "@/lib/students/rosterExamGuess";

describe("rosterExamGuess", () => {
  it("is null when the student chose an exam, whatever the guess", () => {
    expect(
      rosterExamGuess({
        targetExams: ["nda"],
        stored: { exam: "neet", source: "practice", answer: null },
        landing: "/questions/jee-mains/physics/optics",
      })
    ).toBeNull();
  });

  it("prefers the stored guess (the daily job's practice-aware one)", () => {
    expect(
      rosterExamGuess({
        targetExams: [],
        stored: { exam: "neet", source: "practice", answer: null },
        landing: "/questions/jee-mains/physics/optics",
      })
    ).toEqual({ slug: "neet", source: "practice" });
  });

  it("falls back to the landing page when nothing is stored yet (a new account)", () => {
    expect(
      rosterExamGuess({ targetExams: [], stored: null, landing: "/questions/mh-hsc-12/chemistry/solid-state" })
    ).toEqual({ slug: "mh-hsc-12", source: "landing" });
  });

  it("is null when the landing page names no exam", () => {
    expect(rosterExamGuess({ targetExams: [], stored: null, landing: "/" })).toBeNull();
    expect(rosterExamGuess({ targetExams: [], stored: null, landing: null })).toBeNull();
  });

  it("drops a guess the student said was wrong, and does not re-guess from the page", () => {
    expect(
      rosterExamGuess({
        targetExams: [],
        stored: { exam: "mh-hsc-12", source: "landing", answer: "change" },
        landing: "/questions/mh-hsc-12/chemistry/solid-state",
      })
    ).toBeNull();
  });

  it("ignores a stored slug the registry no longer knows, using the page instead", () => {
    expect(
      rosterExamGuess({
        targetExams: [],
        stored: { exam: "retired-exam", source: "landing", answer: null },
        landing: "/questions/neet/biology/cell",
      })
    ).toEqual({ slug: "neet", source: "landing" });
  });
});
