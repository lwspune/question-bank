import type { QuestionRow } from "@/lib/questions/query";
import type { ConceptTagRef } from "@/lib/links/getResourceTagsForQuestions";
import { groupBySet } from "@/lib/export/groupBySet";
import {
  buildQuestionPayload,
  mapSubjectToTracker,
  type QuestionPayload,
} from "./questionPayload";

/**
 * The paper push: a finished vault paper → a DRAFT exam in that institute's
 * nda-tracker, carrying the diagrams the tags sheet cannot.
 *
 * This does NOT replace the tagged sheet. Both paths stay live and the sheet
 * remains the proven one — the push is additive, it may fail without affecting
 * anything, and a paper is still fully deliverable via Tags + docx if the
 * tracker is unreachable or this is wrong.
 *
 * See nda-tracker `CROSS_APP_SYNC.md` §2 for the contract.
 */

/**
 * Same ceiling as the Word/xlsx export — one paper, one sitting. Lives here
 * rather than in the actions module because a "use server" file may only export
 * async functions; a const export there fails the build (and  cannot see it).
 */
export const PUSH_CAP = 200;

/** A pushed question is the shared payload plus its PRINTED number. */
export type PaperPushQuestion = QuestionPayload & { q: number };

export type PaperPushPayload = {
  /** Discriminator — the tracker hosts this on POST /api/quiz-import (12/12 Hobby functions). */
  kind: "paper";
  /** The vault `papers.id`. The IDEMPOTENCY KEY: a re-push updates, never duplicates. */
  paperId: string;
  title: string;
  subject: string;
  questions: PaperPushQuestion[];
};

/**
 * The tracker's `exams.id` for a vault paper — deterministic, so a re-push
 * upserts onto the same row instead of creating a second exam.
 *
 * NAMESPACED deliberately. Tracker ids are hand-made `exam_<timestamp>`; a
 * vault-sourced exam must be identifiable at a glance and must never be able to
 * collide with one, in either direction.
 */
export function trackerExamId(paperId: string): string {
  return `exam_vault_${paperId}`;
}

/**
 * The paper's subject, as the tracker keys it. A tracker exam carries ONE
 * subject while a vault paper may mix them, so this takes the dominant one
 * (ties → first seen, which is paper order). Faculty can correct it on the
 * draft; guessing wrong is a label, not a data loss.
 */
function dominantSubject(questions: QuestionRow[]): string {
  const counts = new Map<string, number>();
  for (const q of questions) {
    const name = q.subject?.name ?? "";
    if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  let best = "";
  let bestN = 0;
  for (const [name, n] of counts) {
    if (n > bestN) {
      best = name;
      bestN = n;
    }
  }
  return mapSubjectToTracker(best);
}

export type BuildPaperPushInput = {
  /** In PAPER ORDER — the same array the docx and the tags sheet are built from. */
  questions: QuestionRow[];
  paperId: string;
  title: string;
  supabaseUrl: string;
  /** questionId → primary concept tag, for the /go remediation links. Optional. */
  conceptTags?: Map<string, ConceptTagRef>;
};

/**
 * Build the push body.
 *
 * Q-NUMBER PARITY IS THE WHOLE POINT of walking `groupBySet` here rather than
 * numbering the flat array: the printed Word paper, the Evalbee OMR sheet, the
 * tags sheet and this payload must all call the same question Q7. A divergence
 * is undetectable downstream — both sides stay internally consistent while a
 * student's response lands on the wrong question — which is why
 * `tests/sync-paper-push.test.ts` diffs this against `buildTagRows` itself
 * rather than against a hand-written expectation.
 *
 * Deliberately NOT sent: date, marking scheme, batch, max marks. Those are
 * tracker-side facts the vault does not know, and inventing them would put a
 * confident wrong value where faculty expect to fill one in. The exam lands as a
 * draft; the tracker supplies its own defaults for the columns its schema
 * requires (`date` and `source` are NOT NULL there — measured, 2026-09-11).
 */
export function buildPaperPushPayload(
  input: BuildPaperPushInput
): PaperPushPayload {
  const { questions, paperId, title, supabaseUrl, conceptTags } = input;
  if (questions.length === 0) {
    throw new Error("cannot push a paper with no questions");
  }

  const tagFor = (id: string) => conceptTags?.get(id);
  const out: PaperPushQuestion[] = [];
  let position = 1;

  for (const group of groupBySet(questions)) {
    if (group.kind === "single") {
      const q = group.question;
      out.push({
        q: position,
        ...buildQuestionPayload(q, { supabaseUrl, tag: tagFor(q.id) }),
      });
      position += 1;
    } else {
      // Every sibling carries the group's lead passage — robust even when a
      // later sibling's own context is null, mirroring the docx passage banner
      // and buildTagRows. `|| null` because groupBySet coalesces a null passage
      // to "", and the JSON contract is "absent is null, never empty string".
      for (const q of group.questions) {
        out.push({
          q: position,
          ...buildQuestionPayload(q, {
            supabaseUrl,
            context: group.passage || null,
            tag: tagFor(q.id),
          }),
        });
        position += 1;
      }
    }
  }

  return {
    kind: "paper",
    paperId,
    title: title.trim(),
    subject: dominantSubject(questions),
    questions: out,
  };
}

/**
 * Why the Push button is disabled, or null when it is live.
 *
 * A disabled control must say WHY rather than sit dead — and the order matters:
 * "no tracker configured" is reported FIRST because it is the one reason the
 * user cannot fix by editing the paper. Telling someone to remove questions
 * when the real problem is that their institute has no tracker sends them to
 * work that changes nothing.
 *
 * The absence of a `tracker_sync_targets` row IS the gate (migration 0094) —
 * deliberately not an allow-list of institute names, which is the wart
 * `DESTINATION_ORG_NAME = "LWS Pune"` already represents elsewhere. The button
 * lights up by itself the day an institute is provisioned.
 */
export function pushDisabledReason(input: {
  hasTarget: boolean;
  count: number;
  cap: number;
}): string | null {
  const { hasTarget, count, cap } = input;
  if (!hasTarget) {
    return "No tracker configured for this institute — nothing to push to.";
  }
  if (count === 0) return "This paper has no questions yet.";
  if (count > cap) {
    return `This paper has ${count} questions — the push cap is ${cap}.`;
  }
  return null;
}
