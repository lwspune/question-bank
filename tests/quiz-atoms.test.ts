import { describe, it, expect } from "vitest";
import {
  fingerprint,
  pickDistractors,
  assembleOptions,
  looksMcqClean,
  stripMarkup,
  formatTraps,
  leadFormula,
  harvestFormulaConcept,
  harvestReferenceTable,
  harvestConcept,
  atomToRow,
  planSync,
  buildVerifyUpdate,
  orderForVariety,
  balancedSizes,
  type HarvestCtx,
  type QuizAtom,
} from "../src/lib/quiz/atoms";
import type { ConceptUnit, ReferenceTable } from "../src/app/notes/_types";

const CTX: HarvestCtx = {
  exam: "NDA",
  subjectRoute: "nda-maths",
  chapterSlug: "probability",
  subtopicSlug: "classical",
  conceptSlug: "classical-probability",
};

describe("fingerprint", () => {
  it("is deterministic and content-sensitive", () => {
    expect(fingerprint("a", "b")).toBe(fingerprint("a", "b"));
    expect(fingerprint("a", "b")).not.toBe(fingerprint("a", "c"));
  });
});

describe("pickDistractors", () => {
  it("excludes the correct value and dedupes, stably", () => {
    const pool = ["1/2", "1/3", "1/2", "1/4", "1/6"];
    const a = pickDistractors("seed", pool, "1/2", 3);
    expect(a).not.toContain("1/2");
    expect(new Set(a).size).toBe(a.length);
    expect(a.length).toBe(3);
    expect(pickDistractors("seed", pool, "1/2", 3)).toEqual(a); // stable
  });

  it("returns fewer than n when the pool is thin", () => {
    expect(pickDistractors("s", ["1/2", "1/2"], "1/2", 3)).toEqual([]);
  });
});

describe("assembleOptions", () => {
  it("places the correct value at the answer letter, with all four filled", () => {
    const r = assembleOptions("seedX", "C0", ["D1", "D2", "D3"]);
    expect(r).not.toBeNull();
    expect(r!.options[r!.answer]).toBe("C0");
    expect(Object.values(r!.options).sort()).toEqual(["C0", "D1", "D2", "D3"].sort());
    expect(assembleOptions("seedX", "C0", ["D1", "D2", "D3"])).toEqual(r); // deterministic
  });

  it("returns null with fewer than 3 distractors", () => {
    expect(assembleOptions("s", "C", ["D1", "D2"])).toBeNull();
  });
});

describe("looksMcqClean", () => {
  it("accepts short single-value answers", () => {
    expect(looksMcqClean("\\(\\dfrac{1}{2}\\)")).toBe(true);
    expect(looksMcqClean("\\(36\\)")).toBe(true);
  });
  it("rejects prose and set-valued answers", () => {
    expect(looksMcqClean("favourable measure / total measure")).toBe(false);
    expect(looksMcqClean("\\(\\{1,2,3,4,5,6\\}\\)")).toBe(false);
    expect(looksMcqClean("The region is continuous — infinitely many points")).toBe(false);
  });
});

describe("leadFormula", () => {
  it("returns a single formula unchanged", () => {
    expect(leadFormula("\\sigma = \\sqrt{\\dfrac{1}{n}\\sum (x_i-\\bar{x})^2}")).toBe(
      "\\sigma = \\sqrt{\\dfrac{1}{n}\\sum (x_i-\\bar{x})^2}"
    );
  });

  it("keeps only the lead expression of a \\qquad-joined bundle", () => {
    expect(
      leadFormula(
        "r = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y} \\qquad r_{(aX+b,\\,cY+d)} = \\text{sign}(ac)\\,r_{XY}"
      )
    ).toBe("r = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y}");
  });

  it("splits on \\quad and strips a trailing separator comma", () => {
    expect(
      leadFormula(
        "\\sum_{i=1}^{n}(x_i - \\bar{x}) = 0, \\quad \\text{Mode} \\approx 3\\,\\text{Median} - 2\\,\\text{Mean}"
      )
    ).toBe("\\sum_{i=1}^{n}(x_i - \\bar{x}) = 0");
  });

  it("never splits on a comma inside a function/argument list", () => {
    expect(leadFormula("\\text{Cov}(X,Y) = E[XY] - E[X]E[Y]")).toBe(
      "\\text{Cov}(X,Y) = E[XY] - E[X]E[Y]"
    );
  });
});

describe("harvestFormulaConcept", () => {
  it("builds an AUTO atom with sibling-formula distractors", () => {
    const atom = harvestFormulaConcept(
      CTX,
      "Classical probability",
      "P=\\dfrac{n(E)}{n(S)}",
      ["P=1-P(E')", "P(A\\cup B)=P(A)+P(B)", "P=n(E)\\times n(S)"]
    );
    expect(atom.status).toBe("auto");
    expect(atom.options).not.toBeNull();
    expect(atom.answer).not.toBeNull();
    expect(atom.options![atom.answer!]).toBe("\\(P=\\dfrac{n(E)}{n(S)}\\)");
    expect(atom.distractorSource).toBe("sibling");
    expect(atom.atomId).toBe("classical-probability:formula:0");
  });

  it("reduces bundled sibling formulas to their lead expression in the options", () => {
    const atom = harvestFormulaConcept(
      CTX,
      "Standard deviation",
      "\\sigma = \\sqrt{\\dfrac{1}{n}\\sum (x_i-\\bar{x})^2}",
      [
        "r = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y} \\qquad r_{(aX+b,\\,cY+d)} = \\text{sign}(ac)\\,r_{XY}",
        "y - \\bar{y} = b_{yx}(x - \\bar{x}) \\qquad x - \\bar{x} = b_{xy}(y - \\bar{y})",
        "\\sum (x_i - \\bar{x}) = 0, \\quad \\text{Mode} \\approx 3\\,\\text{Median} - 2\\,\\text{Mean}",
      ]
    );
    const distractorVals = Object.values(atom.options!).filter((v) => v !== atom.options![atom.answer!]);
    // No option still carries a \qquad/\quad bundle separator.
    for (const v of distractorVals) {
      expect(v).not.toMatch(/\\qquad|\\quad/);
    }
    expect(distractorVals).toContain("\\(r = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y}\\)");
  });

  it("falls back to needs_review when siblings are too few", () => {
    const atom = harvestFormulaConcept(CTX, "X", "a=b", ["c=d"]);
    expect(atom.status).toBe("needs_review");
    expect(atom.options).toBeNull();
  });
});

describe("harvestReferenceTable", () => {
  const table: ReferenceTable = {
    columns: ["Vitamin", "Deficiency"],
    rows: [
      { cells: ["A", "Night blindness"] },
      { cells: ["C", "Scurvy"] },
      { cells: ["D", "Rickets"] },
      { cells: ["B1", "Beri-beri"] },
    ],
  };
  it("emits one AUTO atom per row with sibling-row distractors", () => {
    const atoms = harvestReferenceTable(CTX, table);
    expect(atoms).toHaveLength(4);
    const scurvy = atoms.find((a) => a.correct === "Scurvy")!;
    expect(scurvy.status).toBe("auto");
    expect(scurvy.stem).toContain('Vitamin "C"');
    expect(Object.values(scurvy.options!)).toContain("Scurvy");
  });

  it("strips **bold** markdown out of reference cells", () => {
    expect(stripMarkup("**Epithelial**")).toBe("Epithelial");
    const atoms = harvestReferenceTable(CTX, {
      columns: ["Tissue", "Function"],
      rows: [
        { cells: ["**Epithelial**", "Covering and lining"] },
        { cells: ["Muscle", "Contraction"] },
        { cells: ["Nervous", "Signalling"] },
        { cells: ["Connective", "Support"] },
      ],
    });
    const epi = atoms[0];
    expect(epi.stem).toContain('"Epithelial"');
    expect(epi.stem).not.toContain("**");
  });
});

describe("formatTraps", () => {
  it("renders traps as 'title: body' and strips markup", () => {
    expect(
      formatTraps([{ title: "**Exclusive ≠ independent**", body: "Don't confuse them." }])
    ).toEqual(["Exclusive ≠ independent: Don't confuse them."]);
    expect(formatTraps(undefined)).toEqual([]);
  });
});

describe("harvestConcept", () => {
  it("emits practiceSet atoms as needs_review with candidate distractors", () => {
    const concept: ConceptUnit = {
      kind: "formula",
      slug: "classical-probability",
      name: "Classical probability",
      intuition: "x",
      definition: "y",
      formula: { label: "Classical probability", latex: "P=\\dfrac{n(E)}{n(S)}" },
      authoredExample: { prompt: "p", steps: ["s"], answer: "a" },
      practiceSet: [
        { prompt: "P(head)?", answer: "\\(\\dfrac{1}{2}\\)" },
        { prompt: "P(>4) on a die?", answer: "\\(\\dfrac{1}{3}\\)" },
        { prompt: "P(ace)?", answer: "\\(\\dfrac{1}{13}\\)" },
        { prompt: "P(red)?", answer: "\\(\\dfrac{1}{2}\\)" },
      ],
      traps: [{ title: "Mixing up exclusive and independent", body: "These are different." }],
    };
    const atoms = harvestConcept(CTX, concept, [
      { slug: "classical-probability", label: "Classical probability", latex: "P=\\dfrac{n(E)}{n(S)}" },
      { slug: "complement", label: "Complement", latex: "P=1-P(E')" },
      { slug: "addition", label: "Addition", latex: "P(A\\cup B)=P(A)+P(B)" },
      { slug: "geometric", label: "Geometric", latex: "P=\\dfrac{\\text{fav}}{\\text{total}}" },
    ]);
    const practice = atoms.filter((a) => a.sourceKind === "practiceSet");
    expect(practice).toHaveLength(4);
    expect(practice.every((a) => a.status === "needs_review")).toBe(true);
    expect(practice[0].candidateDistractors.length).toBeGreaterThan(0);
    // the formula concept also yields one auto atom
    expect(atoms.find((a) => a.sourceKind === "formula")!.status).toBe("auto");
    // a standalone trap atom is emitted, needs_review with no construct-correct
    const trapAtom = atoms.find((a) => a.sourceKind === "trap")!;
    expect(trapAtom.status).toBe("needs_review");
    expect(trapAtom.stem).toContain("Spot the common mistake");
    expect(trapAtom.correct).toBe("");
    // the trap hint rides on EVERY atom of the concept (distractor material)
    expect(atoms.every((a) => a.trapHints.length === 1)).toBe(true);
    expect(atoms[0].trapHints[0]).toContain("exclusive and independent");
  });

  it("maps an atom to its snake_case DB row (incl. theme)", () => {
    const atom = harvestFormulaConcept(CTX, "X", "a=b", ["c=d", "e=f", "g=h"]);
    const row = atomToRow(atom);
    expect(row.atom_key).toBe(atom.atomId);
    expect(row.source_kind).toBe("formula");
    expect(row.subject_route).toBe("nda-maths");
    expect(row.source_fingerprint).toBe(atom.sourceFingerprint);
    expect(row.theme).toBe("formula");
  });

  it("defaults theme from source kind", () => {
    expect(harvestFormulaConcept(CTX, "X", "a=b", ["c", "d", "e"]).theme).toBe("formula");
    const refAtoms = harvestReferenceTable(CTX, {
      columns: ["A", "B"],
      rows: [{ cells: ["1", "x"] }, { cells: ["2", "y"] }],
    });
    expect(refAtoms[0].theme).toBe("fact");
    const concept: ConceptUnit = {
      kind: "reference",
      slug: "c",
      name: "C",
      intuition: "i",
      definition: "d",
      table: { columns: ["A", "B"], rows: [{ cells: ["1", "x"] }] },
      practiceSet: [{ prompt: "p?", answer: "1" }],
      traps: [{ title: "t", body: "b" }],
    };
    const atoms = harvestConcept(CTX, concept, []);
    expect(atoms.find((a) => a.sourceKind === "practiceSet")!.theme).toBe("computation");
    expect(atoms.find((a) => a.sourceKind === "trap")!.theme).toBe("trap");
  });

  it("is idempotent — same concept harvests to identical atoms", () => {
    const concept: ConceptUnit = {
      kind: "reference",
      slug: "vitamins",
      name: "Vitamins",
      intuition: "x",
      definition: "y",
      table: {
        columns: ["Vitamin", "Deficiency"],
        rows: [
          { cells: ["A", "Night blindness"] },
          { cells: ["C", "Scurvy"] },
          { cells: ["D", "Rickets"] },
          { cells: ["B1", "Beri-beri"] },
        ],
      },
    };
    expect(harvestConcept(CTX, concept, [])).toEqual(harvestConcept(CTX, concept, []));
  });
});

describe("planSync (staleness-preserving upsert plan)", () => {
  const A = (atomId: string, fp: string): QuizAtom =>
    ({ atomId, sourceFingerprint: fp, status: "needs_review" } as QuizAtom);

  it("inserts new atoms", () => {
    const plan = planSync([A("k1", "fp1")], new Map());
    expect(plan.upserts).toHaveLength(1);
    expect(plan.skippedVerified).toBe(0);
    expect(plan.stale).toBe(0);
  });

  it("SKIPS a verified atom whose source is unchanged (preserves human work)", () => {
    const plan = planSync(
      [A("k1", "fp1")],
      new Map([["k1", { fingerprint: "fp1", status: "verified" }]])
    );
    expect(plan.upserts).toHaveLength(0);
    expect(plan.skippedVerified).toBe(1);
  });

  it("re-syncs (and counts stale) when the source fingerprint changed", () => {
    const plan = planSync(
      [A("k1", "fp2")],
      new Map([["k1", { fingerprint: "fp1", status: "verified" }]])
    );
    expect(plan.upserts).toHaveLength(1); // verify implicitly dropped
    expect(plan.stale).toBe(1);
  });

  it("refreshes an existing unverified atom in place", () => {
    const plan = planSync(
      [A("k1", "fp1")],
      new Map([["k1", { fingerprint: "fp1", status: "needs_review" }]])
    );
    expect(plan.upserts).toHaveLength(1);
    expect(plan.skippedVerified).toBe(0);
  });
});

describe("buildVerifyUpdate", () => {
  it("places the key at the answer letter with three distractors", () => {
    const r = buildVerifyUpdate("k:practiceSet:0", "\\(\\dfrac{1}{2}\\)", [
      "\\(\\dfrac{1}{3}\\)",
      "\\(\\dfrac{1}{4}\\)",
      "\\(\\dfrac{2}{3}\\)",
    ]);
    expect(r.options[r.answer]).toBe("\\(\\dfrac{1}{2}\\)");
    expect(Object.values(r.options).filter((v) => v === "\\(\\dfrac{1}{2}\\)")).toHaveLength(1);
  });

  it("strips a trailing period off the key", () => {
    const r = buildVerifyUpdate("k:1", "\\(\\dfrac{1}{3}\\).", ["a", "b", "c"]);
    expect(r.options[r.answer]).toBe("\\(\\dfrac{1}{3}\\)");
  });

  it("rejects a distractor equal to the key", () => {
    expect(() => buildVerifyUpdate("k:2", "5", ["5", "6", "7"])).toThrow(/equals the correct/i);
  });

  it("rejects duplicate distractors and wrong counts", () => {
    expect(() => buildVerifyUpdate("k:3", "5", ["6", "6", "7"])).toThrow(/distinct/i);
    expect(() => buildVerifyUpdate("k:4", "5", ["6", "7"])).toThrow(/exactly 3/i);
  });
});

describe("orderForVariety (quiz assembly)", () => {
  const k = (x: { kind: string }) => x.kind;
  it("interleaves kinds round-robin, preserving within-kind order", () => {
    const items = [
      { kind: "f", id: 1 }, { kind: "f", id: 2 }, { kind: "f", id: 3 },
      { kind: "p", id: 4 }, { kind: "p", id: 5 },
    ];
    expect(orderForVariety(items, k).map((x) => x.id)).toEqual([1, 4, 2, 5, 3]);
  });
});

describe("balancedSizes", () => {
  it("returns [] below the minimum quiz size", () => {
    expect(balancedSizes(11)).toEqual([]);
    expect(balancedSizes(0)).toEqual([]);
  });

  it("uses the whole pool when it fits one quiz (12..18)", () => {
    expect(balancedSizes(12)).toEqual([12]);
    expect(balancedSizes(16)).toEqual([16]);
    expect(balancedSizes(18)).toEqual([18]);
  });

  it("splits larger pools into near-equal chunks that consume everything", () => {
    expect(balancedSizes(28)).toEqual([14, 14]);
    expect(balancedSizes(65)).toEqual([17, 16, 16, 16]); // sum 65
    expect(balancedSizes(24)).toEqual([12, 12]);
  });

  it("handles the dead zone (max < n < 2·min) with one full quiz + carry", () => {
    expect(balancedSizes(20)).toEqual([18]); // 2 carry forward
    expect(balancedSizes(23)).toEqual([18]); // 5 carry forward
  });

  it("keeps every chunk within [12,18] and never over-allocates", () => {
    for (let n = 12; n <= 200; n++) {
      const sizes = balancedSizes(n);
      expect(sizes.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(n);
      for (const s of sizes) {
        expect(s).toBeGreaterThanOrEqual(12);
        expect(s).toBeLessThanOrEqual(18);
      }
    }
  });
});
