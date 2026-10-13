/**
 * Seed the Biology subject of `mh-hsc-12`: the subject row, its 15 chapters (book
 * order) and their subtopics, from data/biology-taxonomy.json.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/seed-biology.ts            # dry run
 *   npx tsx scripts/mh-hsc-12-pyq/paper/seed-biology.ts --apply
 *
 * Why a seed and not auto-creation: subjects never auto-create (a typo would fork
 * the curated list), and the paper lane HARD-validates every chapter against the
 * catalog generated from the live DB (gen-catalog.ts), so Biology's chapters must
 * exist before a paper can commit. The names here are the textbook's, so the
 * textbook backfill later lands in the SAME chapters: a chapter name that differs
 * by one character auto-creates a second chapter and splits the corpus silently.
 *
 * Idempotent: inserts only what is missing, and refuses if the subject already
 * holds a chapter that is not in the file (that would be a second taxonomy).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";

type Taxonomy = { subject: string; chapters: { name: string; subtopics: string[] }[] };

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
  for (const c of tax.chapters) {
    if (new Set(c.subtopics).size !== c.subtopics.length) throw new Error(`duplicate subtopic in ${c.name}`);
  }

  let { data: subj } = await db.from("subjects").select("id").eq("exam_id", EXAM_ID).eq("name", tax.subject).maybeSingle();
  if (!subj) {
    console.log(`subject ${tax.subject}: create`);
    if (APPLY) {
      const { data, error } = await db.from("subjects").insert({ exam_id: EXAM_ID, name: tax.subject }).select("id").single();
      if (error) throw new Error(error.message);
      subj = data;
    }
  } else console.log(`subject ${tax.subject}: exists`);

  const existing = subj
    ? ((await db.from("chapters").select("id, name, order_index").eq("subject_id", subj.id)).data ?? [])
    : [];
  const stray = existing.filter((c) => !names.includes(c.name));
  if (stray.length) throw new Error(`subject already holds chapters not in the file: ${stray.map((c) => c.name).join(", ")}`);

  let chapters = 0, subtopics = 0;
  for (const [i, c] of tax.chapters.entries()) {
    let ch = existing.find((e) => e.name === c.name);
    if (!ch) {
      chapters++;
      if (APPLY) {
        const { data, error } = await db.from("chapters").insert({ subject_id: subj!.id, name: c.name, order_index: i + 1 }).select("id, name, order_index").single();
        if (error) throw new Error(`${c.name}: ${error.message}`);
        ch = data;
      }
    }
    const have = ch ? ((await db.from("subtopics").select("name").eq("chapter_id", ch.id)).data ?? []).map((s) => s.name) : [];
    const missing = c.subtopics.map((name, j) => ({ name, order_index: j + 1 })).filter((s) => !have.includes(s.name));
    subtopics += missing.length;
    if (APPLY && missing.length) {
      const { error } = await db.from("subtopics").insert(missing.map((s) => ({ ...s, chapter_id: ch!.id })));
      if (error) throw new Error(`${c.name} subtopics: ${error.message}`);
    }
    console.log(`  ${String(i + 1).padStart(2)} ${c.name}: ${ch ? "exists" : "create"}, ${missing.length} subtopic(s) to add`);
  }
  console.log(`\n${chapters} chapter(s) and ${subtopics} subtopic(s) ${APPLY ? "created" : "to create (dry run; pass --apply)"}.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
