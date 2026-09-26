/**
 * PHANTOM_ARROW — a reagent or condition written over a reaction arrow that renders
 * as NOTHING. The 2025 MHT-CET papers (and some JEE 2021-2023 rows) put the reagent
 * in a Word text box above the arrow; pandoc keeps its text but wraps it in
 * `\phantom{...}`, which reserves the space and draws nothing. The stem then shows
 * a bare arrow and asks "identify the product" of a reaction whose reagent the
 * student cannot see. No other gate notices: the LaTeX is valid and renders cleanly.
 *
 * The repair turns the arrow construct into `\xrightarrow[below]{above}` with every
 * label visible. Pandoc emits several nestings, all handled by one recursive read:
 *   \overset{A}{ARROW}           A above
 *   \underset{B}{ARROW}          B below
 *   \overset{ARROW}{B}           B below (the arrow is the BASE, drawn over B)
 * where ARROW is `\rightarrow` or another such construct, possibly padded by `\ `.
 *
 * THE FALSE-POSITIVE BOUNDARY: only an arrow construct that carries a `\phantom`
 * somewhere in its labels is rewritten. A fill-in blank `\underline{\phantom{000}}`
 * (JEE numeric stems) and a cancellation mark `\phantom{\text{x}}6` are not arrow
 * constructs and are left alone; so is an arrow whose labels are already visible.
 * Malformed input (unbalanced braces) is returned unchanged rather than guessed at.
 *
 * `hasHiddenArrowLabel` is defined as "the repair would change this text", so the
 * probe and the fix cannot disagree. Triage in audit:text; the repair lives in
 * scripts/reviews/reveal-phantom-arrows.ts.
 */

type Arrow = { above: string[]; below: string[] };

/** Index just past the brace group opening at `open` (s[open] === "{"), or -1. */
function closeBrace(s: string, open: number): number {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    const c = s[i];
    if (c === "\\") {
      i++; // skip the escaped character (\{ \} \\ ...)
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

const PAD = /^(?:\s|\\ |~)+|(?:\s|\\ |~)+$/g;

/** Strip `\ `, `~` and whitespace from both ends only — internal spacing is content. */
function trimPad(s: string): string {
  let prev: string;
  do {
    prev = s;
    s = s.replace(PAD, "");
  } while (s !== prev);
  return s;
}

/** Remove `\phantom{...}` wrappers, keeping what they hid. */
function unPhantom(s: string): string {
  let out = "";
  let i = 0;
  while (i < s.length) {
    if (s.startsWith("\\phantom{", i)) {
      const open = i + "\\phantom".length;
      const end = closeBrace(s, open);
      if (end < 0) return s;
      out += s.slice(open + 1, end - 1);
      i = end;
    } else {
      out += s[i];
      i++;
    }
  }
  return out;
}

/** A label as it should print: unhidden, unpadded, and out of a bare \mathbf{} wrapper. */
function cleanLabel(raw: string): string {
  let s = trimPad(unPhantom(raw));
  const m = /^\\mathbf\{([\s\S]*)\}$/.exec(s);
  if (m && closeBrace(s, "\\mathbf".length) === s.length) s = trimPad(m[1]);
  return s;
}

/** Read two consecutive brace groups starting at `i` (whitespace allowed between). */
function twoArgs(s: string, i: number): { a: string; b: string; end: number } | null {
  while (s[i] === " ") i++;
  if (s[i] !== "{") return null;
  const ea = closeBrace(s, i);
  if (ea < 0) return null;
  let j = ea;
  while (s[j] === " ") j++;
  if (s[j] !== "{") return null;
  const eb = closeBrace(s, j);
  if (eb < 0) return null;
  return { a: s.slice(i + 1, ea - 1), b: s.slice(j + 1, eb - 1), end: eb };
}

/** Parse `s` in full as an arrow construct, or return null. */
function parseWhole(s: string): Arrow | null {
  const t = trimPad(s);
  const r = parseAt(t, 0);
  return r && r.end === t.length ? r.arrow : null;
}

/** Parse an arrow construct starting exactly at `i`. */
function parseAt(s: string, i: number): { arrow: Arrow; end: number } | null {
  if (s.startsWith("\\rightarrow", i)) {
    const end = i + "\\rightarrow".length;
    if (/[A-Za-z]/.test(s[end] ?? "")) return null; // e.g. \rightarrowtail
    return { arrow: { above: [], below: [] }, end };
  }
  for (const cmd of ["\\overset", "\\underset"] as const) {
    if (!s.startsWith(cmd, i)) continue;
    const args = twoArgs(s, i + cmd.length);
    if (!args) return null;
    const base = parseWhole(args.b);
    if (base) {
      const label = args.a;
      return cmd === "\\overset"
        ? { arrow: { above: [label, ...base.above], below: base.below }, end: args.end }
        : { arrow: { above: base.above, below: [...base.below, label] }, end: args.end };
    }
    if (cmd === "\\overset") {
      const top = parseWhole(args.a);
      if (top) return { arrow: { above: top.above, below: [...top.below, args.b] }, end: args.end };
    }
    return null;
  }
  return null;
}

function render(a: Arrow): string {
  const above = a.above.map(cleanLabel).filter(Boolean).join(",\\ ");
  const below = a.below.map(cleanLabel).filter(Boolean).join(",\\ ");
  const opt = below ? (below.includes("]") ? `[{${below}}]` : `[${below}]`) : "";
  return `\\xrightarrow${opt}{${above}}`;
}

export function revealArrowLabels(text: string): string {
  if (!text || !text.includes("\\phantom")) return text;
  let out = "";
  let i = 0;
  while (i < text.length) {
    if (text.startsWith("\\overset", i) || text.startsWith("\\underset", i)) {
      const r = parseAt(text, i);
      if (r) {
        const whole = text.slice(i, r.end);
        const hidden = [...r.arrow.above, ...r.arrow.below].some((l) => l.includes("\\phantom"));
        if (hidden) {
          out += render(r.arrow);
          i = r.end;
          continue;
        }
        out += whole;
        i = r.end;
        continue;
      }
    }
    out += text[i];
    i++;
  }
  return out;
}

export function hasHiddenArrowLabel(text: string): boolean {
  return revealArrowLabels(text) !== text;
}
