import { describe, it, expect } from "vitest";
import { EXAM_REGISTRY, getExamBySlug, type ExamEntry } from "@/lib/exam/examContext";
import { groupExamFamilies, type ExamFamilyNode } from "@/lib/exam/examFamily";
import { EXAM_GOALS, GOAL_LABEL, groupByGoal, goalGroupSummary } from "@/lib/exam/examGoals";

/**
 * Every exam declares what the student is aiming for (its `goal`), and the
 * /browse landing groups its exam list by it (2026-11-09). A goal is not the
 * exam's `tier`: SPI is a Class 10 exam whose students are aiming for NDA, so
 * it sits under Defence, not with the school boards.
 */
describe("every exam declares a goal", () => {
  it("is one of the six goals, for every registry entry", () => {
    for (const e of EXAM_REGISTRY) expect(EXAM_GOALS, e.slug).toContain(e.goal);
  });

  it("puts every board exam under School boards", () => {
    for (const e of EXAM_REGISTRY.filter((x) => x.board)) expect(e.goal, e.slug).toBe("boards");
  });

  it("keeps a family's members under one goal, so a family never splits across rows", () => {
    const goalByFamily = new Map<string, string>();
    for (const e of EXAM_REGISTRY) {
      const key = e.family ?? e.board;
      if (!key) continue;
      const seen = goalByFamily.get(key);
      if (seen) expect(e.goal, `${e.slug} in ${key}`).toBe(seen);
      else goalByFamily.set(key, e.goal);
    }
  });

  it.each([
    ["nda", "defence"],
    ["cds", "defence"],
    ["afcat", "defence"],
    ["spi", "defence"],
    ["foundation-course", "defence"],
    ["worksheets-11-12", "defence"],
    ["jee-mains", "science"],
    ["mht-cet", "science"],
    ["neet", "science"],
    ["iiser-iat", "science"],
    ["uceed", "science"],
    ["ssc-cgl", "government"],
    ["upsc-cse", "government"],
    ["mpsc-group-b-c", "government"],
    ["ugc-net", "government"],
    ["ipmat-indore", "management"],
    ["jipmat", "management"],
    ["cbse-12", "boards"],
    ["clat", "law"],
  ])("%s is under %s", (slug, goal) => {
    expect(getExamBySlug(slug)?.goal).toBe(goal);
  });

  it("names each goal the way the page prints it", () => {
    expect(GOAL_LABEL).toEqual({
      boards: "School boards",
      science: "Engineering, medical & design",
      government: "Government jobs",
      defence: "Defence",
      management: "Management",
      law: "Law",
    });
  });
});

type Pill = { slug: string; questionCount: number };
const pill = (slug: string, questionCount = 10): Pill => ({ slug, questionCount });
const resolve = (p: Pill): ExamEntry | null => getExamBySlug(p.slug);
const nodesOf = (pills: Pill[]) => groupExamFamilies(pills, resolve);
const keyOf = (n: ExamFamilyNode<Pill>) => (n.kind === "family" ? n.key : n.item.slug);

describe("groupByGoal", () => {
  it("orders the groups by where each goal first appears, so demand order carries over", () => {
    const groups = groupByGoal(nodesOf([pill("jee-mains"), pill("nda"), pill("neet"), pill("ssc-cgl")]), resolve);
    expect(groups.map((g) => g.goal)).toEqual(["science", "defence", "government"]);
  });

  it("keeps the given order inside a group", () => {
    const groups = groupByGoal(nodesOf([pill("neet"), pill("nda"), pill("jee-mains"), pill("mht-cet")]), resolve);
    expect(groups[0].nodes.map(keyOf)).toEqual(["neet", "jee-mains", "mht-cet"]);
  });

  it("keeps a family whole, as one node", () => {
    const groups = groupByGoal(nodesOf([pill("ssc-cgl"), pill("ssc-cgl-tier-2"), pill("upsc-cse")]), resolve);
    expect(groups).toHaveLength(1);
    expect(groups[0].nodes.map(keyOf)).toEqual(["SSC CGL", "upsc-cse"]);
  });

  it("leaves out goals with no exam on the page", () => {
    const groups = groupByGoal(nodesOf([pill("nda")]), resolve);
    expect(groups.map((g) => g.goal)).toEqual(["defence"]);
  });

  it("drops an exam the registry does not know, rather than inventing a group", () => {
    const groups = groupByGoal(nodesOf([pill("nda"), pill("not-an-exam")]), resolve);
    expect(groups.flatMap((g) => g.nodes.map(keyOf))).toEqual(["nda"]);
  });

  it("labels each group", () => {
    const [g] = groupByGoal(nodesOf([pill("ipmat-indore")]), resolve);
    expect(g.label).toBe("Management");
  });
});

describe("goalGroupSummary", () => {
  it("counts every paper inside a family as an exam, and adds up the questions", () => {
    const [g] = groupByGoal(
      nodesOf([pill("ssc-cgl", 100), pill("ssc-cgl-tier-2", 20), pill("upsc-cse", 5)]),
      resolve
    );
    expect(goalGroupSummary(g, (p) => p.questionCount)).toEqual({ exams: 3, questions: 125, unit: "exams" });
  });

  it("counts boards, not classes, under School boards", () => {
    const [g] = groupByGoal(nodesOf([pill("cbse-10", 1), pill("cbse-12", 2), pill("icse-10", 3)]), resolve);
    expect(goalGroupSummary(g, (p) => p.questionCount)).toEqual({ exams: 2, questions: 6, unit: "boards" });
  });
});
