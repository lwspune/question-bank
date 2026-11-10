/**
 * What a board subject page reads beyond the paper list (2026-11-10): every
 * item's marks and chapter, each paper's sections, and which chapters have a
 * /board reader page. Anon client: published papers and PUBLIC questions only,
 * so one cached copy serves everyone. Cached a day per subject; the list of
 * paper ids is an argument, so a newly published paper changes the cache key.
 *
 * Returns null on any failed read: the page then shows its list without the
 * facts, chapter marks and set answers, rather than numbers built on a partial
 * read. Pure rules: ./subjectPage.ts.
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { listBoardChapters } from "@/lib/board/query";
import type { SubjectStats } from "./subjectPage";

/** Paper ids per items query: ~45 items a paper keeps a page under PostgREST's 1000 rows. */
const PAPERS_PER_READ = 20;
/** .in() puts the ids in the URL: chunk them. */
const IDS_PER_READ = 150;

type RawItem = {
  paper_id: string;
  marks: number | null;
  alternative_to: number | null;
  question_id: string;
  section: string | null;
  case_key: string | null;
};
type RawQuestion = { id: string; chapter: { name: string } | { name: string }[] | null };

async function readStats(examSlug: string, examName: string, subjectName: string, paperIds: string[]): Promise<SubjectStats> {
  const client = createSupabaseAnonClient();

  const rawItems: RawItem[] = [];
  for (let i = 0; i < paperIds.length; i += PAPERS_PER_READ) {
    const ids = paperIds.slice(i, i + PAPERS_PER_READ);
    for (let from = 0; ; from += 1000) {
      const { data, error } = await client
        .from("board_paper_items")
        .select("paper_id, marks, alternative_to, question_id, section, case_key")
        .in("paper_id", ids)
        .order("paper_id")
        .order("position")
        .range(from, from + 999);
      if (error) throw new Error(`board subject items: ${error.message}`);
      rawItems.push(...((data ?? []) as RawItem[]));
      if (!data || data.length < 1000) break;
    }
  }

  const chapterOf = new Map<string, string | null>();
  const questionIds = [...new Set(rawItems.map((r) => r.question_id))];
  for (let i = 0; i < questionIds.length; i += IDS_PER_READ) {
    const { data, error } = await client
      .from("questions")
      .select("id, chapter:chapters!chapter_id(name)")
      .in("id", questionIds.slice(i, i + IDS_PER_READ));
    if (error) throw new Error(`board subject chapters: ${error.message}`);
    for (const q of (data ?? []) as unknown as RawQuestion[]) {
      const ch = Array.isArray(q.chapter) ? q.chapter[0] : q.chapter;
      chapterOf.set(q.id, ch?.name ?? null);
    }
  }

  const sections: SubjectStats["sections"] = {};
  for (let i = 0; i < paperIds.length; i += IDS_PER_READ) {
    const { data, error } = await client
      .from("board_papers")
      .select("id, sections")
      .in("id", paperIds.slice(i, i + IDS_PER_READ));
    if (error) throw new Error(`board subject sections: ${error.message}`);
    for (const p of (data ?? []) as { id: string; sections: SubjectStats["sections"][string] | null }[]) {
      sections[p.id] = p.sections ?? [];
    }
  }

  const chapterHrefs: Record<string, string> = {};
  const subject = (await listBoardChapters(client, examName)).find((s) => s.subjectName === subjectName);
  for (const c of subject?.chapters ?? []) {
    chapterHrefs[c.name] = `/board/${examSlug}/${c.subjectRoute}/${c.chapterSlug}`;
  }

  return {
    items: rawItems.map((r) => ({
      paperId: r.paper_id,
      marks: r.marks === null ? null : Number(r.marks),
      alternativeTo: r.alternative_to,
      questionId: r.question_id,
      chapter: chapterOf.get(r.question_id) ?? null,
      section: r.section,
      caseKey: r.case_key,
    })),
    sections,
    chapterHrefs,
  };
}

const cachedStats = unstable_cache(readStats, ["board-subject-stats-v1"], { revalidate: 86400 });

/** One subject's stats, cached a day; null on a failed read. */
export async function loadSubjectStats(
  examSlug: string,
  examName: string,
  subjectName: string,
  paperIds: string[]
): Promise<SubjectStats | null> {
  try {
    return await cachedStats(examSlug, examName, subjectName, [...paperIds].sort());
  } catch (e) {
    console.error("board subject stats failed", e instanceof Error ? e.message : e);
    return null;
  }
}
