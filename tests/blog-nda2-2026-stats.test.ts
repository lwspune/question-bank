/**
 * PROD-CONTRACT — the NDA II 2026 Maths blog post states bank-derived numbers
 * (chapter split, the Probability-vs-Statistics era drift, paper shape). Prose
 * in this repo lags the bank as a matter of routine, and a published article is
 * the worst place for that to happen: unlike a /notes intro, a reader cannot
 * see the bank behind it.
 *
 * So every figure the post quotes is re-derived here from production and
 * compared to `_data/stats.ts`. This is the same class as
 * `tests/notes-intro-counts.test.ts`, applied before the drift rather than after.
 *
 * PAGED READS, NOT BARE SELECTS: the NDA Maths PYQ corpus is 2,280 rows and
 * PostgREST silently truncates a raw .select() at 1,000. Deriving an era table
 * from a truncated payload would produce confident wrong numbers — precisely
 * the failure this file exists to prevent.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  BASELINE,
  CHAPTER_SPLIT,
  DATA_HANDLING_DRIFT,
  PAPER,
  PAPER_SHAPE,
} from "@/app/blog/_posts/nda-2-2026-maths-paper-analysis/_data/stats";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

type Row = {
  pyq_year: number | null;
  pyq_month: string | null;
  chapter: string | null;
  set_id: string | null;
  text: string | null;
};

/** Read every matching row in 1,000-row windows — see the header note. */
async function fetchAll(db: SupabaseClient, examId: string, subjectId: string): Promise<Row[]> {
  const out: Row[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("pyq_year, pyq_month, set_id, text, chapters(name)")
      .eq("exam_id", examId)
      .eq("subject_id", subjectId)
      .eq("question_kind", "pyq")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const page = data ?? [];
    for (const r of page as unknown as Array<Record<string, unknown>>) {
      const ch = r.chapters as { name?: string } | null;
      out.push({
        pyq_year: r.pyq_year as number | null,
        pyq_month: r.pyq_month as string | null,
        chapter: ch?.name ?? null,
        set_id: r.set_id as string | null,
        text: r.text as string | null,
      });
    }
    if (page.length < PAGE) break;
  }
  return out;
}

const eraOf = (yr: number): string =>
  yr <= 2019 ? "2017–19" : yr <= 2022 ? "2020–22" : yr <= 2024 ? "2023–24" : String(yr);

describe.skipIf(!HAS_ENV)("blog — NDA II 2026 Maths stats vs the live bank", () => {
  let rows: Row[] = [];
  let paper: Row[] = [];

  beforeAll(async () => {
    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: exam } = await db.from("exams").select("id").ilike("name", "%NDA%").limit(1).single();
    const { data: subject } = await db
      .from("subjects")
      .select("id")
      .eq("exam_id", exam!.id)
      .eq("name", "Mathematics")
      .single();
    rows = await fetchAll(db, exam!.id, subject!.id);
    paper = rows.filter((r) => r.pyq_year === 2026 && r.pyq_month === "Sep");
  }, 90000);

  it("the paged read actually returned the whole corpus", () => {
    // Guard on the guard: if paging silently capped at 1,000 every other
    // assertion below would be measuring a truncated corpus.
    expect(rows.length).toBeGreaterThan(1000);
  });

  it("matches the stated decade baseline", () => {
    const sittings = new Set(rows.map((r) => `${r.pyq_year}-${r.pyq_month}`));
    expect(rows.length).toBe(BASELINE.questions);
    expect(sittings.size).toBe(BASELINE.papers);
  });

  it("the sitting is still 120 questions", () => {
    expect(paper.length).toBe(PAPER.questions);
  });

  it("matches the stated chapter split, chapter for chapter", () => {
    const live = new Map<string, number>();
    for (const r of paper) live.set(r.chapter ?? "(none)", (live.get(r.chapter ?? "(none)") ?? 0) + 1);
    const stated = new Map(CHAPTER_SPLIT.map((c) => [c.chapter, c.count]));
    expect(Object.fromEntries([...live].sort())).toEqual(
      Object.fromEntries([...stated].sort())
    );
  });

  it("the stated chapter split sums to the paper", () => {
    expect(CHAPTER_SPLIT.reduce((s, c) => s + c.count, 0)).toBe(PAPER.questions);
  });

  it("matches the Probability-vs-Statistics era drift, to one decimal", () => {
    const papersPerEra = new Map<string, Set<string>>();
    const counts = new Map<string, { prob: number; stat: number }>();
    for (const r of rows) {
      if (r.pyq_year == null) continue;
      const era = eraOf(r.pyq_year);
      if (!papersPerEra.has(era)) papersPerEra.set(era, new Set());
      papersPerEra.get(era)!.add(`${r.pyq_year}-${r.pyq_month}`);
      if (!counts.has(era)) counts.set(era, { prob: 0, stat: 0 });
      if (r.chapter === "Probability") counts.get(era)!.prob += 1;
      if (r.chapter === "Statistics") counts.get(era)!.stat += 1;
    }
    for (const stated of DATA_HANDLING_DRIFT) {
      const np = papersPerEra.get(stated.era)?.size ?? 0;
      const c = counts.get(stated.era)!;
      expect(np, `${stated.era} paper count`).toBe(stated.papers);
      expect(Number((c.prob / np).toFixed(1)), `${stated.era} probability/paper`).toBe(
        stated.probabilityPerPaper
      );
      expect(Number((c.stat / np).toFixed(1)), `${stated.era} statistics/paper`).toBe(
        stated.statisticsPerPaper
      );
    }
  });

  it("matches the stated paper shape", () => {
    const setBound = paper.filter((r) => r.set_id != null);
    expect(setBound.length).toBe(PAPER_SHAPE.setBoundQuestions);
    expect(new Set(setBound.map((r) => r.set_id)).size).toBe(PAPER_SHAPE.distinctSets);
    const statementStyle = paper.filter(
      (r) => (r.text ?? "").includes("I.") && (r.text ?? "").includes("II.")
    );
    expect(statementStyle.length).toBe(PAPER_SHAPE.statementStyleQuestions);
  });

  it("the headline claim still holds: Probability is the biggest chapter", () => {
    // The post's structure depends on this. If a re-tag ever changes it, the
    // article needs rewriting, not just renumbering.
    const top = [...CHAPTER_SPLIT].sort((a, b) => b.count - a.count)[0];
    expect(top.chapter).toBe("Probability");
  });
});
