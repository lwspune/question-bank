/**
 * A long-form field that MAY carry a pipe-table must render through
 * `BlockText`, never `KatexRenderer`.
 *
 * `KatexRenderer` knows nothing about tables: it prints `| A | B |` as raw
 * pipes. `BlockText` splits prose from GFM pipe-tables and fast-paths to
 * `KatexRenderer` when there is none, so it is a byte-identical drop-in on
 * every render that has no table. The project rule (CLAUDE.md, "Tables in
 * question content") is that the long-form fields × every renderer is ONE
 * contract — and it has drifted three times:
 *
 *   2026-07-06  /board + /browse solution reveals printed truth tables as pipes
 *   2026-07-27  the Word answer key's solution path, 123 PUBLIC rows, for a year
 *   2026-09-24  the /browse SET BANNER (shared context of a set: 61 sets across
 *               the bank, 21 of them MH HSC 12 Geography), the /guide worked-
 *               example SOLUTION, and the admin edit form's solution preview
 *
 * Each time one renderer was fixed and its siblings were not. The docx golden
 * test pins the Word side; nothing pinned the React side, because this repo
 * has no jsdom and cannot render a component. What it CAN do is read source:
 * this test scans every .tsx under src/ for a `KatexRenderer` whose `text` prop
 * is a context / passage / solution expression and fails on any hit.
 *
 * SCOPE, deliberately. The stem (`text`) is NOT in the list: the collapsed
 * /browse card renders the stem through `KatexRenderer` on purpose so a table
 * cannot blow past its `line-clamp-2`, and the expanded card already uses
 * `BlockText`. The three fields here have no such collapsed form anywhere.
 *
 * Match shape: `KatexRenderer text={<expr>}` where the last identifier of
 * <expr> is one of the field names (`passage`, `example.solution`,
 * `question.context`, …). A renamed variable escapes the rule — the field is
 * then named at the call site by something else — so the fixture list of
 * KNOWN long-form props below is asserted non-empty-by-construction: if the
 * scan ever finds ZERO `KatexRenderer text=` usages at all, the pattern has
 * rotted and the test fails rather than passing over nothing.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(process.cwd(), "src");

/** Long-form fields that may carry a pipe-table (see CLAUDE.md). */
const LONG_FORM_FIELDS = ["context", "passage", "solution"] as const;

function tsxUnder(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) tsxUnder(full, out);
    else if (entry.endsWith(".tsx")) out.push(full);
  }
  return out;
}

/**
 * Every `KatexRenderer text={…}` usage with the expression inside the braces.
 * A single-depth brace match is enough: the prop is always a bare identifier
 * or a member chain at these call sites, never an inline arrow function.
 */
const USAGE_RE = /<KatexRenderer\b[^>]*?\btext=\{([^{}]*)\}/g;

/** The trailing identifier of a member chain: `example.solution` → `solution`. */
function lastIdentifier(expr: string): string {
  const trimmed = expr.trim().replace(/\s*(\?\?|\|\|).*$/, "");
  const parts = trimmed.split(".");
  return parts[parts.length - 1].replace(/[^A-Za-z0-9_]/g, "");
}

describe("long-form fields render through BlockText, never KatexRenderer", () => {
  const files = tsxUnder(ROOT);
  const usages: { file: string; expr: string }[] = [];
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(USAGE_RE)) {
      usages.push({ file: relative(process.cwd(), file), expr: m[1].trim() });
    }
  }

  it("the scan still finds KatexRenderer call sites (the pattern has not rotted)", () => {
    expect(usages.length).toBeGreaterThan(0);
  });

  it("no context / passage / solution field is handed to KatexRenderer", () => {
    const offenders = usages.filter((u) =>
      (LONG_FORM_FIELDS as readonly string[]).includes(lastIdentifier(u.expr).toLowerCase())
    );
    expect(
      offenders.map((o) => `${o.file}: <KatexRenderer text={${o.expr}} />`),
      "render these through BlockText — KatexRenderer prints a pipe-table as raw pipes"
    ).toEqual([]);
  });
});
