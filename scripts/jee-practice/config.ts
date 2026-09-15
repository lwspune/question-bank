// Shared config for the JEE (Mains) *practice*-question ingestion pipeline.
//
// Source: the SGIMA (Sanjay Ghodawat IIT & Medical Academy) printed Maths
// practice booklets — SCANNED image PDFs (no text layer, ~200 DPI A4, two-column)
// under SOURCE_ROOT. Each booklet is a Volume; each Volume is a sequence of
// chapters. A chapter is laid out as:
//   • SYNOPSIS  — theory + formulae + Worked Examples (`W.E-N` with `Sol:`)
//   • LEVEL-I / LEVEL-II (H.W) / LEVEL-III / LEVEL-IV … — MCQ exercise sets
//     (4 options printed `1) 2) 3) 4)`), each followed by a `LEVEL-N-KEY`
//     block (`01) 4  02) 1 …`, option NUMBER 1-4) and `LEVEL-N-HINTS`.
//
// Transcription is VISION-driven (no text layer): render.ts rasterises the
// chapter pages, vision agents transcribe to data/<chapterId>.<part>.json, and
// commit.ts merges questions + the per-level KEY blocks + worked examples.
//
// These are NOT past-year questions — committed under the existing JEE Mains
// exam with question_kind='practice' and visibility='PRIVATE' (post-commit
// UPDATE, mirroring the NDA-practice + JEE-PYQ visibility flip). Per-exam dedup
// (migration 0038) keeps them isolated from the JEE PYQ corpus.
import { join } from "node:path";

// LWS Pune org + admin + JEE Mains exam + Maths subject (verified in DB).
// Same IDs as the JEE-PYQ pipeline (scripts/jee/config.ts).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679"; // JEE Mains
export const SUBJECT_NAME = "Maths"; // JEE seeds "Maths" (NOT "Mathematics")

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\JEE_Mains\\Maths\\Practice";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs (regenerable by render.ts)
export const DATA = join(__dirname, "data"); // committed: the vision transcription (curated source of truth)

export type Chapter = {
  id: string; // slug → data/<id>.*.json + source_file
  volume: string; // e.g. "I" — provenance only
  chapterName: string; // canonical DB chapter (auto-created on commit)
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the Volume booklet PDF
  pdfPages: number[]; // 0-based PDF page indices covering this chapter (render.ts)
  levels: string[]; // exercise-set labels present (informational; e.g. "I-HW", "II-CW", "III")
  note?: string; // optional questions.pyq_note
  // Canonical conceptual subtopics — every transcribed question (MCQ + W.E) must
  // map its `subtopic` to one of these (verified at commit). Kept deliberately
  // small + well-separated to keep vision classification low-error.
  subtopics: string[];
};

export const CHAPTERS: Record<string, Chapter> = {
  // ─── PILOT — Vol I, Ch.2 Compound Angles (printed pp 19–33 → PDF idx 20–34).
  // Text-only (no figures). LEVEL-I…IV + W.E worked examples. ───
  "compound-angles": {
    id: "compound-angles",
    volume: "I",
    chapterName: "Compound Angles",
    sourceFile: "JEE_Practice_SGIMA_VolI__Compound_Angles.pdf",
    pdf: join(SOURCE_ROOT, "SKM_C284e25030309340.pdf"),
    pdfPages: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    // Exercise sets carry Class-Work / Home-Work variants (each with its own KEY):
    // e.g. LEVEL-I (H.W), LEVEL-II (C.W), LEVEL-II (H.W), LEVEL-III, LEVEL-IV.
    // Informational — the authoritative set list comes from the transcribed KEY headers.
    levels: ["I-HW", "II-CW", "II-HW", "III", "IV"],
    note: "JEE Maths practice — SGIMA Vol I, Compound Angles",
    subtopics: [
      // sin/cos/tan/cot(A±B) direct: given ratios → compound value / quadrant,
      // tan(A±B) with specific angles, roots-of-equation applications.
      "Compound Angle Formulae and Values",
      // C&D transformations: sinC±sinD, cosC±cosD, product↔sum, telescoping series.
      "Sum-Product Transformations",
      // A+B+C = π (or π/2) ⇒ prove/evaluate Σ identities; conditional relations.
      "Conditional Identities",
    ],
  },
};

export const dataGlobPrefix = (chapterId: string) => `${chapterId}.`;
export const mergedJsonPath = (chapterId: string) => join(DATA, `${chapterId}.merged.json`);

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
