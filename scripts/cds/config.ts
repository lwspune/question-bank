// Shared config for the CDS English PYQ ingestion pipeline.
//
// Source: scanned CDS English test booklets (image PDFs, no text layer) under
// SOURCE_ROOT. There are NO official answer keys, so answers are LLM-DERIVED
// during transcription and confidence-flagged; everything is committed PRIVATE
// pending a human spot-check before flipping PUBLIC.
//
// CDS English papers are 120 Q / 100 marks / 2 hrs / 1-3 negative. The paper is
// organised into ~13 SECTIONS, each opening with a "Directions:" block — but the
// section ORDER and SELECTION vary by year (2026 opens with word-pairs, 2017 with
// ordering-of-words, 2023 with word-classes, 2024 with antonyms). So every paper
// gets a SECTION-MAP pre-pass that records its sections in order; transcription is
// then assigned BY SECTION (never split — the Directions drive the task type, and
// a split silently flipped 5 answers in the 2026 trial). See README.md.
import { join } from "node:path";

// LWS Pune org + admin (same as the practice/JEE pipelines).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "07700c16-a2e3-4101-9f25-4c7956dd4882"; // CDS
export const SUBJECT_NAME = "English";

export const SOURCE_ROOT = "C:\\tmp\\PYQPs\\CDS\\02. English";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: section-map + transcription + underlines

export type Paper = {
  id: string; // slug, used for data/<id>.* + source_file
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the booklet PDF
  pyqYear: number;
  pyqNote: string; // e.g. "CDS (I) 2025 — English"
};

export const PAPERS: Record<string, Paper> = {
  "2026-1": { id: "2026-1", sourceFile: "Eng_CDS_2026_1.pdf", pdf: join(SOURCE_ROOT, "Eng_CDS_2026_1.pdf"), pyqYear: 2026, pyqNote: "CDS (I) 2026 — English" },
  "2025-1": { id: "2025-1", sourceFile: "Eng_CDS_2025_1.pdf", pdf: join(SOURCE_ROOT, "Eng_CDS_2025_1.pdf"), pyqYear: 2025, pyqNote: "CDS (I) 2025 — English" },
  "2025-2": { id: "2025-2", sourceFile: "Eng_CDS_2025_2.pdf", pdf: join(SOURCE_ROOT, "Eng_CDS_2025_2.pdf"), pyqYear: 2025, pyqNote: "CDS (II) 2025 — English" },
  // ...remaining papers added as they are mapped. (2024_1 was Elementary Maths;
  // the user replaced it with the correct English booklet on 2026-06-15.)
};

export function requirePaper(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  return PAPERS[id];
}

// ── Section-type catalog (the durable CDS knowledge) ───────────────────────────
// Each CDS section maps onto the NDA-English taxonomy. `underline`/`inlineStimulus`/
// `passage`/`perQuestionSubtopic` flags drive how buildRecords assembles the row.
//  - underline 'single'  : one tested word, wrapped \(\underline{\text{w}}\) (from underlines.json[n])
//  - underline 'triple'  : homophone — the word in each of 3 numbered sentences (underlines.json[n] = {1,2,3})
//  - underline 'errorParts': the stem is the 3 labelled parts (= options A,B,C); each wrapped, options = parts + "No error"
//  - inlineStimulus true  : per-question stimulus (Match List / S1-S2) lives IN the stem (so content_hash is unique)
//  - passage true         : shared passage (RC / Cloze) lives in the SET context, rendered once
//  - perQuestionSubtopic  : the transcriber assigns the subtopic per question (Grammar blanks, Spotting Errors, RC)
export type SectionType = {
  chapter: string;
  subtopic: string; // default; overridden per-question when perQuestionSubtopic
  perQuestionSubtopic?: boolean;
  underline?: "single" | "triple" | "errorParts";
  inlineStimulus?: boolean;
  passage?: boolean;
};

export const SECTION_CATALOG: Record<string, SectionType> = {
  "word-pair-meaning":        { chapter: "Vocabulary", subtopic: "Word Definition" },
  "single-word-meaning":      { chapter: "Vocabulary", subtopic: "Word Definition" },
  "synonyms":                 { chapter: "Vocabulary", subtopic: "Synonyms", underline: "single" },
  "antonyms":                 { chapter: "Vocabulary", subtopic: "Antonyms", underline: "single" },
  "homophones":               { chapter: "Vocabulary", subtopic: "Confusable Word Pairs", underline: "triple" },
  // one word reused across 3 numbered sentences, "how many are used correctly" (homophone-format, single word)
  "word-usage-count":         { chapter: "Grammar", subtopic: "Correct Sentence Identification", underline: "triple" },
  // a word + four sentences as options; pick the one sentence using it correctly
  "word-usage-select":        { chapter: "Grammar", subtopic: "Correct Sentence Identification" },
  "match-list":               { chapter: "Vocabulary", subtopic: "Word Definition", inlineStimulus: true },
  "idioms":                   { chapter: "Idioms and Phrases", subtopic: "Idiom Meaning" },
  "paragraph-rearrangement":  { chapter: "Sentence Rearrangement", subtopic: "Paragraph Sequencing (S1–S6)", inlineStimulus: true },
  "sentence-part-rearrangement": { chapter: "Sentence Rearrangement", subtopic: "Sentence Part Rearrangement (PQRS)", inlineStimulus: true },
  "word-class":               { chapter: "Grammar", subtopic: "Parts of Speech", underline: "single" },
  "fill-blank-grammar":       { chapter: "Grammar", subtopic: "Preposition Usage", perQuestionSubtopic: true },
  "sentence-completion":      { chapter: "Grammar", subtopic: "Sentence Completion" },
  "discourse-markers":        { chapter: "Grammar", subtopic: "Discourse Markers and Connectors" },
  "sentence-relationship":    { chapter: "Reading Comprehension", subtopic: "Inferential Comprehension", inlineStimulus: true },
  "spotting-errors":          { chapter: "Spotting Errors", subtopic: "Mixed Error Detection", perQuestionSubtopic: true, underline: "errorParts" },
  "sentence-improvement":     { chapter: "Spotting Errors", subtopic: "Sentence Improvement", underline: "single" },
  "fill-blank-contextual":    { chapter: "Fill in the Blanks", subtopic: "Contextual Fill-in-Blank" },
  "cloze":                    { chapter: "Cloze Test", subtopic: "Word Selection in Passage", passage: true },
  "reading-comprehension":    { chapter: "Reading Comprehension", subtopic: "Literal Comprehension", perQuestionSubtopic: true, passage: true },
};

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);
