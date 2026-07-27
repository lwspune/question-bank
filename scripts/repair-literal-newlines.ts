/**
 * One-off repair: convert literal `\n` (backslash + n) into real newlines in
 * stored question text/context/solution, and in the source JSON that produced
 * them.
 *
 *   npx tsx scripts/repair-literal-newlines.ts            # dry run
 *   npx tsx scripts/repair-literal-newlines.ts --apply
 *
 * Background: a transcription agent double-escaped its newlines when writing
 * `data/*.json`, and the pipelines' `commit.ts` had no normalisation guard, so
 * the two-character sequence reached the DB verbatim. Consequence: GFM
 * pipe-tables never render (the parser needs real line breaks), so the affected
 * Statistics questions were unusable — two were reported by students.
 *
 * The transform is `normalizeNewlines`, the same helper the Excel parser uses:
 * it masks LaTeX math zones first, so `\neq` / `\nabla` / `\nu` and matrix `\\`
 * row separators are never touched. It only ever turns the 2-char sequence into
 * the 1-char newline it was meant to be, so it cannot alter a value — it can
 * neither introduce an error nor mask one.
 *
 * content_hash: `solution` is not part of any hash, so solution-only repairs are
 * hash-neutral. A change to `text` or `context` DOES change the hash, so it is
 * recomputed with the real helper and checked for a collision within the same
 * (org_id, exam_id) before writing — a collision aborts that row rather than
 * risking a unique-index violation.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../src/lib/text/normalizeNewlines";
import {
  contentHash,
  subjectiveContentHash,
  numericContentHash,
} from "../src/lib/upload/hash";

const APPLY = process.argv.includes("--apply");

/** Source JSONs whose rows carry the literal sequence (authoritative scan). */
const SOURCE_FILES = [
  "scripts/mh-ssc-10/data/alg-2020.all.json",
  "scripts/mh-ssc-10/data/alg-2020.questions.json",
  "scripts/stateboard/data/logic-12.questions.json",
  "scripts/stateboard/data/logic-12.s14.json",
  "scripts/stateboard/data/logic-12.s14.solutions.json",
  "scripts/stateboard/data/pair-lines-12.s43.solutions.json",
];

/** DB rows to repair, scoped by the source_file that produced them. */
const DB_SOURCE_FILES = [
  "MH_SSC_10_Algebra_2020.pdf",
  "StateBoard_12_Maths__Mathematical_Logic.pdf",
];

type Row = {
  id: string;
  org_id: string;
  exam_id: string;
  source_file: string;
  question_number: string | null;
  question_format: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  content_hash: string;
  options: { label: string; text: string; is_correct: boolean }[];
};

function repairSources(): number {
  let changed = 0;
  for (const rel of SOURCE_FILES) {
    const path = join(process.cwd(), rel);
    let rows: unknown;
    try {
      rows = JSON.parse(readFileSync(path, "utf8"));
    } catch {
      console.log(`  ! skip (unreadable/not JSON): ${rel}`);
      continue;
    }
    if (!Array.isArray(rows)) continue;
    let n = 0;
    for (const q of rows as Record<string, unknown>[]) {
      for (const k of ["stem", "solution", "context"]) {
        const v = q?.[k];
        if (typeof v === "string") {
          const next = normalizeNewlines(v);
          if (next !== v) {
            q[k] = next;
            n++;
          }
        }
      }
    }
    if (n > 0) {
      changed += n;
      console.log(`  ${rel}: ${n} field(s) repaired`);
      if (APPLY) writeFileSync(path, JSON.stringify(rows, null, 2) + "\n", "utf8");
    }
  }
  return changed;
}

function hashFor(r: Row, text: string, context: string | null): string {
  if (r.question_format === "subjective") return subjectiveContentHash(text, context);
  if (r.question_format === "numeric") return numericContentHash(text, context);
  const answer = r.options.find((o) => o.is_correct)?.label ?? "";
  return contentHash(text, r.options.map((o) => o.text), answer);
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  console.log(`${APPLY ? "APPLY" : "[dry-run]"} literal-\\n repair\n`);
  console.log("Source JSON:");
  const srcChanged = repairSources();
  if (srcChanged === 0) console.log("  (already clean)");

  console.log("\nDatabase rows:");
  const { data, error } = await client
    .from("questions")
    .select(
      "id, org_id, exam_id, source_file, question_number, question_format, text, context, solution, content_hash, options(label, text, is_correct)"
    )
    .in("source_file", DB_SOURCE_FILES);
  if (error) throw new Error(`read failed: ${error.message}`);

  const rows = (data ?? []) as unknown as Row[];
  let repaired = 0;
  let hashChanged = 0;
  let collisions = 0;

  for (const r of rows) {
    const text = normalizeNewlines(r.text);
    const context = r.context ? normalizeNewlines(r.context) : r.context;
    const solution = r.solution ? normalizeNewlines(r.solution) : r.solution;
    if (text === r.text && context === r.context && solution === r.solution) continue;

    const patch: Record<string, unknown> = {};
    const fields: string[] = [];
    if (text !== r.text) { patch.text = text; fields.push("text"); }
    if (context !== r.context) { patch.context = context; fields.push("context"); }
    if (solution !== r.solution) { patch.solution = solution; fields.push("solution"); }

    // Only text/context feed the hash; solution never does.
    let note = "";
    if (patch.text !== undefined || patch.context !== undefined) {
      const nextHash = hashFor(r, text, context);
      if (nextHash !== r.content_hash) {
        const { data: clash, error: cErr } = await client
          .from("questions")
          .select("id, question_number")
          .eq("org_id", r.org_id)
          .eq("exam_id", r.exam_id)
          .eq("content_hash", nextHash)
          .neq("id", r.id);
        if (cErr) throw new Error(`collision check failed: ${cErr.message}`);
        if (clash && clash.length > 0) {
          collisions++;
          console.log(
            `  ! COLLISION ${r.source_file} ${r.question_number} → would duplicate ${clash[0].question_number}; SKIPPED`
          );
          continue;
        }
        patch.content_hash = nextHash;
        hashChanged++;
        note = " (+hash)";
      }
    }

    repaired++;
    console.log(`  ${r.source_file} ${r.question_number}: ${fields.join(", ")}${note}`);
    if (APPLY) {
      const { error: uErr } = await client.from("questions").update(patch).eq("id", r.id);
      if (uErr) throw new Error(`update ${r.id} failed: ${uErr.message}`);
    }
  }

  console.log(
    `\n${APPLY ? "applied" : "would repair"}: ${repaired} row(s), ${hashChanged} hash recompute(s), ${collisions} collision(s) skipped.`
  );
  if (!APPLY) console.log("pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
