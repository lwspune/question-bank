/**
 * Pure ordering, progress, and snapshot helpers for the paper builder.
 */
import { UNASSIGNED_KEY } from "./template";
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
