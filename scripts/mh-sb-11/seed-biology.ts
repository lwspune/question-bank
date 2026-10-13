/**
 * Seed the Biology subject of `mh-sb-11` and its 16 chapters in book order, from
 * data/biology-taxonomy.json.
 *
 *   npx tsx scripts/mh-sb-11/seed-biology.ts            # dry run
 *   npx tsx scripts/mh-sb-11/seed-biology.ts --apply
 *
 * Subjects never auto-create (a typo would fork the curated list), so the subject
 * must exist before the first commit. Chapters are seeded too, only to fix their
 * ORDER: commit auto-creates a chapter with no order, and the /board reader lists
 * chapters by order_index. Subtopics are deliberately NOT seeded: commit creates
 * each one when a question first lands in it, so a subtopic no exercise question
 * uses never exists as an empty /browse filter.
 *
 * Idempotent: inserts only what is missing, and refuses if the subject already
 * holds a chapter that is not in the file (that would be a second taxonomy).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";

type Taxonomy = { chapters: { id: string; name: string; subtopics: string[] }[] };
const SUBJECT = "Biology";
const APPLY = process.argv.includes("--apply");

async function main() {
  const envLocal = join(process.cwd(), ".env.local");
  if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const tax: Taxonomy = JSON.parse(readFileSync(join(__dirname, "data", "biology-taxonomy.json"), "utf8"));
  const names = tax.chapters.map((c) => c.name);
  if (new Set(names).size !== names.length) throw new Error("duplicate chapter name in the taxonomy file");

  let { data: subj } = await db.from("subjects").select("id").eq("exam_id", EXAM_ID).eq("name", SUBJECT).maybeSingle();
  if (!subj) {
    console.log(`subject ${SUBJECT}: create`);
    if (APPLY) {
      const { data, error } = await db.from("subjects").insert({ exam_id: EXAM_ID, name: SUBJECT }).select("id").single();
      if (error) throw new Error(error.message);
      subj = data;
    }
  } else console.log(`subject ${SUBJECT}: exists`);

  const existing = subj
    ? ((await db.from("chapters").select("id, name, order_index").eq("subject_id", subj.id)).data ?? [])
    : [];
  const stray = existing.filter((c) => !names.includes(c.name));
  if (stray.length) throw new Error(`subject already holds chapters not in the file: ${stray.map((c) => c.name).join(", ")}`);

  let created = 0;
  for (const [i, c] of tax.chapters.entries()) {
    const ch = existing.find((e) => e.name === c.name);
    if (!ch) {
      created++;
      if (APPLY) {
        const { error } = await db.from("chapters").insert({ subject_id: subj!.id, name: c.name, order_index: i + 1 });
        if (error) throw new Error(`${c.name}: ${error.message}`);
      }
    }
    console.log(`  ${String(i + 1).padStart(2)} ${c.name}: ${ch ? "exists" : "create"}`);
  }
  console.log(`\n${created} chapter(s) ${APPLY ? "created" : "to create (dry run; pass --apply)"}.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
