/** Merges the playbook deep-dives for /guide/jee-mains-physics. */
import { PLAYBOOK_DETAILS_A } from "./playbook-details-a";
import { PLAYBOOK_DETAILS_B } from "./playbook-details-b";
import { PLAYBOOK_DETAILS_C } from "./playbook-details-c";
import type { PlaybookDetail } from "./types";

export type { PlaybookDetail };

export const PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  ...PLAYBOOK_DETAILS_A,
  ...PLAYBOOK_DETAILS_B,
  ...PLAYBOOK_DETAILS_C,
};

export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
