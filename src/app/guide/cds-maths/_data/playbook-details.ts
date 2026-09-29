/** Merges the playbook deep-dives for /guide/cds-maths. */
import { CORE_PLAYBOOK_DETAILS } from "./playbook-details-core";
import { SELECTIVE_PLAYBOOK_DETAILS } from "./playbook-details-selective";
import type { PlaybookDetail } from "./types";

export type { PlaybookDetail };

export const PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  ...CORE_PLAYBOOK_DETAILS,
  ...SELECTIVE_PLAYBOOK_DETAILS,
};

export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
