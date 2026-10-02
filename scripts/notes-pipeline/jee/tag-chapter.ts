/**
 * Spec-driven concept tagging for one /notes chapter (CET programme).
 *   npx tsx scripts/notes-pipeline/jee/tag-chapter.ts <spec.json> [--dry]
 * spec: { dump, prefix, expect, subtopics: {slug: DB subtopic name},
 *         concepts: [[subtopicSlug, conceptSlug, "8hex 8hex ..."]] }
 * Guards: every id PUBLIC + pyq, count == expect, every id's DB subtopic matches its page,
 * no id tagged twice. Upsert is idempotent.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config({ path: path.join(process.cwd(), ".env.local"), override: true });

type Spec = { dump: string; prefix: string; expect: number; subtopics: Record<string, string>; concepts: [string, string, string][] };
const spec: Spec = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const dump = JSON.parse(fs.readFileSync(path.join("generated-papers", spec.dump), "utf8"));
const ids: Record<string, string> = Object.fromEntries(dump.questions.map((q: { id: string }) => [q.id.slice(0, 8), q.id]));

async function main() {
  const seen = new Set<string>();
  const rows = spec.concepts.flatMap(([sub, concept, list]) =>
    list.split(/\s+/).filter(Boolean).map((p) => {
      if (seen.has(p)) throw new Error("dup " + p);
      seen.add(p);
      if (!ids[p]) throw new Error("unknown " + p);
      return { question_id: ids[p], subtopic_slug: sub, concept_slug: concept, tagged_by_llm: true };
    })
  );
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  // .in() puts the ids in the URL: chunk at 200 or a large chapter (512 ids) overflows the request headers.
  const pub: any[] = [];
  const allIds = rows.map((r) => r.question_id);
  for (let i = 0; i < allIds.length; i += 200) {
    const { data, error } = await sb.from("questions").select("id,question_kind,subtopics(name)").in("id", allIds.slice(i, i + 200)).eq("visibility", "PUBLIC");
    if (error) throw error;
    pub.push(...(data ?? []));
  }
  console.log("rows:", rows.length, "PUBLIC:", pub!.length, `(expect ${spec.expect})`);
  if (pub!.length !== rows.length || rows.length !== spec.expect) throw new Error("count mismatch");
  if (pub!.some((q: any) => q.question_kind !== "pyq")) throw new Error("a non-PYQ row is in the map");
  const subOf = new Map(pub!.map((q: any) => [q.id, q.subtopics?.name]));
  for (const r of rows) if (subOf.get(r.question_id) !== spec.subtopics[r.subtopic_slug]) throw new Error(`subtopic mismatch ${r.question_id} ${subOf.get(r.question_id)} vs ${r.subtopic_slug}`);
  if (process.argv.includes("--dry")) return console.log("dry run OK");
  const { error: e2 } = await sb.from("question_concept_tags").upsert(rows, { onConflict: "question_id,subtopic_slug,concept_slug", ignoreDuplicates: true });
  if (e2) throw e2;
  const { count } = await sb.from("question_concept_tags").select("*", { count: "exact", head: true }).like("subtopic_slug", `${spec.prefix}-%`);
  console.log(`${spec.prefix} tags in DB:`, count);
}
main().catch((e) => { console.error(e); process.exit(1); });
