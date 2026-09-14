/**
 * Match a sibling series' questions onto the base series, and derive that
 * series' answer key from ours.
 *
 *   npx tsx scripts/nda-pyq/match-variant.ts 2026-2 B
 *   npx tsx scripts/nda-pyq/match-variant.ts 2026-2 B --apply
 *
 * Reads data/<id>-<S>.b*.json (the matching pass) + data/<id>.questions.json and
 * data/<id>.answers.json (the base series, already adjudicated). Writes
 * data/<id>-<S>.map.json: for every question of series S, which base question it
 * is, how its option LABELS map, and therefore its answer.
 *
 * ## The answer is derived from option TEXT, never from a block formula
 *
 * The four series are known to permute 12 blocks of 10, and that is a real
 * pattern — but it is used here only as a CHECK, never as an input. The answer
 * for series S question n is computed as: find the base question, find which of
 * S's four labels carries the text of the base question's CORRECT option, and
 * emit that label. So if a question's options are reordered, this produces the
 * right letter automatically; and if the block pattern were wrong anywhere, the
 * text match would disagree loudly rather than silently mis-key ten questions.
 *
 * ## Matching is on options AND stem, because options alone are not unique
 *
 * Measured on this paper: Series D Q6 and Q7 carry the SAME four options in the
 * same order (`-1, 0, 1, 2`), verified against the page as genuinely identical
 * rather than a transcription slip. Several "I only / II only / Both / Neither"
 * questions likewise share an option set exactly. So a match needs the stem to
 * break the tie, and a tie that survives both is REPORTED, never guessed.
 *
 * ## Normalisation is aggressive on purpose
 *
 * The base series carries publication LaTeX (`\(\dfrac{1}{4}\)`) and the
 * matching pass carries deliberately terse text (`1/4`). Comparing them requires
 * folding both to a common form: fractions expanded, LaTeX command names and all
 * non-alphanumerics stripped, lowercased. That is lossy — which is why a match
 * must clear a threshold AND be unique, and why everything below it is printed
 * for a human rather than resolved.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { DATA, QUESTIONS_PER_PAPER, dataPath, requirePaper, requireVariant } from "./config";
import { normalizeQuestions, type Derivation, type TQ } from "./lib";

type VariantQ = {
  number: number;
  stem: string;
  options: { label: string; text: string }[];
};

const LABELS = ["A", "B", "C", "D"] as const;

/**
 * LaTeX commands that are PURE DECORATION once punctuation is stripped: the
 * terse matching pass writes nothing for them, so keeping the command name is
 * what makes the two forms differ.
 *
 * `frac` is here as well as being expanded above, because the expansion cannot
 * nest (`\frac{x^{3/2}}{3}`) and the residue is otherwise a permanent mismatch.
 * Dropping it loses nothing the strip was not already losing — `a/b` and
 * `\frac{a}{b}` both reduce to "ab" either way.
 */
const DROP_COMMANDS = new Set([
  "frac", "dfrac", "tfrac",
  "left", "right",
  "vec", "overrightarrow", "overline", "bar",
  "cdot", "cdots", "ldots", "dots", "quad", "qquad",
  "displaystyle", "limits", "mathord", "nolimits",
]);

/**
 * LaTeX commands the matching pass spells as an ordinary word. The fold is
 * ONE-WAY — the base is rewritten to the variant's convention — because the
 * reverse direction is unsafe: rewriting a standalone " x " to "times" would
 * corrupt `f(x) = x + 1`, which is far commoner in this corpus than a cross
 * product.
 */
const ALIAS_COMMANDS: Record<string, string> = {
  infty: "infinity",
  int: "integral",
  times: "x",
  le: "le", leq: "le",
  ge: "ge", geq: "ge",
  ne: "ne", neq: "ne",
};

/**
 * ASCII operators VARIANT_BRIEF.md tells agents to type, folded onto the name
 * the base's LaTeX reduces to. Aliased rather than stripped: dropping both
 * would make `x <= 2` and `x >= 2` the same string.
 */
const ASCII_OPERATORS: [RegExp, string][] = [
  [/<=/g, " le "],
  [/>=/g, " ge "],
  [/!=/g, " ne "],
];

/** English glue the terse pass writes out and the base encodes as notation. */
const GLUE_WORDS = /\b(?:from|to|of)\b/g;

/**
 * Plain-text abbreviations the terse pass uses for a LaTeX command. Word-bounded
 * so `inf` cannot chew the middle out of `infinity`.
 */
const WORD_ALIASES: [RegExp, string][] = [[/\binf\b/g, "infinity"]];

/**
 * Typographic dashes folded onto the ASCII minus. Publication text uses U+2212
 * and en-dashes where the terse pass types a hyphen, so KEEPING the sign (see
 * below) would otherwise introduce a brand-new mismatch class.
 */
const DASHES = /[‐‑‒–—―−]/g;

/**
 * Characters that survive the final strip.
 *
 * `+` and `-` are here because dropping them silently mis-keys. Set D offers
 * `-1` against `1` (Q102) and `... - 2^n + 1` against `... - 2^n - 1` (Q104):
 * without the sign each pair folds to ONE string, and `labelMap` then pairs
 * greedily in variant order and can invert the two labels with no error raised
 * anywhere.
 *
 * The asymmetry that sets the rule: a character kept too eagerly costs a match
 * the tool REPORTS as "too weak to trust"; a character stripped too eagerly
 * costs a wrong answer letter that nothing downstream can see. So prefer
 * keeping, and let the report absorb the cost.
 */
const KEEP = /[^a-z0-9+-]/g;

/**
 * Fold LaTeX and terse plain text to a comparable form.
 * Exported for tests — this is the one place a bad rule silently mis-matches.
 *
 * Every rule below was earned by a measured failure: series B and C are
 * independently transcribed booklets and both failed to match the SAME nine
 * base questions, which is what identified the base-side normalisation as the
 * common factor rather than either transcription.
 */
export function normText(s: string): string {
  let t = (s ?? "").trim().replace(DASHES, "-");
  // Fractions first: \frac{1}{4} / \dfrac{1}{4} / \tfrac{1}{4} -> 1/4, so the
  // LaTeX form and the terse form converge instead of differing by "frac".
  for (let i = 0; i < 4; i++) {
    t = t.replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)");
  }
  t = t
    // \overline{X} / \bar{X} -> "X bar", matching how the pass types a mean.
    // Must run before DROP_COMMANDS, which would otherwise leave a bare "X".
    .replace(/\\(?:overline|bar)\s*\{([^{}]*)\}/g, "$1 bar")
    .replace(/\\(?:text|mathrm|mathbf|operatorname)\s*\{([^{}]*)\}/g, "$1");
  for (const [re, to] of ASCII_OPERATORS) t = t.replace(re, to);
  t = t
    .replace(/\\([a-zA-Z]+)/g, (_m, name: string) => {
      const n = name as string;
      if (DROP_COMMANDS.has(n)) return " ";
      return ` ${ALIAS_COMMANDS[n] ?? n} `; // \sqrt -> sqrt, \pi -> pi
    })
    .toLowerCase()
    .replace(GLUE_WORDS, " ");
  for (const [re, to] of WORD_ALIASES) t = t.replace(re, to);
  return t.replace(KEEP, "");
}

/** Jaccard over character 3-grams — robust to terse-vs-verbose wording. */
function trigrams(s: string): Set<string> {
  const out = new Set<string>();
  for (let i = 0; i + 3 <= s.length; i++) out.add(s.slice(i, i + 3));
  if (!out.size && s) out.add(s);
  return out;
}
function sim(a: string, b: string): number {
  if (a === b) return 1;
  const A = trigrams(a);
  const B = trigrams(b);
  let inter = 0;
  for (const g of A) if (B.has(g)) inter += 1;
  const uni = A.size + B.size - inter;
  return uni ? inter / uni : 0;
}

/**
 * How well variant question v matches base question q.
 *
 * The base text is CONTEXT + STEM, not the stem alone. A set member's bare stem
 * is often four words ("What is tan A equal to?") and its data lives entirely in
 * the shared context; the matching pass was told to fold the premise into the
 * stem, so comparing against the stem alone would compare a long string to a
 * short one and score every set member badly.
 *
 * `tail` is the LAST part of the stem, which is where near-identical siblings
 * actually differ — Q7/Q8 of this paper are "What is tan A equal to?" and "What
 * is tan B equal to?", sharing a context, an option set AND almost every
 * trigram. Without a term that looks at the distinguishing end of the stem, the
 * pair is a coin flip.
 */
export function scorePair(v: VariantQ, q: TQ): { score: number; optionScore: number } {
  const vOpts = v.options.map((o) => normText(o.text));
  const qOpts = q.options.map((o) => normText(o.text));
  // Best bipartite-ish match: for each base option, its best variant partner.
  let optTotal = 0;
  for (const qo of qOpts) {
    let best = 0;
    for (const vo of vOpts) best = Math.max(best, sim(qo, vo));
    optTotal += best;
  }
  const optionScore = qOpts.length ? optTotal / qOpts.length : 0;

  const baseFull = normText(`${q.context ?? ""} ${q.stem}`);
  const vFull = normText(v.stem);
  const stemScore = sim(vFull, baseFull);

  const tail = (s: string) => s.slice(-40);
  const tailScore = sim(tail(vFull), tail(normText(q.stem)));

  // Options dominate — short, distinctive, read label-by-label. The stem is
  // deliberately abbreviated here so it is corroboration, and the tail exists
  // solely to separate siblings that share everything else.
  return { score: optionScore * 0.6 + stemScore * 0.25 + tailScore * 0.15, optionScore };
}

/**
 * Map each variant label to the base label carrying the same text.
 * Returns null when the option SETS do not correspond one-to-one, which is a
 * finding (a genuinely different option) and must not be smoothed over.
 */
export function labelMap(v: VariantQ, q: TQ): Record<string, string> | null {
  const out: Record<string, string> = {};
  const usedBase = new Set<string>();
  for (const vo of v.options) {
    let best = { label: "", s: 0 };
    for (const qo of q.options) {
      if (usedBase.has(qo.label)) continue;
      const s = sim(normText(vo.text), normText(qo.text));
      if (s > best.s) best = { label: qo.label, s };
    }
    if (!best.label || best.s < 0.6) return null;
    usedBase.add(best.label);
    out[vo.label] = best.label;
  }
  return Object.keys(out).length === 4 ? out : null;
}

/**
 * A HAND-ADJUDICATED label map, for the case the matcher is right to refuse.
 *
 * D-Q106 is the live one: the base reads "minimum occurs at \(x = -2\)" and the
 * Hindi-sourced band reads "Minimum value is at x = -2". Two independent
 * transcriptions of one question, worded differently. The correct pairing is the
 * maximum of every row AND column of the similarity matrix — but at 0.38 against
 * a 0.32 runner-up, which is nowhere near enough to lower a threshold that is
 * protecting the other 119 questions. Loosening a global rule to pass one hard
 * case is how a wrong key gets in; adjudicating that case explicitly is not.
 */
export type LabelAdjudication = {
  number: number;
  base: number;
  labels: Record<string, string>;
  reason: string;
  /** The variant option texts this map was written against, verbatim. */
  assertVariantOptions: Record<string, string>;
  /** The base option texts this map was written against, verbatim. */
  assertBaseOptions: Record<string, string>;
};

/**
 * Apply an adjudication, REFUSING unless the question it was written against is
 * still byte-identical on both sides.
 *
 * The assertions are the whole point. A hand map that silently survives a
 * re-transcription — of either booklet — is a wrong answer letter with a human's
 * signature on it, and nothing downstream re-checks it.
 */
export function adjudicatedLabelMap(
  v: VariantQ,
  q: TQ,
  adj: LabelAdjudication
): Record<string, string> {
  if (adj.base !== q.number) {
    throw new Error(
      `adjudication for Q${adj.number} names base question ${adj.base}, but the matcher paired it with ${q.number}`
    );
  }
  const vText = new Map(v.options.map((o) => [o.label, o.text]));
  for (const [label, want] of Object.entries(adj.assertVariantOptions)) {
    if (vText.get(label) !== want) {
      throw new Error(
        `adjudication for Q${adj.number}: variant option ${label} has changed since it was adjudicated.\n` +
          `  adjudicated against: ${want}\n  now reads:           ${vText.get(label) ?? "(absent)"}`
      );
    }
  }
  const qText = new Map(q.options.map((o) => [o.label, o.text]));
  for (const [label, want] of Object.entries(adj.assertBaseOptions)) {
    if (qText.get(label) !== want) {
      throw new Error(
        `adjudication for Q${adj.number}: base option ${label} has changed since it was adjudicated.\n` +
          `  adjudicated against: ${want}\n  now reads:           ${qText.get(label) ?? "(absent)"}`
      );
    }
  }
  const from = Object.keys(adj.labels).sort().join("");
  const onto = Object.values(adj.labels).sort().join("");
  if (from !== "ABCD" || onto !== "ABCD") {
    throw new Error(
      `adjudication for Q${adj.number}: labels must be a bijection A-D onto A-D (got ${from} -> ${onto})`
    );
  }
  return adj.labels;
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const series = (process.argv[3] ?? "").toUpperCase();
  requireVariant(paper.id, series);
  const apply = process.argv.includes("--apply");

  const base: TQ[] = normalizeQuestions(
    JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8"))
  );
  const answers = JSON.parse(readFileSync(dataPath(paper.id, "answers"), "utf8")) as {
    derivations: Derivation[];
  };
  const baseAnswer = new Map(answers.derivations.map((d) => [d.number, (d.answer ?? "").toUpperCase()]));
  const baseByNumber = new Map(base.map((q) => [q.number, q]));

  // Optional hand adjudications. Absent is the normal case; each one that IS
  // present must be USED, or it is describing a question that has moved.
  const adjPath = `${DATA}/${paper.id}-${series}.labelmap.json`;
  const adjudications = new Map<number, LabelAdjudication>();
  if (existsSync(adjPath)) {
    const file = JSON.parse(readFileSync(adjPath, "utf8")) as { adjudications: LabelAdjudication[] };
    for (const a of file.adjudications ?? []) adjudications.set(a.number, a);
  }
  const usedAdjudications = new Set<number>();

  const re = new RegExp(`^${paper.id}-${series}\\.b[A-Za-z0-9]+\\.json$`);
  const files = readdirSync(DATA).filter((f) => re.test(f)).sort();
  if (!files.length) throw new Error(`no band files matching ${paper.id}-${series}.b<N>.json`);

  const vqs: VariantQ[] = [];
  for (const f of files) {
    const band = JSON.parse(readFileSync(`${DATA}/${f}`, "utf8"));
    for (const q of band.questions ?? []) {
      const opts = Array.isArray(q.options)
        ? q.options
        : Object.entries(q.options ?? {}).map(([label, text]) => ({ label, text }));
      vqs.push({
        number: Number(q.number),
        stem: String(q.stem ?? ""),
        options: opts.map((o: { label: string; text: string }) => ({
          label: String(o.label).toUpperCase(),
          text: String(o.text ?? ""),
        })),
      });
    }
  }
  vqs.sort((a, b) => a.number - b.number);
  console.log(`${paper.id}-${series}: ${files.length} band file(s), ${vqs.length} questions`);

  const errors: string[] = [];
  const rows: {
    number: number;
    base: number;
    answer: string;
    score: number;
    margin: number;
    permuted: boolean;
    labels: Record<string, string>;
  }[] = [];

  // GLOBAL ASSIGNMENT, not greedy per question.
  //
  // Per-question matching breaks on sibling pairs that share a context, an
  // option set and nearly every trigram — Q7/Q8 here differ only in "tan A" vs
  // "tan B", and BOTH variant siblings score almost identically against BOTH
  // base siblings. Deciding each in isolation is a coin flip that can take the
  // pair the wrong way round, and nothing downstream would notice because both
  // questions exist and both get an answer.
  //
  // Assigning globally in descending score order, one base question to one
  // variant question, lets the stronger of the two pairings claim its partner
  // first and forces the weaker into the only seat left — so a tiny real signal
  // decides it rather than a threshold.
  const pairs: { v: VariantQ; q: TQ; score: number }[] = [];
  for (const v of vqs) for (const q of base) pairs.push({ v, q, ...scorePair(v, q) });
  pairs.sort((a, b) => b.score - a.score);

  // Best alternative per variant question, for an honest margin.
  const bestFor = new Map<number, number[]>();
  for (const p of pairs) {
    const arr = bestFor.get(p.v.number) ?? [];
    if (arr.length < 2) { arr.push(p.score); bestFor.set(p.v.number, arr); }
  }

  const takenV = new Set<number>();
  const takenQ = new Set<number>();
  const assigned: { v: VariantQ; q: TQ; score: number }[] = [];
  for (const p of pairs) {
    if (takenV.has(p.v.number) || takenQ.has(p.q.number)) continue;
    takenV.add(p.v.number);
    takenQ.add(p.q.number);
    assigned.push(p);
  }

  for (const { v, q, score } of assigned.sort((a, b) => a.v.number - b.v.number)) {
    const alts = bestFor.get(v.number) ?? [score];
    const margin = alts.length > 1 ? alts[0] - alts[1] : 1;
    if (score < 0.5) {
      errors.push(`Q${v.number}: best match A-Q${q.number} scores only ${score.toFixed(2)} — too weak to trust`);
      continue;
    }
    const adj = adjudications.get(v.number);
    let lm = labelMap(v, q);
    if (adj) {
      const hand = adjudicatedLabelMap(v, q, adj); // throws if its premises moved
      if (lm && JSON.stringify(lm) !== JSON.stringify(hand)) {
        // Drift in EITHER direction is a finding: a normalisation improvement
        // has made this question match naturally and disagrees with the human.
        throw new Error(
          `Q${v.number}: the matcher now resolves this question ITSELF and disagrees with the ` +
            `hand adjudication.\n  matcher: ${JSON.stringify(lm)}\n  hand:    ${JSON.stringify(hand)}\n` +
            `  Re-read the page and delete whichever is wrong — do not keep both.`
        );
      }
      usedAdjudications.add(v.number);
      lm = hand;
    }
    if (!lm) {
      errors.push(
        `Q${v.number} -> A-Q${q.number}: option sets do not correspond one-to-one — ` +
          `a genuinely different option, or a transcription error. Check the page.`
      );
      continue;
    }
    const baseCorrect = baseAnswer.get(q.number);
    if (!baseCorrect) {
      errors.push(`A-Q${q.number}: no base answer`);
      continue;
    }
    const answer = Object.entries(lm).find(([, b]) => b === baseCorrect)?.[0];
    if (!answer) {
      errors.push(`Q${v.number}: no label maps onto base answer ${baseCorrect}`);
      continue;
    }
    const permuted = Object.entries(lm).some(([v1, b]) => v1 !== b);
    rows.push({ number: v.number, base: q.number, answer, score, margin, permuted, labels: lm });
  }

  // An adjudication that never fired is describing a question that has moved —
  // it must fail loudly rather than sit in the file looking like coverage.
  for (const n of adjudications.keys()) {
    if (!usedAdjudications.has(n)) {
      errors.push(
        `adjudication for Q${n} was never applied — the matcher did not reach that question. Stale?`
      );
    }
  }

  // Coverage, both ways.
  const got = new Set(rows.map((r) => r.number));
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!got.has(n)) errors.push(`missing ${series}-Q${n}`);
  const gotBase = new Set(rows.map((r) => r.base));
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!gotBase.has(n)) errors.push(`no ${series} question maps to A-Q${n}`);

  const permuted = rows.filter((r) => r.permuted);
  console.log(`matched ${rows.length}/${QUESTIONS_PER_PAPER}`);
  console.log(
    `option order: ${rows.length - permuted.length} identical to series A, ${permuted.length} PERMUTED`
  );
  if (permuted.length) {
    for (const r of permuted) {
      console.log(
        `   ${series}-Q${r.number} (A-Q${r.base}): ${Object.entries(r.labels).map(([a, b]) => `${a}->${b}`).join(" ")}  answer ${r.answer}`
      );
    }
  }
  const weak = rows.filter((r) => r.score < 0.75).sort((a, b) => a.score - b.score);
  if (weak.length) {
    console.log(`\nweakest matches (read these):`);
    for (const r of weak.slice(0, 12)) {
      console.log(`   ${series}-Q${r.number} -> A-Q${r.base}  score ${r.score.toFixed(2)}`);
    }
  }

  // BLOCK CHECK — a report, never an input. See the header.
  const blocks = new Map<number, Set<number>>();
  for (const r of rows) {
    const vb = Math.floor((r.number - 1) / 10);
    const ab = Math.floor((r.base - 1) / 10);
    if (!blocks.has(vb)) blocks.set(vb, new Set());
    blocks.get(vb)!.add(ab);
  }
  const clean = [...blocks.entries()].every(([, s]) => s.size === 1);
  console.log(
    `\nblock structure: ${clean ? "HOLDS" : "DOES NOT HOLD"} — ` +
      [...blocks.entries()].sort((a, b) => a[0] - b[0]).map(([vb, s]) => `${vb}->${[...s].join("/")}`).join(" ")
  );

  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
  }
  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}-${series}.map.json. Nothing written.`);
    return;
  }
  if (errors.length) throw new Error("refusing to write a map with errors.");
  writeFileSync(
    dataPath(`${paper.id}-${series}`, "map"),
    JSON.stringify({ series, rows }, null, 2) + "\n",
    "utf8"
  );
  console.log(`\nwrote ${dataPath(`${paper.id}-${series}`, "map")}`);
}

if (require.main === module) main();
