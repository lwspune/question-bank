import { describe, expect, it } from "vitest";
import { IAT_PAPER, getBlueprint, iatPaper, totalMarks, totalQuestions } from "@/lib/mocks/blueprints";
import { deriveIatSittings, iatSittings } from "../scripts/mocks/iatSittings";

/**
 * IISER Aptitude Test mocks: one per year, the whole paper as IISER set it
 * (2026 brochure §19): 60 questions, 15 each of Biology, Chemistry, Mathematics
 * and Physics in that order, +4 / -1, 180 minutes, out of 240.
 */
describe("IAT blueprint", () => {
  it("is 60 questions, 240 marks, 3 hours, +4 / -1, four sections of 15 in paper order", () => {
    expect(totalQuestions(IAT_PAPER)).toBe(60);
    expect(totalMarks(IAT_PAPER)).toBe(240);
    expect(IAT_PAPER.durationSecs).toBe(180 * 60);
    expect(IAT_PAPER.marking).toEqual({ correct: 4, wrong: -1 });
    expect(IAT_PAPER.sections.map((s) => [s.subjects.join(), s.count])).toEqual([
      ["Biology", 15],
      ["Chemistry", 15],
      ["Mathematics", 15],
      ["Physics", 15],
    ]);
  });

  it("shortens a section for a question IISER dropped, keeping the rest", () => {
    const bp = iatPaper({ Physics: 14 });
    expect(bp.sections.map((s) => s.count)).toEqual([15, 15, 15, 14]);
    expect(totalQuestions(bp)).toBe(59);
    expect(bp.code).toBe(IAT_PAPER.code);
  });

  it("resolves through getBlueprint", () => {
    expect(getBlueprint("iiser-iat", "paper")).toBe(IAT_PAPER);
  });
});

describe("IAT sittings: one mock per year in the bank", () => {
  it("names a year's paper by its source file, slug and title, with its section counts", () => {
    const [s] = deriveIatSittings([2026], () => 15);
    expect(s).toEqual({
      key: "2026",
      year: 2026,
      sourceFile: "IAT 2026 (IISER)",
      slug: "iat-2026",
      title: "IISER IAT 2026",
      counts: { Biology: 15, Chemistry: 15, Mathematics: 15, Physics: 15 },
    });
  });

  it("reads each subject's count from the committed transcription", () => {
    const all = iatSittings();
    const y2025 = all.find((s) => s.year === 2025);
    expect(y2025?.counts.Physics).toBe(14);
    expect(y2025?.counts.Biology).toBe(15);
  });
});
