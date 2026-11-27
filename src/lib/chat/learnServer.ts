import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getOutline } from "@/lib/learn/query";
import { chapterHref, MASTERY_NEEDED, lessonHref } from "@/lib/learn/links";
import type { Outline } from "@/lib/learn/lessonState";
import { learnChapterFor, topicKey } from "@/lib/learn/vLinks";
import type { ChapterSearchRow } from "./chapterSearch";
import { learnRows, pickTopicLesson, type LearnChapter } from "./learnLesson";
import type { StuckLearn } from "@/lib/questions/stuckOffer";

/**
 * V's reads of Learn (2026-11-22, owner: "give Learn priority wherever it's
 * available"): a chapter's lessons with the student's own progress, for
 * chapter_overview, and the lesson for a missed question, for explain_question.
 *
 * The outline is the same for everyone and changes only on a `learn:import`, so it
 * is kept for 10 minutes per server; progress is read with the student's own
 * login (learn_my_progress returns auth.uid()'s rows only).
 */

const OUTLINE_TTL_MS = 10 * 60 * 1000;
const outlines = new Map<string, { at: number; outline: Outline | null }>();

async function outlineOf(course: string): Promise<Outline | null> {
  const hit = outlines.get(course);
  if (hit && Date.now() - hit.at < OUTLINE_TTL_MS) return hit.outline;
  const outline = await getOutline(course);
  outlines.set(course, { at: Date.now(), outline });
  return outline;
}

type ProgressRow = { chapter: string; slug: string; state: "learning" | "mastered"; streak: number | null };

/** An exam chapter's Learn lessons with the student's progress, or null where Learn does not teach it. `user` = the student's own client, null signed out. */
async function loadLearnChapter(user: SupabaseClient | null, examName: string, subjectName: string, chapterName: string): Promise<LearnChapter | null> {
  const link = learnChapterFor(examName, subjectName, chapterName);
  if (!link) return null;
  const outline = await outlineOf(link.course);
  const ch = outline?.chapters.find((c) => c.slug === link.chapter);
  if (!outline || !ch) return null;
  const progress = new Map<string, { state: "learning" | "mastered"; streak: number }>();
  if (user) {
    const pools = [...new Set(ch.parts.map((p) => p.chapter))];
    const { data, error } = await user.rpc("learn_my_progress", { p_chapters: pools });
    if (error) throw new Error(`learn_my_progress: ${error.message}`);
    for (const r of (data ?? []) as ProgressRow[]) progress.set(`${r.chapter}/${r.slug}`, { state: r.state, streak: r.streak ?? 0 });
  }
  return {
    course: link.course,
    courseChapter: link.chapter,
    title: ch.title,
    lessons: learnRows(outline, link, progress),
    signedIn: user !== null,
    needed: MASTERY_NEEDED,
  };
}

/** The chapter's Learn lessons for V, or null where Learn does not teach it. `user` = the student's own client, null signed out. */
export function learnLoader(user: SupabaseClient | null): (hit: ChapterSearchRow) => Promise<LearnChapter | null> {
  return (hit) => loadLearnChapter(user, hit.examName, hit.subjectName, hit.chapterName);
}

/**
 * The stuck offer's "Teach me the idea" (2026-11-22, owner: "open the relevant concept"): the
 * Learn lesson filed under the question's topic, the first the student has not mastered; where
 * no lesson is filed under the topic (every course but the three Maths ones), the Learn chapter, opened in V. Null where
 * Learn does not teach the chapter.
 */
export async function learnTargetForQuestion(user: SupabaseClient, q: { exam: string; subject: string; chapter: string; subtopic: string }): Promise<StuckLearn | null> {
  const lc = await loadLearnChapter(user, q.exam, q.subject, q.chapter);
  if (!lc || lc.lessons.length === 0) return null;
  const lesson = pickTopicLesson(lc.lessons, q.subtopic);
  if (lesson) return { kind: "lesson", chapter: lesson.chapter, concept: lesson.slug, course: lc.course };
  return { kind: "chapter", exam: q.exam, chapter: q.chapter };
}

/**
 * Where to learn the idea behind a missed question: on the boards, the first
 * Learn lesson filed under its topic; elsewhere, the Learn chapter (only the
 * three Maths courses map topics to lessons so far). Null where Learn does not teach it.
 */
export async function learnLinkForQuestion(q: { exam: string; subject: string; chapter: string; subtopic: string | null }): Promise<{ href: string; title: string } | null> {
  const link = learnChapterFor(q.exam, q.subject, q.chapter);
  if (!link) return null;
  const outline = await outlineOf(link.course);
  if (!outline) return null;
  const rows = learnRows(outline, link, new Map());
  if (rows.length === 0) return null;
  const lesson = q.subtopic ? rows.find((r) => r.topics.some((t) => topicKey(t) === topicKey(q.subtopic!))) : undefined;
  // No ?course= here: V's reply links stop at "?" (lib/chat/replyLinks PATH_RE); the page works without it.
  if (lesson) return { href: lessonHref(lesson.chapter, lesson.slug), title: lesson.title };
  const ch = outline.chapters.find((c) => c.slug === link.chapter);
  return { href: chapterHref(link.course, link.chapter), title: `${ch?.title ?? q.chapter} lessons` };
}
