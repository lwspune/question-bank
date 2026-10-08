import { describe, it, expect } from "vitest";
import { BOARD_EXAMS } from "@/lib/exam/examContext";
import { boardIndexGroups, boardIndexNodes, splitBoardIndex, type BoardIndexGroup } from "@/lib/board/examIndex";

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

describe("the /board index as card data", () => {
  // The page hands this to a client component, so it must carry plain data
  // only, and say exactly what the server-rendered list says today.
  it("carries each family's classes with the board re-attached for screen readers", () => {
    const groups = boardIndexGroups();
    const mh = groups.find((g) => g.kind === "family" && g.label === "Maharashtra State Board");
    expect(mh?.kind).toBe("family");
    if (mh?.kind !== "family") return;
    expect(mh.classes.map((c) => c.slug)).toEqual(["mh-sb-9", "mh-ssc-10", "mh-sb-11", "mh-hsc-12"]);
    expect(mh.classes[1]).toEqual({
      slug: "mh-ssc-10",
      label: "Class 10 (SSC)",
      ariaLabel: "Maharashtra State Board Class 10 (SSC)",
    });
  });

  it("keeps the ungroupable stray as a flat card under its own name", () => {
    const ungroupable = { ...BOARD_EXAMS[0], slug: "nda" as const };
    const flat = boardIndexGroups([...BOARD_EXAMS, ungroupable]).filter((g) => g.kind === "flat");
    expect(flat).toHaveLength(1);
    expect(flat[0].kind === "flat" && flat[0].card).toEqual({ slug: "nda", label: ungroupable.displayName });
  });
});

describe("splitBoardIndex: the student's own class first", () => {
  const groups = boardIndexGroups();
  const labels = (gs: BoardIndexGroup[]) => gs.map((g) => (g.kind === "family" ? g.label : g.card.slug));

  it("puts an MH Class 12 student's board first and folds CBSE away", () => {
    const split = splitBoardIndex(groups, ["mh-hsc-12"]);
    expect(split).not.toBeNull();
    expect(labels(split!.mine)).toEqual(["Maharashtra State Board"]);
    expect(labels(split!.other)).toEqual(["CBSE"]);
    expect(split!.yourClasses).toEqual(["mh-hsc-12"]);
  });

  it("puts CBSE first for a CBSE student, against the page's usual order", () => {
    const split = splitBoardIndex(groups, ["cbse-12"]);
    expect(labels(split!.mine)).toEqual(["CBSE"]);
    expect(labels(split!.other)).toEqual(["Maharashtra State Board"]);
  });

  it("marks only the board classes among a student's mixed choices", () => {
    const split = splitBoardIndex(groups, ["nda", "mh-ssc-10", "jee-mains"]);
    expect(split!.yourClasses).toEqual(["mh-ssc-10"]);
  });

  it("opens both boards, first-chosen first, for a student who picked a class on each", () => {
    const split = splitBoardIndex(groups, ["cbse-11", "mh-sb-11"]);
    expect(labels(split!.mine)).toEqual(["CBSE", "Maharashtra State Board"]);
    expect(split!.other).toEqual([]);
    expect(split!.yourClasses).toEqual(["cbse-11", "mh-sb-11"]);
  });

  // Students without a board class see today's page: null means "no change".
  it("returns null for a student with no board class", () => {
    expect(splitBoardIndex(groups, ["nda", "jee-mains"])).toBeNull();
  });

  it("returns null for a student with no exams at all", () => {
    expect(splitBoardIndex(groups, [])).toBeNull();
  });

  it("never loses a group: mine and other together are the whole list", () => {
    const split = splitBoardIndex(groups, ["mh-sb-9"]);
    expect(labels([...split!.mine, ...split!.other]).sort()).toEqual(labels(groups).sort());
  });

  it("treats a flat stray as the student's own when they picked it", () => {
    const ungroupable = { ...BOARD_EXAMS[0], slug: "nda" as const };
    const withStray = boardIndexGroups([...BOARD_EXAMS, ungroupable]);
    const split = splitBoardIndex(withStray, ["nda"]);
    expect(labels(split!.mine)).toEqual(["nda"]);
    expect(labels(split!.other)).toEqual(["Maharashtra State Board", "CBSE"]);
  });
});
