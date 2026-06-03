// Fresh JEE Mains taxonomy classification for Paper 1 (2021) — 60 MCQs.
// Chapter/subtopic names are standard NCERT/JEE; chapters auto-create on commit.
// Keyed by the global question number. Reviewable + editable in one place.

export type Classification = { chapter: string; subtopic: string };

export const CLASSIFICATION: Record<number, Classification> = {
  // ---- Physics (1-20) ----
  1: { chapter: "Gravitation", subtopic: "Gravitational Field and Orbital Motion" },
  2: { chapter: "Gravitation", subtopic: "Satellites and Orbital Motion" },
  3: { chapter: "Thermodynamics", subtopic: "First Law and Cyclic Processes" },
  4: { chapter: "Electrostatics", subtopic: "Capacitance and Combinations" },
  5: { chapter: "Current Electricity", subtopic: "EMF and Internal Resistance" },
  6: { chapter: "Mechanical Properties of Solids", subtopic: "Elastic Moduli" },
  7: { chapter: "Gravitation", subtopic: "Satellites and Orbital Motion" },
  8: { chapter: "Motion in a Straight Line", subtopic: "Motion Graphs" },
  9: { chapter: "Dual Nature of Radiation and Matter", subtopic: "Photon Momentum and Energy" },
  10: { chapter: "Current Electricity", subtopic: "Electric Current and Charge" },
  11: { chapter: "Thermodynamics", subtopic: "Thermodynamic Processes" },
  12: { chapter: "Atoms", subtopic: "Bohr Model and Hydrogen Spectrum" },
  13: { chapter: "Ray Optics", subtopic: "Spherical Mirrors" },
  14: { chapter: "System of Particles and Rotational Motion", subtopic: "Moment of Inertia" },
  15: { chapter: "Units and Measurements", subtopic: "Dimensional Analysis" },
  16: { chapter: "Semiconductor Electronics", subtopic: "Transistors" },
  17: { chapter: "Wave Optics", subtopic: "Young's Double Slit Experiment" },
  18: { chapter: "Oscillations", subtopic: "Simple Harmonic Motion" },
  19: { chapter: "Electrostatics", subtopic: "Electric Field and Superposition" },
  20: { chapter: "Thermal Properties of Matter", subtopic: "Thermal Expansion" },

  // ---- Chemistry (31-50) ----
  31: { chapter: "Environmental Chemistry", subtopic: "Atmospheric Pollution" },
  32: { chapter: "Biomolecules", subtopic: "Proteins" },
  33: { chapter: "Chemical Bonding and Molecular Structure", subtopic: "Molecular Geometry" },
  34: { chapter: "Aldehydes, Ketones and Carboxylic Acids", subtopic: "Reactions and Products" },
  35: { chapter: "Organic Reaction Mechanisms", subtopic: "Reaction Products" },
  36: { chapter: "The d- and f-Block Elements", subtopic: "Properties of Transition Elements" },
  37: { chapter: "Amines", subtopic: "Aromatic Amines and EAS" },
  38: { chapter: "Hydrogen", subtopic: "Hydrogen Peroxide" },
  39: { chapter: "General Principles and Processes of Isolation of Elements", subtopic: "Concentration of Ores" },
  40: { chapter: "Organic Reaction Mechanisms", subtopic: "Reaction Products" },
  41: { chapter: "Alcohols, Phenols and Ethers", subtopic: "Ethers" },
  42: { chapter: "Aldehydes, Ketones and Carboxylic Acids", subtopic: "Preparation of Aldehydes" },
  43: { chapter: "Surface Chemistry", subtopic: "Adsorption" },
  44: { chapter: "General Principles and Processes of Isolation of Elements", subtopic: "Alloys" },
  45: { chapter: "Organic Reaction Mechanisms", subtopic: "Reaction Products" },
  46: { chapter: "Alcohols, Phenols and Ethers", subtopic: "Phenols" },
  47: { chapter: "Classification of Elements and Periodicity", subtopic: "Ionization Enthalpy" },
  48: { chapter: "The p-Block Elements", subtopic: "Boron Family" },
  49: { chapter: "General Principles and Processes of Isolation of Elements", subtopic: "Extraction of Aluminium" },
  50: { chapter: "Polymers", subtopic: "Classification of Polymers" },

  // ---- Maths (61-80) ----
  61: { chapter: "Conic Sections", subtopic: "Parabola" },
  62: { chapter: "Permutations and Combinations", subtopic: "Combinations" },
  63: { chapter: "Three Dimensional Geometry", subtopic: "The Plane" },
  64: { chapter: "Straight Lines", subtopic: "Intercepts and Locus" },
  65: { chapter: "Mathematical Reasoning", subtopic: "Tautology and Logical Connectives" },
  66: { chapter: "Relations and Functions", subtopic: "Composition and Types of Functions" },
  67: { chapter: "Continuity and Differentiability", subtopic: "Continuity" },
  68: { chapter: "Application of Derivatives", subtopic: "Increasing and Decreasing Functions" },
  69: { chapter: "Three Dimensional Geometry", subtopic: "Line and Plane" },
  70: { chapter: "Limits and Continuity", subtopic: "Evaluation of Limits" },
  71: { chapter: "Trigonometry", subtopic: "Heights and Distances" },
  72: { chapter: "Application of Derivatives", subtopic: "Tangents and Normals" },
  73: { chapter: "Application of Integrals", subtopic: "Area Between Curves" },
  74: { chapter: "Integrals", subtopic: "Integration by Substitution" },
  75: { chapter: "Differential Equations", subtopic: "Linear Differential Equations" },
  76: { chapter: "Binomial Theorem", subtopic: "Binomial Coefficients and Series" },
  77: { chapter: "Probability", subtopic: "Binomial Distribution" },
  78: { chapter: "Quadratic Equations", subtopic: "Roots and Relations" },
  79: { chapter: "Sequences and Series", subtopic: "Infinite Geometric Progression" },
  80: { chapter: "Determinants", subtopic: "System of Linear Equations" },
};

// Hand-fixes for extractions that pandoc garbled at the source (KaTeX-unrenderable).
// Keyed by question number -> { optionLabel -> corrected text }.
export const OPTION_OVERRIDES: Record<number, Partial<Record<"A" | "B" | "C" | "D", string>>> = {
  43: { A: "\\(\\frac{1}{n}\\) with \\(\\frac{1}{n} = 0\\) to 1" },
};

// Targeted find/replace fixes on the SOLUTION text for extractions pandoc garbled
// at the source (KaTeX-unrenderable fragments). Applied in attach-solutions.ts.
export const SOLUTION_FIXES: Record<number, [string, string][]> = {
  // Stray backslash after `\right.` from the source's `\right.\$` truncation.
  43: [["\\frac{1}{n} = 0 \\right.\\", "\\frac{1}{n} = 0 \\right."]],
};
