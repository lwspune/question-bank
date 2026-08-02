import type { SupabaseClient } from "@supabase/supabase-js";
import {
  rollUpChapterStatus,
  tallyByExam,
  SYLLABUS_EXAMS,
  type ChapterStatus,
  type ConceptStatus,
  type ExamTally,
  type SyllabusExam,
} from "./summary";

export type ConceptRow = {
  id: string;
  cls: number;
  chapterNo: number;
  chapterName: string;
  sectionNo: string;
  concept: string;
  seq: number;
};

export type ChapterRow = {
  cls: number;
  chapterNo: number;
  chapterName: string;
  conceptCount: number;
  status: Record<SyllabusExam, ChapterStatus>;
};

export type SyllabusMatrix = {
  totalConcepts: number;
  chapters: ChapterRow[];
  tallies: Record<SyllabusExam, ExamTally>;
};

type RawConcept = {
  id: string;
  class: number;
  chapter_no: number;
  chapter_name: string;
  section_no: string;
  concept: string;
  seq: number;
};

type RawLink = { concept_id: string; exam: string; status: ConceptStatus; note: string | null };

/**
 * Pages past the PostgREST 1000-row cap. This is not hypothetical here: the map
 * already holds 864 concepts and ~3.4k exam links, so an unpaged select would
 * silently truncate and under-report every tally.
 */
async function fetchAll<T>(
  db: SupabaseClient,
  table: string,
  columns: string,
  eq?: { column: string; value: string },
): Promise<T[]> {
  const out: T[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = db.from(table).select(columns);
    if (eq) q = q.eq(eq.column, eq.value);
    const { data, error } = await q.range(from, from + PAGE - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    const rows = (data ?? []) as unknown as T[];
    out.push(...rows);
    if (rows.length < PAGE) break;
  }
  return out;
}

function emptyTally(): ExamTally {
  return { full: 0, partial: 0, not: 0, unassessed: 0 };
}

export async function loadSyllabusMatrix(
  db: SupabaseClient,
  opts: { subject?: string } = {},
): Promise<SyllabusMatrix> {
  const subject = opts.subject ?? "Chemistry";

  const scoped = await fetchAll<RawConcept>(
    db,
    "syllabus_concepts",
    "id,class,chapter_no,chapter_name,section_no,concept,seq",
    { column: "subject", value: subject },
  );

  // Links are not subject-filtered at the DB (the join column is concept_id);
  // the per-concept lookup below discards any that belong to another subject.
  const links = await fetchAll<RawLink>(
    db,
    "syllabus_concept_exams",
    "concept_id,exam,status,note",
  );

  const byConcept = new Map<string, Map<string, ConceptStatus>>();
  for (const l of links) {
    let m = byConcept.get(l.concept_id);
    if (!m) {
      m = new Map();
      byConcept.set(l.concept_id, m);
    }
    m.set(l.exam, l.status);
  }

  const chapters = new Map<string, { row: Omit<ChapterRow, "status">; ids: string[] }>();
  for (const c of scoped) {
    const key = `${c.class}|${c.chapter_no}`;
    let entry = chapters.get(key);
    if (!entry) {
      entry = {
        row: {
          cls: c.class,
          chapterNo: c.chapter_no,
          chapterName: c.chapter_name,
          conceptCount: 0,
        },
        ids: [],
      };
      chapters.set(key, entry);
    }
    entry.row.conceptCount += 1;
    entry.ids.push(c.id);
  }

  const rows: ChapterRow[] = [...chapters.values()]
    .map(({ row, ids }) => {
      const status = {} as Record<SyllabusExam, ChapterStatus>;
      for (const exam of SYLLABUS_EXAMS) {
        status[exam] = rollUpChapterStatus(
          ids.map((id) => byConcept.get(id)?.get(exam) ?? null),
        );
      }
      return { ...row, status };
    })
    .sort((a, b) => a.cls - b.cls || a.chapterNo - b.chapterNo);

  const tallies = {} as Record<SyllabusExam, ExamTally>;
  for (const exam of SYLLABUS_EXAMS) {
    const statuses = scoped.map((c) => byConcept.get(c.id)?.get(exam) ?? null);
    tallies[exam] = scoped.length ? tallyByExam(statuses, scoped.length) : emptyTally();
  }

  return { totalConcepts: scoped.length, chapters: rows, tallies };
}

export type ConceptDetail = ConceptRow & {
  status: Record<SyllabusExam, ConceptStatus | null>;
  notes: Partial<Record<SyllabusExam, string>>;
};

export async function loadChapterConcepts(
  db: SupabaseClient,
  cls: number,
  chapterNo: number,
): Promise<{ chapterName: string; concepts: ConceptDetail[] } | null> {
  const { data, error } = await db
    .from("syllabus_concepts")
    .select("id,class,chapter_no,chapter_name,section_no,concept,seq")
    .eq("class", cls)
    .eq("chapter_no", chapterNo)
    .order("seq", { ascending: true });
  if (error) throw new Error(error.message);
  const raw = (data ?? []) as unknown as RawConcept[];
  if (raw.length === 0) return null;

  const ids = raw.map((r) => r.id);
  const { data: linkData, error: linkError } = await db
    .from("syllabus_concept_exams")
    .select("concept_id,exam,status,note")
    .in("concept_id", ids);
  if (linkError) throw new Error(linkError.message);
  const links = (linkData ?? []) as unknown as RawLink[];

  const byConcept = new Map<string, RawLink[]>();
  for (const l of links) {
    const list = byConcept.get(l.concept_id) ?? [];
    list.push(l);
    byConcept.set(l.concept_id, list);
  }

  const concepts: ConceptDetail[] = raw.map((r) => {
    const status = {} as Record<SyllabusExam, ConceptStatus | null>;
    const notes: Partial<Record<SyllabusExam, string>> = {};
    const mine = byConcept.get(r.id) ?? [];
    for (const exam of SYLLABUS_EXAMS) {
      const hit = mine.find((l) => l.exam === exam);
      status[exam] = hit?.status ?? null;
      if (hit?.note) notes[exam] = hit.note;
    }
    return {
      id: r.id,
      cls: r.class,
      chapterNo: r.chapter_no,
      chapterName: r.chapter_name,
      sectionNo: r.section_no,
      concept: r.concept,
      seq: r.seq,
      status,
      notes,
    };
  });

  return { chapterName: raw[0].chapter_name, concepts };
}
