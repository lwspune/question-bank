/**
 * The board path's content, cached for a day (MENTOR_SPEC.md Phase 1). The same
 * for every student, so it is read with the anon client: a rebuilt Top 10 or a
 * newly published test reaches the path within a day, or at the next deploy.
 * The read itself is ./contentRead.ts.
 */
import "server-only";
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { listChapterTests } from "@/lib/mocks/chapterTestsQuery";
import { readPathContent, readPathPapers } from "./contentRead";
import type { PathChapter, PathExam, PathPaper, PathSubject } from "./model";

const cachedContent = unstable_cache(
  async (exam: PathExam): Promise<PathChapter[]> => readPathContent(createSupabaseAnonClient(), exam, await listChapterTests()),
  ["board-path-content-v1"],
  { revalidate: 86400 }
);

/** The board's path chapters for these subjects, in book order within each. */
export async function getPathContent(exam: PathExam, subjects: readonly PathSubject[]): Promise<PathChapter[]> {
  const all = await cachedContent(exam);
  return all.filter((c) => subjects.includes(c.subject));
}

const cachedPapers = unstable_cache(
  async (exam: PathExam): Promise<PathPaper[]> => readPathPapers(createSupabaseAnonClient(), exam),
  ["board-path-papers-v1"],
  { revalidate: 86400 }
);

/** The revision weeks' past board papers for these subjects, newest first (Phase 3). */
export async function getPathPapers(exam: PathExam, subjects: readonly PathSubject[]): Promise<PathPaper[]> {
  const all = await cachedPapers(exam);
  return all.filter((p) => subjects.includes(p.subject));
}
