import { describe, it, expect } from "vitest";
import { BOARD_EXAMS } from "@/lib/exam/examContext";
import { boardIndexNodes } from "@/lib/board/examIndex";

/** Every slug the /board index would link to, families flattened. */
function listedSlugs() {
  return boardIndexNodes().flatMap((n) =>
    n.kind === "family" ? n.members.map((c) => c.item.slug) : [n.item.slug]
  );
}

describe("the /board index", () => {
  // THE LOAD-BEARING ONE. A board exam that stops being listed here is
  // unreachable from the Board tab with no error and no empty state — the
  // failure this file exists to catch. Covers both directions: an exam lost to
  // a dropped flat branch, and one listed twice by a family that also emits its
  // members flat.
  it("lists every board exam exactly once", () => {
    expect(listedSlugs().sort()).toEqual([...BOARD_EXAMS].map((e) => e.slug).sort());
  });

  it("groups Maharashtra State Board before CBSE, with no ungrouped strays", () => {
    const nodes = boardIndexNodes();
    expect(nodes.map((n) => (n.kind === "family" ? n.label : `flat:${n.item.slug}`))).toEqual([
      "Maharashtra State Board",
      "CBSE",
    ]);
  });

  it("orders each board's classes by ascending std", () => {
    for (const node of boardIndexNodes()) {
      if (node.kind !== "family") continue;
      const stds = node.members.map((c) => c.order);
      expect(stds).toEqual([...stds].sort((a, b) => a - b));
    }
  });

  // The two years Maharashtra students actually say. Labels come from the
  // registry's classLabel overrides, so this fails if one is dropped.
  it("labels the Maharashtra years students search for", () => {
    const mh = boardIndexNodes().find((n) => n.kind === "family" && n.label === "Maharashtra State Board");
    expect(mh?.kind).toBe("family");
    if (mh?.kind !== "family") return;
    expect(mh.members.map((c) => c.label)).toEqual([
      "Class 9",
      "Class 10 (SSC)",
      "Class 11",
      "Class 12 (HSC)",
    ]);
  });

  // Proves the flat branch survives. The real registry cannot test this — all
  // six board exams group, so dropping the flat branch is a no-op over it
  // (verified by injection). A board exam registered without board/std must
  // still be listed, per groupExamFamilies' fail-open rule.
  it("still lists a board exam that cannot be grouped", () => {
    const ungroupable = { ...BOARD_EXAMS[0], slug: "nda" as const };
    const nodes = boardIndexNodes([...BOARD_EXAMS, ungroupable]);
    const flat = nodes.filter((n) => n.kind === "flat");
    expect(flat).toHaveLength(1);
    expect(flat[0].kind === "flat" && flat[0].item.slug).toBe("nda");
  });

  it("keeps every class pointing at its own exam", () => {
    for (const node of boardIndexNodes()) {
      if (node.kind !== "family") continue;
      for (const cls of node.members) {
        expect(cls.item.boardExam).toBe(true);
        // For a BOARD family the member's sort `order` is its class number.
        // (A non-board family orders by registry position instead — /board only
        // ever groups board exams, so that case cannot arise here.)
        expect(cls.item.std).toBe(cls.order);
      }
    }
  });
});
