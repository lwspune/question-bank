/**
 * What V is told about a question beyond its text (owner, 2026-11-16, "big
 * yes"): the marks it carried in its printed board paper, and the other papers
 * that asked it. In the 14 days to 2026-11-16 students asked "how many marks is
 * this?" twice and "any other year?" / "how many were repeated?" twice, and V
 * could answer none of them although the site holds all four answers.
 * Pure core src/lib/chat/questionExtras.ts.
 */
import { describe, it, expect } from "vitest";
import { marksLine, repeatsLine, type PaperMark } from "@/lib/chat/questionExtras";
import type { RepeatGroup } from "@/lib/questions/repeatLine";

const mark = (over: Partial<PaperMark> = {}): PaperMark => ({
  paperTitle: "Maharashtra HSC Biology June 2026",
  year: 2026,
  printedNumber: "Q. 27",
  marks: 4,
  partOf: null,
  ...over,
});

describe("marksLine: the marks a question carried in its board paper", () => {
  it("names the paper, the printed number and the marks", () => {
    expect(marksLine([mark()])).toBe("Marks: Q. 27 in Maharashtra HSC Biology June 2026 carries 4 marks.");
  });

  it("writes a bare printed number as Q. (papers store '27' and '3 (ii)')", () => {
    expect(marksLine([mark({ printedNumber: "27" })])).toBe("Marks: Q. 27 in Maharashtra HSC Biology June 2026 carries 4 marks.");
    expect(marksLine([mark({ printedNumber: "3 (ii)", marks: 3 })])).toMatch(/^Marks: Q\. 3 \(ii\) in /);
    const part = marksLine([mark({ printedNumber: "31 (ii)", marks: null, partOf: { printedNumber: "31", marks: 4 } })]);
    expect(part).toMatch(/^Marks: Q\. 31 \(ii\) in .* is part of Q\. 31, which/);
  });

  it("says 1 mark, not 1 marks", () => {
    expect(marksLine([mark({ marks: 1 })])).toBe("Marks: Q. 27 in Maharashtra HSC Biology June 2026 carries 1 mark.");
  });

  it("for a part, gives the whole question's marks and says the paper does not split them (0147)", () => {
    const line = marksLine([mark({ printedNumber: "Q. 31 (ii)", marks: null, partOf: { printedNumber: "Q. 31", marks: 4 } })]);
    expect(line).toBe(
      "Marks: Q. 31 (ii) in Maharashtra HSC Biology June 2026 is part of Q. 31, which carries 4 marks for all its parts; the paper does not split them."
    );
  });

  it("lists each paper when the question was printed in more than one, newest first", () => {
    const line = marksLine([
      mark({ paperTitle: "Maharashtra HSC Biology March 2024", year: 2024, printedNumber: "Q. 12", marks: 3 }),
      mark(),
    ]);
    expect(line).toBe(
      "Marks: Q. 27 in Maharashtra HSC Biology June 2026 carries 4 marks; Q. 12 in Maharashtra HSC Biology March 2024 carries 3 marks."
    );
  });

  it("is null when the question is in no printed board paper: V must not guess marks", () => {
    expect(marksLine([])).toBeNull();
  });

  it("keeps at most 3 papers, so one question cannot fill V's instructions", () => {
    const many = [2019, 2020, 2021, 2022, 2023].map((y) => mark({ paperTitle: `Paper ${y}`, year: y }));
    expect(marksLine(many)?.match(/carries/g)).toHaveLength(3);
    expect(marksLine(many)).toMatch(/^Marks: Q\. 27 in Paper 2023/);
  });
});

const group = (over: Partial<RepeatGroup> = {}): RepeatGroup => ({
  tier: "repeat",
  sittings: ["NDA 1 2017", "NDA 1 2021", "NDA 2 2024"],
  n: 4,
  planSlug: "nda-maths",
  ...over,
});

describe("repeatsLine: the other papers that asked it", () => {
  it("lists every paper of an exact repeat", () => {
    expect(repeatsLine([group()])).toBe("Repeats: this same question was asked in 3 papers: NDA 1 2017, NDA 1 2021, NDA 2 2024.");
  });

  it("says which papers changed the numbers", () => {
    expect(repeatsLine([group({ sittings: ["Feb 2023", "July 2024*", "Feb 2026"] })])).toBe(
      "Repeats: this same question was asked in 3 papers: Feb 2023, July 2024 (new numbers), Feb 2026."
    );
  });

  it("gives a type as questions LIKE it, never this question, even below the card's 5-time bar", () => {
    expect(repeatsLine([group({ tier: "type", sittings: ["2019", "2022", "2025"] })])).toBe(
      "Repeats: questions of this type (same idea, own numbers) were asked 3 times: 2019, 2022, 2025."
    );
  });

  it("gives both when the question is a repeat and also of a wider type", () => {
    const line = repeatsLine([group(), group({ tier: "type", sittings: ["NDA 1 2015", "NDA 1 2017", "NDA 2 2019", "NDA 1 2021", "NDA 2 2024"] })]);
    expect(line).toMatch(/^Repeats: this same question was asked in 3 papers: .*\. Questions of this type .* were asked 5 times: /);
  });

  it("is null when no plan groups it: V must not claim it was never asked again", () => {
    expect(repeatsLine([])).toBeNull();
    // A one-paper group says nothing about other papers either.
    expect(repeatsLine([group({ sittings: ["NDA 1 2017"] })])).toBeNull();
  });

  it("shortens a long list to its first and last papers with the count", () => {
    const sittings = Array.from({ length: 14 }, (_, i) => `${2010 + i}`);
    expect(repeatsLine([group({ tier: "type", sittings })])).toBe(
      "Repeats: questions of this type (same idea, own numbers) were asked 14 times: 2010, 2011, 2012 ... 2022, 2023."
    );
  });
});
