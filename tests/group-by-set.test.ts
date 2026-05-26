import { describe, expect, it } from "vitest";
import { groupBySet } from "@/lib/export/groupBySet";
import type { QuestionRow } from "@/lib/questions/query";

const taxonomy = {
  exam: { id: "e", name: "NDA" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Trig Id." },
  subtopic: null,
};

function q(
  id: string,
  setId: string | null = null,
  context: string | null = null
): QuestionRow {
  return {
    id,
    text: `Q ${id}`,
    context,
    difficulty: "EASY",
    solution: null,
    imageUrl: null,
    setId,
    questionNumber: null,
    pyqYear: null,
    pyqMonth: null,
    pyqNote: null,
    ...taxonomy,
    options: [
      { label: "A", text: "a", isCorrect: true, imageUrl: null },
      { label: "B", text: "b", isCorrect: false, imageUrl: null },
      { label: "C", text: "c", isCorrect: false, imageUrl: null },
      { label: "D", text: "d", isCorrect: false, imageUrl: null },
    ],
  };
}

describe("groupBySet", () => {
  it("returns no groups for an empty input", () => {
    expect(groupBySet([])).toEqual([]);
  });

  it("returns each standalone question as its own 'single' group", () => {
    const rows = [q("a"), q("b"), q("c")];
    const groups = groupBySet(rows);
    expect(groups).toHaveLength(3);
    expect(groups.every((g) => g.kind === "single")).toBe(true);
  });

  it("collapses consecutive questions with the same setId into one 'set' group", () => {
    const rows = [
      q("a", "job1:S1", "passage A"),
      q("b", "job1:S1", "passage A"),
      q("c", "job1:S1", "passage A"),
    ];
    const groups = groupBySet(rows);
    expect(groups).toHaveLength(1);
    expect(groups[0].kind).toBe("set");
    if (groups[0].kind === "set") {
      expect(groups[0].setId).toBe("job1:S1");
      expect(groups[0].passage).toBe("passage A");
      expect(groups[0].questions).toHaveLength(3);
    }
  });

  it("starts a new group when the setId changes", () => {
    const rows = [
      q("a", "job1:S1", "p A"),
      q("b", "job1:S1", "p A"),
      q("c", "job1:S2", "p B"),
      q("d", "job1:S2", "p B"),
    ];
    const groups = groupBySet(rows);
    expect(groups).toHaveLength(2);
    expect(groups[0].kind).toBe("set");
    expect(groups[1].kind).toBe("set");
    if (groups[0].kind === "set" && groups[1].kind === "set") {
      expect(groups[0].setId).toBe("job1:S1");
      expect(groups[1].setId).toBe("job1:S2");
    }
  });

  it("breaks a set in two when a standalone question sits between siblings", () => {
    // Same setId on either side, but a standalone in the middle splits them.
    // Documented behaviour: each unbroken run gets its own banner.
    const rows = [
      q("a", "job1:S1", "p A"),
      q("middle", null, null),
      q("b", "job1:S1", "p A"),
    ];
    const groups = groupBySet(rows);
    expect(groups).toHaveLength(3);
    expect(groups[0].kind).toBe("set");
    expect(groups[1].kind).toBe("single");
    expect(groups[2].kind).toBe("set");
  });

  it("treats a set of one as a 'set' group (passage still renders once)", () => {
    const rows = [q("a", "job1:S1", "p A")];
    const groups = groupBySet(rows);
    expect(groups).toHaveLength(1);
    expect(groups[0].kind).toBe("set");
    if (groups[0].kind === "set") {
      expect(groups[0].questions).toHaveLength(1);
    }
  });

  it("falls back to empty-string passage when context is null on a set member (defensive)", () => {
    const rows = [
      q("a", "job1:S1", null),
      q("b", "job1:S1", null),
    ];
    const groups = groupBySet(rows);
    expect(groups[0].kind).toBe("set");
    if (groups[0].kind === "set") {
      expect(groups[0].passage).toBe("");
    }
  });

  it("interleaves single + set groups in input order", () => {
    const rows = [
      q("solo1"),
      q("a", "job1:S1", "p A"),
      q("b", "job1:S1", "p A"),
      q("solo2"),
      q("c", "job1:S2", "p B"),
      q("d", "job1:S2", "p B"),
      q("solo3"),
    ];
    const groups = groupBySet(rows);
    expect(groups.map((g) => g.kind)).toEqual([
      "single",
      "set",
      "single",
      "set",
      "single",
    ]);
  });

  it("preserves question order within a set group", () => {
    const rows = [
      q("a", "job1:S1", "p"),
      q("b", "job1:S1", "p"),
      q("c", "job1:S1", "p"),
    ];
    const groups = groupBySet(rows);
    if (groups[0].kind === "set") {
      expect(groups[0].questions.map((x) => x.id)).toEqual(["a", "b", "c"]);
    }
  });
});
