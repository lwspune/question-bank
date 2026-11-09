/**
 * Exams grouped by what the student is aiming for (2026-11-09): the /browse
 * landing's exam list and the goal pill on each showcase card.
 *
 * The goal itself lives on each registry entry (`ExamEntry.goal`), so a new
 * exam cannot land without one. This module only names the goals and groups
 * nodes that a caller has ALREADY ordered (by demand, with a returning
 * student's exam first): a group appears where its first exam appears, and
 * nothing inside a group is reordered, so one ordering rule serves the whole
 * page. Pure. Spec: tests/exam-goals.test.ts.
 */
import type { ExamGoal } from "./examContext";
import type { ExamFamilyNode, ExamResolver } from "./examFamily";

export const EXAM_GOALS: readonly ExamGoal[] = ["boards", "science", "government", "defence", "management"];

export const GOAL_LABEL: Record<ExamGoal, string> = {
  boards: "School boards",
  science: "Engineering, medical & design",
  government: "Government jobs",
  defence: "Defence",
  management: "Management",
};

export type GoalGroup<T> = { goal: ExamGoal; label: string; nodes: ExamFamilyNode<T>[] };

/** The goal a node belongs to: its own entry's, or a family's first member's. */
export function goalOfNode<T>(node: ExamFamilyNode<T>, resolve: ExamResolver<T>): ExamGoal | null {
  if (node.kind === "flat") return node.entry?.goal ?? null;
  const first = node.members[0];
  return first ? resolve(first.item)?.goal ?? null : null;
}

/**
 * `nodes` split into goal groups, in order of each goal's first appearance.
 * A node with no registry entry is dropped: an unknown exam has no goal, and
 * inventing an "Other" row for it would hide the missing registry entry.
 */
export function groupByGoal<T>(nodes: readonly ExamFamilyNode<T>[], resolve: ExamResolver<T>): GoalGroup<T>[] {
  const groups = new Map<ExamGoal, GoalGroup<T>>();
  for (const node of nodes) {
    const goal = goalOfNode(node, resolve);
    if (!goal) continue;
    let g = groups.get(goal);
    if (!g) {
      g = { goal, label: GOAL_LABEL[goal], nodes: [] };
      groups.set(goal, g);
    }
    g.nodes.push(node);
  }
  return [...groups.values()];
}

/**
 * The line under a group's name. A family's papers each count as an exam
 * (SSC CGL Tier I and Tier II are two exams), except under School boards,
 * where a student thinks in boards, not classes.
 */
export function goalGroupSummary<T>(
  group: GoalGroup<T>,
  countOf: (item: T) => number
): { exams: number; questions: number; unit: "exams" | "boards" } {
  let exams = 0;
  let questions = 0;
  for (const node of group.nodes) {
    if (node.kind === "flat") {
      exams += 1;
      questions += countOf(node.item);
    } else {
      exams += group.goal === "boards" ? 1 : node.members.length;
      for (const m of node.members) questions += countOf(m.item);
    }
  }
  return { exams, questions, unit: group.goal === "boards" ? "boards" : "exams" };
}
