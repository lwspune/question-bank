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
      // Class-9 prerequisite topics that the OLD-pattern (pre-2020) Class-10
      // Algebra board paper drew on for quick 1-mark Q1 items (surfaced by the
      // 2019 paper). Kept as honest distinct chapters; a later Phase-D pass can
      // merge/canonicalise if preferred.
      Polynomials: [
        "Coefficient Form of a Polynomial",
        "Value of a Polynomial",
        "Operations on Polynomials",
      ],
      Surds: [
        "Multiplication of Surds",
        "Operations on Surds",
        "Rationalisation of Surds",
      ],
      Sets: [
        "Union and Intersection of Sets",
        "Types of Sets and Subsets",
      ],
      "Ratio and Proportion": [
        "Reduced Form of a Ratio",
        "Properties of Proportion",
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
      // OLD-syllabus (pre-2020) Science I chapters surfaced by the 2016/2018
      // board papers — kept as honest distinct chapters (a later Phase-D pass can
      // merge/canonicalise if preferred).
      "Reflection of Light": [
        "Spherical Mirrors and Terminology",
        "Image Formation by Mirrors",
        "Mirror Formula and Magnification",
      ],
      "Current Electricity": [
        "Ohm's Law and Resistance",
        "Resistivity",
        "Series and Parallel Combination of Resistors",
        "Electric Power and Energy",
      ],
      "Acids, Bases and Salts": [
        "Acids, Bases and Indicators",
        "pH Scale",
        "Salts and Their Uses",
      ],
      "Environmental Pollution": [
        "Types and Sources of Pollution",
        "Effects and Control of Pollution",
        "Biodegradable and Non-biodegradable Waste",
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

// After the 2026-07-21 canonical rename, every source PDF is named exactly
// `MH_SSC_10_<Subject>_<Year>.pdf` (== sourceFile == the DB dedup key), so the
// pdf path, sourceFile and note are all derivable from (subjectName, year).
const FILE_SUBJECT: Record<string, string> = {
  Algebra: "Algebra",
  Geometry: "Geometry",
  "Science and Technology I": "Science_I",
  "Science and Technology II": "Science_II",
};
const ID_PREFIX: Record<string, string> = {
  Algebra: "alg",
  Geometry: "geo",
  "Science and Technology I": "sci1",
  "Science and Technology II": "sci2",
};
const PAPER_LABEL: Record<string, string> = {
  Algebra: "Algebra (Mathematics Part I)",
  Geometry: "Geometry (Mathematics Part II)",
  "Science and Technology I": "Science and Technology Part I",
  "Science and Technology II": "Science and Technology Part II",
};

function mkPaper(subjectName: string, year: number, paperCode?: string): Paper {
  const sourceFile = `MH_SSC_10_${FILE_SUBJECT[subjectName]}_${year}.pdf`;
  return {
    id: `${ID_PREFIX[subjectName]}-${year}`,
    subjectName,
    year,
    month: "March",
    ...(paperCode ? { paperCode } : {}),
    pdf: src(sourceFile),
    sourceFile,
    note: `Maharashtra State Board Class 10 (SSC) — ${PAPER_LABEL[subjectName]}, March ${year} board paper`,
  };
}

// One scanned board QP each. Years present on disk per subject (2021: no exam
// held; Science I has no 2017). Verified printed-cover codes passed where known.
const PAPER_SPECS: Array<[string, number, string?]> = [
  // Algebra (Mathematics Part I)
  ["Algebra", 2016], ["Algebra", 2017], ["Algebra", 2018], ["Algebra", 2019],
  ["Algebra", 2020], ["Algebra", 2022], ["Algebra", 2023],
  ["Algebra", 2024, "N 619"], ["Algebra", 2025, "N 819"], ["Algebra", 2026, "N 919"],
  // Geometry (Mathematics Part II)
  ["Geometry", 2016], ["Geometry", 2017], ["Geometry", 2018], ["Geometry", 2019],
  ["Geometry", 2020], ["Geometry", 2022], ["Geometry", 2023], ["Geometry", 2024],
  ["Geometry", 2025, "N 832"], ["Geometry", 2026, "N 932"],
  // Science and Technology I (no 2017 on disk)
  ["Science and Technology I", 2016], ["Science and Technology I", 2018],
  ["Science and Technology I", 2019], ["Science and Technology I", 2020],
  ["Science and Technology I", 2022], ["Science and Technology I", 2023],
  ["Science and Technology I", 2024], ["Science and Technology I", 2025],
  ["Science and Technology I", 2026],
  // Science and Technology II (Biology)
  ["Science and Technology II", 2016], ["Science and Technology II", 2017],
  ["Science and Technology II", 2018], ["Science and Technology II", 2019],
  ["Science and Technology II", 2020], ["Science and Technology II", 2022],
  ["Science and Technology II", 2023], ["Science and Technology II", 2024],
  ["Science and Technology II", 2025], ["Science and Technology II", 2026],
];

export const PAPERS: Record<string, Paper> = Object.fromEntries(
  PAPER_SPECS.map(([subjectName, year, paperCode]) => {
    const paper = mkPaper(subjectName, year, paperCode);
    return [paper.id, paper];
  }),
);

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requirePaper(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[id];
}
