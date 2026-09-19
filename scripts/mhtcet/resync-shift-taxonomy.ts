/**
 * Re-point the `subtopic` field in committed shift JSONs at the LIVE taxonomy.
 *
 *   npx tsx scripts/mhtcet/resync-shift-taxonomy.ts "<Chapter Name>"          # dry run
 *   npx tsx scripts/mhtcet/resync-shift-taxonomy.ts "<Chapter Name>" --apply
 *
 * WHY THIS IS NEEDED AFTER A PHASE-D RESHAPE
 * ------------------------------------------
 * shifts/<shiftId>.json records, per question number, the chapter+subtopic that
 * question was classified into. commit.ts feeds those names to commitStaged, and
 * taxonomy AUTO-CREATES: a name that no longer exists is silently recreated rather
 * than rejected. So after a merge/rename/split, every shift JSON still naming a
 * dissolved subtopic is a loaded gun — re-commit that shift and the chapter
 * re-fragments into zombie subtopics holding zero or a handful of questions.
 *
 * The `subtopic` field is a CLASSIFICATION INSTRUCTION, not a historical
 * measurement, so re-pointing it is a correction rather than a rewrite of the audit
 * trail. The answer, solution, akAnswer and reconciliation `note` fields — which ARE
 * the record of what was derived at the time — are never touched.
 *
 * The new name is READ BACK FROM THE DB for the matching question rather than
 * re-derived here: the reshape already decided where each question belongs, and a
 * second, independent classification pass would be free to disagree with it.
 *
 * Matching is (sourceFile, questionNumber) -> questions row, the same key
 * attach-images.ts uses. A question number with no matching row is REPORTED, never
 * silently skipped — that combination means the shift JSON and the bank disagree
 * about what was committed, which is worth knowing on its own.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, SHIFTS } from "./config";

const SHIFTS_DIR = join(__dirname, "shifts");

type Entry = { chapter?: string; subtopic?: string; [k: string]: unknown };
type Doc = { sourceFile?: string; questions?: Record<string, Entry> } & Record<string, unknown>;

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** A merged shift file nests under `questions`; a per-subject fragment is bare. */
function entriesOf(doc: Doc): Record<string, Entry> {
  return (doc.questions ?? (doc as unknown as Record<string, Entry>)) as Record<string, Entry>;
}

/** "2025-apr-19-s2.maths.json" and "2025-apr-19-s2.json" both belong to that shift. */
function shiftIdOf(file: string): string {
  return file.replace(/\.json$/, "").replace(/\.(physics|chemistry|maths)$/, "");
}

async function main() {
  const chapter = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!chapter || chapter.startsWith("--")) {
    throw new Error('usage: resync-shift-taxonomy.ts "<Chapter Name>" [--apply]');
  }
  loadEnv();

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const files = readdirSync(SHIFTS_DIR).filter((f) => f.endsWith(".json"));
  let changed = 0;
  let already = 0;
  const unmatched: string[] = [];

  for (const file of files) {
    const path = join(SHIFTS_DIR, file);
    const raw = readFileSync(path, "utf8");
    const doc = JSON.parse(raw) as Doc;
    const entries = entriesOf(doc);

    const sourceFile = doc.sourceFile ?? SHIFTS[shiftIdOf(file)]?.sourceFile;
    if (!sourceFile) {
      // A fragment carries no sourceFile of its own and its shift is not in SHIFTS.
      const targets = Object.entries(entries).filter(([, e]) => e.chapter === chapter);
      if (targets.length) unmatched.push(`${file}: no sourceFile resolvable (${targets.length} entr(y|ies))`);
      continue;
    }

    let fileChanged = false;
    for (const [num, entry] of Object.entries(entries)) {
      if (entry.chapter !== chapter) continue;

      const { data: rows, error } = await client
        .from("questions")
        .select("id, subtopics(name)")
        .eq("exam_id", EXAM_ID)
        .eq("source_file", sourceFile)
        .eq("question_number", num);
      if (error) throw new Error(`${file} Q${num}: ${error.message}`);
      if (!rows || rows.length !== 1) {
        unmatched.push(`${file} Q${num}: ${rows?.length ?? 0} matching row(s) for ${sourceFile}`);
        continue;
      }
      // PostgREST types an embedded to-one relation as an array; it holds 0 or 1 row.
      const embedded = rows[0].subtopics as unknown as
        | { name: string }
        | { name: string }[]
        | null;
      const live = Array.isArray(embedded) ? embedded[0]?.name : embedded?.name;
      if (!live) {
        unmatched.push(`${file} Q${num}: row has no subtopic`);
        continue;
      }
      if (entry.subtopic === live) {
        already++;
        continue;
      }
      console.log(`  ${file} Q${num}: "${entry.subtopic}" -> "${live}"`);
      entry.subtopic = live;
      fileChanged = true;
      changed++;
    }

    if (fileChanged && apply) {
      // Preserve the 2-space indent these files are committed with.
      writeFileSync(path, JSON.stringify(doc, null, 2) + "\n", "utf8");
    }
  }

  console.log(
    `\n${apply ? "rewrote" : "would rewrite"} ${changed} entr(y|ies); ${already} already correct`
  );
  if (unmatched.length) {
    console.log(`\n${unmatched.length} UNMATCHED (reported, not skipped silently):`);
    for (const u of unmatched) console.log(`  ${u}`);
  }
  if (!apply && changed) console.log("\ndry run — pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
