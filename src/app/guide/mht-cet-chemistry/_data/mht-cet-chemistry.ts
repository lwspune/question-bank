/**
 * Static content + numbers for the /guide/mht-cet-chemistry route.
 *
 * Pulled from the live MHT-CET Chemistry PUBLIC bank (PYQ only), measured
 * 2026-09-28 AFTER the label fix (ROADMAP 2026-09-26) — so the 42 papers are
 * real sittings, each holding at most 50 Chemistry questions.
 *
 * THE TEMPLATE WAS CHOSEN BY MEASUREMENT, AND IT IS NOT THE PHYSICS ONE.
 *
 *   - Chemistry is FLAT: 67 of 2,074 questions are HARD (3.2%), and only one
 *     chapter of any size passes 10% (Basic Principles of Organic Chemistry,
 *     13%). A HARD-driven tier axis — what Maths and Physics use — would sort
 *     almost nothing.
 *   - Chemistry DOES partition by execution mode. The share of answers that
 *     are numbers runs 50-71% in the physical chapters and 3-31% everywhere
 *     else. So the strands are execution modes (the Template B default):
 *     CALCULATE (physical), REACTIONS (organic), RECALL (descriptive).
 *   - Difficulty is not the axis; SPEED is. Recall and reaction questions take
 *     seconds, calculations about a minute, and every question pays one mark.
 *
 * Paper II is Physics (1-50) and Chemistry (51-100) in ONE 90-minute clock
 * (src/lib/mocks/blueprints.ts). This guide's time split matches the Physics
 * guide's: about 35 minutes for Chemistry, 55 for Physics — a starting budget
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
      "How MHT-CET Chemistry actually works — 50 questions sharing 90 minutes with Physics, no negative marking, 3% HARD, and what 2,074 past-year questions across 42 papers reveal.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Calculate, Reactions, Recall — the strands are how a question is answered, not how hard it is. Answer the fast ones first and bank time for Physics.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "23 playbooks — one per chapter above 0.9 questions per paper. The subtopic split, the named reactions and formulas each chapter turns on, and its traps.",
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
      "What 2025 moved — Structure of Atom halved, Some Basic Concepts and Groups 16-18 rose, and the paper shifted from EASY to MODERATE while HARD stayed near zero.",
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
   *  2024 = 11, 2025 = 13. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** 23 of the 30 chapters clear the 0.9 q/paper line. */
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
  /** A STARTING budget for the shared 90 minutes — not a measurement. */
  timeSplit: { chemistryMinutes: number; physicsMinutes: number };
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string;
};

export const OVERVIEW: Overview = {
  totalQ: 2074,
  papers: 42,
  yearsCovered: 5,
  chapters: 30,
  playbooks: 23,
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
  // EASY 52.3% · MODERATE 44.5% · HARD 3.2%. Sums to totalQ.
  difficulty: { easy: 1084, moderate: 923, hard: 67 },
  asOf: "2026-09-28",
};

export type ChapterStatus = "live" | "dropped" | "entered";

export type ChapterRow = {
  chapter: string;
  /** Lifetime PUBLIC PYQ count across all 42 papers. */
  qCount: number;
  /** % of the 2,074-question bank (1 decimal). */
  pctTotal: number;
  /** Questions per paper on RECENT papers (2024-2025, 24 papers). */
  qPerPaper: number;
  pctHard: number;
  /** Subtopic split — canonical DB names, copy exactly. */
  focus: string;
  status?: ChapterStatus;
  note?: string;
};

/** All 30 chapters, sorted by RECENT weightage. Generated from the grid
 *  (qCount, qPerPaper, pctTotal) by the authoring script; the qCounts sum to
 *  exactly 2,074 and tests/guide-mht-cet-chemistry-playbooks.test.ts
 *  recomputes every number from matrix.generated.ts. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Solutions and Colligative Properties",
    qCount: 131,
    pctTotal: 6.3,
    qPerPaper: 3.17,
    pctHard: 3,
    focus:
      "Elevation of Boiling Point (28 · 7% HARD), Types of Solutions, Solubility and Henry's Law (27 · 4%), Vapour Pressure and Raoult's Law (23 · 4%), Osmotic Pressure (22 · 0%), Depression of Freezing Point (16 · 0%), Van't Hoff Factor and Abnormal Molar Mass (15 · 0%). The heaviest Chemistry chapter on recent papers, and four of its six pages are the same move: a colligative property is proportional to the number of dissolved particles.",
  },
  {
    chapter: "Solid State",
    qCount: 130,
    pctTotal: 6.3,
    qPerPaper: 3.04,
    pctHard: 5,
    focus:
      "Density and Crystal Structure Calculations (42 · 7% HARD), Unit Cells, Edge Length and Atomic Radius (30 · 0%), Packing Efficiency and Voids (27 · 15%), Types of Solids, Crystal Systems and Properties (16 · 0%), Crystal Defects, Magnetic Properties and Semiconductors (15 · 0%). One formula, ρ = zM/(a³N_A), carries the density page; packing and voids are the only page with real HARD.",
  },
  {
    chapter: "Alcohols, Phenols and Ethers",
    qCount: 126,
    pctTotal: 6.1,
    qPerPaper: 3.04,
    pctHard: 5,
    focus:
      "IUPAC and Common Nomenclature of Alcohols, Phenols and Ethers (34 · 3% HARD), Phenols, Preparation and Reactions (27 · 7%), Classification of Alcohols and Phenols (21 · 5%), Physical Properties (17 · 0%), Chemical Reactions of Alcohols and Acidity (14 · 14%), Ethers, Preparation and Reactions (13 · 0%). The heaviest organic chapter, and more than half of it is naming and classifying.",
  },
  {
    chapter: "Chemical Kinetics",
    qCount: 125,
    pctTotal: 6.0,
    qPerPaper: 3.0,
    pctHard: 2,
    focus:
      "First-Order Kinetics, Rate Constant and Half-Life (42 · 0% HARD), Rate Law, Order, Molecularity and Rate Expression (36 · 0%), Rate of Reaction, Stoichiometry and Average Rate (25 · 0%), Temperature Dependence, Arrhenius and Collision Theory (8 · 38%), Reaction Mechanism (7 · 0%), Zero-Order Kinetics (7 · 0%). Three questions every paper; 103 of its 125 questions sit on three pages with no HARD question at all.",
  },
  {
    chapter: "Ionic Equilibria",
    qCount: 122,
    pctTotal: 5.9,
    qPerPaper: 2.96,
    pctHard: 2,
    focus:
      "Solubility Product (Ksp) (29 · 3% HARD), Ionic Equilibrium, Ka, Kb and Degree of Dissociation (24 · 0%), pH, pOH and Ionic Product of Water (23 · 4%), Buffer Solutions and Henderson-Hasselbalch (18 · 0%), Salt Hydrolysis (16 · 0%), Theories of Acids and Bases (12 · 0%). Log arithmetic on six pages; salt hydrolysis and the acid-base theories are pure recall.",
  },
  {
    chapter: "Chemical Thermodynamics and Energetics",
    qCount: 121,
    pctTotal: 5.8,
    qPerPaper: 2.96,
    pctHard: 3,
    focus:
      "First Law of Thermodynamics, Internal Energy and Work (50 · 2% HARD), Thermochemistry, Hess's Law and Bond Enthalpy (21 · 5%), Enthalpy and Relation Between ΔH and ΔU (18 · 11%), Thermodynamic Systems, Properties and Processes (12 · 0%), Gibbs Free Energy and Spontaneity (11 · 0%), Entropy and Second Law (9 · 0%). The first-law page is 50 questions — signs and unit conversions, 100 J per dm³ bar.",
  },
  {
    chapter: "Electrochemistry",
    qCount: 122,
    pctTotal: 5.9,
    qPerPaper: 2.88,
    pctHard: 9,
    focus:
      "Galvanic Cells, EMF, Nernst Equation and Thermodynamics (48 · 21% HARD), Molar Conductivity, Kohlrausch's Law and Degree of Dissociation (24 · 0%), Cell Constant and Conductivity Measurements (21 · 5%), Faraday's Laws of Electrolysis (20 · 0%), Batteries, Primary, Secondary and Fuel Cells (9 · 0%). Holds 11 of the bank's 67 HARD questions — ten of them Nernst-equation arithmetic on one page.",
  },
  {
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    qCount: 109,
    pctTotal: 5.3,
    qPerPaper: 2.54,
    pctHard: 3,
    focus:
      "Preparation Methods of Aldehydes and Ketones (30 · 7% HARD), Nomenclature and Classification (23 · 0%), Carboxylic Acids, Properties, Reactions and Derivatives (21 · 0%), Oxidation, Reduction and Identification Tests (20 · 5%), Nucleophilic Addition and Condensation Reactions (15 · 0%). A named-reaction chapter: Rosenmund, Etard, Stephen, Clemmensen, Wolff–Kishner, Cannizzaro.",
  },
  {
    chapter: "Biomolecules",
    qCount: 88,
    pctTotal: 4.2,
    qPerPaper: 2.17,
    pctHard: 2,
    focus:
      "Amino Acids, Peptides and Proteins (27 · 0% HARD), Carbohydrates, Classification, Structure and Reactions (21 · 5%), Glycosidic Linkages in Di- and Polysaccharides (19 · 5%), Nucleic Acids (16 · 0%), Lipids, Enzymes and Other Biomolecules (5 · 0%). Recall of names, linkages and structures — two questions a paper at 2% HARD.",
  },
  {
    chapter: "Coordination Compounds",
    qCount: 88,
    pctTotal: 4.2,
    qPerPaper: 2.12,
    pctHard: 2,
    focus:
      "Ligands, Denticity and Donor Atoms (33 · 6% HARD), Bonding Theories, EAN, Crystal Field, Hybridization and Magnetism (21 · 0%), Oxidation State, Coordination Number and IUPAC Nomenclature (15 · 0%), Complex Types (13 · 0%), Isomerism (6 · 0%). Counting work — donor atoms, oxidation state, unpaired electrons — rather than calculation.",
  },
  {
    chapter: "Introduction to Polymer Chemistry",
    qCount: 85,
    pctTotal: 4.1,
    qPerPaper: 2.04,
    pctHard: 1,
    focus:
      "Polymers and Their Monomers (29 · 3% HARD), Properties and Applications of Polymers (25 · 0%), Classification of Polymers (22 · 0%), Polymerization Methods (9 · 0%). A monomer table and a uses table carry the chapter; one HARD question in 85.",
  },
  {
    chapter: "Amines",
    qCount: 81,
    pctTotal: 3.9,
    qPerPaper: 1.96,
    pctHard: 4,
    focus:
      "Chemical Reactions and Basicity of Amines (27 · 11% HARD), Nomenclature and Classification of Amines (19 · 0%), Preparation of Amines (15 · 0%), Diazonium Salts and Aromatic Amine Reactions (12 · 0%), Physical Properties (8 · 0%). Basicity order and the Hinsberg and carbylamine tests carry the reactions page.",
  },
  {
    chapter: "Halogen Derivatives of Alkanes",
    qCount: 79,
    pctTotal: 3.8,
    qPerPaper: 1.83,
    pctHard: 3,
    focus:
      "Classification, Nomenclature and Physical Properties (27 · 4% HARD), Preparation of Alkyl Halides (15 · 0%), Elimination and Aromatic Nucleophilic Substitution (14 · 7%), Nucleophilic Substitution Reactions (SN1 and SN2) (12 · 0%), Polyhalogen Compounds — Freon, DDT, War Gases (11 · 0%). Named exchange and coupling reactions — Finkelstein, Swarts, Wurtz, Fittig.",
  },
  {
    chapter: "Transition and Inner Transition Elements",
    qCount: 76,
    pctTotal: 3.7,
    qPerPaper: 1.75,
    pctHard: 4,
    focus:
      "Inner Transition Elements, Lanthanoids and Actinoids (27 · 7% HARD), Colour, Magnetic Properties and Spin-Only Formula (18 · 0%), Position, Electronic Configuration and General Features of d-Block (18 · 6%), Alloys, Minerals, Ores and Catalysts (7 · 0%), Oxidation States (6 · 0%). Configurations and the spin-only formula μ = √(n(n + 2)) BM do most of it.",
  },
  {
    chapter: "Structure of Atom",
    qCount: 70,
    pctTotal: 3.4,
    qPerPaper: 1.42,
    pctHard: 1,
    focus:
      "Bohr's Atomic Model (18 · 0% HARD), Subatomic Particles, Isotopes, Isobars and Isoelectronic Species (14 · 0%), Quantum Mechanical Model, de Broglie, Heisenberg and Quantum Numbers (13 · 0%), Hydrogen Spectrum and Rydberg Equation (10 · 10%), Electromagnetic Radiation (9 · 0%), Electronic Configuration and Pauli/Hund Rules (6 · 0%). One HARD question in 70.",
    note:
      "Halved in 2025: 2.00 questions a paper across the 27 papers of 2023-24, then 1.00 across the 13 of 2025. Still set every year.",
  },
  {
    chapter: "Some Basic Concepts of Chemistry",
    qCount: 51,
    pctTotal: 2.5,
    qPerPaper: 1.33,
    pctHard: 2,
    focus:
      "Mole Concept and Interconversions (31 · 0% HARD), Laws of Chemical Combination and Percentage Composition (7 · 0%), Stoichiometry and Concentration (7 · 14%), SI Units, Physical Properties and Atomic Abundance (6 · 0%). Mole arithmetic — and rising, from 1.15 to 1.54 questions a paper in 2025.",
  },
  {
    chapter: "Chemical Bonding and Molecular Structure",
    qCount: 64,
    pctTotal: 3.1,
    qPerPaper: 1.29,
    pctHard: 3,
    focus:
      "VSEPR Theory and Molecular Geometry (20 · 5% HARD), Molecular Orbital Theory and Bond Order (13 · 8%), Ionic and Covalent Bonding, Lewis Structures and Octet Rule (13 · 0%), Dipole Moment, Polarity and Intermolecular Forces (11 · 0%), Hybridization (7 · 0%). Shapes and bond orders — counting electron pairs, not computing.",
  },
  {
    chapter: "Elements of Group 16, 17 and 18",
    qCount: 48,
    pctTotal: 2.3,
    qPerPaper: 1.29,
    pctHard: 2,
    focus:
      "Group 16 Chalcogens, Oxygen, Sulphur and Ozone (24 · 0% HARD), Group 17 Halogens, Interhalogens and Oxoacids (21 · 5%), Group 18 Noble Gases and Xenon Compounds (3 · 0%). Recall of trends, oxoacids and structures — and rising, 1.00 to 1.38 questions a paper in 2025.",
  },
  {
    chapter: "Redox Reactions",
    qCount: 44,
    pctTotal: 2.1,
    qPerPaper: 1.08,
    pctHard: 2,
    focus:
      "Oxidation Number Calculation and Determination (26 · 4% HARD), Balancing Redox Reactions and Oxidized/Reduced Species (12 · 0%), Reducing/Oxidizing Agents and Acidic/Basic Oxides (6 · 0%). One skill — the oxidation number — carries almost all of it.",
  },
  {
    chapter: "Aromatic Compounds",
    qCount: 35,
    pctTotal: 1.7,
    qPerPaper: 0.96,
    pctHard: 3,
    focus:
      "Side-Chain Reactions, Oxidation and Other Transformations (15 · 7% HARD), Electrophilic Aromatic Substitution (12 · 0%), Structure, Aromaticity and Identification (8 · 0%). Reagent-to-product recognition around the benzene ring.",
  },
  {
    chapter: "Surface Chemistry",
    qCount: 39,
    pctTotal: 1.9,
    qPerPaper: 0.92,
    pctHard: 0,
    focus:
      "Colloids, Classification, Coagulation and Hardy-Schulze Rule (21 · 0% HARD), Adsorption, Physisorption, Chemisorption and Isotherms (12 · 0%), Catalysis and Nanomaterials (6 · 0%). Has never produced a HARD question.",
  },
  {
    chapter: "Elements of Group 1 and 2",
    qCount: 37,
    pctTotal: 1.8,
    qPerPaper: 0.92,
    pctHard: 0,
    focus:
      "Industrial Processes, Minerals, Hydrogen Compounds and Alloys (15 · 0% HARD), Group 2 Alkaline Earth Metals (11 · 0%), Group 1 Alkali Metals (11 · 0%). Pure recall, and never a HARD question.",
  },
  {
    chapter: "Alkanes",
    qCount: 35,
    pctTotal: 1.7,
    qPerPaper: 0.92,
    pctHard: 0,
    focus:
      "Preparation of Alkanes, Wurtz, Grignard and Decarboxylation (17 · 0% HARD), Nomenclature, Structural Isomers and Physical Properties (14 · 0%), Reactions of Alkanes, Free Radical Halogenation (4 · 0%). Never a HARD question; the named preparations carry it.",
  },
  {
    chapter: "Basic Principles of Organic Chemistry",
    qCount: 38,
    pctTotal: 1.8,
    qPerPaper: 0.88,
    pctHard: 13,
    focus:
      "IUPAC Nomenclature, Functional Groups and Homologous Series (18 · 11% HARD), Electronic Effects, Hybridization, Intermediates and General Reactions (11 · 18%), Isomerism and Stereochemistry (9 · 11%). The hardest chapter of any size at 13% HARD, just below the playbook line — and the one every organic chapter leans on.",
  },
  {
    chapter: "Alkenes",
    qCount: 35,
    pctTotal: 1.7,
    qPerPaper: 0.75,
    pctHard: 0,
    focus:
      "Reactions of Alkenes, Addition, Oxidation and Ozonolysis (19 · 0% HARD), Nomenclature, Hybridization and Stability of Alkenes (13 · 0%), Preparation of Alkenes by Elimination (3 · 0%). Below the line; Markovnikov and ozonolysis carry it.",
  },
  {
    chapter: "Green Chemistry and Nanochemistry",
    qCount: 33,
    pctTotal: 1.6,
    qPerPaper: 0.75,
    pctHard: 0,
    focus:
      "Green Chemistry, Principles, Atom Economy and Green Solvents (19 · 0% HARD), Nanochemistry, Nanostructures, Classification and Synthesis (14 · 0%). Below the line on the recent rate, but see the note.",
    note:
      "Rising: 0.67 questions a paper across 2023-24, then 1.00 across 2025 — above the playbook line on 2025 alone. Pure recall and never HARD.",
  },
  {
    chapter: "States of Matter",
    qCount: 31,
    pctTotal: 1.5,
    qPerPaper: 0.67,
    pctHard: 3,
    focus:
      "Gas Laws and Ideal Gas Equation (18 · 6% HARD), Real Gases, Dalton's Law and KTG (13 · 0%). Below the line; PV = nRT does most of it.",
  },
  {
    chapter: "Modern Periodic Table",
    qCount: 18,
    pctTotal: 0.9,
    qPerPaper: 0.42,
    pctHard: 0,
    focus:
      "Periodic Trends (10 · 0% HARD), Position in Periodic Table and Electronic Configuration (8 · 0%). Falling — 0.56 a paper in 2023-24, 0.23 in 2025.",
  },
  {
    chapter: "Alkynes",
    qCount: 10,
    pctTotal: 0.5,
    qPerPaper: 0.29,
    pctHard: 0,
    focus:
      "Reactions of Alkynes (7 · 0% HARD), Nomenclature and Identification of Alkynes (3 · 0%). Ten questions in 42 papers.",
  },
  {
    chapter: "Elements of Group 13, 14 and 15",
    qCount: 3,
    pctTotal: 0.1,
    qPerPaper: 0.08,
    pctHard: 33,
    focus:
      "Three questions in 42 papers — the thinnest chapter in the bank. Not worth a session.",
  },
];
