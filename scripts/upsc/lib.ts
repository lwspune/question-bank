// Pure assembly + validation for UPSC CSE (Prelims) ingestion — no I/O, TDD in
// tests/upsc-lib.test.ts.
//
// Inputs (per paper, produced by the agent passes documented in README.md):
//   bands[]       — transcription, one file per page band: stem + options + taxonomy,
//                   plus `context` for Paper II's shared passages. NO answer.
//   derivations[] — TWO independent blind passes, each: answer letter + the answer's VALUE
//
// Output: RawRow[] (the shape commitStaged consumes), with the derived answer and
// its provenance in `solution`.
//
// PORTED FROM scripts/cds-gs/lib.ts, which solves the same problem — a scanned,
// key-less, subject-interleaved MCQ paper — and adds three things UPSC needs:
//
//   1. `context`, for Paper II. CSAT is built out of `Directions for the following
//      N items:` blocks over shared passages, so a passage is one string attached
//      to several questions. Paper I never uses it.
//   2. PER-PAPER subject validation. Both papers share one exam and one catalog,
//      but test disjoint things: a CSAT item is never "Polity and Governance" and a
//      GS item is never "Basic Numeracy". Checking that turns a mis-scoped
//      classification into a merge-time error instead of a silently misfiled row.
//   3. `englishPagesFor`, the page pre-pass rule for a bilingual booklet.
import type { RawRow } from "../../src/lib/upload/validate";
import type { Catalog, PaperNumber } from "./config";
import { subjectsFor } from "./config";

export type Option = { label: string; text: string };

export type TQ = {
  number: number;
  stem: string;
  options: Option[];
  subject: string;
  chapter: string;
  subtopic?: string;
  difficulty: string;
  /**
   * Paper II only: the passage / directions block that governs THIS item, verbatim.
   *
   * ONLY genuinely SHARED material belongs here — a passage or table that governs
   * two or more items. Anything unique to one item goes in the STEM, and that is
   * not a style preference: `content_hash` is stem + sorted options + answer and
   * EXCLUDES context, so six data-sufficiency items whose distinguishing "Question:"
   * and "Statement I/II" were parked in context would collide on one hash and five
   * of them would be silently dropped at commit. `validateRows` warns on a context
   * used by exactly one question for this reason.
   */
  context?: string;
  /**
   * Set membership. Items sharing one passage share one label, which
   * `commitStaged` turns into a `set_id` (`<uploadJobId>:<setLabel>`).
   *
   * NOT decoration, and leaving it unset is a real defect: `groupBySet` collapses
   * a consecutive run of rows sharing a `set_id` so the passage renders ONCE
   * above its questions on /browse and prints once in a downloaded Word paper,
   * and `applyEdit` mirrors a corrected passage to every sibling in the set.
   * Without it the passage repeats on every card, repeats in the export, and a
   * fix to one copy silently leaves the others stale.
   *
   * Assigned by `assignSetLabels`, never by a transcription agent — it is derived
   * from the passages they transcribed, so it cannot disagree with them.
   */
  setLabel?: string;
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

/**
 * The English-page list for a booklet.
 *
 *   "bilingual" — a raw UPSC booklet. Hindi comes FIRST and carries the same item
 *                 numbers as the English page after it, so English sits at EVEN
 *                 0-based indices from 2 (printed label = index + 1). Verified on
 *                 the 2025 Paper II and the 2026 Paper I.
 *   "extract"   — a prep-house reprint with the Hindi versos already removed, so
 *                 every page after the cover is English.
 *
 * `lastContentIndex` is the last page carrying QUESTIONS — not the last page of
 * the document. Raw booklets end in rough-work pages and a back cover, and those
 * must not reach a transcription agent.
 *
 * This is a helper for filling in `englishPages` in config.ts, not something the
 * pipeline calls at runtime: that field stays explicit, because a rule cheap
 * enough to apply automatically is also cheap enough to apply to the wrong
 * booklet, and the cost of being wrong is a whole wasted transcription pass.
 */
export function englishPagesFor(spec: {
  kind: "bilingual" | "extract";
  pageCount: number;
  lastContentIndex: number;
}): number[] {
  const { kind, pageCount, lastContentIndex } = spec;
  if (lastContentIndex < 0 || lastContentIndex >= pageCount) {
    throw new Error(
      `lastContentIndex ${lastContentIndex} is outside a ${pageCount}-page document (0..${pageCount - 1})`
    );
  }
  const first = kind === "bilingual" ? 2 : 1;
  const step = kind === "bilingual" ? 2 : 1;
  if (kind === "bilingual" && lastContentIndex % 2 !== 0) {
    throw new Error(
      `lastContentIndex ${lastContentIndex} is odd, but English pages are at EVEN indices in a ` +
        `bilingual booklet — an odd index is a Hindi page. Re-check the page pre-pass.`
    );
  }
  const out: number[] = [];
  for (let i = first; i <= lastContentIndex; i += step) out.push(i);
  return out;
}

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
 * difficulty synonyms / casing.
 *
 * `context` is passed through VERBATIM, deliberately: a passage's paragraph
 * breaks are load-bearing on screen and in the Word export, and reflowing it here
 * would silently change what a comprehension item is asking about.
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
  return [norm(q.stem), ...q.options.map((o) => `${o.label}=${norm(o.text)}`)].join("");
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
 * exactly the defect that survives every downstream check, because a blind
 * derivation reads the corrupted options, derives correctly from them, and
 * confirms the wrong letter.
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
 * Find a catalog entry that differs from `value` only in punctuation a terminal
 * renders identically — dashes, quotes, collapsed whitespace, case. It SUGGESTS;
 * it never repairs. The data file is the source of record and should hold the
 * literal catalog string; normalising at merge would leave the file and the
 * database disagreeing about what was authored.
 *
 * The dash range is written with \u escapes rather than literal glyphs: U+2010..
 * U+2015 are six visually near-identical characters, and a literal range is
 * unreadable in review and easy to mangle.
 */
function nearMatch(value: string, candidates: string[]): string | null {
  const loose = (x: string) =>
    x
      .replace(/[‐-―]/g, "-")
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  const target = loose(value);
  return candidates.find((c) => loose(c) === target) ?? null;
}

/**
 * Hard-validate subject + chapter against the catalog; soft-flag subtopic.
 *
 * Hard, because `commitStaged` will not do it: it refuses an unknown SUBJECT but
 * AUTO-CREATES an unknown chapter or subtopic. That auto-create is how a taxonomy
 * fragments — one agent's "Modern Indian History" becomes a second chapter beside
 * "Modern India and the Freedom Struggle" and splits the corpus in two with no
 * error anywhere.
 *
 * The chapter is checked against ITS OWN SUBJECT's chapter list, never the union
 * of all of them: several chapter names are plausible under more than one subject
 * (this catalog has "Number System" and "Economic History" and a dozen others
 * that would pass a union check from the wrong subject).
 *
 * `paper` additionally scopes WHICH subjects are legal at all — see the header.
 */
export function validateCatalog(
  questions: TQ[],
  catalog: Catalog,
  paper: PaperNumber
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const legal = new Set(subjectsFor(paper));
  const roman = paper === 1 ? "I" : "II";

  for (const q of questions) {
    const chapters = catalog[q.subject];
    if (!chapters) {
      errors.push(
        `Q${q.number}: unknown subject "${q.subject}" (known: ${Object.keys(catalog).join(", ")})`
      );
      continue;
    }
    if (!legal.has(q.subject)) {
      errors.push(
        `Q${q.number}: subject "${q.subject}" is not a Paper ${roman} subject — ` +
          `Paper ${roman} may only use: ${[...legal].join(", ")}`
      );
      continue;
    }
    const subtopics = chapters[q.chapter];
    if (!subtopics) {
      const near = nearMatch(q.chapter, Object.keys(chapters));
      errors.push(
        `Q${q.number}: chapter "${q.chapter}" is not a chapter of subject "${q.subject}"` +
          (near ? ` — did you mean "${near}"? (punctuation differs)` : "")
      );
      continue;
    }
    if (q.subtopic && !subtopics.includes(q.subtopic)) {
      const near = nearMatch(q.subtopic, subtopics);
      warnings.push(
        `Q${q.number}: subtopic "${q.subtopic}" is not listed under "${q.subject} / ${q.chapter}"` +
          (near ? ` — did you mean "${near}"? (punctuation differs)` : "")
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
        return {
          number: n,
          verdict: "MISSING" as const,
          a: da,
          b: db,
          note: `no derivation from ${which}`,
        };
      }
      if (da.answer.toUpperCase() === db.answer.toUpperCase()) {
        return { number: n, verdict: "AGREE" as const, a: da, b: db };
      }
      const q = qs.get(n)!;
      const textOf = (label: string) =>
        q.options.find((o) => o.label === label.toUpperCase())?.text ?? "";
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
 * An official UPSC answer key for one paper, Series A.
 *
 * `dropped` are the questions UPSC WITHDREW after the exam. The key prints them
 * as `X` and the header counts them out ("No. of Questions Dropped: 1 / taken for
 * Scoring: 99"). They have no correct answer and must not be shipped with one.
 */
export type OfficialKey = {
  answers: Map<number, string>;
  dropped: number[];
  total: number;
};

const KEY_LETTERS = new Set(["A", "B", "C", "D"]);

/**
 * Validate a vision-transcribed key into an `OfficialKey`.
 *
 * REFUSES a short key. That is the important one: a key silently missing its last
 * page or its last column looks exactly like a complete key, and would leave a
 * run of questions falling back to whatever we derived while the run reported
 * "verified against the official key". A partial key must never be mistaken for
 * a full one.
 */
export function parseOfficialKey(raw: Record<string, string>, total: number): OfficialKey {
  const answers = new Map<number, string>();
  const dropped: number[] = [];

  for (const [k, v] of Object.entries(raw)) {
    const n = Number(k);
    if (!Number.isInteger(n) || n < 1 || n > total) {
      throw new Error(`key has Q${k}, outside 1..${total}`);
    }
    const letter = String(v ?? "").trim().toUpperCase();
    if (letter === "X") {
      dropped.push(n);
      continue;
    }
    if (!KEY_LETTERS.has(letter)) {
      throw new Error(`Q${n}: key letter ${JSON.stringify(v)} is not A-D or X`);
    }
    answers.set(n, letter);
  }

  const missing: number[] = [];
  for (let n = 1; n <= total; n++) {
    if (!answers.has(n) && !dropped.includes(n)) missing.push(n);
  }
  if (missing.length) {
    throw new Error(
      `key is missing ${missing.length} of ${total} question(s): Q${missing.slice(0, 12).join(", Q")}` +
        `${missing.length > 12 ? ", ..." : ""}. A partial key must not be used as a full one.`
    );
  }

  return { answers, dropped: dropped.sort((a, b) => a - b), total };
}

export type KeyVerdict = "MATCH" | "MISMATCH" | "DROPPED" | "NOT_DERIVED";
export type KeyComparison = {
  number: number;
  verdict: KeyVerdict;
  official?: string;
  derived?: string;
  derivation?: Derivation;
};

/**
 * Compare ONE blind derivation pass against the official key.
 *
 * This is strictly stronger than the two-blind-pass crosstab it replaces, and in
 * a way worth naming: two passes agreeing bounds DISAGREEMENT risk but is blind
 * to CORRELATED error, and blind to a MIS-SLOTTED OPTION — where the correct
 * answer's text sits under the wrong letter, so a deriver reasons correctly and
 * confirms the wrong letter. An external key catches both. A mismatch here is
 * therefore two hypotheses, not one: our reasoning was wrong, OR our options are
 * mis-transcribed. Check the page before assuming the first.
 */
export function compareToKey(key: OfficialKey, derivations: Derivation[]): KeyComparison[] {
  const byNumber = new Map(derivations.map((d) => [d.number, d]));
  const out: KeyComparison[] = [];

  for (let n = 1; n <= key.total; n++) {
    if (key.dropped.includes(n)) {
      out.push({ number: n, verdict: "DROPPED", derivation: byNumber.get(n) });
      continue;
    }
    const official = key.answers.get(n)!;
    const d = byNumber.get(n);
    if (!d) {
      out.push({ number: n, verdict: "NOT_DERIVED", official });
      continue;
    }
    const derived = d.answer.trim().toUpperCase();
    out.push({
      number: n,
      verdict: derived === official ? "MATCH" : "MISMATCH",
      official,
      derived,
      derivation: d,
    });
  }
  return out;
}

/**
 * Produce the answers to commit: the LETTER from the official key, the WORKING
 * from our derivation.
 *
 * The key supplies no reasoning, and shipping a correct answer with no working is
 * a defect this bank has recorded before. So the derivation is still run — it is
 * what a student reads — and the key overrides only the letter.
 *
 * A row where the two disagreed gets that stated in its reasoning. Without it the
 * stored solution would argue at length for a letter the row no longer carries,
 * which is worse than either half alone.
 *
 * DROPPED questions and questions nobody derived are EXCLUDED rather than
 * defaulted: the first has no correct answer, and the second would ship a bare
 * letter with no working.
 */
export function applyOfficialKey(key: OfficialKey, derivations: Derivation[]): Derivation[] {
  const out: Derivation[] = [];
  for (const d of derivations) {
    if (key.dropped.includes(d.number)) continue;
    const official = key.answers.get(d.number);
    if (!official) continue;
    const derived = d.answer.trim().toUpperCase();
    if (derived === official) {
      out.push({ ...d, answer: official });
      continue;
    }
    out.push({
      ...d,
      answer: official,
      reasoning:
        `${d.reasoning.trim()} [Answer corrected to ${official} from the official UPSC answer key; ` +
        `an independent blind derivation had reached ${derived}. The reasoning above argues for ` +
        `${derived} and is retained so the disagreement is visible rather than hidden.]`,
    });
  }
  return out.sort((a, b) => a.number - b.number);
}

/**
 * Group items that share a passage into sets, labelling each by its first item.
 *
 * A passage carried by exactly ONE item gets no label: a set of one is not a set,
 * and `groupBySet` renders a lone context correctly without one.
 *
 * REFUSES a set whose members are not consecutive. That is not fussiness —
 * `groupBySet` collapses a CONSECUTIVE run of rows sharing a set_id, so a
 * non-consecutive set would render as two separate groups repeating the same
 * passage, which is the exact defect this function exists to prevent. If it ever
 * fires, the paper interleaves two passages and the fix is a real decision, not a
 * relabelling.
 *
 * Pure: returns new objects rather than mutating the input.
 */
export function assignSetLabels(questions: TQ[]): TQ[] {
  const ordered = [...questions].sort((a, b) => a.number - b.number);

  const groups = new Map<string, TQ[]>();
  for (const q of ordered) {
    if (!q.context) continue;
    const k = norm(q.context);
    groups.set(k, [...(groups.get(k) ?? []), q]);
  }

  const labelByKey = new Map<string, string>();
  for (const [k, members] of groups) {
    if (members.length < 2) continue;
    const numbers = members.map((m) => m.number);
    const first = Math.min(...numbers);
    const last = Math.max(...numbers);
    if (last - first + 1 !== members.length) {
      throw new Error(
        `the passage shared by Q${numbers.join(", Q")} is not carried by a consecutive run ` +
          `(Q${first}..Q${last} spans ${last - first + 1} items but only ${members.length} carry it). ` +
          `groupBySet only collapses consecutive rows, so this would render the passage twice. ` +
          `Check the page: either an item in the middle lost its copy of the passage, or two ` +
          `passages are interleaved.`
      );
    }
    labelByKey.set(k, `Q${first}`);
  }

  return questions.map((q) => {
    if (!q.context) return { ...q };
    const label = labelByKey.get(norm(q.context));
    return label ? { ...q, setLabel: label } : { ...q };
  });
}

/**
 * The provenance bracket every derived answer carries. This corpus has no printed
 * key and no external anchor, and the answer-key export prints `solution`
 * verbatim — so a reader of a downloaded paper sees this too, which is the intent.
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
      ...(q.setLabel ? { setLabel: q.setLabel } : {}),
      ...(q.context ? { context: q.context } : {}),
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

/**
 * A `Directions for the following N (n) items :` preamble sitting inside a
 * `context`.
 *
 * `context` holds the PASSAGE. The directions block is an INSTRUCTION about a
 * run of items, and putting it in a passage produces a visibly wrong page: the
 * heading claims N items while the card beneath it shows however many share that
 * passage — usually one or two. On the 2025 CSAT pilot exactly two items carried
 * it (one band included the preamble, four did not) and both rendered a single
 * question under a "2 (two) items" heading.
 *
 * It is also unfixable by grouping. Items under one directions block routinely
 * have DIFFERENT passages, and `groupBySet` takes the passage from the first row
 * of a run — so making them one set would render the first passage above every
 * member and silently drop the rest.
 *
 * Anchored on the literal phrase and the item-count parenthetical so ordinary
 * prose that happens to mention directions does not fire.
 */
function findDirectionsPreamble(s: string): string | null {
  if (!/directions\s+for\s+the\s+following\s+\d+\s*\(/i.test(s)) return null;
  return (
    "context carries a 'Directions for the following N items' preamble — that is " +
    "instruction, not passage. Its item count will contradict however many questions " +
    "actually share this passage. Keep the passage prose only."
  );
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
export function validateRows(
  rows: RawRow[],
  qFrom: number,
  qTo: number,
  opts: { exclude?: number[] } = {}
): string[] {
  const errs: string[] = [];
  const nums = new Set(rows.map((r) => Number(r.questionNumber)));
  // `exclude` is for questions UPSC WITHDREW. They are absent by design — the key
  // marks them `X` and they have no correct answer — so counting them as missing
  // coverage would make every paper with a dropped question fail its own gate.
  const skip = new Set(opts.exclude ?? []);
  for (let n = qFrom; n <= qTo; n++) if (!nums.has(n) && !skip.has(n)) errs.push(`missing Q${n}`);

  const seen = new Map<string, number>();
  for (const r of rows) {
    const opts_ = [r.optionA, r.optionB, r.optionC, r.optionD];
    if (opts_.some((o) => !o || !o.trim())) errs.push(`Q${r.questionNumber}: blank option`);
    if (!["A", "B", "C", "D"].includes((r.answer || "").toUpperCase())) {
      errs.push(`Q${r.questionNumber}: bad answer "${r.answer}"`);
    }

    // Duplicate option text makes the answer ambiguous as a LETTER even when it is
    // unambiguous as fact — the defect class that produced 19 wrong keys on the
    // sibling CDS English corpus. Never repair by moving the answer.
    //
    // CASE IS SIGNIFICANT HERE, unlike in `fingerprint`. This compares with
    // whitespace collapsed but case PRESERVED, because CSAT sets items whose
    // whole subject is capitalisation: 2019-p2 Q68 asks which letters of "JULY"
    // become lower case under a stated rule, and its four options are JuLY /
    // jULy / jUly / jUlY — four distinct printed strings that `norm` collapses to
    // one, firing all six pair-wise duplicate errors on a perfectly good item.
    //
    // Folding case costs nothing in detection power either: the defect this guard
    // exists for is an option typed or printed twice, which is character-identical
    // in practice, not a case variant of its twin.
    const normed = opts_.map((o) => (o ?? "").replace(/\s+/g, " ").trim());
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

    if (r.context) {
      const preamble = findDirectionsPreamble(r.context);
      if (preamble) errs.push(`Q${r.questionNumber} context: ${preamble}`);
    }

    // content_hash is stem + sorted options + answer, and EXCLUDES context — two
    // rows matching on that key collide and one is silently dropped at commit.
    const key = [norm(r.question), ...opts_.map((o) => norm(o || "")).sort(), r.answer].join("\n");
    if (seen.has(key)) {
      errs.push(
        `Q${r.questionNumber}: content_hash collision with Q${seen.get(key)} — ` +
          `context does NOT disambiguate (the MCQ hash excludes it). Fold the ` +
          `question-specific stimulus into the stem.`
      );
    }
    seen.set(key, Number(r.questionNumber));
  }

  return errs;
}

/**
 * WARNING-level check: a `context` used by exactly ONE question.
 *
 * Usually it means per-item material (a data-sufficiency "Question:" and its
 * Statements) was parked in context, where it neither reaches content_hash nor
 * reads as part of the question — the trap that silently drops items at commit.
 *
 * But it is NOT always wrong: a "Directions for the following 2 (two) items"
 * block carrying TWO passages gives each item its own governing passage, and
 * each is then legitimately unique. So this is a warning a human reads, never a
 * gate — kept OUT of validateRows for exactly that reason.
 *
 * It earns its place anyway: on the 2025 CSAT pilot it caught Q32, whose
 * governing passage sat on the previous BAND's last page and had simply not been
 * transcribed. Its stem reads "With reference to the above passage" and it had
 * none — unanswerable, and invisible to every other check.
 */
export function findLonelyContexts(rows: RawRow[]): string[] {
  const byContext = new Map<string, number[]>();
  for (const r of rows) {
    if (!r.context) continue;
    const k = norm(r.context);
    byContext.set(k, [...(byContext.get(k) ?? []), Number(r.questionNumber)]);
  }
  const out: string[] = [];
  for (const [, ns] of byContext) {
    if (ns.length === 1) {
      out.push(
        `Q${ns[0]}: context is used by only this question — legitimate if a directions ` +
          `block gives it its own passage, WRONG if per-item material was parked there, ` +
          `and WRONG if a sibling item lost its copy at a band seam. Check which.`
      );
    }
  }
  return out;
}
