/**
 * A chapter's prerequisite graph, as the Learn engine needs it. Copied from Concept Ladder
 * (src/content/validate.ts `ancestorsOf`, afca8bf); its GraphNode carries more fields, but
 * the engine reads only these two.
 */
export type ConceptId = string; // "C06"

/** A concept and the concepts that must be mastered before it unlocks. */
export type GraphNode = { id: ConceptId; prereqs: ConceptId[] };

/** Every concept reachable by following prerequisites from `id` (not `id` itself). */
export function ancestorsOf(graph: GraphNode[], id: ConceptId): Set<ConceptId> {
  const prereqs = new Map(graph.map((n) => [n.id, n.prereqs]));
  const seen = new Set<ConceptId>();
  const stack = [...(prereqs.get(id) ?? [])];
  while (stack.length) {
    const p = stack.pop()!;
    if (seen.has(p)) continue;
    seen.add(p);
    stack.push(...(prereqs.get(p) ?? []));
  }
  return seen;
}
