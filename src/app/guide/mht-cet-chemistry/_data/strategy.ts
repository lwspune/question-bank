/**
 * Content for /guide/mht-cet-chemistry/strategy.
 *
 * THE AXIS IS SPEED, NOT DIFFICULTY. Chemistry is 2.9% HARD, so "where the
 * HARD sits" (the Maths and Physics axis) decides almost nothing. What does
 * differ is how long a question takes: a recall or reaction question is read
 * and answered in seconds, a calculation needs arithmetic. With no negative
 * marking and one mark each, the order is: fast questions first, arithmetic
 * after, every bubble filled.
 *
 * AND CHEMISTRY FUNDS PHYSICS. Paper II is 100 questions in 90 minutes; the
 * suggested split is about 35 minutes here and 55 for Physics. That is a
 * starting budget to test in mocks, not a measurement, and the page says so.
 *
 * STRANDS are EXECUTION MODES, measured: the share of keyed answers that are a
 * number is 56-83% in the eight CALCULATE chapters and 0-27% in the rest,
 * Redox apart (51%, oxidation states found by counting). REACTIONS is the
 * organic reaction chapters (reagent -> product, named reactions, plus the
 * organic principles they lean on); RECALL is the descriptive chapters
 * (names, structures, uses, trends).
 *
 * NUMBERS: lifetime counts over 3,371 PUBLIC PYQs (68 papers, 30 chapters);
 * q/paper is the 2025-2026 rate (39 papers). Strands + tail reconcile to 3,371
 * (1,394 + 733 + 935 + 309) and to 49.8 questions a paper.
 *
 * 2026-10-13 refresh: on the 2025-2026 rate Basic Principles of Organic
 * Chemistry (1.15) and Green Chemistry (1.10) crossed the 0.9 line and became
 * playbooks; Aromatic Compounds (0.67), Alkanes (0.64) and Groups 1 and 2
 * (0.85) fell below it and moved to the tail.
 *
 * `mustDrill` / `skipSubtopics` / `targetHard` hold canonical DB subtopic
 * names; tests/guide-mht-cet-chemistry-playbooks.test.ts resolves every one.
 */

import type { Difficulty } from "@/lib/questions/filters";

/** When on the paper a chapter's questions get answered. */
export type DrillPosture =
  /** Answered on sight in the first sweep: a name, a structure, a reagent. */
  | "first-sweep"
  /** Needs arithmetic: answered after the first sweep, at about a minute each. */
  | "second-sweep";

export type StrandChapter = {
  chapter: string;
  qCount: number;
  pctHard: number;
  posture: DrillPosture;
  /** Subtopics to drill, in prep order. */
  mustDrill: string[];
  /** Last in the PREP queue, never an instruction to leave a question blank. */
  skipSubtopics?: string[];
  /** The few subtopics that actually carry HARD questions. */
  targetHard?: string[];
  expectedYieldPerPaper: string;
  studyHours: number;
  summary: string;
};

export type StrandId = "calculate" | "reactions" | "recall";

export type StrategyStrand = {
  id: StrandId;
  label: string;
  qCount: number;
  pctOfBank: number;
  pitch: string;
  approach: string[];
  chapters: StrandChapter[];
};

/**
 * Headline numbers for the Chemistry half of Paper II: 50 q x 1 mark = 50.
 * penaltyPerWrong 0, so targetAttempts === paperQ. At 3% HARD an 80% target is
 * realistic: 40 of 50. `durationMin` is the RECOMMENDED Chemistry share of the
 * shared 90 minutes, not a paper rule.
 */
export const STRATEGY_HEADLINE = {
  paperQ: 50,
  totalMarks: 50,
  marksPerCorrect: 1,
  penaltyPerWrong: 0,
  targetMarks: 40,
  targetAttempts: 50,
  targetAccuracyPct: 80,
  sharedPaperMinutes: 90,
  durationMin: 35,
  minutesPerQuestion: 0.7,
};

export const TIME_SPLIT = {
  chemistryMinutes: 35,
  physicsMinutes: 55,
  lines: [
    "Paper II gives you 90 minutes for 100 questions (Physics 1-50, Chemistry 51-100) and does not divide them. The split is yours.",
    "Chemistry is the cheaper half: about 3% of its questions are HARD against 17% in Physics, and roughly half of them are answered by recognising a name, a structure or a reagent. Every minute Chemistry does not need is a minute Physics can use.",
    "A starting budget to test in timed mocks: Chemistry in about 35 minutes, Physics in about 55. Inside the 35: the recall and reaction questions on a first sweep (about 25 of them, seconds each), then the calculations. This is a recommendation, not a measurement. After two timed mocks, move it by your own numbers.",
    "Many students take Chemistry first so its marks are banked before Physics starts eating the clock. Whatever the order, set a clock time to switch halves and keep to it.",
  ],
};

export const CALCULATE_STRAND: StrategyStrand = {
  id: "calculate",
  label:
    "Calculate: Chemical Kinetics · Ionic Equilibria · Thermodynamics · Solutions · Solid State · Electrochemistry · Some Basic Concepts · Structure of Atom (1,394 q · 41% of bank)",
  qCount: 1394,
  pctOfBank: 41,
  pitch:
    "The eight physical-chemistry chapters: 20.2 questions a paper, and 56-83% of their answers are numbers. They are not hard (together about 4% HARD) but they take arithmetic, so they take time. Six of them run at about three questions every paper, and each chapter turns on one or two formulas used over and over. Know those cold and a calculation is a minute; half-know them and it is three.",
  approach: [
    "Learn each chapter's one or two workhorse formulas before anything else: ρ = zM/(a³N_A) for Solid State, ln 2/k for half-life, ΔT = iKm for the colligative properties, U = q + w with 100 J per dm³ bar for Thermodynamics, the Nernst equation for Electrochemistry.",
    "Answer these AFTER the first sweep of recall and reaction questions. They are worth one mark each, the same as a ten-second name question.",
    "Memorise log 2 = 0.301, log 3 = 0.477 and log 5 = 0.699: Chemical Kinetics and Ionic Equilibria use them in most questions, and there is no calculator.",
    "Electrochemistry holds 13 of the bank's 99 HARD questions, ten of them Nernst arithmetic on one page; Solid State's density and packing pages hold another twelve. Those pages are where extra HARD practice pays.",
    "All eight chapters have shipped teaching notes at /notes/mht-cet-chemistry, with every past-year question tagged to a page.",
  ],
  chapters: [
    {
      chapter: "Chemical Kinetics",
      qCount: 205,
      pctHard: 3,
      posture: "second-sweep",
      mustDrill: [
        "Rate of Reaction, Stoichiometry and Average Rate",
        "Rate Law, Order, Molecularity and Rate Expression",
        "First-Order Kinetics, Rate Constant and Half-Life",
        "Zero-Order Kinetics",
        "Reaction Mechanism, Intermediates and Rate-Determining Step",
        "Temperature Dependence, Arrhenius and Collision Theory",
      ],
      targetHard: ["Temperature Dependence, Arrhenius and Collision Theory"],
      expectedYieldPerPaper: "3.05 q/paper · 3 marks",
      studyHours: 5,
      summary:
        "205 q · 3% HARD · three questions every paper. 167 of them sit on three pages that have never produced a HARD question: rate and stoichiometry, rate law and order, and first-order kinetics (k = 2.303/t × log(a/(a − x)), t½ = 0.693/k). The Arrhenius page is small (18 q) and holds all six HARD.",
    },
    {
      chapter: "Ionic Equilibria",
      qCount: 201,
      pctHard: 3,
      posture: "second-sweep",
      mustDrill: [
        "Theories of Acids and Bases",
        "Salt Hydrolysis",
        "pH, pOH and Ionic Product of Water",
        "Ionic Equilibrium, Ka, Kb and Degree of Dissociation",
        "Buffer Solutions and Henderson-Hasselbalch",
        "Solubility Product (Ksp)",
      ],
      expectedYieldPerPaper: "3.03 q/paper · 3 marks",
      studyHours: 6,
      summary:
        "201 q · 3% HARD. The acid-base theories and salt hydrolysis (48 q) are recall: answer them on the first sweep. The rest is log arithmetic: pH = −log[H⁺], α = √(K/c), Henderson's equation, and Ksp by salt type (AB: s², AB₂: 4s³), the largest page at 46 questions.",
    },
    {
      chapter: "Chemical Thermodynamics and Energetics",
      qCount: 199,
      pctHard: 3,
      posture: "second-sweep",
      mustDrill: [
        "Thermodynamic Systems, Properties and Processes",
        "First Law of Thermodynamics, Internal Energy and Work",
        "Gibbs Free Energy and Spontaneity",
        "Entropy and Second Law",
        "Enthalpy and Relation Between ΔH and ΔU",
        "Thermochemistry, Hess's Law and Bond Enthalpy",
      ],
      expectedYieldPerPaper: "3.00 q/paper · 3 marks",
      studyHours: 5,
      summary:
        "199 q · 3% HARD. The first-law page is 76 questions: ΔU = q + w with the chemist's sign convention, w = −P_ext ΔV, and 1 dm³ bar = 100 J. ΔH = ΔU + Δn_gRT, Hess's law and the ΔG sign table carry most of the rest.",
    },
    {
      chapter: "Solutions and Colligative Properties",
      qCount: 208,
      pctHard: 3,
      posture: "second-sweep",
      mustDrill: [
        "Types of Solutions, Solubility and Henry's Law",
        "Vapour Pressure and Raoult's Law",
        "Elevation of Boiling Point",
        "Depression of Freezing Point",
        "Osmotic Pressure",
        "Van't Hoff Factor and Abnormal Molar Mass",
      ],
      expectedYieldPerPaper: "2.97 q/paper · about 3 marks",
      studyHours: 6,
      summary:
        "208 q · 3% HARD · the largest Chemistry chapter over all 68 papers. Four of its six pages are one idea (a colligative property depends on the number of dissolved particles), so ΔT_b = iK_bm, ΔT_f = iK_fm and π = iCRT share every trap. Henry's law is a single multiplication.",
    },
    {
      chapter: "Solid State",
      qCount: 205,
      pctHard: 6,
      posture: "second-sweep",
      mustDrill: [
        "Types of Solids, Crystal Systems and Properties",
        "Crystal Defects, Magnetic Properties and Semiconductors",
        "Unit Cells, Edge Length and Atomic Radius",
        "Density and Crystal Structure Calculations",
        "Packing Efficiency and Voids",
      ],
      targetHard: ["Density and Crystal Structure Calculations", "Packing Efficiency and Voids"],
      expectedYieldPerPaper: "2.92 q/paper · about 3 marks",
      studyHours: 6,
      summary:
        "205 q · 6% HARD. The density page (61 q) is ρ = zM/(a³N_A) solved for a different unknown each time; the radius page is r = a/2, a√2/4 or a√3/4 by cell type. The density and packing pages hold all twelve HARD questions. The types and defects pages are recall.",
    },
    {
      chapter: "Electrochemistry",
      qCount: 197,
      pctHard: 7,
      posture: "second-sweep",
      mustDrill: [
        "Batteries, Primary, Secondary and Fuel Cells",
        "Faraday's Laws of Electrolysis",
        "Cell Constant and Conductivity Measurements",
        "Molar Conductivity, Kohlrausch's Law and Degree of Dissociation",
        "Galvanic Cells, EMF, Nernst Equation and Thermodynamics",
      ],
      targetHard: ["Galvanic Cells, EMF, Nernst Equation and Thermodynamics"],
      expectedYieldPerPaper: "2.90 q/paper · about 3 marks",
      studyHours: 6,
      summary:
        "197 q · 7% HARD, the Chemistry chapter with the most HARD questions (13), and nearly all of them on one page: ten of the galvanic-cell page's 73 questions are HARD Nernst arithmetic. Faraday's laws, conductivity and batteries are either one division or recall.",
    },
    {
      chapter: "Some Basic Concepts of Chemistry",
      qCount: 80,
      pctHard: 1,
      posture: "second-sweep",
      mustDrill: [
        "SI Units, Physical Properties and Atomic Abundance",
        "Laws of Chemical Combination and Percentage Composition",
        "Mole Concept and Interconversions",
        "Stoichiometry and Concentration",
      ],
      expectedYieldPerPaper: "1.26 q/paper · about 1 mark",
      studyHours: 3,
      summary:
        "80 q · 1% HARD. It jumped to 1.54 a paper in 2025 and settled at 1.12 in 2026. The mole page is 50 questions: mass ↔ moles ↔ particles ↔ volume at STP. The same arithmetic runs through every other Calculate chapter.",
    },
    {
      chapter: "Structure of Atom",
      qCount: 99,
      pctHard: 1,
      posture: "second-sweep",
      mustDrill: [
        "Subatomic Particles, Isotopes, Isobars and Isoelectronic Species",
        "Electronic Configuration and Pauli/Hund Rules",
        "Electromagnetic Radiation and Wave Properties",
        "Bohr's Atomic Model",
        "Quantum Mechanical Model, de Broglie, Heisenberg and Quantum Numbers",
        "Hydrogen Spectrum and Rydberg Equation",
      ],
      expectedYieldPerPaper: "1.08 q/paper · 1 mark",
      studyHours: 3,
      summary:
        "99 q · 1% HARD, and HALVED in 2025 for good: 2.00 a paper across 2023-24, 1.00 in 2025, 1.12 in 2026. Bohr's radius and energy scaling, E = hc/λ and the quantum-number rules. Keep it, but on half the hours 2023-24 papers suggest.",
    },
  ],
};

export const REACTIONS_STRAND: StrategyStrand = {
  id: "reactions",
  label:
    "Reactions: Alcohols, Phenols and Ethers · Aldehydes, Ketones and Carboxylic Acids · Halogen Derivatives · Amines · Basic Principles of Organic Chemistry (733 q · 22% of bank)",
  qCount: 733,
  pctOfBank: 22,
  pitch:
    "The organic chapters: 11.2 questions a paper, answered by recognising a reagent, a named reaction or a naming rule, not by calculating. They are fast once the reactions are known, and slow only when a reagent has to be worked out from scratch. The prep is a list, learned in both directions: reagent to product and product to reagent.",
  approach: [
    "Learn the named reactions as pairs you can read either way: Rosenmund (acid chloride → aldehyde), Etard (toluene → benzaldehyde), Clemmensen and Wolff–Kishner (C=O → CH₂), Cannizzaro (no α-H), Hofmann bromamide (amide → amine with one carbon fewer), Finkelstein and Swarts (halide exchange), Wurtz and Fittig (coupling). The Reference page lists them.",
    "Naming questions are a big share: Alcohols' nomenclature page alone is 42 questions. One routine (longest chain with the functional group, lowest locant to it, alphabetical prefixes) answers them all.",
    "Answer these on the first sweep. A reagent you recognise is a ten-second mark; one you do not is a guess that costs nothing, so mark it and move on.",
    "Basic Principles of Organic Chemistry crossed the playbook line in 2026 and is the hardest chapter of any size (10% HARD). It is also the one every reaction chapter leans on (electronic effects, intermediates, isomerism), so read its notes before the reaction chapters.",
  ],
  chapters: [
    {
      chapter: "Alcohols, Phenols and Ethers",
      qCount: 198,
      pctHard: 5,
      posture: "first-sweep",
      mustDrill: [
        "Classification of Alcohols and Phenols",
        "IUPAC and Common Nomenclature of Alcohols, Phenols and Ethers",
        "Physical Properties of Alcohols, Phenols and Ethers",
        "Ethers, Preparation and Reactions",
        "Phenols, Preparation and Reactions",
        "Chemical Reactions of Alcohols and Acidity",
      ],
      expectedYieldPerPaper: "2.92 q/paper · about 3 marks",
      studyHours: 5,
      summary:
        "198 q · 5% HARD · the largest organic chapter. Half of it is naming, classifying and physical properties: primary, secondary, tertiary; the named phenols; an IUPAC name off a drawing. The reaction pages add Lucas' test, the Reimer–Tiemann and Kolbe reactions, and phenol's acidity order.",
    },
    {
      chapter: "Aldehydes, Ketones and Carboxylic Acids",
      qCount: 192,
      pctHard: 2,
      posture: "first-sweep",
      mustDrill: [
        "Nomenclature and Classification of Aldehydes, Ketones and Carboxylic Acids",
        "Oxidation, Reduction and Identification Tests",
        "Preparation Methods of Aldehydes and Ketones",
        "Nucleophilic Addition and Condensation Reactions",
        "Carboxylic Acids, Properties, Reactions and Derivatives",
      ],
      expectedYieldPerPaper: "2.92 q/paper · about 3 marks",
      studyHours: 5,
      summary:
        "192 q · 2% HARD, and up to 3.19 a paper in 2026. The named-reaction chapter: Rosenmund, Etard, Stephen and Gattermann–Koch make aldehydes; Clemmensen and Wolff–Kishner remove the C=O; Tollens', Fehling's and the iodoform test identify them; Cannizzaro needs no α-hydrogen.",
    },
    {
      chapter: "Halogen Derivatives of Alkanes",
      qCount: 137,
      pctHard: 1,
      posture: "first-sweep",
      mustDrill: [
        "Classification, Nomenclature and Physical Properties",
        "Polyhalogen Compounds — Freon, DDT, War Gases",
        "Preparation of Alkyl Halides",
        "Nucleophilic Substitution Reactions (SN1 and SN2)",
        "Elimination and Aromatic Nucleophilic Substitution",
      ],
      expectedYieldPerPaper: "2.18 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "137 q · 1% HARD. Finkelstein and Swarts, Wurtz and Fittig, SN1 against SN2 (tertiary halides go SN1, primary SN2; the largest page at 36 q), Saytzeff's rule for elimination, and a table of polyhalogen compounds: Freon-12, DDT, the war gases.",
    },
    {
      chapter: "Amines",
      qCount: 134,
      pctHard: 4,
      posture: "first-sweep",
      mustDrill: [
        "Nomenclature and Classification of Amines",
        "Physical Properties of Amines",
        "Preparation of Amines",
        "Diazonium Salts and Aromatic Amine Reactions",
        "Chemical Reactions and Basicity of Amines",
      ],
      expectedYieldPerPaper: "2.05 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "134 q · 4% HARD. Basicity order (in water: 2° > 1° > 3° > NH₃ for methylamines), Hinsberg's and the carbylamine test, Hofmann bromamide, and diazotisation to phenol or Sandmeyer products.",
    },
    {
      chapter: "Basic Principles of Organic Chemistry",
      qCount: 72,
      pctHard: 10,
      posture: "first-sweep",
      mustDrill: [
        "IUPAC Nomenclature, Functional Groups and Homologous Series",
        "Electronic Effects, Hybridization, Intermediates and General Reactions",
        "Isomerism and Stereochemistry",
      ],
      targetHard: ["Isomerism and Stereochemistry"],
      expectedYieldPerPaper: "1.15 q/paper · 1 mark",
      studyHours: 3,
      summary:
        "72 q · 10% HARD, the hardest chapter of any size, and a playbook since 2026 lifted it from 0.85 to 1.31 a paper. Functional-group priority and homologous series, inductive and resonance effects with carbocation stability, and isomer counting, where the HARD sits.",
    },
  ],
};

export const RECALL_STRAND: StrategyStrand = {
  id: "recall",
  label:
    "Recall: Biomolecules · Polymers · Coordination Compounds · Transition Elements · Chemical Bonding · Groups 16-18 · Redox · Green Chemistry · Surface Chemistry (935 q · 28% of bank)",
  qCount: 935,
  pctOfBank: 28,
  pitch:
    "The descriptive chapters: 14.2 questions a paper, answered from memory or by counting: a name, a monomer, a use, a trend, a shape, an oxidation state. Together they are about 2% HARD, and Surface Chemistry and Green Chemistry have never produced a HARD question. These are the fastest marks on Paper II, and the ones that fund the Physics minutes.",
  approach: [
    "Answer all of these on the first sweep. A recall question you know takes seconds; one you do not know will not come back with more time, so guess and move.",
    "Prep with tables, not prose: the monomer and uses tables for polymers, the linkage table for carbohydrates, ligand denticity for coordination compounds, the oxoacids for groups 16-18, the twelve principles for green chemistry. The Reference page and the notes hold them.",
    "Some of it is counting rather than memory: unpaired electrons and the spin-only moment μ = √(n(n + 2)), oxidation numbers, electron pairs for a VSEPR shape, bond order from molecular orbitals, atom economy. Count on paper; it is still fast.",
    "Every chapter here has shipped teaching notes at /notes/mht-cet-chemistry.",
  ],
  chapters: [
    {
      chapter: "Biomolecules",
      qCount: 150,
      pctHard: 1,
      posture: "first-sweep",
      mustDrill: [
        "Carbohydrates, Classification, Structure and Reactions",
        "Glycosidic Linkages in Di- and Polysaccharides",
        "Amino Acids, Peptides and Proteins",
        "Nucleic Acids, DNA, RNA, Nucleotides and Bases",
        "Lipids, Enzymes and Other Biomolecules",
      ],
      expectedYieldPerPaper: "2.31 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "150 q · 1% HARD. Reducing and non-reducing sugars, the glycosidic linkages (sucrose α1–β2, maltose α1–4, lactose β1–4), essential amino acids and peptide bonds (the largest page at 46 q), and the bases of DNA and RNA.",
    },
    {
      chapter: "Introduction to Polymer Chemistry",
      qCount: 139,
      pctHard: 1,
      posture: "first-sweep",
      mustDrill: [
        "Classification of Polymers",
        "Polymers and Their Monomers",
        "Properties and Applications of Polymers",
        "Polymerization Methods",
      ],
      expectedYieldPerPaper: "2.08 q/paper · about 2 marks",
      studyHours: 3,
      summary:
        "139 q · one HARD question in all of them. A monomer table (nylon 6,6: hexamethylenediamine + adipic acid; Buna-S: butadiene + styrene; Terylene: ethylene glycol + terephthalic acid) and a uses table.",
    },
    {
      chapter: "Coordination Compounds",
      qCount: 140,
      pctHard: 2,
      posture: "first-sweep",
      mustDrill: [
        "Complex Types, Homoleptic, Heteroleptic, Cationic, Anionic, Neutral",
        "Oxidation State, Coordination Number and IUPAC Nomenclature",
        "Ligands, Denticity and Donor Atoms",
        "Isomerism in Coordination Compounds",
        "Bonding Theories, EAN, Crystal Field, Hybridization and Magnetism",
      ],
      expectedYieldPerPaper: "2.03 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "140 q · 2% HARD. Counting: donor atoms and denticity (EDTA hexadentate), the metal's oxidation state and coordination number, EAN, and unpaired electrons for the magnetic moment.",
    },
    {
      chapter: "Transition and Inner Transition Elements",
      qCount: 126,
      pctHard: 2,
      posture: "first-sweep",
      mustDrill: [
        "Position, Electronic Configuration and General Features of d-Block",
        "Oxidation States of Transition Elements",
        "Colour, Magnetic Properties and Spin-Only Formula",
        "Alloys, Minerals, Ores and Catalysts",
        "Inner Transition Elements, Lanthanoids and Actinoids",
      ],
      expectedYieldPerPaper: "1.87 q/paper · about 2 marks",
      studyHours: 3,
      summary:
        "126 q · 2% HARD. Configurations (Cr and Cu break the pattern), the spin-only moment μ = √(n(n + 2)) BM, lanthanoid contraction, and which ion is coloured.",
    },
    {
      chapter: "Chemical Bonding and Molecular Structure",
      qCount: 96,
      pctHard: 2,
      posture: "first-sweep",
      mustDrill: [
        "Ionic and Covalent Bonding, Lewis Structures and Octet Rule",
        "Hybridization",
        "VSEPR Theory and Molecular Geometry",
        "Dipole Moment, Polarity and Intermolecular Forces",
        "Molecular Orbital Theory and Bond Order",
      ],
      expectedYieldPerPaper: "1.28 q/paper · about 1 mark",
      studyHours: 3,
      summary:
        "96 q · 2% HARD. Count electron pairs for a shape, count bonding minus antibonding electrons for a bond order, and learn which molecules have zero dipole moment.",
    },
    {
      chapter: "Elements of Group 16, 17 and 18",
      qCount: 80,
      pctHard: 4,
      posture: "first-sweep",
      mustDrill: [
        "Group 16 Chalcogens, Oxygen, Sulphur and Ozone",
        "Group 17 Halogens, Interhalogens and Oxoacids",
        "Group 18 Noble Gases and Xenon Compounds",
      ],
      expectedYieldPerPaper: "1.28 q/paper · about 1 mark",
      studyHours: 3,
      summary:
        "80 q · 4% HARD, and up from 1.00 a paper in 2023-24 to 1.38 in 2025 and 1.23 in 2026. Hydride stability and acidity trends, oxoacids of sulphur and chlorine, interhalogens, and xenon fluorides.",
    },
    {
      chapter: "Redox Reactions",
      qCount: 73,
      pctHard: 1,
      posture: "first-sweep",
      mustDrill: [
        "Oxidation Number Calculation and Determination",
        "Balancing Redox Reactions and Oxidized/Reduced Species",
        "Reducing/Oxidizing Agents and Acidic/Basic Oxides",
      ],
      expectedYieldPerPaper: "1.15 q/paper · 1 mark",
      studyHours: 2,
      summary:
        "73 q · 1% HARD. Almost all of it is the oxidation number, including the structural exceptions (peroxide oxygen, the S–S chain in tetrathionate).",
    },
    {
      chapter: "Green Chemistry and Nanochemistry",
      qCount: 63,
      pctHard: 0,
      posture: "first-sweep",
      mustDrill: [
        "Green Chemistry, Principles, Atom Economy and Green Solvents",
        "Nanochemistry, Nanostructures, Classification and Synthesis",
      ],
      expectedYieldPerPaper: "1.10 q/paper · 1 mark",
      studyHours: 2,
      summary:
        "63 q · never a HARD question, and rising two years running: 0.67 a paper in 2023-24, 1.00 in 2025, 1.15 in 2026. The principles of green chemistry, percentage atom economy, green solvents, and nanostructures by dimension.",
    },
    {
      chapter: "Surface Chemistry",
      qCount: 68,
      pctHard: 0,
      posture: "first-sweep",
      mustDrill: [
        "Adsorption, Physisorption, Chemisorption and Isotherms",
        "Colloids, Classification, Coagulation and Hardy-Schulze Rule",
        "Catalysis and Nanomaterials",
      ],
      expectedYieldPerPaper: "1.08 q/paper · 1 mark",
      studyHours: 2,
      summary:
        "68 q · never a HARD question. Physisorption against chemisorption, colloid types, and the Hardy–Schulze rule: the coagulating ion carries the charge opposite to the sol's.",
    },
  ],
};

export const STRATEGY_STRANDS = [CALCULATE_STRAND, REACTIONS_STRAND, RECALL_STRAND];

export type TailStatus = "live" | "entering" | "dropped";

export type TailChapter = {
  chapter: string;
  qCount: number;
  qPerPaper: number;
  pctHard: number;
  status: TailStatus;
  note: string;
};

/** The eight chapters below the 0.9 q/paper line on 2025-2026 papers. */
export const TAIL_CHAPTERS: TailChapter[] = [
  {
    chapter: "Elements of Group 1 and 2",
    qCount: 59,
    qPerPaper: 0.85,
    pctHard: 0,
    status: "live",
    note: "Just below the line at 0.85 a paper in both 2025 and 2026, and never a HARD question. Group trends, the lithium and beryllium anomalies, and the industrial processes by name: drill it with the Recall strand.",
  },
  {
    chapter: "States of Matter",
    qCount: 54,
    qPerPaper: 0.82,
    pctHard: 2,
    status: "live",
    note: "0.69 a paper in 2025, 0.88 in 2026. The gas laws and PV = nRT, the same arithmetic as Some Basic Concepts. Drill with the Calculate strand.",
  },
  {
    chapter: "Aromatic Compounds",
    qCount: 51,
    qPerPaper: 0.67,
    pctHard: 2,
    status: "live",
    note: "Falling: 0.85 a paper in 2023-24, 0.77 in 2025, 0.62 in 2026. Hückel's rule, ortho/para against meta directors, and side-chain oxidation to benzoic acid; drill it with the Reactions strand.",
  },
  {
    chapter: "Alkanes",
    qCount: 49,
    qPerPaper: 0.64,
    pctHard: 0,
    status: "live",
    note: "Never a HARD question, and down from 0.85 a paper in 2025 to 0.54 in 2026. Wurtz coupling, decarboxylation with soda-lime (one carbon fewer) and Grignard with water.",
  },
  {
    chapter: "Alkenes",
    qCount: 48,
    qPerPaper: 0.59,
    pctHard: 0,
    status: "live",
    note: "Never a HARD question, and down from 0.77 a paper in 2025 to 0.50 in 2026. Markovnikov and anti-Markovnikov addition and ozonolysis carry it.",
  },
  {
    chapter: "Modern Periodic Table",
    qCount: 26,
    qPerPaper: 0.28,
    pctHard: 0,
    status: "live",
    note: "Falling: 0.56 a paper in 2023-24, 0.23 in 2025, 0.31 in 2026. Periodic trends: worth an hour because every block chapter borrows them, not for its own marks.",
  },
  {
    chapter: "Alkynes",
    qCount: 15,
    qPerPaper: 0.21,
    pctHard: 0,
    status: "live",
    note: "Fifteen questions in 68 papers. Acidity of terminal alkynes and hydration to a carbonyl.",
  },
  {
    chapter: "Elements of Group 13, 14 and 15",
    qCount: 7,
    qPerPaper: 0.13,
    pctHard: 14,
    status: "live",
    note: "Seven questions in 68 papers. Not worth a session.",
  },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
