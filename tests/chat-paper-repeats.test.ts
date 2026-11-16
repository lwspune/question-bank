/**
 * "How many questions of this paper were repeated?" (owner, 2026-11-16). A
 * student on /question-papers/mh-ssc-10/science-and-technology-i/2026 asked
 * how many of its questions came from earlier years; V could only give chapter
 * shares. The homework plans' repeat and type groups (0216) answer it.
 * Pure core src/lib/chat/paperRepeats.ts.
 */
import { describe, it, expect } from "vitest";
import { paperPageOf, paperRepeatsText } from "@/lib/chat/paperRepeats";
import type { RepeatGroup } from "@/lib/questions/repeatLine";

describe("paperPageOf: the past paper a page shows", () => {
  it("reads exam, subject and paper from a /question-papers page", () => {
    expect(paperPageOf("/question-papers/mh-ssc-10/science-and-technology-i/2026")).toEqual({
      examSlug: "mh-ssc-10",
      subjectSlug: "science-and-technology-i",
      paperSlug: "2026",
    });
  });

  it("ignores a query or a trailing slash", () => {
    expect(paperPageOf("/question-papers/mh-hsc-12/physics/2025-february/?x=1")?.paperSlug).toBe("2025-february");
  });

  it("is null for any other page, or a list of papers", () => {
    expect(paperPageOf("/question-papers/mh-ssc-10/science-and-technology-i")).toBeNull();
    expect(paperPageOf("/board/mh-ssc-10")).toBeNull();
    expect(paperPageOf(null)).toBeNull();
  });
});

const g = (tier: RepeatGroup["tier"], sittings: string[]): RepeatGroup => ({ tier, sittings, n: 1, planSlug: "p" });

describe("paperRepeatsText", () => {
  const items = [
    { printedNumber: "1 (i)", questionId: "a" },
    { printedNumber: "1 (ii)", questionId: "b" },
    { printedNumber: "2 (i)", questionId: "c" },
    { printedNumber: "3", questionId: "d" },
  ];

  it("counts the same questions asked in another paper, then the types, then the rest", () => {
    const groups = new Map<string, RepeatGroup[]>([
      ["a", [g("repeat", ["Mar 2024", "Mar 2026"])]],
      ["c", [g("type", ["Mar 2019", "Mar 2022", "Mar 2026"])]],
    ]);
    expect(paperRepeatsText("MH SSC Science I March 2026", items, groups)).toBe(
      "MH SSC Science I March 2026 has 4 questions. 1 was asked as the same question in another paper too: Q. 1 (i) (Mar 2024, Mar 2026). " +
        "1 more is of a type asked in other papers: Q. 2 (i). The other 2 have no repeat on record."
    );
  });

  it("counts a question once even when it is a repeat and of a type", () => {
    const groups = new Map<string, RepeatGroup[]>([["a", [g("repeat", ["Mar 2024", "Mar 2026"]), g("type", ["Mar 2019", "Mar 2026"])]]]);
    expect(paperRepeatsText("P", items, groups)).toMatch(/^P has 4 questions\. 1 was asked as the same question.*The other 3 have no repeat on record\.$/);
  });

  it("says so plainly when nothing in the paper has repeat data, never that nothing was repeated", () => {
    expect(paperRepeatsText("P", items, new Map())).toBe(
      "P has 4 questions. None of them has a repeat on record; this does not prove they were never asked before."
    );
  });

  it("lists at most 10 repeats and gives the count of the rest", () => {
    const many = Array.from({ length: 13 }, (_, i) => ({ printedNumber: `${i + 1}`, questionId: `q${i}` }));
    const groups = new Map<string, RepeatGroup[]>(many.map((m) => [m.questionId, [g("repeat", ["2024", "2026"])]]));
    const text = paperRepeatsText("P", many, groups);
    expect(text).toMatch(/13 were asked as the same question/);
    expect(text.match(/Q\. \d+ \(2024, 2026\)/g)).toHaveLength(10);
    expect(text).toMatch(/and 3 more\./);
  });
});
