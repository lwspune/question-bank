/**
 * Plan the IMAT practice mocks: deal the PUBLIC twin pool into full papers in today's
 * ministry format (IMAT_PAPER) and write them to data/imat-practice.json, which
 * build-practice-mocks.ts then builds.
 *
 *   npx tsx scripts/mocks/plan-imat-practice.ts            # dry run: counts per paper
 *   npx tsx scripts/mocks/plan-imat-practice.ts --write    # write the data file
 *
 * As many papers as the pool can fill without repeating a question (maxPapers). The
 * committed file is the record: re-planning after the pool grows reshuffles every
 * paper, so do it only before the mocks are published, or add papers by hand.
 * Read-only against the database.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { IMAT_PAPER } from "../../src/lib/mocks/blueprints";
import { dealPracticePapers, maxPapers, type PoolRow } from "./imatPractice";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const OUT = join(__dirname, "data", "imat-practice.json");
const NOTE = "IMAT practice: original questions in the ministry's format (assembled paper, not a past sitting)";

async function main() {
  const write = process.argv.includes("--write");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const sectionOf = new Map(IMAT_PAPER.sections.flatMap((s) => s.subjects.map((subject) => [subject, s.key] as const)));

  const pool: PoolRow[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("id, subjects(name), chapters(name), subtopics(name), exams!inner(name)")
      .eq("exams.name", IMAT_PAPER.examName)
      .eq("question_kind", "practice")
      .eq("visibility", "PUBLIC")
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(`pool read failed: ${error.message}`);
    const rows = (data ?? []) as unknown as {
      id: string;
      subjects: { name: string };
      chapters: { name: string };
      subtopics: { name: string } | null;
    }[];
    for (const r of rows) {
      const sectionKey = sectionOf.get(r.subjects.name);
      if (!sectionKey) throw new Error(`${r.id}: subject "${r.subjects.name}" is in no IMAT section`);
      pool.push({ id: r.id, sectionKey, chapter: r.chapters.name, subtopic: r.subtopics?.name ?? "" });
    }
    if (rows.length < 1000) break;
  }

  const sections = IMAT_PAPER.sections.map((s) => ({ key: s.key, count: s.count! }));
  const papers = maxPapers(pool, sections);
  for (const s of sections) {
    const n = pool.filter((r) => r.sectionKey === s.key).length;
    console.log(`${s.key.padEnd(22)} pool ${String(n).padStart(4)}  needs ${s.count} a paper  -> ${Math.floor(n / s.count)} papers`);
  }
  const dealt = dealPracticePapers(pool, sections, papers);
  const files = dealt.map((ids, i) => {
    const k = i + 1;
    return {
      key: `imat-p${k}`,
      slug: `imat-practice-${String(k).padStart(2, "0")}`,
      title: `IMAT Practice Mock ${k}`,
      examSlug: IMAT_PAPER.examSlug,
      paperCode: IMAT_PAPER.code,
      sourceFile: "imat-twins (assembled)",
      note: NOTE,
      questions: ids.map((questionId, j) => ({ n: j + 1, kind: "bank", questionId })),
    };
  });
  console.log(`\n${papers} papers of ${dealt[0]?.length ?? 0} questions, ${papers * (dealt[0]?.length ?? 0)} of ${pool.length} in the pool used.`);
  if (!write) return console.log("[dry run] pass --write to write data/imat-practice.json.");
  writeFileSync(OUT, JSON.stringify(files, null, 2) + "\n");
  console.log(`wrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
