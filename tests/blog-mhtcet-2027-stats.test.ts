/**
 * PROD-CONTRACT: the MHT-CET 2027 dates post states how many questions in
 * the 2023-2025 papers came from Std XI chapters, Std XII chapters and
 * chapters that draw on both books. Those counts live in `_data/stats.ts`;
 * this suite re-derives them from production and fails if any drifts.
 *
 * It also re-checks the BOOK each chapter is filed under against the syllabus
 * rulings (scripts/syllabus/data/*-cet-rulings.json), which tie each CET
 * subtopic to numbered Balbharati sections ("XII:13.7"). Where a chapter has
 * at least MIN_RULED_QUESTIONS ruled questions, the rule in
 * bookFromRuledTally must agree with the filed book. Chapters below that
 * floor are filed by their Balbharati chapter title, which this cannot check.
 *
 * PAGED READS: ~6,000 rows, and PostgREST truncates a bare select at 1,000.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  CHAPTER_COUNTS,
  SUBJECTS,
  WINDOW,
  bookFromRuledTally,
  type Book,
  type Subject,
} from "@/app/blog/_posts/mht-cet-2027-december-attempt-moved-after-boards/_data/stats";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

type Row = { subject: string; chapter: string; subtopic: string | null; paper: string };

async function fetchAll(db: SupabaseClient, examId: string): Promise<Row[]> {
  const out: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("pyq_year, pyq_note, subjects(name), chapters(name), subtopics(name)")
      .eq("exam_id", examId)
      .eq("question_kind", "pyq")
      .eq("visibility", "PUBLIC")
      .gte("pyq_year", WINDOW.fromYear)
      .lte("pyq_year", WINDOW.toYear)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const page = (data ?? []) as unknown as Array<Record<string, any>>;
    for (const r of page) {
      out.push({
        subject: r.subjects?.name,
        chapter: r.chapters?.name,
        subtopic: r.subtopics?.name ?? null,
        paper: `${r.pyq_year}|${r.pyq_note}`,
      });
    }
    if (page.length < 1000) break;
  }
  return out;
}

const RULINGS: Record<Subject, string> = { Maths: "maths", Physics: "phy", Chemistry: "chem" };

/** CET subtopic name -> the book(s) its Balbharati refs point at. */
function rulingIndex(subject: Subject): Map<string, Book> {
  const raw = JSON.parse(
    readFileSync(join(__dirname, "..", "scripts", "syllabus", "data", `${RULINGS[subject]}-cet-rulings.json`), "utf8")
  );
  const list: Array<{ subtopic: string; stateBoard?: { coveredBy?: string } }> =
    raw.rulings ?? raw[Object.keys(raw).find((k) => Array.isArray(raw[k]))!];
  const idx = new Map<string, Book>();
  for (const r of list) {
    const books = new Set((r.stateBoard?.coveredBy ?? "").match(/\b(XI|XII):/g)?.map((t) => t.slice(0, -1)));
    if (books.size === 2) idx.set(r.subtopic, "both");
    else if (books.size === 1) idx.set(r.subtopic, [...books][0] as Book);
  }
  return idx;
}

describe.skipIf(!HAS_ENV)("blog: MHT-CET 2027 dates post vs the live bank", () => {
  let rows: Row[] = [];

  beforeAll(async () => {
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: exam, error } = await db.from("exams").select("id").eq("name", "MHT-CET").single();
    if (error) throw new Error(error.message);
    rows = await fetchAll(db, exam!.id);
  }, 120_000);

  it("holds the stated number of papers in every subject", () => {
    for (const s of SUBJECTS) {
      const papers = new Set(rows.filter((r) => r.subject === s).map((r) => r.paper)).size;
      expect(papers, s).toBe(WINDOW.papers);
    }
  });

  it("matches the chapter table exactly, both ways", () => {
    const live = new Map<string, number>();
    for (const r of rows) live.set(`${r.subject}|${r.chapter}`, (live.get(`${r.subject}|${r.chapter}`) ?? 0) + 1);
    const stated = new Map(CHAPTER_COUNTS.map((c) => [`${c.subject}|${c.chapter}`, c.questions]));
    expect(Object.fromEntries([...live].sort())).toEqual(Object.fromEntries([...stated].sort()));
  });

  it("files each well-ruled chapter under the book its rulings point to", () => {
    for (const s of SUBJECTS) {
      const idx = rulingIndex(s);
      for (const c of CHAPTER_COUNTS.filter((x) => x.subject === s)) {
        const tally = { XII: 0, XI: 0, both: 0 };
        for (const r of rows) {
          if (r.subject !== s || r.chapter !== c.chapter || !r.subtopic) continue;
          const b = idx.get(r.subtopic);
          if (b) tally[b]++;
        }
        const ruled = bookFromRuledTally(tally);
        if (ruled !== null) expect(ruled, `${s} / ${c.chapter} ${JSON.stringify(tally)}`).toBe(c.book);
      }
    }
  });
});
