/**
 * Written-paper blueprints: the marks identity is the load-bearing invariant.
 *
 * A blueprint is only trustworthy if `sum(attempt x marksEach) === maxMarks`.
 * Every registered blueprint is asserted against that below, so a typo in the
 * registry fails the gate rather than printing a paper whose marks don't add up.
 */
import { describe, it, expect } from "vitest";
import {
  validateBlueprint,
  slotMarks,
  blueprintTotalMarks,
} from "@/lib/papers/written/validate";
import {
  WRITTEN_BLUEPRINTS,
  blueprintsFor,
  getBlueprintById,
  variantsFor,
} from "@/lib/papers/written/registry";
import type { WrittenBlueprint, WrittenSlot } from "@/lib/papers/written/types";

function slot(over: Partial<WrittenSlot> = {}): WrittenSlot {
  return {
    key: "q1a",
    code: "Q.1 (A)",
    label: "Choose the correct alternative",
    print: 4,
    attempt: 4,
    marksEach: 1,
    format: "mcq",
    ...over,
  };
}

function blueprint(over: Partial<WrittenBlueprint> = {}): WrittenBlueprint {
  return {
    id: "test-bp",
    board: "Maharashtra State Board",
    std: 10,
    subjects: ["Algebra"],
    variant: "annual",
    label: "Test",
    durationMins: 120,
    maxMarks: 4,
    instructions: [],
    slots: [slot()],
    ...over,
  };
}

describe("slotMarks", () => {
  it("is attempt x marksEach — the ATTEMPTED count, not the printed one", () => {
    // Internal choice: 5 printed, 4 attempted, 2 marks each => 8, not 10.
    expect(slotMarks(slot({ print: 5, attempt: 4, marksEach: 2 }))).toBe(8);
  });
});

describe("validateBlueprint", () => {
  it("accepts a blueprint whose slot marks sum to maxMarks", () => {
    const r = validateBlueprint(blueprint());
    expect(r.valid).toBe(true);
    expect(r.errors).toEqual([]);
    expect(r.totalMarks).toBe(4);
  });

  it("reports totalMarks even when invalid, so the UI can show a live meter", () => {
    const r = validateBlueprint(blueprint({ maxMarks: 40 }));
    expect(r.valid).toBe(false);
    expect(r.totalMarks).toBe(4);
    expect(r.errors.join(" ")).toMatch(/4.*40|40.*4/);
  });

  it("rejects a slot that asks for more answers than it prints", () => {
    const r = validateBlueprint(
      blueprint({ slots: [slot({ print: 2, attempt: 3, marksEach: 1 })], maxMarks: 3 })
    );
    expect(r.valid).toBe(false);
    expect(r.errors.join(" ")).toMatch(/attempt/i);
  });

  it("rejects duplicate slot keys — section_key must identify one slot", () => {
    const r = validateBlueprint(
      blueprint({
        slots: [slot({ key: "dup" }), slot({ key: "dup" })],
        maxMarks: 8,
      })
    );
    expect(r.valid).toBe(false);
    expect(r.errors.join(" ")).toMatch(/duplicate/i);
  });

  it("rejects non-positive marks, counts, and durations", () => {
    expect(validateBlueprint(blueprint({ slots: [slot({ marksEach: 0 })], maxMarks: 0 })).valid).toBe(false);
    expect(validateBlueprint(blueprint({ slots: [slot({ attempt: 0 })], maxMarks: 0 })).valid).toBe(false);
    expect(validateBlueprint(blueprint({ durationMins: 0 })).valid).toBe(false);
  });

  it("rejects a blueprint with no slots", () => {
    const r = validateBlueprint(blueprint({ slots: [], maxMarks: 0 }));
    expect(r.valid).toBe(false);
    expect(r.errors.join(" ")).toMatch(/slot/i);
  });

  it("rejects a blueprint that serves no subject", () => {
    expect(validateBlueprint(blueprint({ subjects: [] })).valid).toBe(false);
  });
});

describe("WRITTEN_BLUEPRINTS registry", () => {
  it("is non-empty", () => {
    expect(WRITTEN_BLUEPRINTS.length).toBeGreaterThan(0);
  });

  // The gate: a registry typo can never reach a printed paper.
  it("EVERY registered blueprint satisfies the marks identity", () => {
    for (const bp of WRITTEN_BLUEPRINTS) {
      const r = validateBlueprint(bp);
      expect(r.valid, `${bp.id}: ${r.errors.join("; ")}`).toBe(true);
      expect(blueprintTotalMarks(bp)).toBe(bp.maxMarks);
    }
  });

  it("has unique ids", () => {
    const ids = WRITTEN_BLUEPRINTS.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique slot codes within each blueprint", () => {
    for (const bp of WRITTEN_BLUEPRINTS) {
      const codes = bp.slots.map((s) => s.code);
      expect(new Set(codes).size, bp.id).toBe(codes.length);
    }
  });

  it("carries the verified Maharashtra SSC 40-mark annual pattern for Algebra", () => {
    const [bp] = blueprintsFor({
      board: "Maharashtra State Board",
      std: 10,
      subject: "Algebra",
      variant: "annual",
    });
    expect(bp).toBeDefined();
    expect(bp.maxMarks).toBe(40);
    // Verified against 10 years of ingested SSC papers: 4+4+4+8+3+6+8+3 = 40.
    expect(bp.slots.map((s) => slotMarks(s))).toEqual([4, 4, 4, 8, 3, 6, 8, 3]);
  });

  it("serves Geometry from the same Maths pattern (shared shape, not a copy)", () => {
    const algebra = blueprintsFor({
      board: "Maharashtra State Board",
      std: 10,
      subject: "Algebra",
      variant: "annual",
    })[0];
    const geometry = blueprintsFor({
      board: "Maharashtra State Board",
      std: 10,
      subject: "Geometry",
      variant: "annual",
    })[0];
    expect(geometry.id).toBe(algebra.id);
  });

  it("carries the 40-mark Science pattern for both Science papers", () => {
    for (const subject of ["Science and Technology I", "Science and Technology II"]) {
      const [bp] = blueprintsFor({
        board: "Maharashtra State Board",
        std: 10,
        subject,
        variant: "annual",
      });
      expect(bp, subject).toBeDefined();
      expect(bp.maxMarks).toBe(40);
      // Six slots — the modern paper splits Q.2 into (A) and (B).
      // Verified against the 2020 + 2022-2026 sittings: 5+5+4+6+15+5 = 40.
      expect(bp.slots.map((s) => slotMarks(s))).toEqual([5, 5, 4, 6, 15, 5]);
    }
  });
});

describe("blueprintsFor", () => {
  it("returns [] for a subject with no blueprint", () => {
    expect(
      blueprintsFor({ board: "Maharashtra State Board", std: 10, subject: "History" })
    ).toEqual([]);
  });

  // Std 11 WAS an honest gap ("no Class 11 corpus") until the mh-sb-11 Class-11
  // Maths corpus landed. What remains true is narrower and is what we pin now:
  // Class 11 has no Algebra/Geometry split — that is an SSC-only division — so
  // asking for "Algebra" at Std 11 must still return nothing.
  it("returns [] for Std 11 Algebra — Class 11 Maths is a single subject", () => {
    expect(
      blueprintsFor({ board: "Maharashtra State Board", std: 11, subject: "Algebra" })
    ).toEqual([]);
  });

  it("offers the Class-11 unit-test pattern for Std 11 Mathematics", () => {
    const found = blueprintsFor({
      board: "Maharashtra State Board",
      std: 11,
      subject: "Mathematics",
    });
    expect(found.map((b) => b.id)).toEqual(["mh-sb-11-maths-unit-25"]);
    expect(found[0].maxMarks).toBe(25);
    expect(found[0].variant).toBe("unit");
  });

  it("narrows by maxMarks — the marks picker is a filter over templates", () => {
    const all = blueprintsFor({
      board: "Maharashtra State Board",
      std: 10,
      subject: "Algebra",
    });
    const forty = blueprintsFor({
      board: "Maharashtra State Board",
      std: 10,
      subject: "Algebra",
      maxMarks: 40,
    });
    expect(all.length).toBeGreaterThan(forty.length);
    expect(forty.every((b) => b.maxMarks === 40)).toBe(true);
  });

  it("ignores an unknown board or missing argument", () => {
    expect(blueprintsFor({ board: "ICSE", std: 10, subject: "Algebra" })).toEqual([]);
    expect(blueprintsFor({ board: null, std: 10, subject: "Algebra" })).toEqual([]);
    expect(
      blueprintsFor({ board: "Maharashtra State Board", std: 10, subject: "" })
    ).toEqual([]);
  });
});

describe("variantsFor", () => {
  it("lists the exam types available for a subject, in unit->midyear->annual order", () => {
    expect(
      variantsFor({ board: "Maharashtra State Board", std: 10, subject: "Algebra" })
    ).toEqual(["unit", "midyear", "annual"]);
  });

  it("is empty for a subject with no blueprints", () => {
    expect(
      variantsFor({ board: "CBSE", std: 12, subject: "Astrophysics" })
    ).toEqual([]);
  });
});

describe("getBlueprintById", () => {
  it("round-trips every registered id", () => {
    for (const bp of WRITTEN_BLUEPRINTS) {
      expect(getBlueprintById(bp.id)?.id).toBe(bp.id);
    }
  });

  it("returns null for an unknown id", () => {
    expect(getBlueprintById("nope")).toBeNull();
    expect(getBlueprintById("")).toBeNull();
  });
});
