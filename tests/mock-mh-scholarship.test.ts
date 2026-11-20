import { describe, expect, it } from "vitest";
import {
  getBlueprint,
  MH_SCHOLARSHIP_4_PAPER_1,
  MH_SCHOLARSHIP_4_PAPER_2,
  MH_SCHOLARSHIP_7_PAPER_1,
  MH_SCHOLARSHIP_7_PAPER_2,
} from "../src/lib/mocks/blueprints";
import { PAPERS } from "../scripts/mh-scholarship/config";
import { deriveMhScholarshipSittings } from "../scripts/mocks/mhScholarshipSittings";

const ALL = [MH_SCHOLARSHIP_4_PAPER_1, MH_SCHOLARSHIP_4_PAPER_2, MH_SCHOLARSHIP_7_PAPER_1, MH_SCHOLARSHIP_7_PAPER_2];

describe("MH Scholarship mocks (MSCE, Class 4 and 7)", () => {
  it("each paper: 2 marks a question, no penalty, 90 minutes, two printed sections", () => {
    for (const bp of ALL) {
      expect(bp.marking).toEqual({ correct: 2, wrong: 0 });
      expect(bp.durationSecs).toBe(90 * 60);
      expect(bp.sections.map((s) => s.subjects)).toHaveLength(2);
      expect(getBlueprint(bp.examSlug, bp.code)).toBe(bp);
    }
  });

  it("Paper I = English + Mathematics, Paper II = Marathi + Intelligence Test, in that order", () => {
    for (const bp of [MH_SCHOLARSHIP_4_PAPER_1, MH_SCHOLARSHIP_7_PAPER_1]) {
      expect(bp.sections.map((s) => s.subjects)).toEqual([["English"], ["Mathematics"]]);
    }
    for (const bp of [MH_SCHOLARSHIP_4_PAPER_2, MH_SCHOLARSHIP_7_PAPER_2]) {
      expect(bp.sections.map((s) => s.subjects)).toEqual([["Marathi"], ["Intelligence Test"]]);
    }
  });

  it("one sitting per published paper (Class 4 and 7 only, never Class 5 or 8); 75 expected; none held", () => {
    const s = deriveMhScholarshipSittings(Object.values(PAPERS));
    expect(s.map((x) => x.key)).toEqual(["ms4-2026-p1", "ms4-2026-p2", "ms7-2026-p1", "ms7-2026-p2"]);
    for (const x of s) {
      expect(x.sourceFile).toBe(`mh-scholarship/${x.key}`);
      expect(x.slug).toBe(x.key);
      expect(x.questionCount).toBe(75);
      expect(x.hold).toBeUndefined();
    }
  });

  it("a question MSCE cancelled rides as grace (Class 4 P1 Q15, Class 7 P1 Q42), nothing else", () => {
    const byKey = Object.fromEntries(deriveMhScholarshipSittings(Object.values(PAPERS)).map((x) => [x.key, x]));
    const row = (n: number) => ({ questionNumber: String(n) }) as unknown as Parameters<NonNullable<(typeof byKey)[string]["prepare"]>>[0][number];
    const graced = (key: string, n: number) => {
      const prep = byKey[key].prepare;
      return prep ? Boolean((prep([row(n)])[0] as { grace?: boolean }).grace) : false;
    };
    expect(graced("ms4-2026-p1", 15)).toBe(true);
    expect(graced("ms4-2026-p1", 14)).toBe(false);
    expect(graced("ms7-2026-p1", 42)).toBe(true);
    expect(byKey["ms4-2026-p2"].prepare).toBeUndefined();
  });

  it("titles name the class, the paper and the sitting", () => {
    const byKey = Object.fromEntries(deriveMhScholarshipSittings(Object.values(PAPERS)).map((x) => [x.key, x.title]));
    expect(byKey["ms4-2026-p1"]).toBe("MH Scholarship Class 4 Paper I, April 2026");
    expect(byKey["ms7-2026-p2"]).toBe("MH Scholarship Class 7 Paper II, April 2026");
  });
});
