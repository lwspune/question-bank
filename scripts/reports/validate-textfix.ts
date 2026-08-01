/**
 * Pre-flight a `<name>.textfix.json` before apply-text-fix.ts writes it.
 *
 *   npx tsx scripts/reports/validate-textfix.ts <name>
 *
 * apply-text-fix.ts deliberately does no rendering checks (it is a dumb writer),
 * so a typo'd `\begin{bmatrix}` would land in the bank and only surface as a
 * KaTeX error on someone's screen — which is exactly how several of these rows
 * got reported in the first place. Two gates:
 *
 *   1. KATEX  — every `\(...\)` / `\[...\]` zone in every edited field renders.
 *   2. TABLE  — every pipe-table in an edited stem actually parses as a table
 *               via the REAL parseTableBlocks (not a regex), and every row has
 *               the same column count as its header. A table that silently
 *               degrades to prose is the defect class this file exists to fix.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { parseTableBlocks } from "../../src/components/math/parseTableBlocks";

interface TextFix {
  id: string;
  text?: string;
  options?: { label: string; text: string }[];
  solution?: string;
}

function katexErrors(field: string, value: string): string[] {
  const errs: string[] = [];
  for (const seg of parseLatex(value)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch (e) {
      errs.push(`${field}: ${(e as Error).message.slice(0, 120)}  <<${seg.content.slice(0, 60)}>>`);
    }
  }
  return errs;
}

function tableErrors(field: string, value: string): string[] {
  if (!value.includes("|")) return [];
  const blocks = parseTableBlocks(value);
  const tables = blocks.filter((b) => b.kind === "table");
  const looksLikeTable = /^\s*\|.*\|\s*$/m.test(value) && /\|\s*-{3,}/.test(value);
  if (looksLikeTable && tables.length === 0) {
    return [`${field}: has pipe-table markup but parseTableBlocks built NO table (renders as raw pipes)`];
  }
  const errs: string[] = [];
  for (const t of tables) {
    if (t.kind !== "table") continue;
    // parseTableBlocks pads/truncates every row to the header width, so a
    // mismatch can't be seen post-hoc — compare against the RAW pipe counts
    // instead, which is where a shredded header shows up as a short header.
    const raw = value
      .split("\n")
      .filter((l) => /^\s*\|/.test(l) && !/^\s*\|[\s|:-]*$/.test(l))
      .map((l) => l.trim().replace(/^\||\|$/g, "").split("|").length);
    const bodyWidth = raw.length > 1 ? Math.max(...raw.slice(1)) : t.headers.length;
    if (t.headers.length !== bodyWidth) {
      errs.push(`${field}: header has ${t.headers.length} cells but body rows have ${bodyWidth}`);
    }
    console.log(`       (table: ${t.headers.length} cols x ${t.rows.length} rows)`);
  }
  return errs;
}

function main() {
  const name = process.argv[2];
  if (!name) throw new Error("usage: validate-textfix.ts <name>");
  const path = join(process.cwd(), "scripts", "grounding", "data", `${name}.textfix.json`);
  const fixes: TextFix[] = JSON.parse(readFileSync(path, "utf8"));

  let bad = 0;
  for (const f of fixes) {
    const errs: string[] = [];
    if (f.text !== undefined) errs.push(...katexErrors("text", f.text), ...tableErrors("text", f.text));
    if (f.solution !== undefined) errs.push(...katexErrors("solution", f.solution));
    for (const o of f.options ?? []) errs.push(...katexErrors(`opt ${o.label}`, o.text));

    if (errs.length) {
      bad++;
      console.log(`  FAIL ${f.id}`);
      for (const e of errs) console.log(`       ${e}`);
    } else {
      console.log(`  ok   ${f.id}`);
    }
  }

  console.log(`\n${fixes.length} fixes checked, ${bad} failing`);
  if (bad) process.exit(1);
}

main();
