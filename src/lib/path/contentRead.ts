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
import { readInChunks } from "@/lib/supabase/readInChunks";
import { getSubjectChapterTop } from "@/lib/homework/query";
import type { ChapterTest } from "@/lib/mocks/chapterTests";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { QuestionFormat } from "@/lib/homework/progress";
import { revisionPath } from "./done";
import { PATH_SUBJECTS, SUBJECT_NAME, queueOf, type PaperSlot, type PathChapter, type PathExam, type PathPaper, type PathSubject } from "./model";
import { slugify } from "@/lib/slug";

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
  const formatRows = await readInChunks<{ id: string; question_format: string | null }>(ids, (part, f, t) =>
    db.from("questions").select("id, question_format").in("id", part).order("id").range(f, t)
  );
  for (const q of formatRows) formats.set(q.id, ((q.question_format ?? "mcq") as QuestionFormat));

  const slugs = raw.flatMap((c) => (tests.get(c.id) ? [tests.get(c.id)!.slug] : []));
  const mockRows = await readInChunks<{ id: string; slug: string }>(slugs, (part, f, t) =>
    db.from("mock_tests").select("id, slug").in("slug", part).order("id").range(f, t)
  );
  const mockIdBySlug = new Map(mockRows.map((r) => [r.slug, r.id]));

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

/** "2026 (55/1/1)" from a CBSE title; the year and sitting otherwise. */
export function paperLabel(p: { year: number; title: string | null; sitting: string | null }): string {
  const code = p.title?.match(/\(([^()]+)\)\s*$/)?.[1];
  if (code) return `${p.year} (${code})`;
  return p.sitting ? `${p.year} ${p.sitting}` : String(p.year);
}

type ItemRow = { paper_id: string; position: number; alternative_to: number | null; part_of: number | null; question_id: string | null };

/**
 * One paper's printed questions as slots (revision.ts paperWorked): a
 * top-level question with its parts, and its OR twin with the twin's parts.
 */
export function paperSlots(items: readonly ItemRow[], formats: ReadonlyMap<string, QuestionFormat>): PaperSlot[] {
  const q = (it: ItemRow) => (it.question_id ? [{ id: it.question_id, format: formats.get(it.question_id) ?? "mcq" }] : []);
  const withParts = (it: ItemRow) => [...q(it), ...items.filter((x) => x.part_of === it.position).flatMap(q)];
  return [...items]
    .filter((it) => it.part_of === null && it.alternative_to === null)
    .sort((a, b) => a.position - b.position)
    .map((it) => [withParts(it), ...items.filter((x) => x.alternative_to === it.position).map(withParts)].filter((o) => o.length > 0))
    .filter((slot) => slot.length > 0);
}

/**
 * The past board papers the revision weeks serve (Phase 3): Set 1 of every
 * published sitting of the path's subjects, newest first, each with its
 * printed questions. Uncached, so `npm run path:smoke` runs this exact code;
 * ./content.ts caches it for the app.
 */
export async function readPathPapers(db: SupabaseClient, exam: PathExam): Promise<PathPaper[]> {
  const examName = EXAM_REGISTRY.find((e) => e.slug === exam)?.examName;
  if (!examName) throw new Error(`path papers: unknown exam ${exam}`);
  const { data: examRow, error: examErr } = await db.from("exams").select("id").eq("name", examName).single();
  if (examErr || !examRow) throw new Error(`path papers: exam ${exam}: ${examErr?.message ?? "missing"}`);
  const { data: subjects, error: subErr } = await db
    .from("subjects")
    .select("id, name")
    .eq("exam_id", examRow.id as string)
    .in("name", PATH_SUBJECTS.map((s) => SUBJECT_NAME[s]));
  if (subErr) throw new Error(`path papers: subjects: ${subErr.message}`);
  const subjectOf = new Map((subjects ?? []).map((s) => [s.id as string, PATH_SUBJECTS.find((p) => SUBJECT_NAME[p] === s.name)!]));
  if (subjectOf.size === 0) return [];

  type PaperRow = { id: string; subject_id: string; group_slug: string; set_number: number | null; year: number; sitting: string | null; title: string | null; duration_minutes: number | null };
  const rows = await readInChunks<PaperRow>([...subjectOf.keys()], (part, f, t) =>
    db
      .from("board_papers")
      .select("id, subject_id, group_slug, set_number, year, sitting, title, duration_minutes")
      .eq("published", true)
      .in("subject_id", part)
      .order("id")
      .range(f, t)
  );
  // Set 1 of each sitting (the lowest set number).
  const first = new Map<string, PaperRow>();
  for (const r of rows) {
    const key = `${r.subject_id}|${r.group_slug}`;
    const prev = first.get(key);
    if (!prev || (r.set_number ?? 0) < (prev.set_number ?? 0)) first.set(key, r);
  }
  const chosen = [...first.values()];
  const items = await readInChunks<ItemRow>(chosen.map((p) => p.id), (part, f, t) =>
    db.from("board_paper_items").select("paper_id, position, alternative_to, part_of, question_id").in("paper_id", part).order("paper_id").order("position").range(f, t)
  );
  const ids = [...new Set(items.flatMap((i) => (i.question_id ? [i.question_id] : [])))];
  const formats = new Map<string, QuestionFormat>();
  const formatRows = await readInChunks<{ id: string; question_format: string | null }>(ids, (part, f, t) =>
    db.from("questions").select("id, question_format").in("id", part).order("id").range(f, t)
  );
  for (const q of formatRows) formats.set(q.id, (q.question_format ?? "mcq") as QuestionFormat);

  return chosen
    .map((p): PathPaper => {
      const subject = subjectOf.get(p.subject_id)!;
      return {
        id: p.id,
        subject,
        year: p.year,
        label: paperLabel(p),
        minutes: p.duration_minutes ?? 180,
        href: `/question-papers/${exam}/${slugify(SUBJECT_NAME[subject])}/${p.group_slug}`,
        slots: paperSlots(items.filter((i) => i.paper_id === p.id), formats),
      };
    })
    .filter((p) => p.slots.length > 0)
    .sort((a, b) => b.year - a.year || a.label.localeCompare(b.label));
}
