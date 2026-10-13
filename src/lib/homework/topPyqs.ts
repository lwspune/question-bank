/**
 * A chapter's top PYQs (2026-10-13): the first ten questions of that chapter
 * in its subject's daily homework plan, shown as a tab on the /board chapter
 * page and downloadable as a paper and its answer key. Pure.
 *
 * The plan's order IS the ranking (lib/homework/plan.ts): questions the board
 * asked again, most-asked first, then the types it keeps asking, then the rest,
 * newest first. So no second ranking exists to drift from the homework one; a
 * chapter with fewer than ten repeats fills up with questions asked once, each
 * still headed by its own "Asked once: Feb 2026" line.
 *
 * A case study is one question here, as on a homework day. Positions are
 * renumbered 1..n so the homework day view and download read them unchanged.
 * Spec: tests/homework-top-pyqs.test.ts.
 */
import { orderedSlots, type HomeworkDayExport, type HomeworkDayItem } from "./dayExport";

export const TOP_PYQS = 10;

/** One plan row of the chapter, as stored: its day and slot in the plan. */
export type PlanChapterRow = HomeworkDayItem & { day: number };

export function pickTopSlots(rows: readonly PlanChapterRow[], n: number = TOP_PYQS): HomeworkDayItem[] {
  const ordered = [...rows].sort((a, b) => a.day - b.day || a.position - b.position || a.sub - b.sub);
  const out: HomeworkDayItem[] = [];
  let slot = 0;
  let last = "";
  for (const r of ordered) {
    const key = `${r.day}:${r.position}`;
    if (key !== last) {
      if (slot === n) break;
      slot += 1;
      last = key;
    }
    out.push({ position: slot, sub: r.sub, questionId: r.questionId, chapter: r.chapter, note: r.note });
  }
  return out;
}

/**
 * The slots (day + position) that make a chapter's top PYQs, from the plan rows
 * of the chapter's questions. A slot belongs to the chapter of its FIRST part:
 * seven CBSE case studies file their parts under two chapters, and splitting
 * one would print a case study with a part missing. So a chapter holding only a
 * later part leaves that slot out, and the caller then loads every part of the
 * chosen slots, whatever chapter each part is filed under.
 */
export function topSlotKeys(rows: readonly PlanChapterRow[], n: number = TOP_PYQS): { day: number; position: number }[] {
  return rows
    .filter((r) => r.sub === 1)
    .sort((a, b) => a.day - b.day || a.position - b.position)
    .slice(0, n)
    .map((r) => ({ day: r.day, position: r.position }));
}

export function topPyqsTitle(count: number, chapterName: string, planTitle: string): string {
  return `Top ${count} PYQs: ${chapterName} (${planTitle})`;
}

/** The download plan: print order, the "Asked N times" line over each question, one passage per case study. */
export function topPyqsExport(chapterName: string, planTitle: string, items: readonly HomeworkDayItem[]): HomeworkDayExport {
  if (items.length === 0) return { ok: false, reason: "This chapter has no questions in the plan." };
  const slots = orderedSlots(items, (p) => `top-${p}`);
  if (!slots) return { ok: false, reason: "These questions can't be downloaded right now. Please try again later." };
  const count = new Set(items.map((it) => it.position)).size;
  return {
    ok: true,
    title: topPyqsTitle(count, chapterName, planTitle),
    questionIds: slots.ordered.map((it) => it.questionId),
    // The chapter is in the title, so each heading is just how often it was asked.
    sectionOf: new Map(slots.ordered.map((it) => [it.questionId, it.note])),
    setOf: slots.setOf,
  };
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** `{ plan, chapter }` from an untrusted request body, or null. */
export function parseTopPyqsTarget(raw: unknown): { plan: string; chapter: string } | null {
  if (!raw || typeof raw !== "object") return null;
  const { plan, chapter } = raw as { plan?: unknown; chapter?: unknown };
  if (typeof plan !== "string" || plan.length > 80 || !SLUG_RE.test(plan)) return null;
  if (typeof chapter !== "string" || !UUID_RE.test(chapter)) return null;
  return { plan, chapter };
}
