/**
 * Content for /guide/nda-chemistry/strategy.
 *
 * NDA Chemistry strategy = skill-strand split (Recall / Rule / Calculate),
 * with NO %HARD overlay (unlike NDA Physics). Why no overlay:
 *   - Zero chapters above 11.1% HARD. The "concentrated HARD pool" lever the
 *     Physics overlay needs simply doesn't exist for Chemistry.
 *   - One subtopic-level exception (Paints and Coatings at 75% HARD in a
 *     4-q subtopic) — not enough to justify a whole strategy axis; called
 *     out in the relevant playbook (industrial-and-applied-chemistry).
 *
 * Strand split (262 q):
 *   - Recall    (144 q · 7 chapters): memorise facts. Highest density of
 *     EASY questions; the marks-per-hour leader.
 *   - Rule      (109 q · 4 chapters): apply specific rules (pH classification,
 *     redox identification, periodic-trend prediction, ox-state assignment).
 *   - Calculate (9 q   · 1 chapter):  numeric mole/Avogadro/stoichiometry.
 *     Small bucket but a distinct skill — surface it so candidates don't
 *     skip and lose 1–2 marks they could bank.
 *
 * GAT PART B Chemistry is ~15 q per single paper (range 12–18 across the
 * 2017–2026 bank; avg 14.6). Marks per correct = 4, penalty −1.33 — same
 * 4 / −1.33 scoring as every NDA section. Per-paper max ≈ 60 marks.
 * (Note: don't confuse with Physics's ~25 q/paper — that's a different PART
 * B section. Each Part B section has its own q-count.)
 */

import type { Difficulty } from "@/lib/questions/filters";

export type StrandChapter = {
  chapter: string;
  qCount: number;
  pctHard: number;
  /** Subtopics to drill (each becomes a "Drill →" CTA). */
  mustDrill: string[];
  /** Realistic marks ceiling per paper from this chapter. */
  expectedYieldPerPaper: string;
  studyHours: number;
  /** 1-2 sentence pitch shown at the top of the card. */
  summary: string;
};

export type StrategyStrand = {
  id: "recall" | "rule" | "calculate";
  label: string;
  qCount: number;
  pctOfBank: number;
  /** One-paragraph "what this strand is" pitch. */
  pitch: string;
  /** The prep approach — what makes this strand distinct. */
  approach: string[];
  chapters: StrandChapter[];
};

/** Headline numbers shown in the strategy hero. PART B Chemistry is ~15 q
 *  per single paper on the GAT (range 12–18 across 18 papers in the bank;
 *  avg 14.6). Max marks per paper ≈ 60 (15 × 4), penalty −1.33 per wrong. */
export const STRATEGY_HEADLINE = {
  paperQ: 15,
  totalMarks: 60,
  marksPerCorrect: 4,
  penaltyPerWrong: 1.33,
  targetMarks: 45,
  targetAttempts: 13,
  targetAccuracyPct: 90,
};

export const RECALL_STRAND: StrategyStrand = {
  id: "recall",
  label:
    "Recall — Carbon · Matter · Industrial · Metals · Hydrogen · Everyday Life · Practical (144 q · 55%)",
  qCount: 144,
  pctOfBank: 55,
  pitch:
    "Pure fact recall — chemical names, formulas, uses, allotropes, reactivity orderings, lab methods. 144 q at an average of 4% HARD. The highest marks-per-hour strand in the bank, and the strand most students under-invest in (it feels like 'memorisation, not chemistry'). 4 of these 7 chapters carry ZERO HARD across 10 years. Drill the /common-compounds reference page side-by-side with this strand — it covers the highest-leverage memorisation surface.",
  approach: [
    "Read /guide/nda-chemistry/common-compounds end-to-end first. That's the ~50 name↔formula↔use pairs the recall strand keeps re-testing. Active-recall it in 4 passes (cover the right column, read the name, write the formula).",
    "Carbon and Its Compounds is the bank's largest chapter (45 q). Half of it is the Allotropes subtopic (15 q) — diamond vs graphite vs fullerene vs graphene properties + uses. The other half is common compounds + functional groups. Drill the allotropes subtopic separately for fast wins.",
    "Industrial and Applied Chemistry hides one trap subtopic — Paints and Coatings, 4 q at 75% HARD. Don't skip it, but expect the 'pigment vs drier vs thinner vs anti-skinning' pairs to take longer than the rest of the chapter.",
  ],
  chapters: [
    {
      chapter: "Carbon and Its Compounds",
      qCount: 45,
      pctHard: 4,
      mustDrill: [
        "Allotropes of Carbon",
        "Common Carbon Compounds and Pigments",
        "Functional Groups and Common Organic Compounds",
        "Soaps, Detergents and Hydrogenation of Oils",
        "Catenation, Tetra-valency and Isomerism",
        "Hydrocarbons and Organic Classification",
      ],
      expectedYieldPerPaper: "~8 marks",
      studyHours: 5,
      summary:
        "45 q · 2 HARD across 10 yrs. Allotropes is the dominant subtopic — memorise the diamond/graphite/fullerene property table cold. Common Compounds is name↔formula↔use recall.",
    },
    {
      chapter: "Matter and Its States",
      qCount: 30,
      pctHard: 3,
      mustDrill: [
        "Separation Techniques",
        "Compounds, Mixtures and Solutions",
        "States of Matter, Phase Changes and Diffusion",
        "Colloids and Suspensions",
        "Physical vs Chemical Changes",
      ],
      expectedYieldPerPaper: "~5 marks",
      studyHours: 3,
      summary:
        "30 q · 1 HARD across 10 yrs. Five small subtopics, each rule-of-thumb sized. Watch the colloid vs suspension distinction — 1 of 5 q is HARD.",
    },
    {
      chapter: "Industrial and Applied Chemistry",
      qCount: 28,
      pctHard: 11,
      mustDrill: [
        "Industrial Gases, Manufacturing and Reactions",
        "Cement, Glass and Building Materials",
        "Fertilizers",
        "Common Industrial Substances and Alloys",
        "Paints and Coatings",
      ],
      expectedYieldPerPaper: "~5 marks",
      studyHours: 4,
      summary:
        "28 q · 11% HARD (driven by the Paints subtopic — 3 of 4 paint q are HARD). Industrial gases, cement composition, NPK fertiliser percentages, alloy compositions all pure recall.",
    },
    {
      chapter: "Metals and Non-Metals",
      qCount: 17,
      pctHard: 0,
      mustDrill: [
        "Reactivity Series and Reactions with Water",
        "Corrosion and Its Prevention",
        "Alloys and Their Composition",
        "Extraction of Metals and Ores",
      ],
      expectedYieldPerPaper: "~3 marks",
      studyHours: 2,
      summary:
        "17 q · ZERO HARD across 10 yrs. Pure recall. Memorise the reactivity series K-Na-Ca-Mg-Al-Zn-Fe-Cu-Hg-Ag-Au, the four major alloy compositions (brass, bronze, stainless steel, solder), galvanisation = zinc coating.",
    },
    {
      chapter: "Hydrogen and Water",
      qCount: 11,
      pctHard: 9,
      mustDrill: [
        "Hardness and Purity of Water",
        "Properties of Hydrogen",
        "Properties and Anomalous Behaviour of Water",
      ],
      expectedYieldPerPaper: "~2 marks",
      studyHours: 1.5,
      summary:
        "11 q · 1 HARD across 10 yrs. Permanent (CaSO₄/MgSO₄) vs temporary (Ca(HCO₃)₂) hardness recall + softening methods. Water's anomalous max density at 4 °C.",
    },
    {
      chapter: "Chemistry in Everyday Life",
      qCount: 10,
      pctHard: 0,
      mustDrill: [
        "Common Chemicals and Their Uses",
        "Medicines and Health Chemistry",
      ],
      expectedYieldPerPaper: "~2 marks",
      studyHours: 1.5,
      summary:
        "10 q · ZERO HARD across 10 yrs. Drink/gas/cleaner identification + antacid/analgesic/antibiotic types. The lowest-investment / highest-confidence chapter in the bank.",
    },
    {
      chapter: "Practical Chemistry",
      qCount: 3,
      pctHard: 0,
      mustDrill: ["Practical Applications: Health, Food and Lab Methods"],
      expectedYieldPerPaper: "≤1 mark",
      studyHours: 0.5,
      summary:
        "3 q · ZERO HARD across 10 yrs. Lab + food + health applications. Read once in 15 min — the q-yield is low but the marks are essentially free.",
    },
  ],
};

export const RULE_STRAND: StrategyStrand = {
  id: "rule",
  label:
    "Rule — Atomic Structure · Acids/Bases/Salts · Reactions · Bonding (109 q · 42%)",
  qCount: 109,
  pctOfBank: 42,
  pitch:
    "Apply specific rules — pH classification (acidic < 7), oxidation-state assignment (sum to zero), periodic-trend prediction (atomic radius decreases across, increases down), redox identification (LEO RGO — Loss of Electrons = Oxidation, Reduction = Gain of e⁻). Four chapters, 109 q at 7% average HARD. The skill is rule-application, not memorisation: the answer follows from the framework, not from a remembered fact.",
  approach: [
    "Memorise the 4 master rules first: (1) periodic trends — radius ↓ across, ↑ down; IE ↑ across, ↓ down; EN ↑ across, ↓ down; metallic character opposite. (2) Oxidation-state assignment sequence: H=+1, O=−2, group I=+1, group II=+2, sum to molecule charge. (3) Acid-base type: Arrhenius (water H⁺/OH⁻), Brønsted (H⁺ donor/acceptor), Lewis (e⁻ pair acceptor/donor). (4) Reaction type: A+B→AB combination; AB→A+B decomposition; A+BC→AC+B displacement; AB+CD→AD+CB double-displacement.",
    "Chemical Reactions (30 q · 10% HARD) is the hottest Rule chapter. Redox subtopic (10 q at 20% HARD) is the marquee — learn LEO RGO + assign oxidation states + identify the species being oxidised (loses e⁻, ox-state ↑) and reduced. Practice with the bank's 5+ pair-property questions.",
    "Atomic Structure (35 q) gets confused because it mixes pure-recall pieces (atomic models history) with rule-application (periodic trends, electron config). When you drill, separate the subtopics — Periodic Trends + Atomic Number questions reward the rule lens; Atomic Models is mostly recall.",
  ],
  chapters: [
    {
      chapter: "Atomic Structure and Periodic Classification",
      qCount: 35,
      pctHard: 9,
      mustDrill: [
        "Periodic Trends, Valency and Atomicity",
        "Atomic Number, Mass Number and Subatomic Particles",
        "Atomic Models: Dalton, Rutherford, Bohr",
        "Isotopes and Isoelectronic Species",
        "Electron Configuration and Valence Shells",
      ],
      expectedYieldPerPaper: "~6 marks",
      studyHours: 4,
      summary:
        "35 q · 9% HARD. Periodic Trends is the biggest subtopic (12 q) — drill the rule once, the rest follows. Watch for 'order of valency' Match-List traps in the HARD pool.",
    },
    {
      chapter: "Acids, Bases and Salts",
      qCount: 33,
      pctHard: 6,
      mustDrill: [
        "pH Scale and Common Substances",
        "Common Acids: Names, Formulas and Uses",
        "Acid-Base Theory: Concepts, Oxides and Electrolytes",
        "Salts and Common Compounds",
        "Water of Crystallization",
      ],
      expectedYieldPerPaper: "~6 marks",
      studyHours: 3,
      summary:
        "33 q · 6% HARD. Five subtopics, each rule-of-thumb sized. Common Acids overlaps with /common-compounds — drill both side-by-side.",
    },
    {
      chapter: "Chemical Reactions",
      qCount: 30,
      pctHard: 10,
      mustDrill: [
        "Redox: Oxidation, Reduction and Reducing Agents",
        "Types of Reactions: Combination, Decomposition, Displacement",
        "Specific Reactions: Precipitation, Electrolysis and Daily Life",
        "Thermal and Photochemical Decomposition",
        "Endothermic and Exothermic Reactions",
        "Physical vs Chemical Changes",
      ],
      expectedYieldPerPaper: "~5 marks",
      studyHours: 3,
      summary:
        "30 q · 10% HARD — the chapter's hot pool is Redox (10 q at 20% HARD). LEO RGO + oxidation-state assignment cracks 80% of redox questions.",
    },
    {
      chapter: "Chemical Bonding",
      qCount: 11,
      pctHard: 0,
      mustDrill: [
        "Ionic and Covalent Bonding",
        "Valency, Oxidation States and Molecular Formula",
        "Bond Counting and Molecular Structure",
      ],
      expectedYieldPerPaper: "~2 marks",
      studyHours: 1,
      summary:
        "11 q · ZERO HARD across 10 yrs. EN-difference > 1.7 ⟹ ionic; < 1.7 ⟹ covalent. Ox-state from sum-to-charge rule. Pure rule application.",
    },
  ],
};

export const CALCULATE_STRAND: StrategyStrand = {
  id: "calculate",
  label: "Calculate — Mole Concept and Stoichiometry (9 q · 3%)",
  qCount: 9,
  pctOfBank: 3,
  pitch:
    "The smallest strand, but a distinct skill. 9 q across 10 years, 1 HARD — but the q-yield is reliable (mole/Avogadro questions appear most years, especially NDA-2). Numeric work: mol = mass / molar mass; mol = particles / 6.022×10²³; equivalent weight = molar mass / valency factor; balanced equations → stoichiometric ratios. Don't skip the strand because it's small — it's 1–2 marks per paper, and the formulas are reusable from your Maths prep.",
  approach: [
    "Memorise the four core formulas: mol = m/M; mol = N/N_A (where N_A = 6.022×10²³); equiv-weight = molar mass / valency factor; m(g) = mol × molar mass. Practice unit-conversion (g → kg, mL → L) before plugging into formulas.",
    "Equivalent weight is the recurring tricky form. For acids: equiv-wt = molar mass / basicity (HCl = 36.5 / 1 = 36.5; H₂SO₄ = 98 / 2 = 49; H₃PO₄ = 98 / 3 ≈ 32.7). For bases: / acidity. For salts: / total positive charge. For oxalic acid (C₂H₂O₄·2H₂O): molar mass 126 / valency 2 = 63.",
    "Stoichiometry questions in NDA Chemistry are usually 'which law of chemical combination is shown' (conservation of mass, definite proportions, multiple proportions). Match the data pattern to the law — don't try to derive from scratch.",
  ],
  chapters: [
    {
      chapter: "Mole Concept and Stoichiometry",
      qCount: 9,
      pctHard: 11,
      mustDrill: [
        "Mole Concept, Avogadro's Law and Molar Calculations",
        "Stoichiometry and Laws of Chemical Combination",
      ],
      expectedYieldPerPaper: "~2 marks",
      studyHours: 2,
      summary:
        "9 q · 1 HARD across 10 yrs. Small bucket, distinct skill. Drill the equivalent-weight calculation (the recurring tricky form) and the law-identification format.",
    },
  ],
};

export const STRATEGY_STRANDS = [RECALL_STRAND, RULE_STRAND, CALCULATE_STRAND];

export type TestDayPhase = {
  durationMin: number;
  label: string;
  detail: string;
};

/** Test-day attempt order — fastest-strand-first to bank marks early.
 *  Slot budget is ~15 min total (PART B Chemistry's share of the 150-min GAT
 *  is roughly proportional to its q-count: ~15 q × ~1 min ≈ 15 min). */
export const TEST_DAY_PLAN: TestDayPhase[] = [
  {
    durationMin: 5,
    label: "Sweep Recall (Carbon + Matter + Industrial + Metals + Hydrogen + Everyday + Practical)",
    detail:
      "Scan all ~15 Chemistry questions, mark every Recall-strand item (allotropes, common compounds, separation methods, reactivity series, alloy composition, water hardness, household chemicals). Expect ~8 Recall items per paper at ~25 sec each. Target: 7 correct in 5 min. If you don't recognise an allotrope or common-compound name within 5 sec, skip — the −1.33 penalty makes a guess negative-EV at below ~55% confidence.",
  },
  {
    durationMin: 7,
    label: "Sweep Rule (Atomic Structure + Acids/Bases + Reactions + Bonding)",
    detail:
      "Attempt every rule-application question. Periodic trends (1–2 q), pH/acid-base (1–2 q), redox identification (1–2 q), reaction type (1 q), ox-state assignment (≤1 q). ~6 items × ~60 sec. Target: 5 correct. If a redox question requires assigning ox-states to >2 elements in a complex compound, skip — those swallow 2+ min.",
  },
  {
    durationMin: 3,
    label: "Calculate last (Mole + Stoichiometry)",
    detail:
      "Tackle the numeric questions last. ~1 item most papers, sometimes 0. Set up the formula, plug numbers, double-check unit conversion. Don't get clever — Mole questions in NDA are direct plug-in, not multi-step. If the question gives you mass in g and asks for moles, divide by molar mass and you're done.",
  },
];

export type TimeBudgetRow = {
  label: string;
  hours: number;
  outcome: string;
};

export const TIME_BUDGET: TimeBudgetRow[] = [
  { label: "Recall — Carbon + Matter + Industrial + Metals + Hydrogen + Everyday + Practical", hours: 14, outcome: "~24 marks/paper" },
  { label: "Rule — Atomic Structure + Acids/Bases + Reactions + Bonding", hours: 11, outcome: "~17 marks/paper" },
  { label: "Calculate — Mole Concept and Stoichiometry", hours: 2, outcome: "~2 marks/paper" },
  { label: "Common-compounds active recall (the /common-compounds page)", hours: 4, outcome: "Compounding gains across Recall" },
  { label: "Past papers, timed (last 3 years)", hours: 5, outcome: "Calibration + speed" },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
