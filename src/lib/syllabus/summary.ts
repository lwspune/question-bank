/**
 * Pure helpers for the syllabus concept map view (migration 0065).
 *
 * Rulings are currently authored at chapter grain, so every concept in a chapter
 * shares a status — but nothing in the schema guarantees that, and a later
 * per-concept refinement is the whole reason the rows are per-concept. So the
 * chapter roll-up computes the real answer rather than sampling one row.
 */

export const SYLLABUS_EXAMS = [
  "MH State Board",
  "NDA",
  "MHT-CET",
  "JEE Mains",
  "CBSE Class 12",
] as const;

export type SyllabusExam = (typeof SYLLABUS_EXAMS)[number];

export type ConceptStatus = "full" | "partial" | "not";

/**
 * `null`    — no ruling for this exam yet (NOT the same as out-of-syllabus).
 * `"mixed"` — concepts within one chapter disagree, so the chapter cannot be
 *             summarised by a single status and the detail view must be opened.
 */
export type ChapterStatus = ConceptStatus | "mixed" | null;

export const STATUS_LABEL: Record<ConceptStatus, string> = {
  full: "In syllabus",
  partial: "Partly",
  not: "Not in syllabus",
};

/** Short cell text. Never rely on colour alone to convey the status. */
export const STATUS_SHORT: Record<ConceptStatus, string> = {
  full: "Yes",
  partial: "Part",
  not: "—",
};

/**
 * What one book-column cell of a mapping table is actually saying.
 *
 * `"diffuse"` and `"unassessed"` are the pair worth separating, and they were
 * conflated on the shipped page: the cell branched only on `status === "not"`,
 * so a row with NO RULING fell into the same arm as a row ruled covered-but-
 * scattered and rendered "no single section". That reads as a finding about the
 * book — it teaches this, just not in one place — when in fact nobody had looked.
 * It went live for 53 JEE Chemistry subtopics (318 PYQ) the moment that spine was
 * refreshed, against 2 genuinely diffuse rows, so 96% of the phrase was false.
 *
 * Same failure as an unreviewed pair defaulting to `full` in the data, one layer
 * out: absence of review must never borrow the wording of a review.
 */
export type CoverCellState = "located" | "not-covered" | "diffuse" | "unassessed";

export function coverCellState(
  cover: { status: ConceptStatus | null; refs: unknown[] } | undefined,
): CoverCellState {
  // Checked FIRST. A missing row and a null status both mean nobody ruled on
  // this pair, and no later branch may claim otherwise.
  if (!cover || cover.status === null) return "unassessed";
  // Sections named beats the verdict word: a partial ruling that points at two
  // sections is still a located topic, and the "partly" badge carries the nuance.
  if (cover.refs.length > 0) return "located";
  return cover.status === "not" ? "not-covered" : "diffuse";
}

export function rollUpChapterStatus(statuses: (ConceptStatus | null)[]): ChapterStatus {
  if (statuses.length === 0) return null;
  const present = statuses.filter((s): s is ConceptStatus => s !== null);
  // Any unassessed concept makes the chapter unassessed: reporting a status
  // derived from only the assessed subset would overstate what was reviewed.
  if (present.length !== statuses.length) return present.length === 0 ? null : "mixed";
  const first = present[0];
  return present.every((s) => s === first) ? first : "mixed";
}

export type ExamTally = { full: number; partial: number; not: number; unassessed: number };

export function tallyByExam(
  statuses: (ConceptStatus | null)[],
  totalConcepts: number,
): ExamTally {
  const t: ExamTally = { full: 0, partial: 0, not: 0, unassessed: 0 };
  for (const s of statuses) {
    if (s) t[s] += 1;
  }
  t.unassessed = totalConcepts - statuses.filter((s) => s !== null).length;
  return t;
}

/**
 * The section a concept rolls up into, one level below the chapter: "1.2.1" -> "1.2".
 * A top-level section is its own group, so grouping by this key never drops a row.
 *
 * Matches on the leading numeric pair rather than splitting on ".", so lettered
 * refs ("5.4 (a)", used by the NCERT-sourced concepts) group under their parent
 * instead of each becoming a singleton. Anything unparseable falls back to
 * itself — a row we cannot place must still be shown, never silently lost.
 */
export function sectionGroupKey(sectionNo: string): string {
  const m = /^(\d+)\.(\d+)/.exec(sectionNo.trim());
  return m ? `${m[1]}.${m[2]}` : sectionNo.trim();
}

export function isTopLevelSection(sectionNo: string): boolean {
  return sectionGroupKey(sectionNo) === sectionNo.trim();
}

/**
 * The spine a row belongs to. `syllabus_concepts.source` names the book or bank
 * a row was extracted from, and rows from different spines must never be mixed:
 * every spine numbers its chapters from 1, so a query filtered on subject alone
 * folds State Board Ch.1, NCERT Ch.1 and the exam-bank rows into one chapter.
 *
 * These name BOOKS, not subjects, so they are shared across subjects rather than
 * per-subject: Physics and Chemistry both live under "MH State Board" and are
 * separated by the `subject` column. Scoping a query needs BOTH — source alone
 * merges two subjects' Ch.1, subject alone merges three books' Ch.1.
 */
export const SPINE = {
  stateBoard: "MH State Board",
  ncert: "NCERT",
  jee: "JEE Mains bank taxonomy",
  cet: "MHT-CET bank taxonomy",
  nda: "NDA bank taxonomy",
} as const;

/**
 * Which syllabus an exam column is asking about when it sits on an EXAM-spine
 * row. On the State Board spine the column means "does exam X require this?";
 * on an exam spine it means "does book Y cover this?", so the same column name
 * points at a different book.
 */
export const BOOK_OF_EXAM: Record<string, string> = {
  "MH State Board": SPINE.stateBoard,
  "CBSE Class 12": SPINE.ncert,
};

/** The suffix that marks a `source` as an exam's bank taxonomy rather than a book. */
const EXAM_SPINE_SUFFIX = " bank taxonomy";

export function isExamSpine(source: string): boolean {
  return source.endsWith(EXAM_SPINE_SUFFIX);
}

/**
 * "NDA bank taxonomy" -> "NDA": the exam whose PYQs a spine was sampled from,
 * and so the exam whose `questions` rows decide which of its chapters are dead.
 *
 * Anchored to the END of the string, so a book spine passes through unchanged
 * rather than being silently mangled into a plausible-looking exam name.
 */
export function examOfSpine(source: string): string {
  return isExamSpine(source) ? source.slice(0, -EXAM_SPINE_SUFFIX.length) : source;
}

/** "Diazonium Salts (12 PYQ)" -> { name, pyq }. Exam spines carry the count in the name. */
export function splitPyqCount(concept: string): { name: string; pyq: number } {
  const m = /^(.*?)\s*\((\d+)\s*PYQ\)\s*$/.exec(concept);
  return m ? { name: m[1], pyq: Number(m[2]) } : { name: concept, pyq: 0 };
}

/**
 * Parse one covered_by reference. An `XI:` / `XII:` prefix names the school YEAR
 * explicitly; without one the ref belongs to the same year as the row it sits on.
 * Cross-year mappings are the common case in this data, so a bare number cannot
 * be assumed to mean the row's own year without that default being stated.
 */
export function parseCoveredRef(ref: string, defaultCls: number): { cls: number; no: string } {
  const m = /^(XI|XII):(.+)$/.exec(ref.trim());
  if (!m) return { cls: defaultCls, no: ref.trim() };
  return { cls: m[1] === "XII" ? 12 : 11, no: m[2].trim() };
}

export function splitCoveredBy(coveredBy: string): string[] {
  return coveredBy
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

/** A stable, URL-safe key for one chapter of one class. */
export function chapterKey(cls: number, chapterNo: number): string {
  return `${cls}-${chapterNo}`;
}

export function parseChapterKey(key: string): { cls: number; chapterNo: number } | null {
  const m = /^(\d{1,2})-(\d{1,2})$/.exec(key);
  if (!m) return null;
  const cls = Number(m[1]);
  const chapterNo = Number(m[2]);
  if (cls < 9 || cls > 12 || chapterNo < 1) return null;
  return { cls, chapterNo };
}

/**
 * Which chapter of a BOOK does an exam chapter mostly live in?
 *
 * Used to order an exam-spine table along the book a teacher actually teaches
 * from, WITHOUT breaking each exam chapter apart. Ordering rows by their own
 * State Board pointer was built and reverted: it scattered "what does JEE ask
 * in Amines" across the whole table. Ordering whole CHAPTERS by their dominant
 * book chapter keeps each one intact and still reads down the book.
 *
 * Dominance is by PYQ weight, not by earliest pointer. A chapter that touches
 * Std XI Ch.2 with a single subtopic but has 39 questions in Std XII Ch.8
 * belongs at Ch.8; sorting on the earliest pointer would file it near the front
 * of the book on the strength of one question.
 */
export type DominantSbInput = {
  chapterName: string;
  pyq: number;
  refs: { cls: number; no: string; chapterLabel: string }[];
};
export type DominantSb = { label: string; cls: number; chapterNo: number; pyq: number };

export function dominantSbByChapter(rows: DominantSbInput[]): Map<string, DominantSb> {
  // chapterName -> book chapter label -> PYQ behind it
  const weights = new Map<string, Map<string, { cls: number; chapterNo: number; pyq: number }>>();
  for (const r of rows) {
    const perChapter = weights.get(r.chapterName) ?? new Map();
    // De-duplicated per ROW: a row pointing at 5.1 and 5.3 is one topic in one
    // chapter, and counting its PYQ twice would inflate that chapter.
    const seen = new Set<string>();
    for (const ref of r.refs) {
      if (seen.has(ref.chapterLabel)) continue;
      seen.add(ref.chapterLabel);
      const prev = perChapter.get(ref.chapterLabel);
      // A subtopic straddling two chapters counts its PYQ against BOTH — the
      // question genuinely needs both, so splitting the count understates each.
      perChapter.set(ref.chapterLabel, {
        cls: ref.cls,
        chapterNo: Number(ref.no.split(".")[0]) || 0,
        pyq: (prev?.pyq ?? 0) + r.pyq,
      });
    }
    weights.set(r.chapterName, perChapter);
  }

  const out = new Map<string, DominantSb>();
  for (const [chapterName, perChapter] of weights) {
    // A chapter with no pointer into the book at all is deliberately ABSENT
    // rather than given a placeholder: it has no position in book order, and
    // callers sort it last instead of inventing one.
    const best = [...perChapter.entries()].sort(
      (a, b) =>
        b[1].pyq - a[1].pyq ||
        // Ties break to the EARLIER chapter, so the answer does not depend on
        // the order rows happened to arrive in.
        a[1].cls - b[1].cls ||
        a[1].chapterNo - b[1].chapterNo,
    )[0];
    if (best) out.set(chapterName, { label: best[0], ...best[1] });
  }
  return out;
}

/** Sort key along the book. A chapter with no home in it sorts last. */
export function sbBookOrder(d: DominantSb | undefined): number {
  if (!d) return Number.MAX_SAFE_INTEGER;
  return d.cls * 1000 + d.chapterNo;
}

/**
 * A three-book alignment row: one State Board subtopic, one NCERT subtopic, one
 * JEE subtopic. Any cell may be blank and any value may repeat across rows —
 * that repetition is what lets the table stay honest, because it removes the
 * need to squeeze a many-to-many mapping into a single cell.
 *
 * Anchored on the State Board at 1.x grain: deeper pointers roll up to their
 * parent section. That IS lossy — a pointer authored at 5.8.7 shows on the 5.8
 * row, so a JEE topic can appear beside a parent section named something else —
 * but 1.x is the grain the books are navigated at.
 */
export type AlignSide = {
  id: string;
  label: string;
  chapterLabel: string;
  pyq?: number;
  oldSyllabus?: boolean;
};
export type AlignAnchor = {
  id: string;
  cls: number;
  chapterNo: number;
  chapterName: string;
  sectionNo: string;
  concept: string;
};
export type AlignPointer = {
  spine: "ncert" | "jee";
  side: AlignSide;
  /** Class of the TARGET section, not of the pointing row. */
  cls: number;
  sectionNo: string;
};
export type AlignmentRow = { anchor: AlignAnchor; ncert: AlignSide | null; jee: AlignSide | null };

export function buildAlignmentRows(
  anchors: AlignAnchor[],
  pointers: AlignPointer[],
  /** `${jeeId}|${ncertId}` for every pairing an author actually wrote. */
  authoredPairs: Set<string>,
): AlignmentRow[] {
  // Keyed by CLASS as well as section: both State Board years number their
  // sections from 1, so a Std XII pointer would otherwise land on the Std XI
  // section of the same number.
  const key = (cls: number, sectionNo: string) => `${cls}|${sectionGroupKey(sectionNo)}`;

  const inbound = new Map<string, { ncert: AlignSide[]; jee: AlignSide[] }>();
  for (const a of anchors) inbound.set(key(a.cls, a.sectionNo), { ncert: [], jee: [] });
  for (const p of pointers) {
    const bucket = inbound.get(key(p.cls, p.sectionNo));
    if (!bucket) continue; // points somewhere this book does not have — not ours to show
    const list = p.spine === "ncert" ? bucket.ncert : bucket.jee;
    // Once per anchor. A source pointing at 5.5, 5.5.1 and 5.5.2 is ONE mapping
    // at 1.x grain; counting it three times would repeat the row and, worse,
    // repeat its PYQ count as though the topic carried triple the weight.
    if (!list.some((s) => s.id === p.side.id)) list.push(p.side);
  }

  const rows: AlignmentRow[] = [];
  for (const anchor of anchors) {
    const { ncert, jee } = inbound.get(key(anchor.cls, anchor.sectionNo))!;
    const pairedN = new Set<string>();
    const pairedJ = new Set<string>();
    for (const j of jee) {
      for (const n of ncert) {
        if (!authoredPairs.has(`${j.id}|${n.id}`)) continue;
        rows.push({ anchor, ncert: n, jee: j });
        pairedN.add(n.id);
        pairedJ.add(j.id);
      }
    }
    // Everything left over gets its OWN row rather than being paired off with
    // whatever else happens to share this section. Co-location is not
    // equivalence: tested against the authored edge, pairing through a shared
    // State Board section invents ~39 correspondences that were never made.
    for (const n of ncert) if (!pairedN.has(n.id)) rows.push({ anchor, ncert: n, jee: null });
    for (const j of jee) if (!pairedJ.has(j.id)) rows.push({ anchor, ncert: null, jee: j });
    // An anchor nothing points at still gets a row: that is the skip list —
    // State Board content neither book asks for — and it only reads as a
    // finding if it is visible.
    if (ncert.length === 0 && jee.length === 0) rows.push({ anchor, ncert: null, jee: null });
  }

  return rows.sort(
    (a, b) =>
      a.anchor.cls - b.anchor.cls ||
      a.anchor.chapterNo - b.anchor.chapterNo ||
      a.anchor.sectionNo.localeCompare(b.anchor.sectionNo, undefined, { numeric: true }),
  );
}
