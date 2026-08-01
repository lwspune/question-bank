/**
 * Bank-wide sweep for pandoc extraction artifacts that reach the reader as
 * literal markup (stray hard-line-break backslashes, CJK full stops, escaped
 * punctuation). See scripts/lib/pandocArtifacts.ts for the class analysis.
 *
 *   npx tsx scripts/audit-pandoc-artifacts.ts                 # dry-run, all exams
 *   npx tsx scripts/audit-pandoc-artifacts.ts --exam="JEE Mains"
 *   npx tsx scripts/audit-pandoc-artifacts.ts --apply
 *
 * Safety, in the order it matters:
 *   1. KATEX GUARD  — every changed field must still render; a row that would
 *      break is left completely untouched and reported.
 *   2. HASH COLLISION GUARD — `contentHash` collapses whitespace, so two rows
 *      that differed ONLY by the artifact hash identically once repaired. The
 *      text repair is still applied (it is a genuine fix), but the content_hash
 *      update is skipped so we never write a duplicate dedup key.
 *   3. Per-FORMAT hashing — mcq / subjective / numeric use different hash
 *      functions; using the MCQ one on a NAT row writes a wrong dedup key.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../src/components/math/parseLatex";
import { parseTableBlocks } from "../src/components/math/parseTableBlocks";
import { contentHash, numericContentHash, subjectiveContentHash } from "../src/lib/upload/hash";
import { pandocArtifactCount, stripPandocArtifacts } from "./lib/pandocArtifacts";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Opt = { id: string; label: string; text: string; is_correct: boolean };
type Row = {
  id: string;
  question_number: string | null;
  question_format: string | null;
  visibility: string;
  org_id: string;
  exam_id: string;
  source_file: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  exams: { name: string } | null;
  options: Opt[];
};

/**
 * A hard-line-break repair inserts a NEWLINE. If the artifact sat inside a pipe
 * table row, that newline splits the row in two and the table stops parsing —
 * turning a cosmetic repair into a destroyed table. Require that the table
 * structure is identical before and after.
 */
function tablesIntact(before: string, after: string): boolean {
  if (!before.includes("|")) return true;
  const shape = (s: string) =>
    JSON.stringify(
      parseTableBlocks(s)
        .filter((b) => b.kind === "table")
        .map((b) => (b.kind === "table" ? [b.headers.length, b.rows.length] : null))
    );
  return shape(before) === shape(after);
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

async function fetchAll(client: SupabaseClient): Promise<Row[]> {
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client
      .from("questions")
      .select(
        "id, question_number, question_format, visibility, org_id, exam_id, source_file, text, context, solution, exams(name), options(id, label, text, is_correct)"
      )
      .order("id", { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const page = (data ?? []) as unknown as Row[];
    rows.push(...page);
    process.stdout.write(`\r  fetched ${rows.length}`);
    if (page.length < 1000) break;
  }
  process.stdout.write("\n");
  return rows;
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const examArg = process.argv.find((a) => a.startsWith("--exam="))?.slice("--exam=".length);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  console.log("fetching bank...");
  const all = await fetchAll(client);
  const rows = examArg ? all.filter((r) => r.exams?.name === examArg) : all;
  console.log(`scanning ${rows.length} rows${examArg ? ` (exam=${examArg})` : ""}\n`);

  const byExam = new Map<string, { rows: number; artifacts: number; skipped: number; noHash: number }>();
  const bump = (e: string, k: "rows" | "artifacts" | "skipped" | "noHash", n = 1) => {
    const cur = byExam.get(e) ?? { rows: 0, artifacts: 0, skipped: 0, noHash: 0 };
    cur[k] += n;
    byExam.set(e, cur);
  };

  const samples: string[] = [];
  let changed = 0;
  let optionsChanged = 0;

  for (const r of rows) {
    const exam = r.exams?.name ?? "(unknown)";
    const newText = stripPandocArtifacts(r.text);
    const newContext = r.context ? stripPandocArtifacts(r.context) : r.context;
    const newSolution = r.solution ? stripPandocArtifacts(r.solution) : r.solution;
    const newOpts = (r.options ?? []).map((o) => ({ ...o, newText: stripPandocArtifacts(o.text) }));

    const textChanged = newText !== r.text || newContext !== r.context;
    const optsChanged = newOpts.some((o) => o.newText !== o.text);
    const solChanged = newSolution !== r.solution;
    if (!textChanged && !optsChanged && !solChanged) continue;

    const artifacts =
      pandocArtifactCount(r.text) +
      pandocArtifactCount(r.context ?? "") +
      pandocArtifactCount(r.solution ?? "") +
      (r.options ?? []).reduce((n, o) => n + pandocArtifactCount(o.text), 0);

    // 1. KaTeX + table guards — never half-repair a row.
    const guards = [newText, newContext ?? "", newSolution ?? "", ...newOpts.map((o) => o.newText)];
    const tableSafe =
      tablesIntact(r.text, newText) &&
      tablesIntact(r.context ?? "", newContext ?? "") &&
      tablesIntact(r.solution ?? "", newSolution ?? "");
    if (!guards.every(mathOk) || !tableSafe) {
      bump(exam, "skipped");
      continue;
    }

    changed++;
    if (optsChanged) optionsChanged++;
    bump(exam, "rows");
    bump(exam, "artifacts", artifacts);

    if (samples.length < 12) {
      const src = [r.text, r.context ?? "", r.solution ?? "", ...(r.options ?? []).map((o) => o.text)].find(
        (f) => f && stripPandocArtifacts(f) !== f
      );
      if (src) {
        const i = Math.max(0, src.search(/\\[ \t\n]|。|\\[."'\-_{}<>,]/) - 30);
        samples.push(
          `${exam} ${r.source_file ?? ""} Q${r.question_number ?? "?"}\n` +
            `      -  ...${src.slice(i, i + 80).replace(/\n/g, "\\n")}...\n` +
            `      +  ...${stripPandocArtifacts(src).slice(i, i + 80).replace(/\n/g, "\\n")}...`
        );
      }
    }

    if (!apply) continue;

    // 3. Per-format hash.
    let newHash: string | null = null;
    if (textChanged || optsChanged) {
      if (r.question_format === "numeric") newHash = numericContentHash(newText, newContext ?? null);
      else if (r.question_format === "subjective") newHash = subjectiveContentHash(newText, newContext ?? null);
      else {
        const correct = newOpts.find((o) => o.is_correct)?.label ?? "";
        newHash = contentHash(newText, newOpts.map((o) => o.newText), correct);
      }
      // 2. Collision guard.
      const { data: clash } = await client
        .from("questions")
        .select("id")
        .eq("org_id", r.org_id)
        .eq("exam_id", r.exam_id)
        .eq("content_hash", newHash)
        .neq("id", r.id);
      if ((clash ?? []).length > 0) {
        newHash = null;
        bump(exam, "noHash");
      }
    }

    const update: Record<string, unknown> = {};
    if (newText !== r.text) update.text = newText;
    if (newContext !== r.context) update.context = newContext;
    if (newSolution !== r.solution) update.solution = newSolution;
    if (newHash) update.content_hash = newHash;
    if (Object.keys(update).length) {
      const { error } = await client.from("questions").update(update).eq("id", r.id);
      if (error) throw new Error(`${r.id}: ${error.message}`);
    }
    for (const o of newOpts) {
      if (o.newText === o.text) continue;
      const { error } = await client.from("options").update({ text: o.newText }).eq("id", o.id);
      if (error) throw new Error(`${r.id} opt ${o.label}: ${error.message}`);
    }
  }

  console.log("by exam:");
  console.log("  exam                                rows  artifacts  katex-skipped  hash-kept-stale");
  for (const [exam, s] of [...byExam.entries()].sort((a, b) => b[1].rows - a[1].rows)) {
    console.log(
      `  ${exam.padEnd(34)}${String(s.rows).padStart(5)}${String(s.artifacts).padStart(11)}` +
        `${String(s.skipped).padStart(15)}${String(s.noHash).padStart(17)}`
    );
  }
  console.log(`\ntotal rows changed: ${changed} (options touched on ${optionsChanged})`);
  console.log(`\nsample diffs:`);
  for (const s of samples) console.log(`  ${s}`);
  if (!apply) console.log(`\n[dry-run] pass --apply to write.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
