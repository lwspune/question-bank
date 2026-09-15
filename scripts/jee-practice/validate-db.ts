/**
 * Validate the committed rows of a JEE-practice chapter: every math zone renders
 * in KaTeX, and no markdown/pandoc leaks survive in any text field.
 *
 *   npx tsx scripts/jee-practice/validate-db.ts <chapterId>
 *
 * Read-only. Reports per-field KaTeX failures + markdown-leak hits; exits non-zero
 * if anything is broken. Run after commit, before flip-public.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { EXAM_ID, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** null if all math zones render, else the first KaTeX error. */
function katexError(text: string): string | null {
  for (const seg of parseLatex(text)) {
    if (seg.type !== "inline" && seg.type !== "block") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch (e) {
      return `KaTeX: ${(e as Error).message.slice(0, 120)} [in: ${seg.content.slice(0, 60)}]`;
    }
  }
  return null;
}

const LEAK = /!\[\]\(|\{width=|<!--|\]\(media\//;

async function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: rows, error } = await client
    .from("questions")
    .select("question_number, text, context, solution, options(label, text)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile)
    .order("question_number");
  if (error) throw new Error(error.message);

  const problems: string[] = [];
  for (const r of rows ?? []) {
    const fields: [string, string | null][] = [
      ["stem", r.text],
      ["context", r.context],
      ["solution", r.solution],
      ...(r.options as { label: string; text: string }[]).map((o) => [`opt ${o.label}`, o.text] as [string, string]),
    ];
    for (const [name, val] of fields) {
      if (!val) continue;
      const ke = katexError(val);
      if (ke) problems.push(`${r.question_number} ${name}: ${ke}`);
      if (LEAK.test(val)) problems.push(`${r.question_number} ${name}: markdown leak`);
    }
  }

  console.log(`checked ${rows?.length ?? 0} rows for ${ch.chapterName}.`);
  if (problems.length) {
    console.log(`\nPROBLEMS (${problems.length}):`);
    for (const p of problems) console.log(`  ${p}`);
    process.exit(1);
  }
  console.log("all math zones render in KaTeX; no markdown leaks. ✓");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
