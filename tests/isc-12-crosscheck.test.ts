import { describe, it, expect } from "vitest";
import {
  crossCheck,
  summarise,
  type DerivedAnswer,
  type OfficialAnswer,
} from "../scripts/isc-12-pyq/crosscheck";

/**
 * Diffing an independently derived answer against CISCE's official one.
 *
 * THE LOAD-BEARING DESIGN DECISION: only MCQ LETTERS are compared
 * mechanically. A free-response answer cannot be, because CISCE itself accepts
 * 60/343, 0.175, 0.18, 0.17 and the unevaluated product 5/7 x 4/7 x 3/7 as the
 * same answer — a string comparison would report four disagreements where there
 * are none, and a loose one would hide a real error. Those rows are routed to
 * NEEDS_ADJUDICATION for a human to read, and are EXCLUDED from the mechanical
 * accuracy rate rather than silently counted either way.
 *
 * That exclusion is stated in the output, because an accuracy figure computed
 * over a subset is not an accuracy figure for the corpus — the same mistake
 * CLAUDE.md records against "99.4% of temp writes".
 */

const mcq = (ref: string, label: string, value = ""): DerivedAnswer => ({
  ref,
  label,
  value,
  confidence: "HIGH",
});

describe("crossCheck — MCQ", () => {
  it("AGREEs when the derived letter matches the official one", () => {
    const rows = crossCheck([mcq("1(i)", "B", "Null matrix")], [
      { ref: "1(i)", labels: ["B"], value: "Null matrix" },
    ]);
    expect(rows[0].verdict).toBe("AGREE");
  });

  it("DISAGREEs when the letter differs", () => {
    const rows = crossCheck([mcq("1(i)", "A", "Unit matrix")], [
      { ref: "1(i)", labels: ["B"], value: "Null matrix" },
    ]);
    expect(rows[0].verdict).toBe("DISAGREE");
    expect(rows[0].official).toContain("B");
  });

  it("is case- and whitespace-insensitive on the letter", () => {
    const rows = crossCheck([mcq("1(i)", " b ")], [
      { ref: "1(i)", labels: ["B"], value: "Null matrix" },
    ]);
    expect(rows[0].verdict).toBe("AGREE");
  });
});

describe("crossCheck — the grace case", () => {
  /**
   * ISC 2025 Maths 1(v) is printed with TWO accepted answers, "(c) … / (a) …".
   * Either is correct, so either must AGREE. Flattening the key to one letter
   * would manufacture a disagreement against whichever branch the deriver
   * reached — and worse, would ship a question that marks a correct student
   * wrong.
   */
  const graceKey: OfficialAnswer[] = [
    { ref: "1(v)", labels: ["C", "A"], value: "…", grace: true },
  ];

  it("AGREEs on either accepted letter", () => {
    expect(crossCheck([mcq("1(v)", "C")], graceKey)[0].verdict).toBe("AGREE");
    expect(crossCheck([mcq("1(v)", "A")], graceKey)[0].verdict).toBe("AGREE");
  });

  it("still DISAGREEs on a letter outside the accepted set", () => {
    const row = crossCheck([mcq("1(v)", "D")], graceKey)[0];
    expect(row.verdict).toBe("DISAGREE");
  });

  it("marks the row as grace so the disclosure survives into the bank", () => {
    expect(crossCheck([mcq("1(v)", "C")], graceKey)[0].grace).toBe(true);
  });
});

describe("crossCheck — free response", () => {
  it("never auto-decides a non-MCQ row", () => {
    // Same answer, four printed forms. Any mechanical verdict here is a guess.
    const key: OfficialAnswer[] = [
      {
        ref: "1(xiv)",
        labels: [],
        value: "\\(\\frac{60}{343}\\)",
        acceptedAlternatives: ["0.175", "0.18"],
      },
    ];
    for (const derivedValue of ["\\(\\frac{60}{343}\\)", "0.175", "60/343"]) {
      const row = crossCheck(
        [{ ref: "1(xiv)", value: derivedValue, confidence: "HIGH" }],
        key
      )[0];
      expect(row.verdict).toBe("NEEDS_ADJUDICATION");
    }
  });

  it("surfaces every accepted form for the adjudicator to read", () => {
    const row = crossCheck(
      [{ ref: "1(xiv)", value: "0.175", confidence: "HIGH" }],
      [
        {
          ref: "1(xiv)",
          labels: [],
          value: "\\(\\frac{60}{343}\\)",
          acceptedAlternatives: ["0.175", "0.18"],
        },
      ]
    )[0];
    expect(row.official).toContain("60");
    expect(row.official).toContain("0.175");
  });
});

describe("crossCheck — coverage", () => {
  it("reports NO_KEY rather than dropping a derived answer with no official entry", () => {
    // A dropped row is an invisible gap; 2026 has no key at all and must read as
    // unverified, never as verified-and-fine.
    const rows = crossCheck([mcq("2(i)", "A")], []);
    expect(rows).toHaveLength(1);
    expect(rows[0].verdict).toBe("NO_KEY");
  });

  it("reports an official answer the deriver never addressed", () => {
    const rows = crossCheck([], [{ ref: "1(i)", labels: ["B"], value: "x" }]);
    expect(rows).toHaveLength(1);
    expect(rows[0].verdict).toBe("MISSING_DERIVATION");
  });
});

describe("summarise", () => {
  const rows = crossCheck(
    [
      mcq("1(i)", "B"),
      mcq("1(ii)", "D"),
      mcq("1(iii)", "A"), // wrong
      mcq("1(v)", "A"), // grace, accepted
      { ref: "1(xii)", value: "R = {(1,1)}", confidence: "HIGH" },
      mcq("9(i)", "C"), // no key
    ],
    [
      { ref: "1(i)", labels: ["B"], value: "" },
      { ref: "1(ii)", labels: ["D"], value: "" },
      { ref: "1(iii)", labels: ["C"], value: "" },
      { ref: "1(v)", labels: ["C", "A"], value: "", grace: true },
      { ref: "1(xii)", labels: [], value: "R = {(1,1),(2,2),(3,3)}" },
    ]
  );

  it("rates accuracy over the mechanically-comparable rows only", () => {
    const s = summarise(rows);
    expect(s.mechanical.agree).toBe(3); // 1(i), 1(ii), 1(v)
    expect(s.mechanical.disagree).toBe(1); // 1(iii)
    expect(s.mechanical.total).toBe(4);
    expect(s.mechanical.ratePct).toBeCloseTo(75, 5);
  });

  it("counts the excluded rows separately instead of hiding them", () => {
    const s = summarise(rows);
    expect(s.needsAdjudication).toBe(1); // 1(xii)
    expect(s.noKey).toBe(1); // 9(i)
    expect(s.missingDerivation).toBe(0);
  });

  it("refuses a rate when nothing is mechanically comparable", () => {
    // A rate over zero rows is not 100% and not 0% — it is absent, and saying
    // so beats printing a number that means nothing.
    const s = summarise(crossCheck([mcq("2(i)", "A")], []));
    expect(s.mechanical.total).toBe(0);
    expect(s.mechanical.ratePct).toBeNull();
  });
});
