// Config for the MAHARASHTRA HSC Class-12 MATHS **BOARD PYQ** ingestion.
//
// DISTINCT FROM scripts/stateboard/, and the distinction is the whole point:
//   scripts/stateboard/      → the Balbharati TEXTBOOK (exercises + solved
//                              examples) for this exam, question_kind='practice'.
//   scripts/mh-hsc-12-pyq/   → the board's past-year QUESTION PAPERS,
//                              question_kind='pyq'.
// Both write into the SAME exam and the SAME chapters, so a chapter carries its
// textbook exercises and its board PYQs together and `/browse`'s PYQ/Practice
// toggle separates them. Mirrors how scripts/mh-ssc-10-text/ sits beside
// scripts/mh-ssc-10/. stateboard/config.ts anticipated this pipeline in its own
// header: "the board PYQ papers are a later phase under the SAME exam".
//
// ⚠ SOURCE IS NOT THE RAW BOARD PAPERS. It is an LWS-authored CHAPTERWISE
// COMPILATION: 15 born-digital .docx (Part_1 x7, Part_2 x8), one per textbook
// chapter, each question carrying a provenance tag like `[Q. 27, 2025]`. That
// buys a clean pandoc text path (no vision, no OCR) and costs completeness —
// see COVERAGE below. The raw papers sit one directory up and 6 of the 10 are
// scanned, so they are a repair source, not the ingestion source.
//
// ⚠ NO ANSWER KEY EXISTS ANYWHERE — not in the .docx, not in the bundled
// HSC_Maths_Board_PYQs_v2.pdf (34pp, zero occurrences of "answer"), not in the
// raw papers (a board QP never ships one). Same regime as scripts/mh-ssc-10/ and
// scripts/mh-sb-9/: every MCQ key is DERIVED and every model answer AUTHORED.
// Do not "restore" an `answersPdf` — its absence is a fact about the source.
//
// What this corpus has that the other no-key ingests did NOT: ~2,155 solved
// textbook rows already sit on these same chapters. Measured by token Jaccard of
// each PYQ against its own chapter's practice rows: ~30% have a near-verbatim
// solved twin (>=0.75), ~24% a close relative, ~45% are new. So authoring starts
// from the bank where a twin exists, and every verifiable answer is additionally
// checked with sympy (differentiate the integral, substitute the ODE solution) —
// the scripts/stateboard Indefinite Integration precedent. All 49 MCQ keys are
// blind-re-derived and recorded as `question_reviews` rows (migration 0074),
// which the earlier no-key ingests had no table for.
//
// COVERAGE — the compilation is INCOMPLETE and that is a property of the source,
// not of this pipeline. Both the 2022 and 2023 papers state the same structure
// (Q1 eight MCQ + Q2 four VSA + Q3-14 + Q15-26 + Q27-34 = 44 questions). Against
// that: March 2022 38/44 · March 2023 38/44 · 2024 41/44 · 2025 45/44 (one OVER,
// so at least one 2025 tag is wrong). The 2015-2020 papers are scanned, so their
// coverage is UNMEASURED. Consequence to state plainly whenever this corpus is
// described: it is a chapterwise PYQ bank, NOT a set of reconstructed sittings,
// and it cannot back a /mock sitting the way the NDA and NEET corpora do.
import { join } from "node:path";

export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra HSC Class 12 — the SAME exam row as the textbook corpus.
export { EXAM_ID } from "../stateboard/config";

export const SOURCE_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\Maths\\State_Board\\Question_Paper";
/** The chapterwise compilation (the ingestion source). */
export const COMPILATION = join(SOURCE_ROOT, "Chapterwise_PYQs");
/** Raw board papers — a REPAIR source only. 2022 + 2023 have text layers; the
 *  other eight (2015-2020, 2024, 2025) are scanned and need render + vision. */
export const RAW_PAPERS = SOURCE_ROOT;

export const OUT = join(__dirname, "out"); // gitignored: pandoc dumps + rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription source of truth

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  /** MUST match the existing DB chapter row EXACTLY. The compilation's own
   *  titles differ ("02. Matrices and Determinants", "Line and Plane",
   *  "Applications of Derivatives") and chapters AUTO-CREATE on commit, so the
   *  source spelling would silently fork the corpus in two — the mh-ssc-10-text
   *  lesson. Verified against the live DB 2026-08-12. */
  chapterName: string;
  subjectName: string; // "Mathematics" — must already exist
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  docx: string; // absolute path to the compilation chapter
  note: string; // questions.pyq_note
  /** The chapter's EXISTING DB subtopics, verbatim, as of 2026-08-12. PYQs are
   *  assigned onto this axis per-question; the compilation's own "A./B./C."
   *  section letters are a coarser, different cut and are DISCARDED, so PYQ and
   *  practice rows share one taxonomy per chapter. */
  subtopics: string[];
  /** Set when the DB chapter does not exist yet — commit MUST refuse. These
   *  three were never built by the textbook ingest (it shipped 12 of 15) and are
   *  unblocked by Phase 1. */
  blockedOnTextbookChapter?: string;
};

const P1 = (f: string) => join(COMPILATION, "Part_1", f);
const P2 = (f: string) => join(COMPILATION, "Part_2", f);
const note = (ch: string) =>
  `Maharashtra HSC Class 12 Board PYQ — ${ch} (chapterwise compilation, March 2015-2025; no 2021, exams cancelled)`;

// ─────────────────────────────────────────────────────────────────────────────
// PHYSICS — the SECOND subject on this pipeline (2026-09-09).
//
// Extends rather than forks: every script here already routes through
// `ch.subjectName`, so nothing outside this file needed a change. The two
// extractor rules that DID need widening (escaped item numbering, uppercase
// option labels) were proven byte-identical across all 15 Maths chapters before
// the first Physics extraction — see extract.ts.
//
// HOW THIS SOURCE DIFFERS FROM THE MATHS COMPILATION, all measured:
//   ZERO figures. Not "none embedded" — none NEEDED. Every mention of a figure,
//   diagram or graph across the 16 chapters is an instruction to the student
//   ("Draw a neat labelled diagram of..."); not one question reads a value off
//   an absent figure. attach-images.ts is unused for Physics.
//
//   9 sittings, not 10: March 2016, 2017, 2018, 2019 · February 2020 · March
//   2022 · February 2023, 2024, 2025. No 2021 (the exams were cancelled) and no
//   2015 — unlike Maths, no 2015 Physics paper exists on disk either.
//
//   COVERAGE IS MEASURED, and it is better than the Maths lane's 86%. Three raw
//   papers carry a text layer, so the compilation was diffed against the printed
//   paper: Feb 2023 46/47 (missing Q1(ii)) · Feb 2024 44/47 (Q4, Q25, Q2(i)) ·
//   Feb 2025 45/47 (Q28). The 2016-2020 papers are scanned so their coverage is
//   UNMEASURED; their tag counts (31-37) sit below the newer sittings' (44-49).
//   Even at 46/47 this still cannot back a /mock — a mock is the real paper or
//   it is nothing.
//
//   THE COMPOUND QUESTION is the structural difference that matters. A board
//   Section-C/D question pairs a theory part with an unrelated numerical, and
//   the two halves routinely belong to DIFFERENT chapters — so the compiler
//   pasted the whole question into each chapter it touches. 25 provenance tags
//   appear in more than one chapter (NOT 22: the source spells `28 OR` and
//   `28 (OR)` inconsistently, so a naive tag key silently misses three pairs).
//   Roughly 15 are one question cross-filed under two plausible chapters — the
//   Maths dedupe.ts ledger case — and roughly 10 are compound questions whose
//   halves belong apart. Those are SPLIT into two rows, one per chapter, each
//   keeping the tag with a part suffix; keeping them whole under one chapter
//   would silently cost the other chapter its half. Adjudicated per question in
//   the ledger, never by rule.
//
//   NO ANSWER KEY, exactly as for Maths — a board QP never ships one. All ~89
//   MCQ keys are derived (twice, the second pass blind) and all ~290 model
//   answers authored. Reuse is THINNER than Maths: measured by token Jaccard
//   against each chapter's own textbook rows, 15% have a near-verbatim solved
//   twin and 55% are new, against Maths' ~30%/45% — the Physics practice base
//   is 617 rows where Maths had ~2,155.
//
//   SUBTOPICS ARE THE EXISTING DB AXIS, verbatim, as of 2026-09-09, and no new
//   ones are created (user's call, 2026-09-09). Where the board examines
//   something the textbook exercises never did — free/forced/damped vibrations
//   in Oscillations, the Doppler effect of light in Wave Optics — the question
//   goes to the NEAREST existing subtopic rather than growing the shared axis
//   for one or two rows. Record that choice in the assignment's `why`, since a
//   nearest-fit filing is a decision and should not read as an exact one.
const PHY = (f: string) =>
  join(
    "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\Physics\\State_Board\\PYQs",
    f,
  );
const phyNote = (ch: string) =>
  `Maharashtra HSC Class 12 Board PYQ — ${ch} (chapterwise compilation, March 2016-February 2025; no 2021, exams cancelled)`;

const PHYSICS: Record<string, Chapter> = {
  "rotational-dynamics-12-pyq": {
    id: "rotational-dynamics-12-pyq",
    chapterName: "Rotational Dynamics",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Rotational_Dynamics.docx",
    docx: PHY("1. Rotational Dynamics.docx"),
    note: phyNote("Rotational Dynamics"),
    subtopics: [
      "Angular Momentum and Torque",
      "Applications of Uniform Circular Motion",
      "Conservation of Angular Momentum",
      "Kinematics and Dynamics of Circular Motion",
      "Moment of Inertia and Radius of Gyration",
      "Rolling Motion",
      "Theorems of Parallel and Perpendicular Axes",
      "Vertical Circular Motion",
    ],
  },

  "fluids-12-pyq": {
    id: "fluids-12-pyq",
    chapterName: "Mechanical Properties of Fluids",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Mechanical_Properties_of_Fluids.docx",
    docx: PHY("2. Mechanical Properties of Fluids.docx"),
    note: phyNote("Mechanical Properties of Fluids"),
    subtopics: [
      "Capillary Action",
      "Equation of Continuity and Bernoulli's Equation",
      "Excess Pressure, Drops and Bubbles",
      "Fluid Pressure and Pascal's Law",
      "Stokes' Law and Terminal Velocity",
      "Surface Tension and Surface Energy",
      "Viscosity, Critical Velocity and Reynolds Number",
    ],
  },

  "kinetic-theory-12-pyq": {
    id: "kinetic-theory-12-pyq",
    chapterName: "Kinetic Theory of Gases and Radiation",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Kinetic_Theory_of_Gases_and_Radiation.docx",
    docx: PHY("3. Kinetic Theory of Gases and Radiation.docx"),
    note: phyNote("Kinetic Theory of Gases and Radiation"),
    subtopics: [
      "Absorption, Reflection and Transmission of Heat Radiation",
      "Behaviour of Gases, Ideal and Real Gas",
      "Kirchhoff's Law of Heat Radiation",
      "Law of Equipartition of Energy and Degrees of Freedom",
      "Mean Free Path and Pressure of an Ideal Gas",
      "Perfect Blackbody and Emissivity",
      "RMS Speed and Interpretation of Temperature",
      "Specific Heat Capacity and Mayer's Relation",
      "Spectral Distribution and Wien's Displacement Law",
    ],
  },

  "thermodynamics-12-pyq": {
    id: "thermodynamics-12-pyq",
    chapterName: "Thermodynamics",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Thermodynamics.docx",
    docx: PHY("4. Thermodynamics.docx"),
    note: phyNote("Thermodynamics"),
    subtopics: [
      "Carnot Cycle and Carnot Engine",
      "First Law of Thermodynamics",
      "Heat Engines",
      "Heat, Internal Energy and Work",
      "Refrigerators and Heat Pumps",
      "Second Law of Thermodynamics",
      "Thermodynamic Processes",
      "Thermodynamic State Variables and the p-V Diagram",
    ],
  },

  // ── PILOT. Deliberately the hardest chapter, not the easiest (the Maths lane
  //    made the same call): 32 items, the most compound questions of any
  //    chapter (7), three cross-chapter pairs reaching THREE different chapters
  //    (Rotational Dynamics, Oscillations, Wave Optics), and five of the six
  //    malformed `OR` tag spellings in the corpus (`3 OR`, `4.OR`, `4. OR B`,
  //    `4.A OR`, `28 OR`). If the extraction, the ledger and the split hold
  //    here, the remaining 15 are easier.
  "superposition-12-pyq": {
    id: "superposition-12-pyq",
    chapterName: "Superposition of Waves",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Superposition_of_Waves.docx",
    docx: PHY("6. Superposition of Waves.docx"),
    note: phyNote("Superposition of Waves"),
    subtopics: [
      "Beats",
      "Harmonics, Overtones and End Correction",
      "Progressive Waves",
      "Stationary Waves",
      "Superposition of Waves",
      "Vibrations of a Stretched String and Sonometer",
      "Vibrations of Air Columns",
    ],
  },

  "oscillations-12-pyq": {
    id: "oscillations-12-pyq",
    chapterName: "Oscillations",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Oscillations.docx",
    docx: PHY("5. Oscillations.docx"),
    note: phyNote("Oscillations"),
    // The compilation carries a "Free, Forced, and Damped Vibrations" section
    // and a "Systems of Springs" section; neither has a DB subtopic, because the
    // textbook lane found §5.14/§5.15 taught and examined ZERO times in the
    // Balbharati exercises. Those questions go to the nearest fit here.
    subtopics: [
      "Acceleration, Velocity and Displacement in S.H.M.",
      "Amplitude, Period and Frequency of S.H.M.",
      "Angular S.H.M. and Magnet Vibrating in a Magnetic Field",
      "Composition of Two S.H.M.s",
      "Energy of a Particle Performing S.H.M.",
      "Periodic Motion and Linear S.H.M.",
      "Reference Circle, Phase and Graphical Representation",
      "Simple Pendulum",
    ],
  },

  "wave-optics-12-pyq": {
    id: "wave-optics-12-pyq",
    chapterName: "Wave Optics",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Wave_Optics.docx",
    docx: PHY("7. Wave Optics.docx"),
    note: phyNote("Wave Optics"),
    // The compilation has a "Doppler Effect of Light" section with no DB
    // counterpart — nearest fit, as above.
    subtopics: [
      "Diffraction at a Single Slit",
      "Interference and Young's Double Slit Experiment",
      "Nature of Light and Huygens' Principle",
      "Polarization and Brewster's Law",
      "Reflection and Refraction on Huygens' Theory",
      "Resolving Power",
    ],
  },

  "electrostatics-12-pyq": {
    id: "electrostatics-12-pyq",
    chapterName: "Electrostatics",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Electrostatics.docx",
    docx: PHY("8. Electrostatics.docx"),
    note: phyNote("Electrostatics"),
    subtopics: [
      "Applications of Gauss' Law",
      "Capacitors and Combination of Capacitors",
      "Conductors, Insulators and Dielectrics",
      "Electric Potential and Potential Energy",
      "Energy Stored in a Capacitor",
      "Equipotential Surfaces",
      "Parallel Plate Capacitor with a Dielectric",
      "Potential Energy of Charges and Dipoles",
    ],
  },

  "current-electricity-12-pyq": {
    id: "current-electricity-12-pyq",
    chapterName: "Current Electricity",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Current_Electricity.docx",
    docx: PHY("9. Current Electricity.docx"),
    note: phyNote("Current Electricity"),
    subtopics: [
      "Galvanometer, Ammeter and Voltmeter",
      "Kirchhoff's Laws of Electrical Networks",
      "Potentiometer",
      "Wheatstone Bridge and Metre Bridge",
    ],
  },

  "magnetic-fields-12-pyq": {
    id: "magnetic-fields-12-pyq",
    chapterName: "Magnetic Fields due to Electric Current",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Magnetic_Fields_due_to_Electric_Current.docx",
    docx: PHY("10. Magnetic Fields due to Electric Current.docx"),
    note: phyNote("Magnetic Fields due to Electric Current"),
    subtopics: [
      "Ampere's Law, Solenoid and Toroid",
      "Cyclotron and Helical Motion",
      "Force Between Two Parallel Currents",
      "Force on a Current-Carrying Wire",
      "Magnetic Dipole Moment and Potential Energy",
      "Magnetic Field due to a Current",
      "Magnetic Force on a Moving Charge",
      "Torque on a Current Loop and the Moving Coil Galvanometer",
    ],
  },

  "magnetic-materials-12-pyq": {
    id: "magnetic-materials-12-pyq",
    chapterName: "Magnetic Materials",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Magnetic_Materials.docx",
    docx: PHY("11. Magnetic Materials.docx"),
    note: phyNote("Magnetic Materials"),
    subtopics: [
      "Diamagnetism, Paramagnetism and Ferromagnetism",
      "Hysteresis",
      "Magnetization and Magnetic Intensity",
      "Origin of Magnetism in Materials",
      "Permanent Magnets, Electromagnets and Magnetic Shielding",
      "Torque on a Magnetic Dipole",
    ],
  },

  "emi-12-pyq": {
    id: "emi-12-pyq",
    // The DB row capitalises Induction; the compilation's filename does not.
    // Chapters AUTO-CREATE on commit, so the source spelling would silently fork
    // the corpus in two — the mh-ssc-10-text lesson.
    chapterName: "Electromagnetic Induction",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Electromagnetic_Induction.docx",
    docx: PHY("12.  Electromagnetic induction.docx"), // NOTE: two spaces after "12."
    note: phyNote("Electromagnetic Induction"),
    subtopics: [
      "Eddy Currents",
      "Faraday's Laws and Magnetic Flux",
      "Generators, Back emf and Energy Transfer",
      "Induced emf in a Stationary Coil",
      "Lenz's Law",
      "Motional Electromotive Force",
      "Mutual Inductance",
      "Self-Inductance and Energy in a Magnetic Field",
    ],
  },

  "ac-circuits-12-pyq": {
    id: "ac-circuits-12-pyq",
    chapterName: "AC Circuits",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__AC_Circuits.docx",
    docx: PHY("13. AC Circuits.docx"),
    note: phyNote("AC Circuits"),
    subtopics: [
      "Average and RMS Values",
      "Electrical Resonance and Q Factor",
      "LC Oscillations",
      "Phasors and Types of AC Circuits",
      "Power in an AC Circuit",
    ],
  },

  "dual-nature-12-pyq": {
    id: "dual-nature-12-pyq",
    chapterName: "Dual Nature of Radiation and Matter",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Dual_Nature_of_Radiation_and_Matter.docx",
    docx: PHY("14. Dual Nature of Radiation and Matter.docx"),
    note: phyNote("Dual Nature of Radiation and Matter"),
    subtopics: [
      "Davisson-Germer Experiment and Duality of Matter",
      "De Broglie Hypothesis",
      "Einstein's Photoelectric Equation",
      "Photo Cell",
      "Photoelectric Effect",
      "Wave-Particle Duality of Radiation",
    ],
  },

  "atoms-nuclei-12-pyq": {
    id: "atoms-nuclei-12-pyq",
    chapterName: "Structure of Atoms and Nuclei",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Structure_of_Atoms_and_Nuclei.docx",
    docx: PHY("15. Structure of Atoms and Nuclei.docx"),
    note: phyNote("Structure of Atoms and Nuclei"),
    subtopics: [
      "Atomic Nucleus: Constituents, Size and Forces",
      "Atomic Spectra",
      "Bohr's Atomic Model",
      "Law of Radioactive Decay, Half-Life and Average Life",
      "Nuclear Binding Energy",
      "Nuclear Fission and Fusion",
      "Radioactive Decays",
      "Thomson's and Rutherford's Atomic Models",
    ],
  },

  // The ONE chapter pandoc emits as plain paragraphs rather than a Word list,
  // so its numbering arrives escaped ("1\. ") and the shipped ITEM rule
  // extracted ZERO questions from it, silently. See extract.ts.
  "semiconductors-12-pyq": {
    id: "semiconductors-12-pyq",
    chapterName: "Semiconductor Devices",
    subjectName: "Physics",
    sourceFile: "MH_HSC_12_Physics_PYQ__Semiconductor_Devices.docx",
    docx: PHY("16. Semiconductor Devices.docx"),
    note: phyNote("Semiconductor Devices"),
    subtopics: [
      "Bipolar Junction Transistor",
      "Logic Gates",
      "p-n Junction Diode as a Rectifier",
      "Photodiode, Solar Cell and LED",
      "Ripple Factor and Filter Circuits",
      "Transistor as an Amplifier",
      "Zener Diode",
    ],
  },
};

export const CHAPTERS: Record<string, Chapter> = {
  // ── PILOT. Deliberately the hardest chapter, not the easiest: it carries ALL 5
  //    of the compilation's embedded images (switching circuits — every other
  //    chapter has zero), the only U+1F86A wide-arrow glyph, the only embedded
  //    LWS editorial note ("(Note: This question involves quantifiers...)" on
  //    Q7), a zero-option MCQ (Q5, the dual of r v (p v q)), and 2 tag
  //    collisions. If extraction holds here the remaining 14 are easier.
  "logic-12-pyq": {
    id: "logic-12-pyq",
    chapterName: "Mathematical Logic",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Mathematical_Logic.docx",
    docx: P1("12th_Part_1_01.Mathematical_Logic.docx"),
    note: note("Mathematical Logic"),
    subtopics: [
      "Statements and Logical Connectives",
      "Truth Tables of Compound Statements",
      "Tautology, Contradiction and Contingency",
      "Logical Equivalence and Algebra of Statements",
      "Quantifiers, Duality and Negation of Statements",
      "Converse, Inverse and Contrapositive",
      "Application of Logic to Switching Circuits",
    ],
  },

  "matrices-12-pyq": {
    id: "matrices-12-pyq",
    chapterName: "Matrices", // compilation says "Matrices and Determinants"
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Matrices.docx",
    docx: P1("12th_Part_1_02.Matrices.docx"),
    note: note("Matrices"),
    subtopics: [
      "Elementary Transformations of a Matrix",
      "Inverse by Elementary Transformation Method",
      "Minors, Cofactors and Adjoint",
      "Inverse by Adjoint Method",
      "Solution of Linear Equations using Matrices",
    ],
  },

  "trig-functions-12-pyq": {
    id: "trig-functions-12-pyq",
    chapterName: "Trigonometric Functions",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Trigonometric_Functions.docx",
    docx: P1("12th_Part_1_03.Trigonometric_Functions.docx"),
    note: note("Trigonometric Functions"),
    subtopics: [
      "Trigonometric Equations and General Solutions",
      "Polar Coordinates",
      "Solution of Triangle — Sine, Cosine and Projection Rules",
      "Applications of Sine, Cosine and Projection Rules",
      "Inverse Trigonometric Functions and Principal Values",
      "Properties of Inverse Trigonometric Functions",
    ],
  },

  "pair-lines-12-pyq": {
    id: "pair-lines-12-pyq",
    chapterName: "Pair of Straight Lines",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Pair_of_Straight_Lines.docx",
    docx: P1("12th_Part_1_04.Pair of Straight_Lines.docx"),
    note: note("Pair of Straight Lines"),
    subtopics: [
      "Combined Equation of a Pair of Lines",
      "Angle between a Pair of Lines",
      "Angle Bisectors of a Pair of Lines",
      "General Second Degree Equation of Two Lines",
    ],
  },

  // Direction cosines / ratios live HERE, not in Line and Planes — verified in
  // the textbook, against the opposite assumption: Ch.5 carries 38 "direction
  // cosine" mentions and a dedicated section 5.3.4 "Direction Angles and
  // Direction Cosines" (inside 5.3 Product of vectors → DB subtopic "Dot Product
  // of Vectors"), while Ch.6's section list opens at 6.1 and has no DC/DR
  // section at all. The shipped bank already files 15 DC/DR practice rows under
  // Vectors → Dot Product, so the PYQs follow that precedent.
  "vectors-12-pyq": {
    id: "vectors-12-pyq",
    chapterName: "Vectors",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Vectors.docx",
    docx: P1("12th_Part_1_05.Vectors.docx"),
    note: note("Vectors"),
    subtopics: [
      "Vectors and Their Types",
      "Section Formula",
      "Dot Product of Vectors",
      "Cross Product of Vectors",
      "Scalar and Vector Triple Product",
    ],
  },

  "line-planes-12-pyq": {
    id: "line-planes-12-pyq",
    chapterName: "Line and Planes", // compilation says "Line and Plane" (singular)
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Line_and_Planes.docx",
    docx: P1("12th_Part_1_06.Line and Plane.docx"),
    note: note("Line and Planes"),
    subtopics: [
      "Vector and Cartesian Equations of a Line",
      "Distance of a Point from a Line",
      "Skew Lines and Shortest Distance",
      "Equations of a Plane",
      "Angle Between Planes and Line-Plane Angle",
      "Coplanarity of Two Lines",
      "Distance of a Point from a Plane",
    ],
  },

  "linear-prog-12-pyq": {
    id: "linear-prog-12-pyq",
    chapterName: "Linear Programming",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Linear_Programming.docx",
    docx: P1("12th_Part_1_07.Linear_Programming.docx"),
    note: note("Linear Programming"),
    subtopics: [
      "Linear Inequations in Two Variables",
      "Formulation of a Linear Programming Problem",
      "Graphical Solution of a Linear Programming Problem",
    ],
  },

  "differentiation-12-pyq": {
    id: "differentiation-12-pyq",
    chapterName: "Differentiation",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Differentiation.docx",
    docx: P2("12th_Part_2_01.Differentiation.docx"),
    note: note("Differentiation"),
    subtopics: [
      "Derivatives of Composite Functions (Chain Rule)",
      "Derivatives of Inverse Functions",
      "Derivatives of Inverse Trigonometric Functions",
      "Logarithmic Differentiation",
      "Derivatives of Implicit Functions",
      "Derivatives of Parametric Functions",
      "Differentiation of One Function with respect to Another",
      "Higher Order Derivatives",
    ],
  },

  "app-derivatives-12-pyq": {
    id: "app-derivatives-12-pyq",
    chapterName: "Application of Derivatives", // compilation says "Applications of Derivatives"
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Application_of_Derivatives.docx",
    docx: P2("12th_Part_2_02.Applications_Of_Derivatives.docx"),
    note: note("Application of Derivatives"),
    subtopics: [
      "Tangents and Normals",
      "Derivative as a Rate Measure",
      "Velocity, Acceleration and Jerk",
      "Approximations",
      "Rolle's Theorem",
      "Lagrange's Mean Value Theorem",
      "Increasing and Decreasing Functions",
      "Maxima and Minima",
    ],
  },

  "indef-integration-12-pyq": {
    id: "indef-integration-12-pyq",
    chapterName: "Indefinite Integration",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Indefinite_Integration.docx",
    docx: P2("12th_Part_2_03.Indefinite_Integration.docx"),
    note: note("Indefinite Integration"),
    subtopics: [
      "Elementary Integration and Standard Formulae",
      "Integration by Substitution",
      "Integrals of Trigonometric Functions",
      "Special Integrals of Quadratic Forms",
      "Integrals of the Type (px+q) over a Quadratic",
      "Integration by Parts",
      "Integration by Partial Fractions",
    ],
  },

  "app-def-integration-12-pyq": {
    id: "app-def-integration-12-pyq",
    chapterName: "Application of Definite Integration",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Application_of_Definite_Integration.docx",
    docx: P2("12th_Part_2_05.Application_of_Definite_Integration.docx"),
    note: note("Application of Definite Integration"),
    subtopics: ["Area Under a Curve", "Area Between Two Curves"],
  },

  "diff-equations-12-pyq": {
    id: "diff-equations-12-pyq",
    chapterName: "Differential Equations",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Differential_Equations.docx",
    docx: P2("12th_Part_2_06.Differential_Equations.docx"),
    note: note("Differential Equations"),
    subtopics: [
      "Order and Degree of a Differential Equation",
      "Formation of a Differential Equation",
      "Solution of a Differential Equation",
      "Applications of Differential Equations",
    ],
  },

  // ── The three chapters the TEXTBOOK ingest had never built (it shipped 12 of
  //    15). UNBLOCKED 2026-08-13: Phase 1 ingested Ch_04 / Ch_07 / Ch_08 via
  //    scripts/stateboard/, so all 15 DB chapters now exist and the subtopics
  //    below are read back from the live rows like every other entry here.
  //    The provisional `chapterName`s were re-verified against the DB and all
  //    three were right — note "Binomial Distribution" is SINGULAR, matching the
  //    MHT-CET and NDA banks, while the compilation says "Binomial Distributions".
  "def-integration-12-pyq": {
    id: "def-integration-12-pyq",
    chapterName: "Definite Integration",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Definite_Integration.docx",
    docx: P2("12th_Part_2_04.Definite_Integration.docx"),
    note: note("Definite Integration"),
    subtopics: [
      "Fundamental Theorem of Integral Calculus",
      "Definite Integral as a Limit of a Sum",
      "Methods of Evaluation of Definite Integrals",
      "Properties of Definite Integrals",
    ],
  },

  "prob-distributions-12-pyq": {
    id: "prob-distributions-12-pyq",
    chapterName: "Probability Distributions",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Probability_Distributions.docx",
    docx: P2("12th_Part_2_07.Probability_Distributions.docx"),
    note: note("Probability Distributions"),
    subtopics: [
      "Random Variables and Their Types",
      "Probability Mass Function of a Discrete Random Variable",
      "Cumulative Distribution Function",
      "Expected Value and Variance of a Random Variable",
      "Continuous Random Variables and Probability Density Function",
    ],
  },

  "binomial-distributions-12-pyq": {
    id: "binomial-distributions-12-pyq",
    chapterName: "Binomial Distribution",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Binomial_Distribution.docx",
    docx: P2("12th_Part_2_08.Binomial_Distributions.docx"),
    note: note("Binomial Distribution"),
    subtopics: [
      "Bernoulli Trials",
      "The Binomial Distribution",
      "Mean and Variance of a Binomial Distribution",
    ],
  },

  ...PHYSICS,
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireChapter(id: string | undefined): Chapter {
  const ch = id ? CHAPTERS[id] : undefined;
  if (!ch) {
    throw new Error(
      `Unknown chapter id ${JSON.stringify(id)}. Known: ${Object.keys(CHAPTERS).join(", ")}`,
    );
  }
  return ch;
}
