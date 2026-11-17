/**
 * One-off repair (2026-11-17, SUGGESTIONS.md "3,040 NDA practice rows carry the
 * wrong pyq_note"): commit.ts stamped every bulk NDA Maths practice PDF
 * "NDA Maths practice — Algebra / Sequence & Series" whatever its chapter. This
 * rewrites each such row's note from its own source_file.
 *
 * Touches pyq_note only: no stem, option, key or content_hash moves. Each write is
 * conditional on the OLD value, so a re-run is a no-op and the undo is the constant
 * below. NDA's provenance bracket drops pyq_note, so no student-facing text changes.
 *
 *   npx tsx scripts/practice/fix-notes.ts           # dry run
 *   npx tsx scripts/practice/fix-notes.ts --apply   # write
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";
import { practiceNoteFromSourceFile } from "./lib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const OLD_NOTE = "NDA Maths practice — Algebra / Sequence & Series";

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Distinct source files carrying the old note (paged: 2,956 rows).
  const files = new Map<string, number>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("source_file")
      .eq("exam_id", EXAM_ID)
      .eq("question_kind", "practice")
      .eq("pyq_note", OLD_NOTE)
      .order("id")
      .range(from, from + 999);
    if (error) throw error;
    for (const r of data ?? []) files.set(r.source_file as string, (files.get(r.source_file as string) ?? 0) + 1);
    if (!data || data.length < 1000) break;
  }

  let changed = 0;
  for (const [file, n] of [...files].sort()) {
    const note = practiceNoteFromSourceFile(file);
    if (!note) {
      console.log(`SKIP ${file} (${n} rows): no note can be read from this name`);
      continue;
    }
    if (note === OLD_NOTE) {
      console.log(`ok   ${file} (${n} rows): already right`);
      continue;
    }
    console.log(`${apply ? "fix " : "would"} ${file} (${n} rows) -> ${note}`);
    if (!apply) {
      changed += n;
      continue;
    }
    const { error, count } = await db
      .from("questions")
      .update({ pyq_note: note }, { count: "exact" })
      .eq("exam_id", EXAM_ID)
      .eq("question_kind", "practice")
      .eq("source_file", file)
      .eq("pyq_note", OLD_NOTE);
    if (error) throw error;
    changed += count ?? 0;
  }
  console.log(`\n${apply ? "updated" : "would update"} ${changed} rows`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
