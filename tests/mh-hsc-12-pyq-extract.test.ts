import { describe, it, expect } from "vitest";
import { ITEM, splitOptions, applyTagOverride, applyDocumentRepairs, rebalanceAcrossCut } from "../scripts/mh-hsc-12-pyq/extract";

// Every string below is REAL — observed in the Maths or Physics chapterwise
// compilation during analysis, never invented. The two sources disagree on both
// of the conventions this file pins:
//
//   numbering  Maths is a Word LIST, so pandoc emits "1.  ". The Physics
//              Semiconductor Devices chapter is plain paragraphs, so pandoc
//              ESCAPES the dot and emits "1\.  ". A rule that misses the second
//              form yields ZERO items for that chapter, silently.
//   options    Maths prints "(a)-(d)". Physics prints "(A)-(D)". A rule that
//              misses the second form leaves all ~89 Physics MCQs as
//              free-response rows with the option block glued into the stem —
//              and no downstream gate fires, because a subjective row is
//              allowed to have no options.

describe("ITEM — the question-start rule", () => {
  it("matches Maths' markdown-list numbering", () => {
    expect(ITEM.test("1.  A particle performing linear S.H.M. has a period")).toBe(true);
    expect(ITEM.exec("7.  If $A = \\{1,2,3\\}$ then which is not true?")![1]).toBe("7");
  });

  it("matches the ESCAPED numbering pandoc emits for a non-list paragraph", () => {
    expect(ITEM.test("1\\. A pure semiconductor is \\_\\_\\_\\_\\_\\_\\_\\_.")).toBe(true);
    expect(ITEM.exec("12\\. Distinguish between p - type and n - type")![1]).toBe("12");
  });

  it("does not match prose that merely opens with a number", () => {
    expect(ITEM.test("2.5 kg of water is heated to")).toBe(false);
    expect(ITEM.test("### 4. Specific Heats and Degrees of Freedom")).toBe(false);
  });
});

describe("splitOptions — Maths (lowercase), pinning shipped behaviour", () => {
  const block =
    "If $A = \\{1,2,3,4,5\\}$ then which of the following is not true? " +
    "(a) $\\exists x \\in A$ such that $x + 3 = 8$ " +
    "(b) $\\exists x \\in A$ such that $x + 2 < 9$ " +
    "(c) $\\forall x \\in A,x + 6 \\geq 9$ " +
    "(d) $\\exists x \\in A$ such that $x + 6 < 10$";

  it("splits a full (a)-(d) run and uppercases the label", () => {
    const { stem, options } = splitOptions(block);
    expect(options?.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(stem).toContain("which of the following is not true?");
    expect(stem).not.toContain("(a)");
    expect(options![2].text).toContain("\\forall x \\in A");
  });

  it("leaves a lone (a) as prose — it is not an option list", () => {
    const prose = "Calculate the resistance required to convert it, (a) into an ammeter of 0.5 A range.";
    expect(splitOptions(prose).options).toBeUndefined();
  });

  it("leaves an incomplete run as prose", () => {
    expect(splitOptions("Compare (a) the flux and (b) the emf.").options).toBeUndefined();
  });
});

describe("splitOptions — Physics (uppercase)", () => {
  it("splits a full (A)-(D) run printed inline", () => {
    // 5. Oscillations, Q. 1(v) March 2018
    const block =
      "If the particle starts its motion from mean position, the phase difference " +
      "between displacement and acceleration is ________. " +
      "(A) $2\\pi$ rad (B) $\\frac{\\pi}{2}$ rad (C) $\\pi$ rad (D) $\\frac{\\pi}{4}$ rad";
    const { stem, options } = splitOptions(block);
    expect(options?.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(options![1].text).toContain("\\frac{\\pi}{2}");
    expect(stem).toContain("phase difference");
    expect(stem).not.toContain("(A)");
  });

  it("splits an ESCAPED (A)-(D) run, the Semiconductor Devices form", () => {
    // 16. Semiconductor Devices, Q. 5(vi) March 2018 — pandoc escapes the parens
    // in a plain paragraph, and the run is split across lines.
    const block =
      "A pure semiconductor is ________. " +
      "\\(A\\) an extrinsic semiconductor (B) an intrinsic semiconductor " +
      "\\(C\\) p-type semiconductor (D) n-type semiconductor";
    const { options } = splitOptions(block);
    expect(options?.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(options![1].text).toBe("an intrinsic semiconductor");
  });

  it("leaves a lone (A) as prose — a matrix name is not an option list", () => {
    expect(splitOptions("Find the value of $\\det(A)$ when (A) is singular.").options).toBeUndefined();
  });

  it("finds the run even when a stray label precedes it", () => {
    // The shipped rule anchors on the FIRST "A" it sees, so a matrix name or a
    // surviving provenance fragment ahead of the real run made the whole block
    // fail to split. Anchor on the first position whose next four are A,B,C,D.
    const block =
      "For a matrix (A), which statement holds? " +
      "(A) it is singular (B) it is symmetric (C) it is orthogonal (D) none of these";
    const { options } = splitOptions(block);
    expect(options?.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(options![0].text).toBe("it is singular");
  });
});

describe("applyTagOverride — repairing a malformed provenance tag", () => {
  // Kinetic Theory of Gases and Radiation, item 24. The compilation prints
  // "[Q. 4, B March 2018]" — the comma landed before the sub-part instead of
  // before the month, so parseProvenanceTag finds no month and the extractor
  // DROPS the whole question. The corrected form is what the same compilation
  // uses for the sibling sub-parts of that paper ("Q. 8. B", "Q. 4. OR B").
  const fixes = [
    {
      ref: "kinetic-theory-12-pyq#24",
      from: "\\[Q. 4, B March 2018\\]",
      to: "\\[Q. 4. B, March 2018\\]",
      why: "comma misplaced; March 2018 numbers its sub-parts 4.A / 4.B",
    },
  ];

  it("rewrites the tag for the named ref", () => {
    // pandoc ESCAPES the brackets, so the override matches the escaped form.
    const raw = "24. A body cools from 80 to 70 in 5 minutes \\[Q. 4, B March 2018\\].";
    const out = applyTagOverride(raw, "kinetic-theory-12-pyq#24", fixes);
    expect(out).toContain("\\[Q. 4. B, March 2018\\]");
    expect(out).toContain("A body cools from 80 to 70");
  });

  it("leaves every other ref untouched", () => {
    const raw = "25. Compare the rate of loss of heat \\[Q. 12, February 2023\\].";
    expect(applyTagOverride(raw, "kinetic-theory-12-pyq#25", fixes)).toBe(raw);
  });

  it("REFUSES a stale entry rather than silently doing nothing", () => {
    // If the source is corrected upstream, or the item renumbers, the override
    // must fail loudly — a silent no-op leaves a repair that looks applied.
    const raw = "24. A body cools from 80 to 70 in 5 minutes \\[Q. 4. B, March 2018\\].";
    expect(() => applyTagOverride(raw, "kinetic-theory-12-pyq#24", fixes)).toThrow(/stale/i);
  });

  it("is a no-op when there are no fixes at all — the Maths path", () => {
    const raw = "7.  If $A$ is a set \\[Q. 1. (i), 2025\\]";
    expect(applyTagOverride(raw, "logic-12-pyq#7", [])).toBe(raw);
  });
});

describe("splitOptions — cutting through a math zone", () => {
  // The compilation sometimes typesets the option LABEL inside the math zone:
  //   $(A)\ vt$ (B) $\left( \frac{v}{D} \right) - t$ ...
  // which normalises to  \((A)\ vt\) (B) \(...\)  — so the cut at "(A)" lands
  // INSIDE the zone, leaving the stem with a dangling "\(" and option A with an
  // orphan "\)". An unbalanced delimiter is a KaTeX parse error that takes the
  // whole card down. 18 of the 89 Physics MCQs are shaped this way.

  const bal = (s: string) => s.split("\\(").length - s.split("\\)").length;

  it("moves a dangling open delimiter from the stem into the first option", () => {
    // Rotational Dynamics, Q. 1(iii) March 2018
    const block =
      "Total angular displacement is ________. " +
      "\\((A)\\ vt\\) (B) \\(\\left( \\frac{v}{D} \\right) - t\\) " +
      "(C) \\(\\frac{vt}{2D}\\) (D) \\(\\frac{2vt}{D}\\)";
    const { stem, options } = splitOptions(block);

    expect(bal(stem)).toBe(0);
    expect(options).toHaveLength(4);
    for (const o of options!) expect(bal(o.text)).toBe(0);
    // The maths must survive the move, not merely balance.
    expect(options![0].text).toContain("vt");
    expect(options![3].text).toContain("\\frac{2vt}{D}");
    expect(stem).toContain("Total angular displacement");
    expect(stem).not.toContain("\\(");
  });

  it("leaves an already-balanced split untouched — the Maths path", () => {
    const block =
      "The area bounded by the line is ________. " +
      "(a) \\(\\frac{2}{17}\\) (b) \\(8\\) (c) \\(\\frac{17}{2}\\) (d) \\(\\frac{1}{2}\\)";
    const { stem, options } = splitOptions(block);
    expect(stem).toBe("The area bounded by the line is ________. ");
    expect(options!.map((o) => o.text)).toEqual([
      "\\(\\frac{2}{17}\\)",
      "\\(8\\)",
      "\\(\\frac{17}{2}\\)",
      "\\(\\frac{1}{2}\\)",
    ]);
  });

  it("drops a spacing-only zone rather than leaving an empty one on the card", () => {
    // Rotational Dynamics — the compilation pads the run: $\ \ \ \ \ \ (A)\ mg$
    const block =
      "The difference in tension is ________. " +
      "\\(\\ \\ \\ \\ (A)\\ mg\\) (B) \\(2\\text{ mg}\\) (C) \\(3\\text{ mg}\\) (D) \\(6\\text{ mg}\\)";
    const { stem, options } = splitOptions(block);
    expect(bal(stem)).toBe(0);
    expect(stem).not.toContain("\\(");
    expect(options![0].text).toContain("mg");
    for (const o of options!) expect(bal(o.text)).toBe(0);
  });

  it("closes and REOPENS rather than moving real content into the next option", () => {
    // Dual Nature — the zone carries option B's value AND option C's label:
    //   (B) $\frac{h\nu}{c}\ \ (C)\ hE$
    // Moving the tail would hand B's fraction to C. Close at the cut instead.
    const block =
      "The momentum of a photon is ________. (A) \\(h\\nu\\) " +
      "(B) \\(\\frac{h\\nu}{c}\\ \\ (C)\\ hE\\) (D) \\(h\\lambda\\)";
    const { options } = splitOptions(block);
    expect(options).toHaveLength(4);
    for (const o of options!) expect(bal(o.text)).toBe(0);
    expect(options![1].text).toContain("\\frac{h\\nu}{c}");
    expect(options![2].text).toContain("hE");
    expect(options![2].text).not.toContain("\\frac{h\\nu}{c}");
  });

  it("REFUSES rather than guessing when the imbalance is not a clean cut", () => {
    // A genuinely malformed source — the zone never closes anywhere — must not
    // be silently "repaired" into something that merely parses.
    const block = "Broken \\( zone (A) one (B) two (C) three (D) four";
    const { options, unsplittable } = splitOptions(block);
    expect(options).toBeUndefined();
    expect(unsplittable).toMatch(/unbalanced/i);
  });

  it("REFUSES when the cut falls inside a \\text{...} group", () => {
    // Magnetic Fields — three labels inside ONE zone, with \text{} spanning the
    // cut: $(A)\ 1\text{ Wb (B) }50\text{ Wb (C) }100\text{ Wb}$. Splitting here
    // balances the delimiters and still emits invalid LaTeX, so the row is
    // returned unsplit and flagged for a hand recovery via defects.json.
    const block =
      "The magnetic flux will be ________. " +
      "\\((A)\\ 1\\text{ Wb (B) }50\\text{ Wb (C) }100\\text{ Wb}\\) (D) \\(200\\text{ Wb}\\)";
    const { stem, options, unsplittable } = splitOptions(block);
    expect(options).toBeUndefined();
    expect(unsplittable).toMatch(/brace|defects\.json/i);
    // The block is returned WHOLE — nothing is dropped on the way out.
    expect(stem).toBe(block);
  });

  it("rebalanceAcrossCut itself still throws — the refusal is a caller decision", () => {
    expect(() => rebalanceAcrossCut(["a \\( b", "c", "d", "e", "f"])).toThrow(/unbalanced/i);
  });
});

describe("splitOptions — a CORRUPTED option-label run", () => {
  // The gap this closes is the one this file's own header predicts: a row that
  // fails to split ships as free-response and "no downstream gate fires,
  // because a subjective row is allowed to have no options".
  //
  // Found live in thermodynamics-12-pyq#2 (Q.1(i), February 2025). The
  // compilation typed the THIRD label as (B) instead of (C), so the A-D anchor
  // never matches, splitOptions returned a bare stem, and the row shipped as a
  // subjective question with its four alternatives glued into the stem. Worse,
  // promote.ts then DROPPED the authoring pass's defect flag as "stale",
  // because probeRow cannot see it — the corruption is the reason the row has
  // no options, so OPTION_LEAK (which needs the row's own option values) can
  // never fire on it.
  const REAL =
    '"If two systems are each in thermal equilibrium with a third system, they ' +
    'are also in thermal equilibrium with each other." This statement refers to: ' +
    "\\(A\\) zeroth law of thermodynamics (B) first law of thermodynamics " +
    "\\(B\\) second law of thermodynamics (D)Carnot's law";

  it("REFUSES the row instead of returning it silently as free-response", () => {
    const { stem, options, unsplittable } = splitOptions(REAL);
    expect(options).toBeUndefined();
    expect(unsplittable).toMatch(/label/i);
    // Nothing is dropped on the way out — the block is returned WHOLE, so a
    // hand recovery via defects.json still has every alternative to work from.
    expect(stem).toBe(REAL);
  });

  it("names the labels it actually found, so the repair is obvious", () => {
    const { unsplittable } = splitOptions(REAL);
    expect(unsplittable).toContain("A, B, B, D");
  });

  // The two false positives that killed the obvious rule. A naive ">= 3 labels
  // means a broken MCQ" check fires on BOTH of these, and both are sound
  // subjective questions whose (a)/(b)/(c) are SUB-PART labels. The
  // discriminator is CASE: the board prints options uppercase in this source and
  // sub-parts lowercase.
  it("does NOT fire on a lowercase sub-part list — 'Define: (a) … (b) … (c)'", () => {
    // ac-circuits-12-pyq#7, Q.18 March 2022 — a real 3-mark definition question.
    const block = "Define: (a) Inductive reactance (b) Capacitive reactance (c) Impedance.";
    const { stem, options, unsplittable } = splitOptions(block);
    expect(options).toBeUndefined();
    expect(unsplittable).toBeUndefined();
    expect(stem).toBe(block);
  });

  it("does NOT fire on the other real sub-part list in the corpus", () => {
    // thermodynamics-12-pyq#10, Q.16 February 2025.
    const block =
      "In a thermodynamic system, define -- (a) Mechanical equilibrium " +
      "(b) Chemical equilibrium and (c) Thermal equilibrium";
    expect(splitOptions(block).unsplittable).toBeUndefined();
  });

  it("does NOT fire on a lone uppercase (A) in prose", () => {
    // Two labels is not a run — a matrix name or a stray provenance fragment.
    const block = "In the circuit (A) is the ammeter and (B) the bulb. Find the current.";
    expect(splitOptions(block).unsplittable).toBeUndefined();
  });

  it("still splits a well-formed A-D run — the guard costs nothing", () => {
    const block = "The SI unit of magnetic flux is (A) tesla (B) weber (C) henry (D) ohm";
    const { options, unsplittable } = splitOptions(block);
    expect(unsplittable).toBeUndefined();
    expect(options?.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(options?.[1].text).toBe("weber");
  });
});

describe("applyDocumentRepairs — an item number swallowed into a math zone", () => {
  // Semiconductors item 15 vanished from the bank entirely. The compilation typed
  // the numeral INSIDE an OMML equation together with the expression, so pandoc
  // emitted the whole line as one math zone:
  //
  //     $15.\ Y = A + B$ is the Boolean expression for ________. \[Q. 1(iii), ...\]
  //
  // ITEM anchors on a line STARTING with "<digits>. ", and this line starts with
  // "$" — so the line was never an item start and its question was absorbed into
  // item 14's stem. Two board questions became one row, and NOTHING downstream
  // could see it: the merged row is a well-formed MCQ, the options are intact,
  // and the only trace is a gap in the item numbering.
  //
  // The repair moves the number OUT of the zone rather than deleting anything,
  // so the equation still parses and the question keeps its own number.
  const FIXES = [
    {
      chapter: "semiconductors-12-pyq",
      from: "$15.\\ Y = A + B$",
      to: "15. $Y = A + B$",
      why: "test fixture",
    },
  ];

  it("turns the swallowed number back into a real item start", () => {
    const md = [
      "14.  Write the Boolean expression for X-OR gate. \\[Q. 2(iv), March 2022\\]",
      "$15.\\ Y = A + B$ is the Boolean expression for ________. \\[Q. 1(iii), February 2023\\]",
    ].join("\n");
    const out = applyDocumentRepairs(md, "semiconductors-12-pyq", FIXES);
    const lines = out.split("\n");
    expect(ITEM.test(lines[1])).toBe(true);
    expect(ITEM.exec(lines[1])![1]).toBe("15");
    // The equation survives — the number moved out of it, nothing was deleted.
    expect(lines[1]).toContain("$Y = A + B$");
  });

  it("is scoped to its own chapter — another chapter's document is untouched", () => {
    const md = "$15.\\ Y = A + B$ is the Boolean expression for ________.";
    expect(applyDocumentRepairs(md, "wave-optics-12-pyq", FIXES)).toBe(md);
  });

  it("REFUSES a stale repair rather than silently doing nothing", () => {
    // The source was corrected upstream, or the item renumbered. Either way a
    // no-op would leave the question lost again with no signal at all.
    expect(() => applyDocumentRepairs("nothing to see here", "semiconductors-12-pyq", FIXES))
      .toThrow(/stale|0 occurrence|found 0/i);
  });

  it("REFUSES an ambiguous repair that matches more than once", () => {
    const md = "$15.\\ Y = A + B$ and again $15.\\ Y = A + B$";
    expect(() => applyDocumentRepairs(md, "semiconductors-12-pyq", FIXES))
      .toThrow(/2|more than one|ambiguous/i);
  });

  it("is a no-op when the chapter has no repairs", () => {
    const md = "1.  An ordinary item. \\[Q. 1, March 2020\\]";
    expect(applyDocumentRepairs(md, "semiconductors-12-pyq", [])).toBe(md);
  });
});

// NOTE — the corrupted-label guard and the options-recovery repair meet on the
// SAME row and pull in opposite directions. The guard marks a row whose labels do
// not form an A-D run as `pendingMcq`, and `buildRecords` REFUSES to ship such a
// row ("known MCQ ... whose options are still lost"). The recovery in
// applyRepairs then restores the four options from defects.json, at which point
// the marker is false and would block the commit of a row that has just been
// fixed — thermodynamics#2 hit exactly that. applyRepairs therefore clears it.
//
// There is deliberately NO unit test here: applyRepairs is not exported and reads
// defects.json from disk, so any test written at this level would re-implement
// the behaviour rather than exercise it, and would pass whatever production did.
// The behaviour is pinned by the pipeline itself — the commit is fail-closed on
// `pendingMcq`, so a regression stops the ingest rather than shipping a known MCQ
// as free-response.
