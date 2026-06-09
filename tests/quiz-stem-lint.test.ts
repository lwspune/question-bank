import { describe, it, expect } from "vitest";
import { flagStem, stripMathZones } from "@/lib/quiz/stemLint";

describe("stripMathZones", () => {
  it("removes inline math so prose checks work on words only", () => {
    expect(stripMathZones("Valid \\(b_{yx}\\cdot b_{xy}\\)?").trim()).toBe("Valid ?");
  });
});

describe("flagStem — flags NON-self-contained stems", () => {
  // The real Statistics atoms that prompted this (sequence-dependent prompts
  // lifted out of the notes and shuffled).
  it("flags a criterion-less choice question", () => {
    expect(flagStem("Pairing A product \\(0.8\\), pairing B product \\(1.25\\). Which is correct?")).not.toEqual([]);
  });

  it("flags a definite back-reference to an undefined entity", () => {
    expect(flagStem("Why can the wrong pairing exceed \\(1\\)?")).not.toEqual([]);
  });

  it("flags a deictic opener", () => {
    expect(flagStem("These give the same answer — true or false?")).not.toEqual([]);
  });

  it("flags an ultra-short telegraphic stem", () => {
    expect(flagStem("Valid?")).not.toEqual([]);
  });
});

describe("flagStem — passes self-contained stems", () => {
  it("passes a prompt that names its quantity", () => {
    expect(flagStem("A pairing gives slope product \\(1.5\\). Valid \\(b_{yx}\\cdot b_{xy}\\)?")).toEqual([]);
  });

  it("passes 'The product of the two regression slopes equals?'", () => {
    expect(flagStem("The product of the two regression slopes equals?")).toEqual([]);
  });

  it("passes a full self-contained sentence", () => {
    expect(
      flagStem(
        "Two lines of regression are \\(x + 4y - 7 = 0\\) and \\(2x + 5y - 9 = 0\\). Identify which is \\(y\\) on \\(x\\) and report both slopes."
      )
    ).toEqual([]);
  });

  it("passes a normal recall question", () => {
    expect(flagStem("What is the variance of the first \\(n\\) natural numbers?")).toEqual([]);
  });

  it("does not flag 'the two' / non-deictic 'the'", () => {
    expect(flagStem("Find the median of \\(5, 9, 2, 7, 1\\).")).toEqual([]);
  });

  // Real false-positives caught when first running quiz:lint on the live bank.
  it("does not flag the standard harvest template ('Which of the following…')", () => {
    expect(flagStem("Which of the following is the formula for Standard Deviation?")).toEqual([]);
  });

  it("does not flag 'the same unit as the data'", () => {
    expect(
      flagStem("A data set is measured in kilograms. Which measure has the SAME unit as the data?")
    ).toEqual([]);
  });

  it("does not flag a short but math-complete stem", () => {
    expect(flagStem("Mode of \\(5, 5, 6, 6, 9\\)?")).toEqual([]);
    expect(flagStem("GM of \\(2\\) and \\(8\\)?")).toEqual([]);
    expect(flagStem("\\(\\sum_{i=1}^{3} i = ?\\)")).toEqual([]);
  });
});
