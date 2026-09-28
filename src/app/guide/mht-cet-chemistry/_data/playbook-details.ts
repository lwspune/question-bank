/**
 * Per-playbook deep dives for /guide/mht-cet-chemistry/playbooks/[slug].
 *
 * Authored in two part-files and merged here:
 *   - playbook-details-core.ts — the 8 calculate + 6 reactions chapters
 *   - playbook-details-tail.ts — the 9 recall chapters
 *
 * Consumers import PLAYBOOK_DETAILS from here, never from a part-file.
 */

import type { PlaybookDetail } from "./types";
import { CORE_PLAYBOOK_DETAILS } from "./playbook-details-core";
import { TAIL_PLAYBOOK_DETAILS } from "./playbook-details-tail";

export type { PlaybookDetail };

export const PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  ...CORE_PLAYBOOK_DETAILS,
  ...TAIL_PLAYBOOK_DETAILS,
};

export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
