/**
 * The board-paper lane's classification catalog vs. the live taxonomy.
 *
 * `catalog.ts` is GENERATED from the database, and a generated file that nobody
 * re-checks is a snapshot that quietly ages. Two guards:
 *
 *   - pure: the catalog's chapters and `lib.ts`'s HARD-validated chapter list
 *     must be the same set. They are two hand-offs of the same fact, and a
 *     chapter present in one but not the other means a question can pass
 *     validation and then fail to file (or vice versa).
 *   - live: the catalog must still match the DB. That check runs against PROD,
 *     so it lives in tests/mh-hsc-12-paper-catalog-prod.test.ts and is listed in
 *     tests/prodContractFiles.ts — the seeded test project has no HSC content,
 *     and a live check pointed at it fails for a reason that has nothing to do
 *     with the catalog.
 */
import { describe, it, expect } from "vitest";
import { HSC_MATHS_CATALOG } from "../scripts/mh-hsc-12-pyq/paper/catalog";
import { HSC_MATHS_CHAPTERS, validateChapter } from "../scripts/mh-hsc-12-pyq/paper/lib";

describe("catalog ↔ hard-validated chapter list", () => {
  it("covers exactly the same chapters, both directions", () => {
    const catalog = Object.keys(HSC_MATHS_CATALOG.chapters).sort();
    expect(catalog).toEqual([...HSC_MATHS_CHAPTERS].sort());
  });

  it("accepts every catalog chapter through validateChapter", () => {
    for (const ch of Object.keys(HSC_MATHS_CATALOG.chapters)) {
      expect(() => validateChapter(ch), ch).not.toThrow();
    }
  });

  it("gives every chapter at least one subtopic", () => {
    for (const [ch, subs] of Object.entries(HSC_MATHS_CATALOG.chapters)) {
      expect(subs.length, ch).toBeGreaterThan(0);
    }
  });

  it("carries no duplicate subtopic inside a chapter", () => {
    for (const [ch, subs] of Object.entries(HSC_MATHS_CATALOG.chapters)) {
      expect(new Set(subs).size, ch).toBe(subs.length);
    }
  });

  it("files under the Mathematics subject", () => {
    expect(HSC_MATHS_CATALOG.subjectName).toBe("Mathematics");
  });
});
