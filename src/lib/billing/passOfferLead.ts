/**
 * The pass offer's lead on board past papers and homework (2026-10-14): what
 * THIS student is missing ("All 7 Physics past papers, 2023 to 2026"), above
 * the rest of the pass. Every sale from 8 to 14 Oct came from these two boxes
 * (board papers 12 free -> 2 paid, homework 3 -> 1, /browse 61 -> 0), where
 * the need repeats: next year's paper, tomorrow's homework. Spec:
 * tests/pass-offer-lead.test.ts.
 *
 * Pure. The facts come from lists the pages already load (the published-paper
 * list, the homework plans), so the offer costs no read of its own.
 */

/** The lead box: a title for the dialog, then a bold line and one sentence. */
export type PassOfferLead = { title: string; lead: string; body: string };

export type PaperOfferFacts = {
  subject: string;
  /** Published papers in this exam and subject; each CBSE set counts as one. */
  papers: number;
  fromYear: number;
  toYear: number;
  /** The same exam's other subjects with papers, alphabetical. */
  otherSubjects: string[];
};

export type HomeworkOfferFacts = {
  subject: string;
  days: number;
  perDay: number;
  /** The same exam's other homework plans, by subject, alphabetical. */
  otherSubjects: string[];
};

/** More than this many other subjects reads as a list nobody finishes. */
const MAX_LISTED = 4;

function joinAnd(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function others(prefix: string, subjects: readonly string[]): string {
  if (subjects.length === 0) return "";
  const named = subjects.length > MAX_LISTED ? `${subjects.length} other subjects` : joinAnd(subjects);
  return ` ${prefix} ${named}.`;
}

function uniqueSorted(names: Iterable<string>): string[] {
  return [...new Set(names)].sort((a, b) => a.localeCompare(b));
}

/** Facts for one paper page, from the published-paper list. */
export function paperOfferFacts(
  listings: readonly { examId: string; subjectId: string; subjectName: string; year: number }[],
  examId: string,
  subjectId: string
): PaperOfferFacts | null {
  const mine = listings.filter((p) => p.examId === examId && p.subjectId === subjectId);
  if (mine.length === 0) return null;
  const years = mine.map((p) => p.year);
  return {
    subject: mine[0].subjectName,
    papers: mine.length,
    fromYear: Math.min(...years),
    toYear: Math.max(...years),
    otherSubjects: uniqueSorted(
      listings.filter((p) => p.examId === examId && p.subjectId !== subjectId).map((p) => p.subjectName)
    ),
  };
}

/** Null below two papers: "all 1 paper" sells nothing, so the generic offer stays. */
export function paperOfferLead(f: PaperOfferFacts): PassOfferLead | null {
  if (f.papers < 2) return null;
  const years = f.fromYear === f.toYear ? `${f.toYear}` : `${f.fromYear} to ${f.toYear}`;
  return {
    title: `Download all ${f.papers} ${f.subject} papers`,
    lead: `All ${f.papers} ${f.subject} past papers, ${years}`,
    body: `Each with its answer key, as PDF.${others("Plus the past papers for", f.otherSubjects)}`,
  };
}

/** Facts for one homework plan, from the plan and the published plans. */
export function homeworkOfferFacts(
  plan: { slug: string; examName: string; subjectName: string; days: number; perDay: number },
  plans: readonly { slug: string; examName: string; subjectName: string }[]
): HomeworkOfferFacts {
  return {
    subject: plan.subjectName,
    days: plan.days,
    perDay: plan.perDay,
    otherSubjects: uniqueSorted(
      plans.filter((p) => p.examName === plan.examName && p.slug !== plan.slug).map((p) => p.subjectName)
    ),
  };
}

/** Null below two days, like a single paper. */
export function homeworkOfferLead(f: HomeworkOfferFacts): PassOfferLead | null {
  if (f.days < 2) return null;
  const perDay = `${f.perDay} past board ${f.perDay === 1 ? "question" : "questions"} a day.`;
  return {
    title: `Download all ${f.days} days of homework`,
    lead: `All ${f.days} days of ${f.subject} homework`,
    body: `${perDay}${others("Plus the plans for", f.otherSubjects)}`,
  };
}

/**
 * The rest of the pass under the lead: without the download perk (the lead
 * says it, for this page) and without the "(free: ...)" brackets, which
 * /pricing keeps. Order as set at /dashboard/pricing.
 */
export function alsoIncludedPerks(perks: readonly string[]): string[] {
  return perks.filter((p) => !/download/i.test(p)).map((p) => p.replace(/\s*\(free:[^)]*\)\s*$/i, ""));
}
