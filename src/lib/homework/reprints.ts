/**
 * Reprints in a homework plan (2026-11-06, SSC CGL). When a shift reprinted a
 * question the bank already held, the ingestion kept ONE row and listed the
 * reprint in scripts/ssc-cgl/repeats.json, so counting sittings from rows alone
 * would rank a question SSC asked twice as "asked once". These add the reprint
 * shifts back. Pure; spec tests/homework-reprints.test.ts.
 */
import { compareSittings } from "./sittings";

export type AssembledGroup = { tier: "repeat" | "type"; label: string; sittings: string[]; questionIds: string[] };

/**
 * Question id -> the shifts that reprinted it, from repeats.json ({ shiftKey:
 * [{ questionId }] }). Tier I shifts only ("t1-..."): Tier II is its own exam.
 */
export function reprintSittings(
  repeats: Record<string, readonly { questionId: string }[]>,
  labelOf: (shiftKey: string) => string | undefined
): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const [key, list] of Object.entries(repeats)) {
    if (!key.startsWith("t1-")) continue;
    const label = labelOf(key);
    if (!label) throw new Error(`cannot name the reprinting shift ${key}`);
    for (const r of list) (out.get(r.questionId) ?? out.set(r.questionId, []).get(r.questionId)!).push(label);
  }
  for (const list of out.values()) list.sort(compareSittings);
  return out;
}

const bare = (s: string) => s.replace(/\*$/, "");

/**
 * Adds each reprinted question's reprint shifts to the repeat group holding it,
 * or gives it a repeat group of its own. A reprint is word for word, so its
 * shift is never starred.
 */
export function addReprints(
  groups: readonly AssembledGroup[],
  reprints: ReadonlyMap<string, readonly string[]>,
  sittingOf: (questionId: string) => string
): AssembledGroup[] {
  const out = groups.map((g) => ({ ...g, sittings: [...g.sittings], questionIds: [...g.questionIds] }));
  for (const [id, shifts] of reprints) {
    const group = out.find((g) => g.tier === "repeat" && g.questionIds.includes(id));
    if (group) {
      const have = new Set(group.sittings.map(bare));
      group.sittings.push(...shifts.filter((s) => !have.has(s)));
      group.sittings.sort((a, b) => compareSittings(bare(a), bare(b)));
    } else {
      out.push({
        tier: "repeat",
        label: "Reprinted word for word",
        sittings: [...new Set([sittingOf(id), ...shifts])].sort(compareSittings),
        questionIds: [id],
      });
    }
  }
  return out;
}
