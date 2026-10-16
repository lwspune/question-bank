import { describe, expect, it } from "vitest";
import { FIGURE_OPTION, figureAwareHash, figurePlan, optionTextForBank } from "../scripts/ssc-cgl/figures";

describe("figureAwareHash", () => {
  const h = "a".repeat(64);
  it("leaves a row without figures alone", () => {
    expect(figureAwareHash(h, [])).toBe(h);
  });
  it("separates two figure items that share their stock wording, and keeps a true repeat equal", () => {
    // "Select the correct mirror image of the given figure" with picture options and the
    // same answer letter: the text hash alone would file the second as a repeat of the first.
    const a = figureAwareHash(h, [Buffer.from("figure one")]);
    const b = figureAwareHash(h, [Buffer.from("figure two")]);
    expect(a).not.toBe(b);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    expect(figureAwareHash(h, [Buffer.from("figure one")])).toBe(a);
  });
  it("depends on the order of the figures (stem, then options A-D)", () => {
    expect(figureAwareHash(h, [Buffer.from("x"), Buffer.from("y")])).not.toBe(figureAwareHash(h, [Buffer.from("y"), Buffer.from("x")]));
  });
});

describe("optionTextForBank", () => {
  it("stores a picture option's placeholder as empty text, and any other text as written", () => {
    expect(FIGURE_OPTION).toBe("[figure]");
    expect(optionTextForBank("[figure]")).toBe("");
    expect(optionTextForBank("12 cm")).toBe("12 cm");
  });
});

describe("figurePlan", () => {
  const sheet = { number: 3, stemImages: ["p002_00.png"], options: [[], [], [], []] as string[][] };
  const opts = { number: 7, stemImages: ["p005_00.png"], options: [["p005_01.png"], ["p005_02.png"], ["p005_03.png"], ["p005_04.png"]] };

  it("takes the stem's image objects for figure: stem", () => {
    expect(figurePlan({ number: 3, figure: "stem", options: ["Z", "T", "V", "A"] }, sheet)).toEqual({ stem: ["p002_00.png"], options: null });
  });

  it("takes one image per option for figure: options, and needs the placeholder text", () => {
    const q = { number: 7, figure: "stem+options" as const, options: ["[figure]", "[figure]", "[figure]", "[figure]"] as [string, string, string, string] };
    expect(figurePlan(q, opts)).toEqual({ stem: ["p005_00.png"], options: [["p005_01.png"], ["p005_02.png"], ["p005_03.png"], ["p005_04.png"]] });
    expect(() => figurePlan({ ...q, options: ["[figure]", "x", "[figure]", "[figure]"] }, opts)).toThrow(/Q7 option B.*\[figure\]/);
  });

  it("refuses a declared figure the sheet has no image for", () => {
    expect(() => figurePlan({ number: 3, figure: "options", options: ["[figure]", "[figure]", "[figure]", "[figure]"] }, sheet)).toThrow(/Q3 option A has no image/);
    expect(() => figurePlan({ number: 7, figure: "stem", options: ["a", "b", "c", "d"] }, { ...opts, stemImages: [] })).toThrow(/Q7 stem has no image/);
  });

  it("refuses the placeholder on a row that declares no option figures", () => {
    expect(() => figurePlan({ number: 3, figure: "none", options: ["[figure]", "T", "V", "A"] }, sheet)).toThrow(/Q3.*\[figure\].*figure: none/);
  });

  it("plans nothing for figure: none", () => {
    expect(figurePlan({ number: 3, figure: "none", options: ["Z", "T", "V", "A"] }, sheet)).toEqual({ stem: null, options: null });
  });
});
