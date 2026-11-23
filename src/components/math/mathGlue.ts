/**
 * Keep a formula and the punctuation touching it on one line (2026-11-22).
 *
 * A formula is drawn as its own box, and a browser may start a new line between
 * that box and the comma right after it: on a phone V's "\(\frac{5}{12}\), which
 * is option (C)" put the comma at the start of the next line, and a notes page
 * left a lone full stop under "n(S) = 6". KaTeX also allows a break after × and =
 * inside a formula, so "6 × 6 = 36" could split in two.
 *
 * Two rules:
 *   1. Punctuation touching an inline formula without a space (closing marks
 *      after it, an opening bracket or quote before it) is glued to it.
 *   2. A SHORT formula (source up to WHOLE_MAX_TEX characters) is kept whole.
 * A longer formula keeps KaTeX's own break points (`whole: false`): mathTree
 * re-allows wrapping inside it, so only the seam with its punctuation is held.
 * The first version capped gluing by source length alone, and a 43-character
 * "P(A | B) > P(A) ⟺ P(B | A) > P(B)" ran off a 390 px screen: source length is
 * not width, so nothing wide is ever made unbreakable.
 *
 * Pure: mathTree.tsx draws the groups, for the page and the print handout alike.
 */

/** Longest formula source kept as one unbreakable unit. */
export const WHOLE_MAX_TEX = 20;

const CLOSE = /^[,.;:!?)\]}%’”'"]+/;
const OPEN = /[(\[{“‘"]+$/;

type RunLike = { type: "text" | "inline" | "block"; content: string };

export type Glued<T> = { kind: "one"; run: T } | { kind: "glued"; whole: boolean; parts: T[] };

export function glueRuns<T extends RunLike>(runs: readonly T[]): Glued<T>[] {
  // Text left after punctuation is moved onto a formula; "" = all of it moved.
  const rest = runs.map((r) => r.content);
  const out: Glued<T>[] = [];
  // A text run waiting to be emitted: held back so the formula after it can
  // take its opening bracket first.
  let pending: number | null = null;

  const flush = () => {
    if (pending === null) return;
    const i = pending;
    pending = null;
    if (rest[i] === "" && runs[i].content !== "") return;
    out.push({ kind: "one", run: rest[i] === runs[i].content ? runs[i] : { ...runs[i], content: rest[i] } });
  };

  for (let i = 0; i < runs.length; i++) {
    const r = runs[i];
    if (r.type === "text") {
      flush();
      pending = i;
      continue;
    }
    if (r.type !== "inline") {
      flush();
      out.push({ kind: "one", run: r });
      continue;
    }
    const before: T[] = [];
    if (pending !== null) {
      const open = rest[pending].match(OPEN);
      if (open) {
        rest[pending] = rest[pending].slice(0, -open[0].length);
        before.push({ ...runs[pending], content: open[0] });
      }
    }
    flush();
    const after: T[] = [];
    const next = runs[i + 1];
    if (next && next.type === "text") {
      const close = rest[i + 1].match(CLOSE);
      if (close) {
        rest[i + 1] = rest[i + 1].slice(close[0].length);
        after.push({ ...next, content: close[0] });
      }
    }
    const whole = r.content.length <= WHOLE_MAX_TEX;
    if (!whole && before.length === 0 && after.length === 0) out.push({ kind: "one", run: r });
    else out.push({ kind: "glued", whole, parts: [...before, r, ...after] });
  }
  flush();
  return out;
}
