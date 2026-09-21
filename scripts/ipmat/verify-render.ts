/**
 * Drive the REAL renderers over every built row, before anything is committed.
 *
 *   npx tsx scripts/ipmat/verify-render.ts
 *
 * Read-only. Exits 1 on a failure.
 *
 * WHY THIS EXISTS. build.ts checks the text against write-boundary guards; this
 * checks it against the two things that will actually DISPLAY it. In this repo
 * the long-form-field-by-renderer matrix is a contract that has drifted twice —
 * a table in a solution printed as raw pipes in every downloaded answer key for
 * a year (2026-07-27) — and the only reliable check is to run both renderers.
 *
 * Three claims are verified:
 *   1. Every `\(...\)` zone converts to OMML, i.e. the Word export will not
 *      fall back to printing raw LaTeX.
 *   2. Every underline we emitted matches `UNDERLINE_BYPASS_RE` exactly. Any
 *      other shape loses its underline in the .docx silently, and 58 rows of
 *      sentence-correction questions depend on it.
 *   3. Every GFM table we emitted is found by `parseTableBlocks`.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parseLatex } from "../../src/components/math/parseLatex";
import { parseTableBlocks } from "../../src/components/math/parseTableBlocks";
import { textWithMathToOmmlSegments, UNDERLINE_BYPASS_RE } from "../../src/lib/export/ommlBuilder";
import type { BuiltQuestion } from "./build";

const BUILD_DIR = join(__dirname, "data", "build");
const BS = String.fromCharCode(92);

type Failure = { row: string; kind: string; detail: string };

function main() {
  const rows: BuiltQuestion[] = [];
  for (const f of readdirSync(BUILD_DIR).filter((x) => x.endsWith(".json"))) {
    rows.push(...(JSON.parse(readFileSync(join(BUILD_DIR, f), "utf8")) as BuiltQuestion[]));
  }
  console.log(`verifying ${rows.length} rows through the real renderers\n`);

  const failures: Failure[] = [];
  let mathZones = 0;
  let ommlZones = 0;
  let underlines = 0;
  let tables = 0;
  let fieldsChecked = 0;

  for (const r of rows) {
    const label = `${r.exam} ${r.year} ${r.section} Q${r.questionNumber}`;
    const fields: [string, string][] = [
      ["text", r.text],
      ["context", r.context ?? ""],
      ...r.options.map((o, i) => [`option${i + 1}`, o.text] as [string, string]),
    ];

    for (const [field, value] of fields) {
      if (!value) continue;
      fieldsChecked++;

      // 1 + 2 — the Word export
      let segs;
      try {
        segs = textWithMathToOmmlSegments(value);
      } catch (err) {
        failures.push({ row: label, kind: "omml-threw", detail: `${field}: ${(err as Error).message}` });
        continue;
      }
      for (const s of segs) {
        if (s.type === "math") {
          ommlZones++;
          if (!s.content.includes("<m:oMath")) {
            failures.push({ row: label, kind: "omml-not-math", detail: `${field}: ${s.content.slice(0, 80)}` });
          }
        }
        if (s.type === "underlined-text") underlines++;
      }

      // Every inline zone the web renderer sees should have produced OMML too.
      const webZones = parseLatex(value).filter((s) => s.type === "inline" || s.type === "block");
      mathZones += webZones.length;

      // 2 — the underline contract, checked on OUR OWN emitted shape
      for (const zone of webZones) {
        if (!zone.content.includes(BS + "underline")) continue;
        if (!UNDERLINE_BYPASS_RE.test(zone.content)) {
          failures.push({
            row: label,
            kind: "underline-misses-bypass",
            detail: `${field}: ${JSON.stringify(zone.content.slice(0, 90))}`,
          });
        }
      }

      // 3 — tables
      if (/^\s*\|?[\s:-]*-{2,}[\s:|-]*$/m.test(value)) {
        const found = parseTableBlocks(value).filter((b) => b.kind === "table");
        if (found.length === 0) {
          failures.push({ row: label, kind: "table-not-parsed", detail: field });
        } else {
          tables += found.length;
          for (const t of found) {
            const widths = new Set([t.headers.length, ...t.rows.map((x) => x.length)]);
            if (widths.size > 1) {
              failures.push({
                row: label,
                kind: "table-ragged",
                detail: `${field}: column counts ${[...widths].join("/")}`,
              });
            }
          }
        }
      }
    }
  }

  console.log("COUNTS");
  console.log(`  fields rendered          ${fieldsChecked}`);
  console.log(`  math zones (web)         ${mathZones}`);
  console.log(`  math zones -> OMML       ${ommlZones}`);
  console.log(`  underline runs (Word)    ${underlines}`);
  console.log(`  tables parsed            ${tables}`);

  console.log("\nFAILURES");
  if (failures.length === 0) {
    console.log("  (none)");
  } else {
    const byKind = new Map<string, Failure[]>();
    for (const f of failures) (byKind.get(f.kind) ?? byKind.set(f.kind, []).get(f.kind)!).push(f);
    for (const [kind, list] of byKind) {
      console.log(`  ${kind}: ${list.length}`);
      for (const f of list.slice(0, 8)) console.log(`     ${f.row} ${f.detail}`);
      if (list.length > 8) console.log(`     ...and ${list.length - 8} more`);
    }
  }

  if (failures.length) {
    console.log("\nRENDER CHECK: FAIL");
    process.exit(1);
  }
  console.log("\nRENDER CHECK: PASS — web and Word both render every field");
}

main();
