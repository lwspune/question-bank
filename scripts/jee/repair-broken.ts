/**
 * Re-apply the CURRENT text cleaners to already-committed rows that no longer
 * render, and record the result as a stemOverride so it survives a re-ingest.
 *
 *   npx tsx scripts/jee/repair-broken.ts <paperId> [--subject=Chemistry] [--apply]
 *
 * The cleaners run at commit, so a row committed BEFORE a cleaner existed keeps
 * its broken text. Rebuilding the override from the RAW record is wrong — the
 * record still carries defects that `cleanup-latex` has since fixed in the DB
 * (glued commands, mainly), so the override would reintroduce them and resync's
 * KaTeX guard would silently refuse the write. Rebuild from the COMMITTED text
 * instead, which is the raw record plus every fix already applied.
 *
 * Only touches rows that currently FAIL to render, and only writes when the
 * cleaned text actually renders. Run resync afterwards to push it to the DB.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { EXAM_ID, loadPaper, paperDataPath, requirePaperId } from "./config";
import { parseSubjectArg, sanitizeLatex, stripEmptyMath } from "./lib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function renders(text: string): boolean {
  for (const seg of parseLatex(text ?? "")) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch {
      return false;
    }
  }
  return true;
}

async function main() {
  const paperId = requirePaperId(process.argv, 2, "repair-broken.ts <paperId> [--apply]");
  const subject = parseSubjectArg(process.argv) ?? "Chemistry";
  const apply = process.argv.includes("--apply");
  const paper = loadPaper(paperId);

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const { data: subs } = await db.from("subjects").select("id,name").eq("exam_id", EXAM_ID);
  const sub = (subs ?? []).find((s) => s.name === subject);
  if (!sub) throw new Error(`subject not found: ${subject}`);

  const { data, error } = await db
    .from("questions")
    .select("question_number,text")
    .eq("exam_id", EXAM_ID)
    .eq("subject_id", sub.id)
    .eq("source_file", paper.sourceFile);
  if (error) throw error;

  const file = JSON.parse(readFileSync(paperDataPath(paperId), "utf8"));
  const fixed: string[] = [];
  const stillBroken: string[] = [];

  for (const r of (data ?? []) as { question_number: string; text: string }[]) {
    if (renders(r.text)) continue;
    const cleaned = stripEmptyMath(sanitizeLatex(r.text));
    if (cleaned === r.text || !renders(cleaned)) { stillBroken.push(r.question_number); continue; }
    file.stemOverrides = { ...(file.stemOverrides ?? {}), [r.question_number]: cleaned };
    fixed.push(r.question_number);
  }

  console.log(`${paperId} [${subject}]: ${apply ? "repaired" : "would repair"} ${fixed.length} row(s)`);
  if (fixed.length) console.log(`  Q${fixed.join(", Q")}  — run resync --only=${fixed.join(",")} --apply`);
  if (stillBroken.length) console.log(`  STILL BROKEN (needs a hand fix): Q${stillBroken.join(", Q")}`);

  if (apply && fixed.length) {
    file.notes =
      (file.notes ?? "") +
      `\n[${subject} stem repair] Q${fixed.join(", Q")}: content-free math zones left by pandoc where an answer ` +
      `blank stood. parseLatex reduces them to a bare backslash, which KaTeX rejects — taking the whole stem down ` +
      `— while scan-flip passes them because the delimiters balance. Cleaned by stripEmptyMath.`;
    writeFileSync(paperDataPath(paperId), JSON.stringify(file, null, 2) + "\n");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
