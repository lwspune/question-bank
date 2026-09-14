/**
 * PROD-CONTRACT — the NDA II 2026 GAT post's figures, re-derived from
 * production. Sibling of `blog-nda2-2026-stats.test.ts`; same reasoning, and
 * the same paged reads (the GAT corpus is 2,850 rows and PostgREST truncates a
 * raw .select() at 1,000 without erroring).
 *
 * The two assertions that matter most are the ones the article's structure
 * rests on: the History/Polity crossover, and the claim that voice/speech
 * transformation questions did not exist before 2025. If either stops holding,
 * the post needs rewriting rather than renumbering — so they fail loudly.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  BASELINE,
  ECONOMICS_RANGE,
  ENGLISH_SPLIT,
  FORMAT_FIRST_SEEN,
  GK_DRIFT,
  HISTORY_POLITY_CROSSOVER,
  PAPER,
  SUBJECT_DIFFICULTY,
  SUBJECT_SPLIT,
  TRANSFORMATION_DEBUT,
} from "@/app/blog/_posts/nda-2-2026-gat-paper-analysis/_data/stats";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

type Row = {
  yr: number | null;
  mo: string | null;
  subject: string;
  chapter: string | null;
  difficulty: string | null;
  text: string;
};

/** GAT = every NDA subject except Mathematics (which is Paper I). */
async function fetchGat(db: SupabaseClient, examId: string, mathsId: string): Promise<Row[]> {
  const out: Row[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("pyq_year, pyq_month, difficulty, text, context, subjects(name), chapters(name)")
      .eq("exam_id", examId)
      .neq("subject_id", mathsId)
      .eq("question_kind", "pyq")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const page = data ?? [];
    for (const r of page as unknown as Array<Record<string, unknown>>) {
      const subj = r.subjects as { name?: string } | null;
      const ch = r.chapters as { name?: string } | null;
      out.push({
        yr: r.pyq_year as number | null,
        mo: r.pyq_month as string | null,
        subject: subj?.name ?? "(none)",
        chapter: ch?.name ?? null,
        difficulty: (r.difficulty as string | null) ?? null,
        text: `${(r.context as string) ?? ""} ${(r.text as string) ?? ""}`.toLowerCase(),
      });
    }
    if (page.length < PAGE) break;
  }
  return out;
}

const eraOf = (yr: number): string =>
  yr <= 2019 ? "2017–19" : yr <= 2022 ? "2020–22" : yr <= 2024 ? "2023–24" : String(yr);

const isTransformation = (t: string) =>
  t.includes("passive voice") || t.includes("indirect speech");

describe.skipIf(!HAS_ENV)("blog — NDA II 2026 GAT stats vs the live bank", () => {
  let rows: Row[] = [];
  let paper: Row[] = [];

  beforeAll(async () => {
    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: exam } = await db
      .from("exams")
      .select("id")
      .ilike("name", "%NDA%")
      .limit(1)
      .single();
    const { data: maths } = await db
      .from("subjects")
      .select("id")
      .eq("exam_id", exam!.id)
      .eq("name", "Mathematics")
      .single();
    rows = await fetchGat(db, exam!.id, maths!.id);
    paper = rows.filter((r) => r.yr === 2026 && r.mo === "Sep");
  }, 90000);

  it("the paged read returned the whole corpus", () => {
    expect(rows.length).toBeGreaterThan(1000);
  });

  it("matches the stated decade baseline", () => {
    expect(rows.length).toBe(BASELINE.questions);
    expect(new Set(rows.map((r) => `${r.yr}-${r.mo}`)).size).toBe(BASELINE.papers);
  });

  it("the sitting is still 150 questions, 50 of them English", () => {
    expect(paper.length).toBe(PAPER.questions);
    expect(paper.filter((r) => r.subject === "English").length).toBe(PAPER.englishQuestions);
  });

  it("matches the stated subject split, subject for subject", () => {
    const live = new Map<string, number>();
    for (const r of paper) live.set(r.subject, (live.get(r.subject) ?? 0) + 1);
    expect(Object.fromEntries([...live].sort())).toEqual(
      Object.fromEntries(SUBJECT_SPLIT.map((s) => [s.subject, s.count]).sort())
    );
    expect(SUBJECT_SPLIT.reduce((s, r) => s + r.count, 0)).toBe(PAPER.questions);
  });

  it("matches the stated English chapter split", () => {
    const live = new Map<string, number>();
    for (const r of paper.filter((x) => x.subject === "English")) {
      live.set(r.chapter ?? "(none)", (live.get(r.chapter ?? "(none)") ?? 0) + 1);
    }
    expect(Object.fromEntries([...live].sort())).toEqual(
      Object.fromEntries(ENGLISH_SPLIT.map((c) => [c.chapter, c.count]).sort())
    );
    expect(ENGLISH_SPLIT.reduce((s, c) => s + c.count, 0)).toBe(PAPER.englishQuestions);
  });

  it("HEADLINE — History led Polity in every pre-2026 sitting, and 2026 tied twice", () => {
    const per = new Map<string, { h: number; p: number; yr: number }>();
    for (const r of rows) {
      if (r.yr == null) continue;
      const k = `${r.yr}-${r.mo}`;
      if (!per.has(k)) per.set(k, { h: 0, p: 0, yr: r.yr });
      if (r.subject === "History") per.get(k)!.h += 1;
      if (r.subject === "Polity") per.get(k)!.p += 1;
    }
    const before = [...per.values()].filter((v) => v.yr < 2026);
    expect(before.length).toBe(HISTORY_POLITY_CROSSOVER.sittingsBefore2026);
    expect(before.filter((v) => v.h > v.p).length).toBe(
      HISTORY_POLITY_CROSSOVER.historyAheadBefore2026
    );
    const y2026 = [...per.values()].filter((v) => v.yr === 2026);
    expect(y2026.filter((v) => v.h === v.p).length).toBe(
      HISTORY_POLITY_CROSSOVER.tiedSittingsIn2026
    );
  });

  it("matches the History/Polity era table, to one decimal", () => {
    const papers = new Map<string, Set<string>>();
    const counts = new Map<string, { h: number; p: number }>();
    for (const r of rows) {
      if (r.yr == null) continue;
      const era = eraOf(r.yr);
      if (!papers.has(era)) papers.set(era, new Set());
      papers.get(era)!.add(`${r.yr}-${r.mo}`);
      if (!counts.has(era)) counts.set(era, { h: 0, p: 0 });
      if (r.subject === "History") counts.get(era)!.h += 1;
      if (r.subject === "Polity") counts.get(era)!.p += 1;
    }
    for (const stated of GK_DRIFT) {
      const np = papers.get(stated.era)?.size ?? 0;
      const c = counts.get(stated.era)!;
      expect(np, `${stated.era} papers`).toBe(stated.papers);
      expect(Number((c.h / np).toFixed(1)), `${stated.era} history`).toBe(stated.historyPerPaper);
      expect(Number((c.p / np).toFixed(1)), `${stated.era} polity`).toBe(stated.polityPerPaper);
    }
  });

  it("HEADLINE — transformation questions are absent before 2025 and present in every sitting since", () => {
    // Counted from question TEXT, never chapter labels: the Grammar chapter is
    // contaminated by a taxonomy cleanup that refiled Spotting-Errors questions
    // into it, which is why the post does not use the chapter series at all.
    const per = new Map<string, { n: number; yr: number }>();
    for (const r of rows) {
      if (r.yr == null || r.subject !== "English") continue;
      const k = `${r.yr}-${r.mo}`;
      if (!per.has(k)) per.set(k, { n: 0, yr: r.yr });
      if (isTransformation(r.text)) per.get(k)!.n += 1;
    }
    const through2024 = [...per.values()].filter((v) => v.yr <= 2024);
    const since2025 = [...per.values()].filter((v) => v.yr >= 2025);
    expect(through2024.filter((v) => v.n === 0).length).toBe(
      TRANSFORMATION_DEBUT.sittingsWithNoneThrough2024
    );
    expect(through2024.every((v) => v.n === 0)).toBe(true);
    expect(since2025.filter((v) => v.n > 0).length).toBe(
      TRANSFORMATION_DEBUT.sittingsWithSomeSince2025
    );
    expect(since2025.every((v) => v.n > 0)).toBe(true);
  });

  it("matches the format table counted from question text", () => {
    const papers = new Map<string, Set<string>>();
    const counts = new Map<string, { t: number; w: number }>();
    for (const r of rows) {
      if (r.yr == null || r.subject !== "English") continue;
      const era = eraOf(r.yr);
      if (!papers.has(era)) papers.set(era, new Set());
      papers.get(era)!.add(`${r.yr}-${r.mo}`);
      if (!counts.has(era)) counts.set(era, { t: 0, w: 0 });
      if (isTransformation(r.text)) counts.get(era)!.t += 1;
      if (r.text.includes("word class")) counts.get(era)!.w += 1;
    }
    for (const stated of FORMAT_FIRST_SEEN) {
      expect(papers.get(stated.era)?.size, `${stated.era} papers`).toBe(stated.papers);
      expect(counts.get(stated.era)!.t, `${stated.era} transformation`).toBe(
        stated.transformation
      );
      expect(counts.get(stated.era)!.w, `${stated.era} word class`).toBe(stated.wordClass);
    }
  });

  it("Economics has never exceeded its stated ceiling in any sitting", () => {
    const per = new Map<string, number>();
    for (const r of rows) {
      const k = `${r.yr}-${r.mo}`;
      per.set(k, (per.get(k) ?? 0) + (r.subject === "Economics" ? 1 : 0));
    }
    const vals = [...per.values()];
    expect(Math.max(...vals)).toBe(ECONOMICS_RANGE.max);
    expect(Math.min(...vals)).toBe(ECONOMICS_RANGE.min);
    expect(paper.filter((r) => r.subject === "Economics").length).toBe(
      ECONOMICS_RANGE.thisPaper
    );
  });

  it("matches the within-paper difficulty table", () => {
    for (const stated of SUBJECT_DIFFICULTY) {
      const rs = paper.filter((r) => r.subject === stated.subject);
      expect(rs.length, `${stated.subject} count`).toBe(stated.count);
      expect(rs.filter((r) => r.difficulty === "EASY").length, `${stated.subject} easy`).toBe(
        stated.easy
      );
      expect(
        rs.filter((r) => r.difficulty === "MODERATE").length,
        `${stated.subject} moderate`
      ).toBe(stated.moderate);
      expect(rs.filter((r) => r.difficulty === "HARD").length, `${stated.subject} hard`).toBe(
        stated.hard
      );
    }
  });
});
