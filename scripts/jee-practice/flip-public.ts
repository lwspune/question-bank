/**
 * Flip a committed JEE-practice chapter's ship-ready rows to PUBLIC.
 *
 *   npx tsx scripts/jee-practice/flip-public.ts <chapterId>          # dry-run (counts)
 *   npx tsx scripts/jee-practice/flip-public.ts <chapterId> --apply  # write
 *
 * Ship rule: a row is PUBLIC iff it has a trustworthy answer.
 *   - MCQ with a correct option — the answer comes from the printed LEVEL-N-KEY
 *     block (authoritative, like NEET), so these ship after spot-check.
 *   - Worked Examples — subjective + the booklet's own solution.
 * A row with no correct option (a KEY entry the transcription couldn't resolve)
 * stays PRIVATE by construction. Any row still under review is held with --except
 * (comma-separated question_number refs, e.g. --except="Lvl II Q13,W.E-3").
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
  const exceptArg = process.argv.find((a) => a.startsWith("--except="));
  const except = exceptArg
    ? exceptArg.slice("--except=".length).split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const ch = requireChapter(id);
  loadEnv();

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Ship-ready ids: subjective+solution OR mcq with a correct option.
  const [{ data: subj }, { data: mcq }] = await Promise.all([
    client
      .from("questions")
      .select("id, question_number")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_format", "subjective")
      .not("solution", "is", null),
    client
      .from("questions")
      .select("id, question_number, options!inner(is_correct)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_format", "mcq")
      .eq("options.is_correct", true),
  ]);

  const exceptSet = new Set(except);
  const rows = [...(subj ?? []), ...(mcq ?? [])] as { id: string; question_number: string }[];
  const ids = rows.filter((r) => !exceptSet.has(r.question_number)).map((r) => r.id);
  const held = rows.filter((r) => exceptSet.has(r.question_number)).map((r) => r.question_number);

  console.log(`ship-ready for ${ch.chapterName}: subjective=${subj?.length ?? 0}  mcq=${mcq?.length ?? 0}  → flipping ${ids.length}`);
  if (held.length) console.log(`held PRIVATE via --except: ${held.join(", ")}`);

  if (!apply) {
    console.log("[dry-run] pass --apply to flip to PUBLIC.");
    return;
  }
  if (!ids.length) {
    console.log("nothing to flip.");
    return;
  }

  // update in id-chunks to stay well under any statement limit
  let flipped = 0;
  for (let i = 0; i < ids.length; i += 500) {
    const chunk = ids.slice(i, i + 500);
    const { error, count } = await client
      .from("questions")
      .update({ visibility: "PUBLIC" }, { count: "exact" })
      .in("id", chunk);
    if (error) throw new Error(`flip failed: ${error.message}`);
    flipped += count ?? 0;
  }
  console.log(`flipped ${flipped} rows to PUBLIC.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
