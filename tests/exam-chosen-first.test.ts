import { describe, expect, it } from "vitest";
import { PYQVAULT_EXAMS, getExamBySlug } from "@/lib/exam/examContext";
import { ANON_FEED, chosenExamFeed } from "@/lib/exam/examFeed";
import { groupExamFamilies } from "@/lib/exam/examFamily";
import { sortByDemand, withChosenExamFirst } from "@/lib/exam/demandOrder";

// A signed-out visitor who picked an exam (the homepage chips write qb_exam)
// saw every index page in the default order anyway (2026-11-02 audit).

describe("chosenExamFeed", () => {
  it("is the anonymous feed when no exam was chosen", () => {
    expect(chosenExamFeed(null, PYQVAULT_EXAMS)).toEqual(ANON_FEED);
  });

  it("puts the chosen exam first and the rest under other", () => {
    const feed = chosenExamFeed("mht-cet", PYQVAULT_EXAMS);
    expect(feed.primary).toEqual(["mht-cet"]);
    expect(feed.tier).toBe("senior");
    expect(feed.other).not.toContain("mht-cet");
    expect(feed.other.length).toBe(ANON_FEED.primary.length - 1);
  });
});

describe("withChosenExamFirst", () => {
  const nodes = sortByDemand(
    groupExamFamilies(
      PYQVAULT_EXAMS.map((e) => ({ slug: e.slug })),
      (e) => getExamBySlug(e.slug)
    )
  );
  const label = (n: (typeof nodes)[number]) => (n.kind === "family" ? n.key : n.item.slug);

  it("leaves the order alone with no choice", () => {
    expect(withChosenExamFirst(nodes, null)).toEqual(nodes);
  });

  it("moves a single exam to the front", () => {
    const out = withChosenExamFirst(nodes, "nda");
    expect(label(out[0])).toBe("nda");
    expect(out).toHaveLength(nodes.length);
  });

  it("moves the family card that holds the chosen class", () => {
    expect(label(withChosenExamFirst(nodes, "cbse-12")[0])).toBe("CBSE");
    expect(label(withChosenExamFirst(nodes, "mpsc-state-services-mains")[0])).toBe("MPSC");
  });

  it("keeps the order for an exam not on the page", () => {
    expect(withChosenExamFirst(nodes, "imat")).toEqual(nodes);
  });
});
