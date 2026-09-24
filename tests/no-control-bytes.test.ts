/**
 * No source file may contain a RAW control byte.
 *
 * This exists because it happened twice in one afternoon, in the same feature.
 * `compute.ts` keyed its lanes on a NUL separator — correct and deliberate —
 * but the byte written to disk was a literal 0x00 rather than the two-character
 * escape. It compiled, typechecked, passed the full gate and shipped to main.
 * Then the identical thing happened to `links.ts` an hour later, and then to
 * THIS FILE while it was being written.
 *
 * WHY IT MATTERS MORE THAN IT LOOKS. A file holding one NUL is classified as
 * BINARY by grep, ripgrep and git. So:
 *
 *   - `npm run audit:text` and every other text probe in this repo SKIP it and
 *     report nothing — the file simply stops being searched.
 *   - `git diff` prints `Bin 0 -> 4204 bytes` instead of a reviewable diff.
 *   - A later grep for a symbol defined there comes back empty, which reads as
 *     "this code does not exist" rather than "this file was not searched".
 *
 * Nothing else here can catch it: it is legal TypeScript, legal UTF-8, and
 * behaviourally identical to the escape. The only signal is the bytes.
 *
 * Tab, newline and carriage return are allowed; every other C0 control and DEL
 * are not. If a string genuinely needs one, write the ESCAPE — same value at
 * runtime, and it survives every tool in the chain. Always the `\uXXXX` form,
 * never the shorthands: in a REGEX `\b` is a word boundary, not backspace.
 *
 * ── The allowlist that used to live here, and why it is gone ────────────────
 *
 * This shipped with 28 baselined pre-existing offenders, because fixing shipped
 * code to apply a new learning is a decision to be asked for. Permission came
 * the next day; all 28 were fixed (68 bytes, 8 distinct values) and the rule is
 * now simply "none". Two things that pass was worth beyond the bytes:
 *
 * 1. THE ALLOWLIST BROKE CI, AND THE LOCAL GATE COULD NOT SEE IT. 16 of its 28
 *    paths were gitignored scratch files that exist only on the machine that
 *    wrote them. Its "every entry still offends" assertion therefore passed
 *    here and failed on a clean checkout, from the commit that introduced it.
 *    A list of PATHS is a claim about a working tree, not about the repository.
 *    If one is ever needed again, assert its entries are git-tracked.
 *
 * 2. THE LEDGER'S DESCRIPTION OF THEM WAS WRONG. It recorded "every one is the
 *    same pattern — a NUL separator". Measured: 0x00 x24, 0x01 x10, 0x08 x5,
 *    0x0B x11, 0x0C x5, 0x0E x4, 0x1F x8, 0x7F x1, across THREE classes — key
 *    separators, control-char DETECTOR regexes, and deliberate test FIXTURES.
 *    Escaping is behaviour-preserving for all three, but that was shown rather
 *    than assumed: 13 character classes were rebuilt from both forms and
 *    compared over all 256 byte values (identical), and `lib/quiz/atoms.ts` —
 *    whose separator feeds a STORED sha1 — was checked across 7 inputs before
 *    and after (identical).
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["src", "tests", "scripts"];
const EXTS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".sql", ".md", ".css"];
// `out` is the ingestion pipelines' render/dump directory (.gitignore:3). It is
// GITIGNORED and machine-local: `git ls-files` finds zero tracked files under any
// out/ anywhere in the repo. Excluding it is not a weakening of this rule, it is
// the rule's own scope — the assertion is about SOURCE files, and a PDF text-layer
// dump is a derived artifact whose control bytes come from the source PDF.
//
// It was added 2026-09-24, when `dump-text.ts` on the Class 12 Geography chapters
// wrote five .text.md dumps carrying form feeds out of the PDFs and turned this
// suite red. THE FAILURE WAS LOCAL-ONLY: on CI, or on any clean checkout, those
// files do not exist, so the test passed there and failed here. That is exactly
// the prepush-equals-CI mirror break this file's own header records from the
// other direction ("16 of its 28 paths were gitignored scratch files that exist
// only on the machine that wrote them"). A scan that walks into a gitignored
// directory is making a claim about a working tree, not about the repository.
const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "build", "__snapshots__", "out"]);

/** Tab (0x09), LF (0x0A) and CR (0x0D) are the only control bytes text needs. */
const ALLOWED = new Set([0x09, 0x0a, 0x0d]);
const isControl = (b: number) => (b < 0x20 && !ALLOWED.has(b)) || b === 0x7f;

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(full, out);
    else if (EXTS.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

function firstControlByte(file: string): number | null {
  const buf = readFileSync(file);
  for (let i = 0; i < buf.length; i++) if (isControl(buf[i])) return i;
  return null;
}

describe("no raw control bytes in source", () => {
  const files = ROOTS.flatMap((r) => sourceFiles(join(process.cwd(), r)));
  const offenders = new Map<string, number>();
  for (const file of files) {
    const at = firstControlByte(file);
    if (at !== null) offenders.set(relative(process.cwd(), file).replace(/\\/g, "/"), at);
  }

  it("found files to scan — an empty scan would pass every assertion below", () => {
    // A guard that cannot fail is worse than no guard: without this, renaming a
    // root turns the whole suite into a green no-op.
    expect(files.length).toBeGreaterThan(400);
  });

  it("finds no raw control byte anywhere in src, tests or scripts", () => {
    const found = [...offenders].map(
      ([f, at]) =>
        `${f} — raw control byte at ${at}. Write the ESCAPE (e.g. \\u0000), not ` +
        `the byte; a file containing one is invisible to grep, audit:text and git diff.`
    );
    expect(found).toEqual([]);
  });
});
