/**
 * Content for /guide/jee-mains-chemistry/reference — the Chemistry counterpart of a /formulas page.
 * Each chapter's group holds whatever the chapter turns on: the formulas for the Calculate strand, the
 * reagents and named reactions for Reactions, the orders, tests and tables for Structure and recall.
 *
 * Authored in two parts (reference-a: Calculate + Reactions, reference-b: Structure) and put in
 * PLAYBOOK order here, so the page reads in the same order as the playbooks. Rendered by the shared
 * FormulaSheet: plain text + unicode, never LaTeX.
 */
import { PLAYBOOK_SLUGS } from "./playbooks";
import { REFERENCE_GROUPS_A } from "./reference-a";
import { REFERENCE_GROUPS_B } from "./reference-b";
import type { ReferenceGroup } from "./types";

export type { ReferenceGroup };

const order = (slug: string) => {
  const i = PLAYBOOK_SLUGS.indexOf(slug);
  if (i < 0) throw new Error(`jee-mains-chemistry reference: "${slug}" is not a playbook`);
  return i;
};

export const REFERENCE_GROUPS: ReferenceGroup[] = [...REFERENCE_GROUPS_A, ...REFERENCE_GROUPS_B].sort(
  (a, b) => order(a.playbookSlug) - order(b.playbookSlug),
);
