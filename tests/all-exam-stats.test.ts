import { describe, it, expect } from "vitest";
import {
  pickExamCardHref,
  shapeExamCatalog,
} from "@/lib/exam/allExamStats";
import { getExamBySlug } from "@/lib/exam/examContext";

describe("pickExamCardHref", () => {
  const nda = getExamBySlug("nda")!; // has a /guide subtree
  const mhtcet = getExamBySlug("mht-cet")!; // no guide, has shipped notes
  const neet = getExamBySlug("neet")!; // no guide, no shipped notes yet

  it("prefers the guide subtree when the exam has one", () => {
    expect(pickExamCardHref(nda, "uuid-nda", true)).toBe("/guide/nda");
  });

  it("falls back to the notes hub when there's no guide but notes have shipped", () => {
    expect(pickExamCardHref(mhtcet, "uuid-cet", true)).toBe("/notes/mht-cet");
  });

  it("falls back to the exam's bank when there's neither a guide nor shipped notes", () => {
    expect(pickExamCardHref(neet, "uuid-neet", false)).toBe(
      "/browse?examId=uuid-neet"
    );
  });

  it("falls back to the bare bank when the exam UUID is unresolved", () => {
    expect(pickExamCardHref(neet, null, false)).toBe("/browse");
  });

  it("guide wins even when notes have also shipped", () => {
    expect(pickExamCardHref(nda, "uuid-nda", true)).toBe("/guide/nda");
  });
});

describe("shapeExamCatalog", () => {
  it("orders items by registry order and carries counts + flags + href", () => {
    const counts = new Map<string, number>([
      ["NDA", 8259],
      ["MHT-CET", 6638],
      ["Maharashtra HSC Class 12", 1435],
    ]);
    const notesSlugs = new Set<string>(["nda", "mht-cet"]);
    const examIds = new Map<string, string>([
      ["nda", "id-nda"],
      ["mht-cet", "id-cet"],
      ["mh-hsc-12", "id-board"],
    ]);

    const { exams, totalPublicQuestions } = shapeExamCatalog(
      counts,
      examIds,
      notesSlugs
    );

    // Registry order: nda first.
    expect(exams[0].slug).toBe("nda");
    expect(exams[0].totalPublicQuestions).toBe(8259);
    expect(exams[0].href).toBe("/guide/nda");

    const board = exams.find((e) => e.slug === "mh-hsc-12")!;
    expect(board.totalPublicQuestions).toBe(1435);
    expect(board.boardExam).toBe(true);
    // FLIPPED 2026-08-13: mh-hsc-12's board PYQs are now in (317 q across all 15
    // Maths chapters), so it is no longer practice-only. The flag tracks whether
    // an exam HAS past-year questions, not which corpus is larger.
    expect(board.practiceOnly).toBe(false);
    // Keep coverage of the TRUE case, which is what this assertion was for —
    // Class 9 is not a board year, so it can never acquire PYQs.
    expect(exams.find((e) => e.slug === "mh-sb-9")!.practiceOnly).toBe(true);
    // No guide, no shipped notes → bank href with the resolved id.
    expect(board.href).toBe("/browse?examId=id-board");

    // Grand total sums every exam's count (missing → 0).
    expect(totalPublicQuestions).toBe(8259 + 6638 + 1435);
  });

  it("treats a missing count as zero without throwing", () => {
    const { exams, totalPublicQuestions } = shapeExamCatalog(
      new Map(),
      new Map(),
      new Set()
    );
    expect(exams.every((e) => e.totalPublicQuestions === 0)).toBe(true);
    expect(totalPublicQuestions).toBe(0);
  });
});
