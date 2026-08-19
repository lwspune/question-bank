import { describe, it, expect } from "vitest";
import {
  getPrincipleName,
  getConceptName,
} from "@/lib/links/tagNames";

describe("getPrincipleName", () => {
  it("returns a name for a known TOP_PRINCIPLES slug", () => {
    const name = getPrincipleName("am-gm-mean-inequalities");
    expect(name).not.toBeNull();
    expect(name!.length).toBeGreaterThan(0);
  });

  it("returns a name for Vieta (sanity check on another known slug)", () => {
    const name = getPrincipleName("vieta-symmetric-roots");
    expect(name).not.toBeNull();
    expect(name!.toLowerCase()).toContain("vieta");
  });

  it("returns null for an unknown slug", () => {
    expect(getPrincipleName("not-a-real-principle")).toBeNull();
    expect(getPrincipleName("")).toBeNull();
  });
});

describe("getConceptName", () => {
  it("returns a name for a known Statistics concept", () => {
    // central-tendency.ts defines a concept slugged 'arithmetic-mean-raw'
    // (one of the 11 concepts in that subtopic). Use that as a known-good
    // reference; if the slug is ever renamed, this test will fail loudly.
    const name = getConceptName("central-tendency", "arithmetic-mean-raw");
    expect(name).not.toBeNull();
    expect(name!.length).toBeGreaterThan(0);
  });

  it("returns null for unknown subtopicSlug", () => {
    expect(
      getConceptName("not-a-subtopic", "arithmetic-mean-raw")
    ).toBeNull();
  });

  it("returns null for unknown conceptSlug in a known subtopic", () => {
    expect(getConceptName("central-tendency", "not-a-concept")).toBeNull();
  });

  it("returns null on empty input", () => {
    expect(getConceptName("", "")).toBeNull();
  });
});
