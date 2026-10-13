/**
 * Static content + numbers for the /guide/mht-cet-chemistry route.
 *
 * Pulled from the live MHT-CET Chemistry PUBLIC bank (PYQ only), measured
 * 2026-10-13 after the 26 papers of 2026 went public with their difficulty
 * labels re-graded onto the 2021-2025 scale. 68 papers, each a real sitting
 * holding at most 50 Chemistry questions.
 *
 * THE TEMPLATE WAS CHOSEN BY MEASUREMENT, AND IT IS NOT THE PHYSICS ONE.
 *
 *   - Chemistry is FLAT: 99 of 3,371 questions are HARD (2.9%), and no
 *     chapter of any size reaches 10% except Basic Principles of Organic
 *     Chemistry (7 of 72, 10%). A HARD-driven tier axis, what Maths and
 *     Physics use, would sort almost nothing.
 *   - Chemistry DOES partition by execution mode. The share of correct
 *     answers that are a number (a value, an oxidation state, a count:
 *     re-measured 2026-10-13 as "the keyed option starts with a number",
 *     IUPAC locants excluded) runs 56-83% in the eight physical chapters and
 *     0-27% in the organic and descriptive ones, Redox apart (51%: its
 *     numbers are oxidation states, found by counting). So the strands are
 *     execution modes (the Template B default): CALCULATE (physical),
 *     REACTIONS (organic), RECALL (descriptive).
 *   - Difficulty is not the axis; SPEED is. Recall and reaction questions take
 *     seconds, calculations about a minute, and every question pays one mark.
 *
 * Paper II is Physics (1-50) and Chemistry (51-100) in ONE 90-minute clock
 * (src/lib/mocks/blueprints.ts). This guide's time split matches the Physics
 * guide's: about 35 minutes for Chemistry, 55 for Physics. A starting budget
 * to test in timed mocks, never a measurement.
 *
 * The `/reference` route replaces the Maths and Physics `/formulas` page: the
 * flat-list artefact here is reactions and reagents as much as formulas.
 */

export type GuideRoute = {
  slug: string;
  label: string;
  blurb: string;
};

export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How MHT-CET Chemistry actually works: 50 questions sharing 90 minutes with Physics, no negative marking, 3% HARD, and what 3,371 past-year questions across 68 papers reveal.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Calculate, Reactions, Recall: the strands are how a question is answered, not how hard it is. Answer the fast ones first and bank time for Physics.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "22 playbooks, one per chapter above 0.9 questions per paper on the 2025-2026 papers. The subtopic split, the named reactions and formulas each chapter turns on, and its traps.",
  },
  {
    slug: "reference",
    label: "Reference",
    blurb:
      "One page of the named reactions, reagents and physical-chemistry formulas the paper actually asks, grouped by chapter.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "What 2025 and 2026 moved: Structure of Atom halved and stayed there, Green Chemistry and Groups 16-18 rose, the hydrocarbons fell in 2026, and the 2025 drop in EASY questions did not last.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "On a 3%-HARD paper, marks are lost to misreading, not difficulty: the reagent that looks like another, the unit left unconverted, the order that runs backwards.",
  },
];

export type Overview = {
  totalQ: number;
  /** Distinct papers, by year + pyq_note: 2021 = 1, 2022 = 1, 2023 = 16,
   *  2024 = 11, 2025 = 13, 2026 = 26. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** 22 of the 30 chapters clear the 0.9 q/paper line on 2025-2026 papers. */
  playbooks: number;
  /** `questions` / `totalMarks` are the Chemistry half of Paper II;
   *  `paperQuestions` and `durationMinutes` are the whole shared paper. */
  paper: {
    questions: number;
    marksPerQuestion: number;
    totalMarks: number;
    paperQuestions: number;
    durationMinutes: number;
    negativeMarking: false;
    minutesPerQuestion: number;
  };
  /** A STARTING budget for the shared 90 minutes, not a measurement. */
  timeSplit: { chemistryMinutes: number; physicsMinutes: number };
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string;
};

export const OVERVIEW: Overview = {
  totalQ: 3371,
  papers: 68,
  yearsCovered: 6,
  chapters: 30,
  playbooks: 22,
  paper: {
    questions: 50,
    marksPerQuestion: 1,
    totalMarks: 50,
    paperQuestions: 100,
    durationMinutes: 90,
    negativeMarking: false,
    minutesPerQuestion: 0.9,
  },
  timeSplit: { chemistryMinutes: 35, physicsMinutes: 55 },
  // EASY 56.2% · MODERATE 40.8% · HARD 2.9%. Sums to totalQ.
  difficulty: { easy: 1895, moderate: 1377, hard: 99 },
  asOf: "2026-10-13",
};

export type ChapterStatus = "live" | "dropped" | "entered";

export type ChapterRow = {
  chapter: string;
  /** Lifetime PUBLIC PYQ count across all 68 papers. */
  qCount: number;
  /** % of the 3,371-question bank (1 decimal). */
  pctTotal: number;
  /** Questions per paper on RECENT papers (2025-2026, 39 papers). */
  qPerPaper: number;
  pctHard: number;
  /** Subtopic split, canonical DB names, copy exactly. */
  focus: string;
  status?: ChapterStatus;
  note?: string;
};

/** All 30 chapters, sorted by RECENT weightage. Generated from the grid
 *  (qCount, qPerPaper, pctTotal) by the authoring script; the qCounts sum to
 *  exactly 3,371 and tests/guide-mht-cet-chemistry-playbooks.test.ts
 *  recomputes every number from matrix.generated.ts. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Chemical Kinetics",
    qCount: 205,
    pctTotal: 6.1,
    qPerPaper: 3.05,
    pctHard: 3,
    focus:
      "First-Order Kinetics, Rate Constant and Half-Life (77 · 0% HARD), Rate Law, Order, Molecularity and Rate Expression (59 · 0%), Rate of Reaction, Stoichiometry and Average Rate (31 · 0%), Temperature Dependence, Arrhenius and Collision Theory (18 · 33%), Zero-Order Kinetics (11 · 0%), Reaction Mechanism, Intermediates and Rate-Determining Step (9 · 0%). Three questions every paper; 167 of its 205 questions sit on three pages with no HARD question at all.",
  },
  {
    chapter: "Ionic Equilibria",
    qCount: 201,
    pctTotal: 6.0,
    qPerPaper: 3.03,
    pctHard: 3,
    focus:
      "Solubility Product (Ksp) (46 · 4% HARD), pH, pOH and Ionic Product of Water (42 · 10%), Ionic Equilibrium, Ka, Kb and Degree of Dissociation (39 · 0%), Buffer Solutions and Henderson-Hasselbalch (26 · 4%), Salt Hydrolysis (25 · 0%), Theories of Acids and Bases (23 · 0%). Log arithmetic on four pages; salt hydrolysis and the acid-base theories are pure recall.",
  },
  {
    chapter: "Chemical Thermodynamics and Energetics",
    qCount: 199,
    pctTotal: 5.9,
    qPerPaper: 3.0,
    pctHard: 3,
    focus:
      "First Law of Thermodynamics, Internal Energy and Work (76 · 3% HARD), Thermochemistry, Hess's Law and Bond Enthalpy (42 · 2%), Gibbs Free Energy and Spontaneity (23 · 0%), Enthalpy and Relation Between ΔH and ΔU (23 · 9%), Thermodynamic Systems, Properties and Processes (22 · 0%), Entropy and Second Law (13 · 0%). The first-law page is 76 questions: signs and unit conversions, 100 J per dm³ bar.",
  },
  {
    chapter: "Solutions and Colligative Properties",
    qCount: 208,
    pctTotal: 6.2,
    qPerPaper: 2.97,
    pctHard: 3,
    focus:
      "Osmotic Pressure (44 · 0% HARD), Elevation of Boiling Point (43 · 5%), Types of Solutions, Solubility and Henry's Law (41 · 2%), Vapour Pressure and Raoult's Law (33 · 3%), Van't Hoff Factor and Abnormal Molar Mass (25 · 12%), Depression of Freezing Point (22 · 0%). The largest Chemistry chapter over all 68 papers, and four of its six pages are the same move: a colligative property is proportional to the number of dissolved particles.",
  },
  {
    chapter: "Solid State",
    qCount: 205,
    pctTotal: 6.1,
    qPerPaper: 2.92,
    pctHard: 6,
    focus:
      "Density and Crystal Structure Calculations (61 · 10% HARD), Packing Efficiency and Voids (49 · 12%), Unit Cells, Edge Length and Atomic Radius (42 · 0%), Types of Solids, Crystal Systems and Properties (27 · 0%), Crystal Defects, Magnetic Properties and Semiconductors (26 · 0%). One formula, ρ = zM/(a³N_A), carries the density page; the density and packing pages hold all twelve of the chapter's HARD questions.",
  },
  {
    chapter: "Alcohols, Phenols and Ethers",
    qCount: 198,
    pctTotal: 5.9,
    qPerPaper: 2.92,
    pctHard: 5,
    focus:
      "IUPAC and Common Nomenclature of Alcohols, Phenols and Ethers (42 · 7% HARD), Phenols, Preparation and Reactions (38 · 5%), Classification of Alcohols and Phenols (32 · 3%), Chemical Reactions of Alcohols and Acidity (31 · 10%), Ethers, Preparation and Reactions (29 · 3%), Physical Properties of Alcohols, Phenols and Ethers (26 · 0%). The largest organic chapter, and half of it is naming, classifying and physical properties.",
  },
  {
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    qCount: 192,
    pctTotal: 5.7,
    qPerPaper: 2.92,
    pctHard: 2,
    focus:
      "Preparation Methods of Aldehydes and Ketones (45 · 4% HARD), Carboxylic Acids, Properties, Reactions and Derivatives (43 · 0%), Oxidation, Reduction and Identification Tests (37 · 3%), Nomenclature and Classification of Aldehydes, Ketones and Carboxylic Acids (36 · 0%), Nucleophilic Addition and Condensation Reactions (31 · 3%). A named-reaction chapter: Rosenmund, Etard, Stephen, Clemmensen, Wolff–Kishner, Cannizzaro.",
    note:
      "Rose in 2026: 2.38 questions a paper across the 13 papers of 2025, then 3.19 across the 26 of 2026, level with the heaviest physical chapters.",
  },
  {
    chapter: "Electrochemistry",
    qCount: 197,
    pctTotal: 5.8,
    qPerPaper: 2.9,
    pctHard: 7,
    focus:
      "Galvanic Cells, EMF, Nernst Equation and Thermodynamics (73 · 14% HARD), Molar Conductivity, Kohlrausch's Law and Degree of Dissociation (44 · 2%), Faraday's Laws of Electrolysis (35 · 3%), Cell Constant and Conductivity Measurements (29 · 3%), Batteries, Primary, Secondary and Fuel Cells (16 · 0%). Holds 13 of the bank's 99 HARD questions, ten of them Nernst-equation arithmetic on one page.",
  },
  {
    chapter: "Biomolecules",
    qCount: 150,
    pctTotal: 4.4,
    qPerPaper: 2.31,
    pctHard: 1,
    focus:
      "Amino Acids, Peptides and Proteins (46 · 0% HARD), Carbohydrates, Classification, Structure and Reactions (35 · 3%), Glycosidic Linkages in Di- and Polysaccharides (28 · 4%), Nucleic Acids, DNA, RNA, Nucleotides and Bases (25 · 0%), Lipids, Enzymes and Other Biomolecules (16 · 0%). Recall of names, linkages and structures: two questions a paper, two HARD questions in 150.",
  },
  {
    chapter: "Halogen Derivatives of Alkanes",
    qCount: 137,
    pctTotal: 4.1,
    qPerPaper: 2.18,
    pctHard: 1,
    focus:
      "Nucleophilic Substitution Reactions (SN1 and SN2) (36 · 0% HARD), Classification, Nomenclature and Physical Properties (34 · 3%), Elimination and Aromatic Nucleophilic Substitution (24 · 4%), Preparation of Alkyl Halides (24 · 0%), Polyhalogen Compounds — Freon, DDT, War Gases (19 · 0%). Named exchange and coupling reactions (Finkelstein, Swarts, Wurtz, Fittig) and SN1 against SN2.",
  },
  {
    chapter: "Introduction to Polymer Chemistry",
    qCount: 139,
    pctTotal: 4.1,
    qPerPaper: 2.08,
    pctHard: 1,
    focus:
      "Polymers and Their Monomers (49 · 2% HARD), Classification of Polymers (39 · 0%), Properties and Applications of Polymers (37 · 0%), Polymerization Methods (14 · 0%). A monomer table and a uses table carry the chapter; one HARD question in 139.",
  },
  {
    chapter: "Amines",
    qCount: 134,
    pctTotal: 4.0,
    qPerPaper: 2.05,
    pctHard: 4,
    focus:
      "Chemical Reactions and Basicity of Amines (42 · 12% HARD), Preparation of Amines (32 · 0%), Nomenclature and Classification of Amines (28 · 0%), Diazonium Salts and Aromatic Amine Reactions (22 · 5%), Physical Properties of Amines (10 · 0%). Basicity order and the Hinsberg and carbylamine tests carry the reactions page.",
  },
  {
    chapter: "Coordination Compounds",
    qCount: 140,
    pctTotal: 4.2,
    qPerPaper: 2.03,
    pctHard: 2,
    focus:
      "Bonding Theories, EAN, Crystal Field, Hybridization and Magnetism (48 · 2% HARD), Ligands, Denticity and Donor Atoms (39 · 5%), Oxidation State, Coordination Number and IUPAC Nomenclature (23 · 0%), Complex Types, Homoleptic, Heteroleptic, Cationic, Anionic, Neutral (17 · 0%), Isomerism in Coordination Compounds (13 · 0%). Counting work (donor atoms, oxidation state, unpaired electrons) rather than calculation.",
  },
  {
    chapter: "Transition and Inner Transition Elements",
    qCount: 126,
    pctTotal: 3.7,
    qPerPaper: 1.87,
    pctHard: 2,
    focus:
      "Inner Transition Elements, Lanthanoids and Actinoids (41 · 5% HARD), Colour, Magnetic Properties and Spin-Only Formula (35 · 0%), Position, Electronic Configuration and General Features of d-Block (28 · 4%), Oxidation States of Transition Elements (11 · 0%), Alloys, Minerals, Ores and Catalysts (11 · 0%). Configurations and the spin-only formula μ = √(n(n + 2)) BM do most of it.",
  },
  {
    chapter: "Chemical Bonding and Molecular Structure",
    qCount: 96,
    pctTotal: 2.8,
    qPerPaper: 1.28,
    pctHard: 2,
    focus:
      "VSEPR Theory and Molecular Geometry (30 · 3% HARD), Ionic and Covalent Bonding, Lewis Structures and Octet Rule (23 · 0%), Molecular Orbital Theory and Bond Order (18 · 6%), Dipole Moment, Polarity and Intermolecular Forces (18 · 0%), Hybridization (7 · 0%). Shapes and bond orders: counting electron pairs, not computing.",
  },
  {
    chapter: "Elements of Group 16, 17 and 18",
    qCount: 80,
    pctTotal: 2.4,
    qPerPaper: 1.28,
    pctHard: 4,
    focus:
      "Group 16 Chalcogens, Oxygen, Sulphur and Ozone (37 · 0% HARD), Group 17 Halogens, Interhalogens and Oxoacids (36 · 8%), Group 18 Noble Gases and Xenon Compounds (7 · 0%). Recall of trends, oxoacids and structures, and up from one question a paper in 2023-24 to 1.28 across 2025-2026.",
  },
  {
    chapter: "Some Basic Concepts of Chemistry",
    qCount: 80,
    pctTotal: 2.4,
    qPerPaper: 1.26,
    pctHard: 1,
    focus:
      "Mole Concept and Interconversions (50 · 0% HARD), Stoichiometry and Concentration (12 · 8%), SI Units, Physical Properties and Atomic Abundance (10 · 0%), Laws of Chemical Combination and Percentage Composition (8 · 0%). Mole arithmetic. It jumped to 1.54 questions a paper in 2025 and settled at 1.12 in 2026, so plan on about one and a quarter.",
  },
  {
    chapter: "Redox Reactions",
    qCount: 73,
    pctTotal: 2.2,
    qPerPaper: 1.15,
    pctHard: 1,
    focus:
      "Oxidation Number Calculation and Determination (44 · 2% HARD), Balancing Redox Reactions and Oxidized/Reduced Species (18 · 0%), Reducing/Oxidizing Agents and Acidic/Basic Oxides (11 · 0%). One skill, the oxidation number, carries almost all of it.",
  },
  {
    chapter: "Basic Principles of Organic Chemistry",
    qCount: 72,
    pctTotal: 2.1,
    qPerPaper: 1.15,
    pctHard: 10,
    focus:
      "IUPAC Nomenclature, Functional Groups and Homologous Series (25 · 8% HARD), Electronic Effects, Hybridization, Intermediates and General Reactions (24 · 8%), Isomerism and Stereochemistry (23 · 13%). The hardest chapter of any size at 10% HARD, and the one every organic chapter leans on.",
    note:
      "Crossed the playbook line in 2026: 0.85 questions a paper across the 13 papers of 2025, then 1.31 across the 26 of 2026.",
  },
  {
    chapter: "Green Chemistry and Nanochemistry",
    qCount: 63,
    pctTotal: 1.9,
    qPerPaper: 1.1,
    pctHard: 0,
    focus:
      "Green Chemistry, Principles, Atom Economy and Green Solvents (36 · 0% HARD), Nanochemistry, Nanostructures, Classification and Synthesis (27 · 0%). Pure recall, and never a HARD question.",
    note:
      "Rising two years running: 0.67 questions a paper across 2023-24, 1.00 in 2025 and 1.15 in 2026. Now above the playbook line.",
  },
  {
    chapter: "Structure of Atom",
    qCount: 99,
    pctTotal: 2.9,
    qPerPaper: 1.08,
    pctHard: 1,
    focus:
      "Bohr's Atomic Model (22 · 0% HARD), Subatomic Particles, Isotopes, Isobars and Isoelectronic Species (21 · 0%), Quantum Mechanical Model, de Broglie, Heisenberg and Quantum Numbers (20 · 0%), Hydrogen Spectrum and Rydberg Equation (14 · 7%), Electromagnetic Radiation and Wave Properties (12 · 0%), Electronic Configuration and Pauli/Hund Rules (10 · 0%). One HARD question in 99.",
    note:
      "Halved in 2025 and stayed there: 2.00 questions a paper across the 27 papers of 2023-24, then 1.00 across the 13 of 2025 and 1.12 across the 26 of 2026. Still set in almost every paper.",
  },
  {
    chapter: "Surface Chemistry",
    qCount: 68,
    pctTotal: 2.0,
    qPerPaper: 1.08,
    pctHard: 0,
    focus:
      "Colloids, Classification, Coagulation and Hardy-Schulze Rule (41 · 0% HARD), Adsorption, Physisorption, Chemisorption and Isotherms (18 · 0%), Catalysis and Nanomaterials (9 · 0%). Has never produced a HARD question.",
  },
  {
    chapter: "Elements of Group 1 and 2",
    qCount: 59,
    pctTotal: 1.8,
    qPerPaper: 0.85,
    pctHard: 0,
    focus:
      "Industrial Processes, Minerals, Hydrogen Compounds and Alloys (22 · 0% HARD), Group 1 Alkali Metals, Properties and Reactivity (20 · 0%), Group 2 Alkaline Earth Metals, Properties and Reactivity (17 · 0%). Pure recall, never a HARD question, and just below the line at 0.85 a paper in both 2025 and 2026.",
  },
  {
    chapter: "States of Matter",
    qCount: 54,
    pctTotal: 1.6,
    qPerPaper: 0.82,
    pctHard: 2,
    focus:
      "Gas Laws and Ideal Gas Equation (31 · 3% HARD), Real Gases, Dalton's Law and KTG (23 · 0%). Below the line; PV = nRT does most of it.",
  },
  {
    chapter: "Aromatic Compounds",
    qCount: 51,
    pctTotal: 1.5,
    qPerPaper: 0.67,
    pctHard: 2,
    focus:
      "Electrophilic Aromatic Substitution (20 · 0% HARD), Side-Chain Reactions, Oxidation and Other Transformations (19 · 5%), Structure, Aromaticity and Identification (12 · 0%). Reagent-to-product recognition around the benzene ring. Falling: 0.85 a paper in 2023-24, 0.77 in 2025, 0.62 in 2026.",
  },
  {
    chapter: "Alkanes",
    qCount: 49,
    pctTotal: 1.5,
    qPerPaper: 0.64,
    pctHard: 0,
    focus:
      "Preparation of Alkanes, Wurtz, Grignard and Decarboxylation (28 · 0% HARD), Nomenclature, Structural Isomers and Physical Properties (15 · 0%), Reactions of Alkanes, Free Radical Halogenation (6 · 0%). Never a HARD question. Fell in 2026: 0.85 a paper in 2025, 0.54 in 2026.",
  },
  {
    chapter: "Alkenes",
    qCount: 48,
    pctTotal: 1.4,
    qPerPaper: 0.59,
    pctHard: 0,
    focus:
      "Reactions of Alkenes, Addition, Oxidation and Ozonolysis (30 · 0% HARD), Nomenclature, Hybridization and Stability of Alkenes (15 · 0%), Preparation of Alkenes by Elimination (3 · 0%). Below the line; Markovnikov and ozonolysis carry it.",
  },
  {
    chapter: "Modern Periodic Table",
    qCount: 26,
    pctTotal: 0.8,
    qPerPaper: 0.28,
    pctHard: 0,
    focus:
      "Periodic Trends (16 · 0% HARD), Position in Periodic Table and Electronic Configuration (10 · 0%). Falling: 0.56 a paper in 2023-24, 0.28 across 2025-2026.",
  },
  {
    chapter: "Alkynes",
    qCount: 15,
    pctTotal: 0.4,
    qPerPaper: 0.21,
    pctHard: 0,
    focus:
      "Reactions of Alkynes (10 · 0% HARD), Nomenclature and Identification of Alkynes (5 · 0%). Fifteen questions in 68 papers.",
  },
  {
    chapter: "Elements of Group 13, 14 and 15",
    qCount: 7,
    pctTotal: 0.2,
    qPerPaper: 0.13,
    pctHard: 14,
    focus:
      "Seven questions in 68 papers, the thinnest chapter in the bank. Not worth a session.",
  },
];
