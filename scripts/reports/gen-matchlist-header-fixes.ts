/**
 * Rebuild the shredded Match-List table headers from the SOURCE docx.
 *
 *   npx tsx scripts/reports/gen-matchlist-header-fixes.ts
 *     -> scripts/grounding/data/matchlist-headers-2026-08-01.textfix.json
 *
 * Background: `gridTableToPipe` walks cells in strides of the BODY column count
 * (4). A merged Match-List header row has only 2 cells, so when its label is
 * long enough for pandoc to wrap it across physical lines, the continuation is
 * filed under the wrong column — and sometimes dropped outright (Apr04_S1 Q40
 * lost the word "used"). 19 live rows carry the damage.
 *
 * The true header cannot be reconstructed from what is stored, so it is read
 * back from the source docx converted with `--wrap=none` (see the scratchpad
 * dumper that produced `matchlist_headers.json`). Cells are normalised with the
 * pipeline's OWN `cleanText`, so the rebuilt header follows exactly the same
 * conventions as every other stem the JEE pipeline writes.
 *
 * GFM has no colspan, so a label that spans two source columns is placed over
 * the column it actually describes (2 and 4), leaving the (A)/(I) label columns
 * blank — matching the shape the already-correct 2024 rows use.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { cleanText } from "../jee/lib";
import { maskMathZones } from "../../src/components/math/parseLatex";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const DUMP = join(
  process.env.LOCALAPPDATA ?? "",
  "Temp/claude/c--Users-vilas-Downloads-Question-Bank/b962c0b5-80c4-4dc6-8fbe-c32fc224efbd/scratchpad/matchlist_headers.json"
);
const OUT = join(process.cwd(), "scripts", "grounding", "data", "matchlist-headers-2026-08-01.textfix.json");

interface Dumped {
  source_file: string;
  q: number;
  header: { header_cells: string[]; body_cols: number } | null;
  error: string | null;
}

/**
 * Two headers are too mangled in the source markup to normalise mechanically
 * (nested `\mathbf` around bare brackets), so they are authored by hand from
 * the printed page. Keyed `<source_file>:<q>`.
 *
 *   Apr08_S2 Q33 source reads:
 *     "Electronic configuration of neutral atom** $\mathbf{(}$ **where** $\mathbf{n}\mathbf{= 2)}$"
 *     "$\mathbf{1}^{st}$ **Ionization Energy (** ${\mathbf{kJ}\ \mathbf{mol}}^{-1}$ **)"
 */
const HAND_AUTHORED: Record<string, [string, string]> = {
  "JEE_2026_Apr08_S2.docx:33": [
    String.raw`List-I Electronic configuration of neutral atom (where \(n = 2\))`,
    String.raw`List-II \(1^{st}\) Ionization Energy (\(kJ\,mol^{-1}\))`,
  ],
};

/**
 * Strip pandoc blockquote markers and leftover bold runs.
 *
 * `>` is stripped ONLY outside math zones. Stripping it globally silently
 * destroyed the inequality in Apr08 Jan24_S1 Q38 ("Work done \(V_f > V_i\)"
 * became "\(V_f V_i\)") — a meaning change, not a cosmetic one. So normalise
 * first (which turns `$..$` into `\(..\)`), then mask math, then strip.
 */
function tidy(cell: string): string {
  let s = cleanText(cell); // **bold**, \mathbf, $..$ -> \(..\)
  const { masked, unmask } = maskMathZones(s);
  s = unmask(masked.replace(/>/g, " "));
  // A math zone holding nothing but a bracket is pandoc noise, not math.
  s = s.replace(/\\\(\s*([()])\s*\\\)/g, "$1");
  s = s.replace(/\s{2,}/g, " ").trim();
  // A trailing unmatched ')' is a defect in the printed paper (Apr04_S1 Q44).
  const opens = (s.match(/\(/g) ?? []).length;
  const closes = (s.match(/\)/g) ?? []).length;
  if (closes > opens && s.endsWith(")")) s = s.slice(0, -1).trim();
  return s;
}

async function main() {
  loadEnv();
  const dumped: Dumped[] = JSON.parse(readFileSync(DUMP, "utf8"));
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const fixes: { id: string; text: string; note: string }[] = [];
  const problems: string[] = [];

  for (const d of dumped) {
    if (d.error || !d.header) {
      problems.push(`${d.source_file} Q${d.q}: ${d.error}`);
      continue;
    }
    const { data, error } = await client
      .from("questions")
      .select("id, text")
      .eq("source_file", d.source_file)
      .eq("question_number", String(d.q))
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      problems.push(`${d.source_file} Q${d.q}: row not found`);
      continue;
    }

    const hand = HAND_AUTHORED[`${d.source_file}:${d.q}`];
    const cells = hand ? [...hand] : d.header.header_cells.map(tidy).filter(Boolean);
    if (cells.length !== 2) {
      problems.push(`${d.source_file} Q${d.q}: expected 2 header cells, got ${cells.length} (${cells.join(" | ")})`);
      continue;
    }

    const lines = (data.text as string).split("\n");
    const hIdx = lines.findIndex((l) => l.startsWith("|"));
    if (hIdx < 0) {
      problems.push(`${d.source_file} Q${d.q}: no table line in stored stem`);
      continue;
    }

    let newLines = [...lines];
    let note = "header rebuilt from source docx";

    // Apr06_S1 Q28 carries a TWO-LEVEL header in the source: `List-I / List-II`
    // over a sub-header `Orbital / Radial nodes and nodal plane`. GFM allows one
    // header row, so fold the sub-header into it and drop the stray body row
    // that the sub-header became.
    const subIdx = newLines.findIndex((l) => /^\|\s*Orbital\s*\|/.test(l));
    if (subIdx > 0 && cells[0] === "List-I") {
      const sub = newLines[subIdx].split("|").map((c) => c.trim()).filter(Boolean);
      if (sub.length >= 2) {
        cells[0] = `${cells[0]} (${sub[0]})`;
        cells[1] = `${cells[1]} (${sub[1]})`;
        newLines.splice(subIdx, 1);
        note += "; folded the source's two-level sub-header into the header row";
      }
    }

    newLines[hIdx] = `|  | ${cells[0]} |  | ${cells[1]} |`;
    const newText = newLines.join("\n");
    if (newText === data.text) continue;

    fixes.push({ id: data.id as string, text: newText, note: `${d.source_file} Q${d.q}: ${note}` });
  }

  writeFileSync(OUT, JSON.stringify(fixes, null, 2) + "\n", "utf8");
  console.log(`wrote ${fixes.length} fixes -> ${OUT}\n`);
  for (const f of fixes) {
    console.log(`  ${f.note}`);
    console.log(`      ${f.text.split("\n").find((l) => l.startsWith("|"))}`);
  }
  if (problems.length) {
    console.log(`\nNOT fixed (${problems.length}):`);
    for (const p of problems) console.log(`  ${p}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
