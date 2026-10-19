/**
 * List the board rows whose SOLUTION a figure would explain, for triage.
 *
 *   npx tsx scripts/solution-figures/candidates.ts <wave> "<Exam>:<Subject>" [...]
 *     -> out/<wave>/<exam-subject>.candidates.json, one file per pair
 *
 * A candidate is a PUBLIC row with no solution_image_url that trips any of the
 * signals in signals.ts (asks / worded / explains / dangling; tested in
 * tests/solution-figures-signals.test.ts).
 * The signals over-report on purpose (the 2026-09 figure probe measured 26%
 * precision); a person or an agent reads every candidate.
 *
 * Each chapter is paired with its BOOK, read off a textbook row in the same
 * chapter via scripts/lib/figures/sources.ts: a board-paper row has no book of
 * its own, but its chapter is the textbook's chapter.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { resolveSource } from "../lib/figures/sources";
import { candidateSignals } from "./signals";

type Row = {
  id: string; question_number: string | null; question_kind: string; question_format: string; pyq_year: number | null;
  source_file: string | null; text: string; solution: string | null; image_url: string | null; chapter_id: string | null;
  chapters: { name: string } | null;
};

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function main() {
  const [wave, ...pairs] = process.argv.slice(2);
  if (!wave || !pairs.length) throw new Error('usage: candidates.ts <wave> "<Exam>:<Subject>" [...]');
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const outdir = join(__dirname, "out", wave);
  mkdirSync(outdir, { recursive: true });

  for (const pair of pairs) {
    const [examName, subjectName] = pair.split(":");
    const { data: exam } = await db.from("exams").select("id").eq("name", examName).single();
    const { data: subject } = await db.from("subjects").select("id").eq("name", subjectName).eq("exam_id", exam!.id).single();
    if (!exam || !subject) throw new Error(`no ${pair}`);

    const rows: Row[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await db
        .from("questions")
        .select("id, question_number, question_kind, question_format, pyq_year, source_file, text, solution, image_url, chapter_id, chapters(name)")
        .eq("exam_id", exam.id).eq("subject_id", subject.id).eq("visibility", "PUBLIC").is("solution_image_url", null)
        .order("id").range(from, from + 999);
      if (error) throw new Error(error.message);
      rows.push(...(data as unknown as Row[]));
      if (data.length < 1000) break;
    }

    // chapter -> the book PDFs its textbook rows came from
    const books = new Map<string, Set<string>>();
    for (const r of rows) {
      const src = r.source_file ? resolveSource(r.source_file) : null;
      if (src && r.chapter_id) books.set(r.chapter_id, (books.get(r.chapter_id) ?? new Set()).add(src.pdf));
    }

    const out = [];
    for (const r of rows) {
      const sol = r.solution ?? "";
      const signals = candidateSignals(r);
      if (!signals.length) continue;
      out.push({
        id: r.id, chapter: r.chapters?.name ?? null, kind: r.question_kind, format: r.question_format,
        ref: `${r.question_kind === "pyq" ? `board ${r.pyq_year ?? "?"}` : "textbook"} ${r.question_number ?? ""}`.trim(),
        signals, stemHasImage: !!r.image_url, books: [...(r.chapter_id ? books.get(r.chapter_id) ?? [] : [])],
        stem: r.text, solution: sol,
      });
    }
    out.sort((a, b) => (a.chapter ?? "").localeCompare(b.chapter ?? ""));
    const file = join(outdir, `${slug(pair)}.candidates.json`);
    writeFileSync(file, JSON.stringify(out, null, 1));
    const noBook = out.filter((c) => !c.books.length).length;
    console.log(`${pair}: ${rows.length} rows, ${out.length} candidates (${noBook} with no book found) -> ${file}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
