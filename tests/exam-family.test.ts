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
      : `family:${n.key}[${n.members.map((c) => c.order).join(",")}]`
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
    expect(node.members.map((c) => c.label)).toEqual(["Class 11", "Class 12"]);
  });

  it("uses the registry's classLabel override where a board names its years", () => {
    // Maharashtra students say SSC (10) and HSC (12), and those are the terms
    // they search for. Derived `Class N` everywhere else, so nothing to rot.
    const [node] = groupExamFamilies(
      items("mh-sb-9", "mh-ssc-10", "mh-sb-11", "mh-hsc-12"),
      bySlug
    );
    if (node.kind !== "family") throw new Error("expected a family");
    expect(node.members.map((c) => c.label)).toEqual([
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
          : `${n.key}:${n.members.map((c) => c.item.id).join(",")}`
      )
    ).toEqual(["NDA", "CBSE:u3,u2"]);
  });
});

describe("familyKey / isFamilyKey", () => {
  it("namespaces a family so it can never collide with an exam UUID", () => {
    expect(familyKey("CBSE")).toBe("family:CBSE");
    expect(isFamilyKey("family:CBSE")).toBe(true);
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
      topValue: "family:CBSE",
      classValue: "cbse-12",
      members: [
        { order: 11, label: "Class 11", value: "cbse-11" },
        { order: 12, label: "Class 12", value: "cbse-12" },
      ],
      memberAxis: "Class",
    });
  });

  it("reports a flat exam as its own top value with no class list", () => {
    expect(selected("nda")).toEqual({
      topValue: "nda",
      classValue: null,
      members: [],
      memberAxis: null,
    });
  });

  it("reports nothing selected when there is no exam", () => {
    expect(selected(null)).toEqual({
      topValue: null,
      classValue: null,
      members: [],
      memberAxis: null,
    });
  });

  it("reports nothing selected for an exam absent from the list", () => {
    // e.g. a stale ?examId= for an exam that has since been withdrawn.
    expect(selected("neet")).toEqual({
      topValue: null,
      classValue: null,
      members: [],
      memberAxis: null,
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

/**
 * NON-BOARD FAMILIES (2026-09-24). The grouping axis was `board` + `std`, which
 * cannot express IPMAT: three sibling exams (Indore, Rohtak, Jammu) that are
 * neither a board nor a class. The node's discriminating field is now a generic
 * `key`, and an entry opts in with `family` + `familyLabel` instead of
 * `board` + `std`.
 *
 * The board path is unchanged and is asserted above — these cases exist to pin
 * that the generic path obeys the SAME three rules, because a second grouping
 * mechanism that silently ordered or degraded differently would be worse than
 * no generalisation at all.
 */
describe("groupExamFamilies — non-board families", () => {
  const ipmat = (): Item[] => items("ipmat-indore", "ipmat-rohtak", "jipmat");

  it("groups exams sharing a `family` key, labelled by familyLabel", () => {
    const nodes = groupExamFamilies(ipmat(), bySlug);
    expect(nodes).toHaveLength(1);
    const node = nodes[0];
    if (node.kind !== "family") throw new Error("expected a family");
    expect(node.key).toBe("IPMAT");
    expect(node.label).toBe("IPMAT");
    expect(node.members.map((m) => m.label)).toEqual(["Indore", "Rohtak", "Jammu"]);
  });

  it("orders members by REGISTRY position, since there is no std to sort on", () => {
    // Reversing the input must not reorder the family: a board family sorts
    // numerically by class, and the non-board equivalent of "numeric class
    // order" is the order the registry declares, not the caller's array order.
    const nodes = groupExamFamilies([...ipmat()].reverse(), bySlug);
    const node = nodes[0];
    if (node.kind !== "family") throw new Error("expected a family");
    expect(node.members.map((m) => m.item.slug)).toEqual([
      "ipmat-indore",
      "ipmat-rohtak",
      "jipmat",
    ]);
  });

  it("degrades a one-member non-board family to a flat chip (rule 2)", () => {
    const nodes = groupExamFamilies(items("ipmat-indore"), bySlug);
    expect(nodes.map((n) => n.kind)).toEqual(["flat"]);
  });

  it("keeps a non-board family at its first member's position (rule 3)", () => {
    const nodes = groupExamFamilies(
      items("nda", "ipmat-indore", "cbse-11", "ipmat-rohtak", "jipmat", "cbse-12"),
      bySlug
    );
    expect(nodes.map((n) => (n.kind === "flat" ? `flat:${n.item.slug}` : `family:${n.key}`)))
      .toEqual(["flat:nda", "family:IPMAT", "family:CBSE"]);
  });

  it("round-trips a non-board family through the selection helpers", () => {
    const nodes = groupExamFamilies(ipmat(), bySlug);
    const sel = resolveFamilySelection(nodes, "jipmat", (i) => i.slug);
    expect(sel.topValue).toBe(familyKey("IPMAT"));
    expect(sel.classValue).toBe("jipmat");
    expect(sel.members.map((c) => c.value)).toEqual([
      "ipmat-indore",
      "ipmat-rohtak",
      "jipmat",
    ]);
    expect(isFamilyKey(sel.topValue!)).toBe(true);
  });

  it("commits its FIRST member when the family itself is picked", () => {
    const nodes = groupExamFamilies(ipmat(), bySlug);
    const node = nodes[0];
    if (node.kind !== "family") throw new Error("expected a family");
    expect(familyDefaultValue(node, (i) => i.slug)).toBe("ipmat-indore");
  });

  it("sums a non-board family like any other", () => {
    const nodes = groupExamFamilies(ipmat(), bySlug);
    const node = nodes[0];
    if (node.kind !== "family") throw new Error("expected a family");
    expect(familyTotal(node, () => 10)).toBe(30);
  });

  it("never mixes a board family with a non-board one under the same key", () => {
    const nodes = groupExamFamilies(
      items("cbse-11", "cbse-12", "ipmat-indore", "ipmat-rohtak"),
      bySlug
    );
    const keys = nodes.flatMap((n) => (n.kind === "family" ? [n.key] : []));
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys.sort()).toEqual(["CBSE", "IPMAT"]);
  });
});

/**
 * THE MEMBER-AXIS NOUN. The second picker control is the one that chooses
 * between a family's members, and its label was hardcoded to "Class" — true of
 * every family that existed while the axis was `board`+`std`, and false the
 * moment a non-board family arrived. IPMAT's members are institutes, not
 * classes, and a control reading "Class → Indore" is a lying label.
 *
 * The noun belongs to the FAMILY, not the member, so it rides on the node.
 * Board families default to "Class", which is why no board entry declares it.
 */
describe("member-axis label", () => {
  it("defaults a board family's axis to Class", () => {
    const nodes = groupExamFamilies(items("cbse-11", "cbse-12"), bySlug);
    const node = nodes[0];
    if (node.kind !== "family") throw new Error("expected a family");
    expect(node.memberAxis).toBe("Class");
  });

  it("uses the registry's familyAxis for a non-board family", () => {
    const nodes = groupExamFamilies(items("ipmat-indore", "ipmat-rohtak"), bySlug);
    const node = nodes[0];
    if (node.kind !== "family") throw new Error("expected a family");
    expect(node.memberAxis).toBe("Institute");
  });

  it("carries the axis through resolveFamilySelection, which is what renders it", () => {
    const nodes = groupExamFamilies(items("ipmat-indore", "ipmat-rohtak", "jipmat"), bySlug);
    expect(resolveFamilySelection(nodes, "jipmat", (i) => i.slug).memberAxis).toBe(
      "Institute"
    );
    const boards = groupExamFamilies(items("cbse-11", "cbse-12"), bySlug);
    expect(resolveFamilySelection(boards, "cbse-12", (i) => i.slug).memberAxis).toBe(
      "Class"
    );
  });

  it("reports no axis when nothing in a family is selected", () => {
    const nodes = groupExamFamilies(items("nda", "cbse-11", "cbse-12"), bySlug);
    expect(resolveFamilySelection(nodes, "nda", (i) => i.slug).memberAxis).toBeNull();
    expect(resolveFamilySelection(nodes, null, (i) => i.slug).memberAxis).toBeNull();
  });
});
