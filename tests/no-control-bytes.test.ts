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
 * runtime, and it survives every tool in the chain.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["src", "tests", "scripts"];
const EXTS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".sql", ".md", ".css"];
const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "build", "__snapshots__"]);

/** Tab (0x09), LF (0x0A) and CR (0x0D) are the only control bytes text needs. */
const ALLOWED = new Set([0x09, 0x0a, 0x0d]);
const isControl = (b: number) => (b < 0x20 && !ALLOWED.has(b)) || b === 0x7f;

/**
 * PRE-EXISTING offenders, baselined 2026-09-15 when this guard was written.
 *
 * Every one of them is the SAME pattern the guard was built for — a NUL used as
 * a composite-key separator, written as a raw byte instead of `\u0000`:
 *
 *     `${chapterName}<NUL>${subtopicName}`
 *
 * They are listed rather than fixed because they are shipped code and a
 * behaviour-preserving byte swap across 28 files is still a change to shipped
 * code, which is the user's call and not this test's. The list is the BACKFILL
 * LEDGER; see ROADMAP.md. It is asserted to be exact in both directions below,
 * so it can only ever shrink — a fixed file must be removed from it, and a new
 * offender can never hide in it.
 */
const BASELINE = new Set(
  [
    "src/lib/notes/goLinks.ts",
    "src/lib/quiz/atoms.ts",
    "src/lib/tags/conceptTags.ts",
    "tests/cds-maths-check-bands.test.ts",
    "scripts/cbse-12-pyq/_tmp/_tmp_2022-55-2-2_check.ts",
    "scripts/cds-gs/lib.ts",
    "scripts/jee/lib.ts",
    "scripts/jee/promote-gaps.ts",
    "scripts/mh-hsc-12-pyq/_tmp_verify_ionic_equilibria_12_pyq.ts",
    "scripts/mh-sb-11/_kt_nuc_katex.mjs",
    "scripts/mh-sb-11/_kt_nuc_solcheck.mjs",
    "scripts/mh-sb-11/_kt_org_dbcheck.ts",
    "scripts/mh-sb-11/_kt_sound_katex.mjs",
    "scripts/mh-ssc-10-text/data/_sci-animal-classification-10.verify.ts",
    "scripts/mh-ssc-10-text/data/_sci-heredity-10.verify.ts",
    "scripts/mh-ssc-10-text/data/alg-linear-equations-10.rendercheck.ts",
    "scripts/mh-ssc-10-text/fix-italics.ts",
    "scripts/ncert/_tmp_c12PhyRayOptics_ctrltest.mjs",
    "scripts/nda-gat/dedup-check.ts",
    "scripts/practice-paper/check-taxonomy.ts",
    "scripts/reviews/report.ts",
    "scripts/stateboard/_cc_db_verify.ts",
    "scripts/stateboard/_ck_db_render_check.ts",
    "scripts/stateboard/_ec_db_check.ts",
    "scripts/stateboard/_gc_db_render_check.ts",
    "scripts/stateboard/_gc_pairing.ts",
    "scripts/stateboard/_hd2_frag_render_check.ts",
    "scripts/stateboard/_hd2_verify.ts",
  ].map((p) => p.replace(/\\/g, "/"))
);

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

  it("finds no control byte outside the baseline", () => {
    const fresh = [...offenders]
      .filter(([f]) => !BASELINE.has(f))
      .map(
        ([f, at]) =>
          `${f} — raw control byte at ${at}. Write the ESCAPE (e.g. \\u0000), not the byte; ` +
          `a file containing one is invisible to grep, audit:text and git diff.`
      );
    expect(fresh).toEqual([]);
  });

  it("keeps the baseline honest — every entry still exists and still offends", () => {
    // Forces a fixed file OUT of the list rather than letting it linger as
    // permanent permission. This is what makes the ledger shrink-only.
    const stale = [...BASELINE].filter((f) => !offenders.has(f));
    expect(stale).toEqual([]);
  });
});
