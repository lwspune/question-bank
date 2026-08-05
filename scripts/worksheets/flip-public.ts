// Flip a committed worksheets chapter PUBLIC once the blind key-verification
// pass has cleared it.
//
//   npx tsx scripts/worksheets/flip-public.ts <chapterId>                 # dry-run
//   npx tsx scripts/worksheets/flip-public.ts <chapterId> --apply
//   npx tsx scripts/worksheets/flip-public.ts <chapterId> --apply --except=05-11,07-30
//
// --except keeps named question ids (questions.question_number) PRIVATE.
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireChapter, EXAM_ID } from "./config";

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const exceptArg = process.argv.find((a) => a.startsWith("--except="));
  const except = exceptArg ? exceptArg.slice("--except=".length).split(",").map((s) => s.trim()) : [];

  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { count: total } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", chapter.sourceFile);
  console.log(`${chapter.sourceFile}: ${total} rows; flipping all except [${except.join(", ") || "none"}]`);

  if (!apply) {
    console.log("[dry-run] pass --apply to write.");
    return;
  }

  let q = client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", chapter.sourceFile);
  if (except.length) q = q.not("question_number", "in", `(${except.map((e) => `"${e}"`).join(",")})`);
  const { error, count } = await q;
  if (error) throw new Error(error.message);
  console.log(`flipped ${count} rows PUBLIC.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
