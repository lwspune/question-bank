/**
 * Where a tap on a question card's source pill goes: the full past paper the
 * question came from (2026-10-10).
 *
 * Clarity showed students tapping the pill ("MPSC Group B & C Prelims · 2017 ·
 * Group C (Excise SI) · 28 May 2017 · Q52") again and again. It only opened
 * and closed the card. Now it opens the paper: an entrance exam's past-paper
 * page (take it as a test, or download it), or a board question's printed
 * paper on /question-papers. 75% of PUBLIC past-year questions sit in a paper
 * we publish; for the rest the pill stays as it was.
 *
 * `papers_of_questions` (migration 0148) does the lookup; this file turns its
 * rows into links, and refuses a link whose paper is not the year the pill
 * prints, so a pill can never open the wrong paper.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/board/query";
import { getExamByName } from "@/lib/exam/examContext";

export type PaperOfQuestion = {
  question_id: string;
  kind: "mock" | "board";
  /** A mock's slug, or a board paper's group slug. */
  slug: string;
  year: number;
  /** Board papers only: the exam and subject names, for the page path. */
  exam_name: string | null;
  subject_name: string | null;
};

/** question id -> link, for the questions whose paper we publish. */
export function paperLinkMap(rows: readonly PaperOfQuestion[], yearOf: ReadonlyMap<string, number | null>): Map<string, string> {
  const out = new Map<string, string>();
  for (const r of rows) {
    if (out.has(r.question_id)) continue;
    const year = yearOf.get(r.question_id);
    if (year == null || year !== r.year) continue;
    if (r.kind === "mock") {
      out.set(r.question_id, `/mock/${r.slug}`);
      continue;
    }
    const exam = getExamByName(r.exam_name);
    if (!exam || !r.subject_name) continue;
    out.set(r.question_id, `/question-papers/${exam.slug}/${slugify(r.subject_name)}/${r.slug}`);
  }
  return out;
}

/**
 * The papers these questions sit in. Takes ids alone so a page can start it
 * the moment it knows them, alongside the rows (as /browse does with its tag
 * lookup); `paperLinkMap` then checks each against its row's year. Never
 * throws: a failed lookup leaves every pill as it was before this existed.
 */
export async function fetchPapersOfQuestions(client: SupabaseClient, ids: readonly string[]): Promise<PaperOfQuestion[]> {
  if (ids.length === 0) return [];
  const { data, error } = await client.rpc("papers_of_questions", { p_ids: ids });
  if (error) {
    console.error("papers_of_questions failed:", error.message);
    return [];
  }
  return (data ?? []) as PaperOfQuestion[];
}

/** The links for a page's rows, in one call, for a page that has its rows already. */
export async function getPaperLinksForQuestions(
  client: SupabaseClient,
  questions: readonly { id: string; pyqYear: number | null }[]
): Promise<Map<string, string>> {
  const withYear = questions.filter((q) => q.pyqYear != null);
  const rows = await fetchPapersOfQuestions(client, withYear.map((q) => q.id));
  return paperLinkMap(rows, yearsOf(withYear));
}

export function yearsOf(questions: readonly { id: string; pyqYear: number | null }[]): Map<string, number | null> {
  return new Map(questions.map((q) => [q.id, q.pyqYear]));
}
