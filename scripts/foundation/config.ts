// Config for the FOUNDATION COURSE worksheet-ingestion pipeline.
//
// Source: the LWS "NDA Foundation" course worksheets (Class 9/10 NCERT Science)
// under SOURCE_ROOT — born-digital PDFs/DOCX whose text layer is LOSSY (collapsed
// subscripts in chem formulas, garbled spacing, figures-as-images), so
// transcription is VISION-driven (render → a human/Claude reads the images),
// mirroring scripts/practice/. These worksheets carry NO printed answer key, so
// every answer is DERIVED and supplied via data/<slug>.overrides.json (the
// scripts/practice atmosphere/clean-text precedent).
//
// Committed as question_kind='practice', visibility='PRIVATE' (post-commit
// UPDATE) — a Foundation Course has no PYQ corpus; the worksheets ARE its bank.
// Pure record/answer-merge helpers are REUSED from scripts/practice/lib.ts
// (exam-agnostic — they take subjectName + subtopics).
import { join } from "node:path";

// LWS Pune org + admin (same identities as the practice / JEE pipelines).
export { ORG_ID, CREATED_BY } from "../practice/config";
// Foundation Course exam (seeded 2026-06-19); Chemistry subject already exists.
export const EXAM_ID = "22d88324-5624-486e-aaa1-52ccaf4e1281";

export const SOURCE_ROOT = "C:\\tmp\\Practice\\Foundation";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: vision transcription + derived answers

export type Worksheet = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // DB chapter (auto-created on commit)
  subjectName: string; // DB subject (must exist — "Chemistry")
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the worksheet PDF (render + page count)
  docxSource?: string; // if the worksheet is docx-only: source .docx → converted to `pdf` by docx-to-pdf.ts (Word COM)
  pages?: number[]; // 0-based page indices to render; omit → all pages
  note: string; // questions.pyq_note
  // Canonical subtopics for this chapter — transcription maps each question to one.
  subtopics: string[];
};

const chem = (p: string) => join(SOURCE_ROOT, "Chemistry", p);
const phys = (p: string) => join(SOURCE_ROOT, "Physics", p);
// docx-only worksheets are converted to PDF here by docx-to-pdf.ts (Word COM).
const converted = (name: string) => join(SOURCE_ROOT, "_converted", name);

export const WORKSHEETS: Record<string, Worksheet> = {
  // ── Validation chapter — Metals and Non-metals WS 1 (5 pp, 2-column, ~2
  // figure-images, otherwise all-text MCQ). The first end-to-end run. ──
  "metals-ns-1": {
    id: "metals-ns-1",
    chapterName: "Metals and Non-metals",
    subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Metals_and_Non_metals_WS1.pdf",
    pdf: chem("07. Metals and Non-metals/Metals and Non-metals WS 1.pdf"),
    note: "NDA Foundation (Class 10) — Metals and Non-metals WS 1 (LWS)",
    subtopics: [
      "Physical Properties of Metals and Non-metals",
      "Chemical Properties and Reactivity Series",
      "Extraction, Metallurgy and Occurrence",
      "Ionic and Covalent Bonding",
      "Corrosion, Alloys and Uses",
    ],
  },

  // ── Batch 2 — text-transcribable WS1 PDFs (figure-dependent Qs excluded for
  // the later figure pass, like Metals' Q41). ──
  "matter-1": {
    id: "matter-1",
    chapterName: "Matter in Our Surroundings",
    subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Matter_in_Our_Surroundings_WS1.pdf",
    pdf: chem("01. Matter in our surrounding/Matter in Our Surrounding WS 1.pdf"),
    note: "NDA Foundation (Class 9) — Matter in Our Surroundings WS 1 (LWS)",
    subtopics: [
      "States of Matter and Their Properties",
      "Interconversion of States — Melting, Boiling, Sublimation",
      "Effect of Temperature and Pressure",
      "Evaporation, Diffusion and Kinetic Theory",
      "Physical and Chemical Changes",
    ],
  },
  "chemical-reactions-1": {
    id: "chemical-reactions-1",
    chapterName: "Chemical Reactions and Equations",
    subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Chemical_Reactions_and_Equations_WS1.pdf",
    pdf: chem("05. Chemical Reactions and Equations/Chemical Reactions and Equations WS 1.pdf"),
    note: "NDA Foundation (Class 10) — Chemical Reactions and Equations WS 1 (LWS)",
    subtopics: [
      "Writing and Balancing Chemical Equations",
      "Types of Reactions — Combination, Decomposition, Displacement",
      "Oxidation, Reduction and Redox",
      "Corrosion and Rancidity",
    ],
  },
  "acids-bases-salts-1": {
    id: "acids-bases-salts-1",
    chapterName: "Acids, Bases and Salts",
    subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Acids_Bases_and_Salts_WS1.pdf",
    pdf: chem("06. Acids, Bases and Salts/Acids Bases and Salts WS 1.pdf"),
    note: "NDA Foundation (Class 10) — Acids, Bases and Salts WS 1 (LWS)",
    subtopics: [
      "Acids, Bases and Their Properties",
      "Indicators and the pH Scale",
      "Neutralization and Reactions of Acids and Bases",
      "Salts — Preparation, Properties and Uses",
    ],
  },

  // ── Batch 3 — remaining WS1 PDFs (figure-heavy; figure-attach pipeline handles them). ──
  "is-matter-pure-1": {
    id: "is-matter-pure-1",
    chapterName: "Is Matter Around Us Pure",
    subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Is_Matter_Around_Us_Pure_WS1.pdf",
    pdf: chem("02. Is Matter around us Pure/Is Matter around Us Pure WS.pdf"),
    note: "NDA Foundation (Class 9) — Is Matter Around Us Pure WS (LWS)",
    subtopics: [
      "Mixtures, Solutions and Concentration",
      "Suspensions and Colloids",
      "Separation Techniques",
      "Elements, Compounds and Mixtures",
      "Physical and Chemical Changes",
    ],
  },
  "atoms-molecules-1": {
    id: "atoms-molecules-1",
    chapterName: "Atoms and Molecules",
    subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Atoms_and_Molecules_WS1.pdf",
    pdf: chem("03. Atoms and Molecules/Atoms and Molecules WS.pdf"),
    note: "NDA Foundation (Class 9) — Atoms and Molecules WS (LWS)",
    subtopics: [
      "Laws of Chemical Combination",
      "Atoms, Molecules and Ions",
      "Chemical Formulae and Valency",
      "Mole Concept and Molar Mass",
    ],
  },
  "structure-atom-1": {
    id: "structure-atom-1",
    chapterName: "Structure of the Atom",
    subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Structure_of_the_Atom_WS1.pdf",
    pdf: chem("04. Strucuture of Atom/Structure of the Atoms WS 1.pdf"),
    note: "NDA Foundation (Class 9) — Structure of the Atom WS 1 (LWS)",
    subtopics: [
      "Subatomic Particles — Electron, Proton, Neutron",
      "Atomic Models — Thomson, Rutherford, Bohr",
      "Atomic Number, Mass Number and Electronic Configuration",
      "Isotopes, Isobars and Isotones",
      "Valency",
    ],
  },

  // ── Batch 4 — Carbon and Its Compounds (docx-only → converted to PDF via
  // docx-to-pdf.ts before render). ──
  "carbon-1": {
    id: "carbon-1",
    chapterName: "Carbon and Its Compounds",
    subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Carbon_and_Its_Compounds_WS1.pdf",
    docxSource: chem("08. Carbon and Its Compounds/Carbon and its Compounds WS 1.docx"),
    pdf: converted("carbon-1.pdf"),
    note: "NDA Foundation (Class 10) — Carbon and Its Compounds WS 1 (LWS)",
    subtopics: [
      "Covalent Bonding and Allotropes of Carbon",
      "Hydrocarbons — Saturated, Unsaturated and Isomers",
      "Functional Groups and Homologous Series",
      "Nomenclature of Carbon Compounds",
      "Chemical Properties, Ethanol, Ethanoic Acid and Soaps",
    ],
  },

  // ── Batch 5 — WS2/WS3 supplementary worksheets (all docx → converted to PDF
  // via docx-to-pdf.ts). Same chapters/subtopics as their WS1; more practice. ──
  "metals-2": {
    id: "metals-2", chapterName: "Metals and Non-metals", subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Metals_and_Non_metals_WS2.pdf",
    docxSource: chem("07. Metals and Non-metals/Metals and Non-metals WS 2.docx"), pdf: converted("metals-2.pdf"),
    note: "NDA Foundation (Class 10) — Metals and Non-metals WS 2 (LWS)",
    subtopics: ["Physical Properties of Metals and Non-metals","Chemical Properties and Reactivity Series","Extraction, Metallurgy and Occurrence","Ionic and Covalent Bonding","Corrosion, Alloys and Uses"],
  },
  "matter-2": {
    id: "matter-2", chapterName: "Matter in Our Surroundings", subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Matter_in_Our_Surroundings_WS2.pdf",
    docxSource: chem("01. Matter in our surrounding/Matter in Our Surrounding WS 2.docx"), pdf: converted("matter-2.pdf"),
    note: "NDA Foundation (Class 9) — Matter in Our Surroundings WS 2 (LWS)",
    subtopics: ["States of Matter and Their Properties","Interconversion of States — Melting, Boiling, Sublimation","Effect of Temperature and Pressure","Evaporation, Diffusion and Kinetic Theory","Physical and Chemical Changes"],
  },
  "structure-atom-2": {
    id: "structure-atom-2", chapterName: "Structure of the Atom", subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Structure_of_the_Atom_WS2.pdf",
    docxSource: chem("04. Strucuture of Atom/Structure of the Atoms WS 2.docx"), pdf: converted("structure-atom-2.pdf"),
    note: "NDA Foundation (Class 9) — Structure of the Atom WS 2 (LWS)",
    subtopics: ["Subatomic Particles — Electron, Proton, Neutron","Atomic Models — Thomson, Rutherford, Bohr","Atomic Number, Mass Number and Electronic Configuration","Isotopes, Isobars and Isotones","Valency"],
  },
  "carbon-2": {
    id: "carbon-2", chapterName: "Carbon and Its Compounds", subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Carbon_and_Its_Compounds_WS2.pdf",
    docxSource: chem("08. Carbon and Its Compounds/Carbon and its Compounds WS 2.docx"), pdf: converted("carbon-2.pdf"),
    note: "NDA Foundation (Class 10) — Carbon and Its Compounds WS 2 (LWS)",
    subtopics: ["Covalent Bonding and Allotropes of Carbon","Hydrocarbons — Saturated, Unsaturated and Isomers","Functional Groups and Homologous Series","Nomenclature of Carbon Compounds","Chemical Properties, Ethanol, Ethanoic Acid and Soaps"],
  },
  "chemical-reactions-2": {
    id: "chemical-reactions-2", chapterName: "Chemical Reactions and Equations", subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Chemical_Reactions_and_Equations_WS2.pdf",
    docxSource: chem("05. Chemical Reactions and Equations/Chemical Reactions and Equations WS 2.docx"), pdf: converted("chemical-reactions-2.pdf"),
    note: "NDA Foundation (Class 10) — Chemical Reactions and Equations WS 2 (LWS)",
    subtopics: ["Writing and Balancing Chemical Equations","Types of Reactions — Combination, Decomposition, Displacement","Oxidation, Reduction and Redox","Corrosion and Rancidity"],
  },
  "chemical-reactions-3": {
    id: "chemical-reactions-3", chapterName: "Chemical Reactions and Equations", subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Chemical_Reactions_and_Equations_WS3.pdf",
    docxSource: chem("05. Chemical Reactions and Equations/Chemical Reactions and Equations WS 3.docx"), pdf: converted("chemical-reactions-3.pdf"),
    note: "NDA Foundation (Class 10) — Chemical Reactions and Equations WS 3 (LWS)",
    subtopics: ["Writing and Balancing Chemical Equations","Types of Reactions — Combination, Decomposition, Displacement","Oxidation, Reduction and Redox","Corrosion and Rancidity"],
  },
  "acids-bases-salts-2": {
    id: "acids-bases-salts-2", chapterName: "Acids, Bases and Salts", subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Acids_Bases_and_Salts_WS2.pdf",
    docxSource: chem("06. Acids, Bases and Salts/Acids Bases and Salts WS 2.docx"), pdf: converted("acids-bases-salts-2.pdf"),
    note: "NDA Foundation (Class 10) — Acids, Bases and Salts WS 2 (LWS)",
    subtopics: ["Acids, Bases and Their Properties","Indicators and the pH Scale","Neutralization and Reactions of Acids and Bases","Salts — Preparation, Properties and Uses"],
  },
  "acids-bases-salts-3": {
    id: "acids-bases-salts-3", chapterName: "Acids, Bases and Salts", subjectName: "Chemistry",
    sourceFile: "Foundation_Chemistry__Acids_Bases_and_Salts_WS3.pdf",
    docxSource: chem("06. Acids, Bases and Salts/Acids Bases and Salts WS 3.docx"), pdf: converted("acids-bases-salts-3.pdf"),
    note: "NDA Foundation (Class 10) — Acids, Bases and Salts WS 3 (LWS)",
    subtopics: ["Acids, Bases and Their Properties","Indicators and the pH Scale","Neutralization and Reactions of Acids and Bases","Salts — Preparation, Properties and Uses"],
  },

  // ══════════════════ PHYSICS (subject seeded 2026-06-21; id bf9528d4-…) ══════════════════
  // Same pipeline as Chemistry: 2-column MCQ worksheets, NO printed key (answers
  // DERIVED via overrides), figure-dependent Qs excluded from the text pass then
  // figure-attached. Syllabus ch.10 "Sources of Energy" has no worksheet → not ingestible.

  // ── Validation chapter — Motion WS1 (text-heavy kinematics, low figure load). ──
  "motion-1": {
    id: "motion-1", chapterName: "Motion", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Motion_WS1.pdf",
    pdf: phys("01. Motion/Motion WS 1.pdf"),
    note: "NDA Foundation (Class 9) — Motion WS 1 (LWS)",
    subtopics: [
      "Distance, Displacement, Speed and Velocity",
      "Acceleration and Types of Motion",
      "Equations of Motion",
      "Graphical Representation of Motion",
      "Uniform Circular Motion",
    ],
  },

  // ── Force and Laws of Motion — WS1 (pdf) + WS2 (pdf). ──
  "forces-1": {
    id: "forces-1", chapterName: "Force and Laws of Motion", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Force_and_Laws_of_Motion_WS1.pdf",
    pdf: phys("02. Force and Laws of Motion/Forces and Laws of Motion WS 1.pdf"),
    note: "NDA Foundation (Class 9) — Force and Laws of Motion WS 1 (LWS)",
    subtopics: [
      "Force, Balanced and Unbalanced Forces",
      "Inertia and Newton's First Law",
      "Newton's Second Law and Momentum",
      "Newton's Third Law and Conservation of Momentum",
    ],
  },
  "forces-2": {
    id: "forces-2", chapterName: "Force and Laws of Motion", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Force_and_Laws_of_Motion_WS2.pdf",
    pdf: phys("02. Force and Laws of Motion/Forces and Laws of Motion WS 2.pdf"),
    note: "NDA Foundation (Class 9) — Force and Laws of Motion WS 2 (LWS)",
    subtopics: [
      "Force, Balanced and Unbalanced Forces",
      "Inertia and Newton's First Law",
      "Newton's Second Law and Momentum",
      "Newton's Third Law and Conservation of Momentum",
    ],
  },

  // ── Gravitation — WS1 (pdf) + WS2 (pdf). ──
  "gravitation-1": {
    id: "gravitation-1", chapterName: "Gravitation", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Gravitation_WS1.pdf",
    pdf: phys("03. Gravitation/Gravitation WS 1.pdf"),
    note: "NDA Foundation (Class 9) — Gravitation WS 1 (LWS)",
    subtopics: [
      "Universal Law of Gravitation",
      "Free Fall, Mass and Weight",
      "Thrust and Pressure",
      "Buoyancy, Archimedes' Principle and Relative Density",
    ],
  },
  "gravitation-2": {
    id: "gravitation-2", chapterName: "Gravitation", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Gravitation_WS2.pdf",
    pdf: phys("03. Gravitation/Gravitation WS 2.pdf"),
    note: "NDA Foundation (Class 9) — Gravitation WS 2 (LWS)",
    subtopics: [
      "Universal Law of Gravitation",
      "Free Fall, Mass and Weight",
      "Thrust and Pressure",
      "Buoyancy, Archimedes' Principle and Relative Density",
    ],
  },

  // ── Work and Energy — WS1 (pdf) + WS2 (pdf). ──
  "work-energy-1": {
    id: "work-energy-1", chapterName: "Work and Energy", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Work_and_Energy_WS1.pdf",
    pdf: phys("04. Work and Energy/Work and Energy WS 1.pdf"),
    note: "NDA Foundation (Class 9) — Work and Energy WS 1 (LWS)",
    subtopics: [
      "Work and Its Measurement",
      "Kinetic and Potential Energy",
      "Conservation of Energy",
      "Power",
    ],
  },
  "work-energy-2": {
    id: "work-energy-2", chapterName: "Work and Energy", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Work_and_Energy_WS2.pdf",
    pdf: phys("04. Work and Energy/Work and Energy WS 2.pdf"),
    note: "NDA Foundation (Class 9) — Work and Energy WS 2 (LWS)",
    subtopics: [
      "Work and Its Measurement",
      "Kinetic and Potential Energy",
      "Conservation of Energy",
      "Power",
    ],
  },

  // ── Sound — WS1 (pdf) + WS2 (docx → converted). ──
  "sound-1": {
    id: "sound-1", chapterName: "Sound", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Sound_WS1.pdf",
    pdf: phys("05. Sound/Sound WS 1.pdf"),
    note: "NDA Foundation (Class 9) — Sound WS 1 (LWS)",
    subtopics: [
      "Production and Propagation of Sound",
      "Characteristics of Sound Waves",
      "Reflection of Sound — Echo, Reverberation and SONAR",
      "Structure and Working of the Human Ear",
    ],
  },
  "sound-2": {
    id: "sound-2", chapterName: "Sound", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Sound_WS2.pdf",
    docxSource: phys("05. Sound/Sound WS 2.docx"), pdf: converted("sound-2.pdf"),
    note: "NDA Foundation (Class 9) — Sound WS 2 (LWS)",
    subtopics: [
      "Production and Propagation of Sound",
      "Characteristics of Sound Waves",
      "Reflection of Sound — Echo, Reverberation and SONAR",
      "Structure and Working of the Human Ear",
    ],
  },

  // ── Light - Reflection and Refraction — WS1 (pdf) + WS2/WS3 (docx → converted). ──
  "light-1": {
    id: "light-1", chapterName: "Light - Reflection and Refraction", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Light_Reflection_and_Refraction_WS1.pdf",
    pdf: phys("06. Light/Light Reflection and Refraction WS 1.pdf"),
    note: "NDA Foundation (Class 10) — Light - Reflection and Refraction WS 1 (LWS)",
    subtopics: [
      "Reflection and Spherical Mirrors",
      "Mirror Formula and Magnification",
      "Refraction and Refractive Index",
      "Lenses, Lens Formula and Power",
    ],
  },
  "light-2": {
    id: "light-2", chapterName: "Light - Reflection and Refraction", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Light_Reflection_and_Refraction_WS2.pdf",
    docxSource: phys("06. Light/Light Reflection and Refraction WS 2.docx"), pdf: converted("light-2.pdf"),
    note: "NDA Foundation (Class 10) — Light - Reflection and Refraction WS 2 (LWS)",
    subtopics: [
      "Reflection and Spherical Mirrors",
      "Mirror Formula and Magnification",
      "Refraction and Refractive Index",
      "Lenses, Lens Formula and Power",
    ],
  },
  "light-3": {
    id: "light-3", chapterName: "Light - Reflection and Refraction", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Light_Reflection_and_Refraction_WS3.pdf",
    docxSource: phys("06. Light/Light Reflection and Refraction WS 3.docx"), pdf: converted("light-3.pdf"),
    note: "NDA Foundation (Class 10) — Light - Reflection and Refraction WS 3 (LWS)",
    subtopics: [
      "Reflection and Spherical Mirrors",
      "Mirror Formula and Magnification",
      "Refraction and Refractive Index",
      "Lenses, Lens Formula and Power",
    ],
  },

  // ── The Human Eye and the Colourful World — single WS (pdf). ──
  "human-eye-1": {
    id: "human-eye-1", chapterName: "The Human Eye and the Colourful World", subjectName: "Physics",
    sourceFile: "Foundation_Physics__The_Human_Eye_and_the_Colourful_World_WS1.pdf",
    pdf: phys("07. The_Human_Eye/Human Eye and Colourful World WS.pdf"),
    note: "NDA Foundation (Class 10) — The Human Eye and the Colourful World WS (LWS)",
    subtopics: [
      "The Human Eye and Power of Accommodation",
      "Defects of Vision and Their Correction",
      "Refraction through a Prism and Dispersion",
      "Atmospheric Refraction and Scattering of Light",
    ],
  },

  // ── Electricity — WS1 (pdf). ──
  "electricity-1": {
    id: "electricity-1", chapterName: "Electricity", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Electricity_WS1.pdf",
    pdf: phys("08. Electricity/Electricity WS 1.pdf"),
    note: "NDA Foundation (Class 10) — Electricity WS 1 (LWS)",
    subtopics: [
      "Electric Charge, Current and Potential Difference",
      "Ohm's Law and Resistance",
      "Combination of Resistors",
      "Electric Power and Heating Effect of Current",
    ],
  },

  // ── Magnetic Effects of Electric Current — WS1 (pdf) + WS2 (docx → converted). ──
  "magnetic-1": {
    id: "magnetic-1", chapterName: "Magnetic Effects of Electric Current", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Magnetic_Effects_of_Electric_Current_WS1.pdf",
    pdf: phys("09. Magnetic_Effects_of_Electric_Current/Magnetic Effects of Electric Current WS 1.pdf"),
    note: "NDA Foundation (Class 10) — Magnetic Effects of Electric Current WS 1 (LWS)",
    subtopics: [
      "Magnets, Magnetic Field and Field Lines",
      "Magnetic Effect of Current — Conductor, Loop and Solenoid",
      "Force on a Current-Carrying Conductor and Electric Motor",
      "Electromagnetic Induction and Generator",
    ],
  },
  "magnetic-2": {
    id: "magnetic-2", chapterName: "Magnetic Effects of Electric Current", subjectName: "Physics",
    sourceFile: "Foundation_Physics__Magnetic_Effects_of_Electric_Current_WS2.pdf",
    docxSource: phys("09. Magnetic_Effects_of_Electric_Current/Magnetic Effects of Electric Current WS 2.docx"), pdf: converted("magnetic-2.pdf"),
    note: "NDA Foundation (Class 10) — Magnetic Effects of Electric Current WS 2 (LWS)",
    subtopics: [
      "Magnets, Magnetic Field and Field Lines",
      "Magnetic Effect of Current — Conductor, Loop and Solenoid",
      "Force on a Current-Carrying Conductor and Electric Motor",
      "Electromagnetic Induction and Generator",
    ],
  },
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireWorksheet(id: string | undefined): Worksheet {
  if (!id || !WORKSHEETS[id]) {
    throw new Error(`unknown worksheet "${id}". Known: ${Object.keys(WORKSHEETS).join(", ")}`);
  }
  return WORKSHEETS[id];
}
