/**
 * Pure ordering, progress, and snapshot helpers for the paper builder.
 */
import { UNASSIGNED_KEY, subjectToSectionKey } from "./template";
import type { SectionTemplate, MembershipRow, PaperSnapshot } from "./types";

/**
 * Fractional position for inserting/reordering a question between two
 * neighbours without renumbering the rest (same idea as subtopics.order_index).
 *   - empty list              -> 1
 *   - append after `before`   -> before + 1
 *   - prepend before `after`  -> after - 1
 *   - between two            -> midpoint
 */
export function positionBetween(before: number | null, after: number | null): number {
  if (before == null && after == null) return 1;
  if (before == null) return after! - 1;
  if (after == null) return before + 1;
  return (before + after) / 2;
}

/**
 * New fractional position to move a question one step up/down within its
 * section. `orderedRows` is the section's membership sorted by position asc.
 * Returns null when the move isn't possible (item not found, or already at the
 * top/bottom). Moving up places the item just before its previous neighbour;
 * moving down places it just after its next neighbour.
 */
export function positionForMove(
  orderedRows: { questionId: string; position: number }[],
  questionId: string,
  direction: "up" | "down"
): number | null {
  const i = orderedRows.findIndex((r) => r.questionId === questionId);
  if (i === -1) return null;
  if (direction === "up") {
    if (i === 0) return null;
    const before = orderedRows[i - 2]?.position ?? null;
    return positionBetween(before, orderedRows[i - 1].position);
  }
  if (i >= orderedRows.length - 1) return null;
  const after = orderedRows[i + 2]?.position ?? null;
  return positionBetween(orderedRows[i + 1].position, after);
}

/**
 * Plan a bulk add of questions (e.g. committing the /browse cart to a paper).
 * Dedups the input, skips ids already in the paper, files each new id into the
 * section matching its subject (else UNASSIGNED), and appends after each
 * section's current max position. Pure — the caller does the DB I/O.
 */
export function planBulkAdd(
  ids: string[],
  subjectNameOf: (id: string) => string | null,
  template: SectionTemplate,
  existing: { questionId: string; sectionKey: string; position: number }[]
): {
  rows: { questionId: string; sectionKey: string; position: number }[];
  added: number;
  alreadyIn: number;
} {
  const deduped = Array.from(new Set(ids.filter(Boolean)));
  const existingIds = new Set(existing.map((e) => e.questionId));

  const maxBySection = new Map<string, number>();
  for (const e of existing) {
    maxBySection.set(e.sectionKey, Math.max(maxBySection.get(e.sectionKey) ?? 0, e.position));
  }

  const rows: { questionId: string; sectionKey: string; position: number }[] = [];
  for (const id of deduped) {
    if (existingIds.has(id)) continue;
    const name = subjectNameOf(id);
    const sectionKey = (name && subjectToSectionKey(name, template)) || UNASSIGNED_KEY;
    const position = (maxBySection.get(sectionKey) ?? 0) + 1;
    maxBySection.set(sectionKey, position);
    rows.push({ questionId: id, sectionKey, position });
  }

  return { rows, added: rows.length, alreadyIn: deduped.length - rows.length };
}

export type SectionProgress = {
  key: string;
  label: string;
  target: number;
  count: number;
  assignedTo: string[];
};

export type PaperProgress = {
  sections: SectionProgress[];
  /** Questions whose section_key is not in the template (orphaned / unassigned). */
  unassigned: number;
  total: number;
  targetTotal: number;
};

/**
 * Per-section count vs target, in template order, plus an `unassigned` bucket
 * for any membership whose section_key isn't a current template key (a deleted
 * section's leftovers, or the explicit UNASSIGNED_KEY).
 */
export function sectionProgress(
  template: SectionTemplate,
  counts: Record<string, number>
): PaperProgress {
  const templateKeys = new Set(template.map((s) => s.key));
  const sections: SectionProgress[] = template.map((s) => ({
    key: s.key,
    label: s.label,
    target: s.targetCount,
    count: counts[s.key] ?? 0,
    assignedTo: s.assignedTo ?? [],
  }));

  let unassigned = 0;
  let total = 0;
  for (const [key, n] of Object.entries(counts)) {
    total += n;
    if (!templateKeys.has(key)) unassigned += n;
  }

  return {
    sections,
    unassigned,
    total,
    targetTotal: template.reduce((a, s) => a + s.targetCount, 0),
  };
}

/**
 * Freeze a paper's composition on finalize: sections in template order (each
 * sorted by position), orphaned membership collected into a trailing
 * `unassigned` group, plus a flat ordered id list for the export pipeline.
 * Empty sections are omitted.
 */
export function buildSnapshot(
  template: SectionTemplate,
  membership: MembershipRow[]
): PaperSnapshot {
  const templateKeys = new Set(template.map((s) => s.key));
  const sortPos = (a: MembershipRow, b: MembershipRow) => a.position - b.position;

  const sections: PaperSnapshot["sections"] = [];

  for (const s of template) {
    const rows = membership.filter((m) => m.sectionKey === s.key).sort(sortPos);
    if (rows.length === 0) continue;
    sections.push({ key: s.key, label: s.label, questionIds: rows.map((r) => r.questionId) });
  }

  const orphans = membership.filter((m) => !templateKeys.has(m.sectionKey)).sort(sortPos);
  if (orphans.length > 0) {
    sections.push({
      key: UNASSIGNED_KEY,
      label: "Unassigned",
      questionIds: orphans.map((r) => r.questionId),
    });
  }

  return {
    sections,
    orderedQuestionIds: sections.flatMap((s) => s.questionIds),
  };
}
