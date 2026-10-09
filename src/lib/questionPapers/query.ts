/**
 * Loaders for /question-papers (migration 0146). Anon client: only PUBLISHED
 * papers and PUBLIC questions are readable, so one cached copy can be served to
 * everyone.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { singleFlight } from "@/lib/cache/singleFlight";
import { buildFailureMemoMs } from "@/lib/cache/buildPhase";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import type { BoardQuestion } from "@/lib/board/query";
import { assemblePaper, type PaperItemRow, type PaperListing, type PaperViewItem } from "./listing";

const PAPER_COLUMNS =
  "id, exam_id, subject_id, slug, group_slug, set_number, year, sitting, paper_code, title, total_marks, duration_minutes, exams(name), subjects(name)";

type RawPaper = {
  id: string;
  exam_id: string;
  subject_id: string;
  slug: string;
  group_slug: string;
  set_number: number | null;
  year: number;
  sitting: string | null;
  paper_code: string | null;
  title: string;
  total_marks: number;
  duration_minutes: number | null;
  sections?: { key: string; title: string; note: string }[];
  exams: { name: string } | { name: string }[] | null;
  subjects: { name: string } | { name: string }[] | null;
};

export type PaperListingWithExam = PaperListing & { examName: string };

function one<T>(v: T | T[] | null): T | null {
  return Array.isArray(v) ? v[0] ?? null : v;
}

function toListing(r: RawPaper): PaperListingWithExam {
  return {
    id: r.id,
    examId: r.exam_id,
    examName: one(r.exams)?.name ?? "",
    subjectId: r.subject_id,
    subjectName: one(r.subjects)?.name ?? "",
    slug: r.slug,
    groupSlug: r.group_slug,
    setNumber: r.set_number,
    year: r.year,
    sitting: r.sitting,
    paperCode: r.paper_code,
    title: r.title,
    totalMarks: Number(r.total_marks),
    durationMinutes: r.duration_minutes,
  };
}

/**
 * Every published paper (no items). Paged: PostgREST stops at 1000 rows
 * without an error. THROWS on a failed read, so a cache never keeps an empty
 * list (the 2026-10-08 homepage lesson).
 */
export async function listPublishedPapers(client: SupabaseClient): Promise<PaperListingWithExam[]> {
  const out: PaperListingWithExam[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client
      .from("board_papers")
      .select(PAPER_COLUMNS)
      .eq("published", true)
      .order("year", { ascending: false })
      .order("slug")
      .range(from, from + 999);
    if (error) throw new Error(`board papers: ${error.message}`);
    out.push(...((data ?? []) as unknown as RawPaper[]).map(toListing));
    if (!data || data.length < 1000) return out;
  }
}

const cachedPublishedPapers = unstable_cache(
  () => listPublishedPapers(createSupabaseAnonClient()),
  ["board-papers-list-v1"],
  { revalidate: 86400 }
);

/** The published list, cached for a day and shared by every list page. */
export function getPublishedPapers(): Promise<PaperListingWithExam[]> {
  return singleFlight("board-papers-list", cachedPublishedPapers, { rememberFailureMs: buildFailureMemoMs() });
}

export type PaperView = PaperListingWithExam & {
  sections: { key: string; title: string; note: string }[];
  /** Null when a question has gone (see assemblePaper). */
  items: PaperViewItem[] | null;
};

type RawItem = {
  paper_id: string;
  position: number;
  printed_number: string;
  section: string;
  marks: number;
  alternative_to: number | null;
  case_key: string | null;
  question_id: string;
};

type RawQuestion = {
  id: string;
  question_number: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  image_url: string | null;
  solution_image_url: string | null;
  question_format: "mcq" | "subjective";
  set_id: string | null;
  options: { label: string; text: string; is_correct: boolean; image_url: string | null }[] | null;
};

async function loadQuestions(client: SupabaseClient, ids: string[]): Promise<BoardQuestion[]> {
  const out: BoardQuestion[] = [];
  const unique = [...new Set(ids)];
  // .in() puts the list in the URL: chunk it.
  for (let i = 0; i < unique.length; i += 150) {
    const { data, error } = await client
      .from("questions")
      .select(
        "id, question_number, text, context, solution, image_url, solution_image_url, question_format, set_id, options(label, text, is_correct, image_url)"
      )
      .in("id", unique.slice(i, i + 150));
    if (error) throw new Error(`paper questions: ${error.message}`);
    for (const r of (data ?? []) as RawQuestion[]) {
      out.push({
        id: r.id,
        questionNumber: r.question_number,
        text: r.text,
        context: r.context,
        solution: r.solution,
        imageUrl: r.image_url,
        solutionImageUrl: r.solution_image_url,
        format: r.question_format,
        setId: r.set_id,
        options: (r.options ?? [])
          .map((o) => ({ label: o.label, text: o.text, isCorrect: o.is_correct, imageUrl: o.image_url }))
          .sort((a, b) => a.label.localeCompare(b.label)),
      });
    }
  }
  return out;
}

/**
 * One page: a paper group's published sets, each with its items.
 * `publishedOnly: false` is for the smoke script (service role) only; for a
 * visitor's client RLS hides unpublished papers whatever this says.
 */
export async function getPaperGroup(
  client: SupabaseClient,
  examId: string,
  groupSlug: string,
  { publishedOnly = true }: { publishedOnly?: boolean } = {}
): Promise<PaperView[]> {
  let query = client
    .from("board_papers")
    .select(`${PAPER_COLUMNS}, sections`)
    .eq("exam_id", examId)
    .eq("group_slug", groupSlug);
  if (publishedOnly) query = query.eq("published", true);
  const { data: papers, error } = await query.order("set_number");
  if (error) throw new Error(`board paper group: ${error.message}`);
  const rows = (papers ?? []) as unknown as RawPaper[];
  if (rows.length === 0) return [];

  const { data: items, error: itemErr } = await client
    .from("board_paper_items")
    .select("paper_id, position, printed_number, section, marks, alternative_to, case_key, question_id")
    .in(
      "paper_id",
      rows.map((r) => r.id)
    )
    .order("position")
    .range(0, 999);
  if (itemErr) throw new Error(`board paper items: ${itemErr.message}`);
  const allItems = (items ?? []) as RawItem[];
  const questions = await loadQuestions(
    client,
    allItems.map((i) => i.question_id)
  );

  return rows.map((r) => {
    const mine: PaperItemRow[] = allItems
      .filter((i) => i.paper_id === r.id)
      .map((i) => ({
        position: i.position,
        printedNumber: i.printed_number,
        section: i.section,
        marks: Number(i.marks),
        alternativeTo: i.alternative_to,
        caseKey: i.case_key,
        questionId: i.question_id,
      }));
    return { ...toListing(r), sections: r.sections ?? [], items: assemblePaper(mine, questions) };
  });
}
