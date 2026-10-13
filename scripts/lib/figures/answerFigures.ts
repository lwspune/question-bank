/**
 * Plan the answer images for "draw a labelled diagram" textbook questions: the
 * book's own figure, cropped off the page, shown as the model answer
 * (questions.solution_image_url). Pure; the crop itself is crop_answer_figs.py.
 *
 * Input is a chapter's data/<id>.diagram-answers.json, one entry per drawing the
 * question asks for. A question that asks for several drawings carries a `part`
 * letter on each, and its parts become ONE image, stacked top to bottom in part
 * order (never side by side: a phone scales that down past reading). An entry
 * whose `figure` is null records that the book has no figure fit to be the
 * answer; that part is skipped, not counted missing.
 */

export type Bbox = [number, number, number, number];

export type DiagramAnswer = {
  ref: string;
  part?: string;
  figure: string | null;
  page?: number | null;
  bbox?: Bbox;
};

export type AnswerFigureJob = { ref: string; parts: { page: number; bbox: Bbox }[] };

export type AnswerFigurePlan = { jobs: AnswerFigureJob[]; none: string[]; errors: string[] };

function bboxOk(b: unknown): b is Bbox {
  if (!Array.isArray(b) || b.length !== 4 || !b.every((v) => typeof v === "number" && v >= 0 && v <= 1)) return false;
  return b[0] < b[2] && b[1] < b[3];
}

export function planAnswerFigures(entries: DiagramAnswer[]): AnswerFigurePlan {
  const byRef = new Map<string, DiagramAnswer[]>();
  for (const e of entries) byRef.set(e.ref, [...(byRef.get(e.ref) ?? []), e]);

  const jobs: AnswerFigureJob[] = [];
  const none: string[] = [];
  const errors: string[] = [];

  for (const [ref, group] of byRef) {
    const parted = group.filter((e) => e.part !== undefined).length;
    if (parted !== 0 && parted !== group.length) {
      errors.push(`${ref}: mixes entries with and without a part letter`);
      continue;
    }
    const seen = new Set<string>();
    const dup = group.find((e) => e.part !== undefined && (seen.has(e.part) || !seen.add(e.part)));
    if (dup) {
      errors.push(`${ref}: part "${dup.part}" twice`);
      continue;
    }

    const ordered = [...group].sort((a, b) => (a.part ?? "").localeCompare(b.part ?? ""));
    const parts: AnswerFigureJob["parts"] = [];
    let bad = false;
    for (const e of ordered) {
      const label = e.part !== undefined ? `${ref} (${e.part})` : ref;
      if (e.figure === null) {
        none.push(label);
        continue;
      }
      if (e.bbox === undefined) {
        errors.push(`${label}: names ${e.figure} but has no bbox`);
        bad = true;
        continue;
      }
      if (!bboxOk(e.bbox) || typeof e.page !== "number") {
        errors.push(`${label}: bbox ${JSON.stringify(e.bbox)} on page ${e.page} is not a box inside the page`);
        bad = true;
        continue;
      }
      parts.push({ page: e.page, bbox: e.bbox });
    }
    if (!bad && parts.length) jobs.push({ ref, parts });
  }
  return { jobs, none, errors };
}
