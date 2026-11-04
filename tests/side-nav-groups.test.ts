/**
 * The shared side menu's grouping (2026-11-04): items that carry a group are
 * shown under its heading; items without one stay as they were, so every guide
 * page that passes plain items renders exactly as before. Pure.
 */
import { describe, expect, it } from "vitest";
import { sideNavSegments } from "@/lib/nav/sideNavGroups";

describe("sideNavSegments", () => {
  it("leaves a plain list as one ungrouped run", () => {
    const items = [{ href: "/a", label: "A" }, { href: "/b", label: "B" }];
    expect(sideNavSegments(items)).toEqual([{ group: null, items }]);
  });

  it("starts a new run each time the group changes, ungrouped items included", () => {
    const top = { href: "/h", label: "All" };
    const g1 = { label: "CBSE Class 12", href: "/h/exam/cbse-12" };
    const a = { href: "/h/a", label: "Maths", group: g1 };
    const b = { href: "/h/b", label: "Physics", group: g1 };
    const c = { href: "/h/c", label: "Maths", group: { label: "NDA" } };
    expect(sideNavSegments([top, a, b, c])).toEqual([
      { group: null, items: [top] },
      { group: g1, items: [a, b] },
      { group: { label: "NDA" }, items: [c] },
    ]);
  });

  it("is empty for no items", () => {
    expect(sideNavSegments([])).toEqual([]);
  });
});
