import { describe, it, expect } from "vitest";
import { headingsOnChange } from "@/lib/export/subtopicHeadings";

describe("headingsOnChange", () => {
  it("emits a heading only when the label changes", () => {
    expect(headingsOnChange(["A", "A", "B", "B", "A"])).toEqual([
      "A",
      null,
      "B",
      null,
      "A",
    ]);
  });

  it("emits one heading for a single contiguous run", () => {
    expect(headingsOnChange(["A", "A", "A"])).toEqual(["A", null, null]);
  });

  it("emits a heading for the first item always", () => {
    expect(headingsOnChange(["X"])).toEqual(["X"]);
  });

  it("re-emits a label that recurs non-contiguously", () => {
    // cart/mixed order: A reappears after Other → its heading prints again.
    expect(headingsOnChange(["A", "Other", "Other", "A"])).toEqual([
      "A",
      "Other",
      null,
      "A",
    ]);
  });

  it("returns an empty array for no items", () => {
    expect(headingsOnChange([])).toEqual([]);
  });
});
