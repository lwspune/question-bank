// Copied from Concept Ladder (src/engine/nextItem.ts, afca8bf).
export type AttemptLite = { itemId: string; correct: boolean };

/** The next question, and whether it is one the learner missed and is now retrying. */
export type NextItem = { itemId: string; retry: boolean };

/**
 * Picks the next question for a concept. `attempts` are this learner's attempts
 * on the concept, oldest first.
 *
 * A question counts by its latest answer (the database's mastery rule): right
 * ones are done, wrong ones are open until answered right. An open question
 * comes back after one other question, oldest miss first, and straight away
 * when there is nothing else to ask. Otherwise a question never attempted
 * comes first; once every question is right, the one answered longest ago.
 */
export function nextItem(itemIds: string[], attempts: AttemptLite[]): NextItem {
  if (itemIds.length === 0) throw new Error("concept has no items");

  const latest = new Map<string, { index: number; correct: boolean }>();
  attempts.forEach((a, index) => latest.set(a.itemId, { index, correct: a.correct }));
  const justAsked = attempts.at(-1)?.itemId;

  const open = itemIds.filter((id) => latest.get(id)?.correct === false).sort((x, y) => latest.get(x)!.index - latest.get(y)!.index);
  const unseen = itemIds.filter((id) => !latest.has(id));

  const spaced = open.find((id) => id !== justAsked);
  if (spaced) return { itemId: spaced, retry: true };
  if (unseen.length > 0) return { itemId: unseen[0], retry: false };
  if (open.length > 0) return { itemId: open[0], retry: true };

  const oldest = itemIds.reduce((best, id) => (latest.get(id)!.index < latest.get(best)!.index ? id : best));
  return { itemId: oldest, retry: false };
}
