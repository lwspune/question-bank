/**
 * What a Chapter-wise PYQs book prints (2026-10-27). PURE. Spec: tests/ebook-chapterwise.test.ts.
 *
 * Every board question of a subject, chapter by chapter in textbook order,
 * grouped by marks (1, 2, 3, ...), then case studies and passages (a question
 * in parts), then "Earlier years": older questions with no marks recorded
 * (HSC's chapter-wise compilations, 2014-2022; owner: keep them, apart).
 * Within a group the slots keep the order they came in: newest paper first
 * (CBSE, from its stored papers) or the homework plan's ranking (Maharashtra).
 * A slot belongs to the chapter of its first part and keeps every part, so a
 * case study never prints short (the Top 10 rule, lib/homework/topPyqs.ts).
 */

/** One question, or one case study / passage with its parts. */
export type ChapterwiseSlot = {
  /** Where it came in its source; a group keeps this order. */
  order: number;
  /** Marks of the question (a case study's whole marks); null when not recorded. */
  marks: number | null;
  /** The line printed over it: its sitting, or "Asked 3 times: ...". */
  note: string;
  /** The chapter of its first part. */
  chapterId: string;
  chapterName: string;
  /** chapters.order_index: the textbook's order. */
  chapterOrder: number;
  /** Question ids, in print order. */
  parts: string[];
};

export type ChapterwiseGroup = ({ kind: "marks"; marks: number } | { kind: "parts" } | { kind: "earlier" }) & {
  slots: { note: string; marks: number | null; parts: { questionId: string; label: string }[] }[];
};

export type ChapterwiseChapter = { chapterId: string; chapterName: string; groups: ChapterwiseGroup[] };

export function groupLabel(g: Pick<ChapterwiseGroup, "kind"> & { marks?: number }): string {
  if (g.kind === "parts") return "Case studies and passages";
  if (g.kind === "earlier") return "Earlier years";
  return `${g.marks} ${g.marks === 1 ? "mark" : "marks"}`;
}

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

/** A slot's group: a question in parts, else its marks, else the earlier years. */
function groupKey(s: ChapterwiseSlot): string {
  if (s.parts.length > 1) return "parts";
  return s.marks === null ? "earlier" : `marks:${s.marks}`;
}

/** Marks groups by their marks, then case studies and passages, then the earlier years. */
function groupRank(key: string): number {
  if (key === "parts") return 1_000_000;
  if (key === "earlier") return 2_000_000;
  return Number(key.slice("marks:".length));
}

export function chapterwiseChapters(slots: readonly ChapterwiseSlot[]): ChapterwiseChapter[] {
  const chapters = new Map<string, { name: string; order: number; slots: ChapterwiseSlot[] }>();
  for (const s of [...slots].sort((a, b) => a.order - b.order)) {
    const ch = chapters.get(s.chapterId) ?? { name: s.chapterName, order: s.chapterOrder, slots: [] };
    ch.slots.push(s);
    chapters.set(s.chapterId, ch);
  }
  return [...chapters.entries()]
    .sort(([, a], [, b]) => a.order - b.order || a.name.localeCompare(b.name))
    .map(([chapterId, ch]) => {
      const byGroup = new Map<string, ChapterwiseSlot[]>();
      for (const s of ch.slots) byGroup.set(groupKey(s), [...(byGroup.get(groupKey(s)) ?? []), s]);
      let n = 0;
      const groups = [...byGroup.entries()]
        .sort(([a], [b]) => groupRank(a) - groupRank(b))
        .map(([key, members]): ChapterwiseGroup => {
          const printed = members.map((s) => {
            n += 1;
            return {
              note: s.note,
              marks: s.marks,
              parts: s.parts.map((id, j) => ({
                questionId: id,
                label: s.parts.length === 1 ? String(n) : `${n} (${LETTERS[j] ?? j + 1})`,
              })),
            };
          });
          if (key === "parts") return { kind: "parts", slots: printed };
          if (key === "earlier") return { kind: "earlier", slots: printed };
          return { kind: "marks", marks: groupRank(key), slots: printed };
        });
      return { chapterId, chapterName: ch.name, groups };
    });
}
