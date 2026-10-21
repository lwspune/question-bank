/**
 * Push review fixes from a paper's transcript to the rows already committed: solution and
 * difficulty. commit.ts cannot (neither is part of content_hash, so a re-commit skips the
 * row as a duplicate).
 *
 *   npx tsx scripts/spi/sync.ts <paperId>          # dry run: list what differs
 *   npx tsx scripts/spi/sync.ts <paperId> --apply
 *
 * Reads out/<paperId>/rows.json (run build.ts first). A row whose content_hash differs from
 * the build is refused, unless --content is passed AND its options and key are unchanged:
 * then only the stem or shared passage moved (a review fix), and the row is corrected in
 * place with its new text, context and content_hash, keeping its id, so nothing that points
 * at it breaks. A changed option or key is always refused here.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseCommitRows, type CommitRow } from "../ssc-cgl/rows";
import { EXAM_NAME, OUT, requirePaper } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const content = args.includes("--content");
  const rows: CommitRow[] = JSON.parse(readFileSync(join(OUT, paper.id, "rows.json"), "utf8"));
  const { parsed, errs } = parseCommitRows(rows);
  if (errs.length) throw new Error(`rows.json does not validate: ${errs.join("; ")}`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).single();
  const { data, error } = await client
    .from("questions")
    .select("id, question_number, content_hash, solution, difficulty, text, context, options(label, text, is_correct)")
    .eq("exam_id", exam!.id)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(error.message);
  const live = new Map((data ?? []).map((q) => [String(q.question_number), q]));

  const changes: { id: string; qn: string; patch: Record<string, string | null> }[] = [];
  for (const p of parsed) {
    const q = live.get(String(p.questionNumber));
    if (!q) throw new Error(`Q${p.questionNumber}: no committed row`);
    const patch: Record<string, string | null> = {};
    if (q.content_hash !== p.contentHash) {
      const liveOpts = (q.options as { label: string; text: string; is_correct: boolean }[])
        .map((o) => `${o.label}|${o.text}|${o.is_correct}`)
        .sort()
        .join("\n");
      const builtOpts = p.options.map((o) => `${o.label}|${o.text}|${o.isCorrect}`).sort().join("\n");
      if (!content || liveOpts !== builtOpts) {
        throw new Error(`Q${p.questionNumber}: content differs from the build${liveOpts !== builtOpts ? " (options or key changed)" : "; pass --content to correct the stem in place"}`);
      }
      patch.text = p.text;
      patch.context = p.context ?? null;
      patch.content_hash = p.contentHash;
    }
    if ((q.solution ?? null) !== (p.solution ?? null)) patch.solution = p.solution ?? null;
    if (q.difficulty !== p.difficulty) patch.difficulty = p.difficulty;
    if (Object.keys(patch).length) changes.push({ id: q.id, qn: String(p.questionNumber), patch });
  }
  for (const c of changes) console.log(`Q${c.qn}: ${Object.keys(c.patch).join(", ")}`);
  console.log(`${changes.length} row(s) differ`);
  if (!apply || !changes.length) return console.log(apply ? "nothing to do" : "[dry run] pass --apply to write.");
  for (const c of changes) {
    const { error: e } = await client.from("questions").update(c.patch).eq("id", c.id);
    if (e) throw new Error(`Q${c.qn}: ${e.message}`);
  }
  console.log(`updated ${changes.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
