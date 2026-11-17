import { describe, expect, it } from "vitest";
import { extractProseCounts } from "../scripts/lib/guideProseCounts";

const ns = (t: string) => extractProseCounts(t).map((c) => c.n);

describe("extractProseCounts", () => {
  it("reads the forms guide prose uses", () => {
    expect(ns("Vocab 316 q and Idioms 40 q")).toEqual([316, 40]);
    expect(ns("the Economy chapter (81 questions)")).toEqual([81]);
    expect(ns("1,320 PYQs across the papers, a 63-PYQ chapter")).toEqual([1320, 63]);
  });
  it("skips years and numbers that are not counts", () => {
    expect(ns("since 2017 questions have shifted; 40% of the paper; 3.5 q")).toEqual([]);
  });
  it("marks per-paper rates", () => {
    const [a, b] = extractProseCounts("about 4 questions a paper, 316 q in all");
    expect(a).toMatchObject({ n: 4, perPaper: true });
    expect(b).toMatchObject({ n: 316, perPaper: false });
  });
});
