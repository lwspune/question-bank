/**
 * Source files stay plain UTF-8: no byte-order mark, no doubly-encoded text.
 *
 * WHY. Windows PowerShell 5.1 reads a file as the ANSI code page unless told
 * otherwise and writes `-Encoding utf8` WITH a BOM, so a one-line edit through
 * Get-Content/Set-Content rewrites the whole file: every em dash comes back as
 * three garbled characters and a BOM lands on line 1. On 2026-11-16 that reached
 * main in rosterQuery.ts through a green typecheck, lint and test run, because
 * nothing reads a COMMENT's bytes. Edit files with the editor tools, or Python
 * with explicit utf-8.
 *
 * Matched on raw bytes, one read per file: decoding every source file as text
 * made this take minutes.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["src", "tests"].map((r) => join(process.cwd(), r));

const BOM = Buffer.from([0xef, 0xbb, 0xbf]);
/**
 * U+00E2 U+20AC as UTF-8: the first two characters of a curly quote or dash
 * that was read as Windows-1252 and written back as UTF-8.
 */
const MOJIBAKE = Buffer.from([0xc3, 0xa2, 0xe2, 0x82, 0xac]);

function sources(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) sources(full, out);
    else if (/\.(ts|tsx|css)$/.test(entry)) out.push(full);
  }
  return out;
}

describe("source encoding", () => {
  const files = ROOTS.flatMap((r) => sources(r)).map((f) => ({
    rel: relative(process.cwd(), f),
    bytes: readFileSync(f),
  }));

  it("scanned a real tree", () => {
    expect(files.length).toBeGreaterThan(500);
  });

  it("has no byte-order mark at the start of any file", () => {
    expect(files.filter((f) => f.bytes.subarray(0, 3).equals(BOM)).map((f) => f.rel)).toEqual([]);
  });

  it("has no doubly-encoded UTF-8 (a dash or quote garbled into three characters)", () => {
    expect(files.filter((f) => f.bytes.includes(MOJIBAKE)).map((f) => f.rel)).toEqual([]);
  });
});
