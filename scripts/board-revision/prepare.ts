/**
 * Lay out what a revision-sheet drafter reads (2026-11-03), for MH HSC 12:
 * `npm run revision:prepare -- --out=<dir> [--subject=Physics] [--chapter=<slug>]`.
 *
 * Per chapter, into <dir>/<subjectRoute>/<chapterSlug>/:
 *   book.txt  the textbook chapter as text (pdftotext, reading order), from the
 *             PDF the ingestion config already names (scripts/stateboard/config.ts);
 *             a whole-book PDF is cut to the chapter's own pages.
 *   pyqs.txt  every PUBLIC board past-paper question of the chapter, one a line,
 *             "<year> <month> [<format>] <text>", newest first. The evidence check
 *             (revision:evidence) matches cited lines against this file.
 * Read-only on the database. Write the output to a scratch folder, never the repo.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/board/query";
import { CHAPTERS, type Chapter } from "../stateboard/config";

const EXAM_NAME = "Maharashtra HSC Class 12";

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

function bookText(ch: Chapter): string {
  if (!ch.pages || ch.pages.length === 0) return execFileSync("pdftotext", [ch.pdf, "-"], { encoding: "utf8" });
  return ch.pages
    .map((p) => execFileSync("pdftotext", ["-f", String(p + 1), "-l", String(p + 1), ch.pdf, "-"], { encoding: "utf8" }))
    .join("\n");
}

(async () => {
  const out = arg("out");
  if (!out) {
    console.error("usage: npm run revision:prepare -- --out=<dir> [--subject=Physics] [--chapter=<slug>]");
    process.exit(2);
  }
  const subject = arg("subject");
  const only = arg("chapter");
  const db = createSupabaseAdminClient();
  const { data: exam, error: examErr } = await db.from("exams").select("id").eq("name", EXAM_NAME).single();
  if (examErr || !exam) throw new Error(`exam ${EXAM_NAME}: ${examErr?.message}`);

  const chapters = Object.values(CHAPTERS).filter(
    (c) => c.subjectName && (!subject || c.subjectName === subject) && (!only || slugify(c.chapterName) === only)
  );
  for (const ch of chapters) {
    const { data: sub } = await db.from("subjects").select("id").eq("exam_id", exam.id).eq("name", ch.subjectName).single();
    const { data: dbCh } = sub
      ? await db.from("chapters").select("id").eq("subject_id", sub.id).eq("name", ch.chapterName).maybeSingle()
      : { data: null };
    if (!dbCh) {
      console.log(`SKIP ${ch.subjectName} / ${ch.chapterName}: no such chapter in the database`);
      continue;
    }
    const { data: qs, error } = await db
      .from("questions")
      .select("pyq_year,pyq_month,question_format,text,image_url,options(label,text)")
      .eq("chapter_id", dbCh.id)
      .eq("question_kind", "pyq")
      .eq("visibility", "PUBLIC")
      .order("pyq_year", { ascending: false })
      .limit(1000);
    if (error) throw new Error(`${ch.chapterName}: ${error.message}`);
    // The FULL text, one line: a 300-character cut once made a complete table
    // question read as truncated. A question whose figure is an image says so,
    // or its "identify A and B" reads as a question with nothing to identify.
    // An MCQ's options follow its stem on the same line, so a drafter can tell
    // "Identify the alga among the following" from its choices; the evidence
    // check matches a cited line by its START, which the options never move.
    const lines = (qs ?? []).map((q) => {
      const opts = ((q.options ?? []) as { label: string; text: string }[])
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((o) => `(${o.label}) ${String(o.text).replace(/\s+/g, " ")}`)
        .join(" ");
      return (
        `${q.pyq_year} ${q.pyq_month ?? ""} [${q.question_format}] ${String(q.text).replace(/\s+/g, " ")}` +
        (opts ? ` OPTIONS: ${opts}` : "") +
        (q.image_url ? " [has a figure, not shown here]" : "")
      );
    });
    const dir = join(out, slugify(ch.subjectName), slugify(ch.chapterName));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "book.txt"), bookText(ch));
    writeFileSync(join(dir, "pyqs.txt"), lines.join("\n") + "\n");
    console.log(`${ch.subjectName} / ${ch.chapterName}: ${lines.length} past-paper questions -> ${dir}`);
  }
  process.exit(0);
})();
