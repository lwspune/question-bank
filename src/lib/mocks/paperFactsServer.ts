/**
 * An exam's past papers, their facts and their chapter trends, loaded once for
 * any page that states the exam's pattern: the past-papers page
 * (/mock/exam/<exam>/download) and the syllabus page (/exams/<exam>/syllabus).
 * Server only (anon client: published mocks only, so one cached copy serves all).
 */
import { cache } from "react";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "./query";
import { mocksOfType } from "./catalogue";
import { getBlueprint } from "./blueprints";
import { paperFacts, paperTrends, type PaperFact, type TrendCard } from "./pastPapersPage";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { loadChapterWeights } from "@/lib/me/startNextServer";
import { landingHref, listChapterLandings } from "@/lib/questions/landing";
import type { ExamSlug } from "@/lib/exam/examContext";

/** One read per request, shared by a page's metadata and its body. */
export const pastPapersOf = cache(async (examName: string) => {
  const all = await getPublishedMocks(createSupabaseAnonClient());
  return mocksOfType(
    all.filter((m) => m.examName === examName),
    "past-papers"
  );
});

/** subject + chapter -> its /questions landing, for the chapters this exam's papers ask most. */
export async function chapterHrefs(examName: string): Promise<(subject: string, chapter: string) => string | undefined> {
  try {
    const landings = (await listChapterLandings()).filter((l) => l.examName === examName);
    const map = new Map(landings.map((l) => [`${l.subjectName}\u0000${l.chapterName}`, landingHref(l)]));
    return (subject, chapter) => map.get(`${subject}\u0000${chapter}`);
  } catch (e) {
    console.error("past papers: chapter landings failed", e instanceof Error ? e.message : e);
    return () => undefined;
  }
}

export type ExamPaperFacts = {
  papers: Awaited<ReturnType<typeof pastPapersOf>>;
  facts: PaperFact[];
  trends: TrendCard[];
};

export async function loadExamPaperFacts(examSlug: ExamSlug, examName: string): Promise<ExamPaperFacts> {
  const papers = await pastPapersOf(examName);
  const facts = paperFacts(papers, (code) => getBlueprint(examSlug, code));
  const examId = papers.length > 0 ? (await getExamIdMap())[examSlug] : null;
  const trends = examId ? paperTrends(await loadChapterWeights(examId), facts, await chapterHrefs(examName)) : [];
  return { papers, facts, trends };
}
