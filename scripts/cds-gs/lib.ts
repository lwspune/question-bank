// Pure assembly + validation for CDS General Knowledge ingestion — no I/O, TDD in
// tests/cds-gs-lib.test.ts.
//
// Inputs (per paper, produced by the agent passes documented in README.md):
//   bands[]       — transcription, one file per page band: stem + options + taxonomy, NO answer
//   derivations[] — TWO independent blind passes, each: answer letter + the answer's VALUE
//
// Output: RawRow[] (the shape commitStaged consumes), with the derived answer and its
// provenance in `solution`.
//
// What this pipeline deliberately does NOT have, versus the sibling CDS English one:
// no sections, no `Directions:` context, no shared passages, no underlines, no set labels.
// A GK paper is 120 standalone MCQs. See config.ts's header.
import type { RawRow } from "../../src/lib/upload/validate";
import type { Catalog } from "./config";

export type Option = { label: string; text: string };

export type TQ = {
  number: number;
  stem: string;
  options: Option[];
  subject: string;
  chapter: string;
  subtopic?: string;
  difficulty: string;
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
  reasoning: string;
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

    return { ...(q as object), options, difficulty } as TQ;
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
const norm = (s: string) => (s ?? "").replace(/\s+/g, " ").trim().toLowerCase();

/** A question's identity for the purposes of "are these two readings the same?". */
function fingerprint(q: TQ): string {
  return [norm(q.stem), ...q.options.map((o) => `${o.label}=${norm(o.text)}`)].join("");
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
 * Hard-validate subject + chapter against the catalog; soft-flag subtopic.
 *
 * Hard, because `commitStaged` will not do it: it refuses an unknown SUBJECT but
 * AUTO-CREATES an unknown chapter or subtopic. That auto-create is how a taxonomy
 * fragments — one agent's "Modern Indian History" becomes a second chapter beside
 * "Modern India" and splits the corpus in two with no error anywhere.
 *
 * The chapter is checked against ITS OWN SUBJECT's chapter list, never the union
 * of all of them: several chapter names are plausible under more than one subject,
 * and validating against the union would wave a mis-filed row straight through.
 */
/**
 * Catalog names use EM DASHES ("Microeconomics — Demand, ..."). A transcription
 * agent that types an ASCII hyphen produces a hard-validation failure whose cause
 * is INVISIBLE in a terminal, because the two strings look identical. This finds
 * the intended entry so the error can say which.
 *
 * It SUGGESTS; it never repairs. The data file is the source of record and should
 * hold the literal catalog string — normalising at merge would leave the file and
 * the database disagreeing about what was authored.
 */
function nearMatch(value: string, candidates: string[]): string | null {
  // The dash range is written with \u escapes rather than literal dash glyphs:
  // U+2010..U+2015 are six visually near-identical characters, and a literal
  // range is unreadable in review and easy to mangle.
  const loose = (x: string) =>
    x.replace(/[‐-―-]/g, "-").replace(/\s+/g, " ").trim().toLowerCase();
  const target = loose(value);
  return candidates.find((c) => loose(c) === target) ?? null;
}

export function validateCatalog(
  questions: TQ[],
  catalog: Catalog
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const q of questions) {
    const chapters = catalog[q.subject];
    if (!chapters) {
      errors.push(
        `Q${q.number}: unknown subject "${q.subject}" (known: ${Object.keys(catalog).join(", ")})`
      );
      continue;
    }
    const subtopics = chapters[q.chapter];
    if (!subtopics) {
      const near = nearMatch(q.chapter, Object.keys(chapters));
      errors.push(
        `Q${q.number}: chapter "${q.chapter}" is not a chapter of subject "${q.subject}"` +
          (near ? ` — did you mean "${near}"? (the catalog uses an em dash)` : "")
      );
      continue;
    }
    if (q.subtopic && !subtopics.includes(q.subtopic)) {
      const near = nearMatch(q.subtopic, subtopics);
      warnings.push(
        `Q${q.number}: subtopic "${q.subtopic}" is not listed under "${q.subject} / ${q.chapter}"` +
          (near ? ` — did you mean "${near}"? (the catalog uses an em dash)` : "")
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
 * The provenance bracket every derived answer carries. This corpus has no
 * printed key and no external anchor, and the answer-key export prints
 * `solution` verbatim — so a reader of a downloaded paper sees this too, which
 * is the intent.
 */
const provenance = (confidence: string, agreed: boolean) =>
  `[Derived answer — this booklet carries no official key. ` +
  `Two independent blind derivations ${agreed ? "agreed" : "were reconciled by hand"}; ` +
  `confidence: ${confidence}. Verify before relying on it.]`;

/**
 * Assemble bank rows. A question with no derivation is DROPPED, not defaulted —
 * an answer nobody derived must not be invented at assembly time, and the
 * coverage gate below turns the omission into a loud "missing Qn".
 */
export function buildRecords(
  questions: TQ[],
  derivations: Derivation[],
  opts: { reconciled?: Set<number> } = {}
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
      subject: q.subject,
      chapter: q.chapter,
      subtopic: q.subtopic,
      question: q.stem,
      optionA: opt("A"),
      optionB: opt("B"),
      optionC: opt("C"),
      optionD: opt("D"),
      answer: d.answer.toUpperCase(),
      difficulty: q.difficulty,
      solution: `${d.reasoning.trim()} ${provenance(d.confidence.toUpperCase(), agreed)}`.trim(),
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
    // a pipe row whose FOLLOWER is another pipe row but with no separator anywhere
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

    // content_hash is stem + sorted options + answer, and EXCLUDES context — two
    // rows matching on that key collide and one is silently dropped at commit.
    const key = [norm(r.question), ...opts.map((o) => norm(o || "")).sort(), r.answer].join("\n");
    if (seen.has(key)) {
      errs.push(
        `Q${r.questionNumber}: content_hash collision with Q${seen.get(key)} — ` +
          `fold the question-specific stimulus into the stem`
      );
    }
    seen.set(key, Number(r.questionNumber));
  }
  return errs;
}
