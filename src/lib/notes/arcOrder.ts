/**
 * Pure core behind `npm run notes:arc` — the teaching-ARC probe.
 *
 * WHY THIS EXISTS. Every /notes chapter claims a teaching arc: its
 * `subtopicOrder` is an assertion that each block rests on the one before, and
 * MHT-CET Mathematical Logic said so in as many words ("six movements, each
 * resting on the one before"). On 2026-09-20 that chapter was found to use
 * `\equiv` 40 times, "tautology" 3 times and "contingency" once BEFORE the
 * concepts that define them — a reader following the stated order meets the
 * notation and the vocabulary as unexplained symbols.
 *
 * Every existing gate was green. notes:lint resolves taxonomy, tags and PYQ
 * ids; notes:latex checks delimiters; typecheck and build check compilation.
 * NONE of them reads a chapter IN ORDER, so none of them can see a forward
 * reference. That is the hole this closes.
 *
 * TRIAGE, NOT A GATE. Like scripts/lib/textProbes.ts, a hit is a question, not
 * a verdict: a chapter may legitimately name a thing before defining it
 * ("we will call this a contingency — see the next block"). The probe's job is
 * to put that decision in front of a human, once, at authoring time.
 *
 * Two classes, each with its own false-positive guard:
 *
 *   NOTATION_BEFORE_GLOSS — a tracked math symbol is USED before any concept
 *     glosses it. "Glossed" means it appears in a `formula.symbols` legend, or
 *     one of its English names appears in the concept's name or prose. Guard:
 *     a symbol that is NEVER glossed anywhere is NOT reported, because there is
 *     no "before" to measure against — that is a coverage defect, not an order
 *     one, and reporting it here would produce a finding nobody can act on.
 *
 *   TERM_BEFORE_CONCEPT — a distinctive word from a LATER concept's NAME
 *     appears in an EARLIER concept's body. Guards: stopwords and short tokens
 *     are dropped; tokens that repeat the CHAPTER name are ambient and dropped;
 *     the EARLIEST concept naming a term owns it, so a term reused in a later
 *     concept name cannot retro-flag uses after its real introduction; and
 *     matching is whole-word, so "contingent" does not trip "contingency".
 *
 * Kept here (not inline in the script) so it is unit-testable —
 * tests/notes-arc-order.test.ts. See [[notes-teaching-arc-forward-reference]].
 */

import type { ConceptUnit, SubtopicNote } from "@/app/notes/_types";

/** One concept, flattened out of the chapter in rendered reading order. */
export type ArcConcept = {
  subtopicSlug: string;
  subtopicTitle: string;
  conceptSlug: string;
  conceptName: string;
  /** Every prose slot concatenated, in render order. */
  body: string;
  /** `formula.symbols[].symbol` entries — explicit legend glosses. */
  glosses: string[];
  /**
   * Terms this concept declares in its `definition` via the project's
   * `**bold**` key-term convention (CLAUDE.md, "/notes LaTeX in body prose
   * only"). A bolded term in the formal definition slot IS a declaration, even
   * when the concept's NAME does not repeat it — "The Three Relatives of a
   * Conditional" introduces **Converse**, **Inverse** and **Contrapositive**
   * without naming any of them.
   */
  boldTerms: string[];
};

export type ArcSite = { subtopicSlug: string; conceptSlug: string; conceptName: string };

export type ArcFinding = {
  kind: "NOTATION_BEFORE_GLOSS" | "TERM_BEFORE_CONCEPT";
  /** The token used too early. */
  token: string;
  /** Where the premature use happens. */
  at: ArcSite;
  /** Where the token is actually introduced. */
  introducedAt: ArcSite;
  /** Surrounding text, so the finding can be judged without opening the file. */
  excerpt: string;
  /**
   * True when the premature use and the introduction sit in the SAME subtopic.
   * Those are much weaker signals — inside one block an author may legitimately
   * foreshadow ("we will call this a contingency") and the reader is two
   * paragraphs away from the answer. The ARC break the probe exists for is
   * CROSS-subtopic, so the CLI reports those by default and hides these behind
   * `--all`. Measured on the corpus: 1,781 term findings in total, the large
   * majority same-subtopic noise.
   */
  sameSubtopic: boolean;
};

/**
 * Math notation that carries a DEFINITION rather than an operation — the kind a
 * reader cannot infer from context. `\wedge` is not here: a student meets "and"
 * in the same breath as the symbol. `\equiv` is, because "logically equivalent"
 * is a claim about every row of a truth table and means nothing until said.
 *
 * DELIBERATELY ABSENT: `\Rightarrow` and `\to`. In this corpus both are
 * working notation — "therefore", "tends to" — written in every derivation
 * from Kinematics to Limits. Tracking `\Rightarrow` produced 9 of the first 12
 * corpus findings and every one was a derivation step, not a forward reference.
 *
 * `latex` is matched literally against the body; `names` are the English
 * phrasings that count as introducing it in prose.
 */
export const TRACKED_NOTATION: { latex: string; names: string[] }[] = [
  { latex: "\\equiv", names: ["logically equivalent", "logical equivalence", "equivalent to"] },
  { latex: "\\not\\equiv", names: ["not logically equivalent", "not equivalent"] },
  { latex: "\\leftrightarrow", names: ["biconditional", "if and only if"] },
  { latex: "\\rightarrow", names: ["conditional", "implication", "if-then", "if–then"] },
  { latex: "\\forall", names: ["for all", "for every", "universal quantifier"] },
  { latex: "\\exists", names: ["there exists", "for some", "existential quantifier"] },
  { latex: "\\iff", names: ["if and only if", "exactly when"] },
  { latex: "\\models", names: ["entails", "models"] },
  { latex: "\\vdash", names: ["proves", "derives", "turnstile"] },
];

/**
 * Words that carry no teaching load. Deliberately generous: a false NEGATIVE
 * here costs one missed finding, a false POSITIVE costs an author's trust in
 * the probe, and an ignored probe finds nothing at all.
 */
const STOPWORDS = new Set([
  "the", "and", "a", "an", "of", "in", "on", "for", "to", "from", "with", "by", "as", "at",
  "is", "are", "was", "were", "be", "being", "been", "it", "its", "that", "this", "these",
  "those", "which", "what", "when", "where", "why", "how", "who", "whom", "not", "no", "or",
  "but", "if", "then", "else", "than", "so", "such", "only", "just", "also", "very", "more",
  "most", "less", "least", "one", "two", "three", "four", "five", "first", "second", "third",
  "into", "out", "up", "down", "over", "under", "about", "after", "before", "again", "once",
  "using", "use", "used", "given", "find", "finding", "write", "writing", "make", "making",
  "get", "getting", "take", "taking", "your", "you", "we", "our", "their", "them", "they",
  "form", "forms", "type", "types", "kind", "kinds", "case", "cases", "part", "parts",
  "full", "whole", "own", "other", "others", "same", "different", "means", "meaning",
  "value", "values", "rule", "rules", "law", "laws", "step", "steps", "way", "ways",
]);

/** Minimum token length. Short words are too collision-prone to be distinctive. */
const MIN_TERM_LENGTH = 5;

/**
 * A term appearing in more than this share of a chapter's concepts is ambient
 * vocabulary, not something one concept introduces. Measured on the first real
 * run: "equivalent" and "circuits" sat above it and were pure noise, while
 * "tautology" (20%) and "contingency" (7%) — the genuine findings — sat well
 * below. See [[notes-teaching-arc-forward-reference]].
 */
const AMBIENT_BODY_SHARE = 1 / 3;

/**
 * ...but never below this many concepts. Without an absolute floor a SHARE
 * alone makes small chapters immune: in a 3-concept chapter one use is already
 * 33%, so every term would read as ambient and the class would report nothing.
 * A term has to be genuinely spread to be ambient, not merely present twice.
 */
const MIN_AMBIENT_BODIES = 4;

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * True when a concept name names an ACTION rather than a thing — "Building the
 * Full Truth Table", "Deciding Whether Two Circuits Are Equivalent". A
 * procedure concept teaches a move, not a word, so it declares no vocabulary
 * and must not retro-flag ordinary English ("makes", "whether", "deciding")
 * used in earlier blocks. Detected on the leading gerund, after any article.
 */
export function isActionName(conceptName: string): boolean {
  const tokens = tokenize(conceptName).filter((t) => !["the", "a", "an"].includes(t));
  const head = tokens[0];
  return Boolean(head && head.length > 4 && head.endsWith("ing"));
}

/**
 * The distinctive terms a concept NAME declares — what a reader should expect
 * to learn here and not before. Drops stopwords, short tokens, anything that
 * merely repeats the chapter's own name (ambient vocabulary), and everything
 * from an action-named concept.
 */
export function declaredTerms(conceptName: string, chapterName: string): string[] {
  if (isActionName(conceptName)) return [];
  const ambient = new Set(tokenize(chapterName));
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of tokenize(conceptName)) {
    if (t.length < MIN_TERM_LENGTH) continue;
    if (STOPWORDS.has(t)) continue;
    if (ambient.has(t)) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/** Minimal structural shape of a ConceptUnit's prose slots. */
type BodyLike = {
  intuition?: string;
  definition?: string;
  authoredExample?: { prompt: string; steps: string[]; answer: string };
  selfCheckExample?: { prompt: string; steps: string[]; answer: string };
  practiceSet?: { prompt: string; answer: string; method?: string }[];
  traps?: { title: string; body: string }[];
  formula?: { label: string; latex: string; symbols?: { symbol: string; meaning: string }[] };
  table?: {
    columns: string[];
    rows: { cells: string[]; noteAmber?: string }[];
    caption?: string;
  };
};

/**
 * Every prose slot of a concept, concatenated. A term is a forward reference
 * wherever it is RENDERED, so this must cover the reference-variant table
 * (cells, row notes, caption) as well as the formula-variant example slots —
 * the Mathematical Logic finding included a term sitting in an example ANSWER.
 */
export function conceptBody(c: BodyLike): string {
  const parts: string[] = [];
  const push = (s?: string) => {
    if (s) parts.push(s);
  };
  push(c.intuition);
  push(c.definition);
  push(c.formula?.label);
  push(c.formula?.latex);
  for (const s of c.formula?.symbols ?? []) {
    push(s.symbol);
    push(s.meaning);
  }
  for (const ex of [c.authoredExample, c.selfCheckExample]) {
    if (!ex) continue;
    push(ex.prompt);
    for (const s of ex.steps) push(s);
    push(ex.answer);
  }
  for (const p of c.practiceSet ?? []) {
    push(p.prompt);
    push(p.answer);
    push(p.method);
  }
  for (const t of c.traps ?? []) {
    push(t.title);
    push(t.body);
  }
  if (c.table) {
    for (const col of c.table.columns) push(col);
    for (const row of c.table.rows) {
      for (const cell of row.cells) push(cell);
      push(row.noteAmber);
    }
    push(c.table.caption);
  }
  return parts.join("\n");
}

/**
 * Terms declared by `**bold**` runs inside a concept's `definition`. Same
 * filters as `declaredTerms` so the two ownership signals agree on what counts
 * as a term at all.
 */
export function boldDefinitionTerms(definition: string, chapterName: string): string[] {
  const bolds = definition.match(/\*\*([^*]+)\*\*/g) ?? [];
  const out = new Set<string>();
  for (const b of bolds) {
    for (const t of declaredTerms(b.replace(/\*/g, ""), chapterName)) out.add(t);
  }
  return [...out];
}

/** Flatten a chapter's notes into reading order. `order` is `chapter.subtopicOrder`. */
export function collectArcConcepts(
  order: string[],
  notes: Record<string, SubtopicNote>,
  chapterName: string
): ArcConcept[] {
  const out: ArcConcept[] = [];
  for (const slug of order) {
    const note = notes[slug];
    if (!note) continue;
    for (const c of note.concepts as ConceptUnit[]) {
      out.push({
        subtopicSlug: slug,
        subtopicTitle: note.title,
        conceptSlug: c.slug,
        conceptName: c.name,
        body: conceptBody(c as BodyLike),
        glosses: (c.kind === "formula" ? c.formula?.symbols ?? [] : []).map((s) => s.symbol),
        // An ACTION-named concept bolds its procedure steps ("**Translate**
        // the printed circuit", "**Clear arrows**"), not terminology — so it
        // declares nothing here either. Measured: without this gate the bold
        // signal turned 11 findings into 20, all of the new ones step labels.
        boldTerms: isActionName(c.name) ? [] : boldDefinitionTerms(c.definition, chapterName),
      });
    }
  }
  return out;
}

function siteOf(c: ArcConcept): ArcSite {
  return { subtopicSlug: c.subtopicSlug, conceptSlug: c.conceptSlug, conceptName: c.conceptName };
}

function excerptAround(body: string, needle: RegExp): string {
  const m = needle.exec(body);
  if (!m) return "";
  const start = Math.max(0, m.index - 45);
  const end = Math.min(body.length, m.index + m[0].length + 45);
  return (start > 0 ? "…" : "") + body.slice(start, end).replace(/\s+/g, " ").trim() + (end < body.length ? "…" : "");
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Find forward references in a chapter, given its concepts in reading order.
 * Returns at most one finding per token — the EARLIEST offending concept —
 * because a term used ten times before its definition is one authoring
 * decision, not ten.
 */
export function findArcBreaks(concepts: ArcConcept[], chapterName: string): ArcFinding[] {
  const findings: ArcFinding[] = [];

  // ---- NOTATION_BEFORE_GLOSS -------------------------------------------
  for (const n of TRACKED_NOTATION) {
    // A longer tracked symbol containing this one (\not\equiv vs \equiv) must
    // not count as a use of the shorter: match the command boundary.
    const useRe = new RegExp(escapeRe(n.latex) + "(?![a-zA-Z])");
    const nameRes = n.names.map((name) => new RegExp(escapeRe(name), "i"));

    let firstUse = -1;
    let firstGloss = -1;
    for (let i = 0; i < concepts.length; i++) {
      const c = concepts[i];
      const glossed =
        c.glosses.some((g) => useRe.test(g)) ||
        nameRes.some((re) => re.test(c.conceptName) || re.test(c.body));
      if (glossed && firstGloss === -1) firstGloss = i;
      if (firstUse === -1 && useRe.test(c.body)) firstUse = i;
    }

    // Guard: never glossed anywhere ⇒ nothing to be "before". Not an order defect.
    if (firstUse === -1 || firstGloss === -1) continue;
    if (firstUse >= firstGloss) continue;

    findings.push({
      kind: "NOTATION_BEFORE_GLOSS",
      token: n.latex,
      at: siteOf(concepts[firstUse]),
      introducedAt: siteOf(concepts[firstGloss]),
      excerpt: excerptAround(concepts[firstUse].body, useRe),
      sameSubtopic:
        concepts[firstUse].subtopicSlug === concepts[firstGloss].subtopicSlug,
    });
  }

  // ---- TERM_BEFORE_CONCEPT ---------------------------------------------
  // The EARLIEST concept whose name declares a term owns it. A later concept
  // re-declaring the same word cannot retro-flag uses that its real
  // introduction already licensed.
  const owner = new Map<string, number>();
  for (let i = 0; i < concepts.length; i++) {
    const declared = [
      ...declaredTerms(concepts[i].conceptName, chapterName),
      ...concepts[i].boldTerms,
    ];
    for (const term of declared) {
      if (!owner.has(term)) owner.set(term, i);
    }
  }

  for (const [term, ownerIdx] of owner) {
    if (ownerIdx === 0) continue; // nothing can precede the first concept
    const wordRe = new RegExp(`\\b${escapeRe(term)}\\b`, "i");

    // Ambient-vocabulary guard: a word the chapter uses throughout is not a
    // term one concept introduces, whatever its name says.
    const bodiesUsing = concepts.filter((c) => wordRe.test(c.body)).length;
    if (bodiesUsing >= MIN_AMBIENT_BODIES && bodiesUsing > concepts.length * AMBIENT_BODY_SHARE) {
      continue;
    }

    for (let i = 0; i < ownerIdx; i++) {
      if (!wordRe.test(concepts[i].body)) continue;
      findings.push({
        kind: "TERM_BEFORE_CONCEPT",
        token: term,
        at: siteOf(concepts[i]),
        introducedAt: siteOf(concepts[ownerIdx]),
        excerpt: excerptAround(concepts[i].body, wordRe),
        sameSubtopic: concepts[i].subtopicSlug === concepts[ownerIdx].subtopicSlug,
      });
      break; // earliest offender only
    }
  }

  return findings;
}
