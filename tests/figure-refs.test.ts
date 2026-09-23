import { describe, it, expect } from "vitest";
import {
  referencesFigure,
  describesFigureInText,
  optionsDeferToFigure,
  studentDraws,
} from "../scripts/lib/figureRefs";

/**
 * Spec for the bank-wide figure-reference probe.
 *
 * Every fixture below is a REAL stem read out of the bank on 2026-09-23, not an
 * invented one. That matters more here than in most probes: the two pipeline-
 * scoped ancestors of this rule (scripts/cbse-12-pyq/audit-figures.ts and
 * scripts/mh-hsc-12-pyq/audit-figure-refs.ts) were each written from the rows
 * ONE corpus happened to phrase, and each under-matched in silence on the other.
 * A fixture list drawn from one corpus would rebuild exactly that failure.
 *
 * The negative list is the load-bearing half. This probe's entire value is in
 * not crying wolf: "Draw the circuit diagram of a p-n junction diode" is an
 * instruction to the STUDENT, and a probe that counts it is a probe nobody runs.
 */

/** Stems that POINT AT a figure the source supplied. Each must flag. */
const REFERENCES: Array<[string, string]> = [
  ["numbered, mid-sentence", "In figure 3.37, points G, D, E, F are concyclic points of a circle with centre C."],
  ["adjoining", "In the adjoining figure circle with centre D touches the sides of \\(\\angle ACB\\) at A and B."],
  ["adjoining, comma", "In the adjoining figure, O is the centre of the circle. From point R, seg RM and seg RN are tangent segments."],
  ["depicted in Fig. N.N", "Consider the collision depicted in Fig. 5.10 to be between two billiard balls with equal masses."],
  ["see Fig. N.N", "Shanta runs an industry in a shed which is in the shape of a cuboid surmounted by a half cylinder (see Fig. 12.12)."],
  ["in Fig. N.N", "The electric field components in Fig. 1.24 are \\(E_x = \\alpha x^{1/2}\\), \\(E_y = E_z = 0\\)."],
  // Neither ancestor caught these two: no preposition sits before the reference,
  // so a determiner-anchored rule walks straight past a bracketed figure number.
  ["bare parenthesised", "In the circuit (Fig. 4.23) the current is to be measured. What is the value of the current?"],
  ["bare square-bracketed", "An electron falls through a distance of 1.5 cm in a uniform electric field [Fig. 1.10(a)]. The direction of the field is reversed."],
  // Balbharati letters its figures rather than numbering them, so a digit-only
  // rule is blind to the whole MH State Board corpus.
  ["lettered figure", "Three point charges are placed at the vertices of a right isosceles triangle as shown in the Fig. a."],
  ["figure below", "Position vectors of the points A, B and C as shown in the figure below are \\(\\vec{a}\\), \\(\\vec{b}\\) and \\(\\vec{c}\\)."],
  // Both earned by the CBSE probe, which called each of them clean at first.
  ["depicted-noun, no 'figure'", "Find the current in branch BM in the network shown :"],
  ["'shows' not 'shown'", "The figure shows the variation of photoelectric current with collector plate potential."],
  ["graph, adjoining", "A velocity-time graph is shown in the adjoining figure."],
  ["from the figure", "From the figure below, find the total number of routes from A to B."],
  // A printed CIRCUIT is named by what it is, never as "the figure". Measured
  // bank-wide: allowing up to two words between the determiner and `circuit`
  // moved the recall check +147 for 7 additions to the serious list, 5 of them
  // genuine. The two-word gap is the point — "the following LOGIC circuit" is
  // the common form, and the no-gap variant scored +114 for 5, missing it.
  ["the given circuit", "State Kirchhoff's laws. Apply these laws to find the values of current flowing in the three branches of the given circuit."],
  ["determiner, two-word gap", "To get the truth table shown from the following logic circuit, the logic gate \\(G\\) should be"],
  // "is/are shown below" without the leading "as" — +17 recall for 14 additions,
  // ~9 genuine, and the genuine ones are flatly unanswerable.
  ["is shown below", "A part of the periodic table is shown below. The six elements occupy two periods."],
  ["are shown below", "Four test tubes containing solutions (I), (II), (III) and (IV) are shown below along with their colours."],
];

/**
 * Stems that mention a figure-word but depend on NO supplied figure. Each must
 * stay silent.
 */
const NO_REFERENCE: Array<[string, string]> = [
  ["draw the circuit diagram", "Draw the circuit diagram of a p-n junction diode in (i) forward biasing and (ii) reverse biasing. Also draw its I-V characteristics."],
  ["draw a labelled diagram", "Draw a neat, labelled diagram of a suspended coil type moving coil galvanometer."],
  ["draw phasor diagram", "Derive an expression for the impedance of an LCR circuit connected to an AC power supply. Draw phasor diagram."],
  ["named concept, not a picture", "In the energy-band diagram of n-type Si, the gap between the bottom of the conduction band \\(E_C\\) and the donor energy level \\(E_D\\) is of the order of :"],
  ["with the help of a diagram", "(i) With the help of a circuit diagram, briefly explain the working of a full-wave rectifier using p-n junction diodes."],
  ["suitable diagram", "Explain the process of formation of 'depletion layer' and 'potential barrier' in a p-n junction region of a diode, with the help of a suitable diagram."],
  ["draw field lines", "A circular magnet is made with its north pole at the centre. Draw the magnetic field lines in the gap."],
  // Measured and reverted by the CBSE probe: allowing a plural noun added five
  // rows, all five false, all of this shape. The separating signal lives in the
  // OPTIONS, never the stem — see optionsDeferToFigure.
  ["which of the following graphs", "Which of the following graphs shows the variation of photoelectric current I with the intensity of light ?"],
  ["a function, not a picture", "Sketch the graph of \\(y = \\sin x\\) over one period."],
  ["draw figure of", "If radii of two circles are 4 cm and 2.8 cm. Draw figure of these circles touching each other - (i) externally (ii) internally."],
  ["construct", "Construct a tangent to a circle of radius 3.2 cm at any point P on it."],
  // "figure" as a VERB. Found while measuring a widening that flagged it; the
  // widening was rejected, but the shape is worth pinning so the next one is too.
  ["figure as a verb", "Which one among the following does NOT figure among the Five Principles of Panchsheel?"],
  // Rejected widening A: `the following|given + <2 words> + structure|curve|graph`
  // scored 50 additions of which ~6 were real. Each line below is one of its
  // false positives, kept so the same widening cannot be re-proposed silently.
  ["the following structure", "Which of the following is correct structure of tyrosine?"],
  ["a given curve", "Let the normals at all the points on a given curve pass through a fixed point \\((a,b)\\)."],
  ["the following concept diagram", "Do as directed : Complete the following concept diagram. The central box reads 'Regional Parties in Maharashtra'."],
  ["given circuit ELEMENTS, not a circuit", "You are given three circuit elements X, Y and Z. They are connected one by one across a given ac source."],
];

describe("referencesFigure", () => {
  it.each(REFERENCES)("flags a supplied figure: %s", (_label, stem) => {
    expect(referencesFigure(stem, null)).toBe(true);
  });

  it.each(NO_REFERENCE)("stays silent on: %s", (_label, stem) => {
    expect(referencesFigure(stem, null)).toBe(false);
  });

  it("reads the shared context too — a set's figure is named once, on the context", () => {
    // There is no context_image_url column, so a set-member row carries a bare
    // sub-question ("Equal") whose only figure reference sits on the context.
    expect(referencesFigure("Write the equation of the boundary line AC of the park.", null)).toBe(false);
    expect(
      referencesFigure("Write the equation of the boundary line AC of the park.", "The park is shown in the figure below."),
    ).toBe(true);
  });

  it("treats empty input as no reference rather than throwing", () => {
    expect(referencesFigure(null, null)).toBe(false);
    expect(referencesFigure("", "")).toBe(false);
  });
});

describe("a table is not a figure", () => {
  // Found by triage on 2026-09-23, independently in two lanes. A stem saying
  // "shown below in the table" followed by a GFM pipe-table is pointing at
  // content it CARRIES. It was landing in the serious list purely on the bare
  // "shown below" branch, which has no figure-noun in it at all.
  const TABLE = "\n\n| Athlete | Distance |\n|---|---|\n| A | 40 m |\n| B | 42 m |\n";

  it("stays silent when the only cue is 'shown below' and a pipe-table follows", () => {
    expect(referencesFigure(`The distances to which they have thrown the javelin are shown below in the table.${TABLE}`, null)).toBe(false);
    expect(referencesFigure(`Coloured balls are distributed in four boxes as shown in the following table.${TABLE}`, null)).toBe(false);
  });

  it("still flags a stem that names a FIGURE even when it also carries a table", () => {
    // The table must not become a blanket excuse: a question can legitimately
    // print a table AND read a printed figure.
    expect(referencesFigure(`In figure 3.37, the arcs are marked as follows.${TABLE}`, null)).toBe(true);
    expect(referencesFigure(`The adjoining figure shows the circuit.${TABLE}`, null)).toBe(true);
  });
});

describe("describesFigureInText", () => {
  // The state-board and UPSC pipelines sometimes write the figure out in prose
  // instead of attaching it. That is a deliberate handling, not a defect, so it
  // has to be separable from a row that simply lost its figure.
  it("recognises the [Figure: ...] prose form", () => {
    expect(
      describesFigureInText(
        'A velocity-time graph is shown in the adjoining figure.\n\n[Figure: a velocity-time graph. The vertical axis is labelled "v m/s".]',
        null,
      ),
    ).toBe(true);
  });

  // The NCERT ingest brackets its written-out figures differently from the
  // state-board one, and the original regex only knew the state-board form. Four
  // NCERT Physics rows sat in the serious list for that reason alone — they were
  // handled correctly and looked like defects.
  it("recognises the NCERT bracket forms too", () => {
    expect(describesFigureInText("[Read from Fig. 2.8: the slope of the tangent at t = 4 s]", null)).toBe(true);
    expect(describesFigureInText("[Fig. 2.29 shows the network as follows: R1 and R2 in series]", null)).toBe(true);
  });

  it("does not fire on a stem that merely references a figure", () => {
    expect(describesFigureInText("In figure 3.37, points G, D, E, F are concyclic.", null)).toBe(false);
  });

  it("does not fire on an ordinary bracketed aside that happens to start a sentence", () => {
    expect(describesFigureInText("[Note: take g = 9.8 m/s^2]", null)).toBe(false);
  });
});

describe("optionsDeferToFigure", () => {
  // Keys on the transcription's OWN marker, not on the exam board's prose — the
  // stem of a drawn-options row is indistinguishable from the "which of the
  // following graphs" rows above, which need no image at all.
  it("fires when an option defers to an attached figure", () => {
    expect(optionsDeferToFigure([{ text: "Figure (A) as printed" }, { text: "see the attached figure" }])).toBe(true);
  });

  it("stays silent on options carrying real descriptions", () => {
    expect(optionsDeferToFigure([{ text: "A straight line through the origin" }, { text: "A rectangular hyperbola" }])).toBe(false);
  });

  it("stays silent on a question with no options at all (subjective / numeric)", () => {
    expect(optionsDeferToFigure(null)).toBe(false);
    expect(optionsDeferToFigure([])).toBe(false);
  });
});

describe("studentDraws", () => {
  // Reported as an annotation on a hit, never as a filter: a stem can both
  // depend on a printed figure AND ask for one back.
  it("marks an instruction to produce a drawing", () => {
    expect(studentDraws("Draw a neat, labelled diagram of a moving coil galvanometer.")).toBe(true);
    expect(studentDraws("Sketch the graph of \\(y = \\sin x\\).")).toBe(true);
  });

  it("does not mark a stem that only reads a figure", () => {
    expect(studentDraws("In figure 3.37, points G, D, E, F are concyclic.")).toBe(false);
  });
});
