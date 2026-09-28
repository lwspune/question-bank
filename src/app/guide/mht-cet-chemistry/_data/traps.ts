/**
 * Content for /guide/mht-cet-chemistry/traps.
 *
 * On a paper that is 3% HARD, marks are not lost to difficulty. They are lost
 * to misreading — a reagent that looks like another, a unit left unconverted,
 * an order that runs backwards — and to time spent where a guess was due.
 * Each trap is bucketed by the strand whose marks it costs. `affects` holds
 * playbook slugs (empty = paper-wide). No invented example ids.
 */

import type { StrandId } from "./strategy";

export type TrapBucket = StrandId;

export type TrapShape = {
  id: string;
  title: string;
  bucket: TrapBucket;
  affects: string[];
  mechanic: string;
  fix: string;
  exampleQuestionId?: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  // -------- Calculate --------
  {
    id: "blank-answer-habit",
    title: "Leaving a question blank — there is no negative marking",
    bucket: "calculate",
    affects: [],
    mechanic:
      "A blank and a wrong answer both score zero on MHT-CET. The habit carried in from exams that deduct marks — leave it if unsure — turns a free attempt into a certain zero.",
    fix: "Keep the last three minutes of Paper II for filling every blank. Eliminate what you can, then choose.",
  },
  {
    id: "calculation-first",
    title: "Starting with the calculations and running out of time for the recall",
    bucket: "calculate",
    affects: [],
    mechanic:
      "About 25 Chemistry questions a paper are recall or reactions — answered in seconds — and about 21 need arithmetic. Working the paper in order spends the first minutes on calculations and reaches the easy names and structures with the clock already short.",
    fix: "First sweep: every recall and reaction question. Second sweep: the calculations. One mark each either way; the fast marks first.",
  },
  {
    id: "units",
    title: "A unit left unconverted — pm, dm³ bar, kJ against J",
    bucket: "calculate",
    affects: ["solid-state", "chemical-thermodynamics", "electrochemistry"],
    mechanic:
      "Solid State edges come in pm and density wants cm; thermodynamic work comes in dm³ bar and the answer in J; ΔG° = −nFE° comes out in J while the options are in kJ. The unconverted answer is always printed.",
    fix: "Write the unit next to every number. 1 pm = 10⁻¹⁰ cm; 1 dm³ bar = 100 J; divide by 1000 for kJ.",
  },
  {
    id: "van-t-hoff-factor",
    title: "Forgetting the van't Hoff factor for an electrolyte",
    bucket: "calculate",
    affects: ["solutions"],
    mechanic:
      "Every colligative property scales with the number of particles. NaCl gives two, CaCl₂ three, AlCl₃ four. Leaving i = 1 gives the answer for glucose, and it is an option.",
    fix: "Before any colligative calculation, write i: 1 for a non-electrolyte, the ion count for a strong electrolyte.",
  },
  {
    id: "nernst-n",
    title: "The wrong n in the Nernst equation",
    bucket: "calculate",
    affects: ["electrochemistry"],
    mechanic:
      "E = E° − (0.0592/n) log Q. For Zn²⁺ or Cu²⁺, n = 2: a tenfold change moves the potential by 0.0296 V, not 0.0592 V. Ten of the Electrochemistry HARD questions are Nernst arithmetic.",
    fix: "Read n from the balanced half-reaction — the number of electrons — before substituting.",
  },
  // -------- Reactions --------
  {
    id: "reagent-lookalikes",
    title: "Two reagents that look alike and do different things",
    bucket: "reactions",
    affects: ["aldehydes-ketones-and-carboxylic-acids", "halogen-derivatives", "alcohols-phenols-and-ethers"],
    mechanic:
      "Aqueous KOH substitutes and alcoholic KOH eliminates. Clemmensen is acidic and Wolff–Kishner basic. Finkelstein makes iodides and Swarts fluorides. The product of the look-alike is always among the options.",
    fix: "Learn reactions as reagent → product pairs, and note the one word that separates look-alikes: aqueous or alcoholic, acid or base, iodide or fluoride.",
  },
  {
    id: "carbon-count",
    title: "Losing or keeping a carbon",
    bucket: "reactions",
    affects: ["amines", "alkanes", "aromatic-compounds"],
    mechanic:
      "Hofmann bromamide and decarboxylation remove one carbon; Wurtz doubles the chain; side-chain oxidation cuts any alkyl group down to –COOH. A product with the wrong carbon count is the planted option.",
    fix: "Count carbons before and after. Ask: does this reaction add, remove or keep them?",
  },
  {
    id: "alpha-hydrogen",
    title: "Aldol against Cannizzaro — the α-hydrogen decides",
    bucket: "reactions",
    affects: ["aldehydes-ketones-and-carboxylic-acids"],
    mechanic:
      "Aldol condensation needs a hydrogen on the carbon next to C=O; Cannizzaro works only without one. HCHO and benzaldehyde have none; ethanal has three.",
    fix: "Look at the α-carbon first. Hydrogen present: aldol. None: Cannizzaro.",
  },
  {
    id: "basicity-medium",
    title: "The gas-phase basicity order in a water question",
    bucket: "reactions",
    affects: ["amines"],
    mechanic:
      "In the gas phase, tertiary amines are the strongest bases. In water, solvation reverses part of that: for methylamines, 2° > 1° > 3°. The gas-phase order is printed as an option.",
    fix: "Unless the question says gas phase, use the aqueous order.",
  },
  // -------- Recall --------
  {
    id: "exceptions-list",
    title: "Applying a trend where the paper asks for its exception",
    bucket: "recall",
    affects: [
      "transition-and-inner-transition-elements",
      "elements-of-group-16-17-and-18",
      "elements-of-group-1-and-2",
      "redox-reactions",
    ],
    mechanic:
      "Recall questions are built on the exceptions: Cr and Cu configurations, water's boiling point, lithium and beryllium's anomalies, peroxide oxygen at −1. The trend answer is the planted one.",
    fix: "Keep a one-page list of exceptions and read it before every mock. The trend is not what is being tested.",
  },
  {
    id: "count-donor-atoms",
    title: "Counting ligands where the question counts donor atoms",
    bucket: "recall",
    affects: ["coordination-compounds"],
    mechanic:
      "[Co(en)₃]³⁺ has three ligands and coordination number 6, because each en binds twice. Denticity is 33 questions of Coordination Compounds.",
    fix: "Coordination number = number of donor atoms bonded to the metal, not number of ligands.",
  },
  {
    id: "non-reducing-sugar",
    title: "Calling sucrose a reducing sugar",
    bucket: "recall",
    affects: ["biomolecules"],
    mechanic:
      "Sucrose's glycosidic link joins both anomeric carbons, leaving no free hemiacetal, so it does not reduce Fehling's or Tollens' reagent. Maltose and lactose do. 'Which is non-reducing?' is a standing question.",
    fix: "Learn the linkages as a table: sucrose α1–β2 (non-reducing), maltose α1–4, lactose β1–4.",
  },
  {
    id: "hardy-schulze-sign",
    title: "Coagulating a sol with an ion of the same charge",
    bucket: "recall",
    affects: ["surface-chemistry"],
    mechanic:
      "The Hardy–Schulze rule is about the ion OPPOSITE in charge to the sol. A large, highly charged anion does nothing to a negative sol, and it is offered as the answer.",
    fix: "Find the sol's charge first, then rank only the opposite-charged ions by their charge.",
  },
];

export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  calculate: TRAP_SHAPES.filter((t) => t.bucket === "calculate"),
  reactions: TRAP_SHAPES.filter((t) => t.bucket === "reactions"),
  recall: TRAP_SHAPES.filter((t) => t.bucket === "recall"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
