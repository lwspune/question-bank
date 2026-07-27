// Pure helpers for the Maharashtra State Board textbook ingestion pipeline.
// Unit-tested in tests/stateboard-lib.test.ts. No IO here.
//
// State Board chapters mix MCQ and SUBJECTIVE (free-response) questions, and the
// textbook groups many exercise questions as one instruction (`Q.1`) with sub-
// items (`i) ii) iii)`). We model that with the bank-native SET model: the
// shared instruction goes in `context`, each sub-item is its own row, and
// siblings share a `setLabel` (commit turns it into a set_id).
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { findLatexImbalance } from "../practice/lib";
import type { ParsedRowPayload, OptionLabel, Difficulty } from "../../src/lib/upload/validate";

const LABELS: OptionLabel[] = ["A", "B", "C", "D"];
const DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];

/** Which part of the textbook a question came from. Drives the PUBLIC flip:
 *  only `solved` (worked examples with the book's authoritative solution) ship
 *  PUBLIC in the first pass; exercises stay PRIVATE pending answer work. */
export type Bucket = "solved" | "exercise-mcq" | "exercise-subjective";

/** One question as transcribed from the rendered textbook pages. */
export type SBQuestion = {
  /** Human-facing provenance ref → questions.question_number, e.g. "Solved Ex.2",
   *  "Ex 1.1 Q.1 (iii)", "Misc I (iv)". Must be unique within the chapter. */
  ref: string;
  bucket: Bucket;
  /** 'mcq' → has options (+ derived answer); 'subjective' → free-response, no options. */
  format: "mcq" | "subjective";
  subtopic: string; // one of the chapter's canonical DB subtopics
  difficulty: string; // vision estimate, validated to EASY|MODERATE|HARD
  stem: string; // LaTeX-bearing question text (\(...\) inline math; GFM pipe-tables allowed)
  /** Shared instruction for a set of sub-items — rides on `context`; siblings
   *  share the same `setLabel`. Omit for standalone questions. */
  context?: string;
  setLabel?: string;
  /** MCQ only: exactly A,B,C,D. */
  options?: { label: string; text: string }[];
  /** MCQ only: the (derived) correct letter A/B/C/D. Absent → flagged, row kept
   *  with no correct option (stays PRIVATE until answered). */
  answer?: string;
  /** solved: the book's model answer/solution (may contain GFM pipe-tables for
   *  truth tables). exercise-subjective: usually absent (answer pending). */
  solution?: string;
};

export type Flag = { ref: string; reason: string };
export type BuildResult = { rows: ParsedRowPayload[]; flags: Flag[] };

export type BuildChapter = {
  chapterName: string;
  subjectName: string;
  subtopics: string[];
};

function normalizeMcqOptions(q: SBQuestion): { label: OptionLabel; text: string }[] {
  const opts = q.options ?? [];
  const byLabel = new Map(opts.map((o) => [o.label.trim().toUpperCase(), o.text]));
  if (opts.length !== 4 || !LABELS.every((l) => byLabel.has(l))) {
    throw new Error(`${q.ref}: MCQ options must be exactly A,B,C,D (got ${opts.map((o) => o.label).join(",") || "none"})`);
  }
  return LABELS.map((l) => ({ label: l, text: byLabel.get(l) as string }));
}

/**
 * Merge transcribed questions into commit-ready rows. Hard errors (bad options /
 * unknown subtopic / bad difficulty / answer with no matching option / a
 * subjective question carrying options) throw — they mean a transcription
 * mistake to fix. Soft conditions become flags (an MCQ with no derived answer;
 * a solved example with no solution).
 */
export function buildRecords(chapter: BuildChapter, questions: SBQuestion[]): BuildResult {
  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];
  const subtopicSet = new Set(chapter.subtopics);
  const seenRefs = new Set<string>();

  let sourceRow = 0;
  for (const q of questions) {
    sourceRow++;
    if (seenRefs.has(q.ref)) throw new Error(`duplicate ref "${q.ref}"`);
    seenRefs.add(q.ref);

    if (!subtopicSet.has(q.subtopic)) {
      throw new Error(`${q.ref}: subtopic "${q.subtopic}" not one of [${chapter.subtopics.join(", ")}]`);
    }
    const difficulty = q.difficulty.trim().toUpperCase() as Difficulty;
    if (!DIFFICULTIES.includes(difficulty)) {
      throw new Error(`${q.ref}: difficulty "${q.difficulty}" not EASY|MODERATE|HARD`);
    }

    // Normalise the long-form fields ONCE, before both the payload and the hash,
    // so the stored text is always the hash's preimage. An agent-written JSON
    // that double-escaped its newlines otherwise ships a literal two-char `\n`
    // that silently kills GFM pipe-tables on the website AND in the Word export
    // — and `commitStaged` now rejects such rows outright rather than repairing
    // them at insert (repairing there would break exactly that text==preimage
    // invariant). Math zones are masked, so `\neq`/`\nabla`/`\nu` are untouched.
    const stem = normalizeNewlines(q.stem);
    const ctx = q.context ? normalizeNewlines(q.context) : q.context;
    const sol = q.solution ? normalizeNewlines(q.solution) : q.solution;

    const base = {
      sourceRow,
      questionNumber: q.ref,
      subjectName: chapter.subjectName,
      chapterName: chapter.chapterName,
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
      if (q.bucket === "solved" && !q.solution) {
        flags.push({ ref: q.ref, reason: "solved example has no solution — should carry the book's answer" });
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

// ── Book-faithful section structure (the /board reader) ──────────────────────
//
// /board renders a chapter the way the book is laid out: each numbered section
// (2.1, 2.2, …) shows its Solved Examples then its Exercise, and the chapter
// ends with the Miscellaneous Exercise. That axis is ORTHOGONAL to the
// conceptual `subtopic` (a single book Exercise is split across subtopics), so
// it can't be derived from subtopic — and the `question_number`/`ref` strings
// are too inconsistent across chapters to parse reliably (`2.1 Ex 2.1 Q.1` vs
// `6.4 Exercise 6.3` vs `7.1 Feasible Ex.1`). So each chapter carries an authored,
// PDF-verified `sections[]` outline (the book's table of contents, in reading
// order); `assignSections` maps every question's ref into a block. Going forward
// the transcription agents emit this outline natively — same shape, captured at
// ingest. migration 0043 = the section_kind/group/label/seq columns.

export type SectionKind = "solved_example" | "exercise" | "miscellaneous";

/** One book block (a section's Solved Examples, an Exercise, or a Miscellaneous
 *  sub-block), listed in book reading order. A question belongs to this block
 *  when its `ref` starts with any string in `refPrefixes`. */
export type SectionSpec = {
  /** Book-section header that owns the /board group, e.g. "2.1 Elementary
   *  Transformations of a Matrix" or "Miscellaneous Exercise 2". */
  group: string;
  /** Sub-block heading, e.g. "Exercise 2.1", "Solved Examples", "Multiple
   *  Choice Questions". */
  label: string;
  kind: SectionKind;
  /** Ref prefixes routed to this block. Longest matching prefix wins, so a
   *  broader block ("2.2 ") and a narrower one can coexist. */
  refPrefixes: string[];
};

export type SectionAssignment = {
  ref: string;
  sectionKind: SectionKind;
  sectionGroup: string;
  sectionLabel: string;
  sectionSeq: number; // 1-based block position in book order (= index in specs)
};

export type AssignSectionsResult = {
  assignments: SectionAssignment[];
  /** Refs that matched no spec — must be resolved (never silently bucketed). */
  unmatched: string[];
  /** Refs whose matched block kind contradicts the transcription bucket
   *  (solved_example ⟺ bucket 'solved'); a manifest-vs-transcription mismatch. */
  mismatches: { ref: string; reason: string }[];
  /** Specs that matched zero questions — a stale/typo'd outline entry. */
  emptySpecs: string[];
};

function bucketMatchesKind(bucket: Bucket, kind: SectionKind): boolean {
  return kind === "solved_example" ? bucket === "solved" : bucket !== "solved";
}

/**
 * Map each transcribed question onto its book block via the chapter's authored
 * `sections[]` outline. Pure. `sectionSeq` is the block's 1-based position in
 * the outline (= book reading order); question order WITHIN a block stays
 * source_row. Longest-matching-prefix wins so overlapping prefixes are safe.
 */
export function assignSections(
  items: { ref: string; bucket: Bucket }[],
  specs: SectionSpec[]
): AssignSectionsResult {
  const assignments: SectionAssignment[] = [];
  const unmatched: string[] = [];
  const mismatches: { ref: string; reason: string }[] = [];
  const usedSpec = new Set<number>();

  for (const { ref, bucket } of items) {
    let best = -1;
    let bestLen = -1;
    specs.forEach((spec, i) => {
      for (const prefix of spec.refPrefixes) {
        if (ref.startsWith(prefix) && prefix.length > bestLen) {
          best = i;
          bestLen = prefix.length;
        }
      }
    });
    if (best < 0) {
      unmatched.push(ref);
      continue;
    }
    usedSpec.add(best);
    const spec = specs[best];
    if (!bucketMatchesKind(bucket, spec.kind)) {
      mismatches.push({
        ref,
        reason: `bucket '${bucket}' does not match block kind '${spec.kind}' ("${spec.label}")`,
      });
    }
    assignments.push({
      ref,
      sectionKind: spec.kind,
      sectionGroup: spec.group,
      sectionLabel: spec.label,
      sectionSeq: best + 1,
    });
  }

  const emptySpecs = specs
    .map((s, i) => (usedSpec.has(i) ? null : `${s.group} — ${s.label}`))
    .filter((s): s is string => s !== null);

  return { assignments, unmatched, mismatches, emptySpecs };
}

/** Collect LaTeX-delimiter imbalances across every text field of every row —
 *  a pre-commit guard against transcription typos before they hit the renderer. */
export function latexImbalances(rows: ParsedRowPayload[]): string[] {
  const out: string[] = [];
  for (const r of rows) {
    const fields: [string, string | undefined][] = [
      ["stem", r.text],
      ["context", r.context],
      ["solution", r.solution],
      ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string]),
    ];
    for (const [name, val] of fields) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) out.push(`${r.questionNumber} ${name}: ${bad}`);
    }
  }
  return out;
}
