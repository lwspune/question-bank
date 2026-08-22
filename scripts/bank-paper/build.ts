/**
 * Assemble a /dashboard/papers paper from EXISTING bank questions.
 *
 *   npx tsx scripts/bank-paper/build.ts nda-binomial-dist-logs          # dry run
 *   npx tsx scripts/bank-paper/build.ts nda-binomial-dist-logs --apply  # write
 *
 * Dry run is the default and prints the exact 60 rows --apply would add, plus a
 * structural key audit of every pick. Selection is deterministic (stable id
 * order, no Math.random), so the preview is truthful rather than indicative.
 *
 * Two exclusions are applied before selection, both silent-failure guards:
 *   - questions already used in ANY paper in this org (a student may have seen
 *     them), and
 *   - the audit's STRUCT/DUP flags, which are objective defects (not exactly 4
 *     options / not exactly 1 correct / two identical options) and can never be
 *     shipped. SOLN≠KEY is only high-signal, not proof, so it is REPORTED and
 *     left for a human call rather than auto-excluded.
 *
 * Idempotent: the paper is reused if one with the same title exists in the org,
 * and addQuestion upserts on (paper_id, question_id).
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createPaper, addQuestion } from "../../src/lib/papers/admin";
import type { SectionTemplate } from "../../src/lib/papers/types";
import { concludedLetter } from "../practice/audit-keys";
import { ORG_ID, EXAM_ID, CREATED_BY } from "../practice/config";
import { auditEnglishSection, type EnglishRow } from "./english";
import {
  selectByQuota, selectTotal, orderPaper, orderPaperBySections, DIFFICULTIES,
  type Cand, type Quota, type Shape, type Layout,
} from "./lib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type ChapterPlan = {
  chapterId: string;
  label: string;
  /** Exact per-difficulty counts. A thin difficulty is REPORTED, never substituted. */
  quota?: Quota;
  /** A total, spent against the paper's `shape`; a thin difficulty IS substituted. */
  take?: number;
  /**
   * Which printed section this chapter's questions belong to. Required only on a
   * multi-section paper (`sections`); a single-section paper files everything
   * under its one section.
   */
  sectionKey?: string;
  /**
   * Draw PRIVATE rows from this chapter as well as PUBLIC ones.
   *
   * OFF by default and deliberately PER CHAPTER, not per paper: PRIVATE is where
   * this bank puts flawed and duplicate rows, so a paper-wide switch would let a
   * known-bad question into a printed test. The one legitimate use is a corpus
   * that is PRIVATE in its ENTIRETY for a reason unrelated to defect — CDS
   * English, all 2,280 rows of which are withheld pending a human spot-check of
   * their LLM-derived answers. A chapter that opts in is asserting it has no
   * defect-PRIVATE rows, and its picks still owe that spot-check.
   */
  includePrivate?: boolean;
  /**
   * Override the paper's `kinds` for this chapter.
   *
   * Needed when one paper mixes corpora that differ in kind — a GAT mock is
   * PYQ-only for its General-Knowledge subjects, but its Current Affairs must be
   * `practice` (a PYQ from 2019 asks about 2019 facts) and its Biology comes from
   * the Foundation Course worksheets, which are `practice` by construction.
   * Per chapter rather than per paper so "PYQ-only" stays true where it is meant.
   */
  kinds?: ("pyq" | "practice")[];
  /**
   * Set when the chapter's questions live in a DIFFERENT exam to the paper's own
   * (e.g. Binary Numbers, which has no fresh NDA rows and is drawn from the
   * Cadetprep worksheet course). Documentation only — candidates are fetched by
   * chapter_id, which is already exam-specific — but it keeps a cross-exam draw
   * visible in the spec instead of hidden behind a bare uuid.
   */
  fromExam?: string;
};

type PaperSpec = {
  slug: string;
  title: string;
  /** The paper's own exam. Questions may come from other exams — see fromExam. */
  examId: string;
  /** Single-section paper (the original shape). Use `sections` for a multi-part paper. */
  section?: { key: string; label: string };
  /**
   * Multi-section paper, in PRINTED order — e.g. NDA GAT is English then General
   * Knowledge. Sections print contiguously; each chapter names its `sectionKey`.
   */
  sections?: { key: string; label: string }[];
  /** Only rows of these kinds are eligible. */
  kinds: ("pyq" | "practice")[];
  /** Only rows of these formats are eligible. Defaults to MCQ-only. */
  formats?: ("mcq" | "subjective" | "numeric")[];
  /**
   * Require a non-empty `solution`. Set when the answer key must carry worked
   * solutions rather than a bare letter — 132 of the State Board Class 11 MCQs
   * store a blind-re-derived key with no working.
   */
  requireSolution?: boolean;
  /** Difficulty preference for chapters using `take`. */
  shape?: Shape;
  /**
   * Printed layout within a section. Defaults to "interleave" (chapters
   * round-robin inside each difficulty tier), which suits a topic drill. Set
   * "sequential" for a paper imitating a real exam, where each chapter/subject
   * must run as one contiguous block — see Layout in ./lib.
   */
  layout?: Layout;
  chapters: ChapterPlan[];
  /** Known-defective rows, excluded by id with the reason recorded here. */
  exclude: { id: string; reason: string }[];
};

const PAPERS: PaperSpec[] = [
  {
    slug: "nda-binomial-dist-logs",
    title: "NDA Maths — Binomial Distribution & Logarithms (60 Q)",
    examId: EXAM_ID,
    section: { key: "maths", label: "Maths" },
    kinds: ["practice"],
    chapters: [
      {
        chapterId: "ba3fe1c6-2763-4c1c-8652-a72e319cd5e3",
        label: "Binomial Distribution",
        quota: { EASY: 3, MODERATE: 27, HARD: 5 },
      },
      {
        chapterId: "c1f32a21-4392-4091-b0b2-382450c0d5ff",
        label: "Logarithms",
        quota: { EASY: 3, MODERATE: 11, HARD: 11 },
      },
    ],
    exclude: [
      {
        id: "abd69b5a-17e0-4462-ba55-d62e551817fc",
        reason: "two options flagged is_correct (log_k x · log_5 k = log_x 5) — bank defect",
      },
    ],
  },
  {
    slug: "nda-circles-hd-binary",
    title: "NDA Maths — Circles, Height & Distance and Binary Numbers (60 Q)",
    examId: EXAM_ID,
    section: { key: "maths", label: "Maths" },
    kinds: ["practice"],
    chapters: [
      {
        chapterId: "1f6b061a-f657-4f29-94bf-33266509d4fe",
        label: "Circles",
        quota: { EASY: 4, MODERATE: 16, HARD: 4 },
      },
      {
        // Zero EASY practice questions exist for this chapter — the quota is 0
        // rather than back-filled, so the gap is visible instead of papered over.
        chapterId: "ed5a3b63-be74-47be-b9e5-4cb537611049",
        label: "Height & Distance",
        quota: { EASY: 0, MODERATE: 12, HARD: 4 },
      },
      {
        // The NDA bank has NO fresh Binary Numbers question: 0 PUBLIC practice
        // rows (all 9 are PRIVATE dup/flawed) and all 13 PYQs are already in
        // earlier papers. Drawn instead from the Cadetprep NDA-Maths worksheet
        // course — same syllabus, dual-blind-verified keys, 85 fresh rows.
        chapterId: "d9865e2b-3702-418a-baa6-d642a72f321f",
        label: "Binary Numbers",
        fromExam: "Worksheets - 11th+12th",
        quota: { EASY: 6, MODERATE: 10, HARD: 4 },
      },
    ],
    exclude: [],
  },
  {
    // 120 questions drawn ENTIRELY from the Maharashtra State Board Class 11 +
    // Class 12 Maths books (user's call — State Board can now supply the whole
    // paper, so no NDA top-up is taken).
    //
    // Three chapters are deliberately absent, not overlooked:
    //   Mathematical Logic  — not in the NDA Paper I syllabus
    //   Linear Programming  — NDA lists graphical linear inequations, not LP
    //   Pair of Straight Lines — not enumerated in NDA's 2-D geometry list
    //
    // Four NDA topics are consequently untested, because the State Board Maths
    // books contain no such chapter: Logarithms, Binary Numbers, Quadratic
    // Equations, Height & Distance.
    slug: "nda-stateboard-120",
    title: "NDA Maths — State Board Class 11 & 12 MCQ Paper (120 Q)",
    examId: EXAM_ID,
    section: { key: "maths", label: "Maths" },
    kinds: ["practice", "pyq"],
    requireSolution: true,
    shape: { EASY: 0.2, MODERATE: 0.55, HARD: 0.25 },
    chapters: [
      // ── Maharashtra HSC Class 12 — 84 across 12 chapters. All 268 of its MCQs
      //    carry a worked solution, so requireSolution costs nothing here.
      { chapterId: "7b42aa88-dcf2-4530-964e-cd8cf84f8a2b", label: "Trigonometric Functions", fromExam: "MH HSC 12", take: 10 },
      { chapterId: "f9759ec4-d83f-4a4c-84e2-9e802c7a6cbc", label: "Line and Planes", fromExam: "MH HSC 12", take: 8 },
      { chapterId: "16b4c885-2d16-4285-93ee-a40b076ca401", label: "Vectors", fromExam: "MH HSC 12", take: 8 },
      { chapterId: "ca49cea6-38bc-4f9c-a268-9e685e3ee27b", label: "Indefinite Integration", fromExam: "MH HSC 12", take: 8 },
      { chapterId: "6d2c6915-b152-4674-9088-0b577f73967d", label: "Application of Definite Integration", fromExam: "MH HSC 12", take: 7 },
      { chapterId: "17788c0f-7693-4582-a26a-35c9bc694913", label: "Differential Equations", fromExam: "MH HSC 12", take: 7 },
      { chapterId: "7904e0f9-0879-4f2b-9686-03c32485ad6f", label: "Matrices", fromExam: "MH HSC 12", take: 7 },
      { chapterId: "b84f55e8-e3a9-4097-895c-fa1b6fca287a", label: "Differentiation", fromExam: "MH HSC 12", take: 6 },
      { chapterId: "6cd80658-ad86-4587-9a35-d6312a6cee43", label: "Application of Derivatives", fromExam: "MH HSC 12", take: 6 },
      { chapterId: "e28689cf-640e-45a1-a00f-76240295d10b", label: "Probability Distributions", fromExam: "MH HSC 12", take: 6 },
      { chapterId: "3ba2c066-737a-4b19-84be-bd6c6aa39948", label: "Definite Integration", fromExam: "MH HSC 12", take: 6 },
      { chapterId: "e1570ec0-6521-41b2-a392-f9fe99cc0e07", label: "Binomial Distribution", fromExam: "MH HSC 12", take: 5 },

      // ── Maharashtra State Board Class 11 — 36 across 14 chapters. Only 71 of
      //    its 203 MCQs carry a worked solution, so the four fully-solved
      //    chapters lead and the rest contribute what they have. The 1-question
      //    chapters are thin BY SUPPLY, not by choice.
      { chapterId: "695ab5fb-cfed-486e-b11f-41aead22beef", label: "Limits", fromExam: "MH SB 11", take: 5 },
      { chapterId: "51ccafc0-2b6c-49fb-8574-a308ab47d81d", label: "Complex Numbers", fromExam: "MH SB 11", take: 5 },
      { chapterId: "a7105f51-4ffb-4f8c-8831-83525b81bd2e", label: "Continuity", fromExam: "MH SB 11", take: 5 },
      { chapterId: "73ddabb6-90f0-4ae3-a801-dda00662ae26", label: "Permutations and Combination", fromExam: "MH SB 11", take: 5 },
      { chapterId: "f16a8046-16ce-435a-a98e-683fe2b954b0", label: "Conic Sections", fromExam: "MH SB 11", take: 4 },
      { chapterId: "4f46d840-c155-4d97-b1aa-fd26497c89f0", label: "Functions", fromExam: "MH SB 11", take: 3 },
      { chapterId: "92d1953c-0b14-4549-bf63-6f2911d1b3f6", label: "Determinants and Matrices", fromExam: "MH SB 11", take: 2 },
      { chapterId: "8bb78e9b-86ac-4e0a-a7c1-6e1a8b236c6d", label: "Probability", fromExam: "MH SB 11", take: 1 },
      { chapterId: "d37165a6-1c28-4d71-8770-9f10c141c0e3", label: "Angle and its Measurement", fromExam: "MH SB 11", take: 1 },
      { chapterId: "42ab0090-6922-4c33-91c6-fb688f8708c2", label: "Circle", fromExam: "MH SB 11", take: 1 },
      { chapterId: "8bccad61-78ac-4eb5-971a-f28d183a4d71", label: "Binomial Theorem", fromExam: "MH SB 11", take: 1 },
      { chapterId: "c7eb0e36-8eec-4309-8f7a-efc0cdc9bf29", label: "Measures of Dispersion", fromExam: "MH SB 11", take: 1 },
      { chapterId: "c4a8ad9e-5be6-44b0-8a07-a32ed56b032c", label: "Sets and Relations", fromExam: "MH SB 11", take: 1 },
      { chapterId: "86615e9b-54de-467a-a57e-e6c8a6a1a4a7", label: "Trigonometry - II", fromExam: "MH SB 11", take: 1 },
    ],
    // All 9 solution-vs-key flags from the 471-row audit. Two were verified in
    // detail as PROBE FALSE POSITIVES with correct keys (00f7e6f8 — the trailing
    // "note the trap: option (C)" paragraph; f02fc4a1 — a "which is NOT the
    // derivative" stem whose solution correctly concludes C). The other seven
    // are UNVERIFIED. All are excluded because supply is ample, not because all
    // nine are known-bad. (371fe787 is in Mathematical Logic, already out.)
    exclude: [
      { id: "00f7e6f8-333f-4beb-968c-412726b124e8", reason: "SOLN≠KEY flag [Cl-12 Trigonometric Functions] — VERIFIED false positive, key correct" },
      { id: "08cad135-d664-470f-84d9-1645226602b2", reason: "SOLN≠KEY flag [Cl-12 Trigonometric Functions] — unverified" },
      { id: "1c7616c9-da33-405e-a0e7-65015b1b4440", reason: "SOLN≠KEY flag [Cl-12 Vectors] — unverified" },
      { id: "24e2fcaf-db86-4d60-8479-211a16ef0e4e", reason: "SOLN≠KEY flag [Cl-12 Differentiation] — unverified" },
      { id: "59ab2eda-c6c6-4bd4-95c2-066a1ad1e9d8", reason: "SOLN≠KEY flag [Cl-12 Differential Equations] — unverified" },
      { id: "78185186-f826-43f1-8716-2454bd6a5910", reason: "SOLN≠KEY flag [Cl-12 Differential Equations] — unverified" },
      { id: "9a3eab34-c8dd-435d-9743-61107d2908ae", reason: "SOLN≠KEY flag [Cl-11 Complex Numbers] — unverified" },
      { id: "f02fc4a1-f885-4426-b566-81f1c37cd0e6", reason: "SOLN≠KEY flag [Cl-12 Differentiation] — VERIFIED false positive, key correct" },
    ],
  },
  {
    // ── NDA GAT — HARD mock, 150 q on the real blueprint ──────────────────────
    //
    // Measured against the last three actual sittings (2026-I, 2025-II, 2025-I),
    // not from memory: English 50 · Physics 25 · Geography 20 · Chemistry 15 ·
    // History 12 · Current Affairs 11 · Biology 10 · Polity 6 · Economics 1.
    //
    // 147 HARD / 3 MODERATE. The three MODERATE are all in Chemistry, which is
    // the ONLY subject where NDA's HARD PYQ supply genuinely runs out (12 free
    // against a need of 15). Everywhere else the paper is entirely HARD.
    //
    // THREE corpora, because two subjects cannot be served by NDA PYQs at all:
    //
    //   Biology — the whole NDA Biology PYQ corpus (189 rows, every difficulty)
    //     is already consumed by three chapter-drill papers built 30 Jul–5 Aug
    //     2026, so its free supply is ZERO and there are only 4 HARD rows in
    //     existence. Drawn instead from the Foundation Course Class 9/10 NCERT
    //     Biology pool (133 HARD), which is the right level for GAT science.
    //
    //   Current Affairs — a PYQ from 2019 asks about 2019 facts.
    //     /guide/nda-current-affairs measured that 90% of explicit-year mentions
    //     fall within 12 months of the paper, so the bank calibrates question
    //     SHAPE and the facts must come from the current year. Drawn from the
    //     authored Sep-2026 pool (`scripts/practice-paper` slug `ca-mock-sep26`).
    //
    //   English — NDA has 46 HARD but 25 of them are Sentence Rearrangement,
    //     against 6.7 in a real paper, while Grammar and Vocabulary (36 of the
    //     50 real marks) hold just 9 HARD between them. Taking all 46 would make
    //     half the section one skill, so rearrangement is capped at its real
    //     weight and Grammar/Vocabulary are filled to theirs with NDA's hardest
    //     MODERATE. That is why the paper's 30 MODERATE are concentrated here.
    //
    // ⚠ CDS ENGLISH WAS TRIED FOR THIS AND REJECTED ON EVIDENCE — do not re-add it
    // without a corpus-wide review first. It looked ideal: 294 HARD rows, the same
    // UPSC style, and (checked by content_hash) ZERO overlap with NDA's HARD rows,
    // so Grammar and Vocabulary could have been filled entirely with HARD. But all
    // 2,280 CDS rows are PRIVATE pending a human spot-check — scanned booklets with
    // NO printed key, so every answer is LLM-derived — and a blind re-derivation of
    // the 27 rows this paper would have drawn found 8 defects in the 24 that could
    // be derived, a 33% rate. THREE keys name the exact ANTONYM of the target word
    // (magniloquent -> "terse", originates -> "culminates", vulnerable ->
    // "impervious"). That is a systematic failure mode, not noise, so swapping out
    // the bad picks does not help: the replacements come from the same pool.
    // `audit:keys` cannot catch it either — the option sets are structurally fine.
    slug: "nda-gat-hard-150",
    title: "NDA GAT — HARD Mock (150 Q)",
    examId: EXAM_ID,
    sections: [
      { key: "english", label: "Part A — English" },
      { key: "gk", label: "Part B — General Knowledge" },
    ],
    kinds: ["pyq"], // per-chapter overrides carry the two practice corpora
    // Print like the real paper: English by question type (each type has ONE
    // directions block, so its items must not be scattered), then General
    // Knowledge subject by subject. Chapter order below IS the printed order.
    layout: "sequential",
    chapters: [
      // ── Part A — English 50, at the real paper's chapter weights ───────────
      { chapterId: "296d3789-6f50-40a2-ba75-50f9da520112", label: "Grammar", sectionKey: "english", quota: { EASY: 0, MODERATE: 0, HARD: 4 } },
      { chapterId: "a2dee362-7083-4c47-94a9-fcc8878c83de", label: "Grammar (CDS)", sectionKey: "english", fromExam: "CDS", includePrivate: true, quota: { EASY: 0, MODERATE: 0, HARD: 15 } },
      { chapterId: "35f02245-47f1-494d-a495-8fc178452856", label: "Vocabulary", sectionKey: "english", quota: { EASY: 0, MODERATE: 0, HARD: 5 } },
      { chapterId: "ba40834a-8074-44e9-9f47-29be8c0a8811", label: "Vocabulary (CDS)", sectionKey: "english", fromExam: "CDS", includePrivate: true, quota: { EASY: 0, MODERATE: 0, HARD: 12 } },
      // Capped at the real weight (6.7/paper) even though 25 HARD are available.
      { chapterId: "96cd1a07-850b-4cec-b136-a1bee0466200", label: "Sentence Rearrangement", sectionKey: "english", quota: { EASY: 0, MODERATE: 0, HARD: 7 } },
      { chapterId: "1b8c129d-6f75-4769-9e19-2146ac2b7d2b", label: "Reading Comprehension", sectionKey: "english", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "e16371e1-cab2-41b7-bc3e-c3497723b949", label: "Idioms and Phrases", sectionKey: "english", quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "9f71c4b6-0d14-4f2a-a329-82b8b90ed103", label: "Spotting Errors", sectionKey: "english", quota: { EASY: 0, MODERATE: 0, HARD: 2 } },

      // ── Part B — Physics 25 ────────────────────────────────────────────────
      { chapterId: "eeb6f496-35c7-4849-81c7-2e323abb3f2a", label: "Electricity and Magnetism", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 7 } },
      { chapterId: "30a2a745-fcaf-444d-88f3-e91a2cbaf869", label: "Fluid Mechanics", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "5dedf98c-7681-4f33-869e-f341313d8fd0", label: "Heat and Thermodynamics", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "4a8ee181-4e57-4cdc-9b8f-697a88103c32", label: "Kinematics and Motion", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "272515e4-c90a-4fc8-88d5-27dda51abdff", label: "Laws of Motion and Forces", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "477cbb6a-f22c-4449-b4b7-ba8abc5c3954", label: "Light and Optics", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "af22890f-69bc-49e2-8950-5c4c9aa53450", label: "Work, Energy and Power", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "ecb87359-2f52-427b-ab5c-303a8cc5f36e", label: "Sound", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 1 } },

      // ── Part B — Geography 20 ──────────────────────────────────────────────
      { chapterId: "6df02248-239f-49bd-9c2e-63cb0860defb", label: "Indian Geo — Economy", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 5 } },
      { chapterId: "8c4cb7d9-c77d-4155-939f-9cf0ada26bba", label: "Climatology", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 4 } },
      { chapterId: "63289cd6-4373-4840-8d57-407e47844c97", label: "Earth's Structure", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 4 } },
      { chapterId: "a5a3c06a-a8da-4cf1-96a4-608ea3279d14", label: "Indian Geo — Physical", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "5424e638-b1eb-4319-ad6f-cd6c238d758e", label: "Earth in Space and Maps", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "3b4f15e9-42a8-4a7d-accc-53a4374e059f", label: "World and Human Geography", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "b6db578c-0079-42f4-898b-dedc0bb4ba82", label: "Oceanography", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 1 } },

      // ── Part B — Chemistry 15 (12 HARD + the paper's only 3 MODERATE) ──────
      { chapterId: "da2d5b13-48ac-4bb0-a013-252543c55185", label: "Industrial and Applied Chem", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "7ad0bbff-e533-4e37-acb3-9f3e77db8b98", label: "Chemical Reactions", sectionKey: "gk", quota: { EASY: 0, MODERATE: 1, HARD: 3 } },
      { chapterId: "cb0950ae-e3b1-450e-8bc1-e6bc3afbc096", label: "Atomic Structure", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "78b65d36-3429-441a-83c1-45fcf49addca", label: "Carbon and Its Compounds", sectionKey: "gk", quota: { EASY: 0, MODERATE: 1, HARD: 2 } },
      { chapterId: "45b5a64b-f7ed-45d8-a369-202403ae2a08", label: "Matter and Its States", sectionKey: "gk", quota: { EASY: 0, MODERATE: 1, HARD: 1 } },
      { chapterId: "d14c8662-10f9-42c7-b03f-9260c6131c81", label: "Hydrogen and Water", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 1 } },

      // ── Part B — History 12 ────────────────────────────────────────────────
      { chapterId: "7362f273-e8bf-4c26-b1a2-5cc17e5d56f0", label: "Modern India", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 5 } },
      { chapterId: "e376f822-a8e5-4ce2-b58b-e921c9b9ae9e", label: "Medieval India", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "e87bba6c-60b7-4264-868f-0a50d688bcd6", label: "Ancient India", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "c4efbafd-4cc9-4b06-8e03-259610410ab7", label: "World History", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 1 } },

      // ── Part B — Current Affairs 11 (Sep-2026 authored pool, not PYQ) ──────
      { chapterId: "8643c509-7ea1-4b37-8c2d-5adc53c7f2eb", label: "CA — Defence and Exercises", sectionKey: "gk", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 3 } },
      { chapterId: "c5cd2e0e-f664-4967-abb6-a1033bcffec6", label: "CA — Science and Technology", sectionKey: "gk", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "47cd81d5-4985-4a5a-b884-71f2c2de4634", label: "CA — Awards and Culture", sectionKey: "gk", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "2843a36f-4171-4d21-b8af-165d3ed2b7ad", label: "CA — Schemes and Governance", sectionKey: "gk", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "b9f361d6-4126-44da-a34c-b420370fc63f", label: "CA — Environment", sectionKey: "gk", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "37f60677-b0d4-4c76-9431-60f0f603d324", label: "CA — National Events", sectionKey: "gk", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "2d7691db-838d-419c-8ae8-bd299af89482", label: "CA — International Affairs", sectionKey: "gk", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "06f78bba-e820-49e4-ada5-7b2c90eb3c1d", label: "CA — Sports", sectionKey: "gk", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },

      // ── Part B — Biology 10 (Foundation Course Class 9/10 NCERT) ───────────
      { chapterId: "9990265b-e948-4e97-8d63-b8e2e580bb97", label: "Bio — Life Processes", sectionKey: "gk", fromExam: "Foundation Course", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "1b08c219-c055-41a8-9899-f1950683c3b3", label: "Bio — Tissues", sectionKey: "gk", fromExam: "Foundation Course", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "7d63025f-f1bb-4975-b410-5b5168986045", label: "Bio — Control and Coordination", sectionKey: "gk", fromExam: "Foundation Course", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "9df4dc99-e13a-461d-96ff-660e0fd0b3ed", label: "Bio — Heredity and Evolution", sectionKey: "gk", fromExam: "Foundation Course", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "8f0223e9-b65f-4e6d-8532-9419c126f8bf", label: "Bio — Fundamental Unit of Life", sectionKey: "gk", fromExam: "Foundation Course", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "be8227bd-721e-46ec-b71c-ff0c202d5ff1", label: "Bio — Our Environment", sectionKey: "gk", fromExam: "Foundation Course", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "5c46629b-978d-45ed-b9d1-e3593b1c4b1d", label: "Bio — How Organisms Reproduce", sectionKey: "gk", fromExam: "Foundation Course", kinds: ["practice"], quota: { EASY: 0, MODERATE: 0, HARD: 1 } },

      // ── Part B — Polity 6 · Economics 1 ────────────────────────────────────
      { chapterId: "a2f2ba52-9dfd-43e3-b220-2b6de50cb37f", label: "Government Structure", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "fccc9f7a-66da-4374-b48d-f65e8a09e4df", label: "World Polity and IR", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 2 } },
      { chapterId: "d1448908-30ee-40e9-8f2f-920a64aed7bc", label: "Fundamental Rights and DPSP", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "ecff6022-f64b-49d5-a5c1-4f89012e192b", label: "Indian Constitution", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
      { chapterId: "4c64341f-f757-4d44-b1e4-a30572cd4bae", label: "Indian Economy", sectionKey: "gk", quota: { EASY: 0, MODERATE: 0, HARD: 1 } },
    ],
    // Every CDS row blind re-derived before it could be drawn. Four wrong keys were
    // CORRECTED in place (scripts/cds/fix-keys.ts, which also re-stamps content_hash
    // because the answer letter feeds it). These six cannot be fixed by a key change
    // — the correct answer is absent from the options, or the stem itself is broken,
    // or two options are equally right — so they are kept out of the paper rather
    // than "corrected" into a manufactured key. Reasons are recorded in UNFIXABLE in
    // that same file; keep the two lists in step.
    exclude: [
      { id: "1e9c3614-697e-4699-8131-b73baf9e595f", reason: "CDS legal-terms match list — correct mapping A-2,B-3,C-4,D-1 is not among the options" },
      { id: "44be04c1-0a94-4811-8f04-05e489a2ad31", reason: "CDS Depose/Deplore/Deport — correct answer is '3 only', which is not offered" },
      { id: "88466cd1-95c8-44fe-8e43-5170b89efa78", reason: "CDS passive-to-active — stem 'They was to be a good cricketer' is neither passive nor grammatical" },
      { id: "3bf1b011-af7a-4a30-8d52-bfd46aa98fc7", reason: "CDS 'Continuously' — two options equally defensible (lapping waves vs a leaking tap)" },
      { id: "30273487-3b88-4370-a595-fff81eb513b8", reason: "CDS 'verbose' — keyed 'exaggerate'; no option is a synonym, and 'succinct' is the antonym" },
      { id: "6c43498b-0192-446c-bd8a-e7ab02741672", reason: "CDS immanent/imminent — keyed 'Neither', but sentence 1 reads as correct usage; disputed" },
      // Round 2 — the replacements the six above pulled in were verified the same way.
      { id: "99d8c5f0-935e-433f-bcbb-a1e7129361eb", reason: "CDS indirect speech — options (C) and (D) are identical but for a comma after 'co-star'; not answerable on merit" },
      { id: "8f01106f-60fc-4e23-9ea2-1b77ffbab931", reason: "CDS 'We live in ___ an old house' — 'rather' (keyed) and 'quite' both take the article, so two options are correct" },
      { id: "5df0bc48-7d9c-409b-90d7-cf00fee5d17c", reason: "CDS Advice/Advise — (B) uses the noun correctly and (D) the verb; both sentences are correct" },
      // Round 3.
      { id: "a267dd24-b007-48cc-bbe3-844630e0ade7", reason: "CDS 'The country ___ in the past two decades' — keyed past perfect 'had undergone', which needs a past reference point; the required present perfect is not offered ('have been undergoing' also mis-agrees with a singular subject)" },
    ],
  },
];

type Row = {
  id: string;
  chapter_id: string;
  difficulty: Cand["difficulty"];
  question_kind: string;
  visibility: "PUBLIC" | "PRIVATE";
  text: string;
  solution: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

/**
 * Audit the ENGLISH picks against the structural rules before anything is written.
 *
 * Deliberately a SEPARATE query over the ~50 selected ids rather than widening
 * fetchCandidates: that would pull RC passages and join four name tables across
 * every candidate pool on every paper, including the Maths ones that have no
 * English at all. Returns [] when the paper has no English questions.
 */
async function auditEnglishPicks(
  client: SupabaseClient,
  ids: string[]
): Promise<ReturnType<typeof auditEnglishSection>> {
  if (!ids.length) return [];
  const { data, error } = await client
    .from("questions")
    .select("id, difficulty, context, set_id, chapters(name), subtopics(name), subjects(name, exams(name))")
    .in("id", ids);
  if (error) throw new Error(`english audit: ${error.message}`);

  type Q = {
    id: string; difficulty: EnglishRow["difficulty"]; context: string | null; set_id: string | null;
    chapters: { name: string } | null;
    subtopics: { name: string } | null;
    subjects: { name: string; exams: { name: string } | null } | null;
  };
  const byId = new Map((data as unknown as Q[]).map((q) => [q.id, q]));

  // Keep the caller's PRINTED order — the contiguity rules are about position.
  const english: EnglishRow[] = ids
    .map((id) => byId.get(id))
    .filter((q): q is Q => !!q && q.subjects?.name === "English")
    .map((q) => ({
      id: q.id,
      chapter: q.chapters?.name ?? "(none)",
      subtopic: q.subtopics?.name ?? null,
      setId: q.set_id,
      exam: q.subjects?.exams?.name ?? "(none)",
      difficulty: q.difficulty,
      contextLen: (q.context ?? "").length,
    }));
  if (!english.length) return [];

  const setIds = [...new Set(english.map((q) => q.setId).filter((s): s is string => !!s))];
  const sizes = new Map<string, number>();
  for (let i = 0; i < setIds.length; i += 150) {
    const { data: sd, error: se } = await client
      .from("questions").select("set_id").in("set_id", setIds.slice(i, i + 150));
    if (se) throw new Error(`english audit set sizes: ${se.message}`);
    for (const row of (sd ?? []) as { set_id: string | null }[]) {
      if (row.set_id) sizes.set(row.set_id, (sizes.get(row.set_id) ?? 0) + 1);
    }
  }
  return auditEnglishSection(english, sizes);
}

/** The paper's sections in printed order — one synthesised entry for the old single-section shape. */
function sectionsOf(spec: PaperSpec): { key: string; label: string }[] {
  if (spec.sections?.length) return spec.sections;
  if (spec.section) return [spec.section];
  throw new Error(`paper "${spec.slug}" declares neither section nor sections`);
}

/** Which section a chapter files under; unambiguous by construction on a 1-section paper. */
function sectionKeyOf(spec: PaperSpec, ch: ChapterPlan): string {
  const all = sectionsOf(spec);
  if (all.length === 1) return all[0].key;
  if (!ch.sectionKey) {
    throw new Error(`chapter "${ch.label}" needs a sectionKey — "${spec.slug}" has ${all.length} sections`);
  }
  if (!all.some((s) => s.key === ch.sectionKey)) {
    throw new Error(`chapter "${ch.label}" names unknown sectionKey "${ch.sectionKey}"`);
  }
  return ch.sectionKey;
}

type Flag = { id: string; kind: "STRUCT" | "DUP_OPT" | "SOLN≠KEY"; detail: string };

const DEFAULT_SHAPE: Shape = { EASY: 0.2, MODERATE: 0.55, HARD: 0.25 };

/** Objective defects (STRUCT/DUP) vs the advisory SOLN≠KEY signal. */
function auditRows(rows: Row[]): Flag[] {
  const flags: Flag[] = [];
  for (const r of rows) {
    const opts = r.options ?? [];
    const correct = opts.filter((o) => o.is_correct);
    if (opts.length !== 4 || correct.length !== 1) {
      flags.push({ id: r.id, kind: "STRUCT", detail: `${opts.length} options, ${correct.length} correct` });
      continue; // a broken option set makes the other two checks meaningless
    }
    const texts = opts.map((o) => o.text.trim());
    if (new Set(texts).size !== texts.length) {
      flags.push({ id: r.id, kind: "DUP_OPT", detail: "two option texts identical" });
    }
    const concluded = concludedLetter(r.solution);
    const key = correct[0].label.toUpperCase();
    if (concluded && concluded !== key) {
      flags.push({ id: r.id, kind: "SOLN≠KEY", detail: `solution concludes ${concluded}, key is ${key}` });
    }
  }
  return flags;
}

/**
 * Scoped by chapter_id, NOT exam_id: a chapter row belongs to exactly one exam,
 * so the chapter list already pins the exam — and filtering on the PAPER's exam
 * would silently return nothing for a cross-exam chapter (see fromExam).
 */
async function fetchCandidates(client: SupabaseClient, spec: PaperSpec): Promise<Row[]> {
  const rows: Row[] = [];
  const PAGE = 500;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select("id, chapter_id, difficulty, question_kind, visibility, text, solution, options(label, text, is_correct)")
      // PRIVATE rows are fetched only when some chapter opts in, and are filtered
      // back out per chapter below — see ChapterPlan.includePrivate.
      .in("visibility", spec.chapters.some((c) => c.includePrivate) ? ["PUBLIC", "PRIVATE"] : ["PUBLIC"])
      // Union of the paper's kinds and any per-chapter override; narrowed back
      // to the chapter's own kinds during selection.
      .in("question_kind", [...new Set([...spec.kinds, ...spec.chapters.flatMap((c) => c.kinds ?? [])])])
      .in("question_format", spec.formats ?? ["mcq"])
      .in("chapter_id", spec.chapters.map((c) => c.chapterId))
      .order("id", { ascending: true }) // stable paging
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchCandidates: ${error.message}`);
    rows.push(...((data ?? []) as Row[]));
    if (!data || data.length < PAGE) break;
  }
  // A key with no working is not shippable in a teacher's answer key.
  return spec.requireSolution ? rows.filter((r) => (r.solution ?? "").trim() !== "") : rows;
}

/**
 * Every question already sitting in some OTHER paper in this org.
 *
 * `exceptPaperId` is what makes a re-run idempotent: without it, re-running a
 * built paper sees its own 60 questions as "already used", excludes them, and
 * tries to assemble a different paper under the same title.
 */
async function fetchAlreadyUsed(client: SupabaseClient, exceptPaperId: string | null): Promise<Set<string>> {
  const used = new Set<string>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = client
      .from("paper_questions")
      .select("question_id")
      .order("question_id", { ascending: true }) // stable paging — LIMIT/OFFSET without ORDER BY may repeat or skip
      .range(from, from + PAGE - 1);
    if (exceptPaperId) q = q.neq("paper_id", exceptPaperId);
    const { data, error } = await q;
    if (error) throw new Error(`fetchAlreadyUsed: ${error.message}`);
    for (const r of data ?? []) used.add(r.question_id as string);
    if (!data || data.length < PAGE) break;
  }
  return used;
}

/** The org's paper with this title, if it already exists. */
async function findPaperId(client: SupabaseClient, title: string): Promise<string | null> {
  const { data } = await client
    .from("papers").select("id").eq("org_id", ORG_ID).eq("title", title).limit(1).maybeSingle();
  return (data?.id as string | undefined) ?? null;
}

async function findOrCreatePaper(
  client: SupabaseClient,
  spec: PaperSpec,
  countBySection: Map<string, number>
): Promise<string> {
  const existingId = await findPaperId(client, spec.title);
  if (existingId) {
    console.log(`reusing existing paper ${existingId}`);
    return existingId;
  }
  const template: SectionTemplate = sectionsOf(spec).map((s) => ({
    key: s.key,
    label: s.label,
    targetCount: countBySection.get(s.key) ?? 0,
    assignedTo: [],
  }));
  return createPaper(client, {
    orgId: ORG_ID, createdBy: CREATED_BY, title: spec.title, examId: spec.examId, template,
  });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const slug = process.argv[2];
  const spec = PAPERS.find((p) => p.slug === slug);
  if (!spec) throw new Error(`unknown paper "${slug}". Known: ${PAPERS.map((p) => p.slug).join(", ")}`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const existingId = await findPaperId(client, spec.title);
  const all = await fetchCandidates(client, spec);
  const used = await fetchAlreadyUsed(client, existingId);
  const excluded = new Map(spec.exclude.map((e) => [e.id, e.reason]));

  console.log(`\n"${spec.title}"${existingId ? ` (re-run — paper ${existingId} exists)` : ""}`);
  console.log(
    `kinds: ${spec.kinds.join(", ")} · formats: ${(spec.formats ?? ["mcq"]).join(", ")} · PUBLIC only · ` +
      `${all.length} candidates before exclusions\n`
  );

  const flags = auditRows(all);
  const hardFlagged = new Set(flags.filter((f) => f.kind !== "SOLN≠KEY").map((f) => f.id));

  const eligible = all.filter((r) => !excluded.has(r.id) && !used.has(r.id) && !hardFlagged.has(r.id));
  const droppedUsed = all.filter((r) => used.has(r.id)).length;
  console.log(`excluded: ${spec.exclude.length} listed defect(s), ${droppedUsed} already in a paper, ${hardFlagged.size} audit STRUCT/DUP`);
  for (const [id, reason] of excluded) console.log(`  - ${id}  ${reason}`);
  for (const f of flags.filter((x) => x.kind !== "SOLN≠KEY")) console.log(`  - ${f.id}  ${f.kind}: ${f.detail}`);

  // Select per chapter, then interleave into the printed order, section by section.
  const bySection = new Map<string, Cand[][]>(sectionsOf(spec).map((s) => [s.key, []]));
  let shortfallTotal = 0;
  for (const ch of spec.chapters) {
    const pool: Cand[] = eligible
      .filter((r) => r.chapter_id === ch.chapterId)
      // PRIVATE is where this bank keeps flawed/duplicate rows, so a chapter has
      // to opt in explicitly before one can reach a printed paper.
      .filter((r) => r.visibility === "PUBLIC" || ch.includePrivate === true)
      .filter((r) => (ch.kinds ?? spec.kinds).includes(r.question_kind as "pyq" | "practice"))
      .map((r) => ({ id: r.id, chapterId: r.chapter_id, difficulty: r.difficulty }));

    let picked: Cand[];
    let want: string;
    if (ch.quota) {
      const res = selectByQuota(pool, ch.quota);
      picked = res.picked;
      want = `quota ${DIFFICULTIES.map((d) => `${d[0]}${ch.quota![d]}`).join("/")}`;
      for (const [d, n] of Object.entries(res.shortfall)) {
        console.log(`  ⚠  SHORTFALL ${d}: ${n} short — the paper will MISS its difficulty shape`);
        shortfallTotal += n as number;
      }
    } else if (ch.take != null) {
      const res = selectTotal(pool, ch.take, spec.shape ?? DEFAULT_SHAPE);
      picked = res.picked;
      want = `take ${ch.take}`;
      if (res.shortfall > 0) {
        console.log(`  ⚠  SHORTFALL: ${res.shortfall} short — pool too small`);
        shortfallTotal += res.shortfall;
      }
    } else {
      throw new Error(`chapter "${ch.label}" declares neither quota nor take`);
    }

    const fmt = (rows: Cand[]) => DIFFICULTIES.map((d) => `${d[0]}${rows.filter((p) => p.difficulty === d).length}`).join("/");
    const src = ch.fromExam ? ` [${ch.fromExam}]` : "";
    const priv = ch.includePrivate ? " +PRIV" : "";
    console.log(
      `  ${ch.label.padEnd(36)}${(src + priv).padEnd(18)} pool ${String(pool.length).padStart(3)} (${fmt(pool)})` +
        ` · ${want.padEnd(9)} · picked ${String(picked.length).padStart(3)} (${fmt(picked)})`
    );
    bySection.get(sectionKeyOf(spec, ch))!.push(picked);
  }

  const placed = orderPaperBySections(
    sectionsOf(spec).map((s) => ({ key: s.key, groups: bySection.get(s.key)! })),
    spec.layout ?? "interleave"
  );
  const ordered = placed.map((p) => p.cand);
  const byDiff = DIFFICULTIES.map((d) => `${d} ${ordered.filter((q) => q.difficulty === d).length}`).join(" · ");
  console.log(`\nTOTAL ${ordered.length} questions — ${byDiff}`);
  if (sectionsOf(spec).length > 1) {
    for (const s of sectionsOf(spec)) {
      const n = placed.filter((p) => p.sectionKey === s.key).length;
      console.log(`  section "${s.label}": ${n}`);
    }
  }

  const soft = flags.filter((f) => f.kind === "SOLN≠KEY" && ordered.some((o) => o.id === f.id));
  if (soft.length) {
    console.log(`\n⚠  ${soft.length} selected question(s) flagged SOLN≠KEY (advisory — verify before shipping):`);
    for (const f of soft) console.log(`  ${f.id}  ${f.detail}`);
  } else {
    console.log("\nSOLN≠KEY: none among the selected questions.");
  }

  // `--ids` prints the exact selection so it can be reviewed BEFORE the paper is
  // written. It has to come first: addQuestion upserts on (paper_id, question_id),
  // so re-running after adding an exclusion would add the replacement WITHOUT
  // retracting the rejected pick. Selection is deterministic, so this preview is
  // what --apply will write.
  if (process.argv.includes("--ids")) {
    console.log("\nselected ids, in printed order:");
    let n = 0;
    for (const p of placed) {
      const ch = spec.chapters.find((c) => c.chapterId === p.cand.chapterId);
      console.log(
        `  ${String(++n).padStart(3)}. ${p.cand.id}  ${p.sectionKey.padEnd(8)} ` +
          `${p.cand.difficulty.padEnd(8)} ${ch?.label ?? "?"}${ch?.fromExam ? ` [${ch.fromExam}]` : ""}`
      );
    }
  }

  // English structural rules — reported on a dry run, BLOCKING on --apply.
  const engViolations = await auditEnglishPicks(client, ordered.map((q) => q.id));
  if (engViolations.length) {
    const byRule = new Map<string, number>();
    for (const v of engViolations) byRule.set(v.rule, (byRule.get(v.rule) ?? 0) + 1);
    console.log(`\n⚠  ENGLISH STRUCTURE — ${engViolations.length} violation(s):`);
    for (const [rule, n] of [...byRule.entries()].sort()) console.log(`     ${rule} × ${n}`);
    console.log(`   Full detail: npx tsx scripts/bank-paper/audit-english.ts <paperId>`);
    console.log(`   Rules + why each exists: scripts/bank-paper/english.ts`);
  } else if (ordered.length) {
    console.log("\nEnglish structure: OK (or no English questions).");
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to create the paper. Nothing written.");
    return;
  }
  if (engViolations.length) {
    throw new Error(
      `refusing to apply with ${engViolations.length} English structure violation(s) — ` +
        `fix the spec (whole passages, blocks not singletons, one run per subtopic) and re-run.`
    );
  }
  if (shortfallTotal > 0) throw new Error(`refusing to apply with ${shortfallTotal} unmet quota slot(s) — adjust the quotas.`);

  const countBySection = new Map<string, number>();
  for (const p of placed) countBySection.set(p.sectionKey, (countBySection.get(p.sectionKey) ?? 0) + 1);

  const paperId = await findOrCreatePaper(client, spec, countBySection);
  console.log(`\npaper: ${paperId}`);
  let added = 0;
  for (const p of placed) {
    await addQuestion(client, paperId, p.cand.id, { sectionKey: p.sectionKey, addedBy: CREATED_BY });
    added++;
  }
  console.log(`added ${added} questions.\nReview at /dashboard/papers/${paperId}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
