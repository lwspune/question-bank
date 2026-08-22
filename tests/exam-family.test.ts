import { describe, it, expect } from "vitest";
import {
  groupExamFamilies,
  resolveFamilySelection,
  familyDefaultValue,
  familyTotal,
  familyKey,
  isFamilyKey,
  type ExamFamilyNode,
} from "@/lib/exam/examFamily";
import { getExamBySlug, getExamByName } from "@/lib/exam/examContext";

/**
 * The pure core behind the grouped exam pickers (/browse filter, profile chips,
 * homepage cards, /browse landing pills). Every surface passes its OWN item
 * shape plus a resolver, so the grouping rules are tested once here rather than
 * re-implemented four times.
 */

type Item = { slug: string };
const bySlug = (i: Item) => getExamBySlug(i.slug);
const items = (...slugs: string[]): Item[] => slugs.map((slug) => ({ slug }));

/** Flattened shape for terse assertions: "flat:nda" / "family:CBSE[11,12]". */
function describeNodes(nodes: ExamFamilyNode<Item>[]): string[] {
  return nodes.map((n) =>
    n.kind === "flat"
      ? `flat:${n.item.slug}`
      : `family:${n.board}[${n.classes.map((c) => c.std).join(",")}]`
  );
}

describe("groupExamFamilies", () => {
  it("groups the board exams into families and leaves the rest flat", () => {
    const nodes = groupExamFamilies(
      items("nda", "cbse-11", "cbse-12", "jee-mains", "mh-sb-9", "mh-ssc-10"),
      bySlug
    );
    expect(describeNodes(nodes)).toEqual([
      "flat:nda",
      "family:CBSE[11,12]",
      "flat:jee-mains",
      "family:Maharashtra State Board[9,10]",
    ]);
  });

  it("puts a family where its FIRST member sat, preserving surrounding order", () => {
    const nodes = groupExamFamilies(items("cbse-11", "nda", "cbse-12"), bySlug);
    expect(describeNodes(nodes)).toEqual(["family:CBSE[11,12]", "flat:nda"]);
  });

  it("orders classes NUMERICALLY, not by input or name order", () => {
    // The live defect this fixes: the /browse dropdown is DB-alphabetical on
    // exam name, so it reads "...Class 10, ...Class 11, ...Class 9" - 9 last.
    const nodes = groupExamFamilies(
      items("mh-ssc-10", "mh-sb-11", "mh-sb-9", "mh-hsc-12"),
      bySlug
    );
    expect(describeNodes(nodes)).toEqual([
      "family:Maharashtra State Board[9,10,11,12]",
    ]);
  });

  it("keeps Maharashtra HSC 12 groupable despite its odd DB name", () => {
    // Its examName is "Maharashtra HSC Class 12" while its three siblings are
    // "Maharashtra State Board Class N", so name-prefix grouping would miss it.
    // Grouping is on the registry `board` field, which is why it cannot.
    const nodes = groupExamFamilies(items("mh-hsc-12", "mh-sb-9"), bySlug);
    expect(describeNodes(nodes)).toEqual(["family:Maharashtra State Board[9,12]"]);
  });

  // FAIL OPEN. An exam present in the DB but not yet in EXAM_REGISTRY must keep
  // appearing as a top-level entry. Driving the list off the registry instead
  // would make a newly-ingested exam VANISH from the picker until someone edits
  // TS - the wrong polarity (cf. needsBuild's allowlist-of-skips).
  it("leaves an unregistered item flat rather than dropping it", () => {
    const nodes = groupExamFamilies(items("nda", "brand-new-exam"), bySlug);
    expect(describeNodes(nodes)).toEqual(["flat:nda", "flat:brand-new-exam"]);
  });

  it("degrades a family of ONE to a flat entry", () => {
    // A one-option Class dropdown is noise. This is reachable today: the
    // landing pills drop any exam with 0 questions in the default view, so a
    // family can arrive here with a single surviving member.
    const nodes = groupExamFamilies(items("nda", "cbse-12"), bySlug);
    expect(describeNodes(nodes)).toEqual(["flat:nda", "flat:cbse-12"]);
  });

  it("returns [] for an empty list", () => {
    expect(groupExamFamilies([], bySlug)).toEqual([]);
  });

  it("labels a family by its board and each class by its std", () => {
    const [node] = groupExamFamilies(items("cbse-11", "cbse-12"), bySlug);
    if (node.kind !== "family") throw new Error("expected a family");
    expect(node.label).toBe("CBSE");
    expect(node.classes.map((c) => c.label)).toEqual(["Class 11", "Class 12"]);
  });

  it("uses the registry's classLabel override where a board names its years", () => {
    // Maharashtra students say SSC (10) and HSC (12), and those are the terms
    // they search for. Derived `Class N` everywhere else, so nothing to rot.
    const [node] = groupExamFamilies(
      items("mh-sb-9", "mh-ssc-10", "mh-sb-11", "mh-hsc-12"),
      bySlug
    );
    if (node.kind !== "family") throw new Error("expected a family");
    expect(node.classes.map((c) => c.label)).toEqual([
      "Class 9",
      "Class 10 (SSC)",
      "Class 11",
      "Class 12 (HSC)",
    ]);
  });

  it("works off exam NAME too - the shape /browse's DB-driven list has", () => {
    type Row = { id: string; name: string };
    const rows: Row[] = [
      { id: "u1", name: "NDA" },
      { id: "u2", name: "CBSE Class 12" },
      { id: "u3", name: "CBSE Class 11" },
    ];
    const nodes = groupExamFamilies(rows, (r) => getExamByName(r.name));
    expect(
      nodes.map((n) =>
        n.kind === "flat"
          ? n.item.name
          : `${n.board}:${n.classes.map((c) => c.item.id).join(",")}`
      )
    ).toEqual(["NDA", "CBSE:u3,u2"]);
  });
});

describe("familyKey / isFamilyKey", () => {
  it("namespaces a family so it can never collide with an exam UUID", () => {
    expect(familyKey("CBSE")).toBe("board:CBSE");
    expect(isFamilyKey("board:CBSE")).toBe(true);
    expect(isFamilyKey("9b11f033-14c3-4312-8f03-eca3c3d2c87c")).toBe(false);
    expect(isFamilyKey("__ALL__")).toBe(false);
  });
});

describe("resolveFamilySelection", () => {
  const nodes = groupExamFamilies(
    items("nda", "cbse-11", "cbse-12", "mh-sb-9", "mh-ssc-10"),
    bySlug
  );
  const selected = (slug: string | null) =>
    resolveFamilySelection(nodes, slug, (i) => i.slug);

  it("derives the family from the selected exam, so a shared URL just works", () => {
    // No new URL param and no client state: the family is a function of the
    // examId already in the URL.
    expect(selected("cbse-12")).toEqual({
      topValue: "board:CBSE",
      classValue: "cbse-12",
      classes: [
        { std: 11, label: "Class 11", value: "cbse-11" },
        { std: 12, label: "Class 12", value: "cbse-12" },
      ],
    });
  });

  it("reports a flat exam as its own top value with no class list", () => {
    expect(selected("nda")).toEqual({
      topValue: "nda",
      classValue: null,
      classes: [],
    });
  });

  it("reports nothing selected when there is no exam", () => {
    expect(selected(null)).toEqual({
      topValue: null,
      classValue: null,
      classes: [],
    });
  });

  it("reports nothing selected for an exam absent from the list", () => {
    // e.g. a stale ?examId= for an exam that has since been withdrawn.
    expect(selected("neet")).toEqual({
      topValue: null,
      classValue: null,
      classes: [],
    });
  });
});

describe("familyTotal", () => {
  it("sums whatever count the CALLER supplies", () => {
    type Row = { slug: string; n: number };
    const rows: Row[] = [
      { slug: "cbse-11", n: 1159 },
      { slug: "cbse-12", n: 3180 },
    ];
    const [node] = groupExamFamilies(rows, (r) => getExamBySlug(r.slug));
    if (node.kind !== "family") throw new Error("expected a family");
    expect(familyTotal(node, (r) => r.n)).toBe(4339);
    // The count is a parameter because the homepage (total PUBLIC) and the
    // /browse pills (default-view, PYQ-only) count different things. A pill
    // must never advertise a number its destination contradicts.
    expect(familyTotal(node, () => 0)).toBe(0);
  });
});

describe("familyDefaultValue", () => {
  it("picks a family's LOWEST class as the value to commit", () => {
    const [, family] = groupExamFamilies(
      items("nda", "mh-hsc-12", "mh-sb-11", "mh-sb-9", "mh-ssc-10"),
      bySlug
    );
    if (family.kind !== "family") throw new Error("expected a family");
    // Selecting "Maharashtra State Board" must land on a CONCRETE exam - there
    // is no board-with-no-class state the bank can express, because the
    // taxonomy below exam is per-exam ("Mathematics" is 4 distinct subject rows
    // across these 4 exams). A null examId here would show the whole bank under
    // a trigger reading "Maharashtra State Board".
    expect(familyDefaultValue(family, (i) => i.slug)).toBe("mh-sb-9");
  });
});
