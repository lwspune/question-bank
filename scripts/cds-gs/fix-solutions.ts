/**
 * Rewrite the reasoning of committed CDS General Knowledge solutions.
 *
 *   npx tsx scripts/cds-gs/fix-solutions.ts <spec.json>           # dry run
 *   npx tsx scripts/cds-gs/fix-solutions.ts <spec.json> --apply   # write
 *
 * spec: [{ "paper": "2018-2", "number": 5, "reasoning": "...", "why": "..." }]
 *
 * SOURCE FIRST, THEN DB, as refile.ts: data/<paper>.answers.json holds the
 * reasoning commit.ts builds `solution` from, so a DB-only edit would be lost on
 * a rebuild. The row's provenance bracket (the trailing `[...]`) is kept as it
 * is in the DB — this tool changes the explanation, never the provenance claim.
 * `solution` is not in content_hash, so no row identity moves. Answers (keys)
 * are NOT edited here: a key change needs its own review.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, dataPath, requirePaper } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Fix = { paper: string; number: number; reasoning: string; why: string };
const TAIL = /\s*(\[[^\[\]]*\])\s*$/;

function writePreserving(path: string, raw: string, data: unknown) {
  let out = JSON.stringify(data, null, 2);
  if (/\n$/.test(raw)) out += "\n";
  if (raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
  writeFileSync(path, out, "utf8");
}

async function main() {
  const specPath = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!specPath) throw new Error("usage: fix-solutions.ts <spec.json> [--apply]");
  const fixes: Fix[] = JSON.parse(readFileSync(specPath, "utf8"));
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const files = new Map<string, { path: string; raw: string; data: any }>();
  const updates: { id: string; solution: string; label: string }[] = [];
  for (const f of fixes) {
    const paper = requirePaper(f.paper);
    if (!f.reasoning?.trim() || /\[|\]/.test(f.reasoning)) throw new Error(`${f.paper} Q${f.number}: reasoning empty or contains a bracket`);
    const path = dataPath(paper.id, "answers");
    if (!files.has(path)) {
      const raw = readFileSync(path, "utf8");
      files.set(path, { path, raw, data: JSON.parse(raw) });
    }
    const d = files.get(path)!.data.derivations.find((x: any) => x.number === f.number);
    if (!d) throw new Error(`${f.paper} Q${f.number}: no derivation in ${path}`);
    d.reasoning = f.reasoning.trim();

    const { data: rows, error } = await sb
      .from("questions")
      .select("id, solution")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", String(f.number));
    if (error) throw error;
    if (rows?.length !== 1) throw new Error(`${f.paper} Q${f.number}: expected 1 bank row, found ${rows?.length}`);
    const tail = rows[0].solution?.match(TAIL)?.[1];
    if (!tail) throw new Error(`${f.paper} Q${f.number}: current solution has no provenance bracket`);
    const solution = `${f.reasoning.trim()} ${tail}`;
    const label = `${f.paper} Q${f.number} (${rows[0].id.slice(0, 8)})`;
    if (solution === rows[0].solution) console.log(`  = ${label} already current`);
    else updates.push({ id: rows[0].id, solution, label });
    console.log(`  ${label}: ${f.why}`);
  }

  console.log(`\n${updates.length} row(s) to update`);
  if (!apply) return console.log("dry run — add --apply to write");
  for (const { path, raw, data } of files.values()) writePreserving(path, raw, data);
  for (const u of updates) {
    const { error } = await sb.from("questions").update({ solution: u.solution }).eq("id", u.id);
    if (error) throw new Error(`${u.label}: ${error.message}`);
  }
  console.log(`wrote ${files.size} answers file(s) and ${updates.length} row(s)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
