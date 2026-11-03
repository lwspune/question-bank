import { describe, expect, it } from "vitest";
import { EXAM_DEMAND_ORDER, sortByDemand } from "@/lib/exam/demandOrder";
import { groupExamFamilies, type ExamFamilyNode } from "@/lib/exam/examFamily";
import { PYQVAULT_EXAMS, getExamBySlug } from "@/lib/exam/examContext";

const nodeKey = <T,>(n: ExamFamilyNode<T>) => (n.kind === "family" ? n.key : (n as { entry: { slug: string } | null }).entry?.slug);

describe("sortByDemand", () => {
  const nodes = groupExamFamilies(
    PYQVAULT_EXAMS.map((e) => ({ slug: e.slug })),
    (e) => getExamBySlug(e.slug)
  );

  it("puts the most-chosen exams first, not NDA", () => {
    const keys = sortByDemand(nodes).map(nodeKey);
    expect(keys.slice(0, 3)).toEqual(["Maharashtra State Board", "jee-mains", "mht-cet"]);
  });

  it("keeps every node, and keeps registry order for any not in the list", () => {
    const sorted = sortByDemand(nodes);
    expect(sorted).toHaveLength(nodes.length);
    expect(new Set(sorted)).toEqual(new Set(nodes));
  });

  // Both directions (a list that names a dead key, or misses a live card).
  it("names every card on the page and nothing else", () => {
    const live = new Set(nodes.map(nodeKey));
    expect(EXAM_DEMAND_ORDER.filter((k) => !live.has(k))).toEqual([]);
    expect([...live].filter((k) => !EXAM_DEMAND_ORDER.includes(k as string))).toEqual([]);
  });
});
