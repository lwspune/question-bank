/**
 * Shared editorial types for the /guide/cds-maths data modules. `PlaybookDetail` lives here because the
 * 22 deep-dives are authored in part-files that both need it.
 */

export type PlaybookDetail = {
  /** Matches a Playbook.slug in playbooks.ts. */
  slug: string;
  /** One line: what tells you this chapter's technique is the one required. */
  trigger: string;
  /** 2-3 short paragraphs — how the chapter behaves on the paper. */
  story: string[];
  /** The distinct skills inside the chapter, in the order to learn them. */
  subSkills: { name: string; description: string }[];
  /** Distractor shapes this chapter reuses. */
  traps: { name: string; description: string }[];
  /** Other playbook slugs worth reading next. Must resolve in playbooks.ts. */
  relatedSlugs: string[];
};
