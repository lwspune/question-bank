/**
 * Turn triage drafts (TRIAGE_BRIEF.md) into one batch for run.ts. Pure.
 *
 * Drafts come from several agents working separate slices, so the same book
 * figure can arrive under two keys ("wheatstone", "wheatstone-bridge") and two
 * different figures under one key ("ray-diagram"). A figure's identity is its
 * book, pages and boxes, never its key: identical crops merge, different crops
 * with a shared key are told apart by a suffix.
 *
 * Only `book-figure` verdicts become figures. `computed`, `structure` and
 * `no-book-figure` are kept as `later` for the next waves; the rest are counted.
 * A label edit on anything but a book-figure is reported, not applied: an edit
 * exists to make a solution agree with a figure that will sit under it.
 */
import type { Batch, DrawSpec, Figure, Part } from "./plan";

export const VERDICTS = ["book-figure", "text-enough", "has-stem-figure", "computed", "structure", "no-book-figure", "false-hit"] as const;
export type Verdict = (typeof VERDICTS)[number];

export type Draft = {
  id: string;
  verdict: Verdict;
  reason: string;
  figure?: { key: string; caption?: string; pdf?: string; parts?: Part[]; draw?: DrawSpec };
  edits?: { find: string; replace: string }[];
  spec?: string;
};

export type DraftResult = {
  batch: Batch;
  tally: Record<string, number>;
  later: { id: string; verdict: Verdict; spec?: string; reason: string }[];
  errors: string[];
};

const LATER = new Set<Verdict>(["computed", "structure", "no-book-figure"]);

function sorted(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sorted);
  if (v && typeof v === "object") return Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, sorted((v as Record<string, unknown>)[k])]));
  return v;
}

/** A crop is its book, pages and boxes; a drawing is its spec (keys sorted). */
function identity(fig: NonNullable<Draft["figure"]>) {
  if (fig.draw) return "draw:" + JSON.stringify(sorted(fig.draw));
  return JSON.stringify([fig.pdf, (fig.parts ?? []).map((p) => [p.page, p.bbox, p.mask ?? []])]);
}

export function draftsToBatch(slices: Draft[][]): DraftResult {
  const errors: string[] = [];
  const tally: Record<string, number> = {};
  const later: DraftResult["later"] = [];
  const byIdentity = new Map<string, Figure>();
  const keysTaken = new Set<string>();
  const seen = new Map<string, Verdict>();
  const edits: NonNullable<Batch["edits"]> = [];

  for (const d of slices.flat()) {
    if (!(VERDICTS as readonly string[]).includes(d.verdict)) {
      errors.push(`${d.id}: unknown verdict "${d.verdict}"`);
      continue;
    }
    const prev = seen.get(d.id);
    if (prev) {
      errors.push(`${d.id}: two verdicts (${prev}, ${d.verdict})`);
      continue;
    }
    seen.set(d.id, d.verdict);
    tally[d.verdict] = (tally[d.verdict] ?? 0) + 1;

    // A computed or structure verdict that carries its drawing spec is a figure now.
    const drawnNow = (d.verdict === "computed" || d.verdict === "structure") && !!d.figure?.draw;
    if (d.verdict !== "book-figure" && !drawnNow) {
      if (d.edits?.length) errors.push(`${d.id}: edits on a ${d.verdict} verdict are not applied`);
      if (LATER.has(d.verdict)) later.push({ id: d.id, verdict: d.verdict, spec: d.spec, reason: d.reason });
      continue;
    }
    if (!d.figure) {
      errors.push(`${d.id}: book-figure with no figure`);
      continue;
    }

    if (d.verdict === "book-figure" && (!d.figure.pdf || !d.figure.parts?.length)) {
      errors.push(`${d.id}: book-figure with no book crop`);
      continue;
    }
    const ident = identity(d.figure);
    let f = byIdentity.get(ident);
    if (!f) {
      let key = d.figure.key;
      for (let n = 2; keysTaken.has(key); n++) key = `${d.figure.key}-${n}`;
      keysTaken.add(key);
      const source = d.figure.draw ? { draw: d.figure.draw } : { pdf: d.figure.pdf, parts: d.figure.parts };
      f = { key, ...source, ids: [], ...(d.figure.caption ? { note: d.figure.caption } : {}) };
      byIdentity.set(ident, f);
    }
    f.ids.push(d.id);
    for (const e of d.edits ?? []) edits.push({ id: d.id, find: e.find, replace: e.replace });
  }

  return { batch: { figures: [...byIdentity.values()], edits }, tally, later, errors };
}
