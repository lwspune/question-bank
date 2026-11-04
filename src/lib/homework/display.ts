/**
 * What the homework page shows for a day. Pure.
 * Spec: tests/homework-display.test.ts.
 */

/** The plan builder's note, cut to a chip ("asked 6×"). */
export function shortNote(note: string): string {
  const type = /^This type asked (\d+) times/.exec(note);
  if (type) return `type asked ${type[1]}×`;
  const again = /^Asked (\d+) times/.exec(note);
  if (again) return `asked ${again[1]}×`;
  if (note.startsWith("Asked once")) return "asked once";
  return note;
}

export type DaySection<D> = { part: 1 | 2 | 3; from: number; to: number; days: D[] };

/** Consecutive days grouped by the part of their first question. */
export function sectionsOf<D extends { day: number; items: { part: 1 | 2 | 3 }[] }>(days: D[]): DaySection<D>[] {
  const out: DaySection<D>[] = [];
  for (const d of days) {
    const part = d.items[0]?.part ?? 3;
    const last = out[out.length - 1];
    if (last && last.part === part) {
      last.days.push(d);
      last.to = d.day;
    } else {
      out.push({ part, from: d.day, to: d.day, days: [d] });
    }
  }
  return out;
}

/**
 * Who set a plan's papers, and what to call its questions (2026-11-04). The
 * plans were all board subjects until NDA Maths, whose papers UPSC sets.
 */
export function planWording(examName: string): { asker: string; questions: string } {
  return examName === "NDA"
    ? { asker: "UPSC", questions: "past questions" }
    : { asker: "the board", questions: "board questions" };
}
