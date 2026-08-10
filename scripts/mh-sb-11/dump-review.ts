/**
 * Dump a chapter's committed rows WITH our final answers, for the step-6
 * answer-key cross-check against the book's end-of-book ANSWERS section.
 *
 *   npx tsx scripts/mh-sb-11/dump-review.ts <chapterId> [refPrefix] [outPath]
 *
 * Unlike dump-mcq.ts (which hides the key so step 4 stays blind), this dump is
 * deliberately NOT blind: step 6 compares OUR answer to the BOOK's printed key,
 * so the agent must see both.
 *
 * Guard: every row must carry a non-empty `solution`, and every MCQ must carry a
 * marked correct option. The Line-and-Planes ingest shipped a dump that emitted
 * only a `has_solution` BOOLEAN instead of the solution text — the cross-check
 * agents then "compared" our answers against nothing and reported a meaningless
 * all-AGREE. Fail loudly rather than emit a dump that can't be checked against.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireChapter, DATA } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "all";
}

async function main() {
  loadEnv();
  const id = process.argv[2];
  const chapter = requireChapter(id);
  const refPrefix = process.argv[3] ?? "";
  const out = process.argv[4] ?? join(DATA, `${id}.${slug(refPrefix)}.review.json`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Page past the PostgREST 1000-row cap — a chapter can exceed it.
  const all: any[] = [];
  for (let from = 0; ; from += 1000) {
    let q = db
      .from("questions")
      .select("id, question_number, source_row, question_format, text, context, solution, options(label, text, is_correct)")
      .eq("source_file", chapter.sourceFile)
      .order("source_row")
      .range(from, from + 999);
    if (refPrefix) q = q.like("question_number", `${refPrefix}%`);
    const { data, error } = await q;
    if (error) throw error;
    all.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }

  const rows = all.map((r: any) => ({
    id: r.id,
    ref: r.question_number,
    format: r.question_format,
    context: r.context ?? null,
    stem: r.text,
    our_solution: r.solution ?? null,
    our_key: r.question_format === "mcq" ? ((r.options ?? []).find((o: any) => o.is_correct)?.label ?? null) : null,
    options:
      r.question_format === "mcq"
        ? (r.options ?? [])
            .slice()
            .sort((a: any, b: any) => String(a.label).localeCompare(String(b.label)))
            .map((o: any) => ({ label: o.label, text: o.text }))
        : undefined,
  }));

  if (!rows.length) throw new Error(`no rows for prefix "${refPrefix}"`);

  const noSolution = rows.filter((r) => !r.our_solution || !String(r.our_solution).trim());
  const noKey = rows.filter((r) => r.format === "mcq" && !r.our_key);
  if (noSolution.length || noKey.length) {
    throw new Error(
      `refusing to dump — the cross-check needs OUR answer to compare:\n` +
        (noSolution.length ? `  ${noSolution.length} row(s) have no solution: ${noSolution.slice(0, 8).map((r) => r.ref).join(", ")}${noSolution.length > 8 ? " …" : ""}\n` : "") +
        (noKey.length ? `  ${noKey.length} MCQ row(s) have no correct option: ${noKey.map((r) => r.ref).join(", ")}\n` : "")
    );
  }

  writeFileSync(out, JSON.stringify(rows, null, 2), "utf-8");
  const chars = rows.reduce((n, r) => n + String(r.our_solution).length, 0);
  console.log(`dumped ${rows.length} rows -> ${out}`);
  console.log(`guard OK: every row carries a real solution (${chars} chars of answer text), every MCQ a key.`);
  console.log(`refs: ${rows[0].ref} … ${rows[rows.length - 1].ref}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
