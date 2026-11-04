/**
 * Where homework is linked from (2026-10-10): a board subject tab, the exam's
 * home page, and each plan's day pages. Pure; spec tests/homework-links.test.ts.
 */
export type HomeworkPlanLink = {
  slug: string;
  examName: string;
  subjectName: string;
  perDay: number;
  /** The plan's own title ("CBSE Class 12 Maths"), for a list of plans. */
  title?: string;
};

export const planHref = (slug: string) => `/homework/${slug}`;
export const dayHref = (slug: string, day: number) => `/homework/${slug}/day/${day}`;

/** Every published plan, grouped by exam: the Homework tab when no exam is chosen. */
export const HOMEWORK_HUB = "/homework";
/** One exam's plans (2026-11-04), the Homework tab's target once an exam is chosen. */
export const examHomeworkPageHref = (examSlug: string) => `/homework/exam/${examSlug}`;
/** A plan's chapters, each opening its Top 10 PYQs (2026-11-04). */
export const topListHref = (planSlug: string) => `/homework/${planSlug}/top`;
export const topChapterHref = (planSlug: string, chapterSlug: string) => `/homework/${planSlug}/top/${chapterSlug}`;
/** Every question of one repeat or type in a plan (2026-11-04), numbered from 1. */
export const groupHref = (planSlug: string, n: number) => `/homework/${planSlug}/group/${n}`;

/** The homework card on a board subject tab, or null when that subject has no plan. */
export function subjectHomework(
  plans: readonly HomeworkPlanLink[],
  examName: string,
  subjectName: string
): { href: string; perDay: number } | null {
  const p = plans.find((x) => x.examName === examName && x.subjectName === subjectName);
  return p ? { href: planHref(p.slug), perDay: p.perDay } : null;
}

/** The exam home's homework button: the plan itself, the list when there are several, or none. */
export function examHomeworkHref(plans: readonly HomeworkPlanLink[], examName: string): string | null {
  const mine = plans.filter((p) => p.examName === examName);
  if (mine.length === 0) return null;
  return mine.length === 1 ? planHref(mine[0].slug) : "/homework";
}

/** A day segment from the URL: a whole number from 1, or null. */
export function parseDayParam(raw: string): number | null {
  if (!/^[1-9]\d{0,3}$/.test(raw)) return null;
  return Number(raw);
}
