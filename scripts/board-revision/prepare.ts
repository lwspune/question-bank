/**
 * Lay out what a revision-sheet drafter reads (2026-11-03; CBSE 12, MH SSC 10
 * and CBSE 10 2026-11-04):
 * `npm run revision:prepare -- --out=<dir> [--exam=mh-hsc-12|cbse-12|mh-ssc-10|cbse-10] [--subject=Physics] [--chapter=<slug>]`.
 *
 * Per chapter, into <dir>/<subjectRoute>/<chapterSlug>/:
 *   book.txt  the textbook chapter as text (pdftotext, reading order), from the
 *             PDF the ingestion config already names (scripts/stateboard/config.ts
 *             for Balbharati XII, scripts/mh-ssc-10-text/config.ts for Balbharati X,
 *             scripts/ncert/config.ts for NCERT); a whole-book
 *             PDF is cut to the chapter's own pages.
 *   pyqs.txt  every PUBLIC board past-paper question of the chapter, one a line,
 *             "<year> <month> [<format>] [<n> marks] <text>", newest first. The
 *             marks are the ones a stored past paper prints for the question
 *             (CBSE, MH SSC 10); HSC 12 rows sit in no paper with marks, so they
 *             carry none.
 *             The evidence check (revision:evidence) matches cited lines
 *             against this file.
 * Read-only on the database. Write the output to a scratch folder, never the repo.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/board/query";
import { CHAPTERS as STATEBOARD_CHAPTERS } from "../stateboard/config";
import { CHAPTERS as NCERT_CHAPTERS, EXAM_ID_CBSE_10, EXAM_ID_CBSE_12 } from "../ncert/config";
import { CHAPTERS as SSC10_CHAPTERS } from "../mh-ssc-10-text/config";

type BookChapter = { chapterName: string; subjectName: string; pdf: string; pages?: number[] };

/** Each exam's database name and the chapters its textbooks hold. */
const EXAMS: Record<string, { name: string; chapters: BookChapter[] }> = {
  "mh-hsc-12": { name: "Maharashtra HSC Class 12", chapters: Object.values(STATEBOARD_CHAPTERS).filter((c) => c.subjectName) },
  "cbse-12": { name: "CBSE Class 12", chapters: Object.values(NCERT_CHAPTERS).filter((c) => c.examId === EXAM_ID_CBSE_12) },
  "mh-ssc-10": { name: "Maharashtra State Board Class 10", chapters: Object.values(SSC10_CHAPTERS) },
  "cbse-10": { name: "CBSE Class 10", chapters: Object.values(NCERT_CHAPTERS).filter((c) => c.examId === EXAM_ID_CBSE_10) },
};

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

function bookText(ch: BookChapter): string {
  if (!ch.pages || ch.pages.length === 0) return execFileSync("pdftotext", [ch.pdf, "-"], { encoding: "utf8" });
  return ch.pages
    .map((p) => execFileSync("pdftotext", ["-f", String(p + 1), "-l", String(p + 1), ch.pdf, "-"], { encoding: "utf8" }))
    .join("\n");
}

/** The marks each question carries in the stored past papers: the commonest, when papers differ. */
async function marksOf(db: ReturnType<typeof createSupabaseAdminClient>, ids: string[]): Promise<Map<string, number>> {
  const tally = new Map<string, Map<number, number>>();
  // Chunked: an `.in()` list rides in the URL (CLAUDE.md, PostgREST limits).
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db.from("board_paper_items").select("question_id, marks").in("question_id", ids.slice(i, i + 200));
    if (error) throw new Error(`board_paper_items: ${error.message}`);
    for (const r of data ?? []) {
      const m = Number(r.marks);
      if (!Number.isInteger(m) || m < 1) continue;
      const t = tally.get(r.question_id) ?? new Map<number, number>();
      t.set(m, (t.get(m) ?? 0) + 1);
      tally.set(r.question_id, t);
    }
  }
  const out = new Map<string, number>();
  for (const [id, t] of tally) out.set(id, [...t.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0]);
  return out;
}

(async () => {
  const out = arg("out");
  const examSlug = arg("exam") ?? "mh-hsc-12";
  const exam = EXAMS[examSlug];
  if (!out || !exam) {
    console.error(
      `usage: npm run revision:prepare -- --out=<dir> [--exam=${Object.keys(EXAMS).join("|")}] [--subject=Physics] [--chapter=<slug>]`
    );
    process.exit(2);
  }
  const subject = arg("subject");
  const only = arg("chapter");
  const db = createSupabaseAdminClient();
  const { data: examRow, error: examErr } = await db.from("exams").select("id").eq("name", exam.name).single();
  if (examErr || !examRow) throw new Error(`exam ${exam.name}: ${examErr?.message}`);

  const chapters = exam.chapters.filter(
    (c) => (!subject || c.subjectName === subject) && (!only || slugify(c.chapterName) === only)
  );
  for (const ch of chapters) {
    const { data: sub } = await db.from("subjects").select("id").eq("exam_id", examRow.id).eq("name", ch.subjectName).single();
    const { data: dbCh } = sub
      ? await db.from("chapters").select("id").eq("subject_id", sub.id).eq("name", ch.chapterName).maybeSingle()
      : { data: null };
    if (!dbCh) {
      console.log(`SKIP ${ch.subjectName} / ${ch.chapterName}: no such chapter in the database`);
      continue;
    }
    const { data: qs, error } = await db
      .from("questions")
      .select("id,pyq_year,pyq_month,question_format,text,image_url,options(label,text)")
      .eq("chapter_id", dbCh.id)
      .eq("question_kind", "pyq")
      .eq("visibility", "PUBLIC")
      .order("pyq_year", { ascending: false })
      .limit(1000);
    if (error) throw new Error(`${ch.chapterName}: ${error.message}`);
    const marks = await marksOf(db, (qs ?? []).map((q) => q.id as string));
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
      const mk = marks.get(q.id as string);
      return (
        `${q.pyq_year} ${q.pyq_month ? `${q.pyq_month} ` : ""}[${q.question_format}] ` +
        (mk ? `[${mk} mark${mk === 1 ? "" : "s"}] ` : "") +
        String(q.text).replace(/\s+/g, " ") +
        (opts ? ` OPTIONS: ${opts}` : "") +
        (q.image_url ? " [has a figure, not shown here]" : "")
      );
    });
    const dir = join(out, slugify(ch.subjectName), slugify(ch.chapterName));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "book.txt"), bookText(ch));
    writeFileSync(join(dir, "pyqs.txt"), lines.join("\n") + "\n");
    console.log(`${ch.subjectName} / ${ch.chapterName}: ${lines.length} past-paper questions (${marks.size} with marks) -> ${dir}`);
  }
  process.exit(0);
})();
