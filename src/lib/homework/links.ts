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

/**
 * The section's name everywhere a student sees it (2026-11-24, owner). It was
 * "Homework" until a student asked V whether its questions were the same as
 * the PYQs, and another how to submit it. The addresses stay /homework.
 */
export const MOST_ASKED = "Most Asked";

/** A plan's front page: its chapters' Top 10 PYQs (2026-11-24; its days until then). */
export const planHref = (slug: string) => `/homework/${slug}`;
/** A plan's days, five questions each, the most asked first (2026-11-24). */
export const daysHref = (slug: string) => `/homework/${slug}/days`;
export const dayHref = (slug: string, day: number) => `/homework/${slug}/day/${day}`;

/** Every published plan, grouped by exam: the Homework tab when no exam is chosen. */
export const HOMEWORK_HUB = "/homework";
/** One exam's plans (2026-11-04), the Homework tab's target once an exam is chosen. */
export const examHomeworkPageHref = (examSlug: string) => `/homework/exam/${examSlug}`;
/** A plan's chapters, each opening its Top 10 PYQs (2026-11-04): the plan's
 *  front page since 2026-11-24, so /homework/<plan>/top redirects there
 *  (next.config.mjs). Each chapter's list stays under /top. */
export const topListHref = (planSlug: string) => planHref(planSlug);
export const topChapterHref = (planSlug: string, chapterSlug: string) => `/homework/${planSlug}/top/${chapterSlug}`;
/** Every question of one repeat or type in a plan (2026-11-04), numbered from 1. */
export const groupHref = (planSlug: string, n: number) => `/homework/${planSlug}/group/${n}`;

export type PlanView = { id: "top" | "days"; label: string; href: string };

/** A plan's two tabs, Top 10 PYQs first (owner, 2026-11-24). */
export function planViews(slug: string): PlanView[] {
  return [
    { id: "top", label: "Top 10 PYQs", href: planHref(slug) },
    { id: "days", label: "Daily homework", href: daysHref(slug) },
  ];
}

/** The daily homework card on a board subject tab (it opens the plan's days),
 *  or null when that subject has no plan. */
export function subjectHomework(
  plans: readonly HomeworkPlanLink[],
  examName: string,
  subjectName: string
): { href: string; perDay: number } | null {
  const p = plans.find((x) => x.examName === examName && x.subjectName === subjectName);
  return p ? { href: daysHref(p.slug), perDay: p.perDay } : null;
}

/** The exam home's homework button: the plan itself, that exam's plans when there are several, or none. */
export function examHomeworkHref(
  plans: readonly HomeworkPlanLink[],
  examName: string,
  examSlug: string
): string | null {
  const mine = plans.filter((p) => p.examName === examName);
  if (mine.length === 0) return null;
  return mine.length === 1 ? planHref(mine[0].slug) : examHomeworkPageHref(examSlug);
}

/** A day segment from the URL: a whole number from 1, or null. */
export function parseDayParam(raw: string): number | null {
  if (!/^[1-9]\d{0,3}$/.test(raw)) return null;
  return Number(raw);
}
