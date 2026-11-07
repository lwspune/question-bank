/**
 * The board path's CONTENT read for one board (MENTOR_SPEC.md Phase 1): every
 * Physics, Chemistry and Maths chapter in book order, with its Top 10 PYQs (the
 * list the /board Top 10 tab shows, lib/homework/query getSubjectChapterTop)
 * and its published chapter test. Outdated chapters ("[Outdated]") are left
 * out. Reads are chunked at 200 ids (`.in()` puts the list in the URL).
 *
 * Uncached and taking any client, so `npm run path:smoke` runs this exact
 * code; ./content.ts caches it for the app.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSubjectChapterTop } from "@/lib/homework/query";
import type { ChapterTest } from "@/lib/mocks/chapterTests";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { QuestionFormat } from "@/lib/homework/progress";
import { revisionPath } from "./done";
import { PATH_SUBJECTS, SUBJECT_NAME, queueOf, type PathChapter, type PathExam, type PathSubject } from "./model";

const CHUNK = 200;
const chunks = <T,>(xs: readonly T[]) =>
  Array.from({ length: Math.ceil(xs.length / CHUNK) }, (_, i) => xs.slice(i * CHUNK, (i + 1) * CHUNK));

export async function readPathContent(
  db: SupabaseClient,
  exam: PathExam,
  tests: ReadonlyMap<string, ChapterTest>
): Promise<PathChapter[]> {
  const examName = EXAM_REGISTRY.find((e) => e.slug === exam)?.examName;
  if (!examName) throw new Error(`path content: unknown exam ${exam}`);
  const { data: examRow, error: examErr } = await db.from("exams").select("id").eq("name", examName).single();
  if (examErr || !examRow) throw new Error(`path content: exam ${exam}: ${examErr?.message ?? "missing"}`);
  const examId = examRow.id as string;

  const { data: subjects, error: subErr } = await db
    .from("subjects")
    .select("id, name")
    .eq("exam_id", examId)
    .in("name", PATH_SUBJECTS.map((s) => SUBJECT_NAME[s]));
  if (subErr) throw new Error(`path content: subjects: ${subErr.message}`);

  type Raw = { subject: PathSubject; subjectId: string; id: string; name: string; rank: number };
  const raw: Raw[] = [];
  for (const s of subjects ?? []) {
    const subject = PATH_SUBJECTS.find((p) => SUBJECT_NAME[p] === s.name)!;
    const { data: chs, error } = await db
      .from("chapters")
      .select("id, name, order_index")
      .eq("subject_id", s.id)
      .order("order_index");
    if (error) throw new Error(`path content: chapters: ${error.message}`);
    let rank = 0;
    for (const c of chs ?? []) {
      if (/\[Outdated\]/i.test(c.name as string)) continue;
      raw.push({ subject, subjectId: s.id as string, id: c.id as string, name: c.name as string, rank: ++rank });
    }
  }

  // Each chapter's Top 10: the subjects side by side, a subject's chapters one
  // after another, so a cache miss is ~3 reads in flight, not ~140.
  const tops = new Map<string, { position: number; questionId: string }[]>();
  await Promise.all(
    [...new Set(raw.map((c) => c.subjectId))].map(async (subjectId) => {
      for (const c of raw.filter((x) => x.subjectId === subjectId)) {
        const top = await getSubjectChapterTop(db, { examId, subjectId, chapterId: c.id });
        tops.set(c.id, (top?.items ?? []).map((i) => ({ position: i.position, questionId: i.questionId })));
      }
    })
  );

  const ids = [...new Set([...tops.values()].flat().map((i) => i.questionId))];
  const formats = new Map<string, QuestionFormat>();
  for (const part of chunks(ids)) {
    const { data, error } = await db.from("questions").select("id, question_format").in("id", part);
    if (error) throw new Error(`path content: question formats: ${error.message}`);
    for (const q of data ?? []) formats.set(q.id as string, ((q.question_format as string) ?? "mcq") as QuestionFormat);
  }

  const slugs = raw.flatMap((c) => (tests.get(c.id) ? [tests.get(c.id)!.slug] : []));
  const mockIdBySlug = new Map<string, string>();
  for (const part of chunks(slugs)) {
    const { data, error } = await db.from("mock_tests").select("id, slug").in("slug", part);
    if (error) throw new Error(`path content: mock ids: ${error.message}`);
    for (const r of data ?? []) mockIdBySlug.set(r.slug as string, r.id as string);
  }

  return raw.map((c) => {
    const bySlot = new Map<number, { id: string; format: QuestionFormat }[]>();
    for (const it of tops.get(c.id) ?? []) {
      const parts = bySlot.get(it.position) ?? [];
      parts.push({ id: it.questionId, format: formats.get(it.questionId) ?? "mcq" });
      bySlot.set(it.position, parts);
    }
    const t = tests.get(c.id);
    const mockId = t ? mockIdBySlug.get(t.slug) : undefined;
    return {
      id: c.id,
      name: c.name,
      subject: c.subject,
      queue: queueOf(exam, c.subject, c.rank),
      rank: c.rank,
      boardPath: revisionPath(exam, SUBJECT_NAME[c.subject], c.name),
      top: [...bySlot.entries()].sort((a, b) => a[0] - b[0]).map(([, parts]) => parts),
      test: t && mockId ? { mockId, slug: t.slug, minutes: t.minutes } : null,
    };
  });
}
