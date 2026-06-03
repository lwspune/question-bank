/**
 * Re-apply a paper's stem/option/answer overrides to its ALREADY-COMMITTED rows,
 * recomputing content_hash — WITHOUT re-committing (a re-commit after cleanup-latex
 * has mutated text would insert duplicates, since the recomputed hash no longer
 * matches). Use this to fix a committed question after editing papers/<id>.json.
 *
 *   npx tsx scripts/jee/resync.ts <paperId>          # dry-run
 *   npx tsx scripts/jee/resync.ts <paperId> --apply
 *
 * Only touches questions that HAVE an override (others keep their cleaned text).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { EXAM_ID, loadPaper, requirePaperId } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function mathOk(text: string): boolean {
  for (const seg of parseLatex(text)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch {
      return false;
    }
  }
  return true;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const paperId = requirePaperId(process.argv, 2, "resync.ts <paperId> [--apply]");
  loadEnv();
  const paper = loadPaper(paperId);
  const nums = new Set<string>([
    ...Object.keys(paper.stemOverrides ?? {}),
    ...Object.keys(paper.optionOverrides ?? {}),
    ...Object.keys(paper.answerOverrides ?? {}),
  ]);
  if (!nums.size) {
    console.log("no overrides in this paper — nothing to resync.");
    return;
  }
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let updated = 0;
  for (const num of nums) {
    const { data: q } = await client
      .from("questions")
      .select("id, text, options(id, label, text, is_correct)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", num)
      .single();
    if (!q) {
      console.warn(`  Q${num}: not committed — skipping`);
      continue;
    }
    type Opt = { id: string; label: string; text: string; is_correct: boolean };
    const opts = q.options as Opt[];

    const newText = normalizeNewlines(paper.stemOverrides?.[num] ?? q.text);
    const optOv = paper.optionOverrides?.[num] ?? {};
    const answer =
      paper.answerOverrides?.[num] ?? opts.find((o) => o.is_correct)?.label ?? "";
    const newOpts = opts.map((o) => ({
      ...o,
      newText: normalizeNewlines((optOv as Record<string, string>)[o.label] ?? o.text),
      newCorrect: o.label === answer,
    }));

    const guards = [newText, ...newOpts.map((o) => o.newText)];
    if (!guards.every(mathOk)) {
      console.warn(`  Q${num}: override still KaTeX-broken — NOT writing`);
      continue;
    }

    const hash = contentHash(newText, newOpts.map((o) => o.newText), answer);
    console.log(`  Q${num}: ${apply ? "updating" : "would update"} (answer ${answer})`);
    if (!apply) continue;

    await client.from("questions").update({ text: newText, content_hash: hash }).eq("id", q.id);
    for (const o of newOpts) {
      if (o.newText === o.text && o.newCorrect === o.is_correct) continue;
      await client.from("options").update({ text: o.newText, is_correct: o.newCorrect }).eq("id", o.id);
    }
    updated++;
  }
  console.log(`\n${apply ? `resynced ${updated}` : "dry-run"} (${nums.size} overridden questions).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
