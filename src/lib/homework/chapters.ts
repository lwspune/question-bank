/**
 * A homework plan's chapters for its Top 10 PYQs tab (2026-11-04), and plans
 * grouped by exam for the Homework tab's pages. Pure; spec tests/homework-tab.test.ts.
 *
 * A chapter is listed when the plan holds a question FILED under it as the
 * first part of a slot: that is the rule the Top 10 itself reads by
 * (lib/homework/query.ts loadChapterTop), so every listed chapter has a list.
 */
import { slugify } from "@/lib/board/query";
import { PYQVAULT_EXAMS } from "@/lib/exam/examContext";
import type { SideNavGroup } from "@/lib/nav/sideNavGroups";
import { examHomeworkPageHref, HOMEWORK_HUB, planHref } from "./links";

export type PlanChapterRow = { id: string; name: string; orderIndex: number | null };
export type PlanChapter = { id: string; name: string; slug: string };

/** Each chapter once, in book order (no position last, by name), with a unique address slug. */
export function planChapters(rows: readonly PlanChapterRow[]): PlanChapter[] {
  const byId = new Map<string, PlanChapterRow>();
  for (const r of rows) if (r.name && !byId.has(r.id)) byId.set(r.id, r);
  const sorted = [...byId.values()].sort((a, b) => {
    const ao = a.orderIndex ?? Number.POSITIVE_INFINITY;
    const bo = b.orderIndex ?? Number.POSITIVE_INFINITY;
    return ao !== bo ? ao - bo : a.name.localeCompare(b.name);
  });
  const seen = new Set<string>();
  const out: PlanChapter[] = [];
  for (const r of sorted) {
    const slug = slugify(r.name);
    // A second chapter whose name slugs alike would never be reachable by its
    // address; leave it out rather than shadow the first.
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push({ id: r.id, name: r.name, slug });
  }
  return out;
}

/** The chapters either side of one, for the links under its Top 10. */
export function chapterNeighbours<C extends { slug: string }>(
  chapters: readonly C[],
  slug: string
): { prev: C | null; next: C | null } {
  const i = chapters.findIndex((c) => c.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return { prev: chapters[i - 1] ?? null, next: chapters[i + 1] ?? null };
}

/** Plans under their exam, exams in the order they first appear. */
export function groupPlansByExam<P extends { examName: string }>(plans: readonly P[]): { examName: string; plans: P[] }[] {
  const groups = new Map<string, P[]>();
  for (const p of plans) {
    const list = groups.get(p.examName) ?? [];
    list.push(p);
    groups.set(p.examName, list);
  }
  return [...groups].map(([examName, list]) => ({ examName, plans: list }));
}

/** The site's short name for an exam ("MH SSC 10"), from its DB name; the DB name off the registry. */
export function homeworkExamLabel(examName: string): string {
  return PYQVAULT_EXAMS.find((e) => e.examName === examName)?.displayName ?? examName;
}

type NavPlan = { slug: string; title?: string; examName: string; subjectName: string };

/**
 * The homework pages' side menu (2026-11-04), one level at a time like the
 * notes menu (owner): with no exam, "All exams" and each exam with plans,
 * opening its homework page; inside an exam, "All exams" and that exam's plans
 * under its short name, each labelled by its subject as its own title words it
 * ("Maths", not "CBSE Class 12 Maths"). An exam with no plans yet gets its own
 * page's link.
 */
export function homeworkSideNav(
  plans: readonly NavPlan[],
  examName: string | null = null
): { href: string; label: string; group?: SideNavGroup }[] {
  const items: { href: string; label: string; group?: SideNavGroup }[] = [{ href: HOMEWORK_HUB, label: "All exams" }];
  const groups = groupPlansByExam(plans);
  if (examName === null) {
    for (const g of groups) {
      const exam = PYQVAULT_EXAMS.find((e) => e.examName === g.examName);
      items.push({ href: exam ? examHomeworkPageHref(exam.slug) : planHref(g.plans[0].slug), label: exam?.displayName ?? g.examName });
    }
    return items;
  }
  const exam = PYQVAULT_EXAMS.find((e) => e.examName === examName);
  const group: SideNavGroup = exam ? { label: exam.displayName, href: examHomeworkPageHref(exam.slug) } : { label: examName };
  const mine = groups.find((g) => g.examName === examName)?.plans ?? [];
  if (mine.length === 0) {
    if (exam) items.push({ href: examHomeworkPageHref(exam.slug), label: exam.displayName });
    return items;
  }
  const labels = subjectLabels(mine, group.label);
  mine.forEach((p, i) => items.push({ href: planHref(p.slug), label: labels[i], group }));
  return items;
}

/**
 * Each plan's title with what the exam's plans share removed: the common
 * leading words when there are several, the exam's short name when there is
 * one. The subject's DB name when that leaves nothing.
 */
function subjectLabels(plans: readonly NavPlan[], examLabel: string): string[] {
  const words = plans.map((p) => (p.title ?? "").split(/\s+/).filter(Boolean));
  let shared = 0;
  if (plans.length > 1) {
    while (words.every((w) => w.length > shared + 1 && w[shared] === words[0][shared])) shared++;
  }
  return plans.map((p, i) => {
    const title = p.title ?? "";
    let rest = "";
    if (shared > 0) rest = words[i].slice(shared).join(" ");
    else if (plans.length === 1 && title.startsWith(`${examLabel} `)) rest = title.slice(examLabel.length + 1);
    return rest || p.subjectName;
  });
}

/**
 * A group's questions as homework slots (2026-11-04), for its See all page: one
 * slot per question, headed by the paper it came from, a case study's parts in
 * one slot. No group link: the page IS the group.
 */
export function groupItems(
  members: readonly { position: number; sub: number; questionId: string; sitting: string }[]
): { position: number; sub: number; questionId: string; chapter: string; note: string; group: null }[] {
  return members.map((m) => ({ position: m.position, sub: m.sub, questionId: m.questionId, chapter: "", note: m.sitting, group: null }));
}

/** The line under a group page's title: what links the questions, and how many follow. */
export function groupHeading(group: { tier: "repeat" | "type"; sittings: readonly string[] }, questions: number): string {
  const asked = `asked ${group.sittings.length} times: ${group.sittings.join(", ")}`;
  return group.tier === "repeat"
    ? `The same question, ${asked}. Every wording below, oldest first.`
    : `This type of question, ${asked}. All ${questions} questions below, oldest first.`;
}
