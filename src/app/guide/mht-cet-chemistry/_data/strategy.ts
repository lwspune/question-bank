/**
 * Content for /guide/mht-cet-chemistry/strategy.
 *
 * THE AXIS IS SPEED, NOT DIFFICULTY. Chemistry is 3.2% HARD, so "where the
 * HARD sits" — the Maths and Physics axis — decides almost nothing. What does
 * differ is how long a question takes: a recall or reaction question is read
 * and answered in seconds, a calculation needs arithmetic. With no negative
 * marking and one mark each, the order is: fast questions first, arithmetic
 * after, every bubble filled.
 *
 * AND CHEMISTRY FUNDS PHYSICS. Paper II is 100 questions in 90 minutes; the
 * suggested split is about 35 minutes here and 55 for Physics. That is a
 * starting budget to test in mocks, not a measurement, and the page says so.
 *
 * STRANDS are EXECUTION MODES, measured: the share of numerical answers is
 * 50-71% in the eight CALCULATE chapters and 3-31% in the rest. REACTIONS is
 * the organic reaction chapters (reagent -> product, named reactions); RECALL
 * is the descriptive chapters (names, structures, uses, trends).
 *
 * NUMBERS: lifetime counts over 2,074 PUBLIC PYQs (42 papers, 30 chapters);
 * q/paper is the 2024-2025 rate (24 papers). Strands + tail reconcile to 2,074
 * (872 + 465 + 569 + 168) and to 49.4 questions a paper.
 *
 * `mustDrill` / `skipSubtopics` / `targetHard` hold canonical DB subtopic
 * names; tests/guide-mht-cet-chemistry-playbooks.test.ts resolves every one.
 */

import type { Difficulty } from "@/lib/questions/filters";

/** When on the paper a chapter's questions get answered. */
export type DrillPosture =
  /** Answered on sight in the first sweep — a name, a structure, a reagent. */
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
  /** Last in the PREP queue — never an instruction to leave a question blank. */
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
    "Paper II gives you 90 minutes for 100 questions — Physics 1-50, Chemistry 51-100 — and does not divide them. The split is yours.",
    "Chemistry is the cheaper half: about 3% of its questions are HARD against 18% in Physics, and roughly half of them are answered by recognising a name, a structure or a reagent. Every minute Chemistry does not need is a minute Physics can use.",
    "A starting budget to test in timed mocks: Chemistry in about 35 minutes, Physics in about 55. Inside the 35: the recall and reaction questions on a first sweep (about 25 of them, seconds each), then the calculations. This is a recommendation, not a measurement — after two timed mocks, move it by your own numbers.",
    "Many students take Chemistry first so its marks are banked before Physics starts eating the clock. Whatever the order, set a clock time to switch halves and keep to it.",
  ],
};

export const CALCULATE_STRAND: StrategyStrand = {
  id: "calculate",
  label:
    "Calculate — Solutions · Solid State · Chemical Kinetics · Ionic Equilibria · Thermodynamics · Electrochemistry · Structure of Atom · Some Basic Concepts (872 q · 42% of bank)",
  qCount: 872,
  pctOfBank: 42,
  pitch:
    "The eight physical-chemistry chapters: 20.8 questions a paper, and 50-71% of their answers are numbers. They are not hard — together about 4% HARD — but they take arithmetic, so they take time. Each chapter turns on one or two formulas used over and over. Know those cold and a calculation is a minute; half-know them and it is three.",
  approach: [
    "Learn each chapter's one or two workhorse formulas before anything else: ρ = zM/(a³N_A) for Solid State, ln 2/k for half-life, ΔT = iKm for the colligative properties, U = q + w with 100 J per dm³ bar for Thermodynamics, the Nernst equation for Electrochemistry.",
    "Answer these AFTER the first sweep of recall and reaction questions. They are worth one mark each, the same as a ten-second name question.",
    "Memorise log 2 = 0.301, log 3 = 0.477 and log 5 = 0.699: Chemical Kinetics and Ionic Equilibria use them in most questions, and there is no calculator.",
    "Electrochemistry holds 11 of the bank's 67 HARD questions — ten of them Nernst arithmetic on one page. That page is the only place in Chemistry where extra HARD practice pays.",
    "All eight chapters have shipped teaching notes at /notes/mht-cet-chemistry, with every past-year question tagged to a page.",
  ],
  chapters: [
    {
      chapter: "Solutions and Colligative Properties",
      qCount: 131,
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
      expectedYieldPerPaper: "3.17 q/paper · about 3 marks",
      studyHours: 6,
      summary:
        "131 q · 3% HARD · the heaviest Chemistry chapter on recent papers. Four of its six pages are one idea — a colligative property depends on the number of dissolved particles — so ΔT_b = iK_bm, ΔT_f = iK_fm and π = iCRT share every trap. Henry's law is a single multiplication.",
    },
    {
      chapter: "Solid State",
      qCount: 130,
      pctHard: 5,
      posture: "second-sweep",
      mustDrill: [
        "Types of Solids, Crystal Systems and Properties",
        "Crystal Defects, Magnetic Properties and Semiconductors",
        "Unit Cells, Edge Length and Atomic Radius",
        "Density and Crystal Structure Calculations",
        "Packing Efficiency and Voids",
      ],
      targetHard: ["Packing Efficiency and Voids"],
      expectedYieldPerPaper: "3.04 q/paper · about 3 marks",
      studyHours: 6,
      summary:
        "130 q · 5% HARD. The density page (42 q) is ρ = zM/(a³N_A) solved for a different unknown each time; the radius page is r = a/2, a√2/4 or a√3/4 by cell type. Packing efficiency and voids (27 q, 15%) holds most of the HARD. The types and defects pages are recall.",
    },
    {
      chapter: "Chemical Kinetics",
      qCount: 125,
      pctHard: 2,
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
      expectedYieldPerPaper: "3.00 q/paper · 3 marks",
      studyHours: 5,
      summary:
        "125 q · 2% HARD · three questions every paper. 103 of them sit on three pages that have never produced a HARD question: rate and stoichiometry, rate law and order, and first-order kinetics (k = 2.303/t × log(a/(a − x)), t½ = 0.693/k). The Arrhenius page is small (8 q) and holds the HARD.",
    },
    {
      chapter: "Ionic Equilibria",
      qCount: 122,
      pctHard: 2,
      posture: "second-sweep",
      mustDrill: [
        "Theories of Acids and Bases",
        "Salt Hydrolysis",
        "pH, pOH and Ionic Product of Water",
        "Ionic Equilibrium, Ka, Kb and Degree of Dissociation",
        "Buffer Solutions and Henderson-Hasselbalch",
        "Solubility Product (Ksp)",
      ],
      expectedYieldPerPaper: "2.96 q/paper · about 3 marks",
      studyHours: 6,
      summary:
        "122 q · 2% HARD. The acid-base theories and salt hydrolysis (28 q) are recall — answer them on the first sweep. The rest is log arithmetic: pH = −log[H⁺], α = √(K/c), Henderson's equation, and Ksp by salt type (AB: s², AB₂: 4s³).",
    },
    {
      chapter: "Chemical Thermodynamics and Energetics",
      qCount: 121,
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
      expectedYieldPerPaper: "2.96 q/paper · about 3 marks",
      studyHours: 5,
      summary:
        "121 q · 3% HARD. The first-law page is 50 questions: ΔU = q + w with the chemist's sign convention, w = −P_ext ΔV, and 1 dm³ bar = 100 J. ΔH = ΔU + Δn_gRT and the ΔG sign table carry most of the rest.",
    },
    {
      chapter: "Electrochemistry",
      qCount: 122,
      pctHard: 9,
      posture: "second-sweep",
      mustDrill: [
        "Batteries, Primary, Secondary and Fuel Cells",
        "Faraday's Laws of Electrolysis",
        "Cell Constant and Conductivity Measurements",
        "Molar Conductivity, Kohlrausch's Law and Degree of Dissociation",
        "Galvanic Cells, EMF, Nernst Equation and Thermodynamics",
      ],
      targetHard: ["Galvanic Cells, EMF, Nernst Equation and Thermodynamics"],
      expectedYieldPerPaper: "2.88 q/paper · about 3 marks",
      studyHours: 6,
      summary:
        "122 q · 9% HARD — the only Chemistry chapter with real HARD load, and nearly all of it on one page: ten of the galvanic-cell page's 48 questions are HARD Nernst arithmetic. Faraday's laws, conductivity and batteries are either one division or recall.",
    },
    {
      chapter: "Structure of Atom",
      qCount: 70,
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
      expectedYieldPerPaper: "1.42 q/paper · about 1-2 marks",
      studyHours: 3,
      summary:
        "70 q · 1% HARD, and HALVED in 2025 (2.00 to 1.00 a paper). Bohr's radius and energy scaling, E = hc/λ and the quantum-number rules. Keep it, but on fewer hours than 2023-24 papers suggest.",
    },
    {
      chapter: "Some Basic Concepts of Chemistry",
      qCount: 51,
      pctHard: 2,
      posture: "second-sweep",
      mustDrill: [
        "SI Units, Physical Properties and Atomic Abundance",
        "Laws of Chemical Combination and Percentage Composition",
        "Mole Concept and Interconversions",
        "Stoichiometry and Concentration",
      ],
      expectedYieldPerPaper: "1.33 q/paper · about 1 mark",
      studyHours: 3,
      summary:
        "51 q · 2% HARD, and rising (1.15 to 1.54 a paper in 2025). The mole page is 31 questions: mass ↔ moles ↔ particles ↔ volume at STP. The same arithmetic runs through every other Calculate chapter.",
    },
  ],
};

export const REACTIONS_STRAND: StrategyStrand = {
  id: "reactions",
  label:
    "Reactions — Alcohols, Phenols and Ethers · Aldehydes, Ketones and Carboxylic Acids · Amines · Halogen Derivatives · Aromatic Compounds · Alkanes (465 q · 22% of bank)",
  qCount: 465,
  pctOfBank: 22,
  pitch:
    "The organic reaction chapters: 11.3 questions a paper, answered by recognising a reagent, a named reaction or a naming rule — not by calculating. They are fast once the reactions are known, and slow only when a reagent has to be worked out from scratch. The prep is a list, learned in both directions: reagent to product and product to reagent.",
  approach: [
    "Learn the named reactions as pairs you can read either way: Rosenmund (acid chloride → aldehyde), Etard (toluene → benzaldehyde), Clemmensen and Wolff–Kishner (C=O → CH₂), Cannizzaro (no α-H), Hofmann bromamide (amide → amine with one carbon fewer), Finkelstein and Swarts (halide exchange), Wurtz and Fittig (coupling). The Reference page lists them.",
    "Naming questions are a big share — Alcohols' nomenclature page alone is 34 questions. One routine (longest chain with the functional group, lowest locant to it, alphabetical prefixes) answers them all.",
    "Answer these on the first sweep. A reagent you recognise is a ten-second mark; one you do not is a guess that costs nothing, so mark it and move on.",
    "Basic Principles of Organic Chemistry sits just below the playbook line but is the hardest chapter of any size (13% HARD) and the one every reaction chapter leans on — electronic effects and intermediates. Read its notes before the reaction chapters.",
  ],
  chapters: [
    {
      chapter: "Alcohols, Phenols and Ethers",
      qCount: 126,
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
      expectedYieldPerPaper: "3.04 q/paper · about 3 marks",
      studyHours: 5,
      summary:
        "126 q · 5% HARD · the heaviest organic chapter. More than half of it is naming and classifying — primary, secondary, tertiary; the named phenols; an IUPAC name off a drawing. The reaction pages add Lucas' test, the Reimer–Tiemann and Kolbe reactions, and phenol's acidity order.",
    },
    {
      chapter: "Aldehydes, Ketones and Carboxylic Acids",
      qCount: 109,
      pctHard: 3,
      posture: "first-sweep",
      mustDrill: [
        "Nomenclature and Classification of Aldehydes, Ketones and Carboxylic Acids",
        "Oxidation, Reduction and Identification Tests",
        "Preparation Methods of Aldehydes and Ketones",
        "Nucleophilic Addition and Condensation Reactions",
        "Carboxylic Acids, Properties, Reactions and Derivatives",
      ],
      expectedYieldPerPaper: "2.54 q/paper · about 3 marks",
      studyHours: 5,
      summary:
        "109 q · 3% HARD. The named-reaction chapter: Rosenmund, Etard, Stephen and Gattermann–Koch make aldehydes; Clemmensen and Wolff–Kishner remove the C=O; Tollens', Fehling's and the iodoform test identify them; Cannizzaro needs no α-hydrogen.",
    },
    {
      chapter: "Amines",
      qCount: 81,
      pctHard: 4,
      posture: "first-sweep",
      mustDrill: [
        "Nomenclature and Classification of Amines",
        "Physical Properties of Amines",
        "Preparation of Amines",
        "Diazonium Salts and Aromatic Amine Reactions",
        "Chemical Reactions and Basicity of Amines",
      ],
      expectedYieldPerPaper: "1.96 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "81 q · 4% HARD. Basicity order (in water: 2° > 1° > 3° > NH₃ for methylamines), Hinsberg's and the carbylamine test, Hofmann bromamide, and diazotisation to phenol or Sandmeyer products.",
    },
    {
      chapter: "Halogen Derivatives of Alkanes",
      qCount: 79,
      pctHard: 3,
      posture: "first-sweep",
      mustDrill: [
        "Classification, Nomenclature and Physical Properties",
        "Polyhalogen Compounds — Freon, DDT, War Gases",
        "Preparation of Alkyl Halides",
        "Nucleophilic Substitution Reactions (SN1 and SN2)",
        "Elimination and Aromatic Nucleophilic Substitution",
      ],
      expectedYieldPerPaper: "1.83 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "79 q · 3% HARD. Finkelstein and Swarts, Wurtz and Fittig, SN1 against SN2 (tertiary halides go SN1, primary SN2), Saytzeff's rule for elimination, and a table of polyhalogen compounds — Freon-12, DDT, the war gases.",
    },
    {
      chapter: "Aromatic Compounds",
      qCount: 35,
      pctHard: 3,
      posture: "first-sweep",
      mustDrill: [
        "Structure, Aromaticity and Identification",
        "Electrophilic Aromatic Substitution",
        "Side-Chain Reactions, Oxidation and Other Transformations",
      ],
      expectedYieldPerPaper: "0.96 q/paper · 1 mark",
      studyHours: 2,
      summary:
        "35 q · 3% HARD. Hückel's 4n + 2 rule, ortho/para against meta directors, and side-chain oxidation to benzoic acid.",
    },
    {
      chapter: "Alkanes",
      qCount: 35,
      pctHard: 0,
      posture: "first-sweep",
      mustDrill: [
        "Nomenclature, Structural Isomers and Physical Properties",
        "Preparation of Alkanes, Wurtz, Grignard and Decarboxylation",
        "Reactions of Alkanes, Free Radical Halogenation",
      ],
      expectedYieldPerPaper: "0.92 q/paper · 1 mark",
      studyHours: 2,
      summary:
        "35 q · never a HARD question. Wurtz coupling (twice the chain), decarboxylation with soda-lime (one carbon fewer), Grignard with water, and chain isomers.",
    },
  ],
};

export const RECALL_STRAND: StrategyStrand = {
  id: "recall",
  label:
    "Recall — Biomolecules · Coordination Compounds · Polymers · Transition Elements · Chemical Bonding · Groups 16-18 · Redox · Surface Chemistry · Groups 1 and 2 (569 q · 27% of bank)",
  qCount: 569,
  pctOfBank: 27,
  pitch:
    "The descriptive chapters: 13.6 questions a paper, answered from memory or by counting — a name, a monomer, a use, a trend, a shape, an oxidation state. Together they are about 2% HARD, and Surface Chemistry and Groups 1 and 2 have never produced a HARD question. These are the fastest marks on Paper II, and the ones that fund the Physics minutes.",
  approach: [
    "Answer all of these on the first sweep. A recall question you know takes seconds; one you do not know will not come back with more time, so guess and move.",
    "Prep with tables, not prose: the monomer and uses tables for polymers, the linkage table for carbohydrates, ligand denticity for coordination compounds, the oxoacids for groups 16-18. The Reference page and the notes hold them.",
    "Some of it is counting rather than memory — unpaired electrons and the spin-only moment μ = √(n(n + 2)), oxidation numbers, electron pairs for a VSEPR shape, bond order from molecular orbitals. Count on paper; it is still fast.",
    "Every chapter here has shipped teaching notes at /notes/mht-cet-chemistry.",
  ],
  chapters: [
    {
      chapter: "Biomolecules",
      qCount: 88,
      pctHard: 2,
      posture: "first-sweep",
      mustDrill: [
        "Carbohydrates, Classification, Structure and Reactions",
        "Glycosidic Linkages in Di- and Polysaccharides",
        "Amino Acids, Peptides and Proteins",
        "Nucleic Acids, DNA, RNA, Nucleotides and Bases",
        "Lipids, Enzymes and Other Biomolecules",
      ],
      expectedYieldPerPaper: "2.17 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "88 q · 2% HARD. Reducing and non-reducing sugars, the glycosidic linkages (sucrose α1–β2, maltose α1–4, lactose β1–4), essential amino acids and peptide bonds, and the bases of DNA and RNA.",
    },
    {
      chapter: "Coordination Compounds",
      qCount: 88,
      pctHard: 2,
      posture: "first-sweep",
      mustDrill: [
        "Complex Types, Homoleptic, Heteroleptic, Cationic, Anionic, Neutral",
        "Oxidation State, Coordination Number and IUPAC Nomenclature",
        "Ligands, Denticity and Donor Atoms",
        "Isomerism in Coordination Compounds",
        "Bonding Theories, EAN, Crystal Field, Hybridization and Magnetism",
      ],
      expectedYieldPerPaper: "2.12 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "88 q · 2% HARD. Counting: donor atoms and denticity (EDTA hexadentate), the metal's oxidation state and coordination number, EAN, and unpaired electrons for the magnetic moment.",
    },
    {
      chapter: "Introduction to Polymer Chemistry",
      qCount: 85,
      pctHard: 1,
      posture: "first-sweep",
      mustDrill: [
        "Classification of Polymers",
        "Polymers and Their Monomers",
        "Properties and Applications of Polymers",
        "Polymerization Methods",
      ],
      expectedYieldPerPaper: "2.04 q/paper · about 2 marks",
      studyHours: 3,
      summary:
        "85 q · one HARD question in all of them. A monomer table (nylon 6,6: hexamethylenediamine + adipic acid; Buna-S: butadiene + styrene; Terylene: ethylene glycol + terephthalic acid) and a uses table.",
    },
    {
      chapter: "Transition and Inner Transition Elements",
      qCount: 76,
      pctHard: 4,
      posture: "first-sweep",
      mustDrill: [
        "Position, Electronic Configuration and General Features of d-Block",
        "Oxidation States of Transition Elements",
        "Colour, Magnetic Properties and Spin-Only Formula",
        "Alloys, Minerals, Ores and Catalysts",
        "Inner Transition Elements, Lanthanoids and Actinoids",
      ],
      expectedYieldPerPaper: "1.75 q/paper · about 2 marks",
      studyHours: 3,
      summary:
        "76 q · 4% HARD. Configurations (Cr and Cu break the pattern), the spin-only moment μ = √(n(n + 2)) BM, lanthanoid contraction, and which ion is coloured.",
    },
    {
      chapter: "Chemical Bonding and Molecular Structure",
      qCount: 64,
      pctHard: 3,
      posture: "first-sweep",
      mustDrill: [
        "Ionic and Covalent Bonding, Lewis Structures and Octet Rule",
        "Hybridization",
        "VSEPR Theory and Molecular Geometry",
        "Dipole Moment, Polarity and Intermolecular Forces",
        "Molecular Orbital Theory and Bond Order",
      ],
      expectedYieldPerPaper: "1.29 q/paper · about 1 mark",
      studyHours: 3,
      summary:
        "64 q · 3% HARD. Count electron pairs for a shape, count bonding minus antibonding electrons for a bond order, and learn which molecules have zero dipole moment.",
    },
    {
      chapter: "Elements of Group 16, 17 and 18",
      qCount: 48,
      pctHard: 2,
      posture: "first-sweep",
      mustDrill: [
        "Group 16 Chalcogens, Oxygen, Sulphur and Ozone",
        "Group 17 Halogens, Interhalogens and Oxoacids",
        "Group 18 Noble Gases and Xenon Compounds",
      ],
      expectedYieldPerPaper: "1.29 q/paper · about 1 mark",
      studyHours: 3,
      summary:
        "48 q · 2% HARD, and rising (1.00 to 1.38 a paper in 2025). Hydride stability and acidity trends, oxoacids of sulphur and chlorine, interhalogens, and xenon fluorides.",
    },
    {
      chapter: "Redox Reactions",
      qCount: 44,
      pctHard: 2,
      posture: "first-sweep",
      mustDrill: [
        "Oxidation Number Calculation and Determination",
        "Balancing Redox Reactions and Oxidized/Reduced Species",
        "Reducing/Oxidizing Agents and Acidic/Basic Oxides",
      ],
      expectedYieldPerPaper: "1.08 q/paper · 1 mark",
      studyHours: 2,
      summary:
        "44 q · 2% HARD. Almost all of it is the oxidation number — including the structural exceptions (peroxide oxygen, the S–S chain in tetrathionate).",
    },
    {
      chapter: "Surface Chemistry",
      qCount: 39,
      pctHard: 0,
      posture: "first-sweep",
      mustDrill: [
        "Adsorption, Physisorption, Chemisorption and Isotherms",
        "Colloids, Classification, Coagulation and Hardy-Schulze Rule",
        "Catalysis and Nanomaterials",
      ],
      expectedYieldPerPaper: "0.92 q/paper · 1 mark",
      studyHours: 2,
      summary:
        "39 q · never a HARD question. Physisorption against chemisorption, colloid types, and the Hardy–Schulze rule — the coagulating ion carries the charge opposite to the sol's.",
    },
    {
      chapter: "Elements of Group 1 and 2",
      qCount: 37,
      pctHard: 0,
      posture: "first-sweep",
      mustDrill: [
        "Group 1 Alkali Metals, Properties and Reactivity",
        "Group 2 Alkaline Earth Metals, Properties and Reactivity",
        "Industrial Processes, Minerals, Hydrogen Compounds and Alloys",
      ],
      expectedYieldPerPaper: "0.92 q/paper · 1 mark",
      studyHours: 2,
      summary:
        "37 q · never a HARD question. Trends down the groups, the anomalies of lithium and beryllium (small ions), and the industrial processes by name.",
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

/** The seven chapters below the 0.9 q/paper line. */
export const TAIL_CHAPTERS: TailChapter[] = [
  {
    chapter: "Basic Principles of Organic Chemistry",
    qCount: 38,
    qPerPaper: 0.88,
    pctHard: 13,
    status: "live",
    note: "Just below the line, and the hardest chapter of any size at 13% HARD. More important than its rate: electronic effects, intermediates and isomerism run through every Reactions chapter. Read its notes before them.",
  },
  {
    chapter: "Alkenes",
    qCount: 35,
    qPerPaper: 0.75,
    pctHard: 0,
    status: "live",
    note: "Never a HARD question. Markovnikov and anti-Markovnikov addition and ozonolysis carry it; drill it with the Reactions strand.",
  },
  {
    chapter: "Green Chemistry and Nanochemistry",
    qCount: 33,
    qPerPaper: 0.75,
    pctHard: 0,
    status: "live",
    note: "Rising: 0.67 a paper in 2023-24, 1.00 in 2025 — above the line on 2025 alone. Pure recall of the twelve principles, atom economy and nanostructures, never HARD.",
  },
  {
    chapter: "States of Matter",
    qCount: 31,
    qPerPaper: 0.67,
    pctHard: 3,
    status: "live",
    note: "The gas laws and PV = nRT — the same arithmetic as Some Basic Concepts. Drill with the Calculate strand.",
  },
  {
    chapter: "Modern Periodic Table",
    qCount: 18,
    qPerPaper: 0.42,
    pctHard: 0,
    status: "live",
    note: "Falling: 0.56 a paper in 2023-24, 0.23 in 2025. Periodic trends — worth an hour because every block chapter borrows them, not for its own marks.",
  },
  {
    chapter: "Alkynes",
    qCount: 10,
    qPerPaper: 0.29,
    pctHard: 0,
    status: "live",
    note: "Ten questions in 42 papers. Acidity of terminal alkynes and hydration to a carbonyl.",
  },
  {
    chapter: "Elements of Group 13, 14 and 15",
    qCount: 3,
    qPerPaper: 0.08,
    pctHard: 33,
    status: "live",
    note: "Three questions in 42 papers. Not worth a session.",
  },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
