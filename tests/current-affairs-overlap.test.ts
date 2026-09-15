/**
 * Topic overlap between an authored pool and the real paper, for `hindsight.ts`.
 *
 * A READING LIST, NEVER A VERDICT — the same limit `scripts/nda-gat/dedup-check.ts`
 * documents for its fuzzy arm, and for a sharper reason here. A Current-Affairs
 * stem is mostly scaffold: "Consider the following statements regarding X ...
 * Which of the statements given above is/are correct ?" is shared by a large
 * fraction of the corpus, so two questions about entirely unrelated subjects
 * score high on shape alone unless the scaffold is stripped.
 *
 * So the matcher scores on SUBJECT TOKENS only — proper nouns, acronyms and
 * distinctive terms — and the first test below is the one that matters: two
 * questions sharing nothing but the scaffold must score zero.
 */
import { describe, it, expect } from "vitest";
import { subjectTokens, topicSimilarity, rankMatches } from "@/lib/currentAffairs/overlap";

describe("subjectTokens", () => {
  it("keeps proper nouns and acronyms", () => {
    const t = subjectTokens("Consider the following statements regarding Exercise DUSTLIK-2026 between India and Uzbekistan");
    expect(t).toContain("dustlik");
    expect(t).toContain("uzbekistan");
    expect(t).toContain("india");
  });

  it("drops the statement scaffold entirely", () => {
    expect(
      subjectTokens("Consider the following statements. Which of the statements given above is/are correct ?")
    ).toEqual([]);
  });

  it("drops the option-code scaffold", () => {
    expect(subjectTokens("Select the correct answer using the code given below :")).toEqual([]);
  });

  it("keeps a year as a token — a date is part of the topic", () => {
    expect(subjectTokens("The Green Nobel of 2026")).toContain("2026");
  });

  it("does not return duplicates", () => {
    const t = subjectTokens("India and India and India");
    expect(t.filter((x) => x === "india")).toHaveLength(1);
  });
});

describe("topicSimilarity", () => {
  it("scores zero when only the scaffold is shared", () => {
    const a = "Consider the following statements regarding the Ramanujan Fellowship. Which of the statements given above is/are correct ?";
    const b = "Consider the following statements regarding COP30 at Belem. Which of the statements given above is/are correct ?";
    expect(topicSimilarity(a, b)).toBe(0);
  });

  it("scores high on the same subject", () => {
    const paper = "Consider the following statements regarding Exercise DUSTLIK-2026 : I. It is a joint military exercise between India and U.A.E.";
    const pool = "The 4th edition of joint military exercise 'DUSTLIK' between the Indian Army and the Uzbekistan Army was held in :";
    expect(topicSimilarity(paper, pool)).toBeGreaterThan(0.15);
  });

  it("scores a different exercise below the same exercise", () => {
    const paper = "Exercise DUSTLIK-2026 between India and Uzbekistan";
    const same = "The 4th edition of DUSTLIK between the Indian Army and the Uzbekistan Army";
    const other = "The 21st edition of Exercise Yudh Abhyas was held at Fort Wainwright, Alaska, USA";
    expect(topicSimilarity(paper, same)).toBeGreaterThan(topicSimilarity(paper, other));
  });

  it("is symmetric", () => {
    const a = "Khelo India Tribal Games in Jharkhand and Odisha";
    const b = "Khelo India Youth Games official mascot";
    expect(topicSimilarity(a, b)).toBeCloseTo(topicSimilarity(b, a), 10);
  });

  it("is zero against an empty side rather than NaN", () => {
    expect(topicSimilarity("Select the correct answer", "BrahMos missile")).toBe(0);
    expect(topicSimilarity("", "")).toBe(0);
  });
});

describe("rankMatches", () => {
  const pool = [
    { id: "p1", text: "The 4th edition of joint military exercise 'DUSTLIK' between the Indian Army and the Uzbekistan Army" },
    { id: "p2", text: "The 21st edition of Exercise Yudh Abhyas was held at Fort Wainwright, Alaska, USA" },
    { id: "p3", text: "Which team won the ICC Champions Trophy 2025 ?" },
  ];

  it("ranks the true subject first", () => {
    const got = rankMatches("Consider the following statements regarding Exercise DUSTLIK-2026", pool);
    expect(got[0].id).toBe("p1");
  });

  it("drops zero-scoring candidates rather than padding the list", () => {
    const got = rankMatches("Ramanujan Fellowship of the Department of Science and Technology", pool);
    expect(got).toEqual([]);
  });

  it("caps the list so a report stays readable", () => {
    const many = Array.from({ length: 20 }, (_, i) => ({ id: `x${i}`, text: "BrahMos missile export India" }));
    expect(rankMatches("BrahMos missile supply India", many, 3)).toHaveLength(3);
  });

  it("orders ties deterministically by id", () => {
    const tied = [
      { id: "b", text: "BrahMos missile export" },
      { id: "a", text: "BrahMos missile export" },
    ];
    expect(rankMatches("BrahMos missile export", tied).map((m) => m.id)).toEqual(["a", "b"]);
  });
});
