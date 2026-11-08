/**
 * The Review tab's "To fix" list (2026-11-08, step 2 of the Home · Review ·
 * Progress redesign): every question waiting in Fix your mistakes, grouped by
 * chapter, each with WHY it is there.
 *
 * NOT A NEW POOL. The questions are the drill's own due pool (lib/drill/compose
 * loadOwnPool, focused like the pulse), so the list's total is the number on
 * the avatar badge and on Home's "Fix N" by construction. This core only
 * groups and labels it.
 *
 * WHY = the newest miss on the question: a question is due when no right
 * answer came after its last miss (lib/drill/select), so the last miss is the
 * one that put it here. A miss is a wrong answer anywhere, a Review later tap
 * (an answer_wrong carrying selfMark) or a No under V's explanation
 * (v_not_understood, 0241).
 *
 * Pure. Spec: tests/review-fix-list.test.ts.
 */
import type { DueQuestion } from "@/lib/drill/select";

/** One miss row, as lib/review/query reads it. */
export type MissRow = {
  questionId: string;
  kind: "answer_wrong" | "v_not_understood";
  at: string;
  /** metadata.surface; null on a mock's own miss. */
  surface: string | null;
  /** metadata.selfMark: set on a Review later tap. */
  selfMark: string | null;
  /** metadata.mockId: set on a mock's own miss. */
  mockId: string | null;
};

export type Reason = "mock" | "practice" | "drill" | "daily" | "v_question" | "review_later" | "v_unclear";

export function reasonOf(row: MissRow): Reason {
  if (row.kind === "v_not_understood") return "v_unclear";
  if (row.selfMark) return "review_later";
  if (row.surface === null) return "mock";
  if (row.surface === "drill") return "drill";
  if (row.surface === "daily") return "daily";
  if (row.surface === "v") return "v_question";
  return "practice";
}

/** What the student reads above the question. `mockTitle` only for "mock". */
export function reasonLabel(reason: Reason, mockTitle?: string | null): string {
  switch (reason) {
    case "mock":
      return mockTitle ? `Wrong in ${mockTitle}` : "Wrong in a mock";
    case "practice":
      return "Wrong in practice";
    case "drill":
      return "Wrong again in Fix your mistakes";
    case "daily":
      return "Wrong in the question of the day";
    case "v_question":
      return "Wrong in a question V asked";
    case "review_later":
      return "You marked Review later";
    case "v_unclear":
      return "You told V you didn't understand";
  }
}

/** The newest miss per question, whatever order the rows arrive in. */
export function latestMisses(rows: readonly MissRow[]): Map<string, MissRow> {
  const out = new Map<string, MissRow>();
  for (const r of rows) {
    const have = out.get(r.questionId);
    if (!have || r.at > have.at) out.set(r.questionId, r);
  }
  return out;
}

export type FixChapter = {
  chapterId: string;
  name: string;
  /** "Mathematics · NDA". */
  place: string;
  count: number;
  /** Wrong answers of every kind (mock, practice, drill, daily, V's card). */
  wrong: number;
  reviewLater: number;
  vUnclear: number;
  /** How many of them are in today's board-plan Fix task. */
  inPlan: number;
};

export type FixList = {
  /** The whole pool, chapter or not: the badge's number. */
  total: number;
  inPlan: number;
  /** Most to fix first, then the newest miss (as /me's Weak spots). */
  chapters: FixChapter[];
};

/** A question with no recorded reason (a read that missed it) counts as wrong. */
function bucketOf(m: MissRow | undefined): "wrong" | "reviewLater" | "vUnclear" {
  if (!m) return "wrong";
  const r = reasonOf(m);
  return r === "review_later" ? "reviewLater" : r === "v_unclear" ? "vUnclear" : "wrong";
}

export function buildFixList(
  due: readonly DueQuestion[],
  misses: ReadonlyMap<string, MissRow>,
  planIds: ReadonlySet<string>
): FixList {
  const groups = new Map<string, FixChapter & { last: string }>();
  let inPlan = 0;
  for (const q of due) {
    const planned = planIds.has(q.questionId);
    if (planned) inPlan += 1;
    if (!q.chapterId) continue;
    let g = groups.get(q.chapterId);
    if (!g) {
      g = { chapterId: q.chapterId, name: q.chapter, place: q.place ?? "", count: 0, wrong: 0, reviewLater: 0, vUnclear: 0, inPlan: 0, last: q.lastWrongAt };
      groups.set(q.chapterId, g);
    }
    g.count += 1;
    g[bucketOf(misses.get(q.questionId))] += 1;
    if (planned) g.inPlan += 1;
    if (q.lastWrongAt > g.last) g.last = q.lastWrongAt;
  }
  const chapters = [...groups.values()]
    .sort((a, b) => b.count - a.count || (a.last < b.last ? 1 : a.last > b.last ? -1 : 0))
    .map(({ last: _last, ...c }) => c);
  return { total: due.length, inPlan, chapters };
}

export type FixQuestion = { questionId: string; reason: Reason; mockId: string | null; at: string; inPlan: boolean };

/** One chapter's questions, newest miss first. */
export function chapterQuestions(
  due: readonly DueQuestion[],
  chapterId: string,
  misses: ReadonlyMap<string, MissRow>,
  planIds: ReadonlySet<string>
): FixQuestion[] {
  return due
    .filter((q) => q.chapterId === chapterId)
    .map((q) => {
      const m = misses.get(q.questionId);
      return {
        questionId: q.questionId,
        reason: m ? reasonOf(m) : "practice",
        mockId: m?.mockId ?? null,
        at: q.lastWrongAt,
        inPlan: planIds.has(q.questionId),
      };
    })
    .sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : a.questionId < b.questionId ? -1 : 1));
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ReviewParams = { list: "fix" | "saved"; chapterId: string | null };

/** `/review`, `/review?list=saved`, `/review?chapter=<id>`. Anything else opens To fix. */
export function parseReviewParams(search: Record<string, string | string[] | undefined>): ReviewParams {
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : null);
  if (one(search.list) === "saved") return { list: "saved", chapterId: null };
  const chapter = one(search.chapter);
  return { list: "fix", chapterId: chapter && UUID_RE.test(chapter) ? chapter.toLowerCase() : null };
}
