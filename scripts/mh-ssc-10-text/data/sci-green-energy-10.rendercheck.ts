/**
 * Render-check for sci-green-energy-10, run against the LIVE ROWS.
 *
 * Reads what actually shipped rather than the JSON that produced it, and pushes
 * every long-form field through the REAL helpers of both surfaces:
 *   - katex             -> what /browse and /board show a student
 *   - findOmmlFailures  -> what a teacher gets in a downloaded Word paper (a
 *                          zone KaTeX renders happily can still land there raw)
 *   - parseTableBlocks  -> whether a GFM pipe-table actually becomes a table
 *
 * The table arm exists because a sibling chapter's ad-hoc probe reported
 * "NO TABLE PARSED" on perfectly good tables: it was testing `b.type` when the
 * discriminator is `b.kind`, and naming the header row `header` when it is
 * `headers`. Using the shipped helper is what makes a hit a real disagreement
 * rather than a probe artefact -- and note `audit:text` cannot cover this, since
 * its TABLE_NO_SEPARATOR rule fires on malformed pipe rows, so "a table that
 * parses" and "no table at all" both read as clean there.
 *
 *   npx tsx scripts/mh-ssc-10-text/data/sci-green-energy-10.rendercheck.ts
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { findOmmlFailures } from "../../../src/lib/export/ommlAudit";
import { parseTableBlocks } from "../../../src/components/math/parseTableBlocks";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const SOURCE = "StateBoard_10_ScienceII__Towards_Green_Energy.pdf";
const EXAM = "a41ef5c6-fa20-4bc1-be8b-ba4263d5afd2";
const FIELDS = ["text", "context", "solution"] as const;

// Refs whose stem or solution MUST contain a parsed table. Asserted positively so
// that a table silently degrading to prose is a failure, not a quiet pass.
const EXPECT_TABLE: Record<string, ("text" | "solution")[]> = {
  "Ex Q1": ["text", "solution"],
  "Ex Q4": ["solution"],
  "Ex Q6(a)": ["solution"],
  "Ex Q6(b)": ["solution"],
};

function isCtrl(code: number): boolean {
  // built from CODE POINTS, never a literal escape — a literal control character
  // typed into a regex class is invisible in review and is precisely what this
  // check exists to catch.
  return (code < 32 && code !== 9 && code !== 10) || code === 127 || code === 0xfffd;
}

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db
    .from("questions")
    .select("question_number, text, context, solution, visibility")
    .eq("exam_id", EXAM)
    .eq("source_file", SOURCE)
    .order("question_number");
  if (error) throw new Error(error.message);
  const rows = data ?? [];

  const ZONE = /\\\((.+?)\\\)/gs;
  let zones = 0, katexFails = 0, ommlFails = 0, ctrlHits = 0, dbl = 0;
  let tablesFound = 0;
  const problems: string[] = [];

  for (const r of rows) {
    const ref = r.question_number as string;
    for (const f of FIELDS) {
      const v = (r as Record<string, unknown>)[f];
      if (typeof v !== "string" || v === "") continue;

      for (const [i, ch] of [...v].entries()) {
        if (isCtrl(ch.codePointAt(0)!)) {
          ctrlHits++;
          problems.push(`${ref}.${f}: control char U+${ch.codePointAt(0)!.toString(16)} at ${i}`);
        }
      }
      if (v.includes("\\\\(") || v.includes("\\\\)")) {
        dbl++;
        problems.push(`${ref}.${f}: doubled backslash before a math delimiter`);
      }

      for (const m of v.matchAll(ZONE)) {
        zones++;
        try {
          katex.renderToString(m[1], { throwOnError: true, displayMode: false });
        } catch (e) {
          katexFails++;
          problems.push(`${ref}.${f}: KaTeX rejected \\(${m[1]}\\) — ${(e as Error).message.split("\n")[0]}`);
        }
      }
      const omml = findOmmlFailures(v);
      if (omml.length) {
        ommlFails += omml.length;
        for (const z of omml) problems.push(`${ref}.${f}: OMML cannot convert ${JSON.stringify(z)}`);
      }

      const blocks = parseTableBlocks(v);
      const tables = blocks.filter((b) => b.kind === "table");
      tablesFound += tables.length;
      for (const t of tables) {
        if (t.kind !== "table") continue;
        const ragged = t.rows.filter((row) => row.length !== t.headers.length);
        if (ragged.length) problems.push(`${ref}.${f}: table has ${ragged.length} ragged row(s)`);
        if (t.headers.length < 2) problems.push(`${ref}.${f}: table has <2 columns`);
        if (t.rows.length === 0) problems.push(`${ref}.${f}: table has a header and no data rows`);
      }
    }

    for (const [ref2, fields] of Object.entries(EXPECT_TABLE)) {
      if (ref2 !== ref) continue;
      for (const f of fields) {
        const v = (r as Record<string, unknown>)[f === "text" ? "text" : "solution"];
        const has = typeof v === "string" && parseTableBlocks(v).some((b) => b.kind === "table");
        if (!has) problems.push(`${ref}.${f}: EXPECTED a parsed table, found none`);
      }
    }
  }

  const nonPublic = rows.filter((r) => r.visibility !== "PUBLIC").length;

  console.log(`rows ${rows.length} (non-PUBLIC ${nonPublic})`);
  console.log(`math zones ${zones}   KaTeX failures ${katexFails}   OMML failures ${ommlFails}`);
  console.log(`tables parsed ${tablesFound}   control chars ${ctrlHits}   doubled backslashes ${dbl}`);

  if (problems.length) {
    console.log(`\nPROBLEMS (${problems.length}):`);
    for (const p of problems) console.log("  " + p);
    process.exit(1);
  }
  console.log("\nPASS — every math zone renders on both surfaces and every expected table parses.");

  // ---------------------------------------------------------- self-test
  // A check that has never gone red proves nothing, and the specific failure
  // this arm guards against — a probe that reports "no table" on a good table,
  // or "clean" on a broken one — has already shipped once on a sibling chapter.
  console.log("\nself-test (each MUST be detected):");
  const good = "| I | II |\n|---|---|\n| Coal | Thermal |";
  const cases: [string, boolean][] = [
    ["a well-formed table parses", parseTableBlocks(good).some((b) => b.kind === "table")],
    ["a table with NO separator row does not", !parseTableBlocks("| I | II |\n| Coal | Thermal |").some((b) => b.kind === "table")],
    ["a literal backslash-n table does not", !parseTableBlocks(good.replace(/\n/g, "\\n")).some((b) => b.kind === "table")],
    ["KaTeX rejects a broken zone", (() => {
      try { katex.renderToString("\\frac{1", { throwOnError: true }); return false; } catch { return true; }
    })()],
    ["KaTeX accepts a zone we shipped", (() => {
      try { katex.renderToString("\\rightarrow", { throwOnError: true }); return true; } catch { return false; }
    })()],
    ["control-char detector fires", isCtrl(1) && !isCtrl(65) && !isCtrl(10)],
  ];
  let selfFail = 0;
  for (const [label, ok] of cases) {
    console.log(`  ${ok ? "OK  " : "FAIL"} ${label}`);
    if (!ok) selfFail++;
  }
  if (selfFail) { console.log("\nself-test failed — this probe cannot be trusted."); process.exit(1); }
}

main().catch((e) => { console.error(e); process.exit(1); });
