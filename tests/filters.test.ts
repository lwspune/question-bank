import { describe, it, expect } from "vitest";
import {
  parseFilters,
  buildSearchParams,
  type Filters,
} from "@/lib/questions/filters";

describe("parseFilters", () => {
  it("returns defaults when params are empty", () => {
    expect(parseFilters(new URLSearchParams(""))).toEqual({
      examId: null,
      subjectId: null,
      chapterIds: [],
      subtopicIds: [],
      difficulties: [],
      q: "",
      page: 1,
    });
  });

  it("parses single-value scalar params", () => {
    const f = parseFilters(
      new URLSearchParams("examId=e1&subjectId=s1&q=lens&page=3")
    );
    expect(f.examId).toBe("e1");
    expect(f.subjectId).toBe("s1");
    expect(f.q).toBe("lens");
    expect(f.page).toBe(3);
  });

  it("parses comma-separated array params", () => {
    const f = parseFilters(
      new URLSearchParams("chapterIds=c1,c2,c3&subtopicIds=s1,s2")
    );
    expect(f.chapterIds).toEqual(["c1", "c2", "c3"]);
    expect(f.subtopicIds).toEqual(["s1", "s2"]);
  });

  it("filters out invalid difficulty values silently", () => {
    const f = parseFilters(
      new URLSearchParams("difficulty=EASY,EXTREME,HARD")
    );
    expect(f.difficulties).toEqual(["EASY", "HARD"]);
  });

  it("clamps invalid page values to 1", () => {
    expect(parseFilters(new URLSearchParams("page=0")).page).toBe(1);
    expect(parseFilters(new URLSearchParams("page=-5")).page).toBe(1);
    expect(parseFilters(new URLSearchParams("page=abc")).page).toBe(1);
  });
});

describe("buildSearchParams", () => {
  const empty: Filters = {
    examId: null,
    subjectId: null,
    chapterIds: [],
    subtopicIds: [],
    difficulties: [],
    q: "",
    page: 1,
  };

  it("emits no params when filters are at defaults", () => {
    expect(buildSearchParams(empty).toString()).toBe("");
  });

  it("serializes set values", () => {
    const sp = buildSearchParams({
      examId: "e1",
      subjectId: "s1",
      chapterIds: ["c1", "c2"],
      subtopicIds: [],
      difficulties: ["EASY"],
      q: "lens",
      page: 2,
    });
    expect(sp.get("examId")).toBe("e1");
    expect(sp.get("subjectId")).toBe("s1");
    expect(sp.get("chapterIds")).toBe("c1,c2");
    expect(sp.get("difficulty")).toBe("EASY");
    expect(sp.get("q")).toBe("lens");
    expect(sp.get("page")).toBe("2");
    expect(sp.has("subtopicIds")).toBe(false);
  });

  it("round-trips an arbitrary filter object", () => {
    const original: Filters = {
      examId: "e1",
      subjectId: "s1",
      chapterIds: ["a", "b"],
      subtopicIds: ["x"],
      difficulties: ["EASY", "HARD"],
      q: "wave",
      page: 3,
    };
    const params = buildSearchParams(original);
    const parsed = parseFilters(params);
    expect(parsed).toEqual(original);
  });
});
