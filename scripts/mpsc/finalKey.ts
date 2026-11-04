/**
 * Moving a LIVE paper from MPSC's first answer key to its final key, in place.
 *
 * content_hash covers the answer letter, so a changed key changes the hash: the
 * row keeps its id (drills, saves, mocks and item stats point at it) and takes
 * the hash the lane's own builder now computes (buildRecords -> validateRow).
 * A row whose hash moved WITHOUT an answer change means the stored text drifted
 * from the transcription; that is refused here, not repaired.
 */
/**
 * The notice a cancelled question carries (migration 0119). It names the
 * sitting, because "cancelled" is a fact about one paper's final key. Shared by
 * commit.ts and apply-final-key.ts so a re-keyed row reads like a committed one.
 */
export const cancelledNoteFor = (pyqNote: string) =>
  `Cancelled by MPSC in the final answer key for this paper (${pyqNote}). ` +
  `No option is correct. In PYQ Vault mocks it is awarded to every candidate.`;

export type LiveRow = { n: number; id: string; contentHash: string; answer: string; cancelled: boolean };
export type BuiltRow = { n: number; answer: string; contentHash: string };
export type Change = {
  n: number;
  id: string;
  kind: "rekey" | "cancel";
  from: string;
  to: string;
  oldHash: string;
  newHash: string;
};

export function planFinalKey(live: LiveRow[], built: BuiltRow[]): { changes: Change[]; errors: string[] } {
  const changes: Change[] = [];
  const errors: string[] = [];
  const byN = new Map(live.map((r) => [r.n, r]));
  const builtNs = new Set(built.map((b) => b.n));
  for (const b of [...built].sort((x, y) => x.n - y.n)) {
    const r = byN.get(b.n);
    if (!r) {
      errors.push(`Q${b.n}: no live row`);
      continue;
    }
    if (r.cancelled) {
      if (b.answer !== "CANCELLED") errors.push(`Q${b.n}: cancelled in the bank but keyed ${b.answer} by the final key`);
      continue;
    }
    if (r.answer === b.answer) {
      if (r.contentHash !== b.contentHash)
        errors.push(`Q${b.n}: content_hash differs but the answer did not change: the stored text drifted`);
      continue;
    }
    changes.push({
      n: b.n,
      id: r.id,
      kind: b.answer === "CANCELLED" ? "cancel" : "rekey",
      from: r.answer,
      to: b.answer,
      oldHash: r.contentHash,
      newHash: b.contentHash,
    });
  }
  for (const r of [...live].sort((x, y) => x.n - y.n))
    if (!builtNs.has(r.n)) errors.push(`Q${r.n}: live row but no built record`);
  return { changes, errors };
}
