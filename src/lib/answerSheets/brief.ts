/**
 * What a grading session reads and fills in (scripts/grading/pull.ts). PURE.
 * Spec: tests/answer-sheets-brief.test.ts.
 *
 * The brief is the paper as printed, with marks, OR and part markers, and the
 * model answer for each question. The template is the grade file with one row
 * per question that carries marks. Its outcome starts EMPTY, which the checker
 * refuses, so a question nobody looked at cannot pass as "not attempted".
 */
import type { BoardQuestion } from "@/lib/board/query";
import type { PaperItemRow } from "@/lib/questionPapers/listing";
import type { GradeFile } from "./grade";

export type BriefPaper = {
  title: string;
  totalMarks: number;
  durationMinutes: number | null;
  sections: { key: string; title: string; note: string }[];
};

export function gradeTemplate(submissionId: string, items: PaperItemRow[]): GradeFile {
  return {
    submissionId,
    wentWell: "",
    nextSteps: "",
    grades: [...items]
      .sort((a, b) => a.position - b.position)
      .filter((i) => (i.partOf ?? null) === null && i.marks !== null)
      .map((i) => ({ position: i.position, max: i.marks!, outcome: "", awarded: null, earned: "", missing: "", cause: "", topic: "" })),
    marks: [],
  };
}

function marksLabel(m: number): string {
  return `${m} mark${m === 1 ? "" : "s"}`;
}

export function buildBrief(input: {
  submissionId: string;
  paper: BriefPaper;
  items: PaperItemRow[];
  questions: BoardQuestion[];
  fileCount: number;
  /** Prepared pages in pages/ (PDFs split into pages): what the grader reads and marks. */
  pageCount: number;
}): string {
  const { submissionId, paper, items, questions, fileCount, pageCount } = input;
  const byId = new Map(questions.map((q) => [q.id, q]));
  const byPos = new Map(items.map((i) => [i.position, i]));
  const sections = new Map(paper.sections.map((s) => [s.key, s]));
  const out: string[] = [
    `# ${paper.title}`,
    "",
    `Submission: ${submissionId}`,
    `Maximum marks: ${paper.totalMarks}${paper.durationMinutes ? ` · Time: ${paper.durationMinutes} minutes` : ""}`,
    `Answer sheet: ${fileCount} files, prepared as ${pageCount} pages in pages/ (read them in order; place marks off grid/).`,
    "",
    "Grade by scripts/grading/GRADING.md. Fill grade.json (grades, then marks); position numbers are the paper's, not the printed ones.",
    "",
  ];

  let section: string | null = null;
  for (const it of [...items].sort((a, b) => a.position - b.position)) {
    if (it.section !== section) {
      section = it.section;
      const s = sections.get(section);
      out.push(`## ${s?.title ?? `Section ${section}`}${s?.note ? ` (${s.note})` : ""}`, "");
    }
    const q = byId.get(it.questionId);
    const head =
      (it.partOf ?? null) !== null
        ? `### Q.${it.printedNumber}, part of Q.${byPos.get(it.partOf!)?.printedNumber} (position ${it.position}, marks on the question)`
        : it.alternativeTo !== null
          ? `### Q.${it.printedNumber} [${marksLabel(it.marks!)}], OR (alternative to Q.${byPos.get(it.alternativeTo)?.printedNumber}) (position ${it.position})`
          : `### Q.${it.printedNumber} [${marksLabel(it.marks!)}] (position ${it.position})`;
    out.push(head, "");
    if (q?.context) out.push(q.context.trim(), "");
    out.push(q ? q.text.trim() : "(question not found in the bank)", "");
    if (q?.options.length) {
      for (const o of q.options) out.push(`- (${o.label}) ${o.text}${o.isCorrect ? "  ← key" : ""}`);
      out.push("");
    }
    if (q?.imageUrl) out.push(`Figure: ${q.imageUrl}`, "");
    out.push("**Model answer:**", "", q?.solution?.trim() ? q.solution.trim() : "(no model answer stored: derive it)", "");
  }
  return out.join("\n");
}
