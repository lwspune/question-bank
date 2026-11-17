/**
 * Correct a compilation row's printed question number, in the source of record
 * and the bank together.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/retag.ts            # dry run
 *   npx tsx scripts/mh-hsc-12-pyq/retag.ts --apply
 *
 * data/retags.json lists each fix with the paper it was checked against. The
 * compilation sometimes tags two different printed questions with one number;
 * the wrong one is found only against the paper. `question_number` is outside
 * content_hash, so the row keeps its id. Both writes are conditional on the old
 * value, so a re-run is a no-op.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Retag = { ref: string; id: string; from: string; to: string; source: string };

async function main() {
  const apply = process.argv.includes("--apply");
  const retags: Retag[] = JSON.parse(readFileSync(join(DATA, "retags.json"), "utf8"));
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  for (const r of retags) {
    const chapterId = r.ref.split("#")[0];
    const path = join(DATA, `${chapterId}.questions.json`);
    const raw = readFileSync(path, "utf8");
    const rows: { ref: string; questionNumber: string }[] = JSON.parse(raw);
    const row = rows.find((x) => x.ref === r.ref);
    if (!row) throw new Error(`${r.ref}: not in ${chapterId}.questions.json`);
    const { data: q, error } = await db.from("questions").select("question_number").eq("id", r.id).single();
    if (error) throw error;
    const fileState = row.questionNumber === r.to ? "done" : row.questionNumber === r.from ? "to fix" : `UNEXPECTED "${row.questionNumber}"`;
    const dbState = q.question_number === r.to ? "done" : q.question_number === r.from ? "to fix" : `UNEXPECTED "${q.question_number}"`;
    console.log(`${r.ref}: ${r.from} -> ${r.to}  file ${fileState}, bank ${dbState}`);
    if (!apply || fileState.startsWith("UNEXPECTED") || dbState.startsWith("UNEXPECTED")) continue;
    if (fileState === "to fix") {
      // Text-level swap of this row's value keeps the file's own formatting.
      const needle = `"ref": ${JSON.stringify(r.ref)}`;
      const at = raw.indexOf(needle);
      const qn = raw.indexOf(`"questionNumber": ${JSON.stringify(r.from)}`, at);
      const next = raw.indexOf(`"ref": `, at + needle.length);
      if (at < 0 || qn < 0 || (next >= 0 && qn > next)) throw new Error(`${r.ref}: could not place the edit`);
      const edited = raw.slice(0, qn) + `"questionNumber": ${JSON.stringify(r.to)}` + raw.slice(qn + `"questionNumber": ${JSON.stringify(r.from)}`.length);
      writeFileSync(path, edited, "utf8");
    }
    if (dbState === "to fix") {
      const { error: uErr } = await db.from("questions").update({ question_number: r.to }).eq("id", r.id).eq("question_number", r.from);
      if (uErr) throw uErr;
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
