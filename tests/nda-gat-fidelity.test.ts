import { describe, expect, it } from "vitest";
import { gatNormText, matchVariant, summarise, type VariantQ } from "../scripts/nda-gat/fidelity";
import type { GatTQ } from "../scripts/nda-gat/lib";

const base = (over: Partial<GatTQ> = {}): GatTQ => ({
  number: 1,
  stem: "Despite the heavy rain, the match continued as scheduled.",
  options: [
    { label: "A", text: "Conjunction" },
    { label: "B", text: "Adverb" },
    { label: "C", text: "Noun" },
    { label: "D", text: "Preposition" },
  ],
  subject: "English",
  chapter: "Grammar",
  difficulty: "EASY",
  ...over,
});

const variant = (over: Partial<VariantQ> = {}): VariantQ => ({
  number: 6,
  stem: "Despite the heavy rain, the match continued as scheduled",
  options: [
    { label: "A", text: "Conjunction" },
    { label: "B", text: "Adverb" },
    { label: "C", text: "Noun" },
    { label: "D", text: "Preposition" },
  ],
  ...over,
});

describe("gatNormText", () => {
  it("folds an \\underline stem onto the plain word the terse pass writes", () => {
    expect(gatNormText("He gave \\(\\underline{\\text{both}}\\) candidates a chance")).toBe(
      gatNormText("He gave both candidates a chance")
    );
  });

  it("folds \\underline{\\textit{...}} too", () => {
    expect(gatNormText("\\(\\underline{\\textit{Jataka}}\\) tales")).toBe(gatNormText("Jataka tales"));
  });

  it("keeps code options distinguishable from each other", () => {
    const codes = ["RPQS", "RQPS", "QPRS", "SQPR"].map(gatNormText);
    expect(new Set(codes).size).toBe(4);
  });

  it("keeps I and II only distinct from I and III only", () => {
    expect(gatNormText("I and II only")).not.toBe(gatNormText("I and III only"));
  });

  it("folds LaTeX degree notation onto the word the terse pass writes", () => {
    // MEASURED FAILURE. Set A stores `\(45^\circ\)`, Set D's terse pass wrote
    // `45 degrees`. Without this fold the option score for that question was 0
    // and its pair was correctly REFUSED rather than guessed — the one
    // unmatched row in an otherwise perfect 133/133.
    expect(gatNormText("\\(45^\\circ\\)")).toBe(gatNormText("45 degrees"));
    expect(gatNormText("0^\\circ")).toBe(gatNormText("0 degree"));
    expect(gatNormText("60°")).toBe(gatNormText("60 degrees"));
  });

  it("still tells one angle from another after the fold", () => {
    const angles = ["\\(0^\\circ\\)", "\\(30^\\circ\\)", "\\(45^\\circ\\)", "\\(60^\\circ\\)"];
    expect(new Set(angles.map(gatNormText)).size).toBe(4);
  });

  it("folds the angstrom sign onto the plain letter the terse pass writes", () => {
    // MEASURED FAILURE, the same shape as the degree one above and found the
    // same way. Set A stores `\(4020\ \text{Å}\)`; Series C's terse pass wrote
    // `4020 A`, which FIDELITY_BRIEF.md expressly permits ("keep symbols
    // readable in plain text if you like"). The two folded to `4020å` and
    // `4020a`, so the option score for base Q66 was 0, the total fell under the
    // floor, and the pair was correctly REFUSED rather than guessed — the one
    // unmatched row in an otherwise perfect 149/149.
    expect(gatNormText("\\(4020\\ \\text{Å}\\)")).toBe(gatNormText("4020 A"));
    expect(gatNormText("5386 Å to 8978 Å")).toBe(gatNormText("5386 A to 8978 A"));
    // The LaTeX command form, which a future transcription may well use.
    expect(gatNormText("4020 \\AA")).toBe(gatNormText("4020 A"));
  });

  it("still tells one wavelength range from another after the fold", () => {
    // The guard that matters: this question's four options differ ONLY in their
    // numbers, so a fold that collapsed any two of them would let the matcher
    // build a wrong label map — which is worse than the refusal it replaces.
    const ranges = [
      "\\(3000\\ \\text{Å}\\) to \\(5000\\ \\text{Å}\\)",
      "\\(4020\\ \\text{Å}\\) to \\(6700\\ \\text{Å}\\)",
      "\\(5000\\ \\text{Å}\\) to \\(7000\\ \\text{Å}\\)",
      "\\(5386\\ \\text{Å}\\) to \\(8978\\ \\text{Å}\\)",
    ];
    expect(new Set(ranges.map(gatNormText)).size).toBe(4);
  });
});

describe("matchVariant", () => {
  it("MATCHES an identical question and reports the identity label map", () => {
    const [row] = matchVariant([variant()], [base()]);
    expect(row.base).toBe(1);
    expect(row.verdict).toBe("MATCH");
    expect(row.labels).toEqual({ A: "A", B: "B", C: "C", D: "D" });
  });

  it("reports PERMUTED when the same four options sit at different letters", () => {
    const v = variant({
      options: [
        { label: "A", text: "Preposition" },
        { label: "B", text: "Noun" },
        { label: "C", text: "Adverb" },
        { label: "D", text: "Conjunction" },
      ],
    });
    const [row] = matchVariant([v], [base()]);
    expect(row.base).toBe(1);
    expect(row.verdict).toBe("PERMUTED");
    expect(row.labels).toEqual({ A: "D", B: "C", C: "B", D: "A" });
  });

  it("reports OPTION_MISMATCH when one option text has no counterpart", () => {
    // The defect this whole pass exists to catch: a transcription that lost or
    // garbled one option. Matching still succeeds on the stem and the other
    // three, so only the label map can see it.
    const v = variant({
      options: [
        { label: "A", text: "Conjunction" },
        { label: "B", text: "Adverb" },
        { label: "C", text: "Noun" },
        { label: "D", text: "Interjection" },
      ],
    });
    const [row] = matchVariant([v], [base()]);
    expect(row.verdict).toBe("OPTION_MISMATCH");
    expect(row.labels).toBeNull();
  });

  it("is a BIJECTION — one base question is never claimed by two variant questions", () => {
    const twin = variant({ number: 7 });
    const rows = matchVariant([variant(), twin], [base()]);
    const claimed = rows.filter((r) => r.base !== null).map((r) => r.base);
    expect(new Set(claimed).size).toBe(claimed.length);
    expect(rows.filter((r) => r.base === null)).toHaveLength(1);
  });

  it("leaves a question with no counterpart UNMATCHED rather than forcing one", () => {
    const v = variant({
      number: 9,
      stem: "Which committee recommended constitutional recognition for local bodies?",
      options: [
        { label: "A", text: "K. Hanumanthaiah Committee" },
        { label: "B", text: "Veerappa Moily Committee" },
        { label: "C", text: "P.K. Thungon Committee" },
        { label: "D", text: "Kasturirangan Committee" },
      ],
    });
    const [row] = matchVariant([v], [base()]);
    expect(row.base).toBeNull();
    expect(row.verdict).toBe("UNMATCHED");
  });

  it("separates siblings that share an option set by their stems", () => {
    // Dozens of GAT questions carry exactly `I only / II only / Both / Neither`.
    // Options alone cannot tell them apart, which is why the stem is scored too.
    const opts = [
      { label: "A", text: "I only" },
      { label: "B", text: "II only" },
      { label: "C", text: "Both I and II" },
      { label: "D", text: "Neither I nor II" },
    ];
    const bases = [
      base({ number: 101, stem: "Consider the following statements regarding the PESA Act, 1996.", options: opts }),
      base({ number: 102, stem: "Consider the following statements regarding the Neighbourhood First Policy.", options: opts }),
    ];
    const vars = [
      variant({ number: 40, stem: "statements regarding the Neighbourhood First Policy", options: opts }),
      variant({ number: 41, stem: "statements regarding the PESA Act, 1996", options: opts }),
    ];
    const rows = matchVariant(vars, bases);
    expect(rows.find((r) => r.variant === 40)?.base).toBe(102);
    expect(rows.find((r) => r.variant === 41)?.base).toBe(101);
  });
});

describe("summarise", () => {
  it("counts every verdict and names the rows a human must read", () => {
    const rows = matchVariant(
      [
        variant({ number: 1 }),
        variant({
          number: 2,
          stem: "Which committee recommended constitutional recognition for local bodies?",
          options: [
            { label: "A", text: "K. Hanumanthaiah Committee" },
            { label: "B", text: "Veerappa Moily Committee" },
            { label: "C", text: "P.K. Thungon Committee" },
            { label: "D", text: "Kasturirangan Committee" },
          ],
        }),
      ],
      [base()]
    );
    const s = summarise(rows, [1]);
    expect(s.counts.MATCH).toBe(1);
    expect(s.counts.UNMATCHED).toBe(1);
    expect(s.needsReading).toEqual([2]);
    expect(s.unclaimedBase).toEqual([]);
  });

  it("reports base questions NO variant question claimed", () => {
    const rows = matchVariant([variant()], [base({ number: 1 }), base({ number: 2, stem: "unrelated entirely" })]);
    const s = summarise(rows, [1, 2]);
    expect(s.unclaimedBase).toEqual([2]);
  });
});
