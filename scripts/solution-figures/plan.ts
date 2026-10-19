/**
 * Plan a batch of SOLUTION figures: a figure cropped from a book page and shown
 * under the model answer of every question it explains (questions.solution_image_url).
 * Pure; the crop is scripts/lib/figures/crop_answer_figs.py and the writes are run.ts.
 *
 * Unlike the per-lane attach scripts, a batch is keyed by QUESTION ID, because one
 * book figure explains textbook rows and board-paper rows alike (the Wheatstone
 * bridge of Balbharati Fig 9.4 answers Ex Q.3 and the July 2024 board Q19), and a
 * wave spans many exams. A batch may also carry label EDITS: a figure placed under
 * a solution whose letters differ from it (R in AD where the book has S) confuses
 * more than it helps, so the solution is brought to the figure's letters in the
 * same run.
 */

export type Bbox = [number, number, number, number];
export type Part = { page: number; bbox: Bbox; mask?: Bbox[] };
export type Figure = { key: string; pdf: string; parts: Part[]; ids: string[]; note?: string };
export type Edit = { id: string; find: string; replace: string };
export type Batch = { figures: Figure[]; edits?: Edit[] };

export type CropJob = { ref: string; parts: Part[] };
export type BatchPlan = {
  cropsByPdf: Map<string, CropJob[]>;
  attach: { id: string; key: string }[];
  edits: Edit[];
  errors: string[];
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function boxOk(b: unknown): b is Bbox {
  if (!Array.isArray(b) || b.length !== 4 || !b.every((v) => typeof v === "number" && v >= 0 && v <= 1)) return false;
  return b[0] < b[2] && b[1] < b[3];
}

export function planBatch(batch: Batch): BatchPlan {
  const errors: string[] = [];
  const cropsByPdf = new Map<string, CropJob[]>();
  const attach: { id: string; key: string }[] = [];
  const keys = new Set<string>();
  const owner = new Map<string, string>();

  for (const f of batch.figures) {
    if (!SLUG.test(f.key)) errors.push(`"${f.key}": key must be a lowercase slug (it names the PNG)`);
    if (keys.has(f.key)) errors.push(`"${f.key}": key used twice`);
    keys.add(f.key);
    if (!f.parts.length) errors.push(`${f.key}: no parts`);
    if (!f.ids.length) errors.push(`${f.key}: no questions`);
    f.parts.forEach((p, i) => {
      const at = `${f.key} part ${i + 1}`;
      if (!Number.isInteger(p.page) || p.page < 0) errors.push(`${at}: page ${p.page} is not a 0-based page number`);
      if (!boxOk(p.bbox)) errors.push(`${at}: box ${JSON.stringify(p.bbox)} is not a box inside the page`);
      if (p.mask !== undefined && !(Array.isArray(p.mask) && p.mask.every(boxOk))) errors.push(`${at}: mask ${JSON.stringify(p.mask)} is not a list of boxes inside the page`);
    });
    for (const id of f.ids) {
      if (!UUID.test(id)) {
        errors.push(`${f.key}: "${id}" is not a question id`);
        continue;
      }
      const prev = owner.get(id);
      if (prev) {
        errors.push(`${id}: attached to both ${prev} and ${f.key}`);
        continue;
      }
      owner.set(id, f.key);
      attach.push({ id, key: f.key });
    }
    cropsByPdf.set(f.pdf, [...(cropsByPdf.get(f.pdf) ?? []), { ref: f.key, parts: f.parts }]);
  }

  const edits = batch.edits ?? [];
  for (const e of edits) {
    if (!owner.has(e.id)) errors.push(`edit ${e.id}: no figure in this batch for that question`);
    if (!e.find) errors.push(`edit ${e.id}: empty find`);
    else if (e.find === e.replace) errors.push(`edit ${e.id}: find and replace are the same`);
  }

  return { cropsByPdf, attach, edits, errors };
}

export type EditResult = { status: "apply" | "done" | "missing" | "ambiguous"; next: string };

/** Apply one find/replace to a solution. A re-run finds the replacement already in
 *  place and reports `done`, so the batch stays idempotent. */
export function applyEdit(solution: string, find: string, replace: string): EditResult {
  // Checked first: an edit that APPENDS keeps `find` inside `replace`, so after one
  // run the find text is still there and would be extended again.
  if (solution.includes(replace)) return { status: "done", next: solution };
  const first = solution.indexOf(find);
  if (first === -1) return { status: "missing", next: solution };
  if (solution.indexOf(find, first + 1) !== -1) return { status: "ambiguous", next: solution };
  return { status: "apply", next: solution.slice(0, first) + replace + solution.slice(first + find.length) };
}
