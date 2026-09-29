/**
 * "What is here", derived from EXAM_REGISTRY — the exam list the About page
 * prints. Typed lists rot: the README named eleven exams for three ingests
 * after UPSC, IPMAT and MPSC landed. Spec: tests/exam-coverage.test.ts.
 */
import { EXAM_REGISTRY, type ExamEntry } from "./examContext";

/** "10, 11 and 12" */
export function joinList(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * One item per exam, family or school board, in first-seen registry order:
 *   "NDA" · "IPMAT (Indore, Rohtak, Jammu)" ·
 *   "MPSC (Prelims: Group B & C, State Services; Mains: STI, …)" ·
 *   "CBSE Classes 10, 11 and 12"
 * An exam with no public content is left out — it is not "here".
 */
export function examCoverageGroups(
  registry: readonly ExamEntry[] = EXAM_REGISTRY
): string[] {
  type Group =
    | { kind: "plain"; label: string }
    | { kind: "family"; name: string; stages: Map<string, string[]> }
    | { kind: "board"; name: string; stds: number[] };

  const order: string[] = [];
  const groups = new Map<string, Group>();

  for (const e of registry) {
    if (e.noPublicContent) continue;
    if (e.family) {
      const key = `family:${e.family}`;
      let g = groups.get(key) as Extract<Group, { kind: "family" }> | undefined;
      if (!g) {
        g = { kind: "family", name: e.family, stages: new Map() };
        groups.set(key, g);
        order.push(key);
      }
      const stage = e.familyStage ?? "";
      const list = g.stages.get(stage) ?? [];
      list.push(e.familyLabel ?? e.displayName);
      g.stages.set(stage, list);
    } else if (e.board && e.std) {
      const key = `board:${e.board}`;
      let g = groups.get(key) as Extract<Group, { kind: "board" }> | undefined;
      if (!g) {
        g = { kind: "board", name: e.board, stds: [] };
        groups.set(key, g);
        order.push(key);
      }
      g.stds.push(e.std);
    } else {
      const key = `plain:${e.slug}`;
      groups.set(key, { kind: "plain", label: e.displayName });
      order.push(key);
    }
  }

  return order.map((key) => {
    const g = groups.get(key)!;
    if (g.kind === "plain") return g.label;
    if (g.kind === "board") {
      const stds = [...g.stds].sort((a, b) => a - b).map(String);
      return `${g.name} ${stds.length === 1 ? "Class" : "Classes"} ${joinList(stds)}`;
    }
    const staged = [...g.stages.entries()];
    const inner =
      staged.length === 1 && staged[0][0] === ""
        ? staged[0][1].join(", ")
        : staged.map(([stage, members]) => `${stage}: ${members.join(", ")}`).join("; ");
    return `${g.name} (${inner})`;
  });
}
