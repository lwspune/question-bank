/**
 * Delete committed rows that no longer match their records file.
 *
 * WHY THIS EXISTS. `content_hash = sha256(stem + sorted options + answer)`, so correcting
 * any of those three does NOT update the row — `commitStaged` upserts on the hash, sees a
 * value it has never stored, and INSERTS a second row while the old one stays. The paper
 * then holds two copies of one question, and if the stale copy was already flipped, both
 * are public.
 *
 * So after any repair that touches a stem, an option or an answer, the old row has to be
 * removed explicitly. This computes the hash every record SHOULD have (via the real
 * `contentHash` helper, never a re-implementation) and deletes rows under that source_file
 * carrying any other hash.
 *
 *   npx tsx scripts/practice-paper/prune-stale.ts <slug>           # report
 *   npx tsx scripts/practice-paper/prune-stale.ts <slug> --apply   # delete
 *
 * SAFETY: it refuses to delete a row that a teacher's paper references, or that a student
 * has answered — those need a human decision, not a cascade.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { PAPERS, DATA, type PaperRec } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const slug = process.argv[2];
  const apply = process.argv.includes("--apply");
  const spec = PAPERS[slug];
  if (!spec) throw new Error(`unknown slug "${slug}"`);

  const recs: PaperRec[] = JSON.parse(
    readFileSync(join(DATA, spec.recordsFile ?? `${slug}.records.json`), "utf-8"),
  );
  const expected = new Set(
    recs.map((r) => contentHash(r.stem, [r.optA, r.optB, r.optC, r.optD], r.answer)),
  );

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: rows, error } = await db
    .from("questions")
    .select("id, question_number, content_hash, visibility")
    .eq("source_file", spec.sourceFile);
  if (error) throw error;

  const stale = (rows ?? []).filter((r) => !expected.has(r.content_hash as string));
  if (stale.length === 0) {
    console.log(`${slug}: ${rows?.length ?? 0} rows, none stale.`);
    return;
  }

  const ids = stale.map((r) => r.id as string);
  // `.in()` puts its list in the URL, so a few hundred uuids exceeds the request-line
  // limit and PostgREST answers a bare Bad Request. Chunk at ~150 regardless of result size.
  const chunk = <T,>(a: T[], n: number): T[][] =>
    a.length <= n ? [a] : [a.slice(0, n), ...chunk(a.slice(n), n)];
  const guarded = new Set<string>();
  for (const part of chunk(ids, 150)) {
    const { data: inPapers } = await db.from("paper_questions").select("question_id").in("question_id", part);
    (inPapers ?? []).forEach((p) => guarded.add(p.question_id as string));
    const { data: answered } = await db.from("attempt_answers").select("question_id").in("question_id", part);
    (answered ?? []).forEach((p) => guarded.add(p.question_id as string));
  }

  const deletable = stale.filter((r) => !guarded.has(r.id as string));
  console.log(
    `${slug}: ${rows?.length} rows, ${stale.length} stale ` +
      `(${stale.filter((r) => r.visibility === "PUBLIC").length} of them PUBLIC), ` +
      `${guarded.size} guarded by a paper or a student answer.`,
  );
  console.log(`  stale question numbers: ${stale.map((r) => r.question_number).join(", ")}`);
  if (guarded.size) console.log(`  REFUSING to delete ${guarded.size} guarded row(s) — needs a human.`);

  if (!apply) {
    console.log("  dry run — pass --apply to delete");
    return;
  }
  for (const part of chunk(deletable.map((r) => r.id as string), 150)) {
    const { error: delErr } = await db.from("questions").delete().in("id", part);
    if (delErr) throw delErr;
  }
  console.log(`  deleted ${deletable.length} stale row(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
