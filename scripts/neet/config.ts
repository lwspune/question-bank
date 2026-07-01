// Shared config for the NEET (UG) PYQ ingestion pipeline.
//
// Source: scanned "Answers & Solutions" booklets (image PDFs, no text layer) under
// SOURCE_ROOT. UNLIKE CDS, these carry OFFICIAL answers + full worked solutions, so
// answers are transcribed VERBATIM (options numbered (1)-(4) in the booklet → mapped
// positionally to A-D in the bank) — no derivation. Everything is committed PRIVATE
// pending a human spot-check before flipping PUBLIC (main risk = transcription /
// option-order error, not the keys themselves).
//
// A NEET paper is 180 MCQs / 720 marks / 3 hrs / +4,-1, laid out in four subject
// BLOCKS in booklet order: Physics (1-45) · Chemistry (46-90) · Botany (91-135) ·
// Zoology (136-180). Each question is independent (no shared passage/directions) —
// so classification is PER-QUESTION into the canonical NCERT chapter list below,
// with the subtopic auto-created. The multiple booklet CODES per exam are the SAME
// question set reshuffled (seat randomization) → we ingest ONE clean single-column
// code per exam. See README.md.
import { join } from "node:path";

// LWS Pune org + admin (same as the CDS/JEE/practice pipelines).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "01d193e7-74cf-4dd0-83b5-ef98ee221e67"; // NEET

export const SOURCE_ROOT = "C:\\tmp\\PYQPs\\NEET";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: per-subject transcription JSON

export type NeetSubject = "Physics" | "Chemistry" | "Botany" | "Zoology";
export const SUBJECT_ORDER: NeetSubject[] = ["Physics", "Chemistry", "Botany", "Zoology"];

// Allowed subjects by question number. Physics (1-45) and Chemistry (46-90) are clean
// blocks. The booklet prints the whole Q91-180 range under a single "BIOLOGY" banner
// with Botany and Zoology CONTENT-MIXED (not the official Botany-91-135 / Zoology-136-180
// split), so within 91-180 EITHER Botany or Zoology is valid — the transcriber assigns
// subject per-question by content (plant → Botany, animal/human → Zoology). Used only as
// a soft cross-check to flag an obviously mis-tagged subject.
export function allowedSubjectsForNumber(n: number): NeetSubject[] {
  if (n >= 1 && n <= 45) return ["Physics"];
  if (n >= 46 && n <= 90) return ["Chemistry"];
  if (n >= 91 && n <= 180) return ["Botany", "Zoology"];
  return [];
}

export type Paper = {
  id: string; // slug, used for data/<id>.* + source_file
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the booklet PDF (the ONE code we ingest)
  layout: "single-column" | "two-column";
  pyqYear: number;
  pyqNote: string; // e.g. "NEET (UG) 2025 — 04 May 2025 (Code 45)"
};

export const PAPERS: Record<string, Paper> = {
  "2025": {
    id: "2025",
    sourceFile: "NEET_UG_2025.pdf",
    pdf: join(SOURCE_ROOT, "neet 2025 qp code 45.pdf"),
    layout: "single-column",
    pyqYear: 2025,
    pyqNote: "NEET (UG) 2025 — 04 May 2025",
  },
  "2026": {
    id: "2026",
    sourceFile: "NEET_UG_2026.pdf",
    pdf: join(SOURCE_ROOT, "neet 2026 qp code 11.pdf"),
    layout: "single-column",
    pyqYear: 2026,
    pyqNote: "NEET (UG) 2026 — 03 May 2026",
  },
  "reneet-2026": {
    id: "reneet-2026",
    sourceFile: "RE_NEET_UG_2026.pdf",
    pdf: join(SOURCE_ROOT, "reneet 2026 qp code 50.pdf"),
    layout: "two-column",
    pyqYear: 2026,
    pyqNote: "Re-NEET (UG) 2026 — 21 Jun 2026",
  },
};

export function requirePaper(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  return PAPERS[id];
}

export const dataPath = (id: string, subject: string) => join(DATA, `${id}.${subject.toLowerCase()}.json`);

// ── Canonical NEET / NCERT (Class 11+12) chapter catalog ───────────────────────
// Transcription agents MUST classify each question into a chapter from its subject's
// list below (subtopic is free-form, auto-created). Seeding the canonical list up
// front prevents catch-all drift (the CDS/Foundation lesson). Botany vs Zoology for
// shared units (Genetics, Ecology, Evolution, Biotech, Microbes) is decided by which
// booklet SECTION the question was printed under.
export const NEET_CHAPTERS: Record<NeetSubject, string[]> = {
  Physics: [
    "Units and Measurements",
    "Motion in a Straight Line",
    "Motion in a Plane",
    "Laws of Motion",
    "Work, Energy and Power",
    "System of Particles and Rotational Motion",
    "Gravitation",
    "Mechanical Properties of Solids",
    "Mechanical Properties of Fluids",
    "Thermal Properties of Matter",
    "Thermodynamics",
    "Kinetic Theory",
    "Oscillations",
    "Waves",
    "Electric Charges and Fields",
    "Electrostatic Potential and Capacitance",
    "Current Electricity",
    "Moving Charges and Magnetism",
    "Magnetism and Matter",
    "Electromagnetic Induction",
    "Alternating Current",
    "Electromagnetic Waves",
    "Ray Optics and Optical Instruments",
    "Wave Optics",
    "Dual Nature of Radiation and Matter",
    "Atoms",
    "Nuclei",
    "Semiconductor Electronics",
  ],
  Chemistry: [
    "Some Basic Concepts of Chemistry",
    "Structure of Atom",
    "Classification of Elements and Periodicity in Properties",
    "Chemical Bonding and Molecular Structure",
    "States of Matter",
    "Thermodynamics",
    "Equilibrium",
    "Redox Reactions",
    "Hydrogen",
    "The s-Block Elements",
    "The p-Block Elements",
    "Solid State",
    "Solutions",
    "Electrochemistry",
    "Chemical Kinetics",
    "Surface Chemistry",
    "General Principles and Processes of Isolation of Elements",
    "The d- and f-Block Elements",
    "Coordination Compounds",
    "Organic Chemistry – Some Basic Principles and Techniques",
    "Hydrocarbons",
    "Haloalkanes and Haloarenes",
    "Alcohols, Phenols and Ethers",
    "Aldehydes, Ketones and Carboxylic Acids",
    "Amines",
    "Biomolecules",
    "Polymers",
    "Chemistry in Everyday Life",
    "Environmental Chemistry",
  ],
  Botany: [
    "The Living World",
    "Biological Classification",
    "Plant Kingdom",
    "Morphology of Flowering Plants",
    "Anatomy of Flowering Plants",
    "Cell: The Unit of Life",
    "Cell Cycle and Cell Division",
    "Transport in Plants",
    "Mineral Nutrition",
    "Photosynthesis in Higher Plants",
    "Respiration in Plants",
    "Plant Growth and Development",
    "Sexual Reproduction in Flowering Plants",
    "Principles of Inheritance and Variation",
    "Molecular Basis of Inheritance",
    "Microbes in Human Welfare",
    "Organisms and Populations",
    "Ecosystem",
    "Biodiversity and Conservation",
  ],
  Zoology: [
    "Animal Kingdom",
    "Structural Organisation in Animals",
    "Digestion and Absorption",
    "Breathing and Exchange of Gases",
    "Body Fluids and Circulation",
    "Excretory Products and their Elimination",
    "Locomotion and Movement",
    "Neural Control and Coordination",
    "Chemical Coordination and Integration",
    "Human Reproduction",
    "Reproductive Health",
    "Evolution",
    "Human Health and Disease",
    "Biotechnology: Principles and Processes",
    "Biotechnology and its Applications",
  ],
};
