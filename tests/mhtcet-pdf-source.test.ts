import { describe, expect, it } from "vitest";
import { subjectForNumberInOrder, textLayerFidelity, wordsOf } from "../scripts/mhtcet/pdfSource";

describe("subjectForNumberInOrder", () => {
  const order2026 = ["Chemistry", "Maths", "Physics"] as const;
  it("maps 1-50 / 51-100 / 101-150 to the paper's own section order", () => {
    expect(subjectForNumberInOrder(1, order2026)).toBe("Chemistry");
    expect(subjectForNumberInOrder(50, order2026)).toBe("Chemistry");
    expect(subjectForNumberInOrder(51, order2026)).toBe("Maths");
    expect(subjectForNumberInOrder(100, order2026)).toBe("Maths");
    expect(subjectForNumberInOrder(101, order2026)).toBe("Physics");
    expect(subjectForNumberInOrder(150, order2026)).toBe("Physics");
  });
  it("refuses a number outside 1-150", () => {
    expect(() => subjectForNumberInOrder(0, order2026)).toThrow();
    expect(() => subjectForNumberInOrder(151, order2026)).toThrow();
  });
});

describe("wordsOf", () => {
  it("keeps prose words and the text inside math macros, drops macro names and numbers", () => {
    expect(wordsOf("mass of \\(\\mathrm{AgNO_3} = 169\\) g/mol")).toEqual(["mass", "of", "agno", "mol"]);
  });
  it("drops single letters (option labels, variables) as noise", () => {
    expect(wordsOf("(A) x and y")).toEqual(["and"]);
  });
  it("keeps letters written as a superscript (1/20^{th} prints its 'th' as text)", () => {
    expect(wordsOf("\\(1/20^{th}\\) of its value")).toEqual(["th", "of", "its", "value"]);
  });

  it("does not leak LaTeX command names such as frac or times", () => {
    expect(wordsOf("\\(\\frac{1}{2} \\times 10^{6}\\,\\mathrm{ms^{-1}}\\)")).toEqual(["ms"]);
  });
});

describe("textLayerFidelity", () => {
  const layer = "What is the approximate mass of the precipitate formed when mL of solution of AgNO is mixed";

  it("passes a faithful transcription (math numbers are not in the layer, so they cannot be missing)", () => {
    const t =
      "What is the approximate mass of the precipitate formed when \\(50\\) mL of \\(16.9\\%\\) solution of \\(\\mathrm{AgNO_3}\\) is mixed";
    const r = textLayerFidelity(t, layer);
    expect(r.missing).toEqual([]);
    expect(r.extra).toEqual([]);
  });

  it("names a word the PDF has but the transcription dropped", () => {
    const t = "What is the mass of the precipitate formed when \\(50\\) mL of solution of \\(\\mathrm{AgNO_3}\\) is mixed";
    expect(textLayerFidelity(t, layer).missing).toEqual(["approximate"]);
  });

  it("counts repeats: a word the layer has twice must appear twice", () => {
    const r = textLayerFidelity("the mass", "the mass of the gas");
    expect(r.missing).toEqual(["of", "the", "gas"]);
  });

  it("names a PROSE word the transcription added that the PDF does not have", () => {
    const t = "What is the approximate total mass of the precipitate formed when mL of solution of AgNO is mixed";
    expect(textLayerFidelity(t, layer).extra).toEqual(["total"]);
  });

  it("does not report words inside math as extra (the layer omits most math)", () => {
    const t = "What is the approximate mass of the precipitate formed when mL of solution of AgNO is mixed \\(\\sin x\\)";
    expect(textLayerFidelity(t, layer).extra).toEqual([]);
  });

  it("ignores the PDF's own chrome (question label, type line, solution link)", () => {
    const r = textLayerFidelity("Which group", "Q3.\nMCQ (Single Correct Answer)\nWhich group\nOpen solution");
    expect(r.missing).toEqual([]);
  });

  it("ignores a section header that falls inside the last question before it", () => {
    const r = textLayerFidelity("Toothpaste", "Toothpaste Mathematics 50 questions");
    expect(r.missing).toEqual([]);
  });
});
