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

  // PROVENANCE GATE — fail CLOSED, before visibility, never after.
  //
  // These books print almost no answer key, so nearly every stored answer is one we
  // authored. `apply-solutions.ts` stamps `derived_model`/`derived_at` as it writes
  // them, and this is the gate that makes the stamp non-optional: a derived answer
  // that goes PUBLIC without announcing itself is indistinguishable from an official
  // key, which is exactly the defect this project recorded on the CDS General
  // Knowledge corpus — noticed at the publish gate, one step too late.
  //
  // Rows the BOOK answered are legitimately unstamped (a Maths solved example
  // carries the book's own printed solution), so this cannot simply demand a stamp
  // on everything. It demands one on every row whose solution came from
  // apply-solutions, which is precisely the set that file wrote.
  const { data: unstamped, error: pErr } = await client
    .from("questions")
    .select("id, question_number, section_kind")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile)
    .not("solution", "is", null)
    .is("derived_model", null);
  if (pErr) throw new Error(`provenance check failed: ${pErr.message}`);
  const authoredUnstamped = (unstamped ?? []).filter(
    (r: any) => r.section_kind !== "solved_example",
  );
  if (authoredUnstamped.length) {
    console.log(
      `\n⚠  ${authoredUnstamped.length} row(s) carry an AUTHORED answer with no derived_model stamp:` +
        `\n     ${authoredUnstamped.slice(0, 8).map((r: any) => r.question_number).join(", ")}` +
        (authoredUnstamped.length > 8 ? ", …" : "") +
        `\n   Re-run apply-solutions.ts --apply (it stamps as it writes), or use` +
        `\n   scripts/mh-ssc-10-text/backfill-provenance.ts for rows already applied.` +
        `\n   Refusing to publish: a derived answer must say so before it is readable.`,
    );
    process.exitCode = 1;
    return;
  }

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
