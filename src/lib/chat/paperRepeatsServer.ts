/**
 * paper_repeats' read (2026-11-16): the past paper a /question-papers page
 * shows, its questions, and their repeat groups. Anon client: published
 * papers and published plans only (RLS). Pure text: lib/chat/paperRepeats.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/slug";
import { getExamBySlug } from "@/lib/exam/examContext";
import { listPublishedPapers } from "@/lib/questionPapers/query";
import { loadRepeatGroups } from "@/lib/questions/repeatQuery";
import { paperPageOf, paperRepeatsText } from "./paperRepeats";

export const NOT_A_PAPER =
  "The student is not on a past paper's page. Ask them to open the paper on /question-papers and ask again there, or to name it.";

export async function loadPaperRepeats(anon: SupabaseClient, pagePath: string | null): Promise<string> {
  const page = paperPageOf(pagePath);
  const exam = page ? getExamBySlug(page.examSlug) : null;
  if (!page || !exam) return NOT_A_PAPER;
  try {
    const papers = (await listPublishedPapers(anon)).filter(
      (p) => p.examName === exam.examName && p.groupSlug === page.paperSlug && slugify(p.subjectName) === page.subjectSlug
    );
    if (papers.length === 0) return NOT_A_PAPER;
    // A CBSE group holds several sets; the first set stands for the page.
    const paper = papers[0];
    const { data, error } = await anon
      .from("board_paper_items")
      .select("position, printed_number, question_id, part_of")
      .eq("paper_id", paper.id)
      .order("position")
      .range(0, 999);
    if (error) throw new Error(error.message);
    const items = ((data ?? []) as { printed_number: string; question_id: string }[]).map((i) => ({
      printedNumber: i.printed_number,
      questionId: i.question_id,
    }));
    const groups = await loadRepeatGroups(anon, items.map((i) => i.questionId));
    return paperRepeatsText(paper.title, items, groups);
  } catch (err) {
    console.error("V: paper repeats read failed", err);
    return "Could not read the paper just now. Tell the student to ask again in a minute.";
  }
}
