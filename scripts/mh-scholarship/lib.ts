// Pure core for the Maharashtra Scholarship lane (MSCE Pune), beyond what it
// imports from ../upsc/lib and ../capf/lib. Unit-tested in
// tests/mh-scholarship-lib.test.ts.
//
// MSCE's final keys print the OPTION NUMBER (1-4) per question and set, and a
// two-answer item as "2&4": the paper's rule 5, "Maximum 20% questions are
// having two correct alternatives. Candidate has to darken both". The bank
// stores exactly one correct option (migrations 0001, 0119) and a mock answer
// is one letter (0044), so a two-answer item is HELD: transcribed and keyed
// here, NOT committed, until a "select two" format exists (owner, 2026-11-20).

export type MsceKey = {
  /** Single-answer items: question -> A-D, or "X" for a cancelled item. */
  key: Record<string, string>;
  /** Two-answer items ("2&4": the student must mark BOTH): question -> the two letters, in order. HELD. */
  pairs: Record<string, [string, string]>;
  /**
   * Either-answer items ("1OR2": MSCE accepts EITHER mark): question -> both
   * letters, in order. Single-answer items, so they are committed: `key` holds
   * the first letter; keycheck ships the one the blind pass reached, with a
   * notice naming both, and grace in mocks (the Homi Bhabha two-key rule).
   */
  either: Record<string, [string, string]>;
};

const DIGIT_TO_LETTER: Record<string, string> = { "1": "A", "2": "B", "3": "C", "4": "D" };
/** MSCE prints "*" against a cancelled question ("* असे चिन्ह ... रद्द"). */
const CANCELLED = new Set(["X", "*", "DROP", "CANCELLED", "CANCEL", "रद्द"]);

/**
 * Turn a read of MSCE's key (question -> cell text, the Set A column) into
 * letters. REFUSES an unreadable cell and a short key: a misread cell must
 * stop the run, never fall through to a derived answer.
 *
 * `held`: numbers the config deliberately leaves out; only those may be absent.
 */
export function normaliseMsceKey(raw: Record<string, string>, total: number, held: number[] = []): MsceKey {
  const skip = new Set(held);
  const key: Record<string, string> = {};
  const pairs: Record<string, [string, string]> = {};
  const either: Record<string, [string, string]> = {};
  for (const [k, v] of Object.entries(raw)) {
    const n = Number(k);
    if (!Number.isInteger(n) || n < 1 || n > total) throw new Error(`key has Q${k}, outside 1..${total}`);
    const cell = String(v ?? "").trim();
    if (CANCELLED.has(cell.toUpperCase()) || CANCELLED.has(cell)) {
      key[String(n)] = "X";
      continue;
    }
    const or = cell.match(/^([1-4])\s*or\s*([1-4])$/i);
    if (or) {
      if (or[1] === or[2]) throw new Error(`Q${n}: key cell ${JSON.stringify(v)} names the same option twice`);
      const pair = [DIGIT_TO_LETTER[or[1]], DIGIT_TO_LETTER[or[2]]].sort() as [string, string];
      either[String(n)] = pair;
      key[String(n)] = pair[0];
      continue;
    }
    const parts = cell.split(/\s*[&,]\s*/).filter(Boolean);
    const letters = parts.map((p) => DIGIT_TO_LETTER[p]);
    const bad =
      !parts.length || parts.length > 2 || letters.some((l) => !l) || (letters.length === 2 && letters[0] === letters[1]);
    if (bad) throw new Error(`Q${n}: key cell ${JSON.stringify(v)} is not 1-4, a pair like "2&4", or a cancelled mark`);
    if (letters.length === 1) key[String(n)] = letters[0];
    else pairs[String(n)] = [...letters].sort() as [string, string];
  }
  const missing: number[] = [];
  for (let n = 1; n <= total; n++) {
    if (!(String(n) in key) && !(String(n) in pairs) && !skip.has(n)) missing.push(n);
  }
  if (missing.length) {
    throw new Error(
      `key is missing ${missing.length} of ${total} question(s): Q${missing.slice(0, 12).join(", Q")}` +
        `${missing.length > 12 ? ", ..." : ""}. A partial key must not be used as a full one.`,
    );
  }
  return { key, pairs, either };
}

/** Numbers NOT committed: every two-answer item plus the config's own held numbers. */
export function heldForKey(k: MsceKey, configHeld: number[] = []): number[] {
  return [...new Set([...Object.keys(k.pairs).map(Number), ...configHeld])].sort((a, b) => a - b);
}

/** A blind pass's answer: one letter, or two ("B,D" / "B&D"), returned sorted. */
export function parseBlindAnswer(answer: string): string[] {
  const parts = String(answer ?? "")
    .toUpperCase()
    .split(/\s*[&,]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
  const ok = parts.length >= 1 && parts.length <= 2 && parts.every((p) => /^[ABCD]$/.test(p)) && new Set(parts).size === parts.length;
  if (!ok) throw new Error(`answer ${JSON.stringify(answer)} is not one letter A-D or two different ones`);
  return parts.sort();
}

export type MsceScore = {
  scored: number;
  match: number;
  mismatched: number[];
  byConfidence: Record<string, { ok: number; of: number }>;
};

/** Score a blind pass against MSCE's key: a two-answer item is right only when BOTH letters match. */
export function scoreMsce(k: MsceKey, pass: { number: number; answer: string; confidence?: string }[]): MsceScore {
  const s: MsceScore = { scored: 0, match: 0, mismatched: [], byConfidence: {} };
  for (const d of [...pass].sort((x, y) => x.number - y.number)) {
    const n = String(d.number);
    const expected = k.pairs[n] ? [...k.pairs[n]] : k.key[n] && k.key[n] !== "X" ? [k.key[n]] : null;
    if (!expected) continue;
    let got: string[] = [];
    try {
      got = parseBlindAnswer(d.answer);
    } catch {
      got = [];
    }
    const ok = k.either[n]
      ? got.length === 1 && k.either[n].includes(got[0])
      : got.length === expected.length && got.every((l, i) => l === expected[i]);
    s.scored++;
    if (ok) s.match++;
    else s.mismatched.push(d.number);
    const c = (d.confidence ?? "").trim().toUpperCase() || "?";
    s.byConfidence[c] ??= { ok: 0, of: 0 };
    s.byConfidence[c].of++;
    if (ok) s.byConfidence[c].ok++;
  }
  return s;
}

/** Each paper prints two sections; the section fixes an item's subject. */
const SECTIONS: Record<1 | 2, [string, string]> = {
  1: ["English", "Mathematics"],
  2: ["Marathi", "Intelligence Test"],
};
const PAPER_LABEL: Record<1 | 2, string> = { 1: "Paper I", 2: "Paper II" };

/** The subject of item n on Paper I or II: Section I is Q1-25, Section II Q26-75. */
export function sectionSubject(paper: 1 | 2, n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 75) throw new Error(`Q${n} is outside 1..75`);
  return SECTIONS[paper][n <= 25 ? 0 : 1];
}

/** One message per item whose subject is not its section's. */
export function sectionErrors(paper: 1 | 2, items: { number: number; subject: string }[]): string[] {
  const out: string[] = [];
  for (const q of items) {
    const want = sectionSubject(paper, q.number);
    if (q.subject !== want) {
      out.push(`Q${q.number}: subject "${q.subject}", but ${PAPER_LABEL[paper]} ${q.number <= 25 ? "Q1-25" : "Q26-75"} is ${want}`);
    }
  }
  return out;
}

/**
 * Compare two independent reads of a scanned key (question -> cell text).
 * Returns one line per cell that differs, in question order; empty = agreed.
 * keycheck.ts refuses to run until this is empty: on 2026-11-20 a single read
 * of ms8-2026-p1 got 4 of 75 cells wrong (Q35, Q36, Q44, Q67), and a "second
 * read" done from memory repeated them; only the blind pass exposed them.
 */
export function keyReadDiff(a: Record<string, string>, b: Record<string, string>): string[] {
  const norm = (v: string | undefined) => String(v ?? "").replace(/\s+/g, "").toUpperCase();
  const nums = [...new Set([...Object.keys(a), ...Object.keys(b)])].map(Number).sort((x, y) => x - y);
  const out: string[] = [];
  for (const n of nums) {
    const x = a[String(n)];
    const y = b[String(n)];
    if (norm(x) !== norm(y)) out.push(`Q${n}: read 1 "${x ?? ""}", read 2 "${y ?? ""}"`);
  }
  return out;
}
