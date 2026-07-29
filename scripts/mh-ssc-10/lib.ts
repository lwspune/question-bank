// Pure helpers for the MH State Board Class-10 BOARD-PYQ pipeline.
// Unit-tested in tests/mh-ssc-10-lib.test.ts. No IO here.
//
// A board PAPER spans many chapters (unlike a textbook chapter file), so each
// transcribed question carries its OWN chapter + subtopic. buildPaperRecords
// validates the CHAPTER against the subject catalog (hard — prevents catch-all
// drift) and treats an off-catalog SUBTOPIC as a soft flag (still committed +
// auto-created), because board PYQs blend topics more than a fixed exercise.
//
// The stateboard core (latexImbalances) is exam-agnostic → re-exported verbatim.
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload, OptionLabel, Difficulty } from "../../src/lib/upload/validate";
export { latexImbalances } from "../stateboard/lib";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";

const LABELS: OptionLabel[] = ["A", "B", "C", "D"];
const DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];

/** One question as transcribed from a rendered board-paper page. */
export type PaperQuestion = {
  /** Human-facing provenance ref → questions.question_number, e.g.
   *  "Q1(A)(i)", "Q2(B)(iii)", "Q4(2)". Must be unique within the paper. */
  ref: string;
  /** 'mcq' → has options + a DERIVED answer; 'subjective' → free-response, no options. */
  format: "mcq" | "subjective";
  /** Which of the paper's subjects this question belongs to. HARD-validated
   *  against the paper's catalogs. Omit on a single-subject paper (Algebra,
   *  Geometry, Science I/II, Geography) — it defaults to the sole subject.
   *  REQUIRED in practice on the Social Sciences papers, which carry TWO
   *  disciplines in one printed paper (Paper I = History Q1-5 + Political
   *  Science Q6-9), because the discipline is not derivable from the chapter
   *  alone. */
  subject?: string;
  chapter: string; // one of THAT subject's catalog chapters (HARD-validated)
  subtopic: string; // canonical subtopic (soft-validated; auto-created)
  difficulty: string; // vision estimate → EASY|MODERATE|HARD
  stem: string; // LaTeX-bearing question text (\(...\) inline math; GFM pipe-tables allowed)
  /** Shared instruction for a set of sub-items — rides on `context`; siblings
   *  share the same `setLabel`. Omit for standalone questions. */
  context?: string;
  setLabel?: string;
  /** MCQ only: exactly A,B,C,D. */
  options?: { label: string; text: string }[];
  /** MCQ only: the DERIVED correct letter A/B/C/D. Absent → flagged, kept with
   *  no correct option (stays PRIVATE until answered). */
  answer?: string;
  /** Authored model answer (subjective) or derivation (mcq). REVIEW-flagged. */
  solution?: string;
  /** Answer/solution is AI-derived, awaiting human spot-check. Metadata only —
   *  the durable record lives in the committed data JSON, not a DB column. */
  reviewFlag?: boolean;
  /** The question shows/needs a figure (Geometry triangle/circle; Science
   *  apparatus/electron-dot). Metadata for the snapCrop figure-attach pass —
   *  ignored by buildPaperRecords. `figureNote` describes what to crop. */
  hasFigure?: boolean;
  figureNote?: string;
};

export type Flag = { ref: string; reason: string };
export type BuildResult = { rows: ParsedRowPayload[]; flags: Flag[] };

export type PaperCatalog = {
  subjectName: string;
  chapters: Record<string, string[]>; // chapter → canonical subtopics
};

function normalizeMcqOptions(q: PaperQuestion): { label: OptionLabel; text: string }[] {
  const opts = q.options ?? [];
  const byLabel = new Map(opts.map((o) => [o.label.trim().toUpperCase(), o.text]));
  if (opts.length !== 4 || !LABELS.every((l) => byLabel.has(l))) {
    throw new Error(`${q.ref}: MCQ options must be exactly A,B,C,D (got ${opts.map((o) => o.label).join(",") || "none"})`);
  }
  return LABELS.map((l) => ({ label: l, text: byLabel.get(l) as string }));
}

/**
 * Merge transcribed board-paper questions into commit-ready rows. Hard errors
 * (unknown subject / unknown chapter / bad options / bad difficulty / answer
 * with no matching option / a subjective question carrying options / duplicate
 * ref) throw — they mean a transcription mistake to fix. Soft conditions become
 * flags (off-catalog subtopic; an MCQ with no derived answer; a REVIEW-flagged
 * answer).
 *
 * `catalogs` is either a single PaperCatalog (single-subject paper — the
 * original behaviour, unchanged) or an ORDERED list for a paper that carries
 * more than one discipline, in which case the FIRST entry is the default for
 * questions that omit `subject`. A question's chapter is validated against its
 * OWN subject's catalog, never the union — naming a History chapter under
 * Political Science must fail, not silently pass because some catalog has it.
 */
export function buildPaperRecords(
  catalogs: PaperCatalog | PaperCatalog[],
  questions: PaperQuestion[],
): BuildResult {
  const list = Array.isArray(catalogs) ? catalogs : [catalogs];
  if (list.length === 0) throw new Error("buildPaperRecords: no catalog supplied");
  const bySubject = new Map(list.map((c) => [c.subjectName, c]));
  const defaultSubject = list[0].subjectName;

  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];
  const seenRefs = new Set<string>();

  let sourceRow = 0;
  for (const q of questions) {
    sourceRow++;
    if (seenRefs.has(q.ref)) throw new Error(`duplicate ref "${q.ref}"`);
    seenRefs.add(q.ref);

    const subjectName = q.subject?.trim() || defaultSubject;
    const catalog = bySubject.get(subjectName);
    if (!catalog) {
      throw new Error(`${q.ref}: subject "${subjectName}" not carried by this paper [${[...bySubject.keys()].join(", ")}]`);
    }

    const subtopics = catalog.chapters[q.chapter];
    if (!subtopics) {
      throw new Error(`${q.ref}: chapter "${q.chapter}" not in the ${catalog.subjectName} catalog [${Object.keys(catalog.chapters).join(", ")}]`);
    }
    if (!q.subtopic || !q.subtopic.trim()) {
      throw new Error(`${q.ref}: missing subtopic`);
    }
    if (!subtopics.includes(q.subtopic)) {
      flags.push({ ref: q.ref, reason: `off-catalog subtopic "${q.subtopic}" for chapter "${q.chapter}" (committed + auto-created; canonicalise later)` });
    }
    const difficulty = q.difficulty.trim().toUpperCase() as Difficulty;
    if (!DIFFICULTIES.includes(difficulty)) {
      throw new Error(`${q.ref}: difficulty "${q.difficulty}" not EASY|MODERATE|HARD`);
    }
    if (q.reviewFlag) {
      flags.push({ ref: q.ref, reason: "answer/solution AI-derived — REVIEW-flagged, awaiting human spot-check" });
    }

    // Normalise long-form fields ONCE, before both the payload and the hash, so
    // stored text == the hash's preimage. commitStaged REJECTS a literal
    // backslash-n rather than repairing it, precisely to keep that invariant.
    // Math zones are masked, so LaTeX commands like \neq / \nabla / \nu are
    // untouched.
    const stem = normalizeNewlines(q.stem);
    const ctx = q.context ? normalizeNewlines(q.context) : q.context;
    const sol = q.solution ? normalizeNewlines(q.solution) : q.solution;

    const base = {
      sourceRow,
      questionNumber: q.ref,
      subjectName,
      chapterName: q.chapter,
      subtopicName: q.subtopic,
      context: ctx,
      setLabel: q.setLabel,
      text: stem,
      difficulty,
      solution: sol ?? undefined,
    };

    if (q.format === "subjective") {
      if (q.options && q.options.length > 0) {
        throw new Error(`${q.ref}: subjective question must not carry options`);
      }
      rows.push({
        ...base,
        questionFormat: "subjective",
        options: [],
        contentHash: subjectiveContentHash(stem, ctx ?? null),
      });
      continue;
    }

    // MCQ
    const opts = normalizeMcqOptions(q);
    const answer = q.answer?.trim().toUpperCase();
    if (answer && !LABELS.includes(answer as OptionLabel)) {
      throw new Error(`${q.ref}: answer "${q.answer}" invalid (must be A/B/C/D)`);
    }
    const options = opts.map((o) => ({ ...o, isCorrect: !!answer && o.label === answer }));
    if (!answer) {
      flags.push({ ref: q.ref, reason: "MCQ has no derived answer — kept PRIVATE, no correct option set" });
    } else if (!options.some((o) => o.isCorrect)) {
      throw new Error(`${q.ref}: answer ${answer} matched no option`);
    }

    rows.push({
      ...base,
      questionFormat: "mcq",
      options,
      contentHash: contentHash(stem, options.map((o) => o.text), answer ?? ""),
    });
  }

  return { rows, flags };
}
