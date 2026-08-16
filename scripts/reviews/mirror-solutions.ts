/**
 * Mirror the repaired solutions into their source JSONs — WITHOUT reformatting.
 *
 *   npx tsx scripts/reviews/mirror-solutions.ts            # dry run
 *   npx tsx scripts/reviews/mirror-solutions.ts --apply
 *
 * WHY NOT JSON.parse -> JSON.stringify. That is what the first attempt did, and
 * it re-serialised every file: these sources write options compactly on one line
 * (`{"label": "A", "text": "24"}`), so a 2-space re-stringify expanded them and
 * turned a one-line solution change into a 400-line diff. 1,500 lines of churn
 * around 24 real edits — which buries the change in review and makes the commit
 * impossible to read.
 *
 * So the edit is done on the RAW TEXT: locate the old solution's exact JSON
 * encoding and swap it for the new one. Everything else in the file, down to the
 * whitespace, is untouched.
 *
 * Guarded: the encoded needle must appear EXACTLY ONCE in the file. Zero means
 * the file escapes differently than JSON.stringify does and a blind replace
 * would corrupt it; more than one means the same solution text appears twice and
 * the target is ambiguous. Either way, refuse and report.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const CHUNKS = join(process.cwd(), "scripts", "reviews", "data", "findings", "2026-08-16-papers");
const DATA_DIRS = [
  join(process.cwd(), "scripts", "practice", "data"),
  join(process.cwd(), "scripts", "stateboard", "data"),
  join(process.cwd(), "scripts", "mh-sb-11", "data"),
  join(process.cwd(), "scripts", "mh-hsc-12-pyq", "data"),
];

type Fix = { questionId: string; questionNumber: string; newSolution: string };

function buildPrefixMap(): Map<string, { dir: string; id: string }> {
  const map = new Map<string, { dir: string; id: string }>();
  for (const dir of DATA_DIRS) {
    const cfg = join(dir, "..", "config.ts");
    if (!existsSync(cfg)) continue;
    for (const m of readFileSync(cfg, "utf8").matchAll(/id:\s*"([^"]+)"[\s\S]{0,600}?sourceFile:\s*"([^"]+)"/g)) {
      map.set(m[2], { dir, id: m[1] });
    }
  }
  return map;
}

function loadFixes(): Fix[] {
  const out: Fix[] = [];
  for (const dir of [CHUNKS]) {
    if (!existsSync(dir)) continue;
    for (const n of readdirSync(dir).filter((f) => f.startsWith("fix.") && f.endsWith(".out.json"))) {
      out.push(...(JSON.parse(readFileSync(join(dir, n), "utf8")) as Fix[]));
    }
  }
  return out;
}

(async () => {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const PREFIX = buildPrefixMap();
  const fixes = loadFixes();

  const { data: rows, error } = await db
    .from("questions")
    .select("id, question_number, source_file")
    .in("id", fixes.map((f) => f.questionId));
  if (error) throw error;
  const meta = new Map((rows ?? []).map((r: any) => [r.id, r]));

  let written = 0, refused = 0, unmapped = 0;

  for (const fix of fixes) {
    const m: any = meta.get(fix.questionId);
    if (!m) { console.log(`  ? ${fix.questionNumber}: not in DB`); refused++; continue; }
    const entry = PREFIX.get(m.source_file);
    if (!entry) { console.log(`  ? ${m.question_number}: unmapped source_file ${m.source_file}`); unmapped++; continue; }

    let hitFiles = 0;
    for (const name of readdirSync(entry.dir)) {
      if (!name.startsWith(`${entry.id}.`) || !name.endsWith(".json")) continue;
      const p = join(entry.dir, name);
      const raw = readFileSync(p, "utf8");

      // find the row's CURRENT solution in the parsed view, then swap its exact
      // encoding in the raw text — parse to locate, raw-edit to preserve format
      let doc: unknown;
      try { doc = JSON.parse(raw); } catch { continue; }
      if (!Array.isArray(doc)) continue;
      const row = (doc as Record<string, unknown>[]).find((r) => {
        if (!r || typeof r !== "object" || !("solution" in r)) return false;
        const num = String(r.number ?? r.questionNumber ?? r.ref ?? "");
        return num === m.question_number || num.endsWith(`#${m.question_number}`);
      });
      if (!row) continue;

      const oldSol = row.solution as string | null;
      if (typeof oldSol !== "string") continue;
      if (oldSol === fix.newSolution) { hitFiles++; continue; } // already mirrored

      const needle = JSON.stringify(oldSol);
      const count = raw.split(needle).length - 1;
      if (count !== 1) {
        console.log(`  ! ${m.question_number} in ${name}: encoded solution matched ${count}x — refusing`);
        refused++;
        continue;
      }
      const next = raw.replace(needle, JSON.stringify(fix.newSolution));
      if (APPLY) writeFileSync(p, next, "utf8");
      hitFiles++;
      written++;
    }
    if (!hitFiles) console.log(`  ! ${m.question_number}: no source file carried it`);
  }

  console.log(`\n${written} file-edit(s) ${APPLY ? "written" : "planned"}, ${refused} refused, ${unmapped} unmapped`);
  if (!APPLY) console.log(`(dry run — re-run with --apply)\n`);
})().catch((e) => { console.error(e instanceof Error ? e.message : JSON.stringify(e, null, 2)); process.exit(1); });
