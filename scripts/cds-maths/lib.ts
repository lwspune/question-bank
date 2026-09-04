// Pure assembly + validation for CDS Elementary Mathematics ingestion — no I/O,
// TDD in tests/cds-maths-lib.test.ts.
//
// Inputs (per paper, produced by the agent passes documented in README.md):
//   bands[]       — transcription, one file per page band: stem + options + taxonomy, NO answer
//   derivations[] — TWO independent blind passes, each: answer letter + the answer's VALUE
//
// RELATIONSHIP TO THE SIBLING CDS PIPELINES. The function bodies here are
// faithful to `scripts/cds-gs/lib.ts`, which is proven over 19 papers, and the
// three places they DIVERGE are the three places this paper is a different
// animal. They are written out rather than imported because each divergence
// changes a TYPE, so a re-export would not have type-checked:
//
//   1. ONE SUBJECT. Every row is Mathematics, so `TQ` has no `subject` field and
//      the catalog is chapter -> subtopic[], not subject -> chapter -> subtopic[].
//   2. SETS. A `Directions:` / "for the next three (03) items" block puts shared
//      stimulus above several questions, so `TQ` carries `context` + `setLabel`
//      and the merge fingerprint INCLUDES context — two bands reading one
//      Directions block differently is exactly the disagreement worth catching,
//      and a stem-only fingerprint is blind to it.
//   3. FIGURES. Geometry and DI questions are unanswerable without their
//      diagram, so `TQ` carries `hasFigure` + `figureNote`. See the note on
//      `figureNote` below: it is deliberately NOT part of the stem.
import type { RawRow } from "../../src/lib/upload/validate";
import type { Catalog } from "./config";

export type Option = { label: string; text: string };

export type TQ = {
  number: number;
  /**
   * Shared stimulus for a `Directions:` set, repeated verbatim on every member.
   * The renderer and the docx exporter both group a set by ADJACENCY, so members
   * must stay contiguous in `sourceRow` order.
   */
  context?: string;
  setLabel?: string;
  stem: string;
  options: Option[];
  chapter: string;
  subtopic?: string;
  difficulty: string;
  /**
   * True where the printed question depends on a diagram, chart or table image.
   * The crop is attached AFTER commit (the NEET / mh-sb-9 snapCrop path); this
   * flag is what builds that manifest.
   */
  hasFigure?: boolean;
  /**
   * What the figure shows, for the crop operator ONLY. It is NEVER concatenated
   * into the stem: on a geometry item the figure IS the question, and a prose
   * description hands the reader the measurement step the question exists to
   * test. That defect shipped once already on a State Board physics graph item
   * and had to be repaired by delete-and-re-commit.
   */
  figureNote?: string;
  flags?: string[];
};

export type Band = {
  band: string;
  pages: number[];
  bandReport: {
    numbersFound: number[];
    firstComplete: boolean;
    lastComplete: boolean;
    notes: string;
  };
  questions: TQ[];
};

/**
 * One blind derivation of one question.
 *
 * `value` is MANDATORY and is not decoration: comparing two passes by LETTER
 * alone throws away the information that tells a genuine disagreement apart from
 * two labels sitting on the same fact. On the Worksheets corpus that distinction
 * was the difference between a real wrong key and a "twin" — the correct answer
 * printed twice — and the two need opposite repairs.
 */
export type Derivation = {
  number: number;
  answer: string; // A|B|C|D
  value: string; // the answer's content in plain terms
  confidence: string; // HIGH|MED|LOW
  /**
   * REVIEWER EVIDENCE. The brief requires this to name the runner-up on a MED
   * item and say what would flip it, which is what the crosstab prints on a
   * disputed row so a human can adjudicate. It is NOT student-facing prose.
   */
  reasoning: string;
  /**
   * STUDENT-FACING solution, optional. When present it is what ships; when
   * absent `reasoning` ships instead.
   *
   * The two exist separately because they have different audiences and one
   * field cannot serve both. Piping `reasoning` straight through put reviewer
   * jargon in front of students on 161 published rows ("RUNNER-UP: option C,
   * if ...", "Verified with sympy") and left 328 more answering a typeset stem
   * in bare ASCII ("sin alpha equals -2"). Overwriting `reasoning` to fix that
   * would have destroyed the adjudication record -- the runner-up note is the
   * most useful thing the derivation protocol produces -- so the student text
   * is ADDITIVE and the evidence is kept.
   */
  solution?: string;
};

export type Verdict = "AGREE" | "TWIN" | "DISPUTE" | "MISSING";
export type CrosstabRow = {
  number: number;
  verdict: Verdict;
  a?: Derivation;
  b?: Derivation;
  note?: string;
};

const DIFFICULTIES = ["EASY", "MODERATE", "HARD"];
const DIFF_SYNONYMS: Record<string, string> = {
  easy: "EASY",
  moderate: "MODERATE",
  medium: "MODERATE",
  hard: "HARD",
};

/**
 * Self-heal the recurring transcription-agent output quirks BEFORE anything
 * downstream sees them — object-form `options` instead of a labelled array, and
 * difficulty synonyms / casing. Ported from the CDS English pipeline, where both
 * quirks recurred often enough to be worth absorbing rather than re-reporting.
 */
export function normalizeQuestions(raw: unknown[]): TQ[] {
  return (raw as Record<string, unknown>[]).map((q) => {
    let options = q.options as unknown;
    if (options && !Array.isArray(options) && typeof options === "object") {
      options = Object.entries(options as Record<string, unknown>).map(([label, v]) => ({
        label,
        text: typeof v === "string" ? v : ((v as { text?: string })?.text ?? ""),
      }));
    }
    options = ((options as Option[]) ?? []).map((o) => ({
      label: String(o?.label ?? "").trim().toUpperCase(),
      text: String(o?.text ?? ""),
    }));

    const d = String(q.difficulty ?? "").trim();
    const difficulty = DIFFICULTIES.includes(d.toUpperCase())
      ? d.toUpperCase()
      : (DIFF_SYNONYMS[d.toLowerCase()] ?? "MODERATE");

    // `flags` is documented as an array and an agent will sometimes write a bare
    // string. Left alone that is not a cosmetic difference: every consumer
    // iterates it, and iterating a string yields one CHARACTER per entry — which
    // printed a 40-line-per-character flag report on this pipeline's first real
    // merge before it was absorbed here.
    const flags =
      q.flags === undefined || q.flags === null
        ? undefined
        : Array.isArray(q.flags)
          ? (q.flags as unknown[]).map(String)
          : [String(q.flags)];

    return { ...(q as object), options, difficulty, ...(flags ? { flags } : {}) } as TQ;
  });
}

/** Balanced inline-math delimiters across a field. */
export function findLatexImbalance(s: string): string | null {
  const open = (s.match(/\\\(/g) || []).length;
  const close = (s.match(/\\\)/g) || []).length;
  if (open !== close) return `unbalanced \\( (${open}) vs \\) (${close})`;
  return null;
}

/** Whitespace-insensitive, case-insensitive comparison — for equality checks only. */
// CASE-SENSITIVE on purpose. In a maths corpus the case IS the variable:
// `H tan(gamma) - h tan(beta)` and `h tan(gamma) - H tan(beta)` are different
// options, and lowercasing collapses them. That mattered in three places at
// once — the duplicate-option check, the band-disagreement fingerprint, and
// crosstab TWIN detection, where it could silently dismiss a genuine DISPUTE
// between two blind passes as "the same answer at two letters".
const norm = (s: string) => (s ?? "").replace(/\s+/g, " ").trim();

/**
 * A question's identity for the purposes of "are these two readings the same?".
 * Includes CONTEXT: a Directions block is shared stimulus that two bands can
 * legitimately both transcribe, and two different readings of one data table is
 * precisely the disagreement this exists to surface.
 */
function fingerprint(q: TQ): string {
  return [norm(q.context ?? ""), norm(q.stem), ...q.options.map((o) => `${o.label}=${norm(o.text)}`)].join("\u0000");
}

/**
 * Merge the per-band transcription files into one question list.
 *
 * Bands are cut at question boundaries but are told to report on territory they
 * do NOT own, so a question legitimately appears in two files. That is safe only
 * while the two copies AGREE. When they disagree, two agents read the same page
 * differently — a FINDING, not a duplicate to be resolved by whichever file the
 * filesystem happened to list last. So this refuses, naming both bands.
 *
 * Option ORDER is part of the comparison, not just the stem: a swapped label is
 * exactly the defect that survives every downstream check.
 */
export function mergeBands(bands: Band[]): { questions: TQ[]; errors: string[] } {
  const errors: string[] = [];
  const byNumber = new Map<number, { q: TQ; band: string }>();

  for (const b of bands) {
    for (const q of b.questions) {
      const prev = byNumber.get(q.number);
      if (!prev) {
        byNumber.set(q.number, { q, band: b.band });
        continue;
      }
      if (fingerprint(prev.q) !== fingerprint(q)) {
        errors.push(
          `Q${q.number}: bands ${prev.band} and ${b.band} disagree on this question — ` +
            `two readings of one page. Resolve against the page; do not pick one.`
        );
      }
    }
  }

  const questions = [...byNumber.values()].map((v) => v.q).sort((a, b) => a.number - b.number);
  return { questions, errors };
}

/**
 * Hard-validate chapter against the catalog; soft-flag subtopic.
 *
 * Hard, because `commitStaged` will not do it: it refuses an unknown SUBJECT but
 * AUTO-CREATES an unknown chapter or subtopic. That auto-create is how a taxonomy
 * fragments — one agent's "Time and Work" becomes a second chapter beside
 * "Time, Work and Wages" and splits the corpus with no error anywhere.
 *
 * Subtopic is SOFT because the catalog is seeded and extended in rounds: an
 * unlisted subtopic on an early paper is usually a real gap to add, not a typo
 * to reject, and failing the merge on it would stall the extension pass that is
 * supposed to find them.
 */
export function validateCatalog(
  questions: TQ[],
  cat: Catalog
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const chapters = Object.keys(cat);

  for (const q of questions) {
    const subtopics = cat[q.chapter];
    if (!subtopics) {
      errors.push(
        `Q${q.number}: unknown chapter "${q.chapter}" (known: ${chapters.length} chapters, see catalog.json)`
      );
      continue;
    }
    if (q.subtopic && !subtopics.includes(q.subtopic)) {
      warnings.push(
        `Q${q.number}: subtopic "${q.subtopic}" is not listed under "${q.chapter}"`
      );
    }
  }
  return { errors, warnings };
}

/**
 * Compare two independent blind derivation passes.
 *
 * TWIN is the case worth naming. When the two passes name different LETTERS but
 * the option text at those letters is equivalent, the paper printed its answer
 * twice — the disagreement is in the page, not in the derivations, and the repair
 * is to the option text, never to the answer. Letting that reach adjudication as
 * a DISPUTE buries the real disagreements in noise.
 */
/**
 * Accept `why` as an alias for `reasoning` on a derivation row.
 *
 * The brief names the field `reasoning` and that stays authoritative -- this is
 * NOT a second supported spelling to write to. It exists because a dispatch
 * prompt once said `why` while the brief said `reasoning`, and the cost of that
 * mismatch is badly asymmetric: the crosstab prints the justification only on
 * DISPUTED rows, i.e. exactly where a human is deciding, and `buildRecords`
 * puts it into the STORED SOLUTION. So a mismatch either blanks the evidence at
 * the one moment it is read, or throws mid-commit. Normalising on read makes it
 * a non-event instead. A row carrying neither key is still left undefined and
 * will fail loudly downstream, which is the correct outcome.
 */
export function normalizeDerivations<T>(rows: T[]): T[] {
  return (rows ?? []).map((r) => {
    const row = r as unknown as { reasoning?: string; why?: string };
    if (!row.reasoning && typeof row.why === "string") {
      return { ...row, reasoning: row.why } as unknown as T;
    }
    return r;
  });
}

export function crosstab(
  passA: Derivation[],
  passB: Derivation[],
  questions: TQ[]
): CrosstabRow[] {
  const a = new Map(passA.map((d) => [d.number, d]));
  const b = new Map(passB.map((d) => [d.number, d]));
  const qs = new Map(questions.map((q) => [q.number, q]));

  return [...qs.keys()]
    .sort((x, y) => x - y)
    .map((n) => {
      const da = a.get(n);
      const db = b.get(n);
      if (!da || !db) {
        const which = !da && !db ? "both passes" : !da ? "pass A" : "pass B";
        return { number: n, verdict: "MISSING" as const, a: da, b: db, note: `no derivation from ${which}` };
      }
      if (da.answer.toUpperCase() === db.answer.toUpperCase()) {
        return { number: n, verdict: "AGREE" as const, a: da, b: db };
      }
      const q = qs.get(n)!;
      const textOf = (label: string) => q.options.find((o) => o.label === label.toUpperCase())?.text ?? "";
      const ta = textOf(da.answer);
      const tb = textOf(db.answer);
      if (ta && tb && norm(ta) === norm(tb)) {
        return {
          number: n,
          verdict: "TWIN" as const,
          a: da,
          b: db,
          note: `options ${da.answer} and ${db.answer} carry the same text — repair the option, not the answer`,
        };
      }
      return { number: n, verdict: "DISPUTE" as const, a: da, b: db };
    });
}


/**
 * Assemble bank rows. A question with no derivation is DROPPED, not defaulted —
 * an answer nobody derived must not be invented at assembly time, and the
 * coverage gate below turns the omission into a loud "missing Qn".
 */
export function buildRecords(
  questions: TQ[],
  derivations: Derivation[],
  opts: { reconciled?: Set<number>; keyed?: boolean } = {}
): RawRow[] {
  const byNumber = new Map(derivations.map((d) => [d.number, d]));
  const rows: RawRow[] = [];

  for (const q of questions) {
    const d = byNumber.get(q.number);
    if (!d) continue;
    const opt = (l: string) => q.options.find((o) => o.label === l)?.text ?? "";
    const agreed = !opts.reconciled?.has(q.number);
    rows.push({
      sourceRow: q.number,
      questionNumber: String(q.number),
      subject: "Mathematics",
      chapter: q.chapter,
      subtopic: q.subtopic,
      ...(q.context ? { context: q.context } : {}),
      ...(q.setLabel ? { setLabel: q.setLabel } : {}),
      question: q.stem,
      optionA: opt("A"),
      optionB: opt("B"),
      optionC: opt("C"),
      optionD: opt("D"),
      answer: d.answer.toUpperCase(),
      difficulty: q.difficulty,
      // Student text when authored, reviewer evidence otherwise. See Derivation.
      solution: (d.solution ?? d.reasoning).trim(),
    });
  }
  return rows;
}

/** A GFM pipe table needs a `|---|---|` separator, or the renderer prints literal pipes. */
function findTableWithoutSeparator(s: string): string | null {
  const lines = s.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const looksLikeRow = /^\s*\|.*\|\s*$/.test(lines[i]);
    if (!looksLikeRow) continue;
    const next = lines[i + 1] ?? "";
    if (/^\s*\|[\s:-]*-[\s:|-]*\|\s*$/.test(next)) return null; // a real table starts here
    if (/^\s*\|.*\|\s*$/.test(next)) {
      return "pipe rows with no |---|---| separator row — renders as literal pipes";
    }
  }
  return null;
}

/** Coverage + structural + collision checks over the assembled rows. */
export function validateRows(rows: RawRow[], qFrom: number, qTo: number): string[] {
  const errs: string[] = [];
  const nums = new Set(rows.map((r) => Number(r.questionNumber)));
  for (let n = qFrom; n <= qTo; n++) if (!nums.has(n)) errs.push(`missing Q${n}`);

  const seen = new Map<string, number>();
  for (const r of rows) {
    const opts = [r.optionA, r.optionB, r.optionC, r.optionD];
    if (opts.some((o) => !o || !o.trim())) errs.push(`Q${r.questionNumber}: blank option`);
    if (!["A", "B", "C", "D"].includes((r.answer || "").toUpperCase())) {
      errs.push(`Q${r.questionNumber}: bad answer "${r.answer}"`);
    }

    // Duplicate option text makes the answer ambiguous as a LETTER even when it is
    // unambiguous as fact — the defect class that produced 19 wrong keys on the
    // sibling CDS English corpus. Never repair by moving the answer.
    const normed = opts.map((o) => norm(o || ""));
    for (let i = 0; i < normed.length; i++) {
      for (let j = i + 1; j < normed.length; j++) {
        if (normed[i] && normed[i] === normed[j]) {
          errs.push(
            `Q${r.questionNumber}: duplicate option text at ${"ABCD"[i]} and ${"ABCD"[j]} — check the page`
          );
        }
      }
    }

    const fields: [string, string | undefined][] = [
      ["stem", r.question],
      ["context", r.context],
      ["A", r.optionA],
      ["B", r.optionB],
      ["C", r.optionC],
      ["D", r.optionD],
      ["solution", r.solution],
    ];
    for (const [name, val] of fields) {
      if (!val) continue;
      const bad = findLatexImbalance(val);
      if (bad) errs.push(`Q${r.questionNumber} ${name}: ${bad}`);
      const table = findTableWithoutSeparator(val);
      if (table) errs.push(`Q${r.questionNumber} ${name}: ${table}`);
    }

    // content_hash for an MCQ is stem + sorted options + answer and EXCLUDES
    // context — so two members of one Directions set whose stems happen to match
    // collide and one is SILENTLY DROPPED at commit. On a maths paper the usual
    // culprit is a set whose items differ only in the shared stimulus.
    const key = [norm(r.question), ...opts.map((o) => norm(o || "")).sort(), r.answer].join("\n");
    if (seen.has(key)) {
      errs.push(
        `Q${r.questionNumber}: content_hash collision with Q${seen.get(key)} — ` +
          `context is NOT hashed, so fold the question-specific stimulus into the stem`
      );
    }
    seen.set(key, Number(r.questionNumber));
  }
  return errs;
}

/**
 * Set members must be CONTIGUOUS in question order: both the /browse renderer and
 * the docx exporter group a shared context by ADJACENCY, so a set split by an
 * unrelated question prints its stimulus twice and reads as two broken sets.
 */
export function validateSets(questions: TQ[]): string[] {
  const errs: string[] = [];
  const bySet = new Map<string, number[]>();
  for (const q of questions) {
    if (!q.setLabel) continue;
    if (!bySet.has(q.setLabel)) bySet.set(q.setLabel, []);
    bySet.get(q.setLabel)!.push(q.number);
  }
  for (const [label, nums] of bySet) {
    const sorted = [...nums].sort((a, b) => a - b);
    const span = sorted[sorted.length - 1] - sorted[0] + 1;
    if (span !== sorted.length) {
      errs.push(`set "${label}": members ${sorted.join(", ")} are not contiguous — a set must not be interrupted`);
    }
    const contexts = new Set(
      questions.filter((q) => q.setLabel === label).map((q) => norm(q.context ?? ""))
    );
    if (contexts.size !== 1) {
      errs.push(`set "${label}": members carry ${contexts.size} different context values — they must be identical`);
    }
    if ([...contexts][0] === "") {
      errs.push(`set "${label}": members carry no context — a set label with no shared stimulus is meaningless`);
    }
  }
  return errs;
}
