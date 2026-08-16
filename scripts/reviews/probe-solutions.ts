/**
 * Zero-LLM structural probes over a paper's STORED SOLUTIONS.
 *
 *   npx tsx scripts/reviews/probe-solutions.ts
 *
 * These are the defect classes a machine can find, so the LLM read-through can
 * spend its attention on the ones only a reader can catch. TRIAGE, exits 0.
 *
 *   LETTER_CONFLICT  the solution concludes a different option letter than the key
 *   NO_DERIVATION    the solution asserts an answer without working ("the standard
 *                    result is", "the printed solution gives") — a solution that
 *                    cites an authority instead of deriving is unverified by
 *                    definition, and this class has hidden a real wrong key before
 *   SELF_DOUBT       the solution argues with itself ("wait", "recalculat",
 *                    "hmm", "actually") — the signature of a model talking itself
 *                    into an answer its own arithmetic refutes
 *   DUP_OPTION       two options carry the same text
 *   FALSE_EQUALITY   a pure-numeric equality chain in the solution that does not
 *                    evaluate (two errors under a correct answer are invisible to
 *                    any answer-vs-key check)
 *   BROKEN_MATH      unbalanced \( \) delimiters, or an empty/backslash-only zone
 *   TRUNCATED        solution ends mid-sentence / mid-math
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

type Opt = { label: string; text: string; is_correct?: boolean };
type Row = { questionId: string; questionNumber: string | null; text: string | null; options: Opt[]; solution: string | null };

const DATA = join(process.cwd(), "scripts", "reviews", "data", "audit-run");

/**
 * Last option letter the solution commits to, e.g. "hence option (C)" / "answer: B".
 *
 * The LETTER half is deliberately case-SENSITIVE. Matching a lowercase "a" makes
 * the English article fire on most of the corpus — "Therefore, a 6-bit number…"
 * was read as "answer = A" and manufactured a conflict on a correct row. Same bug
 * as the 2026-08-14 `isShuffleEligible` fix; keep the two rules in agreement.
 */
function concludedLetter(sol: string): string | null {
  const re = /(?:option|answer|choice|correct|hence|therefore|thus|ans)\W{0,12}\(?\b([A-D])\b\)?/g;
  let m: RegExpExecArray | null;
  let last: string | null = null;
  while ((m = re.exec(sol))) last = m[1];
  return last;
}

const CITES = /\b(the (printed|standard|given|official|book'?s?) (solution|result|answer|key)|as per the key|according to the key|it is (a )?(known|standard) result)\b/i;
const DOUBT = /\b(wait|recalculat|hmm|let me reconsider|actually,|on second thought|oh,? I)\b/i;

/**
 * A false arithmetic claim, e.g. "60 - 4 = 40".
 *
 * THREE artifact classes had to be excluded, all found by adjudicating a run whose
 * every hit was noise:
 *  - a PARTIAL GRAB of a longer true chain: "16 + 49 - 9 = 56" matched as
 *    "49 - 9 = 56". Fires on any correct multi-term arithmetic, so the match must
 *    not be flanked by more of the same expression.
 *  - a LaTeX exponent: "2^6 - 1 = 64 - 1 = 63" matched as "6 - 1 = 64".
 *  - a BINARY numeral: "30 = 16+8+4+2 = 11110_2" matched as "4 + 2 = 11110".
 */
function falseEqualities(sol: string): string[] {
  const bad: string[] = [];
  const re = /(-?\d+(?:\.\d+)?)\s*([+\-*/×])\s*(-?\d+(?:\.\d+)?)\s*=\s*(-?\d+(?:\.\d+)?)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(sol))) {
    const before = sol.slice(Math.max(0, m.index - 2), m.index);
    const after = sol.slice(m.index + m[0].length, m.index + m[0].length + 2);
    // flanked by more arithmetic, or by ^/_ => the capture is a fragment, not a claim
    if (/[\d.^_)]\s*$/.test(before) || /^\s*[+\-*/×=^_]/.test(after)) continue;
    // a run of 0/1 longer than 3 digits in the result is a binary numeral, not a number
    if (/^[01]{4,}$/.test(m[4])) continue;
    const [, a, op, b, c] = m;
    const x = parseFloat(a), y = parseFloat(b), z = parseFloat(c);
    let v: number;
    switch (op) {
      case "+": v = x + y; break;
      case "-": v = x - y; break;
      case "*": case "×": v = x * y; break;
      default: v = y === 0 ? NaN : x / y;
    }
    if (Number.isFinite(v) && Math.abs(v - z) > 1e-9) bad.push(m[0]);
  }
  return bad;
}

function brokenMath(sol: string): string | null {
  const open = (sol.match(/\\\(/g) ?? []).length;
  const close = (sol.match(/\\\)/g) ?? []).length;
  if (open !== close) return `delimiters \\( x${open} vs \\) x${close}`;
  if (/\\\(\s*\\?\s*\\\)/.test(sol)) return "empty math zone";
  if (/\\\([^)]*\\\s*\\\)/.test(sol)) return "backslash-only math zone";
  return null;
}

function main() {
  const files = readdirSync(DATA).filter((f) => f.endsWith(".json")).map((f) => join(DATA, f));
  const seen = new Set<string>();
  const hits: Record<string, string[]> = {
    LETTER_CONFLICT: [], NO_DERIVATION: [], SELF_DOUBT: [], DUP_OPTION: [],
    FALSE_EQUALITY: [], BROKEN_MATH: [], TRUNCATED: [],
  };
  let n = 0;

  for (const f of files) {
    const rows: Row[] = JSON.parse(readFileSync(f, "utf8"));
    const src = f.split(/[\\/]/).pop()!.replace(".audit.json", "");
    for (const r of rows) {
      if (seen.has(r.questionId)) continue; // 16 rows appear in two dumps
      seen.add(r.questionId);
      n++;
      const qn = `${src.slice(6, 14)} ${r.questionNumber ?? r.questionId.slice(0, 8)}`.padEnd(28);
      const sol = (r.solution ?? "").trim();
      const key = r.options.find((o) => o.is_correct)?.label ?? "?";

      if (sol) {
        const got = concludedLetter(sol);
        if (got && got !== key) hits.LETTER_CONFLICT.push(`${qn} key=${key} solution says ${got}`);
        if (CITES.test(sol)) hits.NO_DERIVATION.push(`${qn} ${sol.match(CITES)![0]}`);
        if (DOUBT.test(sol)) hits.SELF_DOUBT.push(`${qn} ${sol.match(DOUBT)![0]}`);
        const fe = falseEqualities(sol);
        if (fe.length) hits.FALSE_EQUALITY.push(`${qn} ${fe.join(" | ")}`);
        const bm = brokenMath(sol);
        if (bm) hits.BROKEN_MATH.push(`${qn} ${bm}`);
        if (/[+\-*/=,(]$|\\$|\b(and|the|of|is|to|by|we|so)$/i.test(sol)) hits.TRUNCATED.push(`${qn} ends "...${sol.slice(-40)}"`);
      }

      const texts = r.options.map((o) => o.text.replace(/\s/g, "").toLowerCase());
      const dup = texts.find((t, i) => texts.indexOf(t) !== i);
      if (dup) hits.DUP_OPTION.push(`${qn} duplicate option text "${dup.slice(0, 40)}"`);
    }
  }

  console.log(`\nprobed ${n} distinct question(s) across ${files.length} dump file(s)\n`);
  let total = 0;
  for (const [k, v] of Object.entries(hits)) {
    if (!v.length) { console.log(`  ${k.padEnd(16)} clean`); continue; }
    total += v.length;
    console.log(`\n--- ${k} (${v.length}) ---`);
    for (const l of v) console.log("  " + l);
  }
  console.log(`\n${total} row(s) flagged for a human look. TRIAGE — a hit is a hypothesis, not a defect.\n`);
}

main();
