/**
 * Flip the SHIP-READY subset of a committed State Board chapter to PUBLIC.
 *
 *   npx tsx scripts/mh-sb-9/flip-public.ts <chapterId>          # dry-run (counts)
 *   npx tsx scripts/mh-sb-9/flip-public.ts <chapterId> --apply  # write
 *
 * Ship rule: a row is PUBLIC iff it has a trustworthy answer.
 *   - solved examples  → question_format='subjective' AND solution IS NOT NULL
 *     (the book's authoritative worked answer) → PUBLIC.
 *   - exercise-mcq (answer DERIVED) + exercise-subjective (answer pending) stay
 *     PRIVATE until a review / answer-authoring pass. Pass --with-mcq to also
 *     flip MCQs that have a correct option set (derived answers).
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const withMcq = process.argv.includes("--with-mcq");
  const ch = requireChapter(id);
  loadEnv();

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Solved examples: subjective with a book solution.
  const { count: solvedCount } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile)
    .eq("question_format", "subjective")
    .not("solution", "is", null);
  console.log(`solved examples (subjective + solution) for ${ch.chapterName}: ${solvedCount ?? 0}`);

  if (!apply) {
    console.log("[dry-run] pass --apply to flip these to PUBLIC.");
    if (withMcq) console.log("[dry-run] --with-mcq would ALSO flip MCQs with a correct option.");
    return;
  }

  const { error, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile)
    .eq("question_format", "subjective")
    .not("solution", "is", null);
  if (error) throw new Error(`flip failed: ${error.message}`);
  console.log(`flipped ${count} solved examples to PUBLIC.`);

  if (withMcq) {
    // MCQs with a derived correct option (an options row where is_correct).
    const { data: mcqIds, error: mErr } = await client
      .from("questions")
      .select("id, options!inner(is_correct)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_format", "mcq")
      .eq("options.is_correct", true);
    if (mErr) throw new Error(`mcq lookup failed: ${mErr.message}`);
    const ids = (mcqIds ?? []).map((r) => (r as { id: string }).id);
    if (ids.length) {
      const { error: uErr, count: mc } = await client
        .from("questions").update({ visibility: "PUBLIC" }, { count: "exact" }).in("id", ids);
      if (uErr) throw new Error(`mcq flip failed: ${uErr.message}`);
      console.log(`flipped ${mc} MCQs (derived answer) to PUBLIC.`);
    } else {
      console.log("no MCQs with a correct option to flip.");
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
