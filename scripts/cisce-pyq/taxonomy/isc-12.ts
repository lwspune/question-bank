/**
 * ISC Class 12 chapter + subtopic taxonomy (Mathematics 860, Physics 861A,
 * Chemistry 862A). Moved here from config.ts on 2026-10-30 when the lane became
 * the shared CISCE lane; the content is unchanged.
 */
import type { CisceChapter } from "../exams";

export const ISC_12_SUBJECTS = ["Mathematics", "Physics", "Chemistry"] as const;
export type Isc12Subject = (typeof ISC_12_SUBJECTS)[number];

/** Kept for the ISC specs; every chapter here also names its paper section. */
export type IscChapter = CisceChapter & { section: "A" | "B" | "C" | "D" };
/**
 * ── CHAPTER TAXONOMY ─────────────────────────────────────────────────────────
 * Authored from the OFFICIAL ISC syllabus (Revised, ISC 2026), Class XII, not
 * forked from `cbse-12`. The overlap with CBSE turns out to be large, and that
 * is a CROSS-CHECK rather than a shortcut: Physics was derived unit-by-unit from
 * the ISC document and landed on the same 14 chapters CBSE uses, independently.
 * Where the two boards genuinely differ, ISC wins — Section C of ISC
 * Mathematics is COMMERCE maths (Application of Calculus, Linear Regression)
 * and has no CBSE counterpart at all.
 *
 * ── THE GRAIN RULE (stated, because it is not uniform) ───────────────────────
 * The syllabus's own UNITS are too coarse to be chapters: ISC Maths unit 3
 * "Calculus" carries 32 of the paper's 80 marks and would be a catch-all of
 * exactly the kind this bank has repeatedly had to break up later. So a unit is
 * SPLIT into its sub-units when those sub-units are distinct techniques, and
 * kept whole when they are facets of one topic:
 *
 *   split   Maths "Calculus"          → Continuity/Applications/Integrals/DEs
 *   split   Physics "Optics"          → Ray Optics, Wave Optics
 *   whole   Physics "Electronic Devices" (7 marks; its (i) Semiconductor
 *           Electronics and (ii) Semiconductor diode are one topic, and one
 *           chapter in every other Class-12 taxonomy in this bank)
 *   whole   every Chemistry unit (already at chapter grain)
 *
 * `syllabusRef` records where each chapter came from so the derivation is
 * auditable against the source document rather than taken on trust.
 */
export const ISC_12_TAXONOMY: Record<Isc12Subject, readonly IscChapter[]> = {
  // Section A 65 marks (units 1-4) · Section B 15 (units 5-7) · Section C 15
  // (units 8-10), B and C being mutually exclusive for the candidate.
  Mathematics: [
    { name: "Relations and Functions", syllabusRef: "1(i)", section: "A" },
    { name: "Inverse Trigonometric Functions", syllabusRef: "1(ii)", section: "A" },
    { name: "Matrices", syllabusRef: "2(i)", section: "A" },
    { name: "Determinants", syllabusRef: "2(ii)", section: "A" },
    { name: "Continuity, Differentiability and Differentiation", syllabusRef: "3(i)", section: "A" },
    { name: "Applications of Derivatives", syllabusRef: "3(ii)", section: "A" },
    { name: "Integrals", syllabusRef: "3(iii)", section: "A" },
    { name: "Differential Equations", syllabusRef: "3(iv)", section: "A" },
    { name: "Probability", syllabusRef: "4", section: "A" },
    { name: "Vectors", syllabusRef: "5", section: "B" },
    { name: "Three-dimensional Geometry", syllabusRef: "6", section: "B" },
    { name: "Application of Integrals", syllabusRef: "7", section: "B" },
    // Section C is the ISC-only half — no CBSE Class 12 counterpart exists.
    { name: "Application of Calculus", syllabusRef: "8", section: "C" },
    { name: "Linear Regression", syllabusRef: "9", section: "C" },
    { name: "Linear Programming", syllabusRef: "10", section: "C" },
  ],
  // Nine syllabus units; six of them split into their two sub-units, giving the
  // same 14 chapters CBSE Class 12 Physics uses. Questions are drawn from all
  // four paper sections, so `section` is not meaningful per chapter here and is
  // recorded as "A" (Section A's 14 one-mark subparts span the whole syllabus).
  Physics: [
    { name: "Electric Charges and Fields", syllabusRef: "1(i)", section: "A" },
    { name: "Electrostatic Potential, Potential Energy and Capacitance", syllabusRef: "1(ii)", section: "A" },
    { name: "Current Electricity", syllabusRef: "2", section: "A" },
    { name: "Moving Charges and Magnetism", syllabusRef: "3(i)", section: "A" },
    { name: "Magnetism and Matter", syllabusRef: "3(ii)", section: "A" },
    { name: "Electromagnetic Induction", syllabusRef: "4(i)", section: "A" },
    { name: "Alternating Current", syllabusRef: "4(ii)", section: "A" },
    { name: "Electromagnetic Waves", syllabusRef: "5", section: "A" },
    { name: "Ray Optics and Optical Instruments", syllabusRef: "6(i)", section: "A" },
    { name: "Wave Optics", syllabusRef: "6(ii)", section: "A" },
    { name: "Dual Nature of Radiation and Matter", syllabusRef: "7", section: "A" },
    { name: "Atoms", syllabusRef: "8(i)", section: "A" },
    { name: "Nuclei", syllabusRef: "8(ii)", section: "A" },
    { name: "Semiconductor Electronics: Materials, Devices and Simple Circuits", syllabusRef: "9", section: "A" },
  ],
  // Ten syllabus units, already at chapter grain, grouped by the syllabus into
  // Physical (25 marks) / Inorganic (14) / Organic (31).
  Chemistry: [
    { name: "Solutions", syllabusRef: "1", section: "A" },
    { name: "Electrochemistry", syllabusRef: "2", section: "A" },
    { name: "Chemical Kinetics", syllabusRef: "3", section: "A" },
    { name: "d- and f-Block Elements", syllabusRef: "4", section: "A" },
    { name: "Coordination Compounds", syllabusRef: "5", section: "A" },
    { name: "Haloalkanes and Haloarenes", syllabusRef: "6", section: "A" },
    { name: "Alcohols, Phenols and Ethers", syllabusRef: "7", section: "A" },
    { name: "Aldehydes, Ketones and Carboxylic Acids", syllabusRef: "8", section: "A" },
    { name: "Organic Compounds containing Nitrogen", syllabusRef: "9", section: "A" },
    { name: "Biomolecules", syllabusRef: "10", section: "A" },
  ],
};


/**
 * ── SUBTOPICS ────────────────────────────────────────────────────────────────
 * Per chapter, the subtopics a row may be filed under. Where an ISC chapter is
 * the same topic as a CBSE Class 12 chapter, its subtopics are CBSE's (read from
 * the live `cbse-12` taxonomy on 2026-10-30), so a student moving between the
 * two boards sees the same grain. ISC-only material gets its own: Section C
 * commerce maths (syllabus units 8-9), cyanides and isocyanides (Chemistry unit
 * 9), and a few ISC syllabus items CBSE dropped (mean value theorems,
 * tangents and normals, binomial distribution, logic gates, radioactivity).
 *
 * The transcription brief tells agents to pick from this list verbatim;
 * `validate.ts` rejects anything else, because commitStaged AUTO-CREATES an
 * unknown subtopic rather than failing.
 */
export const ISC_12_SUBTOPICS: Record<string, readonly string[]> = {
  // Mathematics
  "Relations and Functions": ["Types of Relations", "Equivalence Relations and Classes", "One-One and Onto Functions", "Composition and Invertible Functions"],
  "Inverse Trigonometric Functions": ["Domains, Ranges and Principal Value Branches", "Evaluating Inverse Trigonometric Expressions", "Properties of Inverse Trigonometric Functions"],
  Matrices: ["Order and Types of Matrices", "Equality of Matrices", "Addition and Scalar Multiplication", "Multiplication of Matrices", "Transpose of a Matrix", "Symmetric and Skew-Symmetric Matrices", "Elementary Operations and Inverse of a Matrix"],
  Determinants: ["Determinant and its Properties", "Area of a Triangle", "Minors and Cofactors", "Adjoint and Inverse of a Matrix", "Solving System of Linear Equations"],
  "Continuity, Differentiability and Differentiation": ["Continuity", "Differentiability and the Chain Rule", "Derivatives of Implicit and Inverse Trigonometric Functions", "Derivatives of Exponential and Logarithmic Functions", "Logarithmic Differentiation", "Derivatives of Functions in Parametric Form", "Second Order Derivatives", "Mean Value Theorems"],
  "Applications of Derivatives": ["Rate of Change of Quantities", "Increasing and Decreasing Functions", "Maxima and Minima", "Absolute Maximum and Minimum on a Closed Interval", "Tangents and Normals", "Approximations"],
  Integrals: ["Integration as the Inverse of Differentiation", "Integration by Substitution", "Integration using Trigonometric Identities", "Integrals of Some Particular Functions", "Integration by Partial Fractions", "Integration by Parts", "Integrals of Special Forms", "Definite Integrals and the Fundamental Theorem", "Definite Integrals by Substitution", "Properties of Definite Integrals"],
  "Differential Equations": ["Order and Degree of a Differential Equation", "Formation of a Differential Equation", "General and Particular Solutions", "Variables Separable", "Homogeneous Differential Equations", "Linear Differential Equations", "Applications of Differential Equations"],
  Probability: ["Conditional Probability", "Multiplication Theorem on Probability", "Independent Events", "Theorem of Total Probability", "Bayes' Theorem", "Random Variables and Probability Distributions", "Binomial Distribution"],
  Vectors: ["Types of Vectors", "Addition of Vectors", "Components and Direction Cosines", "Section Formula", "Scalar (Dot) Product and Projection", "Vector (Cross) Product", "Scalar Triple Product"],
  "Three-dimensional Geometry": ["Direction Cosines and Direction Ratios", "Equation of a Line in Space", "Angle Between Two Lines", "Shortest Distance Between Two Lines", "The Plane"],
  "Application of Integrals": ["Area Under Simple Curves", "Area Bounded by a Curve and a Line", "Area Between Two Curves"],
  "Application of Calculus": ["Cost, Revenue and Profit Functions", "Average and Marginal Functions", "Break-even Point", "Optimisation in Commerce and Economics"],
  "Linear Regression": ["Lines of Regression", "Regression Coefficients and Correlation", "Method of Least Squares", "Estimation from a Regression Line"],
  "Linear Programming": ["Formulation of LP Problems", "Graphical Solution and the Feasible Region"],
  // Physics
  "Electric Charges and Fields": ["Electric Charge and its Basic Properties", "Coulomb's Law and Forces Between Multiple Charges", "Electric Field and Field Lines", "Electric Dipole and Dipole in a Uniform Field", "Electric Flux and Gauss's Law", "Applications of Gauss's Law"],
  "Electrostatic Potential, Potential Energy and Capacitance": ["Electrostatic Potential due to Charges and Dipoles", "Potential Energy of a System of Charges", "Equipotential Surfaces", "Electrostatics of Conductors and Dielectrics", "Capacitors, Capacitance and their Combinations", "Energy Stored in a Capacitor"],
  "Current Electricity": ["Electric Current and Ohm's Law", "Drift of Electrons and Resistivity", "Temperature Dependence of Resistivity", "Electrical Energy and Power", "Combination of Resistors", "Cells, EMF and Internal Resistance", "Kirchhoff's Rules and Wheatstone Bridge", "Meter Bridge and Potentiometer"],
  "Moving Charges and Magnetism": ["Magnetic Force and Motion in a Magnetic Field", "Biot-Savart Law and Field of a Circular Loop", "Ampere's Circuital Law and the Solenoid", "Force Between Parallel Currents", "Torque on a Current Loop and Magnetic Dipole", "The Moving Coil Galvanometer"],
  "Magnetism and Matter": ["The Bar Magnet", "Magnetism and Gauss's Law", "Magnetisation and Magnetic Intensity", "Magnetic Properties of Materials"],
  "Electromagnetic Induction": ["Magnetic Flux and Faraday's Law", "Lenz's Law and Conservation of Energy", "Motional Electromotive Force", "Inductance", "AC Generator"],
  "Alternating Current": ["AC Voltage Applied to a Resistor", "AC Voltage Applied to an Inductor and a Capacitor", "Series LCR Circuit and Resonance", "Power in AC Circuits and the Power Factor", "Transformers"],
  "Electromagnetic Waves": ["Displacement Current", "Electromagnetic Waves and their Properties", "Electromagnetic Spectrum"],
  "Ray Optics and Optical Instruments": ["Reflection by Spherical Mirrors", "Refraction and Total Internal Reflection", "Refraction at Spherical Surfaces and by Lenses", "Refraction Through a Prism", "Optical Instruments"],
  "Wave Optics": ["Huygens Principle", "Refraction and Reflection of Plane Waves", "Interference and Young's Experiment", "Diffraction", "Polarisation"],
  "Dual Nature of Radiation and Matter": ["Electron Emission", "Photoelectric Effect and its Experimental Study", "Einstein's Photoelectric Equation and the Photon", "Wave Nature of Matter"],
  Atoms: ["Alpha-Particle Scattering and Rutherford's Model", "Atomic Spectra", "Bohr Model of the Hydrogen Atom", "Line Spectra of the Hydrogen Atom", "de Broglie's Explanation of Bohr's Postulate"],
  Nuclei: ["Atomic Masses and Composition of the Nucleus", "Size of the Nucleus", "Mass-Energy and Nuclear Binding Energy", "Nuclear Force", "Radioactivity", "Nuclear Energy"],
  "Semiconductor Electronics: Materials, Devices and Simple Circuits": ["Classification of Metals, Conductors and Semiconductors", "Intrinsic and Extrinsic Semiconductors", "p-n Junction and the Semiconductor Diode", "Application of Junction Diode as a Rectifier", "Special Purpose p-n Junction Diodes", "Logic Gates"],
  // Chemistry
  Solutions: ["Types of Solutions", "Expressing Concentration of Solutions", "Solubility", "Vapour Pressure of Liquid Solutions", "Ideal and Non-ideal Solutions", "Colligative Properties and Determination of Molar Mass", "Abnormal Molar Masses"],
  Electrochemistry: ["Electrochemical Cells", "Galvanic Cells", "Nernst Equation", "Conductance of Electrolytic Solutions", "Electrolytic Cells and Electrolysis", "Batteries", "Fuel Cells", "Corrosion"],
  "Chemical Kinetics": ["Rate of a Chemical Reaction", "Factors Influencing Rate of a Reaction", "Integrated Rate Equations", "Temperature Dependence of the Rate of a Reaction", "Collision Theory of Chemical Reactions"],
  "d- and f-Block Elements": ["Position in the Periodic Table", "Electronic Configurations of the d-Block Elements", "General Properties of the Transition Elements (d-Block)", "Some Important Compounds of Transition Elements", "The Lanthanoids", "The Actinoids"],
  "Coordination Compounds": ["Werner's Theory of Coordination Compounds", "Definitions of Some Important Terms Pertaining to Coordination Compounds", "Nomenclature of Coordination Compounds", "Isomerism in Coordination Compounds", "Bonding in Coordination Compounds", "Bonding in Metal Carbonyls", "Importance and Applications of Coordination Compounds"],
  "Haloalkanes and Haloarenes": ["Classification", "Nomenclature", "Nature of C-X Bond", "Methods of Preparation of Haloalkanes", "Preparation of Haloarenes", "Physical Properties", "Chemical Reactions", "Polyhalogen Compounds"],
  "Alcohols, Phenols and Ethers": ["Classification", "Nomenclature", "Alcohols and Phenols", "Ethers"],
  "Aldehydes, Ketones and Carboxylic Acids": ["Nomenclature and Structure of Carbonyl Group", "Preparation of Aldehydes and Ketones", "Physical Properties of Aldehydes and Ketones", "Chemical Reactions of Aldehydes and Ketones", "Nomenclature and Structure of Carboxyl Group", "Methods of Preparation of Carboxylic Acids", "Physical Properties of Carboxylic Acids", "Chemical Reactions of Carboxylic Acids"],
  "Organic Compounds containing Nitrogen": ["Classification", "Nomenclature", "Preparation of Amines", "Physical Properties of Amines", "Chemical Reactions of Amines", "Cyanides and Isocyanides", "Chemical Reactions of Diazonium Salts", "Importance of Diazonium Salts in Synthesis of Aromatic Compounds"],
  Biomolecules: ["Carbohydrates", "Proteins", "Enzymes", "Vitamins", "Nucleic Acids"],
};
