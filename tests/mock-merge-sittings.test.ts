/**
 * Merging a sitting that exists in the bank under TWO source_file labels.
 *
 * Three MHT-CET papers were uploaded twice, independently typed. `content_hash`
 * deduped only where the typing matched, so each paper's 150 questions ended up
 * SPLIT across both labels — neither alone reconstructs, the union is exactly
 * 150. Merging is therefore the fix, and it needs no re-ingestion.
 *
 * Two hazards this covers, both silent:
 *
 *  1. THE TWO FILES CAN NUMBER THE SAME QUESTION DIFFERENTLY. The 2025 pair
 *     merges a .docx (source_row 1..150) with an .xlsx (2..151, an Excel header
 *     offset). Merging on raw source_row would pair docx q13 with xlsx q12 and,
 *     worse, produce TIES between adjacent questions — leaving the paper order
 *     arbitrary where the two conventions collide. So rows are normalised to the
 *     paper's own numbering first.
 *  2. BOTH LABELS OFTEN HOLD THE SAME QUESTION. That is a duplicate ordering key,
 *     which validatePaperRows already rejects — loudly, which is right — so the
 *     merge must pick exactly one, deterministically.
 */
import { describe, it, expect } from "vitest";
import {
  paperNumberOffset,
  normalisePaperRows,
  dedupeMergedRows,
  orderPaperRows,
  type PaperQuestionRow,
} from "@/lib/mocks/reconstruct";

const row = (
  over: Partial<PaperQuestionRow> & { sourceRow: number }
): PaperQuestionRow => ({
  id: `q${over.sourceRow}-${over.sourceFile ?? "x"}`,
  questionNumber: null,
  subjectName: "Physics",
  answer: "A",
  ...over,
});

describe("paperNumberOffset", () => {
  /**
   * Measured against the live bank, not assumed: every .xlsx source runs
   * Physics source_row 2..51 with question_number 1..50 (the Excel header row),
   * while the 2025 .docx sources run 1..50 for the same questions.
   */
  it("is 1 for an Excel upload and 0 for a docx", () => {
    expect(paperNumberOffset("MHT_CET_2023_Analysis.xlsx")).toBe(1);
    expect(paperNumberOffset("MHT_CET_2025_Apr_19_S2.docx")).toBe(0);
  });

  it("treats an unknown extension as offset 0 rather than guessing", () => {
    expect(paperNumberOffset("NEET_UG_2021.pdf")).toBe(0);
  });
});

describe("normalisePaperRows", () => {
  it("maps each row's source_row onto the paper's own question number", () => {
    const out = normalisePaperRows([
      row({ sourceRow: 13, sourceFile: "a.docx" }),
      row({ sourceRow: 14, sourceFile: "b.xlsx" }),
    ]);
    // docx 13 IS paper 13; xlsx 14 is paper 13 too — the collision the raw
    // source_row would have hidden.
    expect(out.map((r) => r.sourceRow)).toEqual([13, 13]);
  });

  it("leaves a single-convention set in the same relative order", () => {
    const rows = [3, 1, 2].map((n) => row({ sourceRow: n, sourceFile: "a.docx" }));
    expect(orderPaperRows(normalisePaperRows(rows)).map((r) => r.sourceRow)).toEqual([1, 2, 3]);
  });

  it("is a no-op for rows carrying no source file", () => {
    const rows = [row({ sourceRow: 7 })];
    expect(normalisePaperRows(rows)[0].sourceRow).toBe(7);
  });
});

describe("dedupeMergedRows", () => {
  const primary = "primary.xlsx";

  it("keeps the primary file's row when both labels hold the question", () => {
    const out = dedupeMergedRows(
      [
        row({ sourceRow: 5, sourceFile: "other.xlsx", id: "from-other" }),
        row({ sourceRow: 5, sourceFile: primary, id: "from-primary" }),
      ],
      primary
    );
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("from-primary");
  });

  it("keeps the secondary's row where the primary has none — the whole point", () => {
    const out = dedupeMergedRows(
      [row({ sourceRow: 9, sourceFile: "other.xlsx", id: "only-other" })],
      primary
    );
    expect(out.map((r) => r.id)).toEqual(["only-other"]);
  });

  /**
   * Two subjects could in principle share an ordering key, and collapsing across
   * them would silently delete a real question. The key is (subject, position).
   */
  it("does not collapse the same position in two different subjects", () => {
    const out = dedupeMergedRows(
      [
        row({ sourceRow: 5, sourceFile: primary, subjectName: "Physics" }),
        row({ sourceRow: 5, sourceFile: "other.xlsx", subjectName: "Chemistry" }),
      ],
      primary
    );
    expect(out).toHaveLength(2);
  });

  it("leaves an unmerged set untouched", () => {
    const rows = [1, 2, 3].map((n) => row({ sourceRow: n, sourceFile: primary }));
    expect(dedupeMergedRows(rows, primary)).toHaveLength(3);
  });

  it("is deterministic regardless of the order rows arrive in", () => {
    const a = row({ sourceRow: 5, sourceFile: primary, id: "P" });
    const b = row({ sourceRow: 5, sourceFile: "other.xlsx", id: "O" });
    expect(dedupeMergedRows([a, b], primary)[0].id).toBe("P");
    expect(dedupeMergedRows([b, a], primary)[0].id).toBe("P");
  });
});
