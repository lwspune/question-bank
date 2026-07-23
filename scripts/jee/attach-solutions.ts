/**
 * Phase 3c — attach worked solutions to one JEE paper's questions.
 *
 *   npx tsx scripts/jee/attach-solutions.ts <paperId>          # dry-run (validate only)
 *   npx tsx scripts/jee/attach-solutions.ts <paperId> --apply  # write questions.solution
 *
 * Applies solutionFixes + normalizeNewlines (falling back to authoredSolutions
 * when the source solution is empty), then KaTeX-guards each solution before
 * writing — a still-broken one is skipped, never written. Idempotent. Rows are
 * scoped by source_file so question numbers can't collide across papers.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { repairLatex } from "./lib";
import { EXAM_ID, loadPaper, recordsPath, requirePaperId, isCommittable, type PaperData } from "./config";

type Rec = { questionNumber: number; status: string; solution: string | null };

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function applyFixes(num: number, sol: string, fixes: PaperData["solutionFixes"]): string {
  let out = sol;
  for (const [from, to] of fixes?.[String(num)] ?? []) out = out.split(from).join(to);
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
  // --numeric-only: attach solutions ONLY to the numeric (NAT) rows — used by the
  // Section-B backfill on an already-committed+cleaned paper, so the MCQ rows'
  // live (cleaned) solutions are not overwritten from the raw re-extract.
  const numericOnly = process.argv.includes("--numeric-only");
  const paperId = requirePaperId(process.argv, 2, "attach-solutions.ts <paperId> [--numeric-only] [--apply]");
  loadEnv();
  const paper = loadPaper(paperId);
  const { sourceFile } = paper;
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));
  const mcq = records
    .filter((r) => isCommittable(r.status, r.questionNumber, paper))
    .filter((r) => !numericOnly || r.status === "numeric" || paper.numericOverrides?.[String(r.questionNumber)] !== undefined);

  // Image-only / empty source solutions: fall back to a hand-authored text solution
  // if one exists, else write NULL (the bank solution field is text-only).
  const prepared = mcq.map((r) => {
    // An authored solution WINS over source — we only author where the source was
    // empty OR broken (e.g. a piecewise-matrix derivation KaTeX can't render).
    const authoredText = paper.authoredSolutions?.[String(r.questionNumber)];
    let solution: string | null;
    let src: "source" | "authored" | "none";
    if (authoredText) {
      solution = normalizeNewlines(authoredText);
      src = "authored";
    } else {
      const cleaned = applyFixes(r.questionNumber, r.solution ?? "", paper.solutionFixes);
      solution = cleaned.trim() ? cleaned : null;
      src = solution ? "source" : "none";
    }
    // Repair pandoc artifacts (hard-break/split-delimiter/glued-macro) BEFORE the
    // KaTeX guard, so a source solution with a `\right.\\)` / `\right.\ \]` doesn't
    // get skipped-as-broken and left null. cleanup-latex applies the same repair.
    if (solution) solution = repairLatex(solution);
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
      .eq("source_file", sourceFile)
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
