/**
 * Plan a key change on a LIVE CDS General Knowledge row, keeping the row's id.
 *
 * Pure. Spec: tests/cds-gs-key-fix.test.ts. The writer is fix-keys.ts.
 *
 * content_hash is stem + sorted options + answer, so a new key means a new hash.
 * The row is corrected in place (deleting and re-committing would cut every link
 * to it), with the hash the lane's builder would compute: the same stem and
 * options under the new letter. A row whose stored hash does not match its own
 * content is refused: re-hashing it would hide whatever made it stale.
 */
import { contentHash } from "../../src/lib/upload/hash";
import { solutionTail } from "./provenance";

export type LiveRow = {
  text: string;
  content_hash: string;
  options: { label: string; text: string; is_correct: boolean }[];
};
export type KeyFix = { answer: string; reasoning: string };
export type KeyFixPlan = {
  from: string;
  newHash: string;
  solution: string;
  flips: { label: string; is_correct: boolean }[];
};

export function planKeyFix(live: LiveRow, fix: KeyFix, hasAnswerKey: boolean): KeyFixPlan {
  if (hasAnswerKey) throw new Error("this paper has an official key; its answers are UPSC's, not ours to change");
  const to = fix.answer.trim().toUpperCase();
  const keyed = live.options.filter((o) => o.is_correct);
  if (keyed.length !== 1) throw new Error(`expected exactly one keyed option, found ${keyed.length}`);
  const from = keyed[0].label;
  if (to === from) throw new Error(`the key is already ${from}`);
  if (!live.options.some((o) => o.label === to)) throw new Error(`the row has no option ${to}`);
  if (!fix.reasoning?.trim() || /[[\]]/.test(fix.reasoning)) throw new Error("reasoning is empty or carries a bracket");

  const texts = live.options.map((o) => o.text);
  if (contentHash(live.text, texts, from) !== live.content_hash) {
    throw new Error("stale hash: the stored content_hash does not match the row's own stem, options and key");
  }
  const tail = solutionTail({ hasAnswerKey: false, confidence: "", agreed: true, corrected: true });
  return {
    from,
    newHash: contentHash(live.text, texts, to),
    solution: `${fix.reasoning.trim()} ${tail}`,
    flips: [
      { label: from, is_correct: false },
      { label: to, is_correct: true },
    ],
  };
}
