/**
 * One-off: bring JEE 2 Apr 2025 Q141's content_hash in line with its edited
 * stem override, the way scripts/jee/resync.ts would (resync has no
 * single-question mode, and running it rewrites all 37 overridden rows).
 *
 *   npx tsx scripts/figures-fix/jee-rehash-2025-apr02-q141.ts           # dry run
 *   npx tsx scripts/figures-fix/jee-rehash-2025-apr02-q141.ts --apply
 *
 * Refuses unless the stored text already equals what resync would write.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { stripEmptyMath } from "../jee/lib";
import { loadPaper } from "../jee/config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const apply = process.argv.includes("--apply");
  const paper = loadPaper("2025-apr02");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: q, error } = await db
    .from("questions")
    .select("id, text, content_hash, options(label, text, is_correct)")
    .eq("source_file", paper.sourceFile)
    .eq("question_number", "141")
    .single();
  if (error) throw new Error(error.message);
  const newText = normalizeNewlines(stripEmptyMath(paper.stemOverrides!["141"]));
  if (newText !== q.text) throw new Error("stored text differs from the override; run the figure fix first");
  const opts = [...(q.options as { label: string; text: string; is_correct: boolean }[])].sort((a, b) => a.label.localeCompare(b.label));
  const answer = paper.answerOverrides?.["141"] ?? opts.find((o) => o.is_correct)?.label ?? "";
  const hash = contentHash(newText, opts.map((o) => o.text), answer);
  console.log(`Q141 ${q.id}\n  stored  ${q.content_hash}\n  resync  ${hash}`);
  if (hash === q.content_hash) return console.log("already in line");
  if (!apply) return console.log("dry run; re-run with --apply");
  const { error: uErr } = await db.from("questions").update({ content_hash: hash }).eq("id", q.id);
  if (uErr) throw new Error(uErr.message);
  console.log("updated");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
