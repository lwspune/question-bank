// Config for the MAHARASHTRA STATE BOARD Class-10 (SSC) BOARD-PYQ ingestion.
//
// UNLIKE every prior State Board pipeline (mh-hsc-12 / mh-sb-9 / cbse-12, which
// ingest TEXTBOOK exercises → question_kind='practice', practiceOnly), Class 10
// IS a board year, so the source is REAL past-year BOARD QUESTION PAPERS →
// question_kind='pyq', NOT practiceOnly. New exam mh-ssc-10 (seeded 2026-07-17).
//
// Source: scanned board QP PDFs under SOURCE_ROOT — pure RASTER scans (1 full-page
// image/page, ZERO text layer), so extraction is VISION-ONLY (like scripts/neet +
// scripts/cds), NOT the text+vision hybrid of the Class-9/12 textbook pipelines.
// The papers carry NO answer key (board QPs never do), so MCQ keys are DERIVED and
// subjective model answers are AUTHORED, every one REVIEW-flagged in the data JSON
// (the CDS-English precedent: derive → confidence-flag → publish → human spot-check).
//
// Paper shape (English medium, "Revised Course", Max 40, 2 hours):
//   Q1(A) — MCQ block (Maths 4 / Science 5) → deriveable keys → question_format='mcq'
//   Q1(B) onward — subjective (short + long answer) → question_format='subjective'
//   "Complete the activity" fill-in-the-blank worked solutions → fill the blanks
//   Internal choice ("attempt any two of four") → ingest ALL sub-questions
//     independently (the choice is a paper-delivery concern, not a bank concern).
// Figures (Geometry-heavy: triangles/circles; Science: apparatus/electron-dot) are
// vector line-art → crop-and-attach via the shared snapCrop + verify gate.
//
// A paper spans MANY chapters, so — unlike the chapter-centric textbook configs —
// each transcribed question carries its OWN chapter + subtopic (validated against
// the subject CATALOG below); commitStaged auto-creates chapters/subtopics per row.
import { join } from "node:path";

// LWS Pune org + admin (same identities as the practice / stateboard / ncert pipelines).
export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra State Board Class 10 exam (seeded 2026-07-17); 4 subjects seeded alongside:
// Algebra · Geometry · Science and Technology I · Science and Technology II.
export const EXAM_ID = "a41ef5c6-fa20-4bc1-be8b-ba4263d5afd2";

export const SOURCE_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\State-Board\\02. 10th\\PYQPs";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription (source of truth)

const src = (name: string) => join(SOURCE_ROOT, name);

// ── Subject → canonical chapter → subtopic CATALOG ───────────────────────────
// The classification target. `chapter` is HARD-validated per question (prevents
// catch-all drift — the CDS/NEET lesson). Subtopics are the canonical list the
// transcription agents pick from; an off-catalog subtopic is a SOFT flag (still
// committed + auto-created), since board PYQs blend topics more than a textbook
// exercise does — a later Phase-D pass canonicalises stragglers.
export type SubjectCatalog = { subjectName: string; chapters: Record<string, string[]> };

export const CATALOG: Record<string, SubjectCatalog> = {
  Algebra: {
    subjectName: "Algebra",
    chapters: {
      "Linear Equations in Two Variables": [
        "Methods of Solving Linear Equations",
        "Determinant Method (Cramer's Rule)",
        "Equations Reducible to Linear Form",
        "Graph of Linear Equations",
        "Word Problems and Applications",
      ],
      "Quadratic Equations": [
        "Roots of a Quadratic Equation",
        "Solving by Factorisation",
        "Solving by Formula and Completing the Square",
        "Nature of Roots (Discriminant)",
        "Relation between Roots and Coefficients",
        "Word Problems and Applications",
      ],
      "Arithmetic Progression": [
        "nth Term of an A.P.",
        "Sum of n Terms of an A.P.",
        "Word Problems and Applications",
      ],
      "Financial Planning": [
        "Goods and Services Tax (GST)",
        "Shares — Face Value, Market Value, Brokerage",
        "Mutual Funds and SIP",
      ],
      Probability: [
        "Sample Space and Events",
        "Probability of an Event",
      ],
      Statistics: [
        "Mean, Median and Mode of Grouped Data",
        "Pictorial Representation of Statistical Data",
      ],
    },
  },
  Geometry: {
    subjectName: "Geometry",
    chapters: {
      Similarity: [
        "Ratio of Areas of Two Triangles",
        "Basic Proportionality Theorem",
        "Tests of Similarity of Triangles",
        "Theorem of Areas of Similar Triangles",
      ],
      "Pythagoras Theorem": [
        "Pythagoras Theorem and its Converse",
        "Similarity in Right Angled Triangles",
        "Applications of Pythagoras Theorem",
      ],
      Circle: [
        "Tangent and Secant to a Circle",
        "Tangent Segment Theorem",
        "Inscribed Angle and Intercepted Arc",
        "Cyclic Quadrilateral",
        "Theorems on Chords and Tangents",
      ],
      "Geometric Constructions": [
        "Division of a Line Segment",
        "Construction of a Similar Triangle",
        "Construction of a Tangent to a Circle",
      ],
      "Co-ordinate Geometry": [
        "Distance Formula",
        "Section Formula",
        "Slope of a Line",
      ],
      Trigonometry: [
        "Trigonometric Ratios and Identities",
        "Heights and Distances",
      ],
      Mensuration: [
        "Surface Area and Volume of Solids",
        "Combination of Solids and Frustum",
        "Area of Sector and Segment of a Circle",
      ],
    },
  },
  "Science and Technology I": {
    subjectName: "Science and Technology I",
    chapters: {
      Gravitation: [
        "Newton's Law of Gravitation",
        "Free Fall and Acceleration due to Gravity",
        "Kepler's Laws of Planetary Motion",
        "Escape Velocity and Satellites",
      ],
      "Periodic Classification of Elements": [
        "Early Attempts and Mendeleev's Periodic Table",
        "Modern Periodic Table",
        "Periodic Trends",
      ],
      "Chemical Reactions and Equations": [
        "Balancing Chemical Equations",
        "Types of Chemical Reactions",
        "Oxidation, Reduction and Corrosion",
      ],
      "Effects of Electric Current": [
        "Magnetic Effect of Electric Current",
        "Electromagnetic Induction",
        "Electric Motor and Generator",
        "Domestic Electric Circuits and Safety",
      ],
      Heat: [
        "Specific Heat Capacity",
        "Latent Heat and Change of State",
        "Anomalous Behaviour of Water",
      ],
      "Refraction of Light": [
        "Refraction and Refractive Index",
        "Total Internal Reflection",
        "Applications of Refraction",
      ],
      Lenses: [
        "Types of Lenses and Terminology",
        "Image Formation by Lenses",
        "Lens Formula and Magnification",
        "Human Eye and Defects of Vision",
      ],
      Metallurgy: [
        "Properties of Metals and Non-Metals",
        "Reactivity Series and Ionic Compounds",
        "Extraction of Metals",
        "Corrosion and Alloys",
      ],
      "Carbon Compounds": [
        "Covalent Bonding in Carbon",
        "Hydrocarbons and Functional Groups",
        "Nomenclature and Isomerism",
        "Important Organic Compounds",
      ],
      "Space Missions": [
        "Satellites and Orbits",
        "Launch Vehicles",
        "Space Missions of India",
      ],
    },
  },
  "Science and Technology II": {
    subjectName: "Science and Technology II",
    chapters: {
      "Heredity and Evolution": [
        "Heredity and Variation",
        "Mendel's Laws of Inheritance",
        "Evolution and its Theories",
        "Speciation and Evidences of Evolution",
      ],
      "Life Processes in Living Organisms Part 1": [
        "Cell Division — Mitosis and Meiosis",
        "Nutrition in Living Organisms",
        "Cellular Respiration",
      ],
      "Life Processes in Living Organisms Part 2": [
        "Types of Reproduction",
        "Human Reproductive System",
        "Reproductive Health",
      ],
      "Environmental Management": [
        "Ecosystem and Ecological Balance",
        "Biodiversity and Conservation",
        "Environmental Conservation",
      ],
      "Towards Green Energy": [
        "Energy Sources",
        "Renewable and Non-Renewable Energy",
        "Green Energy Technologies",
      ],
      "Animal Classification": [
        "Basis of Classification",
        "Non-Chordates",
        "Chordates",
      ],
      "Introduction to Microbiology": [
        "Types of Microorganisms",
        "Useful Microorganisms",
        "Industrial and Applied Microbiology",
      ],
      "Cell Biology and Biotechnology": [
        "Cell Structure and Organelles",
        "Biotechnology and its Applications",
        "Genetic Engineering",
      ],
      "Social Health": [
        "Health and Disease",
        "Social Health and Issues",
        "Addiction and Stress Management",
      ],
      "Disaster Management": [
        "Types of Disasters",
        "Disaster Management and Mitigation",
        "First Aid",
      ],
    },
  },
};

export function requireCatalog(subjectName: string): SubjectCatalog {
  const c = CATALOG[subjectName];
  if (!c) throw new Error(`no catalog for subject "${subjectName}". Known: ${Object.keys(CATALOG).join(", ")}`);
  return c;
}

// ── Paper registry (one scanned board QP each) ───────────────────────────────
// NOTE: the two `...2026 (1).pdf` files are MISLABELED — they are the MARCH 2025
// papers (verified vs the printed cover: Algebra N 819 `2025 III 05`, Geometry
// N 832 `2025 III 07`). Never trust the filename; the printed cover is truth.
export type Paper = {
  id: string; // slug → data/<id>.*.json + source_file
  subjectName: string; // must be a CATALOG key (DB subject must exist)
  year: number; // PYQ year (from the printed cover, not the filename)
  month: string; // "March" (SSC board papers)
  paperCode?: string; // printed cover code, e.g. "N 619" (provenance; agent re-confirms)
  pdf: string; // absolute path to the scanned paper PDF
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  note: string; // questions.pyq_note
};

export const PAPERS: Record<string, Paper> = {
  // ── Algebra (Mathematics Part I) ──
  "alg-2023": {
    id: "alg-2023",
    subjectName: "Algebra",
    year: 2023,
    month: "March",
    pdf: src("10th ssc Algebra board qp 2023.pdf"),
    sourceFile: "MH_SSC_10_Algebra_2023.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Algebra (Mathematics Part I), March 2023 board paper",
  },
  "alg-2024": {
    id: "alg-2024",
    subjectName: "Algebra",
    year: 2024,
    month: "March",
    paperCode: "N 619",
    pdf: src("10th ssc Algebra board qp 2024.pdf"),
    sourceFile: "MH_SSC_10_Algebra_2024.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Algebra (Mathematics Part I), March 2024 board paper",
  },
  "alg-2025": {
    id: "alg-2025",
    subjectName: "Algebra",
    year: 2025,
    month: "March",
    paperCode: "N 819",
    pdf: src("10th ssc Algebra board qp 2026 (1).pdf"), // MISLABELED: actually March 2025
    sourceFile: "MH_SSC_10_Algebra_2025.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Algebra (Mathematics Part I), March 2025 board paper",
  },
  "alg-2026": {
    id: "alg-2026",
    subjectName: "Algebra",
    year: 2026,
    month: "March",
    paperCode: "N 919",
    pdf: src("10th ssc Algebra board qp 2026.pdf"),
    sourceFile: "MH_SSC_10_Algebra_2026.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Algebra (Mathematics Part I), March 2026 board paper",
  },
  // ── Geometry (Mathematics Part II) ──
  "geo-2023": {
    id: "geo-2023",
    subjectName: "Geometry",
    year: 2023,
    month: "March",
    pdf: src("10th ssc geometry board qp 2023.pdf"),
    sourceFile: "MH_SSC_10_Geometry_2023.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Geometry (Mathematics Part II), March 2023 board paper",
  },
  "geo-2024": {
    id: "geo-2024",
    subjectName: "Geometry",
    year: 2024,
    month: "March",
    pdf: src("10th ssc geometry board qp 2024.pdf"),
    sourceFile: "MH_SSC_10_Geometry_2024.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Geometry (Mathematics Part II), March 2024 board paper",
  },
  "geo-2025": {
    id: "geo-2025",
    subjectName: "Geometry",
    year: 2025,
    month: "March",
    paperCode: "N 832",
    pdf: src("10th ssc geometry board qp 2026 (1).pdf"), // MISLABELED: actually March 2025
    sourceFile: "MH_SSC_10_Geometry_2025.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Geometry (Mathematics Part II), March 2025 board paper",
  },
  "geo-2026": {
    id: "geo-2026",
    subjectName: "Geometry",
    year: 2026,
    month: "March",
    pdf: src("10th ssc geometry board qp 2026.pdf"),
    sourceFile: "MH_SSC_10_Geometry_2026.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Geometry (Mathematics Part II), March 2026 board paper",
  },
  // ── Science and Technology I (Physics + Chemistry) ──
  "sci1-2023": {
    id: "sci1-2023",
    subjectName: "Science and Technology I",
    year: 2023,
    month: "March",
    pdf: src("10th ssc Sci-I board qp 2023.pdf"),
    sourceFile: "MH_SSC_10_Science_I_2023.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Science and Technology Part I, March 2023 board paper",
  },
  "sci1-2024": {
    id: "sci1-2024",
    subjectName: "Science and Technology I",
    year: 2024,
    month: "March",
    pdf: src("10th ssc SCI-I board qp 2024.pdf"),
    sourceFile: "MH_SSC_10_Science_I_2024.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Science and Technology Part I, March 2024 board paper",
  },
  "sci1-2025": {
    id: "sci1-2025",
    subjectName: "Science and Technology I",
    year: 2025,
    month: "March",
    pdf: src("10th ssc Sci-I board qp 2025.pdf"),
    sourceFile: "MH_SSC_10_Science_I_2025.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Science and Technology Part I, March 2025 board paper",
  },
  "sci1-2026": {
    id: "sci1-2026",
    subjectName: "Science and Technology I",
    year: 2026,
    month: "March",
    pdf: src("10th ssc Sci-I board qp 2026.pdf"),
    sourceFile: "MH_SSC_10_Science_I_2026.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Science and Technology Part I, March 2026 board paper",
  },
  // ── Science and Technology II (Biology) ──
  "sci2-2023": {
    id: "sci2-2023",
    subjectName: "Science and Technology II",
    year: 2023,
    month: "March",
    pdf: src("10th ssc Sci-II board qp 2023.pdf"),
    sourceFile: "MH_SSC_10_Science_II_2023.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Science and Technology Part II, March 2023 board paper",
  },
  "sci2-2024": {
    id: "sci2-2024",
    subjectName: "Science and Technology II",
    year: 2024,
    month: "March",
    pdf: src("10th ssc Sci-II board qp 2024.pdf"),
    sourceFile: "MH_SSC_10_Science_II_2024.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Science and Technology Part II, March 2024 board paper",
  },
  "sci2-2025": {
    id: "sci2-2025",
    subjectName: "Science and Technology II",
    year: 2025,
    month: "March",
    pdf: src("10th ssc Sci-II board qp 2025.pdf"),
    sourceFile: "MH_SSC_10_Science_II_2025.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Science and Technology Part II, March 2025 board paper",
  },
  "sci2-2026": {
    id: "sci2-2026",
    subjectName: "Science and Technology II",
    year: 2026,
    month: "March",
    pdf: src("10th ssc Sci-II board qp 2026.pdf"),
    sourceFile: "MH_SSC_10_Science_II_2026.pdf",
    note: "Maharashtra State Board Class 10 (SSC) — Science and Technology Part II, March 2026 board paper",
  },
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requirePaper(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[id];
}
