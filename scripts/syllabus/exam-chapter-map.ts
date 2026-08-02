/**
 * Exam bank-chapter -> the State Board chapter(s) that would teach it, as
 * "class-chapter" keys matching generated-papers/sb-corpus.json.
 *
 * Why this exists: coverage probes must search the chapter that would TEACH a
 * topic, not the whole 1.6M-char corpus. Whole-corpus matching scored NCERT's
 * Vitamins section as 100% covered while the State Board Biomolecules chapter
 * says "vitamin" zero times — the word merely occurs elsewhere.
 *
 * `null` means the exam chapter has NO State Board home at all. That is itself a
 * finding, not a mapping failure, so it is recorded explicitly rather than left
 * out — an absent key would silently fall back to a whole-corpus search.
 */
export const EXAM_CHAPTER_TO_SB: Record<string, Record<string, string[] | null>> = {
  "MHT-CET": {
    "Some Basic Concepts of Chemistry": ["11-1", "11-2"],
    "Structure of Atom": ["11-4"],
    "Chemical Bonding and Molecular Structure": ["11-5"],
    "Redox Reactions": ["11-6"],
    "Modern Periodic Table": ["11-7"],
    "Elements of Group 1 and 2": ["11-8"],
    "Elements of Group 13, 14 and 15": ["11-9"],
    "States of Matter": ["11-10"],
    "Surface Chemistry": ["11-11"],
    "Basic Principles of Organic Chemistry": ["11-14"],
    // The State Board teaches all hydrocarbons in one chapter; CET splits it four ways.
    Alkanes: ["11-15"],
    Alkenes: ["11-15"],
    Alkynes: ["11-15"],
    "Aromatic Compounds": ["11-15"],
    "Solid State": ["12-1"],
    "Solutions and Colligative Properties": ["12-2"],
    "Ionic Equilibria": ["12-3"],
    "Chemical Thermodynamics and Energetics": ["12-4"],
    Electrochemistry: ["12-5"],
    "Chemical Kinetics": ["12-6"],
    "Elements of Group 16, 17 and 18": ["12-7"],
    "Transition and Inner Transition Elements": ["12-8"],
    "Coordination Compounds": ["12-9"],
    "Halogen Derivatives of Alkanes": ["12-10"],
    "Alcohols, Phenols and Ethers": ["12-11"],
    "Aldehydes, Ketones and Carboxylic Acids": ["12-12"],
    Amines: ["12-13"],
    Biomolecules: ["12-14"],
    "Introduction to Polymer Chemistry": ["12-15"],
    "Green Chemistry and Nanochemistry": ["12-16"],
  },
  "JEE Mains": {
    "Some Basic Concepts of Chemistry": ["11-1", "11-2"],
    "Structure of Atom": ["11-4"],
    "Chemical Bonding and Molecular Structure": ["11-5"],
    "Classification of Elements and Periodicity": ["11-7"],
    "The s-Block Elements": ["11-8"],
    Hydrogen: ["11-8"],
    "The p-Block Elements": ["11-9", "12-7"],
    "Surface Chemistry": ["11-11"],
    // JEE folds chemical + ionic equilibrium into one chapter; the State Board splits them.
    Equilibrium: ["11-12", "12-3"],
    "Organic Chemistry - Some Basic Principles and Techniques": ["11-14", "11-3"],
    "Organic Reaction Mechanisms": ["11-14"],
    Hydrocarbons: ["11-15"],
    "Chemistry in Everyday Life": ["11-16"],
    "Solid State": ["12-1"],
    Solutions: ["12-2"],
    "Chemical Thermodynamics": ["12-4"],
    Electrochemistry: ["12-5"],
    "Chemical Kinetics": ["12-6"],
    "The d- and f-Block Elements": ["12-8"],
    "Coordination Compounds": ["12-9"],
    "Haloalkanes and Haloarenes": ["12-10"],
    "Alcohols, Phenols and Ethers": ["12-11"],
    "Aldehydes, Ketones and Carboxylic Acids": ["12-12"],
    Amines: ["12-13"],
    Biomolecules: ["12-14"],
    Polymers: ["12-15"],
    // No State Board chapter teaches extraction of metals.
    "General Principles and Processes of Isolation of Elements": null,
    // Nearest State Board relative is Green Chemistry, which is a different subject.
    "Environmental Chemistry": ["12-16"],
  },
  NDA: {
    // NDA's taxonomy is Class 9-10 shaped, so several chapters span two State
    // Board chapters and are pitched below their level.
    "Mole Concept and Stoichiometry": ["11-1", "11-2"],
    "Atomic Structure and Periodic Classification": ["11-4", "11-7"],
    "Chemical Bonding": ["11-5"],
    "Chemical Reactions": ["11-6"],
    "Metals and Non-Metals": ["11-8", "11-9", "12-7", "12-8"],
    "Hydrogen and Water": ["11-8"],
    "Matter and Its States": ["11-10", "11-11"],
    "Carbon and Its Compounds": ["11-14", "11-15"],
    "Chemistry in Everyday Life": ["11-16"],
    "Acids, Bases and Salts": ["12-3"],
    "Industrial and Applied Chemistry": ["11-16", "12-15", "12-16"],
    "Practical Chemistry": ["11-2", "11-3"],
  },
};
