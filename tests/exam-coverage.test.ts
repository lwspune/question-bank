/**
 * The "what is here" sentence on /about is DERIVED from EXAM_REGISTRY, never
 * typed — a typed list lagged the bank by three exams on the README until
 * 2026-09-29. These rules turn the registry into the groups a reader expects:
 * a picker family reads as one item ("IPMAT (Indore, Rohtak, Jammu)"), a
 * school board reads as one item across its classes ("CBSE Classes 10, 11 and
 * 12"), and everything else is its display name, in registry order.
 */
import { describe, it, expect } from "vitest";
import { examCoverageGroups, joinList } from "../src/lib/exam/coverage";
import { EXAM_REGISTRY, type ExamEntry } from "../src/lib/exam/examContext";

// Synthetic slugs are fine here: the rules never look the slug up.
const entry = (over: Partial<Omit<ExamEntry, "slug">> & { slug: string }): ExamEntry =>
  ({
    displayName: over.slug.toUpperCase(),
    examName: over.slug.toUpperCase(),
    tier: "senior",
    guidesPath: null,
    notesPath: null,
    ...over,
  }) as unknown as ExamEntry;

describe("joinList", () => {
  it("joins with commas and a final 'and'", () => {
    expect(joinList(["10"])).toBe("10");
    expect(joinList(["10", "11"])).toBe("10 and 11");
    expect(joinList(["10", "11", "12"])).toBe("10, 11 and 12");
  });
});

describe("examCoverageGroups", () => {
  it("lists plain exams by display name in registry order", () => {
    const groups = examCoverageGroups([
      entry({ slug: "nda", displayName: "NDA" }),
      entry({ slug: "neet", displayName: "NEET" }),
    ]);
    expect(groups).toEqual(["NDA", "NEET"]);
  });

  it("collapses a family into one item listing its members' family labels", () => {
    const groups = examCoverageGroups([
      entry({ slug: "a", family: "IPMAT", familyLabel: "Indore" }),
      entry({ slug: "b", family: "IPMAT", familyLabel: "Rohtak" }),
      entry({ slug: "c", family: "IPMAT", familyLabel: "Jammu" }),
    ]);
    expect(groups).toEqual(["IPMAT (Indore, Rohtak, Jammu)"]);
  });

  it("groups a staged family by stage", () => {
    const groups = examCoverageGroups([
      entry({ slug: "a", family: "MPSC", familyStage: "Prelims", familyLabel: "Group B & C" }),
      entry({ slug: "b", family: "MPSC", familyStage: "Prelims", familyLabel: "State Services" }),
      entry({ slug: "c", family: "MPSC", familyStage: "Mains", familyLabel: "STI" }),
    ]);
    expect(groups).toEqual(["MPSC (Prelims: Group B & C, State Services; Mains: STI)"]);
  });

  it("collapses a school board into one item across its classes, sorted", () => {
    const groups = examCoverageGroups([
      entry({ slug: "mh12", board: "Maharashtra State Board", std: 12 }),
      entry({ slug: "cbse10", board: "CBSE", std: 10 }),
      entry({ slug: "cbse12", board: "CBSE", std: 12 }),
      entry({ slug: "mh9", board: "Maharashtra State Board", std: 9 }),
      entry({ slug: "cbse11", board: "CBSE", std: 11 }),
    ]);
    // First-seen order decides the group order; classes sort within a group.
    expect(groups).toEqual([
      "Maharashtra State Board Classes 9 and 12",
      "CBSE Classes 10, 11 and 12",
    ]);
  });

  it("leaves out an exam with no public content", () => {
    const groups = examCoverageGroups([
      entry({ slug: "isc", board: "CISCE", std: 12, noPublicContent: true }),
      entry({ slug: "nda", displayName: "NDA" }),
    ]);
    expect(groups).toEqual(["NDA"]);
  });

  it("on the live registry: every group is non-empty and ISC is absent", () => {
    const groups = examCoverageGroups(EXAM_REGISTRY);
    expect(groups.length).toBeGreaterThan(5);
    for (const g of groups) expect(g.trim().length).toBeGreaterThan(0);
    expect(groups.join(" ")).not.toMatch(/ISC|CISCE/);
    expect(groups).toContain("IPMAT (Indore, Rohtak, Jammu)");
    expect(groups).toContain("CBSE Classes 10, 11 and 12");
  });
});
