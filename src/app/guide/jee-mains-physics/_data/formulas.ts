/**
 * Content for /guide/jee-mains-physics/formulas — the formulas and results JEE Mains Physics actually
 * tests, one group per playbook chapter, in book order (mechanics, then heat and waves, then
 * electricity and magnetism, then optics and modern physics).
 *
 * PLAIN TEXT + UNICODE, NOT LaTeX: the shared FormulaSheet prints `formula` as raw text, so LaTeX
 * would ship as literal markup (see GUIDE_TEMPLATES.md). Each entry is drawn from a concept in the
 * chapter's /notes/jee-mains-physics pages — what the notes rest on, not a syllabus dump. The two
 * halves were drafted separately (formulas-a.ts: mechanics to waves; formulas-b.ts: electricity to
 * semiconductors) and are merged here.
 */

import { FORMULA_GROUPS_A } from "./formulas-a";
import { FORMULA_GROUPS_B } from "./formulas-b";
import type { FormulaGroup } from "./types";

export const FORMULA_GROUPS: FormulaGroup[] = [...FORMULA_GROUPS_A, ...FORMULA_GROUPS_B];

export const FORMULA_STATS = {
  formulas: FORMULA_GROUPS.reduce((s, g) => s + g.formulas.length, 0),
  chapters: FORMULA_GROUPS.length,
};
