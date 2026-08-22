/**
 * Per-playbook deep dives for /guide/mht-cet-maths/playbooks/[slug].
 *
 * Authored in TWO part-files and merged here:
 *   - playbook-details-core.ts — the 6 cornerstone + 5 quick-win chapters
 *   - playbook-details-tail.ts — the 11 long-tail chapters
 *
 * The split is purely an authoring convenience (22 chapter deep-dives is the
 * bulk of this guide's editorial). Consumers should import PLAYBOOK_DETAILS
 * from here and never reach into a part-file, so the split can change without
 * touching a route.
 *
 * The shared `PlaybookDetail` type lives in ./types so both parts can import
 * it without a cycle through this module.
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
