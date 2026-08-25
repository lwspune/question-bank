/**
 * Presentation-only repairs: put multi-statement stems on separate lines.
 *
 *   npx tsx scripts/reviews/apply-formatting-fixes.ts <paperId>            # dry run
 *   npx tsx scripts/reviews/apply-formatting-fixes.ts <paperId> --apply
 *
 * SEPARATE FROM apply-source-verified-fixes.ts on purpose. That script changes
 * what a question SAYS (and therefore its content_hash); this one changes only
 * how it is LAID OUT.
 *
 * THE INVARIANT, and it is asserted rather than assumed: `contentHash` normalises
 * whitespace (`s.trim().replace(/\s+/g, " ")`), so a newline-only edit MUST leave
 * the hash byte-identical. If it moves, the edit changed content — refuse and
 * stop, because that would also strand every question_reviews row on this row.
 *
 * Both surfaces honour a real newline, which is why this is a real fix and not
 * cosmetic churn:
 *   web  — KatexRenderer renders text segments with `whiteSpace: "pre-wrap"`
 *   Word — docxBuilder's mathRuns() splits on "\n" and emits TextRun({break:1})
 * Store a REAL newline, never the two-character sequence backslash-n; the DB
 * rejects that at the ingest boundary and the render layer cannot tell it from
 * literal text.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const PAPER = process.argv[2];

/** Break before each "Statement-N:" so the two claims read as separate lines. */
const STATEMENT = /\s*(Statement[-\s]?\d\s*:)/g;

type Candidate = { id: string; qnum: string; before: string; after: string };

async function main() {
  if (!PAPER || PAPER.startsWith("--")) {
    console.error("usage: apply-formatting-fixes.ts <paperId> [--apply]");
    process.exit(2);
  }
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await db
    .from("paper_questions")
    // `label` is REQUIRED here: contentHash's third argument is the answer
    // LETTER. Selecting only (text, is_correct) makes the key undefined, the
    // recomputed hash differs, and the neutrality guard rejects a perfectly
    // good edit — which is exactly what happened the first time this ran.
    .select("position,questions!inner(id,question_number,text,content_hash,options(label,text,is_correct))")
    .eq("paper_id", PAPER);
  if (error) throw error;

  const todo: Candidate[] = [];
  let refused = 0;

  for (const row of (data as any[]).sort((a, b) => a.position - b.position)) {
    const q = row.questions;
    const before: string = q.text;
    // Only stems that present two or more labelled statements INLINE.
    const labels = before.match(/Statement[-\s]?\d\s*:/g) ?? [];
    if (labels.length < 2) continue;
    if (before.includes("\n")) continue; // already broken up

    const after = before.replace(STATEMENT, "\n$1").replace(/^\n+/, "");
    if (after === before) continue;

    const opts = (q.options as any[]).map((o) => o.text as string);
    const key = (q.options as any[]).find((o) => o.is_correct)?.label ?? "";
    const h = contentHash(after, opts, key);
    if (h !== q.content_hash) {
      console.error(
        `REFUSE Q${q.question_number}: content_hash moved ${q.content_hash.slice(0, 10)} -> ${h.slice(
          0,
          10
        )} — a formatting edit must be hash-neutral`
      );
      refused++;
      continue;
    }
    todo.push({ id: q.id, qnum: String(q.question_number), before, after });
  }

  if (!todo.length && !refused) {
    console.log("no inline multi-statement stems found — nothing to do");
    return;
  }
  for (const c of todo) {
    console.log(`\nQ${c.qnum}  (hash unchanged — layout only)`);
    console.log("  before: " + JSON.stringify(c.before));
    console.log("  after :");
    c.after.split("\n").forEach((l) => console.log("          " + l));
  }
  if (refused) {
    console.error(`\n${refused} refused — nothing written.`);
    process.exit(1);
  }
  if (!APPLY) {
    console.log(`\nDRY RUN — ${todo.length} stem(s) would be reformatted. Re-run with --apply.`);
    return;
  }
  for (const c of todo) {
    const up = await db.from("questions").update({ text: c.after }).eq("id", c.id);
    if (up.error) throw up.error;
    console.log(`applied Q${c.qnum}`);
  }
  console.log(`\n${todo.length} stem(s) reformatted.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
