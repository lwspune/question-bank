/**
 * The live PUBLIC counts the /notes chapter intros are checked against, for
 * the prod-contract gate (tests/notes-intro-counts.test.ts) and the triage
 * probe (`npm run notes:intro`). One loader, so the two cannot disagree about
 * what the bank holds.
 *
 * WHAT IT COUNTS. Every exam's past-year rows, plus the practice rows of an
 * exam whose notes count both kinds (lib/notes/countKind.ts), so the numbers
 * match what the chapter cards print. Keyed by exam + subject + chapter NAME:
 * "Indefinite Integration" exists under NDA, MH HSC Class 12 and Worksheets,
 * and "Maths / Matrices" under MHT-CET and JEE Mains, so one axis alone merges
 * chapters (see the test's header).
 *
 * HOW IT READS (2026-11-08). Both callers used to page
 * `questions.select("pyq_year, subtopics(name), chapters(name, subjects(name,
 * exams(name))))")` with `.range()`. OFFSET re-builds every skipped row, embed
 * lookups included, so page N did N pages of work: 730 MB a page, ~54 GB for
 * one run of the daily prod-contract job, more than a day and a half of
 * homework traffic. Now questions are read as bare ids (chapter, subtopic,
 * year), paged after the last id, and the four small taxonomy tables are read
 * once and joined here. Spec: tests/notes-live-counts.test.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "../../src/lib/supabase/readAllPages";
import { readAllByKeyset } from "../../src/lib/supabase/keyset";
import { NOTES_CHAPTERS } from "../../src/lib/notes/chapters";
import { notesCountKind } from "../../src/lib/notes/countKind";

/** Exam + subject + chapter. All three are load-bearing (see the header). */
export const liveKey = (exam: string | undefined, subject: string | undefined, chapter: string | undefined) =>
  `${exam}\t${subject}\t${chapter}`;

export type LiveRow = { chapter_id: string | null; subtopic_id: string | null; pyq_year: number | null };

export type LiveTaxonomy = {
  exams: Map<string, string>;
  subjects: Map<string, { name: string; examId: string }>;
  chapters: Map<string, { name: string; subjectId: string }>;
  subtopics: Map<string, string>;
};

export type NotesLive = {
  chapter: Map<string, number>;
  /** Per chapter: subtopic name ("?" for none) → count. */
  perSub: Map<string, Map<string, number>>;
  /** Per chapter: "<subtopic or *>\t<year>" → count. */
  perYear: Map<string, Map<string, number>>;
  /** Per chapter: the newest PYQ year. */
  maxYear: Map<string, number>;
};

const bump = (m: Map<string, number>, k: string) => m.set(k, (m.get(k) ?? 0) + 1);

/** Count rows into the per-chapter maps. Pure. */
export function tallyNotesLive(rows: Iterable<LiveRow>, tax: LiveTaxonomy): NotesLive {
  const live: NotesLive = { chapter: new Map(), perSub: new Map(), perYear: new Map(), maxYear: new Map() };
  for (const r of rows) {
    const chapter = r.chapter_id ? tax.chapters.get(r.chapter_id) : undefined;
    const subject = chapter ? tax.subjects.get(chapter.subjectId) : undefined;
    const exam = subject ? tax.exams.get(subject.examId) : undefined;
    const k = liveKey(exam, subject?.name, chapter?.name);
    bump(live.chapter, k);
    if (!live.perSub.has(k)) live.perSub.set(k, new Map());
    const sn = (r.subtopic_id && tax.subtopics.get(r.subtopic_id)) || "?";
    bump(live.perSub.get(k)!, sn);
    if (r.pyq_year) {
      live.maxYear.set(k, Math.max(live.maxYear.get(k) ?? 0, r.pyq_year));
      if (!live.perYear.has(k)) live.perYear.set(k, new Map());
      const y = live.perYear.get(k)!;
      for (const who of ["*", sn]) bump(y, `${who}\t${r.pyq_year}`);
    }
  }
  return live;
}

async function readTaxonomy(db: SupabaseClient): Promise<LiveTaxonomy> {
  const page = <T>(table: string, cols: string) =>
    readAllPages<T>((from, to) => db.from(table).select(cols).order("id").range(from, to) as unknown as PromiseLike<{ data: T[] | null; error: { message: string } | null }>);
  const [exams, subjects, chapters, subtopics] = await Promise.all([
    page<{ id: string; name: string }>("exams", "id, name"),
    page<{ id: string; name: string; exam_id: string }>("subjects", "id, name, exam_id"),
    page<{ id: string; name: string; subject_id: string }>("chapters", "id, name, subject_id"),
    page<{ id: string; name: string }>("subtopics", "id, name"),
  ]);
  return {
    exams: new Map(exams.map((e) => [e.id, e.name])),
    subjects: new Map(subjects.map((s) => [s.id, { name: s.name, examId: s.exam_id }])),
    chapters: new Map(chapters.map((c) => [c.id, { name: c.name, subjectId: c.subject_id }])),
    subtopics: new Map(subtopics.map((t) => [t.id, t.name])),
  };
}

/** Every counted PUBLIC question as bare ids, paged after the last id. */
async function readRows(db: SupabaseClient, kind: "pyq" | "practice", examIds?: string[]): Promise<LiveRow[]> {
  type Row = LiveRow & { id: string };
  const rows = await readAllByKeyset<Row>(async (last, limit) => {
    let q = db
      .from("questions")
      .select("id, chapter_id, subtopic_id, pyq_year")
      .eq("visibility", "PUBLIC")
      .eq("question_kind", kind);
    if (examIds) q = q.in("exam_id", examIds);
    if (last) q = q.gt("id", last.id);
    const { data, error } = await q.order("id").limit(limit);
    if (error) throw new Error(`notes live counts: ${error.message}`);
    return (data ?? []) as Row[];
  }, 1000);
  return rows;
}

export async function loadNotesLive(db: SupabaseClient): Promise<NotesLive> {
  const allKindExams = [...new Set(NOTES_CHAPTERS.map((c) => c.examName as string))].filter(
    (e) => notesCountKind(e) === "all"
  );
  const tax = await readTaxonomy(db);
  const allKindExamIds = [...tax.exams].filter(([, name]) => allKindExams.includes(name)).map(([id]) => id);
  const rows = await readRows(db, "pyq");
  if (allKindExamIds.length) rows.push(...(await readRows(db, "practice", allKindExamIds)));
  return tallyNotesLive(rows, tax);
}
