import type { SupabaseClient } from "@supabase/supabase-js";
import {
  BOOK_OF_EXAM,
  buildAlignmentRows,
  dominantSbByChapter,
  sbBookOrder,
  parseCoveredRef,
  splitCoveredBy,
  splitPyqCount,
  SPINE,
  isTopLevelSection,
  rollUpChapterStatus,
  sectionGroupKey,
  tallyByExam,
  SYLLABUS_EXAMS,
  type AlignAnchor,
  type AlignmentRow,
  type AlignPointer,
  type AlignSide,
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

/**
 * The two tables every syllabus loader needs.
 *
 * Each loader used to page BOTH tables itself, so `/dashboard/syllabus` — which
 * runs six of them in one Promise.all — made ~10 full-table fetches of the same
 * ~1,600 concepts and ~3,400 links per request. The page now loads once and
 * passes the payload down. Every loader still fetches for itself when `data` is
 * omitted, so scripts and tests that call a single loader are unaffected.
 */
export type SyllabusData = { concepts: RawConcept[]; links: RawLink[] };

export async function loadSyllabusData(
  db: SupabaseClient,
  subject = "Chemistry",
): Promise<SyllabusData> {
  const [concepts, links] = await Promise.all([
    fetchAll<RawConcept>(
      db,
      "syllabus_concepts",
      "id,source,class,chapter_no,chapter_name,section_no,concept,seq",
      { column: "subject", value: subject },
    ),
    fetchAll<RawLink>(db, "syllabus_concept_exams", "concept_id,exam,status,note,covered_by"),
  ]);
  return { concepts, links };
}

export async function loadSyllabusMatrix(
  db: SupabaseClient,
  opts: { subject?: string; data?: SyllabusData } = {},
): Promise<SyllabusMatrix> {
  const subject = opts.subject ?? "Chemistry";

  // SCOPED TO ONE SPINE. Filtering on subject alone was a live bug: every spine
  // uses subject "Chemistry" and numbers chapters from 1, so State Board Ch.1,
  // NCERT Ch.1 and the exam-bank rows all merged into a single chapter row. The
  // page was correct when written and the data grew underneath it.
  const { concepts: allConcepts, links } = opts?.data ?? (await loadSyllabusData(db, subject));
  const scoped = allConcepts.filter((c) => c.source === SPINE.stateBoard);

  // Links are not subject-filtered at the DB (the join column is concept_id);
  // the per-concept lookup below discards any that belong to another subject.

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
  chapterNo: number;
  chapterName: string;
  sectionNo: string;
  concept: string;
  pyq: number;
  /** Per book: how it is covered, and where. */
  covers: Record<string, { status: ConceptStatus | null; note: string | null; refs: CoveredRef[] }>;
  oldSyllabus: boolean;
  /**
   * Where this row sits in the STATE BOARD book — the axis a teacher works
   * along. Null when nothing in the State Board covers it, which is why those
   * rows sort last: they belong to no chapter of the book being taught.
   */
  sbChapterLabel: string;
  sbOrder: { cls: number; chapterNo: number } | null;
  /**
   * The book chapter this row's CHAPTER mostly lives in — set only when
   * `orderByBook` is on. Rendered in the band header so the ordering explains
   * itself instead of looking arbitrary.
   */
  chapterPrimary: string;
};

/** The State Board chapter a row's pointers land in, for grouping and ordering. */
function sbPlacement(refs: CoveredRef[]): Pick<MappingRow, "sbChapterLabel" | "sbOrder"> {
  if (refs.length === 0) return { sbChapterLabel: "", sbOrder: null };
  const labels = [...new Set(refs.map((r) => r.chapterLabel))];
  // Order on the FIRST pointer. A row spanning two chapters has to be filed
  // under one of them, and the first is the one its own mapping leads with.
  const first = refs[0];
  return {
    sbChapterLabel: labels.join(" + "),
    sbOrder: { cls: first.cls, chapterNo: Number(first.no.split(".")[0]) || 0 },
  };
}

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
    /** Pre-loaded tables, so a page running several loaders fetches once. */
    data?: SyllabusData;
    /**
     * Order whole CHAPTERS along this book instead of alphabetically, so the
     * table reads down the book being taught. Opt-in per table: the NCERT table
     * keeps its own book order, and inheriting the State Board sequence there
     * would silently reorder a table nobody asked to change.
     */
    orderByBook?: string;
  },
): Promise<MappingRow[]> {
  const subject = opts.subject ?? "Chemistry";
  const { concepts: all, links: allLinks } = opts.data ?? (await loadSyllabusData(db, subject));
  const books = indexBooks(all);

  const mine = all
    .filter((c) => c.source === opts.spine)
    .filter((c) => !opts.topLevelOnly || isTopLevelSection(c.section_no));
  const mineIds = new Set(mine.map((c) => c.id));

  const links = allLinks.filter((l) => mineIds.has(l.concept_id));

  const byConcept = new Map<string, RawLink[]>();
  for (const l of links) {
    const list = byConcept.get(l.concept_id) ?? [];
    list.push(l);
    byConcept.set(l.concept_id, list);
  }

  const mapped: MappingRow[] = mine
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
        chapterNo: c.chapter_no,
        chapterName: c.chapter_name,
        sectionNo: c.section_no,
        concept: name,
        pyq,
        covers,
        oldSyllabus: opts.oldSyllabus?.has(c.chapter_name) ?? false,
        chapterPrimary: "",
        ...sbPlacement(covers["MH State Board"]?.refs ?? []),
      };
    })
;

  // Rows stay grouped by their OWN chapter — ordering individual rows along the
  // book was built and reverted, because it scattered each exam chapter across
  // the table and "what does JEE ask in Amines" matters more.
  //
  // What `orderByBook` changes is the order of whole CHAPTERS: each is placed at
  // the book chapter holding most of its PYQ, so the table reads down the book
  // without any chapter being broken apart.
  const chapterOrder = new Map<string, number>();
  if (opts.orderByBook) {
    const book = opts.orderByBook;
    const dominant = dominantSbByChapter(
      mapped.map((r) => ({
        chapterName: r.chapterName,
        pyq: r.pyq,
        refs: r.covers[book]?.refs ?? [],
      })),
    );
    for (const r of mapped) {
      const d = dominant.get(r.chapterName);
      r.chapterPrimary = d?.label ?? "";
      chapterOrder.set(r.chapterName, sbBookOrder(d));
    }
  }

  return mapped.sort(
    (a, b) =>
      // Old-syllabus chapters sink to the bottom — they are history, and letting
      // a dead chapter outrank a live one misdirects prioritisation.
      Number(a.oldSyllabus) - Number(b.oldSyllabus) ||
      // Falls back to alphabetical when no book order is requested, and breaks
      // ties within one book chapter the same way.
      (chapterOrder.get(a.chapterName) ?? 0) - (chapterOrder.get(b.chapterName) ?? 0) ||
      // Then the row's OWN book order. Alphabetical put NCERT's Alcohols first
      // and Structure of Atom near the end, which is no order at all. Class
      // leads because BOTH NCERT years number their chapters from 1, so Std XI
      // Ch.1 and Std XII Ch.1 would otherwise interleave.
      a.cls - b.cls ||
      a.chapterNo - b.chapterNo ||
      a.chapterName.localeCompare(b.chapterName) ||
      b.pyq - a.pyq ||
      a.sectionNo.localeCompare(b.sectionNo, undefined, { numeric: true }),
  );
}

/**
 * Every EXAM spine at once, from a single fetch.
 *
 * Direction matters here. The chapter matrix asks "does exam X require this
 * State Board concept?"; this asks the inverse — "does the State Board cover
 * what exam X actually sets?" — and only the inverse can express "the exam asks
 * something the books never teach", which is the gap worth acting on.
 */
export type ExamSpineSummary = {
  spine: string;
  /** "JEE Mains bank taxonomy" -> "JEE Mains". */
  label: string;
  live: number;
  full: number;
  partial: number;
  not: number;
  /** Subtopics excluded because the exam no longer sets that chapter. */
  oldExcluded: number;
  /** The uncovered ones, for the gap list. */
  gaps: MappingRow[];
  partials: MappingRow[];
};

export async function loadExamSpineSummaries(
  db: SupabaseClient,
  opts: { subject?: string; oldSyllabus?: Set<string>; data?: SyllabusData } = {},
): Promise<ExamSpineSummary[]> {
  const subject = opts.subject ?? "Chemistry";
  const { concepts: all, links } = opts.data ?? (await loadSyllabusData(db, subject));
  const byConcept = new Map<string, RawLink[]>();
  for (const l of links) {
    const list = byConcept.get(l.concept_id) ?? [];
    list.push(l);
    byConcept.set(l.concept_id, list);
  }
  const books = indexBooks(all);

  const spines = [...new Set(all.map((c) => c.source))].filter((s) => s.endsWith("bank taxonomy"));
  return spines
    .map((spine) => {
      const rows: MappingRow[] = all
        .filter((c) => c.source === spine)
        .map((c) => {
          const { name, pyq } = splitPyqCount(c.concept);
          const mine = byConcept.get(c.id) ?? [];
          const covers: MappingRow["covers"] = {};
          for (const bookExam of ["MH State Board", "CBSE Class 12"]) {
            const hit = mine.find((l) => l.exam === bookExam);
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
            chapterNo: c.chapter_no,
            chapterName: c.chapter_name,
            sectionNo: c.section_no,
            concept: name,
            pyq,
            covers,
            oldSyllabus: opts.oldSyllabus?.has(c.chapter_name) ?? false,
            // Gap rows are listed on their own, never in a book-ordered table,
            // so they carry no primary chapter.
            chapterPrimary: "",
            ...sbPlacement(covers["MH State Board"]?.refs ?? []),
          };
        });

      // LIVE only. Counting chapters the exam no longer sets inflates the gap
      // with history: JEE read "15 not covered" when 10 of those sat in chapters
      // last examined in 2021, so the number to act on is 5.
      const live = rows.filter((r) => !r.oldSyllabus);
      const st = (r: MappingRow) => r.covers["MH State Board"]?.status ?? null;
      return {
        spine,
        label: spine.replace(" bank taxonomy", ""),
        live: live.length,
        full: live.filter((r) => st(r) === "full").length,
        partial: live.filter((r) => st(r) === "partial").length,
        not: live.filter((r) => st(r) === "not").length,
        oldExcluded: rows.length - live.length,
        gaps: live.filter((r) => st(r) === "not").sort((a, b) => b.pyq - a.pyq),
        partials: live.filter((r) => st(r) === "partial").sort((a, b) => b.pyq - a.pyq),
      };
    })
    .sort((a, b) => b.not - a.not || a.label.localeCompare(b.label));
}

/**
 * The three-book alignment table: State Board subtopic | NCERT subtopic | JEE
 * subtopic, one of each per row, anchored on the State Board at 1.x grain.
 *
 * Both other spines point AT the State Board, so their pointers are read in the
 * direction they were authored — nothing is inverted. The NCERT<->JEE pairing
 * uses the separately authored JEE->NCERT edge and is never inferred from a
 * shared State Board section: measured against that edge, inferring the pairing
 * agrees only 129 times out of 168, invents 39 and misses 25.
 */
export async function loadAlignmentRows(
  db: SupabaseClient,
  opts: { subject?: string; oldSyllabus?: Set<string>; data?: SyllabusData } = {},
): Promise<AlignmentRow[]> {
  const subject = opts.subject ?? "Chemistry";
  const { concepts: all, links } = opts.data ?? (await loadSyllabusData(db, subject));
  const linkOf = new Map(links.map((l) => [`${l.concept_id}|${l.exam}`, l]));

  const anchors: AlignAnchor[] = all
    .filter((c) => c.source === SPINE.stateBoard && isTopLevelSection(c.section_no))
    .map((c) => ({
      id: c.id,
      cls: c.class,
      chapterNo: c.chapter_no,
      chapterName: c.chapter_name,
      sectionNo: c.section_no,
      concept: c.concept,
    }));

  const romanCh = (c: RawConcept) =>
    `Std ${romanOf(c.class)} Ch.${c.chapter_no} ${c.chapter_name}`;

  const pointers: AlignPointer[] = [];
  for (const c of all) {
    const isNcert = c.source === SPINE.ncert;
    const isJee = c.source.endsWith("bank taxonomy") && c.source === SPINE.jee;
    if (!isNcert && !isJee) continue;
    const covered = linkOf.get(`${c.id}|${SPINE.stateBoard}`)?.covered_by;
    if (!covered) continue;
    const { name, pyq } = splitPyqCount(c.concept);
    const side: AlignSide = isNcert
      ? { id: c.id, label: `${c.section_no} ${c.concept}`, chapterLabel: romanCh(c) }
      : {
          id: c.id,
          label: name,
          chapterLabel: c.chapter_name,
          pyq,
          oldSyllabus: opts.oldSyllabus?.has(c.chapter_name) ?? false,
        };
    for (const raw of splitCoveredBy(covered)) {
      const { cls, no } = parseCoveredRef(raw, c.class);
      pointers.push({ spine: isNcert ? "ncert" : "jee", side, cls, sectionNo: no });
    }
  }

  // The authored JEE -> NCERT edge, resolved to concept ids so the pairing is by
  // identity rather than by a section string that could drift.
  const ncertByKey = new Map(
    all.filter((c) => c.source === SPINE.ncert).map((c) => [`${c.class}|${c.section_no}`, c.id]),
  );
  const authoredPairs = new Set<string>();
  for (const c of all.filter((x) => x.source === SPINE.jee)) {
    const covered = linkOf.get(`${c.id}|CBSE Class 12`)?.covered_by;
    if (!covered) continue;
    for (const raw of splitCoveredBy(covered)) {
      const { cls, no } = parseCoveredRef(raw, c.class);
      const nid = ncertByKey.get(`${cls}|${no}`);
      if (nid) authoredPairs.add(`${c.id}|${nid}`);
    }
  }

  return buildAlignmentRows(anchors, pointers, authoredPairs);
}

/**
 * NCERT sections the State Board does not fully teach.
 *
 * The exam-spine summaries cannot answer this: they iterate sources ending
 * "bank taxonomy", and NCERT is a BOOK. The shape also differs — a book section
 * carries no PYQ count, so these sort in book order rather than by weight.
 *
 * `alsoAskedBy` marks a hole an exam already reports from its own side (JEE's
 * "Vitamins" and NCERT 10.4 are one gap seen twice). Shown rather than filtered:
 * dropping them would understate what a CBSE student loses, but leaving them
 * unmarked reads as double-counting.
 */
export type NcertGapRow = {
  id: string;
  cls: number;
  chapterNo: number;
  chapterName: string;
  sectionNo: string;
  concept: string;
  status: "not" | "partial";
  note: string | null;
  alsoAskedBy: string | null;
};

export async function loadNcertGaps(
  db: SupabaseClient,
  opts: { subject?: string; data?: SyllabusData } = {},
): Promise<NcertGapRow[]> {
  const subject = opts.subject ?? "Chemistry";
  const { concepts: all, links } = opts.data ?? (await loadSyllabusData(db, subject));
  const linkOf = new Map(links.map((l) => [`${l.concept_id}|${l.exam}`, l]));

  // Which NCERT sections an EXAM already flags as a State Board gap, keyed
  // `cls|section`. Resolved through the exam's own NCERT pointer.
  const alsoAsked = new Map<string, string>();
  for (const c of all) {
    if (!c.source.endsWith("bank taxonomy")) continue;
    if (linkOf.get(`${c.id}|${SPINE.stateBoard}`)?.status !== "not") continue;
    const ncertRef = linkOf.get(`${c.id}|CBSE Class 12`)?.covered_by;
    if (!ncertRef) continue;
    const { name } = splitPyqCount(c.concept);
    for (const raw of splitCoveredBy(ncertRef)) {
      const { cls, no } = parseCoveredRef(raw, c.class);
      alsoAsked.set(`${cls}|${no}`, name);
    }
  }

  return all
    .filter((c) => c.source === SPINE.ncert && isTopLevelSection(c.section_no))
    .map((c) => {
      const hit = linkOf.get(`${c.id}|${SPINE.stateBoard}`);
      const status = hit?.covered_by ? hit.status : hit?.status ?? "not";
      return { c, hit, status };
    })
    .filter(({ status }) => status === "not" || status === "partial")
    .map(({ c, hit, status }) => ({
      id: c.id,
      cls: c.class,
      chapterNo: c.chapter_no,
      chapterName: c.chapter_name,
      sectionNo: c.section_no,
      concept: c.concept,
      status: status as "not" | "partial",
      note: hit?.note ?? null,
      alsoAskedBy: alsoAsked.get(`${c.class}|${c.section_no}`) ?? null,
    }))
    .sort(
      (a, b) =>
        a.cls - b.cls ||
        a.chapterNo - b.chapterNo ||
        a.sectionNo.localeCompare(b.sectionNo, undefined, { numeric: true }),
    );
}
