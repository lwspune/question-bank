/**
 * Find the live row for compilation refs (`<chapterId>#<n>`) and what links to it.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/locate-refs.ts <ref> [<ref> ...]
 *
 * A ref lives only in data/<chapterId>.questions.json; the bank row carries the
 * chapter's source_file and the stem. The stem may have been repaired in the bank
 * since (defects.json, the paper reconcile), so a row is matched on the committed
 * stem first and then on the ref's question number, and an ambiguous match is
 * reported, never guessed. Read-only. Prints id, visibility and every place the
 * row is used (mocks, homework plans, stored board papers, concept tags), the
 * checks to make before retiring or retagging a shipped row.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { CHAPTERS, DATA } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Q = { ref: string; questionNumber: string; stem: string };

async function main() {
  const refs = process.argv.slice(2);
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  for (const ref of refs) {
    const chapterId = ref.split("#")[0];
    const ch = (CHAPTERS as Record<string, { sourceFile: string }>)[chapterId];
    if (!ch) { console.log(`${ref}: unknown chapter`); continue; }
    const q = (JSON.parse(readFileSync(join(DATA, `${chapterId}.questions.json`), "utf8")) as Q[]).find((x) => x.ref === ref);
    if (!q) { console.log(`${ref}: not in data/`); continue; }
    const { data: rows, error } = await db
      .from("questions")
      .select("id, visibility, question_number, text")
      .eq("source_file", ch.sourceFile);
    if (error) throw error;
    let hits = (rows ?? []).filter((r) => r.text === q.stem);
    if (hits.length !== 1) hits = (rows ?? []).filter((r) => r.question_number === q.questionNumber && r.text.slice(0, 40) === q.stem.slice(0, 40));
    if (hits.length !== 1) { console.log(`${ref}: ${hits.length} candidate rows, resolve by hand (qn ${q.questionNumber})`); continue; }
    const r = hits[0];
    const [mocks, plans, papers, tags] = await Promise.all([
      db.from("mock_tests").select("slug").filter("questions", "cs", JSON.stringify([{ questionId: r.id }])),
      db.from("homework_plan_items").select("plan_id").eq("question_id", r.id),
      db.from("board_paper_items").select("paper_id").eq("question_id", r.id),
      db.from("question_concept_tags").select("concept_slug").eq("question_id", r.id),
    ]);
    const n = (x: { data: unknown[] | null; error: unknown }) => (x.error ? "?" : String(x.data?.length ?? 0));
    console.log(
      `${ref}\t${r.id}\t${r.visibility}\tqn=${r.question_number}\tmocks=${(mocks.data ?? []).map((m) => m.slug).join(",") || 0}\tplans=${n(plans)}\tpapers=${n(papers)}\ttags=${n(tags)}`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
