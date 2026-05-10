import type { QuestionRow } from "@/lib/questions/query";

export type Group =
  | { kind: "single"; question: QuestionRow }
  | {
      kind: "set";
      setId: string;
      passage: string;
      questions: QuestionRow[];
    };

/**
 * Walk questions in order; consecutive rows sharing a non-null setId collapse
 * into one set-group. A standalone question (or a different setId) starts a
 * new group. The passage text comes from the first question of the run
 * (parser propagation guarantees siblings' contexts are identical at upload
 * time; defensive coalesce to "" if ever null).
 *
 * Order is preserved both across groups and within each set.
 */
export function groupBySet(questions: QuestionRow[]): Group[] {
  const out: Group[] = [];
  let current: { setId: string; passage: string; questions: QuestionRow[] } | null = null;

  for (const q of questions) {
    if (q.setId && current && current.setId === q.setId) {
      current.questions.push(q);
      continue;
    }
    if (current) {
      out.push({ kind: "set", ...current });
      current = null;
    }
    if (q.setId) {
      current = {
        setId: q.setId,
        passage: q.context ?? "",
        questions: [q],
      };
    } else {
      out.push({ kind: "single", question: q });
    }
  }
  if (current) out.push({ kind: "set", ...current });
  return out;
}
