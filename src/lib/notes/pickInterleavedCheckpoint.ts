/**
 * Pick `count` question ids from a per-concept drill map, round-robin
 * across concepts in `conceptOrder`. Used by the per-subtopic mastery
 * checkpoint to interleave practice across concepts rather than block
 * them — interleaved practice improves transfer (Roediger / Bjork).
 *
 * Deterministic: identical inputs always produce identical outputs, so
 * the checkpoint stays stable across ISR renders and the subtopic page
 * caches cleanly.
 *
 * Rules:
 *   - Only slugs present in BOTH `conceptOrder` and the map contribute.
 *   - Within a concept, the original array order is preserved (no shuffle).
 *   - Concepts contribute one id per round in `conceptOrder` order; a
 *     concept that has already been exhausted is silently skipped.
 *   - Duplicate ids across concepts are de-duplicated (first wins).
 *   - When the available pool is smaller than `count`, returns the full
 *     pool without padding.
 *
 * @param drillsByConcept Map<conceptSlug, questionIds[]> — typically the
 *   output of `loadResolvedDrills`.
 * @param conceptOrder Ordered concept slugs from the SubtopicNote. Drives
 *   the round-robin priority — earlier slugs contribute first.
 * @param count Target checkpoint size. Defaults to 5.
 */
export function pickInterleavedCheckpoint(
  drillsByConcept: Map<string, string[]>,
  conceptOrder: string[],
  count: number = 5
): string[] {
  if (count <= 0) return [];

  const active = conceptOrder
    .map((slug) => drillsByConcept.get(slug))
    .filter((ids): ids is string[] => Array.isArray(ids) && ids.length > 0);
  if (active.length === 0) return [];

  const picked: string[] = [];
  const seen = new Set<string>();
  const maxLen = Math.max(...active.map((ids) => ids.length));

  for (let round = 0; round < maxLen && picked.length < count; round++) {
    for (const ids of active) {
      if (picked.length >= count) break;
      const id = ids[round];
      if (!id || seen.has(id)) continue;
      picked.push(id);
      seen.add(id);
    }
  }

  return picked;
}
