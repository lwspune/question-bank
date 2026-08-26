/**
 * GAT ingestion lint — checks a paper's records against scripts/practice-paper/GAT_RULES.md.
 *
 *   npx tsx scripts/practice-paper/gat-lint.ts <slug>
 *
 * Run BEFORE `commit-paper.ts <slug> --apply`. Exits 1 on any BLOCKING finding.
 *
 * Scope, stated honestly: rules 0-3 and 6 are mechanically checkable and are GATES.
 * Rules 4, 5 and 7 cannot be judged by a script — a diagram's contents, whether a
 * derivation is hand-wavy, and whether a referenced figure exists are all human or
 * agent calls. For those this prints a TRIAGE list: it tells you WHERE to look, and
 * a clean triage list is NOT a pass. Saying so in the output matters, because a lint
 * that quietly reports nothing reads as "checked and fine".
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PAPERS, DATA, type PaperRec } from "./config";

type Finding = { n: number; rule: string; severity: "BLOCK" | "TRIAGE"; msg: string };

const LABELS = ["optA", "optB", "optC", "optD"] as const;

/**
 * Drop GFM table rows before testing for a flattened list.
 *
 * A correctly-formatted match-list table has cells like `| A. First Schedule | 1. Anti-Defection |`,
 * whose `1. ` and `2. ` match the statement-list pattern — so an unmasked check flags a
 * question that is already compliant. Found by sampling the lint's own output against a
 * shipped paper (gat-mock-w09 Q62) before trusting its counts.
 */
function withoutTableRows(s: string): string {
  return s
    .split("\n")
    .filter((l) => !/^\s*\|.*\|\s*$/.test(l))
    .join("\n");
}

/** A stem that poses numbered statements 1..N and asks which are correct. */
export function isStatementList(stem: string): boolean {
  const s = withoutTableRows(stem);
  return /(^|\s)1\.\s/.test(s) && /(^|\s)2\.\s/.test(s);
}

/** A stem built from P./Q./R./S. fragments to be rearranged. */
export function isPqrs(stem: string): boolean {
  const s = withoutTableRows(stem);
  return /(^|\s)P\.\s/.test(s) && /(^|\s)Q\.\s/.test(s) && /(^|\s)R\.\s/.test(s);
}

/**
 * A two-column pair list. Deliberately NOT keyed on the words "List I"/"List II" —
 * a match-list often prints bare column headings instead (Oswaal Mock 10 Q86 prints
 * "Location / Leader"), so the vocabulary test misses it. Keyed on the ASK instead.
 */
export function isPairList(stem: string): boolean {
  if (/List\s*[-–—]?\s*(I|1|II|2)\b/i.test(stem)) return true;
  if (/\bColumn\s*[-–—]?\s*(I|1|II|2|A|B)\b/i.test(stem)) return true;
  // Otherwise the stem must actually CONTAIN a list to tabulate. "Which one of the
  // following pairs is not correctly matched?" puts each pair in an OPTION, so there
  // is nothing to lay out as a table and rule 2 does not apply — asking for one would
  // be noise, and noise is what makes a lint get ignored.
  const body = withoutTableRows(stem);
  const rows = body.split("\n").filter((l) => /^\s*(?:\d+\.|[A-D]\.|\([a-d]\))\s+\S/.test(l));
  return /\bpairs?\b/i.test(body) && /\b(match|matched|correctly)\b/i.test(body) && rows.length >= 2;
}

/** A GFM pipe table needs a header row AND a |---|---| separator, else it renders as prose. */
export function hasPipeTable(s: string): boolean {
  const lines = s.split("\n").map((l) => l.trim());
  return lines.some((l) => /^\|/.test(l) && /\|$/.test(l) && /^[|\s:-]+$/.test(l.replace(/[^|\s:-]/g, "")))
    && lines.some((l) => /^\|.*\|$/.test(l) && /---/.test(l));
}

/** Residue that must never reach a student. */
const LLM_RESIDUE = /\bas an AI\b|\bI cannot\b|\bI'm unable\b|\blanguage model (?:here|is used)\b|REVIEW:|TODO\b|FIXME|note to self|\bplaceholder\b|\[\s*\?\s*\]/i;

/** Assertion-instead-of-derivation markers. */
const HANDWAVE = /\b(?:obviously|clearly|evidently)\b|it is (?:a )?(?:well[- ]known|standard) (?:fact|result)|self[- ]explanatory|by inspection it is clear/i;

/** A stem that promises a figure. */
const FIGURE_REF = /\b(?:figure|fig\.|diagram|graph|image|picture|shown (?:below|above)|given (?:figure|diagram))\b/i;

export function lintRecord(r: PaperRec & { context?: string; imageUrl?: string | null }): Finding[] {
  const out: Finding[] = [];
  const add = (rule: string, severity: "BLOCK" | "TRIAGE", msg: string) =>
    out.push({ n: r.n, rule, severity, msg });

  // ---- Rule 0: exactly four distinct, non-empty options ----------------------
  const opts = LABELS.map((k) => String((r as any)[k] ?? "").trim());
  const empty = LABELS.filter((k, i) => !opts[i]);
  if (empty.length) add("0", "BLOCK", `missing option(s): ${empty.join(", ")}`);
  const distinct = new Set(opts.filter(Boolean).map((o) => o.toLowerCase()));
  if (opts.every(Boolean) && distinct.size < 4) add("0", "BLOCK", "options are not distinct");

  // Contamination: option (d) swallowing the next block's header + Directions.
  // Absence and corruption are different failures; an emptiness check passes this.
  const maxSibling = Math.max(1, ...opts.slice(0, 3).map((o) => o.length));
  if (/\bDirections\b/.test(opts[3])) add("0", "BLOCK", "optD contains a Directions block");
  else if (opts[3].length > 120 && opts[3].length > 4 * maxSibling)
    add("0", "BLOCK", `optD looks contaminated (${opts[3].length} chars vs ${maxSibling} max sibling)`);

  const stem = String(r.stem ?? "");

  // ---- Rules 1 / 3: statement and PQRS parts need their own lines -------------
  if (isStatementList(stem) && !/\n\s*2\./.test(stem))
    add("1", "BLOCK", "statement list is flattened — each numbered statement needs its own line");
  if (isPqrs(stem) && !/\n\s*Q\./.test(stem))
    add("3", "BLOCK", "P./Q./R./S. parts are flattened — each part needs its own line");

  // ---- Rule 2: pair lists must be a real GFM table ---------------------------
  if (isPairList(stem) && !hasPipeTable(stem) && !hasPipeTable(String(r.context ?? "")))
    add("2", "BLOCK", "pair/match list is not a GFM table (needs a header row AND a |---|---| separator)");

  const sol = String(r.solution ?? "");

  // ---- Rule 6: no LLM / process residue --------------------------------------
  if (LLM_RESIDUE.test(sol)) add("6", "BLOCK", `solution carries process residue: ${sol.match(LLM_RESIDUE)?.[0]}`);
  if (LLM_RESIDUE.test(stem)) add("6", "BLOCK", "stem carries process residue");

  // ---- Rule 5: hand-wavy solutions (TRIAGE — a script cannot judge a derivation)
  if (!sol.trim()) add("5", "BLOCK", "no solution");
  else {
    if (HANDWAVE.test(sol)) add("5", "TRIAGE", `assertion marker: "${sol.match(HANDWAVE)?.[0]}"`);
    if (sol.length < 90) add("5", "TRIAGE", `solution is only ${sol.length} chars — check it derives rather than restates`);
  }

  // ---- Rules 4 + 7: figures (TRIAGE — needs eyes on the image) ---------------
  if (FIGURE_REF.test(stem) || opts.some((o) => FIGURE_REF.test(o))) {
    const hasImg = Boolean((r as any).imageUrl);
    if (!hasImg) add("7", "BLOCK", "references a figure but no image is attached — unanswerable as stored");
    else add("4", "TRIAGE", "has a figure: check the image for answer-leaking text");
  }

  return out;
}

function main() {
  const slug = process.argv[2];
  if (!slug) throw new Error("usage: gat-lint.ts <slug>");
  const spec = PAPERS[slug];
  if (!spec) throw new Error(`unknown paper slug "${slug}"`);
  const recs: PaperRec[] = JSON.parse(
    readFileSync(join(DATA, spec.recordsFile ?? `${slug}.records.json`), "utf-8"),
  );

  const findings = recs.flatMap((r) => lintRecord(r as any));
  const blocking = findings.filter((f) => f.severity === "BLOCK");
  const triage = findings.filter((f) => f.severity === "TRIAGE");

  const show = (fs: Finding[]) =>
    fs.forEach((f) => console.log(`  Q${String(f.n).padEnd(4)} rule ${f.rule}  ${f.msg}`));

  console.log(`GAT lint — ${slug}: ${recs.length} records\n`);
  console.log(`BLOCKING (${blocking.length}):`);
  show(blocking);
  console.log(`\nTRIAGE (${triage.length}) — rules 4/5/7 need a human or agent call:`);
  show(triage);
  console.log(
    `\nNOTE: rules 4, 5 and 7 are only partly machine-checkable. An empty TRIAGE list means` +
      ` "nothing matched the heuristics", NOT "the diagrams and derivations were reviewed".`,
  );

  if (blocking.length) process.exit(1);
}

if (require.main === module) main();
