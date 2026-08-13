/**
 * Text-defect probes for the board-PYQ corpus.
 *
 * Each exists because it caught something real. Two were added AFTER the defect
 * they describe had already slipped past every other check, on 2026-08-13:
 *
 *  - controlChars / orphanedStub: authoring LaTeX through a shell heredoc turned
 *    `\vee` into a vertical tab + "ee" and `\rightarrow` into a carriage return
 *    + "ightarrow". Delimiters stayed balanced and no unicode appeared, so the
 *    imbalance and unicode probes both passed it.
 *
 *  - literalNewline: the obvious `/\\n/` fires on `\neq`, `\nu` and `\nabla`,
 *    which are real LaTeX and common in a logic chapter. It reported a false
 *    positive on the first row it met; the lookahead is what makes it usable.
 */

/**
 * Control characters that must never appear in question text: null, bell,
 * backspace, vertical tab, form feed. Written as ESCAPES on purpose — a literal
 * control character in a source file is invisible and unreviewable, which is
 * the very failure this detects.
 *
 * CARRIAGE RETURN IS DELIBERATELY EXCLUDED: it is the other half of a CRLF line
 * ending and legitimate on this platform, so including it would flag every
 * multi-line string in the repo. That costs the `\r`-eaten case, which is
 * exactly what ORPHAN_STUBS covers instead.
 */
const CONTROL = /[\x00\x07\x08\x0b\x0c]/;

/**
 * The residue of a LaTeX command whose backslash-plus-first-letter was consumed
 * as an escape, leaving the tail as bare prose. Anchored so the stub must stand
 * as its own word — "brack" would otherwise fire inside "\lbrack".
 */
const ORPHAN_STUBS = ["ightarrow", "ongleftrightarrow", "eftrightarrow", "abla"];

/**
 * LaTeX commands beginning `\n`, as the letters that FOLLOW the n. A literal
 * two-character `\n` and a real command are the same two characters, so the
 * only way to tell them apart is what comes next — and "not a letter" is not
 * enough, because `\nsecond line` is a genuine defect and `\neq` is not.
 */
const N_COMMANDS = ["eq", "e", "u", "abla", "ot", "eg", "mid", "ewline", "onumber", "i", "earrow", "warrow"];

/** `\\(` renders as a literal backslash-paren instead of opening a math zone. */
const DOUBLE_ESCAPED = /\\\\[()]/;

/** Logic glyphs that must be LaTeX commands, per the project's notes convention. */
const UNICODE_LOGIC = /[∧∨∼¬→↔≡∀∃]/;

export function controlChars(s: string): boolean {
  return CONTROL.test(s);
}

export function orphanedStub(s: string): string | null {
  for (const stub of ORPHAN_STUBS) {
    if (new RegExp(`(^|[^A-Za-z\\\\])${stub}`).test(s)) return stub;
  }
  return null;
}

/**
 * A 2-char `\n` standing where a line break belongs.
 *
 * Errs toward FLAGGING: an unrecognised `\n<letters>` is reported. This is a
 * triage probe, not a gate, so a false positive costs a glance while a miss
 * ships a stem that renders with a literal backslash-n in it — and, worse, kills
 * any GFM pipe-table below it.
 */
export function literalNewline(s: string): boolean {
  for (const m of s.matchAll(/\\n([A-Za-z]*)/g)) {
    const tail = m[1];
    if (!N_COMMANDS.some((c) => tail.startsWith(c))) return true;
  }
  return false;
}

export function doubleEscaped(s: string): boolean {
  return DOUBLE_ESCAPED.test(s);
}

export function unicodeLogic(s: string): boolean {
  return UNICODE_LOGIC.test(s);
}

/** Unbalanced inline-math delimiters. Returns [open, close] when they disagree. */
export function mathImbalance(s: string): [number, number] | null {
  const open = (s.match(/\\\(/g) ?? []).length;
  const close = (s.match(/\\\)/g) ?? []).length;
  return open === close ? null : [open, close];
}

/**
 * Pipe rows with no `|---|` separator — GFM refuses to build a table without one
 * and the row ships as raw pipes. The separator pattern requires a line of ONLY
 * pipes/dashes/colons, so a row of data cannot pass for it.
 */
export function tableWithoutSeparator(s: string): boolean {
  return /^\s*\|.*\|\s*$/m.test(s) && !/^\s*\|[\s\-:|]+\|\s*$/m.test(s);
}

export type Defect = { ref: string; field: string; reason: string };

export function probeRow(ref: string, fields: [string, string][]): Defect[] {
  const out: Defect[] = [];
  for (const [field, s] of fields) {
    if (controlChars(s)) out.push({ ref, field, reason: "CONTROL CHARACTER — LaTeX eaten by a shell" });
    const stub = orphanedStub(s);
    if (stub) out.push({ ref, field, reason: `orphaned LaTeX stub "${stub}" — backslash eaten by a shell` });
    if (unicodeLogic(s)) out.push({ ref, field, reason: "unicode logic glyph, must be a LaTeX command" });
    if (doubleEscaped(s)) out.push({ ref, field, reason: "double-escaped math delimiter" });
    if (literalNewline(s)) out.push({ ref, field, reason: "literal backslash-n where a newline belongs" });
    const imb = mathImbalance(s);
    if (imb) out.push({ ref, field, reason: `${imb[0]} open vs ${imb[1]} close math delimiters` });
    if (tableWithoutSeparator(s)) out.push({ ref, field, reason: "pipe rows with no |---| separator" });
  }
  return out;
}
