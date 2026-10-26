/**
 * What a Repeated PYQs book prints (2026-10-26). PURE. Spec: tests/ebook-repeats.test.ts.
 *
 * From a subject's homework plan: every slot whose note says the board asked
 * it again ("Asked N times") or that its type keeps coming back ("This type
 * asked N times"), chapter by chapter in textbook order. Within a chapter the
 * plan's own order, which IS the ranking (lib/homework/plan.ts), so the book,
 * the Top 10 tab and the daily homework never disagree. A slot belongs to the
 * chapter of its FIRST part and keeps every part (the Top 10 rule,
 * lib/homework/topPyqs.ts): a case study is never printed with a part missing.
 */

/** One stored plan item, with the chapter of its question. */
export type RepeatPlanRow = {
  day: number;
  position: number;
  sub: number;
  note: string;
  questionId: string;
  chapterId: string;
  chapterName: string;
  /** chapters.order_index: the textbook's order. */
  chapterOrder: number;
};

export type RepeatSlot = {
  number: number;
  kind: "repeat" | "type";
  note: string;
  /** Every part, labelled as printed: "4", or "4 (a)", "4 (b)" for a case study. */
  parts: { questionId: string; label: string }[];
};

export type RepeatChapter = { chapterId: string; chapterName: string; slots: RepeatSlot[] };

const ASKED_AGAIN = /^Asked \d+ times/;
const RECURRING_TYPE = /^This type asked \d+ times/;

export function isRepeatNote(note: string): boolean {
  return ASKED_AGAIN.test(note) || RECURRING_TYPE.test(note);
}

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

export function repeatChapters(rows: readonly RepeatPlanRow[]): RepeatChapter[] {
  const ordered = [...rows].sort((a, b) => a.day - b.day || a.position - b.position || a.sub - b.sub);
  const slots = new Map<string, RepeatPlanRow[]>();
  for (const r of ordered) {
    const key = `${r.day}:${r.position}`;
    slots.set(key, [...(slots.get(key) ?? []), r]);
  }

  const chapters = new Map<string, { name: string; order: number; slots: RepeatPlanRow[][] }>();
  for (const parts of slots.values()) {
    const first = parts[0];
    if (first.sub !== 1 || !isRepeatNote(first.note)) continue;
    const ch = chapters.get(first.chapterId) ?? { name: first.chapterName, order: first.chapterOrder, slots: [] };
    ch.slots.push(parts);
    chapters.set(first.chapterId, ch);
  }

  return [...chapters.entries()]
    .sort(([, a], [, b]) => a.order - b.order || a.name.localeCompare(b.name))
    .map(([chapterId, ch]) => ({
      chapterId,
      chapterName: ch.name,
      slots: ch.slots.map((parts, i) => ({
        number: i + 1,
        kind: RECURRING_TYPE.test(parts[0].note) ? ("type" as const) : ("repeat" as const),
        note: parts[0].note,
        parts: parts.map((p, j) => ({
          questionId: p.questionId,
          label: parts.length === 1 ? String(i + 1) : `${i + 1} (${LETTERS[j] ?? j + 1})`,
        })),
      })),
    }));
}
