import { describe, it, expect } from "vitest";
import {
  fingerprint,
  pickDistractors,
  assembleOptions,
  looksMcqClean,
  stripMarkup,
  formatTraps,
  harvestFormulaConcept,
  harvestReferenceTable,
  harvestConcept,
  atomToRow,
  planSync,
  buildVerifyUpdate,
  type HarvestCtx,
  type QuizAtom,
} from "../scripts/quiz/atoms";
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

  it("maps an atom to its snake_case DB row", () => {
    const atom = harvestFormulaConcept(CTX, "X", "a=b", ["c=d", "e=f", "g=h"]);
    const row = atomToRow(atom);
    expect(row.atom_key).toBe(atom.atomId);
    expect(row.source_kind).toBe("formula");
    expect(row.subject_route).toBe("nda-maths");
    expect(row.source_fingerprint).toBe(atom.sourceFingerprint);
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
