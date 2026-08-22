/**
 * Shared editorial types for the /guide/mht-cet-maths data modules.
 *
 * `PlaybookDetail` lives here rather than in playbook-details.ts because the
 * 22 chapter deep-dives are authored in two part-files (core + tail) that both
 * need the type; importing it from the module that merges them would be a
 * cycle.
 */

export type PlaybookDetail = {
  /** Matches a Playbook.slug in playbooks.ts. */
  slug: string;
  /** One line: what tells you this chapter's technique is the one required. */
  trigger: string;
  /** 2-4 short paragraphs — how the chapter actually behaves on the paper. */
  story: string[];
  /** The distinct skills inside the chapter, in the order to learn them. */
  subSkills: { name: string; description: string }[];
  /** Distractor shapes this chapter reuses. */
  traps: { name: string; description: string }[];
  /** Left empty deliberately — inventing question UUIDs ships dead links. */
  exampleQuestionIds: string[];
  /** Other playbook slugs worth reading next. Must resolve in playbooks.ts. */
  relatedSlugs: string[];
};
