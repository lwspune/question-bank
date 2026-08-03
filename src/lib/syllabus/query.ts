import type { SupabaseClient } from "@supabase/supabase-js";
import {
  BOOK_OF_EXAM,
  parseCoveredRef,
  splitCoveredBy,
  splitPyqCount,
  SPINE,
  isTopLevelSection,
  rollUpChapterStatus,
  sectionGroupKey,
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

/** One level below the chapter: a printed book section and everything under it. */
export type SectionRow = {
  sectionNo: string;
  title: string;
  conceptCount: number;
  status: Record<SyllabusExam, ChapterStatus>;
};

export type ChapterRow = {
  cls: number;
  chapterNo: number;
  chapterName: string;
  conceptCount: number;
  status: Record<SyllabusExam, ChapterStatus>;
  sections: SectionRow[];
};

export type SyllabusMatrix = {
  totalConcepts: number;
  chapters: ChapterRow[];
  tallies: Record<SyllabusExam, ExamTally>;
};

type RawConcept = {
  id: string;
  source: string;
  class: number;
  chapter_no: number;
  chapter_name: string;
  section_no: string;
  concept: string;
  seq: number;
};

type RawLink = {
  concept_id: string;
  exam: string;
  status: ConceptStatus;
  note: string | null;
  covered_by: string | null;
};

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

  // SCOPED TO ONE SPINE. Filtering on subject alone was a live bug: every spine
  // uses subject "Chemistry" and numbers chapters from 1, so State Board Ch.1,
  // NCERT Ch.1 and the exam-bank rows all merged into a single chapter row. The
  // page was correct when written and the data grew underneath it.
  const scoped = (
    await fetchAll<RawConcept>(
      db,
      "syllabus_concepts",
      "id,source,class,chapter_no,chapter_name,section_no,concept,seq",
      { column: "subject", value: subject },
    )
  ).filter((c) => c.source === SPINE.stateBoard);

  // Links are not subject-filtered at the DB (the join column is concept_id);
  // the per-concept lookup below discards any that belong to another subject.
  const links = await fetchAll<RawLink>(
    db,
    "syllabus_concept_exams",
    "concept_id,exam,status,note,covered_by",
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

  type ChapterAcc = {
    cls: number;
    chapterNo: number;
    chapterName: string;
    ids: string[];
    sections: Map<string, { title: string; ids: string[]; firstSeq: number }>;
  };

  const chapters = new Map<string, ChapterAcc>();
  for (const c of scoped) {
    const key = `${c.class}|${c.chapter_no}`;
    let entry = chapters.get(key);
    if (!entry) {
      entry = {
        cls: c.class,
        chapterNo: c.chapter_no,
        chapterName: c.chapter_name,
        ids: [],
        sections: new Map(),
      };
      chapters.set(key, entry);
    }
    entry.ids.push(c.id);

    const groupKey = sectionGroupKey(c.section_no);
    let section = entry.sections.get(groupKey);
    if (!section) {
      // Title defaults to the ref so a group whose own N.M row is missing from
      // the book still renders with something meaningful.
      section = { title: groupKey, ids: [], firstSeq: c.seq };
      entry.sections.set(groupKey, section);
    }
    section.ids.push(c.id);
    section.firstSeq = Math.min(section.firstSeq, c.seq);
    if (isTopLevelSection(c.section_no)) section.title = c.concept;
  }

  const statusFor = (ids: string[]) => {
    const status = {} as Record<SyllabusExam, ChapterStatus>;
    for (const exam of SYLLABUS_EXAMS) {
      status[exam] = rollUpChapterStatus(
        ids.map((id) => byConcept.get(id)?.get(exam) ?? null),
      );
    }
    return status;
  };

  const rows: ChapterRow[] = [...chapters.values()]
    .map((entry) => ({
      cls: entry.cls,
      chapterNo: entry.chapterNo,
      chapterName: entry.chapterName,
      conceptCount: entry.ids.length,
      status: statusFor(entry.ids),
      sections: [...entry.sections.entries()]
        // Book order, not string order: "1.10" must follow "1.9", which a
        // lexical sort on the ref would reverse.
        .sort((a, b) => a[1].firstSeq - b[1].firstSeq)
        .map(([sectionNo, s]) => ({
          sectionNo,
          title: s.title,
          conceptCount: s.ids.length,
          status: statusFor(s.ids),
        })),
    }))
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
  // Same spine scope as the matrix: (class, chapter_no) is NOT unique across
  // spines, so without this the detail view mixes three books' chapter 1.
  const { data, error } = await db
    .from("syllabus_concepts")
    .select("id,source,class,chapter_no,chapter_name,section_no,concept,seq")
    .eq("source", SPINE.stateBoard)
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

/* ------------------------------------------------------------------ *
 * Mapping views: "where does the OTHER book cover this?"
 *
 * The matrix above answers "does exam X require this State Board concept?".
 * These answer the inverse — the question a student actually asks: I have this
 * NCERT/JEE topic in front of me, where is it in my book? So the rows are the
 * other spine and the payload is a POINTER, not a verdict.
 * ------------------------------------------------------------------ */

/** One resolved pointer: the section, its title, and the chapter it sits in. */
export type CoveredRef = { cls: number; no: string; title: string; chapterLabel: string };

export type MappingRow = {
  id: string;
  cls: number;
  chapterName: string;
  sectionNo: string;
  concept: string;
  pyq: number;
  /** Per book: how it is covered, and where. */
  covers: Record<string, { status: ConceptStatus | null; note: string | null; refs: CoveredRef[] }>;
  oldSyllabus: boolean;
};

/** Lookup of every section title and chapter name, per spine and per class. */
type BookIndex = {
  title: Map<string, string>;
  chapter: Map<string, string>;
};

function indexBooks(all: RawConcept[]): Map<string, BookIndex> {
  const out = new Map<string, BookIndex>();
  for (const c of all) {
    let idx = out.get(c.source);
    if (!idx) {
      idx = { title: new Map(), chapter: new Map() };
      out.set(c.source, idx);
    }
    idx.title.set(`${c.class}|${c.section_no}`, c.concept);
    idx.chapter.set(`${c.class}|${c.chapter_no}`, c.chapter_name);
  }
  return out;
}

const romanOf = (cls: number) => (cls === 12 ? "XII" : "XI");

function resolveRefs(
  coveredBy: string,
  defaultCls: number,
  book: BookIndex | undefined,
): CoveredRef[] {
  return splitCoveredBy(coveredBy).map((raw) => {
    const { cls, no } = parseCoveredRef(raw, defaultCls);
    const chNo = no.split(".")[0];
    const chName = book?.chapter.get(`${cls}|${chNo}`) ?? "";
    return {
      cls,
      no,
      title: book?.title.get(`${cls}|${no}`) ?? "",
      // Every label states its year. Printing it only when a ref carried an
      // explicit prefix left the other year bare, which reads as "no year".
      chapterLabel: chName
        ? `Std ${romanOf(cls)} Ch.${chNo} ${chName}`
        : `Std ${romanOf(cls)} Ch.${chNo}`,
    };
  });
}

/**
 * JEE chapters the exam no longer sets, DERIVED from the bank rather than
 * asserted, so the flag re-derives itself as the corpus grows. Recency is the
 * test, not volume: s-Block has only ~10 questions but reaches 2026, so it is
 * live, while metallurgy has more and stopped at 2021.
 */
export const LIVE_FROM_YEAR = 2023;

export async function loadOldSyllabusChapters(
  db: SupabaseClient,
  exam = "JEE Mains",
  subject = "Chemistry",
): Promise<Set<string>> {
  const lastYear = new Map<string, number>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("pyq_year,exams!inner(name),subjects!inner(name),chapters!inner(name)")
      .eq("exams.name", exam)
      .eq("subjects.name", subject)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`old-syllabus years: ${error.message}`);
    const rows = (data ?? []) as unknown as {
      pyq_year: number | null;
      chapters: { name: string } | null;
    }[];
    for (const r of rows) {
      const ch = r.chapters?.name;
      if (!ch || !r.pyq_year) continue;
      lastYear.set(ch, Math.max(lastYear.get(ch) ?? 0, r.pyq_year));
    }
    if (rows.length < PAGE) break;
  }
  return new Set([...lastYear].filter(([, y]) => y < LIVE_FROM_YEAR).map(([ch]) => ch));
}

/**
 * Rows of one spine, each carrying where the named books cover it.
 *
 * `books` names the exam columns to resolve — "MH State Board" always, plus
 * "CBSE Class 12" for the JEE spine so a row can show both answers at once.
 */
export async function loadMappingRows(
  db: SupabaseClient,
  opts: {
    spine: string;
    books: string[];
    subject?: string;
    topLevelOnly?: boolean;
    oldSyllabus?: Set<string>;
  },
): Promise<MappingRow[]> {
  const subject = opts.subject ?? "Chemistry";
  const all = await fetchAll<RawConcept>(
    db,
    "syllabus_concepts",
    "id,source,class,chapter_no,chapter_name,section_no,concept,seq",
    { column: "subject", value: subject },
  );
  const books = indexBooks(all);

  const mine = all
    .filter((c) => c.source === opts.spine)
    .filter((c) => !opts.topLevelOnly || isTopLevelSection(c.section_no));
  const mineIds = new Set(mine.map((c) => c.id));

  const links = (
    await fetchAll<RawLink>(db, "syllabus_concept_exams", "concept_id,exam,status,note,covered_by")
  ).filter((l) => mineIds.has(l.concept_id));

  const byConcept = new Map<string, RawLink[]>();
  for (const l of links) {
    const list = byConcept.get(l.concept_id) ?? [];
    list.push(l);
    byConcept.set(l.concept_id, list);
  }

  return mine
    .map((c) => {
      const { name, pyq } = splitPyqCount(c.concept);
      const mineLinks = byConcept.get(c.id) ?? [];
      const covers: MappingRow["covers"] = {};
      for (const bookExam of opts.books) {
        const hit = mineLinks.find((l) => l.exam === bookExam);
        covers[bookExam] = {
          status: hit?.status ?? null,
          note: hit?.note ?? null,
          refs: hit?.covered_by
            ? resolveRefs(hit.covered_by, c.class, books.get(BOOK_OF_EXAM[bookExam] ?? ""))
            : [],
        };
      }
      return {
        id: c.id,
        cls: c.class,
        chapterName: c.chapter_name,
        sectionNo: c.section_no,
        concept: name,
        pyq,
        covers,
        oldSyllabus: opts.oldSyllabus?.has(c.chapter_name) ?? false,
      };
    })
    // Old-syllabus chapters sink to the bottom: they are history, and letting a
    // dead chapter outrank a live one would misdirect the prioritisation this
    // view exists to support.
    .sort(
      (a, b) =>
        Number(a.oldSyllabus) - Number(b.oldSyllabus) ||
        a.chapterName.localeCompare(b.chapterName) ||
        b.pyq - a.pyq ||
        a.cls - b.cls ||
        a.sectionNo.localeCompare(b.sectionNo, undefined, { numeric: true }),
    );
}
