/**
 * Joins an authored {@link SessionPlan} to the LIVE syllabus spine and bank.
 *
 * The plan stores refs, never titles — see `types.ts`. Everything a teacher
 * reads on the page other than the cut points is resolved here, so a spine
 * correction or a fresh ingest reaches the plan with no edit to the data file.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { bankSubjectNames } from "@/lib/syllabus/subjects";
import { parseCoveredRef, splitCoveredBy, splitPyqCount } from "@/lib/syllabus/summary";
import type { SessionPlan } from "./types";

/** One resolved book section. */
export type SpineSection = {
  sectionNo: string;
  title: string;
  chapterNo: number;
  chapterName: string;
  seq: number;
  /** Bank PYQ pointing at this section or anything beneath it, by exam. */
  pyqByExam: Record<string, number>;
};

export type PlanContext = {
  /** section_no -> section. */
  sections: Map<string, SpineSection>;
  /** chapter_no -> chapter name, from the book itself. */
  chapterNames: Map<number, string>;
  /** chapter_no -> leaf sections in that chapter (the teachable beats). */
  leafCount: Map<number, number>;
  /** Live chapter name -> PUBLIC questions in the bank, for practice links. */
  practiceByChapter: Map<string, number>;
  /** Exams that contributed any weightage, in a stable order. */
  exams: string[];
};

/**
 * Pages past the PostgREST 1000-row cap, ordered by a UNIQUE key.
 *
 * Both are load-bearing and both have bitten this project: an unpaged select
 * silently truncates (the Maths spine alone is 408 rows and the subject's bank
 * taxonomy adds ~300 more), and LIMIT/OFFSET without a stable ORDER BY lets
 * consecutive pages repeat and skip rows.
 */
async function fetchAll<T>(
  db: SupabaseClient,
  table: string,
  columns: string,
  orderBy: string[],
  filters: (q: ReturnType<ReturnType<SupabaseClient["from"]>["select"]>) => typeof q = (q) => q,
): Promise<T[]> {
  const out: T[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = db.from(table).select(columns) as ReturnType<ReturnType<SupabaseClient["from"]>["select"]>;
    q = filters(q);
    for (const col of orderBy) q = q.order(col, { ascending: true });
    const { data, error } = await q.range(from, from + PAGE - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    const rows = (data ?? []) as unknown as T[];
    out.push(...rows);
    if (rows.length < PAGE) break;
  }
  return out;
}

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

type RawLink = { concept_id: string; exam: string; covered_by: string | null };

/**
 * Everything the page needs to render one plan.
 *
 * Deliberately ONE call per concern rather than a per-session lookup: a session
 * cites up to a dozen refs and a plan holds ~160 sessions, so resolving each
 * one against the database would be ~2,000 round trips for data that fits in
 * two.
 */
export async function loadPlanContext(
  db: SupabaseClient,
  plan: SessionPlan,
): Promise<PlanContext> {
  const [concepts, links] = await Promise.all([
    fetchAll<RawConcept>(
      db,
      "syllabus_concepts",
      "id, source, class, chapter_no, chapter_name, section_no, concept, seq",
      ["id"],
      (q) => q.eq("subject", plan.subject),
    ),
    fetchAll<RawLink>(
      db,
      "syllabus_concept_exams",
      "concept_id, exam, covered_by",
      ["concept_id", "exam"],
      (q) => q.eq("exam", plan.source),
    ),
  ]);

  const byId = new Map(concepts.map((c) => [c.id, c]));
  const book = concepts.filter(
    (c) => c.source === plan.source && c.class === plan.cls,
  );

  // ── weightage: bank subtopic -> the book sections it points at ────────────
  // A ref with no XI/XII prefix defaults to its OWN row's class, which for a
  // bank-taxonomy row is 12 — so on this Std XI plan a bare ref is correctly
  // NOT counted. Measured: every Maths bank ref is prefixed, so nothing is lost.
  const pyqByExam = new Map<string, Map<string, number>>();
  const examsSeen = new Set<string>();
  for (const link of links) {
    const concept = byId.get(link.concept_id);
    if (!concept || !concept.source.includes("bank taxonomy")) continue;
    if (!link.covered_by) continue;
    const exam = concept.source.replace(" bank taxonomy", "");
    const { pyq } = splitPyqCount(concept.concept);
    if (!pyq) continue;
    // One bank row pointing at 5.1 AND 5.3 is one topic, so its PYQ counts once
    // per section it names — but never twice for the same section.
    const seen = new Set<string>();
    for (const raw of splitCoveredBy(link.covered_by)) {
      const { cls, no } = parseCoveredRef(raw, concept.class);
      if (cls !== plan.cls || seen.has(no)) continue;
      seen.add(no);
      examsSeen.add(exam);
      const perExam = pyqByExam.get(exam) ?? new Map<string, number>();
      perExam.set(no, (perExam.get(no) ?? 0) + pyq);
      pyqByExam.set(exam, perExam);
    }
  }

  // ── resolve the book itself ───────────────────────────────────────────────
  const sections = new Map<string, SpineSection>();
  const chapterNames = new Map<number, string>();
  const leafCount = new Map<number, number>();
  const allRefs = new Set(book.map((c) => c.section_no));

  for (const row of book) {
    chapterNames.set(row.chapter_no, row.chapter_name);
    // A leaf is a section nothing sits beneath — one teachable beat. This is
    // what normalises pacing across books of different depth, so it is counted
    // from the spine rather than assumed.
    const isLeaf = ![...allRefs].some((r) => r.startsWith(`${row.section_no}.`));
    if (isLeaf) leafCount.set(row.chapter_no, (leafCount.get(row.chapter_no) ?? 0) + 1);

    const perSection: Record<string, number> = {};
    for (const [exam, weights] of pyqByExam) {
      let total = 0;
      for (const [no, pyq] of weights) {
        if (no === row.section_no || no.startsWith(`${row.section_no}.`)) total += pyq;
      }
      if (total) perSection[exam] = total;
    }

    sections.set(row.section_no, {
      sectionNo: row.section_no,
      title: row.concept,
      chapterNo: row.chapter_no,
      chapterName: row.chapter_name,
      seq: row.seq,
      pyqByExam: perSection,
    });
  }

  return {
    sections,
    chapterNames,
    leafCount,
    practiceByChapter: await loadPracticeCounts(db, plan),
    exams: [...examsSeen].sort(),
  };
}

/**
 * PUBLIC questions per chapter of the bank exam that mirrors this book.
 *
 * Counted through the facets RPC rather than a row-payload `.select()`: the
 * chapters here run to 264 questions each and the whole subject is ~2,900, so
 * deriving a count from returned rows would hit the 1000-row cap and
 * under-report silently.
 */
async function loadPracticeCounts(
  db: SupabaseClient,
  plan: SessionPlan,
): Promise<Map<string, number>> {
  const out = new Map<string, number>();
  const { data: exam } = await db.from("exams").select("id").eq("name", plan.bankExam).maybeSingle();
  if (!exam) return out;

  // bankSubjectNames widens the join where a bank spells the subject
  // differently — JEE's row is "Maths" where the spine says "Mathematics".
  const { data: subjects } = await db
    .from("subjects")
    .select("id")
    .eq("exam_id", exam.id)
    .in("name", bankSubjectNames(plan.subject));
  if (!subjects?.length) return out;

  for (const subject of subjects) {
    const [chaptersRes, facetsRes] = await Promise.all([
      db.from("chapters").select("id, name").eq("subject_id", subject.id),
      // p_kind takes the SENTINEL 'all', never null — and this is a footgun
      // worth knowing, because the same signature mixes two conventions:
      // p_exam_id/p_subject_id are `is null or col = $n` (null means any) while
      // p_kind/p_format are `$n = 'all' or col = $n`. Passing null to the
      // second kind makes the predicate NULL for every row, so the call returns
      // ZERO rows with no error — indistinguishable from "this subject has no
      // questions". Measured: null -> 0 rows, 'practice' -> 18.
      //
      // 'all' rather than 'practice' because a teacher wants whatever is
      // available to set. It is the same answer for Std XI (practice-only), and
      // the right one for a Std XII plan, where the bank holds both kinds.
      db.rpc("get_chapter_facets", {
        p_exam_id: exam.id,
        p_subject_id: subject.id,
        p_difficulties: null,
        p_pyq_years: null,
        p_q: null,
        p_kind: "all",
      }),
    ]);
    // Best-effort, but SURFACED — a silently swallowed error here is how a
    // whole column of zeroes reads as "no questions exist" rather than "the
    // lookup failed".
    if (facetsRes.error) {
      console.warn(`[planner] practice counts failed: ${facetsRes.error.message}`);
      continue;
    }
    const names = new Map((chaptersRes.data ?? []).map((c) => [c.id, c.name]));
    for (const row of (facetsRes.data ?? []) as { chapter_id: string; q_count: number }[]) {
      const name = names.get(row.chapter_id);
      if (!name) continue;
      out.set(name, (out.get(name) ?? 0) + Number(row.q_count ?? 0));
    }
  }
  return out;
}
