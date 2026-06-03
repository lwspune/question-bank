/**
 * Phase 3c — attach worked solutions to the JEE Paper 1 pilot questions.
 *
 *   npx tsx scripts/jee/attach-solutions.ts          # dry-run (validate only)
 *   npx tsx scripts/jee/attach-solutions.ts --apply  # write questions.solution
 *
 * Applies SOLUTION_FIXES + normalizeNewlines, then KaTeX-guards each solution
 * before writing — a still-broken solution is skipped + reported, never written.
 * Idempotent: re-running overwrites with the same value.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { SOLUTION_FIXES, AUTHORED_SOLUTIONS } from "./classification";

const EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679";

type Rec = { questionNumber: number; status: string; solution: string | null };

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function applyFixes(num: number, sol: string): string {
  let out = sol;
  for (const [from, to] of SOLUTION_FIXES[num] ?? []) out = out.split(from).join(to);
  return normalizeNewlines(out);
}

function mathOk(text: string): { ok: boolean; err?: string } {
  for (const seg of parseLatex(text)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch (e) {
      return { ok: false, err: `${seg.content.slice(0, 40)} :: ${String((e as Error).message).slice(0, 50)}` };
    }
  }
  return { ok: true };
}

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();
  const records: Rec[] = JSON.parse(readFileSync(join(__dirname, "out", "paper1.records.json"), "utf8"));
  const mcq = records.filter((r) => r.status === "ok" || r.status === "image_options");

  // Image-only / empty source solutions: fall back to a hand-authored text solution
  // if one exists, else write NULL (the bank solution field is text-only).
  const prepared = mcq.map((r) => {
    const cleaned = applyFixes(r.questionNumber, r.solution ?? "");
    let solution: string | null = cleaned.trim() ? cleaned : null;
    let src: "source" | "authored" | "none" = solution ? "source" : "none";
    if (!solution && AUTHORED_SOLUTIONS[r.questionNumber]) {
      solution = normalizeNewlines(AUTHORED_SOLUTIONS[r.questionNumber]);
      src = "authored";
    }
    return { num: r.questionNumber, solution, src, check: solution ? mathOk(solution) : { ok: true } };
  });

  const broken = prepared.filter((p) => !p.check.ok);
  const cleared = prepared.filter((p) => p.solution === null);
  const source = prepared.filter((p) => p.src === "source" && p.check.ok);
  const authored = prepared.filter((p) => p.src === "authored" && p.check.ok);
  console.log(`solutions: ${prepared.length} total | ${source.length} source | ${authored.length} authored | ${cleared.length} still null | ${broken.length} broken (skip)`);
  if (authored.length) console.log(`  authored: ${authored.map((p) => "Q" + p.num).join(", ")}`);
  if (cleared.length) console.log(`  null (no solution): ${cleared.map((p) => "Q" + p.num).join(", ")}`);
  for (const b of broken) console.log(`  broken Q${b.num}: ${b.check.err}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let wroteText = 0;
  let clearedCount = 0;
  for (const p of prepared) {
    if (!p.check.ok) continue; // broken: leave existing value untouched
    const { error } = await client
      .from("questions")
      .update({ solution: p.solution })
      .eq("exam_id", EXAM_ID)
      .eq("question_number", String(p.num));
    if (error) throw new Error(`Q${p.num} solution: ${error.message}`);
    if (p.solution === null) clearedCount++;
    else wroteText++;
  }
  console.log(`\nwrote ${wroteText} text solutions, cleared ${clearedCount} image-only (${broken.length} skipped).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
