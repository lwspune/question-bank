/**
 * Bridge: blueprint -> the paper's stored `section_template`.
 *
 * Materialising a blueprint produces ordinary `PaperSection`s, which is the
 * whole point of the design — once created, a written paper is edited by the
 * SAME membership code as an MCQ paper. The blueprint is a starting shape, not
 * a permanent parent, so a teacher can retarget a slot afterwards without the
 * paper losing coherence.
 *
 * Pure. No I/O.
 */
import type { PaperSection, SectionTemplate } from "../types";
import type { PaperMeta, WrittenBlueprint, WrittenSlot } from "./types";

export function slotToSection(slot: WrittenSlot): PaperSection {
  return {
    key: slot.key,
    label: slot.label,
    targetCount: slot.print,
    assignedTo: [],
    code: slot.code,
    instruction: slot.instruction,
    attempt: slot.attempt,
    marksEach: slot.marksEach,
    format: slot.format,
  };
}

export function blueprintToTemplate(bp: WrittenBlueprint): SectionTemplate {
  return bp.slots.map(slotToSection);
}

/** The paper-level header data a blueprint implies, for `papers.paper_meta`. */
export function blueprintToMeta(
  bp: WrittenBlueprint,
  subject: string,
  schoolName?: string
): PaperMeta {
  return {
    kind: "written",
    board: bp.board,
    std: bp.std,
    subject,
    variant: bp.variant,
    blueprintId: bp.id,
    durationMins: bp.durationMins,
    maxMarks: bp.maxMarks,
    instructions: bp.instructions,
    schoolName,
  };
}

/**
 * Marks a section contributes. Falls back to `targetCount` when `attempt` is
 * absent so a half-configured custom slot still totals something sensible;
 * returns 0 when the section carries no marks at all (i.e. MCQ mode).
 */
export function sectionMarks(section: PaperSection): number {
  if (section.marksEach == null) return 0;
  const attempt = section.attempt ?? section.targetCount;
  return attempt * section.marksEach;
}

export function templateTotalMarks(template: SectionTemplate): number {
  return template.reduce((sum, s) => sum + sectionMarks(s), 0);
}

/**
 * True when a paper is a written one. Reads the EXPLICIT discriminator rather
 * than sniffing for marks on the sections — a half-filled custom template would
 * make inference flip mode mid-edit. A paper with no meta is an MCQ paper,
 * which is what every paper built before written mode is.
 */
export function isWrittenPaper(meta: PaperMeta | null | undefined): boolean {
  return meta?.kind === "written";
}
