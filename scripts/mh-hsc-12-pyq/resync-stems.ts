/**
 * Bring the DATABASE back into line with the committed source after a stem repair.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/resync-stems.ts <chapterId>            # dry run
 *   npx tsx scripts/mh-hsc-12-pyq/resync-stems.ts <chapterId> --apply
 *
 * `content_hash` is stem-derived, so a stem repair CANNOT be an in-place UPDATE:
 * the corrected text is a different row by construction. The live row therefore
 * has to be deleted and the chapter re-committed, which mints a fresh uuid.
 *
 * Leaving the two out of step is the trap this exists to close. The row keeps
 * rendering the defect, and the next `commit.ts` run INSERTS the corrected text
 * as a NEW row rather than skipping it — so the chapter silently gains a
 * duplicate, one copy broken and one fixed.
 *
 * REFUSES to delete a row anything references (a paper, an attempt, a tag, a
 * bookmark, a report, a review, an embedding) — those need a human decision, not
 * a cascade. Reports what it would do and changes nothing without --apply.
 *
 * Run order: repair the source -> extract -> dedupe -> assign -> merge -> THIS ->
 * commit --apply -> flip-public --apply.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAM_ID, CHAPTERS, DATA, requireChapter } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const REFERENCING = [
  ["paper_questions", "question_id"],
  ["attempt_answers", "question_id"],
  ["question_concept_tags", "question_id"],
  ["question_principle_tags", "question_id"],
  ["question_bookmarks", "question_id"],
  ["question_reports", "question_id"],
  ["question_reviews", "question_id"],
  ["embeddings", "question_id"],
] as const;

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

async function referencesTo(c: SupabaseClient, id: string) {
  const hits: string[] = [];
  for (const [table, col] of REFERENCING) {
    const { count, error } = await c.from(table).select("*", { count: "exact", head: true }).eq(col, id);
    if (error) throw new Error(`could not check ${table}: ${error.message}`);
    if ((count ?? 0) > 0) hits.push(`${table}=${count}`);
  }
  return hits;
}

async function main() {
  const id = process.argv[2];
  if (!id) throw new Error("usage: resync-stems.ts <chapterId> [--apply]");
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);

  const c = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const rows = JSON.parse(readFileSync(join(DATA, `${id}.questions.json`), "utf8")) as {
    ref: string; stem: string; questionNumber: string; answer?: string;
    options?: { label: string; text: string }[];
  }[];

  // Compare on CONTENT_HASH, not on the stem.
  //
  // The hash covers stem + sorted options + answer, so an OPTION repair moves the
  // row's identity exactly as a stem repair does — and a stem-only comparison
  // reports such a chapter "in sync" while seven unconvertible option zones sit
  // in the database (which is what happened to Kinetic Theory, Fluids and Dual
  // Nature). Use the project's OWN hash helpers so this cannot disagree with what
  // `commitStaged` will compute.
  const { contentHash, subjectiveContentHash } = await import("../../src/lib/upload/hash");
  const hashOf = (r: (typeof rows)[number]) =>
    r.options?.length
      ? contentHash(r.stem, r.options.map((o) => o.text), r.answer ?? "")
      : subjectiveContentHash(r.stem, null);
  const wanted = new Set(rows.map(hashOf));

  const { data: live, error } = await c
    .from("questions")
    .select("id,text,visibility,question_number,content_hash")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", CHAPTERS[id].sourceFile);
  if (error) throw error;

  // A live row whose hash is not in the committed source is STALE — its text or
  // options were repaired and the corrected copy has not been committed yet.
  const stale = (live ?? []).filter((r) => !wanted.has(String(r.content_hash)));
  const liveHashes = new Set((live ?? []).map((r) => String(r.content_hash)));
  const missing = rows.filter((r) => !liveHashes.has(hashOf(r)));

  console.log(`${ch.chapterName}: ${rows.length} committed | ${live?.length ?? 0} live`);
  console.log(`  stale live rows (text not in source): ${stale.length}`);
  console.log(`  source rows with no live row:         ${missing.length}`);

  for (const r of stale) {
    const refs = await referencesTo(c, r.id as string);
    console.log(`\n  STALE ${r.question_number} ${r.visibility} ${r.id}`);
    console.log(`    ${norm(String(r.text)).slice(0, 130)}`);
    console.log(`    references: ${refs.length ? refs.join(", ") : "none"}`);
    if (refs.length) throw new Error(`REFUSING: ${r.id} is referenced (${refs.join(", ")}) — decide by hand`);
  }
  for (const m of missing) console.log(`  MISSING  ${m.ref} (${m.questionNumber})`);

  if (!stale.length) { console.log("\nin sync — nothing to do."); return; }
  if (!apply) {
    console.log(`\n[dry-run] would DELETE ${stale.length} stale row(s), then re-commit + flip.`);
    return;
  }
  for (const r of stale) {
    const { error: e } = await c.from("questions").delete().eq("id", r.id);
    if (e) throw e;
    console.log(`  deleted ${r.id}`);
  }
  console.log(`\ndeleted ${stale.length}. NOW RUN: commit.ts ${id} --apply  then  flip-public.ts ${id} --apply`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
