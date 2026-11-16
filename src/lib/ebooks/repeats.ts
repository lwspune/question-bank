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

/**
 * Number each row's chapter by its place in a pinned list of chapter names
 * (2026-11-16). JEE and SSC chapters share order_index values (JEE Maths: 27
 * chapters, 7 values), so their books pin the order instead. A chapter the
 * list does not name throws: a re-cut taxonomy stops the build rather than
 * dropping a chapter somewhere by accident.
 */
export function pinChapterOrder(rows: readonly RepeatPlanRow[], order: readonly string[]): RepeatPlanRow[] {
  const place = new Map(order.map((name, i) => [name, i]));
  const missing = [...new Set(rows.map((r) => r.chapterName).filter((name) => !place.has(name)))];
  if (missing.length) throw new Error(`chapters missing from the pinned order: ${missing.join(", ")}`);
  return rows.map((r) => ({ ...r, chapterOrder: place.get(r.chapterName)! }));
}

/**
 * Several subjects' plans as one book (SSC CGL General Awareness, 2026-11-16):
 * one chapter per SUBJECT, in turn. Inside it, the subject's chapters in
 * order and each chapter's slots in the plan's order, renumbered 1..n. The
 * first build gave each subject's chapters their own: 34 chapters, many of one
 * or two questions, each on two near-empty pages. Each plan is grouped on its
 * own, since two plans share day and position numbers. A one-subject book
 * keeps its chapters as they are.
 */
export function repeatChaptersOfSubjects(plans: readonly { subject: string; rows: readonly RepeatPlanRow[] }[]): RepeatChapter[] {
  if (plans.length === 1) return repeatChapters(plans[0].rows);
  return plans.flatMap((p) => {
    const slots = repeatChapters(p.rows).flatMap((c) => c.slots);
    if (slots.length === 0) return [];
    return [
      {
        chapterId: p.subject,
        chapterName: p.subject,
        slots: slots.map((s, i) => ({
          ...s,
          number: i + 1,
          parts: s.parts.map((part, j) => ({
            questionId: part.questionId,
            label: s.parts.length === 1 ? String(i + 1) : `${i + 1} (${LETTERS[j] ?? j + 1})`,
          })),
        })),
      },
    ];
  });
}

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
