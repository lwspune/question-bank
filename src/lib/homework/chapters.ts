/**
 * A homework plan's chapters for its Top 10 PYQs tab (2026-11-04), and plans
 * grouped by exam for the Homework tab's pages. Pure; spec tests/homework-tab.test.ts.
 *
 * A chapter is listed when the plan holds a question FILED under it as the
 * first part of a slot: that is the rule the Top 10 itself reads by
 * (lib/homework/query.ts loadChapterTop), so every listed chapter has a list.
 */
import { slugify } from "@/lib/board/query";

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
