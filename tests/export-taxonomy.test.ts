/**
 * Which exam and subject a download was for (migration 0155).
 *
 * Read off the questions actually exported, so it cannot disagree with the
 * file. A paper that mixes exams (a cart can) or subjects records null for
 * that column: null means "mixed", never a guess at the majority.
 */
import { describe, it, expect } from "vitest";
import { exportTaxonomy } from "@/lib/export/exportTaxonomy";

const q = (examId: string, subjectId: string) => ({
  exam: { id: examId, name: examId },
  subject: { id: subjectId, name: subjectId },
});

describe("exportTaxonomy", () => {
  it("names the exam and subject when every question shares them", () => {
    expect(exportTaxonomy([q("nda", "maths"), q("nda", "maths")])).toEqual({
      examId: "nda",
      subjectId: "maths",
    });
  });

  it("keeps the exam but not the subject when subjects mix", () => {
    expect(exportTaxonomy([q("jee", "maths"), q("jee", "physics")])).toEqual({
      examId: "jee",
      subjectId: null,
    });
  });

  // A subject row belongs to one exam, so a subject without its exam names
  // nothing; the subject is recorded only alongside a single exam.
  it("records neither when exams mix", () => {
    expect(exportTaxonomy([q("nda", "maths"), q("cds", "maths")])).toEqual({
      examId: null,
      subjectId: null,
    });
  });

  it("records neither for an empty paper", () => {
    expect(exportTaxonomy([])).toEqual({ examId: null, subjectId: null });
  });
});
