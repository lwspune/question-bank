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

// Hand-authored text solutions for questions whose SOURCE solution was empty or
// an image-only diagram (the bank solution field is text-only). AI-authored, not
// source-derived; each derived from the question + (for the organic ones) the
// extracted reaction-scheme/answer images. Unicode-free per the bank convention.
export const AUTHORED_SOLUTIONS: Record<number, string> = {
  9: "Statement I: for a photon \\(p = \\frac{h}{\\lambda}\\), so equal momenta imply equal wavelengths — true. Statement II: since \\(p = \\frac{h}{\\lambda}\\) and \\(E = \\frac{hc}{\\lambda}\\), decreasing \\(\\lambda\\) increases both momentum and energy, it does not decrease them — false. So Statement I is true and Statement II is false, option (D).",
  11: "Isothermal means temperature constant (ii); isochoric means volume constant (iii); adiabatic means no heat exchange, so heat content stays constant (iv); isobaric means pressure constant (i). This gives A-(ii), B-(iii), C-(iv), D-(i), which is option (B).",
  33: "Isostructural species have the same shape and hybridisation. (A) \\(SO_4^{2-}\\) and \\(CrO_4^{2-}\\) are both tetrahedral (\\(sp^3\\)). (B) \\(SiCl_4\\) and \\(TiCl_4\\) are both tetrahedral. (C) \\(NH_3\\) is pyramidal whereas \\(NO_3^{-}\\) is trigonal planar, so not isostructural. (D) \\(BCl_3\\) is trigonal planar whereas \\(BrCl_3\\) is T-shaped, so not isostructural. Only pairs A and B qualify, so the answer is (B).",
  34: "Cold dilute \\(KMnO_4\\) at 273 K performs syn-hydroxylation of the double bond, giving the vicinal diol 1-methylcyclopentane-1,2-diol (A), which has one tertiary and one secondary \\(-OH\\). \\(CrO_3\\) then oxidises only the secondary \\(-OH\\) to a carbonyl (the tertiary \\(-OH\\) cannot be oxidised), giving 2-hydroxy-2-methylcyclopentan-1-one (B). Hence option (B).",
  36: "Among the 3d-series elements, only copper has a positive standard electrode potential \\(E^\\circ(M^{2+}/M) = +0.34\\ V\\), because the large sum of its sublimation and ionisation enthalpies is not offset by its hydration enthalpy. The others (\\(Zn, Fe, Co\\)) have negative values, so the answer is (D) \\(Cu\\).",
  40: "With \\(HCl\\), the \\(-OH\\) is protonated and leaves as water, giving a secondary carbocation on the exocyclic carbon. A 1,2-hydride shift from the adjacent ring carbon forms the more stable tertiary carbocation on the ring, and chloride adds there, giving 1-chloro-1-ethyl-2-methylcyclohexane as the major product, option (C).",
  41: "\\(HI\\) adds to 3,3-dimethylbut-1-ene by Markovnikov's rule, first giving a secondary carbocation at C-2. Being next to the quaternary carbon, it undergoes a 1,2-methyl shift to the more stable tertiary carbocation at C-3, where iodide adds, giving 2-iodo-2,3-dimethylbutane as the major product, option (C).",
  45: "Aniline with \\(NaNO_2/HCl\\) forms benzenediazonium chloride, and \\(KCN\\) replaces the diazonium group to give benzonitrile \\(C_6H_5CN\\) (A). \\(SnCl_2/HCl\\) followed by hydrolysis (Stephen reduction) converts the nitrile to benzaldehyde \\(C_6H_5CHO\\) (B). Hence option (C).",
  46: "A free phenolic \\(-OH\\) condenses with phthalic anhydride in conc. \\(H_2SO_4\\) to form phenolphthalein, which turns pink in alkali (\\(NaOH\\)). Of the options only 2-propylphenol has a free phenolic \\(-OH\\), so it gives the pink colour, option (B).",
  47: "First ionisation enthalpy rises across a period but with two dips: \\(Al\\) is lower than \\(Mg\\) (removing \\(Mg\\)'s stable filled \\(3s^2\\) electron costs more), and \\(S\\) is lower than \\(P\\) (\\(P\\) has a stable half-filled \\(3p^3\\)). The order is therefore \\(Al < Mg < Si < S < P\\), option (A).",
  49: "Leaching \\(Al_2O_3\\) with alkali gives sodium tetrahydroxoaluminate \\(Na[Al(OH)_4]\\) (X). Passing \\(CO_2\\) (Y) through this solution neutralises the alkali and precipitates aluminium hydroxide \\(Al(OH)_3\\) (Z). Hence \\(X = Na[Al(OH)_4]\\) and \\(Y = CO_2\\), option (A).",
};

// Targeted find/replace fixes on the SOLUTION text for extractions pandoc garbled
// at the source (KaTeX-unrenderable fragments). Applied in attach-solutions.ts.
export const SOLUTION_FIXES: Record<number, [string, string][]> = {
  // Stray backslash after `\right.` from the source's `\right.\$` truncation.
  43: [["\\frac{1}{n} = 0 \\right.\\", "\\frac{1}{n} = 0 \\right."]],
};
