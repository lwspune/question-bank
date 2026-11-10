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
import { createTypedAnonClient } from "@/lib/supabase/server";
import { readInChunks } from "@/lib/supabase/readInChunks";
import { listBoardChapters } from "@/lib/board/query";
import type { Json } from "@/types/db";
import type { SubjectStats } from "./subjectPage";

type Section = SubjectStats["sections"][string][number];

/** A paper's stored `sections` (jsonb), keeping only well-formed entries. */
function parseSections(raw: Json): Section[] {
  if (!Array.isArray(raw)) return [];
  const out: Section[] = [];
  for (const s of raw) {
    if (!s || typeof s !== "object" || Array.isArray(s)) continue;
    const { key, title, note } = s;
    if (typeof key === "string" && typeof title === "string") out.push({ key, title, note: typeof note === "string" ? note : "" });
  }
  return out;
}

async function readStats(examSlug: string, examName: string, subjectName: string, paperIds: string[]): Promise<SubjectStats> {
  const client = createTypedAnonClient();

  const rawItems = await readInChunks(paperIds, (ids, from, to) =>
    client
      .from("board_paper_items")
      .select("paper_id, marks, alternative_to, question_id, section, case_key")
      .in("paper_id", ids)
      .order("paper_id")
      .order("position")
      .range(from, to)
  );

  const chapterOf = new Map<string, string | null>();
  const questions = await readInChunks(
    rawItems.map((r) => r.question_id),
    (ids, from, to) => client.from("questions").select("id, chapter:chapters!chapter_id(name)").in("id", ids).order("id").range(from, to)
  );
  for (const q of questions) chapterOf.set(q.id, q.chapter?.name ?? null);

  const sections: SubjectStats["sections"] = {};
  const papers = await readInChunks(paperIds, (ids, from, to) =>
    client.from("board_papers").select("id, sections").in("id", ids).order("id").range(from, to)
  );
  for (const p of papers) sections[p.id] = parseSections(p.sections);

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
