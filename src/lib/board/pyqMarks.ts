/**
 * Printed marks for a board PYQ on /board (2026-11-15, a student's request:
 * "mention marks of each question from boards pyq section").
 *
 * Marks live on a paper's ITEM, not on the question (0146): the same question
 * can be worth 3 in one paper and 4 in another. So /board reads every published
 * paper a question sits in and shows a mark only when they all agree. Where
 * they disagree, or a question was never part of a stored whole paper (the HSC
 * chapter-wise compilations), it shows nothing: a wrong mark is worse than none.
 *
 * A QUESTION IN PARTS (0147). A Maharashtra paper prints "Q. 31 [4]" once, on
 * the question's FIRST item; the later parts carry no marks and name that item
 * in `part_of`. The paper page can show "4 marks" on part (i) because the parts
 * follow it. /board shows each part alone, so every part, the first included,
 * reads "Part of a 4-mark question".
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/db";
import { readInChunks } from "@/lib/supabase/readInChunks";

export type BoardMarks = { kind: "whole"; marks: number } | { kind: "part"; ofMarks: number };

export type PaperItemRow = {
  questionId: string;
  paperId: string;
  position: number;
  /** Null exactly when the item is a later part (`partOf` set). */
  marks: number | null;
  partOf: number | null;
};

/**
 * One label per question, from every paper item that matters: the questions'
 * own items plus, per paper, its part rows and the items those parts name.
 */
export function resolveBoardMarks(questionIds: readonly string[], rows: readonly PaperItemRow[]): Record<string, BoardMarks> {
  const at = new Map<string, PaperItemRow>();
  const heads = new Set<string>();
  for (const r of rows) {
    at.set(`${r.paperId}:${r.position}`, r);
    if (r.partOf !== null) heads.add(`${r.paperId}:${r.partOf}`);
  }

  const labels = new Map<string, (BoardMarks | null)[]>();
  for (const r of at.values()) {
    let label: BoardMarks | null;
    if (r.partOf !== null) {
      const head = at.get(`${r.paperId}:${r.partOf}`);
      label = head?.marks != null ? { kind: "part", ofMarks: head.marks } : null;
    } else if (r.marks === null) {
      label = null;
    } else if (heads.has(`${r.paperId}:${r.position}`)) {
      label = { kind: "part", ofMarks: r.marks };
    } else {
      label = { kind: "whole", marks: r.marks };
    }
    const list = labels.get(r.questionId) ?? [];
    list.push(label);
    labels.set(r.questionId, list);
  }

  const out: Record<string, BoardMarks> = {};
  for (const id of questionIds) {
    const list = labels.get(id);
    if (!list?.length || list.some((l) => l === null)) continue;
    const first = list[0]!;
    if (list.every((l) => sameMarks(l!, first))) out[id] = first;
  }
  return out;
}

function sameMarks(a: BoardMarks, b: BoardMarks): boolean {
  if (a.kind === "whole" && b.kind === "whole") return a.marks === b.marks;
  if (a.kind === "part" && b.kind === "part") return a.ofMarks === b.ofMarks;
  return false;
}

/** "3 marks" · "1 mark" · "Part of a 4-mark question". */
export function boardMarksLabel(m: BoardMarks): string {
  if (m.kind === "whole") return `${m.marks} ${m.marks === 1 ? "mark" : "marks"}`;
  // The number as spoken: "an 8-mark", "an 11-mark", "an 18-mark".
  const article = /^(8|11(?!\d)|18(?!\d))/.test(String(m.ofMarks)) ? "an" : "a";
  return `Part of ${article} ${m.ofMarks}-mark question`;
}

type ItemRow = { question_id: string; paper_id: string; position: number; marks: number | null; part_of: number | null };

const ITEM_COLUMNS = "question_id, paper_id, position, marks, part_of";

/** Every published-paper item of these questions, plus what their parts need. */
export async function loadBoardPyqMarks(client: SupabaseClient<Database>, questionIds: readonly string[]): Promise<Record<string, BoardMarks>> {
  const ids = [...new Set(questionIds)];
  if (!ids.length) return {};

  // (paper_id, position) is the primary key, so the order is unique, as paging needs.
  const own = await readInChunks(ids, (chunk, from, to) =>
    client
      .from("board_paper_items")
      .select(`${ITEM_COLUMNS}, board_papers!inner(published)`)
      .in("question_id", chunk)
      .eq("board_papers.published", true)
      .order("paper_id")
      .order("position")
      .range(from, to)
  );

  // Parts only matter in papers that have them (Maharashtra). Read those
  // papers' part rows, then the items the parts name, so a first part is
  // known to be a first part and a later part knows its question's marks.
  const papers = [...new Set(own.map((r) => r.paper_id))];
  const parts: ItemRow[] = await readInChunks(papers, (chunk, from, to) =>
    client
      .from("board_paper_items")
      .select(ITEM_COLUMNS)
      .in("paper_id", chunk)
      .not("part_of", "is", null)
      .order("paper_id")
      .order("position")
      .range(from, to)
  );
  const headPositions = [...new Set(parts.map((r) => r.part_of!))];
  const heads: ItemRow[] = headPositions.length
    ? await readInChunks([...new Set(parts.map((r) => r.paper_id))], (chunk, from, to) =>
        client
          .from("board_paper_items")
          .select(ITEM_COLUMNS)
          .in("paper_id", chunk)
          .in("position", headPositions)
          .order("paper_id")
          .order("position")
          .range(from, to)
      )
    : [];

  const rows: PaperItemRow[] = [...own, ...parts, ...heads].map((r) => ({
    questionId: r.question_id,
    paperId: r.paper_id,
    position: r.position,
    marks: r.marks === null ? null : Number(r.marks),
    partOf: r.part_of,
  }));
  return resolveBoardMarks(ids, rows);
}
