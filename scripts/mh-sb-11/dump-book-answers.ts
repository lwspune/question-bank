/**
 * PHYSICS step-6 substitute — dump each numerical alongside the answer THE BOOK
 * ITSELF PRINTS, so an agent can cross-check our authored solution against it.
 *
 *   npx tsx scripts/mh-sb-11/dump-book-answers.ts <chapterId> [outPath]
 *
 * WHY THIS EXISTS. The Maths volumes carry an end-of-book ANSWERS section and
 * `dump-review.ts` diffs against it. **Neither Physics volume has one** —
 * verified across all 644 pages of both books: no standalone `Answers` heading,
 * and each ends on its last chapter's Exercises. So the mandatory step-6 gate
 * cannot run the Maths way.
 *
 * What Physics has instead is a PARTIAL, per-question key: the numericals print
 * their own answer inline as `[Ans: …]` (338 across the two books, ~38% of all
 * exercise questions). The transcription agents capture that verbatim into a
 * `bookAnswer` field, and this script joins it to our committed solution.
 *
 * That makes the gate REAL on the numerical half of a chapter and absent on the
 * rest, which is the honest position — the MCQs and the theory/derivation
 * questions carry no printed answer anywhere in the book and rest on the
 * blind-re-derivation + grounding regime instead. Report the covered count, not
 * the chapter total: "0 wrong across 15 keyed rows" is a different claim from
 * "0 wrong across 44".
 *
 * `bookAnswer` deliberately never reaches the database — it is the book's key,
 * not our content, and `buildRecords` ignores unknown fields. It lives in
 * `data/<id>.questions.json`, which is the source of record, and is read back
 * from there here.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireChapter, questionsJsonPath, DATA } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const id = process.argv[2];
  const chapter = requireChapter(id);
  const out = process.argv[3] ?? join(DATA, `${id}.book-answers.json`);

  // The book's inline keys, from the transcription source of record.
  const transcribed: { ref: string; bookAnswer?: string }[] = JSON.parse(
    readFileSync(questionsJsonPath(id), "utf8")
  );
  const bookAnswerByRef = new Map<string, string>();
  for (const q of transcribed) {
    if (typeof q.bookAnswer === "string" && q.bookAnswer.trim()) {
      bookAnswerByRef.set(q.ref, q.bookAnswer.trim());
    }
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Page past the PostgREST 1000-row cap.
  const all: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, source_row, text, context, solution")
      .eq("source_file", chapter.sourceFile)
      .order("source_row")
      .range(from, from + 999);
    if (error) throw error;
    all.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  if (!all.length) throw new Error(`no committed rows for source_file "${chapter.sourceFile}"`);

  const rows = all
    .filter((r: any) => bookAnswerByRef.has(r.question_number))
    .map((r: any) => ({
      id: r.id,
      ref: r.question_number,
      stem: r.text,
      context: r.context ?? null,
      book_answer: bookAnswerByRef.get(r.question_number)!,
      our_solution: r.solution ?? null,
    }));

  // Same guard as dump-review, and for the same reason: the Line-and-Planes
  // ingest shipped a dump carrying a `has_solution` BOOLEAN instead of the text,
  // so its agents "compared" our answers against nothing and returned a
  // meaningless all-AGREE. A dump that cannot be checked against is worse than
  // no dump, because its report reads like evidence.
  const noSolution = rows.filter((r) => !r.our_solution || !String(r.our_solution).trim());
  if (noSolution.length) {
    throw new Error(
      `refusing to dump — the cross-check needs OUR answer to compare against the book's:\n` +
        `  ${noSolution.length} of ${rows.length} keyed row(s) have no solution yet: ` +
        `${noSolution.slice(0, 8).map((r) => r.ref).join(", ")}${noSolution.length > 8 ? " …" : ""}\n` +
        `  Author solutions first (apply-solutions.ts), then re-run.`
    );
  }

  // A ref in the transcription that matches no committed row is a real defect —
  // it means the source and the bank disagree about what exists. Loud, not silent.
  const committedRefs = new Set(all.map((r: any) => r.question_number));
  const orphaned = [...bookAnswerByRef.keys()].filter((ref) => !committedRefs.has(ref));
  if (orphaned.length) {
    throw new Error(
      `refusing to dump — ${orphaned.length} transcribed ref(s) carry a bookAnswer but match no ` +
        `committed row: ${orphaned.join(", ")}. The transcription and the bank disagree.`
    );
  }

  writeFileSync(out, JSON.stringify(rows, null, 2), "utf-8");
  const pct = ((rows.length / all.length) * 100).toFixed(0);
  console.log(`dumped ${rows.length} keyed rows -> ${out}`);
  console.log(
    `coverage: ${rows.length} of ${all.length} committed rows carry a printed [Ans:] (${pct}%).`
  );
  console.log(
    `  The remaining ${all.length - rows.length} have NO printed answer anywhere in the book — ` +
      `they are NOT covered by this gate. Report the ${rows.length}, not the ${all.length}.`
  );
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
