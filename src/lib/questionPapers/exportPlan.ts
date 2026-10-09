/**
 * A stored board paper (migration 0146) as a Word or PDF download. PURE.
 * Spec: tests/question-papers-export.test.ts.
 *
 * The builders already print a section heading per question (`sectionOf`) and
 * a shared passage once per run of questions with the same set key (`setOf`).
 * A board paper adds `printedOf`: its own numbers ("18 (b)"), its marks and the
 * "OR" before an alternative, which both builders print the same way.
 */
import type { PaperItemRow } from "./listing";
import type { PrintedLabel } from "@/lib/export/printedLabel";

export type { PrintedLabel };

export type BoardPaperExport =
  | {
      ok: true;
      title: string;
      questionIds: string[];
      sectionOf: Map<string, string>;
      printedOf: Map<string, PrintedLabel>;
      /** Case-study parts, and runs sharing the same directions: printed once. */
      setOf: Map<string, string>;
    }
  | { ok: false; reason: string };

export function boardPaperExport(
  paper: { title: string; sections: { key: string; title: string; note: string }[] },
  items: PaperItemRow[],
  contextOf: ReadonlyMap<string, string | null>
): BoardPaperExport {
  const unavailable = { ok: false as const, reason: "This paper can't be downloaded right now. Please try again later." };
  if (items.length === 0) return unavailable;
  const ordered = [...items].sort((a, b) => a.position - b.position);
  // A gap or a repeat would print the wrong numbers against the paper.
  if (ordered.some((it, i) => it.position !== i + 1)) return unavailable;
  if (new Set(ordered.map((it) => it.questionId)).size !== ordered.length) return unavailable;

  const section = new Map(paper.sections.map((s) => [s.key, s.note ? `${s.title} · ${s.note}` : s.title]));
  const sectionOf = new Map<string, string>();
  const printedOf = new Map<string, PrintedLabel>();
  for (const it of ordered) {
    sectionOf.set(it.questionId, section.get(it.section) ?? `Section ${it.section}`);
    printedOf.set(it.questionId, { number: it.printedNumber, marks: it.marks, orBefore: it.alternativeTo !== null });
  }

  const setOf = new Map<string, string>();
  for (const it of ordered) if (it.caseKey) setOf.set(it.questionId, `case:${it.caseKey}`);
  // Consecutive questions outside a case study that print the same directions
  // (CBSE's Assertion-Reason block) share one heading instead of four copies.
  let run: PaperItemRow[] = [];
  const flush = () => {
    if (run.length > 1) for (const it of run) setOf.set(it.questionId, `directions:${run[0].position}`);
    run = [];
  };
  for (const it of ordered) {
    const ctx = it.caseKey ? null : contextOf.get(it.questionId) ?? null;
    if (!ctx) {
      flush();
      continue;
    }
    if (run.length > 0 && contextOf.get(run[0].questionId) !== ctx) flush();
    run.push(it);
  }
  flush();

  return { ok: true, title: paper.title, questionIds: ordered.map((it) => it.questionId), sectionOf, printedOf, setOf };
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** `{ exam, slug }` from an untrusted request body, or null. */
export function parseBoardPaperTarget(raw: unknown): { exam: string; slug: string } | null {
  if (!raw || typeof raw !== "object") return null;
  const { exam, slug } = raw as { exam?: unknown; slug?: unknown };
  if (typeof exam !== "string" || exam.length > 40 || !SLUG_RE.test(exam)) return null;
  if (typeof slug !== "string" || slug.length > 80 || !SLUG_RE.test(slug)) return null;
  return { exam, slug };
}
