/**
 * Backfill the `id` field onto a `data/<id>.<name>.solutions.json` fragment that
 * was authored with only `{ref, solution}`.
 *
 *   npx tsx scripts/stateboard/add-ids.ts <chapterId> <fragmentName>   # dry-run
 *   npx tsx scripts/stateboard/add-ids.ts <chapterId> <fragmentName> --apply
 *
 * Why this exists: apply-solutions.ts keys its UPDATE on `id`, never on `ref` —
 * a ref is a human label and is not unique across the exam. An authoring brief
 * that asks for `{ref, solution}` therefore produces a fragment apply-solutions
 * rejects. Rather than hand-edit, resolve ref -> id against the chapter's own
 * committed rows.
 *
 * REFUSES on any ambiguity: a ref that matches no row, or more than one row,
 * is a hard error for the WHOLE file. Writing a solution onto the wrong question
 * is silent and unrecoverable, so a partial success is not an acceptable outcome.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, EXAM_ID, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = { id?: string; ref: string; solution: string };

async function main() {
  const chapterId = process.argv[2];
  const fragment = process.argv[3];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(chapterId);
  if (!fragment) throw new Error("usage: add-ids.ts <chapterId> <fragmentName> [--apply]");
  loadEnv();

  const path = join(DATA, `${chapterId}.${fragment}.solutions.json`);
  const rows: Row[] = JSON.parse(readFileSync(path, "utf8"));

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data, error } = await db
    .from("questions")
    .select("id, question_number")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile);
  if (error) throw error;

  const byRef = new Map<string, string[]>();
  for (const q of data ?? []) {
    const k = (q.question_number ?? "").trim();
    byRef.set(k, [...(byRef.get(k) ?? []), q.id as string]);
  }

  const problems: string[] = [];
  const out = rows.map((r) => {
    const hits = byRef.get(r.ref.trim()) ?? [];
    if (hits.length !== 1) {
      problems.push(`${r.ref}: matched ${hits.length} rows (need exactly 1)`);
      return r;
    }
    return { id: hits[0], ref: r.ref, solution: r.solution };
  });

  console.log(`${rows.length} rows in ${fragment}; ${data?.length ?? 0} committed rows for ${ch.sourceFile}`);
  if (problems.length) {
    console.error(`\nREFUSING — ${problems.length} ref(s) did not resolve to exactly one row:`);
    for (const p of problems) console.error(`  ${p}`);
    process.exit(1);
  }
  console.log("every ref resolved to exactly one committed row.");

  if (!apply) {
    console.log("\n[dry-run] pass --apply to rewrite the fragment with ids.");
    return;
  }
  writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote ids into ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
