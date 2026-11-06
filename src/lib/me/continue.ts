/**
 * /me's Continue card (2026-11-06): the places a student was last working,
 * newest first, one entry per place.
 *
 * It replaced "Keep reading", which listed notes topics only. On 2026-11-05
 * the bank took ~25,000 answers in 30 days and /board ~6,000, and /me pointed
 * back at neither. Four sources: a bank chapter and a /board chapter (from the
 * student's last answers), a notes topic, and a homework plan.
 *
 * Pure. Spec: tests/me-continue.test.ts.
 */
import { slugify } from "@/lib/slug";
import { dayHref, planHref } from "@/lib/homework/links";

export type ContinueKind = "bank" | "board" | "notes" | "homework";

export type ContinueItem = {
  /** One entry per place: `<kind>:<chapter id>`, a notes topic, a plan slug. */
  key: string;
  kind: ContinueKind;
  title: string;
  subtitle: string;
  href: string;
  /** When they were last there (ISO); the order key. */
  at: string;
  /** Set on a homework entry: the browser fills in the day count. */
  planSlug?: string;
};

export const CONTINUE_LIMIT = 3;

/** Newest first, one per key (the newest visit kept), `limit` at most. */
export function pickContinue(items: readonly ContinueItem[], limit = CONTINUE_LIMIT): ContinueItem[] {
  const byKey = new Map<string, ContinueItem>();
  for (const i of items) {
    const prev = byKey.get(i.key);
    if (!prev || i.at > prev.at) byKey.set(i.key, i);
  }
  return [...byKey.values()].sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0)).slice(0, limit);
}

/** One recent answer: `surface` is user_activity metadata.surface. */
export type PracticeRow = { questionId: string; at: string; surface: string | null };

/** Where a question's chapter sits, read with the answer rows. */
export type ChapterInfo = {
  chapterId: string;
  chapterName: string;
  subjectId: string;
  subjectName: string;
  examId: string;
  examName: string;
  /** The exam's registry slug, or null for an exam the registry does not list. */
  examSlug: string | null;
  /** The chapter's /questions page, or null when it has none. */
  landingHref: string | null;
};

/**
 * Bank and /board entries from the student's recent answers. Only answers given
 * on those two surfaces count: the drill has its own lead on /me, and a V or
 * guide answer is not a place to go back to. A /board entry needs a registered
 * board exam (`boardExams`), else its link would 404.
 */
export function practiceContinue(
  rows: readonly PracticeRow[],
  chapterOf: ReadonlyMap<string, ChapterInfo>,
  boardExams: ReadonlySet<string>
): ContinueItem[] {
  const out: ContinueItem[] = [];
  for (const r of rows) {
    if (r.surface !== "bank" && r.surface !== "board") continue;
    const c = chapterOf.get(r.questionId);
    if (!c) continue;
    const subtitle = `${c.subjectName} · ${c.examName}`;
    if (r.surface === "bank") {
      const href =
        c.landingHref ??
        `/browse?${new URLSearchParams({ examId: c.examId, subjectId: c.subjectId, chapterIds: c.chapterId }).toString()}`;
      out.push({ key: `bank:${c.chapterId}`, kind: "bank", title: c.chapterName, subtitle, href, at: r.at });
    } else {
      if (!c.examSlug || !boardExams.has(c.examSlug)) continue;
      const href = `/board/${c.examSlug}/${slugify(c.subjectName)}/${slugify(c.chapterName)}`;
      out.push({ key: `board:${c.chapterId}`, kind: "board", title: c.chapterName, subtitle, href, at: r.at });
    }
  }
  return pickContinue(out, Number.POSITIVE_INFINITY);
}

/** The four numbers a homework entry needs from /api/homework/progress. */
export type HomeworkProgressLite = {
  started: boolean;
  nextDay: number | null;
  doneDays: number;
  totalDays: number;
};

/** A homework entry's line and where it leads, once its progress is known. */
export function homeworkLine(plan: { slug: string }, p: HomeworkProgressLite): { line: string; href: string } {
  if (p.nextDay === null) return { line: `All ${p.totalDays} days done`, href: planHref(plan.slug) };
  if (!p.started) return { line: `${p.totalDays} days · start with day ${p.nextDay}`, href: dayHref(plan.slug, p.nextDay) };
  return { line: `Day ${p.nextDay} next · ${p.doneDays} of ${p.totalDays} days done`, href: dayHref(plan.slug, p.nextDay) };
}

/** `/homework/<plan>[/...]` -> the plan's slug. `/homework/exam/<exam>` is an
 *  exam's list of plans, not a plan. */
export function planSlugOf(path: string | null): string | null {
  if (!path) return null;
  const seg = path.split("/");
  if (seg[1] !== "homework" || !seg[2] || seg[2] === "exam") return null;
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(seg[2]) ? seg[2] : null;
}
