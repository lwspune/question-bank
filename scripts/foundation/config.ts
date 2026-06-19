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
  pages?: number[]; // 0-based page indices to render; omit → all pages
  note: string; // questions.pyq_note
  // Canonical subtopics for this chapter — transcription maps each question to one.
  subtopics: string[];
};

const chem = (p: string) => join(SOURCE_ROOT, "Chemistry", p);

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
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireWorksheet(id: string | undefined): Worksheet {
  if (!id || !WORKSHEETS[id]) {
    throw new Error(`unknown worksheet "${id}". Known: ${Object.keys(WORKSHEETS).join(", ")}`);
  }
  return WORKSHEETS[id];
}
