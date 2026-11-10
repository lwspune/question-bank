/**
 * Which breadcrumbs a phone shows (2026-11-10, the "slicker" Phase 1).
 *
 * A long trail wrapped to two or three lines on a phone (Notes > NDA > NDA
 * Maths > Statistics > topic), pushing every page's content down. A phone now
 * shows Home and the ONE crumb a student taps to go up a level: the parent.
 * The current page is left out because the page heading names it. Wider
 * screens keep the whole trail. Hidden crumbs stay in the HTML (CSS hides
 * them), so search engines and the desktop layout see the full trail.
 */
import { describe, expect, it } from "vitest";
import { crumbHiddenOnPhone } from "@/components/nav/breadcrumbPhone";

const shown = (count: number) =>
  Array.from({ length: count }, (_, i) => i).filter((i) => !crumbHiddenOnPhone(i, count));

describe("crumbHiddenOnPhone", () => {
  it("a one-crumb trail keeps its crumb (Home > Notes)", () => {
    expect(shown(1)).toEqual([0]);
  });

  it("two crumbs: the parent stays, the current page goes (Mocks > NDA)", () => {
    expect(shown(2)).toEqual([0]);
  });

  it("a long trail keeps only the parent", () => {
    // Notes > NDA > NDA Maths > Statistics > topic
    expect(shown(5)).toEqual([3]);
  });

  it("never shows nothing for a non-empty trail", () => {
    for (let n = 1; n <= 8; n++) expect(shown(n)).toHaveLength(1);
  });

  it("an empty trail hides nothing (there is nothing to hide)", () => {
    expect(shown(0)).toEqual([]);
  });
});
