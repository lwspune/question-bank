/**
 * Cosmetic LaTeX cleanup on the live JEE Paper 1 rows — upgrade bare function
 * names (log/sin/cos/...) to upright macros across text / context / options /
 * solution. Recomputes content_hash when text or options change. KaTeX-guards
 * every changed field; a field that would break is left untouched + reported.
 *
 *   npx tsx scripts/jee/cleanup-latex.ts          # dry-run (shows diffs)
 *   npx tsx scripts/jee/cleanup-latex.ts --apply
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeMathFunctions } from "./lib";

const EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679";

type Opt = { id: string; label: string; text: string; is_correct: boolean };
type Row = { id: string; question_number: string; text: string; context: string | null; solution: string | null; options: Opt[] };

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
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data, error } = await client
    .from("questions")
    .select("id, question_number, text, context, solution, options(id, label, text, is_correct)")
    .eq("exam_id", EXAM_ID);
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as Row[];

  let qChanged = 0;
  let optChanged = 0;
  let hashRecomputed = 0;
  const skipped: string[] = [];
  const samples: string[] = [];

  for (const r of rows) {
    const newText = normalizeMathFunctions(r.text);
    const newContext = r.context ? normalizeMathFunctions(r.context) : r.context;
    const newSolution = r.solution ? normalizeMathFunctions(r.solution) : r.solution;
    const newOpts = r.options.map((o) => ({ ...o, newText: normalizeMathFunctions(o.text) }));

    const textChanged = newText !== r.text || newContext !== r.context;
    const optsChanged = newOpts.some((o) => o.newText !== o.text);
    const solChanged = newSolution !== r.solution;
    if (!textChanged && !optsChanged && !solChanged) continue;

    // KaTeX-guard every changed field; bail on this question if any would break.
    const guards = [newText, newContext ?? "", newSolution ?? "", ...newOpts.map((o) => o.newText)];
    if (!guards.every(mathOk)) {
      skipped.push(`Q${r.question_number}`);
      continue;
    }

    if (samples.length < 6) {
      const before = r.options.find((o, i) => newOpts[i].newText !== o.text)?.text ?? r.text;
      const after = normalizeMathFunctions(before);
      if (before !== after) samples.push(`Q${r.question_number}: ${before.slice(0, 50)}  ->  ${after.slice(0, 50)}`);
    }

    if (textChanged || solChanged) qChanged++;
    if (optsChanged) optChanged++;

    if (!apply) continue;

    // Recompute hash only when the hashed inputs (text + options + answer) change.
    const update: Record<string, unknown> = {};
    if (newText !== r.text) update.text = newText;
    if (newContext !== r.context) update.context = newContext;
    if (newSolution !== r.solution) update.solution = newSolution;
    if (textChanged || optsChanged) {
      const correct = newOpts.find((o) => o.is_correct)?.label ?? "";
      update.content_hash = contentHash(newText, newOpts.map((o) => o.newText), correct);
      hashRecomputed++;
    }
    if (Object.keys(update).length) {
      const { error: uErr } = await client.from("questions").update(update).eq("id", r.id);
      if (uErr) throw new Error(`Q${r.question_number}: ${uErr.message}`);
    }
    for (const o of newOpts) {
      if (o.newText === o.text) continue;
      const { error: oErr } = await client.from("options").update({ text: o.newText }).eq("id", o.id);
      if (oErr) throw new Error(`Q${r.question_number} opt ${o.label}: ${oErr.message}`);
    }
  }

  console.log(`questions with text/solution changes: ${qChanged} | questions with option changes: ${optChanged}`);
  console.log(`hashes recomputed: ${apply ? hashRecomputed : "(dry-run)"} | KaTeX-broken (skipped): ${skipped.length}`);
  if (skipped.length) console.log(`  skipped: ${skipped.join(", ")}`);
  console.log(`\nsample diffs:`);
  for (const s of samples) console.log(`  ${s}`);
  if (!apply) console.log(`\n[dry-run] pass --apply to write.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
