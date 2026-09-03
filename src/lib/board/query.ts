import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Data layer for the `/board` reader — the book-faithful, exercise-by-exercise
 * view of a school-board textbook chapter. Ordering + grouping ride the
 * section_* columns (migration 0043): questions read in `(section_seq,
 * source_row)` order, blocks group by `section_label`, and blocks with the same
 * `section_group` sit under one book-section header (e.g. all of "2.2 Inverse of
 * a Matrix"). This is orthogonal to the conceptual `subtopic` axis used by
 * /browse + /notes — see scripts/stateboard/sections.ts + migration 0043.
 *
 * Anon client + RLS → PUBLIC rows only. A chapter is "on /board" once it has at
 * least one row with a non-null section_seq (i.e. it's been backfilled).
 */

export type SectionKind = "solved_example" | "exercise" | "miscellaneous";

export type BoardOption = {
  label: string;
  text: string;
  isCorrect: boolean;
  imageUrl: string | null;
};

export type BoardQuestion = {
  id: string;
  questionNumber: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  imageUrl: string | null;
  solutionImageUrl: string | null;
  format: "mcq" | "subjective";
  setId: string | null;
  options: BoardOption[];
};

/** A block = one book sub-section (a run of Solved Examples, one Exercise, or a
 *  Miscellaneous part), its questions in book order. */
export type BoardBlock = {
  seq: number;
  label: string;
  kind: SectionKind;
  questions: BoardQuestion[];
};

/** A group = one numbered book section header spanning its blocks (e.g. "2.2
 *  Inverse of a Matrix" → its Solved Examples + Exercise). */
export type BoardSectionGroup = {
  group: string;
  blocks: BoardBlock[];
};

/**
 * Does this group draw any sub-headings of its own?
 *
 * A block whose label repeats its group's name gets NO heading in the reader —
 * the group header already names it (e.g. "Exercise 8.1", one block, same
 * string).
 */
export function groupHasSubHeaders(group: BoardSectionGroup): boolean {
  return group.blocks.some((b) => b.label !== group.group);
}

/**
 * Which groups the reader opens on load, in order.
 *
 * The reader opens as an OUTLINE, so a group is folded only when folding it
 * actually uncovers something:
 *   • has sub-headings → OPEN, revealing them (they are the outline).
 *   • no sub-headings, but sibling groups exist → CLOSED. Open, it would draw an
 *     expanded chevron above a heading-less run of questions, which reads as a
 *     bug; closed, it is one line of a real table of contents.
 *   • no sub-headings AND the chapter's only group → OPEN. Measured on the live
 *     bank (2026-09-02): 71 of 168 board chapters are shaped this way — one
 *     group called "Exercise" holding one identically-named block, the MH SSC 10
 *     and MH SB 9 humanities shape. Folding those hides the WHOLE chapter behind
 *     a click and shows no outline in return, because there are no siblings to
 *     reveal. That is strictly worse than not folding at all.
 */
export function defaultOpenGroups(groups: BoardSectionGroup[]): boolean[] {
  return groups.map((g) => groups.length === 1 || groupHasSubHeaders(g));
}

export type BoardChapter = {
  examName: string;
  subjectName: string;
  chapterName: string;
  total: number;
  groups: BoardSectionGroup[];
};

/** URL slug from a taxonomy name. "Pair of Straight Lines" → "pair-of-straight-lines". */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type SectionedQuestion = BoardQuestion & {
  sectionSeq: number;
  sectionGroup: string;
  sectionLabel: string;
  sectionKind: SectionKind;
};

/**
 * Fold section-ordered questions into the reader's two-level shape
 * (group → block → questions). PURE. Input MUST already be sorted by
 * `(sectionSeq, source_row)`; a new block starts when `sectionSeq` changes, a
 * new group when `sectionGroup` changes. Contiguity is guaranteed by the
 * backfill (each block's rows are contiguous; a group's blocks are consecutive
 * in seq — verified against the source PDF).
 */
export function groupBoardSections(items: SectionedQuestion[]): BoardSectionGroup[] {
  const groups: BoardSectionGroup[] = [];
  let curGroup: BoardSectionGroup | null = null;
  let curBlock: BoardBlock | null = null;

  for (const q of items) {
    if (!curGroup || curGroup.group !== q.sectionGroup) {
      curGroup = { group: q.sectionGroup, blocks: [] };
      groups.push(curGroup);
      curBlock = null;
    }
    if (!curBlock || curBlock.seq !== q.sectionSeq) {
      curBlock = { seq: q.sectionSeq, label: q.sectionLabel, kind: q.sectionKind, questions: [] };
      curGroup.blocks.push(curBlock);
    }
    curBlock.questions.push({
      id: q.id,
      questionNumber: q.questionNumber,
      text: q.text,
      context: q.context,
      solution: q.solution,
      imageUrl: q.imageUrl,
      solutionImageUrl: q.solutionImageUrl,
      format: q.format,
      setId: q.setId,
      options: q.options,
    });
  }
  return groups;
}

type RawOption = { label: string; text: string; is_correct: boolean; image_url: string | null };
type RawRow = {
  id: string;
  question_number: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  image_url: string | null;
  solution_image_url: string | null;
  question_format: "mcq" | "subjective";
  set_id: string | null;
  section_seq: number;
  section_group: string;
  section_label: string;
  section_kind: SectionKind;
  options: RawOption[] | null;
};

function mapRow(r: RawRow): SectionedQuestion {
  return {
    id: r.id,
    questionNumber: r.question_number,
    text: r.text,
    context: r.context,
    solution: r.solution,
    imageUrl: r.image_url,
    solutionImageUrl: r.solution_image_url,
    format: r.question_format,
    setId: r.set_id,
    options: (r.options ?? [])
      .map((o) => ({ label: o.label, text: o.text, isCorrect: o.is_correct, imageUrl: o.image_url }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    sectionSeq: r.section_seq,
    sectionGroup: r.section_group,
    sectionLabel: r.section_label,
    sectionKind: r.section_kind,
  };
}

/** Resolve an (examName, subjectRoute, chapterSlug) URL triple to DB rows. Slug
 *  match happens in JS (taxonomy names aren't stored as slugs). Returns null if
 *  the exam, subject, or a backfilled chapter isn't found. */
export async function resolveBoardChapter(
  client: SupabaseClient,
  examName: string,
  subjectRoute: string,
  chapterSlug: string
): Promise<{ examId: string; subjectId: string; chapterId: string; subjectName: string; chapterName: string } | null> {
  const { data: exam } = await client.from("exams").select("id").eq("name", examName).maybeSingle();
  if (!exam) return null;

  const { data: subjects } = await client
    .from("subjects")
    .select("id, name")
    .eq("exam_id", (exam as { id: string }).id);
  const subject = (subjects ?? []).find((s) => slugify((s as { name: string }).name) === subjectRoute) as
    | { id: string; name: string }
    | undefined;
  if (!subject) return null;

  const { data: chapters } = await client
    .from("chapters")
    .select("id, name")
    .eq("subject_id", subject.id);
  const chapter = (chapters ?? []).find((c) => slugify((c as { name: string }).name) === chapterSlug) as
    | { id: string; name: string }
    | undefined;
  if (!chapter) return null;

  return {
    examId: (exam as { id: string }).id,
    subjectId: subject.id,
    chapterId: chapter.id,
    subjectName: subject.name,
    chapterName: chapter.name,
  };
}

/** Load one chapter's book-ordered sections for the reader. Returns null when
 *  the chapter has no backfilled (section_seq) PUBLIC rows. */
export async function getBoardChapter(
  client: SupabaseClient,
  opts: { examId: string; chapterId: string; examName: string; subjectName: string; chapterName: string }
): Promise<BoardChapter | null> {
  const { data, error } = await client
    .from("questions")
    .select(
      `id, question_number, text, context, solution, image_url, solution_image_url,
       question_format, set_id, section_seq, section_group, section_label, section_kind,
       options(label, text, is_correct, image_url)`
    )
    .eq("exam_id", opts.examId)
    .eq("chapter_id", opts.chapterId)
    .not("section_seq", "is", null)
    .order("section_seq", { ascending: true })
    .order("source_row", { ascending: true, nullsFirst: false })
    .order("id", { ascending: true });
  if (error) throw new Error(`board chapter query: ${error.message}`);

  const rows = (data ?? []) as RawRow[];
  if (rows.length === 0) return null;

  return {
    examName: opts.examName,
    subjectName: opts.subjectName,
    chapterName: opts.chapterName,
    total: rows.length,
    groups: groupBoardSections(rows.map(mapRow)),
  };
}

export type BoardChapterLink = {
  name: string;
  chapterSlug: string;
  subjectRoute: string;
  count: number;
};

/** List the backfilled chapters for a board exam (for the exam hub), grouped by
 *  subject in the subject's `order_index` then chapter `order_index`. Only
 *  chapters with section-structured PUBLIC rows appear. */
export async function listBoardChapters(
  client: SupabaseClient,
  examName: string
): Promise<{ subjectName: string; subjectRoute: string; chapters: BoardChapterLink[] }[]> {
  const { data: exam } = await client.from("exams").select("id").eq("name", examName).maybeSingle();
  if (!exam) return [];

  // Page through in 1000-row windows and aggregate. PostgREST caps a raw select
  // at 1000 rows, so a single unpaged select silently DROPS whole chapters once
  // an exam's total backfilled rows exceed 1000 (MH-HSC-12 crossed 1000 in
  // 2026-07 and lost 3 chapters from this index). We only need the DISTINCT set +
  // per-chapter counts, so accumulate across pages until a short page.
  const PAGE = 1000;
  const data: { chapter: unknown; subject: unknown }[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data: page, error } = await client
      .from("questions")
      .select(
        `chapter:chapters!chapter_id(id, name, order_index),
         subject:subjects!subject_id(id, name)`
      )
      .eq("exam_id", (exam as { id: string }).id)
      .not("section_seq", "is", null)
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`board chapter list: ${error.message}`);
    const rows = (page ?? []) as { chapter: unknown; subject: unknown }[];
    data.push(...rows);
    if (rows.length < PAGE) break;
  }

  const flat = (v: unknown): { id: string; name: string; order_index?: number | null } | null => {
    const x = Array.isArray(v) ? v[0] : v;
    return (x as { id: string; name: string }) ?? null;
  };

  // Aggregate counts per (subject, chapter) from the fully-paged row set.
  const bySubject = new Map<
    string,
    { subjectName: string; subjectRoute: string; chapters: Map<string, BoardChapterLink & { order: number }> }
  >();
  for (const r of (data ?? []) as { chapter: unknown; subject: unknown }[]) {
    const ch = flat(r.chapter);
    const sub = flat(r.subject);
    if (!ch || !sub) continue;
    const subjectRoute = slugify(sub.name);
    let s = bySubject.get(sub.id);
    if (!s) {
      s = { subjectName: sub.name, subjectRoute, chapters: new Map() };
      bySubject.set(sub.id, s);
    }
    const link = s.chapters.get(ch.id);
    if (link) link.count++;
    else
      s.chapters.set(ch.id, {
        name: ch.name,
        chapterSlug: slugify(ch.name),
        subjectRoute,
        count: 1,
        order: ch.order_index ?? 0,
      });
  }

  return [...bySubject.values()].map((s) => ({
    subjectName: s.subjectName,
    subjectRoute: s.subjectRoute,
    chapters: [...s.chapters.values()]
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
      .map(({ order: _order, ...link }) => link),
  }));
}
