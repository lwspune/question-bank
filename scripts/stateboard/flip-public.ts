/**
 * Flip the SHIP-READY subset of a committed State Board chapter to PUBLIC.
 *
 *   npx tsx scripts/stateboard/flip-public.ts <chapterId>          # dry-run (counts)
 *   npx tsx scripts/stateboard/flip-public.ts <chapterId> --apply  # write
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
import { EXAM_ID, requireChapter, DERIVED_NOTE_CLAUSE } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/**
 * Gate for a chapter whose source book prints NO answer key
 * (`Chapter.derivedAnswers`): every answer we authored must ANNOUNCE that it is
 * derived before it can be published, or a student reads it as an official key.
 * Caught on CDS General Knowledge at exactly this point, one step too late —
 * hence a refusal here and a stamp at commit time (stamp-provenance.ts).
 *
 * Deliberately a NO-OP for every chapter that does not set the flag, so the
 * shipped Maths chapters — whose book DOES carry an ANSWERS section, and whose
 * rows predate this — flip exactly as they did before.
 */
async function assertProvenance(
  // Loosely typed on purpose: the generated Database types make the concrete
  // client and `ReturnType<typeof createClient>` mutually unassignable, and this
  // helper only ever issues one narrow select.
  client: any,
  ch: ReturnType<typeof requireChapter>
) {
  if (!ch.derivedAnswers) return;
  const { data, error } = await client
    .from("questions")
    .select("question_number, section_kind, derived_model, pyq_note")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile);
  if (error) throw new Error(`provenance check failed: ${error.message}`);

  const authored = (data ?? []).filter((r: any) => r.section_kind !== "solved_example");
  const bad = authored.filter(
    (r: any) => !r.derived_model || !(r.pyq_note ?? "").includes(DERIVED_NOTE_CLAUSE)
  );
  if (bad.length) {
    throw new Error(
      `refusing to publish — ${bad.length} of ${authored.length} authored row(s) carry no ` +
        `derived-answer provenance: ${bad.slice(0, 6).map((r: any) => r.question_number).join(", ")}` +
        `${bad.length > 6 ? " …" : ""}\n` +
        `  This book publishes no answer key, so an unannounced derived answer reads as an ` +
        `official one. Run: npx tsx scripts/stateboard/stamp-provenance.ts ${ch.id} --apply`
    );
  }
  console.log(
    `provenance OK: all ${authored.length} authored row(s) stamped ` +
      `(${(data ?? []).length - authored.length} book-solution rows correctly unstamped).`
  );
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

  await assertProvenance(client, ch);

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
