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
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireWorksheet(id: string | undefined): Worksheet {
  if (!id || !WORKSHEETS[id]) {
    throw new Error(`unknown worksheet "${id}". Known: ${Object.keys(WORKSHEETS).join(", ")}`);
  }
  return WORKSHEETS[id];
}
