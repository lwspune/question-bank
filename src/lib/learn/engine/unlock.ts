/**
 * Which concepts a learner can open. Copied from Concept Ladder (src/engine/unlock.ts,
 * afca8bf) without its roles: there, staff never wait on prerequisites (`gateFor`); here the
 * caller passes `gate`.
 */
import { ancestorsOf, type ConceptId, type GraphNode } from "./graph";

export type ConceptState = "unpublished" | "locked" | "available" | "learning" | "mastered";

/**
 * Each concept's state for one learner. With the gate on, a published concept opens once
 * every PUBLISHED prerequisite ancestor is mastered; unpublished ones are assumed known. With
 * it off, every published concept is open.
 */
export function conceptStates(
  graph: GraphNode[],
  published: Set<ConceptId>,
  learner: Map<ConceptId, "learning" | "mastered">,
  gate: boolean,
): Map<ConceptId, ConceptState> {
  const states = new Map<ConceptId, ConceptState>();
  for (const node of graph) {
    if (!published.has(node.id)) {
      states.set(node.id, "unpublished");
      continue;
    }
    const own = learner.get(node.id);
    if (own) {
      states.set(node.id, own);
      continue;
    }
    const blocking = gate && [...ancestorsOf(graph, node.id)].some((a) => published.has(a) && learner.get(a) !== "mastered");
    states.set(node.id, blocking ? "locked" : "available");
  }
  return states;
}

/**
 * Where to go once `current` is mastered: a concept already in progress first, then a newly
 * open one, in chapter order (the chapter map's "Up next"). Null when nothing open is left.
 */
export function nextConceptAfter(
  graph: GraphNode[],
  published: Set<ConceptId>,
  learner: Map<ConceptId, "learning" | "mastered">,
  current: ConceptId,
  gate: boolean,
): ConceptId | null {
  const states = conceptStates(graph, published, new Map([...learner, [current, "mastered"]]), gate);
  const pick = (want: ConceptState) => graph.find((n) => n.id !== current && states.get(n.id) === want)?.id;
  return pick("learning") ?? pick("available") ?? null;
}

/**
 * The published concepts inside a course's scope. Passed to conceptStates in place of
 * `published`, a prerequisite the course doesn't cover counts as known, like an unpublished
 * one. No scope: the whole chapter.
 */
export function inScope(published: Set<ConceptId>, scope?: Set<ConceptId>): Set<ConceptId> {
  return scope ? new Set([...published].filter((id) => scope.has(id))) : published;
}
