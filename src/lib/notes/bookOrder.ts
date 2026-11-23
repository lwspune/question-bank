/**
 * Where each MHT-CET notes chapter sits in the Balbharati textbooks — the books
 * the CET syllabus is set from. Used to order a subject's chapters (the subject
 * page and the "Next chapter" link) in BOOK order, Class XI then XII, instead of
 * the order the chapters happened to be written in (which led Differentiation
 * on to Vectors). Decided 2026-09-28.
 *
 * Positions come from the "MH State Board" spine in `syllabus_concepts` (the
 * book's own table of contents), never from memory; `book` records the chapter
 * each entry means. `within` orders several notes chapters inside ONE book
 * chapter (Alkanes → Alkenes → Alkynes → Aromatic are all XI 15 Hydrocarbons,
 * in the book's section order).
 *
 * Judgment calls, recorded so they are not re-derived:
 *  - Determinants and Matrices spans XI 4 and XII 2; placed at XI 4, where the
 *    topic starts.
 *  - Differentiation: our notes are the XII 8 content (chain, log, implicit,
 *    parametric), not the XI 18 introduction.
 *  - Electrostatics exists in XI 10 and XII 8; our chapter is placed at XII 8.
 *
 * Spec: tests/notes-book-order.test.ts — which also fails if a CET chapter
 * ships without a position here. Deliberately imports nothing: chapters.ts
 * imports this file.
 */

export type BookPosition = { cls: 11 | 12; chapterNo: number; within?: number; book: string };

export const BOOK_POSITION: Record<string, Record<string, BookPosition>> = {
  "mht-cet-maths": {
    "trigonometry-ii": { cls: 11, chapterNo: 3, book: "XI 3 Trigonometry - II" },
    "determinants-and-matrices": { cls: 11, chapterNo: 4, book: "XI 4 Determinants and Matrices (and XII 2 Matrices)" },
    "straight-line": { cls: 11, chapterNo: 5, book: "XI 5 Straight Line" },
    circle: { cls: 11, chapterNo: 6, book: "XI 6 Circle" },
    "conic-sections": { cls: 11, chapterNo: 7, book: "XI 7 Conic Sections" },
    "measures-of-dispersion": { cls: 11, chapterNo: 8, book: "XI 8 Measures of Dispersion" },
    "complex-numbers": { cls: 11, chapterNo: 10, book: "XI 10 Complex Numbers" },
    "permutations-and-combinations": { cls: 11, chapterNo: 12, book: "XI 12 Permutations and Combination" },
    "sets-relations-and-functions": { cls: 11, chapterNo: 14, book: "XI 14 Sets and Relations + XI 15 Functions" },
    limits: { cls: 11, chapterNo: 16, book: "XI 16 Limits" },
    "mathematical-logic": { cls: 12, chapterNo: 1, book: "XII 1 Mathematical Logic" },
    "trigonometric-functions": { cls: 12, chapterNo: 3, book: "XII 3 Trigonometric Functions" },
    "pair-of-straight-lines": { cls: 12, chapterNo: 4, book: "XII 4 Pair of Straight Lines" },
    vectors: { cls: 12, chapterNo: 5, book: "XII 5 Vectors" },
    "line-and-plane": { cls: 12, chapterNo: 6, book: "XII 6 Line and Plane" },
    "linear-programming": { cls: 12, chapterNo: 7, book: "XII 7 Linear Programming" },
    differentiation: { cls: 12, chapterNo: 8, book: "XII 8 Differentiation" },
    "applications-of-derivative": { cls: 12, chapterNo: 9, book: "XII 9 Applications of Derivatives" },
    "indefinite-integration": { cls: 12, chapterNo: 10, book: "XII 10 Indefinite Integration" },
    "definite-integration": { cls: 12, chapterNo: 11, book: "XII 11 Definite Integration" },
    "applications-of-definite-integral": { cls: 12, chapterNo: 12, book: "XII 12 Application of Definite Integration" },
    "differential-equations": { cls: 12, chapterNo: 13, book: "XII 13 Differential Equations" },
    "probability-distribution": { cls: 12, chapterNo: 14, book: "XII 14 Probability Distributions" },
    "binomial-distribution": { cls: 12, chapterNo: 15, book: "XII 15 Binomial Distribution" },
  },
  "mht-cet-chemistry": {
    "some-basic-concepts": { cls: 11, chapterNo: 1, book: "XI 1 Some Basic Concepts of Chemistry" },
    "structure-of-atom": { cls: 11, chapterNo: 4, book: "XI 4 Structure of Atom" },
    "chemical-bonding": { cls: 11, chapterNo: 5, book: "XI 5 Chemical Bonding" },
    "redox-reactions": { cls: 11, chapterNo: 6, book: "XI 6 Redox Reactions" },
    "modern-periodic-table": { cls: 11, chapterNo: 7, book: "XI 7 Modern Periodic Table" },
    "elements-of-group-1-and-2": { cls: 11, chapterNo: 8, book: "XI 8 Elements of Group 1 and 2" },
    "states-of-matter": { cls: 11, chapterNo: 10, book: "XI 10 States of Matter" },
    "surface-chemistry": { cls: 11, chapterNo: 11, book: "XI 11 Adsorption and Colloids" },
    "basic-principles-of-organic-chemistry": { cls: 11, chapterNo: 14, book: "XI 14 Basic Principles of Organic Chemistry" },
    alkanes: { cls: 11, chapterNo: 15, within: 1, book: "XI 15 Hydrocarbons — Alkanes" },
    alkenes: { cls: 11, chapterNo: 15, within: 2, book: "XI 15 Hydrocarbons — Alkenes" },
    alkynes: { cls: 11, chapterNo: 15, within: 3, book: "XI 15 Hydrocarbons — Alkynes" },
    "aromatic-compounds": { cls: 11, chapterNo: 15, within: 4, book: "XI 15 Hydrocarbons — Aromatic hydrocarbons" },
    "solid-state": { cls: 12, chapterNo: 1, book: "XII 1 Solid State" },
    solutions: { cls: 12, chapterNo: 2, book: "XII 2 Solutions" },
    "ionic-equilibria": { cls: 12, chapterNo: 3, book: "XII 3 Ionic Equilibria" },
    "chemical-thermodynamics": { cls: 12, chapterNo: 4, book: "XII 4 Chemical Thermodynamics" },
    electrochemistry: { cls: 12, chapterNo: 5, book: "XII 5 Electrochemistry" },
    "chemical-kinetics": { cls: 12, chapterNo: 6, book: "XII 6 Chemical Kinetics" },
    "elements-of-group-16-17-and-18": { cls: 12, chapterNo: 7, book: "XII 7 Elements of Groups 16, 17 and 18" },
    "transition-and-inner-transition-elements": { cls: 12, chapterNo: 8, book: "XII 8 Transition and Inner transition Elements" },
    "coordination-compounds": { cls: 12, chapterNo: 9, book: "XII 9 Coordination Compounds" },
    "halogen-derivatives": { cls: 12, chapterNo: 10, book: "XII 10 Halogen Derivatives" },
    "alcohols-phenols-and-ethers": { cls: 12, chapterNo: 11, book: "XII 11 Alcohols, Phenols and Ethers" },
    "aldehydes-ketones-and-carboxylic-acids": { cls: 12, chapterNo: 12, book: "XII 12 Aldehydes, Ketones and Carboxylic acids" },
    amines: { cls: 12, chapterNo: 13, book: "XII 13 Amines" },
    biomolecules: { cls: 12, chapterNo: 14, book: "XII 14 Biomolecules" },
    "introduction-to-polymer-chemistry": { cls: 12, chapterNo: 15, book: "XII 15 Introduction to Polymer Chemistry" },
    "green-chemistry-and-nanochemistry": { cls: 12, chapterNo: 16, book: "XII 16 Green Chemistry and Nanochemistry" },
  },
  // NEET Botany (2026-11-15): NCERT Biology, 2023 rationalised numbering (Class XI then XII).
  "neet-botany": {
    "living-world": { cls: 11, chapterNo: 1, book: "XI 1 The Living World" },
    "biological-classification": { cls: 11, chapterNo: 2, book: "XI 2 Biological Classification" },
    "plant-kingdom": { cls: 11, chapterNo: 3, book: "XI 3 Plant Kingdom" },
    morphology: { cls: 11, chapterNo: 5, book: "XI 5 Morphology of Flowering Plants" },
    anatomy: { cls: 11, chapterNo: 6, book: "XI 6 Anatomy of Flowering Plants" },
    "cell-unit-of-life": { cls: 11, chapterNo: 8, book: "XI 8 Cell: The Unit of Life" },
    "cell-cycle": { cls: 11, chapterNo: 10, book: "XI 10 Cell Cycle and Cell Division" },
    photosynthesis: { cls: 11, chapterNo: 11, book: "XI 11 Photosynthesis in Higher Plants" },
    respiration: { cls: 11, chapterNo: 12, book: "XI 12 Respiration in Plants" },
    "plant-growth": { cls: 11, chapterNo: 13, book: "XI 13 Plant Growth and Development" },
    "sexual-reproduction": { cls: 12, chapterNo: 1, book: "XII 1 Sexual Reproduction in Flowering Plants" },
    inheritance: { cls: 12, chapterNo: 4, book: "XII 4 Principles of Inheritance and Variation" },
    "molecular-basis": { cls: 12, chapterNo: 5, book: "XII 5 Molecular Basis of Inheritance" },
    microbes: { cls: 12, chapterNo: 8, book: "XII 8 Microbes in Human Welfare" },
    "organisms-populations": { cls: 12, chapterNo: 11, book: "XII 11 Organisms and Populations" },
    ecosystem: { cls: 12, chapterNo: 12, book: "XII 12 Ecosystem" },
    biodiversity: { cls: 12, chapterNo: 13, book: "XII 13 Biodiversity and Conservation" },
  },
  // NEET Zoology (2026-11-15): same book and numbering. Digestion and Absorption and
  // Environmental Issues left the NEET syllabus in 2024 and get no notes.
  "neet-zoology": {
    "animal-kingdom": { cls: 11, chapterNo: 4, book: "XI 4 Animal Kingdom" },
    "structural-organisation": { cls: 11, chapterNo: 7, book: "XI 7 Structural Organisation in Animals" },
    biomolecules: { cls: 11, chapterNo: 9, book: "XI 9 Biomolecules" },
    breathing: { cls: 11, chapterNo: 14, book: "XI 14 Breathing and Exchange of Gases" },
    "body-fluids": { cls: 11, chapterNo: 15, book: "XI 15 Body Fluids and Circulation" },
    excretion: { cls: 11, chapterNo: 16, book: "XI 16 Excretory Products and their Elimination" },
    locomotion: { cls: 11, chapterNo: 17, book: "XI 17 Locomotion and Movement" },
    "neural-control": { cls: 11, chapterNo: 18, book: "XI 18 Neural Control and Coordination" },
    "chemical-coordination": { cls: 11, chapterNo: 19, book: "XI 19 Chemical Coordination and Integration" },
    "human-reproduction": { cls: 12, chapterNo: 2, book: "XII 2 Human Reproduction" },
    "reproductive-health": { cls: 12, chapterNo: 3, book: "XII 3 Reproductive Health" },
    evolution: { cls: 12, chapterNo: 6, book: "XII 6 Evolution" },
    "human-health": { cls: 12, chapterNo: 7, book: "XII 7 Human Health and Disease" },
    "biotech-principles": { cls: 12, chapterNo: 9, book: "XII 9 Biotechnology: Principles and Processes" },
    "biotech-applications": { cls: 12, chapterNo: 10, book: "XII 10 Biotechnology and its Applications" },
  },
  // NEET Physics (2026-11-16): NCERT Physics, 2023 rationalised numbering (Class XI then XII).
  "neet-physics": {
    "units-and-measurements": { cls: 11, chapterNo: 1, book: "XI 1 Units and Measurements" },
    "motion-in-a-straight-line": { cls: 11, chapterNo: 2, book: "XI 2 Motion in a Straight Line" },
    "motion-in-a-plane": { cls: 11, chapterNo: 3, book: "XI 3 Motion in a Plane" },
    "laws-of-motion": { cls: 11, chapterNo: 4, book: "XI 4 Laws of Motion" },
    "work-energy-and-power": { cls: 11, chapterNo: 5, book: "XI 5 Work, Energy and Power" },
    "rotational-motion": { cls: 11, chapterNo: 6, book: "XI 6 System of Particles and Rotational Motion" },
    gravitation: { cls: 11, chapterNo: 7, book: "XI 7 Gravitation" },
    "mechanical-properties-of-solids": { cls: 11, chapterNo: 8, book: "XI 8 Mechanical Properties of Solids" },
    "mechanical-properties-of-fluids": { cls: 11, chapterNo: 9, book: "XI 9 Mechanical Properties of Fluids" },
    "thermal-properties-of-matter": { cls: 11, chapterNo: 10, book: "XI 10 Thermal Properties of Matter" },
    thermodynamics: { cls: 11, chapterNo: 11, book: "XI 11 Thermodynamics" },
    "kinetic-theory": { cls: 11, chapterNo: 12, book: "XI 12 Kinetic Theory" },
    oscillations: { cls: 11, chapterNo: 13, book: "XI 13 Oscillations" },
    waves: { cls: 11, chapterNo: 14, book: "XI 14 Waves" },
    "electric-charges-and-fields": { cls: 12, chapterNo: 1, book: "XII 1 Electric Charges and Fields" },
    "electrostatic-potential": { cls: 12, chapterNo: 2, book: "XII 2 Electrostatic Potential and Capacitance" },
    "current-electricity": { cls: 12, chapterNo: 3, book: "XII 3 Current Electricity" },
    "moving-charges-and-magnetism": { cls: 12, chapterNo: 4, book: "XII 4 Moving Charges and Magnetism" },
    "magnetism-and-matter": { cls: 12, chapterNo: 5, book: "XII 5 Magnetism and Matter" },
    "electromagnetic-induction": { cls: 12, chapterNo: 6, book: "XII 6 Electromagnetic Induction" },
    "alternating-current": { cls: 12, chapterNo: 7, book: "XII 7 Alternating Current" },
    "electromagnetic-waves": { cls: 12, chapterNo: 8, book: "XII 8 Electromagnetic Waves" },
    "ray-optics": { cls: 12, chapterNo: 9, book: "XII 9 Ray Optics and Optical Instruments" },
    "wave-optics": { cls: 12, chapterNo: 10, book: "XII 10 Wave Optics" },
    "dual-nature": { cls: 12, chapterNo: 11, book: "XII 11 Dual Nature of Radiation and Matter" },
    "atoms": { cls: 12, chapterNo: 12, book: "XII 12 Atoms" },
    "nuclei": { cls: 12, chapterNo: 13, book: "XII 13 Nuclei" },
    "semiconductor-electronics": { cls: 12, chapterNo: 14, book: "XII 14 Semiconductor Electronics" },
  },
  // NEET Chemistry (2026-11-16): NCERT Chemistry, 2023 rationalised numbering. The p-Block
  // Elements left the rationalised book but stays on the NEET syllabus (old XI 11 and XII 7).
  "neet-chemistry": {
    "some-basic-concepts": { cls: 11, chapterNo: 1, book: "XI 1 Some Basic Concepts of Chemistry" },
    "structure-of-atom": { cls: 11, chapterNo: 2, book: "XI 2 Structure of Atom" },
    "classification-of-elements": { cls: 11, chapterNo: 3, book: "XI 3 Classification of Elements and Periodicity in Properties" },
    "chemical-bonding": { cls: 11, chapterNo: 4, book: "XI 4 Chemical Bonding and Molecular Structure" },
    thermodynamics: { cls: 11, chapterNo: 5, book: "XI 5 Thermodynamics" },
    equilibrium: { cls: 11, chapterNo: 6, book: "XI 6 Equilibrium" },
    "redox-reactions": { cls: 11, chapterNo: 7, book: "XI 7 Redox Reactions" },
    "organic-basic-principles": { cls: 11, chapterNo: 8, book: "XI 8 Organic Chemistry: Some Basic Principles and Techniques" },
    hydrocarbons: { cls: 11, chapterNo: 9, book: "XI 9 Hydrocarbons" },
    solutions: { cls: 12, chapterNo: 1, book: "XII 1 Solutions" },
    electrochemistry: { cls: 12, chapterNo: 2, book: "XII 2 Electrochemistry" },
    "chemical-kinetics": { cls: 12, chapterNo: 3, book: "XII 3 Chemical Kinetics" },
    "p-block-elements": { cls: 12, chapterNo: 4, within: 1, book: "Old XII 7 The p-Block Elements (groups 13 to 18), placed before the d- and f-block as in the pre-2023 book" },
    "d-and-f-block-elements": { cls: 12, chapterNo: 4, within: 2, book: "XII 4 The d- and f-Block Elements" },
    "coordination-compounds": { cls: 12, chapterNo: 5, book: "XII 5 Coordination Compounds" },
    "haloalkanes-and-haloarenes": { cls: 12, chapterNo: 6, book: "XII 6 Haloalkanes and Haloarenes" },
    "alcohols-phenols-and-ethers": { cls: 12, chapterNo: 7, book: "XII 7 Alcohols, Phenols and Ethers" },
    "aldehydes-ketones-and-carboxylic-acids": { cls: 12, chapterNo: 8, book: "XII 8 Aldehydes, Ketones and Carboxylic Acids" },
    amines: { cls: 12, chapterNo: 9, book: "XII 9 Amines" },
    biomolecules: { cls: 12, chapterNo: 10, book: "XII 10 Biomolecules" },
  },
  "mht-cet-physics": {
    "units-and-measurement": { cls: 11, chapterNo: 1, book: "XI 1 Units and Measurements" },
    "motion-in-a-plane": { cls: 11, chapterNo: 3, book: "XI 3 Motion in a Plane" },
    "laws-of-motion": { cls: 11, chapterNo: 4, book: "XI 4 Laws of Motion" },
    gravitation: { cls: 11, chapterNo: 5, book: "XI 5 Gravitation" },
    "mechanical-properties-of-solids": { cls: 11, chapterNo: 6, book: "XI 6 Mechanical Properties of Solids" },
    "thermal-properties-of-matter": { cls: 11, chapterNo: 7, book: "XI 7 Thermal Properties of Matter" },
    sound: { cls: 11, chapterNo: 8, book: "XI 8 Sound" },
    "ray-optics": { cls: 11, chapterNo: 9, book: "XI 9 Optics" },
    "rotational-dynamics": { cls: 12, chapterNo: 1, book: "XII 1 Rotational Dynamics" },
    "mechanical-properties-of-fluids": { cls: 12, chapterNo: 2, book: "XII 2 Mechanical Properties of Fluids" },
    "kinetic-theory-of-gases": { cls: 12, chapterNo: 3, book: "XII 3 Kinetic Theory of Gases and Radiation" },
    thermodynamics: { cls: 12, chapterNo: 4, book: "XII 4 Thermodynamics" },
    oscillations: { cls: 12, chapterNo: 5, book: "XII 5 Oscillations" },
    "superposition-of-waves": { cls: 12, chapterNo: 6, book: "XII 6 Superposition of Waves" },
    "wave-optics": { cls: 12, chapterNo: 7, book: "XII 7 Wave Optics" },
    electrostatics: { cls: 12, chapterNo: 8, book: "XII 8 Electrostatics" },
    "current-electricity": { cls: 12, chapterNo: 9, book: "XII 9 Current Electricity" },
    "magnetic-fields-due-to-electric-current": { cls: 12, chapterNo: 10, book: "XII 10 Magnetic Fields due to Electric Current" },
    "magnetic-materials": { cls: 12, chapterNo: 11, book: "XII 11 Magnetic Materials" },
    "electromagnetic-induction": { cls: 12, chapterNo: 12, book: "XII 12 Electromagnetic Induction" },
    "ac-circuits": { cls: 12, chapterNo: 13, book: "XII 13 AC Circuits" },
    "dual-nature-of-radiation-and-matter": { cls: 12, chapterNo: 14, book: "XII 14 Dual Nature of Radiation and Matter" },
    "structure-of-atoms-and-nuclei": { cls: 12, chapterNo: 15, book: "XII 15 Structure of Atoms and Nuclei" },
    "semiconductor-devices": { cls: 12, chapterNo: 16, book: "XII 16 Semiconductor Devices" },
  },
  // Maharashtra HSC Class 12 Physics (board notes, 2026-11-23): the Balbharati Std XII book,
  // the same chapter numbers as the XII half of mht-cet-physics above. Add each chapter as it ships.
  "mh-hsc-12-physics": {
    "rotational-dynamics": { cls: 12, chapterNo: 1, book: "XII 1 Rotational Dynamics" },
    "mechanical-properties-of-fluids": { cls: 12, chapterNo: 2, book: "XII 2 Mechanical Properties of Fluids" },
    "kinetic-theory-of-gases": { cls: 12, chapterNo: 3, book: "XII 3 Kinetic Theory of Gases and Radiation" },
    thermodynamics: { cls: 12, chapterNo: 4, book: "XII 4 Thermodynamics" },
    oscillations: { cls: 12, chapterNo: 5, book: "XII 5 Oscillations" },
    "superposition-of-waves": { cls: 12, chapterNo: 6, book: "XII 6 Superposition of Waves" },
    "wave-optics": { cls: 12, chapterNo: 7, book: "XII 7 Wave Optics" },
    electrostatics: { cls: 12, chapterNo: 8, book: "XII 8 Electrostatics" },
    "current-electricity": { cls: 12, chapterNo: 9, book: "XII 9 Current Electricity" },
    "magnetic-fields-due-to-electric-current": { cls: 12, chapterNo: 10, book: "XII 10 Magnetic Fields due to Electric Current" },
    "magnetic-materials": { cls: 12, chapterNo: 11, book: "XII 11 Magnetic Materials" },
    "electromagnetic-induction": { cls: 12, chapterNo: 12, book: "XII 12 Electromagnetic Induction" },
    "ac-circuits": { cls: 12, chapterNo: 13, book: "XII 13 AC Circuits" },
  },
  // JEE Mains Chemistry follows the rationalised NCERT books (the "NCERT" spine in
  // syllabus_concepts). Judgment calls: The p-Block Elements is no longer in either
  // rationalised book but stays on the JEE syllabus, so it sits before The d- and f-Block
  // Elements at XII 4, the inorganic chapter that follows it in the old book (XII 7).
  "jee-mains-chemistry": {
    "some-basic-concepts": { cls: 11, chapterNo: 1, book: "NCERT XI 1 Some Basic Concepts of Chemistry" },
    "structure-of-atom": { cls: 11, chapterNo: 2, book: "NCERT XI 2 Structure of Atom" },
    thermodynamics: { cls: 11, chapterNo: 5, book: "NCERT XI 5 Thermodynamics" },
    equilibrium: { cls: 11, chapterNo: 6, book: "NCERT XI 6 Equilibrium" },
    solutions: { cls: 12, chapterNo: 1, book: "NCERT XII 1 Solutions" },
    electrochemistry: { cls: 12, chapterNo: 2, book: "NCERT XII 2 Electrochemistry" },
    "chemical-kinetics": { cls: 12, chapterNo: 3, book: "NCERT XII 3 Chemical Kinetics" },
    "chemical-bonding": { cls: 11, chapterNo: 4, book: "NCERT XI 4 Chemical Bonding and Molecular Structure" },
    periodicity: { cls: 11, chapterNo: 3, book: "NCERT XI 3 Classification of Elements and Periodicity in Properties" },
    "coordination-compounds": { cls: 12, chapterNo: 5, book: "NCERT XII 5 Coordination Compounds" },
    "organic-reaction-mechanisms": { cls: 11, chapterNo: 8, within: 1, book: "NCERT XI 8 (reaction mechanisms, if kept as its own chapter)" },
    "p-block-elements": { cls: 12, chapterNo: 4, book: "old NCERT XII 7 The p-Block Elements (not in the rationalised book)" },
    "d-and-f-block-elements": { cls: 12, chapterNo: 4, within: 1, book: "NCERT XII 4 The d- and f-Block Elements" },
    "haloalkanes-and-haloarenes": { cls: 12, chapterNo: 6, book: "NCERT XII 6 Haloalkanes and Haloarenes" },
    hydrocarbons: { cls: 11, chapterNo: 9, book: "NCERT XI 9 Hydrocarbons" },
    "alcohols-phenols-and-ethers": { cls: 12, chapterNo: 7, book: "NCERT XII 7 Alcohols, Phenols and Ethers" },
    "organic-basic-principles": { cls: 11, chapterNo: 8, book: "NCERT XI 8 Organic Chemistry - Some Basic Principles and Techniques" },
    "aldehydes-ketones-and-carboxylic-acids": { cls: 12, chapterNo: 8, book: "NCERT XII 8 Aldehydes, Ketones and Carboxylic Acids" },
    biomolecules: { cls: 12, chapterNo: 10, book: "NCERT XII 10 Biomolecules" },
    amines: { cls: 12, chapterNo: 9, book: "NCERT XII 9 Amines" },
  },
  "jee-mains-physics": {
    "units-and-measurements": { cls: 11, chapterNo: 1, book: "NCERT XI 1 Units and Measurement" },
    "motion-in-a-straight-line": { cls: 11, chapterNo: 2, book: "NCERT XI 2 Motion in a Straight Line" },
    "laws-of-motion": { cls: 11, chapterNo: 4, book: "NCERT XI 4 Laws of Motion" },
    "work-energy-and-power": { cls: 11, chapterNo: 5, book: "NCERT XI 5 Work, Energy and Power" },
    "rotational-motion": { cls: 11, chapterNo: 6, book: "NCERT XI 6 System of Particles and Rotational Motion" },
    gravitation: { cls: 11, chapterNo: 7, book: "NCERT XI 7 Gravitation" },
    "mechanical-properties-of-fluids": { cls: 11, chapterNo: 9, book: "NCERT XI 9 Mechanical Properties of Fluids" },
    oscillations: { cls: 11, chapterNo: 13, book: "NCERT XI 13 Oscillations" },
    "motion-in-a-plane": { cls: 11, chapterNo: 3, book: "NCERT XI 3 Motion in a Plane" },
    "mechanical-properties-of-solids": { cls: 11, chapterNo: 8, book: "NCERT XI 8 Mechanical Properties of Solids" },
    "thermal-properties-of-matter": { cls: 11, chapterNo: 10, book: "NCERT XI 10 Thermal Properties of Matter" },
    "kinetic-theory": { cls: 11, chapterNo: 12, book: "NCERT XI 12 Kinetic Theory" },
    waves: { cls: 11, chapterNo: 14, book: "NCERT XI 14 Waves" },
    "magnetism-and-matter": { cls: 12, chapterNo: 5, book: "NCERT XII 5 Magnetism and Matter" },
    "electromagnetic-induction": { cls: 12, chapterNo: 6, book: "NCERT XII 6 Electromagnetic Induction" },
    "alternating-current": { cls: 12, chapterNo: 7, book: "NCERT XII 7 Alternating Current" },
    thermodynamics: { cls: 11, chapterNo: 11, book: "NCERT XI 11 Thermodynamics" },
    "electromagnetic-waves": { cls: 12, chapterNo: 8, book: "NCERT XII 8 Electromagnetic Waves" },
    "wave-optics": { cls: 12, chapterNo: 10, book: "NCERT XII 10 Wave Optics" },
    "dual-nature": { cls: 12, chapterNo: 11, book: "NCERT XII 11 Dual Nature of Radiation and Matter" },
    atoms: { cls: 12, chapterNo: 12, book: "NCERT XII 12 Atoms" },
    nuclei: { cls: 12, chapterNo: 13, book: "NCERT XII 13 Nuclei" },
    "semiconductor-electronics": { cls: 12, chapterNo: 14, book: "NCERT XII 14 Semiconductor Electronics" },
    "communication-systems": { cls: 12, chapterNo: 15, book: "NCERT XII 15 Communication Systems (pre-2023 syllabus)" },
    electrostatics: { cls: 12, chapterNo: 1, book: "NCERT XII 1-2 Electric Charges and Fields; Electrostatic Potential and Capacitance" },
    "current-electricity": { cls: 12, chapterNo: 3, book: "NCERT XII 3 Current Electricity" },
    "moving-charges-and-magnetism": { cls: 12, chapterNo: 4, book: "NCERT XII 4 Moving Charges and Magnetism" },
    "ray-optics": { cls: 12, chapterNo: 9, book: "NCERT XII 9 Ray Optics and Optical Instruments" },
  },
};

/** Sort key: class, then chapter, then order inside a shared book chapter. */
export function bookSortKey(p: BookPosition): number {
  return p.cls * 100_000 + p.chapterNo * 100 + (p.within ?? 0);
}

/**
 * A subject's chapters in book order when the subject has one; otherwise
 * unchanged. Stable: a chapter with no position keeps its place after the
 * placed ones (the test forbids that for CET).
 */
export function inBookOrder<T extends { subjectRoute: string; chapterSlug: string }>(chapters: T[]): T[] {
  const bySubject = BOOK_POSITION[chapters[0]?.subjectRoute ?? ""];
  if (!bySubject) return chapters;
  const key = (c: T) => {
    const p = bySubject[c.chapterSlug];
    return p ? bookSortKey(p) : Number.MAX_SAFE_INTEGER;
  };
  return chapters
    .map((c, i) => ({ c, i }))
    .sort((a, b) => key(a.c) - key(b.c) || a.i - b.i)
    .map((x) => x.c);
}
