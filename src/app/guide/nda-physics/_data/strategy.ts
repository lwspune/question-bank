/**
 * Content for /guide/nda-physics/strategy.
 *
 * NDA Physics needs BOTH skill-strand split AND %HARD-aware tier overlay —
 * neither alone tells the full story.
 *
 *  - Skill strand (Recall/Apply/Reason) — used by English. Works here too
 *    because 79 q are pure recall, 215 q are direct formula plug-in, 155 q
 *    are multi-step computational reasoning.
 *
 *  - %HARD overlay — used by Maths. Necessary here because 5 of 14 chapters
 *    are > 15% HARD and 3 are > 20% HARD; within those chapters, the HARD
 *    pool concentrates in 1–2 specific subtopics. Strategy must say "drill
 *    every subtopic of THIS chapter" vs "cherry-pick the EASY/MOD subtopics
 *    and skip the HARD pool" vs "drill all and target the HARD pool."
 *
 * Per-chapter prescription = (strand, drill-all|cherry-pick|target-HARD).
 *
 * GAT PART B Physics is ~25 q per paper (the GAT also covers English 50 q +
 * Chem 25 + Bio 10 + Geog 20 + History 20 + Polity 10 + Econ 5 + CA 10 — see
 * the other NDA subject guides). Marks per correct = 4, penalty −1.33.
 */

import type { Difficulty } from "@/lib/questions/filters";

/** "Drill posture" within a chapter — strategy-level tier overlay. */
export type DrillPosture =
  /** EASY+MOD-heavy chapters where every subtopic is worth drilling. */
  | "drill-all"
  /** Mid-tier chapters where the HARD pool is concentrated; do everything
   *  but target the HARD pool with extra reps. */
  | "drill-all-target-hard"
  /** Chapters where 1-2 subtopics are toxic-HARD; do the rest, skip HARD. */
  | "cherry-pick-easy-mod"
  /** Sub-5-q chapters — quick recall, don't dwell. */
  | "skim";

export type StrandChapter = {
  chapter: string;
  qCount: number;
  pctHard: number;
  posture: DrillPosture;
  /** Subtopics to drill (each becomes a "Drill →" CTA). For drill-all chapters
   *  this is the full subtopic list; for cherry-pick it's just the EASY/MOD set. */
  mustDrill: string[];
  /** Subtopics to skip (cherry-pick chapters only). */
  skipSubtopics?: string[];
  /** Subtopics to target with HARD-only drills (drill-all-target-hard only). */
  targetHard?: string[];
  /** Realistic marks ceiling per paper from this chapter (4 marks/correct,
   *  −1.33 wrong; the GAT PART B Physics share is ~25 q per paper). */
  expectedYieldPerPaper: string;
  studyHours: number;
  /** 1-2 sentence pitch shown at the top of the card. */
  summary: string;
};

export type StrategyStrand = {
  id: "recall" | "apply" | "reason";
  label: string;
  qCount: number;
  pctOfBank: number;
  /** One-paragraph "what this strand is" pitch. */
  pitch: string;
  /** The prep approach — what makes this strand distinct. */
  approach: string[];
  chapters: StrandChapter[];
};

/** Headline numbers shown in the strategy hero. PART B Physics is ~25 q per
 *  paper on the GAT; max marks 100 (25 × 4), penalty −1.33 per wrong. */
export const STRATEGY_HEADLINE = {
  paperQ: 25,
  totalMarks: 100,
  marksPerCorrect: 4,
  penaltyPerWrong: 1.33,
  targetMarks: 70,
  targetAttempts: 20,
  targetAccuracyPct: 90,
};

export const RECALL_STRAND: StrategyStrand = {
  id: "recall",
  label: "Recall — Sound · Modern Physics · Astronomy · Energy · Units (79 q · 18% of bank)",
  qCount: 79,
  pctOfBank: 18,
  pitch:
    "Pure fact recall — definitions, names, units, instrument identification, scientist–discovery pairs, EM spectrum order. 79 q at an average of 2% HARD. The single highest marks-per-hour strand in the bank. Don't be too cool to drill these — Modern Physics has 0 HARD across 10 years, Astronomy has 0 HARD across 4 q.",
  approach: [
    "Read /guide/nda-physics/formulas once for the formula list, but the Recall strand needs almost none of them. The work here is flashcards + statement-truth practice.",
    "Sound is bigger than you think (34 q). Drill all 4 subtopics: foundations (what sound is, pitch/loudness/quality, the ear), the wave equation v=fλ + speed + frequency bands, sound behaviours (echo, reverberation, beats), and applications (SONAR, transducers, instruments).",
    "Modern Physics is tiny (25 q) but rewards memorisation discipline: 12 scientist–discovery pairs across 10 years (Chadwick=neutron, Einstein=photoelectric, Marie Curie=radium); the 5 acronym expansions (LED, LASER, NMR, MRI, MASER); the 3-tier atomic-model history.",
  ],
  chapters: [
    {
      chapter: "Sound",
      qCount: 34,
      pctHard: 3,
      posture: "drill-all",
      mustDrill: [
        "Foundations — Sound, Perception, and the Ear",
        "Wave Equation, Speed, and Frequency Bands",
        "Sound Behaviours — Reflection, Echo, Reverberation, Beats",
        "Applications — SONAR, Transducers, Instruments",
      ],
      expectedYieldPerPaper: "3–4 marks",
      studyHours: 4,
      summary:
        "34 q / 1 HARD in 10 yrs. Every subtopic at ≤15% HARD. Drill all four subtopics — there's no skip-list.",
    },
    {
      chapter: "Modern Physics",
      qCount: 25,
      pctHard: 0,
      posture: "drill-all",
      mustDrill: [
        "Atomic Structure",
        "Nuclear Physics",
        "Photoelectric Effect",
        "Quantum and Modern EM",
        "Scientists and Discoveries",
        "Scientific Acronyms",
      ],
      expectedYieldPerPaper: "2 marks",
      studyHours: 2,
      summary:
        "25 q · 0 HARD across the bank. Pure memorisation. Read end-to-end once, flashcard the scientist pairs + acronyms, done.",
    },
    {
      chapter: "Units, Measurement and Dimensions",
      qCount: 14,
      pctHard: 7,
      posture: "drill-all",
      mustDrill: ["Units and Dimensions"],
      expectedYieldPerPaper: "1–2 marks",
      studyHours: 2,
      summary:
        "14 q · 1 HARD across 10 yrs. SI vs CGS recall (1 dyne = 10⁻⁵ N, 1 erg = 10⁻⁷ J), the 6 most-tested dimensional formulas (G, h, force, pressure, energy, viscosity), 'which is dimensionless?'.",
    },
    {
      chapter: "Astronomy and Space",
      qCount: 4,
      pctHard: 0,
      posture: "skim",
      mustDrill: ["Astronomy and Space"],
      expectedYieldPerPaper: "≤1 mark",
      studyHours: 0.5,
      summary:
        "4 q in 10 yrs. Memorise: 1 light year ≈ 9.46×10¹⁵ m, 1 parsec ≈ 206265 AU, Jupiter largest planet, black hole = collapsed star remnant. Done in 15 minutes.",
    },
    {
      chapter: "Energy Sources",
      qCount: 2,
      pctHard: 0,
      posture: "skim",
      mustDrill: ["Energy Sources"],
      expectedYieldPerPaper: "≤1 mark",
      studyHours: 0.25,
      summary:
        "2 q in 10 yrs. Conventional (coal/oil/gas) vs non-conventional (solar/wind/tidal/geothermal); bio-mass = wood/dung/agri-waste (not coal). Read once.",
    },
  ],
};

export const APPLY_STRAND: StrategyStrand = {
  id: "apply",
  label: "Apply — Light · Laws of Motion · Kinematics · WEP · Gravitation · Oscillations (215 q · 48%)",
  qCount: 215,
  pctOfBank: 48,
  pitch:
    "The formula-engine strand. Almost half the bank. Each chapter is anchored on 1–3 named formulas (mirror formula, lens formula, Snell's law, F=ma, p=mv, KE=½mv², F=Gm₁m₂/r², T=2π√(L/g)). The work is recognising which formula a question wants, plugging in the numbers, watching the sign convention. %HARD varies 9–25% across chapters but the lever is the same: know the formula, watch the units, do the algebra.",
  approach: [
    "Memorise /guide/nda-physics/formulas. Half this strand is direct plug-in; the other half is symbol recall (which f is focal length, which v is velocity vs voltage).",
    "Light and Optics is the largest chapter in the bank (97 q). Drill subtopic-by-subtopic, not all at once — Light Phenomena (29 q) is recall, Reflection (18 q) is mirror formula, Refraction (17 q) is Snell + TIR, Lenses (12 q) is lens formula + power, Prisms (8 q) is dispersion + minimum deviation.",
    "Kinematics is small (24 q) but 25% HARD. The HARD pool concentrates in Vectors and Position (3 q at 67% HARD) and Equations of Motion graphs. Drill V-T / X-T graph reading separately — it's a distinct skill from kinematic-equation plug-in.",
  ],
  chapters: [
    {
      chapter: "Light and Optics",
      qCount: 97,
      pctHard: 10,
      posture: "drill-all-target-hard",
      mustDrill: [
        "Light Phenomena and Spectrum",
        "Reflection and Mirrors",
        "Refraction, Speed of Light and TIR",
        "Human Eye and Optical Instruments",
        "Lenses and Lens Formula",
        "Prisms and Dispersion",
      ],
      targetHard: ["Reflection and Mirrors", "Lenses and Lens Formula"],
      expectedYieldPerPaper: "8–9 marks",
      studyHours: 10,
      summary:
        "Largest chapter (97 q). Half recall (Light Phenomena, Eye + Instruments — 42 q), half formula-apply (Reflection, Refraction, Lenses, Prisms — 55 q). Target the Lenses subtopic HARD pool (25% HARD) with sign-convention practice.",
    },
    {
      chapter: "Laws of Motion and Forces",
      qCount: 41,
      pctHard: 10,
      posture: "drill-all",
      mustDrill: [
        "Newton's Laws of Motion",
        "Conservation of Momentum and Collisions",
        "Types of Forces",
        "Impulse and Momentum",
        "Friction",
      ],
      expectedYieldPerPaper: "4–5 marks",
      studyHours: 5,
      summary:
        "41 q · 10% HARD. Grew dramatically 2023–24 (3→10 q/year). Newton's three laws statement-truth dominates; collision + recoil-momentum is the second pillar. Drill all five subtopics.",
    },
    {
      chapter: "Kinematics and Motion",
      qCount: 24,
      pctHard: 25,
      posture: "cherry-pick-easy-mod",
      mustDrill: [
        "Equations of Motion and Graphs",
        "Projectile and Vertical Motion",
      ],
      skipSubtopics: ["Vectors and Position"],
      expectedYieldPerPaper: "2 marks",
      studyHours: 3,
      summary:
        "24 q · 25% HARD. Small chapter, dense HARD load. Vectors and Position (3 q at 67% HARD) is a calculus-leaning topic — skip if rushed. Drill Equations of Motion (15 q) carefully — graph-reading is a distinct sub-skill.",
    },
    {
      chapter: "Work, Energy and Power",
      qCount: 23,
      pctHard: 9,
      posture: "drill-all",
      mustDrill: [
        "Energy and Conservation",
        "Work-Energy Theorem and Power",
        "Work and Work Done",
        "Simple Machines",
      ],
      expectedYieldPerPaper: "2 marks",
      studyHours: 3,
      summary:
        "23 q · 9% HARD. KE↔PE conversions dominate. F·d cosθ definition (the 'no work done when perpendicular' trap). Simple Machines is the lever-class identification recall corner.",
    },
    {
      chapter: "Gravitation",
      qCount: 17,
      pctHard: 12,
      posture: "drill-all",
      mustDrill: [
        "Gravitational Field and Potential",
        "Newton's Law of Gravitation",
        "Orbits, Kepler and Escape",
      ],
      expectedYieldPerPaper: "1–2 marks",
      studyHours: 3,
      summary:
        "17 q · 12% HARD. The 'planet-scaled' ratio shape recurs — given a new planet's R and ρ relative to Earth, compute g / escape velocity / orbital period. Kepler's third law T²∝R³ is the second pillar.",
    },
    {
      chapter: "Oscillations and Waves",
      qCount: 13,
      pctHard: 15,
      posture: "drill-all",
      mustDrill: [
        "Simple Pendulum",
        "Simple Harmonic Motion and General Waves",
      ],
      expectedYieldPerPaper: "1 mark",
      studyHours: 2,
      summary:
        "13 q · 15% HARD. The Simple Pendulum T=2π√(L/g) ratio-question is the recurring shape: change L by k, change g by m, find new T. Mass is irrelevant — that's the test.",
    },
  ],
};

export const REASON_STRAND: StrategyStrand = {
  id: "reason",
  label: "Reason — Electricity & Magnetism · Heat · Fluid Mechanics (155 q · 35%)",
  qCount: 155,
  pctOfBank: 35,
  pitch:
    "The HARD-concentrated strand. 3 chapters, 35% of the bank, 22% average HARD share — and the dominant HARD subtopics here (Resistance & Circuits 42%, Calorimetry 31%, Thermo Processes 33%, Buoyancy 31%, Pressure 29%) are where the candidates who 'know the formula' still fail. The lever is multi-step computational reasoning: heat balance with phase change, series-vs-parallel resistor combinatorics, density-mixing with ratio inversion.",
  approach: [
    "Don't read these chapters end-to-end. Pick the HARD subtopic, work 10 timed PYQs on it, then move on. The HARD pool is too dense to digest in one sitting.",
    "Combination of Resistors is the bank's #1 marks-per-hour HARD pool (16 q at 38% HARD). Train the 5-shape repertoire: pure series, pure parallel, mixed series+parallel, ladder/infinite networks, and the 'wire of resistance R cut into pieces' shape.",
    "Calorimetry traps share a fingerprint — mass × specific heat × ΔT for both sides PLUS the latent heat term for any phase boundary crossing. Skip a latent term once and the whole equation is off. Practice the 'ice + water at different temperatures' question 10 times.",
    "Buoyancy ratio puzzles (densities mixed by equal-volume vs equal-mass) and the 'sealed packet in liquid' shape are template-driven — once you've worked 5, you've seen 80% of the test forms.",
  ],
  chapters: [
    {
      chapter: "Electricity and Magnetism",
      qCount: 93,
      pctHard: 22,
      posture: "drill-all-target-hard",
      mustDrill: [
        "Combination of Resistors",
        "Resistance and Resistivity",
        "Electric Current and Ohm's Law",
        "Electrical Power, Energy and Heating",
        "Cells, EMF and Kirchhoff's Laws",
        "Electrical Devices",
        "Electrostatics",
        "Magnetism and Magnetic Effects of Current",
        "Magnetic Force and Fleming's Rules",
      ],
      targetHard: [
        "Combination of Resistors",
        "Electrical Power, Energy and Heating",
      ],
      expectedYieldPerPaper: "5–6 marks",
      studyHours: 10,
      summary:
        "93 q · 22% HARD — the bank's biggest chapter for HARD. Combination of Resistors (16 q at 38% HARD) is the priority. Drill all nine subtopics; HARD-target Combination of Resistors and Power/Energy/Heating for extra reps.",
    },
    {
      chapter: "Heat and Thermodynamics",
      qCount: 39,
      pctHard: 21,
      posture: "drill-all-target-hard",
      mustDrill: [
        "Heat, Calorimetry and Specific Heat",
        "Temperature and Thermometry",
        "Phase Change and Boiling",
        "Thermodynamic Processes",
      ],
      targetHard: [
        "Heat, Calorimetry and Specific Heat",
        "Thermodynamic Processes",
      ],
      expectedYieldPerPaper: "3 marks",
      studyHours: 5,
      summary:
        "39 q · 21% HARD. Calorimetry mixing (13 q at 31% HARD) + Thermo Processes (6 q at 33% HARD) are the HARD pool. Temperature scales + Phase Change are the EASY plumbing.",
    },
    {
      chapter: "Fluid Mechanics and Properties of Matter",
      qCount: 23,
      pctHard: 30,
      posture: "drill-all-target-hard",
      mustDrill: [
        "Buoyancy, Density and Flotation",
        "Pressure and Surface Tension",
      ],
      targetHard: [
        "Buoyancy, Density and Flotation",
        "Pressure and Surface Tension",
      ],
      expectedYieldPerPaper: "1–2 marks",
      studyHours: 3,
      summary:
        "23 q · 30% HARD — the chapter with the highest %HARD in the bank. Both subtopics > 28% HARD. Drill ratio-trap templates: density mixing by equal volume vs equal mass, sealed packet pushed under in lighter/denser liquid.",
    },
  ],
};

export const STRATEGY_STRANDS = [RECALL_STRAND, APPLY_STRAND, REASON_STRAND];

export type TestDayPhase = {
  durationMin: number;
  label: string;
  detail: string;
};

/** Test-day attempt order — fastest-strand-first to bank marks early. PART B
 *  Physics is ~25 q on the GAT, embedded in the 100-q PART B section (so this
 *  whole plan fits inside ~30 minutes of a 2-hour GAT). */
export const TEST_DAY_PLAN: TestDayPhase[] = [
  {
    durationMin: 8,
    label: "Sweep Recall (Sound + Modern + Astronomy + Units)",
    detail:
      "Scan all 25 Physics questions, mark every Sound/Modern Physics/Astronomy/Units/Energy Sources item, attack them first. Expect 6–8 Recall items per paper at ~30 sec each. Target: 6 correct in 8 min. If you don't know an item cold, skip — the −1.33 penalty for wrong answers makes a guess negative-EV at 50% confidence.",
  },
  {
    durationMin: 14,
    label: "Sweep Apply (Light + Laws + Kinematics + WEP + Gravity + SHM)",
    detail:
      "Attempt every direct-formula question. Light & Optics dominates here (~5 q per paper), then Laws of Motion (2 q), the rest scattered. ~12 items × ~70 sec/q. Target: 9–10 correct. If a question needs a formula you don't recall, skip — Apply strand is where overconfident plug-in mistakes happen.",
  },
  {
    durationMin: 8,
    label: "Reason last (Circuits + Calorimetry + Buoyancy)",
    detail:
      "Tackle the HARD pool last. ~5 items × ~100 sec/q. If a circuit diagram looks like an 'infinite resistor network' or a calorimetry problem has 3 phase-changes, skip — those swallow 5+ minutes each. Take only the 2–3 questions you can confidently set up the equation for. Banking 12 attempts at 90% accuracy beats 20 attempts at 60%.",
  },
];

export type TimeBudgetRow = {
  label: string;
  hours: number;
  outcome: string;
};

export const TIME_BUDGET: TimeBudgetRow[] = [
  { label: "Recall — Sound + Modern + Astronomy + Units", hours: 8, outcome: "~7 marks/paper" },
  { label: "Apply — Light + Laws + Kinematics + WEP + Gravity + SHM", hours: 22, outcome: "~18 marks/paper" },
  { label: "Reason — Circuits + Calorimetry + Fluid", hours: 14, outcome: "~9 marks/paper" },
  { label: "Past papers, timed (last 3 years)", hours: 6, outcome: "Calibration + speed" },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
