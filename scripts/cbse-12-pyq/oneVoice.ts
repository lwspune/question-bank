/**
 * One voice for a CBSE board solution (2026-11-19, SUGGESTIONS.md ledger: 96 CBSE
 * 12 Physics rows carried a "CBSE's marking scheme: ... / Added here, and not
 * from the marking scheme: ..." scaffolding, 16 of them a mark split written for
 * the marker). A stored answer reads as the answer a student would write
 * (scripts/lib/boardAnswerStyle.ts), so:
 *   - meta paragraphs about the scheme go: its header, "answers Section A with the
 *     option letter alone", "allots N marks", "Marks: ...", "The mark split is",
 *     every note telling a marker what to credit or not deduct, and a
 *     "[CBSE marking scheme: ...]" bracket (listed in `review` so a person sees it);
 *   - labels go and the text they label stays: "Added here, and not from the
 *     marking scheme[, ...]:", "The scheme's value point(s):", "(the scheme ...)"
 *     asides; "The scheme prints the X:" becomes "X:", keeping a part number;
 *   - an MCQ's "The keyed option is X." moves to the end as "So the answer is X.".
 * A mention that carries exam information ("half a mark is deducted if the
 * direction is not shown") is left alone.
 */

const DROP = [
  /^CBSE's marking scheme answers Section [A-E] with the option letter\b/,
  /^CBSE's marking scheme:\s*$/,
  /^CBSE's marking scheme allots\b/,
  /^Marks:/,
  /^The mark split is\b/,
  /^Note: the scheme (?:instructs|deducts|adds|awards|allows)\b/,
  /^The scheme adds (?:that full credit|a note)\b/,
  /^Alternatively:.*\b(?:full credit|full marks)\b/,
  /^A note on the printed scheme\b/,
];

const PART = String.raw`((?:\([ivx]+\)|\([a-z]\))\s*)?`;
const ADDED = /^Added here, and not from the marking scheme(?:,[^:]*)?:\s*/;
const VALUE_POINT = new RegExp(`^${PART}The scheme's value points?:\\s*`);
const PRINTS = new RegExp(`^${PART}The scheme (?:also )?prints the ([^.:]+):\\s*`);
const OWN_HEADING = /^CBSE's marking scheme \(([^)]*)\):/;

const cap = (s: string) => (/^[a-z]/.test(s) ? s[0].toUpperCase() + s.slice(1) : s);

export function oneVoice(solution: string): { text: string; review: string[] } {
  const review: string[] = [];
  let answer: string | null = null;
  const out: string[] = [];

  for (const raw of solution.split(/\n\s*\n/)) {
    let p = raw.trim();
    if (!p) continue;
    if (DROP.some((rx) => rx.test(p))) continue;
    if (/^\[CBSE marking scheme:/.test(p)) {
      review.push(p.slice(0, 160));
      continue;
    }
    const keyed = /^The keyed option is ([\s\S]+?)\.?$/.exec(p);
    if (keyed) {
      answer = keyed[1];
      continue;
    }

    if (ADDED.test(p)) p = cap(p.replace(ADDED, ""));
    const vp = VALUE_POINT.exec(p);
    if (vp) p = (vp[1] ?? "") + cap(p.slice(vp[0].length));
    p = p.replace(PRINTS, (_m, part = "", what: string) => `${part}${cap(what)}: `);
    p = p.replace(OWN_HEADING, (_m, what: string) => `${cap(what)}:`);
    p = p.replace(/\s*\(the scheme's value points?\)/g, "").replace(/\s*\(the scheme [^)]*\)/g, "");
    p = p.replace(/\bthe keyed option\b/g, "the answer");
    p = p.trim();
    if (!p) continue;
    out.push(p);
  }

  if (answer) out.push(`So the answer is ${answer}.`);
  return { text: out.join("\n\n"), review };
}
