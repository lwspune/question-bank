/**
 * Dump the live NDA GAT taxonomy (subject > chapter > subtopics) as a handout
 * for the classification step of an /lws-test-ingest run.
 *
 * A record whose chapter or subtopic is not already in the DB AUTO-CREATES one
 * on commit, which silently splits a chapter's corpus in two. So classification
 * agents must pick from this file and never invent a name.
 *
 *   npx tsx scripts/practice-paper/dump-taxonomy.ts [outPath]
 *
 * Tooling for the manual ingest core (like dump-bank.ts), NOT a committed data
 * artifact.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "../practice/config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const out = process.argv[2] ?? join(__dirname, "out", "taxonomy.json");

async function main() {
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  const { data, error } = await db
    .from("subjects")
    .select("name, chapters(name, subtopics(name))")
    .eq("exam_id", EXAM_ID);
  if (error) throw new Error(error.message);

  const tree: Record<string, Record<string, string[]>> = {};
  let chapters = 0;
  let subtopics = 0;

  const rows = (data ?? []) as { name: string; chapters: { name: string; subtopics: { name: string }[] }[] }[];
  for (const s of rows.sort((a, b) => a.name.localeCompare(b.name))) {
    if (s.name === "Mathematics") continue; // GAT is Paper II; Maths is Paper I
    tree[s.name] = {};
    for (const c of (s.chapters ?? []).sort((a, b) => a.name.localeCompare(b.name))) {
      const subs = (c.subtopics ?? []).map((t) => t.name).sort((a, b) => a.localeCompare(b));
      tree[s.name][c.name] = subs;
      chapters += 1;
      subtopics += subs.length;
    }
  }

  writeFileSync(out, JSON.stringify(tree, null, 1), "utf8");
  console.log(
    `${Object.keys(tree).length} subjects · ${chapters} chapters · ${subtopics} subtopics -> ${out}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
